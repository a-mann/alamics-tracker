'use strict';
createTemplate();

let tbl = document.getElementById('comments-tbl');
let rows = Array.from(tbl.querySelectorAll('tr'));

rows.map(function (item) {
    let td = Array.from(item.querySelectorAll('td'));

    //item.removeChild(td[0]);

    let block = document.getElementById('comment-template').cloneNode(true);
    block.removeAttribute('id');

    item.appendChild(block);

    let rows = block.querySelectorAll('.b-comment__row');

    let row1 = create1row(td);
    rows[0].appendChild(row1);

    rows[1].appendChild(create2row(td));
    rows[2].appendChild(create3row(td));

    let files = create4row(td);
    if(!!files.length){
        files.map(function (item) {
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
    })

    //тут надо будет добавить стили
});


function create1row(td) {
    let fragment = document.createDocumentFragment();

    let rowItemProto = document.createElement('div');

    let rowItem = rowItemProto.cloneNode(true);

    //дата
    rowItem.classList.add('comment-date');
    rowItem.innerHTML = td[3].textContent;

    fragment.appendChild(rowItem);

    //статус
    rowItem = rowItemProto.cloneNode(true);
    rowItem.classList.add('task-status');
    rowItem.innerHTML = td[9].textContent;
    fragment.appendChild(rowItem);

    //id checkbox
    rowItem = rowItemProto.cloneNode(true);
    rowItem.appendChild(td[0].firstElementChild);
    rowItem.classList.add('id-checkbox');
    fragment.appendChild(rowItem);

    //приоритет
    rowItem = rowItemProto.cloneNode(true);
    rowItem.classList.add('task-rank');
    rowItem.innerHTML = td[8].textContent + ' приоритет';
    fragment.appendChild(rowItem);

    //письма и ссылка
    rowItem = rowItemProto.cloneNode(true);
    rowItem.classList.add('row-right');

    let letter = td[1].querySelectorAll('img')[1];
    letter.classList.add('letter-addr');
    rowItem.appendChild(letter);

    let link = td[1].querySelectorAll('a')[1];
    link.classList.add('comment-link');
    rowItem.appendChild(link);
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
    author.innerHTML = 'Автор <br>' + td[4].textContent;
    rowItem.appendChild(author);

    //исполнитель
    let worker = document.createElement('span');
    worker.classList.add('comment-worker');
    worker.innerHTML = 'Исполнитель <br>' + td[6].textContent;
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

    //время
    rowItem.classList.add('work-time');
    let timeStr = td[10].textContent.split('/');
    timeStr[0] = 'Время затр.: '+timeStr[0];
    timeStr[1] = 'Время план.: '+timeStr[1];
    rowItem.innerHTML = timeStr.join(' / ');
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


function createTemplate() {
    let block = document.createElement('div');
    block.classList.add('b-comment');
    block.id = 'comment-template';

    let blockRow;

    for (let i = 0; i < 5; i++) {
        blockRow = document.createElement('div');
        blockRow.classList.add('b-comment__row', 'b-comment__row_' + i);
        block.appendChild(blockRow)
    }

    document.body.appendChild(block);

    return block;
}