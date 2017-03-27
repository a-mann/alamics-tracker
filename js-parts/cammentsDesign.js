

//переделка внешнего вида каментов
modules.cammentsDesign = function () {
    'use strict';
    createTemplate();

    let tbl = document.getElementById('comments-tbl');

    let rows = getAllCommentsRows();

    rows[0].parentNode.removeChild(rows[0].previousElementSibling);

    rows.map(function (item, i) {
        let td = Array.from(item.querySelectorAll('td'));

        let block = document.getElementById('comment-template').cloneNode(true);
        block.removeAttribute('id');

        item.appendChild(block);

        let rows = block.querySelectorAll('.b-comment__row');

        let row1 = create1row(td,i);
        rows[0].appendChild(row1);

        rows[1].appendChild(create2row(td));
        rows[2].appendChild(create3row(td));

        let files = create4row(td);
        if(!!files.length){
            let pics = ['png','jpg','gif'];

            files.map(function (item) {

                //let ext = item.href.split('.')[1];
                let ext = item.href.lastIndexOf('.');
                ext = item.href.slice(ext+1,item.href.length);

                if(pics.indexOf(ext) > -1){
                    item = createImgThumb(item);
                }else{
                    item = createDocsThumb(ext,item);
                }

                rows[3].appendChild(item);
            });
        }else{
            block.removeChild(rows[3]);
        }

        rows[4].appendChild(create5row(td));

        td.map(function (tditem) {
            if(tditem){
                item.removeChild(tditem);
            }
        });
    });

    let cammentsDesignCSS = "#main-content{ background: #f0f0f0; padding: 1px 0; } #comments-tbl { max-width: 720px; margin: 3em auto; } #comments-tbl, #comments-tbl tbody, #comments-tbl tr { display: block; } #comments-tbl tr:not(:last-child){ margin-bottom: 2em; } .b-comment { width: 100%; background: #fff; font-size: 12px; display: flex; flex-flow: column wrap; position: relative; box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2); } .comment-body{width: 100%;} .b-comment__row { padding: 1em; display: flex; flex-flow: row wrap; position: relative; } /*//1 row шапка*/ .task-rank, .task-status { padding: 0 .5em 0 2em; } .id-checkbox { position: absolute; visibility: hidden; z-index: -1; } .comment-no{ margin-right: 0; } /*//2 row автор - исполнитель*/ .b-comment__row.b-comment__row_1{ padding-top: 0; } .comment-info > span { display: inline-block; vertical-align: top; } .comment-author { padding-right: 2em; position: relative; } .comment-author:after { content: '→'; position: relative; left: 1em; } /*//3 row текст камента*/ .b-comment__row_2 { font-size: 14px; border-top: 1px solid rgba(160, 160, 160, 0.2); border-bottom: 1px solid rgba(160, 160, 160, 0.2); } /*//4 row файлы*/ .b-comment__row.b-comment__row_3 { padding-top: 1.5em; padding-bottom: 1.5em; align-items: stretch; } /*//5 row подвал*/ .b-comment__row_3 + .b-comment__row_4 { border-top: 1px solid rgba(160, 160, 160, 0.2); } .b-comment__row_4 .row-right { top: 50%; transform: translateY(-50%); } .btn-del-comment, .btn-edit-comment { width: 100px; height: 24px; line-height: 24px; position: relative; } .btn-edit-comment { width: 140px; border: 1px solid #ADADAD; } .btn-del-comment:after, .btn-edit-comment:after { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: -1; } .btn-edit-comment:after { content: 'Редактировать'; width: 100%; text-align: center; background: #E1E1E1; } .btn-del-comment:after { content: 'Удалить'; color: #ccc; line-height: normal; border-bottom: 1px solid; } .btn-del-comment img, .btn-edit-comment img { display: none; } .btn-del-comment a, .btn-edit-comment a { width: 100%; height: 100%; position: absolute; } .row-right { position: absolute; top: 1em; right: 1em; } .row-right > * { display: inline-block; vertical-align: middle; } .row-right > *:not(:last-child) { margin-right: .5em; } .img-thumb{max-width: 150px;} .img-thumb img:first-child { display: none; } .img-thumb > a { display: block; } .img-thumb .attach-title{ margin-top: .3em; } .thumb-pic { width: 100%; height: calc(100% - 2em); object-fit: cover; border: 1px solid #ccc; } .doc-thumb { max-width: 150px; border: 1px solid #ccc; line-height: 58px; text-align: center; text-decoration: none; color: inherit; } .doc-thumb .attach-title { padding: 0 .5em; word-break: break-all; position: relative; top: 50%; transform: translateY(-50%); } .file-thumb { flex: 1 1 15%; min-height: 70px; } .file-thumb:nth-child(n+7) { margin-top: 2em; } .file-thumb:not(:last-child) { margin-right: 1em; } .attach-title{max-width: 150px; text-align: center; line-height: normal; word-break: break-all; }";

    addcss(cammentsDesignCSS);


    function create1row(td, rownumber) {
        let fragment = document.createDocumentFragment();

        let rowItemProto = document.createElement('div');

        let rowItem = rowItemProto.cloneNode(true);

        // //номер комментария
        // rowItem.classList.add('comment-no');
        // rowItem.innerHTML = rownumber+')';
        // fragment.appendChild(rowItem);

        //дата
        rowItem = rowItemProto.cloneNode(true);
        rowItem.classList.add('comment-date');
        rowItem.innerHTML = td[3].textContent;

        fragment.appendChild(rowItem);

        //id checkbox
        rowItem = rowItemProto.cloneNode(true);
        rowItem.appendChild(td[0].firstElementChild);
        rowItem.classList.add('id-checkbox');
        fragment.appendChild(rowItem);

        //приоритет и срок исполнения
        rowItem = rowItemProto.cloneNode(true);
        rowItem.classList.add('task-rank');

        rowItem.innerHTML = td[8].textContent + ' приоритет';

        let deadline = td[7].textContent;

        if(deadline.length > 1){
            rowItem.innerHTML = rowItem.innerHTML + ' до '+deadline;
        }

        fragment.appendChild(rowItem);

        //письма,ссылка,статус
        rowItem = rowItemProto.cloneNode(true);
        rowItem.classList.add('row-right');

        let status = rowItemProto.cloneNode(true);
        status.textContent = td[9].textContent;
        status.classList.add('task-status');
        rowItem.appendChild(status);

        let letter = td[1].querySelectorAll('img')[1];
        letter.classList.add('letter-addr');
        rowItem.appendChild(letter);

        let link = td[1].querySelectorAll('a')[1];
        link.classList.add('comment-link');
        rowItem.appendChild(link);


        //номер комментария
        let no = rowItemProto.cloneNode(true);
        no.classList.add('comment-no');
        no.innerHTML = rownumber;
        rowItem.appendChild(no);

        fragment.appendChild(rowItem);

        return fragment;
    }

    function create2row(td) {
        let fragment = document.createDocumentFragment();

        let rowItemProto = document.createElement('div');

        let rowItem = rowItemProto.cloneNode(true);
        rowItem.classList.add('comment-info');

        //автор
        let author = document.createElement('span');
        author.classList.add('comment-author');
        //author.innerHTML = 'Автор <br>' + td[4].textContent;
        author.innerHTML = td[4].textContent;
        rowItem.appendChild(author);

        //исполнитель
        let worker = document.createElement('span');
        worker.classList.add('comment-worker');
        //worker.innerHTML = 'Исполнитель <br>' + td[6].textContent;
        worker.innerHTML = td[6].textContent;
        rowItem.appendChild(worker);

        fragment.appendChild(rowItem);

        return fragment;
    }

    function create3row(td) {
        //комментарий

        let rowItem = document.createElement('div');
        rowItem.classList.add('comment-body');
        rowItem.appendChild(td[5].firstElementChild.cloneNode(true));
        return rowItem;
    }

    function create4row(td) {
        return Array.from(td[2].querySelectorAll('a'));
    }

    function create5row(td) {
        let fragment = document.createDocumentFragment();

        let rowItemProto = document.createElement('div');

        let rowItem = rowItemProto.cloneNode(true);

        //время потраченное и запланированное
        rowItem.classList.add('work-time');
        let timeStr = td[10].textContent.split('/');

        timeStr[0] = createTimeTitleString(timeStr[0], ['Затрачена', 'Затрачено', 'Затрачено'])+
            ' '+
            createTimeString(timeStr[0], ['минута', 'минуты', 'минут']);

        if (isNaN(Number(timeStr[1]))) {
            rowItem.innerHTML = timeStr[0];
        }else{
            timeStr[1] = ' из запланированных '+timeStr[1];
            rowItem.innerHTML = timeStr.join(' ');
        }

        fragment.appendChild(rowItem);

        //обертка для кнопок Удалить и Редактировать
        let rowItemWrap = rowItemProto.cloneNode(true);
        rowItemWrap.classList.add('row-right');

        //удалить

        if(td[11].firstElementChild){
            rowItem = rowItemProto.cloneNode(true);
            rowItem.classList.add('btn-del-comment');
            rowItem.appendChild(td[11].firstElementChild);
            rowItemWrap.appendChild(rowItem);
        }

        //редактировать
        rowItem = rowItemProto.cloneNode(true);
        rowItem.classList.add('btn-edit-comment');
        rowItem.appendChild(td[1].firstElementChild);
        rowItemWrap.appendChild(rowItem);

        fragment.appendChild(rowItemWrap);

        return fragment;
    }

    function createImgThumb(item) {
        let wrap = document.createElement('div');
        wrap.classList.add('img-thumb', 'file-thumb');

        let pic = document.createElement('img');
        pic.src = item.getAttribute('href');
        pic.classList.add('thumb-pic');

        //item.classList.add('img-thumb', 'file-thumb');
        item.appendChild(pic);
        let title = getAttachTitle(item);
        wrap.appendChild(item);
        wrap.appendChild(title);

        return wrap;
    }

    function createDocsThumb(ext,item) {
        item.classList.add('doc-thumb','file-thumb');
        item.appendChild(getAttachTitle(item));
        item.removeChild(item.firstElementChild);
        return item;
    }

    function getAttachTitle(item) {
        let title = item.firstElementChild.title;
        let wrap = document.createElement('div');
        wrap.textContent = title;
        wrap.classList.add('attach-title');
        return wrap;
    }

    function createTemplate() {
        let wrap = document.createElement('template');
        let block = document.createElement('div');
        block.classList.add('b-comment');
        block.id = 'comment-template';

        let blockRow;

        for (let i = 0; i < 5; i++) {
            blockRow = document.createElement('div');
            blockRow.classList.add('b-comment__row', 'b-comment__row_' + i);
            block.appendChild(blockRow)
        }

        wrap.appendChild(block);

        document.body.appendChild(wrap);

        return wrap;
    }
};