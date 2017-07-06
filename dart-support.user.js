// ==UserScript==
// @name DartIT tracker-tweaker revo
// @updateURL https://github.com/a-mann/alamics-tracker/raw/master/dart-support.user.js
// @downloadURL https://github.com/a-mann/alamics-tracker/raw/master/dart-support.user.js
// @description индивидуальные настройки для support.dartit.ru, support.alamics.ru;
// @include https://support.dartit.ru/*
// @include https://support.alamics.ru/*
// @require https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.3.1/markdown-it.min.js
// @grant unsafeWindow
// @author mann
// @license MIT
// @version 1.6.15
// ==/UserScript==
var ujs =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getTaskId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getTaskHead; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getAllCamments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getCommentFromRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getAllCommentsRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getAllWorkers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getRowTimeString; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(1);


function getTaskId() {
    const taskId = window.location.search.split('&');

    let id = taskId.filter(function (item) {
        return item.split('=')[0] === 'id';
    });

    return id[0].split("=")[1];
}

function getTaskHead() {
    let taskHead = document.getElementById('task-title').textContent.split(' - ');

    if (Array.isArray(taskHead) && taskHead.length >= 2) {
        return {'title': taskHead[1].trim(), 'state': taskHead[2].split(' ')[1]};
    }

    throw new Error('task head not found');
}

//получить все каменты в задаче
//работает корректно после запуска commentsDesign
function getAllCamments() {
    return document.querySelectorAll('.b-comment');
}

function getCommentFromRow(row) {
    return row.querySelector('.comment-wrap');
}

//работает корректно для запуска commentsDesign
function getAllCommentsRows() {
    let rows = Array.from(document.getElementById('comments-tbl').querySelectorAll('TR'));
    rows = rows.splice(1, rows.length); //исключить первую строку с заголовками столбцов

    return rows.filter(function(row) {
        return row.querySelectorAll('td').length > 1;
    });
}

// получить список всех сотрудников в задаче
function getAllWorkers() {
    let rows = getAllCommentsRows();

    let workers = [];

    for (let i = 0; i < rows.length; i++) {
        workers.push(rows[i].children[4].textContent);
    }

    return __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* eliminateDuplicates */](workers);
}

// получение строки с времнем из таблицы с комментарими задачи
function getRowTimeString(row) {
    let t = '';

    if (row.children[10]) {
        //до запуска cammentsDesign();
        t = row.children[10].textContent;
        t = parseInt(t.split('/')[0]);
    } else {
        //после запуска cammentsDesign();
        t = parseInt(row.querySelector('.elapsed-time').textContent);
    }

    return t;
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getURLAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return eliminateDuplicates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createISODate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getRowDateString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return dateFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return modifySelectOptionsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return runOnKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return loadByAjax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return declOfNum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return findInArray; });

//определение страницы по get параметру a, например ?a=user_page
function getURLAction() {
    let get_action = window.location.search.substring(1).split("=");
    get_action = get_action[1].split('&');
    return get_action[0];
}

//удаление дубликатов
function eliminateDuplicates(arr) {
    let obj = {};

    for (let i = 0; i < arr.length; i++) {
        let str = arr[i];
        obj[str] = true; // запомнить строку в виде свойства объекта
    }

    return Object.keys(obj); // или собрать ключи перебором для IE8-
}

//создание даты из строки
function createISODate(str) {
    let date_str = str.split('.');
    let day_str = date_str[0];
    let month_str = date_str[1];
    let year_str = date_str[2];
    let date_iso_str = year_str + '-' + month_str + '-' + day_str;
    date_iso_str = Date.parse(date_iso_str);
    return date_iso_str;
}

// получение строки с датой из таблицы с комментарими задачи
function getRowDateString(row) {
    let t = '';
    if (row.children[3]) {
        //до запуска cammentsDesign();
        t = row.children[3].textContent;
    } else {
        //после запуска cammentsDesign();
        t = row.querySelector('.comment-date').textContent
    }

    t = t.split(' ');

    return createISODate(t[0]);
}

