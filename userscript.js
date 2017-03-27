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
        custom_css += ".hidden-elem{position:fixed;left:-999em;z-index: -1; visibility: hidden;}";
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




//import userSettings.js
//import elemsModification.js
//import modyfiComments.js
//import countWorkerTime.js
//import calculateElapsedTime.js
//import saveNewComment.js
//import copyPasteCommentQuote.js
//import cammentsDesign.js
        //вставить выделенный текст камента в текстареа
        //оформленный как цитата для markdown


        switch (action_page) {
            case 'new':
                modules.userSettings();
                break;
            case 'red':
            case 'user_page':
                addPageElems();

                var elemsModification = new modules.elemsModification();
                modules.modyfiComments();
                modules.countWorkerTime();
                modules.saveNewComment();
                modules.calculateElapsedTime();
                modules.cammentsDesign();
                modules.copyPasteCommentQuote();
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