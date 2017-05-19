'use strict';

// ==UserScript==
// @name DartIT tracker-tweaker revo
// @updateURL https://github.com/a-mann/alamics-tracker/raw/master/dart-support.user.js
// @downloadURL https://github.com/a-mann/alamics-tracker/raw/master/dart-support.user.js
// @description индивидуальные настройки для support.dartit.ru, support.alamics.ru;
// @include https://support.dartit.ru/*
// @include https://support.alamics.ru/*
// @require https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.3.1/markdown-it.min.js
// @grant unsafeWindow
// @author mann
// @license MIT
// @version 1.4.8
// ==/UserScript==

console.info('start userscript');

(function () {
    // [2] нормализуем window
    var w = window;


    //добавим новые стили
    var custom_css = '.onoff-opt{margin:0 6px 0 10px}.none{display:none!important}.hidden-elem{position:fixed!important;left:-999em;z-index:-1;visibility:hidden}.none.view{display:block!important}.ch_addr{margin:10px 10px 10px 0;vertical-align:top}.totop>input{margin:10px 0 0}.label_head{display:block;margin:0 0 20px}.clearfix:after,.clearfix:before{content:"";display:table;clear:both}.alist{float:right}.alist p{margin:0 0 10px;line-height:1;text-align:right}.bar-wrap{padding:8px 15px;background:#2d2d2d}#custom-project-list>li,#custom-workers-list>li{width:20%;float:left;cursor:pointer}#custom-project-list>li:first-child{display:none}.user-list{margin:2em 1em;padding:0;list-style-position:inside}.user-list>li{line-height:1.5}.selected{color:green}.btn-flat{padding:.5em;background:#f0f0f0;cursor:pointer}.btn-flat,.row-item{display:inline-block}.row-item{vertical-align:top}.row-item:not(:last-child){margin-right:1em}#settings-btn{margin:0 0 20px}#settings-box{display:none;margin:20px 0;padding:20px 0;outline:1px solid #414141}#settings-box.is-open{display:block}.user-title{color:#000;margin:0 0 .6em;font-size:20px;padding:0}.regular-link{color:#0054b9;outline:0!important}.time-list p{margin:5px 0;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.time-list>p>span:first-child{padding-right:1em;cursor:pointer}:root .time-list-total{margin-top:1em;border-top:1px solid}.comment-collapsed{max-height:70px;overflow:hidden!important}.long-comment{width:100%!important;position:relative;padding-top:30px}.btn-collapse{position:absolute;top:0;right:0}.btn-collapse-all{position:fixed;top:10px;right:10px}:root .dates-list{width:150px;display:inline-block;margin:0 20px 0 0}.user-toolbar{margin:20px 0;padding:20px 10px;border-top:1px solid rgba(0,0,0,.7);overflow:hidden;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.user-toolbar__item{padding:10px 15px;background:hsla(0,0%,100%,.6);box-shadow:0 1px 1px rgba(0,0,0,.6)}:root .user-toolbar-title{margin:0 0 1em;padding:0;color:#000}:root #comments-tbl .comment-wrap{font-size:14px;width:100%!important;max-width:800px;overflow:hidden}:root #comments-tbl h1{font-size:120%;font-weight:400;margin:0 0 .4em;color:inherit}:root #comments-tbl blockquote{padding:10px 20px;margin:0 0 20px;border-left:5px solid #ccc}:root #comments-tbl blockquote p{margin:0}:root #comments-tbl blockquote p:not(:last-child){margin-bottom:1em}:root #comments-tbl ul{padding-left:.6em;list-style-position:inside}.section-title{color:inherit;margin:0 0 1em;padding:0!important}.s-info{color:gray;font-size:12px}.btn-insert-ls{position:absolute;top:100%;right:2em;transition:transform .3s}.btn-insert-ls.is-visible{transform:translateY(-150%)}.add-alert{width:24px;height:24px;display:inline-block;background-image:url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+ICAgIDxwYXRoIGQ9Ik0xMC4wMSAyMS4wMWMwIDEuMS44OSAxLjk5IDEuOTkgMS45OXMxLjk5LS44OSAxLjk5LTEuOTloLTMuOTh6bTguODctNC4xOVYxMWMwLTMuMjUtMi4yNS01Ljk3LTUuMjktNi42OXYtLjcyQzEzLjU5IDIuNzEgMTIuODggMiAxMiAycy0xLjU5LjcxLTEuNTkgMS41OXYuNzJDNy4zNyA1LjAzIDUuMTIgNy43NSA1LjEyIDExdjUuODJMMyAxOC45NFYyMGgxOHYtMS4wNmwtMi4xMi0yLjEyek0xNiAxMy4wMWgtM3YzaC0ydi0zSDhWMTFoM1Y4aDJ2M2gzdjIuMDF6Ii8+PC9zdmc+);cursor:pointer}#task-title .add-alert{vertical-align:middle;opacity:.5}#task-title .add-alert.selected{opacity:1}';

    addcss(custom_css);

    var action_page = getURLAction();

    //объект элементами которого будут функции
    //реализующие функционал модулей
    var modules = {};

    //сюда добаляются элементы страницы в которые вставляются созданые скриптом блоки
    //и.или они модифицируются скриптом

    function addPageElems() {
        let $content_cell = document.querySelector('form[name="theForm"]');
        $content_cell.setAttribute('id', 'main-content');

        let $comments_tbl = $content_cell.getElementsByTagName("TABLE")[0];

        if($comments_tbl){
            $comments_tbl.setAttribute('id', 'comments-tbl');

            let rows = getAllCommentsRows();

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
        let taskTite = document.querySelector('h1');
        taskTite.id = 'task-title';
    }


/* Begin: js-parts\userSettings.js */


// добавление на страницу новой задачи блока настроек пользователя

modules.userSettings = function () {

    // let fixel = document.getElementById("exp_col");
    // if(!fixel){
    //     document.createElement('template');
    //     document.body.appendChild(fixel);
    // }
    'use strict';
    //добавление/удаление выбранных проектов в пользовательском списке
    //сохранение в localStorage и скрыть показать в select на странице
    let $content_cell = document.querySelector('form[name="theForm"]');

    //создание блока в котором будут все элементы управления настройками
    let $user_settings_box = document.createElement('div');
    $user_settings_box.id = 'settings-box';
    $content_cell.insertBefore($user_settings_box, $content_cell.firstChild);

    //создание кнопки показать/скрыть пользовательские настройки
    let $settings_btn = document.createElement('button');
    $settings_btn.innerHTML = 'Показать/скрыть пользовательские настройки';
    $settings_btn.id = 'settings-btn';
    $settings_btn.type = 'button';

    $settings_btn.addEventListener('click', function () {
        $user_settings_box.classList.toggle('is-open');
    });

    $content_cell.insertBefore($settings_btn, $content_cell.firstChild);
    console.log(0);
    //создание кастомного списка проектов
    //id`s array
    function createTaskListHTML() {
        if(!localStorage.getItem('params_user_projects')){
            localStorage.setItem('params_user_projects', JSON.stringify([]));
        }

        let params_user_projects = JSON.parse(localStorage.getItem('params_user_projects'));

        const PROJECTS_LIST_PARAMS = {
            'id': 'custom-project-list',
            'title': 'Собственный список проектов',
            'source': 'project_id',
            'storage': params_user_projects,
            'storage_name': 'params_user_projects'
        };

        let $custom_projects_list = createInsertWorkersProjectsLists(PROJECTS_LIST_PARAMS);

        $user_settings_box.insertBefore($custom_projects_list, $user_settings_box.firstChild);

        highlightSelected($custom_projects_list, params_user_projects);
    }

    //создание кастомного списка исполнителей
    //id`s array
    function createWorkersListHTML() {
        if(!localStorage.getItem('params_user_workers')){
            localStorage.setItem('params_user_workers', JSON.stringify([]));
        }

        let params_user_workers = JSON.parse(localStorage.getItem('params_user_workers'));

        const WORKERS_LIST_PARAMS = {
            'id': 'custom-workers-list',
            'title': 'Собственный список исполнителей',
            'source': 'internal_worker',
            'storage': params_user_workers,
            'storage_name': 'params_user_workers'
        };

        let $custom_workers_list = createInsertWorkersProjectsLists(WORKERS_LIST_PARAMS);

        $user_settings_box.insertBefore($custom_workers_list, $user_settings_box.firstChild);

        highlightSelected($custom_workers_list, params_user_workers);
    }

    // подсветка сохраненных в настройках элементов списка
    function highlightSelected(list, settings) {
        if (!settings.length) {
            console.log('no');
            return false;
        }

        let node;

        Object.keys(list.childNodes).forEach(function (key) {
            node = list.childNodes[key];
            if (settings.indexOf(node.dataset.id) >= 0) {
                node.classList.add('selected');
            }
        });
    }

    // добавление кнопок включения/отключения разных модулей
    let optionsBlock = document.createElement('div');
    optionsBlock.classList.add('user-list');

    let settings_title = document.createElement('h2');
    settings_title.textContent = 'Опции';
    settings_title.classList.add('user-title');

    optionsBlock.appendChild(settings_title);

    //добавление настройки - вкл/выкл генерации блока с подсчетом времени участников задачи
    let countTimeBtn =  document.createElement('span');
    countTimeBtn.id = 'countTimeBtn';
    countTimeBtn.classList.add('btn-flat','row-item');
    countTimeBtn.textContent = 'Подсчет времени в задаче - Включен';

    if(!localStorage.getItem('worker-time-count')){
        localStorage.setItem('worker-time-count', 'true');
    }

    countTimeBtn.addEventListener('click',function () {
       this.classList.toggle('selected');

       if(this.classList.contains('selected')){
           this.textContent = 'Подсчет времени в задаче - Включен';
           localStorage.setItem('worker-time-count', 'true');
       }else{
           this.textContent = 'Подсчет времени в задаче - Выключен';
           localStorage.setItem('worker-time-count','false');
       }
    });

    //включить/отключить генерацию блока с подсчетов времени участников задачи
    function checkTimeCountOption() {
        let btn = document.getElementById('countTimeBtn');

        if(localStorage.getItem('worker-time-count') === 'true'){
            btn.textContent = 'Подсчет времени в задаче - Включен';
            btn.classList.add('selected');
        }else{
            btn.textContent = 'Подсчет времени в задаче - Выключен';
            btn.classList.remove('selected');
        }
    }

    /*//добавление настройки - вкл/выкл уведомлений о новом комментарии в задаче
    let commentsUpdateBtn =  document.createElement('span');
    commentsUpdateBtn.id = 'commentsUpdateBtn';
    commentsUpdateBtn.classList.add('btn-flat','row-item');
    commentsUpdateBtn.textContent = 'Уведомления о новых комментариях - Включены';

    commentsUpdateBtn.addEventListener('click',function () {
        this.classList.toggle('selected');

        if(this.classList.contains('selected')){
            this.textContent = 'Уведомления о новых комментариях - Включены';
            localStorage.setItem('comments-update', 'true');
        }else{
            this.textContent = 'Уведомления о новых комментариях - Выключены';
            localStorage.setItem('comments-update','false');
        }
    });

    //включить/отключить уведомления о новых комментраиях
    //на открытой странице задачи
    function checkCommentsUpdate() {
        let btn = document.getElementById('commentsUpdateBtn');

        if(localStorage.getItem('comments-update') === 'true'){
            btn.textContent = 'Уведомления о новых комментариях - Включены';
            btn.classList.add('selected');
        }else{
            btn.textContent = 'Уведомления о новых комментариях - Выключены';
            btn.classList.remove('selected');
        }
    }*/

    optionsBlock.appendChild(countTimeBtn);
    //optionsBlock.appendChild(commentsUpdateBtn);

    $user_settings_box.appendChild(optionsBlock);

    //запуск проверок включенных/отключенных опций
    checkTimeCountOption();
    //checkCommentsUpdate();


    createTaskListHTML();
    createWorkersListHTML();

    //console.info('load userSettings');
};/* End: js-parts\userSettings.js */
/* Begin: js-parts\elemsModification.js */


//изменение элементов на странице задачи
//в соответсвии с настройками пользователя
modules.elemsModification = function () {
    'use strict';
    let dart_workers_list = document.getElementById('internal_worker');

    //сравниваем список проектов с сохраненным в настройках
    //проекты которых нет в настройка скрываем
    this.modifyProjectList = function () {
        let params_user_projects = JSON.parse(localStorage.getItem('params_user_projects'));

        if (params_user_projects === null || !params_user_projects.length) {
            console.info('Нет собственного списка проектов');
            return false;
        }

        let dart_projects_list = document.getElementById('project_id') || document.getElementById('client_id');
        let options = dart_projects_list.options;

        modifySelectOptionsList(options, params_user_projects);
    };

    //сравниваем список исполнителей с сохраненным в настройках
    //исполнителей которых нет в настройка скрываем
    this.modifyWorkersList = function () {

        let params_user_workers = JSON.parse(localStorage.getItem('params_user_workers'));

        if (params_user_workers === null) {
            console.info('Нет собственного списка сотрудников');
            params_user_workers = [];
        }

        //let dart_workers_list = document.getElementById('internal_worker');

        let options = dart_workers_list.options; //список всех сотрудников из селекта на странице

        //если пользовательский список сотрудников не пуст
        //и если в задаче участвует сотрудник которого нет в списке оставляю его открытым
        if (params_user_workers.length) {
            //получаю список всех участников задачи
            let task_workers = getAllWorkers();
            let task_workers_id = [];

            //сравнение списков, если работника нет в списке из настроек пользователя - добавляю
            //сначала нужно получить соответсвие имя сотрудника -> option.value т.е. логин сотрудника на англицком
            for (let i = 0; i < options.length; i++) {
                let if_find = findInArray(task_workers, options[i].text);

                if (if_find > -1) {
                    task_workers_id.push(options[i].value)
                }
            }

            //затем сравнить со списком из настроек
            //и добавить работника если его нет в списке
            for (let i = 0; i < task_workers_id.length; i++) {
                let if_find = findInArray(params_user_workers, task_workers_id[i]);

                if (if_find < 0) {
                    params_user_workers.push(task_workers_id[i]);
                    //console.info('В список добавлен '+ task_workers[i]);
                }
            }

            modifySelectOptionsList(options, params_user_workers);
        }
    };

    //в списке исполнителей отмечаю selected работника оставившего последний комментрий в задаче
    this.setSelectedInWorkersList = function () {
        var last_row = getAllCommentsRows();
        last_row = last_row[last_row.length - 1];
        var last_worker = last_row.children[4].textContent;

        for (var i = 0; i < dart_workers_list.options.length; i++) {
            if (last_worker === dart_workers_list.options[i].text) {
                dart_workers_list.options[i].setAttribute('selected', '');
                //fireEvent нужен чтобы вызвать повешенную на событие функцию
                //в которой добавляется работник в список для рассылки с задачи
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('change', false, true);
                dart_workers_list.dispatchEvent(evt);
            }
        }

    };

    if (document.getElementById('internal_worker')) {
        this.modifyWorkersList();
        this.setSelectedInWorkersList();
    }

    if (document.getElementById('project_id') || document.getElementById('client_id')) {
        this.modifyProjectList();
    }

    // поле ввода id задачи и переход к задаче

    let goToField = document.getElementById('goTo');
    goToField.removeAttribute('style');

    //console.info('load elemsModification');
};/* End: js-parts\elemsModification.js */
/* Begin: js-parts\modyfiComments.js */


//поиск ссылок в тексте комментариев и оборачивание их в <a>
//сворачивание длинных комментариев, добавление кнопки Свренуть.развернуть все
modules.modyfiComments = function () {
    'use strict';
    function replaceURLWithHTMLLinks(text) {
        const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(exp, '<a href="$1" class="regular-link">$1</a>');
    }

    let $content_cell = document.getElementById('main-content');
    let div, txt;
    let rows = getAllCommentsRows();
    let collapse_btn;
    let collapse_btns = [];

    addjs('https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.3.1/markdown-it.min.js', function () {
        goMarkdown(rows);
    });

    for (let i = 0; i < rows.length; i++) {
        div = getCommentFromRow(rows[i]);
        txt = replaceURLWithHTMLLinks(div.innerHTML);
        div.innerHTML = txt;
    }

    //парсер markdown
    function goMarkdown(rows) {

        let md = markdownit();
        md.options.html = true;
        md.options.linkify = true;
        md.options.typographer = true;
        md.options.breaks = true;

        rows.map(function (row) {
            addMarkdown(row, md)
        });

        function addMarkdown(row, md) {
            let comment = getCommentFromRow(row);
            let blocks = comment.innerHTML.split('<br><br>');

            blocks = blocks.map(function (item) {
                if (item.indexOf('<br>') > -1) {
                    item = item.split('<br>');
                    item = item.map(function (str) {
                        return str.trim();
                    });

                    item = concatElemsToString(item, '*');
                    item = concatElemsToString(item, '&');

                    item = item.map(function (str) {
                        return renderMdString(str, md)
                    });

                    item = item.join('');
                } else {
                    item = replaceHtmlGtToSymbol(item.trim());
                    item = renderMdString(item, md);
                }

                return '<p>'+item+'</p>';
            });

            comment.innerHTML = blocks.join('');
        }

        function renderMdString(str,md) {
            let mdc = ['#', '*', '-', '>'];

            if (mdc.indexOf(str.charAt(0)) > -1) {
                str = md.render(str);
            }else{
                //+'<br>' нужно чтобы было похоже на исходное форматирование
                str = str+'<br>';
            }

            return str;
        }
    }

    //поиск и объединение в одну строку элементов массива
    //начинающихся с символа *
    //для создания списка ul>li в markdown
    function concatElemsToString(arr, symbol) {
        let next;
        let strings = [];
        let newlist = '';

        for (let i = 0; i < arr.length; i++) {
            next = i + 1;

            if (arr[i].charAt(0) === symbol && arr[next] && arr[next].charAt(0) === symbol) {
                newlist += preformatString(arr[i], symbol);
            } else if (!arr[next] || arr[next].charAt(0) !== symbol) {
                newlist += preformatString(arr[i], symbol);
                strings.push(newlist);
                newlist = '';
            } else {
                strings.push(arr[i]);
                // strings.push(preformatString(arr[i]));
            }
        }

        return strings;
    }

    //обработка строк перед форматированием в markdown
    function replaceHtmlGtToSymbol(text) {
        let find = '&gt;';
        let re = new RegExp(find, 'g');
        return text.replace(re, '>');
    }

    function preformatString(str, symbol = '|') {

        let space = '';
        //для списка надо с новой строки
        switch (symbol) {
            case '*':
                space = '\n';
                break;
            //а в цитате - в одну строку
            case '&':
                space = ' ';
                str = replaceHtmlGtToSymbol(str);
                break;
            default:
                console.log(symbol);
                //console.log((str.match(/\n/g)||[]).length);
                //str = str.replace(/\n/g, '<br>');
                //console.log(str);
                str = '<p>' + str + '</p>'
        }

        return str + space;
    }

    //console.info('load modyfiComments');
};
/* End: js-parts\modyfiComments.js */
/* Begin: js-parts\countWorkerTime.js */


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

    //добавляем строку с общим временем всех сотрудников
    //третий параметр true - ставит класс-маркер выбранных работников
    insertTotalTime($timelist, timelist, true);

    // добавляем клик по строке для подсчета времени выбранных работников
    $timelist.addEventListener('click', function (e) {
        if(!e.target.classList.contains('time-list-total')){
            countSelectedWorkersTime(this, e);
        }
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

    //console.info('load countWorkerTime');
};/* End: js-parts\countWorkerTime.js */
/* Begin: js-parts\calculateElapsedTime.js */


//калькулятор в поле ввода затраченного времени
modules.calculateElapsedTime = function () {
    'use strict';
    var timeElapsedField = document.getElementById('spended_time');

    // Удаление обработчика нажатия клавиш для поля 'spended_time'
    timeElapsedField.onkeyup = null;

    // Добавление события для вычисления затраченного времени для поля 'spended_time'
    timeElapsedField.addEventListener('change', function () {
        var cur_value = this.value;

        try {
            cur_value = eval(cur_value);
        } catch (e) {
            alert("Ошибка вычисления затраченного времени. Используйте числа и знаки «+», «-», «*», «/» и скобки");

            cur_value = null;
        } finally {
            if ((cur_value !== null) && (!isNaN(cur_value))) {

                cur_value = Math.round(cur_value);

                if (cur_value <= 0) {
                    alert("Отрицательное или нулевое значение времени");
                    cur_value = null;
                }
            }
            this.value = cur_value;
            minToDays(cur_value);
        }
    });

    //console.info('load calculateElapsedTime');
};/* End: js-parts\calculateElapsedTime.js */
/* Begin: js-parts\saveNewComment.js */


//Сохранение комментария в localStorage
//на случай внезапного звершения сессии
modules.saveNewComment = function () {
    'use strict';

    let $field = document.getElementById('text');
    let wrap = document.getElementById('tarea-wrap');

    let task_id = getTaskId();

    //добавлю кнопку для вставки сохраненного текста
    let btn = document.createElement('BUTTON');
    btn.setAttribute('type', 'button');
    btn.classList.add('btn-insert-ls');
    btn.id ='btn-insert-ls';
    btn.innerHTML = 'Вставить из LS';
    btn.classList.add('none'); //по умолчанию скрыта

    wrap.appendChild(btn);

    //если есть сохраненный текст - показать кнопку
    showPasteBtn(btn, task_id);

    //вставить текст по клику
    btn.addEventListener('click', function (e) {
        $field.value = localStorage.getItem('task' + task_id);
        e.preventDefault();
    });

    //Сохранить текст из поля при наборе или потере фокуса
    $field.addEventListener('keyup', saveTaskComment);

    //если есть сохраненный текст - показать кнопку
    $field.addEventListener('blur', function () {
        showPasteBtn(btn, task_id);
    });

    wrap.addEventListener('mouseenter',function () {
        btn.classList.add('is-visible');
    });

    wrap.addEventListener('mouseleave',function () {
        btn.classList.remove('is-visible');
    });

    function saveTaskComment() {
        localStorage.setItem('task' + task_id, this.value);
    }

    function showPasteBtn(button, id) {
        if (localStorage.getItem('task' + id) !== '' && localStorage.getItem('task' + id) !== null) {
            button.classList.remove('none');
        }
    }

    //console.info('load saveNewComment');
};/* End: js-parts\saveNewComment.js */
/* Begin: js-parts\copyPasteCommentQuote.js */


//выделение текста в каменте и вставка оформленная как цитата для markdown
modules.copyPasteCommentQuote = function () {
    'use strict';
    let rows = getAllCommentsRows();

    rows.map(function (row) {
        let camment = getCommentFromRow(row);

        camment.addEventListener('mouseup', function () {
            let selection = w.getSelection();

            localStorage.setItem('selection',selection);
        })

    });

    let editor = document.getElementById('text');

    function formatAndInsetCommentQuote(elem) {
        if(localStorage.getItem('selection')){
            let startPos = elem.selectionStart;
            let endPos = elem.selectionEnd;

            let selection = localStorage.getItem('selection');

            let strings = selection.split('\n');

            strings = strings.map(function (str) {
                 return '> '+str;
            });

            selection = strings.join('');

            // selection = '\n'+selection+'\n';

            elem.value = elem.value.substring(0, startPos)
                + selection
                + elem.value.substring(endPos, elem.value.length);

            localStorage.removeItem('selection');
        }
    }

    runOnKeys(
        function() {
            if(document.activeElement === editor){
                formatAndInsetCommentQuote(editor)
            }
        },
        editor
        ,
        "16",
        "17",
        "V".charCodeAt(0)
    );

    //console.info('load copyPasteCommentQuote');
};/* End: js-parts\copyPasteCommentQuote.js */
/* Begin: js-parts\cammentsDesign.js */


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
    //т.к. в дарте добавили строк предыдущая строка не скрывает строку с заголовками столбцов
    //поэтому еще
    tbl.querySelector('tr').classList.add('hidden-elem');

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

                if(pics.indexOf(ext.toLowerCase()) > -1){
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
        //rows[4].appendChild(create5row(td));

        //становится видимой при наведении курсора на карточку камента
        block.addEventListener('mouseenter', function () {
            showActionsBtn(this);
        });

        block.addEventListener('mouseleave', function () {
            showActionsBtn(this);
        });

        td.map(function (tditem) {
            if(tditem){
                item.removeChild(tditem);
            }
        });
    });

    let cammentsDesignCSS = '#comments-tbl{margin:auto;padding:3em 0;background:#f0f0f0}#comments-tbl,#comments-tbl tbody,#comments-tbl tr{display:block}#comments-tbl tr:not(:last-child){margin-bottom:2em}.b-comment{max-width:720px;margin:auto;background:#fafafa;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);width:100%;font-size:12px;position:relative;box-sizing:border-box}.b-comment_notify{margin-top:2em;padding:2em;color:#31708f;background:#d9edf7;border:1px solid #bce8f1}.b-comment_notify .comments-update-link{display:inline-block;padding-left:1em;color:inherit}.comment-body{width:100%}.comment-wrap p{line-height:1.4}.comment-wrap p:first-child{margin-top:0}.comment-wrap p:last-child{margin-bottom:0}.comment-wrap p:only-of-type{margin:0}.b-comment__row{padding:1em 2em;display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;position:relative}.b-comment__row:first-child{padding-top:2em}.b-comment__row:first-child .row-right{top:2em}.b-comment__row:last-child{padding-bottom:2em}.b-comment__row_0{color:gray}.task-rank,.task-status{padding:0 .5em 0 2em}.deadline-date{padding-left:1em}.id-checkbox{position:absolute;visibility:hidden;z-index:-1}.comment-link,.comment-no{margin-right:0!important}.b-comment__row.b-comment__row_1{padding-top:0;-ms-flex-pack:justify;justify-content:space-between;color:gray}.comment-info>span{display:inline-block;vertical-align:top}.comment-author{padding-right:2em;position:relative}.comment-author:after{content:"→";position:relative;left:1em}.b-comment__row_2{font-size:14px;background:#fff;border-top:1px solid hsla(0,0%,63%,.2);border-bottom:1px solid hsla(0,0%,63%,.2);position:relative;overflow:hidden}.actions-btn-wrap{padding:1em;position:absolute;top:100%;right:0;transition:transform .3s}.actions-btn-wrap.is-visible{transform:translateY(-100%)}.btn-del-comment,.btn-edit-comment{display:inline-block;vertical-align:middle;height:24px;line-height:24px;position:relative;z-index:1}.btn-edit-comment{margin-left:.5em;top:3px}.btn-del-comment{width:70px}.btn-del-comment:after{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:-1;content:"Удалить";color:#ccc;line-height:normal;border-bottom:1px solid}.btn-del-comment img{display:none}.btn-del-comment a{width:100%;height:100%;position:absolute}.b-comment__row.b-comment__row_3{padding-top:1.5em;padding-bottom:1.5em;-ms-flex-align:start;align-items:flex-start}.b-comment__row_3+.b-comment__row_4{border-top:1px solid hsla(0,0%,63%,.2)}.b-comment__row.b-comment__row_4{-ms-flex-pack:end;justify-content:flex-end}.row-right{position:absolute;top:1em;right:2em}.row-right>*{display:inline-block;vertical-align:middle}.row-right>:not(:last-child){margin-right:.7em}.img-thumb{max-width:150px}.img-thumb img:first-child{display:none}.img-thumb>a{display:block}.img-thumb .attach-title{margin-top:.3em}.thumb-pic{width:100%;object-fit:cover;max-height:200px;border:1px solid #ccc}.large-pic-preview{max-width:40vw;border:1px solid gray;position:absolute;top:90%;left:0;z-index:1}.doc-thumb{max-width:150px;background:#f3f3f3;font-size:11px;border:1px solid #ccc;text-align:center;text-decoration:none;color:inherit}.doc-thumb .attach-title{width:100%;padding:0 .5em;line-height:1.6;word-break:break-all;box-sizing:border-box;position:absolute;top:50%;transform:translateY(-50%)}.file-thumb{-ms-flex:1 1 25%;flex:1 1 25%;min-height:70px;position:relative}.file-thumb:nth-child(n+7){margin-top:2em}.file-thumb:not(:last-child){margin-right:1em}.attach-title{max-width:150px;text-align:center;line-height:normal;word-break:break-all}#comments-tbl tr:last-child .b-comment__row_0,#comments-tbl tr:last-child .b-comment__row_1{color:#000}';

    addcss(cammentsDesignCSS);

    function create1row(td, rownumber) {
        let fragment = document.createDocumentFragment();

        let rowItemProto = document.createElement('div');

        let rowItem = rowItemProto.cloneNode(true);

        //дата
        rowItem.classList.add('comment-date');
        rowItem.id = 'comment-date';
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
            rowItem.innerHTML = rowItem.innerHTML + '.<b class="deadline-date">Сдать '+deadline+'</b>';
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

        /*timeStr[0] = createTimeTitleString(timeStr[0], ['Затрачена', 'Затрачено', 'Затрачено'])+
            ' '+ createTimeString(timeStr[0], ['минута', 'минуты', 'минут']);*/

        timeStr[0] = '<span class="elapsed-time">'+timeStr[0] + ' мин.</span>';
        workTime.innerHTML = timeStr[0];

        // if (isNaN(Number(timeStr[1]))) {
        //     workTime.innerHTML = timeStr[0];
        // }else{
        //     timeStr[1] = ' из '+timeStr[1];
        //     workTime.innerHTML = timeStr.join(' ');
        // }

        fragment.appendChild(workTime);

        return fragment;
    }

    function create3row(td) {

        let fragment = document.createDocumentFragment();

        let rowItemProto = document.createElement('div');

        //комментарий
        let rowItem = rowItemProto.cloneNode(true);
        rowItem.classList.add('comment-body');
        rowItem.appendChild(td[5].firstElementChild.cloneNode(true));

        fragment.appendChild(rowItem);

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

        wrap.addEventListener('mouseenter', function () {
            let bigpic = pic.cloneNode(false);
            bigpic.classList.add('large-pic-preview');
            bigpic.classList.remove('thumb-pic');
            this.appendChild(bigpic);
        });

        wrap.addEventListener('mouseleave', function () {
            this.removeChild(this.querySelector('.large-pic-preview'));
        });

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

        for (let i = 0; i < 4; i++) {
            blockRow = document.createElement('div');
            blockRow.classList.add('b-comment__row', 'b-comment__row_' + i);
            block.appendChild(blockRow)
        }

        wrap.appendChild(block);

        document.body.appendChild(wrap);

        return wrap;
    }

    function showActionsBtn(camment) {
        let btns = camment.querySelector('.actions-btn-wrap');
        btns.classList.toggle('is-visible');
    }

    //console.info('load cammentsDesign');
};/* End: js-parts\cammentsDesign.js */
/* Begin: js-parts\taskFooterDesign.js */
modules.taskFooterDesign = function () {
    'use strict';

//new comment
    let commentTbl = document.getElementById('tbl-new-comment');
    let newComment = document.getElementById('new-comment-wrap');

    // добавлю заголовок
    let newCommentTitle = document.createElement('h2');
    newCommentTitle.textContent = 'Новый комментарий';
    newCommentTitle.classList.add('section-title');
    newComment.insertBefore(newCommentTitle, newComment.firstElementChild);

    //1 первая строка - исполнитель, статус, приоритет
    //блок в котором будут поля для ввода затраченного и планируемого времени
    //и выбор приоритета

    let rowItemProto = document.createElement('div');
    let rowItem = rowItemProto.cloneNode(true);
    let fragment = document.createDocumentFragment();
    let rowsFragment = document.createDocumentFragment();

    //исполнитель
    let field = document.getElementById('internal_worker');
    let workerBlock = field.parentNode;
    workerBlock.classList.add('worker-block');
    fragment.appendChild(workerBlock);

    //статус
    let statusTbl = document.getElementById('tbl-status');
    let statusList = createStatusList(statusTbl);
    let block = createFieldAndLabel('Статус', statusList);
    block.classList.add('frow-col-2-1');

    fragment.appendChild(block);

    //приоритет
    field = document.getElementById('priority_id');
    block = createFieldAndLabel('Приоритет', field);
    field.classList.add('frow-col-2-2');
    fragment.appendChild(block);

    rowItem.classList.add('task-fields-row','task-row-1');
    rowItem.appendChild(fragment);
    rowsFragment.appendChild(rowItem);

    //2 вторая строка - время (затрачено/планируемо), проект, срок

    rowItem = rowItemProto.cloneNode(true);
    rowItem.classList.add('task-fields-row','task-row-2');

    let timeBlock = rowItemProto.cloneNode(true);
    timeBlock.classList.add('time-block');

    //затрачено времени
    field = document.getElementById('spended_time');
    block = createFieldAndLabel('Затрачено', field);
    timeBlock.appendChild(block);

    //планируемое время
    field = document.getElementById('plan_time');
    block = createFieldAndLabel('Планируемое', field);
    timeBlock.appendChild(block);

    fragment.appendChild(timeBlock);

    //проект
    field = document.getElementById('client_id');
    let project = createFieldAndLabel('Проект', field);
    project.classList.add('frow-col-2-1');
    fragment.appendChild(project);

    //срок
    let deadline = document.getElementById('end_date').parentNode;
    deadline.width = '';
    deadline.classList.add('deadline-calendar','frow-col-2-2');

    //убираю символ перевода строки
    deadline.removeChild(deadline.querySelector('script').nextSibling);

    //кнопку Х - очистить поле - убираю
    //deadline.removeChild(deadline.querySelector('input[type=button]'));
    fragment.appendChild(createFieldAndLabel('Срок', deadline));

    rowItem.classList.add('task-fields-row','task-row-2');
    rowItem.appendChild(fragment);
    rowsFragment.appendChild(rowItem);

    //3 третья строка - дополнительный емейл и тип задачи
    //дополнительный емейл
    rowItem = rowItemProto.cloneNode(true);
    rowItem.classList.add('task-fields-row','task-row-3');

    let sendList = document.getElementById('add_email');

    let addEmail = sendList.parentNode;
    addEmail.classList.add('add-email');

    let addEmailLabel = document.createElement('label');
    addEmailLabel.textContent = 'Получатели рассылки по почте';
    addEmail.insertBefore(addEmailLabel,addEmail.firstElementChild);

    let sendListBtn = document.getElementById('getEmailAddressesButton');
    sendListBtn.value = 'Кому письма';
    addEmail.appendChild(sendListBtn);

    fragment.appendChild(addEmail);

    //тип задачи
    let taskTypeBlock = document.getElementById('problem_type').parentNode;
    taskTypeBlock.classList.add('task-type');

    let taskTypeLabel = document.createElement('label');
    taskTypeLabel.textContent = 'Тип задачи';
    taskTypeBlock.insertBefore(taskTypeLabel,taskTypeBlock.firstElementChild);
    fragment.appendChild(taskTypeBlock);

    rowItem.appendChild(fragment);
    rowsFragment.appendChild(rowItem);

    //4 четвертая строка - добавление файлов
    rowItem = rowItemProto.cloneNode(true);
    rowItem.classList.add('task-fields-row','task-row-4');

    let existAddFile = document.getElementById('FileInputs');
    let addFilesBlock = existAddFile.parentNode;
    addFilesBlock.classList.add('add-files');

    let addFilesLabel = document.createElement('h2');
    addFilesLabel.classList.add('section-title');
    addFilesLabel.innerHTML = 'Файлы <span class="s-info">общий объем <span id="files-total">до 3 Мб</span></span>';
    //в id="files-total" будет заменятся текст когда файлы выбрны - общий объем выбранных файлов
    addFilesBlock.insertBefore(addFilesLabel,addFilesBlock.firstElementChild);

    //эту ссылку я скрою стилями
    // let addFileInput = addFilesBlock.querySelector('a');
    // addFileInput.setAttribute('onclick','addFileInput("FileInputs")');

    // addFileInput.addEventListener('click', function () {
    //     removeFileInput(existAddFile);
    // });

    //блок в котором будет список загруженных файлов
    let addedFilesList = document.createElement('ul');
    addedFilesList.id = 'files-list';
    addedFilesList.classList.add('files-list');
    addFilesBlock.insertBefore(addedFilesList,existAddFile);

    //обернуть существующий input file
    //сам input будет скрыт
    //и навесить вызов функции создающей новый инпут
    let defaultFileInput = document.getElementById('fileInput0');
    //атрибут onchange добавляю чтобы не копировать уже существующюю
    //в трекере функцию добаляния инпутов
    defaultFileInput.setAttribute('onchange','addFileInput("FileInputs")');
    defaultFileInput.addEventListener('change', function () {
        processFiles(this,addedFilesList);
        hideFilledFileInput(this);
    });
    existAddFile.appendChild(wrapFileInputs(defaultFileInput));

    let addFileObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {

            if(mutation.addedNodes[0].tagName.toLowerCase() === 'input'){
                let input = mutation.addedNodes[0];

                input.setAttribute('onchange','addFileInput("FileInputs")');
                input.addEventListener('change',function () {
                    processFiles(this,addedFilesList);
                    hideFilledFileInput(this);
                });

                //все новые input file нужно обернуть,
                //сам input будет скрыт
                let fakeInput = wrapFileInputs(input);
                mutation.target.appendChild(fakeInput);
            }
        });
    });

    let addFileObserverConfig = {
        attributes: false,
        childList: true,
        characterData: false
    };

    addFileObserver.observe(existAddFile, addFileObserverConfig);

    fragment.appendChild(addFilesBlock);
    rowItem.appendChild(fragment);
    rowsFragment.appendChild(rowItem);

    //5 пятая строка - кнопка Сохранить
    rowItem = rowItemProto.cloneNode(true);
    rowItem.classList.add('task-fields-row','task-row-5');

    let saveBtn = document.querySelector('input[name=submitButton]');
    saveBtn.classList.add('btn-action');

    fragment.appendChild(saveBtn);
    rowItem.appendChild(fragment);
    rowsFragment.appendChild(rowItem);

    //все собранное/перемещенное вставляю в блок
    newComment.appendChild(rowsFragment);

    //--тут навешиваю события на перемещенные элементы

    function hideFilledFileInput(input) {
        input.parentNode.classList.add('hidden-elem');
    }

    function processFiles(field, fileslist) {
        let file = field.files[0];
        let fileSize = file.size;


        if(!fileslist.dataset.total){
            fileslist.dataset.total = fileSize;
        }else{
            fileslist.dataset.total = parseInt(fileslist.dataset.total) + parseInt(fileSize);
        }

        let total = document.getElementById('files-total');
        total.textContent = bytesToSize(fileslist.dataset.total) + ' из 3 Мб';

        let p = document.createElement('li');
        p.innerHTML = file.name + '<span class="s-info">' + Math.ceil(fileSize / 1024) + ' Kb</span>';
        p.classList.add('file-list-item');

        let removeBtn = document.createElement('span');
        removeBtn.classList.add('btn-remove-item');
        removeBtn.dataset.fieldId = field.id;

        p.appendChild(removeBtn);

        fileslist.appendChild(p);

        removeBtn.addEventListener('click',function () {
            removeFileInput(this);
        });
    }

    //при выборе в списке доп.емайлов сразу вставлять в поле для отправки
    let emailList = document.getElementById('add_email_worker');
    let onPageEmailList = document.createElement('ul');
    onPageEmailList.classList.add('email-send-list');
    addEmail.insertBefore(onPageEmailList,addEmail.childNodes[2]);

    emailList.addEventListener('change', function () {
        addWorkerEmailToSendList(this,sendList,onPageEmailList);
    });

    //при выборе в селекте Статус переключаю радио, чтобы форма правильно работала
    statusList.addEventListener('change', function () {
        document.getElementById(this.value).checked = true;
    });

    //при загрузке страницы нужно смотреть выбранный радио со статусом (в скрытой части таблицы #task-footer)
    //и ставить статус в селекте statusList
    updateStatusListOnLoad(statusList);

    let footerDesignCSS = '#main-content{margin-bottom:0}#main-content br:last-child{display:none}.content{padding-bottom:0}#tbl-new-comment tbody,#tbl-new-comment td,#tbl-new-comment tr{display:block}#tbl-new-comment+br,#tbl-new-comment tr:first-child>td:first-child{display:none}#new-comment-wrap{max-width:720px;margin:auto}.tl{display:none}.tarea-wrap{position:relative;overflow:hidden}#text{width:100%;padding:.6em .8em;font-family:inherit;font-size:14px;border:0;box-sizing:border-box;box-shadow:inset 0 -2px 2px 0 rgba(0,0,0,.14),inset 0 1px 5px 0 rgba(0,0,0,.12),inset 0 3px 1px -2px rgba(0,0,0,.2)}.task-fields-row{max-width:720px;margin:1.6em auto}.task-fields-row label{margin:0 0 .5em;color:gray;display:inline-block}.task-fields-row input.input_field,.task-fields-row input[type=text],.task-fields-row select{width:auto;max-width:100%;height:2em;padding:.3em .6em;border:1px solid #9e9e9e;display:block;box-sizing:border-box}.task-fields-row input.input_field:focus,.task-fields-row input[type=text]:focus,.task-fields-row select:focus{border-color:#26a69a}.task-fields-row select{padding:.3em 0 .3em .2em}.task-fields-row td{padding:0;font-size:100%;display:block}.task-fields-row .frow-col-2-1{width:190px;margin-right:30px}.task-fields-row .frow-col-2-2{width:120px}.task-row-1{display:-ms-flexbox;display:flex}.worker-block{width:300px;margin-right:70px;-ms-flex:0 0 300px;flex:0 0 300px}.worker-block input[type=radio]{display:inline-block;vertical-align:middle;position:relative;top:-.2em}.worker-block select{width:100%;margin:.5em 0 0}.task-row-2,.task-row-2 .time-block{display:-ms-flexbox;display:flex}.task-row-2 .time-block{width:300px;margin-right:70px;-ms-flex:0 0 300px;flex:0 0 300px;-ms-flex-pack:justify;justify-content:space-between}.task-row-2 .time-block>div{width:120px}.task-row-2 .time-block>div input{width:76%;display:inline-block;vertical-align:middle}.task-row-2 .time-block>div:after{content:"мин";margin-left:.5em;display:inline-block;vertical-align:middle}:root .deadline-calendar{position:relative;padding:0!important;font-size:100%}:root .deadline-calendar>img,:root .deadline-calendar>input{display:inline-block;vertical-align:top;box-sizing:border-box}:root .deadline-calendar>input[type=text]{padding-right:30px}:root .deadline-calendar>img{position:absolute;top:.4em;right:.5em}:root .deadline-calendar input[type=button]{display:none}:root .deadline-calendar #end_date{width:auto!important}.task-row-3{display:-ms-flexbox;display:flex}.add-email{width:300px;margin-right:70px;-ms-flex:0 0 300px;flex:0 0 300px;position:relative}.add-email a{display:none}.add-email label{display:block}.add-email #add_email{position:absolute;visibility:hidden;z-index:auto}.add-email #add_email_worker{width:226px;display:inline-block;vertical-align:middle}.add-email #getEmailAddressesButton{display:none}.email-send-list{margin:.4em 0 .5em;padding:0;list-style-type:none}.email-send-list>li{margin:0;line-height:1}.email-send-list>li:before{content:"·";font-size:1.5em;margin-right:.2em;display:inline-block;vertical-align:middle}.email-send-list>li:after{content:"🞩";margin-left:.4em;color:red;display:inline-block;cursor:pointer}.task-type select{min-width:190px}.task-type>div select{margin-top:.3em}.task-type>div br{display:none}.add-files a{display:none}#FileInputs input:not(:first-child){margin-top:.3em;display:inline-block;vertical-align:middle}#FileInputs br{display:none}.btn-remove-item{width:12px;height:18px;margin-left:.3em;color:red;display:inline-block;vertical-align:middle;position:relative;cursor:pointer}.btn-remove-item:after{content:"🞩";position:absolute;top:0;left:0}.fake-file-input{width:225px;height:60px;border:1px dashed #82a5c3;background:#f4f6f8;text-align:center;border-radius:.5em;position:relative}.fake-file-input.is-hover{background:#d2dce5}.fake-file-input>input{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0}.fake-file-input .btn-fake-file{padding:.7em 0 0;text-align:center;display:inline-block;font-size:16px;color:#82a5c3;cursor:pointer}.fake-file-input .btn-fake-file span{width:100%;display:inline-block;font-size:12px}.files-list{margin:-.5em 0 .5em;padding:0;list-style-type:none;transition:height .3s}.files-list .file-list-item{margin:.4em 0}.files-list .file-list-item .s-info{padding-left:.6em;display:inline-block;vertical-align:middle}#task-footer tbody,#task-footer td,#task-footer tr{display:block}#task-footer tr:nth-child(2){height:0;overflow:hidden}.btn-action{height:36px;padding:0 1.6em;font-size:14px;color:#fff;border:0;border-radius:4px;background:#7eb519;cursor:pointer}';

    addcss(footerDesignCSS);

    //console.info('load taskFooterDesign');
};

