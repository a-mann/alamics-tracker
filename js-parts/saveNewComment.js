

//Сохранение комментария в localStorage
//на случай внезапного звершения сессии
modules.saveNewComment = function () {
    'use strict';
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