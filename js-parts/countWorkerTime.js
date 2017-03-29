

//подсчет общего времени в задаче для каждого исполнителя
modules.countWorkerTime = function () {
    'use strict';
    var $input_box = document.getElementById('user-toolbar');
    var rows = getAllCommentsRows();
    var workers = getAllWorkers();
    var dates_collection = [];
    var date_str;

    for (var i = 0; i < rows.length; i++) {
        date_str = rows[i].children[3].textContent;
        date_str = date_str.split(' ');
        dates_collection.push(createISODate(date_str[0]));
    }

    var dates_arr = eliminateDuplicates(dates_collection);

    var createDatesList = function (input_box, dates) {

        function createList(css_id, css_class) {
            var list = document.createElement('SELECT');
            list.setAttribute('id', css_id);
            list.classList.add(css_class);
            return list;
        }

        var box = document.createElement('DIV');
        box.classList.add('user-toolbar__item');

        var start_list = createList('date-start-list', 'dates-list');

        var end_list = createList('date-end-list', 'dates-list');

        var btn = document.createElement('BUTTON');
        btn.setAttribute('type', 'button');
        btn.textContent = 'Посчитать';

        var option, cln_option, listdate;

        for (var i = 0; i < dates.length; i++) {
            listdate = dateFormatter(parseInt(dates[i], 10));
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

        var title = document.createElement('H3');
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

    var timelist = createTimeList(workers, rows);

    var $timelist = createTimeListView(timelist);

    $timelist.classList.add('user-toolbar__item');

    //добавляем строку с общим временм всех сотрудников
    //третий параметр true - ставит класс-маркер выбранных работников
    insertTotalTime($timelist, timelist, true);

    // добавляем клик по строке для подсчета времени выбранных работников
    $timelist.addEventListener('click', function (e) {
        countSelectedWorkersTime(this, e);
    });

    var $title = document.createElement('H3');
    $title.textContent = 'Вся задача';
    $title.classList.add('user-toolbar-title');
    $timelist.insertBefore($title, $timelist.firstChild);
    $timelist.classList.add('user-toolbar__item');

    var date_lists = createDatesList($input_box, dates_arr);

    // добавляю селекты с датами - подсчет времени за выбранный период
    findTimeInDatesRange(date_lists, workers, rows);

    $input_box.insertBefore($timelist, $input_box.lastChild);

    //http://stackoverflow.com/questions/2558977/ajax-cross-domain-call

    console.info('load countWorkerTime');
};