

// добавление на страницу новой задачи блока настроек пользователя

modules.userSettings = function () {
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
