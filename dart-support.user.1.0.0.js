'use strict';

// ==UserScript==
// @name DartIT tracker-tweaker revo
// @updateURL https://dl.dropboxusercontent.com/u/11456758/DartUserScript/dart-support.user.js
// @downloadURL https://dl.dropboxusercontent.com/u/11456758/DartUserScript/dart-support.user.js
// @description индивидуальные настройки для support.dartit.ru, support.alamics.ru;
// @include https://support.dartit.ru/*
// @include https://support.alamics.ru/*
// @grant unsafeWindow
// @author mann
// @license MIT
// @version 0.0.5.5

// ==/UserScript==
console.info('start userscript');
// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie)
(function (window, undefined) {  // [2] нормализуем window
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }
    //------------------------------------------

    //--------------------------------------------
    // [3] не запускаем скрипт во фреймах
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self != w.top) {
        return;
    }

    // [4] дополнительная проверка наряду с @include
    var location_test = function () {
        return /https:\/\/support.dartit.ru/.test(w.location.href) || /https:\/\/support.alamics.ru/.test(w.location.href);
    };

    if (location_test) document.addEventListener("DOMContentLoaded", function () {

        //добавим новые стили
        var custom_css = ".onoff-opt{margin: 0 6px 0 10px}";
        custom_css += ".none{display: none !important}";
        custom_css += ".none.view{display: block !important}";
        custom_css += ".ch_addr{margin: 10px 10px 10px 0; vertical-align: top}";
        custom_css += ".totop > input {margin: 10px 0 0}";
        custom_css += ".label_head{display: block; margin: 0 0 20px}";
        custom_css += ".clearfix:before, .clearfix:after { content:''; display:table; clear: both }";
        custom_css += ".alist{float: right} .alist p{margin: 0 0 10px; line-height: 1; text-align: right}";
        custom_css += ".bar-wrap{padding:8px 15px;background:#2d2d2d}";
        custom_css += "#custom-project-list > li{width: 20%; float: left; cursor: pointer}";
        custom_css += "#custom-workers-list > li{width: 20%; float: left; cursor: pointer}";
        custom_css += "#custom-project-list > li:first-child{display:none}";
        custom_css += ".user-list > li{line-height: 1.5}";
        custom_css += ".selected{color: green}";
        custom_css += "#settings-btn{margin: 0 0 20px 0}";
        custom_css += "#settings-box{display: none; margin: 20px 0; padding: 20px 0; outline: 1px solid #414141}";
        custom_css += "#settings-box.is-open{display: block}";
        custom_css += ".user-title{color:#000;margin:0 0 .6em;font-size:20px;padding:0}";
        custom_css += ".regular-link{color:#0054b9}";
        custom_css += ".time-list p{margin: 5px 0; display:flex; justify-content:space-between;}";
        custom_css += ".time-list > p > span:first-child{padding-right: 1em; cursor: pointer;}";
        custom_css += ":root .time-list-total{margin-top: 1em; border-top: 1px solid;}";
        custom_css += ".comment-collapsed{max-height: 70px; overflow: hidden !important;}";
        custom_css += ".long-comment{width: 100% !important;position: relative; padding-top: 30px;}";
        custom_css += ".btn-collapse{position: absolute; top: 0; right: 0;}";
        custom_css += ".btn-collapse-all{position: fixed; top: 10; right: 10;}";
        custom_css += ":root .dates-list{width: 150px; display: inline-block; margin: 0 20px 0 0}";
        custom_css += ".user-toolbar{margin: 20px 0; padding: 20px 10px; border-top: 1px solid rgba(0,0,0,.7); overflow: hidden; display: flex; flex-wrap: wrap;}";
        custom_css += ".user-toolbar__item{padding: 10px 15px; background: rgba(255,255,255,.6); box-shadow: 0 1px 1px rgba(0,0,0,.6)}";
        custom_css += ":root .user-toolbar-title{margin: 0 0 1em; padding: 0; color: #000;}";
        custom_css += ":root #comments-tbl .comment-wrap{font-size: 14px; width:100% !important; max-width: 800px;overflow: hidden;}";
        //markdown
        custom_css += ":root #comments-tbl h1{font-size: 120%; font-weight: 400; margin: 0 0 .4em; color: inherit;}";
        custom_css += ":root #comments-tbl blockquote{padding: 10px 20px;margin: 0 0 20px; border-left: 5px solid #ccc;}";
        custom_css += ":root #comments-tbl blockquote p{margin: 0;}";
        custom_css += ":root #comments-tbl ul{padding-left: .6em; list-style-position: inside;}";

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
            $comments_tbl.setAttribute('id', 'comments-tbl');

            let rows = getAllCommentsRows();

            rows.map(function (row) {
                row.querySelectorAll('td')[5].firstElementChild.classList.add('comment-wrap');
            });

            let input_div = document.querySelector('div.input_box'); //есть на странице задачи

            if (input_div) {
                let $user_toolbar = document.createElement('DIV');
                $user_toolbar.setAttribute('id', 'user-toolbar');
                $user_toolbar.classList.add('user-toolbar');

                input_div.appendChild($user_toolbar);
            }
        }

        addPageElems();

        // добавление на страницу новой задачи блока настроек пользователя
        modules.userSettings = function () {
            console.log('user');
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

            //создание кастомного списка проектов
            //id`s array
            function createTaskListHTML() {
                let params_user_projects = JSON.parse(localStorage.getItem('params_user_projects'));

                if (params_user_projects === null) {
                    params_user_projects = [];
                }

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
                let params_user_workers = JSON.parse(localStorage.getItem('params_user_workers'));

                if (params_user_workers === null) {
                    params_user_workers = [];
                }

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

            createTaskListHTML();
            createWorkersListHTML();
        };

        //изменение элементов на странице задачи
        //в соответсвии с настройками пользователя
        modules.elemsModification = function () {
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
        };

        //поиск ссылок в тексте комментариев и оборачивание их в <a>
        //сворачивание длинных комментариев, добавление кнопки Свренуть.развернуть все
        modules.modyfiComments = function () {

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

            // for (let i = 0; i < rows.length; i++) {
            //     div = getCommentFromRow(rows[i]);
            //     txt = replaceURLWithHTMLLinks(div.innerHTML);
            //     div.innerHTML = txt;
            //     collapse_btn = addCollapseButton(div);
            //
            //     if (collapse_btn) {
            //         collapse_btn.addEventListener('click', function (e) {
            //             collapseComment(this);
            //             e.preventDefault();
            //         });
            //         collapse_btns.push(collapse_btn);
            //     }
            // }

            //добавить кнопку свернуть/развернуть все каменты
            // if (!!document.querySelector('.comment-collapsed')) {
            //     collapse_btn = document.createElement('BUTTON');
            //     collapse_btn.type = 'button';
            //     collapse_btn.tabindex = '-1';
            //     collapse_btn.innerHTML = 'Развернуть все';
            //     collapse_btn.classList.add('btn-collapse-all', 'is-close');
            //     collapse_btn.addEventListener('click', function (e) {
            //         collapseAllComment(this);
            //         e.preventDefault();
            //     });
            //     $content_cell.appendChild(collapse_btn);
            // }

            //добавить кнопку свернуть/развернуть к каменту
            function addCollapseButton(el) {
                let collapse_btn;

                if (el.offsetHeight > 200) {
                    let wrap = document.createElement('DIV');
                    wrap.classList.add('comment-collapsed', 'long-comment');

                    collapse_btn = document.createElement('BUTTON');
                    collapse_btn.type = 'button';
                    collapse_btn.tabindex = '-1';
                    collapse_btn.innerHTML = 'Развернуть';
                    collapse_btn.classList.add('btn-collapse', 'foo-collapse', 'is-close');
                    el.parentNode.appendChild(wrap);
                    wrap.appendChild(collapse_btn);
                    wrap.appendChild(el);
                }

                return collapse_btn;
            }

            function collapseComment(el, state) {

                //el - node || nodeList
                //state - string || check contains class is-close
                state = state || el.classList.contains('is-close');

                if (Array.isArray(el)) {

                    for (let i = 0; i < el.length; i++) {
                        if (state === 'expand') {
                            setExpand(el[i]);
                            continue;
                        }
                        setCollapse(el[i]);
                    }
                } else {
                    if (state) {
                        setExpand(el);
                    } else {
                        setCollapse(el);
                    }
                }

                function setExpand(el) {
                    el.classList.remove('is-close');
                    el.innerHTML = 'Свернуть';
                    el.parentNode.classList.remove('comment-collapsed');
                }

                function setCollapse(el) {
                    el.classList.add('is-close');
                    el.innerHTML = 'Развернуть';
                    el.parentNode.classList.add('comment-collapsed')
                }
            }

            function collapseAllComment(btn) {
                if (btn.classList.contains('is-close')) {
                    btn.classList.remove('is-close');
                    btn.innerHTML = 'Свернуть все';

                    collapseComment(collapse_btns, 'expand');

                } else {
                    btn.classList.add('is-close');
                    btn.innerHTML = 'Развернуть все';

                    collapseComment(collapse_btns, 'collapse');
                }
            }

            //парсер markdown
            function goMarkdown(rows) {

                let md = w.markdownit();
                md.options.html = true;
                md.options.linkify = true;
                md.options.typographer = true;
                //md.options.breaks = true;

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
                            item.trim();
                            //+'<br>' нужно чтобы было похоже на исходное форматирование
                            item = renderMdString(item, md)+'<br>';
                        }

                        return item;
                    });

                    //очистка пустых строк
                    //string = string.replace(/^\s+|\s+$/g, '');

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
        };

        //подсчет общего времени в задаче для каждого исполнителя
        modules.countWorkerTime = function () {
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
        };

        //калькулятор в поле ввода затраченного времени
        modules.calculateElapsedTime = function () {
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
        };

        //Сохранение комментария в localStorage
        //на случай внезапного звершения сессии
        modules.saveNewComment = function () {
            var $field = document.getElementById('text');

            var query = window.location.search.substring(1);
            var task_id = query.split("=")[2];

            //добавлю кнопку для вставки сохраненного текста
            var btn = document.createElement('BUTTON');
            btn.setAttribute('type', 'button');
            btn.classList.add('label_head');
            btn.innerHTML = 'Вставить сохраненный текст';
            btn.classList.add('none'); //по умолчанию скрыта
            $field.parentNode.insertBefore(btn, $field);

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

            function saveTaskComment() {
                localStorage.setItem('task' + task_id, this.value);
            }

            function showPasteBtn(button, id) {
                if (localStorage.getItem('task' + id) !== '' && localStorage.getItem('task' + id) !== null) {
                    button.classList.remove('none');
                }
            }
        };

        //выделение текста в каменте и вставка оформленная как цитата для markdown
        modules.copyPasteCommentQuote = function () {
            let rows = getAllCommentsRows();

            rows.map(function (row) {
                let camment = getCommentFromRow(row);

                camment.addEventListener('mouseup', function () {
                    let selection = w.getSelection();
                    selection = selection.toString().replace(/(?:(?:\r\n|\r|\n)\s*){2}/gm, "").trim();
                    localStorage.setItem('selection',selection);
                })

            });

            let editor = document.getElementById('text');

            function formatAndInsetCommentQuote(elem) {
                if(localStorage.getItem('selection')){
                    let startPos = elem.selectionStart;
                    let endPos = elem.selectionEnd;

                    let selection = localStorage.getItem('selection');
                    let max_characters = 60;

                    if(selection.length > max_characters){
                        let strings = selection.split(' ');

                        let substr = [];
                        let str = '';

                        for(let i = 0; i < strings.length; i++){
                            str += strings[i]+' ';
                            if(str.length >= max_characters || i === strings.length - 1){
                                substr.push('> '+str.trim());
                                str = '';
                            }
                        }

                        selection = substr.join('\n');
                        selection = '\n'+selection+'\n'
                    }

                    //this.innerHTML = this.innerHTML + selection;

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
        };

        //переделка внешнего вида каментов
        modules.cammentsDesign = function () {
            createTemplate();

            let tbl = document.getElementById('comments-tbl');
            let rows = getAllCommentsRows();

            rows.map(function (item) {
                let td = Array.from(item.querySelectorAll('td'));

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
                });

                let cammentsDesignCSS = "#comments-tbl{ padding: 0 3em; } #comments-tbl, #comments-tbl tbody, #comments-tbl tr{ display: block; } .b-comment{ width: 100%; margin: 1em 0; display: flex; flex-flow: column wrap; position: relative; outline: 1px solid; } .b-comment__row{ padding: 1em; display: flex; flex-flow: row wrap; position: relative; } /*//1 row*/ .b-comment__row_0{ box-shadow: 0 1px 2px #ccc; } .task-status{ padding: 0 .5em 0 2em; } .id-checkbox{ position: absolute; visibility: hidden; z-index: -1; } /*//2 row*/ .comment-info > span{ display: inline-block; vertical-align: top; } .comment-author{ padding-right: 2em; position: relative; } .comment-author:after{ content: ''; position: relative; left: 1em; } /*//3 row*/ .b-comment__row_2 { box-shadow: 0 1px 2px #ccc, 0 -1px 2px #ccc; } /*//4 row*/ .b-comment__row.b-comment__row_3 { padding-top: 1.5em; padding-bottom: 1.5em; } /*//5 row*/ .b-comment__row_3 + .b-comment__row_4 { box-shadow: 0 -1px 2px #ccc; } .b-comment__row_4 .row-right { top: 50%; transform: translateY(-50%); } .btn-del-comment, .btn-edit-comment { width: 100px; height: 30px; line-height: 30px; position: relative; } .btn-edit-comment { width: 140px; border: 1px solid #ADADAD; } .btn-del-comment:after, .btn-edit-comment:after { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: -1; } .btn-edit-comment:after { content: 'Редактировать'; width: 100%; text-align: center; background: #E1E1E1; } .btn-del-comment:after { content: 'Удалить'; color: #ccc; line-height: normal; border-bottom: 1px solid; } .btn-del-comment img, .btn-edit-comment img { display: none; } .btn-del-comment a, .btn-edit-comment a { width: 100%; height: 100%; position: absolute; } .row-right { position: absolute; top: 1em; right: 1em; } .row-right > * { display: inline-block; vertical-align: middle; } .row-right > *:not(:last-child) { margin-right: .5em; }";

                addcss(cammentsDesignCSS);
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
        };

        switch (action_page) {
            case 'new':
                modules.userSettings();
                break;
            case 'red':
            case 'user_page':
                var elemsModification = new modules.elemsModification();
                modules.modyfiComments();
                modules.copyPasteCommentQuote();
                modules.countWorkerTime();
                modules.saveNewComment();
                modules.calculateElapsedTime();
                modules.cammentsDesign();
                break;
            default:

                break;
        }

        //----------
        //утилиты
        //----------
        //вызов функции по сочетанию клавишь
        function runOnKeys(func,elem) {
            let codes = [].slice.call(arguments, 2);

            let pressed = {};

            elem.onkeydown = function(e) {
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

            elem.onkeyup = function(e) {
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
            var t = row.children[3].textContent;
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
            var t = row.children[10].textContent;
            t = t.split('/');
            return parseInt(t[0]);
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

        // создание объекта со списком сотруднков и времени каждого в задаче
        function createTimeList(workers, rows) {
            var ntime, name, tsum;
            var timelist = {};

            for (var s = 0; s < workers.length; s++) {
                tsum = 0;

                for (var i = 0; i < rows.length; i++) {
                    ntime = getRowTimeString(rows[i]);

                    name = rows[i].children[4].textContent;

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
            return rows;
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
                    var item_date = getRowDateString(item);

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

    });
})(window);