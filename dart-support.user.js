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
    let dates_collection = new Set();
    let date_str;

    for (let i = 0; i < rows.length; i++) {
        date_str = rows[i].children[3].textContent;
        date_str = date_str.split(' ');
        dates_collection.add(__WEBPACK_IMPORTED_MODULE_1__utils_js__["a" /* createISODate */](date_str[0]));
    }

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

    let date_lists = createDatesList($input_box, dates_collection);

    // добавляю селекты с датами - подсчет времени за выбранный период
    findTimeInDatesRange(date_lists, workers, rows);

    $input_box.insertBefore($timelist, $input_box.lastChild);

    //http://stackoverflow.com/questions/2558977/ajax-cross-domain-call
}

function createDatesList(input_box, dates) {

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

    for(let date of dates){
        listdate = __WEBPACK_IMPORTED_MODULE_1__utils_js__["b" /* dateFormatter */](parseInt(date, 10));
        option = document.createElement('OPTION');
        option.setAttribute('value', date);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFydC1zdXBwb3J0LnVzZXIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWYyOThjZjcwY2VkMWQwZWQxMDciLCJ3ZWJwYWNrOi8vLy4vc3JjL19maW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19hZGRDU1NTZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzPzdmZjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHlmaUNvbW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9fbG9hZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbWVudHNEZXNpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvY29tbWVudHNEZXNpZ24ucGNzcz84NDE4Iiwid2VicGFjazovLy8uL3NyYy9wY3NzL2NvbW1lbnRzRGVzaWduLnBjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbGN1bGF0ZUVsYXBzZWRUaW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9nb1RvVGFzay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY291bnRXb3JrZXJUaW1lLmpzIiwid2VicGFjazovLy8uL3NyYy90YXNrRm9vdGVyRGVzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcz8wYzA0Iiwid2VicGFjazovLy8uL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWxlbXNNb2RpZmljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhdmVOZXdDb21tZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3B5UGFzdGVDb21tZW50UXVvdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rhc2tVcGRhdGVOb3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuY2hvckxpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZXJTZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FsY1RpbWVMZWZ0SW5EYXJ0VGFzay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGNzcy9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLnBjc3M/NWUwYSIsIndlYnBhY2s6Ly8vLi9zcmMvcGNzcy9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLnBjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWYyOThjZjcwY2VkMWQwZWQxMDciLCJpbXBvcnQge2VsaW1pbmF0ZUR1cGxpY2F0ZXN9IGZyb20gJy4vX3V0aWxzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGdldFRhc2tJZCgpIHtcclxuICAgIGNvbnN0IHRhc2tJZCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoJyYnKTtcclxuXHJcbiAgICBsZXQgaWQgPSB0YXNrSWQuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0uc3BsaXQoJz0nKVswXSA9PT0gJ2lkJztcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpZFswXS5zcGxpdChcIj1cIilbMV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRhc2tIZWFkKCkge1xyXG4gICAgbGV0IHRhc2tIZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stdGl0bGUnKS50ZXh0Q29udGVudC5zcGxpdCgnIC0gJyk7XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGFza0hlYWQpICYmIHRhc2tIZWFkLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgcmV0dXJuIHsndGl0bGUnOiB0YXNrSGVhZFsxXS50cmltKCksICdzdGF0ZSc6IHRhc2tIZWFkWzJdLnNwbGl0KCcgJylbMV19O1xyXG4gICAgfVxyXG5cclxuICAgIHRocm93IG5ldyBFcnJvcigndGFzayBoZWFkIG5vdCBmb3VuZCcpO1xyXG59XHJcblxyXG4vL9C/0L7Qu9GD0YfQuNGC0Ywg0LLRgdC1INC60LDQvNC10L3RgtGLINCyINC30LDQtNCw0YfQtVxyXG4vL9GA0LDQsdC+0YLQsNC10YIg0LrQvtGA0YDQtdC60YLQvdC+INC/0L7RgdC70LUg0LfQsNC/0YPRgdC60LAgY29tbWVudHNEZXNpZ25cclxuZnVuY3Rpb24gZ2V0QWxsQ2FtbWVudHMoKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmItY29tbWVudCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb21tZW50RnJvbVJvdyhyb3cpIHtcclxuICAgIHJldHVybiByb3cucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtd3JhcCcpO1xyXG59XHJcblxyXG4vL9GA0LDQsdC+0YLQsNC10YIg0LrQvtGA0YDQtdC60YLQvdC+INC00LvRjyDQt9Cw0L/Rg9GB0LrQsCBjb21tZW50c0Rlc2lnblxyXG5mdW5jdGlvbiBnZXRBbGxDb21tZW50c1Jvd3MoKSB7XHJcbiAgICBsZXQgcm93cyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXRibCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJ1RSJykpO1xyXG4gICAgcm93cyA9IHJvd3Muc3BsaWNlKDEsIHJvd3MubGVuZ3RoKTsgLy/QuNGB0LrQu9GO0YfQuNGC0Ywg0L/QtdGA0LLRg9GOINGB0YLRgNC+0LrRgyDRgSDQt9Cw0LPQvtC70L7QstC60LDQvNC4INGB0YLQvtC70LHRhtC+0LJcclxuXHJcbiAgICByZXR1cm4gcm93cy5maWx0ZXIoZnVuY3Rpb24ocm93KSB7XHJcbiAgICAgICAgcmV0dXJuIHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpLmxlbmd0aCA+IDE7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8g0L/QvtC70YPRh9C40YLRjCDRgdC/0LjRgdC+0Log0LLRgdC10YUg0YHQvtGC0YDRg9C00L3QuNC60L7QsiDQsiDQt9Cw0LTQsNGH0LVcclxuZnVuY3Rpb24gZ2V0QWxsV29ya2VycygpIHtcclxuICAgIGxldCByb3dzID0gZ2V0QWxsQ29tbWVudHNSb3dzKCk7XHJcblxyXG4gICAgbGV0IHdvcmtlcnMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB3b3JrZXJzLnB1c2gocm93c1tpXS5jaGlsZHJlbls0XS50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGVsaW1pbmF0ZUR1cGxpY2F0ZXMod29ya2Vycyk7XHJcbn1cclxuXHJcbi8vINC/0L7Qu9GD0YfQtdC90LjQtSDRgdGC0YDQvtC60Lgg0YEg0LLRgNC10LzQvdC10Lwg0LjQtyDRgtCw0LHQu9C40YbRiyDRgSDQutC+0LzQvNC10L3RgtCw0YDQuNC80Lgg0LfQsNC00LDRh9C4XHJcbmZ1bmN0aW9uIGdldFJvd1RpbWVTdHJpbmcocm93KSB7XHJcbiAgICBsZXQgdCA9ICcnO1xyXG5cclxuICAgIGlmIChyb3cuY2hpbGRyZW5bMTBdKSB7XHJcbiAgICAgICAgLy/QtNC+INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdCA9IHJvdy5jaGlsZHJlblsxMF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgdCA9IHBhcnNlSW50KHQuc3BsaXQoJy8nKVswXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8v0L/QvtGB0LvQtSDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgIHQgPSBwYXJzZUludChyb3cucXVlcnlTZWxlY3RvcignLmVsYXBzZWQtdGltZScpLnRleHRDb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IHtnZXRUYXNrSWQsZ2V0VGFza0hlYWQsZ2V0QWxsQ2FtbWVudHMsZ2V0Q29tbWVudEZyb21Sb3csZ2V0QWxsQ29tbWVudHNSb3dzLGdldEFsbFdvcmtlcnMsZ2V0Um93VGltZVN0cmluZ307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvX2ZpbmRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbi8v0L7Qv9GA0LXQtNC10LvQtdC90LjQtSDRgdGC0YDQsNC90LjRhtGLINC/0L4gZ2V0INC/0LDRgNCw0LzQtdGC0YDRgyBhLCDQvdCw0L/RgNC40LzQtdGAID9hPXVzZXJfcGFnZVxyXG5mdW5jdGlvbiBnZXRVUkxBY3Rpb24oKSB7XHJcbiAgICBsZXQgZ2V0X2FjdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KFwiPVwiKTtcclxuICAgIGdldF9hY3Rpb24gPSBnZXRfYWN0aW9uWzFdLnNwbGl0KCcmJyk7XHJcbiAgICByZXR1cm4gZ2V0X2FjdGlvblswXTtcclxufVxyXG5cclxuLy/Rg9C00LDQu9C10L3QuNC1INC00YPQsdC70LjQutCw0YLQvtCyXHJcbmZ1bmN0aW9uIGVsaW1pbmF0ZUR1cGxpY2F0ZXMoYXJyKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc3RyID0gYXJyW2ldO1xyXG4gICAgICAgIG9ialtzdHJdID0gdHJ1ZTsgLy8g0LfQsNC/0L7QvNC90LjRgtGMINGB0YLRgNC+0LrRgyDQsiDQstC40LTQtSDRgdCy0L7QudGB0YLQstCwINC+0LHRitC10LrRgtCwXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7IC8vINC40LvQuCDRgdC+0LHRgNCw0YLRjCDQutC70Y7Rh9C4INC/0LXRgNC10LHQvtGA0L7QvCDQtNC70Y8gSUU4LVxyXG59XHJcblxyXG4vL9GB0L7Qt9C00LDQvdC40LUg0LTQsNGC0Ysg0LjQtyDRgdGC0YDQvtC60LhcclxuZnVuY3Rpb24gY3JlYXRlSVNPRGF0ZShzdHIpIHtcclxuICAgIGxldCBkYXRlX3N0ciA9IHN0ci5zcGxpdCgnLicpO1xyXG4gICAgbGV0IGRheV9zdHIgPSBkYXRlX3N0clswXTtcclxuICAgIGxldCBtb250aF9zdHIgPSBkYXRlX3N0clsxXTtcclxuICAgIGxldCB5ZWFyX3N0ciA9IGRhdGVfc3RyWzJdO1xyXG4gICAgbGV0IGRhdGVfaXNvX3N0ciA9IHllYXJfc3RyICsgJy0nICsgbW9udGhfc3RyICsgJy0nICsgZGF5X3N0cjtcclxuICAgIGRhdGVfaXNvX3N0ciA9IERhdGUucGFyc2UoZGF0ZV9pc29fc3RyKTtcclxuICAgIHJldHVybiBkYXRlX2lzb19zdHI7XHJcbn1cclxuXHJcbi8vINC/0L7Qu9GD0YfQtdC90LjQtSDRgdGC0YDQvtC60Lgg0YEg0LTQsNGC0L7QuSDQuNC3INGC0LDQsdC70LjRhtGLINGBINC60L7QvNC80LXQvdGC0LDRgNC40LzQuCDQt9Cw0LTQsNGH0LhcclxuZnVuY3Rpb24gZ2V0Um93RGF0ZVN0cmluZyhyb3cpIHtcclxuICAgIGxldCB0ID0gJyc7XHJcbiAgICBpZiAocm93LmNoaWxkcmVuWzNdKSB7XHJcbiAgICAgICAgLy/QtNC+INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdCA9IHJvdy5jaGlsZHJlblszXS50ZXh0Q29udGVudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy/Qv9C+0YHQu9C1INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdCA9IHJvdy5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1kYXRlJykudGV4dENvbnRlbnRcclxuICAgIH1cclxuXHJcbiAgICB0ID0gdC5zcGxpdCgnICcpO1xyXG5cclxuICAgIHJldHVybiBjcmVhdGVJU09EYXRlKHRbMF0pO1xyXG59XHJcblxyXG4vL9GE0L7RgNC80LDRgtC40YDQvtCy0LDQvdC40LUg0LTQsNGC0YtcclxuZnVuY3Rpb24gZGF0ZUZvcm1hdHRlcihkYXRlKSB7XHJcbiAgICBsZXQgZm9ybWF0dGVyID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJydVwiKTtcclxuICAgIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludChkYXRlLCAxMCkpO1xyXG4gICAgZGF0ZSA9IGZvcm1hdHRlci5mb3JtYXQoZGF0ZSk7XHJcbiAgICByZXR1cm4gZGF0ZTtcclxufVxyXG5cclxuLy8g0YHQutGA0YvRgtGML9C/0L7QutCw0LfQsNGC0Ywg0L7Qv9GA0LXQtNC10L3QvdGL0LUgb3B0aW9uINCyIHNlbGVjdFxyXG5mdW5jdGlvbiBtb2RpZnlTZWxlY3RPcHRpb25zTGlzdChsaXN0LCBwYXJhbXMpIHtcclxuICAgIEFycmF5LmZyb20obGlzdCkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5pbmRleE9mKGl0ZW0udmFsdWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vL9Cy0YvQt9C+0LIg0YTRg9C90LrRhtC40Lgg0L/QviDRgdC+0YfQtdGC0LDQvdC40Y4g0LrQu9Cw0LLQuNGI0YxcclxuZnVuY3Rpb24gcnVuT25LZXlzKGZ1bmMsIGVsZW0pIHtcclxuICAgIGxldCBjb2RlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcclxuXHJcbiAgICBsZXQgcHJlc3NlZCA9IHt9O1xyXG5cclxuICAgIGVsZW0ub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcblxyXG4gICAgICAgIHByZXNzZWRbZS5rZXlDb2RlXSA9IHRydWU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29kZXMubGVuZ3RoOyBpKyspIHsgLy8g0L/RgNC+0LLQtdGA0LjRgtGMLCDQstGB0LUg0LvQuCDQutC70LDQstC40YjQuCDQvdCw0LbQsNGC0YtcclxuICAgICAgICAgICAgaWYgKCFwcmVzc2VkW2NvZGVzW2ldXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDRh9GC0L7QsdGLINC40LfQsdC10LbQsNGC0YwgXCLQt9Cw0LvQuNC/0LDQvdC40Y9cIiDQutC70LDQstC40YjQuCAtLSDQvtCx0L3Rg9C70Y/QtdC8INGB0YLQsNGC0YPRgSDQstGB0LXRhSDQutC70LDQstC40YgsINC/0YPRgdGC0Ywg0L3QsNC20LjQvNCw0LXRgiDQstGB0ZEg0LfQsNC90L7QstC+XHJcbiAgICAgICAgcHJlc3NlZCA9IHt9O1xyXG5cclxuICAgICAgICBmdW5jKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW0ub25rZXl1cCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZSA9IGUgfHwgdy5ldmVudDtcclxuXHJcbiAgICAgICAgZGVsZXRlIHByZXNzZWRbZS5rZXlDb2RlXTtcclxuICAgIH07XHJcbn1cclxuXHJcbi8vYWpheCDQt9Cw0L/RgNC+0YFcclxuZnVuY3Rpb24gbG9hZEJ5QWpheChwYXRoLCBzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IoeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB4aHIub3BlbihcIkdFVFwiLCBwYXRoLCB0cnVlKTtcclxuICAgIHhoci5zZW5kKCk7XHJcbn1cclxuXHJcbi8vINGE0L7RgNC80LjRgNC+0LLQsNC90LjQtSDRgdGC0YDQvtC60Lgg0YEg0L3Rg9C20L3Ri9C8INC+0LrQvtC90YfQsNC90LjQtdC8INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDRh9C40YHQu9CwXHJcbi8vINC90LDQv9GA0LjQvNC10YAgLSDQvNC40L3Rg9GC0LAsINC80LjQvdGD0YLRiywg0LzQuNC90YPRglxyXG5mdW5jdGlvbiBkZWNsT2ZOdW0obnVtYmVyLCB0aXRsZXMpIHtcclxuICAgIGxldCBjYXNlcyA9IFsyLCAwLCAxLCAxLCAxLCAyXTtcclxuICAgIHJldHVybiB0aXRsZXNbKG51bWJlciAlIDEwMCA+IDQgJiYgbnVtYmVyICUgMTAwIDwgMjApID8gMiA6IGNhc2VzWyhudW1iZXIgJSAxMCA8IDUpID8gbnVtYmVyICUgMTAgOiA1XV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRJbkFycmF5KGFyciwgdmFsKSB7XHJcbiAgICByZXR1cm4gYXJyLmluZGV4T2YodmFsKTtcclxufVxyXG5cclxuZXhwb3J0IHtnZXRVUkxBY3Rpb24sZWxpbWluYXRlRHVwbGljYXRlcyxjcmVhdGVJU09EYXRlLGdldFJvd0RhdGVTdHJpbmcsZGF0ZUZvcm1hdHRlcixtb2RpZnlTZWxlY3RPcHRpb25zTGlzdCxydW5PbktleXMsbG9hZEJ5QWpheCxkZWNsT2ZOdW0sZmluZEluQXJyYXl9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9fdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcbmlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ3RvdGFsJyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0VVJMQWN0aW9ufSBmcm9tICcuL191dGlscy5qcyc7XHJcblxyXG5pbXBvcnQge2FkZFBhZ2VFbGVtc30gZnJvbSAnLi9fYWRkQ1NTU2VsZWN0b3JzLmpzJztcclxuXHJcbmltcG9ydCB7bW9keWZpQ29tbWVudHN9IGZyb20gJy4vbW9keWZpQ29tbWVudHMuanMnO1xyXG5cclxuLy9pbXBvcnQge2NvbW1lbnRzRGVzaWdufSBmcm9tICcuL2NvbW1lbnRzRGVzaWduLmpzJztcclxuXHJcbmltcG9ydCB7Y2FsY3VsYXRlRWxhcHNlZFRpbWV9IGZyb20gJy4vY2FsY3VsYXRlRWxhcHNlZFRpbWUuanMnO1xyXG5cclxuaW1wb3J0IHtnb1RvVGFza0RhdGFsaXN0fSBmcm9tICcuL2dvVG9UYXNrLmpzJztcclxuXHJcbmltcG9ydCB7Y291bnRXb3JrZXJUaW1lfSBmcm9tICcuL2NvdW50V29ya2VyVGltZS5qcyc7XHJcblxyXG5pbXBvcnQge3Rhc2tGb290ZXJEZXNpZ259IGZyb20gJy4vdGFza0Zvb3RlckRlc2lnbi5qcyc7XHJcblxyXG5pbXBvcnQge2VsZW1zTW9kaWZpY2F0aW9ufSBmcm9tICcuL2VsZW1zTW9kaWZpY2F0aW9uLmpzJztcclxuXHJcbmltcG9ydCB7c2F2ZU5ld0NvbW1lbnR9IGZyb20gJy4vc2F2ZU5ld0NvbW1lbnQuanMnO1xyXG5cclxuaW1wb3J0IHtjb3B5UGFzdGVDb21tZW50UXVvdGV9IGZyb20gJy4vY29weVBhc3RlQ29tbWVudFF1b3RlLmpzJztcclxuXHJcbmltcG9ydCB7dGFza1VwZGF0ZU5vdGlmeX0gZnJvbSAnLi90YXNrVXBkYXRlTm90aWZ5LmpzJztcclxuXHJcbmltcG9ydCB7YW5jaG9yTGlua30gZnJvbSAnLi9hbmNob3JMaW5rLmpzJztcclxuXHJcbmltcG9ydCB7dXNlclNldHRpbmdzfSBmcm9tICcuL3VzZXJTZXR0aW5ncy5qcyc7XHJcblxyXG4vL2ltcG9ydCB7dGFza0hlYWRlckRlc2lnbn0gZnJvbSAnLi90YXNrSGVhZGVyRGVzaWduLmpzJ1xyXG5cclxuaW1wb3J0IHtjYWxjVGltZUxlZnR9IGZyb20gJy4vY2FsY1RpbWVMZWZ0SW5EYXJ0VGFzay5qcyc7XHJcblxyXG5jb25zdCBhY3Rpb25fcGFnZSA9IGdldFVSTEFjdGlvbigpO1xyXG5cclxuc3dpdGNoIChhY3Rpb25fcGFnZSkge1xyXG4gICAgY2FzZSAnbmV3JzpcclxuICAgICAgICB1c2VyU2V0dGluZ3MoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ3JlZCc6XHJcbiAgICAgICAgYWRkUGFnZUVsZW1zKCk7XHJcbiAgICAgICAgZWxlbXNNb2RpZmljYXRpb24oKTtcclxuICAgICAgICBtb2R5ZmlDb21tZW50cygpO1xyXG5cclxuICAgICAgICBpZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICAgICAgICAgIGNvdW50V29ya2VyVGltZSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dvcmtlci10aW1lLWNvdW50JykgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICAgICAgY291bnRXb3JrZXJUaW1lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYod2luZG93LmxvY2F0aW9uLmhvc3QgPT09ICdzdXBwb3J0LmRhcnRpdC5ydScpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGNUaW1lTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzYXZlTmV3Q29tbWVudCgpO1xyXG4gICAgICAgIGNhbGN1bGF0ZUVsYXBzZWRUaW1lKCk7XHJcbiAgICAgICAgLy9jb21tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgIHRhc2tGb290ZXJEZXNpZ24oKTtcclxuICAgICAgICBjb3B5UGFzdGVDb21tZW50UXVvdGUoKTtcclxuICAgICAgICB0YXNrVXBkYXRlTm90aWZ5KCk7XHJcbiAgICAgICAgZ29Ub1Rhc2tEYXRhbGlzdCgpO1xyXG4gICAgICAgIGFuY2hvckxpbmsoKTtcclxuICAgICAgICAvL3Rhc2tIZWFkZXJEZXNpZ24oKTtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ3VzZXJfcGFnZSc6XHJcbiAgICAgICAgYWRkUGFnZUVsZW1zKCk7XHJcbiAgICAgICAgZ29Ub1Rhc2tEYXRhbGlzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG59XHJcblxyXG5pZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ3RvdGFsJyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvL9GB0Y7QtNCwINC00L7QsdCw0LvRj9GO0YLRgdGPINGN0LvQtdC80LXQvdGC0Ysg0YHRgtGA0LDQvdC40YbRiyDQsiDQutC+0YLQvtGA0YvQtSDQstGB0YLQsNCy0LvRj9GO0YLRgdGPINGB0L7Qt9C00LDQvdGL0LUg0YHQutGA0LjQv9GC0L7QvCDQsdC70L7QutC4XHJcbi8v0Lgu0LjQu9C4INC+0L3QuCDQvNC+0LTQuNGE0LjRhtC40YDRg9GO0YLRgdGPINGB0LrRgNC40L/RgtC+0LxcclxuXHJcbmltcG9ydCB7Z2V0QWxsQ29tbWVudHNSb3dzfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGFkZFBhZ2VFbGVtcygpIHtcclxuICAgIGxldCAkY29udGVudF9jZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybVtuYW1lPVwidGhlRm9ybVwiXScpO1xyXG4gICAgJGNvbnRlbnRfY2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21haW4tY29udGVudCcpO1xyXG5cclxuICAgIGxldCAkY29tbWVudHNfdGJsID0gJGNvbnRlbnRfY2VsbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlRBQkxFXCIpWzBdO1xyXG5cclxuICAgIGlmKCRjb21tZW50c190Ymwpe1xyXG4gICAgICAgICRjb21tZW50c190Ymwuc2V0QXR0cmlidXRlKCdpZCcsICdjb21tZW50cy10YmwnKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd3MgPSBnZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuXHJcbiAgICAgICAgcm93cy5tYXAoZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICByb3cucXVlcnlTZWxlY3RvckFsbCgndGQnKVs1XS5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuYWRkKCdjb21tZW50LXdyYXAnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaW5wdXRfZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmlucHV0X2JveCcpOyAvL9C10YHRgtGMINC90LAg0YHRgtGA0LDQvdC40YbQtSDQt9Cw0LTQsNGH0LhcclxuXHJcbiAgICBpZiAoaW5wdXRfZGl2KSB7XHJcbiAgICAgICAgaW5wdXRfZGl2LmlkID0gJ3Rhc2stYmFyJztcclxuICAgICAgICBsZXQgJHVzZXJfdG9vbGJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgICAgICR1c2VyX3Rvb2xiYXIuc2V0QXR0cmlidXRlKCdpZCcsICd1c2VyLXRvb2xiYXInKTtcclxuICAgICAgICAkdXNlcl90b29sYmFyLmNsYXNzTGlzdC5hZGQoJ3VzZXItdG9vbGJhcicpO1xyXG5cclxuICAgICAgICBpbnB1dF9kaXYuYXBwZW5kQ2hpbGQoJHVzZXJfdG9vbGJhcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy/Qv9C+0LTQstCw0Lsg0LfQsNC00LDRh9C4XHJcbiAgICBsZXQgJHRhc2tfZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGFibGUudGhlRm9ybScpO1xyXG5cclxuICAgIGlmKCR0YXNrX2Zvb3Rlci5sZW5ndGgpe1xyXG4gICAgICAgIC8v0L7QsdC10YDRgtC60LBcclxuICAgICAgICAkdGFza19mb290ZXIgPSAkdGFza19mb290ZXJbMF07XHJcbiAgICAgICAgJHRhc2tfZm9vdGVyLmlkID0gJ3Rhc2stZm9vdGVyJztcclxuXHJcbiAgICAgICAgLy/RgtCw0LHQu9C40YbQsCDRgSB0ZXh0YXJlYSDQutCw0LzQtdC90YLQsFxyXG4gICAgICAgIGxldCAkZm9vdGVyX3RibHMgPSAkdGFza19mb290ZXIucXVlcnlTZWxlY3RvckFsbCgndGFibGUnKTtcclxuXHJcbiAgICAgICAgbGV0ICRjb21tZW50VGJsID0gJGZvb3Rlcl90YmxzWzBdO1xyXG4gICAgICAgICRjb21tZW50VGJsLmlkID0gJ3RibC1uZXctY29tbWVudCc7XHJcblxyXG4gICAgICAgIC8v0L7QsdC10YDRgtC60LAg0Y/Rh9C10LnQutC4INGBIHRleHRhcmVhXHJcbiAgICAgICAgbGV0ICRuZXdDb21tZW50ID0gJGNvbW1lbnRUYmwucXVlcnlTZWxlY3RvckFsbCgndGQnKVsxXTtcclxuICAgICAgICAkbmV3Q29tbWVudC5pZCA9ICduZXctY29tbWVudC13cmFwJztcclxuXHJcbiAgICAgICAgLy/QtNC+0LHQsNCy0LvRjiDQvtCx0LXRgNGC0LrRgyDQtNC70Y8gdGV4dGFyZWFcclxuICAgICAgICAvL9CyINC90LXQtSDQsdGD0LTRgyDQstGB0YLQsNCy0LvRj9GC0Ywg0LrQvdC+0L/QutC4INCy0YHRj9C60LjQtVxyXG4gICAgICAgIGxldCAkdGFyZWFXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgJHRhcmVhV3JhcC5pZCA9ICd0YXJlYS13cmFwJztcclxuICAgICAgICAkdGFyZWFXcmFwLmNsYXNzTGlzdC5hZGQoJ3RhcmVhLXdyYXAnKTtcclxuXHJcbiAgICAgICAgJHRhcmVhV3JhcC5hcHBlbmRDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dCcpKTtcclxuICAgICAgICAkbmV3Q29tbWVudC5hcHBlbmRDaGlsZCgkdGFyZWFXcmFwKTtcclxuXHJcbiAgICAgICAgLy/QotCw0LHQu9C40YbQsCDRgdGC0LDRgtGD0YHQvtCyINC30LDQtNCw0YfQuFxyXG4gICAgICAgIGxldCAkc3RhdHVzVGJsID0gJGZvb3Rlcl90YmxzWzFdLnF1ZXJ5U2VsZWN0b3IoJ3RhYmxlJyk7XHJcbiAgICAgICAgJHN0YXR1c1RibC5pZCA9ICd0Ymwtc3RhdHVzJztcclxuICAgIH1cclxuICAgIC8v0LfQsNCz0L7Qu9C+0LLQvtC6INC30LDQtNCw0YfQuFxyXG4gICAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxJyk7XHJcblxyXG4gICAgdGFza1RpdGxlLmlkID0gJ3Rhc2stdGl0bGUnO1xyXG59XHJcblxyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vcGNzcy91c2Vyc2NyaXB0LnBjc3MnO1xyXG5cclxuZXhwb3J0IHthZGRQYWdlRWxlbXN9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL19hZGRDU1NTZWxlY3RvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdXNlcnNjcmlwdC5wY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3VzZXJzY3JpcHQucGNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi91c2Vyc2NyaXB0LnBjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qcmVzZXQgc3R5bGUuY3NzKi86cm9vdCAuaW5wdXRfYm94IGJ1dHRvbiw6cm9vdCAuaW5wdXRfYm94IGlucHV0e21hcmdpbi1sZWZ0OjB9XFxyXFxuXFxyXFxuLypyZXNldCBzdHlsZS5jc3MqLyNtYWluLWNvbnRlbnR7XFxyXFxuICAgIC8q0YPQsdC40YDQsNGOINC70LjRiNC90LjQtSDQvtGC0YHRgtGD0L/RiyDQuCBiciDRh9GC0L7QsdGLINGD0LzQtdC90YzRiNC40YLRjCDQtNGL0YDRgyDQv9C+0LQg0L/QvtC70Y/QvNC4INC60LDQvNC10L3RgtCwKi9tYXJnaW4tYm90dG9tOjB9I21haW4tY29udGVudCBicjpsYXN0LWNoaWxke2Rpc3BsYXk6bm9uZX0ub25vZmYtb3B0e21hcmdpbjowIDZweCAwIDEwcHh9Lm5vbmV7ZGlzcGxheTpub25lIWltcG9ydGFudH0uaGlkZGVuLWVsZW17cG9zaXRpb246Zml4ZWQhaW1wb3J0YW50O2xlZnQ6LTk5OWVtO3otaW5kZXg6LTE7dmlzaWJpbGl0eTpoaWRkZW59Lm5vbmUudmlld3tkaXNwbGF5OmJsb2NrIWltcG9ydGFudH0uY2hfYWRkcnttYXJnaW46MTBweCAxMHB4IDEwcHggMDt2ZXJ0aWNhbC1hbGlnbjp0b3B9LnRvdG9wPmlucHV0e21hcmdpbjoxMHB4IDAgMH0ubGFiZWxfaGVhZHtkaXNwbGF5OmJsb2NrO21hcmdpbjowIDAgMjBweH0uY2xlYXJmaXg6YWZ0ZXIsLmNsZWFyZml4OmJlZm9yZXtjb250ZW50OlxcXCJcXFwiO2Rpc3BsYXk6dGFibGU7Y2xlYXI6Ym90aH0uYWxpc3R7ZmxvYXQ6cmlnaHR9LmFsaXN0IHB7bWFyZ2luOjAgMCAxMHB4O2xpbmUtaGVpZ2h0OjE7dGV4dC1hbGlnbjpyaWdodH0uYmFyLXdyYXB7cGFkZGluZzo4cHggMTVweDtiYWNrZ3JvdW5kOiMyZDJkMmR9I2N1c3RvbS1wcm9qZWN0LWxpc3Q+bGksI2N1c3RvbS13b3JrZXJzLWxpc3Q+bGl7d2lkdGg6MjAlO2Zsb2F0OmxlZnQ7Y3Vyc29yOnBvaW50ZXJ9I2N1c3RvbS1wcm9qZWN0LWxpc3Q+bGk6Zmlyc3QtY2hpbGR7ZGlzcGxheTpub25lfS51c2VyLWxpc3R7bWFyZ2luOjJlbSAxZW07cGFkZGluZzowO2xpc3Qtc3R5bGUtcG9zaXRpb246aW5zaWRlfS51c2VyLWxpc3Q+bGl7bGluZS1oZWlnaHQ6MS41fS5zZWxlY3RlZHtjb2xvcjpncmVlbn0uYnRuLWZsYXR7cGFkZGluZzouNWVtO2JhY2tncm91bmQ6I2YwZjBmMDtjdXJzb3I6cG9pbnRlcn0uYnRuLWZsYXQsLnJvdy1pdGVte2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5yb3ctaXRlbXt2ZXJ0aWNhbC1hbGlnbjp0b3B9LnJvdy1pdGVtOm5vdCg6bGFzdC1jaGlsZCl7bWFyZ2luLXJpZ2h0OjFlbX0jc2V0dGluZ3MtYnRue21hcmdpbjowIDAgMjBweH0jc2V0dGluZ3MtYm94e2Rpc3BsYXk6bm9uZTttYXJnaW46MjBweCAwO3BhZGRpbmc6MjBweCAwO291dGxpbmU6MXB4IHNvbGlkICM0MTQxNDF9I3NldHRpbmdzLWJveC5pcy1vcGVue2Rpc3BsYXk6YmxvY2t9LnVzZXItdGl0bGV7Y29sb3I6IzAwMDttYXJnaW46MCAwIC42ZW07Zm9udC1zaXplOjIwcHg7cGFkZGluZzowfS5yZWd1bGFyLWxpbmt7Y29sb3I6IzAwNTRiOTtvdXRsaW5lOjAhaW1wb3J0YW50fS50aW1lLWxpc3QgcHttYXJnaW46NXB4IDA7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtcGFjazpqdXN0aWZ5O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS50aW1lLWxpc3Q+cD5zcGFuOmZpcnN0LWNoaWxke3BhZGRpbmctcmlnaHQ6MWVtO2N1cnNvcjpwb2ludGVyfTpyb290IC50aW1lLWxpc3QtdG90YWx7bWFyZ2luLXRvcDoxZW07Ym9yZGVyLXRvcDoxcHggc29saWR9LmNvbW1lbnQtY29sbGFwc2Vke21heC1oZWlnaHQ6NzBweDtvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50fS5sb25nLWNvbW1lbnR7d2lkdGg6MTAwJSFpbXBvcnRhbnQ7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy10b3A6MzBweH0uYnRuLWNvbGxhcHNle3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjB9LmJ0bi1jb2xsYXBzZS1hbGx7cG9zaXRpb246Zml4ZWQ7dG9wOjEwcHg7cmlnaHQ6MTBweH06cm9vdCAuZGF0ZXMtbGlzdHt3aWR0aDoxNTBweDtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46MCAyMHB4IDAgMH0udXNlci10b29sYmFye21hcmdpbjoyMHB4IDA7cGFkZGluZzoyMHB4IDEwcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgcmdiYSgwLDAsMCwuNyk7b3ZlcmZsb3c6aGlkZGVuO2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy1tcy1mbGV4LXdyYXA6d3JhcDtmbGV4LXdyYXA6d3JhcH0udXNlci10b29sYmFyX19pdGVte3BhZGRpbmc6MTBweCAxNXB4O2JhY2tncm91bmQ6aHNsYSgwLDAlLDEwMCUsLjYpO2JveC1zaGFkb3c6MCAxcHggMXB4IHJnYmEoMCwwLDAsLjYpfTpyb290IC51c2VyLXRvb2xiYXItdGl0bGV7bWFyZ2luOjAgMCAxZW07cGFkZGluZzowO2NvbG9yOiMwMDB9OnJvb3QgI2NvbW1lbnRzLXRibCAuY29tbWVudC13cmFwe2ZvbnQtc2l6ZToxNHB4O3dpZHRoOjEwMCUhaW1wb3J0YW50O21heC13aWR0aDo4MDBweDtvdmVyZmxvdzpoaWRkZW59OnJvb3QgI2NvbW1lbnRzLXRibCBoMXtmb250LXNpemU6MTIwJTtmb250LXdlaWdodDo0MDA7bWFyZ2luOjAgMCAuNGVtO2NvbG9yOmluaGVyaXR9OnJvb3QgI2NvbW1lbnRzLXRibCBibG9ja3F1b3Rle3BhZGRpbmc6MTBweCAyMHB4O21hcmdpbjowIDAgMjBweDtib3JkZXItbGVmdDo1cHggc29saWQgI2NjY306cm9vdCAjY29tbWVudHMtdGJsIGJsb2NrcXVvdGUgcHttYXJnaW46MH06cm9vdCAjY29tbWVudHMtdGJsIGJsb2NrcXVvdGUgcDpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1ib3R0b206MWVtfTpyb290ICNjb21tZW50cy10YmwgdWx7cGFkZGluZy1sZWZ0Oi42ZW07bGlzdC1zdHlsZS1wb3NpdGlvbjppbnNpZGV9XFxyXFxuXFxyXFxuLyp0eXBvKi8uc2VjdGlvbi10aXRsZXtjb2xvcjppbmhlcml0O21hcmdpbjowIDAgMWVtO3BhZGRpbmc6MCFpbXBvcnRhbnR9LnMtaW5mb3tjb2xvcjpncmF5O2ZvbnQtc2l6ZToxMnB4fVxcclxcblxcclxcbi8q0LLRgdGC0LDQstC60LAg0YLQtdC60YHRgtCwINC40LcgbG9jYWwgc3RvcmFnZSovLmJ0bi1pbnNlcnQtbHN7cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwMCU7cmlnaHQ6MmVtO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zc30uYnRuLWluc2VydC1scy5pcy12aXNpYmxle3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xNTAlKX1cXHJcXG5cXHJcXG4vKlxcclxcbiAgICDQtNC+0LHQsNCy0LvQtdC90LjQtSDQuNC60L7QvdC60Lgg0L/QvtC00L/QuNGB0LrQuCDQvdCwINGD0LLQtdC00L7QvNC70LXQvdC40LUg0L4g0L3QvtCy0YvRhSDQutCw0LzQtdC90YLQsNGFXFxyXFxuICAgINCyINC30LDQs9C+0LvQvtCy0L7QuiDQt9Cw0LTQsNGH0LhcXHJcXG4qLy5hZGQtYWxlcnR7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtkaXNwbGF5OmlubGluZS1ibG9jaztiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUJtYVd4c1BTSWpNREF3TURBd0lpQm9aV2xuYUhROUlqSTBJaUIyYVdWM1FtOTRQU0l3SURBZ01qUWdNalFpSUhkcFpIUm9QU0l5TkNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWo0Z0lDQWdQSEJoZEdnZ1pEMGlUVEFnTUdneU5IWXlORWd3VmpCNklpQm1hV3hzUFNKdWIyNWxJaTgrSUNBZ0lEeHdZWFJvSUdROUlrMHhNQzR3TVNBeU1TNHdNV013SURFdU1TNDRPU0F4TGprNUlERXVPVGtnTVM0NU9YTXhMams1TFM0NE9TQXhMams1TFRFdU9UbG9MVE11T1RoNmJUZ3VPRGN0TkM0eE9WWXhNV013TFRNdU1qVXRNaTR5TlMwMUxqazNMVFV1TWprdE5pNDJPWFl0TGpjeVF6RXpMalU1SURJdU56RWdNVEl1T0RnZ01pQXhNaUF5Y3kweExqVTVMamN4TFRFdU5Ua2dNUzQxT1hZdU56SkROeTR6TnlBMUxqQXpJRFV1TVRJZ055NDNOU0ExTGpFeUlERXhkalV1T0RKTU15QXhPQzQ1TkZZeU1HZ3hPSFl0TVM0d05td3RNaTR4TWkweUxqRXllazB4TmlBeE15NHdNV2d0TTNZemFDMHlkaTB6U0RoV01URm9NMVk0YURKMk0yZ3pkakl1TURGNklpOCtQQzl6ZG1jKyk7Y3Vyc29yOnBvaW50ZXJ9I3Rhc2stdGl0bGUgLmFkZC1hbGVydHt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7b3BhY2l0eTouNX0jdGFzay10aXRsZSAuYWRkLWFsZXJ0LnNlbGVjdGVke29wYWNpdHk6MX0jdGV4dHtyZXNpemU6dmVydGljYWx9XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj97XCJpbXBvcnRMb2FkZXJzXCI6MX0hLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliIS4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIG1vZHlmaUNvbW1lbnRzJyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0Q29tbWVudEZyb21Sb3csZ2V0QWxsQ29tbWVudHNSb3dzfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuaW1wb3J0IHthZGRqc30gZnJvbSAnLi9fbG9hZGVycy5qcyc7XHJcbmltcG9ydCB7Y29tbWVudHNEZXNpZ259IGZyb20gJy4vY29tbWVudHNEZXNpZ24uanMnO1xyXG5cclxuLy/Qv9C+0LjRgdC6INGB0YHRi9C70L7QuiDQsiDRgtC10LrRgdGC0LUg0LrQvtC80LzQtdC90YLQsNGA0LjQtdCyINC4INC+0LHQvtGA0LDRh9C40LLQsNC90LjQtSDQuNGFINCyIDxhPlxyXG4vL9GB0LLQvtGA0LDRh9C40LLQsNC90LjQtSDQtNC70LjQvdC90YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNC10LIsINC00L7QsdCw0LLQu9C10L3QuNC1INC60L3QvtC/0LrQuCDQodCy0YDQtdC90YPRgtGMLtGA0LDQt9Cy0LXRgNC90YPRgtGMINCy0YHQtVxyXG5cclxuZnVuY3Rpb24gbW9keWZpQ29tbWVudHMoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG5cclxuICAgIGxldCByb3dzID0gZ2V0QWxsQ29tbWVudHNSb3dzKCk7XHJcblxyXG4gICAgYWRkanMoJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL21hcmtkb3duLWl0LzguMy4xL21hcmtkb3duLWl0Lm1pbi5qcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnb01hcmtkb3duKHJvd3MpO1xyXG4gICAgICAgIGNvbW1lbnRzRGVzaWduKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL9C/0LDRgNGB0LXRgCBtYXJrZG93blxyXG5cclxuICAgIGZ1bmN0aW9uIGdvTWFya2Rvd24ocm93cykge1xyXG5cclxuICAgICAgICBsZXQgbWQgPSBtYXJrZG93bml0KCk7XHJcbiAgICAgICAgbWQub3B0aW9ucy5odG1sID0gdHJ1ZTtcclxuICAgICAgICBtZC5vcHRpb25zLmxpbmtpZnkgPSB0cnVlO1xyXG4gICAgICAgIG1kLm9wdGlvbnMudHlwb2dyYXBoZXIgPSB0cnVlO1xyXG4gICAgICAgIG1kLm9wdGlvbnMuYnJlYWtzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcm93cy5tYXAoZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICBhZGRNYXJrZG93bihyb3csIG1kKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkTWFya2Rvd24ocm93LCBtZCkge1xyXG4gICAgICAgICAgICBsZXQgY29tbWVudCA9IGdldENvbW1lbnRGcm9tUm93KHJvdyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgYmxvY2tzID0gY29tbWVudC5pbm5lckhUTUwuc3BsaXQoJzxicj48YnI+Jyk7XHJcblxyXG4gICAgICAgICAgICBibG9ja3MgPSBibG9ja3MubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbmRleE9mKCc8YnI+JykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnNwbGl0KCc8YnI+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubWFwKGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ci50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBjb25jYXRFbGVtc1RvU3RyaW5nKGl0ZW0sICcqJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGNvbmNhdEVsZW1zVG9TdHJpbmcoaXRlbSwgJyYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubWFwKGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlck1kU3RyaW5nKHN0ciwgbWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gcmVwbGFjZUh0bWxHdFRvU3ltYm9sKGl0ZW0udHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gcmVuZGVyTWRTdHJpbmcoaXRlbSwgbWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAnPHA+JyArIGl0ZW0gKyAnPC9wPic7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29tbWVudC5pbm5lckhUTUwgPSByZXBsYWNlVVJMV2l0aEhUTUxMaW5rcyhibG9ja3Muam9pbignJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVuZGVyTWRTdHJpbmcoc3RyLCBtZCkge1xyXG4gICAgICAgICAgICBsZXQgbWRjID0gWycjJywgJyonLCAnLScsICc+J107XHJcblxyXG4gICAgICAgICAgICBpZiAobWRjLmluZGV4T2Yoc3RyLmNoYXJBdCgwKSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgc3RyID0gbWQucmVuZGVyKHN0cik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLysnPGJyPicg0L3Rg9C20L3QviDRh9GC0L7QsdGLINCx0YvQu9C+INC/0L7RhdC+0LbQtSDQvdCwINC40YHRhdC+0LTQvdC+0LUg0YTQvtGA0LzQsNGC0LjRgNC+0LLQsNC90LjQtVxyXG4gICAgICAgICAgICAgICAgc3RyID0gc3RyICsgJzxicj4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL9C/0L7QuNGB0Log0Lgg0L7QsdGK0LXQtNC40L3QtdC90LjQtSDQsiDQvtC00L3RgyDRgdGC0YDQvtC60YMg0Y3Qu9C10LzQtdC90YLQvtCyINC80LDRgdGB0LjQstCwXHJcbiAgICAvL9C90LDRh9C40L3QsNGO0YnQuNGF0YHRjyDRgSDRgdC40LzQstC+0LvQsCAqXHJcbiAgICAvL9C00LvRjyDRgdC+0LfQtNCw0L3QuNGPINGB0L/QuNGB0LrQsCB1bD5saSDQsiBtYXJrZG93blxyXG4gICAgZnVuY3Rpb24gY29uY2F0RWxlbXNUb1N0cmluZyhhcnIsIHN5bWJvbCkge1xyXG4gICAgICAgIGxldCBuZXh0O1xyXG4gICAgICAgIGxldCBzdHJpbmdzID0gW107XHJcbiAgICAgICAgbGV0IG5ld2xpc3QgPSAnJztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbmV4dCA9IGkgKyAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFycltpXS5jaGFyQXQoMCkgPT09IHN5bWJvbCAmJiBhcnJbbmV4dF0gJiYgYXJyW25leHRdLmNoYXJBdCgwKSA9PT0gc3ltYm9sKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdsaXN0ICs9IHByZWZvcm1hdFN0cmluZyhhcnJbaV0sIHN5bWJvbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWFycltuZXh0XSB8fCBhcnJbbmV4dF0uY2hhckF0KDApICE9PSBzeW1ib2wpIHtcclxuICAgICAgICAgICAgICAgIG5ld2xpc3QgKz0gcHJlZm9ybWF0U3RyaW5nKGFycltpXSwgc3ltYm9sKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaChuZXdsaXN0KTtcclxuICAgICAgICAgICAgICAgIG5ld2xpc3QgPSAnJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZ3MucHVzaChhcnJbaV0pO1xyXG4gICAgICAgICAgICAgICAgLy8gc3RyaW5ncy5wdXNoKHByZWZvcm1hdFN0cmluZyhhcnJbaV0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy/QvtCx0YDQsNCx0L7RgtC60LAg0YHRgtGA0L7QuiDQv9C10YDQtdC0INGE0L7RgNC80LDRgtC40YDQvtCy0LDQvdC40LXQvCDQsiBtYXJrZG93blxyXG4gICAgZnVuY3Rpb24gcmVwbGFjZUh0bWxHdFRvU3ltYm9sKHRleHQpIHtcclxuICAgICAgICBsZXQgZmluZCA9ICcmZ3Q7JztcclxuICAgICAgICBsZXQgcmUgPSBuZXcgUmVnRXhwKGZpbmQsICdnJyk7XHJcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShyZSwgJz4nKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcmVmb3JtYXRTdHJpbmcoc3RyLCBzeW1ib2wgPSAnfCcpIHtcclxuXHJcbiAgICAgICAgbGV0IHNwYWNlID0gJyc7XHJcbiAgICAgICAgLy/QtNC70Y8g0YHQv9C40YHQutCwINC90LDQtNC+INGBINC90L7QstC+0Lkg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgc3dpdGNoIChzeW1ib2wpIHtcclxuICAgICAgICAgICAgY2FzZSAnKic6XHJcbiAgICAgICAgICAgICAgICBzcGFjZSA9ICdcXG4nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8v0LAg0LIg0YbQuNGC0LDRgtC1IC0g0LIg0L7QtNC90YMg0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIGNhc2UgJyYnOlxyXG4gICAgICAgICAgICAgICAgc3BhY2UgPSAnICc7XHJcbiAgICAgICAgICAgICAgICBzdHIgPSByZXBsYWNlSHRtbEd0VG9TeW1ib2woc3RyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygoc3RyLm1hdGNoKC9cXG4vZyl8fFtdKS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgLy9zdHIgPSBzdHIucmVwbGFjZSgvXFxuL2csICc8YnI+Jyk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHN0cik7XHJcbiAgICAgICAgICAgICAgICBzdHIgPSAnPHA+JyArIHN0ciArICc8L3A+J1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0ciArIHNwYWNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlcGxhY2VVUkxXaXRoSFRNTExpbmtzKHRleHQpIHtcclxuICAgICAgICBjb25zdCBleHAgPSAvKFxcYihodHRwcz98ZnRwfGZpbGUpOlxcL1xcL1stQS1aMC05KyZAI1xcLyU/PX5ffCE6LC47XSpbLUEtWjAtOSsmQCNcXC8lPX5ffF0pL2lnO1xyXG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoZXhwLCAnPGEgaHJlZj1cIiQxXCIgY2xhc3M9XCJyZWd1bGFyLWxpbmtcIj4kMTwvYT4nKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHttb2R5ZmlDb21tZW50c307XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBtb2R5ZmlDb21tZW50cycpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vZHlmaUNvbW1lbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8v0L/QvtC00LrQu9GO0YfQtdC90LjQtSDRgdGC0YDQvtC90L3QtdCz0L4ganMg0LIgaGVhZFxyXG5leHBvcnQgZnVuY3Rpb24gYWRkanModXJsLCBjYWxsYmFjaywgcGFyYW1zKSB7XHJcbiAgICBsZXQgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblxyXG4gICAgbGV0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHJcbiAgICBzLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzLnNyYyA9IHVybDtcclxuXHJcbiAgICBpZihwYXJhbXMpe1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHMuc2V0QXR0cmlidXRlKGtleSxwYXJhbXNba2V5XSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBoZWFkLmFwcGVuZENoaWxkKHMpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvX2xvYWRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKXtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCBjb21tZW50c0Rlc2lnbicpO1xyXG59XHJcblxyXG5pbXBvcnQge2dldEFsbENvbW1lbnRzUm93c30gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcblxyXG5mdW5jdGlvbiBjb21tZW50c0Rlc2lnbigpIHtcclxuICAgIC8v0L/QtdGA0LXQtNC10LvQutCwINCy0L3QtdGI0L3QtdCz0L4g0LLQuNC00LAg0LrQsNC80LXQvdGC0L7QslxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGNyZWF0ZVRlbXBsYXRlKCk7XHJcblxyXG4gICAgbGV0IHRibCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy10YmwnKTtcclxuXHJcbiAgICBsZXQgcm93cyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG5cclxuICAgIC8vcm93c1swXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJvd3NbMF0ucHJldmlvdXNFbGVtZW50U2libGluZyk7XHJcbiAgICAvL9GB0LrRgNGL0LLQsNGOLCDQsCDQvdC1INGD0LTQsNC70Y/RjiDRh9GC0L7QsdGLINC90LUg0LzQtdC90Y/RgtGMINGD0LbQtSDQuNGB0L/QvtC70YzQt9GD0LXQvNGL0LUg0YTRg9C90LrRhtC40LhcclxuICAgIC8v0LLRi9Cx0LjRgNCw0Y7RidC40LUg0YHRgtGA0L7QutC4INGBINC60LDQvNC10L3RgtCw0LzQuCDQuCDQuNCz0L3QvtGA0LjRgNGD0Y7RidC40LUg0L/QtdGA0LLRg9GOINGB0YLRgNC+0LrRgy5cclxuICAgIC8v0JXRgdC70Lgg0YPQtNCw0LvRj9GC0Ywg0YLQviDQv9C+0LvRg9GH0LjRgtGB0Y8g0YfRgtC+INC/0LXRgNCy0YvQuSDQutCw0LzQtdC90YIg0L3QtSDQsdGD0LTQtdGCINC+0LHRgNCw0LHQsNGC0YvQstCw0YLRjNGB0Y9cclxuICAgIHJvd3NbMF0ucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4tZWxlbScpO1xyXG4gICAgLy/Rgi7Qui4g0LIg0LTQsNGA0YLQtSDQtNC+0LHQsNCy0LjQu9C4INGB0YLRgNC+0Log0L/RgNC10LTRi9C00YPRidCw0Y8g0YHRgtGA0L7QutCwINC90LUg0YHQutGA0YvQstCw0LXRgiDRgdGC0YDQvtC60YMg0YEg0LfQsNCz0L7Qu9C+0LLQutCw0LzQuCDRgdGC0L7Qu9Cx0YbQvtCyXHJcbiAgICAvL9C/0L7RjdGC0L7QvNGDINC10YnQtVxyXG4gICAgdGJsLnF1ZXJ5U2VsZWN0b3IoJ3RyJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLWVsZW0nKTtcclxuXHJcbiAgICByb3dzLm1hcChmdW5jdGlvbiAoaXRlbSwgaSkge1xyXG4gICAgICAgIGxldCB0ZCA9IEFycmF5LmZyb20oaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpKTtcclxuXHJcbiAgICAgICAgbGV0IGJsb2NrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtdGVtcGxhdGUnKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgYmxvY2sucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xyXG5cclxuICAgICAgICBpdGVtLmFwcGVuZENoaWxkKGJsb2NrKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd3MgPSBibG9jay5xdWVyeVNlbGVjdG9yQWxsKCcuYi1jb21tZW50X19yb3cnKTtcclxuXHJcbiAgICAgICAgbGV0IHJvdzEgPSBjcmVhdGUxcm93KHRkLCBpKTtcclxuICAgICAgICByb3dzWzBdLmFwcGVuZENoaWxkKHJvdzEpO1xyXG5cclxuICAgICAgICByb3dzWzFdLmFwcGVuZENoaWxkKGNyZWF0ZTJyb3codGQpKTtcclxuICAgICAgICByb3dzWzJdLmFwcGVuZENoaWxkKGNyZWF0ZTNyb3codGQpKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbGVzID0gY3JlYXRlNHJvdyh0ZCk7XHJcblxyXG4gICAgICAgIGlmICghIWZpbGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgcGljcyA9IFsncG5nJywgJ2pwZycsICdnaWYnXTtcclxuXHJcbiAgICAgICAgICAgIGZpbGVzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4dCA9IGl0ZW0uaHJlZi5sYXN0SW5kZXhPZignLicpO1xyXG4gICAgICAgICAgICAgICAgZXh0ID0gaXRlbS5ocmVmLnNsaWNlKGV4dCArIDEsIGl0ZW0uaHJlZi5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwaWNzLmluZGV4T2YoZXh0LnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gY3JlYXRlSW1nVGh1bWIoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVEb2NzVGh1bWIoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcm93c1szXS5hcHBlbmRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcm93c1szXS5jbGFzc0xpc3QuYWRkKCdub25lJyk7XHJcbiAgICAgICAgICAgIC8vYmxvY2sucmVtb3ZlQ2hpbGQocm93c1szXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2PRgtGA0L7QutCwINGB0LrRgNGL0YLQsFxyXG4gICAgICAgIC8vcm93c1s0XS5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAvL3Jvd3NbNF0uYXBwZW5kQ2hpbGQoY3JlYXRlNXJvdyh0ZCkpO1xyXG5cclxuICAgICAgICAvL9GB0YLQsNC90L7QstC40YLRgdGPINCy0LjQtNC40LzQvtC5INC/0YDQuCDQvdCw0LLQtdC00LXQvdC40Lgg0LrRg9GA0YHQvtGA0LAg0L3QsCDQutCw0YDRgtC+0YfQutGDINC60LDQvNC10L3RgtCwXHJcbiAgICAgICAgYmxvY2suYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2hvd0FjdGlvbnNCdG4odGhpcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNob3dBY3Rpb25zQnRuKHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL9Cy0LzQtdGB0YLQviDRg9C00LDQu9C10L3QuNGPINC40LcgRE9NINC40LvQuCDQvdCw0LLQtdGI0LjQstCw0L3QuNGPINC60LvQsNGB0YHQsCDQvdCwINC60LDQttC00YvQuSB0ZFxyXG4gICAgICAgIC8v0LLQtdGI0LDRjiDQutC70LDRgdGBINC90LAg0YLQsNCx0LvQuNGG0YMg0L/QvtGB0LvQtSDQvtCx0YDQsNCx0L7RgtC60Lgg0LLRgdC10YUg0YHRgtGA0L7QulxyXG4gICAgICAgIC8qdGQubWFwKGZ1bmN0aW9uICh0ZGl0ZW0pIHtcclxuICAgICAgICAgICAgLy90ZGl0ZW0uY2xhc3NMaXN0LmFkZCgnbm9uZScpO1xyXG4gICAgICAgICAgICBpZiAodGRpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNoaWxkKHRkaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTsqL1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy/QvdCw0YHQu9C10LTRg9GP0YHRjCDQvtGCINGN0YLQvtCz0L4g0LrQu9Cw0YHRgdCwINGB0LrRgNGL0LLQsNGOIHRkINCyINGB0YLRgNC+0LrQsNGFINGC0LDQsdC70LjRhtGLXHJcbiAgICAvL9C/0L7RgdC70LUg0YHQvtC30LTQsNC90LjRjyDQutCw0YDRgtC+0YfQtdC6INC60LDQvNC10L3RgtC+0LJcclxuICAgIHRibC5jbGFzc0xpc3QuYWRkKCdoaWRlLW9yaWdpbmFsJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlMXJvdyh0ZCwgcm93bnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgICAgICBsZXQgcm93SXRlbVByb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIGxldCByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgLy/QtNCw0YLQsFxyXG4gICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnY29tbWVudC1kYXRlJyk7XHJcbiAgICAgICAgcm93SXRlbS5pZCA9ICdjb21tZW50LWRhdGUnO1xyXG4gICAgICAgIHJvd0l0ZW0uaW5uZXJIVE1MID0gdGRbM10udGV4dENvbnRlbnQ7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICAvL2lkIGNoZWNrYm94XHJcbiAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh0ZFswXS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdpZC1jaGVja2JveCcpO1xyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICAvL9C/0YDQuNC+0YDQuNGC0LXRgiDQuCDRgdGA0L7QuiDQuNGB0L/QvtC70L3QtdC90LjRj1xyXG4gICAgICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1yYW5rJyk7XHJcblxyXG4gICAgICAgIHJvd0l0ZW0uaW5uZXJIVE1MID0gdGRbOF0udGV4dENvbnRlbnQgKyAnINC/0YDQuNC+0YDQuNGC0LXRgic7XHJcblxyXG4gICAgICAgIGxldCBkZWFkbGluZSA9IHRkWzddLnRleHRDb250ZW50O1xyXG5cclxuICAgICAgICBpZiAoZGVhZGxpbmUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICByb3dJdGVtLmlubmVySFRNTCA9IHJvd0l0ZW0uaW5uZXJIVE1MICsgJy48YiBjbGFzcz1cImRlYWRsaW5lLWRhdGVcIj7QodC00LDRgtGMICcgKyBkZWFkbGluZSArICc8L2I+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICAvL9C/0LjRgdGM0LzQsCzRgdGB0YvQu9C60LAs0YHRgtCw0YLRg9GBXHJcbiAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdyb3ctcmlnaHQnKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXR1cyA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gdGRbOV0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgc3RhdHVzLmNsYXNzTGlzdC5hZGQoJ3Rhc2stc3RhdHVzJyk7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZChzdGF0dXMpO1xyXG5cclxuICAgICAgICBsZXQgbGV0dGVyID0gdGRbMV0ucXVlcnlTZWxlY3RvckFsbCgnaW1nJylbMV07XHJcbiAgICAgICAgbGV0dGVyLmNsYXNzTGlzdC5hZGQoJ2xldHRlci1hZGRyJyk7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZChsZXR0ZXIpO1xyXG5cclxuICAgICAgICBsZXQgbGluayA9IHRkWzFdLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKVsxXTtcclxuICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtbGluaycpO1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG4gICAgICAgIC8v0L3QvtC80LXRgCDQutC+0LzQvNC10L3RgtCw0YDQuNGPXHJcbiAgICAgICAgbGV0IG5vID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICBuby5jbGFzc0xpc3QuYWRkKCdjb21tZW50LW5vJyk7XHJcbiAgICAgICAgbm8uaW5uZXJIVE1MID0gcm93bnVtYmVyO1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQobm8pO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZTJyb3codGQpIHtcclxuICAgICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgICAgIGxldCByb3dJdGVtUHJvdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnY29tbWVudC1pbmZvJyk7XHJcblxyXG4gICAgICAgIC8v0LDQstGC0L7RgFxyXG4gICAgICAgIGxldCBhdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgYXV0aG9yLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtYXV0aG9yJyk7XHJcbiAgICAgICAgLy9hdXRob3IuaW5uZXJIVE1MID0gJ9CQ0LLRgtC+0YAgPGJyPicgKyB0ZFs0XS50ZXh0Q29udGVudDtcclxuICAgICAgICBhdXRob3IuaW5uZXJIVE1MID0gdGRbNF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZChhdXRob3IpO1xyXG5cclxuICAgICAgICAvL9C40YHQv9C+0LvQvdC40YLQtdC70YxcclxuICAgICAgICBsZXQgd29ya2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHdvcmtlci5jbGFzc0xpc3QuYWRkKCdjb21tZW50LXdvcmtlcicpO1xyXG4gICAgICAgIC8vd29ya2VyLmlubmVySFRNTCA9ICfQmNGB0L/QvtC70L3QuNGC0LXQu9GMIDxicj4nICsgdGRbNl0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgd29ya2VyLmlubmVySFRNTCA9IHRkWzZdLnRleHRDb250ZW50O1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQod29ya2VyKTtcclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIGxldCB3b3JrVGltZSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgd29ya1RpbWUuY2xhc3NMaXN0LmFkZCgnd29yay10aW1lJyk7XHJcblxyXG4gICAgICAgIGxldCB0aW1lU3RyID0gdGRbMTBdLnRleHRDb250ZW50LnNwbGl0KCcvJyk7XHJcblxyXG4gICAgICAgIC8qdGltZVN0clswXSA9IGNyZWF0ZVRpbWVUaXRsZVN0cmluZyh0aW1lU3RyWzBdLCBbJ9CX0LDRgtGA0LDRh9C10L3QsCcsICfQl9Cw0YLRgNCw0YfQtdC90L4nLCAn0JfQsNGC0YDQsNGH0LXQvdC+J10pK1xyXG4gICAgICAgICAnICcrIGNyZWF0ZVRpbWVTdHJpbmcodGltZVN0clswXSwgWyfQvNC40L3Rg9GC0LAnLCAn0LzQuNC90YPRgtGLJywgJ9C80LjQvdGD0YInXSk7Ki9cclxuXHJcbiAgICAgICAgdGltZVN0clswXSA9ICc8c3BhbiBjbGFzcz1cImVsYXBzZWQtdGltZVwiPicgKyB0aW1lU3RyWzBdICsgJyDQvNC40L0uPC9zcGFuPic7XHJcbiAgICAgICAgd29ya1RpbWUuaW5uZXJIVE1MID0gdGltZVN0clswXTtcclxuXHJcbiAgICAgICAgLy8gaWYgKGlzTmFOKE51bWJlcih0aW1lU3RyWzFdKSkpIHtcclxuICAgICAgICAvLyAgICAgd29ya1RpbWUuaW5uZXJIVE1MID0gdGltZVN0clswXTtcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGltZVN0clsxXSA9ICcg0LjQtyAnK3RpbWVTdHJbMV07XHJcbiAgICAgICAgLy8gICAgIHdvcmtUaW1lLmlubmVySFRNTCA9IHRpbWVTdHIuam9pbignICcpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQod29ya1RpbWUpO1xyXG5cclxuICAgICAgICByZXR1cm4gZnJhZ21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlM3Jvdyh0ZCkge1xyXG4gICAgICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW1Qcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgICAvL9C60L7QvNC80LXQvdGC0LDRgNC40LlcclxuICAgICAgICBsZXQgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWJvZHknKTtcclxuXHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh0ZFs1XS5maXJzdEVsZW1lbnRDaGlsZC5jbG9uZU5vZGUodHJ1ZSkpO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAgICAgLy/QvtCx0LXRgNGC0LrQsCDQtNC70Y8g0LrQvdC+0L/QvtC6INCj0LTQsNC70LjRgtGMINC4INCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgbGV0IHJvd0l0ZW1XcmFwID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByb3dJdGVtV3JhcC5jbGFzc0xpc3QuYWRkKCdhY3Rpb25zLWJ0bi13cmFwJyk7XHJcbiAgICAgICAgLy/Rg9C00LDQu9C40YLRjFxyXG5cclxuICAgICAgICBpZiAodGRbMTFdLmZpcnN0RWxlbWVudENoaWxkKSB7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2J0bi1kZWwtY29tbWVudCcpO1xyXG4gICAgICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzExXS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgICAgIHJvd0l0ZW1XcmFwLmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/RgNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFxyXG4gICAgICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnYnRuLWVkaXQtY29tbWVudCcpO1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQodGRbMV0uZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgIHJvd0l0ZW1XcmFwLmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtV3JhcCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmcmFnbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGU0cm93KHRkKSB7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGRbMl0ucXVlcnlTZWxlY3RvckFsbCgnYScpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmdW5jdGlvbiBjcmVhdGU1cm93KHRkKSB7XHJcbiAgICAvLyAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgLy9cclxuICAgIC8vICAgICBsZXQgcm93SXRlbVByb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIGxldCByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgLy/QvtCx0LXRgNGC0LrQsCDQtNC70Y8g0LrQvdC+0L/QvtC6INCj0LTQsNC70LjRgtGMINC4INCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXHJcbiAgICAvLyAgICAgbGV0IHJvd0l0ZW1XcmFwID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIC8vICAgICByb3dJdGVtV3JhcC5jbGFzc0xpc3QuYWRkKCdhY3Rpb25zLWJ0bi13cmFwJyk7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIC8v0YPQtNCw0LvQuNGC0YxcclxuICAgIC8vXHJcbiAgICAvLyAgICAgaWYgKHRkWzExXS5maXJzdEVsZW1lbnRDaGlsZCkge1xyXG4gICAgLy8gICAgICAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIC8vICAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdidG4tZGVsLWNvbW1lbnQnKTtcclxuICAgIC8vICAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh0ZFsxMV0uZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgLy8gICAgICAgICByb3dJdGVtV3JhcC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIC8v0YDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcclxuICAgIC8vICAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIC8vICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2J0bi1lZGl0LWNvbW1lbnQnKTtcclxuICAgIC8vICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzFdLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgIC8vICAgICByb3dJdGVtV3JhcC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbVdyYXApO1xyXG4gICAgLy9cclxuICAgIC8vICAgICByZXR1cm4gZnJhZ21lbnQ7XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUltZ1RodW1iKGl0ZW0pIHtcclxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB3cmFwLmNsYXNzTGlzdC5hZGQoJ2ltZy10aHVtYicsICdmaWxlLXRodW1iJyk7XHJcblxyXG4gICAgbGV0IHBpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgcGljLnNyYyA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcbiAgICBwaWMuY2xhc3NMaXN0LmFkZCgndGh1bWItcGljJyk7XHJcblxyXG4gICAgaXRlbS5hcHBlbmRDaGlsZChwaWMpO1xyXG5cclxuICAgIGxldCB0aXRsZSA9IGdldEF0dGFjaFRpdGxlKGl0ZW0pO1xyXG4gICAgd3JhcC5hcHBlbmRDaGlsZChpdGVtKTtcclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgYmlncGljID0gcGljLmNsb25lTm9kZShmYWxzZSk7XHJcbiAgICAgICAgYmlncGljLmNsYXNzTGlzdC5hZGQoJ2xhcmdlLXBpYy1wcmV2aWV3Jyk7XHJcbiAgICAgICAgYmlncGljLmNsYXNzTGlzdC5yZW1vdmUoJ3RodW1iLXBpYycpO1xyXG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoYmlncGljKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMucXVlcnlTZWxlY3RvcignLmxhcmdlLXBpYy1wcmV2aWV3JykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHdyYXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURvY3NUaHVtYihpdGVtKSB7XHJcbiAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2RvYy10aHVtYicsICdmaWxlLXRodW1iJyk7XHJcbiAgICBpdGVtLmFwcGVuZENoaWxkKGdldEF0dGFjaFRpdGxlKGl0ZW0pKTtcclxuICAgIGl0ZW0ucmVtb3ZlQ2hpbGQoaXRlbS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICByZXR1cm4gaXRlbTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXR0YWNoVGl0bGUoaXRlbSkge1xyXG4gICAgbGV0IHRpdGxlID0gaXRlbS5maXJzdEVsZW1lbnRDaGlsZC50aXRsZTtcclxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB3cmFwLnRleHRDb250ZW50ID0gdGl0bGU7XHJcbiAgICB3cmFwLmNsYXNzTGlzdC5hZGQoJ2F0dGFjaC10aXRsZScpO1xyXG4gICAgcmV0dXJuIHdyYXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRlbXBsYXRlKCkge1xyXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xyXG4gICAgbGV0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBibG9jay5jbGFzc0xpc3QuYWRkKCdiLWNvbW1lbnQnKTtcclxuICAgIGJsb2NrLmlkID0gJ2NvbW1lbnQtdGVtcGxhdGUnO1xyXG5cclxuICAgIGxldCBibG9ja1JvdztcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGJsb2NrUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYmxvY2tSb3cuY2xhc3NMaXN0LmFkZCgnYi1jb21tZW50X19yb3cnLCAnYi1jb21tZW50X19yb3dfJyArIGkpO1xyXG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKGJsb2NrUm93KVxyXG4gICAgfVxyXG5cclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoYmxvY2spO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod3JhcCk7XHJcblxyXG4gICAgcmV0dXJuIHdyYXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dBY3Rpb25zQnRuKGNhbW1lbnQpIHtcclxuICAgIGxldCBidG5zID0gY2FtbWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aW9ucy1idG4td3JhcCcpO1xyXG4gICAgYnRucy5jbGFzc0xpc3QudG9nZ2xlKCdpcy12aXNpYmxlJyk7XHJcbn1cclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9wY3NzL2NvbW1lbnRzRGVzaWduLnBjc3MnO1xyXG5cclxuZXhwb3J0IHtjb21tZW50c0Rlc2lnbn07XHJcblxyXG5pZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgY29tbWVudHNEZXNpZ24nKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbW1lbnRzRGVzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi9jb21tZW50c0Rlc2lnbi5wY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL2NvbW1lbnRzRGVzaWduLnBjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vY29tbWVudHNEZXNpZ24ucGNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGNzcy9jb21tZW50c0Rlc2lnbi5wY3NzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuYi1jb21tZW50X19yb3c6bGFzdC1jaGlsZHtwYWRkaW5nLWJvdHRvbToyZW19LmNvbW1lbnQtd3JhcCBwOm9ubHktb2YtdHlwZXttYXJnaW46MH0uY29tbWVudC13cmFwIHA6bGFzdC1jaGlsZHttYXJnaW4tYm90dG9tOjB9I2NvbW1lbnRzLXRibHttYXJnaW46YXV0bztwYWRkaW5nOjNlbSAwO2JhY2tncm91bmQ6I2YwZjBmMH0jY29tbWVudHMtdGJsLmhpZGUtb3JpZ2luYWwgdHI+dGR7ZGlzcGxheTpub25lfSNjb21tZW50cy10YmwsI2NvbW1lbnRzLXRibCB0Ym9keSwjY29tbWVudHMtdGJsIHRye2Rpc3BsYXk6YmxvY2t9I2NvbW1lbnRzLXRibCB0cjpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1ib3R0b206MmVtfS5jb21tZW50LWJvZHl7d2lkdGg6MTAwJX0uY29tbWVudC13cmFwIHB7bGluZS1oZWlnaHQ6MS40XFxyXFxuXFxyXFxuICAgICAgICAvKlxcclxcbiAgICAgICAgLy/Qs9C00LUt0YLQviDRgtCw0LrQuCDQstGB0YLQsNCy0LvRj9GO0YLRgdGPINC70LjRiNC90LjQtSDQv9C10YDQtdCy0L7QtNGLINGB0YLRgNC+0LpcXHJcXG4gICAgICAgIC8v0YHQtNC10LvQsNGOINGC0LDQutC+0Lkg0LPRgNGP0LfQvdGL0Lkg0YXQsNC6XFxyXFxuICAgICAgICAqL1xcclxcbiAgICAgICAgLyomIGJyOmZpcnN0LWNoaWxkLFxcclxcbiAgICAgICAgJiBicjpsYXN0LWNoaWxke1xcclxcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgICAgICB9Ki99LmNvbW1lbnQtd3JhcCBwOmZpcnN0LWNoaWxke21hcmdpbi10b3A6MH0uYi1jb21tZW50e21heC13aWR0aDo3MjBweDttYXJnaW46YXV0bztiYWNrZ3JvdW5kOiNmYWZhZmE7Ym94LXNoYWRvdzowIDJweCAycHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpLDAgM3B4IDFweCAtMnB4IHJnYmEoMCwwLDAsLjIpO3dpZHRoOjEwMCU7Zm9udC1zaXplOjEycHg7XFxyXFxuICAgIC8qZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1mbG93OiBjb2x1bW4gd3JhcDsqL3Bvc2l0aW9uOnJlbGF0aXZlO2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYi1jb21tZW50LmItY29tbWVudF9ub3RpZnl7bWFyZ2luLXRvcDoyZW07cGFkZGluZzoyZW07Y29sb3I6IzMxNzA4ZjtiYWNrZ3JvdW5kOiNkOWVkZjc7Ym9yZGVyOjFweCBzb2xpZCAjYmNlOGYxfS5iLWNvbW1lbnQuYi1jb21tZW50X25vdGlmeSAuY29tbWVudHMtdXBkYXRlLWxpbmt7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZy1sZWZ0OjFlbTtjb2xvcjppbmhlcml0fS5iLWNvbW1lbnRfX3Jvd3twYWRkaW5nOjFlbSAyZW07ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtZmxvdzpyb3cgd3JhcDtmbGV4LWZsb3c6cm93IHdyYXA7cG9zaXRpb246cmVsYXRpdmV9LmItY29tbWVudF9fcm93OmZpcnN0LWNoaWxke3BhZGRpbmctdG9wOjJlbX0uYi1jb21tZW50X19yb3c6Zmlyc3QtY2hpbGQgLnJvdy1yaWdodHt0b3A6MmVtfVxcclxcblxcclxcbi8qLy8xIHJvdyDRiNCw0L/QutCwKi8uYi1jb21tZW50X19yb3dfMHtjb2xvcjpncmF5fS50YXNrLXJhbmssLnRhc2stc3RhdHVze3BhZGRpbmc6MCAuNWVtIDAgMmVtfS5kZWFkbGluZS1kYXRle3BhZGRpbmctbGVmdDoxZW19LmlkLWNoZWNrYm94e3Bvc2l0aW9uOmFic29sdXRlO3Zpc2liaWxpdHk6aGlkZGVuO3otaW5kZXg6LTF9LmNvbW1lbnQtbGluaywuY29tbWVudC1ub3ttYXJnaW4tcmlnaHQ6MCFpbXBvcnRhbnR9XFxyXFxuXFxyXFxuLyovLzIgcm93INCw0LLRgtC+0YAgLSDQuNGB0L/QvtC70L3QuNGC0LXQu9GMKi8uYi1jb21tZW50X19yb3cuYi1jb21tZW50X19yb3dfMXtwYWRkaW5nLXRvcDowOy1tcy1mbGV4LXBhY2s6anVzdGlmeTtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjtjb2xvcjpncmF5fS5jb21tZW50LWluZm8+c3BhbntkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmNvbW1lbnQtYXV0aG9ye3BhZGRpbmctcmlnaHQ6MmVtO3Bvc2l0aW9uOnJlbGF0aXZlfS5jb21tZW50LWF1dGhvcjphZnRlcntjb250ZW50OlxcXCJcXFxcMjE5MlxcXCI7cG9zaXRpb246cmVsYXRpdmU7bGVmdDoxZW19XFxyXFxuXFxyXFxuLyovLzMgcm93INGC0LXQutGB0YIg0LrQsNC80LXQvdGC0LAqLy5iLWNvbW1lbnRfX3Jvd18ye2ZvbnQtc2l6ZToxNHB4O2JhY2tncm91bmQ6I2ZmZjtib3JkZXItdG9wOjFweCBzb2xpZCBoc2xhKDAsMCUsNjMlLC4yKTtib3JkZXItYm90dG9tOjFweCBzb2xpZCBoc2xhKDAsMCUsNjMlLC4yKTtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59XFxyXFxuXFxyXFxuLyrQuCDQutC90L7Qv9C60Lgg0KPQtNCw0LvQuNGC0YwsINCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMKi8uYWN0aW9ucy1idG4td3JhcHtwYWRkaW5nOjFlbTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTtyaWdodDowO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zc30uYWN0aW9ucy1idG4td3JhcC5pcy12aXNpYmxle3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xMDAlKX0uYnRuLWRlbC1jb21tZW50LC5idG4tZWRpdC1jb21tZW50e2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtoZWlnaHQ6MjRweDtsaW5lLWhlaWdodDoyNHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6MX0uYnRuLWVkaXQtY29tbWVudHtcXHJcXG4gICAgLyp3aWR0aDogMTQwcHg7Ki9tYXJnaW4tbGVmdDouNWVtO1xcclxcbiAgICAvKmJvcmRlcjogMXB4IHNvbGlkICNBREFEQUQ7Ki90b3A6M3B4fS5idG4tZGVsLWNvbW1lbnR7d2lkdGg6NzBweFxcclxcbiAgICAvKndpZHRoOiAxMDBweDsqL31cXHJcXG5cXHJcXG4vKi5idG4tZWRpdC1jb21tZW50OmFmdGVyLCovLmJ0bi1kZWwtY29tbWVudDphZnRlcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt6LWluZGV4Oi0xO2NvbnRlbnQ6XFxcIlxcXFw0MjNcXFxcNDM0XFxcXDQzMFxcXFw0M0JcXFxcNDM4XFxcXDQ0MlxcXFw0NENcXFwiO2NvbG9yOiNjY2M7bGluZS1oZWlnaHQ6bm9ybWFsO2JvcmRlci1ib3R0b206MXB4IHNvbGlkfVxcclxcblxcclxcbi8qLmJ0bi1lZGl0LWNvbW1lbnQ6YWZ0ZXIge1xcclxcbiAgICBjb250ZW50OiAn0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YwnO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjRTFFMUUxO1xcclxcbn0qL1xcclxcblxcclxcbi8qLmJ0bi1lZGl0LWNvbW1lbnQgaW1nLCovLmJ0bi1kZWwtY29tbWVudCBpbWd7ZGlzcGxheTpub25lfVxcclxcblxcclxcbi8qLmJ0bi1lZGl0LWNvbW1lbnQgYSwqLy5idG4tZGVsLWNvbW1lbnQgYXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlfVxcclxcblxcclxcbi8qLy80IHJvdyDRhNCw0LnQu9GLKi8uYi1jb21tZW50X19yb3cuYi1jb21tZW50X19yb3dfM3twYWRkaW5nLXRvcDoxLjVlbTtwYWRkaW5nLWJvdHRvbToxLjVlbTstbXMtZmxleC1hbGlnbjpzdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fVxcclxcblxcclxcbi8qLy81IHJvdyDQv9C+0LTQstCw0LsqLy5iLWNvbW1lbnRfX3Jvd18zKy5iLWNvbW1lbnRfX3Jvd180e2JvcmRlci10b3A6MXB4IHNvbGlkIGhzbGEoMCwwJSw2MyUsLjIpfS5iLWNvbW1lbnRfX3Jvdy5iLWNvbW1lbnRfX3Jvd180ey1tcy1mbGV4LXBhY2s6ZW5kO2p1c3RpZnktY29udGVudDpmbGV4LWVuZH1cXHJcXG5cXHJcXG4vKi0tLS0qLy5yb3ctcmlnaHR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjFlbTtyaWdodDoyZW19LnJvdy1yaWdodD4qe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ucm93LXJpZ2h0Pjpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1yaWdodDouN2VtfS5pbWctdGh1bWJ7bWF4LXdpZHRoOjE1MHB4fS5pbWctdGh1bWIgaW1nOmZpcnN0LWNoaWxke2Rpc3BsYXk6bm9uZX0uaW1nLXRodW1iPmF7ZGlzcGxheTpibG9ja30uaW1nLXRodW1iIC5hdHRhY2gtdGl0bGV7bWFyZ2luLXRvcDouM2VtfS50aHVtYi1waWN7d2lkdGg6MTAwJTtcXHJcXG4gICAgLypoZWlnaHQ6IGNhbGMoMTAwJSAtIDJlbSk7Ki9vYmplY3QtZml0OmNvdmVyO21heC1oZWlnaHQ6MjAwcHg7Ym9yZGVyOjFweCBzb2xpZCAjY2NjfVxcclxcblxcclxcbi8q0LHQvtC70YzRiNCw0Y8g0LrQsNGA0YLQuNC90LrQsCwg0LLRgdGC0LDQstC70Y/QtdGC0YHRj9CyINCx0LvQvtC6INC/0YDQuCDQvdCw0LLQtdC00LXQvdC40Lgg0L3QsCDQv9GA0LXQstGM0Y4qLy5sYXJnZS1waWMtcHJldmlld3ttYXgtd2lkdGg6NDB2dztib3JkZXI6MXB4IHNvbGlkIGdyYXk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjkwJTtsZWZ0OjA7XFxyXFxuICAgIC8qbGVmdDogNTAlOyovXFxyXFxuICAgIC8qdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpOyovei1pbmRleDoxfS5kb2MtdGh1bWJ7bWF4LXdpZHRoOjE1MHB4O2JhY2tncm91bmQ6I2YzZjNmMztmb250LXNpemU6MTFweDtib3JkZXI6MXB4IHNvbGlkICNjY2M7XFxyXFxuICAgIC8qbGluZS1oZWlnaHQ6IDU4cHg7Ki90ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWRlY29yYXRpb246bm9uZTtjb2xvcjppbmhlcml0fS5kb2MtdGh1bWIgLmF0dGFjaC10aXRsZXt3aWR0aDoxMDAlO3BhZGRpbmc6MCAuNWVtO2xpbmUtaGVpZ2h0OjEuNjt3b3JkLWJyZWFrOmJyZWFrLWFsbDtib3gtc2l6aW5nOmJvcmRlci1ib3g7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0uZmlsZS10aHVtYnstbXMtZmxleDoxIDEgMjUlO2ZsZXg6MSAxIDI1JTttaW4taGVpZ2h0OjcwcHg7cG9zaXRpb246cmVsYXRpdmV9LmZpbGUtdGh1bWI6bnRoLWNoaWxkKG4rNyl7bWFyZ2luLXRvcDoyZW19LmZpbGUtdGh1bWI6bm90KDpsYXN0LWNoaWxkKXttYXJnaW4tcmlnaHQ6MWVtfS5hdHRhY2gtdGl0bGV7bWF4LXdpZHRoOjE1MHB4O3RleHQtYWxpZ246Y2VudGVyO2xpbmUtaGVpZ2h0Om5vcm1hbDt3b3JkLWJyZWFrOmJyZWFrLWFsbH0jY29tbWVudHMtdGJsIHRyOmxhc3QtY2hpbGQgLmItY29tbWVudF9fcm93XzAsI2NvbW1lbnRzLXRibCB0cjpsYXN0LWNoaWxkIC5iLWNvbW1lbnRfX3Jvd18xe2NvbG9yOiMwMDB9XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj97XCJpbXBvcnRMb2FkZXJzXCI6MX0hLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliIS4vc3JjL3Bjc3MvY29tbWVudHNEZXNpZ24ucGNzc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgY2FsY3VsYXRlRWxhcHNlZFRpbWUnKTtcclxufVxyXG5cclxuLy/QutCw0LvRjNC60YPQu9GP0YLQvtGAINCyINC/0L7Qu9C1INCy0LLQvtC00LAg0LfQsNGC0YDQsNGH0LXQvdC90L7Qs9C+INCy0YDQtdC80LXQvdC4XHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZUVsYXBzZWRUaW1lKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCB0aW1lRWxhcHNlZEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwZW5kZWRfdGltZScpO1xyXG5cclxuICAgIGlmKCF0aW1lRWxhcHNlZEZpZWxkKXtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ9Cd0LUg0L3QsNC50LTQtdC90L4g0L/QvtC70LUg0LLQstC+0LTQsCDQstGA0LXQvNC10L3QuCDQstGL0L/QvtC70L3QtdC90LjRjycpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQo9C00LDQu9C10L3QuNC1INC+0LHRgNCw0LHQvtGC0YfQuNC60LAg0L3QsNC20LDRgtC40Y8g0LrQu9Cw0LLQuNGIINC00LvRjyDQv9C+0LvRjyAnc3BlbmRlZF90aW1lJ1xyXG4gICAgdGltZUVsYXBzZWRGaWVsZC5vbmtleXVwID0gbnVsbDtcclxuXHJcbiAgICAvLyDQlNC+0LHQsNCy0LvQtdC90LjQtSDRgdC+0LHRi9GC0LjRjyDQtNC70Y8g0LLRi9GH0LjRgdC70LXQvdC40Y8g0LfQsNGC0YDQsNGH0LXQvdC90L7Qs9C+INCy0YDQtdC80LXQvdC4INC00LvRjyDQv9C+0LvRjyAnc3BlbmRlZF90aW1lJ1xyXG4gICAgdGltZUVsYXBzZWRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGN1cl92YWx1ZSA9IHRoaXMudmFsdWU7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGN1cl92YWx1ZSA9IGV2YWwoY3VyX3ZhbHVlKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J7RiNC40LHQutCwINCy0YvRh9C40YHQu9C10L3QuNGPINC30LDRgtGA0LDRh9C10L3QvdC+0LPQviDQstGA0LXQvNC10L3QuC4g0JjRgdC/0L7Qu9GM0LfRg9C50YLQtSDRh9C40YHQu9CwINC4INC30L3QsNC60LggwqsrwrssIMKrLcK7LCDCqyrCuywgwqsvwrsg0Lgg0YHQutC+0LHQutC4XCIpO1xyXG5cclxuICAgICAgICAgICAgY3VyX3ZhbHVlID0gbnVsbDtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICBpZiAoKGN1cl92YWx1ZSAhPT0gbnVsbCkgJiYgKCFpc05hTihjdXJfdmFsdWUpKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGN1cl92YWx1ZSA9IE1hdGgucm91bmQoY3VyX3ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY3VyX3ZhbHVlIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcItCe0YLRgNC40YbQsNGC0LXQu9GM0L3QvtC1INC40LvQuCDQvdGD0LvQtdCy0L7QtSDQt9C90LDRh9C10L3QuNC1INCy0YDQtdC80LXQvdC4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cl92YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGN1cl92YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gbWluVG9EYXlzKHRpbWVJbk1pbnV0ZXMsIGRheUluSG91cnMgPSA4KSB7XHJcbi8vICAgICBsZXQgcmV0U3RyID0gXCJcIjtcclxuLy9cclxuLy8gICAgIGlmICgodGltZUluTWludXRlcyAhPT0gbnVsbCkgJiYgKCFpc05hTih0aW1lSW5NaW51dGVzKSkgJiYgKHRpbWVJbk1pbnV0ZXMgPiAwKSkge1xyXG4vLyAgICAgICAgIGRheUluSG91cnMgPSBkYXlJbkhvdXJzIDw8IDA7XHJcbi8vICAgICAgICAgaWYgKChkYXlJbkhvdXJzID09PSB1bmRlZmluZWQpIHx8IChkYXlJbkhvdXJzID09PSBudWxsKSB8fCAoaXNOYU4oZGF5SW5Ib3VycykpIHx8IChkYXlJbkhvdXJzIDwgMSkpIGRheUluSG91cnMgPSAyNDtcclxuLy8gICAgICAgICBsZXQgdEQsIHRILCB0TTtcclxuLy8gICAgICAgICB0RCA9ICh0aW1lSW5NaW51dGVzIC8gZGF5SW5Ib3VycyAvIDYwKSA8PCAwO1xyXG4vLyAgICAgICAgIHJldFN0ciArPSB0RCA+IDAgPyB0RCArIFwiINC0LiBcIiA6IFwiXCI7XHJcbi8vICAgICAgICAgdGltZUluTWludXRlcyAtPSB0RCAqIGRheUluSG91cnMgKiA2MDtcclxuLy8gICAgICAgICB0SCA9ICh0aW1lSW5NaW51dGVzIC8gNjApIDw8IDA7XHJcbi8vICAgICAgICAgcmV0U3RyICs9IHRIID4gMCA/IHRIICsgXCIg0YcuIFwiIDogXCJcIjtcclxuLy8gICAgICAgICB0aW1lSW5NaW51dGVzIC09IHRIICogNjA7XHJcbi8vICAgICAgICAgdE0gPSB0aW1lSW5NaW51dGVzIDw8IDA7XHJcbi8vICAgICAgICAgcmV0U3RyICs9IHRNICsgXCIg0LzQuNC9LlwiICsgXCIgKFwiICsgZGF5SW5Ib3VycyArIFwiLdGH0LDRgdC+0LLQvtC5INC00LXQvdGMKVwiO1xyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICByZXRTdHIgKz0gXCLQp9GC0L4t0YLQviDRgdC+INCy0YDQtdC80LXQvdC10Lwg0L3QtSDRgtCw0LogOihcIjtcclxuLy8gICAgIH1cclxuLy8gICAgIHJldHVybiByZXRTdHI7XHJcbi8vIH1cclxuXHJcbmV4cG9ydCB7Y2FsY3VsYXRlRWxhcHNlZFRpbWV9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgY2FsY3VsYXRlRWxhcHNlZFRpbWUnKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NhbGN1bGF0ZUVsYXBzZWRUaW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCBnb1RvVGFza0RhdGFsaXN0Jyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0VGFza0lkLGdldFRhc2tIZWFkfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGdvVG9UYXNrRGF0YWxpc3QoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IHRhc2tJZCA9IGdldFRhc2tJZCgpO1xyXG5cclxuICAgIGxldCB0YXNrVGl0bGUgPSBnZXRUYXNrSGVhZCgpLnRpdGxlO1xyXG5cclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YWxpc3QnKSkgfHwgW107XHJcbiAgICBkYXRhID0gYXBwZW5kSWQoZGF0YSk7XHJcblxyXG4gICAgLy/QtdGB0LvQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0LXRgdGC0Ywg0LfQsNCz0L7Qu9C+0LLQvtC6INC30LDQtNCw0YfQuFxyXG4gICAgLy8gLSDQv9GA0L7QstC10YDQuNGC0Ywg0LXRgdGC0Ywg0LvQuCDQvtC90LAg0LIg0YHQv9C40YHQutC1XHJcbiAgICBpZiAodGFza1RpdGxlKSB7XHJcblxyXG4gICAgICAgIGxldCBuZXdkYXRhID0ge1wiaWRcIjogdGFza0lkLCBcInRpdGxlXCI6IHRhc2tUaXRsZSArICcgJyArIHRhc2tJZH07XHJcblxyXG4gICAgICAgIGRhdGEgPSBhcHBlbmRJZChkYXRhLCBuZXdkYXRhKTtcclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGFsaXN0JywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v0YHQvtC30LTQsNC8IGRhdGFsaXN0XHJcbiAgICBsZXQgZGF0YWxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkYXRhbGlzdCcpO1xyXG4gICAgZGF0YWxpc3QuaWQgPSAnZGwtZ290b3Rhc2snO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkYXRhbGlzdCk7XHJcblxyXG4gICAgLy/RgdCy0Y/Qt9Cw0YLRjCBkYXRhbGlzdCDRgSDQv9C+0LvQtdC8INCy0LLQvtC00LAgaWQg0LfQsNC00LDRh9C4XHJcbiAgICBsZXQgaWRGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb1RvJyk7XHJcbiAgICBpZEZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgIGlkRmllbGQuc2V0QXR0cmlidXRlKCdsaXN0JywgJ2RsLWdvdG90YXNrJyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgb3AudmFsdWUgPSBkYXRhW2ldLmlkO1xyXG4gICAgICAgIG9wLmxhYmVsID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICBkYXRhbGlzdC5hcHBlbmRDaGlsZChvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwZW5kSWQoYXJyLCBuZXdkYXRhID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAobmV3ZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgY2hlY2sgPSBhcnIuc29tZShmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IG5ld2RhdGEuaWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjaGVjaykge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2gobmV3ZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhcnIubGVuZ3RoID4gMTApIHtcclxuICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2dvVG9UYXNrRGF0YWxpc3R9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgZ29Ub1Rhc2tEYXRhbGlzdCcpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZ29Ub1Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIGNvdW50V29ya2VyVGltZScpO1xyXG59XHJcblxyXG5pbXBvcnQge2dldEFsbENvbW1lbnRzUm93cyxnZXRBbGxXb3JrZXJzLGdldFJvd1RpbWVTdHJpbmd9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5pbXBvcnQge2NyZWF0ZUlTT0RhdGUsZWxpbWluYXRlRHVwbGljYXRlcyxkYXRlRm9ybWF0dGVyLGdldFJvd0RhdGVTdHJpbmd9IGZyb20gJy4vX3V0aWxzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGNvdW50V29ya2VyVGltZSgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGxldCAkaW5wdXRfYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItdG9vbGJhcicpO1xyXG4gICAgbGV0IHJvd3MgPSBnZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuICAgIGxldCB3b3JrZXJzID0gZ2V0QWxsV29ya2VycygpO1xyXG4gICAgbGV0IGRhdGVzX2NvbGxlY3Rpb24gPSBuZXcgU2V0KCk7XHJcbiAgICBsZXQgZGF0ZV9zdHI7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGF0ZV9zdHIgPSByb3dzW2ldLmNoaWxkcmVuWzNdLnRleHRDb250ZW50O1xyXG4gICAgICAgIGRhdGVfc3RyID0gZGF0ZV9zdHIuc3BsaXQoJyAnKTtcclxuICAgICAgICBkYXRlc19jb2xsZWN0aW9uLmFkZChjcmVhdGVJU09EYXRlKGRhdGVfc3RyWzBdKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRpbWVsaXN0ID0gY3JlYXRlVGltZUxpc3Qod29ya2Vycywgcm93cyk7XHJcblxyXG4gICAgbGV0ICR0aW1lbGlzdCA9IGNyZWF0ZVRpbWVMaXN0Vmlldyh0aW1lbGlzdCk7XHJcblxyXG4gICAgJHRpbWVsaXN0LmNsYXNzTGlzdC5hZGQoJ3VzZXItdG9vbGJhcl9faXRlbScpO1xyXG5cclxuICAgIC8v0LTQvtCx0LDQstC70Y/QtdC8INGB0YLRgNC+0LrRgyDRgSDQvtCx0YnQuNC8INCy0YDQtdC80LXQvdC10Lwg0LLRgdC10YUg0YHQvtGC0YDRg9C00L3QuNC60L7QslxyXG4gICAgLy/RgtGA0LXRgtC40Lkg0L/QsNGA0LDQvNC10YLRgCB0cnVlIC0g0YHRgtCw0LLQuNGCINC60LvQsNGB0YEt0LzQsNGA0LrQtdGAINCy0YvQsdGA0LDQvdC90YvRhSDRgNCw0LHQvtGC0L3QuNC60L7QslxyXG4gICAgaW5zZXJ0VG90YWxUaW1lKCR0aW1lbGlzdCwgdGltZWxpc3QsIHRydWUpO1xyXG5cclxuICAgIC8vINC00L7QsdCw0LLQu9GP0LXQvCDQutC70LjQuiDQv9C+INGB0YLRgNC+0LrQtSDQtNC70Y8g0L/QvtC00YHRh9C10YLQsCDQstGA0LXQvNC10L3QuCDQstGL0LHRgNCw0L3QvdGL0YUg0YDQsNCx0L7RgtC90LjQutC+0LJcclxuICAgICR0aW1lbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGltZS1saXN0LXRvdGFsJykpe1xyXG4gICAgICAgICAgICBjb3VudFNlbGVjdGVkV29ya2Vyc1RpbWUodGhpcywgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0ICR0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0gzJyk7XHJcbiAgICAkdGl0bGUudGV4dENvbnRlbnQgPSAn0JLRgdGPINC30LDQtNCw0YfQsCc7XHJcbiAgICAkdGl0bGUuY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyLXRpdGxlJyk7XHJcbiAgICAkdGltZWxpc3QuaW5zZXJ0QmVmb3JlKCR0aXRsZSwgJHRpbWVsaXN0LmZpcnN0Q2hpbGQpO1xyXG4gICAgJHRpbWVsaXN0LmNsYXNzTGlzdC5hZGQoJ3VzZXItdG9vbGJhcl9faXRlbScpO1xyXG5cclxuICAgIGxldCBkYXRlX2xpc3RzID0gY3JlYXRlRGF0ZXNMaXN0KCRpbnB1dF9ib3gsIGRhdGVzX2NvbGxlY3Rpb24pO1xyXG5cclxuICAgIC8vINC00L7QsdCw0LLQu9GP0Y4g0YHQtdC70LXQutGC0Ysg0YEg0LTQsNGC0LDQvNC4IC0g0L/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LfQsCDQstGL0LHRgNCw0L3QvdGL0Lkg0L/QtdGA0LjQvtC0XHJcbiAgICBmaW5kVGltZUluRGF0ZXNSYW5nZShkYXRlX2xpc3RzLCB3b3JrZXJzLCByb3dzKTtcclxuXHJcbiAgICAkaW5wdXRfYm94Lmluc2VydEJlZm9yZSgkdGltZWxpc3QsICRpbnB1dF9ib3gubGFzdENoaWxkKTtcclxuXHJcbiAgICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjU1ODk3Ny9hamF4LWNyb3NzLWRvbWFpbi1jYWxsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURhdGVzTGlzdChpbnB1dF9ib3gsIGRhdGVzKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlTGlzdChjc3NfaWQsIGNzc19jbGFzcykge1xyXG4gICAgICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnU0VMRUNUJyk7XHJcbiAgICAgICAgbGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgY3NzX2lkKTtcclxuICAgICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoY3NzX2NsYXNzKTtcclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICBib3guY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyX19pdGVtJyk7XHJcblxyXG4gICAgbGV0IHN0YXJ0X2xpc3QgPSBjcmVhdGVMaXN0KCdkYXRlLXN0YXJ0LWxpc3QnLCAnZGF0ZXMtbGlzdCcpO1xyXG5cclxuICAgIGxldCBlbmRfbGlzdCA9IGNyZWF0ZUxpc3QoJ2RhdGUtZW5kLWxpc3QnLCAnZGF0ZXMtbGlzdCcpO1xyXG5cclxuICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdCVVRUT04nKTtcclxuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICBidG4udGV4dENvbnRlbnQgPSAn0J/QvtGB0YfQuNGC0LDRgtGMJztcclxuXHJcbiAgICBsZXQgb3B0aW9uLCBjbG5fb3B0aW9uLCBsaXN0ZGF0ZTtcclxuXHJcbiAgICBmb3IobGV0IGRhdGUgb2YgZGF0ZXMpe1xyXG4gICAgICAgIGxpc3RkYXRlID0gZGF0ZUZvcm1hdHRlcihwYXJzZUludChkYXRlLCAxMCkpO1xyXG4gICAgICAgIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ09QVElPTicpO1xyXG4gICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZGF0ZSk7XHJcbiAgICAgICAgb3B0aW9uLmlubmVySFRNTCA9IGxpc3RkYXRlLnRvTG9jYWxlU3RyaW5nKCdydScpO1xyXG4gICAgICAgIGNsbl9vcHRpb24gPSBvcHRpb24uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHN0YXJ0X2xpc3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgICBlbmRfbGlzdC5hcHBlbmRDaGlsZChjbG5fb3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBib3guYXBwZW5kQ2hpbGQoc3RhcnRfbGlzdCk7XHJcbiAgICBib3guYXBwZW5kQ2hpbGQoZW5kX2xpc3QpO1xyXG4gICAgYm94LmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDMnKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ9CX0LAg0LLRi9Cx0YDQsNC90L3Ri9C5INC/0LXRgNC40L7QtCc7XHJcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXItdGl0bGUnKTtcclxuICAgIGJveC5pbnNlcnRCZWZvcmUodGl0bGUsIGJveC5maXJzdENoaWxkKTtcclxuXHJcbiAgICBpbnB1dF9ib3guaW5zZXJ0QmVmb3JlKGJveCwgaW5wdXRfYm94Lmxhc3RDaGlsZCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAnYm94JzogYm94LFxyXG4gICAgICAgICdzdGFydF9saXN0Jzogc3RhcnRfbGlzdCxcclxuICAgICAgICAnZW5kX2xpc3QnOiBlbmRfbGlzdCxcclxuICAgICAgICAnYnRuJzogYnRuXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vINGB0L7Qt9C00LDQvdC40LUg0L7QsdGK0LXQutGC0LAg0YHQviDRgdC/0LjRgdC60L7QvCDRgdC+0YLRgNGD0LTQvdC60L7QsiDQuCDQstGA0LXQvNC10L3QuCDQutCw0LbQtNC+0LPQviDQsiDQt9Cw0LTQsNGH0LVcclxuZnVuY3Rpb24gY3JlYXRlVGltZUxpc3Qod29ya2Vycywgcm93cykge1xyXG5cclxuICAgIGxldCBudGltZSwgbmFtZSwgdHN1bTtcclxuICAgIGxldCB0aW1lbGlzdCA9IHt9O1xyXG5cclxuICAgIGZvciAobGV0IHMgPSAwOyBzIDwgd29ya2Vycy5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgIHRzdW0gPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbnRpbWUgPSBnZXRSb3dUaW1lU3RyaW5nKHJvd3NbaV0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJvd3NbaV0uY2hpbGRyZW5bNF0pIHtcclxuICAgICAgICAgICAgICAgIC8v0LTQviDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHJvd3NbaV0uY2hpbGRyZW5bNF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL9C/0L7RgdC70LUg0LfQsNC/0YPRgdC60LAgY2FtbWVudHNEZXNpZ24oKTtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSByb3dzW2ldLnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWF1dGhvcicpLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAod29ya2Vyc1tzXSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdHN1bSArPSBudGltZTtcclxuICAgICAgICAgICAgICAgIHRpbWVsaXN0W25hbWVdID0gdHN1bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGltZWxpc3Q7XHJcbn1cclxuXHJcbi8vINGB0L7Qt9C00LDQvdC40LUgaHRtbCDRjdC70LXQvNC10L3RgtCwINGB0L4g0YHQv9C40YHQutC+0Lwg0YHQvtGC0YDRg9C00L3QutC+0LIg0Lgg0LLRgNC10LzQtdC90Lgg0LrQsNC20LTQvtCz0L4g0LIg0LfQsNC00LDRh9C1XHJcbmZ1bmN0aW9uIGNyZWF0ZVRpbWVMaXN0VmlldyhkYXRhKSB7XHJcbiAgICBsZXQgJHRpbWVsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICAkdGltZWxpc3QuY2xhc3NMaXN0LmFkZCgndGltZS1saXN0Jyk7XHJcbiAgICAkdGltZWxpc3QuaWQgPSAnd29ya2Vycy10aW1lJztcclxuXHJcbiAgICBsZXQgbGlzdF9pdGVtO1xyXG4gICAgbGV0IHdvcmtlcnRpbWU7XHJcbiAgICBsZXQgdG90YWx0aW1lID0gMDtcclxuXHJcbiAgICBmb3IgKGxldCBrIGluIGRhdGEpIHtcclxuICAgICAgICB3b3JrZXJ0aW1lID0gZGF0YVtrXTtcclxuICAgICAgICB0b3RhbHRpbWUgKz0gd29ya2VydGltZTtcclxuICAgICAgICBsaXN0X2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgbGlzdF9pdGVtLmRhdGFzZXQud29ya2VydGltZSA9IHdvcmtlcnRpbWU7XHJcbiAgICAgICAgbGlzdF9pdGVtLmlubmVySFRNTCA9ICc8c3Bhbj4nICsgayArICc8L3NwYW4+IDxzcGFuPicgKyB3b3JrZXJ0aW1lICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgICR0aW1lbGlzdC5pbnNlcnRCZWZvcmUobGlzdF9pdGVtLCAkdGltZWxpc3QubGFzdENoaWxkKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJHRpbWVsaXN0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kVGltZUluRGF0ZXNSYW5nZShsaXN0cywgd29ya2Vycywgcm93cykge1xyXG4gICAgbGV0ICRzdGFydF9saXN0ID0gbGlzdHMuc3RhcnRfbGlzdDtcclxuICAgIGxldCAkZW5kX2xpc3QgPSBsaXN0cy5lbmRfbGlzdDtcclxuICAgIGxldCAkYm94ID0gbGlzdHMuYm94O1xyXG4gICAgbGV0ICRidG4gPSBsaXN0cy5idG47XHJcblxyXG4gICAgZnVuY3Rpb24gZmluZFJvd3NJblJhbmdlKHJvd3MsIHN0YXJ0LCBlbmQpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJvd3MuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtX2RhdGUgPSBnZXRSb3dEYXRlU3RyaW5nKGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW1fZGF0ZSA+PSBzdGFydCAmJiBpdGVtX2RhdGUgPD0gZW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBmaW5kX3Jvd3MgPSBmaW5kUm93c0luUmFuZ2Uocm93cywgJHN0YXJ0X2xpc3QudmFsdWUsICRlbmRfbGlzdC52YWx1ZSk7XHJcblxyXG4gICAgICAgIGxldCByYW5nZV90aW1lbGlzdCA9IGNyZWF0ZVRpbWVMaXN0KGdldFNlbGVjdGVkV29ya2VycygpLCBmaW5kX3Jvd3MpO1xyXG4gICAgICAgIGxldCAkcmFuZ2VfdGltZWxpc3QgPSBjcmVhdGVUaW1lTGlzdFZpZXcocmFuZ2VfdGltZWxpc3QpO1xyXG5cclxuICAgICAgICBpZiAoJGJveC5xdWVyeVNlbGVjdG9yKCcjcmFuZ2UtdGltZWxpc3QnKSkge1xyXG4gICAgICAgICAgICAkYm94LnJlbW92ZUNoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5nZS10aW1lbGlzdCcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRyYW5nZV90aW1lbGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3JhbmdlLXRpbWVsaXN0Jyk7XHJcblxyXG4gICAgICAgICRib3guYXBwZW5kQ2hpbGQoJHJhbmdlX3RpbWVsaXN0KTtcclxuXHJcbiAgICAgICAgaW5zZXJ0VG90YWxUaW1lKCRyYW5nZV90aW1lbGlzdCwgcmFuZ2VfdGltZWxpc3QpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNlbGVjdGVkV29ya2VycygpIHtcclxuICAgIGxldCBzZWxlY3RlZF93b3JrZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmtlcnMtdGltZScpLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3RlZCcpO1xyXG4gICAgbGV0IHNlbGVjdGVkX25hbWVzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZF93b3JrZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRfbmFtZXMucHVzaChzZWxlY3RlZF93b3JrZXJzW2ldLmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2VsZWN0ZWRfbmFtZXM7XHJcbn1cclxuXHJcbi8v0L/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LLRi9Cx0YDQsNC90L3Ri9GFINGD0YfQsNGB0YLQvdC40LrQvtCyINC30LDQtNCw0YfQuCAo0LjQtyDRgdC/0LjRgdC60LAg0LLRgdC10YUg0YPRh9Cw0YHRgtC90LjQutC+0LIpXHJcbmZ1bmN0aW9uIGNvdW50U2VsZWN0ZWRXb3JrZXJzVGltZShsaXN0LCBldmVudCkge1xyXG4gICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGxldCAkdG90YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd29ya2Vycy10aW1lLXRvdGFsJyk7XHJcbiAgICBsZXQgdG90YWwgPSBwYXJzZUludCgkdG90YWwuZGF0YXNldC50b3RhbHRpbWUpO1xyXG5cclxuICAgIHdoaWxlICh0YXJnZXQgIT09IGxpc3QpIHtcclxuICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09ICdQJykge1xyXG4gICAgICAgICAgICByZWNvdW50VG90YWwodGFyZ2V0LCAkdG90YWwsIHRvdGFsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVjb3VudFRvdGFsKGVsZW0sIHRvdGFsLCB0b3RhbHRpbWUpIHtcclxuICAgICAgICBsZXQgZWxlbXRpbWUgPSBwYXJzZUludChlbGVtLmRhdGFzZXQud29ya2VydGltZSk7XHJcblxyXG4gICAgICAgIC8v0LrQu9Cw0YHRgSBleGNsdWRlZCDQvdGD0LbQtdC9INC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuCDRgdC/0LjRgdC60LAg0YDQsNCx0L7RgtC90LjQutC+0LJcclxuICAgICAgICAvL9CyINCy0YvQstC+0LTQtSDQstGA0LXQvNC90Lgg0LfQsCDQv9C10YDQuNC+0LQgLSDQstGL0LLQvtC0INGC0L7Qu9GM0LrQviDQv9C+INCy0YvQsdGA0LDQvdC90YvQvCAoc2VsZWN0ZWQpINGA0LDQsdC+0YLQvdC40LrQsNC8XHJcbiAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdleGNsdWRlZCcpO1xyXG4gICAgICAgICAgICB0b3RhbHRpbWUgPSB0b3RhbHRpbWUgLSBlbGVtdGltZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZXhjbHVkZWQnKTtcclxuICAgICAgICAgICAgdG90YWx0aW1lID0gdG90YWx0aW1lICsgZWxlbXRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b3RhbC5pbm5lckhUTUwgPSB0b3RhbHRpbWU7XHJcbiAgICAgICAgdG90YWwuZGF0YXNldC50b3RhbHRpbWUgPSB0b3RhbHRpbWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vINC/0L7QtNGB0YfQtdGCINC+0LHRidC10LPQviDQstGA0LXQvNC10L3QuCDQstGB0LXRhSDRgdC+0YLRgNGD0LTQvdC40LrQvtCyINC00LvRjyDRgdC/0LjRgdC60LAg0YHQvtGC0YDRg9C00L3QuNC6LdCy0YDQtdC80Y9cclxuZnVuY3Rpb24gaW5zZXJ0VG90YWxUaW1lKHRpbWVsaXN0LCBkYXRhLCBhZGRtYXJrZXIpIHtcclxuICAgIGxldCB0b3RhbHRpbWUgPSAwO1xyXG4gICAgbGV0IHRvdGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5cclxuICAgIGZvciAobGV0IGsgaW4gZGF0YSkge1xyXG4gICAgICAgIHRvdGFsdGltZSArPSBkYXRhW2tdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhZGRtYXJrZXIpIHtcclxuICAgICAgICBsZXQgbGlzdF9pdGVtcyA9IHRpbWVsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ3AnKTtcclxuICAgICAgICAvL9C/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINCy0YHQtSDRgNCw0LHQvtGC0L3QuNC60Lgg0LLRi9Cx0YDQsNC90YssINGB0YfQuNGC0LDQtdGC0YHRjyDQvtCx0YnQtdC1INCy0YDQtdC80Y8g0L/QviDQstGB0LXQvFxyXG4gICAgICAgIC8v0LLRgdC10Lwg0LTQvtCx0LDQstC70Y/QtdC8INC60LvQsNGB0YEgc2VsZWN0ZWQg0L3Rg9C20L3Ri9C5INC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuCDRgdC/0LjRgdC60LBcclxuICAgICAgICAvL9C4INGH0YLQvtCx0Ysg0LLQuNC30YPQsNC70YzQvdC+INC+0YLQvNC10YLQuNGC0Ywg0LLRi9Cx0YDQsNC90L3Ri9GFINCyINGB0L/QuNGB0LrQtVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdF9pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsaXN0X2l0ZW1zW2ldLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvdGFsLmlubmVySFRNTCA9ICc8c3Bhbj7QktGB0LXQs9C+Ojwvc3Bhbj4gPHNwYW4gaWQ9XCJ3b3JrZXJzLXRpbWUtdG90YWxcIiBkYXRhLXRvdGFsdGltZT1cIicgKyB0b3RhbHRpbWUgKyAnXCI+JyArIHRvdGFsdGltZSArICc8L3NwYW4+JztcclxuICAgIHRvdGFsLmNsYXNzTGlzdC5hZGQoJ3RpbWUtbGlzdC10b3RhbCcpO1xyXG4gICAgdGltZWxpc3QuYXBwZW5kQ2hpbGQodG90YWwpO1xyXG5cclxuICAgIHJldHVybiB0b3RhbHRpbWU7XHJcbn1cclxuXHJcbmV4cG9ydCB7Y291bnRXb3JrZXJUaW1lfTtcclxuXHJcbmlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIGNvdW50V29ya2VyVGltZScpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY291bnRXb3JrZXJUaW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgdGFza0Zvb3RlckRlc2lnbicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrRm9vdGVyRGVzaWduKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy9uZXcgY29tbWVudFxyXG4gICAgbGV0IGNvbW1lbnRUYmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJsLW5ldy1jb21tZW50Jyk7XHJcbiAgICBsZXQgbmV3Q29tbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctY29tbWVudC13cmFwJyk7XHJcblxyXG4gICAgLy8g0LTQvtCx0LDQstC70Y4g0LfQsNCz0L7Qu9C+0LLQvtC6XHJcbiAgICBsZXQgbmV3Q29tbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIG5ld0NvbW1lbnRUaXRsZS50ZXh0Q29udGVudCA9ICfQndC+0LLRi9C5INC60L7QvNC80LXQvdGC0LDRgNC40LknO1xyXG4gICAgbmV3Q29tbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24tdGl0bGUnKTtcclxuICAgIG5ld0NvbW1lbnQuaW5zZXJ0QmVmb3JlKG5ld0NvbW1lbnRUaXRsZSwgbmV3Q29tbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XHJcblxyXG4gICAgLy8xINC/0LXRgNCy0LDRjyDRgdGC0YDQvtC60LAgLSDQuNGB0L/QvtC70L3QuNGC0LXQu9GMLCDRgdGC0LDRgtGD0YEsINC/0YDQuNC+0YDQuNGC0LXRglxyXG4gICAgLy/QsdC70L7QuiDQsiDQutC+0YLQvtGA0L7QvCDQsdGD0LTRg9GCINC/0L7Qu9GPINC00LvRjyDQstCy0L7QtNCwINC30LDRgtGA0LDRh9C10L3QvdC+0LPQviDQuCDQv9C70LDQvdC40YDRg9C10LzQvtCz0L4g0LLRgNC10LzQtdC90LhcclxuICAgIC8v0Lgg0LLRi9Cx0L7RgCDQv9GA0LjQvtGA0LjRgtC10YLQsFxyXG5cclxuICAgIGxldCByb3dJdGVtUHJvdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGxldCByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIGxldCByb3dzRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgLy/QuNGB0L/QvtC70L3QuNGC0LXQu9GMXHJcbiAgICBsZXQgZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50ZXJuYWxfd29ya2VyJyk7XHJcbiAgICBsZXQgd29ya2VyQmxvY2sgPSBmaWVsZC5wYXJlbnROb2RlO1xyXG4gICAgd29ya2VyQmxvY2suY2xhc3NMaXN0LmFkZCgnd29ya2VyLWJsb2NrJyk7XHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh3b3JrZXJCbG9jayk7XHJcblxyXG4gICAgLy/RgdGC0LDRgtGD0YFcclxuICAgIGxldCBzdGF0dXNUYmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJsLXN0YXR1cycpO1xyXG4gICAgbGV0IHN0YXR1c0xpc3QgPSBjcmVhdGVTdGF0dXNMaXN0KHN0YXR1c1RibCk7XHJcbiAgICBsZXQgYmxvY2sgPSBjcmVhdGVGaWVsZEFuZExhYmVsKCfQodGC0LDRgtGD0YEnLCBzdGF0dXNMaXN0KTtcclxuICAgIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ2Zyb3ctY29sLTItMScpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGJsb2NrKTtcclxuXHJcbiAgICAvL9C/0YDQuNC+0YDQuNGC0LXRglxyXG4gICAgZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHlfaWQnKTtcclxuICAgIGJsb2NrID0gY3JlYXRlRmllbGRBbmRMYWJlbCgn0J/RgNC40L7RgNC40YLQtdGCJywgZmllbGQpO1xyXG4gICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnZnJvdy1jb2wtMi0yJyk7XHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChibG9jayk7XHJcblxyXG4gICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWZpZWxkcy1yb3cnLCd0YXNrLXJvdy0xJyk7XHJcbiAgICByb3dJdGVtLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICAgIHJvd3NGcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAvLzIg0LLRgtC+0YDQsNGPINGB0YLRgNC+0LrQsCAtINCy0YDQtdC80Y8gKNC30LDRgtGA0LDRh9C10L3Qvi/Qv9C70LDQvdC40YDRg9C10LzQviksINC/0YDQvtC10LrRgiwg0YHRgNC+0LpcclxuXHJcbiAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1maWVsZHMtcm93JywndGFzay1yb3ctMicpO1xyXG5cclxuICAgIGxldCB0aW1lQmxvY2sgPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgdGltZUJsb2NrLmNsYXNzTGlzdC5hZGQoJ3RpbWUtYmxvY2snKTtcclxuXHJcbiAgICAvL9C30LDRgtGA0LDRh9C10L3QviDQstGA0LXQvNC10L3QuFxyXG4gICAgZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BlbmRlZF90aW1lJyk7XHJcbiAgICBibG9jayA9IGNyZWF0ZUZpZWxkQW5kTGFiZWwoJ9CX0LDRgtGA0LDRh9C10L3QvicsIGZpZWxkKTtcclxuICAgIHRpbWVCbG9jay5hcHBlbmRDaGlsZChibG9jayk7XHJcblxyXG4gICAgLy/Qv9C70LDQvdC40YDRg9C10LzQvtC1INCy0YDQtdC80Y9cclxuICAgIGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYW5fdGltZScpO1xyXG4gICAgYmxvY2sgPSBjcmVhdGVGaWVsZEFuZExhYmVsKCfQn9C70LDQvdC40YDRg9C10LzQvtC1JywgZmllbGQpO1xyXG4gICAgdGltZUJsb2NrLmFwcGVuZENoaWxkKGJsb2NrKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aW1lQmxvY2spO1xyXG5cclxuICAgIC8v0L/RgNC+0LXQutGCXHJcbiAgICBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGllbnRfaWQnKTtcclxuICAgIGxldCBwcm9qZWN0ID0gY3JlYXRlRmllbGRBbmRMYWJlbCgn0J/RgNC+0LXQutGCJywgZmllbGQpO1xyXG4gICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKCdmcm93LWNvbC0yLTEnKTtcclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHByb2plY3QpO1xyXG5cclxuICAgIC8v0YHRgNC+0LpcclxuICAgIGxldCBkZWFkbGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmRfZGF0ZScpLnBhcmVudE5vZGU7XHJcbiAgICBkZWFkbGluZS53aWR0aCA9ICcnO1xyXG4gICAgZGVhZGxpbmUuY2xhc3NMaXN0LmFkZCgnZGVhZGxpbmUtY2FsZW5kYXInLCdmcm93LWNvbC0yLTInKTtcclxuXHJcbiAgICAvL9GD0LHQuNGA0LDRjiDRgdC40LzQstC+0Lsg0L/QtdGA0LXQstC+0LTQsCDRgdGC0YDQvtC60LhcclxuICAgIGRlYWRsaW5lLnJlbW92ZUNoaWxkKGRlYWRsaW5lLnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdCcpLm5leHRTaWJsaW5nKTtcclxuXHJcbiAgICAvL9C60L3QvtC/0LrRgyDQpSAtINC+0YfQuNGB0YLQuNGC0Ywg0L/QvtC70LUgLSDRg9Cx0LjRgNCw0Y5cclxuICAgIC8vZGVhZGxpbmUucmVtb3ZlQ2hpbGQoZGVhZGxpbmUucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1idXR0b25dJykpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRmllbGRBbmRMYWJlbCgn0KHRgNC+0LonLCBkZWFkbGluZSkpO1xyXG5cclxuICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1maWVsZHMtcm93JywndGFzay1yb3ctMicpO1xyXG4gICAgcm93SXRlbS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICByb3dzRnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgLy8zINGC0YDQtdGC0YzRjyDRgdGC0YDQvtC60LAgLSDQtNC+0L/QvtC70L3QuNGC0LXQu9GM0L3Ri9C5INC10LzQtdC50Lsg0Lgg0YLQuNC/INC30LDQtNCw0YfQuFxyXG4gICAgLy/QtNC+0L/QvtC70L3QuNGC0LXQu9GM0L3Ri9C5INC10LzQtdC50LtcclxuICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWZpZWxkcy1yb3cnLCd0YXNrLXJvdy0zJyk7XHJcblxyXG4gICAgbGV0IHNlbmRMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZF9lbWFpbCcpO1xyXG5cclxuICAgIGxldCBhZGRFbWFpbCA9IHNlbmRMaXN0LnBhcmVudE5vZGU7XHJcbiAgICBhZGRFbWFpbC5jbGFzc0xpc3QuYWRkKCdhZGQtZW1haWwnKTtcclxuXHJcbiAgICBsZXQgYWRkRW1haWxMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICBhZGRFbWFpbExhYmVsLnRleHRDb250ZW50ID0gJ9Cf0L7Qu9GD0YfQsNGC0LXQu9C4INGA0LDRgdGB0YvQu9C60Lgg0L/QviDQv9C+0YfRgtC1JztcclxuICAgIGFkZEVtYWlsLmluc2VydEJlZm9yZShhZGRFbWFpbExhYmVsLGFkZEVtYWlsLmZpcnN0RWxlbWVudENoaWxkKTtcclxuXHJcbiAgICBsZXQgc2VuZExpc3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2V0RW1haWxBZGRyZXNzZXNCdXR0b24nKTtcclxuICAgIHNlbmRMaXN0QnRuLnZhbHVlID0gJ9Ca0L7QvNGDINC/0LjRgdGM0LzQsCc7XHJcbiAgICBhZGRFbWFpbC5hcHBlbmRDaGlsZChzZW5kTGlzdEJ0bik7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoYWRkRW1haWwpO1xyXG5cclxuICAgIC8v0YLQuNC/INC30LDQtNCw0YfQuFxyXG4gICAgbGV0IHRhc2tUeXBlQmxvY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvYmxlbV90eXBlJykucGFyZW50Tm9kZTtcclxuICAgIHRhc2tUeXBlQmxvY2suY2xhc3NMaXN0LmFkZCgndGFzay10eXBlJyk7XHJcblxyXG4gICAgbGV0IHRhc2tUeXBlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgdGFza1R5cGVMYWJlbC50ZXh0Q29udGVudCA9ICfQotC40L8g0LfQsNC00LDRh9C4JztcclxuICAgIHRhc2tUeXBlQmxvY2suaW5zZXJ0QmVmb3JlKHRhc2tUeXBlTGFiZWwsdGFza1R5cGVCbG9jay5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0YXNrVHlwZUJsb2NrKTtcclxuXHJcbiAgICByb3dJdGVtLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICAgIHJvd3NGcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAvLzQg0YfQtdGC0LLQtdGA0YLQsNGPINGB0YLRgNC+0LrQsCAtINC00L7QsdCw0LLQu9C10L3QuNC1INGE0LDQudC70L7QslxyXG4gICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmllbGRzLXJvdycsJ3Rhc2stcm93LTQnKTtcclxuXHJcbiAgICBsZXQgZXhpc3RBZGRGaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZpbGVJbnB1dHMnKTtcclxuICAgIGxldCBhZGRGaWxlc0Jsb2NrID0gZXhpc3RBZGRGaWxlLnBhcmVudE5vZGU7XHJcbiAgICBhZGRGaWxlc0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ2FkZC1maWxlcycpO1xyXG5cclxuICAgIGxldCBhZGRGaWxlc0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIGFkZEZpbGVzTGFiZWwuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbi10aXRsZScpO1xyXG4gICAgYWRkRmlsZXNMYWJlbC5pbm5lckhUTUwgPSAn0KTQsNC50LvRiyA8c3BhbiBjbGFzcz1cInMtaW5mb1wiPtC+0LHRidC40Lkg0L7QsdGK0LXQvCA8c3BhbiBpZD1cImZpbGVzLXRvdGFsXCI+0LTQviAzINCc0LE8L3NwYW4+PC9zcGFuPic7XHJcbiAgICAvL9CyIGlkPVwiZmlsZXMtdG90YWxcIiDQsdGD0LTQtdGCINC30LDQvNC10L3Rj9GC0YHRjyDRgtC10LrRgdGCINC60L7Qs9C00LAg0YTQsNC50LvRiyDQstGL0LHRgNC90YsgLSDQvtCx0YnQuNC5INC+0LHRitC10Lwg0LLRi9Cx0YDQsNC90L3Ri9GFINGE0LDQudC70L7QslxyXG4gICAgYWRkRmlsZXNCbG9jay5pbnNlcnRCZWZvcmUoYWRkRmlsZXNMYWJlbCxhZGRGaWxlc0Jsb2NrLmZpcnN0RWxlbWVudENoaWxkKTtcclxuXHJcbiAgICAvL9GN0YLRgyDRgdGB0YvQu9C60YMg0Y8g0YHQutGA0L7RjiDRgdGC0LjQu9GP0LzQuFxyXG4gICAgLy8gbGV0IGFkZEZpbGVJbnB1dCA9IGFkZEZpbGVzQmxvY2sucXVlcnlTZWxlY3RvcignYScpO1xyXG4gICAgLy8gYWRkRmlsZUlucHV0LnNldEF0dHJpYnV0ZSgnb25jbGljaycsJ2FkZEZpbGVJbnB1dChcIkZpbGVJbnB1dHNcIiknKTtcclxuXHJcbiAgICAvLyBhZGRGaWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgcmVtb3ZlRmlsZUlucHV0KGV4aXN0QWRkRmlsZSk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvL9Cx0LvQvtC6INCyINC60L7RgtC+0YDQvtC8INCx0YPQtNC10YIg0YHQv9C40YHQvtC6INC30LDQs9GA0YPQttC10L3QvdGL0YUg0YTQsNC50LvQvtCyXHJcbiAgICBsZXQgYWRkZWRGaWxlc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgYWRkZWRGaWxlc0xpc3QuaWQgPSAnZmlsZXMtbGlzdCc7XHJcbiAgICBhZGRlZEZpbGVzTGlzdC5jbGFzc0xpc3QuYWRkKCdmaWxlcy1saXN0Jyk7XHJcbiAgICBhZGRGaWxlc0Jsb2NrLmluc2VydEJlZm9yZShhZGRlZEZpbGVzTGlzdCxleGlzdEFkZEZpbGUpO1xyXG5cclxuICAgIC8v0L7QsdC10YDQvdGD0YLRjCDRgdGD0YnQtdGB0YLQstGD0Y7RidC40LkgaW5wdXQgZmlsZVxyXG4gICAgLy/RgdCw0LwgaW5wdXQg0LHRg9C00LXRgiDRgdC60YDRi9GCXHJcbiAgICAvL9C4INC90LDQstC10YHQuNGC0Ywg0LLRi9C30L7QsiDRhNGD0L3QutGG0LjQuCDRgdC+0LfQtNCw0Y7RidC10Lkg0L3QvtCy0YvQuSDQuNC90L/Rg9GCXHJcbiAgICBsZXQgZGVmYXVsdEZpbGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlSW5wdXQwJyk7XHJcbiAgICAvL9Cw0YLRgNC40LHRg9GCIG9uY2hhbmdlINC00L7QsdCw0LLQu9GP0Y4g0YfRgtC+0LHRiyDQvdC1INC60L7Qv9C40YDQvtCy0LDRgtGMINGD0LbQtSDRgdGD0YnQtdGB0YLQstGD0Y7RidGO0Y5cclxuICAgIC8v0LIg0YLRgNC10LrQtdGA0LUg0YTRg9C90LrRhtC40Y4g0LTQvtCx0LDQu9GP0L3QuNGPINC40L3Qv9GD0YLQvtCyXHJcbiAgICBkZWZhdWx0RmlsZUlucHV0LnNldEF0dHJpYnV0ZSgnb25jaGFuZ2UnLCdhZGRGaWxlSW5wdXQoXCJGaWxlSW5wdXRzXCIpJyk7XHJcbiAgICBkZWZhdWx0RmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwcm9jZXNzRmlsZXModGhpcyxhZGRlZEZpbGVzTGlzdCk7XHJcbiAgICAgICAgaGlkZUZpbGxlZEZpbGVJbnB1dCh0aGlzKTtcclxuICAgIH0pO1xyXG4gICAgZXhpc3RBZGRGaWxlLmFwcGVuZENoaWxkKHdyYXBGaWxlSW5wdXRzKGRlZmF1bHRGaWxlSW5wdXQpKTtcclxuXHJcbiAgICBsZXQgYWRkRmlsZU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XHJcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24obXV0YXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgIGlmKG11dGF0aW9uLmFkZGVkTm9kZXNbMF0udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IG11dGF0aW9uLmFkZGVkTm9kZXNbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdvbmNoYW5nZScsJ2FkZEZpbGVJbnB1dChcIkZpbGVJbnB1dHNcIiknKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NGaWxlcyh0aGlzLGFkZGVkRmlsZXNMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBoaWRlRmlsbGVkRmlsZUlucHV0KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/QstGB0LUg0L3QvtCy0YvQtSBpbnB1dCBmaWxlINC90YPQttC90L4g0L7QsdC10YDQvdGD0YLRjCxcclxuICAgICAgICAgICAgICAgIC8v0YHQsNC8IGlucHV0INCx0YPQtNC10YIg0YHQutGA0YvRglxyXG4gICAgICAgICAgICAgICAgbGV0IGZha2VJbnB1dCA9IHdyYXBGaWxlSW5wdXRzKGlucHV0KTtcclxuICAgICAgICAgICAgICAgIG11dGF0aW9uLnRhcmdldC5hcHBlbmRDaGlsZChmYWtlSW5wdXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgYWRkRmlsZU9ic2VydmVyQ29uZmlnID0ge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlLFxyXG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBhZGRGaWxlT2JzZXJ2ZXIub2JzZXJ2ZShleGlzdEFkZEZpbGUsIGFkZEZpbGVPYnNlcnZlckNvbmZpZyk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoYWRkRmlsZXNCbG9jayk7XHJcbiAgICByb3dJdGVtLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICAgIHJvd3NGcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAvLzUg0L/Rj9GC0LDRjyDRgdGC0YDQvtC60LAgLSDQutC90L7Qv9C60LAg0KHQvtGF0YDQsNC90LjRgtGMXHJcbiAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1maWVsZHMtcm93JywndGFzay1yb3ctNScpO1xyXG5cclxuICAgIGxldCBzYXZlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1zdWJtaXRCdXR0b25dJyk7XHJcbiAgICBzYXZlQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1hY3Rpb24nKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChzYXZlQnRuKTtcclxuICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gICAgcm93c0ZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgIC8v0LLRgdC1INGB0L7QsdGA0LDQvdC90L7QtS/Qv9C10YDQtdC80LXRidC10L3QvdC+0LUg0LLRgdGC0LDQstC70Y/RjiDQsiDQsdC70L7QulxyXG4gICAgbmV3Q29tbWVudC5hcHBlbmRDaGlsZChyb3dzRnJhZ21lbnQpO1xyXG5cclxuICAgIC8vLS3RgtGD0YIg0L3QsNCy0LXRiNC40LLQsNGOINGB0L7QsdGL0YLQuNGPINC90LAg0L/QtdGA0LXQvNC10YnQtdC90L3Ri9C1INGN0LvQtdC80LXQvdGC0YtcclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlRmlsbGVkRmlsZUlucHV0KGlucHV0KSB7XHJcbiAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4tZWxlbScpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByb2Nlc3NGaWxlcyhmaWVsZCwgZmlsZXNsaXN0KSB7XHJcbiAgICAgICAgbGV0IGZpbGUgPSBmaWVsZC5maWxlc1swXTtcclxuICAgICAgICBsZXQgZmlsZVNpemUgPSBmaWxlLnNpemU7XHJcblxyXG5cclxuICAgICAgICBpZighZmlsZXNsaXN0LmRhdGFzZXQudG90YWwpe1xyXG4gICAgICAgICAgICBmaWxlc2xpc3QuZGF0YXNldC50b3RhbCA9IGZpbGVTaXplO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBmaWxlc2xpc3QuZGF0YXNldC50b3RhbCA9IHBhcnNlSW50KGZpbGVzbGlzdC5kYXRhc2V0LnRvdGFsKSArIHBhcnNlSW50KGZpbGVTaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0b3RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlcy10b3RhbCcpO1xyXG4gICAgICAgIHRvdGFsLnRleHRDb250ZW50ID0gYnl0ZXNUb1NpemUoZmlsZXNsaXN0LmRhdGFzZXQudG90YWwpICsgJyDQuNC3IDMg0JzQsSc7XHJcblxyXG4gICAgICAgIGxldCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBwLmlubmVySFRNTCA9IGZpbGUubmFtZSArICc8c3BhbiBjbGFzcz1cInMtaW5mb1wiPicgKyBNYXRoLmNlaWwoZmlsZVNpemUgLyAxMDI0KSArICcgS2I8L3NwYW4+JztcclxuICAgICAgICBwLmNsYXNzTGlzdC5hZGQoJ2ZpbGUtbGlzdC1pdGVtJyk7XHJcblxyXG4gICAgICAgIGxldCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1yZW1vdmUtaXRlbScpO1xyXG4gICAgICAgIHJlbW92ZUJ0bi5kYXRhc2V0LmZpZWxkSWQgPSBmaWVsZC5pZDtcclxuXHJcbiAgICAgICAgcC5hcHBlbmRDaGlsZChyZW1vdmVCdG4pO1xyXG5cclxuICAgICAgICBmaWxlc2xpc3QuYXBwZW5kQ2hpbGQocCk7XHJcblxyXG4gICAgICAgIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZW1vdmVGaWxlSW5wdXQodGhpcyx0b3RhbCxmaWxlc2xpc3QsZmlsZVNpemUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL9C/0YDQuCDQstGL0LHQvtGA0LUg0LIg0YHQv9C40YHQutC1INC00L7Qvy7QtdC80LDQudC70L7QsiDRgdGA0LDQt9GDINCy0YHRgtCw0LLQu9GP0YLRjCDQsiDQv9C+0LvQtSDQtNC70Y8g0L7RgtC/0YDQsNCy0LrQuFxyXG4gICAgbGV0IGVtYWlsTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRfZW1haWxfd29ya2VyJyk7XHJcbiAgICBsZXQgb25QYWdlRW1haWxMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIG9uUGFnZUVtYWlsTGlzdC5jbGFzc0xpc3QuYWRkKCdlbWFpbC1zZW5kLWxpc3QnKTtcclxuICAgIGFkZEVtYWlsLmluc2VydEJlZm9yZShvblBhZ2VFbWFpbExpc3QsYWRkRW1haWwuY2hpbGROb2Rlc1syXSk7XHJcblxyXG4gICAgZW1haWxMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhZGRXb3JrZXJFbWFpbFRvU2VuZExpc3QodGhpcyxzZW5kTGlzdCxvblBhZ2VFbWFpbExpc3QpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy/Qv9GA0Lgg0LLRi9Cx0L7RgNC1INCyINGB0LXQu9C10LrRgtC1INCh0YLQsNGC0YPRgSDQv9C10YDQtdC60LvRjtGH0LDRjiDRgNCw0LTQuNC+LCDRh9GC0L7QsdGLINGE0L7RgNC80LAg0L/RgNCw0LLQuNC70YzQvdC+INGA0LDQsdC+0YLQsNC70LBcclxuICAgIHN0YXR1c0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudmFsdWUpLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy/Qv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDRgdGC0YDQsNC90LjRhtGLINC90YPQttC90L4g0YHQvNC+0YLRgNC10YLRjCDQstGL0LHRgNCw0L3QvdGL0Lkg0YDQsNC00LjQviDRgdC+INGB0YLQsNGC0YPRgdC+0LwgKNCyINGB0LrRgNGL0YLQvtC5INGH0LDRgdGC0Lgg0YLQsNCx0LvQuNGG0YsgI3Rhc2stZm9vdGVyKVxyXG4gICAgLy/QuCDRgdGC0LDQstC40YLRjCDRgdGC0LDRgtGD0YEg0LIg0YHQtdC70LXQutGC0LUgc3RhdHVzTGlzdFxyXG4gICAgdXBkYXRlU3RhdHVzTGlzdE9uTG9hZChzdGF0dXNMaXN0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRmllbGRBbmRMYWJlbCh0ZXh0LGZpZWxkKSB7XHJcbiAgICBsZXQgcm93SXRlbVByb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBsZXQgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gICAgcm93SXRlbVByb3RvLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgIHJvd0l0ZW1Qcm90by5hcHBlbmRDaGlsZChmaWVsZCk7XHJcbiAgICByZXR1cm4gcm93SXRlbVByb3RvO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdGF0dXNMaXN0KHRibCkge1xyXG4gICAgbGV0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcclxuICAgIGxldCByb3dzID0gQXJyYXkuZnJvbSh0YmwucXVlcnlTZWxlY3RvckFsbCgndHInKSk7XHJcblxyXG4gICAgbGV0IG9wdGdyb3VwO1xyXG5cclxuICAgIHJvd3MubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgaWYoaXRlbS5maXJzdEVsZW1lbnRDaGlsZC5nZXRBdHRyaWJ1dGUoJ2NvbHNwYW4nKSl7XHJcbiAgICAgICAgICAgIG9wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0Z3JvdXAnKTtcclxuICAgICAgICAgICAgb3B0Z3JvdXAubGFiZWwgPSBpdGVtLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBsaXN0LmFwcGVuZENoaWxkKG9wdGdyb3VwKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHJhZGlvID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IHJhZGlvLmlkO1xyXG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJykudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG9wdGdyb3VwLmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVN0YXR1c0xpc3RPbkxvYWQobGlzdCkge1xyXG4gICAgbGV0IHN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9bmV3X3Byb2JsZW1fc3RhdHVzXTpjaGVja2VkJyk7XHJcblxyXG4gICAgZm9yKCBsZXQgaSBvZiBsaXN0Lm9wdGlvbnMpe1xyXG4gICAgICAgIGlmKGkudmFsdWUgPT09IHN0YXR1cy5pZCl7XHJcbiAgICAgICAgICAgIGkuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkV29ya2VyRW1haWxUb1NlbmRMaXN0KHNlbGVjdCwgaW5wdXQsIGxpc3QpIHtcclxuICAgIGxldCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tzZWxlY3Quc2VsZWN0ZWRJbmRleF07XHJcbiAgICBsZXQgZGF0YSA9IFtvcHRpb24udGV4dCxzZWxlY3QudmFsdWVdO1xyXG4gICAgbGV0IGVtYWlsID0gZGF0YVsxXTtcclxuXHJcbiAgICBpZiAoZW1haWwudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgbGV0IGFkZEVtYWlsID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgbGV0IG5ld3ZhbCA9ICcnO1xyXG5cclxuICAgICAgICBpZiAoYWRkRW1haWwgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgbmV3dmFsID0gZW1haWw7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhZGRFbWFpbC5pbmRleE9mKGVtYWlsKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgbmV3dmFsID0gYWRkRW1haWwgKyAoZW1haWwuY2hhckF0KGFkZEVtYWlsLmxlbmd0aCAtIDEpID09IFwiO1wiID8gXCJcIiA6IFwiO1wiKSArIGVtYWlsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXQudmFsdWUgPSBuZXd2YWw7XHJcblxyXG4gICAgICAgIGxldCBuZXdpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBuZXdpdGVtLnRleHRDb250ZW50ID0gZGF0YVswXTtcclxuICAgICAgICBuZXdpdGVtLmRhdGFzZXQuZW1haWwgPSBkYXRhWzFdO1xyXG5cclxuICAgICAgICBsaXN0LmFwcGVuZENoaWxkKG5ld2l0ZW0pO1xyXG5cclxuICAgICAgICBuZXdpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZW1vdmVJdGVtRnJvbVNlbmRsaXN0KHRoaXMsIHNlbGVjdCwgaW5wdXQpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v0LLRi9Cx0YDQsNC90L3QvtCz0L4g0L/QvtC70YPRh9Cw0YLQtdC70Y8g0YHQutGA0YvQstCw0Y5cclxuICAgICAgICAvL9GB0YLQsNCy0LvRjiDQstGL0LHRgNCw0L3QvdGL0Lwg0LTQtdGE0L7Qu9GC0L3Ri9C5ICjQv9C10YDQstGL0LkpINGN0LvQtdC80LXQvdGCINGB0L/QuNGB0LrQsFxyXG5cclxuICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKCdoaWRkZW4nLCcnKTtcclxuICAgICAgICBzZWxlY3Qub3B0aW9uc1swXS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUl0ZW1Gcm9tU2VuZGxpc3QoaXRlbSwgc2VsZWN0LCBpbnB1dCkge1xyXG4gICAgbGV0IHRleHQgPSBpdGVtLmRhdGFzZXQuZW1haWw7XHJcblxyXG4gICAgbGV0IHNlbmRMaXN0ID0gaW5wdXQudmFsdWUuc3BsaXQoJzsnKTtcclxuXHJcbiAgICBsZXQgZmlsdGVyZWRTZW5kTGlzdCA9IHNlbmRMaXN0LmZpbHRlcihmdW5jdGlvbiAobGlzdGl0ZW0pIHtcclxuICAgICAgICBpZihsaXN0aXRlbSAhPT0gdGV4dCl7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0aXRlbVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlucHV0LnZhbHVlID0gZmlsdGVyZWRTZW5kTGlzdC5qb2luKCc7Jyk7XHJcblxyXG4gICAgaXRlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGl0ZW0pO1xyXG5cclxuICAgIGZvciggbGV0IGkgb2Ygc2VsZWN0Lm9wdGlvbnMpe1xyXG4gICAgICAgIGlmKGkudmFsdWUgPT09IHRleHQpe1xyXG4gICAgICAgICAgICBpLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVGaWxlSW5wdXQoYnRuLHRvdGFsLGZpbGVzbGlzdCxmaWxlc2l6ZSkge1xyXG4gICAgbGV0IHVwZGF0ZVRvdGFsU2l6ZSA9IGZpbGVzbGlzdC5kYXRhc2V0LnRvdGFsIC0gZmlsZXNpemU7XHJcbiAgICBmaWxlc2xpc3QuZGF0YXNldC50b3RhbCA9IHVwZGF0ZVRvdGFsU2l6ZTtcclxuICAgIHRvdGFsLnRleHRDb250ZW50ID0gYnl0ZXNUb1NpemUodXBkYXRlVG90YWxTaXplKSArICcg0LjQtyAzINCc0LEnO1xyXG5cclxuICAgIGxldCBpbnB1dElkID0gYnRuLmRhdGFzZXQuZmllbGRJZDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlucHV0SWQpLnBhcmVudE5vZGUucmVtb3ZlKCk7XHJcbiAgICBidG4ucGFyZW50Tm9kZS5yZW1vdmUoKTtcclxuXHJcbiAgICBsZXQgZmlsZUlucHV0cyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2LmZpbGVJbnB1dCcpKTtcclxuICAgIGxldCByZW1vdmVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1yZW1vdmUtaXRlbScpO1xyXG5cclxuICAgIC8v0L/QtdGA0LXQv9C40YHQsNGC0Ywg0LjQvNC10L3QsCDQuCBpZCDQstGB0LXRhSDQuNC90L/Rg9GC0L7Qsi5cclxuICAgIC8v0LXRgdC70Lgg0L7QvdC4INC40LTRg9GCINC90LUg0L/QviDQv9C+0YDRj9C00LrRgyDQuNC70Lgg0YEg0L/RgNC+0L/Rg9GB0LrQsNC80LhcclxuICAgIC8v0L/RgNC4INC30LDQs9GA0YPQt9C60LUg0YTQsNC50LvQvtCyINC90LAg0YHQtdGA0LLQtdGAINCx0YPQtNC10YIg0L7RiNC40LHQutCwXHJcbiAgICAvL9GC0L4g0LbQtSDQvdCw0LTQviDRgdC00LXQu9Cw0YLRjCDRgSBkYXRhLWlucHV0LWlkINC60L3QvtC/0L7QuiDRg9C00LDQu9C10L3RjyDRhNCw0LnQu9CwXHJcbiAgICAvL9CwINGC0L4g0LHRg9C00LXRgiDRg9C00LDQu9GP0YLRgdGPINC90LUg0YLQvtGCINC40L3Qv9GD0YJcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlSW5wdXRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBmaWxlSW5wdXRzW2ldLmZpcnN0RWxlbWVudENoaWxkLmlkID0gJ2ZpbGVJbnB1dCcraTtcclxuICAgICAgICBmaWxlSW5wdXRzW2ldLmZpcnN0RWxlbWVudENoaWxkLm5hbWUgPSAnZmlsZUlucHV0JytpO1xyXG4gICAgICAgIHJlbW92ZUJ0bnNbaV0uZGF0YXNldC5maWVsZElkID0gJ2ZpbGVJbnB1dCcraTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gd3JhcEZpbGVJbnB1dHMoaW5wdXQpIHtcclxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBsZXQgYnRuID0gd3JhcC5jbG9uZU5vZGUoZmFsc2UpO1xyXG5cclxuICAgIHdyYXAuY2xhc3NMaXN0LmFkZCgnZmFrZS1maWxlLWlucHV0JyxpbnB1dC5jbGFzc0xpc3RbMF0pO1xyXG4gICAgd3JhcC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gICAgYnRuLmlubmVySFRNTCA9ICfQlNC+0LHQsNCy0LjRgtGMINGE0LDQudC7IDxzcGFuPtCd0LDQttC80Lgg0LjQu9C4INGC0LDRidC4INC10LPQviDRgdGO0LTQsDwvc3Bhbj4nO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1mYWtlLWZpbGUnKTtcclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoYnRuKTtcclxuXHJcbiAgICB3cmFwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdpcy1ob3ZlcicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhvdmVyJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3cmFwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhvdmVyJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gd3JhcDtcclxufVxyXG5cclxuZnVuY3Rpb24gYnl0ZXNUb1NpemUoYnl0ZXMpIHtcclxuICAgIGxldCBzaXplcyA9IFsnQnl0ZXMnLCAn0JrQsScsICfQnNCxJywgJ9CT0LEnLCAn0KLQsSddO1xyXG4gICAgaWYgKCFieXRlcykge1xyXG4gICAgICAgIHJldHVybiAnMCdcclxuICAgIH1cclxuICAgIGxldCBpID0gcGFyc2VJbnQoTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZygxMDI0KSkpO1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoYnl0ZXMgLyBNYXRoLnBvdygxMDI0LCBpKSwgMikgKyAnICcgKyBzaXplc1tpXTtcclxufVxyXG5cclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcyc7XHJcblxyXG5leHBvcnQge3Rhc2tGb290ZXJEZXNpZ259O1xyXG5cclxuaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpe1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIHRhc2tGb290ZXJEZXNpZ24nKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Rhc2tGb290ZXJEZXNpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3Rhc2tGb290ZXJEZXNpZ24ucGNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi90YXNrRm9vdGVyRGVzaWduLnBjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdGFza0Zvb3RlckRlc2lnbi5wY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3Rhc2stZm9vdGVyIHRyOm50aC1jaGlsZCgyKXtoZWlnaHQ6MDtvdmVyZmxvdzpoaWRkZW59LmZha2UtZmlsZS1pbnB1dCAuYnRuLWZha2UtZmlsZXtwYWRkaW5nOi43ZW0gMCAwO3RleHQtYWxpZ246Y2VudGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2ZvbnQtc2l6ZToxNnB4O2NvbG9yOiM4MmE1YzM7Y3Vyc29yOnBvaW50ZXJ9LmZha2UtZmlsZS1pbnB1dCAuYnRuLWZha2UtZmlsZSBzcGFue3dpZHRoOjEwMCU7ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC1zaXplOjEycHh9LmZha2UtZmlsZS1pbnB1dD5pbnB1dHt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtvcGFjaXR5OjB9I0ZpbGVJbnB1dHMgYnJ7ZGlzcGxheTpub25lfS50YXNrLXR5cGU+ZGl2IHNlbGVjdHttYXJnaW4tdG9wOi4zZW19LnRhc2stdHlwZT5kaXYgYnJ7ZGlzcGxheTpub25lfS5lbWFpbC1zZW5kLWxpc3Q+bGk6YWZ0ZXJ7Y29udGVudDpcXFwiXFxcXDFGN0E5XFxcIjttYXJnaW4tbGVmdDouNGVtO2NvbG9yOnJlZDtkaXNwbGF5OmlubGluZS1ibG9jaztjdXJzb3I6cG9pbnRlcn0uYWRkLWVtYWlsICNnZXRFbWFpbEFkZHJlc3Nlc0J1dHRvbntkaXNwbGF5Om5vbmVcXHJcXG4gICAgICAgIC8qd2lkdGg6IDkwcHg7XFxyXFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyovfS5hZGQtZW1haWwgI2FkZF9lbWFpbF93b3JrZXJ7d2lkdGg6MjI2cHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hZGQtZW1haWwgI2FkZF9lbWFpbHtwb3NpdGlvbjphYnNvbHV0ZTt2aXNpYmlsaXR5OmhpZGRlbjt6LWluZGV4OmF1dG99LmFkZC1lbWFpbCBsYWJlbHtkaXNwbGF5OmJsb2NrfTpyb290IC5kZWFkbGluZS1jYWxlbmRhciAjZW5kX2RhdGV7d2lkdGg6YXV0byFpbXBvcnRhbnR9OnJvb3QgLmRlYWRsaW5lLWNhbGVuZGFyIGlucHV0W3R5cGU9YnV0dG9uXXtkaXNwbGF5Om5vbmV9OnJvb3QgLmRlYWRsaW5lLWNhbGVuZGFyPmltZ3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6LjRlbTtyaWdodDouNWVtfTpyb290IC5kZWFkbGluZS1jYWxlbmRhcj5pbnB1dFt0eXBlPXRleHRde3BhZGRpbmctcmlnaHQ6MzBweH0udGFzay1yb3ctMiAudGltZS1ibG9jaz5kaXY6YWZ0ZXJ7Y29udGVudDpcXFwiXFxcXDQzQ1xcXFw0MzhcXFxcNDNEXFxcIjttYXJnaW4tbGVmdDouNWVtO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ud29ya2VyLWJsb2NrIHNlbGVjdHt3aWR0aDoxMDAlO21hcmdpbjouNWVtIDAgMH0udGFzay1maWVsZHMtcm93IC5mcm93LWNvbC0yLTJ7d2lkdGg6MTIwcHh9LnRhc2stZmllbGRzLXJvdyAuZnJvdy1jb2wtMi0xe3dpZHRoOjE5MHB4O21hcmdpbi1yaWdodDozMHB4fS50YXNrLWZpZWxkcy1yb3cgdGR7cGFkZGluZzowO2ZvbnQtc2l6ZToxMDAlO2Rpc3BsYXk6YmxvY2t9LnRhc2stZmllbGRzLXJvdyBzZWxlY3R7cGFkZGluZzouM2VtIDAgLjNlbSAuMmVtfS50YXNrLWZpZWxkcy1yb3cgaW5wdXQuaW5wdXRfZmllbGQsLnRhc2stZmllbGRzLXJvdyBpbnB1dFt0eXBlPXRleHRdLC50YXNrLWZpZWxkcy1yb3cgc2VsZWN0e3dpZHRoOmF1dG87bWF4LXdpZHRoOjEwMCU7aGVpZ2h0OjJlbTtwYWRkaW5nOi4zZW0gLjZlbTtib3JkZXI6MXB4IHNvbGlkICM5ZTllOWU7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9LnRhc2stZmllbGRzLXJvdyBpbnB1dC5pbnB1dF9maWVsZDpmb2N1cywudGFzay1maWVsZHMtcm93IGlucHV0W3R5cGU9dGV4dF06Zm9jdXMsLnRhc2stZmllbGRzLXJvdyBzZWxlY3Q6Zm9jdXN7Ym9yZGVyLWNvbG9yOiMyNmE2OWF9LmNvbnRlbnR7XFxyXFxuICAgIC8q0YPQsdC40YDQsNGOINC70LjRiNC90LjQtSDQvtGC0YHRgtGD0L/RiyDQuCBiciDRh9GC0L7QsdGLINGD0LzQtdC90YzRiNC40YLRjCDQtNGL0YDRgyDQv9C+0LQg0L/QvtC70Y/QvNC4INC60LDQvNC10L3RgtCwKi9wYWRkaW5nLWJvdHRvbTowfVxcclxcblxcclxcbi8qINC/0YDQtdCy0YDQsNGJ0LDRjiDQstGB0LUg0LIg0LHQu9C+0LrQuCovI3RibC1uZXctY29tbWVudCB0Ym9keSwjdGJsLW5ldy1jb21tZW50IHRkLCN0YmwtbmV3LWNvbW1lbnQgdHJ7ZGlzcGxheTpibG9ja31cXHJcXG5cXHJcXG4vKtGB0LrRgNGL0LLQsNGOINC/0LXRgNCy0YPRjiDRj9GH0LXQudC60YMg0YEg0YLQtdC60YHRgtC+0Lwg0KLQtdC60YHRgiovI3RibC1uZXctY29tbWVudCB0cjpmaXJzdC1jaGlsZD50ZDpmaXJzdC1jaGlsZHtkaXNwbGF5Om5vbmV9I3RibC1uZXctY29tbWVudCticntcXHJcXG4gICAgLyrRg9Cx0LjRgNCw0Y4g0LvQuNGI0L3QuNC1INC+0YLRgdGC0YPQv9GLINC4IGJyINGH0YLQvtCx0Ysg0YPQvNC10L3RjNGI0LjRgtGMINC00YvRgNGDINC/0L7QtCDQv9C+0LvRj9C80Lgg0LrQsNC80LXQvdGC0LAqL2Rpc3BsYXk6bm9uZX1cXHJcXG5cXHJcXG4vKtCy0YvRgNC+0LLQvdGP0YLRjCDQvdC+0LLRi9C5INC60LDQvNC10L3RgiDQv9C+INC60LDRgNGC0L7Rh9C60LDQvCDQutCw0LzQtdC90YLQvtCyKi8jbmV3LWNvbW1lbnQtd3JhcHttYXgtd2lkdGg6NzIwcHg7bWFyZ2luOmF1dG99XFxyXFxuXFxyXFxuLyp0ZXh0YXJlYSovXFxyXFxuXFxyXFxuLyrQt9Cw0LPQvtC70L7QstC+0Log0JTQvtCx0LDQstC40YLRjCDQutC+0LzQvNC10L3RgtCw0YDQuNC5Ki8udGx7ZGlzcGxheTpub25lfVxcclxcblxcclxcbi8q0L7QsdC10YDRgtC60LAg0LLQvtC60YDRg9CzINC/0L7Qu9GPINCU0L7QsdCw0LLQuNGC0Ywg0LrQvtC80LzQtdC90YLQsNGA0LjQuSovLnRhcmVhLXdyYXB7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufSN0ZXh0e3dpZHRoOjEwMCU7cGFkZGluZzouNmVtIC44ZW07Zm9udC1mYW1pbHk6aW5oZXJpdDtmb250LXNpemU6MTRweDtib3JkZXI6MDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNoYWRvdzppbnNldCAwIC0ycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLGluc2V0IDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsLjEyKSxpbnNldCAwIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKX1cXHJcXG5cXHJcXG4vKtC+0YTQvtGA0LzQu9C10L3QuNC1INC/0L7Qu9C10Lkg0Lgg0YHRgtGA0L7QuiDRgSDQv9C+0LvRj9C80Lgg0L/QvtC0INC/0L7Qu9C10Lwg0LrQsNC80LXQvdGC0LAqLy50YXNrLWZpZWxkcy1yb3d7bWF4LXdpZHRoOjcyMHB4O21hcmdpbjoxLjZlbSBhdXRvfS50YXNrLWZpZWxkcy1yb3cgbGFiZWx7bWFyZ2luOjAgMCAuNWVtO2NvbG9yOmdyYXk7ZGlzcGxheTppbmxpbmUtYmxvY2t9XFxyXFxuXFxyXFxuLyogMSDRgdGC0YDQvtC60LAgKi8udGFzay1yb3ctMXtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleFxcclxcbiAgICAvKmp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsqL30ud29ya2VyLWJsb2Nre3dpZHRoOjMwMHB4O21hcmdpbi1yaWdodDo3MHB4Oy1tcy1mbGV4OjAgMCAzMDBweDtmbGV4OjAgMCAzMDBweH0ud29ya2VyLWJsb2NrIGlucHV0W3R5cGU9cmFkaW9de2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LS4yZW19XFxyXFxuXFxyXFxuLyogMiDRgdGC0YDQvtC60LAgKi8udGFzay1yb3ctMntkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleFxcclxcbiAgICAvKmp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsqL30udGFzay1yb3ctMiAudGltZS1ibG9ja3t3aWR0aDozMDBweDttYXJnaW4tcmlnaHQ6NzBweDstbXMtZmxleDowIDAgMzAwcHg7ZmxleDowIDAgMzAwcHg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtcGFjazpqdXN0aWZ5O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS50YXNrLXJvdy0yIC50aW1lLWJsb2NrPmRpdnt3aWR0aDoxMjBweH0udGFzay1yb3ctMiAudGltZS1ibG9jaz5kaXYgaW5wdXR7d2lkdGg6NzYlO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX06cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXJ7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzowIWltcG9ydGFudDtmb250LXNpemU6MTAwJVxcclxcbiAgICAvKmZsZXg6IDEgMSAxODBweDsqL306cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXI+aW1nLDpyb290IC5kZWFkbGluZS1jYWxlbmRhcj5pbnB1dHtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3A7Ym94LXNpemluZzpib3JkZXItYm94fVxcclxcblxcclxcbi8qIDMg0YHRgtGA0L7QutCwICovLnRhc2stcm93LTN7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXhcXHJcXG4gICAgLypqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47Ki99LmFkZC1lbWFpbHt3aWR0aDozMDBweDttYXJnaW4tcmlnaHQ6NzBweDstbXMtZmxleDowIDAgMzAwcHg7ZmxleDowIDAgMzAwcHg7cG9zaXRpb246cmVsYXRpdmV9LmFkZC1lbWFpbCBhe2Rpc3BsYXk6bm9uZX0uZW1haWwtc2VuZC1saXN0e21hcmdpbjouNGVtIDAgLjVlbTtwYWRkaW5nOjA7bGlzdC1zdHlsZS10eXBlOm5vbmV9LmVtYWlsLXNlbmQtbGlzdD5saXttYXJnaW46MDtsaW5lLWhlaWdodDoxfS5lbWFpbC1zZW5kLWxpc3Q+bGk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxCN1xcXCI7Zm9udC1zaXplOjEuNWVtO21hcmdpbi1yaWdodDouMmVtO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0udGFzay10eXBle1xcclxcblxcclxcbiAgICAvKtCyINC00LjQstCw0YUg0L/RgNGP0YfRg9GC0YzRgdGPINGB0LXQu9C10LrRgtGLINGBINC/0L7QtNGC0LjQv9Cw0LzQuCovfS50YXNrLXR5cGUgc2VsZWN0e21pbi13aWR0aDoxOTBweH1cXHJcXG5cXHJcXG4vKiA0INGB0YLRgNC+0LrQsCAqLy5hZGQtZmlsZXN7XFxyXFxuXFxyXFxuICAgIC8q0L/QviDQutC70LjQutGDINC90LAg0Y3RgtGDINGB0YHRi9C70LrRgyDRgdC+0LfQtNCw0LLQsNC70YHRjyDQvdC+0LLRi9C5IGZpbGUgaW5wdXRcXHJcXG4gICAg0YHQutGA0L7RjiDQtdC1LCDQsCDRgdC+0LHRi9GC0LjQtSDQv9C+0LLQtdGI0YMg0L3QsCBjaGFuZ2Ug0YHQsNC80L7Qs9C+INC40L3Qv9GD0YLQsCovfS5hZGQtZmlsZXMgYXtkaXNwbGF5Om5vbmVcXHJcXG4gICAgICAgIC8qbWFyZ2luLXRvcDogLjhlbTtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsqL30jRmlsZUlucHV0cyBpbnB1dDpub3QoOmZpcnN0LWNoaWxkKXttYXJnaW4tdG9wOi4zZW07ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfS5idG4tcmVtb3ZlLWl0ZW17d2lkdGg6MTJweDtoZWlnaHQ6MThweDttYXJnaW4tbGVmdDouM2VtO2NvbG9yOnJlZDtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOnBvaW50ZXJ9LmJ0bi1yZW1vdmUtaXRlbTphZnRlcntjb250ZW50OlxcXCJcXFxcMUY3QTlcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MH0uZmFrZS1maWxlLWlucHV0e3dpZHRoOjIyNXB4O2hlaWdodDo2MHB4O2JvcmRlcjoxcHggZGFzaGVkICM4MmE1YzM7YmFja2dyb3VuZDojZjRmNmY4O3RleHQtYWxpZ246Y2VudGVyO2JvcmRlci1yYWRpdXM6LjVlbTtwb3NpdGlvbjpyZWxhdGl2ZX0uZmFrZS1maWxlLWlucHV0LmlzLWhvdmVye2JhY2tncm91bmQ6I2QyZGNlNX0uZmlsZXMtbGlzdHttYXJnaW46LS41ZW0gMCAuNWVtO3BhZGRpbmc6MDtsaXN0LXN0eWxlLXR5cGU6bm9uZTt0cmFuc2l0aW9uOmhlaWdodCAuM3N9LmZpbGVzLWxpc3QgLmZpbGUtbGlzdC1pdGVte21hcmdpbjouNGVtIDB9LmZpbGVzLWxpc3QgLmZpbGUtbGlzdC1pdGVtIC5zLWluZm97cGFkZGluZy1sZWZ0Oi42ZW07ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfVxcclxcblxcclxcbi8q0YHQutGA0YvQstCw0Y4g0L/Rg9GB0YLRi9C1INGP0YfQtdC50LrQuCwg0L/QvtC70Y8g0LjQtyDQvdC40YUg0L/QtdGA0LXQvNC10YnQtdC90Ysg0LIg0L3QvtCy0YvQuSDQsdC70L7QuiAjbmV3LWNvbW1lbnQtd3JhcCovI3Rhc2stZm9vdGVyIHRib2R5LCN0YXNrLWZvb3RlciB0ZCwjdGFzay1mb290ZXIgdHJ7ZGlzcGxheTpibG9ja31cXHJcXG5cXHJcXG4vKtC60L3QvtC/0LrQsCDRgdC+0YXRgNCw0L3QuNGC0YwqLy5idG4tYWN0aW9ue2hlaWdodDozNnB4O3BhZGRpbmc6MCAxLjZlbTtmb250LXNpemU6MTRweDtjb2xvcjojZmZmO2JvcmRlcjowO2JvcmRlci1yYWRpdXM6NHB4O2JhY2tncm91bmQ6IzdlYjUxOTtjdXJzb3I6cG9pbnRlcn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3tcImltcG9ydExvYWRlcnNcIjoxfSEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIhLi9zcmMvcGNzcy90YXNrRm9vdGVyRGVzaWduLnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIGVsZW1zTW9kaWZpY2F0aW9uJyk7XHJcbn1cclxuXHJcbmltcG9ydCB7bW9kaWZ5U2VsZWN0T3B0aW9uc0xpc3QsZmluZEluQXJyYXl9IGZyb20gJy4vX3V0aWxzLmpzJztcclxuaW1wb3J0IHtnZXRBbGxDb21tZW50c1Jvd3MsZ2V0QWxsV29ya2Vyc30gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcblxyXG4vL9C40LfQvNC10L3QtdC90LjQtSDRjdC70LXQvNC10L3RgtC+0LIg0L3QsCDRgdGC0YDQsNC90LjRhtC1INC30LDQtNCw0YfQuFxyXG4vL9CyINGB0L7QvtGC0LLQtdGC0YHQstC40Lgg0YEg0L3QsNGB0YLRgNC+0LnQutCw0LzQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cclxuZnVuY3Rpb24gZWxlbXNNb2RpZmljYXRpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGRhcnRfd29ya2Vyc19saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludGVybmFsX3dvcmtlcicpO1xyXG5cclxuICAgIC8v0YHRgNCw0LLQvdC40LLQsNC10Lwg0YHQv9C40YHQvtC6INC/0YDQvtC10LrRgtC+0LIg0YEg0YHQvtGF0YDQsNC90LXQvdC90YvQvCDQsiDQvdCw0YHRgtGA0L7QudC60LDRhVxyXG4gICAgLy/Qv9GA0L7QtdC60YLRiyDQutC+0YLQvtGA0YvRhSDQvdC10YIg0LIg0L3QsNGB0YLRgNC+0LnQutCwINGB0LrRgNGL0LLQsNC10LxcclxuICAgIHRoaXMubW9kaWZ5UHJvamVjdExpc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtc191c2VyX3Byb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFyYW1zX3VzZXJfcHJvamVjdHMnKSk7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXNfdXNlcl9wcm9qZWN0cyA9PT0gbnVsbCB8fCAhcGFyYW1zX3VzZXJfcHJvamVjdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ9Cd0LXRgiDRgdC+0LHRgdGC0LLQtdC90L3QvtCz0L4g0YHQv9C40YHQutCwINC/0YDQvtC10LrRgtC+0LInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGFydF9wcm9qZWN0c19saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RfaWQnKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xpZW50X2lkJyk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBkYXJ0X3Byb2plY3RzX2xpc3Qub3B0aW9ucztcclxuXHJcbiAgICAgICAgbW9kaWZ5U2VsZWN0T3B0aW9uc0xpc3Qob3B0aW9ucywgcGFyYW1zX3VzZXJfcHJvamVjdHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL9GB0YDQsNCy0L3QuNCy0LDQtdC8INGB0L/QuNGB0L7QuiDQuNGB0L/QvtC70L3QuNGC0LXQu9C10Lkg0YEg0YHQvtGF0YDQsNC90LXQvdC90YvQvCDQsiDQvdCw0YHRgtGA0L7QudC60LDRhVxyXG4gICAgLy/QuNGB0L/QvtC70L3QuNGC0LXQu9C10Lkg0LrQvtGC0L7RgNGL0YUg0L3QtdGCINCyINC90LDRgdGC0YDQvtC50LrQsCDRgdC60YDRi9Cy0LDQtdC8XHJcbiAgICB0aGlzLm1vZGlmeVdvcmtlcnNMaXN0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgcGFyYW1zX3VzZXJfd29ya2VycyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BhcmFtc191c2VyX3dvcmtlcnMnKSk7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXNfdXNlcl93b3JrZXJzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ9Cd0LXRgiDRgdC+0LHRgdGC0LLQtdC90L3QvtCz0L4g0YHQv9C40YHQutCwINGB0L7RgtGA0YPQtNC90LjQutC+0LInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXJhbXNfdXNlcl93b3JrZXJzID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2xldCBkYXJ0X3dvcmtlcnNfbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRlcm5hbF93b3JrZXInKTtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBkYXJ0X3dvcmtlcnNfbGlzdC5vcHRpb25zOyAvL9GB0L/QuNGB0L7QuiDQstGB0LXRhSDRgdC+0YLRgNGD0LTQvdC40LrQvtCyINC40Lcg0YHQtdC70LXQutGC0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblxyXG4gICAgICAgIC8v0LXRgdC70Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40Lkg0YHQv9C40YHQvtC6INGB0L7RgtGA0YPQtNC90LjQutC+0LIg0L3QtSDQv9GD0YHRglxyXG4gICAgICAgIC8v0Lgg0LXRgdC70Lgg0LIg0LfQsNC00LDRh9C1INGD0YfQsNGB0YLQstGD0LXRgiDRgdC+0YLRgNGD0LTQvdC40Log0LrQvtGC0L7RgNC+0LPQviDQvdC10YIg0LIg0YHQv9C40YHQutC1INC+0YHRgtCw0LLQu9GP0Y4g0LXQs9C+INC+0YLQutGA0YvRgtGL0LxcclxuICAgICAgICBpZiAocGFyYW1zX3VzZXJfd29ya2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy/Qv9C+0LvRg9GH0LDRjiDRgdC/0LjRgdC+0Log0LLRgdC10YUg0YPRh9Cw0YHRgtC90LjQutC+0LIg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgICAgIGxldCB0YXNrX3dvcmtlcnMgPSBnZXRBbGxXb3JrZXJzKCk7XHJcbiAgICAgICAgICAgIGxldCB0YXNrX3dvcmtlcnNfaWQgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8v0YHRgNCw0LLQvdC10L3QuNC1INGB0L/QuNGB0LrQvtCyLCDQtdGB0LvQuCDRgNCw0LHQvtGC0L3QuNC60LAg0L3QtdGCINCyINGB0L/QuNGB0LrQtSDQuNC3INC90LDRgdGC0YDQvtC10Log0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPIC0g0LTQvtCx0LDQstC70Y/RjlxyXG4gICAgICAgICAgICAvL9GB0L3QsNGH0LDQu9CwINC90YPQttC90L4g0L/QvtC70YPRh9C40YLRjCDRgdC+0L7RgtCy0LXRgtGB0LLQuNC1INC40LzRjyDRgdC+0YLRgNGD0LTQvdC40LrQsCAtPiBvcHRpb24udmFsdWUg0YIu0LUuINC70L7Qs9C40L0g0YHQvtGC0YDRg9C00L3QuNC60LAg0L3QsCDQsNC90LPQu9C40YbQutC+0LxcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWZfZmluZCA9IGZpbmRJbkFycmF5KHRhc2tfd29ya2Vycywgb3B0aW9uc1tpXS50ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaWZfZmluZCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFza193b3JrZXJzX2lkLnB1c2gob3B0aW9uc1tpXS52YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/Qt9Cw0YLQtdC8INGB0YDQsNCy0L3QuNGC0Ywg0YHQviDRgdC/0LjRgdC60L7QvCDQuNC3INC90LDRgdGC0YDQvtC10LpcclxuICAgICAgICAgICAgLy/QuCDQtNC+0LHQsNCy0LjRgtGMINGA0LDQsdC+0YLQvdC40LrQsCDQtdGB0LvQuCDQtdCz0L4g0L3QtdGCINCyINGB0L/QuNGB0LrQtVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhc2tfd29ya2Vyc19pZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlmX2ZpbmQgPSBmaW5kSW5BcnJheShwYXJhbXNfdXNlcl93b3JrZXJzLCB0YXNrX3dvcmtlcnNfaWRbaV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpZl9maW5kIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtc191c2VyX3dvcmtlcnMucHVzaCh0YXNrX3dvcmtlcnNfaWRbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKCfQkiDRgdC/0LjRgdC+0Log0LTQvtCx0LDQstC70LXQvSAnKyB0YXNrX3dvcmtlcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtb2RpZnlTZWxlY3RPcHRpb25zTGlzdChvcHRpb25zLCBwYXJhbXNfdXNlcl93b3JrZXJzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8v0LIg0YHQv9C40YHQutC1INC40YHQv9C+0LvQvdC40YLQtdC70LXQuSDQvtGC0LzQtdGH0LDRjiBzZWxlY3RlZCDRgNCw0LHQvtGC0L3QuNC60LAg0L7RgdGC0LDQstC40LLRiNC10LPQviDQv9C+0YHQu9C10LTQvdC40Lkg0LrQvtC80LzQtdC90YLRgNC40Lkg0LIg0LfQsNC00LDRh9C1XHJcbiAgICB0aGlzLnNldFNlbGVjdGVkSW5Xb3JrZXJzTGlzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbGFzdF9yb3cgPSBnZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuICAgICAgICBsYXN0X3JvdyA9IGxhc3Rfcm93W2xhc3Rfcm93Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGxldCBsYXN0X3dvcmtlciA9IGxhc3Rfcm93LmNoaWxkcmVuWzRdLnRleHRDb250ZW50O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhcnRfd29ya2Vyc19saXN0Lm9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGxhc3Rfd29ya2VyID09PSBkYXJ0X3dvcmtlcnNfbGlzdC5vcHRpb25zW2ldLnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGRhcnRfd29ya2Vyc19saXN0Lm9wdGlvbnNbaV0uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcclxuICAgICAgICAgICAgICAgIC8vZmlyZUV2ZW50INC90YPQttC10L0g0YfRgtC+0LHRiyDQstGL0LfQstCw0YLRjCDQv9C+0LLQtdGI0LXQvdC90YPRjiDQvdCwINGB0L7QsdGL0YLQuNC1INGE0YPQvdC60YbQuNGOXHJcbiAgICAgICAgICAgICAgICAvL9CyINC60L7RgtC+0YDQvtC5INC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0YDQsNCx0L7RgtC90LjQuiDQsiDRgdC/0LjRgdC+0Log0LTQu9GPINGA0LDRgdGB0YvQu9C60Lgg0YEg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgICAgICAgICBsZXQgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcclxuICAgICAgICAgICAgICAgIGV2dC5pbml0RXZlbnQoJ2NoYW5nZScsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGRhcnRfd29ya2Vyc19saXN0LmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50ZXJuYWxfd29ya2VyJykpIHtcclxuICAgICAgICB0aGlzLm1vZGlmeVdvcmtlcnNMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZEluV29ya2Vyc0xpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RfaWQnKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xpZW50X2lkJykpIHtcclxuICAgICAgICB0aGlzLm1vZGlmeVByb2plY3RMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0L/QvtC70LUg0LLQstC+0LTQsCBpZCDQt9Cw0LTQsNGH0Lgg0Lgg0L/QtdGA0LXRhdC+0LQg0Log0LfQsNC00LDRh9C1XHJcblxyXG4gICAgbGV0IGdvVG9GaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb1RvJyk7XHJcbiAgICBnb1RvRmllbGQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG59XHJcblxyXG5leHBvcnQge2VsZW1zTW9kaWZpY2F0aW9ufTtcclxuXHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBlbGVtc01vZGlmaWNhdGlvbicpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZWxlbXNNb2RpZmljYXRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIHNhdmVOZXdDb21tZW50Jyk7XHJcbn1cclxuXHJcbmltcG9ydCB7IGdldFRhc2tJZCB9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5cclxuLy/QodC+0YXRgNCw0L3QtdC90LjQtSDQutC+0LzQvNC10L3RgtCw0YDQuNGPINCyIGxvY2FsU3RvcmFnZVxyXG4vL9C90LAg0YHQu9GD0YfQsNC5INCy0L3QtdC30LDQv9C90L7Qs9C+INC30LLQtdGA0YjQtdC90LjRjyDRgdC10YHRgdC40LhcclxuZnVuY3Rpb24gc2F2ZU5ld0NvbW1lbnQoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0ICRmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0Jyk7XHJcbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXJlYS13cmFwJyk7XHJcblxyXG4gICAgbGV0IHRhc2tfaWQgPSBnZXRUYXNrSWQoKTtcclxuXHJcbiAgICAvL9C00L7QsdCw0LLQu9GOINC60L3QvtC/0LrRgyDQtNC70Y8g0LLRgdGC0LDQstC60Lgg0YHQvtGF0YDQsNC90LXQvdC90L7Qs9C+INGC0LXQutGB0YLQsFxyXG4gICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0JVVFRPTicpO1xyXG4gICAgYnRuLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidG4taW5zZXJ0LWxzJyk7XHJcbiAgICBidG4uaWQgPSdidG4taW5zZXJ0LWxzJztcclxuICAgIGJ0bi5pbm5lckhUTUwgPSAn0JLRgdGC0LDQstC40YLRjCDQuNC3IExTJztcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdub25lJyk7IC8v0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0YHQutGA0YvRgtCwXHJcblxyXG4gICAgd3JhcC5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuICAgIC8v0LXRgdC70Lgg0LXRgdGC0Ywg0YHQvtGF0YDQsNC90LXQvdC90YvQuSDRgtC10LrRgdGCIC0g0L/QvtC60LDQt9Cw0YLRjCDQutC90L7Qv9C60YNcclxuICAgIHNob3dQYXN0ZUJ0bihidG4sIHRhc2tfaWQpO1xyXG5cclxuICAgIC8v0LLRgdGC0LDQstC40YLRjCDRgtC10LrRgdGCINC/0L4g0LrQu9C40LrRg1xyXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkZmllbGQudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFzaycgKyB0YXNrX2lkKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL9Ch0L7RhdGA0LDQvdC40YLRjCDRgtC10LrRgdGCINC40Lcg0L/QvtC70Y8g0L/RgNC4INC90LDQsdC+0YDQtSDQuNC70Lgg0L/QvtGC0LXRgNC1INGE0L7QutGD0YHQsFxyXG4gICAgJGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc2F2ZVRhc2tDb21tZW50KTtcclxuXHJcbiAgICAvL9C10YHQu9C4INC10YHRgtGMINGB0L7RhdGA0LDQvdC10L3QvdGL0Lkg0YLQtdC60YHRgiAtINC/0L7QutCw0LfQsNGC0Ywg0LrQvdC+0L/QutGDXHJcbiAgICAkZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzaG93UGFzdGVCdG4oYnRuLCB0YXNrX2lkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3cmFwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2F2ZVRhc2tDb21tZW50KCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrJyArIHRhc2tfaWQsIHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dQYXN0ZUJ0bihidXR0b24sIGlkKSB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrJyArIGlkKSAhPT0gJycgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2snICsgaWQpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge3NhdmVOZXdDb21tZW50fTtcclxuXHJcbmlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIHNhdmVOZXdDb21tZW50Jyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zYXZlTmV3Q29tbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgY29weVBhc3RlQ29tbWVudFF1b3RlJyk7XHJcbn1cclxuXHJcbmltcG9ydCB7cnVuT25LZXlzfSBmcm9tICcuL191dGlscy5qcyc7XHJcbmltcG9ydCB7Z2V0QWxsQ2FtbWVudHN9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5cclxuLy/QstGL0LTQtdC70LXQvdC40LUg0YLQtdC60YHRgtCwINCyINC60LDQvNC10L3RgtC1INC4INCy0YHRgtCw0LLQutCwINC+0YTQvtGA0LzQu9C10L3QvdCw0Y8g0LrQsNC6INGG0LjRgtCw0YLQsCDQtNC70Y8gbWFya2Rvd25cclxuZnVuY3Rpb24gY29weVBhc3RlQ29tbWVudFF1b3RlICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgY2FtbWVudHMgPSBBcnJheS5mcm9tKGdldEFsbENhbW1lbnRzKCkpO1xyXG5cclxuICAgIGNhbW1lbnRzLm1hcChmdW5jdGlvbiAoY2FtbWVudCkge1xyXG4gICAgICAgIGNhbW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZWxlY3Rpb24nLHNlbGVjdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgZWRpdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmb3JtYXRBbmRJbnNldENvbW1lbnRRdW90ZShlbGVtKSB7XHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NlbGVjdGlvbicpKXtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0UG9zID0gZWxlbS5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICAgICAgbGV0IGVuZFBvcyA9IGVsZW0uc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3Rpb24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdHJpbmdzID0gc2VsZWN0aW9uLnNwbGl0KCdcXG4nKTtcclxuXHJcbiAgICAgICAgICAgIHN0cmluZ3MgPSBzdHJpbmdzLm1hcChmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuICc+ICcrc3RyO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHN0cmluZ3Muam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZWxlY3Rpb24gPSAnXFxuJytzZWxlY3Rpb24rJ1xcbic7XHJcblxyXG4gICAgICAgICAgICBlbGVtLnZhbHVlID0gZWxlbS52YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpXHJcbiAgICAgICAgICAgICAgICArIHNlbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgKyBlbGVtLnZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIGVsZW0udmFsdWUubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZWxlY3Rpb24nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcnVuT25LZXlzKFxyXG4gICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZihkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBlZGl0b3Ipe1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0QW5kSW5zZXRDb21tZW50UXVvdGUoZWRpdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWRpdG9yXHJcbiAgICAgICAgLFxyXG4gICAgICAgIFwiMTZcIixcclxuICAgICAgICBcIjE3XCIsXHJcbiAgICAgICAgXCJWXCIuY2hhckNvZGVBdCgwKVxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IHtjb3B5UGFzdGVDb21tZW50UXVvdGV9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgY29weVBhc3RlQ29tbWVudFF1b3RlJyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3B5UGFzdGVDb21tZW50UXVvdGUuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIHVwZGF0ZU5vdGlmeScpO1xyXG59XHJcblxyXG5pbXBvcnQge2dldFRhc2tJZH0gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcbmltcG9ydCB7ZGVjbE9mTnVtLGxvYWRCeUFqYXh9IGZyb20gJy4vX3V0aWxzLmpzJztcclxuXHJcbmZ1bmN0aW9uIHRhc2tVcGRhdGVOb3RpZnkgKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBwYWdlVXJsID0gd2luZG93LmxvY2F0aW9uO1xyXG4gICAgbGV0IHRhc2tJZCA9IGdldFRhc2tJZCgpO1xyXG5cclxuICAgIC8v0LTQvtCx0LDQstC70LXQvdC40LUg0LrQvdC+0L/QutC4INC/0L7QtNC/0LjRgdC60Lgg0L3QsCDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQsNC80LXQvdGC0LDRhSDQsiDQt9Cw0LTQsNGH0LVcclxuICAgIGxldCBhbGVydEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYWxlcnRCdG4uaWQgPSAndXBkLWFsZXJ0JztcclxuICAgIGFsZXJ0QnRuLmNsYXNzTGlzdC5hZGQoJ2FkZC1hbGVydCcpO1xyXG4gICAgYWxlcnRCdG4udGl0bGUgPSAn0J/QvtC00L/QuNGB0LDRgtGM0YHRjyDQvdCwINGD0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGP0YUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stdGl0bGUnKS5pbnNlcnRCZWZvcmUoYWxlcnRCdG4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJzY3JpYmVFbGVtZW50JykpO1xyXG5cclxuICAgIGFsZXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgIGNoZWNrQ29tbWVudHNVcGRhdGUodGhpcyx0YXNrSWQsZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjaGVja0NvbW1lbnRzVXBkYXRlKGFsZXJ0QnRuLHRhc2tJZCk7XHJcblxyXG4gICAgLy/Qt9Cw0L/Rg9GB0Log0LjQvdGC0LXRgNCy0LDQu9CwINC/0YDQvtCy0LXRgNC60Lgg0LjQt9C80LXQvdC10L3QuNC5INC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cclxuICAgIGxldCBub3RpZnlJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsb2FkQnlBamF4KHBhZ2VVcmwsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjaGVja1VwZGF0ZShkYXRhLHRhc2tJZCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9LCAxMDAwICogNjAgKiA1KTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tVcGRhdGUoYWpheHJlc3BvbnNlLGlkKSB7XHJcbiAgICAgICAgbGV0IGNvbW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXRibCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLWNvbW1lbnQnKTtcclxuICAgICAgICBsZXQgY29tbWVudHNOdW0gPSBjb21tZW50cy5sZW5ndGg7XHJcblxyXG5cclxuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgICAgIGxldCBodG1sRG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhhamF4cmVzcG9uc2UudHJpbSgpLFwidGV4dC9odG1sXCIpO1xyXG4gICAgICAgIGxldCB0YmwgPSBodG1sRG9jLmJvZHkucXVlcnlTZWxlY3RvcignZm9ybVtuYW1lPXRoZUZvcm1dJykuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcblxyXG5cclxuICAgICAgICBsZXQgdXBsb2FkZWRDb21tZW50cyA9IHRibC5xdWVyeVNlbGVjdG9yQWxsKCd0cicpO1xyXG5cclxuICAgICAgICBsZXQgZmlsdGVyZWRDb21tZW50cyA9IEFycmF5LmZyb20odXBsb2FkZWRDb21tZW50cykuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJykubGVuZ3RoID4gMTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gLSAxINGCLtC6LiDQvdGD0LbQvdC+INGD0LHRgNCw0YLRjCDQv9C10YDQstGD0Y4g0YHRgtGA0L7QutGDINGBINC90LDQt9Cy0LDQvdC40Y/QvNC4INGB0YLQvtC70LHRhtC+0LJcclxuICAgICAgICBsZXQgdXBkQ29tbWVudE51bSA9IGZpbHRlcmVkQ29tbWVudHMubGVuZ3RoIC0gMTtcclxuXHJcblxyXG4gICAgICAgIGlmKHVwZENvbW1lbnROdW0gPiBjb21tZW50c051bSl7XHJcbiAgICAgICAgICAgIGxldCBuQ29tbWVudHMgPSB1cGRDb21tZW50TnVtIC0gY29tbWVudHNOdW07XHJcbiAgICAgICAgICAgIGxldCBsYXN0SWQgPSBjb21tZW50c1tjb21tZW50c051bSAtIDFdLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJykuaWQuc3BsaXQoJ18nKVsxXTtcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZU9uUGFnZU5vdGlmeShuQ29tbWVudHMsbGFzdElkKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGVja1VwYWRhdGVPcHRpb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29tbWVudHMtdXBkYXRlJytpZCk7XHJcblxyXG4gICAgICAgICAgICBpZihjaGVja1VwYWRhdGVPcHRpb24gJiYgY2hlY2tVcGFkYXRlT3B0aW9uID09PSAndHJ1ZScpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vdGlmeSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAn0J3QvtCy0YvQuSDQutC+0LzQvNC10L3RgtCw0YDQuNC5JyxcclxuICAgICAgICAgICAgICAgICAgICAndGFnJzogJ25ldy1jb21tZW50LScraWQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2JvZHknOiBodG1sRG9jLnF1ZXJ5U2VsZWN0b3IoJ2gxID4gZm9udCcpLnRleHRDb250ZW50LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBub3RpZnlNZShub3RpZnkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vINC+0YfQuNGB0YLQutCwINC40L3RgtC10YDQstCw0LvQsCAtINC+0YLQutC70Y7Rh9C10L3QuNC1INGD0LLQtdC00L7QvNC70LXQvdC40Lkg0L/QviDQutC70LjQutGDINC90LAg0YPQstC10LTQvtC80LvQtdC90LjQuFxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IG5vdGlmaWNhdGlvbiA9IG5vdGlmeU1lKG5vdGlmeSk7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gaWYobm90aWZpY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNsZWFySW50ZXJ2YWwobm90aWZ5SW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbm90aWZ5TWUobm90aWZ5KSB7XHJcbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uID09PSBcImdyYW50ZWRcIikge1xyXG4gICAgICAgICAgICBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKG5vdGlmeS50aXRsZSwge3RhZzogbm90aWZ5LnRhZywgYm9keTogbm90aWZ5LmJvZHl9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gIT09ICdkZW5pZWQnKSB7XHJcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiAocGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBlcm1pc3Npb24gPT09IFwiZ3JhbnRlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbihub3RpZnkudGl0bGUsIHt0YWc6IG5vdGlmeS50YWcsIGJvZHk6IG5vdGlmeS5ib2R5fSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5vdGlmaWNhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVPblBhZ2VOb3RpZnkobnVtLGxpbmtJZCkge1xyXG4gICAgICAgIGxldCBub3RpZnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZS1ub3RpZnknKTtcclxuXHJcbiAgICAgICAgaWYoIW5vdGlmeSl7XHJcbiAgICAgICAgICAgIG5vdGlmeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50LXRlbXBsYXRlJykuY2xvbmVOb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgbm90aWZ5LmlkID0gJ3BhZ2Utbm90aWZ5JztcclxuICAgICAgICAgICAgbm90aWZ5LmNsYXNzTGlzdC5hZGQoJ2ItY29tbWVudF9ub3RpZnknKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXRibCcpLmFwcGVuZENoaWxkKG5vdGlmeSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vdGlmeS50ZXh0Q29udGVudCA9ICfQkiDQt9Cw0LTQsNGH0LUgJytudW0rJyAnK2RlY2xPZk51bShudW0sIFsn0L3QvtCy0YvQuSDQutC+0LzQvNC10L3RgtCw0YDQuNC5Jywn0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGPJywn0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNC10LInXSk7XHJcblxyXG4gICAgICAgIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIGxpbmsuaHJlZiA9IHdpbmRvdy5sb2NhdGlvbisnIycrbGlua0lkO1xyXG4gICAgICAgIGxpbmsudGFyZ2V0ID0gJ19zZWxmJztcclxuICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ3JlZ3VsYXItbGluaycsJ2NvbW1lbnRzLXVwZGF0ZS1saW5rJyk7XHJcbiAgICAgICAgbGluay50ZXh0Q29udGVudCA9ICfQntCx0L3QvtCy0LjRgtGMINGB0YLRgNCw0L3QuNGG0YMnO1xyXG5cclxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5ocmVmO1xyXG4gICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG5vdGlmeS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vdGlmeTtcclxuICAgIH1cclxuXHJcbiAgICAvL9Cy0LrQu9GO0YfQuNGC0Ywv0L7RgtC60LvRjtGH0LjRgtGMINGD0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtGA0LDQuNGP0YVcclxuICAgIC8v0L3QsCDQvtGC0LrRgNGL0YLQvtC5INGB0YLRgNCw0L3QuNGG0LUg0LfQsNC00LDRh9C4XHJcbiAgICBmdW5jdGlvbiBjaGVja0NvbW1lbnRzVXBkYXRlKGJ0bixpZCxldmVudCA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYoZXZlbnQpe1xyXG4gICAgICAgICAgICBpZihidG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKXtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb21tZW50cy11cGRhdGUnK2lkLCd0cnVlJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScraWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb21tZW50cy11cGRhdGUnK2lkKSA9PT0gJ3RydWUnKXtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge3Rhc2tVcGRhdGVOb3RpZnl9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgdXBkYXRlTm90aWZ5Jyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90YXNrVXBkYXRlTm90aWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvL9C/0YDQvtC60YDRg9GC0LrQsCDQuiDQutCw0LzQtdC90YLRgyDQv9C+INGP0LrQvtGA0Y4uINCd0YPQttC90LAg0LXRgdC70Lgg0LLRi9C30LLQsNC9IGNvbW1lbnRzRGVzaWduKClcclxuZnVuY3Rpb24gYW5jaG9yTGluaygpIHtcclxuICAgIC8v0L7QsdGA0LDQsdC+0YLQutCwINGB0YHRi9C70L7QuiDRgSBpZCDQutCw0LzQtdC90YLQsCDQsiDRhdC10YjQtVxyXG4gICAgLy/Rgi7Qui4g0LjQty3Qt9CwINC40LfQvNC10L3QtdC90LjRjyDQstGL0YHQvtGC0Ysg0LrQsNC80LXQvdGC0L7QsiDQuCDRgdC+0L7RgtCy0LXRgtGB0LLQtdC90L3QviDRgdGC0YDQsNC90LjRhtGLINCyIG1vZHVsZXMuY2FtbWVudHNEZXNpZ24oKVxyXG4gICAgLy/QvtC90Lgg0YDQsNCx0L7RgtCw0Y7RgiDQvdC1INC/0YDQsNCy0LjQu9GM0L3QvlxyXG5cclxuICAgIGxldCBjYW1tZW50SWQgPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuXHJcbiAgICBjYW1tZW50SWQgPSBjYW1tZW50SWQuc2xpY2UoMSwgY2FtbWVudElkLmxlbmd0aCk7XHJcblxyXG4gICAgLy/QtNC+0LHQsNCy0LvRj9GOIHNldFRpbWVvdXQg0YIu0LouINC/0L7QutCwINC90LUg0L/RgNC40LTRg9C80LDQuyDQutCw0Log0L7RgtC70L7QstC40YLRjFxyXG4gICAgLy/Rh9GC0L4g0L/QtdGA0LXQtNC10LvQutCwINGB0YLRgNCw0L3QuNGG0Ysg0LfQsNC60L7QvdGH0LXQvdCwINC4INCy0YvRgdC+0YLQsCDQuCDQv9C+0LfQuNGG0LjRjyDQutCw0LzQtdC90YLQsFxyXG4gICAgLy/QuiDQutC+0YLQvtGA0L7QvNGDINC90YPQttC90L4g0L/RgNC+0LrRgNGD0YLQuNGC0Ywg0LHRg9C00LXRgiDRgNCw0YHRgdGH0LjRgtCw0L3QsCDQv9GA0LDQstC40LvRjNC90L5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChjYW1tZW50SWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdhbmNob3JMaW5rIHN0YXJ0Jyk7XHJcbiAgICAgICAgICAgIC8v0LjRidGDINGB0LrRgNGL0YLRi9C5INGH0LXQutCx0L7QutGBINGBIGlkINC4INC+0YIg0L3QtdCz0L4g0LLQstC10YDRhSDQtNC+INC60LDRgNGC0L7Rh9C60Lgg0LrQsNC80LXQvdGC0LAgYi1jb21tZW50XHJcbiAgICAgICAgICAgIGxldCBjYW1tZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWNrYm94XycgKyBjYW1tZW50SWQpLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBjYW1tZW50Lm9mZnNldFRvcDtcclxuXHJcbiAgICAgICAgICAgIGFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgICAgICAgICAgICB0aW1pbmc6IGZ1bmN0aW9uICh0aW1lRnJhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGltZUZyYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRyYXc6IGZ1bmN0aW9uIChwcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvWShkaXN0YW5jZSwgcHJvZ3Jlc3MpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDYwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGUob3B0aW9ucykge1xyXG4gICAgbGV0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uIGFuaW1hdGUodGltZSkge1xyXG4gICAgICAgIGxldCB0aW1lRnJhY3Rpb24gPSAodGltZSAtIHN0YXJ0KSAvIG9wdGlvbnMuZHVyYXRpb247XHJcbiAgICAgICAgaWYgKHRpbWVGcmFjdGlvbiA+IDEpIHRpbWVGcmFjdGlvbiA9IDE7XHJcblxyXG4gICAgICAgIGxldCBwcm9ncmVzcyA9IG9wdGlvbnMudGltaW5nKHRpbWVGcmFjdGlvbik7XHJcblxyXG4gICAgICAgIG9wdGlvbnMuZHJhdyhwcm9ncmVzcyk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lRnJhY3Rpb24gPCAxKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNjcm9sbFRvWShkaXN0YW5zZSwgcHJvZ3Jlc3MpIHtcclxuICAgIGxldCBzY3JvbGxZID0gd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzY3JvbGxZICsgKChkaXN0YW5zZSAtIHNjcm9sbFkpICogcHJvZ3Jlc3MpKTtcclxufVxyXG5cclxuZXhwb3J0IHthbmNob3JMaW5rfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hbmNob3JMaW5rLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyDQtNC+0LHQsNCy0LvQtdC90LjQtSDQvdCwINGB0YLRgNCw0L3QuNGG0YMg0L3QvtCy0L7QuSDQt9Cw0LTQsNGH0Lgg0LHQu9C+0LrQsCDQvdCw0YHRgtGA0L7QtdC6INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG5cclxuaW1wb3J0IHthZGRqc30gZnJvbSAnLi9fbG9hZGVycy5qcyc7XHJcblxyXG5mdW5jdGlvbiB1c2VyU2V0dGluZ3MoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICAvL9C00L7QsdCw0LLQu9C10L3QuNC1L9GD0LTQsNC70LXQvdC40LUg0LLRi9Cx0YDQsNC90L3Ri9GFINC/0YDQvtC10LrRgtC+0LIg0LIg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC+0Lwg0YHQv9C40YHQutC1XHJcbiAgICAvL9GB0L7RhdGA0LDQvdC10L3QuNC1INCyIGxvY2FsU3RvcmFnZSDQuCDRgdC60YDRi9GC0Ywg0L/QvtC60LDQt9Cw0YLRjCDQsiBzZWxlY3Qg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcbiAgICBsZXQgJGNvbnRlbnRfY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm1bbmFtZT1cInRoZUZvcm1cIl0nKTtcclxuXHJcbiAgICAvL9GB0L7Qt9C00LDQvdC40LUg0LHQu9C+0LrQsCDQsiDQutC+0YLQvtGA0L7QvCDQsdGD0LTRg9GCINCy0YHQtSDRjdC70LXQvNC10L3RgtGLINGD0L/RgNCw0LLQu9C10L3QuNGPINC90LDRgdGC0YDQvtC50LrQsNC80LhcclxuICAgIGxldCAkdXNlcl9zZXR0aW5nc19ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICR1c2VyX3NldHRpbmdzX2JveC5pZCA9ICdzZXR0aW5ncy1ib3gnO1xyXG4gICAgJGNvbnRlbnRfY2VsbC5pbnNlcnRCZWZvcmUoJHVzZXJfc2V0dGluZ3NfYm94LCAkY29udGVudF9jZWxsLmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgIC8v0YHQvtC30LTQsNC90LjQtSDQutC90L7Qv9C60Lgg0L/QvtC60LDQt9Cw0YLRjC/RgdC60YDRi9GC0Ywg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40LUg0L3QsNGB0YLRgNC+0LnQutC4XHJcbiAgICBsZXQgJHNldHRpbmdzX2J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgJHNldHRpbmdzX2J0bi5pbm5lckhUTUwgPSAn0J/QvtC60LDQt9Cw0YLRjC/RgdC60YDRi9GC0Ywg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40LUg0L3QsNGB0YLRgNC+0LnQutC4JztcclxuICAgICRzZXR0aW5nc19idG4uaWQgPSAnc2V0dGluZ3MtYnRuJztcclxuICAgICRzZXR0aW5nc19idG4udHlwZSA9ICdidXR0b24nO1xyXG5cclxuICAgICRzZXR0aW5nc19idG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJHVzZXJfc2V0dGluZ3NfYm94LmNsYXNzTGlzdC50b2dnbGUoJ2lzLW9wZW4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgICRjb250ZW50X2NlbGwuaW5zZXJ0QmVmb3JlKCRzZXR0aW5nc19idG4sICRjb250ZW50X2NlbGwuZmlyc3RDaGlsZCk7XHJcblxyXG4gICAgLy/RgdC+0LfQtNCw0L3QuNC1INC60LDRgdGC0L7QvNC90L7Qs9C+INGB0L/QuNGB0LrQsCDQv9GA0L7QtdC60YLQvtCyXHJcbiAgICAvL2lkYHMgYXJyYXlcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tMaXN0SFRNTCgpIHtcclxuICAgICAgICBpZighbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BhcmFtc191c2VyX3Byb2plY3RzJykpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGFyYW1zX3VzZXJfcHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShbXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmFtc191c2VyX3Byb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFyYW1zX3VzZXJfcHJvamVjdHMnKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IFBST0pFQ1RTX0xJU1RfUEFSQU1TID0ge1xyXG4gICAgICAgICAgICAnaWQnOiAnY3VzdG9tLXByb2plY3QtbGlzdCcsXHJcbiAgICAgICAgICAgICd0aXRsZSc6ICfQodC+0LHRgdGC0LLQtdC90L3Ri9C5INGB0L/QuNGB0L7QuiDQv9GA0L7QtdC60YLQvtCyJyxcclxuICAgICAgICAgICAgJ3NvdXJjZSc6ICdwcm9qZWN0X2lkJyxcclxuICAgICAgICAgICAgJ3N0b3JhZ2UnOiBwYXJhbXNfdXNlcl9wcm9qZWN0cyxcclxuICAgICAgICAgICAgJ3N0b3JhZ2VfbmFtZSc6ICdwYXJhbXNfdXNlcl9wcm9qZWN0cydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgJGN1c3RvbV9wcm9qZWN0c19saXN0ID0gY3JlYXRlSW5zZXJ0V29ya2Vyc1Byb2plY3RzTGlzdHMoUFJPSkVDVFNfTElTVF9QQVJBTVMpO1xyXG5cclxuICAgICAgICAkdXNlcl9zZXR0aW5nc19ib3guaW5zZXJ0QmVmb3JlKCRjdXN0b21fcHJvamVjdHNfbGlzdCwgJHVzZXJfc2V0dGluZ3NfYm94LmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgICAgICBoaWdobGlnaHRTZWxlY3RlZCgkY3VzdG9tX3Byb2plY3RzX2xpc3QsIHBhcmFtc191c2VyX3Byb2plY3RzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL9GB0L7Qt9C00LDQvdC40LUg0LrQsNGB0YLQvtC80L3QvtCz0L4g0YHQv9C40YHQutCwINC40YHQv9C+0LvQvdC40YLQtdC70LXQuVxyXG4gICAgLy9pZGBzIGFycmF5XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVXb3JrZXJzTGlzdEhUTUwoKSB7XHJcbiAgICAgICAgaWYoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYXJhbXNfdXNlcl93b3JrZXJzJykpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGFyYW1zX3VzZXJfd29ya2VycycsIEpTT04uc3RyaW5naWZ5KFtdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFyYW1zX3VzZXJfd29ya2VycyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BhcmFtc191c2VyX3dvcmtlcnMnKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IFdPUktFUlNfTElTVF9QQVJBTVMgPSB7XHJcbiAgICAgICAgICAgICdpZCc6ICdjdXN0b20td29ya2Vycy1saXN0JyxcclxuICAgICAgICAgICAgJ3RpdGxlJzogJ9Ch0L7QsdGB0YLQstC10L3QvdGL0Lkg0YHQv9C40YHQvtC6INC40YHQv9C+0LvQvdC40YLQtdC70LXQuScsXHJcbiAgICAgICAgICAgICdzb3VyY2UnOiAnaW50ZXJuYWxfd29ya2VyJyxcclxuICAgICAgICAgICAgJ3N0b3JhZ2UnOiBwYXJhbXNfdXNlcl93b3JrZXJzLFxyXG4gICAgICAgICAgICAnc3RvcmFnZV9uYW1lJzogJ3BhcmFtc191c2VyX3dvcmtlcnMnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0ICRjdXN0b21fd29ya2Vyc19saXN0ID0gY3JlYXRlSW5zZXJ0V29ya2Vyc1Byb2plY3RzTGlzdHMoV09SS0VSU19MSVNUX1BBUkFNUyk7XHJcblxyXG4gICAgICAgICR1c2VyX3NldHRpbmdzX2JveC5pbnNlcnRCZWZvcmUoJGN1c3RvbV93b3JrZXJzX2xpc3QsICR1c2VyX3NldHRpbmdzX2JveC5maXJzdENoaWxkKTtcclxuXHJcbiAgICAgICAgaGlnaGxpZ2h0U2VsZWN0ZWQoJGN1c3RvbV93b3JrZXJzX2xpc3QsIHBhcmFtc191c2VyX3dvcmtlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINC/0L7QtNGB0LLQtdGC0LrQsCDRgdC+0YXRgNCw0L3QtdC90L3Ri9GFINCyINC90LDRgdGC0YDQvtC50LrQsNGFINGN0LvQtdC80LXQvdGC0L7QsiDRgdC/0LjRgdC60LBcclxuICAgIGZ1bmN0aW9uIGhpZ2hsaWdodFNlbGVjdGVkKGxpc3QsIHNldHRpbmdzKSB7XHJcbiAgICAgICAgaWYgKCFzZXR0aW5ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbm8nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5vZGU7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGxpc3QuY2hpbGROb2RlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBsaXN0LmNoaWxkTm9kZXNba2V5XTtcclxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmluZGV4T2Yobm9kZS5kYXRhc2V0LmlkKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQtNC+0LHQsNCy0LvQtdC90LjQtSDQutC90L7Qv9C+0Log0LLQutC70Y7Rh9C10L3QuNGPL9C+0YLQutC70Y7Rh9C10L3QuNGPINGA0LDQt9C90YvRhSDQvNC+0LTRg9C70LXQuVxyXG4gICAgbGV0IG9wdGlvbnNCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgb3B0aW9uc0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ3VzZXItbGlzdCcpO1xyXG5cclxuICAgIGxldCBzZXR0aW5nc190aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICBzZXR0aW5nc190aXRsZS50ZXh0Q29udGVudCA9ICfQntC/0YbQuNC4JztcclxuICAgIHNldHRpbmdzX3RpdGxlLmNsYXNzTGlzdC5hZGQoJ3VzZXItdGl0bGUnKTtcclxuXHJcbiAgICBvcHRpb25zQmxvY2suYXBwZW5kQ2hpbGQoc2V0dGluZ3NfdGl0bGUpO1xyXG5cclxuICAgIC8v0LTQvtCx0LDQstC70LXQvdC40LUg0L3QsNGB0YLRgNC+0LnQutC4IC0g0LLQutC7L9Cy0YvQutC7INCz0LXQvdC10YDQsNGG0LjQuCDQsdC70L7QutCwINGBINC/0L7QtNGB0YfQtdGC0L7QvCDQstGA0LXQvNC10L3QuCDRg9GH0LDRgdGC0L3QuNC60L7QsiDQt9Cw0LTQsNGH0LhcclxuICAgIGxldCBjb3VudFRpbWVCdG4gPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgY291bnRUaW1lQnRuLmlkID0gJ2NvdW50VGltZUJ0bic7XHJcbiAgICBjb3VudFRpbWVCdG4uY2xhc3NMaXN0LmFkZCgnYnRuLWZsYXQnLCdyb3ctaXRlbScpO1xyXG4gICAgY291bnRUaW1lQnRuLnRleHRDb250ZW50ID0gJ9Cf0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INCyINC30LDQtNCw0YfQtSAtINCS0LrQu9GO0YfQtdC9JztcclxuXHJcbiAgICBpZighbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dvcmtlci10aW1lLWNvdW50Jykpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd3b3JrZXItdGltZS1jb3VudCcsICd0cnVlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY291bnRUaW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgaWYodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpe1xyXG4gICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAn0J/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LIg0LfQsNC00LDRh9C1IC0g0JLQutC70Y7Rh9C10L0nO1xyXG4gICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd3b3JrZXItdGltZS1jb3VudCcsICd0cnVlJyk7XHJcbiAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gJ9Cf0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INCyINC30LDQtNCw0YfQtSAtINCS0YvQutC70Y7Rh9C10L0nO1xyXG4gICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd3b3JrZXItdGltZS1jb3VudCcsJ2ZhbHNlJyk7XHJcbiAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL9Cy0LrQu9GO0YfQuNGC0Ywv0L7RgtC60LvRjtGH0LjRgtGMINCz0LXQvdC10YDQsNGG0LjRjiDQsdC70L7QutCwINGBINC/0L7QtNGB0YfQtdGC0L7QsiDQstGA0LXQvNC10L3QuCDRg9GH0LDRgdGC0L3QuNC60L7QsiDQt9Cw0LTQsNGH0LhcclxuICAgIGZ1bmN0aW9uIGNoZWNrVGltZUNvdW50T3B0aW9uKCkge1xyXG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRUaW1lQnRuJyk7XHJcblxyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3b3JrZXItdGltZS1jb3VudCcpID09PSAndHJ1ZScpe1xyXG4gICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSAn0J/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LIg0LfQsNC00LDRh9C1IC0g0JLQutC70Y7Rh9C10L0nO1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gJ9Cf0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INCyINC30LDQtNCw0YfQtSAtINCS0YvQutC70Y7Rh9C10L0nO1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyovL9C00L7QsdCw0LLQu9C10L3QuNC1INC90LDRgdGC0YDQvtC50LrQuCAtINCy0LrQuy/QstGL0LrQuyDRg9Cy0LXQtNC+0LzQu9C10L3QuNC5INC+INC90L7QstC+0Lwg0LrQvtC80LzQtdC90YLQsNGA0LjQuCDQsiDQt9Cw0LTQsNGH0LVcclxuICAgIGxldCBjb21tZW50c1VwZGF0ZUJ0biA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBjb21tZW50c1VwZGF0ZUJ0bi5pZCA9ICdjb21tZW50c1VwZGF0ZUJ0bic7XHJcbiAgICBjb21tZW50c1VwZGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tZmxhdCcsJ3Jvdy1pdGVtJyk7XHJcbiAgICBjb21tZW50c1VwZGF0ZUJ0bi50ZXh0Q29udGVudCA9ICfQo9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLQsNGA0LjRj9GFIC0g0JLQutC70Y7Rh9C10L3Riyc7XHJcblxyXG4gICAgY29tbWVudHNVcGRhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKXtcclxuICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9ICfQo9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLQsNGA0LjRj9GFIC0g0JLQutC70Y7Rh9C10L3Riyc7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb21tZW50cy11cGRhdGUnLCAndHJ1ZScpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gJ9Cj0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGP0YUgLSDQktGL0LrQu9GO0YfQtdC90YsnO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29tbWVudHMtdXBkYXRlJywnZmFsc2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL9Cy0LrQu9GO0YfQuNGC0Ywv0L7RgtC60LvRjtGH0LjRgtGMINGD0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtGA0LDQuNGP0YVcclxuICAgIC8v0L3QsCDQvtGC0LrRgNGL0YLQvtC5INGB0YLRgNCw0L3QuNGG0LUg0LfQsNC00LDRh9C4XHJcbiAgICBmdW5jdGlvbiBjaGVja0NvbW1lbnRzVXBkYXRlKCkge1xyXG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHNVcGRhdGVCdG4nKTtcclxuXHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScpID09PSAndHJ1ZScpe1xyXG4gICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSAn0KPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y/RhSAtINCS0LrQu9GO0YfQtdC90YsnO1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gJ9Cj0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGP0YUgLSDQktGL0LrQu9GO0YfQtdC90YsnO1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbiAgICBvcHRpb25zQmxvY2suYXBwZW5kQ2hpbGQoY291bnRUaW1lQnRuKTtcclxuICAgIC8vb3B0aW9uc0Jsb2NrLmFwcGVuZENoaWxkKGNvbW1lbnRzVXBkYXRlQnRuKTtcclxuXHJcbiAgICAkdXNlcl9zZXR0aW5nc19ib3guYXBwZW5kQ2hpbGQob3B0aW9uc0Jsb2NrKTtcclxuXHJcbiAgICAvL9C30LDQv9GD0YHQuiDQv9GA0L7QstC10YDQvtC6INCy0LrQu9GO0YfQtdC90L3Ri9GFL9C+0YLQutC70Y7Rh9C10L3QvdGL0YUg0L7Qv9GG0LjQuVxyXG4gICAgY2hlY2tUaW1lQ291bnRPcHRpb24oKTtcclxuICAgIC8vY2hlY2tDb21tZW50c1VwZGF0ZSgpO1xyXG5cclxuXHJcbiAgICBjcmVhdGVUYXNrTGlzdEhUTUwoKTtcclxuICAgIGNyZWF0ZVdvcmtlcnNMaXN0SFRNTCgpO1xyXG5cclxuICAgIC8vINC00L7QsdCw0LLQu9C10L3QuNC1INCx0LvQvtC60LAg0Y3QutGB0L/QvtGA0YLQsC/QuNC80L/QvtGA0YLQsCDQvdCw0YHRgtGA0L7QtdC6XHJcbiAgICBsZXQgRUlCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgRUlCbG9jay5jbGFzc0xpc3QuYWRkKCd1c2VyLWxpc3QnKTtcclxuICAgIEVJQmxvY2suaWQgPSAnRUlCbG9jayc7XHJcblxyXG4gICAgbGV0IEVJQmxvY2tfdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgRUlCbG9ja190aXRsZS50ZXh0Q29udGVudCA9ICfQrdC60YHQv9C+0YDRgi/QuNC80L/QvtGA0YIg0L3QsNGB0YLRgNC+0LXQuic7XHJcbiAgICBFSUJsb2NrX3RpdGxlLmNsYXNzTGlzdC5hZGQoJ3VzZXItdGl0bGUnKTtcclxuXHJcbiAgICBsZXQgRUlCbG9ja19kZXNjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgRUlCbG9ja19kZXNjLnRleHRDb250ZW50ID0gJ9CR0YPQtNGD0YIg0YHQvtGF0YDQsNC90LXQvdGLINC40LfQsdGA0LDQvdC90YvQtSDQv9GA0L7QtdC60YLRiywg0YDQsNCx0L7RgtC90LjQutC4LCDQvtC/0YbQuNC4Lic7XHJcblxyXG4gICAgRUlCbG9jay5hcHBlbmRDaGlsZChFSUJsb2NrX3RpdGxlKTtcclxuICAgIEVJQmxvY2suYXBwZW5kQ2hpbGQoRUlCbG9ja19kZXNjKTtcclxuXHJcbiAgICBsZXQgRUlTZXR0aW5ncyA9IGV4cG9ydEltcG9ydFVzZXJTZXR0aW5ncygpO1xyXG4gICAgRUlCbG9jay5hcHBlbmRDaGlsZChFSVNldHRpbmdzLmxpbmspO1xyXG4gICAgRUlCbG9jay5hcHBlbmRDaGlsZChFSVNldHRpbmdzLmZpZWxkKTtcclxuXHJcbiAgICAkdXNlcl9zZXR0aW5nc19ib3guYXBwZW5kQ2hpbGQoRUlCbG9jayk7XHJcblxyXG4gICAgaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdsb2FkIHVzZXJTZXR0aW5ncycpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL9GB0L7Qt9C00LDQvdC40LUg0Lgg0LTQvtCx0LDQstC70LXQvdC40LUg0YHQv9C40YHQutCwINGA0LDQsdC+0YLQvdC40LrQvtCyINC4INC/0YDQvtC10LrRgtC+0LJcclxuZnVuY3Rpb24gY3JlYXRlSW5zZXJ0V29ya2Vyc1Byb2plY3RzTGlzdHMocGFyYW1zKSB7XHJcbiAgICBsZXQgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICBsaXN0LmlkID0gcGFyYW1zLmlkO1xyXG4gICAgbGlzdC5jbGFzc0xpc3QuYWRkKCd1c2VyLWxpc3QnLCAnY2xlYXJmaXgnKTtcclxuXHJcbiAgICBsZXQgbGlzdF90aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICBsaXN0X3RpdGxlLmlubmVySFRNTCA9IHBhcmFtcy50aXRsZTtcclxuICAgIGxpc3RfdGl0bGUuY2xhc3NMaXN0LmFkZCgndXNlci10aXRsZScpO1xyXG5cclxuICAgIGxpc3QuYXBwZW5kQ2hpbGQobGlzdF90aXRsZSk7XHJcblxyXG4gICAgbGV0IHNvdXJjZV9saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zLnNvdXJjZSk7XHJcbiAgICBsZXQgc291cmNlX2xpc3RfaXRlbXMgPSBzb3VyY2VfbGlzdC5vcHRpb25zO1xyXG5cclxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIGxldCBsaXN0X2l0ZW1fcHJvdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgbGV0IGxpc3RfaXRlbTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhzb3VyY2VfbGlzdF9pdGVtcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgaWYgKHNvdXJjZV9saXN0X2l0ZW1zW2tleV0udmFsdWUgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpc3RfaXRlbSA9IGxpc3RfaXRlbV9wcm90by5jbG9uZU5vZGUoZmFsc2UpO1xyXG4gICAgICAgIGxpc3RfaXRlbS5pbm5lckhUTUwgPSBzb3VyY2VfbGlzdF9pdGVtc1trZXldLnRleHQ7XHJcbiAgICAgICAgbGlzdF9pdGVtLmRhdGFzZXQuaWQgPSBzb3VyY2VfbGlzdF9pdGVtc1trZXldLnZhbHVlO1xyXG4gICAgICAgIGxpc3RfaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2F2ZVVzZXJTZXR0aW5ncyhwYXJhbXMuc3RvcmFnZSwgdGhpcywgcGFyYW1zLnN0b3JhZ2VfbmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGxpc3RfaXRlbSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsaXN0LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuXHJcbiAgICByZXR1cm4gbGlzdDtcclxufVxyXG5cclxuLy/RgdC+0YXRgNCw0L3QtdC90LjQtSDQv9C+0LvRjNC30L7QstCw0LXRgtC70YzRgdC60LjRhSDQvdCw0YHRgtGA0L7QtdC6XHJcbi8v0Lgg0LLRi9C00LXQu9C10L3QuNC1INGB0L7RhdGA0LDQvdC10L3QvdC+0LPQviDQsiDRgdC/0LjRgdC60LDRhSDRgNCw0LHQvtGC0L3QuNC60L7QsiDQuCDQv9GA0L7QtdC60YLQvtCyXHJcbmZ1bmN0aW9uIHNhdmVVc2VyU2V0dGluZ3Mob3B0aW9ucywgbGlzdF9pdGVtLCBzdG9yYWdlX2l0ZW0pIHtcclxuICAgIGxldCBpZCA9IGxpc3RfaXRlbS5kYXRhc2V0LmlkO1xyXG5cclxuICAgIGlmIChvcHRpb25zLmluZGV4T2YoaWQpID09PSAtMSkge1xyXG4gICAgICAgIG9wdGlvbnMucHVzaChpZCk7XHJcbiAgICAgICAgbGlzdF9pdGVtLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBpbmRleCA9IG9wdGlvbnMuaW5kZXhPZihpZCk7XHJcbiAgICAgICAgb3B0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIGxpc3RfaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VfaXRlbSwgSlNPTi5zdHJpbmdpZnkob3B0aW9ucykpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VfaXRlbSkpKTtcclxufVxyXG5cclxuLy/RgdC+0YXRgNCw0L3QtdC90LjQtSDQv9C+0LvRjNC30L7QstCw0LXRgtC70YzRgdC60LjRhSDQvdCw0YHRgtGA0L7QtdC6INCyINGE0LDQudC7XHJcbi8v0LfQsNCz0YDRg9C30LrQsCDQvdCw0YHRgtGA0L7QtdC6INC40Lcg0YTQsNC50LvQsFxyXG5mdW5jdGlvbiBleHBvcnRJbXBvcnRVc2VyU2V0dGluZ3MoKSB7XHJcbiAgICAvL2NvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhsb2NhbFN0b3JhZ2UpO1xyXG4gICAgY29uc3Qga2V5cyA9IFtcInBhcmFtc191c2VyX3Byb2plY3RzXCIsXCJwYXJhbXNfdXNlcl93b3JrZXJzXCIsXCJkYXRhbGlzdFwiLFwid29ya2VyLXRpbWUtY291bnRcIl07XHJcblxyXG4gICAgbGV0IHNldHRpbmdzID0ge307XHJcblxyXG4gICAgZm9yKGxldCBpIG9mIGtleXMpe1xyXG4gICAgICAgIHNldHRpbmdzW2ldID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oaSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IFNhdmVBc0Jsb2IgPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MpXSwge3R5cGU6XCJhcHBsaWNhdGlvbi9qc29uXCJ9KTtcclxuICAgIGxldCBTYXZlQXNVUkwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChTYXZlQXNCbG9iKTtcclxuICAgIGNvbnN0IGZpbGVOYW1lVG9TYXZlQXMgPSAndHJhY2tlci11c2VyLXNldHRpbmdzJztcclxuXHJcbiAgICBsZXQgZG93bmxvYWRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICBkb3dubG9hZExpbmsuZG93bmxvYWQgPSBmaWxlTmFtZVRvU2F2ZUFzO1xyXG4gICAgZG93bmxvYWRMaW5rLmlubmVySFRNTCA9IFwi0KHQutCw0YfQsNGC0Ywg0YTQsNC50Lsg0L3QsNGB0YLRgNC+0LXQulwiO1xyXG4gICAgZG93bmxvYWRMaW5rLmhyZWYgPSBTYXZlQXNVUkw7XHJcbiAgICBkb3dubG9hZExpbmsuY2xhc3NMaXN0LmFkZCgncm93LWl0ZW0nKTtcclxuXHJcbiAgICBsZXQgdXBsb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIHVwbG9hZC50eXBlID0gJ2ZpbGUnO1xyXG4gICAgdXBsb2FkLmlkID0gJ2ltcG9ydC1zZXR0aW5ncyc7XHJcbiAgICB1cGxvYWQudGl0bGUgPSAn0JfQsNCz0YDRg9C30LjRgtC1INGE0LDQudC7INGBINGB0L7RhdGA0LDQvdC10L3QvdGL0LzQuCDQvdCw0YHRgtGA0L7QudC60LDQvNC4IHRyYWNrZXItdXNlci1zZXR0aW5ncyc7XHJcbiAgICB1cGxvYWQuY2xhc3NMaXN0LmFkZCgncm93LWl0ZW0nKTtcclxuXHJcbiAgICB1cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxvYWRGaWxlKHRoaXMpXHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkRmlsZShpbnB1dCkge1xyXG4gICAgICAgIGxldCBmaWxlVG9Mb2FkID0gaW5wdXQuZmlsZXNbMF07XHJcblxyXG4gICAgICAgIGxldCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHJcbiAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZmlsZUxvYWRlZEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IEpTT04ucGFyc2UoZmlsZUxvYWRlZEV2ZW50LnRhcmdldC5yZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgaWYodHlwZW9mIHNldHRpbmdzID09PSAnb2JqZWN0Jyl7XHJcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhzZXR0aW5ncykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBzZXR0aW5nc1trZXldKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcign0J7RiNC40LHQutCwINGH0YLQtdC90LjRjyDRhNCw0LnQu9CwINC90LDRgdGC0YDQvtC10LonKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzVGV4dChmaWxlVG9Mb2FkLCBcIlVURi04XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGluazogZG93bmxvYWRMaW5rLFxyXG4gICAgICAgIGZpZWxkOiB1cGxvYWRcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCB7dXNlclNldHRpbmdzfTtcclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3VzZXJTZXR0aW5ncy5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFubi1hYSBvbiAwNS4wNy4yMDE3LlxyXG4gKi9cclxuaW1wb3J0IHtnZXRUYXNrSWR9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5cclxuZnVuY3Rpb24gY2FsY1RpbWVMZWZ0KCkge1xyXG4gICAgLy9kdHAgPSBkYXJ0LXRhc2stcGxhbmVcclxuICAgIGNvbnN0IHRpZCA9IGdldFRhc2tJZCgpO1xyXG5cclxuICAgIGxldCBiYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci10b29sYmFyJyk7XHJcbiAgICBsZXQgd29ya2Vyc1RpbWVCbG9jayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JrZXJzLXRpbWUnKTtcclxuXHJcbiAgICBsZXQgYmFyaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYmFyaXRlbS5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXJfX2l0ZW0nKTtcclxuXHJcbiAgICBsZXQgZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgZmllbGQuaWQgPSAnZHRwLWlucHV0JztcclxuICAgIGZpZWxkLnZhbHVlID0gMDtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICByZXN1bHQuY2xhc3NMaXN0LmFkZCgnZHRwLXJlc3VsdCcpO1xyXG5cclxuICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGJ0bi50ZXh0Q29udGVudCA9ICfQn9C+0YHRh9C40YLQsNGC0Ywg0L7RgdGC0LDQstGI0LXQtdGB0Y8g0LLRgNC10LzRjyc7XHJcbiAgICBidG4udHlwZSA9ICdidXR0b24nO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2R0cC1idXR0b24nKTtcclxuXHJcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xyXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyLXRpdGxlJyk7XHJcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICfQntGB0YLQsNCy0YjQtdC10YHRjyDQstGA0LXQvNGPIChEYXJ0SXQpJztcclxuXHJcbiAgICBiYXJpdGVtLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIGJhcml0ZW0uYXBwZW5kQ2hpbGQoZmllbGQpO1xyXG4gICAgYmFyaXRlbS5hcHBlbmRDaGlsZChyZXN1bHQpO1xyXG4gICAgYmFyLmFwcGVuZENoaWxkKGJhcml0ZW0pO1xyXG5cclxuICAgIHdvcmtlcnNUaW1lQmxvY2suYXBwZW5kQ2hpbGQoYnRuKTtcclxuXHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0RGFydENhbGMoZmllbGQscmVzdWx0KVxyXG4gICAgfSk7XHJcblxyXG4gICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICByZWFkV3JpdGVEYXJ0UGxhbmVUaW1lKHRoaXMsIHRpZCwgZS50eXBlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJlYWRXcml0ZURhcnRQbGFuZVRpbWUoZmllbGQsIHRpZCwgJ2xvYWQnKTtcclxuICAgIGxldERhcnRDYWxjKGZpZWxkLHJlc3VsdCk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBsZXREYXJ0Q2FsYyhpbnB1dCxvdXQpIHtcclxuICAgIGxldCBkYXRhID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmtlcnMtdGltZS10b3RhbCcpLmRhdGFzZXQudG90YWx0aW1lKTtcclxuICAgIGxldCBjYWxjID0gcGFyc2VJbnQoaW5wdXQudmFsdWUpIC0gZGF0YTtcclxuICAgIGxldCB0eHQgPSAn0J7RgdGC0LDQstGI0LXQtdGB0Y8g0LLRgNC10LzRjzogJztcclxuXHJcbiAgICBpZihjYWxjIDwgMCl7XHJcbiAgICAgICAgb3V0LmNsYXNzTGlzdC5hZGQoJ2R0cC1hbGVydCcpO1xyXG4gICAgICAgIG91dC5jbGFzc0xpc3QudG9nZ2xlKCdkdHAtd2FybicsZmFsc2UpO1xyXG4gICAgICAgIHR4dCA9ICfQkdC+0LvRjNGI0LUg0LfQsNC/0LvQsNC90LjRgNC+0LLQsNC90L3QvtCz0L4g0L3QsCAnO1xyXG4gICAgICAgIGNhbGMgPSBNYXRoLmFicyhjYWxjKTtcclxuICAgIH1lbHNlIGlmKGNhbGMgPD0gNjApe1xyXG4gICAgICAgIG91dC5jbGFzc0xpc3QuYWRkKCdkdHAtd2FybicpO1xyXG4gICAgICAgIG91dC5jbGFzc0xpc3QudG9nZ2xlKCdkdHAtYWxlcnQnLGZhbHNlKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIG91dC5jbGFzc0xpc3QucmVtb3ZlKCdkdHAtd2FybicsJ2R0cC1hbGVydCcpO1xyXG4gICAgfVxyXG4gICAgb3V0LnRleHRDb250ZW50ID0gYCR7dHh0fSAke2NhbGN9INC80LjQvS5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkV3JpdGVEYXJ0UGxhbmVUaW1lKGlucHV0LGlkLGV2KSB7XHJcblxyXG4gICAgaWYoZXYgPT09ICdjaGFuZ2UnKXtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHtpZH0tZGFydC1wbGFuZS10aW1lYCwgaW5wdXQudmFsdWUpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7aWR9LWRhcnQtcGxhbmUtdGltZWApICE9PSBudWxsKXtcclxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtpZH0tZGFydC1wbGFuZS10aW1lYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vcGNzcy9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLnBjc3MnO1xyXG5cclxuZXhwb3J0IHtjYWxjVGltZUxlZnR9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLnBjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vY2FsY1RpbWVMZWZ0SW5EYXJ0VGFzay5wY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL2NhbGNUaW1lTGVmdEluRGFydFRhc2sucGNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGNzcy9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5kdHAtcmVzdWx0LmR0cC1hbGVydHtjb2xvcjpyZWQ7Zm9udC1zaXplOjEuNGVtfS5kdHAtcmVzdWx0e3BhZGRpbmctdG9wOjJlbX0uZHRwLXJlc3VsdC5kdHAtd2Fybntjb2xvcjpibHVlfS5kdHAtYnV0dG9ue21hcmdpbi10b3A6MmVtfVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/e1wiaW1wb3J0TG9hZGVyc1wiOjF9IS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYiEuL3NyYy9wY3NzL2NhbGNUaW1lTGVmdEluRGFydFRhc2sucGNzc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QTs7Ozs7QUM3REE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdEVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2hXQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3hGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEpBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25CQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25FQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3UUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ25iQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hIQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdKQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkRBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDblVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=