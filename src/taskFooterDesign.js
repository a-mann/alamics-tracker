if(NODE_ENV === 'development'){
    console.time('load taskFooterDesign');
}

function taskFooterDesign() {
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
            removeFileInput(this,total,fileslist,fileSize);
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
}

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

function removeFileInput(btn,total,fileslist,filesize) {
    let updateTotalSize = fileslist.dataset.total - filesize;
    fileslist.dataset.total = updateTotalSize;
    total.textContent = bytesToSize(updateTotalSize) + ' из 3 Мб';

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
        //console.log(this);
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
    if (!bytes) {
        return '0'
    }
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


import styles from './pcss/taskFooterDesign.pcss';

export {taskFooterDesign};

if(NODE_ENV === 'development'){
    console.timeEnd('load taskFooterDesign');
}