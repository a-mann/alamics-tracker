//сюда добаляются элементы страницы в которые вставляются созданые скриптом блоки
//и.или они модифицируются скриптом

function addPageElems() {
    let $content_cell = document.querySelector('form[name="theForm"]');
    $content_cell.setAttribute('id', 'main-content');

    let $comments_tbl = $content_cell.getElementsByTagName("TABLE")[0];

    if($comments_tbl){
        $comments_tbl.setAttribute('id', 'comments-tbl');

        let rows = require('./_finders').getAllCommentsRows();

        rows.map(function (row) {
            row.querySelectorAll('td')[5].firstElementChild.classList.add('comment-wrap');
        });
    }

    let input_div = document.querySelector('div.input_box'); //есть на странице задачи

    if (input_div) {
        let $user_toolbar = document.createElement('DIV');
        $user_toolbar.setAttribute('id', 'user-toolbar');
        $user_toolbar.classList.add('user-toolbar');

        input_div.appendChild($user_toolbar);
    }

    //подвал задачи
    let $task_footer = document.querySelectorAll('table.theForm');

    if($task_footer.length){
        //обертка
        $task_footer = $task_footer[0];
        $task_footer.id = 'task-footer';

        //таблица с textarea камента
        let $footer_tbls = $task_footer.querySelectorAll('table');

        let $commentTbl = $footer_tbls[0];
        $commentTbl.id = 'tbl-new-comment';

        //обертка ячейки с textarea
        let $newComment = $commentTbl.querySelectorAll('td')[1];
        $newComment.id = 'new-comment-wrap';

        //добавлю обертку для textarea
        //в нее буду вставлять кнопки всякие
        let $tareaWrap = document.createElement('div');
        $tareaWrap.id = 'tarea-wrap';
        $tareaWrap.classList.add('tarea-wrap');

        $tareaWrap.appendChild(document.getElementById('text'));
        $newComment.appendChild($tareaWrap);

        //Таблица статусов задачи
        let $statusTbl = $footer_tbls[1].querySelector('table');
        $statusTbl.id = 'tbl-status';
    }
    //заголовок задачи
    let taskTitle = document.querySelector('h1');

    taskTitle.id = 'task-title';
}

import styles from './pcss/userscript.pcss';

export {addPageElems};