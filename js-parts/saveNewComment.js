

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
};