'use strict';

import {getURLAction} from './_utils.js';

import {addPageElems} from './_addCSSSelectors.js';

import {modyfiComments} from './modyfiComments.js';

import {commentsDesign} from './commentsDesign.js';

import {calculateElapsedTime} from './calculateElapsedTime.js';

import {goToTaskDatalist} from './goToTask.js';

import {countWorkerTime} from './countWorkerTime.js';

import {taskFooterDesign} from './taskFooterDesign.js';

import {elemsModification} from './elemsModification.js';

import {saveNewComment} from './saveNewComment.js';

import {copyPasteCommentQuote} from './copyPasteCommentQuote.js';

import {taskUpdateNotify} from './taskUpdateNotify.js';

import {anchorLink} from './anchorLink.js';

import {userSettings} from './userSettings.js';

const action_page = getURLAction();

switch (action_page) {
    case 'new':
        userSettings();
        break;
    case 'red':
        addPageElems();
        //let elemsModification = new elemsModification();
        elemsModification();
        modyfiComments();

        if(NODE_ENV === 'development'){
            countWorkerTime();
        }else{
            if (localStorage.getItem('worker-time-count') === 'true') {
                countWorkerTime();
            }
        }

        saveNewComment();
        calculateElapsedTime();
        commentsDesign();
        taskFooterDesign();
        copyPasteCommentQuote();
        taskUpdateNotify();
        goToTaskDatalist();
        anchorLink();
        break;
    case 'user_page':
        addPageElems();
        goToTaskDatalist();
        break;
}

if(NODE_ENV === 'development'){
    console.log('hello');
}