function createFieldAndLabel(text,field) {
    let rowItemProto = document.createElement('div');
    let label = document.createElement('label');
    label.textContent = text;
    rowItemProto.appendChild(label);
    rowItemProto.appendChild(field);
    return rowItemProto;
}

function createStatusList(tbl) {
    let list = document.createElement('select');
    let rows = Array.from(tbl.querySelectorAll('tr'));

    let optgroup;

    rows.map(function (item) {
        if(item.firstElementChild.getAttribute('colspan')){
            optgroup = document.createElement('optgroup');
            optgroup.label = item.textContent;
            list.appendChild(optgroup);
        }else{
            let radio = item.querySelector('input');
            let option = document.createElement('option');
            option.value = radio.id;
            option.textContent = item.querySelector('label').textContent;
            optgroup.appendChild(option);
        }
    });

    return list;
}

function updateStatusListOnLoad(list) {
    let status = document.querySelector('input[name=new_problem_status]:checked');

    for( let i of list.options){
        if(i.value === status.id){
            i.selected = true;
        }
    }
}

function addWorkerEmailToSendList(select, input, list) {
    let option = select.options[select.selectedIndex];
    let data = [option.text,select.value];
    let email = data[1];

    if (email.trim() !== "") {
        let addEmail = input.value;
        let newval = '';

        if (addEmail === "") {
            newval = email;
        } else if (addEmail.indexOf(email) === -1) {
            newval = addEmail + (email.charAt(addEmail.length - 1) == ";" ? "" : ";") + email;
        }

        input.value = newval;

        let newitem = document.createElement('li');
        newitem.textContent = data[0];
        newitem.dataset.email = data[1];

        list.appendChild(newitem);

        newitem.addEventListener('click', function () {
            removeItemFromSendlist(this, select, input)
        });

        //выбранного получателя скрываю
        //ставлю выбранным дефолтный (первый) элемент списка

        option.setAttribute('hidden','');
        select.options[0].selected = true;
    }
}

