if (NODE_ENV === 'development') {
    console.time('load goToTaskDatalist');
}

import {getTaskId,getTaskHead} from './_finders.js';

function goToTaskDatalist() {
    'use strict';

    let taskId = getTaskId();

    let taskTitle = getTaskHead().title;

    let data = JSON.parse(localStorage.getItem('datalist')) || [];
    data = appendId(data);

    //если на странице есть заголовок задачи
    // - проверить есть ли она в списке
    if (taskTitle) {

        let newdata = {"id": taskId, "title": taskTitle + ' ' + taskId};

        data = appendId(data, newdata);

        localStorage.setItem('datalist', JSON.stringify(data));
    }

    //создам datalist
    let datalist = document.createElement('datalist');
    datalist.id = 'dl-gototask';
    document.body.appendChild(datalist);

    //связать datalist с полем ввода id задачи
    let idField = document.getElementById('goTo');
    idField.removeAttribute('style');
    idField.setAttribute('list', 'dl-gototask');

    for (let i = 0; i < data.length; i++) {
        let op = document.createElement('option');
        op.value = data[i].id;
        op.label = data[i].title;
        datalist.appendChild(op);
    }

    function appendId(arr, newdata = false) {
        if (newdata) {
            let check = arr.some(function (item) {
                return item.id === newdata.id;
            });

            if (!check) {
                arr.push(newdata);
            }

            if (arr.length > 10) {
                arr.shift();
            }
        }

        return arr;
    }
}

export {goToTaskDatalist};

if (NODE_ENV === 'development') {
    console.timeEnd('load goToTaskDatalist');
}