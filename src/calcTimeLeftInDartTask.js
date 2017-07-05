/**
 * Created by mann-aa on 05.07.2017.
 */
import {getTaskId} from './_finders.js';

function calcTimeLeft() {
    //dtp = dart-task-plane
    const tid = getTaskId();

    let bar = document.getElementById('user-toolbar');
    let workersTimeBlock = document.getElementById('workers-time');

    let baritem = document.createElement('div');
    baritem.classList.add('user-toolbar__item');

    let field = document.createElement('input');
    field.id = 'dtp-input';
    field.value = 0;

    let result = document.createElement('div');
    result.classList.add('dtp-result');

    let btn = document.createElement('button');
    btn.textContent = 'Посчитать оставшееся время';
    btn.type = 'button';
    btn.classList.add('dtp-button');

    let title = document.createElement('h3');
    title.classList.add('user-toolbar-title');
    title.textContent = 'Оставшееся время (DartIt)';

    baritem.appendChild(title);
    baritem.appendChild(field);
    baritem.appendChild(result);
    bar.appendChild(baritem);

    workersTimeBlock.appendChild(btn);

    btn.addEventListener('click', function () {
        letDartCalc(field,result)
    });

    field.addEventListener('change', function (e) {
        readWriteDartPlaneTime(this, tid, e.type);
    });

    readWriteDartPlaneTime(field, tid, 'load');
    letDartCalc(field,result);

}

function letDartCalc(input,out) {
    let data = parseInt(document.getElementById('workers-time-total').dataset.totaltime);
    let calc = parseInt(input.value) - data;
    let txt = 'Оставшееся время: ';

    if(calc < 0){
        out.classList.add('dtp-alert');
        out.classList.toggle('dtp-warn',false);
        txt = 'Больше запланированного на ';
        calc = Math.abs(calc);
    }else if(calc <= 60){
        out.classList.add('dtp-warn');
        out.classList.toggle('dtp-alert',false);
    }else{
        out.classList.remove('dtp-warn','dtp-alert');
    }
    out.textContent = `${txt} ${calc} мин.`;
}

function readWriteDartPlaneTime(input,id,ev) {

    if(ev === 'change'){
        localStorage.setItem(`${id}-dart-plane-time`, input.value);
    }else{
        if(localStorage.getItem(`${id}-dart-plane-time`) !== null){
            input.value = localStorage.getItem(`${id}-dart-plane-time`);
        }
    }
}

import styles from './pcss/calcTimeLeftInDartTask.pcss';

export {calcTimeLeft};