function removeItemFromSendlist(item, select, input) {
    let text = item.dataset.email;

    let sendList = input.value.split(';');

    let filteredSendList = sendList.filter(function (listitem) {
        if(listitem !== text){
            return listitem
        }
    });

    input.value = filteredSendList.join(';');

    item.parentNode.removeChild(item);

    for( let i of select.options){
        if(i.value === text){
            i.removeAttribute('hidden');
        }
    }
}

function removeFileInput(btn) {
    let inputId = btn.dataset.fieldId;
    document.getElementById(inputId).parentNode.remove();
    btn.parentNode.remove();

    let fileInputs = Array.from(document.querySelectorAll('div.fileInput'));
    let removeBtns = document.querySelectorAll('.btn-remove-item');

    //переписать имена и id всех инпутов.
    //если они идут не по порядку или с пропусками
    //при загрузке файлов на сервер будет ошибка
    //то же надо сделать с data-input-id кнопок удаленя файла
    //а то будет удалятся не тот инпут
    for(let i = 0; i < fileInputs.length; i++){
        fileInputs[i].firstElementChild.id = 'fileInput'+i;
        fileInputs[i].firstElementChild.name = 'fileInput'+i;
        removeBtns[i].dataset.fieldId = 'fileInput'+i;
    }
}

