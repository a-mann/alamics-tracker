import {runOnKeys} from './_utils.js';
import {getAllCamments} from './_finders.js';

//выделение текста в каменте и вставка оформленная как цитата для markdown
function copyPasteCommentQuote () {
    'use strict';

    let camments = Array.from(getAllCamments());

    camments.map(function (camment) {
        camment.addEventListener('mouseup', function () {
            let selection = window.getSelection();

            localStorage.setItem('selection',selection);
        });
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
                formatAndInsetCommentQuote(editor);
            }
        },
        editor
        ,
        "16",
        "17",
        "V".charCodeAt(0)
    );

    if (NODE_ENV === 'development') {
        console.info('load copyPasteCommentQuote');
    }
}

export {copyPasteCommentQuote};