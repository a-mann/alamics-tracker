function goToTaskDatalist() {
    'use strict';

    let taskId = require('./_finders').getTaskId();

    let taskTitle = document.getElementById('task-title').textContent.split(' - ');

    let data = JSON.parse(localStorage.getItem('datalist')) || [];
    data = appendId(data);

    //если на странице есть заголовок задачи
    // - проверить есть ли она в списке
    if (Array.isArray(taskTitle) && taskTitle.length >= 2) {
        taskTitle = taskTitle[1].trim();

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

    if (NODE_ENV === 'development') {
        console.info('load goToTaskDatalist');
    }
}

export {goToTaskDatalist};