function wrapFileInputs(input) {
    let wrap = document.createElement('div');
    let btn = wrap.cloneNode(false);

    wrap.classList.add('fake-file-input',input.classList[0]);
    wrap.appendChild(input);

    btn.innerHTML = 'Добавить файл <span>Нажми или тащи его сюда</span>';
    btn.classList.add('btn-fake-file');
    wrap.appendChild(btn);

    wrap.addEventListener('dragenter',function () {
        console.log(this);
        this.classList.add('is-hover');
    });

    wrap.addEventListener('dragleave',function () {
        this.classList.remove('is-hover');
    });

    wrap.addEventListener('mouseup',function () {
        this.classList.remove('is-hover');
    });

    return wrap;
}

function bytesToSize(bytes) {
    let sizes = ['Bytes', 'Кб', 'Мб', 'Гб', 'Тб'];
    //if (!bytes) return '0 Byte';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};
/* End: js-parts\taskFooterDesign.js */
/* Begin: js-parts\taskUpdateNotify.js */
modules.taskUpdateNotify = function () {
    'use strict';

    let pageUrl = window.location;
    let taskId = getTaskId();

    //добавление кнопки подписки на уведомления о новых каментах в задаче
    let alertBtn = document.createElement('div');
    alertBtn.id = 'upd-alert';
    alertBtn.classList.add('add-alert');
    alertBtn.title = 'Подписаться на уведомления о новых комментариях';
    document.getElementById('task-title').insertBefore(alertBtn, document.getElementById('subscribeElement'));

    alertBtn.addEventListener('click', function (e) {
        this.classList.toggle('selected');

        checkCommentsUpdate(this,taskId,e);
    });

    checkCommentsUpdate(alertBtn,taskId);

    //запуск интервала проверки изменений на странице

    let notifyInterval = setInterval(function () {
        loadByAjax(pageUrl,
            function (data) {
                checkUpdate(data,taskId);
            },
            function (xhr) {
                console.error(xhr);
            }
        );
    }, 1000 * 60 * 5);


    function checkUpdate(ajaxresponse,id) {
        let comments = document.getElementById('comments-tbl').querySelectorAll('.b-comment');
        let commentsNum = comments.length;


        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(ajaxresponse.trim(),"text/html");
        let tbl = htmlDoc.body.querySelector('form[name=theForm]').firstElementChild;

        // - 1 т.к. нужно убрать первую строку с названиями столбцов
        let updCommentNum = tbl.querySelectorAll('tr').length - 1;

        if(updCommentNum > commentsNum){
            let nComments = updCommentNum - commentsNum;
            let lastId = comments[commentsNum - 1].querySelector('input[type=checkbox]').id.split('_')[1];

            createOnPageNotify(nComments,lastId);

            let checkUpadateOption = localStorage.getItem('comments-update'+id);

            if(checkUpadateOption && checkUpadateOption === 'true'){
                let notify = {
                    'title': 'Новый комментарий',
                    'tag': 'new-comment-'+id,
                    'body': htmlDoc.querySelector('h1 > font').textContent.trim()
                };

                notifyMe(notify);

                // очистка интервала - отключение уведомлений по клику на уведомлении
                // let notification = notifyMe(notify);
                //
                // if(notification){
                //     notification.addEventListener('click', function () {
                //         clearInterval(notifyInterval);
                //     })
                // }
            }
        }
    }

    function notifyMe(notify) {
        let notification;

        if (Notification.permission === "granted") {
            notification = new Notification(notify.title, {tag: notify.tag, body: notify.body});
        }
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    notification = new Notification(notify.title, {tag: notify.tag, body: notify.body});
                }
            });
        }

        return notification;
    }

    function createOnPageNotify(num,linkId) {
        let notify = document.getElementById('page-notify');

        if(!notify){
            notify = document.getElementById('comment-template').cloneNode(false);
            notify.id = 'page-notify';
            notify.classList.add('b-comment_notify');
            document.getElementById('comments-tbl').appendChild(notify)
        }

        notify.textContent = 'В задаче '+num+' '+declOfNum(num, ['новый комментарий','новых комментария','новых комментариев']);

        let link = document.createElement('a');
        link.href = window.location+'#'+linkId;
        link.target = '_self';
        link.classList.add('regular-link','comments-update-link');
        link.textContent = 'Обновить страницу';

        link.addEventListener('click', function () {
           window.location.href = this.href;
           location.reload(false);
        });

        notify.appendChild(link);

        return notify;
    }

    //включить/отключить уведомления о новых комментраиях
    //на открытой странице задачи
    function checkCommentsUpdate(btn,id,event = false) {
        if(event){
            if(btn.classList.contains('selected')){
                localStorage.setItem('comments-update'+id,'true');
            }else{
                localStorage.removeItem('comments-update'+id);
            }
        }else{
            if(localStorage.getItem('comments-update'+id) === 'true'){
                btn.classList.add('selected');
            }
        }
    }

    //console.info('load saveNewComment');
};/* End: js-parts\taskUpdateNotify.js */
/* Begin: js-parts\createGoToTaskDatalst.js */
modules.goToTaskDatalist = function () {
    'use strict';

    let taskId = getTaskId();
    let taskTitle = document.getElementById('task-title').textContent.split(' - ');

    let data = JSON.parse(localStorage.getItem('datalist')) || [];
    data = appendId(data);

    //если на странице есть заголовок задачи
    // - проверить есть ли она в списке
    if(Array.isArray(taskTitle) && taskTitle.length >= 2){
        taskTitle = taskTitle[1].trim();
        let newdata = {"id":taskId, "title": taskTitle+' '+taskId};
        data = appendId(data,newdata);
        localStorage.setItem('datalist', JSON.stringify(data));
    }

    //создам datalist
    let datalist = document.createElement('datalist');
    datalist.id = 'dl-gototask';
    document.body.appendChild(datalist);

    //связать datalist с полем ввода id задачи
    let idField = document.getElementById('goTo');
    idField.removeAttribute('style');
    idField.setAttribute('list','dl-gototask');

    for(let i = 0; i < data.length; i++){
        let op = document.createElement('option');
        op.value = data[i].id;
        op.label = data[i].title;
        datalist.appendChild(op);
    }

    function appendId(arr,newdata = false) {
        if(newdata){
            let check = arr.some(function (item) {
                return item.id === newdata.id;
            });

            if(!check){
                arr.push(newdata);
            }

            if(arr.length > 10){
                arr.shift();
            }
        }

        return arr;
    }

    console.info('load goToTaskDatalist');
};/* End: js-parts\createGoToTaskDatalst.js */

    switch (action_page) {
        case 'new':
            modules.userSettings();
            break;
        case 'red':
            addPageElems();
            var elemsModification = new modules.elemsModification();
            modules.modyfiComments();
            if (localStorage.getItem('worker-time-count') === 'true') {
                modules.countWorkerTime();
            }
            modules.saveNewComment();
            modules.calculateElapsedTime();
            modules.cammentsDesign();
            modules.taskFooterDesign();
            modules.copyPasteCommentQuote();
            modules.taskUpdateNotify();
            modules.goToTaskDatalist();
            anchorLink();
            break;
        case 'user_page':
            addPageElems();
            modules.goToTaskDatalist();
            break;
        default:

            break;
    }


    //----------
    //утилиты
    //----------
    //номер задачи из URl
    function getTaskId() {
        let query = window.location.search.substring(1);
        return query.split("=")[2]
    }

    //ajax запрос
    function loadByAjax(path, success, error) {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                console.log(xhr);
                if (xhr.status === 200) {
                    if (success) {
                        success(xhr.responseText);
                    }

                } else {
                    if (error) {
                        error(xhr);
                    }
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    }

    //прокрутка к каменту по якорю. Нужна если вызван cmmentsDesign()
    function anchorLink() {
        //обработка ссылок с id камента в хеше
        //т.к. из-за изменения высоты каментов и соответсвенно страницы в modules.cammentsDesign()
        //они работают не правильно

        let cammentId = w.location.hash;

        cammentId = cammentId.slice(1, cammentId.length);

        //добавляю setTimeout т.к. пока не придумал как отловить
        //что переделка страницы закончена и высота и позиция камента
        //к которому нужно прокрутить будет рассчитана правильно
        setTimeout(function () {
            if (cammentId) {
                console.info('anchorLink start');
                //ищу скрытый чекбокс с id и от него вверх до карточки камента b-comment
                let camment = document.getElementById('checkbox_' + cammentId).parentNode.parentNode.parentNode;
                let distance = camment.offsetTop;

                animate({
                    duration: 1000,
                    timing: function (timeFraction) {
                        return timeFraction;
                    },
                    draw: function (progress) {
                        scrollToY(distance, progress)
                    }
                });
            }
        }, 600);
    }

    function animate(options) {
        var start = performance.now();

        requestAnimationFrame(function animate(time) {
            var timeFraction = (time - start) / options.duration;
            if (timeFraction > 1) timeFraction = 1;

            var progress = options.timing(timeFraction);

            options.draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }

        });
    }

    function scrollToY(distanse, progress) {
        var scrollY = w.scrollY || document.documentElement.scrollTop;
        w.scrollTo(0, scrollY + ((distanse - scrollY) * progress));
    }

    //вызов функции по сочетанию клавишь
    function runOnKeys(func, elem) {
        let codes = [].slice.call(arguments, 2);

        let pressed = {};

        elem.onkeydown = function (e) {
            e = e || window.event;

            pressed[e.keyCode] = true;

            for (let i = 0; i < codes.length; i++) { // проверить, все ли клавиши нажаты
                if (!pressed[codes[i]]) {
                    return;
                }
            }

            // чтобы избежать "залипания" клавиши -- обнуляем статус всех клавиш, пусть нажимает всё заново
            pressed = {};

            func();
        };

        elem.onkeyup = function (e) {
            e = e || w.event;

            delete pressed[e.keyCode];
        };
    }

    //добавить стили в head
    function addcss(css) {
        let head = document.getElementsByTagName('head')[0];
        let s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        s.setAttribute('data-name', 'user-script-css');
        s.appendChild(document.createTextNode(css));
        head.appendChild(s);
        console.info('add custom css complete');
    }

    //подключение строннего js в head
    function addjs(url, callback) {
        let head = document.getElementsByTagName('head')[0];
        let s = document.createElement('script');
        s.onload = function () {
            callback();
        };
        s.src = url;
        head.appendChild(s);

        console.info('add js complete');
    }

    //определение страницы по get параметру a, например ?a=user_page
    function getURLAction() {
        var query = window.location.search.substring(1);
        var get_action = query.split("=");
        get_action = get_action[1].split('&');
        return get_action[0];
    }

    //удаление дубликатов
    function eliminateDuplicates(arr) {
        var obj = {};

        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            obj[str] = true; // запомнить строку в виде свойства объекта
        }

        return Object.keys(obj); // или собрать ключи перебором для IE8-
    }

    //создание даты из строки
    function createISODate(str) {
        var date_str = str.split('.');
        var day_str = date_str[0];
        var month_str = date_str[1];
        var year_str = date_str[2];
        var date_iso_str = year_str + '-' + month_str + '-' + day_str;
        date_iso_str = Date.parse(date_iso_str);
        return date_iso_str;
    }

    // получение строки с датой из таблицы с комментарими задачи
    function getRowDateString(row) {
        let t = '';
        if (row.children[3]) {
            //до запуска cammentsDesign();
            t = row.children[3].textContent;
        } else {
            //после запуска cammentsDesign();
            t = row.querySelector('.comment-date').textContent
        }

        t = t.split(' ');

        return createISODate(t[0]);
    }

    //форматирование даты
    function dateFormatter(date) {
        var formatter = new Intl.DateTimeFormat("ru");
        date = new Date(parseInt(date, 10));
        date = formatter.format(date);
        return date;
    }

    // получение строки с времнем из таблицы с комментарими задачи
    function getRowTimeString(row) {
        let t = '';

        if (row.children[10]) {
            //до запуска cammentsDesign();
            t = row.children[10].textContent;
            t = parseInt(t.split('/')[0]);
        } else {
            //после запуска cammentsDesign();
            t = parseInt(row.querySelector('.elapsed-time').textContent);
        }

        return t;
    }

    // скрыть/показать опреденные option в select
    function modifySelectOptionsList(list, params) {
        Array.from(list).forEach(function (item) {
            item.removeAttribute('hidden');

            if (params.indexOf(item.value) === -1) {
                item.setAttribute('hidden', '');
            }
        });
    }

    // пересчет минут в дни
    function minToDays(timeInMinutes, dayInHours) {
        var dayInHours = dayInHours || 8;
        var retStr = "";

        if ((timeInMinutes !== null) && (!isNaN(timeInMinutes)) && (timeInMinutes > 0)) {
            dayInHours = dayInHours << 0;
            if ((dayInHours === undefined) || (dayInHours === null) || (isNaN(dayInHours)) || (dayInHours < 1)) dayInHours = 24;
            var tD, tH, tM;
            tD = (timeInMinutes / dayInHours / 60) << 0;
            retStr += tD > 0 ? tD + " д. " : "";
            timeInMinutes -= tD * dayInHours * 60;
            tH = (timeInMinutes / 60) << 0;
            retStr += tH > 0 ? tH + " ч. " : "";
            timeInMinutes -= tH * 60;
            tM = timeInMinutes << 0;
            retStr += tM + " мин." + " (" + dayInHours + "-часовой день)";
        } else {
            retStr += "Что-то со временем не так :(";
        }
        return retStr;
    }

    // формирование строки с нужным окончанием в зависимости от числа
    // например - минута, минуты, минут
    function declOfNum(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    function createTimeString(time, titles) {
        return time + ' ' + declOfNum(time, titles);
    }

    function createTimeTitleString(time, titles) {
        return declOfNum(time, titles);
    }

    // создание объекта со списком сотруднков и времени каждого в задаче
    function createTimeList(workers, rows) {

        var ntime, name, tsum;
        var timelist = {};

        for (var s = 0; s < workers.length; s++) {
            tsum = 0;

            for (var i = 0; i < rows.length; i++) {
                ntime = getRowTimeString(rows[i]);

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
        var $timelist = document.createElement('DIV');
        $timelist.classList.add('time-list');
        $timelist.id = 'workers-time';

        var list_item;
        var workertime;
        var totaltime = 0;

        for (var k in data) {
            workertime = data[k];
            totaltime += workertime;
            list_item = document.createElement('p');
            list_item.dataset.workertime = workertime;
            list_item.innerHTML = '<span>' + k + '</span> <span>' + workertime + '</span>';
            $timelist.insertBefore(list_item, $timelist.lastChild);
        }

        return $timelist;
    }

    // подсчет общего времени всех сотрудников для списка сотрудник-время
    function insertTotalTime(timelist, data, addmarker) {
        var totaltime = 0;
        var total = document.createElement('p');

        for (var k in data) {
            totaltime += data[k];
        }

        if (addmarker) {
            var list_items = timelist.querySelectorAll('p');
            //по умолчанию все работники выбраны, считается общее время по всем
            //всем добавляем класс selected нужный для фильтрации списка
            //и чтобы визуально отметить выбранных в списке
            for (var i = 0; i < list_items.length; i++) {
                list_items[i].classList.add('selected');
            }
        }

        total.innerHTML = '<span>Всего:</span> <span id="workers-time-total" data-totaltime="' + totaltime + '">' + totaltime + '</span>';
        total.classList.add('time-list-total');
        timelist.appendChild(total);

        return totaltime;
    }

    // получить список отмеченных сотрудников - из списка всех сотрудников задачи
    function getSelectedWorkers() {
        var selected_workers = document.getElementById('workers-time').querySelectorAll('.selected');
        var selected_names = [];

        for (var i = 0; i < selected_workers.length; i++) {
            selected_names.push(selected_workers[i].firstElementChild.textContent);
        }

        return selected_names;
    }

    // получить все строки с каментами в задаче
    function getAllCommentsRows() {
        let rows = Array.from(document.getElementById('comments-tbl').querySelectorAll('TR'));
        rows = rows.splice(1, rows.length); //исключить первую строку с заголовками столбцов

        let result = rows.filter(function(row) {
            return row.querySelectorAll('td').length > 1;
        });

        return result;
    }


    //получить все каменты в задаче
    function getAllCamments() {
        let rows = getAllCommentsRows();
        return rows.map(getCommentFromRow);
    }

    function getCommentFromRow(row) {
        return row.querySelector('.comment-wrap');
    }

    // получить список всех сотрудников в задаче
    function getAllWorkers() {
        var rows = getAllCommentsRows();

        var workers = [];

        for (var i = 0; i < rows.length; i++) {
            workers.push(rows[i].children[4].textContent);
        }

        return eliminateDuplicates(workers);
    }

    function findInArray(arr, val) {
        return arr.indexOf(val);
    }

    //сохранение пользоваетльских настроек
    //и выделение сохраненного в списках работников и проектов
    function saveUserSettings(options, list_item, storage_item) {
        let id = list_item.dataset.id;

        if (options.indexOf(id) === -1) {
            options.push(id);
            list_item.classList.add('selected');
        } else {
            let index = options.indexOf(id);
            options.splice(index, 1);
            list_item.classList.remove('selected');
        }

        localStorage.setItem(storage_item, JSON.stringify(options));
        //console.log(JSON.parse(localStorage.getItem(storage_item)));
    }

    //создание и добавление списка работников и проектов
    //в настройках пользователя на странице создания новой задачи

    function createInsertWorkersProjectsLists(params) {
        let list = document.createElement('ul');
        list.id = params.id;
        list.classList.add('user-list', 'clearfix');

        let list_title = document.createElement('h2');
        list_title.innerHTML = params.title;
        list_title.classList.add('user-title');

        list.appendChild(list_title);

        let source_list = document.getElementById(params.source);
        let source_list_items = source_list.options;

        let fragment = document.createDocumentFragment();
        let list_item_proto = document.createElement('li');
        let list_item;

        Object.keys(source_list_items).forEach(function (key) {
            if (source_list_items[key].value <= 0) {
                return false;
            }
            list_item = list_item_proto.cloneNode(false);
            list_item.innerHTML = source_list_items[key].text;
            list_item.dataset.id = source_list_items[key].value;
            list_item.addEventListener('click', function () {
                saveUserSettings(params.storage, this, params.storage_name);
            });

            fragment.appendChild(list_item);
        });

        list.appendChild(fragment);

        return list;
    }

    //----------------------
    //доп. функции модулей
    //----------------------

    //подсчет времени выбранных участников задачи (из списка всех участников)
    function countSelectedWorkersTime(list, event) {
        var target = event.target;
        var $total = document.getElementById('workers-time-total');
        var total = parseInt($total.dataset.totaltime);

        while (target != list) {
            if (target.tagName == 'P') {
                recountTotal(target, $total, total);
                return;
            }

            target = target.parentNode;
        }

        function recountTotal(elem, total, totaltime) {
            var elemtime = parseInt(elem.dataset.workertime);

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


    // подсчет времени за выбранный период
    function findTimeInDatesRange(lists, workers, rows) {
        var $start_list = lists.start_list;
        var $end_list = lists.end_list;
        var $box = lists.box;
        var $btn = lists.btn;

        function findRowsInRange(rows, start, end) {

            return rows.filter(function (item) {
                let item_date = getRowDateString(item);

                if (item_date >= start && item_date <= end) {
                    return item;
                }
            });
        }

        // $start_list.addEventListener('change', function(){
        //     var val = this.value;
        //
        //     Array.from($end_list.options).forEach(function (item) {
        //         if(item.value <= val){
        //             item.setAttribute('disabled', true);
        //             item.setAttribute('hidden', true);
        //         }
        //     });
        //
        // });
        //
        // $end_list.addEventListener('change', function(){
        //     var find_rows = findRowsInRange(rows, $start_list.value, this.value);
        //     createTimeList(workers, find_rows);
        // });

        $btn.addEventListener('click', function () {

            var find_rows = findRowsInRange(rows, $start_list.value, $end_list.value);

            var range_timelist = createTimeList(getSelectedWorkers(), find_rows);
            var $range_timelist = createTimeListView(range_timelist);

            if ($box.querySelector('#range-timelist')) {
                $box.removeChild(document.getElementById('range-timelist'));
            }

            $range_timelist.setAttribute('id', 'range-timelist');

            $box.appendChild($range_timelist);

            insertTotalTime($range_timelist, range_timelist);
        });
    }
})();