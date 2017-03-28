modules.taskFooterDesign = function () {
    'use strict';

//new comment
    let commentTbl = document.getElementById('tbl-new-comment');
    let newComment = commentTbl.querySelectorAll('td')[1];
    newComment.id = 'new-comment-wrap';

    // добавлю заголовок
    let newCommentTitle = document.createElement('h2');
    newCommentTitle.textContent = 'Новый комментарий';
    newCommentTitle.classList.add('section-title');

    //блок в котором будут поля для ввода затраченног и планируемого времени
    //и выбор приоритета

    newComment.insertBefore(newCommentTitle, newComment.firstElementChild);

    let footerDesignCSS = '//cssimport taskFooterDesign.css';

    addcss(footerDesignCSS);
};