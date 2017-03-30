

//выделение текста в каменте и вставка оформленная как цитата для markdown
modules.copyPasteCommentQuote = function () {
    'use strict';
    let rows = getAllCommentsRows();

    rows.map(function (row) {
        let camment = getCommentFromRow(row);

        camment.addEventListener('mouseup', function () {
            let selection = w.getSelection();

            localStorage.setItem('selection',selection);
        })

    });

    let editor = document.getElementById('text');

    function formatAndInsetCommentQuote(elem) {
        if(localStorage.getItem('selection')){
            let startPos = elem.selectionStart;
            let endPos = elem.selectionEnd;

            let selection = localStorage.getItem('selection');

            let strings = selection.split('\n');

            strings = strings.map(function (str) {
                 return '> '+str;
            });

            selection = strings.join('');

            // selection = '\n'+selection+'\n';

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

    console.info('load copyPasteCommentQuote');
};