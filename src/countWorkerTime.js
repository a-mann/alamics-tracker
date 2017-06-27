function countWorkerTime() {
    'use strict';
    let $input_box = document.getElementById('user-toolbar');
    let rows = require('./_finders').getAllCommentsRows();
    let workers = require('./_finders').getAllWorkers();
    let dates_collection = [];
    let date_str;

    for (let i = 0; i < rows.length; i++) {
        date_str = rows[i].children[3].textContent;
        date_str = date_str.split(' ');
        dates_collection.push(require('./_utils').createISODate(date_str[0]));
    }

    let dates_arr = require('./_utils').eliminateDuplicates(dates_collection);

    let createDatesList = function (input_box, dates) {

        function createList(css_id, css_class) {
            let list = document.createElement('SELECT');
            list.setAttribute('id', css_id);
            list.classList.add(css_class);
            return list;
        }

        let box = document.createElement('DIV');
        box.classList.add('user-toolbar__item');

        let start_list = createList('date-start-list', 'dates-list');

        let end_list = createList('date-end-list', 'dates-list');

        let btn = document.createElement('BUTTON');
        btn.setAttribute('type', 'button');
        btn.textContent = 'Посчитать';

        let option, cln_option, listdate;

        for (let i = 0; i < dates.length; i++) {
            listdate = require('./_utils').dateFormatter(parseInt(dates[i], 10));
            option = document.createElement('OPTION');
            option.setAttribute('value', dates[i]);
            option.innerHTML = listdate.toLocaleString('ru');
            cln_option = option.cloneNode(true);
            start_list.appendChild(option);
            end_list.appendChild(cln_option);
        }
        box.appendChild(start_list);
        box.appendChild(end_list);
        box.appendChild(btn);

        let title = document.createElement('H3');
        title.textContent = 'За выбранный период';
        title.classList.add('user-toolbar-title');
        box.insertBefore(title, box.firstChild);

        input_box.insertBefore(box, input_box.lastChild);

        return {
            'box': box,
            'start_list': start_list,
            'end_list': end_list,
            'btn': btn
        }
    };

    let timelist = createTimeList(workers, rows);

    let $timelist = createTimeListView(timelist);

    $timelist.classList.add('user-toolbar__item');

    //добавляем строку с общим временем всех сотрудников
    //третий параметр true - ставит класс-маркер выбранных работников
    insertTotalTime($timelist, timelist, true);

    // добавляем клик по строке для подсчета времени выбранных работников
    $timelist.addEventListener('click', function (e) {
        if(!e.target.classList.contains('time-list-total')){
            countSelectedWorkersTime(this, e);
        }
    });

    let $title = document.createElement('H3');
    $title.textContent = 'Вся задача';
    $title.classList.add('user-toolbar-title');
    $timelist.insertBefore($title, $timelist.firstChild);
    $timelist.classList.add('user-toolbar__item');

    let date_lists = createDatesList($input_box, dates_arr);

    // добавляю селекты с датами - подсчет времени за выбранный период
    findTimeInDatesRange(date_lists, workers, rows);

    $input_box.insertBefore($timelist, $input_box.lastChild);

    //http://stackoverflow.com/questions/2558977/ajax-cross-domain-call

    if (NODE_ENV === 'development') {
        console.info('load countWorkerTime');
    }
}

// создание объекта со списком сотруднков и времени каждого в задаче
function createTimeList(workers, rows) {

    let ntime, name, tsum;
    let timelist = {};

    for (let s = 0; s < workers.length; s++) {
        tsum = 0;

        for (let i = 0; i < rows.length; i++) {
            ntime = require('./_finders').getRowTimeString(rows[i]);

            if (rows[i].children[4]) {
                //до запуска cammentsDesign();
                name = rows[i].children[4].textContent;
            } else {
                //после запуска cammentsDesign();
                name = rows[i].querySelector('.comment-author').textContent;
            }

            if (workers[s] === name) {
                tsum += ntime;
                timelist[name] = tsum;
            }
        }
    }

    return timelist;
}

