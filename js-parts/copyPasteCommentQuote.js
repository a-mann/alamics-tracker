

//выделение текста в каменте и вставка оформленная как цитата для markdown
modules.copyPasteCommentQuote = function () {
    'use strict';
    let rows = getAllCommentsRows();

    rows.map(function (row) {
        let camment = getCommentFromRow(row);

        camment.addEventListener('mouseup', function () {
            let selection = w.getSelection();
            selection = selection.toString().replace(/(?:(?:\r\n|\r|\n)\s*){2}/gm, "").trim();
            localStorage.setItem('selection',selection);
        })

    });

    let editor = document.getElementById('text');

    function formatAndInsetCommentQuote(elem) {
        if(localStorage.getItem('selection')){
            let startPos = elem.selectionStart;
            let endPos = elem.selectionEnd;

            let selection = localStorage.getItem('selection');
            let max_characters = 60;

            if(selection.length > max_characters){
                let strings = selection.split(' ');

                let substr = [];
                let str = '';

                for(let i = 0; i < strings.length; i++){
                    str += strings[i]+' ';
                    if(str.length >= max_characters || i === strings.length - 1){
                        substr.push('> '+str.trim());
                        str = '';
                    }
                }

                selection = substr.join('\n');
                selection = '\n'+selection+'\n'
            }

            //this.innerHTML = this.innerHTML + selection;

            elem.value = elem.value.substring(0, startPos)
                + selection
                + elem.value.substring(endPos, elem.value.length);

            localStorage.removeItem('selection');
        }
    }

    runOnKeys(
        function() {
            if(document.activeElement === editor){
                formatAndInsetCommentQuote(editor)
            }
        },
        editor
        ,
        "16",
        "17",
        "V".charCodeAt(0)
    );
};