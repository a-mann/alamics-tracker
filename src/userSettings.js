// добавление на страницу новой задачи блока настроек пользователя

import {addjs} from './_loaders.js';

function userSettings() {
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
            //console.log('no');
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

    // добавление блока экспорта/импорта настроек
    let EIBlock = document.createElement('div');
    EIBlock.classList.add('user-list');
    EIBlock.id = 'EIBlock';

    let EIBlock_title = document.createElement('h2');
    EIBlock_title.textContent = 'Экспорт/импорт настроек';
    EIBlock_title.classList.add('user-title');

    let EIBlock_desc = document.createElement('p');
    EIBlock_desc.textContent = 'Будут сохранены избранные проекты, работники, опции.';

    EIBlock.appendChild(EIBlock_title);
    EIBlock.appendChild(EIBlock_desc);

    let EISettings = exportImportUserSettings();
    EIBlock.appendChild(EISettings.link);
    EIBlock.appendChild(EISettings.field);

    $user_settings_box.appendChild(EIBlock);

    //addDropboxSaver
    addjs('https://www.dropbox.com/static/api/2/dropins.js', function () {
        // id="dropboxjs" data-app-key="gertt2rb0d40ufr"
        console.log('load');
        addDropboxSaver(EISettings.link.href,EISettings.link.download);
        let DBox = Dropbox;
        console.log('loaded',DBox);
    },{'id': 'dropboxjs', 'data-app-key': 'gertt2rb0d40ufr'});

    if (NODE_ENV === 'development') {
        console.info('load userSettings');
    }
}

//создание и добавление списка работников и проектов
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

//сохранение пользоваетльских настроек в файл
//загрузка настроек из файла
function exportImportUserSettings() {
    //const keys = Object.keys(localStorage);
    const keys = ["params_user_projects","params_user_workers","datalist","worker-time-count"];

    let settings = {};

    for(let i of keys){
        settings[i] = localStorage.getItem(i);
    }

    let SaveAsBlob = new Blob([JSON.stringify(settings)], {type:"application/json"});
    let SaveAsURL = window.URL.createObjectURL(SaveAsBlob);
    const fileNameToSaveAs = 'tracker-user-settings';

    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Скачать файл настроек";
    downloadLink.href = SaveAsURL;
    downloadLink.classList.add('row-item');

    let upload = document.createElement('input');
    upload.type = 'file';
    upload.id = 'import-settings';
    upload.title = 'Загрузите файл с сохраненными настройками tracker-user-settings';
    upload.classList.add('row-item');

    upload.addEventListener('change', function () {
        loadFile(this)
    });

    function loadFile(input) {
        let fileToLoad = input.files[0];

        let fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            let settings = JSON.parse(fileLoadedEvent.target.result);

            if(typeof settings === 'object'){
                Object.keys(settings).forEach(function (key) {
                    localStorage.setItem(key, settings[key]);
                });
            }else{
                throw new Error('Ошибка чтения файла настроек');
            }
        };

        fileReader.readAsText(fileToLoad, "UTF-8");
    }

    return {
        link: downloadLink,
        field: upload
    };
}

function addDropboxSaver(url,filename) {
    //<script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="YOUR_APP_KEY"></script>
    //Dropbox.createSaveButton(url, filename, options);
    console.log(url, filename);

    let options = {
        files: [
            {'url': url, 'filename': filename}
        ],
        success: function () {
            // Indicate to the user that the files have been saved.
            console.log("Success! Files saved to your Dropbox.");
        },
        progress: function (progress) {
            console.log(progress * 100);
        },
        cancel: function () {
            console.log('cancell');
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    };

    console.log(Dropbox);

    let button = Dropbox.createSaveButton(options);

    document.getElementById('EIBlock').appendChild(button);
}

export {userSettings};