// создание html элемента со списком сотруднков и времени каждого в задаче
function createTimeListView(data) {
    let $timelist = document.createElement('DIV');
    $timelist.classList.add('time-list');
    $timelist.id = 'workers-time';

    let list_item;
    let workertime;
    let totaltime = 0;

    for (let k in data) {
        workertime = data[k];
        totaltime += workertime;
        list_item = document.createElement('p');
        list_item.dataset.workertime = workertime;
        list_item.innerHTML = '<span>' + k + '</span> <span>' + workertime + '</span>';
        $timelist.insertBefore(list_item, $timelist.lastChild);
    }

    return $timelist;
}

function findTimeInDatesRange(lists, workers, rows) {
    let $start_list = lists.start_list;
    let $end_list = lists.end_list;
    let $box = lists.box;
    let $btn = lists.btn;

    function findRowsInRange(rows, start, end) {

        return rows.filter(function (item) {
            let item_date = require('./_utils').getRowDateString(item);

            if (item_date >= start && item_date <= end) {
                return item;
            }
        });
    }

    $btn.addEventListener('click', function () {

        let find_rows = findRowsInRange(rows, $start_list.value, $end_list.value);

        let range_timelist = createTimeList(getSelectedWorkers(), find_rows);
        let $range_timelist = createTimeListView(range_timelist);

        if ($box.querySelector('#range-timelist')) {
            $box.removeChild(document.getElementById('range-timelist'));
        }

        $range_timelist.setAttribute('id', 'range-timelist');

        $box.appendChild($range_timelist);

        insertTotalTime($range_timelist, range_timelist);
    });
}

function getSelectedWorkers() {
    let selected_workers = document.getElementById('workers-time').querySelectorAll('.selected');
    let selected_names = [];

    for (let i = 0; i < selected_workers.length; i++) {
        selected_names.push(selected_workers[i].firstElementChild.textContent);
    }

    return selected_names;
}

//подсчет времени выбранных участников задачи (из списка всех участников)
function countSelectedWorkersTime(list, event) {
    let target = event.target;
    let $total = document.getElementById('workers-time-total');
    let total = parseInt($total.dataset.totaltime);

    while (target != list) {
        if (target.tagName == 'P') {
            recountTotal(target, $total, total);
            return;
        }

        target = target.parentNode;
    }

    function recountTotal(elem, total, totaltime) {
        let elemtime = parseInt(elem.dataset.workertime);

        //класс excluded нужен для фильтрации списка работников
        //в выводе времни за период - вывод только по выбранным (selected) работникам
        if (elem.classList.contains('selected')) {
            elem.classList.remove('selected');
            elem.classList.add('excluded');
            totaltime = totaltime - elemtime;
        } else {
            elem.classList.add('selected');
            elem.classList.remove('excluded');
            totaltime = totaltime + elemtime;
        }

        total.innerHTML = totaltime;
        total.dataset.totaltime = totaltime;
    }
}

// подсчет общего времени всех сотрудников для списка сотрудник-время
function insertTotalTime(timelist, data, addmarker) {
    let totaltime = 0;
    let total = document.createElement('p');

    for (let k in data) {
        totaltime += data[k];
    }

    if (addmarker) {
        let list_items = timelist.querySelectorAll('p');
        //по умолчанию все работники выбраны, считается общее время по всем
        //всем добавляем класс selected нужный для фильтрации списка
        //и чтобы визуально отметить выбранных в списке
        for (let i = 0; i < list_items.length; i++) {
            list_items[i].classList.add('selected');
        }
    }

    total.innerHTML = '<span>Всего:</span> <span id="workers-time-total" data-totaltime="' + totaltime + '">' + totaltime + '</span>';
    total.classList.add('time-list-total');
    timelist.appendChild(total);

    return totaltime;
}

export {countWorkerTime};