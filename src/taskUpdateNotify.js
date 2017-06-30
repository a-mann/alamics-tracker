if (NODE_ENV === 'development') {
    console.time('load updateNotify');
}

import {getTaskId} from './_finders.js';
import {declOfNum,loadByAjax} from './_utils.js';

function taskUpdateNotify () {
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


        let uploadedComments = tbl.querySelectorAll('tr');

        let filteredComments = Array.from(uploadedComments).filter(function (item) {
            return item.querySelectorAll('td').length > 1;
        });

        // - 1 т.к. нужно убрать первую строку с названиями столбцов
        let updCommentNum = filteredComments.length - 1;


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
}

export {taskUpdateNotify};

if (NODE_ENV === 'development') {
    console.timeEnd('load updateNotify');
}