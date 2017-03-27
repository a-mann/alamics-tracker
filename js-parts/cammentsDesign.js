

//переделка внешнего вида каментов
modules.cammentsDesign = function () {
    'use strict';
    createTemplate();

    let tbl = document.getElementById('comments-tbl');

    let rows = getAllCommentsRows();

    //rows[0].parentNode.removeChild(rows[0].previousElementSibling);
    //скрываю, а не удаляю чтобы не менять уже используемые функции
    //выбирающие строки с каментами и игнорирующие первую строку.
    //Если удалять то получится что первый камент не будет обрабатываться
    rows[0].previousElementSibling.classList.add('hidden-elem');

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

        //cтрока скрыта
        //rows[4].classList.add('is-hidden');
        rows[4].appendChild(create5row(td));

        //становится видимой при наведении курсора на карточку камента
        block.addEventListener('mouseenter', function () {
            showHiddenRow(rows[4]);
        });

        block.addEventListener('mouseleave', function () {
            hideHiddenRow(rows[4]);
        });

        td.map(function (tditem) {
            if(tditem){
                item.removeChild(tditem);
            }
        });
    });

    let cammentsDesignCSS = '//cssimport commentsDesign.css';

    addcss(cammentsDesignCSS);

    function create1row(td, rownumber) {
        let fragment = document.createDocumentFragment();

        let rowItemProto = document.createElement('div');

        let rowItem = rowItemProto.cloneNode(true);

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

        let workTime = rowItemProto.cloneNode(true);
        workTime.classList.add('work-time');

        let timeStr = td[10].textContent.split('/');

        timeStr[0] = createTimeTitleString(timeStr[0], ['Затрачена', 'Затрачено', 'Затрачено'])+
            ' '+
            createTimeString(timeStr[0], ['минута', 'минуты', 'минут']);

        if (isNaN(Number(timeStr[1]))) {
            workTime.innerHTML = timeStr[0];
        }else{
            timeStr[1] = ' из '+timeStr[1];
            workTime.innerHTML = timeStr.join(' ');
        }

        fragment.appendChild(workTime);

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

        //обертка для кнопок Удалить и Редактировать
        let rowItemWrap = rowItemProto.cloneNode(true);
        rowItemWrap.classList.add('actions-btn-wrap');

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

    function showHiddenRow(row) {
        row.classList.add('is-visible');
        row.classList.remove('is-hidden');
    }

    function hideHiddenRow(row) {
        row.classList.add('is-hidden');
        row.classList.remove('is-visible');
    }

};