//форматирование даты
function dateFormatter(date) {
    let formatter = new Intl.DateTimeFormat("ru");
    date = new Date(parseInt(date, 10));
    date = formatter.format(date);
    return date;
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

//вызов функции по сочетанию клавишь
function runOnKeys(func, elem) {
    let codes = [].slice.call(arguments, 2);

    let pressed = {};

    elem.onkeydown = function (e) {
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

    elem.onkeyup = function (e) {
        e = e || w.event;

        delete pressed[e.keyCode];
    };
}

//ajax запрос
function loadByAjax(path, success, error) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {

            if (xhr.status === 200) {
                if (success) {
                    success(xhr.responseText);
                }

            } else {
                if (error) {
                    error(xhr);
                }
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

// формирование строки с нужным окончанием в зависимости от числа
// например - минута, минуты, минут
function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function findInArray(arr, val) {
    return arr.indexOf(val);
}




/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__addCSSSelectors_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modyfiComments_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__calculateElapsedTime_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__goToTask_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__countWorkerTime_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__taskFooterDesign_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__elemsModification_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__saveNewComment_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__copyPasteCommentQuote_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__taskUpdateNotify_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__anchorLink_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__userSettings_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__calcTimeLeftInDartTask_js__ = __webpack_require__(26);

if(true) {
    console.time('total');
}







//import {commentsDesign} from './commentsDesign.js';





















//import {taskHeaderDesign} from './taskHeaderDesign.js'



const action_page = __WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* getURLAction */]();

switch (action_page) {
    case 'new':
        __WEBPACK_IMPORTED_MODULE_12__userSettings_js__["a" /* userSettings */]();
        break;
    case 'red':
        __WEBPACK_IMPORTED_MODULE_1__addCSSSelectors_js__["a" /* addPageElems */]();
        __WEBPACK_IMPORTED_MODULE_7__elemsModification_js__["a" /* elemsModification */]();
        __WEBPACK_IMPORTED_MODULE_2__modyfiComments_js__["a" /* modyfiComments */]();

        if(true){
            __WEBPACK_IMPORTED_MODULE_5__countWorkerTime_js__["a" /* countWorkerTime */]();
        }else{
            if (localStorage.getItem('worker-time-count') === 'true') {
                countWorkerTime();

                if(window.location.host === 'support.dartit.ru'){
                    calcTimeLeft();
                }
            }
        }

        __WEBPACK_IMPORTED_MODULE_8__saveNewComment_js__["a" /* saveNewComment */]();
        __WEBPACK_IMPORTED_MODULE_3__calculateElapsedTime_js__["a" /* calculateElapsedTime */]();
        //commentsDesign();
        __WEBPACK_IMPORTED_MODULE_6__taskFooterDesign_js__["a" /* taskFooterDesign */]();
        __WEBPACK_IMPORTED_MODULE_9__copyPasteCommentQuote_js__["a" /* copyPasteCommentQuote */]();
        __WEBPACK_IMPORTED_MODULE_10__taskUpdateNotify_js__["a" /* taskUpdateNotify */]();
        __WEBPACK_IMPORTED_MODULE_4__goToTask_js__["a" /* goToTaskDatalist */]();
        __WEBPACK_IMPORTED_MODULE_11__anchorLink_js__["a" /* anchorLink */]();
        //taskHeaderDesign();
        break;
    case 'user_page':
        __WEBPACK_IMPORTED_MODULE_1__addCSSSelectors_js__["a" /* addPageElems */]();
        __WEBPACK_IMPORTED_MODULE_4__goToTask_js__["a" /* goToTaskDatalist */]();
        break;
}

if(true){
    console.timeEnd('total');
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addPageElems; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__finders_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pcss_userscript_pcss__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pcss_userscript_pcss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__pcss_userscript_pcss__);
//сюда добаляются элементы страницы в которые вставляются созданые скриптом блоки
//и.или они модифицируются скриптом



function addPageElems() {
    let $content_cell = document.querySelector('form[name="theForm"]');
    $content_cell.setAttribute('id', 'main-content');

    let $comments_tbl = $content_cell.getElementsByTagName("TABLE")[0];

    if($comments_tbl){
        $comments_tbl.setAttribute('id', 'comments-tbl');

        let rows = __WEBPACK_IMPORTED_MODULE_0__finders_js__["b" /* getAllCommentsRows */]();

        rows.map(function (row) {
            row.querySelectorAll('td')[5].firstElementChild.classList.add('comment-wrap');
        });
    }

    let input_div = document.querySelector('div.input_box'); //есть на странице задачи

    if (input_div) {
        input_div.id = 'task-bar';
        let $user_toolbar = document.createElement('DIV');
        $user_toolbar.setAttribute('id', 'user-toolbar');
        $user_toolbar.classList.add('user-toolbar');

        input_div.appendChild($user_toolbar);
    }

    //подвал задачи
    let $task_footer = document.querySelectorAll('table.theForm');

    if($task_footer.length){
        //обертка
        $task_footer = $task_footer[0];
        $task_footer.id = 'task-footer';

        //таблица с textarea камента
        let $footer_tbls = $task_footer.querySelectorAll('table');

        let $commentTbl = $footer_tbls[0];
        $commentTbl.id = 'tbl-new-comment';

        //обертка ячейки с textarea
        let $newComment = $commentTbl.querySelectorAll('td')[1];
        $newComment.id = 'new-comment-wrap';

        //добавлю обертку для textarea
        //в нее буду вставлять кнопки всякие
        let $tareaWrap = document.createElement('div');
        $tareaWrap.id = 'tarea-wrap';
        $tareaWrap.classList.add('tarea-wrap');

        $tareaWrap.appendChild(document.getElementById('text'));
        $newComment.appendChild($tareaWrap);

        //Таблица статусов задачи
        let $statusTbl = $footer_tbls[1].querySelector('table');
        $statusTbl.id = 'tbl-status';
    }
    //заголовок задачи
    let taskTitle = document.querySelector('h1');

    taskTitle.id = 'task-title';
}





/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--0-1!../../node_modules/postcss-loader/lib/index.js!./userscript.pcss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--0-1!../../node_modules/postcss-loader/lib/index.js!./userscript.pcss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/*reset style.css*/:root .input_box button,:root .input_box input{margin-left:0}\r\n\r\n/*reset style.css*/#main-content{\r\n    /*убираю лишние отступы и br чтобы уменьшить дыру под полями камента*/margin-bottom:0}#main-content br:last-child{display:none}.onoff-opt{margin:0 6px 0 10px}.none{display:none!important}.hidden-elem{position:fixed!important;left:-999em;z-index:-1;visibility:hidden}.none.view{display:block!important}.ch_addr{margin:10px 10px 10px 0;vertical-align:top}.totop>input{margin:10px 0 0}.label_head{display:block;margin:0 0 20px}.clearfix:after,.clearfix:before{content:\"\";display:table;clear:both}.alist{float:right}.alist p{margin:0 0 10px;line-height:1;text-align:right}.bar-wrap{padding:8px 15px;background:#2d2d2d}#custom-project-list>li,#custom-workers-list>li{width:20%;float:left;cursor:pointer}#custom-project-list>li:first-child{display:none}.user-list{margin:2em 1em;padding:0;list-style-position:inside}.user-list>li{line-height:1.5}.selected{color:green}.btn-flat{padding:.5em;background:#f0f0f0;cursor:pointer}.btn-flat,.row-item{display:inline-block}.row-item{vertical-align:top}.row-item:not(:last-child){margin-right:1em}#settings-btn{margin:0 0 20px}#settings-box{display:none;margin:20px 0;padding:20px 0;outline:1px solid #414141}#settings-box.is-open{display:block}.user-title{color:#000;margin:0 0 .6em;font-size:20px;padding:0}.regular-link{color:#0054b9;outline:0!important}.time-list p{margin:5px 0;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.time-list>p>span:first-child{padding-right:1em;cursor:pointer}:root .time-list-total{margin-top:1em;border-top:1px solid}.comment-collapsed{max-height:70px;overflow:hidden!important}.long-comment{width:100%!important;position:relative;padding-top:30px}.btn-collapse{position:absolute;top:0;right:0}.btn-collapse-all{position:fixed;top:10px;right:10px}:root .dates-list{width:150px;display:inline-block;margin:0 20px 0 0}.user-toolbar{margin:20px 0;padding:20px 10px;border-top:1px solid rgba(0,0,0,.7);overflow:hidden;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.user-toolbar__item{padding:10px 15px;background:hsla(0,0%,100%,.6);box-shadow:0 1px 1px rgba(0,0,0,.6)}:root .user-toolbar-title{margin:0 0 1em;padding:0;color:#000}:root #comments-tbl .comment-wrap{font-size:14px;width:100%!important;max-width:800px;overflow:hidden}:root #comments-tbl h1{font-size:120%;font-weight:400;margin:0 0 .4em;color:inherit}:root #comments-tbl blockquote{padding:10px 20px;margin:0 0 20px;border-left:5px solid #ccc}:root #comments-tbl blockquote p{margin:0}:root #comments-tbl blockquote p:not(:last-child){margin-bottom:1em}:root #comments-tbl ul{padding-left:.6em;list-style-position:inside}\r\n\r\n/*typo*/.section-title{color:inherit;margin:0 0 1em;padding:0!important}.s-info{color:gray;font-size:12px}\r\n\r\n/*вставка текста из local storage*/.btn-insert-ls{position:absolute;top:100%;right:2em;transition:transform .3s}.btn-insert-ls.is-visible{transform:translateY(-150%)}\r\n\r\n/*\r\n    добавление иконки подписки на уведомление о новых каментах\r\n    в заголовок задачи\r\n*/.add-alert{width:24px;height:24px;display:inline-block;background-image:url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+ICAgIDxwYXRoIGQ9Ik0xMC4wMSAyMS4wMWMwIDEuMS44OSAxLjk5IDEuOTkgMS45OXMxLjk5LS44OSAxLjk5LTEuOTloLTMuOTh6bTguODctNC4xOVYxMWMwLTMuMjUtMi4yNS01Ljk3LTUuMjktNi42OXYtLjcyQzEzLjU5IDIuNzEgMTIuODggMiAxMiAycy0xLjU5LjcxLTEuNTkgMS41OXYuNzJDNy4zNyA1LjAzIDUuMTIgNy43NSA1LjEyIDExdjUuODJMMyAxOC45NFYyMGgxOHYtMS4wNmwtMi4xMi0yLjEyek0xNiAxMy4wMWgtM3YzaC0ydi0zSDhWMTFoM1Y4aDJ2M2gzdjIuMDF6Ii8+PC9zdmc+);cursor:pointer}#task-title .add-alert{vertical-align:middle;opacity:.5}#task-title .add-alert.selected{opacity:1}#text{resize:vertical}", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return modyfiComments; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__finders_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loaders_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commentsDesign_js__ = __webpack_require__(11);
if (true) {
    console.time('load modyfiComments');
}





//поиск ссылок в тексте комментариев и оборачивание их в <a>
//сворачивание длинных комментариев, добавление кнопки Свренуть.развернуть все

function modyfiComments() {
    'use strict';


    let rows = __WEBPACK_IMPORTED_MODULE_0__finders_js__["b" /* getAllCommentsRows */]();

    __WEBPACK_IMPORTED_MODULE_1__loaders_js__["a" /* addjs */]('https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.3.1/markdown-it.min.js', function () {
        goMarkdown(rows);
        __WEBPACK_IMPORTED_MODULE_2__commentsDesign_js__["a" /* commentsDesign */]();
    });

    //парсер markdown

    function goMarkdown(rows) {

        let md = markdownit();
        md.options.html = true;
        md.options.linkify = true;
        md.options.typographer = true;
        md.options.breaks = true;

        rows.map(function (row) {
            addMarkdown(row, md);
        });

        function addMarkdown(row, md) {
            let comment = __WEBPACK_IMPORTED_MODULE_0__finders_js__["d" /* getCommentFromRow */](row);

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
                    item = replaceHtmlGtToSymbol(item.trim());
                    item = renderMdString(item, md);
                }

                return '<p>' + item + '</p>';
            });

            comment.innerHTML = replaceURLWithHTMLLinks(blocks.join(''));
        }

        function renderMdString(str, md) {
            let mdc = ['#', '*', '-', '>'];

            if (mdc.indexOf(str.charAt(0)) > -1) {
                str = md.render(str);
            } else {
                //+'<br>' нужно чтобы было похоже на исходное форматирование
                str = str + '<br>';
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
                //console.log(symbol);
                //console.log((str.match(/\n/g)||[]).length);
                //str = str.replace(/\n/g, '<br>');
                //console.log(str);
                str = '<p>' + str + '</p>'
        }

        return str + space;
    }

    function replaceURLWithHTMLLinks(text) {
        const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(exp, '<a href="$1" class="regular-link">$1</a>');
    }
}



if (true) {
    console.timeEnd('load modyfiComments');
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addjs;
//подключение строннего js в head
function addjs(url, callback, params) {
    let head = document.getElementsByTagName('head')[0];

    let s = document.createElement('script');

    s.onload = function () {
        callback();
    };

    s.src = url;

    if(params){
        Object.keys(params).forEach(function (key) {
            s.setAttribute(key,params[key])
        });
    }

    head.appendChild(s);
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return commentsDesign; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__finders_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pcss_commentsDesign_pcss__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pcss_commentsDesign_pcss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__pcss_commentsDesign_pcss__);
if(true){
    console.time('load commentsDesign');
}



function commentsDesign() {
    //переделка внешнего вида каментов
    'use strict';

    createTemplate();

    let tbl = document.getElementById('comments-tbl');

    let rows = __WEBPACK_IMPORTED_MODULE_0__finders_js__["b" /* getAllCommentsRows */]();

    //rows[0].parentNode.removeChild(rows[0].previousElementSibling);
    //скрываю, а не удаляю чтобы не менять уже используемые функции
    //выбирающие строки с каментами и игнорирующие первую строку.
    //Если удалять то получится что первый камент не будет обрабатываться
    rows[0].previousElementSibling.classList.add('hidden-elem');
    //т.к. в дарте добавили строк предыдущая строка не скрывает строку с заголовками столбцов
    //поэтому еще
    tbl.querySelector('tr').classList.add('hidden-elem');

    rows.map(function (item, i) {
        let td = Array.from(item.querySelectorAll('td'));

        let block = document.getElementById('comment-template').cloneNode(true);
        block.removeAttribute('id');

        item.appendChild(block);

        let rows = block.querySelectorAll('.b-comment__row');

        let row1 = create1row(td, i);
        rows[0].appendChild(row1);

        rows[1].appendChild(create2row(td));
        rows[2].appendChild(create3row(td));

        let files = create4row(td);

        if (!!files.length) {
            let pics = ['png', 'jpg', 'gif'];

            files.map(function (item) {
                let ext = item.href.lastIndexOf('.');
                ext = item.href.slice(ext + 1, item.href.length);

                if (pics.indexOf(ext.toLowerCase()) > -1) {
                    item = createImgThumb(item);
                } else {
                    item = createDocsThumb(item);
                }

                rows[3].appendChild(item);
            });
        } else {
            rows[3].classList.add('none');
            //block.removeChild(rows[3]);
        }

        //cтрока скрыта
        //rows[4].classList.add('is-hidden');
        //rows[4].appendChild(create5row(td));

        //становится видимой при наведении курсора на карточку камента
        block.addEventListener('mouseenter', function () {
            showActionsBtn(this);
        });

        block.addEventListener('mouseleave', function () {
            showActionsBtn(this);
        });

        //вместо удаления из DOM или навешивания класса на каждый td
        //вешаю класс на таблицу после обработки всех строк
        /*td.map(function (tditem) {
            //tditem.classList.add('none');
            if (tditem) {
                item.removeChild(tditem);
            }
        });*/
    });

    //наследуясь от этого класса скрываю td в строках таблицы
    //после создания карточек каментов
    tbl.classList.add('hide-original');

    function create1row(td, rownumber) {
        let fragment = document.createDocumentFragment();

        let rowItemProto = document.createElement('div');

        let rowItem = rowItemProto.cloneNode(true);

        //дата
        rowItem.classList.add('comment-date');
        rowItem.id = 'comment-date';
        rowItem.innerHTML = td[3].textContent;

        fragment.appendChild(rowItem);

        //id checkbox
        rowItem = rowItemProto.cloneNode(true);
        rowItem.appendChild(td[0].firstElementChild);
        rowItem.classList.add('id-checkbox');
        fragment.appendChild(rowItem);

        //приоритет и срок исполнения
        rowItem = rowItemProto.cloneNode(true);
        rowItem.classList.add('task-rank');

        rowItem.innerHTML = td[8].textContent + ' приоритет';

        let deadline = td[7].textContent;

        if (deadline.length > 1) {
            rowItem.innerHTML = rowItem.innerHTML + '.<b class="deadline-date">Сдать ' + deadline + '</b>';
        }

        fragment.appendChild(rowItem);

        //письма,ссылка,статус
        rowItem = rowItemProto.cloneNode(true);
        rowItem.classList.add('row-right');

        let status = rowItemProto.cloneNode(true);
        status.textContent = td[9].textContent;
        status.classList.add('task-status');
        rowItem.appendChild(status);

        let letter = td[1].querySelectorAll('img')[1];
        letter.classList.add('letter-addr');
        rowItem.appendChild(letter);

        let link = td[1].querySelectorAll('a')[1];
        link.classList.add('comment-link');
        rowItem.appendChild(link);

        //номер комментария
        let no = rowItemProto.cloneNode(true);
        no.classList.add('comment-no');
        no.innerHTML = rownumber;
        rowItem.appendChild(no);

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
        //author.innerHTML = 'Автор <br>' + td[4].textContent;
        author.innerHTML = td[4].textContent;
        rowItem.appendChild(author);

        //исполнитель
        let worker = document.createElement('span');
        worker.classList.add('comment-worker');
        //worker.innerHTML = 'Исполнитель <br>' + td[6].textContent;
        worker.innerHTML = td[6].textContent;
        rowItem.appendChild(worker);

        fragment.appendChild(rowItem);

        let workTime = rowItemProto.cloneNode(true);
        workTime.classList.add('work-time');

        let timeStr = td[10].textContent.split('/');

        /*timeStr[0] = createTimeTitleString(timeStr[0], ['Затрачена', 'Затрачено', 'Затрачено'])+
         ' '+ createTimeString(timeStr[0], ['минута', 'минуты', 'минут']);*/

        timeStr[0] = '<span class="elapsed-time">' + timeStr[0] + ' мин.</span>';
        workTime.innerHTML = timeStr[0];

        // if (isNaN(Number(timeStr[1]))) {
        //     workTime.innerHTML = timeStr[0];
        // }else{
        //     timeStr[1] = ' из '+timeStr[1];
        //     workTime.innerHTML = timeStr.join(' ');
        // }

        fragment.appendChild(workTime);

        return fragment;
    }

    function create3row(td) {
        let fragment = document.createDocumentFragment();

        let rowItemProto = document.createElement('div');

        //комментарий
        let rowItem = rowItemProto.cloneNode(true);
        rowItem.classList.add('comment-body');

        rowItem.appendChild(td[5].firstElementChild.cloneNode(true));

        fragment.appendChild(rowItem);

        //обертка для кнопок Удалить и Редактировать
        let rowItemWrap = rowItemProto.cloneNode(true);
        rowItemWrap.classList.add('actions-btn-wrap');
        //удалить

        if (td[11].firstElementChild) {
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

    function create4row(td) {
        return Array.from(td[2].querySelectorAll('a'));
    }

    // function create5row(td) {
    //     let fragment = document.createDocumentFragment();
    //
    //     let rowItemProto = document.createElement('div');
    //
    //     let rowItem = rowItemProto.cloneNode(true);
    //
    //     //обертка для кнопок Удалить и Редактировать
    //     let rowItemWrap = rowItemProto.cloneNode(true);
    //     rowItemWrap.classList.add('actions-btn-wrap');
    //
    //     //удалить
    //
    //     if (td[11].firstElementChild) {
    //         rowItem = rowItemProto.cloneNode(true);
    //         rowItem.classList.add('btn-del-comment');
    //         rowItem.appendChild(td[11].firstElementChild);
    //         rowItemWrap.appendChild(rowItem);
    //     }
    //
    //     //редактировать
    //     rowItem = rowItemProto.cloneNode(true);
    //     rowItem.classList.add('btn-edit-comment');
    //     rowItem.appendChild(td[1].firstElementChild);
    //     rowItemWrap.appendChild(rowItem);
    //
    //     fragment.appendChild(rowItemWrap);
    //
    //     return fragment;
    // }
}

function createImgThumb(item) {
    let wrap = document.createElement('div');
    wrap.classList.add('img-thumb', 'file-thumb');

    let pic = document.createElement('img');
    pic.src = item.getAttribute('href');
    pic.classList.add('thumb-pic');

    item.appendChild(pic);

    let title = getAttachTitle(item);
    wrap.appendChild(item);
    wrap.appendChild(title);

    wrap.addEventListener('mouseenter', function () {
        let bigpic = pic.cloneNode(false);
        bigpic.classList.add('large-pic-preview');
        bigpic.classList.remove('thumb-pic');
        this.appendChild(bigpic);
    });

    wrap.addEventListener('mouseleave', function () {
        this.removeChild(this.querySelector('.large-pic-preview'));
    });

    return wrap;
}

function createDocsThumb(item) {
    item.classList.add('doc-thumb', 'file-thumb');
    item.appendChild(getAttachTitle(item));
    item.removeChild(item.firstElementChild);
    return item;
}

function getAttachTitle(item) {
    let title = item.firstElementChild.title;
    let wrap = document.createElement('div');
    wrap.textContent = title;
    wrap.classList.add('attach-title');
    return wrap;
}

function createTemplate() {
    let wrap = document.createElement('template');
    let block = document.createElement('div');
    block.classList.add('b-comment');
    block.id = 'comment-template';

    let blockRow;

    for (let i = 0; i < 4; i++) {
        blockRow = document.createElement('div');
        blockRow.classList.add('b-comment__row', 'b-comment__row_' + i);
        block.appendChild(blockRow)
    }

    wrap.appendChild(block);

    document.body.appendChild(wrap);

    return wrap;
}

function showActionsBtn(camment) {
    let btns = camment.querySelector('.actions-btn-wrap');
    btns.classList.toggle('is-visible');
}





if(true){
    console.timeEnd('load commentsDesign');
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--0-1!../../node_modules/postcss-loader/lib/index.js!./commentsDesign.pcss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--0-1!../../node_modules/postcss-loader/lib/index.js!./commentsDesign.pcss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".b-comment__row:last-child{padding-bottom:2em}.comment-wrap p:only-of-type{margin:0}.comment-wrap p:last-child{margin-bottom:0}#comments-tbl{margin:auto;padding:3em 0;background:#f0f0f0}#comments-tbl.hide-original tr>td{display:none}#comments-tbl,#comments-tbl tbody,#comments-tbl tr{display:block}#comments-tbl tr:not(:last-child){margin-bottom:2em}.comment-body{width:100%}.comment-wrap p{line-height:1.4\r\n\r\n        /*\r\n        //где-то таки вставляются лишние переводы строк\r\n        //сделаю такой грязный хак\r\n        */\r\n        /*& br:first-child,\r\n        & br:last-child{\r\n            display: none;\r\n        }*/}.comment-wrap p:first-child{margin-top:0}.b-comment{max-width:720px;margin:auto;background:#fafafa;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);width:100%;font-size:12px;\r\n    /*display: flex;\r\n    flex-flow: column wrap;*/position:relative;box-sizing:border-box}.b-comment.b-comment_notify{margin-top:2em;padding:2em;color:#31708f;background:#d9edf7;border:1px solid #bce8f1}.b-comment.b-comment_notify .comments-update-link{display:inline-block;padding-left:1em;color:inherit}.b-comment__row{padding:1em 2em;display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;position:relative}.b-comment__row:first-child{padding-top:2em}.b-comment__row:first-child .row-right{top:2em}\r\n\r\n/*//1 row шапка*/.b-comment__row_0{color:gray}.task-rank,.task-status{padding:0 .5em 0 2em}.deadline-date{padding-left:1em}.id-checkbox{position:absolute;visibility:hidden;z-index:-1}.comment-link,.comment-no{margin-right:0!important}\r\n\r\n/*//2 row автор - исполнитель*/.b-comment__row.b-comment__row_1{padding-top:0;-ms-flex-pack:justify;justify-content:space-between;color:gray}.comment-info>span{display:inline-block;vertical-align:top}.comment-author{padding-right:2em;position:relative}.comment-author:after{content:\"\\2192\";position:relative;left:1em}\r\n\r\n/*//3 row текст камента*/.b-comment__row_2{font-size:14px;background:#fff;border-top:1px solid hsla(0,0%,63%,.2);border-bottom:1px solid hsla(0,0%,63%,.2);position:relative;overflow:hidden}\r\n\r\n/*и кнопки Удалить, Редактировать*/.actions-btn-wrap{padding:1em;position:absolute;top:100%;right:0;transition:transform .3s}.actions-btn-wrap.is-visible{transform:translateY(-100%)}.btn-del-comment,.btn-edit-comment{display:inline-block;vertical-align:middle;height:24px;line-height:24px;position:relative;z-index:1}.btn-edit-comment{\r\n    /*width: 140px;*/margin-left:.5em;\r\n    /*border: 1px solid #ADADAD;*/top:3px}.btn-del-comment{width:70px\r\n    /*width: 100px;*/}\r\n\r\n/*.btn-edit-comment:after,*/.btn-del-comment:after{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:-1;content:\"\\423\\434\\430\\43B\\438\\442\\44C\";color:#ccc;line-height:normal;border-bottom:1px solid}\r\n\r\n/*.btn-edit-comment:after {\r\n    content: 'Редактировать';\r\n    width: 100%;\r\n    text-align: center;\r\n    background: #E1E1E1;\r\n}*/\r\n\r\n/*.btn-edit-comment img,*/.btn-del-comment img{display:none}\r\n\r\n/*.btn-edit-comment a,*/.btn-del-comment a{width:100%;height:100%;position:absolute}\r\n\r\n/*//4 row файлы*/.b-comment__row.b-comment__row_3{padding-top:1.5em;padding-bottom:1.5em;-ms-flex-align:start;align-items:flex-start}\r\n\r\n/*//5 row подвал*/.b-comment__row_3+.b-comment__row_4{border-top:1px solid hsla(0,0%,63%,.2)}.b-comment__row.b-comment__row_4{-ms-flex-pack:end;justify-content:flex-end}\r\n\r\n/*----*/.row-right{position:absolute;top:1em;right:2em}.row-right>*{display:inline-block;vertical-align:middle}.row-right>:not(:last-child){margin-right:.7em}.img-thumb{max-width:150px}.img-thumb img:first-child{display:none}.img-thumb>a{display:block}.img-thumb .attach-title{margin-top:.3em}.thumb-pic{width:100%;\r\n    /*height: calc(100% - 2em);*/object-fit:cover;max-height:200px;border:1px solid #ccc}\r\n\r\n/*большая картинка, вставляетсяв блок при наведении на превью*/.large-pic-preview{max-width:40vw;border:1px solid gray;position:absolute;top:90%;left:0;\r\n    /*left: 50%;*/\r\n    /*transform: translateX(-50%);*/z-index:1}.doc-thumb{max-width:150px;background:#f3f3f3;font-size:11px;border:1px solid #ccc;\r\n    /*line-height: 58px;*/text-align:center;text-decoration:none;color:inherit}.doc-thumb .attach-title{width:100%;padding:0 .5em;line-height:1.6;word-break:break-all;box-sizing:border-box;position:absolute;top:50%;transform:translateY(-50%)}.file-thumb{-ms-flex:1 1 25%;flex:1 1 25%;min-height:70px;position:relative}.file-thumb:nth-child(n+7){margin-top:2em}.file-thumb:not(:last-child){margin-right:1em}.attach-title{max-width:150px;text-align:center;line-height:normal;word-break:break-all}#comments-tbl tr:last-child .b-comment__row_0,#comments-tbl tr:last-child .b-comment__row_1{color:#000}", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calculateElapsedTime; });
if (true) {
    console.time('load calculateElapsedTime');
}

//калькулятор в поле ввода затраченного времени
function calculateElapsedTime() {
    'use strict';

    let timeElapsedField = document.getElementById('spended_time');

    if(!timeElapsedField){
        console.info('Не найдено поле ввода времени выполнения');
        return false;
    }

    // Удаление обработчика нажатия клавиш для поля 'spended_time'
    timeElapsedField.onkeyup = null;

    // Добавление события для вычисления затраченного времени для поля 'spended_time'
    timeElapsedField.addEventListener('change', function () {
        let cur_value = this.value;

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
        }
    });
}

// function minToDays(timeInMinutes, dayInHours = 8) {
//     let retStr = "";
//
//     if ((timeInMinutes !== null) && (!isNaN(timeInMinutes)) && (timeInMinutes > 0)) {
//         dayInHours = dayInHours << 0;
//         if ((dayInHours === undefined) || (dayInHours === null) || (isNaN(dayInHours)) || (dayInHours < 1)) dayInHours = 24;
//         let tD, tH, tM;
//         tD = (timeInMinutes / dayInHours / 60) << 0;
//         retStr += tD > 0 ? tD + " д. " : "";
//         timeInMinutes -= tD * dayInHours * 60;
//         tH = (timeInMinutes / 60) << 0;
//         retStr += tH > 0 ? tH + " ч. " : "";
//         timeInMinutes -= tH * 60;
//         tM = timeInMinutes << 0;
//         retStr += tM + " мин." + " (" + dayInHours + "-часовой день)";
//     } else {
//         retStr += "Что-то со временем не так :(";
//     }
//     return retStr;
// }



if (true) {
    console.timeEnd('load calculateElapsedTime');
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return goToTaskDatalist; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__finders_js__ = __webpack_require__(0);
if (true) {
    console.time('load goToTaskDatalist');
}



function goToTaskDatalist() {
    'use strict';

    let taskId = __WEBPACK_IMPORTED_MODULE_0__finders_js__["g" /* getTaskId */]();

    let taskTitle = __WEBPACK_IMPORTED_MODULE_0__finders_js__["f" /* getTaskHead */]().title;

    let data = JSON.parse(localStorage.getItem('datalist')) || [];
    data = appendId(data);

    //если на странице есть заголовок задачи
    // - проверить есть ли она в списке
    if (taskTitle) {

        let newdata = {"id": taskId, "title": taskTitle + ' ' + taskId};

        data = appendId(data, newdata);

        localStorage.setItem('datalist', JSON.stringify(data));
    }

    //создам datalist
    let datalist = document.createElement('datalist');
    datalist.id = 'dl-gototask';
    document.body.appendChild(datalist);

    //связать datalist с полем ввода id задачи
    let idField = document.getElementById('goTo');
    idField.removeAttribute('style');
    idField.setAttribute('list', 'dl-gototask');

    for (let i = 0; i < data.length; i++) {
        let op = document.createElement('option');
        op.value = data[i].id;
        op.label = data[i].title;
        datalist.appendChild(op);
    }

    function appendId(arr, newdata = false) {
        if (newdata) {
            let check = arr.some(function (item) {
                return item.id === newdata.id;
            });

            if (!check) {
                arr.push(newdata);
            }

            if (arr.length > 10) {
                arr.shift();
            }
        }

        return arr;
    }
}



if (true) {
    console.timeEnd('load goToTaskDatalist');
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return countWorkerTime; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__finders_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(1);
if (true) {
    console.time('load countWorkerTime');
}




function countWorkerTime() {
    'use strict';
    let $input_box = document.getElementById('user-toolbar');
    let rows = __WEBPACK_IMPORTED_MODULE_0__finders_js__["b" /* getAllCommentsRows */]();
    let workers = __WEBPACK_IMPORTED_MODULE_0__finders_js__["c" /* getAllWorkers */]();
    let dates_collection = [];
    let date_str;

    for (let i = 0; i < rows.length; i++) {
        date_str = rows[i].children[3].textContent;
        date_str = date_str.split(' ');
        dates_collection.push(__WEBPACK_IMPORTED_MODULE_1__utils_js__["a" /* createISODate */](date_str[0]));
    }

    let dates_arr = __WEBPACK_IMPORTED_MODULE_1__utils_js__["d" /* eliminateDuplicates */](dates_collection);

    let createDatesList = function (input_box, dates) {

        function createList(css_id, css_class) {
            let list = document.createElement('SELECT');
            list.setAttribute('id', css_id);
            list.classList.add(css_class);
            return list;
        }

        let box = document.createElement('DIV');
        box.classList.add('user-toolbar__item');

        let start_list = createList('date-start-list', 'dates-list');

        let end_list = createList('date-end-list', 'dates-list');

        let btn = document.createElement('BUTTON');
        btn.setAttribute('type', 'button');
        btn.textContent = 'Посчитать';

        let option, cln_option, listdate;

        for (let i = 0; i < dates.length; i++) {
            listdate = __WEBPACK_IMPORTED_MODULE_1__utils_js__["b" /* dateFormatter */](parseInt(dates[i], 10));
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

        let title = document.createElement('H3');
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

    let timelist = createTimeList(workers, rows);

    let $timelist = createTimeListView(timelist);

    $timelist.classList.add('user-toolbar__item');

    //добавляем строку с общим временем всех сотрудников
    //третий параметр true - ставит класс-маркер выбранных работников
    insertTotalTime($timelist, timelist, true);

    // добавляем клик по строке для подсчета времени выбранных работников
    $timelist.addEventListener('click', function (e) {
        if(!e.target.classList.contains('time-list-total')){
            countSelectedWorkersTime(this, e);
        }
    });

    let $title = document.createElement('H3');
    $title.textContent = 'Вся задача';
    $title.classList.add('user-toolbar-title');
    $timelist.insertBefore($title, $timelist.firstChild);
    $timelist.classList.add('user-toolbar__item');

    let date_lists = createDatesList($input_box, dates_arr);

    // добавляю селекты с датами - подсчет времени за выбранный период
    findTimeInDatesRange(date_lists, workers, rows);

    $input_box.insertBefore($timelist, $input_box.lastChild);

    //http://stackoverflow.com/questions/2558977/ajax-cross-domain-call
}

// создание объекта со списком сотруднков и времени каждого в задаче
function createTimeList(workers, rows) {

    let ntime, name, tsum;
    let timelist = {};

    for (let s = 0; s < workers.length; s++) {
        tsum = 0;

        for (let i = 0; i < rows.length; i++) {
            ntime = __WEBPACK_IMPORTED_MODULE_0__finders_js__["e" /* getRowTimeString */](rows[i]);

            if (rows[i].children[4]) {
                //до запуска cammentsDesign();
                name = rows[i].children[4].textContent;
            } else {
                //после запуска cammentsDesign();
                name = rows[i].querySelector('.comment-author').textContent;
            }

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
    let $timelist = document.createElement('DIV');
    $timelist.classList.add('time-list');
    $timelist.id = 'workers-time';

    let list_item;
    let workertime;
    let totaltime = 0;

    for (let k in data) {
        workertime = data[k];
        totaltime += workertime;
        list_item = document.createElement('p');
        list_item.dataset.workertime = workertime;
        list_item.innerHTML = '<span>' + k + '</span> <span>' + workertime + '</span>';
        $timelist.insertBefore(list_item, $timelist.lastChild);
    }

    return $timelist;
}

function findTimeInDatesRange(lists, workers, rows) {
    let $start_list = lists.start_list;
    let $end_list = lists.end_list;
    let $box = lists.box;
    let $btn = lists.btn;

    function findRowsInRange(rows, start, end) {

        return rows.filter(function (item) {
            let item_date = __WEBPACK_IMPORTED_MODULE_1__utils_js__["f" /* getRowDateString */](item);

            if (item_date >= start && item_date <= end) {
                return item;
            }
        });
    }

    $btn.addEventListener('click', function () {

        let find_rows = findRowsInRange(rows, $start_list.value, $end_list.value);

        let range_timelist = createTimeList(getSelectedWorkers(), find_rows);
        let $range_timelist = createTimeListView(range_timelist);

        if ($box.querySelector('#range-timelist')) {
            $box.removeChild(document.getElementById('range-timelist'));
        }

        $range_timelist.setAttribute('id', 'range-timelist');

        $box.appendChild($range_timelist);

        insertTotalTime($range_timelist, range_timelist);
    });
}

function getSelectedWorkers() {
    let selected_workers = document.getElementById('workers-time').querySelectorAll('.selected');
    let selected_names = [];

    for (let i = 0; i < selected_workers.length; i++) {
        selected_names.push(selected_workers[i].firstElementChild.textContent);
    }

    return selected_names;
}

//подсчет времени выбранных участников задачи (из списка всех участников)
function countSelectedWorkersTime(list, event) {
    let target = event.target;
    let $total = document.getElementById('workers-time-total');
    let total = parseInt($total.dataset.totaltime);

    while (target !== list) {
        if (target.tagName === 'P') {
            recountTotal(target, $total, total);
            return;
        }

        target = target.parentNode;
    }

    function recountTotal(elem, total, totaltime) {
        let elemtime = parseInt(elem.dataset.workertime);

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

// подсчет общего времени всех сотрудников для списка сотрудник-время
function insertTotalTime(timelist, data, addmarker) {
    let totaltime = 0;
    let total = document.createElement('p');

    for (let k in data) {
        totaltime += data[k];
    }

    if (addmarker) {
        let list_items = timelist.querySelectorAll('p');
        //по умолчанию все работники выбраны, считается общее время по всем
        //всем добавляем класс selected нужный для фильтрации списка
        //и чтобы визуально отметить выбранных в списке
        for (let i = 0; i < list_items.length; i++) {
            list_items[i].classList.add('selected');
        }
    }

    total.innerHTML = '<span>Всего:</span> <span id="workers-time-total" data-totaltime="' + totaltime + '">' + totaltime + '</span>';
    total.classList.add('time-list-total');
    timelist.appendChild(total);

    return totaltime;
}



if (true) {
    console.timeEnd('load countWorkerTime');
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return taskFooterDesign; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pcss_taskFooterDesign_pcss__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pcss_taskFooterDesign_pcss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pcss_taskFooterDesign_pcss__);
if(true){
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






if(true){
    console.timeEnd('load taskFooterDesign');
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--0-1!../../node_modules/postcss-loader/lib/index.js!./taskFooterDesign.pcss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--0-1!../../node_modules/postcss-loader/lib/index.js!./taskFooterDesign.pcss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "#task-footer tr:nth-child(2){height:0;overflow:hidden}.fake-file-input .btn-fake-file{padding:.7em 0 0;text-align:center;display:inline-block;font-size:16px;color:#82a5c3;cursor:pointer}.fake-file-input .btn-fake-file span{width:100%;display:inline-block;font-size:12px}.fake-file-input>input{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0}#FileInputs br{display:none}.task-type>div select{margin-top:.3em}.task-type>div br{display:none}.email-send-list>li:after{content:\"\\1F7A9\";margin-left:.4em;color:red;display:inline-block;cursor:pointer}.add-email #getEmailAddressesButton{display:none\r\n        /*width: 90px;\r\n        display: inline-block;\r\n        vertical-align: middle;*/}.add-email #add_email_worker{width:226px;display:inline-block;vertical-align:middle}.add-email #add_email{position:absolute;visibility:hidden;z-index:auto}.add-email label{display:block}:root .deadline-calendar #end_date{width:auto!important}:root .deadline-calendar input[type=button]{display:none}:root .deadline-calendar>img{position:absolute;top:.4em;right:.5em}:root .deadline-calendar>input[type=text]{padding-right:30px}.task-row-2 .time-block>div:after{content:\"\\43C\\438\\43D\";margin-left:.5em;display:inline-block;vertical-align:middle}.worker-block select{width:100%;margin:.5em 0 0}.task-fields-row .frow-col-2-2{width:120px}.task-fields-row .frow-col-2-1{width:190px;margin-right:30px}.task-fields-row td{padding:0;font-size:100%;display:block}.task-fields-row select{padding:.3em 0 .3em .2em}.task-fields-row input.input_field,.task-fields-row input[type=text],.task-fields-row select{width:auto;max-width:100%;height:2em;padding:.3em .6em;border:1px solid #9e9e9e;display:block;box-sizing:border-box}.task-fields-row input.input_field:focus,.task-fields-row input[type=text]:focus,.task-fields-row select:focus{border-color:#26a69a}.content{\r\n    /*убираю лишние отступы и br чтобы уменьшить дыру под полями камента*/padding-bottom:0}\r\n\r\n/* превращаю все в блоки*/#tbl-new-comment tbody,#tbl-new-comment td,#tbl-new-comment tr{display:block}\r\n\r\n/*скрываю первую ячейку с текстом Текст*/#tbl-new-comment tr:first-child>td:first-child{display:none}#tbl-new-comment+br{\r\n    /*убираю лишние отступы и br чтобы уменьшить дыру под полями камента*/display:none}\r\n\r\n/*выровнять новый камент по карточкам каментов*/#new-comment-wrap{max-width:720px;margin:auto}\r\n\r\n/*textarea*/\r\n\r\n/*заголовок Добавить комментарий*/.tl{display:none}\r\n\r\n/*обертка вокруг поля Добавить комментарий*/.tarea-wrap{position:relative;overflow:hidden}#text{width:100%;padding:.6em .8em;font-family:inherit;font-size:14px;border:0;box-sizing:border-box;box-shadow:inset 0 -2px 2px 0 rgba(0,0,0,.14),inset 0 1px 5px 0 rgba(0,0,0,.12),inset 0 3px 1px -2px rgba(0,0,0,.2)}\r\n\r\n/*оформление полей и строк с полями под полем камента*/.task-fields-row{max-width:720px;margin:1.6em auto}.task-fields-row label{margin:0 0 .5em;color:gray;display:inline-block}\r\n\r\n/* 1 строка */.task-row-1{display:-ms-flexbox;display:flex\r\n    /*justify-content: space-between;*/}.worker-block{width:300px;margin-right:70px;-ms-flex:0 0 300px;flex:0 0 300px}.worker-block input[type=radio]{display:inline-block;vertical-align:middle;position:relative;top:-.2em}\r\n\r\n/* 2 строка */.task-row-2{display:-ms-flexbox;display:flex\r\n    /*justify-content: space-between;*/}.task-row-2 .time-block{width:300px;margin-right:70px;-ms-flex:0 0 300px;flex:0 0 300px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.task-row-2 .time-block>div{width:120px}.task-row-2 .time-block>div input{width:76%;display:inline-block;vertical-align:middle}:root .deadline-calendar{position:relative;padding:0!important;font-size:100%\r\n    /*flex: 1 1 180px;*/}:root .deadline-calendar>img,:root .deadline-calendar>input{display:inline-block;vertical-align:top;box-sizing:border-box}\r\n\r\n/* 3 строка */.task-row-3{display:-ms-flexbox;display:flex\r\n    /*justify-content: space-between;*/}.add-email{width:300px;margin-right:70px;-ms-flex:0 0 300px;flex:0 0 300px;position:relative}.add-email a{display:none}.email-send-list{margin:.4em 0 .5em;padding:0;list-style-type:none}.email-send-list>li{margin:0;line-height:1}.email-send-list>li:before{content:\"\\B7\";font-size:1.5em;margin-right:.2em;display:inline-block;vertical-align:middle}.task-type{\r\n\r\n    /*в дивах прячуться селекты с подтипами*/}.task-type select{min-width:190px}\r\n\r\n/* 4 строка */.add-files{\r\n\r\n    /*по клику на эту ссылку создавался новый file input\r\n    скрою ее, а событие повешу на change самого инпута*/}.add-files a{display:none\r\n        /*margin-top: .8em;\r\n        display: inline-block;*/}#FileInputs input:not(:first-child){margin-top:.3em;display:inline-block;vertical-align:middle}.btn-remove-item{width:12px;height:18px;margin-left:.3em;color:red;display:inline-block;vertical-align:middle;position:relative;cursor:pointer}.btn-remove-item:after{content:\"\\1F7A9\";position:absolute;top:0;left:0}.fake-file-input{width:225px;height:60px;border:1px dashed #82a5c3;background:#f4f6f8;text-align:center;border-radius:.5em;position:relative}.fake-file-input.is-hover{background:#d2dce5}.files-list{margin:-.5em 0 .5em;padding:0;list-style-type:none;transition:height .3s}.files-list .file-list-item{margin:.4em 0}.files-list .file-list-item .s-info{padding-left:.6em;display:inline-block;vertical-align:middle}\r\n\r\n/*скрываю пустые ячейки, поля из них перемещены в новый блок #new-comment-wrap*/#task-footer tbody,#task-footer td,#task-footer tr{display:block}\r\n\r\n/*кнопка сохранить*/.btn-action{height:36px;padding:0 1.6em;font-size:14px;color:#fff;border:0;border-radius:4px;background:#7eb519;cursor:pointer}", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return elemsModification; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__finders_js__ = __webpack_require__(0);
if (true) {
    console.time('load elemsModification');
}




//изменение элементов на странице задачи
//в соответсвии с настройками пользователя
function elemsModification() {
    'use strict';

    let dart_workers_list = document.getElementById('internal_worker');

    //сравниваем список проектов с сохраненным в настройках
    //проекты которых нет в настройка скрываем
    this.modifyProjectList = function () {
        let params_user_projects = JSON.parse(localStorage.getItem('params_user_projects'));

        if (params_user_projects === null || !params_user_projects.length) {
            if(true) {
                console.info('Нет собственного списка проектов');
            }
            return false;
        }

        let dart_projects_list = document.getElementById('project_id') || document.getElementById('client_id');
        let options = dart_projects_list.options;

        __WEBPACK_IMPORTED_MODULE_0__utils_js__["i" /* modifySelectOptionsList */](options, params_user_projects);
    };

    //сравниваем список исполнителей с сохраненным в настройках
    //исполнителей которых нет в настройка скрываем
    this.modifyWorkersList = function () {

        let params_user_workers = JSON.parse(localStorage.getItem('params_user_workers'));

        if (params_user_workers === null) {
            if(true) {
                console.info('Нет собственного списка сотрудников');
            }
            params_user_workers = [];
        }

        //let dart_workers_list = document.getElementById('internal_worker');

        let options = dart_workers_list.options; //список всех сотрудников из селекта на странице

        //если пользовательский список сотрудников не пуст
        //и если в задаче участвует сотрудник которого нет в списке оставляю его открытым
        if (params_user_workers.length) {
            //получаю список всех участников задачи
            let task_workers = __WEBPACK_IMPORTED_MODULE_1__finders_js__["c" /* getAllWorkers */]();
            let task_workers_id = [];

            //сравнение списков, если работника нет в списке из настроек пользователя - добавляю
            //сначала нужно получить соответсвие имя сотрудника -> option.value т.е. логин сотрудника на англицком
            for (let i = 0; i < options.length; i++) {
                let if_find = __WEBPACK_IMPORTED_MODULE_0__utils_js__["e" /* findInArray */](task_workers, options[i].text);

                if (if_find > -1) {
                    task_workers_id.push(options[i].value)
                }
            }

            //затем сравнить со списком из настроек
            //и добавить работника если его нет в списке
            for (let i = 0; i < task_workers_id.length; i++) {
                let if_find = __WEBPACK_IMPORTED_MODULE_0__utils_js__["e" /* findInArray */](params_user_workers, task_workers_id[i]);

                if (if_find < 0) {
                    params_user_workers.push(task_workers_id[i]);
                    //console.info('В список добавлен '+ task_workers[i]);
                }
            }

            __WEBPACK_IMPORTED_MODULE_0__utils_js__["i" /* modifySelectOptionsList */](options, params_user_workers);
        }
    };

    //в списке исполнителей отмечаю selected работника оставившего последний комментрий в задаче
    this.setSelectedInWorkersList = function () {
        let last_row = __WEBPACK_IMPORTED_MODULE_1__finders_js__["b" /* getAllCommentsRows */]();
        last_row = last_row[last_row.length - 1];
        let last_worker = last_row.children[4].textContent;

        for (let i = 0; i < dart_workers_list.options.length; i++) {
            if (last_worker === dart_workers_list.options[i].text) {
                dart_workers_list.options[i].setAttribute('selected', '');
                //fireEvent нужен чтобы вызвать повешенную на событие функцию
                //в которой добавляется работник в список для рассылки с задачи
                let evt = document.createEvent('HTMLEvents');
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

    // поле ввода id задачи и переход к задаче

    let goToField = document.getElementById('goTo');
    goToField.removeAttribute('style');
}




if (true) {
    console.timeEnd('load elemsModification');
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return saveNewComment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__finders_js__ = __webpack_require__(0);
if (true) {
    console.time('load saveNewComment');
}



//Сохранение комментария в localStorage
//на случай внезапного звершения сессии
function saveNewComment() {
    'use strict';

    let $field = document.getElementById('text');
    let wrap = document.getElementById('tarea-wrap');

    let task_id = __WEBPACK_IMPORTED_MODULE_0__finders_js__["g" /* getTaskId */]();

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
}



if (true) {
    console.timeEnd('load saveNewComment');
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return copyPasteCommentQuote; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__finders_js__ = __webpack_require__(0);
if (true) {
    console.time('load copyPasteCommentQuote');
}




//выделение текста в каменте и вставка оформленная как цитата для markdown
function copyPasteCommentQuote () {
    'use strict';

    let camments = Array.from(__WEBPACK_IMPORTED_MODULE_1__finders_js__["a" /* getAllCamments */]());

    camments.map(function (camment) {
        camment.addEventListener('mouseup', function () {
            let selection = window.getSelection();

            localStorage.setItem('selection',selection);
        });
    });

    let editor = document.getElementById('text');

    function formatAndInsetCommentQuote(elem) {
        if(localStorage.getItem('selection')){
            let startPos = elem.selectionStart;
            let endPos = elem.selectionEnd;

            let selection = localStorage.getItem('selection');

            let strings = selection.split('\n');

            strings = strings.map(function (str) {
                 return '> '+str;
            });

            selection = strings.join('');

            // selection = '\n'+selection+'\n';

            elem.value = elem.value.substring(0, startPos)
                + selection
                + elem.value.substring(endPos, elem.value.length);

            localStorage.removeItem('selection');
        }
    }

    __WEBPACK_IMPORTED_MODULE_0__utils_js__["j" /* runOnKeys */](
        function() {
            if(document.activeElement === editor){
                formatAndInsetCommentQuote(editor);
            }
        },
        editor
        ,
        "16",
        "17",
        "V".charCodeAt(0)
    );
}



if (true) {
    console.timeEnd('load copyPasteCommentQuote');
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return taskUpdateNotify; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__finders_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(1);
if (true) {
    console.time('load updateNotify');
}




function taskUpdateNotify () {
    'use strict';

    let pageUrl = window.location;
    let taskId = __WEBPACK_IMPORTED_MODULE_0__finders_js__["g" /* getTaskId */]();

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
        __WEBPACK_IMPORTED_MODULE_1__utils_js__["h" /* loadByAjax */](pageUrl,
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

        notify.textContent = 'В задаче '+num+' '+__WEBPACK_IMPORTED_MODULE_1__utils_js__["c" /* declOfNum */](num, ['новый комментарий','новых комментария','новых комментариев']);

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



if (true) {
    console.timeEnd('load updateNotify');
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return anchorLink; });
//прокрутка к каменту по якорю. Нужна если вызван commentsDesign()
function anchorLink() {
    //обработка ссылок с id камента в хеше
    //т.к. из-за изменения высоты каментов и соответсвенно страницы в modules.cammentsDesign()
    //они работают не правильно

    let cammentId = window.location.hash;

    cammentId = cammentId.slice(1, cammentId.length);

    //добавляю setTimeout т.к. пока не придумал как отловить
    //что переделка страницы закончена и высота и позиция камента
    //к которому нужно прокрутить будет рассчитана правильно
    setTimeout(function () {
        if (cammentId) {
            console.info('anchorLink start');
            //ищу скрытый чекбокс с id и от него вверх до карточки камента b-comment
            let camment = document.getElementById('checkbox_' + cammentId).parentNode.parentNode.parentNode;
            let distance = camment.offsetTop;

            animate({
                duration: 1000,
                timing: function (timeFraction) {
                    return timeFraction;
                },
                draw: function (progress) {
                    scrollToY(distance, progress)
                }
            });
        }
    }, 600);
}

function animate(options) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = options.timing(timeFraction);

        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}

function scrollToY(distanse, progress) {
    let scrollY = window.scrollY || document.documentElement.scrollTop;
    window.scrollTo(0, scrollY + ((distanse - scrollY) * progress));
}



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return userSettings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loaders_js__ = __webpack_require__(10);
// добавление на страницу новой задачи блока настроек пользователя



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

    if (true) {
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





/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export calcTimeLeft */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__finders_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pcss_calcTimeLeftInDartTask_pcss__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pcss_calcTimeLeftInDartTask_pcss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__pcss_calcTimeLeftInDartTask_pcss__);
/**
 * Created by mann-aa on 05.07.2017.
 */


function calcTimeLeft() {
    //dtp = dart-task-plane
    const tid = __WEBPACK_IMPORTED_MODULE_0__finders_js__["g" /* getTaskId */]();

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






/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--0-1!../../node_modules/postcss-loader/lib/index.js!./calcTimeLeftInDartTask.pcss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--0-1!../../node_modules/postcss-loader/lib/index.js!./calcTimeLeftInDartTask.pcss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".dtp-result.dtp-alert{color:red;font-size:1.4em}.dtp-result{padding-top:2em}.dtp-result.dtp-warn{color:blue}.dtp-button{margin-top:2em}", ""]);

// exports


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFydC1zdXBwb3J0LnVzZXIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjlkNjg2YmQ5YTRiNjI2ZWQwODgiLCJ3ZWJwYWNrOi8vLy4vc3JjL19maW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19hZGRDU1NTZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzPzdmZjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHlmaUNvbW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9fbG9hZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbWVudHNEZXNpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvY29tbWVudHNEZXNpZ24ucGNzcz84NDE4Iiwid2VicGFjazovLy8uL3NyYy9wY3NzL2NvbW1lbnRzRGVzaWduLnBjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbGN1bGF0ZUVsYXBzZWRUaW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9nb1RvVGFzay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY291bnRXb3JrZXJUaW1lLmpzIiwid2VicGFjazovLy8uL3NyYy90YXNrRm9vdGVyRGVzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcz8wYzA0Iiwid2VicGFjazovLy8uL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWxlbXNNb2RpZmljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhdmVOZXdDb21tZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3B5UGFzdGVDb21tZW50UXVvdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rhc2tVcGRhdGVOb3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuY2hvckxpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZXJTZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FsY1RpbWVMZWZ0SW5EYXJ0VGFzay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGNzcy9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLnBjc3M/NWUwYSIsIndlYnBhY2s6Ly8vLi9zcmMvcGNzcy9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLnBjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjlkNjg2YmQ5YTRiNjI2ZWQwODgiLCJpbXBvcnQge2VsaW1pbmF0ZUR1cGxpY2F0ZXN9IGZyb20gJy4vX3V0aWxzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGdldFRhc2tJZCgpIHtcclxuICAgIGNvbnN0IHRhc2tJZCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoJyYnKTtcclxuXHJcbiAgICBsZXQgaWQgPSB0YXNrSWQuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0uc3BsaXQoJz0nKVswXSA9PT0gJ2lkJztcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpZFswXS5zcGxpdChcIj1cIilbMV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRhc2tIZWFkKCkge1xyXG4gICAgbGV0IHRhc2tIZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stdGl0bGUnKS50ZXh0Q29udGVudC5zcGxpdCgnIC0gJyk7XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGFza0hlYWQpICYmIHRhc2tIZWFkLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgcmV0dXJuIHsndGl0bGUnOiB0YXNrSGVhZFsxXS50cmltKCksICdzdGF0ZSc6IHRhc2tIZWFkWzJdLnNwbGl0KCcgJylbMV19O1xyXG4gICAgfVxyXG5cclxuICAgIHRocm93IG5ldyBFcnJvcigndGFzayBoZWFkIG5vdCBmb3VuZCcpO1xyXG59XHJcblxyXG4vL9C/0L7Qu9GD0YfQuNGC0Ywg0LLRgdC1INC60LDQvNC10L3RgtGLINCyINC30LDQtNCw0YfQtVxyXG4vL9GA0LDQsdC+0YLQsNC10YIg0LrQvtGA0YDQtdC60YLQvdC+INC/0L7RgdC70LUg0LfQsNC/0YPRgdC60LAgY29tbWVudHNEZXNpZ25cclxuZnVuY3Rpb24gZ2V0QWxsQ2FtbWVudHMoKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmItY29tbWVudCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb21tZW50RnJvbVJvdyhyb3cpIHtcclxuICAgIHJldHVybiByb3cucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtd3JhcCcpO1xyXG59XHJcblxyXG4vL9GA0LDQsdC+0YLQsNC10YIg0LrQvtGA0YDQtdC60YLQvdC+INC00LvRjyDQt9Cw0L/Rg9GB0LrQsCBjb21tZW50c0Rlc2lnblxyXG5mdW5jdGlvbiBnZXRBbGxDb21tZW50c1Jvd3MoKSB7XHJcbiAgICBsZXQgcm93cyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXRibCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJ1RSJykpO1xyXG4gICAgcm93cyA9IHJvd3Muc3BsaWNlKDEsIHJvd3MubGVuZ3RoKTsgLy/QuNGB0LrQu9GO0YfQuNGC0Ywg0L/QtdGA0LLRg9GOINGB0YLRgNC+0LrRgyDRgSDQt9Cw0LPQvtC70L7QstC60LDQvNC4INGB0YLQvtC70LHRhtC+0LJcclxuXHJcbiAgICByZXR1cm4gcm93cy5maWx0ZXIoZnVuY3Rpb24ocm93KSB7XHJcbiAgICAgICAgcmV0dXJuIHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpLmxlbmd0aCA+IDE7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8g0L/QvtC70YPRh9C40YLRjCDRgdC/0LjRgdC+0Log0LLRgdC10YUg0YHQvtGC0YDRg9C00L3QuNC60L7QsiDQsiDQt9Cw0LTQsNGH0LVcclxuZnVuY3Rpb24gZ2V0QWxsV29ya2VycygpIHtcclxuICAgIGxldCByb3dzID0gZ2V0QWxsQ29tbWVudHNSb3dzKCk7XHJcblxyXG4gICAgbGV0IHdvcmtlcnMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB3b3JrZXJzLnB1c2gocm93c1tpXS5jaGlsZHJlbls0XS50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGVsaW1pbmF0ZUR1cGxpY2F0ZXMod29ya2Vycyk7XHJcbn1cclxuXHJcbi8vINC/0L7Qu9GD0YfQtdC90LjQtSDRgdGC0YDQvtC60Lgg0YEg0LLRgNC10LzQvdC10Lwg0LjQtyDRgtCw0LHQu9C40YbRiyDRgSDQutC+0LzQvNC10L3RgtCw0YDQuNC80Lgg0LfQsNC00LDRh9C4XHJcbmZ1bmN0aW9uIGdldFJvd1RpbWVTdHJpbmcocm93KSB7XHJcbiAgICBsZXQgdCA9ICcnO1xyXG5cclxuICAgIGlmIChyb3cuY2hpbGRyZW5bMTBdKSB7XHJcbiAgICAgICAgLy/QtNC+INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdCA9IHJvdy5jaGlsZHJlblsxMF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgdCA9IHBhcnNlSW50KHQuc3BsaXQoJy8nKVswXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8v0L/QvtGB0LvQtSDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgIHQgPSBwYXJzZUludChyb3cucXVlcnlTZWxlY3RvcignLmVsYXBzZWQtdGltZScpLnRleHRDb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IHtnZXRUYXNrSWQsZ2V0VGFza0hlYWQsZ2V0QWxsQ2FtbWVudHMsZ2V0Q29tbWVudEZyb21Sb3csZ2V0QWxsQ29tbWVudHNSb3dzLGdldEFsbFdvcmtlcnMsZ2V0Um93VGltZVN0cmluZ307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvX2ZpbmRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbi8v0L7Qv9GA0LXQtNC10LvQtdC90LjQtSDRgdGC0YDQsNC90LjRhtGLINC/0L4gZ2V0INC/0LDRgNCw0LzQtdGC0YDRgyBhLCDQvdCw0L/RgNC40LzQtdGAID9hPXVzZXJfcGFnZVxyXG5mdW5jdGlvbiBnZXRVUkxBY3Rpb24oKSB7XHJcbiAgICBsZXQgZ2V0X2FjdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KFwiPVwiKTtcclxuICAgIGdldF9hY3Rpb24gPSBnZXRfYWN0aW9uWzFdLnNwbGl0KCcmJyk7XHJcbiAgICByZXR1cm4gZ2V0X2FjdGlvblswXTtcclxufVxyXG5cclxuLy/Rg9C00LDQu9C10L3QuNC1INC00YPQsdC70LjQutCw0YLQvtCyXHJcbmZ1bmN0aW9uIGVsaW1pbmF0ZUR1cGxpY2F0ZXMoYXJyKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc3RyID0gYXJyW2ldO1xyXG4gICAgICAgIG9ialtzdHJdID0gdHJ1ZTsgLy8g0LfQsNC/0L7QvNC90LjRgtGMINGB0YLRgNC+0LrRgyDQsiDQstC40LTQtSDRgdCy0L7QudGB0YLQstCwINC+0LHRitC10LrRgtCwXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7IC8vINC40LvQuCDRgdC+0LHRgNCw0YLRjCDQutC70Y7Rh9C4INC/0LXRgNC10LHQvtGA0L7QvCDQtNC70Y8gSUU4LVxyXG59XHJcblxyXG4vL9GB0L7Qt9C00LDQvdC40LUg0LTQsNGC0Ysg0LjQtyDRgdGC0YDQvtC60LhcclxuZnVuY3Rpb24gY3JlYXRlSVNPRGF0ZShzdHIpIHtcclxuICAgIGxldCBkYXRlX3N0ciA9IHN0ci5zcGxpdCgnLicpO1xyXG4gICAgbGV0IGRheV9zdHIgPSBkYXRlX3N0clswXTtcclxuICAgIGxldCBtb250aF9zdHIgPSBkYXRlX3N0clsxXTtcclxuICAgIGxldCB5ZWFyX3N0ciA9IGRhdGVfc3RyWzJdO1xyXG4gICAgbGV0IGRhdGVfaXNvX3N0ciA9IHllYXJfc3RyICsgJy0nICsgbW9udGhfc3RyICsgJy0nICsgZGF5X3N0cjtcclxuICAgIGRhdGVfaXNvX3N0ciA9IERhdGUucGFyc2UoZGF0ZV9pc29fc3RyKTtcclxuICAgIHJldHVybiBkYXRlX2lzb19zdHI7XHJcbn1cclxuXHJcbi8vINC/0L7Qu9GD0YfQtdC90LjQtSDRgdGC0YDQvtC60Lgg0YEg0LTQsNGC0L7QuSDQuNC3INGC0LDQsdC70LjRhtGLINGBINC60L7QvNC80LXQvdGC0LDRgNC40LzQuCDQt9Cw0LTQsNGH0LhcclxuZnVuY3Rpb24gZ2V0Um93RGF0ZVN0cmluZyhyb3cpIHtcclxuICAgIGxldCB0ID0gJyc7XHJcbiAgICBpZiAocm93LmNoaWxkcmVuWzNdKSB7XHJcbiAgICAgICAgLy/QtNC+INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdCA9IHJvdy5jaGlsZHJlblszXS50ZXh0Q29udGVudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy/Qv9C+0YHQu9C1INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdCA9IHJvdy5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1kYXRlJykudGV4dENvbnRlbnRcclxuICAgIH1cclxuXHJcbiAgICB0ID0gdC5zcGxpdCgnICcpO1xyXG5cclxuICAgIHJldHVybiBjcmVhdGVJU09EYXRlKHRbMF0pO1xyXG59XHJcblxyXG4vL9GE0L7RgNC80LDRgtC40YDQvtCy0LDQvdC40LUg0LTQsNGC0YtcclxuZnVuY3Rpb24gZGF0ZUZvcm1hdHRlcihkYXRlKSB7XHJcbiAgICBsZXQgZm9ybWF0dGVyID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJydVwiKTtcclxuICAgIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludChkYXRlLCAxMCkpO1xyXG4gICAgZGF0ZSA9IGZvcm1hdHRlci5mb3JtYXQoZGF0ZSk7XHJcbiAgICByZXR1cm4gZGF0ZTtcclxufVxyXG5cclxuLy8g0YHQutGA0YvRgtGML9C/0L7QutCw0LfQsNGC0Ywg0L7Qv9GA0LXQtNC10L3QvdGL0LUgb3B0aW9uINCyIHNlbGVjdFxyXG5mdW5jdGlvbiBtb2RpZnlTZWxlY3RPcHRpb25zTGlzdChsaXN0LCBwYXJhbXMpIHtcclxuICAgIEFycmF5LmZyb20obGlzdCkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5pbmRleE9mKGl0ZW0udmFsdWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vL9Cy0YvQt9C+0LIg0YTRg9C90LrRhtC40Lgg0L/QviDRgdC+0YfQtdGC0LDQvdC40Y4g0LrQu9Cw0LLQuNGI0YxcclxuZnVuY3Rpb24gcnVuT25LZXlzKGZ1bmMsIGVsZW0pIHtcclxuICAgIGxldCBjb2RlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcclxuXHJcbiAgICBsZXQgcHJlc3NlZCA9IHt9O1xyXG5cclxuICAgIGVsZW0ub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcblxyXG4gICAgICAgIHByZXNzZWRbZS5rZXlDb2RlXSA9IHRydWU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29kZXMubGVuZ3RoOyBpKyspIHsgLy8g0L/RgNC+0LLQtdGA0LjRgtGMLCDQstGB0LUg0LvQuCDQutC70LDQstC40YjQuCDQvdCw0LbQsNGC0YtcclxuICAgICAgICAgICAgaWYgKCFwcmVzc2VkW2NvZGVzW2ldXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDRh9GC0L7QsdGLINC40LfQsdC10LbQsNGC0YwgXCLQt9Cw0LvQuNC/0LDQvdC40Y9cIiDQutC70LDQstC40YjQuCAtLSDQvtCx0L3Rg9C70Y/QtdC8INGB0YLQsNGC0YPRgSDQstGB0LXRhSDQutC70LDQstC40YgsINC/0YPRgdGC0Ywg0L3QsNC20LjQvNCw0LXRgiDQstGB0ZEg0LfQsNC90L7QstC+XHJcbiAgICAgICAgcHJlc3NlZCA9IHt9O1xyXG5cclxuICAgICAgICBmdW5jKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW0ub25rZXl1cCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZSA9IGUgfHwgdy5ldmVudDtcclxuXHJcbiAgICAgICAgZGVsZXRlIHByZXNzZWRbZS5rZXlDb2RlXTtcclxuICAgIH07XHJcbn1cclxuXHJcbi8vYWpheCDQt9Cw0L/RgNC+0YFcclxuZnVuY3Rpb24gbG9hZEJ5QWpheChwYXRoLCBzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IoeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB4aHIub3BlbihcIkdFVFwiLCBwYXRoLCB0cnVlKTtcclxuICAgIHhoci5zZW5kKCk7XHJcbn1cclxuXHJcbi8vINGE0L7RgNC80LjRgNC+0LLQsNC90LjQtSDRgdGC0YDQvtC60Lgg0YEg0L3Rg9C20L3Ri9C8INC+0LrQvtC90YfQsNC90LjQtdC8INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDRh9C40YHQu9CwXHJcbi8vINC90LDQv9GA0LjQvNC10YAgLSDQvNC40L3Rg9GC0LAsINC80LjQvdGD0YLRiywg0LzQuNC90YPRglxyXG5mdW5jdGlvbiBkZWNsT2ZOdW0obnVtYmVyLCB0aXRsZXMpIHtcclxuICAgIGxldCBjYXNlcyA9IFsyLCAwLCAxLCAxLCAxLCAyXTtcclxuICAgIHJldHVybiB0aXRsZXNbKG51bWJlciAlIDEwMCA+IDQgJiYgbnVtYmVyICUgMTAwIDwgMjApID8gMiA6IGNhc2VzWyhudW1iZXIgJSAxMCA8IDUpID8gbnVtYmVyICUgMTAgOiA1XV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRJbkFycmF5KGFyciwgdmFsKSB7XHJcbiAgICByZXR1cm4gYXJyLmluZGV4T2YodmFsKTtcclxufVxyXG5cclxuZXhwb3J0IHtnZXRVUkxBY3Rpb24sZWxpbWluYXRlRHVwbGljYXRlcyxjcmVhdGVJU09EYXRlLGdldFJvd0RhdGVTdHJpbmcsZGF0ZUZvcm1hdHRlcixtb2RpZnlTZWxlY3RPcHRpb25zTGlzdCxydW5PbktleXMsbG9hZEJ5QWpheCxkZWNsT2ZOdW0sZmluZEluQXJyYXl9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9fdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcbmlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ3RvdGFsJyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0VVJMQWN0aW9ufSBmcm9tICcuL191dGlscy5qcyc7XHJcblxyXG5pbXBvcnQge2FkZFBhZ2VFbGVtc30gZnJvbSAnLi9fYWRkQ1NTU2VsZWN0b3JzLmpzJztcclxuXHJcbmltcG9ydCB7bW9keWZpQ29tbWVudHN9IGZyb20gJy4vbW9keWZpQ29tbWVudHMuanMnO1xyXG5cclxuLy9pbXBvcnQge2NvbW1lbnRzRGVzaWdufSBmcm9tICcuL2NvbW1lbnRzRGVzaWduLmpzJztcclxuXHJcbmltcG9ydCB7Y2FsY3VsYXRlRWxhcHNlZFRpbWV9IGZyb20gJy4vY2FsY3VsYXRlRWxhcHNlZFRpbWUuanMnO1xyXG5cclxuaW1wb3J0IHtnb1RvVGFza0RhdGFsaXN0fSBmcm9tICcuL2dvVG9UYXNrLmpzJztcclxuXHJcbmltcG9ydCB7Y291bnRXb3JrZXJUaW1lfSBmcm9tICcuL2NvdW50V29ya2VyVGltZS5qcyc7XHJcblxyXG5pbXBvcnQge3Rhc2tGb290ZXJEZXNpZ259IGZyb20gJy4vdGFza0Zvb3RlckRlc2lnbi5qcyc7XHJcblxyXG5pbXBvcnQge2VsZW1zTW9kaWZpY2F0aW9ufSBmcm9tICcuL2VsZW1zTW9kaWZpY2F0aW9uLmpzJztcclxuXHJcbmltcG9ydCB7c2F2ZU5ld0NvbW1lbnR9IGZyb20gJy4vc2F2ZU5ld0NvbW1lbnQuanMnO1xyXG5cclxuaW1wb3J0IHtjb3B5UGFzdGVDb21tZW50UXVvdGV9IGZyb20gJy4vY29weVBhc3RlQ29tbWVudFF1b3RlLmpzJztcclxuXHJcbmltcG9ydCB7dGFza1VwZGF0ZU5vdGlmeX0gZnJvbSAnLi90YXNrVXBkYXRlTm90aWZ5LmpzJztcclxuXHJcbmltcG9ydCB7YW5jaG9yTGlua30gZnJvbSAnLi9hbmNob3JMaW5rLmpzJztcclxuXHJcbmltcG9ydCB7dXNlclNldHRpbmdzfSBmcm9tICcuL3VzZXJTZXR0aW5ncy5qcyc7XHJcblxyXG4vL2ltcG9ydCB7dGFza0hlYWRlckRlc2lnbn0gZnJvbSAnLi90YXNrSGVhZGVyRGVzaWduLmpzJ1xyXG5cclxuaW1wb3J0IHtjYWxjVGltZUxlZnR9IGZyb20gJy4vY2FsY1RpbWVMZWZ0SW5EYXJ0VGFzay5qcyc7XHJcblxyXG5jb25zdCBhY3Rpb25fcGFnZSA9IGdldFVSTEFjdGlvbigpO1xyXG5cclxuc3dpdGNoIChhY3Rpb25fcGFnZSkge1xyXG4gICAgY2FzZSAnbmV3JzpcclxuICAgICAgICB1c2VyU2V0dGluZ3MoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ3JlZCc6XHJcbiAgICAgICAgYWRkUGFnZUVsZW1zKCk7XHJcbiAgICAgICAgZWxlbXNNb2RpZmljYXRpb24oKTtcclxuICAgICAgICBtb2R5ZmlDb21tZW50cygpO1xyXG5cclxuICAgICAgICBpZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICAgICAgICAgIGNvdW50V29ya2VyVGltZSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dvcmtlci10aW1lLWNvdW50JykgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICAgICAgY291bnRXb3JrZXJUaW1lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYod2luZG93LmxvY2F0aW9uLmhvc3QgPT09ICdzdXBwb3J0LmRhcnRpdC5ydScpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGNUaW1lTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzYXZlTmV3Q29tbWVudCgpO1xyXG4gICAgICAgIGNhbGN1bGF0ZUVsYXBzZWRUaW1lKCk7XHJcbiAgICAgICAgLy9jb21tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgIHRhc2tGb290ZXJEZXNpZ24oKTtcclxuICAgICAgICBjb3B5UGFzdGVDb21tZW50UXVvdGUoKTtcclxuICAgICAgICB0YXNrVXBkYXRlTm90aWZ5KCk7XHJcbiAgICAgICAgZ29Ub1Rhc2tEYXRhbGlzdCgpO1xyXG4gICAgICAgIGFuY2hvckxpbmsoKTtcclxuICAgICAgICAvL3Rhc2tIZWFkZXJEZXNpZ24oKTtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ3VzZXJfcGFnZSc6XHJcbiAgICAgICAgYWRkUGFnZUVsZW1zKCk7XHJcbiAgICAgICAgZ29Ub1Rhc2tEYXRhbGlzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG59XHJcblxyXG5pZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ3RvdGFsJyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvL9GB0Y7QtNCwINC00L7QsdCw0LvRj9GO0YLRgdGPINGN0LvQtdC80LXQvdGC0Ysg0YHRgtGA0LDQvdC40YbRiyDQsiDQutC+0YLQvtGA0YvQtSDQstGB0YLQsNCy0LvRj9GO0YLRgdGPINGB0L7Qt9C00LDQvdGL0LUg0YHQutGA0LjQv9GC0L7QvCDQsdC70L7QutC4XHJcbi8v0Lgu0LjQu9C4INC+0L3QuCDQvNC+0LTQuNGE0LjRhtC40YDRg9GO0YLRgdGPINGB0LrRgNC40L/RgtC+0LxcclxuXHJcbmltcG9ydCB7Z2V0QWxsQ29tbWVudHNSb3dzfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGFkZFBhZ2VFbGVtcygpIHtcclxuICAgIGxldCAkY29udGVudF9jZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybVtuYW1lPVwidGhlRm9ybVwiXScpO1xyXG4gICAgJGNvbnRlbnRfY2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21haW4tY29udGVudCcpO1xyXG5cclxuICAgIGxldCAkY29tbWVudHNfdGJsID0gJGNvbnRlbnRfY2VsbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlRBQkxFXCIpWzBdO1xyXG5cclxuICAgIGlmKCRjb21tZW50c190Ymwpe1xyXG4gICAgICAgICRjb21tZW50c190Ymwuc2V0QXR0cmlidXRlKCdpZCcsICdjb21tZW50cy10YmwnKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd3MgPSBnZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuXHJcbiAgICAgICAgcm93cy5tYXAoZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICByb3cucXVlcnlTZWxlY3RvckFsbCgndGQnKVs1XS5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuYWRkKCdjb21tZW50LXdyYXAnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaW5wdXRfZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmlucHV0X2JveCcpOyAvL9C10YHRgtGMINC90LAg0YHRgtGA0LDQvdC40YbQtSDQt9Cw0LTQsNGH0LhcclxuXHJcbiAgICBpZiAoaW5wdXRfZGl2KSB7XHJcbiAgICAgICAgaW5wdXRfZGl2LmlkID0gJ3Rhc2stYmFyJztcclxuICAgICAgICBsZXQgJHVzZXJfdG9vbGJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgICAgICR1c2VyX3Rvb2xiYXIuc2V0QXR0cmlidXRlKCdpZCcsICd1c2VyLXRvb2xiYXInKTtcclxuICAgICAgICAkdXNlcl90b29sYmFyLmNsYXNzTGlzdC5hZGQoJ3VzZXItdG9vbGJhcicpO1xyXG5cclxuICAgICAgICBpbnB1dF9kaXYuYXBwZW5kQ2hpbGQoJHVzZXJfdG9vbGJhcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy/Qv9C+0LTQstCw0Lsg0LfQsNC00LDRh9C4XHJcbiAgICBsZXQgJHRhc2tfZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGFibGUudGhlRm9ybScpO1xyXG5cclxuICAgIGlmKCR0YXNrX2Zvb3Rlci5sZW5ndGgpe1xyXG4gICAgICAgIC8v0L7QsdC10YDRgtC60LBcclxuICAgICAgICAkdGFza19mb290ZXIgPSAkdGFza19mb290ZXJbMF07XHJcbiAgICAgICAgJHRhc2tfZm9vdGVyLmlkID0gJ3Rhc2stZm9vdGVyJztcclxuXHJcbiAgICAgICAgLy/RgtCw0LHQu9C40YbQsCDRgSB0ZXh0YXJlYSDQutCw0LzQtdC90YLQsFxyXG4gICAgICAgIGxldCAkZm9vdGVyX3RibHMgPSAkdGFza19mb290ZXIucXVlcnlTZWxlY3RvckFsbCgndGFibGUnKTtcclxuXHJcbiAgICAgICAgbGV0ICRjb21tZW50VGJsID0gJGZvb3Rlcl90YmxzWzBdO1xyXG4gICAgICAgICRjb21tZW50VGJsLmlkID0gJ3RibC1uZXctY29tbWVudCc7XHJcblxyXG4gICAgICAgIC8v0L7QsdC10YDRgtC60LAg0Y/Rh9C10LnQutC4INGBIHRleHRhcmVhXHJcbiAgICAgICAgbGV0ICRuZXdDb21tZW50ID0gJGNvbW1lbnRUYmwucXVlcnlTZWxlY3RvckFsbCgndGQnKVsxXTtcclxuICAgICAgICAkbmV3Q29tbWVudC5pZCA9ICduZXctY29tbWVudC13cmFwJztcclxuXHJcbiAgICAgICAgLy/QtNC+0LHQsNCy0LvRjiDQvtCx0LXRgNGC0LrRgyDQtNC70Y8gdGV4dGFyZWFcclxuICAgICAgICAvL9CyINC90LXQtSDQsdGD0LTRgyDQstGB0YLQsNCy0LvRj9GC0Ywg0LrQvdC+0L/QutC4INCy0YHRj9C60LjQtVxyXG4gICAgICAgIGxldCAkdGFyZWFXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgJHRhcmVhV3JhcC5pZCA9ICd0YXJlYS13cmFwJztcclxuICAgICAgICAkdGFyZWFXcmFwLmNsYXNzTGlzdC5hZGQoJ3RhcmVhLXdyYXAnKTtcclxuXHJcbiAgICAgICAgJHRhcmVhV3JhcC5hcHBlbmRDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dCcpKTtcclxuICAgICAgICAkbmV3Q29tbWVudC5hcHBlbmRDaGlsZCgkdGFyZWFXcmFwKTtcclxuXHJcbiAgICAgICAgLy/QotCw0LHQu9C40YbQsCDRgdGC0LDRgtGD0YHQvtCyINC30LDQtNCw0YfQuFxyXG4gICAgICAgIGxldCAkc3RhdHVzVGJsID0gJGZvb3Rlcl90YmxzWzFdLnF1ZXJ5U2VsZWN0b3IoJ3RhYmxlJyk7XHJcbiAgICAgICAgJHN0YXR1c1RibC5pZCA9ICd0Ymwtc3RhdHVzJztcclxuICAgIH1cclxuICAgIC8v0LfQsNCz0L7Qu9C+0LLQvtC6INC30LDQtNCw0YfQuFxyXG4gICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxJyk7XHJcblxyXG4gICAgdGFza1RpdGxlLmlkID0gJ3Rhc2stdGl0bGUnO1xyXG59XHJcblxyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vcGNzcy91c2Vyc2NyaXB0LnBjc3MnO1xyXG5cclxuZXhwb3J0IHthZGRQYWdlRWxlbXN9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL19hZGRDU1NTZWxlY3RvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdXNlcnNjcmlwdC5wY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3VzZXJzY3JpcHQucGNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi91c2Vyc2NyaXB0LnBjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qcmVzZXQgc3R5bGUuY3NzKi86cm9vdCAuaW5wdXRfYm94IGJ1dHRvbiw6cm9vdCAuaW5wdXRfYm94IGlucHV0e21hcmdpbi1sZWZ0OjB9XFxyXFxuXFxyXFxuLypyZXNldCBzdHlsZS5jc3MqLyNtYWluLWNvbnRlbnR7XFxyXFxuICAgIC8q0YPQsdC40YDQsNGOINC70LjRiNC90LjQtSDQvtGC0YHRgtGD0L/RiyDQuCBiciDRh9GC0L7QsdGLINGD0LzQtdC90YzRiNC40YLRjCDQtNGL0YDRgyDQv9C+0LQg0L/QvtC70Y/QvNC4INC60LDQvNC10L3RgtCwKi9tYXJnaW4tYm90dG9tOjB9I21haW4tY29udGVudCBicjpsYXN0LWNoaWxke2Rpc3BsYXk6bm9uZX0ub25vZmYtb3B0e21hcmdpbjowIDZweCAwIDEwcHh9Lm5vbmV7ZGlzcGxheTpub25lIWltcG9ydGFudH0uaGlkZGVuLWVsZW17cG9zaXRpb246Zml4ZWQhaW1wb3J0YW50O2xlZnQ6LTk5OWVtO3otaW5kZXg6LTE7dmlzaWJpbGl0eTpoaWRkZW59Lm5vbmUudmlld3tkaXNwbGF5OmJsb2NrIWltcG9ydGFudH0uY2hfYWRkcnttYXJnaW46MTBweCAxMHB4IDEwcHggMDt2ZXJ0aWNhbC1hbGlnbjp0b3B9LnRvdG9wPmlucHV0e21hcmdpbjoxMHB4IDAgMH0ubGFiZWxfaGVhZHtkaXNwbGF5OmJsb2NrO21hcmdpbjowIDAgMjBweH0uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlxcXCJcXFwiO2Rpc3BsYXk6dGFibGU7Y2xlYXI6Ym90aH0uYWxpc3R7ZmxvYXQ6cmlnaHR9LmFsaXN0IHB7bWFyZ2luOjAgMCAxMHB4O2xpbmUtaGVpZ2h0OjE7dGV4dC1hbGlnbjpyaWdodH0uYmFyLXdyYXB7cGFkZGluZzo4cHggMTVweDtiYWNrZ3JvdW5kOiMyZDJkMmR9I2N1c3RvbS1wcm9qZWN0LWxpc3Q+bGksI2N1c3RvbS13b3JrZXJzLWxpc3Q+bGl7d2lkdGg6MjAlO2Zsb2F0OmxlZnQ7Y3Vyc29yOnBvaW50ZXJ9I2N1c3RvbS1wcm9qZWN0LWxpc3Q+bGk6Zmlyc3QtY2hpbGR7ZGlzcGxheTpub25lfS51c2VyLWxpc3R7bWFyZ2luOjJlbSAxZW07cGFkZGluZzowO2xpc3Qtc3R5bGUtcG9zaXRpb246aW5zaWRlfS51c2VyLWxpc3Q+bGl7bGluZS1oZWlnaHQ6MS41fS5zZWxlY3RlZHtjb2xvcjpncmVlbn0uYnRuLWZsYXR7cGFkZGluZzouNWVtO2JhY2tncm91bmQ6I2YwZjBmMDtjdXJzb3I6cG9pbnRlcn0uYnRuLWZsYXQsLnJvdy1pdGVte2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5yb3ctaXRlbXt2ZXJ0aWNhbC1hbGlnbjp0b3B9LnJvdy1pdGVtOm5vdCg6bGFzdC1jaGlsZCl7bWFyZ2luLXJpZ2h0OjFlbX0jc2V0dGluZ3MtYnRue21hcmdpbjowIDAgMjBweH0jc2V0dGluZ3MtYm94e2Rpc3BsYXk6bm9uZTttYXJnaW46MjBweCAwO3BhZGRpbmc6MjBweCAwO291dGxpbmU6MXB4IHNvbGlkICM0MTQxNDF9I3NldHRpbmdzLWJveC5pcy1vcGVue2Rpc3BsYXk6YmxvY2t9LnVzZXItdGl0bGV7Y29sb3I6IzAwMDttYXJnaW46MCAwIC42ZW07Zm9udC1zaXplOjIwcHg7cGFkZGluZzowfS5yZWd1bGFyLWxpbmt7Y29sb3I6IzAwNTRiOTtvdXRsaW5lOjAhaW1wb3J0YW50fS50aW1lLWxpc3QgcHttYXJnaW46NXB4IDA7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtcGFjazpqdXN0aWZ5O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS50aW1lLWxpc3Q+cD5zcGFuOmZpcnN0LWNoaWxke3BhZGRpbmctcmlnaHQ6MWVtO2N1cnNvcjpwb2ludGVyfTpyb290IC50aW1lLWxpc3QtdG90YWx7bWFyZ2luLXRvcDoxZW07Ym9yZGVyLXRvcDoxcHggc29saWR9LmNvbW1lbnQtY29sbGFwc2Vke21heC1oZWlnaHQ6NzBweDtvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50fS5sb25nLWNvbW1lbnR7d2lkdGg6MTAwJSFpbXBvcnRhbnQ7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy10b3A6MzBweH0uYnRuLWNvbGxhcHNle3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjB9LmJ0bi1jb2xsYXBzZS1hbGx7cG9zaXRpb246Zml4ZWQ7dG9wOjEwcHg7cmlnaHQ6MTBweH06cm9vdCAuZGF0ZXMtbGlzdHt3aWR0aDoxNTBweDtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46MCAyMHB4IDAgMH0udXNlci10b29sYmFye21hcmdpbjoyMHB4IDA7cGFkZGluZzoyMHB4IDEwcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgcmdiYSgwLDAsMCwuNyk7b3ZlcmZsb3c6aGlkZGVuO2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy1tcy1mbGV4LXdyYXA6d3JhcDtmbGV4LXdyYXA6d3JhcH0udXNlci10b29sYmFyX19pdGVte3BhZGRpbmc6MTBweCAxNXB4O2JhY2tncm91bmQ6aHNsYSgwLDAlLDEwMCUsLjYpO2JveC1zaGFkb3c6MCAxcHggMXB4IHJnYmEoMCwwLDAsLjYpfTpyb290IC51c2VyLXRvb2xiYXItdGl0bGV7bWFyZ2luOjAgMCAxZW07cGFkZGluZzowO2NvbG9yOiMwMDB9OnJvb3QgI2NvbW1lbnRzLXRibCAuY29tbWVudC13cmFwe2ZvbnQtc2l6ZToxNHB4O3dpZHRoOjEwMCUhaW1wb3J0YW50O21heC13aWR0aDo4MDBweDtvdmVyZmxvdzpoaWRkZW59OnJvb3QgI2NvbW1lbnRzLXRibCBoMXtmb250LXNpemU6MTIwJTtmb250LXdlaWdodDo0MDA7bWFyZ2luOjAgMCAuNGVtO2NvbG9yOmluaGVyaXR9OnJvb3QgI2NvbW1lbnRzLXRibCBibG9ja3F1b3Rle3BhZGRpbmc6MTBweCAyMHB4O21hcmdpbjowIDAgMjBweDtib3JkZXItbGVmdDo1cHggc29saWQgI2NjY306cm9vdCAjY29tbWVudHMtdGJsIGJsb2NrcXVvdGUgcHttYXJnaW46MH06cm9vdCAjY29tbWVudHMtdGJsIGJsb2NrcXVvdGUgcDpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1ib3R0b206MWVtfTpyb290ICNjb21tZW50cy10YmwgdWx7cGFkZGluZy1sZWZ0Oi42ZW07bGlzdC1zdHlsZS1wb3NpdGlvbjppbnNpZGV9XFxyXFxuXFxyXFxuLyp0eXBvKi8uc2VjdGlvbi10aXRsZXtjb2xvcjppbmhlcml0O21hcmdpbjowIDAgMWVtO3BhZGRpbmc6MCFpbXBvcnRhbnR9LnMtaW5mb3tjb2xvcjpncmF5O2ZvbnQtc2l6ZToxMnB4fVxcclxcblxcclxcbi8q0LLRgdGC0LDQstC60LAg0YLQtdC60YHRgtCwINC40LcgbG9jYWwgc3RvcmFnZSovLmJ0bi1pbnNlcnQtbHN7cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwMCU7cmlnaHQ6MmVtO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zc30uYnRuLWluc2VydC1scy5pcy12aXNpYmxle3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xNTAlKX1cXHJcXG5cXHJcXG4vKlxcclxcbiAgICDQtNC+0LHQsNCy0LvQtdC90LjQtSDQuNC60L7QvdC60Lgg0L/QvtC00L/QuNGB0LrQuCDQvdCwINGD0LLQtdC00L7QvNC70LXQvdC40LUg0L4g0L3QvtCy0YvRhSDQutCw0LzQtdC90YLQsNGFXFxyXFxuICAgINCyINC30LDQs9C+0LvQvtCy0L7QuiDQt9Cw0LTQsNGH0LhcXHJcXG4qLy5hZGQtYWxlcnR7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtkaXNwbGF5OmlubGluZS1ibG9jaztiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUJtYVd4c1BTSWpNREF3TURBd0lpQm9aV2xuYUhROUlqSTBJaUIyYVdWM1FtOTRQU0l3SURBZ01qUWdNalFpSUhkcFpIUm9QU0l5TkNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWo0Z0lDQWdQSEJoZEdnZ1pEMGlUVEFnTUdneU5IWXlORWd3VmpCNklpQm1hV3hzUFNKdWIyNWxJaTgrSUNBZ0lEeHdZWFJvSUdROUlrMHhNQzR3TVNBeU1TNHdNV013SURFdU1TNDRPU0F4TGprNUlERXVPVGtnTVM0NU9YTXhMams1TFM0NE9TQXhMams1TFRFdU9UbG9MVE11T1RoNmJUZ3VPRGN0TkM0eE9WWXhNV013TFRNdU1qVXRNaTR5TlMwMUxqazNMVFV1TWprdE5pNDJPWFl0TGpjeVF6RXpMalU1SURJdU56RWdNVEl1T0RnZ01pQXhNaUF5Y3kweExqVTVMamN4TFRFdU5Ua2dNUzQxT1hZdU56SkROeTR6TnlBMUxqQXpJRFV1TVRJZ055NDNOU0ExTGpFeUlERXhkalV1T0RKTU15QXhPQzQ1TkZZeU1HZ3hPSFl0TVM0d05td3RNaTR4TWkweUxqRXllazB4TmlBeE15NHdNV2d0TTNZemFDMHlkaTB6U0RoV01URm9NMVk0YURKMk0yZ3pkakl1TURGNklpOCtQQzl6ZG1jKyk7Y3Vyc29yOnBvaW50ZXJ9I3Rhc2stdGl0bGUgLmFkZC1hbGVydHt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7b3BhY2l0eTouNX0jdGFzay10aXRsZSAuYWRkLWFsZXJ0LnNlbGVjdGVke29wYWNpdHk6MX0jdGV4dHtyZXNpemU6dmVydGljYWx9XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj97XCJpbXBvcnRMb2FkZXJzXCI6MX0hLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliIS4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIG1vZHlmaUNvbW1lbnRzJyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0Q29tbWVudEZyb21Sb3csZ2V0QWxsQ29tbWVudHNSb3dzfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuaW1wb3J0IHthZGRqc30gZnJvbSAnLi9fbG9hZGVycy5qcyc7XHJcbmltcG9ydCB7Y29tbWVudHNEZXNpZ259IGZyb20gJy4vY29tbWVudHNEZXNpZ24uanMnO1xyXG5cclxuLy/Qv9C+0LjRgdC6INGB0YHRi9C70L7QuiDQsiDRgtC10LrRgdGC0LUg0LrQvtC80LzQtdC90YLQsNGA0LjQtdCyINC4INC+0LHQvtGA0LDRh9C40LLQsNC90LjQtSDQuNGFINCyIDxhPlxyXG4vL9GB0LLQvtGA0LDRh9C40LLQsNC90LjQtSDQtNC70LjQvdC90YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNC10LIsINC00L7QsdCw0LLQu9C10L3QuNC1INC60L3QvtC/0LrQuCDQodCy0YDQtdC90YPRgtGMLtGA0LDQt9Cy0LXRgNC90YPRgtGMINCy0YHQtVxyXG5cclxuZnVuY3Rpb24gbW9keWZpQ29tbWVudHMoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG5cclxuICAgIGxldCByb3dzID0gZ2V0QWxsQ29tbWVudHNSb3dzKCk7XHJcblxyXG4gICAgYWRkanMoJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL21hcmtkb3duLWl0LzguMy4xL21hcmtkb3duLWl0Lm1pbi5qcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnb01hcmtkb3duKHJvd3MpO1xyXG4gICAgICAgIGNvbW1lbnRzRGVzaWduKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL9C/0LDRgNGB0LXRgCBtYXJrZG93blxyXG5cclxuICAgIGZ1bmN0aW9uIGdvTWFya2Rvd24ocm93cykge1xyXG5cclxuICAgICAgICBsZXQgbWQgPSBtYXJrZG93bml0KCk7XHJcbiAgICAgICAgbWQub3B0aW9ucy5odG1sID0gdHJ1ZTtcclxuICAgICAgICBtZC5vcHRpb25zLmxpbmtpZnkgPSB0cnVlO1xyXG4gICAgICAgIG1kLm9wdGlvbnMudHlwb2dyYXBoZXIgPSB0cnVlO1xyXG4gICAgICAgIG1kLm9wdGlvbnMuYnJlYWtzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcm93cy5tYXAoZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICBhZGRNYXJrZG93bihyb3csIG1kKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkTWFya2Rvd24ocm93LCBtZCkge1xyXG4gICAgICAgICAgICBsZXQgY29tbWVudCA9IGdldENvbW1lbnRGcm9tUm93KHJvdyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgYmxvY2tzID0gY29tbWVudC5pbm5lckhUTUwuc3BsaXQoJzxicj48YnI+Jyk7XHJcblxyXG4gICAgICAgICAgICBibG9ja3MgPSBibG9ja3MubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbmRleE9mKCc8YnI+JykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnNwbGl0KCc8YnI+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubWFwKGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ci50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBjb25jYXRFbGVtc1RvU3RyaW5nKGl0ZW0sICcqJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGNvbmNhdEVsZW1zVG9TdHJpbmcoaXRlbSwgJyYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubWFwKGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlck1kU3RyaW5nKHN0ciwgbWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gcmVwbGFjZUh0bWxHdFRvU3ltYm9sKGl0ZW0udHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gcmVuZGVyTWRTdHJpbmcoaXRlbSwgbWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAnPHA+JyArIGl0ZW0gKyAnPC9wPic7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29tbWVudC5pbm5lckhUTUwgPSByZXBsYWNlVVJMV2l0aEhUTUxMaW5rcyhibG9ja3Muam9pbignJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVuZGVyTWRTdHJpbmcoc3RyLCBtZCkge1xyXG4gICAgICAgICAgICBsZXQgbWRjID0gWycjJywgJyonLCAnLScsICc+J107XHJcblxyXG4gICAgICAgICAgICBpZiAobWRjLmluZGV4T2Yoc3RyLmNoYXJBdCgwKSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgc3RyID0gbWQucmVuZGVyKHN0cik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLysnPGJyPicg0L3Rg9C20L3QviDRh9GC0L7QsdGLINCx0YvQu9C+INC/0L7RhdC+0LbQtSDQvdCwINC40YHRhdC+0LTQvdC+0LUg0YTQvtGA0LzQsNGC0LjRgNC+0LLQsNC90LjQtVxyXG4gICAgICAgICAgICAgICAgc3RyID0gc3RyICsgJzxicj4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL9C/0L7QuNGB0Log0Lgg0L7QsdGK0LXQtNC40L3QtdC90LjQtSDQsiDQvtC00L3RgyDRgdGC0YDQvtC60YMg0Y3Qu9C10LzQtdC90YLQvtCyINC80LDRgdGB0LjQstCwXHJcbiAgICAvL9C90LDRh9C40L3QsNGO0YnQuNGF0YHRjyDRgSDRgdC40LzQstC+0LvQsCAqXHJcbiAgICAvL9C00LvRjyDRgdC+0LfQtNCw0L3QuNGPINGB0L/QuNGB0LrQsCB1bD5saSDQsiBtYXJrZG93blxyXG4gICAgZnVuY3Rpb24gY29uY2F0RWxlbXNUb1N0cmluZyhhcnIsIHN5bWJvbCkge1xyXG4gICAgICAgIGxldCBuZXh0O1xyXG4gICAgICAgIGxldCBzdHJpbmdzID0gW107XHJcbiAgICAgICAgbGV0IG5ld2xpc3QgPSAnJztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbmV4dCA9IGkgKyAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFycltpXS5jaGFyQXQoMCkgPT09IHN5bWJvbCAmJiBhcnJbbmV4dF0gJiYgYXJyW25leHRdLmNoYXJBdCgwKSA9PT0gc3ltYm9sKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdsaXN0ICs9IHByZWZvcm1hdFN0cmluZyhhcnJbaV0sIHN5bWJvbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWFycltuZXh0XSB8fCBhcnJbbmV4dF0uY2hhckF0KDApICE9PSBzeW1ib2wpIHtcclxuICAgICAgICAgICAgICAgIG5ld2xpc3QgKz0gcHJlZm9ybWF0U3RyaW5nKGFycltpXSwgc3ltYm9sKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaChuZXdsaXN0KTtcclxuICAgICAgICAgICAgICAgIG5ld2xpc3QgPSAnJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaChhcnJbaV0pO1xyXG4gICAgICAgICAgICAgICAgLy8gc3RyaW5ncy5wdXNoKHByZWZvcm1hdFN0cmluZyhhcnJbaV0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy/QvtCx0YDQsNCx0L7RgtC60LAg0YHRgtGA0L7QuiDQv9C10YDQtdC0INGE0L7RgNC80LDRgtC40YDQvtCy0LDQvdC40LXQvCDQsiBtYXJrZG93blxyXG4gICAgZnVuY3Rpb24gcmVwbGFjZUh0bWxHdFRvU3ltYm9sKHRleHQpIHtcclxuICAgICAgICBsZXQgZmluZCA9ICcmZ3Q7JztcclxuICAgICAgICBsZXQgcmUgPSBuZXcgUmVnRXhwKGZpbmQsICdnJyk7XHJcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShyZSwgJz4nKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcmVmb3JtYXRTdHJpbmcoc3RyLCBzeW1ib2wgPSAnfCcpIHtcclxuXHJcbiAgICAgICAgbGV0IHNwYWNlID0gJyc7XHJcbiAgICAgICAgLy/QtNC70Y8g0YHQv9C40YHQutCwINC90LDQtNC+INGBINC90L7QstC+0Lkg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgc3dpdGNoIChzeW1ib2wpIHtcclxuICAgICAgICAgICAgY2FzZSAnKic6XHJcbiAgICAgICAgICAgICAgICBzcGFjZSA9ICdcXG4nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8v0LAg0LIg0YbQuNGC0LDRgtC1IC0g0LIg0L7QtNC90YMg0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIGNhc2UgJyYnOlxyXG4gICAgICAgICAgICAgICAgc3BhY2UgPSAnICc7XHJcbiAgICAgICAgICAgICAgICBzdHIgPSByZXBsYWNlSHRtbEd0VG9TeW1ib2woc3RyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygoc3RyLm1hdGNoKC9cXG4vZyl8fFtdKS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgLy9zdHIgPSBzdHIucmVwbGFjZSgvXFxuL2csICc8YnI+Jyk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHN0cik7XHJcbiAgICAgICAgICAgICAgICBzdHIgPSAnPHA+JyArIHN0ciArICc8L3A+J1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0ciArIHNwYWNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlcGxhY2VVUkxXaXRoSFRNTExpbmtzKHRleHQpIHtcclxuICAgICAgICBjb25zdCBleHAgPSAvKFxcYihodHRwcz98ZnRwfGZpbGUpOlxcL1xcL1stQS1aMC05KyZAI1xcLyU/PX5ffCE6LC47XSpbLUEtWjAtOSsmQCNcXC8lPX5ffF0pL2lnO1xyXG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoZXhwLCAnPGEgaHJlZj1cIiQxXCIgY2xhc3M9XCJyZWd1bGFyLWxpbmtcIj4kMTwvYT4nKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHttb2R5ZmlDb21tZW50c307XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBtb2R5ZmlDb21tZW50cycpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vZHlmaUNvbW1lbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8v0L/QvtC00LrQu9GO0YfQtdC90LjQtSDRgdGC0YDQvtC90L3QtdCz0L4ganMg0LIgaGVhZFxyXG5leHBvcnQgZnVuY3Rpb24gYWRkanModXJsLCBjYWxsYmFjaywgcGFyYW1zKSB7XHJcbiAgICBsZXQgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblxyXG4gICAgbGV0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHJcbiAgICBzLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzLnNyYyA9IHVybDtcclxuXHJcbiAgICBpZihwYXJhbXMpe1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHMuc2V0QXR0cmlidXRlKGtleSxwYXJhbXNba2V5XSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBoZWFkLmFwcGVuZENoaWxkKHMpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvX2xvYWRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKXtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCBjb21tZW50c0Rlc2lnbicpO1xyXG59XHJcblxyXG5pbXBvcnQge2dldEFsbENvbW1lbnRzUm93c30gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcblxyXG5mdW5jdGlvbiBjb21tZW50c0Rlc2lnbigpIHtcclxuICAgIC8v0L/QtdGA0LXQtNC10LvQutCwINCy0L3QtdGI0L3QtdCz0L4g0LLQuNC00LAg0LrQsNC80LXQvdGC0L7QslxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGNyZWF0ZVRlbXBsYXRlKCk7XHJcblxyXG4gICAgbGV0IHRibCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy10YmwnKTtcclxuXHJcbiAgICBsZXQgcm93cyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG5cclxuICAgIC8vcm93c1swXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJvd3NbMF0ucHJldmlvdXNFbGVtZW50U2libGluZyk7XHJcbiAgICAvL9GB0LrRgNGL0LLQsNGOLCDQsCDQvdC1INGD0LTQsNC70Y/RjiDRh9GC0L7QsdGLINC90LUg0LzQtdC90Y/RgtGMINGD0LbQtSDQuNGB0L/QvtC70YzQt9GD0LXQvNGL0LUg0YTRg9C90LrRhtC40LhcclxuICAgIC8v0LLRi9Cx0LjRgNCw0Y7RidC40LUg0YHRgtGA0L7QutC4INGBINC60LDQvNC10L3RgtCw0LzQuCDQuCDQuNCz0L3QvtGA0LjRgNGD0Y7RidC40LUg0L/QtdGA0LLRg9GOINGB0YLRgNC+0LrRgy5cclxuICAgIC8v0JXRgdC70Lgg0YPQtNCw0LvRj9GC0Ywg0YLQviDQv9C+0LvRg9GH0LjRgtGB0Y8g0YfRgtC+INC/0LXRgNCy0YvQuSDQutCw0LzQtdC90YIg0L3QtSDQsdGD0LTQtdGCINC+0LHRgNCw0LHQsNGC0YvQstCw0YLRjNGB0Y9cclxuICAgIHJvd3NbMF0ucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4tZWxlbScpO1xyXG4gICAgLy/Rgi7Qui4g0LIg0LTQsNGA0YLQtSDQtNC+0LHQsNCy0LjQu9C4INGB0YLRgNC+0Log0L/RgNC10LTRi9C00YPRidCw0Y8g0YHRgtGA0L7QutCwINC90LUg0YHQutGA0YvQstCw0LXRgiDRgdGC0YDQvtC60YMg0YEg0LfQsNCz0L7Qu9C+0LLQutCw0LzQuCDRgdGC0L7Qu9Cx0YbQvtCyXHJcbiAgICAvL9C/0L7RjdGC0L7QvNGDINC10YnQtVxyXG4gICAgdGJsLnF1ZXJ5U2VsZWN0b3IoJ3RyJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLWVsZW0nKTtcclxuXHJcbiAgICByb3dzLm1hcChmdW5jdGlvbiAoaXRlbSwgaSkge1xyXG4gICAgICAgIGxldCB0ZCA9IEFycmF5LmZyb20oaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpKTtcclxuXHJcbiAgICAgICAgbGV0IGJsb2NrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtdGVtcGxhdGUnKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgYmxvY2sucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xyXG5cclxuICAgICAgICBpdGVtLmFwcGVuZENoaWxkKGJsb2NrKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd3MgPSBibG9jay5xdWVyeVNlbGVjdG9yQWxsKCcuYi1jb21tZW50X19yb3cnKTtcclxuXHJcbiAgICAgICAgbGV0IHJvdzEgPSBjcmVhdGUxcm93KHRkLCBpKTtcclxuICAgICAgICByb3dzWzBdLmFwcGVuZENoaWxkKHJvdzEpO1xyXG5cclxuICAgICAgICByb3dzWzFdLmFwcGVuZENoaWxkKGNyZWF0ZTJyb3codGQpKTtcclxuICAgICAgICByb3dzWzJdLmFwcGVuZENoaWxkKGNyZWF0ZTNyb3codGQpKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbGVzID0gY3JlYXRlNHJvdyh0ZCk7XHJcblxyXG4gICAgICAgIGlmICghIWZpbGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgcGljcyA9IFsncG5nJywgJ2pwZycsICdnaWYnXTtcclxuXHJcbiAgICAgICAgICAgIGZpbGVzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4dCA9IGl0ZW0uaHJlZi5sYXN0SW5kZXhPZignLicpO1xyXG4gICAgICAgICAgICAgICAgZXh0ID0gaXRlbS5ocmVmLnNsaWNlKGV4dCArIDEsIGl0ZW0uaHJlZi5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwaWNzLmluZGV4T2YoZXh0LnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gY3JlYXRlSW1nVGh1bWIoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVEb2NzVGh1bWIoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcm93c1szXS5hcHBlbmRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcm93c1szXS5jbGFzc0xpc3QuYWRkKCdub25lJyk7XHJcbiAgICAgICAgICAgIC8vYmxvY2sucmVtb3ZlQ2hpbGQocm93c1szXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2PRgtGA0L7QutCwINGB0LrRgNGL0YLQsFxyXG4gICAgICAgIC8vcm93c1s0XS5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAvL3Jvd3NbNF0uYXBwZW5kQ2hpbGQoY3JlYXRlNXJvdyh0ZCkpO1xyXG5cclxuICAgICAgICAvL9GB0YLQsNC90L7QstC40YLRgdGPINCy0LjQtNC40LzQvtC5INC/0YDQuCDQvdCw0LLQtdC00LXQvdC40Lgg0LrRg9GA0YHQvtGA0LAg0L3QsCDQutCw0YDRgtC+0YfQutGDINC60LDQvNC10L3RgtCwXHJcbiAgICAgICAgYmxvY2suYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2hvd0FjdGlvbnNCdG4odGhpcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNob3dBY3Rpb25zQnRuKHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL9Cy0LzQtdGB0YLQviDRg9C00LDQu9C10L3QuNGPINC40LcgRE9NINC40LvQuCDQvdCw0LLQtdGI0LjQstCw0L3QuNGPINC60LvQsNGB0YHQsCDQvdCwINC60LDQttC00YvQuSB0ZFxyXG4gICAgICAgIC8v0LLQtdGI0LDRjiDQutC70LDRgdGBINC90LAg0YLQsNCx0LvQuNGG0YMg0L/QvtGB0LvQtSDQvtCx0YDQsNCx0L7RgtC60Lgg0LLRgdC10YUg0YHRgtGA0L7QulxyXG4gICAgICAgIC8qdGQubWFwKGZ1bmN0aW9uICh0ZGl0ZW0pIHtcclxuICAgICAgICAgICAgLy90ZGl0ZW0uY2xhc3NMaXN0LmFkZCgnbm9uZScpO1xyXG4gICAgICAgICAgICBpZiAodGRpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNoaWxkKHRkaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTsqL1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy/QvdCw0YHQu9C10LTRg9GP0YHRjCDQvtGCINGN0YLQvtCz0L4g0LrQu9Cw0YHRgdCwINGB0LrRgNGL0LLQsNGOIHRkINCyINGB0YLRgNC+0LrQsNGFINGC0LDQsdC70LjRhtGLXHJcbiAgICAvL9C/0L7RgdC70LUg0YHQvtC30LTQsNC90LjRjyDQutCw0YDRgtC+0YfQtdC6INC60LDQvNC10L3RgtC+0LJcclxuICAgIHRibC5jbGFzc0xpc3QuYWRkKCdoaWRlLW9yaWdpbmFsJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlMXJvdyh0ZCwgcm93bnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgICAgICBsZXQgcm93SXRlbVByb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIGxldCByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgLy/QtNCw0YLQsFxyXG4gICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnY29tbWVudC1kYXRlJyk7XHJcbiAgICAgICAgcm93SXRlbS5pZCA9ICdjb21tZW50LWRhdGUnO1xyXG4gICAgICAgIHJvd0l0ZW0uaW5uZXJIVE1MID0gdGRbM10udGV4dENvbnRlbnQ7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICAvL2lkIGNoZWNrYm94XHJcbiAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh0ZFswXS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdpZC1jaGVja2JveCcpO1xyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICAvL9C/0YDQuNC+0YDQuNGC0LXRgiDQuCDRgdGA0L7QuiDQuNGB0L/QvtC70L3QtdC90LjRj1xyXG4gICAgICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1yYW5rJyk7XHJcblxyXG4gICAgICAgIHJvd0l0ZW0uaW5uZXJIVE1MID0gdGRbOF0udGV4dENvbnRlbnQgKyAnINC/0YDQuNC+0YDQuNGC0LXRgic7XHJcblxyXG4gICAgICAgIGxldCBkZWFkbGluZSA9IHRkWzddLnRleHRDb250ZW50O1xyXG5cclxuICAgICAgICBpZiAoZGVhZGxpbmUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICByb3dJdGVtLmlubmVySFRNTCA9IHJvd0l0ZW0uaW5uZXJIVE1MICsgJy48YiBjbGFzcz1cImRlYWRsaW5lLWRhdGVcIj7QodC00LDRgtGMICcgKyBkZWFkbGluZSArICc8L2I+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICAvL9C/0LjRgdGM0LzQsCzRgdGB0YvQu9C60LAs0YHRgtCw0YLRg9GBXHJcbiAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdyb3ctcmlnaHQnKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXR1cyA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gdGRbOV0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgc3RhdHVzLmNsYXNzTGlzdC5hZGQoJ3Rhc2stc3RhdHVzJyk7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZChzdGF0dXMpO1xyXG5cclxuICAgICAgICBsZXQgbGV0dGVyID0gdGRbMV0ucXVlcnlTZWxlY3RvckFsbCgnaW1nJylbMV07XHJcbiAgICAgICAgbGV0dGVyLmNsYXNzTGlzdC5hZGQoJ2xldHRlci1hZGRyJyk7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZChsZXR0ZXIpO1xyXG5cclxuICAgICAgICBsZXQgbGluayA9IHRkWzFdLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKVsxXTtcclxuICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtbGluaycpO1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG4gICAgICAgIC8v0L3QvtC80LXRgCDQutC+0LzQvNC10L3RgtCw0YDQuNGPXHJcbiAgICAgICAgbGV0IG5vID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICBuby5jbGFzc0xpc3QuYWRkKCdjb21tZW50LW5vJyk7XHJcbiAgICAgICAgbm8uaW5uZXJIVE1MID0gcm93bnVtYmVyO1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQobm8pO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZTJyb3codGQpIHtcclxuICAgICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgICAgIGxldCByb3dJdGVtUHJvdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnY29tbWVudC1pbmZvJyk7XHJcblxyXG4gICAgICAgIC8v0LDQstGC0L7RgFxyXG4gICAgICAgIGxldCBhdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgYXV0aG9yLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtYXV0aG9yJyk7XHJcbiAgICAgICAgLy9hdXRob3IuaW5uZXJIVE1MID0gJ9CQ0LLRgtC+0YAgPGJyPicgKyB0ZFs0XS50ZXh0Q29udGVudDtcclxuICAgICAgICBhdXRob3IuaW5uZXJIVE1MID0gdGRbNF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZChhdXRob3IpO1xyXG5cclxuICAgICAgICAvL9C40YHQv9C+0LvQvdC40YLQtdC70YxcclxuICAgICAgICBsZXQgd29ya2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHdvcmtlci5jbGFzc0xpc3QuYWRkKCdjb21tZW50LXdvcmtlcicpO1xyXG4gICAgICAgIC8vd29ya2VyLmlubmVySFRNTCA9ICfQmNGB0L/QvtC70L3QuNGC0LXQu9GMIDxicj4nICsgdGRbNl0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgd29ya2VyLmlubmVySFRNTCA9IHRkWzZdLnRleHRDb250ZW50O1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQod29ya2VyKTtcclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIGxldCB3b3JrVGltZSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgd29ya1RpbWUuY2xhc3NMaXN0LmFkZCgnd29yay10aW1lJyk7XHJcblxyXG4gICAgICAgIGxldCB0aW1lU3RyID0gdGRbMTBdLnRleHRDb250ZW50LnNwbGl0KCcvJyk7XHJcblxyXG4gICAgICAgIC8qdGltZVN0clswXSA9IGNyZWF0ZVRpbWVUaXRsZVN0cmluZyh0aW1lU3RyWzBdLCBbJ9CX0LDRgtGA0LDRh9C10L3QsCcsICfQl9Cw0YLRgNCw0YfQtdC90L4nLCAn0JfQsNGC0YDQsNGH0LXQvdC+J10pK1xyXG4gICAgICAgICAnICcrIGNyZWF0ZVRpbWVTdHJpbmcodGltZVN0clswXSwgWyfQvNC40L3Rg9GC0LAnLCAn0LzQuNC90YPRgtGLJywgJ9C80LjQvdGD0YInXSk7Ki9cclxuXHJcbiAgICAgICAgdGltZVN0clswXSA9ICc8c3BhbiBjbGFzcz1cImVsYXBzZWQtdGltZVwiPicgKyB0aW1lU3RyWzBdICsgJyDQvNC40L0uPC9zcGFuPic7XHJcbiAgICAgICAgd29ya1RpbWUuaW5uZXJIVE1MID0gdGltZVN0clswXTtcclxuXHJcbiAgICAgICAgLy8gaWYgKGlzTmFOKE51bWJlcih0aW1lU3RyWzFdKSkpIHtcclxuICAgICAgICAvLyAgICAgd29ya1RpbWUuaW5uZXJIVE1MID0gdGltZVN0clswXTtcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGltZVN0clsxXSA9ICcg0LjQtyAnK3RpbWVTdHJbMV07XHJcbiAgICAgICAgLy8gICAgIHdvcmtUaW1lLmlubmVySFRNTCA9IHRpbWVTdHIuam9pbignICcpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQod29ya1RpbWUpO1xyXG5cclxuICAgICAgICByZXR1cm4gZnJhZ21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlM3Jvdyh0ZCkge1xyXG4gICAgICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW1Qcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgICAvL9C60L7QvNC80LXQvdGC0LDRgNC40LlcclxuICAgICAgICBsZXQgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWJvZHknKTtcclxuXHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh0ZFs1XS5maXJzdEVsZW1lbnRDaGlsZC5jbG9uZU5vZGUodHJ1ZSkpO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAgICAgLy/QvtCx0LXRgNGC0LrQsCDQtNC70Y8g0LrQvdC+0L/QvtC6INCj0LTQsNC70LjRgtGMINC4INCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgbGV0IHJvd0l0ZW1XcmFwID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByb3dJdGVtV3JhcC5jbGFzc0xpc3QuYWRkKCdhY3Rpb25zLWJ0bi13cmFwJyk7XHJcbiAgICAgICAgLy/Rg9C00LDQu9C40YLRjFxyXG5cclxuICAgICAgICBpZiAodGRbMTFdLmZpcnN0RWxlbWVudENoaWxkKSB7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2J0bi1kZWwtY29tbWVudCcpO1xyXG4gICAgICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzExXS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgICAgIHJvd0l0ZW1XcmFwLmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/RgNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFxyXG4gICAgICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnYnRuLWVkaXQtY29tbWVudCcpO1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQodGRbMV0uZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgIHJvd0l0ZW1XcmFwLmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtV3JhcCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmcmFnbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGU0cm93KHRkKSB7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGRbMl0ucXVlcnlTZWxlY3RvckFsbCgnYScpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmdW5jdGlvbiBjcmVhdGU1cm93KHRkKSB7XHJcbiAgICAvLyAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgLy9cclxuICAgIC8vICAgICBsZXQgcm93SXRlbVByb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIGxldCByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgLy/QvtCx0LXRgNGC0LrQsCDQtNC70Y8g0LrQvdC+0L/QvtC6INCj0LTQsNC70LjRgtGMINC4INCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXHJcbiAgICAvLyAgICAgbGV0IHJvd0l0ZW1XcmFwID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIC8vICAgICByb3dJdGVtV3JhcC5jbGFzc0xpc3QuYWRkKCdhY3Rpb25zLWJ0bi13cmFwJyk7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIC8v0YPQtNCw0LvQuNGC0YxcclxuICAgIC8vXHJcbiAgICAvLyAgICAgaWYgKHRkWzExXS5maXJzdEVsZW1lbnRDaGlsZCkge1xyXG4gICAgLy8gICAgICAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIC8vICAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdidG4tZGVsLWNvbW1lbnQnKTtcclxuICAgIC8vICAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh0ZFsxMV0uZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgLy8gICAgICAgICByb3dJdGVtV3JhcC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIC8v0YDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcclxuICAgIC8vICAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIC8vICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2J0bi1lZGl0LWNvbW1lbnQnKTtcclxuICAgIC8vICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzFdLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgIC8vICAgICByb3dJdGVtV3JhcC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbVdyYXApO1xyXG4gICAgLy9cclxuICAgIC8vICAgICByZXR1cm4gZnJhZ21lbnQ7XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUltZ1RodW1iKGl0ZW0pIHtcclxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB3cmFwLmNsYXNzTGlzdC5hZGQoJ2ltZy10aHVtYicsICdmaWxlLXRodW1iJyk7XHJcblxyXG4gICAgbGV0IHBpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgcGljLnNyYyA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcbiAgICBwaWMuY2xhc3NMaXN0LmFkZCgndGh1bWItcGljJyk7XHJcblxyXG4gICAgaXRlbS5hcHBlbmRDaGlsZChwaWMpO1xyXG5cclxuICAgIGxldCB0aXRsZSA9IGdldEF0dGFjaFRpdGxlKGl0ZW0pO1xyXG4gICAgd3JhcC5hcHBlbmRDaGlsZChpdGVtKTtcclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgYmlncGljID0gcGljLmNsb25lTm9kZShmYWxzZSk7XHJcbiAgICAgICAgYmlncGljLmNsYXNzTGlzdC5hZGQoJ2xhcmdlLXBpYy1wcmV2aWV3Jyk7XHJcbiAgICAgICAgYmlncGljLmNsYXNzTGlzdC5yZW1vdmUoJ3RodW1iLXBpYycpO1xyXG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoYmlncGljKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMucXVlcnlTZWxlY3RvcignLmxhcmdlLXBpYy1wcmV2aWV3JykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHdyYXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURvY3NUaHVtYihpdGVtKSB7XHJcbiAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2RvYy10aHVtYicsICdmaWxlLXRodW1iJyk7XHJcbiAgICBpdGVtLmFwcGVuZENoaWxkKGdldEF0dGFjaFRpdGxlKGl0ZW0pKTtcclxuICAgIGl0ZW0ucmVtb3ZlQ2hpbGQoaXRlbS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICByZXR1cm4gaXRlbTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXR0YWNoVGl0bGUoaXRlbSkge1xyXG4gICAgbGV0IHRpdGxlID0gaXRlbS5maXJzdEVsZW1lbnRDaGlsZC50aXRsZTtcclxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB3cmFwLnRleHRDb250ZW50ID0gdGl0bGU7XHJcbiAgICB3cmFwLmNsYXNzTGlzdC5hZGQoJ2F0dGFjaC10aXRsZScpO1xyXG4gICAgcmV0dXJuIHdyYXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRlbXBsYXRlKCkge1xyXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xyXG4gICAgbGV0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBibG9jay5jbGFzc0xpc3QuYWRkKCdiLWNvbW1lbnQnKTtcclxuICAgIGJsb2NrLmlkID0gJ2NvbW1lbnQtdGVtcGxhdGUnO1xyXG5cclxuICAgIGxldCBibG9ja1JvdztcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGJsb2NrUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYmxvY2tSb3cuY2xhc3NMaXN0LmFkZCgnYi1jb21tZW50X19yb3cnLCAnYi1jb21tZW50X19yb3dfJyArIGkpO1xyXG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKGJsb2NrUm93KVxyXG4gICAgfVxyXG5cclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoYmxvY2spO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod3JhcCk7XHJcblxyXG4gICAgcmV0dXJuIHdyYXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dBY3Rpb25zQnRuKGNhbW1lbnQpIHtcclxuICAgIGxldCBidG5zID0gY2FtbWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aW9ucy1idG4td3JhcCcpO1xyXG4gICAgYnRucy5jbGFzc0xpc3QudG9nZ2xlKCdpcy12aXNpYmxlJyk7XHJcbn1cclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9wY3NzL2NvbW1lbnRzRGVzaWduLnBjc3MnO1xyXG5cclxuZXhwb3J0IHtjb21tZW50c0Rlc2lnbn07XHJcblxyXG5pZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgY29tbWVudHNEZXNpZ24nKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbW1lbnRzRGVzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi9jb21tZW50c0Rlc2lnbi5wY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL2NvbW1lbnRzRGVzaWduLnBjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vY29tbWVudHNEZXNpZ24ucGNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGNzcy9jb21tZW50c0Rlc2lnbi5wY3NzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuYi1jb21tZW50X19yb3c6bGFzdC1jaGlsZHtwYWRkaW5nLWJvdHRvbToyZW19LmNvbW1lbnQtd3JhcCBwOm9ubHktb2YtdHlwZXttYXJnaW46MH0uY29tbWVudC13cmFwIHA6bGFzdC1jaGlsZHttYXJnaW4tYm90dG9tOjB9I2NvbW1lbnRzLXRibHttYXJnaW46YXV0bztwYWRkaW5nOjNlbSAwO2JhY2tncm91bmQ6I2YwZjBmMH0jY29tbWVudHMtdGJsLmhpZGUtb3JpZ2luYWwgdHI+dGR7ZGlzcGxheTpub25lfSNjb21tZW50cy10YmwsI2NvbW1lbnRzLXRibCB0Ym9keSwjY29tbWVudHMtdGJsIHRye2Rpc3BsYXk6YmxvY2t9I2NvbW1lbnRzLXRibCB0cjpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1ib3R0b206MmVtfS5jb21tZW50LWJvZHl7d2lkdGg6MTAwJX0uY29tbWVudC13cmFwIHB7bGluZS1oZWlnaHQ6MS40XFxyXFxuXFxyXFxuICAgICAgICAvKlxcclxcbiAgICAgICAgLy/Qs9C00LUt0YLQviDRgtCw0LrQuCDQstGB0YLQsNCy0LvRj9GO0YLRgdGPINC70LjRiNC90LjQtSDQv9C10YDQtdCy0L7QtNGLINGB0YLRgNC+0LpcXHJcXG4gICAgICAgIC8v0YHQtNC10LvQsNGOINGC0LDQutC+0Lkg0LPRgNGP0LfQvdGL0Lkg0YXQsNC6XFxyXFxuICAgICAgICAqL1xcclxcbiAgICAgICAgLyomIGJyOmZpcnN0LWNoaWxkLFxcclxcbiAgICAgICAgJiBicjpsYXN0LWNoaWxke1xcclxcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgICAgICB9Ki99LmNvbW1lbnQtd3JhcCBwOmZpcnN0LWNoaWxke21hcmdpbi10b3A6MH0uYi1jb21tZW50e21heC13aWR0aDo3MjBweDttYXJnaW46YXV0bztiYWNrZ3JvdW5kOiNmYWZhZmE7Ym94LXNoYWRvdzowIDJweCAycHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpLDAgM3B4IDFweCAtMnB4IHJnYmEoMCwwLDAsLjIpO3dpZHRoOjEwMCU7Zm9udC1zaXplOjEycHg7XFxyXFxuICAgIC8qZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1mbG93OiBjb2x1bW4gd3JhcDsqL3Bvc2l0aW9uOnJlbGF0aXZlO2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYi1jb21tZW50LmItY29tbWVudF9ub3RpZnl7bWFyZ2luLXRvcDoyZW07cGFkZGluZzoyZW07Y29sb3I6IzMxNzA4ZjtiYWNrZ3JvdW5kOiNkOWVkZjc7Ym9yZGVyOjFweCBzb2xpZCAjYmNlOGYxfS5iLWNvbW1lbnQuYi1jb21tZW50X25vdGlmeSAuY29tbWVudHMtdXBkYXRlLWxpbmt7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZy1sZWZ0OjFlbTtjb2xvcjppbmhlcml0fS5iLWNvbW1lbnRfX3Jvd3twYWRkaW5nOjFlbSAyZW07ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtZmxvdzpyb3cgd3JhcDtmbGV4LWZsb3c6cm93IHdyYXA7cG9zaXRpb246cmVsYXRpdmV9LmItY29tbWVudF9fcm93OmZpcnN0LWNoaWxke3BhZGRpbmctdG9wOjJlbX0uYi1jb21tZW50X19yb3c6Zmlyc3QtY2hpbGQgLnJvdy1yaWdodHt0b3A6MmVtfVxcclxcblxcclxcbi8qLy8xIHJvdyDRiNCw0L/QutCwKi8uYi1jb21tZW50X19yb3dfMHtjb2xvcjpncmF5fS50YXNrLXJhbmssLnRhc2stc3RhdHVze3BhZGRpbmc6MCAuNWVtIDAgMmVtfS5kZWFkbGluZS1kYXRle3BhZGRpbmctbGVmdDoxZW19LmlkLWNoZWNrYm94e3Bvc2l0aW9uOmFic29sdXRlO3Zpc2liaWxpdHk6aGlkZGVuO3otaW5kZXg6LTF9LmNvbW1lbnQtbGluaywuY29tbWVudC1ub3ttYXJnaW4tcmlnaHQ6MCFpbXBvcnRhbnR9XFxyXFxuXFxyXFxuLyovLzIgcm93INCw0LLRgtC+0YAgLSDQuNGB0L/QvtC70L3QuNGC0LXQu9GMKi8uYi1jb21tZW50X19yb3cuYi1jb21tZW50X19yb3dfMXtwYWRkaW5nLXRvcDowOy1tcy1mbGV4LXBhY2s6anVzdGlmeTtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjtjb2xvcjpncmF5fS5jb21tZW50LWluZm8+c3BhbntkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmNvbW1lbnQtYXV0aG9ye3BhZGRpbmctcmlnaHQ6MmVtO3Bvc2l0aW9uOnJlbGF0aXZlfS5jb21tZW50LWF1dGhvcjphZnRlcntjb250ZW50OlxcXCJcXFxcMjE5MlxcXCI7cG9zaXRpb246cmVsYXRpdmU7bGVmdDoxZW19XFxyXFxuXFxyXFxuLyovLzMgcm93INGC0LXQutGB0YIg0LrQsNC80LXQvdGC0LAqLy5iLWNvbW1lbnRfX3Jvd18ye2ZvbnQtc2l6ZToxNHB4O2JhY2tncm91bmQ6I2ZmZjtib3JkZXItdG9wOjFweCBzb2xpZCBoc2xhKDAsMCUsNjMlLC4yKTtib3JkZXItYm90dG9tOjFweCBzb2xpZCBoc2xhKDAsMCUsNjMlLC4yKTtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59XFxyXFxuXFxyXFxuLyrQuCDQutC90L7Qv9C60Lgg0KPQtNCw0LvQuNGC0YwsINCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMKi8uYWN0aW9ucy1idG4td3JhcHtwYWRkaW5nOjFlbTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTtyaWdodDowO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zc30uYWN0aW9ucy1idG4td3JhcC5pcy12aXNpYmxle3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xMDAlKX0uYnRuLWRlbC1jb21tZW50LC5idG4tZWRpdC1jb21tZW50e2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtoZWlnaHQ6MjRweDtsaW5lLWhlaWdodDoyNHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6MX0uYnRuLWVkaXQtY29tbWVudHtcXHJcXG4gICAgLyp3aWR0aDogMTQwcHg7Ki9tYXJnaW4tbGVmdDouNWVtO1xcclxcbiAgICAvKmJvcmRlcjogMXB4IHNvbGlkICNBREFEQUQ7Ki90b3A6M3B4fS5idG4tZGVsLWNvbW1lbnR7d2lkdGg6NzBweFxcclxcbiAgICAvKndpZHRoOiAxMDBweDsqL31cXHJcXG5cXHJcXG4vKi5idG4tZWRpdC1jb21tZW50OmFmdGVyLCovLmJ0bi1kZWwtY29tbWVudDphZnRlcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt6LWluZGV4Oi0xO2NvbnRlbnQ6XFxcIlxcXFw0MjNcXFxcNDM0XFxcXDQzMFxcXFw0M0JcXFxcNDM4XFxcXDQ0MlxcXFw0NENcXFwiO2NvbG9yOiNjY2M7bGluZS1oZWlnaHQ6bm9ybWFsO2JvcmRlci1ib3R0b206MXB4IHNvbGlkfVxcclxcblxcclxcbi8qLmJ0bi1lZGl0LWNvbW1lbnQ6YWZ0ZXIge1xcclxcbiAgICBjb250ZW50OiAn0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YwnO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjRTFFMUUxO1xcclxcbn0qL1xcclxcblxcclxcbi8qLmJ0bi1lZGl0LWNvbW1lbnQgaW1nLCovLmJ0bi1kZWwtY29tbWVudCBpbWd7ZGlzcGxheTpub25lfVxcclxcblxcclxcbi8qLmJ0bi1lZGl0LWNvbW1lbnQgYSwqLy5idG4tZGVsLWNvbW1lbnQgYXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlfVxcclxcblxcclxcbi8qLy80IHJvdyDRhNCw0LnQu9GLKi8uYi1jb21tZW50X19yb3cuYi1jb21tZW50X19yb3dfM3twYWRkaW5nLXRvcDoxLjVlbTtwYWRkaW5nLWJvdHRvbToxLjVlbTstbXMtZmxleC1hbGlnbjpzdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fVxcclxcblxcclxcbi8qLy81IHJvdyDQv9C+0LTQstCw0LsqLy5iLWNvbW1lbnRfX3Jvd18zKy5iLWNvbW1lbnRfX3Jvd180e2JvcmRlci10b3A6MXB4IHNvbGlkIGhzbGEoMCwwJSw2MyUsLjIpfS5iLWNvbW1lbnRfX3Jvdy5iLWNvbW1lbnRfX3Jvd180ey1tcy1mbGV4LXBhY2s6ZW5kO2p1c3RpZnktY29udGVudDpmbGV4LWVuZH1cXHJcXG5cXHJcXG4vKi0tLS0qLy5yb3ctcmlnaHR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjFlbTtyaWdodDoyZW19LnJvdy1yaWdodD4qe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ucm93LXJpZ2h0Pjpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1yaWdodDouN2VtfS5pbWctdGh1bWJ7bWF4LXdpZHRoOjE1MHB4fS5pbWctdGh1bWIgaW1nOmZpcnN0LWNoaWxke2Rpc3BsYXk6bm9uZX0uaW1nLXRodW1iPmF7ZGlzcGxheTpibG9ja30uaW1nLXRodW1iIC5hdHRhY2gtdGl0bGV7bWFyZ2luLXRvcDouM2VtfS50aHVtYi1waWN7d2lkdGg6MTAwJTtcXHJcXG4gICAgLypoZWlnaHQ6IGNhbGMoMTAwJSAtIDJlbSk7Ki9vYmplY3QtZml0OmNvdmVyO21heC1oZWlnaHQ6MjAwcHg7Ym9yZGVyOjFweCBzb2xpZCAjY2NjfVxcclxcblxcclxcbi8q0LHQvtC70YzRiNCw0Y8g0LrQsNGA0YLQuNC90LrQsCwg0LLRgdGC0LDQstC70Y/QtdGC0YHRj9CyINCx0LvQvtC6INC/0YDQuCDQvdCw0LLQtdC00LXQvdC40Lgg0L3QsCDQv9GA0LXQstGM0Y4qLy5sYXJnZS1waWMtcHJldmlld3ttYXgtd2lkdGg6NDB2dztib3JkZXI6MXB4IHNvbGlkIGdyYXk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjkwJTtsZWZ0OjA7XFxyXFxuICAgIC8qbGVmdDogNTAlOyovXFxyXFxuICAgIC8qdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpOyovei1pbmRleDoxfS5kb2MtdGh1bWJ7bWF4LXdpZHRoOjE1MHB4O2JhY2tncm91bmQ6I2YzZjNmMztmb250LXNpemU6MTFweDtib3JkZXI6MXB4IHNvbGlkICNjY2M7XFxyXFxuICAgIC8qbGluZS1oZWlnaHQ6IDU4cHg7Ki90ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWRlY29yYXRpb246bm9uZTtjb2xvcjppbmhlcml0fS5kb2MtdGh1bWIgLmF0dGFjaC10aXRsZXt3aWR0aDoxMDAlO3BhZGRpbmc6MCAuNWVtO2xpbmUtaGVpZ2h0OjEuNjt3b3JkLWJyZWFrOmJyZWFrLWFsbDtib3gtc2l6aW5nOmJvcmRlci1ib3g7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0uZmlsZS10aHVtYnstbXMtZmxleDoxIDEgMjUlO2ZsZXg6MSAxIDI1JTttaW4taGVpZ2h0OjcwcHg7cG9zaXRpb246cmVsYXRpdmV9LmZpbGUtdGh1bWI6bnRoLWNoaWxkKG4rNyl7bWFyZ2luLXRvcDoyZW19LmZpbGUtdGh1bWI6bm90KDpsYXN0LWNoaWxkKXttYXJnaW4tcmlnaHQ6MWVtfS5hdHRhY2gtdGl0bGV7bWF4LXdpZHRoOjE1MHB4O3RleHQtYWxpZ246Y2VudGVyO2xpbmUtaGVpZ2h0Om5vcm1hbDt3b3JkLWJyZWFrOmJyZWFrLWFsbH0jY29tbWVudHMtdGJsIHRyOmxhc3QtY2hpbGQgLmItY29tbWVudF9fcm93XzAsI2NvbW1lbnRzLXRibCB0cjpsYXN0LWNoaWxkIC5iLWNvbW1lbnRfX3Jvd18xe2NvbG9yOiMwMDB9XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj97XCJpbXBvcnRMb2FkZXJzXCI6MX0hLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliIS4vc3JjL3Bjc3MvY29tbWVudHNEZXNpZ24ucGNzc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgY2FsY3VsYXRlRWxhcHNlZFRpbWUnKTtcclxufVxyXG5cclxuLy/QutCw0LvRjNC60YPQu9GP0YLQvtGAINCyINC/0L7Qu9C1INCy0LLQvtC00LAg0LfQsNGC0YDQsNGH0LXQvdC90L7Qs9C+INCy0YDQtdC80LXQvdC4XHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZUVsYXBzZWRUaW1lKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCB0aW1lRWxhcHNlZEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwZW5kZWRfdGltZScpO1xyXG5cclxuICAgIGlmKCF0aW1lRWxhcHNlZEZpZWxkKXtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ9Cd0LUg0L3QsNC50LTQtdC90L4g0L/QvtC70LUg0LLQstC+0LTQsCDQstGA0LXQvNC10L3QuCDQstGL0L/QvtC70L3QtdC90LjRjycpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQo9C00LDQu9C10L3QuNC1INC+0LHRgNCw0LHQvtGC0YfQuNC60LAg0L3QsNC20LDRgtC40Y8g0LrQu9Cw0LLQuNGIINC00LvRjyDQv9C+0LvRjyAnc3BlbmRlZF90aW1lJ1xyXG4gICAgdGltZUVsYXBzZWRGaWVsZC5vbmtleXVwID0gbnVsbDtcclxuXHJcbiAgICAvLyDQlNC+0LHQsNCy0LvQtdC90LjQtSDRgdC+0LHRi9GC0LjRjyDQtNC70Y8g0LLRi9GH0LjRgdC70LXQvdC40Y8g0LfQsNGC0YDQsNGH0LXQvdC90L7Qs9C+INCy0YDQtdC80LXQvdC4INC00LvRjyDQv9C+0LvRjyAnc3BlbmRlZF90aW1lJ1xyXG4gICAgdGltZUVsYXBzZWRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGN1cl92YWx1ZSA9IHRoaXMudmFsdWU7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGN1cl92YWx1ZSA9IGV2YWwoY3VyX3ZhbHVlKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J7RiNC40LHQutCwINCy0YvRh9C40YHQu9C10L3QuNGPINC30LDRgtGA0LDRh9C10L3QvdC+0LPQviDQstGA0LXQvNC10L3QuC4g0JjRgdC/0L7Qu9GM0LfRg9C50YLQtSDRh9C40YHQu9CwINC4INC30L3QsNC60LggwqsrwrssIMKrLcK7LCDCqyrCuywgwqsvwrsg0Lgg0YHQutC+0LHQutC4XCIpO1xyXG5cclxuICAgICAgICAgICAgY3VyX3ZhbHVlID0gbnVsbDtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICBpZiAoKGN1cl92YWx1ZSAhPT0gbnVsbCkgJiYgKCFpc05hTihjdXJfdmFsdWUpKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGN1cl92YWx1ZSA9IE1hdGgucm91bmQoY3VyX3ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY3VyX3ZhbHVlIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcItCe0YLRgNC40YbQsNGC0LXQu9GM0L3QvtC1INC40LvQuCDQvdGD0LvQtdCy0L7QtSDQt9C90LDRh9C10L3QuNC1INCy0YDQtdC80LXQvdC4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cl92YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGN1cl92YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gbWluVG9EYXlzKHRpbWVJbk1pbnV0ZXMsIGRheUluSG91cnMgPSA4KSB7XHJcbi8vICAgICBsZXQgcmV0U3RyID0gXCJcIjtcclxuLy9cclxuLy8gICAgIGlmICgodGltZUluTWludXRlcyAhPT0gbnVsbCkgJiYgKCFpc05hTih0aW1lSW5NaW51dGVzKSkgJiYgKHRpbWVJbk1pbnV0ZXMgPiAwKSkge1xyXG4vLyAgICAgICAgIGRheUluSG91cnMgPSBkYXlJbkhvdXJzIDw8IDA7XHJcbi8vICAgICAgICAgaWYgKChkYXlJbkhvdXJzID09PSB1bmRlZmluZWQpIHx8IChkYXlJbkhvdXJzID09PSBudWxsKSB8fCAoaXNOYU4oZGF5SW5Ib3VycykpIHx8IChkYXlJbkhvdXJzIDwgMSkpIGRheUluSG91cnMgPSAyNDtcclxuLy8gICAgICAgICBsZXQgdEQsIHRILCB0TTtcclxuLy8gICAgICAgICB0RCA9ICh0aW1lSW5NaW51dGVzIC8gZGF5SW5Ib3VycyAvIDYwKSA8PCAwO1xyXG4vLyAgICAgICAgIHJldFN0ciArPSB0RCA+IDAgPyB0RCArIFwiINC0LiBcIiA6IFwiXCI7XHJcbi8vICAgICAgICAgdGltZUluTWludXRlcyAtPSB0RCAqIGRheUluSG91cnMgKiA2MDtcclxuLy8gICAgICAgICB0SCA9ICh0aW1lSW5NaW51dGVzIC8gNjApIDw8IDA7XHJcbi8vICAgICAgICAgcmV0U3RyICs9IHRIID4gMCA/IHRIICsgXCIg0YcuIFwiIDogXCJcIjtcclxuLy8gICAgICAgICB0aW1lSW5NaW51dGVzIC09IHRIICogNjA7XHJcbi8vICAgICAgICAgdE0gPSB0aW1lSW5NaW51dGVzIDw8IDA7XHJcbi8vICAgICAgICAgcmV0U3RyICs9IHRNICsgXCIg0LzQuNC9LlwiICsgXCIgKFwiICsgZGF5SW5Ib3VycyArIFwiLdGH0LDRgdC+0LLQvtC5INC00LXQvdGMKVwiO1xyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICByZXRTdHIgKz0gXCLQp9GC0L4t0YLQviDRgdC+INCy0YDQtdC80LXQvdC10Lwg0L3QtSDRgtCw0LogOihcIjtcclxuLy8gICAgIH1cclxuLy8gICAgIHJldHVybiByZXRTdHI7XHJcbi8vIH1cclxuXHJcbmV4cG9ydCB7Y2FsY3VsYXRlRWxhcHNlZFRpbWV9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgY2FsY3VsYXRlRWxhcHNlZFRpbWUnKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NhbGN1bGF0ZUVsYXBzZWRUaW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCBnb1RvVGFza0RhdGFsaXN0Jyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0VGFza0lkLGdldFRhc2tIZWFkfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGdvVG9UYXNrRGF0YWxpc3QoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IHRhc2tJZCA9IGdldFRhc2tJZCgpO1xyXG5cclxuICAgIGxldCB0YXNrVGl0bGUgPSBnZXRUYXNrSGVhZCgpLnRpdGxlO1xyXG5cclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YWxpc3QnKSkgfHwgW107XHJcbiAgICBkYXRhID0gYXBwZW5kSWQoZGF0YSk7XHJcblxyXG4gICAgLy/QtdGB0LvQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0LXRgdGC0Ywg0LfQsNCz0L7Qu9C+0LLQvtC6INC30LDQtNCw0YfQuFxyXG4gICAgLy8gLSDQv9GA0L7QstC10YDQuNGC0Ywg0LXRgdGC0Ywg0LvQuCDQvtC90LAg0LIg0YHQv9C40YHQutC1XHJcbiAgICBpZiAodGFza1RpdGxlKSB7XHJcblxyXG4gICAgICAgIGxldCBuZXdkYXRhID0ge1wiaWRcIjogdGFza0lkLCBcInRpdGxlXCI6IHRhc2tUaXRsZSArICcgJyArIHRhc2tJZH07XHJcblxyXG4gICAgICAgIGRhdGEgPSBhcHBlbmRJZChkYXRhLCBuZXdkYXRhKTtcclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGFsaXN0JywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v0YHQvtC30LTQsNC8IGRhdGFsaXN0XHJcbiAgICBsZXQgZGF0YWxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkYXRhbGlzdCcpO1xyXG4gICAgZGF0YWxpc3QuaWQgPSAnZGwtZ290b3Rhc2snO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkYXRhbGlzdCk7XHJcblxyXG4gICAgLy/RgdCy0Y/Qt9Cw0YLRjCBkYXRhbGlzdCDRgSDQv9C+0LvQtdC8INCy0LLQvtC00LAgaWQg0LfQsNC00LDRh9C4XHJcbiAgICBsZXQgaWRGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb1RvJyk7XHJcbiAgICBpZEZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgIGlkRmllbGQuc2V0QXR0cmlidXRlKCdsaXN0JywgJ2RsLWdvdG90YXNrJyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgb3AudmFsdWUgPSBkYXRhW2ldLmlkO1xyXG4gICAgICAgIG9wLmxhYmVsID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICBkYXRhbGlzdC5hcHBlbmRDaGlsZChvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwZW5kSWQoYXJyLCBuZXdkYXRhID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAobmV3ZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgY2hlY2sgPSBhcnIuc29tZShmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IG5ld2RhdGEuaWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjaGVjaykge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2gobmV3ZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhcnIubGVuZ3RoID4gMTApIHtcclxuICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2dvVG9UYXNrRGF0YWxpc3R9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgZ29Ub1Rhc2tEYXRhbGlzdCcpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZ29Ub1Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIGNvdW50V29ya2VyVGltZScpO1xyXG59XHJcblxyXG5pbXBvcnQge2dldEFsbENvbW1lbnRzUm93cyxnZXRBbGxXb3JrZXJzLGdldFJvd1RpbWVTdHJpbmd9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5pbXBvcnQge2NyZWF0ZUlTT0RhdGUsZWxpbWluYXRlRHVwbGljYXRlcyxkYXRlRm9ybWF0dGVyLGdldFJvd0RhdGVTdHJpbmd9IGZyb20gJy4vX3V0aWxzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGNvdW50V29ya2VyVGltZSgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGxldCAkaW5wdXRfYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItdG9vbGJhcicpO1xyXG4gICAgbGV0IHJvd3MgPSBnZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuICAgIGxldCB3b3JrZXJzID0gZ2V0QWxsV29ya2VycygpO1xyXG4gICAgbGV0IGRhdGVzX2NvbGxlY3Rpb24gPSBbXTtcclxuICAgIGxldCBkYXRlX3N0cjtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBkYXRlX3N0ciA9IHJvd3NbaV0uY2hpbGRyZW5bM10udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgZGF0ZV9zdHIgPSBkYXRlX3N0ci5zcGxpdCgnICcpO1xyXG4gICAgICAgIGRhdGVzX2NvbGxlY3Rpb24ucHVzaChjcmVhdGVJU09EYXRlKGRhdGVfc3RyWzBdKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRhdGVzX2FyciA9IGVsaW1pbmF0ZUR1cGxpY2F0ZXMoZGF0ZXNfY29sbGVjdGlvbik7XHJcblxyXG4gICAgbGV0IGNyZWF0ZURhdGVzTGlzdCA9IGZ1bmN0aW9uIChpbnB1dF9ib3gsIGRhdGVzKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUxpc3QoY3NzX2lkLCBjc3NfY2xhc3MpIHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdTRUxFQ1QnKTtcclxuICAgICAgICAgICAgbGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgY3NzX2lkKTtcclxuICAgICAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKGNzc19jbGFzcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXJfX2l0ZW0nKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0X2xpc3QgPSBjcmVhdGVMaXN0KCdkYXRlLXN0YXJ0LWxpc3QnLCAnZGF0ZXMtbGlzdCcpO1xyXG5cclxuICAgICAgICBsZXQgZW5kX2xpc3QgPSBjcmVhdGVMaXN0KCdkYXRlLWVuZC1saXN0JywgJ2RhdGVzLWxpc3QnKTtcclxuXHJcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0JVVFRPTicpO1xyXG4gICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgYnRuLnRleHRDb250ZW50ID0gJ9Cf0L7RgdGH0LjRgtCw0YLRjCc7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb24sIGNsbl9vcHRpb24sIGxpc3RkYXRlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpc3RkYXRlID0gZGF0ZUZvcm1hdHRlcihwYXJzZUludChkYXRlc1tpXSwgMTApKTtcclxuICAgICAgICAgICAgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnT1BUSU9OJyk7XHJcbiAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZGF0ZXNbaV0pO1xyXG4gICAgICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gbGlzdGRhdGUudG9Mb2NhbGVTdHJpbmcoJ3J1Jyk7XHJcbiAgICAgICAgICAgIGNsbl9vcHRpb24gPSBvcHRpb24uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICBzdGFydF9saXN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICAgICAgICAgIGVuZF9saXN0LmFwcGVuZENoaWxkKGNsbl9vcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBib3guYXBwZW5kQ2hpbGQoc3RhcnRfbGlzdCk7XHJcbiAgICAgICAgYm94LmFwcGVuZENoaWxkKGVuZF9saXN0KTtcclxuICAgICAgICBib3guYXBwZW5kQ2hpbGQoYnRuKTtcclxuXHJcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDMnKTtcclxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9ICfQl9CwINCy0YvQsdGA0LDQvdC90YvQuSDQv9C10YDQuNC+0LQnO1xyXG4gICAgICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3VzZXItdG9vbGJhci10aXRsZScpO1xyXG4gICAgICAgIGJveC5pbnNlcnRCZWZvcmUodGl0bGUsIGJveC5maXJzdENoaWxkKTtcclxuXHJcbiAgICAgICAgaW5wdXRfYm94Lmluc2VydEJlZm9yZShib3gsIGlucHV0X2JveC5sYXN0Q2hpbGQpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnYm94JzogYm94LFxyXG4gICAgICAgICAgICAnc3RhcnRfbGlzdCc6IHN0YXJ0X2xpc3QsXHJcbiAgICAgICAgICAgICdlbmRfbGlzdCc6IGVuZF9saXN0LFxyXG4gICAgICAgICAgICAnYnRuJzogYnRuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgdGltZWxpc3QgPSBjcmVhdGVUaW1lTGlzdCh3b3JrZXJzLCByb3dzKTtcclxuXHJcbiAgICBsZXQgJHRpbWVsaXN0ID0gY3JlYXRlVGltZUxpc3RWaWV3KHRpbWVsaXN0KTtcclxuXHJcbiAgICAkdGltZWxpc3QuY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyX19pdGVtJyk7XHJcblxyXG4gICAgLy/QtNC+0LHQsNCy0LvRj9C10Lwg0YHRgtGA0L7QutGDINGBINC+0LHRidC40Lwg0LLRgNC10LzQtdC90LXQvCDQstGB0LXRhSDRgdC+0YLRgNGD0LTQvdC40LrQvtCyXHJcbiAgICAvL9GC0YDQtdGC0LjQuSDQv9Cw0YDQsNC80LXRgtGAIHRydWUgLSDRgdGC0LDQstC40YIg0LrQu9Cw0YHRgS3QvNCw0YDQutC10YAg0LLRi9Cx0YDQsNC90L3Ri9GFINGA0LDQsdC+0YLQvdC40LrQvtCyXHJcbiAgICBpbnNlcnRUb3RhbFRpbWUoJHRpbWVsaXN0LCB0aW1lbGlzdCwgdHJ1ZSk7XHJcblxyXG4gICAgLy8g0LTQvtCx0LDQstC70Y/QtdC8INC60LvQuNC6INC/0L4g0YHRgtGA0L7QutC1INC00LvRjyDQv9C+0LTRgdGH0LXRgtCwINCy0YDQtdC80LXQvdC4INCy0YvQsdGA0LDQvdC90YvRhSDRgNCw0LHQvtGC0L3QuNC60L7QslxyXG4gICAgJHRpbWVsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZighZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0aW1lLWxpc3QtdG90YWwnKSl7XHJcbiAgICAgICAgICAgIGNvdW50U2VsZWN0ZWRXb3JrZXJzVGltZSh0aGlzLCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgJHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDMnKTtcclxuICAgICR0aXRsZS50ZXh0Q29udGVudCA9ICfQktGB0Y8g0LfQsNC00LDRh9CwJztcclxuICAgICR0aXRsZS5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXItdGl0bGUnKTtcclxuICAgICR0aW1lbGlzdC5pbnNlcnRCZWZvcmUoJHRpdGxlLCAkdGltZWxpc3QuZmlyc3RDaGlsZCk7XHJcbiAgICAkdGltZWxpc3QuY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyX19pdGVtJyk7XHJcblxyXG4gICAgbGV0IGRhdGVfbGlzdHMgPSBjcmVhdGVEYXRlc0xpc3QoJGlucHV0X2JveCwgZGF0ZXNfYXJyKTtcclxuXHJcbiAgICAvLyDQtNC+0LHQsNCy0LvRj9GOINGB0LXQu9C10LrRgtGLINGBINC00LDRgtCw0LzQuCAtINC/0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INC30LAg0LLRi9Cx0YDQsNC90L3Ri9C5INC/0LXRgNC40L7QtFxyXG4gICAgZmluZFRpbWVJbkRhdGVzUmFuZ2UoZGF0ZV9saXN0cywgd29ya2Vycywgcm93cyk7XHJcblxyXG4gICAgJGlucHV0X2JveC5pbnNlcnRCZWZvcmUoJHRpbWVsaXN0LCAkaW5wdXRfYm94Lmxhc3RDaGlsZCk7XHJcblxyXG4gICAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI1NTg5NzcvYWpheC1jcm9zcy1kb21haW4tY2FsbFxyXG59XHJcblxyXG4vLyDRgdC+0LfQtNCw0L3QuNC1INC+0LHRitC10LrRgtCwINGB0L4g0YHQv9C40YHQutC+0Lwg0YHQvtGC0YDRg9C00L3QutC+0LIg0Lgg0LLRgNC10LzQtdC90Lgg0LrQsNC20LTQvtCz0L4g0LIg0LfQsNC00LDRh9C1XHJcbmZ1bmN0aW9uIGNyZWF0ZVRpbWVMaXN0KHdvcmtlcnMsIHJvd3MpIHtcclxuXHJcbiAgICBsZXQgbnRpbWUsIG5hbWUsIHRzdW07XHJcbiAgICBsZXQgdGltZWxpc3QgPSB7fTtcclxuXHJcbiAgICBmb3IgKGxldCBzID0gMDsgcyA8IHdvcmtlcnMubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICB0c3VtID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG50aW1lID0gZ2V0Um93VGltZVN0cmluZyhyb3dzW2ldKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyb3dzW2ldLmNoaWxkcmVuWzRdKSB7XHJcbiAgICAgICAgICAgICAgICAvL9C00L4g0LfQsNC/0YPRgdC60LAgY2FtbWVudHNEZXNpZ24oKTtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSByb3dzW2ldLmNoaWxkcmVuWzRdLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/Qv9C+0YHQu9C1INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gcm93c1tpXS5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1hdXRob3InKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHdvcmtlcnNbc10gPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRzdW0gKz0gbnRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aW1lbGlzdFtuYW1lXSA9IHRzdW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRpbWVsaXN0O1xyXG59XHJcblxyXG4vLyDRgdC+0LfQtNCw0L3QuNC1IGh0bWwg0Y3Qu9C10LzQtdC90YLQsCDRgdC+INGB0L/QuNGB0LrQvtC8INGB0L7RgtGA0YPQtNC90LrQvtCyINC4INCy0YDQtdC80LXQvdC4INC60LDQttC00L7Qs9C+INCyINC30LDQtNCw0YfQtVxyXG5mdW5jdGlvbiBjcmVhdGVUaW1lTGlzdFZpZXcoZGF0YSkge1xyXG4gICAgbGV0ICR0aW1lbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgJHRpbWVsaXN0LmNsYXNzTGlzdC5hZGQoJ3RpbWUtbGlzdCcpO1xyXG4gICAgJHRpbWVsaXN0LmlkID0gJ3dvcmtlcnMtdGltZSc7XHJcblxyXG4gICAgbGV0IGxpc3RfaXRlbTtcclxuICAgIGxldCB3b3JrZXJ0aW1lO1xyXG4gICAgbGV0IHRvdGFsdGltZSA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgayBpbiBkYXRhKSB7XHJcbiAgICAgICAgd29ya2VydGltZSA9IGRhdGFba107XHJcbiAgICAgICAgdG90YWx0aW1lICs9IHdvcmtlcnRpbWU7XHJcbiAgICAgICAgbGlzdF9pdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGxpc3RfaXRlbS5kYXRhc2V0LndvcmtlcnRpbWUgPSB3b3JrZXJ0aW1lO1xyXG4gICAgICAgIGxpc3RfaXRlbS5pbm5lckhUTUwgPSAnPHNwYW4+JyArIGsgKyAnPC9zcGFuPiA8c3Bhbj4nICsgd29ya2VydGltZSArICc8L3NwYW4+JztcclxuICAgICAgICAkdGltZWxpc3QuaW5zZXJ0QmVmb3JlKGxpc3RfaXRlbSwgJHRpbWVsaXN0Lmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICR0aW1lbGlzdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFRpbWVJbkRhdGVzUmFuZ2UobGlzdHMsIHdvcmtlcnMsIHJvd3MpIHtcclxuICAgIGxldCAkc3RhcnRfbGlzdCA9IGxpc3RzLnN0YXJ0X2xpc3Q7XHJcbiAgICBsZXQgJGVuZF9saXN0ID0gbGlzdHMuZW5kX2xpc3Q7XHJcbiAgICBsZXQgJGJveCA9IGxpc3RzLmJveDtcclxuICAgIGxldCAkYnRuID0gbGlzdHMuYnRuO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmRSb3dzSW5SYW5nZShyb3dzLCBzdGFydCwgZW5kKSB7XHJcblxyXG4gICAgICAgIHJldHVybiByb3dzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbV9kYXRlID0gZ2V0Um93RGF0ZVN0cmluZyhpdGVtKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpdGVtX2RhdGUgPj0gc3RhcnQgJiYgaXRlbV9kYXRlIDw9IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAkYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgZmluZF9yb3dzID0gZmluZFJvd3NJblJhbmdlKHJvd3MsICRzdGFydF9saXN0LnZhbHVlLCAkZW5kX2xpc3QudmFsdWUpO1xyXG5cclxuICAgICAgICBsZXQgcmFuZ2VfdGltZWxpc3QgPSBjcmVhdGVUaW1lTGlzdChnZXRTZWxlY3RlZFdvcmtlcnMoKSwgZmluZF9yb3dzKTtcclxuICAgICAgICBsZXQgJHJhbmdlX3RpbWVsaXN0ID0gY3JlYXRlVGltZUxpc3RWaWV3KHJhbmdlX3RpbWVsaXN0KTtcclxuXHJcbiAgICAgICAgaWYgKCRib3gucXVlcnlTZWxlY3RvcignI3JhbmdlLXRpbWVsaXN0JykpIHtcclxuICAgICAgICAgICAgJGJveC5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFuZ2UtdGltZWxpc3QnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcmFuZ2VfdGltZWxpc3Quc2V0QXR0cmlidXRlKCdpZCcsICdyYW5nZS10aW1lbGlzdCcpO1xyXG5cclxuICAgICAgICAkYm94LmFwcGVuZENoaWxkKCRyYW5nZV90aW1lbGlzdCk7XHJcblxyXG4gICAgICAgIGluc2VydFRvdGFsVGltZSgkcmFuZ2VfdGltZWxpc3QsIHJhbmdlX3RpbWVsaXN0KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWxlY3RlZFdvcmtlcnMoKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWRfd29ya2VycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JrZXJzLXRpbWUnKS5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0ZWQnKTtcclxuICAgIGxldCBzZWxlY3RlZF9uYW1lcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRfd29ya2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNlbGVjdGVkX25hbWVzLnB1c2goc2VsZWN0ZWRfd29ya2Vyc1tpXS5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGVkX25hbWVzO1xyXG59XHJcblxyXG4vL9C/0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INCy0YvQsdGA0LDQvdC90YvRhSDRg9GH0LDRgdGC0L3QuNC60L7QsiDQt9Cw0LTQsNGH0LggKNC40Lcg0YHQv9C40YHQutCwINCy0YHQtdGFINGD0YfQsNGB0YLQvdC40LrQvtCyKVxyXG5mdW5jdGlvbiBjb3VudFNlbGVjdGVkV29ya2Vyc1RpbWUobGlzdCwgZXZlbnQpIHtcclxuICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBsZXQgJHRvdGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmtlcnMtdGltZS10b3RhbCcpO1xyXG4gICAgbGV0IHRvdGFsID0gcGFyc2VJbnQoJHRvdGFsLmRhdGFzZXQudG90YWx0aW1lKTtcclxuXHJcbiAgICB3aGlsZSAodGFyZ2V0ICE9PSBsaXN0KSB7XHJcbiAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lID09PSAnUCcpIHtcclxuICAgICAgICAgICAgcmVjb3VudFRvdGFsKHRhcmdldCwgJHRvdGFsLCB0b3RhbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlY291bnRUb3RhbChlbGVtLCB0b3RhbCwgdG90YWx0aW1lKSB7XHJcbiAgICAgICAgbGV0IGVsZW10aW1lID0gcGFyc2VJbnQoZWxlbS5kYXRhc2V0LndvcmtlcnRpbWUpO1xyXG5cclxuICAgICAgICAvL9C60LvQsNGB0YEgZXhjbHVkZWQg0L3Rg9C20LXQvSDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40Lgg0YHQv9C40YHQutCwINGA0LDQsdC+0YLQvdC40LrQvtCyXHJcbiAgICAgICAgLy/QsiDQstGL0LLQvtC00LUg0LLRgNC10LzQvdC4INC30LAg0L/QtdGA0LjQvtC0IC0g0LLRi9Cy0L7QtCDRgtC+0LvRjNC60L4g0L/QviDQstGL0LHRgNCw0L3QvdGL0LwgKHNlbGVjdGVkKSDRgNCw0LHQvtGC0L3QuNC60LDQvFxyXG4gICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnZXhjbHVkZWQnKTtcclxuICAgICAgICAgICAgdG90YWx0aW1lID0gdG90YWx0aW1lIC0gZWxlbXRpbWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2V4Y2x1ZGVkJyk7XHJcbiAgICAgICAgICAgIHRvdGFsdGltZSA9IHRvdGFsdGltZSArIGVsZW10aW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG90YWwuaW5uZXJIVE1MID0gdG90YWx0aW1lO1xyXG4gICAgICAgIHRvdGFsLmRhdGFzZXQudG90YWx0aW1lID0gdG90YWx0aW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyDQv9C+0LTRgdGH0LXRgiDQvtCx0YnQtdCz0L4g0LLRgNC10LzQtdC90Lgg0LLRgdC10YUg0YHQvtGC0YDRg9C00L3QuNC60L7QsiDQtNC70Y8g0YHQv9C40YHQutCwINGB0L7RgtGA0YPQtNC90LjQui3QstGA0LXQvNGPXHJcbmZ1bmN0aW9uIGluc2VydFRvdGFsVGltZSh0aW1lbGlzdCwgZGF0YSwgYWRkbWFya2VyKSB7XHJcbiAgICBsZXQgdG90YWx0aW1lID0gMDtcclxuICAgIGxldCB0b3RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuXHJcbiAgICBmb3IgKGxldCBrIGluIGRhdGEpIHtcclxuICAgICAgICB0b3RhbHRpbWUgKz0gZGF0YVtrXTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWRkbWFya2VyKSB7XHJcbiAgICAgICAgbGV0IGxpc3RfaXRlbXMgPSB0aW1lbGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdwJyk7XHJcbiAgICAgICAgLy/Qv9C+INGD0LzQvtC70YfQsNC90LjRjiDQstGB0LUg0YDQsNCx0L7RgtC90LjQutC4INCy0YvQsdGA0LDQvdGLLCDRgdGH0LjRgtCw0LXRgtGB0Y8g0L7QsdGJ0LXQtSDQstGA0LXQvNGPINC/0L4g0LLRgdC10LxcclxuICAgICAgICAvL9Cy0YHQtdC8INC00L7QsdCw0LLQu9GP0LXQvCDQutC70LDRgdGBIHNlbGVjdGVkINC90YPQttC90YvQuSDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40Lgg0YHQv9C40YHQutCwXHJcbiAgICAgICAgLy/QuCDRh9GC0L7QsdGLINCy0LjQt9GD0LDQu9GM0L3QviDQvtGC0LzQtdGC0LjRgtGMINCy0YvQsdGA0LDQvdC90YvRhSDQsiDRgdC/0LjRgdC60LVcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RfaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGlzdF9pdGVtc1tpXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0b3RhbC5pbm5lckhUTUwgPSAnPHNwYW4+0JLRgdC10LPQvjo8L3NwYW4+IDxzcGFuIGlkPVwid29ya2Vycy10aW1lLXRvdGFsXCIgZGF0YS10b3RhbHRpbWU9XCInICsgdG90YWx0aW1lICsgJ1wiPicgKyB0b3RhbHRpbWUgKyAnPC9zcGFuPic7XHJcbiAgICB0b3RhbC5jbGFzc0xpc3QuYWRkKCd0aW1lLWxpc3QtdG90YWwnKTtcclxuICAgIHRpbWVsaXN0LmFwcGVuZENoaWxkKHRvdGFsKTtcclxuXHJcbiAgICByZXR1cm4gdG90YWx0aW1lO1xyXG59XHJcblxyXG5leHBvcnQge2NvdW50V29ya2VyVGltZX07XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBjb3VudFdvcmtlclRpbWUnKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvdW50V29ya2VyVGltZS5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpe1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIHRhc2tGb290ZXJEZXNpZ24nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGFza0Zvb3RlckRlc2lnbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbi8vbmV3IGNvbW1lbnRcclxuICAgIGxldCBjb21tZW50VGJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RibC1uZXctY29tbWVudCcpO1xyXG4gICAgbGV0IG5ld0NvbW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNvbW1lbnQtd3JhcCcpO1xyXG5cclxuICAgIC8vINC00L7QsdCw0LLQu9GOINC30LDQs9C+0LvQvtCy0L7QulxyXG4gICAgbGV0IG5ld0NvbW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICBuZXdDb21tZW50VGl0bGUudGV4dENvbnRlbnQgPSAn0J3QvtCy0YvQuSDQutC+0LzQvNC10L3RgtCw0YDQuNC5JztcclxuICAgIG5ld0NvbW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uLXRpdGxlJyk7XHJcbiAgICBuZXdDb21tZW50Lmluc2VydEJlZm9yZShuZXdDb21tZW50VGl0bGUsIG5ld0NvbW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG5cclxuICAgIC8vMSDQv9C10YDQstCw0Y8g0YHRgtGA0L7QutCwIC0g0LjRgdC/0L7Qu9C90LjRgtC10LvRjCwg0YHRgtCw0YLRg9GBLCDQv9GA0LjQvtGA0LjRgtC10YJcclxuICAgIC8v0LHQu9C+0Log0LIg0LrQvtGC0L7RgNC+0Lwg0LHRg9C00YPRgiDQv9C+0LvRjyDQtNC70Y8g0LLQstC+0LTQsCDQt9Cw0YLRgNCw0YfQtdC90L3QvtCz0L4g0Lgg0L/Qu9Cw0L3QuNGA0YPQtdC80L7Qs9C+INCy0YDQtdC80LXQvdC4XHJcbiAgICAvL9C4INCy0YvQsdC+0YAg0L/RgNC40L7RgNC40YLQtdGC0LBcclxuXHJcbiAgICBsZXQgcm93SXRlbVByb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBsZXQgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBsZXQgcm93c0ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIC8v0LjRgdC/0L7Qu9C90LjRgtC10LvRjFxyXG4gICAgbGV0IGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludGVybmFsX3dvcmtlcicpO1xyXG4gICAgbGV0IHdvcmtlckJsb2NrID0gZmllbGQucGFyZW50Tm9kZTtcclxuICAgIHdvcmtlckJsb2NrLmNsYXNzTGlzdC5hZGQoJ3dvcmtlci1ibG9jaycpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQod29ya2VyQmxvY2spO1xyXG5cclxuICAgIC8v0YHRgtCw0YLRg9GBXHJcbiAgICBsZXQgc3RhdHVzVGJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RibC1zdGF0dXMnKTtcclxuICAgIGxldCBzdGF0dXNMaXN0ID0gY3JlYXRlU3RhdHVzTGlzdChzdGF0dXNUYmwpO1xyXG4gICAgbGV0IGJsb2NrID0gY3JlYXRlRmllbGRBbmRMYWJlbCgn0KHRgtCw0YLRg9GBJywgc3RhdHVzTGlzdCk7XHJcbiAgICBibG9jay5jbGFzc0xpc3QuYWRkKCdmcm93LWNvbC0yLTEnKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChibG9jayk7XHJcblxyXG4gICAgLy/Qv9GA0LjQvtGA0LjRgtC10YJcclxuICAgIGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5X2lkJyk7XHJcbiAgICBibG9jayA9IGNyZWF0ZUZpZWxkQW5kTGFiZWwoJ9Cf0YDQuNC+0YDQuNGC0LXRgicsIGZpZWxkKTtcclxuICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2Zyb3ctY29sLTItMicpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoYmxvY2spO1xyXG5cclxuICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1maWVsZHMtcm93JywndGFzay1yb3ctMScpO1xyXG4gICAgcm93SXRlbS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICByb3dzRnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgLy8yINCy0YLQvtGA0LDRjyDRgdGC0YDQvtC60LAgLSDQstGA0LXQvNGPICjQt9Cw0YLRgNCw0YfQtdC90L4v0L/Qu9Cw0L3QuNGA0YPQtdC80L4pLCDQv9GA0L7QtdC60YIsINGB0YDQvtC6XHJcblxyXG4gICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmllbGRzLXJvdycsJ3Rhc2stcm93LTInKTtcclxuXHJcbiAgICBsZXQgdGltZUJsb2NrID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHRpbWVCbG9jay5jbGFzc0xpc3QuYWRkKCd0aW1lLWJsb2NrJyk7XHJcblxyXG4gICAgLy/Qt9Cw0YLRgNCw0YfQtdC90L4g0LLRgNC10LzQtdC90LhcclxuICAgIGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwZW5kZWRfdGltZScpO1xyXG4gICAgYmxvY2sgPSBjcmVhdGVGaWVsZEFuZExhYmVsKCfQl9Cw0YLRgNCw0YfQtdC90L4nLCBmaWVsZCk7XHJcbiAgICB0aW1lQmxvY2suYXBwZW5kQ2hpbGQoYmxvY2spO1xyXG5cclxuICAgIC8v0L/Qu9Cw0L3QuNGA0YPQtdC80L7QtSDQstGA0LXQvNGPXHJcbiAgICBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFuX3RpbWUnKTtcclxuICAgIGJsb2NrID0gY3JlYXRlRmllbGRBbmRMYWJlbCgn0J/Qu9Cw0L3QuNGA0YPQtdC80L7QtScsIGZpZWxkKTtcclxuICAgIHRpbWVCbG9jay5hcHBlbmRDaGlsZChibG9jayk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGltZUJsb2NrKTtcclxuXHJcbiAgICAvL9C/0YDQvtC10LrRglxyXG4gICAgZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xpZW50X2lkJyk7XHJcbiAgICBsZXQgcHJvamVjdCA9IGNyZWF0ZUZpZWxkQW5kTGFiZWwoJ9Cf0YDQvtC10LrRgicsIGZpZWxkKTtcclxuICAgIHByb2plY3QuY2xhc3NMaXN0LmFkZCgnZnJvdy1jb2wtMi0xJyk7XHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChwcm9qZWN0KTtcclxuXHJcbiAgICAvL9GB0YDQvtC6XHJcbiAgICBsZXQgZGVhZGxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kX2RhdGUnKS5wYXJlbnROb2RlO1xyXG4gICAgZGVhZGxpbmUud2lkdGggPSAnJztcclxuICAgIGRlYWRsaW5lLmNsYXNzTGlzdC5hZGQoJ2RlYWRsaW5lLWNhbGVuZGFyJywnZnJvdy1jb2wtMi0yJyk7XHJcblxyXG4gICAgLy/Rg9Cx0LjRgNCw0Y4g0YHQuNC80LLQvtC7INC/0LXRgNC10LLQvtC00LAg0YHRgtGA0L7QutC4XHJcbiAgICBkZWFkbGluZS5yZW1vdmVDaGlsZChkZWFkbGluZS5xdWVyeVNlbGVjdG9yKCdzY3JpcHQnKS5uZXh0U2libGluZyk7XHJcblxyXG4gICAgLy/QutC90L7Qv9C60YMg0KUgLSDQvtGH0LjRgdGC0LjRgtGMINC/0L7Qu9C1IC0g0YPQsdC40YDQsNGOXHJcbiAgICAvL2RlYWRsaW5lLnJlbW92ZUNoaWxkKGRlYWRsaW5lLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9YnV0dG9uXScpKTtcclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUZpZWxkQW5kTGFiZWwoJ9Ch0YDQvtC6JywgZGVhZGxpbmUpKTtcclxuXHJcbiAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmllbGRzLXJvdycsJ3Rhc2stcm93LTInKTtcclxuICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gICAgcm93c0ZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgIC8vMyDRgtGA0LXRgtGM0Y8g0YHRgtGA0L7QutCwIC0g0LTQvtC/0L7Qu9C90LjRgtC10LvRjNC90YvQuSDQtdC80LXQudC7INC4INGC0LjQvyDQt9Cw0LTQsNGH0LhcclxuICAgIC8v0LTQvtC/0L7Qu9C90LjRgtC10LvRjNC90YvQuSDQtdC80LXQudC7XHJcbiAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1maWVsZHMtcm93JywndGFzay1yb3ctMycpO1xyXG5cclxuICAgIGxldCBzZW5kTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRfZW1haWwnKTtcclxuXHJcbiAgICBsZXQgYWRkRW1haWwgPSBzZW5kTGlzdC5wYXJlbnROb2RlO1xyXG4gICAgYWRkRW1haWwuY2xhc3NMaXN0LmFkZCgnYWRkLWVtYWlsJyk7XHJcblxyXG4gICAgbGV0IGFkZEVtYWlsTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgYWRkRW1haWxMYWJlbC50ZXh0Q29udGVudCA9ICfQn9C+0LvRg9GH0LDRgtC10LvQuCDRgNCw0YHRgdGL0LvQutC4INC/0L4g0L/QvtGH0YLQtSc7XHJcbiAgICBhZGRFbWFpbC5pbnNlcnRCZWZvcmUoYWRkRW1haWxMYWJlbCxhZGRFbWFpbC5maXJzdEVsZW1lbnRDaGlsZCk7XHJcblxyXG4gICAgbGV0IHNlbmRMaXN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dldEVtYWlsQWRkcmVzc2VzQnV0dG9uJyk7XHJcbiAgICBzZW5kTGlzdEJ0bi52YWx1ZSA9ICfQmtC+0LzRgyDQv9C40YHRjNC80LAnO1xyXG4gICAgYWRkRW1haWwuYXBwZW5kQ2hpbGQoc2VuZExpc3RCdG4pO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGFkZEVtYWlsKTtcclxuXHJcbiAgICAvL9GC0LjQvyDQt9Cw0LTQsNGH0LhcclxuICAgIGxldCB0YXNrVHlwZUJsb2NrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2JsZW1fdHlwZScpLnBhcmVudE5vZGU7XHJcbiAgICB0YXNrVHlwZUJsb2NrLmNsYXNzTGlzdC5hZGQoJ3Rhc2stdHlwZScpO1xyXG5cclxuICAgIGxldCB0YXNrVHlwZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgIHRhc2tUeXBlTGFiZWwudGV4dENvbnRlbnQgPSAn0KLQuNC/INC30LDQtNCw0YfQuCc7XHJcbiAgICB0YXNrVHlwZUJsb2NrLmluc2VydEJlZm9yZSh0YXNrVHlwZUxhYmVsLHRhc2tUeXBlQmxvY2suZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGFza1R5cGVCbG9jayk7XHJcblxyXG4gICAgcm93SXRlbS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICByb3dzRnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgLy80INGH0LXRgtCy0LXRgNGC0LDRjyDRgdGC0YDQvtC60LAgLSDQtNC+0LHQsNCy0LvQtdC90LjQtSDRhNCw0LnQu9C+0LJcclxuICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWZpZWxkcy1yb3cnLCd0YXNrLXJvdy00Jyk7XHJcblxyXG4gICAgbGV0IGV4aXN0QWRkRmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGaWxlSW5wdXRzJyk7XHJcbiAgICBsZXQgYWRkRmlsZXNCbG9jayA9IGV4aXN0QWRkRmlsZS5wYXJlbnROb2RlO1xyXG4gICAgYWRkRmlsZXNCbG9jay5jbGFzc0xpc3QuYWRkKCdhZGQtZmlsZXMnKTtcclxuXHJcbiAgICBsZXQgYWRkRmlsZXNMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICBhZGRGaWxlc0xhYmVsLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24tdGl0bGUnKTtcclxuICAgIGFkZEZpbGVzTGFiZWwuaW5uZXJIVE1MID0gJ9Ck0LDQudC70YsgPHNwYW4gY2xhc3M9XCJzLWluZm9cIj7QvtCx0YnQuNC5INC+0LHRitC10LwgPHNwYW4gaWQ9XCJmaWxlcy10b3RhbFwiPtC00L4gMyDQnNCxPC9zcGFuPjwvc3Bhbj4nO1xyXG4gICAgLy/QsiBpZD1cImZpbGVzLXRvdGFsXCIg0LHRg9C00LXRgiDQt9Cw0LzQtdC90Y/RgtGB0Y8g0YLQtdC60YHRgiDQutC+0LPQtNCwINGE0LDQudC70Ysg0LLRi9Cx0YDQvdGLIC0g0L7QsdGJ0LjQuSDQvtCx0YrQtdC8INCy0YvQsdGA0LDQvdC90YvRhSDRhNCw0LnQu9C+0LJcclxuICAgIGFkZEZpbGVzQmxvY2suaW5zZXJ0QmVmb3JlKGFkZEZpbGVzTGFiZWwsYWRkRmlsZXNCbG9jay5maXJzdEVsZW1lbnRDaGlsZCk7XHJcblxyXG4gICAgLy/RjdGC0YMg0YHRgdGL0LvQutGDINGPINGB0LrRgNC+0Y4g0YHRgtC40LvRj9C80LhcclxuICAgIC8vIGxldCBhZGRGaWxlSW5wdXQgPSBhZGRGaWxlc0Jsb2NrLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcclxuICAgIC8vIGFkZEZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ29uY2xpY2snLCdhZGRGaWxlSW5wdXQoXCJGaWxlSW5wdXRzXCIpJyk7XHJcblxyXG4gICAgLy8gYWRkRmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgIHJlbW92ZUZpbGVJbnB1dChleGlzdEFkZEZpbGUpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLy/QsdC70L7QuiDQsiDQutC+0YLQvtGA0L7QvCDQsdGD0LTQtdGCINGB0L/QuNGB0L7QuiDQt9Cw0LPRgNGD0LbQtdC90L3Ri9GFINGE0LDQudC70L7QslxyXG4gICAgbGV0IGFkZGVkRmlsZXNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIGFkZGVkRmlsZXNMaXN0LmlkID0gJ2ZpbGVzLWxpc3QnO1xyXG4gICAgYWRkZWRGaWxlc0xpc3QuY2xhc3NMaXN0LmFkZCgnZmlsZXMtbGlzdCcpO1xyXG4gICAgYWRkRmlsZXNCbG9jay5pbnNlcnRCZWZvcmUoYWRkZWRGaWxlc0xpc3QsZXhpc3RBZGRGaWxlKTtcclxuXHJcbiAgICAvL9C+0LHQtdGA0L3Rg9GC0Ywg0YHRg9GJ0LXRgdGC0LLRg9GO0YnQuNC5IGlucHV0IGZpbGVcclxuICAgIC8v0YHQsNC8IGlucHV0INCx0YPQtNC10YIg0YHQutGA0YvRglxyXG4gICAgLy/QuCDQvdCw0LLQtdGB0LjRgtGMINCy0YvQt9C+0LIg0YTRg9C90LrRhtC40Lgg0YHQvtC30LTQsNGO0YnQtdC5INC90L7QstGL0Lkg0LjQvdC/0YPRglxyXG4gICAgbGV0IGRlZmF1bHRGaWxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZUlucHV0MCcpO1xyXG4gICAgLy/QsNGC0YDQuNCx0YPRgiBvbmNoYW5nZSDQtNC+0LHQsNCy0LvRj9GOINGH0YLQvtCx0Ysg0L3QtSDQutC+0L/QuNGA0L7QstCw0YLRjCDRg9C20LUg0YHRg9GJ0LXRgdGC0LLRg9GO0YnRjtGOXHJcbiAgICAvL9CyINGC0YDQtdC60LXRgNC1INGE0YPQvdC60YbQuNGOINC00L7QsdCw0LvRj9C90LjRjyDQuNC90L/Rg9GC0L7QslxyXG4gICAgZGVmYXVsdEZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ29uY2hhbmdlJywnYWRkRmlsZUlucHV0KFwiRmlsZUlucHV0c1wiKScpO1xyXG4gICAgZGVmYXVsdEZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcHJvY2Vzc0ZpbGVzKHRoaXMsYWRkZWRGaWxlc0xpc3QpO1xyXG4gICAgICAgIGhpZGVGaWxsZWRGaWxlSW5wdXQodGhpcyk7XHJcbiAgICB9KTtcclxuICAgIGV4aXN0QWRkRmlsZS5hcHBlbmRDaGlsZCh3cmFwRmlsZUlucHV0cyhkZWZhdWx0RmlsZUlucHV0KSk7XHJcblxyXG4gICAgbGV0IGFkZEZpbGVPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG11dGF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBpZihtdXRhdGlvbi5hZGRlZE5vZGVzWzBdLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBtdXRhdGlvbi5hZGRlZE5vZGVzWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnb25jaGFuZ2UnLCdhZGRGaWxlSW5wdXQoXCJGaWxlSW5wdXRzXCIpJyk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzRmlsZXModGhpcyxhZGRlZEZpbGVzTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZUZpbGxlZEZpbGVJbnB1dCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v0LLRgdC1INC90L7QstGL0LUgaW5wdXQgZmlsZSDQvdGD0LbQvdC+INC+0LHQtdGA0L3Rg9GC0YwsXHJcbiAgICAgICAgICAgICAgICAvL9GB0LDQvCBpbnB1dCDQsdGD0LTQtdGCINGB0LrRgNGL0YJcclxuICAgICAgICAgICAgICAgIGxldCBmYWtlSW5wdXQgPSB3cmFwRmlsZUlucHV0cyhpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuYXBwZW5kQ2hpbGQoZmFrZUlucHV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGFkZEZpbGVPYnNlcnZlckNvbmZpZyA9IHtcclxuICAgICAgICBhdHRyaWJ1dGVzOiBmYWxzZSxcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgYWRkRmlsZU9ic2VydmVyLm9ic2VydmUoZXhpc3RBZGRGaWxlLCBhZGRGaWxlT2JzZXJ2ZXJDb25maWcpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGFkZEZpbGVzQmxvY2spO1xyXG4gICAgcm93SXRlbS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICByb3dzRnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgLy81INC/0Y/RgtCw0Y8g0YHRgtGA0L7QutCwIC0g0LrQvdC+0L/QutCwINCh0L7RhdGA0LDQvdC40YLRjFxyXG4gICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmllbGRzLXJvdycsJ3Rhc2stcm93LTUnKTtcclxuXHJcbiAgICBsZXQgc2F2ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9c3VibWl0QnV0dG9uXScpO1xyXG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tYWN0aW9uJyk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoc2F2ZUJ0bik7XHJcbiAgICByb3dJdGVtLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICAgIHJvd3NGcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAvL9Cy0YHQtSDRgdC+0LHRgNCw0L3QvdC+0LUv0L/QtdGA0LXQvNC10YnQtdC90L3QvtC1INCy0YHRgtCw0LLQu9GP0Y4g0LIg0LHQu9C+0LpcclxuICAgIG5ld0NvbW1lbnQuYXBwZW5kQ2hpbGQocm93c0ZyYWdtZW50KTtcclxuXHJcbiAgICAvLy0t0YLRg9GCINC90LDQstC10YjQuNCy0LDRjiDRgdC+0LHRi9GC0LjRjyDQvdCwINC/0LXRgNC10LzQtdGJ0LXQvdC90YvQtSDRjdC70LXQvNC10L3RgtGLXHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZUZpbGxlZEZpbGVJbnB1dChpbnB1dCkge1xyXG4gICAgICAgIGlucHV0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLWVsZW0nKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcm9jZXNzRmlsZXMoZmllbGQsIGZpbGVzbGlzdCkge1xyXG4gICAgICAgIGxldCBmaWxlID0gZmllbGQuZmlsZXNbMF07XHJcbiAgICAgICAgbGV0IGZpbGVTaXplID0gZmlsZS5zaXplO1xyXG5cclxuXHJcbiAgICAgICAgaWYoIWZpbGVzbGlzdC5kYXRhc2V0LnRvdGFsKXtcclxuICAgICAgICAgICAgZmlsZXNsaXN0LmRhdGFzZXQudG90YWwgPSBmaWxlU2l6ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZmlsZXNsaXN0LmRhdGFzZXQudG90YWwgPSBwYXJzZUludChmaWxlc2xpc3QuZGF0YXNldC50b3RhbCkgKyBwYXJzZUludChmaWxlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdG90YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZXMtdG90YWwnKTtcclxuICAgICAgICB0b3RhbC50ZXh0Q29udGVudCA9IGJ5dGVzVG9TaXplKGZpbGVzbGlzdC5kYXRhc2V0LnRvdGFsKSArICcg0LjQtyAzINCc0LEnO1xyXG5cclxuICAgICAgICBsZXQgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgcC5pbm5lckhUTUwgPSBmaWxlLm5hbWUgKyAnPHNwYW4gY2xhc3M9XCJzLWluZm9cIj4nICsgTWF0aC5jZWlsKGZpbGVTaXplIC8gMTAyNCkgKyAnIEtiPC9zcGFuPic7XHJcbiAgICAgICAgcC5jbGFzc0xpc3QuYWRkKCdmaWxlLWxpc3QtaXRlbScpO1xyXG5cclxuICAgICAgICBsZXQgcmVtb3ZlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHJlbW92ZUJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tcmVtb3ZlLWl0ZW0nKTtcclxuICAgICAgICByZW1vdmVCdG4uZGF0YXNldC5maWVsZElkID0gZmllbGQuaWQ7XHJcblxyXG4gICAgICAgIHAuYXBwZW5kQ2hpbGQocmVtb3ZlQnRuKTtcclxuXHJcbiAgICAgICAgZmlsZXNsaXN0LmFwcGVuZENoaWxkKHApO1xyXG5cclxuICAgICAgICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVtb3ZlRmlsZUlucHV0KHRoaXMsdG90YWwsZmlsZXNsaXN0LGZpbGVTaXplKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/Qv9GA0Lgg0LLRi9Cx0L7RgNC1INCyINGB0L/QuNGB0LrQtSDQtNC+0L8u0LXQvNCw0LnQu9C+0LIg0YHRgNCw0LfRgyDQstGB0YLQsNCy0LvRj9GC0Ywg0LIg0L/QvtC70LUg0LTQu9GPINC+0YLQv9GA0LDQstC60LhcclxuICAgIGxldCBlbWFpbExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkX2VtYWlsX3dvcmtlcicpO1xyXG4gICAgbGV0IG9uUGFnZUVtYWlsTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICBvblBhZ2VFbWFpbExpc3QuY2xhc3NMaXN0LmFkZCgnZW1haWwtc2VuZC1saXN0Jyk7XHJcbiAgICBhZGRFbWFpbC5pbnNlcnRCZWZvcmUob25QYWdlRW1haWxMaXN0LGFkZEVtYWlsLmNoaWxkTm9kZXNbMl0pO1xyXG5cclxuICAgIGVtYWlsTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYWRkV29ya2VyRW1haWxUb1NlbmRMaXN0KHRoaXMsc2VuZExpc3Qsb25QYWdlRW1haWxMaXN0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8v0L/RgNC4INCy0YvQsdC+0YDQtSDQsiDRgdC10LvQtdC60YLQtSDQodGC0LDRgtGD0YEg0L/QtdGA0LXQutC70Y7Rh9Cw0Y4g0YDQsNC00LjQviwg0YfRgtC+0LHRiyDRhNC+0YDQvNCwINC/0YDQsNCy0LjQu9GM0L3QviDRgNCw0LHQvtGC0LDQu9CwXHJcbiAgICBzdGF0dXNMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnZhbHVlKS5jaGVja2VkID0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8v0L/RgNC4INC30LDQs9GA0YPQt9C60LUg0YHRgtGA0LDQvdC40YbRiyDQvdGD0LbQvdC+INGB0LzQvtGC0YDQtdGC0Ywg0LLRi9Cx0YDQsNC90L3Ri9C5INGA0LDQtNC40L4g0YHQviDRgdGC0LDRgtGD0YHQvtC8ICjQsiDRgdC60YDRi9GC0L7QuSDRh9Cw0YHRgtC4INGC0LDQsdC70LjRhtGLICN0YXNrLWZvb3RlcilcclxuICAgIC8v0Lgg0YHRgtCw0LLQuNGC0Ywg0YHRgtCw0YLRg9GBINCyINGB0LXQu9C10LrRgtC1IHN0YXR1c0xpc3RcclxuICAgIHVwZGF0ZVN0YXR1c0xpc3RPbkxvYWQoc3RhdHVzTGlzdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUZpZWxkQW5kTGFiZWwodGV4dCxmaWVsZCkge1xyXG4gICAgbGV0IHJvd0l0ZW1Qcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbGV0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgIGxhYmVsLnRleHRDb250ZW50ID0gdGV4dDtcclxuICAgIHJvd0l0ZW1Qcm90by5hcHBlbmRDaGlsZChsYWJlbCk7XHJcbiAgICByb3dJdGVtUHJvdG8uYXBwZW5kQ2hpbGQoZmllbGQpO1xyXG4gICAgcmV0dXJuIHJvd0l0ZW1Qcm90bztcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3RhdHVzTGlzdCh0YmwpIHtcclxuICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XHJcbiAgICBsZXQgcm93cyA9IEFycmF5LmZyb20odGJsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyJykpO1xyXG5cclxuICAgIGxldCBvcHRncm91cDtcclxuXHJcbiAgICByb3dzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGlmKGl0ZW0uZmlyc3RFbGVtZW50Q2hpbGQuZ2V0QXR0cmlidXRlKCdjb2xzcGFuJykpe1xyXG4gICAgICAgICAgICBvcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGdyb3VwJyk7XHJcbiAgICAgICAgICAgIG9wdGdyb3VwLmxhYmVsID0gaXRlbS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChvcHRncm91cCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCByYWRpbyA9IGl0ZW0ucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSByYWRpby5pZDtcclxuICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdsYWJlbCcpLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBvcHRncm91cC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBsaXN0O1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTdGF0dXNMaXN0T25Mb2FkKGxpc3QpIHtcclxuICAgIGxldCBzdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPW5ld19wcm9ibGVtX3N0YXR1c106Y2hlY2tlZCcpO1xyXG5cclxuICAgIGZvciggbGV0IGkgb2YgbGlzdC5vcHRpb25zKXtcclxuICAgICAgICBpZihpLnZhbHVlID09PSBzdGF0dXMuaWQpe1xyXG4gICAgICAgICAgICBpLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFdvcmtlckVtYWlsVG9TZW5kTGlzdChzZWxlY3QsIGlucHV0LCBsaXN0KSB7XHJcbiAgICBsZXQgb3B0aW9uID0gc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdO1xyXG4gICAgbGV0IGRhdGEgPSBbb3B0aW9uLnRleHQsc2VsZWN0LnZhbHVlXTtcclxuICAgIGxldCBlbWFpbCA9IGRhdGFbMV07XHJcblxyXG4gICAgaWYgKGVtYWlsLnRyaW0oKSAhPT0gXCJcIikge1xyXG4gICAgICAgIGxldCBhZGRFbWFpbCA9IGlucHV0LnZhbHVlO1xyXG4gICAgICAgIGxldCBuZXd2YWwgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKGFkZEVtYWlsID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIG5ld3ZhbCA9IGVtYWlsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWRkRW1haWwuaW5kZXhPZihlbWFpbCkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIG5ld3ZhbCA9IGFkZEVtYWlsICsgKGVtYWlsLmNoYXJBdChhZGRFbWFpbC5sZW5ndGggLSAxKSA9PSBcIjtcIiA/IFwiXCIgOiBcIjtcIikgKyBlbWFpbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0LnZhbHVlID0gbmV3dmFsO1xyXG5cclxuICAgICAgICBsZXQgbmV3aXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgbmV3aXRlbS50ZXh0Q29udGVudCA9IGRhdGFbMF07XHJcbiAgICAgICAgbmV3aXRlbS5kYXRhc2V0LmVtYWlsID0gZGF0YVsxXTtcclxuXHJcbiAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChuZXdpdGVtKTtcclxuXHJcbiAgICAgICAgbmV3aXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVtb3ZlSXRlbUZyb21TZW5kbGlzdCh0aGlzLCBzZWxlY3QsIGlucHV0KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL9Cy0YvQsdGA0LDQvdC90L7Qs9C+INC/0L7Qu9GD0YfQsNGC0LXQu9GPINGB0LrRgNGL0LLQsNGOXHJcbiAgICAgICAgLy/RgdGC0LDQstC70Y4g0LLRi9Cx0YDQsNC90L3Ri9C8INC00LXRhNC+0LvRgtC90YvQuSAo0L/QtdGA0LLRi9C5KSDRjdC70LXQvNC10L3RgiDRgdC/0LjRgdC60LBcclxuXHJcbiAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywnJyk7XHJcbiAgICAgICAgc2VsZWN0Lm9wdGlvbnNbMF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVJdGVtRnJvbVNlbmRsaXN0KGl0ZW0sIHNlbGVjdCwgaW5wdXQpIHtcclxuICAgIGxldCB0ZXh0ID0gaXRlbS5kYXRhc2V0LmVtYWlsO1xyXG5cclxuICAgIGxldCBzZW5kTGlzdCA9IGlucHV0LnZhbHVlLnNwbGl0KCc7Jyk7XHJcblxyXG4gICAgbGV0IGZpbHRlcmVkU2VuZExpc3QgPSBzZW5kTGlzdC5maWx0ZXIoZnVuY3Rpb24gKGxpc3RpdGVtKSB7XHJcbiAgICAgICAgaWYobGlzdGl0ZW0gIT09IHRleHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGl0ZW1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dC52YWx1ZSA9IGZpbHRlcmVkU2VuZExpc3Quam9pbignOycpO1xyXG5cclxuICAgIGl0ZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpdGVtKTtcclxuXHJcbiAgICBmb3IoIGxldCBpIG9mIHNlbGVjdC5vcHRpb25zKXtcclxuICAgICAgICBpZihpLnZhbHVlID09PSB0ZXh0KXtcclxuICAgICAgICAgICAgaS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlRmlsZUlucHV0KGJ0bix0b3RhbCxmaWxlc2xpc3QsZmlsZXNpemUpIHtcclxuICAgIGxldCB1cGRhdGVUb3RhbFNpemUgPSBmaWxlc2xpc3QuZGF0YXNldC50b3RhbCAtIGZpbGVzaXplO1xyXG4gICAgZmlsZXNsaXN0LmRhdGFzZXQudG90YWwgPSB1cGRhdGVUb3RhbFNpemU7XHJcbiAgICB0b3RhbC50ZXh0Q29udGVudCA9IGJ5dGVzVG9TaXplKHVwZGF0ZVRvdGFsU2l6ZSkgKyAnINC40LcgMyDQnNCxJztcclxuXHJcbiAgICBsZXQgaW5wdXRJZCA9IGJ0bi5kYXRhc2V0LmZpZWxkSWQ7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbnB1dElkKS5wYXJlbnROb2RlLnJlbW92ZSgpO1xyXG4gICAgYnRuLnBhcmVudE5vZGUucmVtb3ZlKCk7XHJcblxyXG4gICAgbGV0IGZpbGVJbnB1dHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5maWxlSW5wdXQnKSk7XHJcbiAgICBsZXQgcmVtb3ZlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tcmVtb3ZlLWl0ZW0nKTtcclxuXHJcbiAgICAvL9C/0LXRgNC10L/QuNGB0LDRgtGMINC40LzQtdC90LAg0LggaWQg0LLRgdC10YUg0LjQvdC/0YPRgtC+0LIuXHJcbiAgICAvL9C10YHQu9C4INC+0L3QuCDQuNC00YPRgiDQvdC1INC/0L4g0L/QvtGA0Y/QtNC60YMg0LjQu9C4INGBINC/0YDQvtC/0YPRgdC60LDQvNC4XHJcbiAgICAvL9C/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INGE0LDQudC70L7QsiDQvdCwINGB0LXRgNCy0LXRgCDQsdGD0LTQtdGCINC+0YjQuNCx0LrQsFxyXG4gICAgLy/RgtC+INC20LUg0L3QsNC00L4g0YHQtNC10LvQsNGC0Ywg0YEgZGF0YS1pbnB1dC1pZCDQutC90L7Qv9C+0Log0YPQtNCw0LvQtdC90Y8g0YTQsNC50LvQsFxyXG4gICAgLy/QsCDRgtC+INCx0YPQtNC10YIg0YPQtNCw0LvRj9GC0YHRjyDQvdC1INGC0L7RgiDQuNC90L/Rg9GCXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZUlucHV0cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgZmlsZUlucHV0c1tpXS5maXJzdEVsZW1lbnRDaGlsZC5pZCA9ICdmaWxlSW5wdXQnK2k7XHJcbiAgICAgICAgZmlsZUlucHV0c1tpXS5maXJzdEVsZW1lbnRDaGlsZC5uYW1lID0gJ2ZpbGVJbnB1dCcraTtcclxuICAgICAgICByZW1vdmVCdG5zW2ldLmRhdGFzZXQuZmllbGRJZCA9ICdmaWxlSW5wdXQnK2k7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyYXBGaWxlSW5wdXRzKGlucHV0KSB7XHJcbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbGV0IGJ0biA9IHdyYXAuY2xvbmVOb2RlKGZhbHNlKTtcclxuXHJcbiAgICB3cmFwLmNsYXNzTGlzdC5hZGQoJ2Zha2UtZmlsZS1pbnB1dCcsaW5wdXQuY2xhc3NMaXN0WzBdKTtcclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICAgIGJ0bi5pbm5lckhUTUwgPSAn0JTQvtCx0LDQstC40YLRjCDRhNCw0LnQuyA8c3Bhbj7QndCw0LbQvNC4INC40LvQuCDRgtCw0YnQuCDQtdCz0L4g0YHRjtC00LA8L3NwYW4+JztcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tZmFrZS1maWxlJyk7XHJcbiAgICB3cmFwLmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnaXMtaG92ZXInKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdpcy1ob3ZlcicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdpcy1ob3ZlcicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHdyYXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ5dGVzVG9TaXplKGJ5dGVzKSB7XHJcbiAgICBsZXQgc2l6ZXMgPSBbJ0J5dGVzJywgJ9Ca0LEnLCAn0JzQsScsICfQk9CxJywgJ9Ci0LEnXTtcclxuICAgIGlmICghYnl0ZXMpIHtcclxuICAgICAgICByZXR1cm4gJzAnXHJcbiAgICB9XHJcbiAgICBsZXQgaSA9IHBhcnNlSW50KE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coMTAyNCkpKTtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKGJ5dGVzIC8gTWF0aC5wb3coMTAyNCwgaSksIDIpICsgJyAnICsgc2l6ZXNbaV07XHJcbn1cclxuXHJcblxyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vcGNzcy90YXNrRm9vdGVyRGVzaWduLnBjc3MnO1xyXG5cclxuZXhwb3J0IHt0YXNrRm9vdGVyRGVzaWdufTtcclxuXHJcbmlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKXtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCB0YXNrRm9vdGVyRGVzaWduJyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90YXNrRm9vdGVyRGVzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi90YXNrRm9vdGVyRGVzaWduLnBjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdGFza0Zvb3RlckRlc2lnbi5wY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3Rhc2tGb290ZXJEZXNpZ24ucGNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGNzcy90YXNrRm9vdGVyRGVzaWduLnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiN0YXNrLWZvb3RlciB0cjpudGgtY2hpbGQoMil7aGVpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVufS5mYWtlLWZpbGUtaW5wdXQgLmJ0bi1mYWtlLWZpbGV7cGFkZGluZzouN2VtIDAgMDt0ZXh0LWFsaWduOmNlbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LXNpemU6MTZweDtjb2xvcjojODJhNWMzO2N1cnNvcjpwb2ludGVyfS5mYWtlLWZpbGUtaW5wdXQgLmJ0bi1mYWtlLWZpbGUgc3Bhbnt3aWR0aDoxMDAlO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2ZvbnQtc2l6ZToxMnB4fS5mYWtlLWZpbGUtaW5wdXQ+aW5wdXR7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7b3BhY2l0eTowfSNGaWxlSW5wdXRzIGJye2Rpc3BsYXk6bm9uZX0udGFzay10eXBlPmRpdiBzZWxlY3R7bWFyZ2luLXRvcDouM2VtfS50YXNrLXR5cGU+ZGl2IGJye2Rpc3BsYXk6bm9uZX0uZW1haWwtc2VuZC1saXN0PmxpOmFmdGVye2NvbnRlbnQ6XFxcIlxcXFwxRjdBOVxcXCI7bWFyZ2luLWxlZnQ6LjRlbTtjb2xvcjpyZWQ7ZGlzcGxheTppbmxpbmUtYmxvY2s7Y3Vyc29yOnBvaW50ZXJ9LmFkZC1lbWFpbCAjZ2V0RW1haWxBZGRyZXNzZXNCdXR0b257ZGlzcGxheTpub25lXFxyXFxuICAgICAgICAvKndpZHRoOiA5MHB4O1xcclxcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsqL30uYWRkLWVtYWlsICNhZGRfZW1haWxfd29ya2Vye3dpZHRoOjIyNnB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWRkLWVtYWlsICNhZGRfZW1haWx7cG9zaXRpb246YWJzb2x1dGU7dmlzaWJpbGl0eTpoaWRkZW47ei1pbmRleDphdXRvfS5hZGQtZW1haWwgbGFiZWx7ZGlzcGxheTpibG9ja306cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXIgI2VuZF9kYXRle3dpZHRoOmF1dG8haW1wb3J0YW50fTpyb290IC5kZWFkbGluZS1jYWxlbmRhciBpbnB1dFt0eXBlPWJ1dHRvbl17ZGlzcGxheTpub25lfTpyb290IC5kZWFkbGluZS1jYWxlbmRhcj5pbWd7cG9zaXRpb246YWJzb2x1dGU7dG9wOi40ZW07cmlnaHQ6LjVlbX06cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXI+aW5wdXRbdHlwZT10ZXh0XXtwYWRkaW5nLXJpZ2h0OjMwcHh9LnRhc2stcm93LTIgLnRpbWUtYmxvY2s+ZGl2OmFmdGVye2NvbnRlbnQ6XFxcIlxcXFw0M0NcXFxcNDM4XFxcXDQzRFxcXCI7bWFyZ2luLWxlZnQ6LjVlbTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9Lndvcmtlci1ibG9jayBzZWxlY3R7d2lkdGg6MTAwJTttYXJnaW46LjVlbSAwIDB9LnRhc2stZmllbGRzLXJvdyAuZnJvdy1jb2wtMi0ye3dpZHRoOjEyMHB4fS50YXNrLWZpZWxkcy1yb3cgLmZyb3ctY29sLTItMXt3aWR0aDoxOTBweDttYXJnaW4tcmlnaHQ6MzBweH0udGFzay1maWVsZHMtcm93IHRke3BhZGRpbmc6MDtmb250LXNpemU6MTAwJTtkaXNwbGF5OmJsb2NrfS50YXNrLWZpZWxkcy1yb3cgc2VsZWN0e3BhZGRpbmc6LjNlbSAwIC4zZW0gLjJlbX0udGFzay1maWVsZHMtcm93IGlucHV0LmlucHV0X2ZpZWxkLC50YXNrLWZpZWxkcy1yb3cgaW5wdXRbdHlwZT10ZXh0XSwudGFzay1maWVsZHMtcm93IHNlbGVjdHt3aWR0aDphdXRvO21heC13aWR0aDoxMDAlO2hlaWdodDoyZW07cGFkZGluZzouM2VtIC42ZW07Ym9yZGVyOjFweCBzb2xpZCAjOWU5ZTllO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS50YXNrLWZpZWxkcy1yb3cgaW5wdXQuaW5wdXRfZmllbGQ6Zm9jdXMsLnRhc2stZmllbGRzLXJvdyBpbnB1dFt0eXBlPXRleHRdOmZvY3VzLC50YXNrLWZpZWxkcy1yb3cgc2VsZWN0OmZvY3Vze2JvcmRlci1jb2xvcjojMjZhNjlhfS5jb250ZW50e1xcclxcbiAgICAvKtGD0LHQuNGA0LDRjiDQu9C40YjQvdC40LUg0L7RgtGB0YLRg9C/0Ysg0LggYnIg0YfRgtC+0LHRiyDRg9C80LXQvdGM0YjQuNGC0Ywg0LTRi9GA0YMg0L/QvtC0INC/0L7Qu9GP0LzQuCDQutCw0LzQtdC90YLQsCovcGFkZGluZy1ib3R0b206MH1cXHJcXG5cXHJcXG4vKiDQv9GA0LXQstGA0LDRidCw0Y4g0LLRgdC1INCyINCx0LvQvtC60LgqLyN0YmwtbmV3LWNvbW1lbnQgdGJvZHksI3RibC1uZXctY29tbWVudCB0ZCwjdGJsLW5ldy1jb21tZW50IHRye2Rpc3BsYXk6YmxvY2t9XFxyXFxuXFxyXFxuLyrRgdC60YDRi9Cy0LDRjiDQv9C10YDQstGD0Y4g0Y/Rh9C10LnQutGDINGBINGC0LXQutGB0YLQvtC8INCi0LXQutGB0YIqLyN0YmwtbmV3LWNvbW1lbnQgdHI6Zmlyc3QtY2hpbGQ+dGQ6Zmlyc3QtY2hpbGR7ZGlzcGxheTpub25lfSN0YmwtbmV3LWNvbW1lbnQrYnJ7XFxyXFxuICAgIC8q0YPQsdC40YDQsNGOINC70LjRiNC90LjQtSDQvtGC0YHRgtGD0L/RiyDQuCBiciDRh9GC0L7QsdGLINGD0LzQtdC90YzRiNC40YLRjCDQtNGL0YDRgyDQv9C+0LQg0L/QvtC70Y/QvNC4INC60LDQvNC10L3RgtCwKi9kaXNwbGF5Om5vbmV9XFxyXFxuXFxyXFxuLyrQstGL0YDQvtCy0L3Rj9GC0Ywg0L3QvtCy0YvQuSDQutCw0LzQtdC90YIg0L/QviDQutCw0YDRgtC+0YfQutCw0Lwg0LrQsNC80LXQvdGC0L7QsiovI25ldy1jb21tZW50LXdyYXB7bWF4LXdpZHRoOjcyMHB4O21hcmdpbjphdXRvfVxcclxcblxcclxcbi8qdGV4dGFyZWEqL1xcclxcblxcclxcbi8q0LfQsNCz0L7Qu9C+0LLQvtC6INCU0L7QsdCw0LLQuNGC0Ywg0LrQvtC80LzQtdC90YLQsNGA0LjQuSovLnRse2Rpc3BsYXk6bm9uZX1cXHJcXG5cXHJcXG4vKtC+0LHQtdGA0YLQutCwINCy0L7QutGA0YPQsyDQv9C+0LvRjyDQlNC+0LHQsNCy0LjRgtGMINC60L7QvNC80LXQvdGC0LDRgNC40LkqLy50YXJlYS13cmFwe3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0jdGV4dHt3aWR0aDoxMDAlO3BhZGRpbmc6LjZlbSAuOGVtO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOjE0cHg7Ym9yZGVyOjA7Ym94LXNpemluZzpib3JkZXItYm94O2JveC1zaGFkb3c6aW5zZXQgMCAtMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSxpbnNldCAwIDFweCA1cHggMCByZ2JhKDAsMCwwLC4xMiksaW5zZXQgMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMil9XFxyXFxuXFxyXFxuLyrQvtGE0L7RgNC80LvQtdC90LjQtSDQv9C+0LvQtdC5INC4INGB0YLRgNC+0Log0YEg0L/QvtC70Y/QvNC4INC/0L7QtCDQv9C+0LvQtdC8INC60LDQvNC10L3RgtCwKi8udGFzay1maWVsZHMtcm93e21heC13aWR0aDo3MjBweDttYXJnaW46MS42ZW0gYXV0b30udGFzay1maWVsZHMtcm93IGxhYmVse21hcmdpbjowIDAgLjVlbTtjb2xvcjpncmF5O2Rpc3BsYXk6aW5saW5lLWJsb2NrfVxcclxcblxcclxcbi8qIDEg0YHRgtGA0L7QutCwICovLnRhc2stcm93LTF7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXhcXHJcXG4gICAgLypqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47Ki99Lndvcmtlci1ibG9ja3t3aWR0aDozMDBweDttYXJnaW4tcmlnaHQ6NzBweDstbXMtZmxleDowIDAgMzAwcHg7ZmxleDowIDAgMzAwcHh9Lndvcmtlci1ibG9jayBpbnB1dFt0eXBlPXJhZGlvXXtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7cG9zaXRpb246cmVsYXRpdmU7dG9wOi0uMmVtfVxcclxcblxcclxcbi8qIDIg0YHRgtGA0L7QutCwICovLnRhc2stcm93LTJ7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXhcXHJcXG4gICAgLypqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47Ki99LnRhc2stcm93LTIgLnRpbWUtYmxvY2t7d2lkdGg6MzAwcHg7bWFyZ2luLXJpZ2h0OjcwcHg7LW1zLWZsZXg6MCAwIDMwMHB4O2ZsZXg6MCAwIDMwMHB4O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy1tcy1mbGV4LXBhY2s6anVzdGlmeTtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0udGFzay1yb3ctMiAudGltZS1ibG9jaz5kaXZ7d2lkdGg6MTIwcHh9LnRhc2stcm93LTIgLnRpbWUtYmxvY2s+ZGl2IGlucHV0e3dpZHRoOjc2JTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9OnJvb3QgLmRlYWRsaW5lLWNhbGVuZGFye3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmc6MCFpbXBvcnRhbnQ7Zm9udC1zaXplOjEwMCVcXHJcXG4gICAgLypmbGV4OiAxIDEgMTgwcHg7Ki99OnJvb3QgLmRlYWRsaW5lLWNhbGVuZGFyPmltZyw6cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXI+aW5wdXR7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246dG9wO2JveC1zaXppbmc6Ym9yZGVyLWJveH1cXHJcXG5cXHJcXG4vKiAzINGB0YLRgNC+0LrQsCAqLy50YXNrLXJvdy0ze2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4XFxyXFxuICAgIC8qanVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyovfS5hZGQtZW1haWx7d2lkdGg6MzAwcHg7bWFyZ2luLXJpZ2h0OjcwcHg7LW1zLWZsZXg6MCAwIDMwMHB4O2ZsZXg6MCAwIDMwMHB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5hZGQtZW1haWwgYXtkaXNwbGF5Om5vbmV9LmVtYWlsLXNlbmQtbGlzdHttYXJnaW46LjRlbSAwIC41ZW07cGFkZGluZzowO2xpc3Qtc3R5bGUtdHlwZTpub25lfS5lbWFpbC1zZW5kLWxpc3Q+bGl7bWFyZ2luOjA7bGluZS1oZWlnaHQ6MX0uZW1haWwtc2VuZC1saXN0PmxpOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcQjdcXFwiO2ZvbnQtc2l6ZToxLjVlbTttYXJnaW4tcmlnaHQ6LjJlbTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LnRhc2stdHlwZXtcXHJcXG5cXHJcXG4gICAgLyrQsiDQtNC40LLQsNGFINC/0YDRj9GH0YPRgtGM0YHRjyDRgdC10LvQtdC60YLRiyDRgSDQv9C+0LTRgtC40L/QsNC80LgqL30udGFzay10eXBlIHNlbGVjdHttaW4td2lkdGg6MTkwcHh9XFxyXFxuXFxyXFxuLyogNCDRgdGC0YDQvtC60LAgKi8uYWRkLWZpbGVze1xcclxcblxcclxcbiAgICAvKtC/0L4g0LrQu9C40LrRgyDQvdCwINGN0YLRgyDRgdGB0YvQu9C60YMg0YHQvtC30LTQsNCy0LDQu9GB0Y8g0L3QvtCy0YvQuSBmaWxlIGlucHV0XFxyXFxuICAgINGB0LrRgNC+0Y4g0LXQtSwg0LAg0YHQvtCx0YvRgtC40LUg0L/QvtCy0LXRiNGDINC90LAgY2hhbmdlINGB0LDQvNC+0LPQviDQuNC90L/Rg9GC0LAqL30uYWRkLWZpbGVzIGF7ZGlzcGxheTpub25lXFxyXFxuICAgICAgICAvKm1hcmdpbi10b3A6IC44ZW07XFxyXFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7Ki99I0ZpbGVJbnB1dHMgaW5wdXQ6bm90KDpmaXJzdC1jaGlsZCl7bWFyZ2luLXRvcDouM2VtO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYnRuLXJlbW92ZS1pdGVte3dpZHRoOjEycHg7aGVpZ2h0OjE4cHg7bWFyZ2luLWxlZnQ6LjNlbTtjb2xvcjpyZWQ7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO3Bvc2l0aW9uOnJlbGF0aXZlO2N1cnNvcjpwb2ludGVyfS5idG4tcmVtb3ZlLWl0ZW06YWZ0ZXJ7Y29udGVudDpcXFwiXFxcXDFGN0E5XFxcIjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjB9LmZha2UtZmlsZS1pbnB1dHt3aWR0aDoyMjVweDtoZWlnaHQ6NjBweDtib3JkZXI6MXB4IGRhc2hlZCAjODJhNWMzO2JhY2tncm91bmQ6I2Y0ZjZmODt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItcmFkaXVzOi41ZW07cG9zaXRpb246cmVsYXRpdmV9LmZha2UtZmlsZS1pbnB1dC5pcy1ob3ZlcntiYWNrZ3JvdW5kOiNkMmRjZTV9LmZpbGVzLWxpc3R7bWFyZ2luOi0uNWVtIDAgLjVlbTtwYWRkaW5nOjA7bGlzdC1zdHlsZS10eXBlOm5vbmU7dHJhbnNpdGlvbjpoZWlnaHQgLjNzfS5maWxlcy1saXN0IC5maWxlLWxpc3QtaXRlbXttYXJnaW46LjRlbSAwfS5maWxlcy1saXN0IC5maWxlLWxpc3QtaXRlbSAucy1pbmZve3BhZGRpbmctbGVmdDouNmVtO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX1cXHJcXG5cXHJcXG4vKtGB0LrRgNGL0LLQsNGOINC/0YPRgdGC0YvQtSDRj9GH0LXQudC60LgsINC/0L7Qu9GPINC40Lcg0L3QuNGFINC/0LXRgNC10LzQtdGJ0LXQvdGLINCyINC90L7QstGL0Lkg0LHQu9C+0LogI25ldy1jb21tZW50LXdyYXAqLyN0YXNrLWZvb3RlciB0Ym9keSwjdGFzay1mb290ZXIgdGQsI3Rhc2stZm9vdGVyIHRye2Rpc3BsYXk6YmxvY2t9XFxyXFxuXFxyXFxuLyrQutC90L7Qv9C60LAg0YHQvtGF0YDQsNC90LjRgtGMKi8uYnRuLWFjdGlvbntoZWlnaHQ6MzZweDtwYWRkaW5nOjAgMS42ZW07Zm9udC1zaXplOjE0cHg7Y29sb3I6I2ZmZjtib3JkZXI6MDtib3JkZXItcmFkaXVzOjRweDtiYWNrZ3JvdW5kOiM3ZWI1MTk7Y3Vyc29yOnBvaW50ZXJ9XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj97XCJpbXBvcnRMb2FkZXJzXCI6MX0hLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliIS4vc3JjL3Bjc3MvdGFza0Zvb3RlckRlc2lnbi5wY3NzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCBlbGVtc01vZGlmaWNhdGlvbicpO1xyXG59XHJcblxyXG5pbXBvcnQge21vZGlmeVNlbGVjdE9wdGlvbnNMaXN0LGZpbmRJbkFycmF5fSBmcm9tICcuL191dGlscy5qcyc7XHJcbmltcG9ydCB7Z2V0QWxsQ29tbWVudHNSb3dzLGdldEFsbFdvcmtlcnN9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5cclxuLy/QuNC30LzQtdC90LXQvdC40LUg0Y3Qu9C10LzQtdC90YLQvtCyINC90LAg0YHRgtGA0LDQvdC40YbQtSDQt9Cw0LTQsNGH0LhcclxuLy/QsiDRgdC+0L7RgtCy0LXRgtGB0LLQuNC4INGBINC90LDRgdGC0YDQvtC50LrQsNC80Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXHJcbmZ1bmN0aW9uIGVsZW1zTW9kaWZpY2F0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBkYXJ0X3dvcmtlcnNfbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRlcm5hbF93b3JrZXInKTtcclxuXHJcbiAgICAvL9GB0YDQsNCy0L3QuNCy0LDQtdC8INGB0L/QuNGB0L7QuiDQv9GA0L7QtdC60YLQvtCyINGBINGB0L7RhdGA0LDQvdC10L3QvdGL0Lwg0LIg0L3QsNGB0YLRgNC+0LnQutCw0YVcclxuICAgIC8v0L/RgNC+0LXQutGC0Ysg0LrQvtGC0L7RgNGL0YUg0L3QtdGCINCyINC90LDRgdGC0YDQvtC50LrQsCDRgdC60YDRi9Cy0LDQtdC8XHJcbiAgICB0aGlzLm1vZGlmeVByb2plY3RMaXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBwYXJhbXNfdXNlcl9wcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BhcmFtc191c2VyX3Byb2plY3RzJykpO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zX3VzZXJfcHJvamVjdHMgPT09IG51bGwgfHwgIXBhcmFtc191c2VyX3Byb2plY3RzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCfQndC10YIg0YHQvtCx0YHRgtCy0LXQvdC90L7Qs9C+INGB0L/QuNGB0LrQsCDQv9GA0L7QtdC60YLQvtCyJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRhcnRfcHJvamVjdHNfbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0X2lkJykgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsaWVudF9pZCcpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gZGFydF9wcm9qZWN0c19saXN0Lm9wdGlvbnM7XHJcblxyXG4gICAgICAgIG1vZGlmeVNlbGVjdE9wdGlvbnNMaXN0KG9wdGlvbnMsIHBhcmFtc191c2VyX3Byb2plY3RzKTtcclxuICAgIH07XHJcblxyXG4gICAgLy/RgdGA0LDQstC90LjQstCw0LXQvCDRgdC/0LjRgdC+0Log0LjRgdC/0L7Qu9C90LjRgtC10LvQtdC5INGBINGB0L7RhdGA0LDQvdC10L3QvdGL0Lwg0LIg0L3QsNGB0YLRgNC+0LnQutCw0YVcclxuICAgIC8v0LjRgdC/0L7Qu9C90LjRgtC10LvQtdC5INC60L7RgtC+0YDRi9GFINC90LXRgiDQsiDQvdCw0YHRgtGA0L7QudC60LAg0YHQutGA0YvQstCw0LXQvFxyXG4gICAgdGhpcy5tb2RpZnlXb3JrZXJzTGlzdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IHBhcmFtc191c2VyX3dvcmtlcnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYXJhbXNfdXNlcl93b3JrZXJzJykpO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zX3VzZXJfd29ya2VycyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCfQndC10YIg0YHQvtCx0YHRgtCy0LXQvdC90L7Qs9C+INGB0L/QuNGB0LrQsCDRgdC+0YLRgNGD0LTQvdC40LrQvtCyJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGFyYW1zX3VzZXJfd29ya2VycyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9sZXQgZGFydF93b3JrZXJzX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50ZXJuYWxfd29ya2VyJyk7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zID0gZGFydF93b3JrZXJzX2xpc3Qub3B0aW9uczsgLy/RgdC/0LjRgdC+0Log0LLRgdC10YUg0YHQvtGC0YDRg9C00L3QuNC60L7QsiDQuNC3INGB0LXQu9C10LrRgtCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cclxuICAgICAgICAvL9C10YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjNGB0LrQuNC5INGB0L/QuNGB0L7QuiDRgdC+0YLRgNGD0LTQvdC40LrQvtCyINC90LUg0L/Rg9GB0YJcclxuICAgICAgICAvL9C4INC10YHQu9C4INCyINC30LDQtNCw0YfQtSDRg9GH0LDRgdGC0LLRg9C10YIg0YHQvtGC0YDRg9C00L3QuNC6INC60L7RgtC+0YDQvtCz0L4g0L3QtdGCINCyINGB0L/QuNGB0LrQtSDQvtGB0YLQsNCy0LvRj9GOINC10LPQviDQvtGC0LrRgNGL0YLRi9C8XHJcbiAgICAgICAgaWYgKHBhcmFtc191c2VyX3dvcmtlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8v0L/QvtC70YPRh9Cw0Y4g0YHQv9C40YHQvtC6INCy0YHQtdGFINGD0YfQsNGB0YLQvdC40LrQvtCyINC30LDQtNCw0YfQuFxyXG4gICAgICAgICAgICBsZXQgdGFza193b3JrZXJzID0gZ2V0QWxsV29ya2VycygpO1xyXG4gICAgICAgICAgICBsZXQgdGFza193b3JrZXJzX2lkID0gW107XHJcblxyXG4gICAgICAgICAgICAvL9GB0YDQsNCy0L3QtdC90LjQtSDRgdC/0LjRgdC60L7Qsiwg0LXRgdC70Lgg0YDQsNCx0L7RgtC90LjQutCwINC90LXRgiDQsiDRgdC/0LjRgdC60LUg0LjQtyDQvdCw0YHRgtGA0L7QtdC6INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjyAtINC00L7QsdCw0LLQu9GP0Y5cclxuICAgICAgICAgICAgLy/RgdC90LDRh9Cw0LvQsCDQvdGD0LbQvdC+INC/0L7Qu9GD0YfQuNGC0Ywg0YHQvtC+0YLQstC10YLRgdCy0LjQtSDQuNC80Y8g0YHQvtGC0YDRg9C00L3QuNC60LAgLT4gb3B0aW9uLnZhbHVlINGCLtC1LiDQu9C+0LPQuNC9INGB0L7RgtGA0YPQtNC90LjQutCwINC90LAg0LDQvdCz0LvQuNGG0LrQvtC8XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlmX2ZpbmQgPSBmaW5kSW5BcnJheSh0YXNrX3dvcmtlcnMsIG9wdGlvbnNbaV0udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlmX2ZpbmQgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhc2tfd29ya2Vyc19pZC5wdXNoKG9wdGlvbnNbaV0udmFsdWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v0LfQsNGC0LXQvCDRgdGA0LDQstC90LjRgtGMINGB0L4g0YHQv9C40YHQutC+0Lwg0LjQtyDQvdCw0YHRgtGA0L7QtdC6XHJcbiAgICAgICAgICAgIC8v0Lgg0LTQvtCx0LDQstC40YLRjCDRgNCw0LHQvtGC0L3QuNC60LAg0LXRgdC70Lgg0LXQs9C+INC90LXRgiDQsiDRgdC/0LjRgdC60LVcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrX3dvcmtlcnNfaWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZl9maW5kID0gZmluZEluQXJyYXkocGFyYW1zX3VzZXJfd29ya2VycywgdGFza193b3JrZXJzX2lkW2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaWZfZmluZCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXNfdXNlcl93b3JrZXJzLnB1c2godGFza193b3JrZXJzX2lkW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUuaW5mbygn0JIg0YHQv9C40YHQvtC6INC00L7QsdCw0LLQu9C10L0gJysgdGFza193b3JrZXJzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbW9kaWZ5U2VsZWN0T3B0aW9uc0xpc3Qob3B0aW9ucywgcGFyYW1zX3VzZXJfd29ya2Vycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL9CyINGB0L/QuNGB0LrQtSDQuNGB0L/QvtC70L3QuNGC0LXQu9C10Lkg0L7RgtC80LXRh9Cw0Y4gc2VsZWN0ZWQg0YDQsNCx0L7RgtC90LjQutCwINC+0YHRgtCw0LLQuNCy0YjQtdCz0L4g0L/QvtGB0LvQtdC00L3QuNC5INC60L7QvNC80LXQvdGC0YDQuNC5INCyINC30LDQtNCw0YfQtVxyXG4gICAgdGhpcy5zZXRTZWxlY3RlZEluV29ya2Vyc0xpc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGxhc3Rfcm93ID0gZ2V0QWxsQ29tbWVudHNSb3dzKCk7XHJcbiAgICAgICAgbGFzdF9yb3cgPSBsYXN0X3Jvd1tsYXN0X3Jvdy5sZW5ndGggLSAxXTtcclxuICAgICAgICBsZXQgbGFzdF93b3JrZXIgPSBsYXN0X3Jvdy5jaGlsZHJlbls0XS50ZXh0Q29udGVudDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXJ0X3dvcmtlcnNfbGlzdC5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChsYXN0X3dvcmtlciA9PT0gZGFydF93b3JrZXJzX2xpc3Qub3B0aW9uc1tpXS50ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBkYXJ0X3dvcmtlcnNfbGlzdC5vcHRpb25zW2ldLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAvL2ZpcmVFdmVudCDQvdGD0LbQtdC9INGH0YLQvtCx0Ysg0LLRi9C30LLQsNGC0Ywg0L/QvtCy0LXRiNC10L3QvdGD0Y4g0L3QsCDRgdC+0LHRi9GC0LjQtSDRhNGD0L3QutGG0LjRjlxyXG4gICAgICAgICAgICAgICAgLy/QsiDQutC+0YLQvtGA0L7QuSDQtNC+0LHQsNCy0LvRj9C10YLRgdGPINGA0LDQsdC+0YLQvdC40Log0LIg0YHQv9C40YHQvtC6INC00LvRjyDRgNCw0YHRgdGL0LvQutC4INGBINC30LDQtNCw0YfQuFxyXG4gICAgICAgICAgICAgICAgbGV0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XHJcbiAgICAgICAgICAgICAgICBldnQuaW5pdEV2ZW50KCdjaGFuZ2UnLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBkYXJ0X3dvcmtlcnNfbGlzdC5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludGVybmFsX3dvcmtlcicpKSB7XHJcbiAgICAgICAgdGhpcy5tb2RpZnlXb3JrZXJzTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRJbldvcmtlcnNMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0X2lkJykgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsaWVudF9pZCcpKSB7XHJcbiAgICAgICAgdGhpcy5tb2RpZnlQcm9qZWN0TGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINC/0L7Qu9C1INCy0LLQvtC00LAgaWQg0LfQsNC00LDRh9C4INC4INC/0LXRgNC10YXQvtC0INC6INC30LDQtNCw0YfQtVxyXG5cclxuICAgIGxldCBnb1RvRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29UbycpO1xyXG4gICAgZ29Ub0ZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxufVxyXG5cclxuZXhwb3J0IHtlbGVtc01vZGlmaWNhdGlvbn07XHJcblxyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgZWxlbXNNb2RpZmljYXRpb24nKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2VsZW1zTW9kaWZpY2F0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCBzYXZlTmV3Q29tbWVudCcpO1xyXG59XHJcblxyXG5pbXBvcnQgeyBnZXRUYXNrSWQgfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbi8v0KHQvtGF0YDQsNC90LXQvdC40LUg0LrQvtC80LzQtdC90YLQsNGA0LjRjyDQsiBsb2NhbFN0b3JhZ2VcclxuLy/QvdCwINGB0LvRg9GH0LDQuSDQstC90LXQt9Cw0L/QvdC+0LPQviDQt9Cy0LXRgNGI0LXQvdC40Y8g0YHQtdGB0YHQuNC4XHJcbmZ1bmN0aW9uIHNhdmVOZXdDb21tZW50KCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCAkZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dCcpO1xyXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFyZWEtd3JhcCcpO1xyXG5cclxuICAgIGxldCB0YXNrX2lkID0gZ2V0VGFza0lkKCk7XHJcblxyXG4gICAgLy/QtNC+0LHQsNCy0LvRjiDQutC90L7Qv9C60YMg0LTQu9GPINCy0YHRgtCw0LLQutC4INGB0L7RhdGA0LDQvdC10L3QvdC+0LPQviDRgtC10LrRgdGC0LBcclxuICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdCVVRUT04nKTtcclxuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnRuLWluc2VydC1scycpO1xyXG4gICAgYnRuLmlkID0nYnRuLWluc2VydC1scyc7XHJcbiAgICBidG4uaW5uZXJIVE1MID0gJ9CS0YHRgtCw0LLQuNGC0Ywg0LjQtyBMUyc7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnbm9uZScpOyAvL9C/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINGB0LrRgNGL0YLQsFxyXG5cclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoYnRuKTtcclxuXHJcbiAgICAvL9C10YHQu9C4INC10YHRgtGMINGB0L7RhdGA0LDQvdC10L3QvdGL0Lkg0YLQtdC60YHRgiAtINC/0L7QutCw0LfQsNGC0Ywg0LrQvdC+0L/QutGDXHJcbiAgICBzaG93UGFzdGVCdG4oYnRuLCB0YXNrX2lkKTtcclxuXHJcbiAgICAvL9Cy0YHRgtCw0LLQuNGC0Ywg0YLQtdC60YHRgiDQv9C+INC60LvQuNC60YNcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJGZpZWxkLnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2snICsgdGFza19pZCk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy/QodC+0YXRgNCw0L3QuNGC0Ywg0YLQtdC60YHRgiDQuNC3INC/0L7Qu9GPINC/0YDQuCDQvdCw0LHQvtGA0LUg0LjQu9C4INC/0L7RgtC10YDQtSDRhNC+0LrRg9GB0LBcclxuICAgICRmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHNhdmVUYXNrQ29tbWVudCk7XHJcblxyXG4gICAgLy/QtdGB0LvQuCDQtdGB0YLRjCDRgdC+0YXRgNCw0L3QtdC90L3Ri9C5INGC0LXQutGB0YIgLSDQv9C+0LrQsNC30LDRgtGMINC60L3QvtC/0LrRg1xyXG4gICAgJGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2hvd1Bhc3RlQnRuKGJ0biwgdGFza19pZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3cmFwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnaXMtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXZpc2libGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNhdmVUYXNrQ29tbWVudCgpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFzaycgKyB0YXNrX2lkLCB0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzaG93UGFzdGVCdG4oYnV0dG9uLCBpZCkge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFzaycgKyBpZCkgIT09ICcnICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrJyArIGlkKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtzYXZlTmV3Q29tbWVudH07XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBzYXZlTmV3Q29tbWVudCcpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2F2ZU5ld0NvbW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIGNvcHlQYXN0ZUNvbW1lbnRRdW90ZScpO1xyXG59XHJcblxyXG5pbXBvcnQge3J1bk9uS2V5c30gZnJvbSAnLi9fdXRpbHMuanMnO1xyXG5pbXBvcnQge2dldEFsbENhbW1lbnRzfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbi8v0LLRi9C00LXQu9C10L3QuNC1INGC0LXQutGB0YLQsCDQsiDQutCw0LzQtdC90YLQtSDQuCDQstGB0YLQsNCy0LrQsCDQvtGE0L7RgNC80LvQtdC90L3QsNGPINC60LDQuiDRhtC40YLQsNGC0LAg0LTQu9GPIG1hcmtkb3duXHJcbmZ1bmN0aW9uIGNvcHlQYXN0ZUNvbW1lbnRRdW90ZSAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGNhbW1lbnRzID0gQXJyYXkuZnJvbShnZXRBbGxDYW1tZW50cygpKTtcclxuXHJcbiAgICBjYW1tZW50cy5tYXAoZnVuY3Rpb24gKGNhbW1lbnQpIHtcclxuICAgICAgICBjYW1tZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2VsZWN0aW9uJyxzZWxlY3Rpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGVkaXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gZm9ybWF0QW5kSW5zZXRDb21tZW50UXVvdGUoZWxlbSkge1xyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3Rpb24nKSl7XHJcbiAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IGVsZW0uc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgICAgIGxldCBlbmRQb3MgPSBlbGVtLnNlbGVjdGlvbkVuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3RyaW5ncyA9IHNlbGVjdGlvbi5zcGxpdCgnXFxuJyk7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmdzID0gc3RyaW5ncy5tYXAoZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgICAgICAgICAgIHJldHVybiAnPiAnK3N0cjtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSBzdHJpbmdzLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2VsZWN0aW9uID0gJ1xcbicrc2VsZWN0aW9uKydcXG4nO1xyXG5cclxuICAgICAgICAgICAgZWxlbS52YWx1ZSA9IGVsZW0udmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKVxyXG4gICAgICAgICAgICAgICAgKyBzZWxlY3Rpb25cclxuICAgICAgICAgICAgICAgICsgZWxlbS52YWx1ZS5zdWJzdHJpbmcoZW5kUG9zLCBlbGVtLnZhbHVlLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2VsZWN0aW9uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJ1bk9uS2V5cyhcclxuICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZWRpdG9yKXtcclxuICAgICAgICAgICAgICAgIGZvcm1hdEFuZEluc2V0Q29tbWVudFF1b3RlKGVkaXRvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVkaXRvclxyXG4gICAgICAgICxcclxuICAgICAgICBcIjE2XCIsXHJcbiAgICAgICAgXCIxN1wiLFxyXG4gICAgICAgIFwiVlwiLmNoYXJDb2RlQXQoMClcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCB7Y29weVBhc3RlQ29tbWVudFF1b3RlfTtcclxuXHJcbmlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIGNvcHlQYXN0ZUNvbW1lbnRRdW90ZScpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29weVBhc3RlQ29tbWVudFF1b3RlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCB1cGRhdGVOb3RpZnknKTtcclxufVxyXG5cclxuaW1wb3J0IHtnZXRUYXNrSWR9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5pbXBvcnQge2RlY2xPZk51bSxsb2FkQnlBamF4fSBmcm9tICcuL191dGlscy5qcyc7XHJcblxyXG5mdW5jdGlvbiB0YXNrVXBkYXRlTm90aWZ5ICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgcGFnZVVybCA9IHdpbmRvdy5sb2NhdGlvbjtcclxuICAgIGxldCB0YXNrSWQgPSBnZXRUYXNrSWQoKTtcclxuXHJcbiAgICAvL9C00L7QsdCw0LLQu9C10L3QuNC1INC60L3QvtC/0LrQuCDQv9C+0LTQv9C40YHQutC4INC90LAg0YPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60LDQvNC10L3RgtCw0YUg0LIg0LfQsNC00LDRh9C1XHJcbiAgICBsZXQgYWxlcnRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGFsZXJ0QnRuLmlkID0gJ3VwZC1hbGVydCc7XHJcbiAgICBhbGVydEJ0bi5jbGFzc0xpc3QuYWRkKCdhZGQtYWxlcnQnKTtcclxuICAgIGFsZXJ0QnRuLnRpdGxlID0gJ9Cf0L7QtNC/0LjRgdCw0YLRjNGB0Y8g0L3QsCDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLQsNGA0LjRj9GFJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXRpdGxlJykuaW5zZXJ0QmVmb3JlKGFsZXJ0QnRuLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3Vic2NyaWJlRWxlbWVudCcpKTtcclxuXHJcbiAgICBhbGVydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICBjaGVja0NvbW1lbnRzVXBkYXRlKHRoaXMsdGFza0lkLGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2hlY2tDb21tZW50c1VwZGF0ZShhbGVydEJ0bix0YXNrSWQpO1xyXG5cclxuICAgIC8v0LfQsNC/0YPRgdC6INC40L3RgtC10YDQstCw0LvQsCDQv9GA0L7QstC10YDQutC4INC40LfQvNC10L3QtdC90LjQuSDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHJcbiAgICBsZXQgbm90aWZ5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbG9hZEJ5QWpheChwYWdlVXJsLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2hlY2tVcGRhdGUoZGF0YSx0YXNrSWQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSwgMTAwMCAqIDYwICogNSk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrVXBkYXRlKGFqYXhyZXNwb25zZSxpZCkge1xyXG4gICAgICAgIGxldCBjb21tZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy10YmwnKS5xdWVyeVNlbGVjdG9yQWxsKCcuYi1jb21tZW50Jyk7XHJcbiAgICAgICAgbGV0IGNvbW1lbnRzTnVtID0gY29tbWVudHMubGVuZ3RoO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcclxuICAgICAgICBsZXQgaHRtbERvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoYWpheHJlc3BvbnNlLnRyaW0oKSxcInRleHQvaHRtbFwiKTtcclxuICAgICAgICBsZXQgdGJsID0gaHRtbERvYy5ib2R5LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm1bbmFtZT10aGVGb3JtXScpLmZpcnN0RWxlbWVudENoaWxkO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHVwbG9hZGVkQ29tbWVudHMgPSB0YmwucXVlcnlTZWxlY3RvckFsbCgndHInKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbHRlcmVkQ29tbWVudHMgPSBBcnJheS5mcm9tKHVwbG9hZGVkQ29tbWVudHMpLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpLmxlbmd0aCA+IDE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIC0gMSDRgi7Qui4g0L3Rg9C20L3QviDRg9Cx0YDQsNGC0Ywg0L/QtdGA0LLRg9GOINGB0YLRgNC+0LrRgyDRgSDQvdCw0LfQstCw0L3QuNGP0LzQuCDRgdGC0L7Qu9Cx0YbQvtCyXHJcbiAgICAgICAgbGV0IHVwZENvbW1lbnROdW0gPSBmaWx0ZXJlZENvbW1lbnRzLmxlbmd0aCAtIDE7XHJcblxyXG5cclxuICAgICAgICBpZih1cGRDb21tZW50TnVtID4gY29tbWVudHNOdW0pe1xyXG4gICAgICAgICAgICBsZXQgbkNvbW1lbnRzID0gdXBkQ29tbWVudE51bSAtIGNvbW1lbnRzTnVtO1xyXG4gICAgICAgICAgICBsZXQgbGFzdElkID0gY29tbWVudHNbY29tbWVudHNOdW0gLSAxXS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpLmlkLnNwbGl0KCdfJylbMV07XHJcblxyXG4gICAgICAgICAgICBjcmVhdGVPblBhZ2VOb3RpZnkobkNvbW1lbnRzLGxhc3RJZCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hlY2tVcGFkYXRlT3B0aW9uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScraWQpO1xyXG5cclxuICAgICAgICAgICAgaWYoY2hlY2tVcGFkYXRlT3B0aW9uICYmIGNoZWNrVXBhZGF0ZU9wdGlvbiA9PT0gJ3RydWUnKXtcclxuICAgICAgICAgICAgICAgIGxldCBub3RpZnkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ9Cd0L7QstGL0Lkg0LrQvtC80LzQtdC90YLQsNGA0LjQuScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RhZyc6ICduZXctY29tbWVudC0nK2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICdib2R5JzogaHRtbERvYy5xdWVyeVNlbGVjdG9yKCdoMSA+IGZvbnQnKS50ZXh0Q29udGVudC50cmltKClcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbm90aWZ5TWUobm90aWZ5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDQvtGH0LjRgdGC0LrQsCDQuNC90YLQtdGA0LLQsNC70LAgLSDQvtGC0LrQu9GO0YfQtdC90LjQtSDRg9Cy0LXQtNC+0LzQu9C10L3QuNC5INC/0L4g0LrQu9C40LrRgyDQvdCwINGD0LLQtdC00L7QvNC70LXQvdC40LhcclxuICAgICAgICAgICAgICAgIC8vIGxldCBub3RpZmljYXRpb24gPSBub3RpZnlNZShub3RpZnkpO1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vIGlmKG5vdGlmaWNhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbm90aWZpY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjbGVhckludGVydmFsKG5vdGlmeUludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5vdGlmeU1lKG5vdGlmeSkge1xyXG4gICAgICAgIGxldCBub3RpZmljYXRpb247XHJcblxyXG4gICAgICAgIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PT0gXCJncmFudGVkXCIpIHtcclxuICAgICAgICAgICAgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbihub3RpZnkudGl0bGUsIHt0YWc6IG5vdGlmeS50YWcsIGJvZHk6IG5vdGlmeS5ib2R5fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uICE9PSAnZGVuaWVkJykge1xyXG4gICAgICAgICAgICBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24gKHBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChwZXJtaXNzaW9uID09PSBcImdyYW50ZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24obm90aWZ5LnRpdGxlLCB7dGFnOiBub3RpZnkudGFnLCBib2R5OiBub3RpZnkuYm9keX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBub3RpZmljYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlT25QYWdlTm90aWZ5KG51bSxsaW5rSWQpIHtcclxuICAgICAgICBsZXQgbm90aWZ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2Utbm90aWZ5Jyk7XHJcblxyXG4gICAgICAgIGlmKCFub3RpZnkpe1xyXG4gICAgICAgICAgICBub3RpZnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudC10ZW1wbGF0ZScpLmNsb25lTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIG5vdGlmeS5pZCA9ICdwYWdlLW5vdGlmeSc7XHJcbiAgICAgICAgICAgIG5vdGlmeS5jbGFzc0xpc3QuYWRkKCdiLWNvbW1lbnRfbm90aWZ5Jyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy10YmwnKS5hcHBlbmRDaGlsZChub3RpZnkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub3RpZnkudGV4dENvbnRlbnQgPSAn0JIg0LfQsNC00LDRh9C1ICcrbnVtKycgJytkZWNsT2ZOdW0obnVtLCBbJ9C90L7QstGL0Lkg0LrQvtC80LzQtdC90YLQsNGA0LjQuScsJ9C90L7QstGL0YUg0LrQvtC80LzQtdC90YLQsNGA0LjRjycsJ9C90L7QstGL0YUg0LrQvtC80LzQtdC90YLQsNGA0LjQtdCyJ10pO1xyXG5cclxuICAgICAgICBsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICBsaW5rLmhyZWYgPSB3aW5kb3cubG9jYXRpb24rJyMnK2xpbmtJZDtcclxuICAgICAgICBsaW5rLnRhcmdldCA9ICdfc2VsZic7XHJcbiAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKCdyZWd1bGFyLWxpbmsnLCdjb21tZW50cy11cGRhdGUtbGluaycpO1xyXG4gICAgICAgIGxpbmsudGV4dENvbnRlbnQgPSAn0J7QsdC90L7QstC40YLRjCDRgdGC0YDQsNC90LjRhtGDJztcclxuXHJcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuaHJlZjtcclxuICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBub3RpZnkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG4gICAgICAgIHJldHVybiBub3RpZnk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/QstC60LvRjtGH0LjRgtGML9C+0YLQutC70Y7Rh9C40YLRjCDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLRgNCw0LjRj9GFXHJcbiAgICAvL9C90LAg0L7RgtC60YDRi9GC0L7QuSDRgdGC0YDQsNC90LjRhtC1INC30LDQtNCw0YfQuFxyXG4gICAgZnVuY3Rpb24gY2hlY2tDb21tZW50c1VwZGF0ZShidG4saWQsZXZlbnQgPSBmYWxzZSkge1xyXG4gICAgICAgIGlmKGV2ZW50KXtcclxuICAgICAgICAgICAgaWYoYnRuLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSl7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29tbWVudHMtdXBkYXRlJytpZCwndHJ1ZScpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjb21tZW50cy11cGRhdGUnK2lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29tbWVudHMtdXBkYXRlJytpZCkgPT09ICd0cnVlJyl7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHt0YXNrVXBkYXRlTm90aWZ5fTtcclxuXHJcbmlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIHVwZGF0ZU5vdGlmeScpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGFza1VwZGF0ZU5vdGlmeS5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy/Qv9GA0L7QutGA0YPRgtC60LAg0Log0LrQsNC80LXQvdGC0YMg0L/QviDRj9C60L7RgNGOLiDQndGD0LbQvdCwINC10YHQu9C4INCy0YvQt9Cy0LDQvSBjb21tZW50c0Rlc2lnbigpXHJcbmZ1bmN0aW9uIGFuY2hvckxpbmsoKSB7XHJcbiAgICAvL9C+0LHRgNCw0LHQvtGC0LrQsCDRgdGB0YvQu9C+0Log0YEgaWQg0LrQsNC80LXQvdGC0LAg0LIg0YXQtdGI0LVcclxuICAgIC8v0YIu0LouINC40Lct0LfQsCDQuNC30LzQtdC90LXQvdC40Y8g0LLRi9GB0L7RgtGLINC60LDQvNC10L3RgtC+0LIg0Lgg0YHQvtC+0YLQstC10YLRgdCy0LXQvdC90L4g0YHRgtGA0LDQvdC40YbRiyDQsiBtb2R1bGVzLmNhbW1lbnRzRGVzaWduKClcclxuICAgIC8v0L7QvdC4INGA0LDQsdC+0YLQsNGO0YIg0L3QtSDQv9GA0LDQstC40LvRjNC90L5cclxuXHJcbiAgICBsZXQgY2FtbWVudElkID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcblxyXG4gICAgY2FtbWVudElkID0gY2FtbWVudElkLnNsaWNlKDEsIGNhbW1lbnRJZC5sZW5ndGgpO1xyXG5cclxuICAgIC8v0LTQvtCx0LDQstC70Y/RjiBzZXRUaW1lb3V0INGCLtC6LiDQv9C+0LrQsCDQvdC1INC/0YDQuNC00YPQvNCw0Lsg0LrQsNC6INC+0YLQu9C+0LLQuNGC0YxcclxuICAgIC8v0YfRgtC+INC/0LXRgNC10LTQtdC70LrQsCDRgdGC0YDQsNC90LjRhtGLINC30LDQutC+0L3Rh9C10L3QsCDQuCDQstGL0YHQvtGC0LAg0Lgg0L/QvtC30LjRhtC40Y8g0LrQsNC80LXQvdGC0LBcclxuICAgIC8v0Log0LrQvtGC0L7RgNC+0LzRgyDQvdGD0LbQvdC+INC/0YDQvtC60YDRg9GC0LjRgtGMINCx0YPQtNC10YIg0YDQsNGB0YHRh9C40YLQsNC90LAg0L/RgNCw0LLQuNC70YzQvdC+XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoY2FtbWVudElkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnYW5jaG9yTGluayBzdGFydCcpO1xyXG4gICAgICAgICAgICAvL9C40YnRgyDRgdC60YDRi9GC0YvQuSDRh9C10LrQsdC+0LrRgSDRgSBpZCDQuCDQvtGCINC90LXQs9C+INCy0LLQtdGA0YUg0LTQviDQutCw0YDRgtC+0YfQutC4INC60LDQvNC10L3RgtCwIGItY29tbWVudFxyXG4gICAgICAgICAgICBsZXQgY2FtbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGVja2JveF8nICsgY2FtbWVudElkKS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gY2FtbWVudC5vZmZzZXRUb3A7XHJcblxyXG4gICAgICAgICAgICBhbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgdGltaW5nOiBmdW5jdGlvbiAodGltZUZyYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVGcmFjdGlvbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkcmF3OiBmdW5jdGlvbiAocHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb1koZGlzdGFuY2UsIHByb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LCA2MDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhbmltYXRlKG9wdGlvbnMpIHtcclxuICAgIGxldCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiBhbmltYXRlKHRpbWUpIHtcclxuICAgICAgICBsZXQgdGltZUZyYWN0aW9uID0gKHRpbWUgLSBzdGFydCkgLyBvcHRpb25zLmR1cmF0aW9uO1xyXG4gICAgICAgIGlmICh0aW1lRnJhY3Rpb24gPiAxKSB0aW1lRnJhY3Rpb24gPSAxO1xyXG5cclxuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBvcHRpb25zLnRpbWluZyh0aW1lRnJhY3Rpb24pO1xyXG5cclxuICAgICAgICBvcHRpb25zLmRyYXcocHJvZ3Jlc3MpO1xyXG5cclxuICAgICAgICBpZiAodGltZUZyYWN0aW9uIDwgMSkge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzY3JvbGxUb1koZGlzdGFuc2UsIHByb2dyZXNzKSB7XHJcbiAgICBsZXQgc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsWSArICgoZGlzdGFuc2UgLSBzY3JvbGxZKSAqIHByb2dyZXNzKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7YW5jaG9yTGlua307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYW5jaG9yTGluay5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8g0LTQvtCx0LDQstC70LXQvdC40LUg0L3QsCDRgdGC0YDQsNC90LjRhtGDINC90L7QstC+0Lkg0LfQsNC00LDRh9C4INCx0LvQvtC60LAg0L3QsNGB0YLRgNC+0LXQuiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cclxuXHJcbmltcG9ydCB7YWRkanN9IGZyb20gJy4vX2xvYWRlcnMuanMnO1xyXG5cclxuZnVuY3Rpb24gdXNlclNldHRpbmdzKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgLy/QtNC+0LHQsNCy0LvQtdC90LjQtS/Rg9C00LDQu9C10L3QuNC1INCy0YvQsdGA0LDQvdC90YvRhSDQv9GA0L7QtdC60YLQvtCyINCyINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjNGB0LrQvtC8INGB0L/QuNGB0LrQtVxyXG4gICAgLy/RgdC+0YXRgNCw0L3QtdC90LjQtSDQsiBsb2NhbFN0b3JhZ2Ug0Lgg0YHQutGA0YvRgtGMINC/0L7QutCw0LfQsNGC0Ywg0LIgc2VsZWN0INC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG4gICAgbGV0ICRjb250ZW50X2NlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtW25hbWU9XCJ0aGVGb3JtXCJdJyk7XHJcblxyXG4gICAgLy/RgdC+0LfQtNCw0L3QuNC1INCx0LvQvtC60LAg0LIg0LrQvtGC0L7RgNC+0Lwg0LHRg9C00YPRgiDQstGB0LUg0Y3Qu9C10LzQtdC90YLRiyDRg9C/0YDQsNCy0LvQtdC90LjRjyDQvdCw0YHRgtGA0L7QudC60LDQvNC4XHJcbiAgICBsZXQgJHVzZXJfc2V0dGluZ3NfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAkdXNlcl9zZXR0aW5nc19ib3guaWQgPSAnc2V0dGluZ3MtYm94JztcclxuICAgICRjb250ZW50X2NlbGwuaW5zZXJ0QmVmb3JlKCR1c2VyX3NldHRpbmdzX2JveCwgJGNvbnRlbnRfY2VsbC5maXJzdENoaWxkKTtcclxuXHJcbiAgICAvL9GB0L7Qt9C00LDQvdC40LUg0LrQvdC+0L/QutC4INC/0L7QutCw0LfQsNGC0Ywv0YHQutGA0YvRgtGMINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjNGB0LrQuNC1INC90LDRgdGC0YDQvtC50LrQuFxyXG4gICAgbGV0ICRzZXR0aW5nc19idG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICRzZXR0aW5nc19idG4uaW5uZXJIVE1MID0gJ9Cf0L7QutCw0LfQsNGC0Ywv0YHQutGA0YvRgtGMINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjNGB0LrQuNC1INC90LDRgdGC0YDQvtC50LrQuCc7XHJcbiAgICAkc2V0dGluZ3NfYnRuLmlkID0gJ3NldHRpbmdzLWJ0bic7XHJcbiAgICAkc2V0dGluZ3NfYnRuLnR5cGUgPSAnYnV0dG9uJztcclxuXHJcbiAgICAkc2V0dGluZ3NfYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICR1c2VyX3NldHRpbmdzX2JveC5jbGFzc0xpc3QudG9nZ2xlKCdpcy1vcGVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkY29udGVudF9jZWxsLmluc2VydEJlZm9yZSgkc2V0dGluZ3NfYnRuLCAkY29udGVudF9jZWxsLmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgIC8v0YHQvtC30LTQsNC90LjQtSDQutCw0YHRgtC+0LzQvdC+0LPQviDRgdC/0LjRgdC60LAg0L/RgNC+0LXQutGC0L7QslxyXG4gICAgLy9pZGBzIGFycmF5XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrTGlzdEhUTUwoKSB7XHJcbiAgICAgICAgaWYoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYXJhbXNfdXNlcl9wcm9qZWN0cycpKXtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BhcmFtc191c2VyX3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkoW10pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXNfdXNlcl9wcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BhcmFtc191c2VyX3Byb2plY3RzJykpO1xyXG5cclxuICAgICAgICBjb25zdCBQUk9KRUNUU19MSVNUX1BBUkFNUyA9IHtcclxuICAgICAgICAgICAgJ2lkJzogJ2N1c3RvbS1wcm9qZWN0LWxpc3QnLFxyXG4gICAgICAgICAgICAndGl0bGUnOiAn0KHQvtCx0YHRgtCy0LXQvdC90YvQuSDRgdC/0LjRgdC+0Log0L/RgNC+0LXQutGC0L7QsicsXHJcbiAgICAgICAgICAgICdzb3VyY2UnOiAncHJvamVjdF9pZCcsXHJcbiAgICAgICAgICAgICdzdG9yYWdlJzogcGFyYW1zX3VzZXJfcHJvamVjdHMsXHJcbiAgICAgICAgICAgICdzdG9yYWdlX25hbWUnOiAncGFyYW1zX3VzZXJfcHJvamVjdHMnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0ICRjdXN0b21fcHJvamVjdHNfbGlzdCA9IGNyZWF0ZUluc2VydFdvcmtlcnNQcm9qZWN0c0xpc3RzKFBST0pFQ1RTX0xJU1RfUEFSQU1TKTtcclxuXHJcbiAgICAgICAgJHVzZXJfc2V0dGluZ3NfYm94Lmluc2VydEJlZm9yZSgkY3VzdG9tX3Byb2plY3RzX2xpc3QsICR1c2VyX3NldHRpbmdzX2JveC5maXJzdENoaWxkKTtcclxuXHJcbiAgICAgICAgaGlnaGxpZ2h0U2VsZWN0ZWQoJGN1c3RvbV9wcm9qZWN0c19saXN0LCBwYXJhbXNfdXNlcl9wcm9qZWN0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/RgdC+0LfQtNCw0L3QuNC1INC60LDRgdGC0L7QvNC90L7Qs9C+INGB0L/QuNGB0LrQsCDQuNGB0L/QvtC70L3QuNGC0LXQu9C10LlcclxuICAgIC8vaWRgcyBhcnJheVxyXG4gICAgZnVuY3Rpb24gY3JlYXRlV29ya2Vyc0xpc3RIVE1MKCkge1xyXG4gICAgICAgIGlmKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFyYW1zX3VzZXJfd29ya2VycycpKXtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BhcmFtc191c2VyX3dvcmtlcnMnLCBKU09OLnN0cmluZ2lmeShbXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmFtc191c2VyX3dvcmtlcnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYXJhbXNfdXNlcl93b3JrZXJzJykpO1xyXG5cclxuICAgICAgICBjb25zdCBXT1JLRVJTX0xJU1RfUEFSQU1TID0ge1xyXG4gICAgICAgICAgICAnaWQnOiAnY3VzdG9tLXdvcmtlcnMtbGlzdCcsXHJcbiAgICAgICAgICAgICd0aXRsZSc6ICfQodC+0LHRgdGC0LLQtdC90L3Ri9C5INGB0L/QuNGB0L7QuiDQuNGB0L/QvtC70L3QuNGC0LXQu9C10LknLFxyXG4gICAgICAgICAgICAnc291cmNlJzogJ2ludGVybmFsX3dvcmtlcicsXHJcbiAgICAgICAgICAgICdzdG9yYWdlJzogcGFyYW1zX3VzZXJfd29ya2VycyxcclxuICAgICAgICAgICAgJ3N0b3JhZ2VfbmFtZSc6ICdwYXJhbXNfdXNlcl93b3JrZXJzJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCAkY3VzdG9tX3dvcmtlcnNfbGlzdCA9IGNyZWF0ZUluc2VydFdvcmtlcnNQcm9qZWN0c0xpc3RzKFdPUktFUlNfTElTVF9QQVJBTVMpO1xyXG5cclxuICAgICAgICAkdXNlcl9zZXR0aW5nc19ib3guaW5zZXJ0QmVmb3JlKCRjdXN0b21fd29ya2Vyc19saXN0LCAkdXNlcl9zZXR0aW5nc19ib3guZmlyc3RDaGlsZCk7XHJcblxyXG4gICAgICAgIGhpZ2hsaWdodFNlbGVjdGVkKCRjdXN0b21fd29ya2Vyc19saXN0LCBwYXJhbXNfdXNlcl93b3JrZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQv9C+0LTRgdCy0LXRgtC60LAg0YHQvtGF0YDQsNC90LXQvdC90YvRhSDQsiDQvdCw0YHRgtGA0L7QudC60LDRhSDRjdC70LXQvNC10L3RgtC+0LIg0YHQv9C40YHQutCwXHJcbiAgICBmdW5jdGlvbiBoaWdobGlnaHRTZWxlY3RlZChsaXN0LCBzZXR0aW5ncykge1xyXG4gICAgICAgIGlmICghc2V0dGluZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ25vJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBub2RlO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhsaXN0LmNoaWxkTm9kZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICBub2RlID0gbGlzdC5jaGlsZE5vZGVzW2tleV07XHJcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5pbmRleE9mKG5vZGUuZGF0YXNldC5pZCkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0LTQvtCx0LDQstC70LXQvdC40LUg0LrQvdC+0L/QvtC6INCy0LrQu9GO0YfQtdC90LjRjy/QvtGC0LrQu9GO0YfQtdC90LjRjyDRgNCw0LfQvdGL0YUg0LzQvtC00YPQu9C10LlcclxuICAgIGxldCBvcHRpb25zQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG9wdGlvbnNCbG9jay5jbGFzc0xpc3QuYWRkKCd1c2VyLWxpc3QnKTtcclxuXHJcbiAgICBsZXQgc2V0dGluZ3NfdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgc2V0dGluZ3NfdGl0bGUudGV4dENvbnRlbnQgPSAn0J7Qv9GG0LjQuCc7XHJcbiAgICBzZXR0aW5nc190aXRsZS5jbGFzc0xpc3QuYWRkKCd1c2VyLXRpdGxlJyk7XHJcblxyXG4gICAgb3B0aW9uc0Jsb2NrLmFwcGVuZENoaWxkKHNldHRpbmdzX3RpdGxlKTtcclxuXHJcbiAgICAvL9C00L7QsdCw0LLQu9C10L3QuNC1INC90LDRgdGC0YDQvtC50LrQuCAtINCy0LrQuy/QstGL0LrQuyDQs9C10L3QtdGA0LDRhtC40Lgg0LHQu9C+0LrQsCDRgSDQv9C+0LTRgdGH0LXRgtC+0Lwg0LLRgNC10LzQtdC90Lgg0YPRh9Cw0YHRgtC90LjQutC+0LIg0LfQsNC00LDRh9C4XHJcbiAgICBsZXQgY291bnRUaW1lQnRuID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIGNvdW50VGltZUJ0bi5pZCA9ICdjb3VudFRpbWVCdG4nO1xyXG4gICAgY291bnRUaW1lQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1mbGF0Jywncm93LWl0ZW0nKTtcclxuICAgIGNvdW50VGltZUJ0bi50ZXh0Q29udGVudCA9ICfQn9C+0LTRgdGH0LXRgiDQstGA0LXQvNC10L3QuCDQsiDQt9Cw0LTQsNGH0LUgLSDQktC60LvRjtGH0LXQvSc7XHJcblxyXG4gICAgaWYoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3b3JrZXItdGltZS1jb3VudCcpKXtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnd29ya2VyLXRpbWUtY291bnQnLCAndHJ1ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvdW50VGltZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcpO1xyXG5cclxuICAgICAgIGlmKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKXtcclxuICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gJ9Cf0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INCyINC30LDQtNCw0YfQtSAtINCS0LrQu9GO0YfQtdC9JztcclxuICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnd29ya2VyLXRpbWUtY291bnQnLCAndHJ1ZScpO1xyXG4gICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9ICfQn9C+0LTRgdGH0LXRgiDQstGA0LXQvNC10L3QuCDQsiDQt9Cw0LTQsNGH0LUgLSDQktGL0LrQu9GO0YfQtdC9JztcclxuICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnd29ya2VyLXRpbWUtY291bnQnLCdmYWxzZScpO1xyXG4gICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy/QstC60LvRjtGH0LjRgtGML9C+0YLQutC70Y7Rh9C40YLRjCDQs9C10L3QtdGA0LDRhtC40Y4g0LHQu9C+0LrQsCDRgSDQv9C+0LTRgdGH0LXRgtC+0LIg0LLRgNC10LzQtdC90Lgg0YPRh9Cw0YHRgtC90LjQutC+0LIg0LfQsNC00LDRh9C4XHJcbiAgICBmdW5jdGlvbiBjaGVja1RpbWVDb3VudE9wdGlvbigpIHtcclxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50VGltZUJ0bicpO1xyXG5cclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd29ya2VyLXRpbWUtY291bnQnKSA9PT0gJ3RydWUnKXtcclxuICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gJ9Cf0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INCyINC30LDQtNCw0YfQtSAtINCS0LrQu9GO0YfQtdC9JztcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9ICfQn9C+0LTRgdGH0LXRgiDQstGA0LXQvNC10L3QuCDQsiDQt9Cw0LTQsNGH0LUgLSDQktGL0LrQu9GO0YfQtdC9JztcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qLy/QtNC+0LHQsNCy0LvQtdC90LjQtSDQvdCw0YHRgtGA0L7QudC60LggLSDQstC60Lsv0LLRi9C60Lsg0YPQstC10LTQvtC80LvQtdC90LjQuSDQviDQvdC+0LLQvtC8INC60L7QvNC80LXQvdGC0LDRgNC40Lgg0LIg0LfQsNC00LDRh9C1XHJcbiAgICBsZXQgY29tbWVudHNVcGRhdGVCdG4gPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgY29tbWVudHNVcGRhdGVCdG4uaWQgPSAnY29tbWVudHNVcGRhdGVCdG4nO1xyXG4gICAgY29tbWVudHNVcGRhdGVCdG4uY2xhc3NMaXN0LmFkZCgnYnRuLWZsYXQnLCdyb3ctaXRlbScpO1xyXG4gICAgY29tbWVudHNVcGRhdGVCdG4udGV4dENvbnRlbnQgPSAn0KPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y/RhSAtINCS0LrQu9GO0YfQtdC90YsnO1xyXG5cclxuICAgIGNvbW1lbnRzVXBkYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSl7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAn0KPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y/RhSAtINCS0LrQu9GO0YfQtdC90YsnO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29tbWVudHMtdXBkYXRlJywgJ3RydWUnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9ICfQo9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLQsNGA0LjRj9GFIC0g0JLRi9C60LvRjtGH0LXQvdGLJztcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScsJ2ZhbHNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy/QstC60LvRjtGH0LjRgtGML9C+0YLQutC70Y7Rh9C40YLRjCDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLRgNCw0LjRj9GFXHJcbiAgICAvL9C90LAg0L7RgtC60YDRi9GC0L7QuSDRgdGC0YDQsNC90LjRhtC1INC30LDQtNCw0YfQuFxyXG4gICAgZnVuY3Rpb24gY2hlY2tDb21tZW50c1VwZGF0ZSgpIHtcclxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzVXBkYXRlQnRuJyk7XHJcblxyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb21tZW50cy11cGRhdGUnKSA9PT0gJ3RydWUnKXtcclxuICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gJ9Cj0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGP0YUgLSDQktC60LvRjtGH0LXQvdGLJztcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9ICfQo9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLQsNGA0LjRj9GFIC0g0JLRi9C60LvRjtGH0LXQvdGLJztcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSovXHJcblxyXG4gICAgb3B0aW9uc0Jsb2NrLmFwcGVuZENoaWxkKGNvdW50VGltZUJ0bik7XHJcbiAgICAvL29wdGlvbnNCbG9jay5hcHBlbmRDaGlsZChjb21tZW50c1VwZGF0ZUJ0bik7XHJcblxyXG4gICAgJHVzZXJfc2V0dGluZ3NfYm94LmFwcGVuZENoaWxkKG9wdGlvbnNCbG9jayk7XHJcblxyXG4gICAgLy/Qt9Cw0L/Rg9GB0Log0L/RgNC+0LLQtdGA0L7QuiDQstC60LvRjtGH0LXQvdC90YvRhS/QvtGC0LrQu9GO0YfQtdC90L3Ri9GFINC+0L/RhtC40LlcclxuICAgIGNoZWNrVGltZUNvdW50T3B0aW9uKCk7XHJcbiAgICAvL2NoZWNrQ29tbWVudHNVcGRhdGUoKTtcclxuXHJcblxyXG4gICAgY3JlYXRlVGFza0xpc3RIVE1MKCk7XHJcbiAgICBjcmVhdGVXb3JrZXJzTGlzdEhUTUwoKTtcclxuXHJcbiAgICAvLyDQtNC+0LHQsNCy0LvQtdC90LjQtSDQsdC70L7QutCwINGN0LrRgdC/0L7RgNGC0LAv0LjQvNC/0L7RgNGC0LAg0L3QsNGB0YLRgNC+0LXQulxyXG4gICAgbGV0IEVJQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIEVJQmxvY2suY2xhc3NMaXN0LmFkZCgndXNlci1saXN0Jyk7XHJcbiAgICBFSUJsb2NrLmlkID0gJ0VJQmxvY2snO1xyXG5cclxuICAgIGxldCBFSUJsb2NrX3RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIEVJQmxvY2tfdGl0bGUudGV4dENvbnRlbnQgPSAn0K3QutGB0L/QvtGA0YIv0LjQvNC/0L7RgNGCINC90LDRgdGC0YDQvtC10LonO1xyXG4gICAgRUlCbG9ja190aXRsZS5jbGFzc0xpc3QuYWRkKCd1c2VyLXRpdGxlJyk7XHJcblxyXG4gICAgbGV0IEVJQmxvY2tfZGVzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIEVJQmxvY2tfZGVzYy50ZXh0Q29udGVudCA9ICfQkdGD0LTRg9GCINGB0L7RhdGA0LDQvdC10L3RiyDQuNC30LHRgNCw0L3QvdGL0LUg0L/RgNC+0LXQutGC0YssINGA0LDQsdC+0YLQvdC40LrQuCwg0L7Qv9GG0LjQuC4nO1xyXG5cclxuICAgIEVJQmxvY2suYXBwZW5kQ2hpbGQoRUlCbG9ja190aXRsZSk7XHJcbiAgICBFSUJsb2NrLmFwcGVuZENoaWxkKEVJQmxvY2tfZGVzYyk7XHJcblxyXG4gICAgbGV0IEVJU2V0dGluZ3MgPSBleHBvcnRJbXBvcnRVc2VyU2V0dGluZ3MoKTtcclxuICAgIEVJQmxvY2suYXBwZW5kQ2hpbGQoRUlTZXR0aW5ncy5saW5rKTtcclxuICAgIEVJQmxvY2suYXBwZW5kQ2hpbGQoRUlTZXR0aW5ncy5maWVsZCk7XHJcblxyXG4gICAgJHVzZXJfc2V0dGluZ3NfYm94LmFwcGVuZENoaWxkKEVJQmxvY2spO1xyXG5cclxuICAgIGlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygnbG9hZCB1c2VyU2V0dGluZ3MnKTtcclxuICAgIH1cclxufVxyXG5cclxuLy/RgdC+0LfQtNCw0L3QuNC1INC4INC00L7QsdCw0LLQu9C10L3QuNC1INGB0L/QuNGB0LrQsCDRgNCw0LHQvtGC0L3QuNC60L7QsiDQuCDQv9GA0L7QtdC60YLQvtCyXHJcbmZ1bmN0aW9uIGNyZWF0ZUluc2VydFdvcmtlcnNQcm9qZWN0c0xpc3RzKHBhcmFtcykge1xyXG4gICAgbGV0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgbGlzdC5pZCA9IHBhcmFtcy5pZDtcclxuICAgIGxpc3QuY2xhc3NMaXN0LmFkZCgndXNlci1saXN0JywgJ2NsZWFyZml4Jyk7XHJcblxyXG4gICAgbGV0IGxpc3RfdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgbGlzdF90aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMudGl0bGU7XHJcbiAgICBsaXN0X3RpdGxlLmNsYXNzTGlzdC5hZGQoJ3VzZXItdGl0bGUnKTtcclxuXHJcbiAgICBsaXN0LmFwcGVuZENoaWxkKGxpc3RfdGl0bGUpO1xyXG5cclxuICAgIGxldCBzb3VyY2VfbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtcy5zb3VyY2UpO1xyXG4gICAgbGV0IHNvdXJjZV9saXN0X2l0ZW1zID0gc291cmNlX2xpc3Qub3B0aW9ucztcclxuXHJcbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBsZXQgbGlzdF9pdGVtX3Byb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIGxldCBsaXN0X2l0ZW07XHJcblxyXG4gICAgT2JqZWN0LmtleXMoc291cmNlX2xpc3RfaXRlbXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGlmIChzb3VyY2VfbGlzdF9pdGVtc1trZXldLnZhbHVlIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaXN0X2l0ZW0gPSBsaXN0X2l0ZW1fcHJvdG8uY2xvbmVOb2RlKGZhbHNlKTtcclxuICAgICAgICBsaXN0X2l0ZW0uaW5uZXJIVE1MID0gc291cmNlX2xpc3RfaXRlbXNba2V5XS50ZXh0O1xyXG4gICAgICAgIGxpc3RfaXRlbS5kYXRhc2V0LmlkID0gc291cmNlX2xpc3RfaXRlbXNba2V5XS52YWx1ZTtcclxuICAgICAgICBsaXN0X2l0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNhdmVVc2VyU2V0dGluZ3MocGFyYW1zLnN0b3JhZ2UsIHRoaXMsIHBhcmFtcy5zdG9yYWdlX25hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChsaXN0X2l0ZW0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGlzdC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcblxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbi8v0YHQvtGF0YDQsNC90LXQvdC40LUg0L/QvtC70YzQt9C+0LLQsNC10YLQu9GM0YHQutC40YUg0L3QsNGB0YLRgNC+0LXQulxyXG4vL9C4INCy0YvQtNC10LvQtdC90LjQtSDRgdC+0YXRgNCw0L3QtdC90L3QvtCz0L4g0LIg0YHQv9C40YHQutCw0YUg0YDQsNCx0L7RgtC90LjQutC+0LIg0Lgg0L/RgNC+0LXQutGC0L7QslxyXG5mdW5jdGlvbiBzYXZlVXNlclNldHRpbmdzKG9wdGlvbnMsIGxpc3RfaXRlbSwgc3RvcmFnZV9pdGVtKSB7XHJcbiAgICBsZXQgaWQgPSBsaXN0X2l0ZW0uZGF0YXNldC5pZDtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5pbmRleE9mKGlkKSA9PT0gLTEpIHtcclxuICAgICAgICBvcHRpb25zLnB1c2goaWQpO1xyXG4gICAgICAgIGxpc3RfaXRlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaW5kZXggPSBvcHRpb25zLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIG9wdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBsaXN0X2l0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlX2l0ZW0sIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpKTtcclxuICAgIC8vY29uc29sZS5sb2coSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlX2l0ZW0pKSk7XHJcbn1cclxuXHJcbi8v0YHQvtGF0YDQsNC90LXQvdC40LUg0L/QvtC70YzQt9C+0LLQsNC10YLQu9GM0YHQutC40YUg0L3QsNGB0YLRgNC+0LXQuiDQsiDRhNCw0LnQu1xyXG4vL9C30LDQs9GA0YPQt9C60LAg0L3QsNGB0YLRgNC+0LXQuiDQuNC3INGE0LDQudC70LBcclxuZnVuY3Rpb24gZXhwb3J0SW1wb3J0VXNlclNldHRpbmdzKCkge1xyXG4gICAgLy9jb25zdCBrZXlzID0gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKTtcclxuICAgIGNvbnN0IGtleXMgPSBbXCJwYXJhbXNfdXNlcl9wcm9qZWN0c1wiLFwicGFyYW1zX3VzZXJfd29ya2Vyc1wiLFwiZGF0YWxpc3RcIixcIndvcmtlci10aW1lLWNvdW50XCJdO1xyXG5cclxuICAgIGxldCBzZXR0aW5ncyA9IHt9O1xyXG5cclxuICAgIGZvcihsZXQgaSBvZiBrZXlzKXtcclxuICAgICAgICBzZXR0aW5nc1tpXSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGkpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBTYXZlQXNCbG9iID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KHNldHRpbmdzKV0sIHt0eXBlOlwiYXBwbGljYXRpb24vanNvblwifSk7XHJcbiAgICBsZXQgU2F2ZUFzVVJMID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoU2F2ZUFzQmxvYik7XHJcbiAgICBjb25zdCBmaWxlTmFtZVRvU2F2ZUFzID0gJ3RyYWNrZXItdXNlci1zZXR0aW5ncyc7XHJcblxyXG4gICAgbGV0IGRvd25sb2FkTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgZG93bmxvYWRMaW5rLmRvd25sb2FkID0gZmlsZU5hbWVUb1NhdmVBcztcclxuICAgIGRvd25sb2FkTGluay5pbm5lckhUTUwgPSBcItCh0LrQsNGH0LDRgtGMINGE0LDQudC7INC90LDRgdGC0YDQvtC10LpcIjtcclxuICAgIGRvd25sb2FkTGluay5ocmVmID0gU2F2ZUFzVVJMO1xyXG4gICAgZG93bmxvYWRMaW5rLmNsYXNzTGlzdC5hZGQoJ3Jvdy1pdGVtJyk7XHJcblxyXG4gICAgbGV0IHVwbG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICB1cGxvYWQudHlwZSA9ICdmaWxlJztcclxuICAgIHVwbG9hZC5pZCA9ICdpbXBvcnQtc2V0dGluZ3MnO1xyXG4gICAgdXBsb2FkLnRpdGxlID0gJ9CX0LDQs9GA0YPQt9C40YLQtSDRhNCw0LnQuyDRgSDRgdC+0YXRgNCw0L3QtdC90L3Ri9C80Lgg0L3QsNGB0YLRgNC+0LnQutCw0LzQuCB0cmFja2VyLXVzZXItc2V0dGluZ3MnO1xyXG4gICAgdXBsb2FkLmNsYXNzTGlzdC5hZGQoJ3Jvdy1pdGVtJyk7XHJcblxyXG4gICAgdXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsb2FkRmlsZSh0aGlzKVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZEZpbGUoaW5wdXQpIHtcclxuICAgICAgICBsZXQgZmlsZVRvTG9hZCA9IGlucHV0LmZpbGVzWzBdO1xyXG5cclxuICAgICAgICBsZXQgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblxyXG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGZpbGVMb2FkZWRFdmVudCkge1xyXG4gICAgICAgICAgICBsZXQgc2V0dGluZ3MgPSBKU09OLnBhcnNlKGZpbGVMb2FkZWRFdmVudC50YXJnZXQucmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBzZXR0aW5ncyA9PT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoc2V0dGluZ3MpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgc2V0dGluZ3Nba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ9Ce0YjQuNCx0LrQsCDRh9GC0LXQvdC40Y8g0YTQsNC50LvQsCDQvdCw0YHRgtGA0L7QtdC6Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc1RleHQoZmlsZVRvTG9hZCwgXCJVVEYtOFwiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbms6IGRvd25sb2FkTGluayxcclxuICAgICAgICBmaWVsZDogdXBsb2FkXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQge3VzZXJTZXR0aW5nc307XHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91c2VyU2V0dGluZ3MuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hbm4tYWEgb24gMDUuMDcuMjAxNy5cclxuICovXHJcbmltcG9ydCB7Z2V0VGFza0lkfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGNhbGNUaW1lTGVmdCgpIHtcclxuICAgIC8vZHRwID0gZGFydC10YXNrLXBsYW5lXHJcbiAgICBjb25zdCB0aWQgPSBnZXRUYXNrSWQoKTtcclxuXHJcbiAgICBsZXQgYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItdG9vbGJhcicpO1xyXG4gICAgbGV0IHdvcmtlcnNUaW1lQmxvY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd29ya2Vycy10aW1lJyk7XHJcblxyXG4gICAgbGV0IGJhcml0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJhcml0ZW0uY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyX19pdGVtJyk7XHJcblxyXG4gICAgbGV0IGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIGZpZWxkLmlkID0gJ2R0cC1pbnB1dCc7XHJcbiAgICBmaWVsZC52YWx1ZSA9IDA7XHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcmVzdWx0LmNsYXNzTGlzdC5hZGQoJ2R0cC1yZXN1bHQnKTtcclxuXHJcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBidG4udGV4dENvbnRlbnQgPSAn0J/QvtGB0YfQuNGC0LDRgtGMINC+0YHRgtCw0LLRiNC10LXRgdGPINCy0YDQtdC80Y8nO1xyXG4gICAgYnRuLnR5cGUgPSAnYnV0dG9uJztcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdkdHAtYnV0dG9uJyk7XHJcblxyXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcclxuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3VzZXItdG9vbGJhci10aXRsZScpO1xyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAn0J7RgdGC0LDQstGI0LXQtdGB0Y8g0LLRgNC10LzRjyAoRGFydEl0KSc7XHJcblxyXG4gICAgYmFyaXRlbS5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICBiYXJpdGVtLmFwcGVuZENoaWxkKGZpZWxkKTtcclxuICAgIGJhcml0ZW0uYXBwZW5kQ2hpbGQocmVzdWx0KTtcclxuICAgIGJhci5hcHBlbmRDaGlsZChiYXJpdGVtKTtcclxuXHJcbiAgICB3b3JrZXJzVGltZUJsb2NrLmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldERhcnRDYWxjKGZpZWxkLHJlc3VsdClcclxuICAgIH0pO1xyXG5cclxuICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgcmVhZFdyaXRlRGFydFBsYW5lVGltZSh0aGlzLCB0aWQsIGUudHlwZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZWFkV3JpdGVEYXJ0UGxhbmVUaW1lKGZpZWxkLCB0aWQsICdsb2FkJyk7XHJcbiAgICBsZXREYXJ0Q2FsYyhmaWVsZCxyZXN1bHQpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gbGV0RGFydENhbGMoaW5wdXQsb3V0KSB7XHJcbiAgICBsZXQgZGF0YSA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JrZXJzLXRpbWUtdG90YWwnKS5kYXRhc2V0LnRvdGFsdGltZSk7XHJcbiAgICBsZXQgY2FsYyA9IHBhcnNlSW50KGlucHV0LnZhbHVlKSAtIGRhdGE7XHJcbiAgICBsZXQgdHh0ID0gJ9Ce0YHRgtCw0LLRiNC10LXRgdGPINCy0YDQtdC80Y86ICc7XHJcblxyXG4gICAgaWYoY2FsYyA8IDApe1xyXG4gICAgICAgIG91dC5jbGFzc0xpc3QuYWRkKCdkdHAtYWxlcnQnKTtcclxuICAgICAgICBvdXQuY2xhc3NMaXN0LnRvZ2dsZSgnZHRwLXdhcm4nLGZhbHNlKTtcclxuICAgICAgICB0eHQgPSAn0JHQvtC70YzRiNC1INC30LDQv9C70LDQvdC40YDQvtCy0LDQvdC90L7Qs9C+INC90LAgJztcclxuICAgICAgICBjYWxjID0gTWF0aC5hYnMoY2FsYyk7XHJcbiAgICB9ZWxzZSBpZihjYWxjIDw9IDYwKXtcclxuICAgICAgICBvdXQuY2xhc3NMaXN0LmFkZCgnZHRwLXdhcm4nKTtcclxuICAgICAgICBvdXQuY2xhc3NMaXN0LnRvZ2dsZSgnZHRwLWFsZXJ0JyxmYWxzZSk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBvdXQuY2xhc3NMaXN0LnJlbW92ZSgnZHRwLXdhcm4nLCdkdHAtYWxlcnQnKTtcclxuICAgIH1cclxuICAgIG91dC50ZXh0Q29udGVudCA9IGAke3R4dH0gJHtjYWxjfSDQvNC40L0uYDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZFdyaXRlRGFydFBsYW5lVGltZShpbnB1dCxpZCxldikge1xyXG5cclxuICAgIGlmKGV2ID09PSAnY2hhbmdlJyl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7aWR9LWRhcnQtcGxhbmUtdGltZWAsIGlucHV0LnZhbHVlKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2lkfS1kYXJ0LXBsYW5lLXRpbWVgKSAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7aWR9LWRhcnQtcGxhbmUtdGltZWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3Bjc3MvY2FsY1RpbWVMZWZ0SW5EYXJ0VGFzay5wY3NzJztcclxuXHJcbmV4cG9ydCB7Y2FsY1RpbWVMZWZ0fTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2FsY1RpbWVMZWZ0SW5EYXJ0VGFzay5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vY2FsY1RpbWVMZWZ0SW5EYXJ0VGFzay5wY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL2NhbGNUaW1lTGVmdEluRGFydFRhc2sucGNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLnBjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Bjc3MvY2FsY1RpbWVMZWZ0SW5EYXJ0VGFzay5wY3NzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuZHRwLXJlc3VsdC5kdHAtYWxlcnR7Y29sb3I6cmVkO2ZvbnQtc2l6ZToxLjRlbX0uZHRwLXJlc3VsdHtwYWRkaW5nLXRvcDoyZW19LmR0cC1yZXN1bHQuZHRwLXdhcm57Y29sb3I6Ymx1ZX0uZHRwLWJ1dHRvbnttYXJnaW4tdG9wOjJlbX1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3tcImltcG9ydExvYWRlcnNcIjoxfSEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIhLi9zcmMvcGNzcy9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0E7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3RFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoV0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5RUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN4RkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BKQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5UUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ25iQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hIQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdKQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkRBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDblVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=