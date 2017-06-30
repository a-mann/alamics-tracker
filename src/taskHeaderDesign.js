if(NODE_ENV === 'development'){
    console.time('load taskHeaderDesign');
}

import {getTaskId,getTaskHead} from './_finders.js';

function taskHeaderDesign() {

    const taskData = dataMaining();
    //console.log(taskData);
    let dashboard = addLeftColumn();
    let fragment = document.createDocumentFragment();

    let data = [
        [
            {
                'title': 'Задача №',
                'data': [`<span class="prim-i">${taskData.task.id}</span> <span class="sec-i">от ${taskData.task.begin}</span>`]
            },
            {
                'title': 'Статус',
                'data': [`<span class="reg-i">${taskData.task.state}</span>`]
            }
            // {
            //     'title': 'Иерархия',
            //     'data': []
            // }
        ],
        [
            {
                'title': 'Заявитель',
                'data': [`<span class="prim-i">${taskData.owner.name}</span>`,`<a href="mailto:${taskData.owner.email}" class="reg-i">${taskData.owner.email}</a>`]
            }
        ],
        [
            {
                'title': 'Проект',
                'data': [`<span class="prim-i">${taskData.project}</span>`]
            }
        ],
        [
            {
                'title': 'Тип задачи',
                'data': [`<span class="reg-i">${taskData.task.type}</span>`]
            }
        ],
        [
            {
                'title': 'Время',
                'data': [`<span class="reg-i">${taskData.time.spent} мин.</span> <span class="sec-i">из ${taskData.time.planned}</span> <span class="${countLeftTime(taskData.time.spent, taskData.time.planned)}">(${taskData.time.left})</span>`]
            }
        ]
    ];

    dashboard.appendChild(createTemplate(data,fragment));
}

function dataMaining() {
    let sourseTbl = document.getElementById('task-bar').firstElementChild;
    let td = Array.from(sourseTbl.querySelectorAll('td'));

    //задача
        //название !
        //номер (id) !
        //дата начала !
        //тип задачи !
    //завитель
        //имя !
        //почта !
        //организация !
    //проект !

    //время
        //планируемое
        //затрачено
        //осталось

    let source = {};
    const taskHead = getTaskHead();

    source.task = {
        'title': taskHead.title,
        'id': getTaskId(),
        'begin': findInCells(td,'Дата'),
        'type': findInCells(td,'Тип'),
        'state': taskHead.state
    };

    let owner = findInCells(td,'Заявитель',true);

    source.owner = {
        'name': owner[0].replace(/<[^>]*>/g, ''),
        'email': owner[1],
        'f': owner[2].replace(/<[^>]*>/g, '')
    };

    source.time = {
        'spent' : parseInt(findInCells(td,'Затрачено')),
        'planned':  parseInt(findInCells(td,'Планируемое')),
        'left':  parseInt(findInCells(td,'Оставшееся'))
    };

    source.project = findInCells(td,'Проект');

    return source;
}

function findInCells(arr,str,parse = false) {
    let result = arr.filter(function (cell) {
        if(cell.textContent.trim().includes(str)){
            return cell
        }
    });

    if(parse){
        return result[0].nextElementSibling.innerHTML.split('<br>');
    }

    return result[0].nextElementSibling.textContent.trim();
}

function addLeftColumn() {
    let wrap = document.getElementById('main-content');
    let col = document.createElement('div');
    col.classList.add('left-col');
    wrap.insertBefore(col, wrap.firstChild);

    let dashboard = document.createElement('div');
    dashboard.classList.add('task-dashboard');
    col.appendChild(dashboard);

    return dashboard;
}

function createTemplate(dataArr,placeholder) {
    dataArr.map(function (group) {
        let block = document.createElement('div');
        block.classList.add('txt-block');

        for(let val of group){
            let title = document.createElement('div');
            title.classList.add('txt-block__title');
            title.textContent = val.title;

            let data = document.createElement('div');
            data.classList.add('txt-block__data');

            for(let str of val.data){
                let p = document.createElement('p');
                p.innerHTML = str;
                data.appendChild(p);
            }

            block.appendChild(title);
            block.appendChild(data);
        }

        placeholder.appendChild(block)
    });

    //console.log(placeholder);
    return placeholder;
}

function countLeftTime(spent,plan) {
    let cssclass = 'reg-i';

    if(parseInt(spent) > parseInt(plan)){
        cssclass = 'alert-i';
    }
    return cssclass;
}


import styles from './pcss/taskHeaderDesign.pcss';

export {taskHeaderDesign};

if(NODE_ENV === 'development'){
    console.timeEnd('load taskHeaderDesign');
}