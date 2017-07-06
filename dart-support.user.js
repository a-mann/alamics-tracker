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

    let workers = new Set();

    for (let i = 0; i < rows.length; i++) {
        workers.add(rows[i].children[4].textContent);
    }

    return [...workers];
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getURLAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createISODate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getRowDateString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return dateFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return modifySelectOptionsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return runOnKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return loadByAjax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return declOfNum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return findInArray; });

//определение страницы по get параметру a, например ?a=user_page
function getURLAction() {
    let get_action = window.location.search.substring(1).split("=");
    get_action = get_action[1].split('&');
    return get_action[0];
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



const action_page = __WEBPACK_IMPORTED_MODULE_0__utils_js__["f" /* getURLAction */]();

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
            let item_date = __WEBPACK_IMPORTED_MODULE_1__utils_js__["e" /* getRowDateString */](item);

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

        __WEBPACK_IMPORTED_MODULE_0__utils_js__["h" /* modifySelectOptionsList */](options, params_user_projects);
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
                let if_find = __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* findInArray */](task_workers, options[i].text);

                if (if_find > -1) {
                    task_workers_id.push(options[i].value)
                }
            }

            //затем сравнить со списком из настроек
            //и добавить работника если его нет в списке
            for (let i = 0; i < task_workers_id.length; i++) {
                let if_find = __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* findInArray */](params_user_workers, task_workers_id[i]);

                if (if_find < 0) {
                    params_user_workers.push(task_workers_id[i]);
                    //console.info('В список добавлен '+ task_workers[i]);
                }
            }

            __WEBPACK_IMPORTED_MODULE_0__utils_js__["h" /* modifySelectOptionsList */](options, params_user_workers);
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

    __WEBPACK_IMPORTED_MODULE_0__utils_js__["i" /* runOnKeys */](
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
        __WEBPACK_IMPORTED_MODULE_1__utils_js__["g" /* loadByAjax */](pageUrl,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFydC1zdXBwb3J0LnVzZXIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjAyMzkzODAwYTc4ZGVmODA0YWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL19maW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19hZGRDU1NTZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzPzdmZjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHlmaUNvbW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9fbG9hZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbWVudHNEZXNpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvY29tbWVudHNEZXNpZ24ucGNzcz84NDE4Iiwid2VicGFjazovLy8uL3NyYy9wY3NzL2NvbW1lbnRzRGVzaWduLnBjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbGN1bGF0ZUVsYXBzZWRUaW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9nb1RvVGFzay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY291bnRXb3JrZXJUaW1lLmpzIiwid2VicGFjazovLy8uL3NyYy90YXNrRm9vdGVyRGVzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcz8wYzA0Iiwid2VicGFjazovLy8uL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWxlbXNNb2RpZmljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhdmVOZXdDb21tZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3B5UGFzdGVDb21tZW50UXVvdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rhc2tVcGRhdGVOb3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuY2hvckxpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZXJTZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FsY1RpbWVMZWZ0SW5EYXJ0VGFzay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGNzcy9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLnBjc3M/NWUwYSIsIndlYnBhY2s6Ly8vLi9zcmMvcGNzcy9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLnBjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjAyMzkzODAwYTc4ZGVmODA0YWIiLCJmdW5jdGlvbiBnZXRUYXNrSWQoKSB7XHJcbiAgICBjb25zdCB0YXNrSWQgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNwbGl0KCcmJyk7XHJcblxyXG4gICAgbGV0IGlkID0gdGFza0lkLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtLnNwbGl0KCc9JylbMF0gPT09ICdpZCc7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaWRbMF0uc3BsaXQoXCI9XCIpWzFdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUYXNrSGVhZCgpIHtcclxuICAgIGxldCB0YXNrSGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXRpdGxlJykudGV4dENvbnRlbnQuc3BsaXQoJyAtICcpO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHRhc2tIZWFkKSAmJiB0YXNrSGVhZC5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIHJldHVybiB7J3RpdGxlJzogdGFza0hlYWRbMV0udHJpbSgpLCAnc3RhdGUnOiB0YXNrSGVhZFsyXS5zcGxpdCgnICcpWzFdfTtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rhc2sgaGVhZCBub3QgZm91bmQnKTtcclxufVxyXG5cclxuLy/Qv9C+0LvRg9GH0LjRgtGMINCy0YHQtSDQutCw0LzQtdC90YLRiyDQsiDQt9Cw0LTQsNGH0LVcclxuLy/RgNCw0LHQvtGC0LDQtdGCINC60L7RgNGA0LXQutGC0L3QviDQv9C+0YHQu9C1INC30LDQv9GD0YHQutCwIGNvbW1lbnRzRGVzaWduXHJcbmZ1bmN0aW9uIGdldEFsbENhbW1lbnRzKCkge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLWNvbW1lbnQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29tbWVudEZyb21Sb3cocm93KSB7XHJcbiAgICByZXR1cm4gcm93LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LXdyYXAnKTtcclxufVxyXG5cclxuLy/RgNCw0LHQvtGC0LDQtdGCINC60L7RgNGA0LXQutGC0L3QviDQtNC70Y8g0LfQsNC/0YPRgdC60LAgY29tbWVudHNEZXNpZ25cclxuZnVuY3Rpb24gZ2V0QWxsQ29tbWVudHNSb3dzKCkge1xyXG4gICAgbGV0IHJvd3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy10YmwnKS5xdWVyeVNlbGVjdG9yQWxsKCdUUicpKTtcclxuICAgIHJvd3MgPSByb3dzLnNwbGljZSgxLCByb3dzLmxlbmd0aCk7IC8v0LjRgdC60LvRjtGH0LjRgtGMINC/0LXRgNCy0YPRjiDRgdGC0YDQvtC60YMg0YEg0LfQsNCz0L7Qu9C+0LLQutCw0LzQuCDRgdGC0L7Qu9Cx0YbQvtCyXHJcblxyXG4gICAgcmV0dXJuIHJvd3MuZmlsdGVyKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgIHJldHVybiByb3cucXVlcnlTZWxlY3RvckFsbCgndGQnKS5sZW5ndGggPiAxO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vINC/0L7Qu9GD0YfQuNGC0Ywg0YHQv9C40YHQvtC6INCy0YHQtdGFINGB0L7RgtGA0YPQtNC90LjQutC+0LIg0LIg0LfQsNC00LDRh9C1XHJcbmZ1bmN0aW9uIGdldEFsbFdvcmtlcnMoKSB7XHJcbiAgICBsZXQgcm93cyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG5cclxuICAgIGxldCB3b3JrZXJzID0gbmV3IFNldCgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHdvcmtlcnMuYWRkKHJvd3NbaV0uY2hpbGRyZW5bNF0udGV4dENvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbLi4ud29ya2Vyc107XHJcbn1cclxuXHJcbi8vINC/0L7Qu9GD0YfQtdC90LjQtSDRgdGC0YDQvtC60Lgg0YEg0LLRgNC10LzQvdC10Lwg0LjQtyDRgtCw0LHQu9C40YbRiyDRgSDQutC+0LzQvNC10L3RgtCw0YDQuNC80Lgg0LfQsNC00LDRh9C4XHJcbmZ1bmN0aW9uIGdldFJvd1RpbWVTdHJpbmcocm93KSB7XHJcbiAgICBsZXQgdCA9ICcnO1xyXG5cclxuICAgIGlmIChyb3cuY2hpbGRyZW5bMTBdKSB7XHJcbiAgICAgICAgLy/QtNC+INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdCA9IHJvdy5jaGlsZHJlblsxMF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgdCA9IHBhcnNlSW50KHQuc3BsaXQoJy8nKVswXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8v0L/QvtGB0LvQtSDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgIHQgPSBwYXJzZUludChyb3cucXVlcnlTZWxlY3RvcignLmVsYXBzZWQtdGltZScpLnRleHRDb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IHtnZXRUYXNrSWQsZ2V0VGFza0hlYWQsZ2V0QWxsQ2FtbWVudHMsZ2V0Q29tbWVudEZyb21Sb3csZ2V0QWxsQ29tbWVudHNSb3dzLGdldEFsbFdvcmtlcnMsZ2V0Um93VGltZVN0cmluZ307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvX2ZpbmRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbi8v0L7Qv9GA0LXQtNC10LvQtdC90LjQtSDRgdGC0YDQsNC90LjRhtGLINC/0L4gZ2V0INC/0LDRgNCw0LzQtdGC0YDRgyBhLCDQvdCw0L/RgNC40LzQtdGAID9hPXVzZXJfcGFnZVxyXG5mdW5jdGlvbiBnZXRVUkxBY3Rpb24oKSB7XHJcbiAgICBsZXQgZ2V0X2FjdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KFwiPVwiKTtcclxuICAgIGdldF9hY3Rpb24gPSBnZXRfYWN0aW9uWzFdLnNwbGl0KCcmJyk7XHJcbiAgICByZXR1cm4gZ2V0X2FjdGlvblswXTtcclxufVxyXG5cclxuLy/RgdC+0LfQtNCw0L3QuNC1INC00LDRgtGLINC40Lcg0YHRgtGA0L7QutC4XHJcbmZ1bmN0aW9uIGNyZWF0ZUlTT0RhdGUoc3RyKSB7XHJcbiAgICBsZXQgZGF0ZV9zdHIgPSBzdHIuc3BsaXQoJy4nKTtcclxuICAgIGxldCBkYXlfc3RyID0gZGF0ZV9zdHJbMF07XHJcbiAgICBsZXQgbW9udGhfc3RyID0gZGF0ZV9zdHJbMV07XHJcbiAgICBsZXQgeWVhcl9zdHIgPSBkYXRlX3N0clsyXTtcclxuICAgIGxldCBkYXRlX2lzb19zdHIgPSB5ZWFyX3N0ciArICctJyArIG1vbnRoX3N0ciArICctJyArIGRheV9zdHI7XHJcbiAgICBkYXRlX2lzb19zdHIgPSBEYXRlLnBhcnNlKGRhdGVfaXNvX3N0cik7XHJcbiAgICByZXR1cm4gZGF0ZV9pc29fc3RyO1xyXG59XHJcblxyXG4vLyDQv9C+0LvRg9GH0LXQvdC40LUg0YHRgtGA0L7QutC4INGBINC00LDRgtC+0Lkg0LjQtyDRgtCw0LHQu9C40YbRiyDRgSDQutC+0LzQvNC10L3RgtCw0YDQuNC80Lgg0LfQsNC00LDRh9C4XHJcbmZ1bmN0aW9uIGdldFJvd0RhdGVTdHJpbmcocm93KSB7XHJcbiAgICBsZXQgdCA9ICcnO1xyXG4gICAgaWYgKHJvdy5jaGlsZHJlblszXSkge1xyXG4gICAgICAgIC8v0LTQviDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgIHQgPSByb3cuY2hpbGRyZW5bM10udGV4dENvbnRlbnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8v0L/QvtGB0LvQtSDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgIHQgPSByb3cucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtZGF0ZScpLnRleHRDb250ZW50XHJcbiAgICB9XHJcblxyXG4gICAgdCA9IHQuc3BsaXQoJyAnKTtcclxuXHJcbiAgICByZXR1cm4gY3JlYXRlSVNPRGF0ZSh0WzBdKTtcclxufVxyXG5cclxuLy/RhNC+0YDQvNCw0YLQuNGA0L7QstCw0L3QuNC1INC00LDRgtGLXHJcbmZ1bmN0aW9uIGRhdGVGb3JtYXR0ZXIoZGF0ZSkge1xyXG4gICAgbGV0IGZvcm1hdHRlciA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFwicnVcIik7XHJcbiAgICBkYXRlID0gbmV3IERhdGUocGFyc2VJbnQoZGF0ZSwgMTApKTtcclxuICAgIGRhdGUgPSBmb3JtYXR0ZXIuZm9ybWF0KGRhdGUpO1xyXG4gICAgcmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbi8vINGB0LrRgNGL0YLRjC/Qv9C+0LrQsNC30LDRgtGMINC+0L/RgNC10LTQtdC90L3Ri9C1IG9wdGlvbiDQsiBzZWxlY3RcclxuZnVuY3Rpb24gbW9kaWZ5U2VsZWN0T3B0aW9uc0xpc3QobGlzdCwgcGFyYW1zKSB7XHJcbiAgICBBcnJheS5mcm9tKGxpc3QpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBpdGVtLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMuaW5kZXhPZihpdGVtLnZhbHVlKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy/QstGL0LfQvtCyINGE0YPQvdC60YbQuNC4INC/0L4g0YHQvtGH0LXRgtCw0L3QuNGOINC60LvQsNCy0LjRiNGMXHJcbmZ1bmN0aW9uIHJ1bk9uS2V5cyhmdW5jLCBlbGVtKSB7XHJcbiAgICBsZXQgY29kZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XHJcblxyXG4gICAgbGV0IHByZXNzZWQgPSB7fTtcclxuXHJcbiAgICBlbGVtLm9ua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG5cclxuICAgICAgICBwcmVzc2VkW2Uua2V5Q29kZV0gPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvZGVzLmxlbmd0aDsgaSsrKSB7IC8vINC/0YDQvtCy0LXRgNC40YLRjCwg0LLRgdC1INC70Lgg0LrQu9Cw0LLQuNGI0Lgg0L3QsNC20LDRgtGLXHJcbiAgICAgICAgICAgIGlmICghcHJlc3NlZFtjb2Rlc1tpXV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0YfRgtC+0LHRiyDQuNC30LHQtdC20LDRgtGMIFwi0LfQsNC70LjQv9Cw0L3QuNGPXCIg0LrQu9Cw0LLQuNGI0LggLS0g0L7QsdC90YPQu9GP0LXQvCDRgdGC0LDRgtGD0YEg0LLRgdC10YUg0LrQu9Cw0LLQuNGILCDQv9GD0YHRgtGMINC90LDQttC40LzQsNC10YIg0LLRgdGRINC30LDQvdC+0LLQvlxyXG4gICAgICAgIHByZXNzZWQgPSB7fTtcclxuXHJcbiAgICAgICAgZnVuYygpO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtLm9ua2V5dXAgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUgPSBlIHx8IHcuZXZlbnQ7XHJcblxyXG4gICAgICAgIGRlbGV0ZSBwcmVzc2VkW2Uua2V5Q29kZV07XHJcbiAgICB9O1xyXG59XHJcblxyXG4vL2FqYXgg0LfQsNC/0YDQvtGBXHJcbmZ1bmN0aW9uIGxvYWRCeUFqYXgocGF0aCwgc3VjY2VzcywgZXJyb3IpIHtcclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgeGhyLm9wZW4oXCJHRVRcIiwgcGF0aCwgdHJ1ZSk7XHJcbiAgICB4aHIuc2VuZCgpO1xyXG59XHJcblxyXG4vLyDRhNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0YHRgtGA0L7QutC4INGBINC90YPQttC90YvQvCDQvtC60L7QvdGH0LDQvdC40LXQvCDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0YfQuNGB0LvQsFxyXG4vLyDQvdCw0L/RgNC40LzQtdGAIC0g0LzQuNC90YPRgtCwLCDQvNC40L3Rg9GC0YssINC80LjQvdGD0YJcclxuZnVuY3Rpb24gZGVjbE9mTnVtKG51bWJlciwgdGl0bGVzKSB7XHJcbiAgICBsZXQgY2FzZXMgPSBbMiwgMCwgMSwgMSwgMSwgMl07XHJcbiAgICByZXR1cm4gdGl0bGVzWyhudW1iZXIgJSAxMDAgPiA0ICYmIG51bWJlciAlIDEwMCA8IDIwKSA/IDIgOiBjYXNlc1sobnVtYmVyICUgMTAgPCA1KSA/IG51bWJlciAlIDEwIDogNV1dO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kSW5BcnJheShhcnIsIHZhbCkge1xyXG4gICAgcmV0dXJuIGFyci5pbmRleE9mKHZhbCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7Z2V0VVJMQWN0aW9uLGNyZWF0ZUlTT0RhdGUsZ2V0Um93RGF0ZVN0cmluZyxkYXRlRm9ybWF0dGVyLG1vZGlmeVNlbGVjdE9wdGlvbnNMaXN0LHJ1bk9uS2V5cyxsb2FkQnlBamF4LGRlY2xPZk51bSxmaW5kSW5BcnJheX07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL191dGlscy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdH1cblxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24pIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZSgndG90YWwnKTtcclxufVxyXG5cclxuaW1wb3J0IHtnZXRVUkxBY3Rpb259IGZyb20gJy4vX3V0aWxzLmpzJztcclxuXHJcbmltcG9ydCB7YWRkUGFnZUVsZW1zfSBmcm9tICcuL19hZGRDU1NTZWxlY3RvcnMuanMnO1xyXG5cclxuaW1wb3J0IHttb2R5ZmlDb21tZW50c30gZnJvbSAnLi9tb2R5ZmlDb21tZW50cy5qcyc7XHJcblxyXG4vL2ltcG9ydCB7Y29tbWVudHNEZXNpZ259IGZyb20gJy4vY29tbWVudHNEZXNpZ24uanMnO1xyXG5cclxuaW1wb3J0IHtjYWxjdWxhdGVFbGFwc2VkVGltZX0gZnJvbSAnLi9jYWxjdWxhdGVFbGFwc2VkVGltZS5qcyc7XHJcblxyXG5pbXBvcnQge2dvVG9UYXNrRGF0YWxpc3R9IGZyb20gJy4vZ29Ub1Rhc2suanMnO1xyXG5cclxuaW1wb3J0IHtjb3VudFdvcmtlclRpbWV9IGZyb20gJy4vY291bnRXb3JrZXJUaW1lLmpzJztcclxuXHJcbmltcG9ydCB7dGFza0Zvb3RlckRlc2lnbn0gZnJvbSAnLi90YXNrRm9vdGVyRGVzaWduLmpzJztcclxuXHJcbmltcG9ydCB7ZWxlbXNNb2RpZmljYXRpb259IGZyb20gJy4vZWxlbXNNb2RpZmljYXRpb24uanMnO1xyXG5cclxuaW1wb3J0IHtzYXZlTmV3Q29tbWVudH0gZnJvbSAnLi9zYXZlTmV3Q29tbWVudC5qcyc7XHJcblxyXG5pbXBvcnQge2NvcHlQYXN0ZUNvbW1lbnRRdW90ZX0gZnJvbSAnLi9jb3B5UGFzdGVDb21tZW50UXVvdGUuanMnO1xyXG5cclxuaW1wb3J0IHt0YXNrVXBkYXRlTm90aWZ5fSBmcm9tICcuL3Rhc2tVcGRhdGVOb3RpZnkuanMnO1xyXG5cclxuaW1wb3J0IHthbmNob3JMaW5rfSBmcm9tICcuL2FuY2hvckxpbmsuanMnO1xyXG5cclxuaW1wb3J0IHt1c2VyU2V0dGluZ3N9IGZyb20gJy4vdXNlclNldHRpbmdzLmpzJztcclxuXHJcbi8vaW1wb3J0IHt0YXNrSGVhZGVyRGVzaWdufSBmcm9tICcuL3Rhc2tIZWFkZXJEZXNpZ24uanMnXHJcblxyXG5pbXBvcnQge2NhbGNUaW1lTGVmdH0gZnJvbSAnLi9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLmpzJztcclxuXHJcbmNvbnN0IGFjdGlvbl9wYWdlID0gZ2V0VVJMQWN0aW9uKCk7XHJcblxyXG5zd2l0Y2ggKGFjdGlvbl9wYWdlKSB7XHJcbiAgICBjYXNlICduZXcnOlxyXG4gICAgICAgIHVzZXJTZXR0aW5ncygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAncmVkJzpcclxuICAgICAgICBhZGRQYWdlRWxlbXMoKTtcclxuICAgICAgICBlbGVtc01vZGlmaWNhdGlvbigpO1xyXG4gICAgICAgIG1vZHlmaUNvbW1lbnRzKCk7XHJcblxyXG4gICAgICAgIGlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKXtcclxuICAgICAgICAgICAgY291bnRXb3JrZXJUaW1lKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd29ya2VyLXRpbWUtY291bnQnKSA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudFdvcmtlclRpbWUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih3aW5kb3cubG9jYXRpb24uaG9zdCA9PT0gJ3N1cHBvcnQuZGFydGl0LnJ1Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsY1RpbWVMZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNhdmVOZXdDb21tZW50KCk7XHJcbiAgICAgICAgY2FsY3VsYXRlRWxhcHNlZFRpbWUoKTtcclxuICAgICAgICAvL2NvbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdGFza0Zvb3RlckRlc2lnbigpO1xyXG4gICAgICAgIGNvcHlQYXN0ZUNvbW1lbnRRdW90ZSgpO1xyXG4gICAgICAgIHRhc2tVcGRhdGVOb3RpZnkoKTtcclxuICAgICAgICBnb1RvVGFza0RhdGFsaXN0KCk7XHJcbiAgICAgICAgYW5jaG9yTGluaygpO1xyXG4gICAgICAgIC8vdGFza0hlYWRlckRlc2lnbigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAndXNlcl9wYWdlJzpcclxuICAgICAgICBhZGRQYWdlRWxlbXMoKTtcclxuICAgICAgICBnb1RvVGFza0RhdGFsaXN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbn1cclxuXHJcbmlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKXtcclxuICAgIGNvbnNvbGUudGltZUVuZCgndG90YWwnKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8v0YHRjtC00LAg0LTQvtCx0LDQu9GP0Y7RgtGB0Y8g0Y3Qu9C10LzQtdC90YLRiyDRgdGC0YDQsNC90LjRhtGLINCyINC60L7RgtC+0YDRi9C1INCy0YHRgtCw0LLQu9GP0Y7RgtGB0Y8g0YHQvtC30LTQsNC90YvQtSDRgdC60YDQuNC/0YLQvtC8INCx0LvQvtC60LhcclxuLy/QuC7QuNC70Lgg0L7QvdC4INC80L7QtNC40YTQuNGG0LjRgNGD0Y7RgtGB0Y8g0YHQutGA0LjQv9GC0L7QvFxyXG5cclxuaW1wb3J0IHtnZXRBbGxDb21tZW50c1Jvd3N9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5cclxuZnVuY3Rpb24gYWRkUGFnZUVsZW1zKCkge1xyXG4gICAgbGV0ICRjb250ZW50X2NlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtW25hbWU9XCJ0aGVGb3JtXCJdJyk7XHJcbiAgICAkY29udGVudF9jZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCAnbWFpbi1jb250ZW50Jyk7XHJcblxyXG4gICAgbGV0ICRjb21tZW50c190YmwgPSAkY29udGVudF9jZWxsLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiVEFCTEVcIilbMF07XHJcblxyXG4gICAgaWYoJGNvbW1lbnRzX3RibCl7XHJcbiAgICAgICAgJGNvbW1lbnRzX3RibC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbW1lbnRzLXRibCcpO1xyXG5cclxuICAgICAgICBsZXQgcm93cyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG5cclxuICAgICAgICByb3dzLm1hcChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgIHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpWzVdLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtd3JhcCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBpbnB1dF9kaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuaW5wdXRfYm94Jyk7IC8v0LXRgdGC0Ywg0L3QsCDRgdGC0YDQsNC90LjRhtC1INC30LDQtNCw0YfQuFxyXG5cclxuICAgIGlmIChpbnB1dF9kaXYpIHtcclxuICAgICAgICBpbnB1dF9kaXYuaWQgPSAndGFzay1iYXInO1xyXG4gICAgICAgIGxldCAkdXNlcl90b29sYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICAgICAgJHVzZXJfdG9vbGJhci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3VzZXItdG9vbGJhcicpO1xyXG4gICAgICAgICR1c2VyX3Rvb2xiYXIuY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyJyk7XHJcblxyXG4gICAgICAgIGlucHV0X2Rpdi5hcHBlbmRDaGlsZCgkdXNlcl90b29sYmFyKTtcclxuICAgIH1cclxuXHJcbiAgICAvL9C/0L7QtNCy0LDQuyDQt9Cw0LTQsNGH0LhcclxuICAgIGxldCAkdGFza19mb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0YWJsZS50aGVGb3JtJyk7XHJcblxyXG4gICAgaWYoJHRhc2tfZm9vdGVyLmxlbmd0aCl7XHJcbiAgICAgICAgLy/QvtCx0LXRgNGC0LrQsFxyXG4gICAgICAgICR0YXNrX2Zvb3RlciA9ICR0YXNrX2Zvb3RlclswXTtcclxuICAgICAgICAkdGFza19mb290ZXIuaWQgPSAndGFzay1mb290ZXInO1xyXG5cclxuICAgICAgICAvL9GC0LDQsdC70LjRhtCwINGBIHRleHRhcmVhINC60LDQvNC10L3RgtCwXHJcbiAgICAgICAgbGV0ICRmb290ZXJfdGJscyA9ICR0YXNrX2Zvb3Rlci5xdWVyeVNlbGVjdG9yQWxsKCd0YWJsZScpO1xyXG5cclxuICAgICAgICBsZXQgJGNvbW1lbnRUYmwgPSAkZm9vdGVyX3RibHNbMF07XHJcbiAgICAgICAgJGNvbW1lbnRUYmwuaWQgPSAndGJsLW5ldy1jb21tZW50JztcclxuXHJcbiAgICAgICAgLy/QvtCx0LXRgNGC0LrQsCDRj9GH0LXQudC60Lgg0YEgdGV4dGFyZWFcclxuICAgICAgICBsZXQgJG5ld0NvbW1lbnQgPSAkY29tbWVudFRibC5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpWzFdO1xyXG4gICAgICAgICRuZXdDb21tZW50LmlkID0gJ25ldy1jb21tZW50LXdyYXAnO1xyXG5cclxuICAgICAgICAvL9C00L7QsdCw0LLQu9GOINC+0LHQtdGA0YLQutGDINC00LvRjyB0ZXh0YXJlYVxyXG4gICAgICAgIC8v0LIg0L3QtdC1INCx0YPQtNGDINCy0YHRgtCw0LLQu9GP0YLRjCDQutC90L7Qv9C60Lgg0LLRgdGP0LrQuNC1XHJcbiAgICAgICAgbGV0ICR0YXJlYVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAkdGFyZWFXcmFwLmlkID0gJ3RhcmVhLXdyYXAnO1xyXG4gICAgICAgICR0YXJlYVdyYXAuY2xhc3NMaXN0LmFkZCgndGFyZWEtd3JhcCcpO1xyXG5cclxuICAgICAgICAkdGFyZWFXcmFwLmFwcGVuZENoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0JykpO1xyXG4gICAgICAgICRuZXdDb21tZW50LmFwcGVuZENoaWxkKCR0YXJlYVdyYXApO1xyXG5cclxuICAgICAgICAvL9Ci0LDQsdC70LjRhtCwINGB0YLQsNGC0YPRgdC+0LIg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgbGV0ICRzdGF0dXNUYmwgPSAkZm9vdGVyX3RibHNbMV0ucXVlcnlTZWxlY3RvcigndGFibGUnKTtcclxuICAgICAgICAkc3RhdHVzVGJsLmlkID0gJ3RibC1zdGF0dXMnO1xyXG4gICAgfVxyXG4gICAgLy/Qt9Cw0LPQvtC70L7QstC+0Log0LfQsNC00LDRh9C4XHJcbiAgICBsZXQgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDEnKTtcclxuXHJcbiAgICB0YXNrVGl0bGUuaWQgPSAndGFzay10aXRsZSc7XHJcbn1cclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9wY3NzL3VzZXJzY3JpcHQucGNzcyc7XHJcblxyXG5leHBvcnQge2FkZFBhZ2VFbGVtc307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvX2FkZENTU1NlbGVjdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi91c2Vyc2NyaXB0LnBjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdXNlcnNjcmlwdC5wY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3VzZXJzY3JpcHQucGNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGNzcy91c2Vyc2NyaXB0LnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLypyZXNldCBzdHlsZS5jc3MqLzpyb290IC5pbnB1dF9ib3ggYnV0dG9uLDpyb290IC5pbnB1dF9ib3ggaW5wdXR7bWFyZ2luLWxlZnQ6MH1cXHJcXG5cXHJcXG4vKnJlc2V0IHN0eWxlLmNzcyovI21haW4tY29udGVudHtcXHJcXG4gICAgLyrRg9Cx0LjRgNCw0Y4g0LvQuNGI0L3QuNC1INC+0YLRgdGC0YPQv9GLINC4IGJyINGH0YLQvtCx0Ysg0YPQvNC10L3RjNGI0LjRgtGMINC00YvRgNGDINC/0L7QtCDQv9C+0LvRj9C80Lgg0LrQsNC80LXQvdGC0LAqL21hcmdpbi1ib3R0b206MH0jbWFpbi1jb250ZW50IGJyOmxhc3QtY2hpbGR7ZGlzcGxheTpub25lfS5vbm9mZi1vcHR7bWFyZ2luOjAgNnB4IDAgMTBweH0ubm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fS5oaWRkZW4tZWxlbXtwb3NpdGlvbjpmaXhlZCFpbXBvcnRhbnQ7bGVmdDotOTk5ZW07ei1pbmRleDotMTt2aXNpYmlsaXR5OmhpZGRlbn0ubm9uZS52aWV3e2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50fS5jaF9hZGRye21hcmdpbjoxMHB4IDEwcHggMTBweCAwO3ZlcnRpY2FsLWFsaWduOnRvcH0udG90b3A+aW5wdXR7bWFyZ2luOjEwcHggMCAwfS5sYWJlbF9oZWFke2Rpc3BsYXk6YmxvY2s7bWFyZ2luOjAgMCAyMHB4fS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXCI7ZGlzcGxheTp0YWJsZTtjbGVhcjpib3RofS5hbGlzdHtmbG9hdDpyaWdodH0uYWxpc3QgcHttYXJnaW46MCAwIDEwcHg7bGluZS1oZWlnaHQ6MTt0ZXh0LWFsaWduOnJpZ2h0fS5iYXItd3JhcHtwYWRkaW5nOjhweCAxNXB4O2JhY2tncm91bmQ6IzJkMmQyZH0jY3VzdG9tLXByb2plY3QtbGlzdD5saSwjY3VzdG9tLXdvcmtlcnMtbGlzdD5saXt3aWR0aDoyMCU7ZmxvYXQ6bGVmdDtjdXJzb3I6cG9pbnRlcn0jY3VzdG9tLXByb2plY3QtbGlzdD5saTpmaXJzdC1jaGlsZHtkaXNwbGF5Om5vbmV9LnVzZXItbGlzdHttYXJnaW46MmVtIDFlbTtwYWRkaW5nOjA7bGlzdC1zdHlsZS1wb3NpdGlvbjppbnNpZGV9LnVzZXItbGlzdD5saXtsaW5lLWhlaWdodDoxLjV9LnNlbGVjdGVke2NvbG9yOmdyZWVufS5idG4tZmxhdHtwYWRkaW5nOi41ZW07YmFja2dyb3VuZDojZjBmMGYwO2N1cnNvcjpwb2ludGVyfS5idG4tZmxhdCwucm93LWl0ZW17ZGlzcGxheTppbmxpbmUtYmxvY2t9LnJvdy1pdGVte3ZlcnRpY2FsLWFsaWduOnRvcH0ucm93LWl0ZW06bm90KDpsYXN0LWNoaWxkKXttYXJnaW4tcmlnaHQ6MWVtfSNzZXR0aW5ncy1idG57bWFyZ2luOjAgMCAyMHB4fSNzZXR0aW5ncy1ib3h7ZGlzcGxheTpub25lO21hcmdpbjoyMHB4IDA7cGFkZGluZzoyMHB4IDA7b3V0bGluZToxcHggc29saWQgIzQxNDE0MX0jc2V0dGluZ3MtYm94LmlzLW9wZW57ZGlzcGxheTpibG9ja30udXNlci10aXRsZXtjb2xvcjojMDAwO21hcmdpbjowIDAgLjZlbTtmb250LXNpemU6MjBweDtwYWRkaW5nOjB9LnJlZ3VsYXItbGlua3tjb2xvcjojMDA1NGI5O291dGxpbmU6MCFpbXBvcnRhbnR9LnRpbWUtbGlzdCBwe21hcmdpbjo1cHggMDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59LnRpbWUtbGlzdD5wPnNwYW46Zmlyc3QtY2hpbGR7cGFkZGluZy1yaWdodDoxZW07Y3Vyc29yOnBvaW50ZXJ9OnJvb3QgLnRpbWUtbGlzdC10b3RhbHttYXJnaW4tdG9wOjFlbTtib3JkZXItdG9wOjFweCBzb2xpZH0uY29tbWVudC1jb2xsYXBzZWR7bWF4LWhlaWdodDo3MHB4O292ZXJmbG93OmhpZGRlbiFpbXBvcnRhbnR9LmxvbmctY29tbWVudHt3aWR0aDoxMDAlIWltcG9ydGFudDtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLXRvcDozMHB4fS5idG4tY29sbGFwc2V7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MH0uYnRuLWNvbGxhcHNlLWFsbHtwb3NpdGlvbjpmaXhlZDt0b3A6MTBweDtyaWdodDoxMHB4fTpyb290IC5kYXRlcy1saXN0e3dpZHRoOjE1MHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbjowIDIwcHggMCAwfS51c2VyLXRvb2xiYXJ7bWFyZ2luOjIwcHggMDtwYWRkaW5nOjIwcHggMTBweDtib3JkZXItdG9wOjFweCBzb2xpZCByZ2JhKDAsMCwwLC43KTtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtd3JhcDp3cmFwO2ZsZXgtd3JhcDp3cmFwfS51c2VyLXRvb2xiYXJfX2l0ZW17cGFkZGluZzoxMHB4IDE1cHg7YmFja2dyb3VuZDpoc2xhKDAsMCUsMTAwJSwuNik7Ym94LXNoYWRvdzowIDFweCAxcHggcmdiYSgwLDAsMCwuNil9OnJvb3QgLnVzZXItdG9vbGJhci10aXRsZXttYXJnaW46MCAwIDFlbTtwYWRkaW5nOjA7Y29sb3I6IzAwMH06cm9vdCAjY29tbWVudHMtdGJsIC5jb21tZW50LXdyYXB7Zm9udC1zaXplOjE0cHg7d2lkdGg6MTAwJSFpbXBvcnRhbnQ7bWF4LXdpZHRoOjgwMHB4O292ZXJmbG93OmhpZGRlbn06cm9vdCAjY29tbWVudHMtdGJsIGgxe2ZvbnQtc2l6ZToxMjAlO2ZvbnQtd2VpZ2h0OjQwMDttYXJnaW46MCAwIC40ZW07Y29sb3I6aW5oZXJpdH06cm9vdCAjY29tbWVudHMtdGJsIGJsb2NrcXVvdGV7cGFkZGluZzoxMHB4IDIwcHg7bWFyZ2luOjAgMCAyMHB4O2JvcmRlci1sZWZ0OjVweCBzb2xpZCAjY2NjfTpyb290ICNjb21tZW50cy10YmwgYmxvY2txdW90ZSBwe21hcmdpbjowfTpyb290ICNjb21tZW50cy10YmwgYmxvY2txdW90ZSBwOm5vdCg6bGFzdC1jaGlsZCl7bWFyZ2luLWJvdHRvbToxZW19OnJvb3QgI2NvbW1lbnRzLXRibCB1bHtwYWRkaW5nLWxlZnQ6LjZlbTtsaXN0LXN0eWxlLXBvc2l0aW9uOmluc2lkZX1cXHJcXG5cXHJcXG4vKnR5cG8qLy5zZWN0aW9uLXRpdGxle2NvbG9yOmluaGVyaXQ7bWFyZ2luOjAgMCAxZW07cGFkZGluZzowIWltcG9ydGFudH0ucy1pbmZve2NvbG9yOmdyYXk7Zm9udC1zaXplOjEycHh9XFxyXFxuXFxyXFxuLyrQstGB0YLQsNCy0LrQsCDRgtC10LrRgdGC0LAg0LjQtyBsb2NhbCBzdG9yYWdlKi8uYnRuLWluc2VydC1sc3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTtyaWdodDoyZW07dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzfS5idG4taW5zZXJ0LWxzLmlzLXZpc2libGV7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTE1MCUpfVxcclxcblxcclxcbi8qXFxyXFxuICAgINC00L7QsdCw0LLQu9C10L3QuNC1INC40LrQvtC90LrQuCDQv9C+0LTQv9C40YHQutC4INC90LAg0YPQstC10LTQvtC80LvQtdC90LjQtSDQviDQvdC+0LLRi9GFINC60LDQvNC10L3RgtCw0YVcXHJcXG4gICAg0LIg0LfQsNCz0L7Qu9C+0LLQvtC6INC30LDQtNCw0YfQuFxcclxcbiovLmFkZC1hbGVydHt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5Qm1hV3hzUFNJak1EQXdNREF3SWlCb1pXbG5hSFE5SWpJMElpQjJhV1YzUW05NFBTSXdJREFnTWpRZ01qUWlJSGRwWkhSb1BTSXlOQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JajRnSUNBZ1BIQmhkR2dnWkQwaVRUQWdNR2d5TkhZeU5FZ3dWakI2SWlCbWFXeHNQU0p1YjI1bElpOCtJQ0FnSUR4d1lYUm9JR1E5SWsweE1DNHdNU0F5TVM0d01XTXdJREV1TVM0NE9TQXhMams1SURFdU9Ua2dNUzQ1T1hNeExqazVMUzQ0T1NBeExqazVMVEV1T1Rsb0xUTXVPVGg2YlRndU9EY3ROQzR4T1ZZeE1XTXdMVE11TWpVdE1pNHlOUzAxTGprM0xUVXVNamt0Tmk0Mk9YWXRMamN5UXpFekxqVTVJREl1TnpFZ01USXVPRGdnTWlBeE1pQXljeTB4TGpVNUxqY3hMVEV1TlRrZ01TNDFPWFl1TnpKRE55NHpOeUExTGpBeklEVXVNVElnTnk0M05TQTFMakV5SURFeGRqVXVPREpNTXlBeE9DNDVORll5TUdneE9IWXRNUzR3Tm13dE1pNHhNaTB5TGpFeWVrMHhOaUF4TXk0d01XZ3RNM1l6YUMweWRpMHpTRGhXTVRGb00xWTRhREoyTTJnemRqSXVNREY2SWk4K1BDOXpkbWMrKTtjdXJzb3I6cG9pbnRlcn0jdGFzay10aXRsZSAuYWRkLWFsZXJ0e3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtvcGFjaXR5Oi41fSN0YXNrLXRpdGxlIC5hZGQtYWxlcnQuc2VsZWN0ZWR7b3BhY2l0eToxfSN0ZXh0e3Jlc2l6ZTp2ZXJ0aWNhbH1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3tcImltcG9ydExvYWRlcnNcIjoxfSEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIhLi9zcmMvcGNzcy91c2Vyc2NyaXB0LnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgbW9keWZpQ29tbWVudHMnKTtcclxufVxyXG5cclxuaW1wb3J0IHtnZXRDb21tZW50RnJvbVJvdyxnZXRBbGxDb21tZW50c1Jvd3N9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5pbXBvcnQge2FkZGpzfSBmcm9tICcuL19sb2FkZXJzLmpzJztcclxuaW1wb3J0IHtjb21tZW50c0Rlc2lnbn0gZnJvbSAnLi9jb21tZW50c0Rlc2lnbi5qcyc7XHJcblxyXG4vL9C/0L7QuNGB0Log0YHRgdGL0LvQvtC6INCyINGC0LXQutGB0YLQtSDQutC+0LzQvNC10L3RgtCw0YDQuNC10LIg0Lgg0L7QsdC+0YDQsNGH0LjQstCw0L3QuNC1INC40YUg0LIgPGE+XHJcbi8v0YHQstC+0YDQsNGH0LjQstCw0L3QuNC1INC00LvQuNC90L3Ri9GFINC60L7QvNC80LXQvdGC0LDRgNC40LXQsiwg0LTQvtCx0LDQstC70LXQvdC40LUg0LrQvdC+0L/QutC4INCh0LLRgNC10L3Rg9GC0Ywu0YDQsNC30LLQtdGA0L3Rg9GC0Ywg0LLRgdC1XHJcblxyXG5mdW5jdGlvbiBtb2R5ZmlDb21tZW50cygpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcblxyXG4gICAgbGV0IHJvd3MgPSBnZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuXHJcbiAgICBhZGRqcygnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvbWFya2Rvd24taXQvOC4zLjEvbWFya2Rvd24taXQubWluLmpzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGdvTWFya2Rvd24ocm93cyk7XHJcbiAgICAgICAgY29tbWVudHNEZXNpZ24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8v0L/QsNGA0YHQtdGAIG1hcmtkb3duXHJcblxyXG4gICAgZnVuY3Rpb24gZ29NYXJrZG93bihyb3dzKSB7XHJcblxyXG4gICAgICAgIGxldCBtZCA9IG1hcmtkb3duaXQoKTtcclxuICAgICAgICBtZC5vcHRpb25zLmh0bWwgPSB0cnVlO1xyXG4gICAgICAgIG1kLm9wdGlvbnMubGlua2lmeSA9IHRydWU7XHJcbiAgICAgICAgbWQub3B0aW9ucy50eXBvZ3JhcGhlciA9IHRydWU7XHJcbiAgICAgICAgbWQub3B0aW9ucy5icmVha3MgPSB0cnVlO1xyXG5cclxuICAgICAgICByb3dzLm1hcChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgIGFkZE1hcmtkb3duKHJvdywgbWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRNYXJrZG93bihyb3csIG1kKSB7XHJcbiAgICAgICAgICAgIGxldCBjb21tZW50ID0gZ2V0Q29tbWVudEZyb21Sb3cocm93KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBibG9ja3MgPSBjb21tZW50LmlubmVySFRNTC5zcGxpdCgnPGJyPjxicj4nKTtcclxuXHJcbiAgICAgICAgICAgIGJsb2NrcyA9IGJsb2Nrcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmluZGV4T2YoJzxicj4nKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0uc3BsaXQoJzxicj4nKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS5tYXAoZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGNvbmNhdEVsZW1zVG9TdHJpbmcoaXRlbSwgJyonKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gY29uY2F0RWxlbXNUb1N0cmluZyhpdGVtLCAnJicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS5tYXAoZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyTWRTdHJpbmcoc3RyLCBtZClcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0uam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSByZXBsYWNlSHRtbEd0VG9TeW1ib2woaXRlbS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSByZW5kZXJNZFN0cmluZyhpdGVtLCBtZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICc8cD4nICsgaXRlbSArICc8L3A+JztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb21tZW50LmlubmVySFRNTCA9IHJlcGxhY2VVUkxXaXRoSFRNTExpbmtzKGJsb2Nrcy5qb2luKCcnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZW5kZXJNZFN0cmluZyhzdHIsIG1kKSB7XHJcbiAgICAgICAgICAgIGxldCBtZGMgPSBbJyMnLCAnKicsICctJywgJz4nXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtZGMuaW5kZXhPZihzdHIuY2hhckF0KDApKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBzdHIgPSBtZC5yZW5kZXIoc3RyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vKyc8YnI+JyDQvdGD0LbQvdC+INGH0YLQvtCx0Ysg0LHRi9C70L4g0L/QvtGF0L7QttC1INC90LAg0LjRgdGF0L7QtNC90L7QtSDRhNC+0YDQvNCw0YLQuNGA0L7QstCw0L3QuNC1XHJcbiAgICAgICAgICAgICAgICBzdHIgPSBzdHIgKyAnPGJyPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdHI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v0L/QvtC40YHQuiDQuCDQvtCx0YrQtdC00LjQvdC10L3QuNC1INCyINC+0LTQvdGDINGB0YLRgNC+0LrRgyDRjdC70LXQvNC10L3RgtC+0LIg0LzQsNGB0YHQuNCy0LBcclxuICAgIC8v0L3QsNGH0LjQvdCw0Y7RidC40YXRgdGPINGBINGB0LjQvNCy0L7Qu9CwICpcclxuICAgIC8v0LTQu9GPINGB0L7Qt9C00LDQvdC40Y8g0YHQv9C40YHQutCwIHVsPmxpINCyIG1hcmtkb3duXHJcbiAgICBmdW5jdGlvbiBjb25jYXRFbGVtc1RvU3RyaW5nKGFyciwgc3ltYm9sKSB7XHJcbiAgICAgICAgbGV0IG5leHQ7XHJcbiAgICAgICAgbGV0IHN0cmluZ3MgPSBbXTtcclxuICAgICAgICBsZXQgbmV3bGlzdCA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBuZXh0ID0gaSArIDE7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXJyW2ldLmNoYXJBdCgwKSA9PT0gc3ltYm9sICYmIGFycltuZXh0XSAmJiBhcnJbbmV4dF0uY2hhckF0KDApID09PSBzeW1ib2wpIHtcclxuICAgICAgICAgICAgICAgIG5ld2xpc3QgKz0gcHJlZm9ybWF0U3RyaW5nKGFycltpXSwgc3ltYm9sKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghYXJyW25leHRdIHx8IGFycltuZXh0XS5jaGFyQXQoMCkgIT09IHN5bWJvbCkge1xyXG4gICAgICAgICAgICAgICAgbmV3bGlzdCArPSBwcmVmb3JtYXRTdHJpbmcoYXJyW2ldLCBzeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5ncy5wdXNoKG5ld2xpc3QpO1xyXG4gICAgICAgICAgICAgICAgbmV3bGlzdCA9ICcnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5ncy5wdXNoKGFycltpXSk7XHJcbiAgICAgICAgICAgICAgICAvLyBzdHJpbmdzLnB1c2gocHJlZm9ybWF0U3RyaW5nKGFycltpXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RyaW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvL9C+0LHRgNCw0LHQvtGC0LrQsCDRgdGC0YDQvtC6INC/0LXRgNC10LQg0YTQvtGA0LzQsNGC0LjRgNC+0LLQsNC90LjQtdC8INCyIG1hcmtkb3duXHJcbiAgICBmdW5jdGlvbiByZXBsYWNlSHRtbEd0VG9TeW1ib2wodGV4dCkge1xyXG4gICAgICAgIGxldCBmaW5kID0gJyZndDsnO1xyXG4gICAgICAgIGxldCByZSA9IG5ldyBSZWdFeHAoZmluZCwgJ2cnKTtcclxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKHJlLCAnPicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByZWZvcm1hdFN0cmluZyhzdHIsIHN5bWJvbCA9ICd8Jykge1xyXG5cclxuICAgICAgICBsZXQgc3BhY2UgPSAnJztcclxuICAgICAgICAvL9C00LvRjyDRgdC/0LjRgdC60LAg0L3QsNC00L4g0YEg0L3QvtCy0L7QuSDRgdGC0YDQvtC60LhcclxuICAgICAgICBzd2l0Y2ggKHN5bWJvbCkge1xyXG4gICAgICAgICAgICBjYXNlICcqJzpcclxuICAgICAgICAgICAgICAgIHNwYWNlID0gJ1xcbic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy/QsCDQsiDRhtC40YLQsNGC0LUgLSDQsiDQvtC00L3RgyDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgY2FzZSAnJic6XHJcbiAgICAgICAgICAgICAgICBzcGFjZSA9ICcgJztcclxuICAgICAgICAgICAgICAgIHN0ciA9IHJlcGxhY2VIdG1sR3RUb1N5bWJvbChzdHIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKChzdHIubWF0Y2goL1xcbi9nKXx8W10pLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAvL3N0ciA9IHN0ci5yZXBsYWNlKC9cXG4vZywgJzxicj4nKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coc3RyKTtcclxuICAgICAgICAgICAgICAgIHN0ciA9ICc8cD4nICsgc3RyICsgJzwvcD4nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RyICsgc3BhY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVwbGFjZVVSTFdpdGhIVE1MTGlua3ModGV4dCkge1xyXG4gICAgICAgIGNvbnN0IGV4cCA9IC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWc7XHJcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShleHAsICc8YSBocmVmPVwiJDFcIiBjbGFzcz1cInJlZ3VsYXItbGlua1wiPiQxPC9hPicpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge21vZHlmaUNvbW1lbnRzfTtcclxuXHJcbmlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIG1vZHlmaUNvbW1lbnRzJyk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW9keWZpQ29tbWVudHMuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy/Qv9C+0LTQutC70Y7Rh9C10L3QuNC1INGB0YLRgNC+0L3QvdC10LPQviBqcyDQsiBoZWFkXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRqcyh1cmwsIGNhbGxiYWNrLCBwYXJhbXMpIHtcclxuICAgIGxldCBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHJcbiAgICBsZXQgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG5cclxuICAgIHMub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHMuc3JjID0gdXJsO1xyXG5cclxuICAgIGlmKHBhcmFtcyl7XHJcbiAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcy5zZXRBdHRyaWJ1dGUoa2V5LHBhcmFtc1trZXldKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhlYWQuYXBwZW5kQ2hpbGQocyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9fbG9hZGVycy5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpe1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIGNvbW1lbnRzRGVzaWduJyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0QWxsQ29tbWVudHNSb3dzfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGNvbW1lbnRzRGVzaWduKCkge1xyXG4gICAgLy/Qv9C10YDQtdC00LXQu9C60LAg0LLQvdC10YjQvdC10LPQviDQstC40LTQsCDQutCw0LzQtdC90YLQvtCyXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgY3JlYXRlVGVtcGxhdGUoKTtcclxuXHJcbiAgICBsZXQgdGJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXRibCcpO1xyXG5cclxuICAgIGxldCByb3dzID0gZ2V0QWxsQ29tbWVudHNSb3dzKCk7XHJcblxyXG4gICAgLy9yb3dzWzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocm93c1swXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKTtcclxuICAgIC8v0YHQutGA0YvQstCw0Y4sINCwINC90LUg0YPQtNCw0LvRj9GOINGH0YLQvtCx0Ysg0L3QtSDQvNC10L3Rj9GC0Ywg0YPQttC1INC40YHQv9C+0LvRjNC30YPQtdC80YvQtSDRhNGD0L3QutGG0LjQuFxyXG4gICAgLy/QstGL0LHQuNGA0LDRjtGJ0LjQtSDRgdGC0YDQvtC60Lgg0YEg0LrQsNC80LXQvdGC0LDQvNC4INC4INC40LPQvdC+0YDQuNGA0YPRjtGJ0LjQtSDQv9C10YDQstGD0Y4g0YHRgtGA0L7QutGDLlxyXG4gICAgLy/QldGB0LvQuCDRg9C00LDQu9GP0YLRjCDRgtC+INC/0L7Qu9GD0YfQuNGC0YHRjyDRh9GC0L4g0L/QtdGA0LLRi9C5INC60LDQvNC10L3RgiDQvdC1INCx0YPQtNC10YIg0L7QsdGA0LDQsdCw0YLRi9Cy0LDRgtGM0YHRj1xyXG4gICAgcm93c1swXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbi1lbGVtJyk7XHJcbiAgICAvL9GCLtC6LiDQsiDQtNCw0YDRgtC1INC00L7QsdCw0LLQuNC70Lgg0YHRgtGA0L7QuiDQv9GA0LXQtNGL0LTRg9GJ0LDRjyDRgdGC0YDQvtC60LAg0L3QtSDRgdC60YDRi9Cy0LDQtdGCINGB0YLRgNC+0LrRgyDRgSDQt9Cw0LPQvtC70L7QstC60LDQvNC4INGB0YLQvtC70LHRhtC+0LJcclxuICAgIC8v0L/QvtGN0YLQvtC80YMg0LXRidC1XHJcbiAgICB0YmwucXVlcnlTZWxlY3RvcigndHInKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4tZWxlbScpO1xyXG5cclxuICAgIHJvd3MubWFwKGZ1bmN0aW9uIChpdGVtLCBpKSB7XHJcbiAgICAgICAgbGV0IHRkID0gQXJyYXkuZnJvbShpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJykpO1xyXG5cclxuICAgICAgICBsZXQgYmxvY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudC10ZW1wbGF0ZScpLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICBibG9jay5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XHJcblxyXG4gICAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoYmxvY2spO1xyXG5cclxuICAgICAgICBsZXQgcm93cyA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLWNvbW1lbnRfX3JvdycpO1xyXG5cclxuICAgICAgICBsZXQgcm93MSA9IGNyZWF0ZTFyb3codGQsIGkpO1xyXG4gICAgICAgIHJvd3NbMF0uYXBwZW5kQ2hpbGQocm93MSk7XHJcblxyXG4gICAgICAgIHJvd3NbMV0uYXBwZW5kQ2hpbGQoY3JlYXRlMnJvdyh0ZCkpO1xyXG4gICAgICAgIHJvd3NbMl0uYXBwZW5kQ2hpbGQoY3JlYXRlM3Jvdyh0ZCkpO1xyXG5cclxuICAgICAgICBsZXQgZmlsZXMgPSBjcmVhdGU0cm93KHRkKTtcclxuXHJcbiAgICAgICAgaWYgKCEhZmlsZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBwaWNzID0gWydwbmcnLCAnanBnJywgJ2dpZiddO1xyXG5cclxuICAgICAgICAgICAgZmlsZXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXh0ID0gaXRlbS5ocmVmLmxhc3RJbmRleE9mKCcuJyk7XHJcbiAgICAgICAgICAgICAgICBleHQgPSBpdGVtLmhyZWYuc2xpY2UoZXh0ICsgMSwgaXRlbS5ocmVmLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBpY3MuaW5kZXhPZihleHQudG9Mb3dlckNhc2UoKSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVJbWdUaHVtYihpdGVtKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZURvY3NUaHVtYihpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByb3dzWzNdLmFwcGVuZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByb3dzWzNdLmNsYXNzTGlzdC5hZGQoJ25vbmUnKTtcclxuICAgICAgICAgICAgLy9ibG9jay5yZW1vdmVDaGlsZChyb3dzWzNdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY9GC0YDQvtC60LAg0YHQutGA0YvRgtCwXHJcbiAgICAgICAgLy9yb3dzWzRdLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgIC8vcm93c1s0XS5hcHBlbmRDaGlsZChjcmVhdGU1cm93KHRkKSk7XHJcblxyXG4gICAgICAgIC8v0YHRgtCw0L3QvtCy0LjRgtGB0Y8g0LLQuNC00LjQvNC+0Lkg0L/RgNC4INC90LDQstC10LTQtdC90LjQuCDQutGD0YDRgdC+0YDQsCDQvdCwINC60LDRgNGC0L7Rh9C60YMg0LrQsNC80LXQvdGC0LBcclxuICAgICAgICBibG9jay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzaG93QWN0aW9uc0J0bih0aGlzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYmxvY2suYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2hvd0FjdGlvbnNCdG4odGhpcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v0LLQvNC10YHRgtC+INGD0LTQsNC70LXQvdC40Y8g0LjQtyBET00g0LjQu9C4INC90LDQstC10YjQuNCy0LDQvdC40Y8g0LrQu9Cw0YHRgdCwINC90LAg0LrQsNC20LTRi9C5IHRkXHJcbiAgICAgICAgLy/QstC10YjQsNGOINC60LvQsNGB0YEg0L3QsCDRgtCw0LHQu9C40YbRgyDQv9C+0YHQu9C1INC+0LHRgNCw0LHQvtGC0LrQuCDQstGB0LXRhSDRgdGC0YDQvtC6XHJcbiAgICAgICAgLyp0ZC5tYXAoZnVuY3Rpb24gKHRkaXRlbSkge1xyXG4gICAgICAgICAgICAvL3RkaXRlbS5jbGFzc0xpc3QuYWRkKCdub25lJyk7XHJcbiAgICAgICAgICAgIGlmICh0ZGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2hpbGQodGRpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyovXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL9C90LDRgdC70LXQtNGD0Y/RgdGMINC+0YIg0Y3RgtC+0LPQviDQutC70LDRgdGB0LAg0YHQutGA0YvQstCw0Y4gdGQg0LIg0YHRgtGA0L7QutCw0YUg0YLQsNCx0LvQuNGG0YtcclxuICAgIC8v0L/QvtGB0LvQtSDRgdC+0LfQtNCw0L3QuNGPINC60LDRgNGC0L7Rh9C10Log0LrQsNC80LXQvdGC0L7QslxyXG4gICAgdGJsLmNsYXNzTGlzdC5hZGQoJ2hpZGUtb3JpZ2luYWwnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUxcm93KHRkLCByb3dudW1iZXIpIHtcclxuICAgICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgICAgIGxldCByb3dJdGVtUHJvdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgICAgICAvL9C00LDRgtCwXHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWRhdGUnKTtcclxuICAgICAgICByb3dJdGVtLmlkID0gJ2NvbW1lbnQtZGF0ZSc7XHJcbiAgICAgICAgcm93SXRlbS5pbm5lckhUTUwgPSB0ZFszXS50ZXh0Q29udGVudDtcclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIC8vaWQgY2hlY2tib3hcclxuICAgICAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzBdLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2lkLWNoZWNrYm94Jyk7XHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIC8v0L/RgNC40L7RgNC40YLQtdGCINC4INGB0YDQvtC6INC40YHQv9C+0LvQvdC10L3QuNGPXHJcbiAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLXJhbmsnKTtcclxuXHJcbiAgICAgICAgcm93SXRlbS5pbm5lckhUTUwgPSB0ZFs4XS50ZXh0Q29udGVudCArICcg0L/RgNC40L7RgNC40YLQtdGCJztcclxuXHJcbiAgICAgICAgbGV0IGRlYWRsaW5lID0gdGRbN10udGV4dENvbnRlbnQ7XHJcblxyXG4gICAgICAgIGlmIChkZWFkbGluZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0uaW5uZXJIVE1MID0gcm93SXRlbS5pbm5lckhUTUwgKyAnLjxiIGNsYXNzPVwiZGVhZGxpbmUtZGF0ZVwiPtCh0LTQsNGC0YwgJyArIGRlYWRsaW5lICsgJzwvYj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIC8v0L/QuNGB0YzQvNCwLNGB0YHRi9C70LrQsCzRgdGC0LDRgtGD0YFcclxuICAgICAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Jvdy1yaWdodCcpO1xyXG5cclxuICAgICAgICBsZXQgc3RhdHVzID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSB0ZFs5XS50ZXh0Q29udGVudDtcclxuICAgICAgICBzdGF0dXMuY2xhc3NMaXN0LmFkZCgndGFzay1zdGF0dXMnKTtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHN0YXR1cyk7XHJcblxyXG4gICAgICAgIGxldCBsZXR0ZXIgPSB0ZFsxXS5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKVsxXTtcclxuICAgICAgICBsZXR0ZXIuY2xhc3NMaXN0LmFkZCgnbGV0dGVyLWFkZHInKTtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKGxldHRlcik7XHJcblxyXG4gICAgICAgIGxldCBsaW5rID0gdGRbMV0ucXVlcnlTZWxlY3RvckFsbCgnYScpWzFdO1xyXG4gICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1saW5rJyk7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcbiAgICAgICAgLy/QvdC+0LzQtdGAINC60L7QvNC80LXQvdGC0LDRgNC40Y9cclxuICAgICAgICBsZXQgbm8gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIG5vLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtbm8nKTtcclxuICAgICAgICBuby5pbm5lckhUTUwgPSByb3dudW1iZXI7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZChubyk7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZnJhZ21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlMnJvdyh0ZCkge1xyXG4gICAgICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW1Qcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgICBsZXQgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWluZm8nKTtcclxuXHJcbiAgICAgICAgLy/QsNCy0YLQvtGAXHJcbiAgICAgICAgbGV0IGF1dGhvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBhdXRob3IuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1hdXRob3InKTtcclxuICAgICAgICAvL2F1dGhvci5pbm5lckhUTUwgPSAn0JDQstGC0L7RgCA8YnI+JyArIHRkWzRdLnRleHRDb250ZW50O1xyXG4gICAgICAgIGF1dGhvci5pbm5lckhUTUwgPSB0ZFs0XS50ZXh0Q29udGVudDtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKGF1dGhvcik7XHJcblxyXG4gICAgICAgIC8v0LjRgdC/0L7Qu9C90LjRgtC10LvRjFxyXG4gICAgICAgIGxldCB3b3JrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgd29ya2VyLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtd29ya2VyJyk7XHJcbiAgICAgICAgLy93b3JrZXIuaW5uZXJIVE1MID0gJ9CY0YHQv9C+0LvQvdC40YLQtdC70YwgPGJyPicgKyB0ZFs2XS50ZXh0Q29udGVudDtcclxuICAgICAgICB3b3JrZXIuaW5uZXJIVE1MID0gdGRbNl0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh3b3JrZXIpO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAgICAgbGV0IHdvcmtUaW1lID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICB3b3JrVGltZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXRpbWUnKTtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVTdHIgPSB0ZFsxMF0udGV4dENvbnRlbnQuc3BsaXQoJy8nKTtcclxuXHJcbiAgICAgICAgLyp0aW1lU3RyWzBdID0gY3JlYXRlVGltZVRpdGxlU3RyaW5nKHRpbWVTdHJbMF0sIFsn0JfQsNGC0YDQsNGH0LXQvdCwJywgJ9CX0LDRgtGA0LDRh9C10L3QvicsICfQl9Cw0YLRgNCw0YfQtdC90L4nXSkrXHJcbiAgICAgICAgICcgJysgY3JlYXRlVGltZVN0cmluZyh0aW1lU3RyWzBdLCBbJ9C80LjQvdGD0YLQsCcsICfQvNC40L3Rg9GC0YsnLCAn0LzQuNC90YPRgiddKTsqL1xyXG5cclxuICAgICAgICB0aW1lU3RyWzBdID0gJzxzcGFuIGNsYXNzPVwiZWxhcHNlZC10aW1lXCI+JyArIHRpbWVTdHJbMF0gKyAnINC80LjQvS48L3NwYW4+JztcclxuICAgICAgICB3b3JrVGltZS5pbm5lckhUTUwgPSB0aW1lU3RyWzBdO1xyXG5cclxuICAgICAgICAvLyBpZiAoaXNOYU4oTnVtYmVyKHRpbWVTdHJbMV0pKSkge1xyXG4gICAgICAgIC8vICAgICB3b3JrVGltZS5pbm5lckhUTUwgPSB0aW1lU3RyWzBdO1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICB0aW1lU3RyWzFdID0gJyDQuNC3ICcrdGltZVN0clsxXTtcclxuICAgICAgICAvLyAgICAgd29ya1RpbWUuaW5uZXJIVE1MID0gdGltZVN0ci5qb2luKCcgJyk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh3b3JrVGltZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmcmFnbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUzcm93KHRkKSB7XHJcbiAgICAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgICAgICBsZXQgcm93SXRlbVByb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIC8v0LrQvtC80LzQtdC90YLQsNGA0LjQuVxyXG4gICAgICAgIGxldCByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtYm9keScpO1xyXG5cclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzVdLmZpcnN0RWxlbWVudENoaWxkLmNsb25lTm9kZSh0cnVlKSk7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICAvL9C+0LHQtdGA0YLQutCwINC00LvRjyDQutC90L7Qv9C+0Log0KPQtNCw0LvQuNGC0Ywg0Lgg0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcclxuICAgICAgICBsZXQgcm93SXRlbVdyYXAgPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW1XcmFwLmNsYXNzTGlzdC5hZGQoJ2FjdGlvbnMtYnRuLXdyYXAnKTtcclxuICAgICAgICAvL9GD0LTQsNC70LjRgtGMXHJcblxyXG4gICAgICAgIGlmICh0ZFsxMV0uZmlyc3RFbGVtZW50Q2hpbGQpIHtcclxuICAgICAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnYnRuLWRlbC1jb21tZW50Jyk7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQodGRbMTFdLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICAgICAgcm93SXRlbVdyYXAuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL9GA0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdidG4tZWRpdC1jb21tZW50Jyk7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh0ZFsxXS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgcm93SXRlbVdyYXAuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW1XcmFwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZTRyb3codGQpIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0ZFsyXS5xdWVyeVNlbGVjdG9yQWxsKCdhJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZ1bmN0aW9uIGNyZWF0ZTVyb3codGQpIHtcclxuICAgIC8vICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIGxldCByb3dJdGVtUHJvdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgbGV0IHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgLy9cclxuICAgIC8vICAgICAvL9C+0LHQtdGA0YLQutCwINC00LvRjyDQutC90L7Qv9C+0Log0KPQtNCw0LvQuNGC0Ywg0Lgg0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcclxuICAgIC8vICAgICBsZXQgcm93SXRlbVdyYXAgPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgLy8gICAgIHJvd0l0ZW1XcmFwLmNsYXNzTGlzdC5hZGQoJ2FjdGlvbnMtYnRuLXdyYXAnKTtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgLy/Rg9C00LDQu9C40YLRjFxyXG4gICAgLy9cclxuICAgIC8vICAgICBpZiAodGRbMTFdLmZpcnN0RWxlbWVudENoaWxkKSB7XHJcbiAgICAvLyAgICAgICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgLy8gICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2J0bi1kZWwtY29tbWVudCcpO1xyXG4gICAgLy8gICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzExXS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAvLyAgICAgICAgIHJvd0l0ZW1XcmFwLmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vXHJcbiAgICAvLyAgICAgLy/RgNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFxyXG4gICAgLy8gICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgLy8gICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnYnRuLWVkaXQtY29tbWVudCcpO1xyXG4gICAgLy8gICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQodGRbMV0uZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgLy8gICAgIHJvd0l0ZW1XcmFwLmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG4gICAgLy9cclxuICAgIC8vICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtV3JhcCk7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIHJldHVybiBmcmFnbWVudDtcclxuICAgIC8vIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSW1nVGh1bWIoaXRlbSkge1xyXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHdyYXAuY2xhc3NMaXN0LmFkZCgnaW1nLXRodW1iJywgJ2ZpbGUtdGh1bWInKTtcclxuXHJcbiAgICBsZXQgcGljID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBwaWMuc3JjID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgIHBpYy5jbGFzc0xpc3QuYWRkKCd0aHVtYi1waWMnKTtcclxuXHJcbiAgICBpdGVtLmFwcGVuZENoaWxkKHBpYyk7XHJcblxyXG4gICAgbGV0IHRpdGxlID0gZ2V0QXR0YWNoVGl0bGUoaXRlbSk7XHJcbiAgICB3cmFwLmFwcGVuZENoaWxkKGl0ZW0pO1xyXG4gICAgd3JhcC5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBiaWdwaWMgPSBwaWMuY2xvbmVOb2RlKGZhbHNlKTtcclxuICAgICAgICBiaWdwaWMuY2xhc3NMaXN0LmFkZCgnbGFyZ2UtcGljLXByZXZpZXcnKTtcclxuICAgICAgICBiaWdwaWMuY2xhc3NMaXN0LnJlbW92ZSgndGh1bWItcGljJyk7XHJcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChiaWdwaWMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5xdWVyeVNlbGVjdG9yKCcubGFyZ2UtcGljLXByZXZpZXcnKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gd3JhcDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRG9jc1RodW1iKGl0ZW0pIHtcclxuICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnZG9jLXRodW1iJywgJ2ZpbGUtdGh1bWInKTtcclxuICAgIGl0ZW0uYXBwZW5kQ2hpbGQoZ2V0QXR0YWNoVGl0bGUoaXRlbSkpO1xyXG4gICAgaXRlbS5yZW1vdmVDaGlsZChpdGVtLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgIHJldHVybiBpdGVtO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBdHRhY2hUaXRsZShpdGVtKSB7XHJcbiAgICBsZXQgdGl0bGUgPSBpdGVtLmZpcnN0RWxlbWVudENoaWxkLnRpdGxlO1xyXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHdyYXAudGV4dENvbnRlbnQgPSB0aXRsZTtcclxuICAgIHdyYXAuY2xhc3NMaXN0LmFkZCgnYXR0YWNoLXRpdGxlJyk7XHJcbiAgICByZXR1cm4gd3JhcDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGUoKSB7XHJcbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XHJcbiAgICBsZXQgYmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ2ItY29tbWVudCcpO1xyXG4gICAgYmxvY2suaWQgPSAnY29tbWVudC10ZW1wbGF0ZSc7XHJcblxyXG4gICAgbGV0IGJsb2NrUm93O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgYmxvY2tSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBibG9ja1Jvdy5jbGFzc0xpc3QuYWRkKCdiLWNvbW1lbnRfX3JvdycsICdiLWNvbW1lbnRfX3Jvd18nICsgaSk7XHJcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQoYmxvY2tSb3cpXHJcbiAgICB9XHJcblxyXG4gICAgd3JhcC5hcHBlbmRDaGlsZChibG9jayk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3cmFwKTtcclxuXHJcbiAgICByZXR1cm4gd3JhcDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0FjdGlvbnNCdG4oY2FtbWVudCkge1xyXG4gICAgbGV0IGJ0bnMgPSBjYW1tZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3Rpb25zLWJ0bi13cmFwJyk7XHJcbiAgICBidG5zLmNsYXNzTGlzdC50b2dnbGUoJ2lzLXZpc2libGUnKTtcclxufVxyXG5cclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3Bjc3MvY29tbWVudHNEZXNpZ24ucGNzcyc7XHJcblxyXG5leHBvcnQge2NvbW1lbnRzRGVzaWdufTtcclxuXHJcbmlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKXtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBjb21tZW50c0Rlc2lnbicpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tbWVudHNEZXNpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL2NvbW1lbnRzRGVzaWduLnBjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vY29tbWVudHNEZXNpZ24ucGNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi9jb21tZW50c0Rlc2lnbi5wY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wY3NzL2NvbW1lbnRzRGVzaWduLnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5iLWNvbW1lbnRfX3JvdzpsYXN0LWNoaWxke3BhZGRpbmctYm90dG9tOjJlbX0uY29tbWVudC13cmFwIHA6b25seS1vZi10eXBle21hcmdpbjowfS5jb21tZW50LXdyYXAgcDpsYXN0LWNoaWxke21hcmdpbi1ib3R0b206MH0jY29tbWVudHMtdGJse21hcmdpbjphdXRvO3BhZGRpbmc6M2VtIDA7YmFja2dyb3VuZDojZjBmMGYwfSNjb21tZW50cy10YmwuaGlkZS1vcmlnaW5hbCB0cj50ZHtkaXNwbGF5Om5vbmV9I2NvbW1lbnRzLXRibCwjY29tbWVudHMtdGJsIHRib2R5LCNjb21tZW50cy10YmwgdHJ7ZGlzcGxheTpibG9ja30jY29tbWVudHMtdGJsIHRyOm5vdCg6bGFzdC1jaGlsZCl7bWFyZ2luLWJvdHRvbToyZW19LmNvbW1lbnQtYm9keXt3aWR0aDoxMDAlfS5jb21tZW50LXdyYXAgcHtsaW5lLWhlaWdodDoxLjRcXHJcXG5cXHJcXG4gICAgICAgIC8qXFxyXFxuICAgICAgICAvL9Cz0LTQtS3RgtC+INGC0LDQutC4INCy0YHRgtCw0LLQu9GP0Y7RgtGB0Y8g0LvQuNGI0L3QuNC1INC/0LXRgNC10LLQvtC00Ysg0YHRgtGA0L7QulxcclxcbiAgICAgICAgLy/RgdC00LXQu9Cw0Y4g0YLQsNC60L7QuSDQs9GA0Y/Qt9C90YvQuSDRhdCw0LpcXHJcXG4gICAgICAgICovXFxyXFxuICAgICAgICAvKiYgYnI6Zmlyc3QtY2hpbGQsXFxyXFxuICAgICAgICAmIGJyOmxhc3QtY2hpbGR7XFxyXFxuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgICAgIH0qL30uY29tbWVudC13cmFwIHA6Zmlyc3QtY2hpbGR7bWFyZ2luLXRvcDowfS5iLWNvbW1lbnR7bWF4LXdpZHRoOjcyMHB4O21hcmdpbjphdXRvO2JhY2tncm91bmQ6I2ZhZmFmYTtib3gtc2hhZG93OjAgMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCA1cHggMCByZ2JhKDAsMCwwLC4xMiksMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMik7d2lkdGg6MTAwJTtmb250LXNpemU6MTJweDtcXHJcXG4gICAgLypkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWZsb3c6IGNvbHVtbiB3cmFwOyovcG9zaXRpb246cmVsYXRpdmU7Ym94LXNpemluZzpib3JkZXItYm94fS5iLWNvbW1lbnQuYi1jb21tZW50X25vdGlmeXttYXJnaW4tdG9wOjJlbTtwYWRkaW5nOjJlbTtjb2xvcjojMzE3MDhmO2JhY2tncm91bmQ6I2Q5ZWRmNztib3JkZXI6MXB4IHNvbGlkICNiY2U4ZjF9LmItY29tbWVudC5iLWNvbW1lbnRfbm90aWZ5IC5jb21tZW50cy11cGRhdGUtbGlua3tkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nLWxlZnQ6MWVtO2NvbG9yOmluaGVyaXR9LmItY29tbWVudF9fcm93e3BhZGRpbmc6MWVtIDJlbTtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstbXMtZmxleC1mbG93OnJvdyB3cmFwO2ZsZXgtZmxvdzpyb3cgd3JhcDtwb3NpdGlvbjpyZWxhdGl2ZX0uYi1jb21tZW50X19yb3c6Zmlyc3QtY2hpbGR7cGFkZGluZy10b3A6MmVtfS5iLWNvbW1lbnRfX3JvdzpmaXJzdC1jaGlsZCAucm93LXJpZ2h0e3RvcDoyZW19XFxyXFxuXFxyXFxuLyovLzEgcm93INGI0LDQv9C60LAqLy5iLWNvbW1lbnRfX3Jvd18we2NvbG9yOmdyYXl9LnRhc2stcmFuaywudGFzay1zdGF0dXN7cGFkZGluZzowIC41ZW0gMCAyZW19LmRlYWRsaW5lLWRhdGV7cGFkZGluZy1sZWZ0OjFlbX0uaWQtY2hlY2tib3h7cG9zaXRpb246YWJzb2x1dGU7dmlzaWJpbGl0eTpoaWRkZW47ei1pbmRleDotMX0uY29tbWVudC1saW5rLC5jb21tZW50LW5ve21hcmdpbi1yaWdodDowIWltcG9ydGFudH1cXHJcXG5cXHJcXG4vKi8vMiByb3cg0LDQstGC0L7RgCAtINC40YHQv9C+0LvQvdC40YLQtdC70YwqLy5iLWNvbW1lbnRfX3Jvdy5iLWNvbW1lbnRfX3Jvd18xe3BhZGRpbmctdG9wOjA7LW1zLWZsZXgtcGFjazpqdXN0aWZ5O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2NvbG9yOmdyYXl9LmNvbW1lbnQtaW5mbz5zcGFue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOnRvcH0uY29tbWVudC1hdXRob3J7cGFkZGluZy1yaWdodDoyZW07cG9zaXRpb246cmVsYXRpdmV9LmNvbW1lbnQtYXV0aG9yOmFmdGVye2NvbnRlbnQ6XFxcIlxcXFwyMTkyXFxcIjtwb3NpdGlvbjpyZWxhdGl2ZTtsZWZ0OjFlbX1cXHJcXG5cXHJcXG4vKi8vMyByb3cg0YLQtdC60YHRgiDQutCw0LzQtdC90YLQsCovLmItY29tbWVudF9fcm93XzJ7Zm9udC1zaXplOjE0cHg7YmFja2dyb3VuZDojZmZmO2JvcmRlci10b3A6MXB4IHNvbGlkIGhzbGEoMCwwJSw2MyUsLjIpO2JvcmRlci1ib3R0b206MXB4IHNvbGlkIGhzbGEoMCwwJSw2MyUsLjIpO3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn1cXHJcXG5cXHJcXG4vKtC4INC60L3QvtC/0LrQuCDQo9C00LDQu9C40YLRjCwg0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YwqLy5hY3Rpb25zLWJ0bi13cmFwe3BhZGRpbmc6MWVtO3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO3JpZ2h0OjA7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzfS5hY3Rpb25zLWJ0bi13cmFwLmlzLXZpc2libGV7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEwMCUpfS5idG4tZGVsLWNvbW1lbnQsLmJ0bi1lZGl0LWNvbW1lbnR7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO2hlaWdodDoyNHB4O2xpbmUtaGVpZ2h0OjI0cHg7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxfS5idG4tZWRpdC1jb21tZW50e1xcclxcbiAgICAvKndpZHRoOiAxNDBweDsqL21hcmdpbi1sZWZ0Oi41ZW07XFxyXFxuICAgIC8qYm9yZGVyOiAxcHggc29saWQgI0FEQURBRDsqL3RvcDozcHh9LmJ0bi1kZWwtY29tbWVudHt3aWR0aDo3MHB4XFxyXFxuICAgIC8qd2lkdGg6IDEwMHB4OyovfVxcclxcblxcclxcbi8qLmJ0bi1lZGl0LWNvbW1lbnQ6YWZ0ZXIsKi8uYnRuLWRlbC1jb21tZW50OmFmdGVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3otaW5kZXg6LTE7Y29udGVudDpcXFwiXFxcXDQyM1xcXFw0MzRcXFxcNDMwXFxcXDQzQlxcXFw0MzhcXFxcNDQyXFxcXDQ0Q1xcXCI7Y29sb3I6I2NjYztsaW5lLWhlaWdodDpub3JtYWw7Ym9yZGVyLWJvdHRvbToxcHggc29saWR9XFxyXFxuXFxyXFxuLyouYnRuLWVkaXQtY29tbWVudDphZnRlciB7XFxyXFxuICAgIGNvbnRlbnQ6ICfQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjCc7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNFMUUxRTE7XFxyXFxufSovXFxyXFxuXFxyXFxuLyouYnRuLWVkaXQtY29tbWVudCBpbWcsKi8uYnRuLWRlbC1jb21tZW50IGltZ3tkaXNwbGF5Om5vbmV9XFxyXFxuXFxyXFxuLyouYnRuLWVkaXQtY29tbWVudCBhLCovLmJ0bi1kZWwtY29tbWVudCBhe3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246YWJzb2x1dGV9XFxyXFxuXFxyXFxuLyovLzQgcm93INGE0LDQudC70YsqLy5iLWNvbW1lbnRfX3Jvdy5iLWNvbW1lbnRfX3Jvd18ze3BhZGRpbmctdG9wOjEuNWVtO3BhZGRpbmctYm90dG9tOjEuNWVtOy1tcy1mbGV4LWFsaWduOnN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9XFxyXFxuXFxyXFxuLyovLzUgcm93INC/0L7QtNCy0LDQuyovLmItY29tbWVudF9fcm93XzMrLmItY29tbWVudF9fcm93XzR7Ym9yZGVyLXRvcDoxcHggc29saWQgaHNsYSgwLDAlLDYzJSwuMil9LmItY29tbWVudF9fcm93LmItY29tbWVudF9fcm93XzR7LW1zLWZsZXgtcGFjazplbmQ7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfVxcclxcblxcclxcbi8qLS0tLSovLnJvdy1yaWdodHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MWVtO3JpZ2h0OjJlbX0ucm93LXJpZ2h0Pip7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfS5yb3ctcmlnaHQ+Om5vdCg6bGFzdC1jaGlsZCl7bWFyZ2luLXJpZ2h0Oi43ZW19LmltZy10aHVtYnttYXgtd2lkdGg6MTUwcHh9LmltZy10aHVtYiBpbWc6Zmlyc3QtY2hpbGR7ZGlzcGxheTpub25lfS5pbWctdGh1bWI+YXtkaXNwbGF5OmJsb2NrfS5pbWctdGh1bWIgLmF0dGFjaC10aXRsZXttYXJnaW4tdG9wOi4zZW19LnRodW1iLXBpY3t3aWR0aDoxMDAlO1xcclxcbiAgICAvKmhlaWdodDogY2FsYygxMDAlIC0gMmVtKTsqL29iamVjdC1maXQ6Y292ZXI7bWF4LWhlaWdodDoyMDBweDtib3JkZXI6MXB4IHNvbGlkICNjY2N9XFxyXFxuXFxyXFxuLyrQsdC+0LvRjNGI0LDRjyDQutCw0YDRgtC40L3QutCwLCDQstGB0YLQsNCy0LvRj9C10YLRgdGP0LIg0LHQu9C+0Log0L/RgNC4INC90LDQstC10LTQtdC90LjQuCDQvdCwINC/0YDQtdCy0YzRjiovLmxhcmdlLXBpYy1wcmV2aWV3e21heC13aWR0aDo0MHZ3O2JvcmRlcjoxcHggc29saWQgZ3JheTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6OTAlO2xlZnQ6MDtcXHJcXG4gICAgLypsZWZ0OiA1MCU7Ki9cXHJcXG4gICAgLyp0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7Ki96LWluZGV4OjF9LmRvYy10aHVtYnttYXgtd2lkdGg6MTUwcHg7YmFja2dyb3VuZDojZjNmM2YzO2ZvbnQtc2l6ZToxMXB4O2JvcmRlcjoxcHggc29saWQgI2NjYztcXHJcXG4gICAgLypsaW5lLWhlaWdodDogNThweDsqL3RleHQtYWxpZ246Y2VudGVyO3RleHQtZGVjb3JhdGlvbjpub25lO2NvbG9yOmluaGVyaXR9LmRvYy10aHVtYiAuYXR0YWNoLXRpdGxle3dpZHRoOjEwMCU7cGFkZGluZzowIC41ZW07bGluZS1oZWlnaHQ6MS42O3dvcmQtYnJlYWs6YnJlYWstYWxsO2JveC1zaXppbmc6Ym9yZGVyLWJveDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5maWxlLXRodW1iey1tcy1mbGV4OjEgMSAyNSU7ZmxleDoxIDEgMjUlO21pbi1oZWlnaHQ6NzBweDtwb3NpdGlvbjpyZWxhdGl2ZX0uZmlsZS10aHVtYjpudGgtY2hpbGQobis3KXttYXJnaW4tdG9wOjJlbX0uZmlsZS10aHVtYjpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1yaWdodDoxZW19LmF0dGFjaC10aXRsZXttYXgtd2lkdGg6MTUwcHg7dGV4dC1hbGlnbjpjZW50ZXI7bGluZS1oZWlnaHQ6bm9ybWFsO3dvcmQtYnJlYWs6YnJlYWstYWxsfSNjb21tZW50cy10YmwgdHI6bGFzdC1jaGlsZCAuYi1jb21tZW50X19yb3dfMCwjY29tbWVudHMtdGJsIHRyOmxhc3QtY2hpbGQgLmItY29tbWVudF9fcm93XzF7Y29sb3I6IzAwMH1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3tcImltcG9ydExvYWRlcnNcIjoxfSEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIhLi9zcmMvcGNzcy9jb21tZW50c0Rlc2lnbi5wY3NzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCBjYWxjdWxhdGVFbGFwc2VkVGltZScpO1xyXG59XHJcblxyXG4vL9C60LDQu9GM0LrRg9C70Y/RgtC+0YAg0LIg0L/QvtC70LUg0LLQstC+0LTQsCDQt9Cw0YLRgNCw0YfQtdC90L3QvtCz0L4g0LLRgNC10LzQtdC90LhcclxuZnVuY3Rpb24gY2FsY3VsYXRlRWxhcHNlZFRpbWUoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IHRpbWVFbGFwc2VkRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BlbmRlZF90aW1lJyk7XHJcblxyXG4gICAgaWYoIXRpbWVFbGFwc2VkRmllbGQpe1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygn0J3QtSDQvdCw0LnQtNC10L3QviDQv9C+0LvQtSDQstCy0L7QtNCwINCy0YDQtdC80LXQvdC4INCy0YvQv9C+0LvQvdC10L3QuNGPJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINCj0LTQsNC70LXQvdC40LUg0L7QsdGA0LDQsdC+0YLRh9C40LrQsCDQvdCw0LbQsNGC0LjRjyDQutC70LDQstC40Ygg0LTQu9GPINC/0L7Qu9GPICdzcGVuZGVkX3RpbWUnXHJcbiAgICB0aW1lRWxhcHNlZEZpZWxkLm9ua2V5dXAgPSBudWxsO1xyXG5cclxuICAgIC8vINCU0L7QsdCw0LLQu9C10L3QuNC1INGB0L7QsdGL0YLQuNGPINC00LvRjyDQstGL0YfQuNGB0LvQtdC90LjRjyDQt9Cw0YLRgNCw0YfQtdC90L3QvtCz0L4g0LLRgNC10LzQtdC90Lgg0LTQu9GPINC/0L7Qu9GPICdzcGVuZGVkX3RpbWUnXHJcbiAgICB0aW1lRWxhcHNlZEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgY3VyX3ZhbHVlID0gdGhpcy52YWx1ZTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY3VyX3ZhbHVlID0gZXZhbChjdXJfdmFsdWUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQntGI0LjQsdC60LAg0LLRi9GH0LjRgdC70LXQvdC40Y8g0LfQsNGC0YDQsNGH0LXQvdC90L7Qs9C+INCy0YDQtdC80LXQvdC4LiDQmNGB0L/QvtC70YzQt9GD0LnRgtC1INGH0LjRgdC70LAg0Lgg0LfQvdCw0LrQuCDCqyvCuywgwqstwrssIMKrKsK7LCDCqy/CuyDQuCDRgdC60L7QsdC60LhcIik7XHJcblxyXG4gICAgICAgICAgICBjdXJfdmFsdWUgPSBudWxsO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIGlmICgoY3VyX3ZhbHVlICE9PSBudWxsKSAmJiAoIWlzTmFOKGN1cl92YWx1ZSkpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY3VyX3ZhbHVlID0gTWF0aC5yb3VuZChjdXJfdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjdXJfdmFsdWUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi0J7RgtGA0LjRhtCw0YLQtdC70YzQvdC+0LUg0LjQu9C4INC90YPQu9C10LLQvtC1INC30L3QsNGH0LXQvdC40LUg0LLRgNC10LzQtdC90LhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyX3ZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY3VyX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBtaW5Ub0RheXModGltZUluTWludXRlcywgZGF5SW5Ib3VycyA9IDgpIHtcclxuLy8gICAgIGxldCByZXRTdHIgPSBcIlwiO1xyXG4vL1xyXG4vLyAgICAgaWYgKCh0aW1lSW5NaW51dGVzICE9PSBudWxsKSAmJiAoIWlzTmFOKHRpbWVJbk1pbnV0ZXMpKSAmJiAodGltZUluTWludXRlcyA+IDApKSB7XHJcbi8vICAgICAgICAgZGF5SW5Ib3VycyA9IGRheUluSG91cnMgPDwgMDtcclxuLy8gICAgICAgICBpZiAoKGRheUluSG91cnMgPT09IHVuZGVmaW5lZCkgfHwgKGRheUluSG91cnMgPT09IG51bGwpIHx8IChpc05hTihkYXlJbkhvdXJzKSkgfHwgKGRheUluSG91cnMgPCAxKSkgZGF5SW5Ib3VycyA9IDI0O1xyXG4vLyAgICAgICAgIGxldCB0RCwgdEgsIHRNO1xyXG4vLyAgICAgICAgIHREID0gKHRpbWVJbk1pbnV0ZXMgLyBkYXlJbkhvdXJzIC8gNjApIDw8IDA7XHJcbi8vICAgICAgICAgcmV0U3RyICs9IHREID4gMCA/IHREICsgXCIg0LQuIFwiIDogXCJcIjtcclxuLy8gICAgICAgICB0aW1lSW5NaW51dGVzIC09IHREICogZGF5SW5Ib3VycyAqIDYwO1xyXG4vLyAgICAgICAgIHRIID0gKHRpbWVJbk1pbnV0ZXMgLyA2MCkgPDwgMDtcclxuLy8gICAgICAgICByZXRTdHIgKz0gdEggPiAwID8gdEggKyBcIiDRhy4gXCIgOiBcIlwiO1xyXG4vLyAgICAgICAgIHRpbWVJbk1pbnV0ZXMgLT0gdEggKiA2MDtcclxuLy8gICAgICAgICB0TSA9IHRpbWVJbk1pbnV0ZXMgPDwgMDtcclxuLy8gICAgICAgICByZXRTdHIgKz0gdE0gKyBcIiDQvNC40L0uXCIgKyBcIiAoXCIgKyBkYXlJbkhvdXJzICsgXCIt0YfQsNGB0L7QstC+0Lkg0LTQtdC90YwpXCI7XHJcbi8vICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIHJldFN0ciArPSBcItCn0YLQvi3RgtC+INGB0L4g0LLRgNC10LzQtdC90LXQvCDQvdC1INGC0LDQuiA6KFwiO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgcmV0dXJuIHJldFN0cjtcclxuLy8gfVxyXG5cclxuZXhwb3J0IHtjYWxjdWxhdGVFbGFwc2VkVGltZX07XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBjYWxjdWxhdGVFbGFwc2VkVGltZScpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2FsY3VsYXRlRWxhcHNlZFRpbWUuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIGdvVG9UYXNrRGF0YWxpc3QnKTtcclxufVxyXG5cclxuaW1wb3J0IHtnZXRUYXNrSWQsZ2V0VGFza0hlYWR9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5cclxuZnVuY3Rpb24gZ29Ub1Rhc2tEYXRhbGlzdCgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgdGFza0lkID0gZ2V0VGFza0lkKCk7XHJcblxyXG4gICAgbGV0IHRhc2tUaXRsZSA9IGdldFRhc2tIZWFkKCkudGl0bGU7XHJcblxyXG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhbGlzdCcpKSB8fCBbXTtcclxuICAgIGRhdGEgPSBhcHBlbmRJZChkYXRhKTtcclxuXHJcbiAgICAvL9C10YHQu9C4INC90LAg0YHRgtGA0LDQvdC40YbQtSDQtdGB0YLRjCDQt9Cw0LPQvtC70L7QstC+0Log0LfQsNC00LDRh9C4XHJcbiAgICAvLyAtINC/0YDQvtCy0LXRgNC40YLRjCDQtdGB0YLRjCDQu9C4INC+0L3QsCDQsiDRgdC/0LjRgdC60LVcclxuICAgIGlmICh0YXNrVGl0bGUpIHtcclxuXHJcbiAgICAgICAgbGV0IG5ld2RhdGEgPSB7XCJpZFwiOiB0YXNrSWQsIFwidGl0bGVcIjogdGFza1RpdGxlICsgJyAnICsgdGFza0lkfTtcclxuXHJcbiAgICAgICAgZGF0YSA9IGFwcGVuZElkKGRhdGEsIG5ld2RhdGEpO1xyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGF0YWxpc3QnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/RgdC+0LfQtNCw0LwgZGF0YWxpc3RcclxuICAgIGxldCBkYXRhbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RhdGFsaXN0Jyk7XHJcbiAgICBkYXRhbGlzdC5pZCA9ICdkbC1nb3RvdGFzayc7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRhdGFsaXN0KTtcclxuXHJcbiAgICAvL9GB0LLRj9C30LDRgtGMIGRhdGFsaXN0INGBINC/0L7Qu9C10Lwg0LLQstC+0LTQsCBpZCDQt9Cw0LTQsNGH0LhcclxuICAgIGxldCBpZEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvVG8nKTtcclxuICAgIGlkRmllbGQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgaWRGaWVsZC5zZXRBdHRyaWJ1dGUoJ2xpc3QnLCAnZGwtZ290b3Rhc2snKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgICBvcC52YWx1ZSA9IGRhdGFbaV0uaWQ7XHJcbiAgICAgICAgb3AubGFiZWwgPSBkYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgIGRhdGFsaXN0LmFwcGVuZENoaWxkKG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhcHBlbmRJZChhcnIsIG5ld2RhdGEgPSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChuZXdkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGVjayA9IGFyci5zb21lKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pZCA9PT0gbmV3ZGF0YS5pZDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChuZXdkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFyci5sZW5ndGggPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgYXJyLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Z29Ub1Rhc2tEYXRhbGlzdH07XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBnb1RvVGFza0RhdGFsaXN0Jyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9nb1RvVGFzay5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgY291bnRXb3JrZXJUaW1lJyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0QWxsQ29tbWVudHNSb3dzLGdldEFsbFdvcmtlcnMsZ2V0Um93VGltZVN0cmluZ30gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcbmltcG9ydCB7Y3JlYXRlSVNPRGF0ZSxkYXRlRm9ybWF0dGVyLGdldFJvd0RhdGVTdHJpbmd9IGZyb20gJy4vX3V0aWxzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGNvdW50V29ya2VyVGltZSgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGxldCAkaW5wdXRfYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItdG9vbGJhcicpO1xyXG4gICAgbGV0IHJvd3MgPSBnZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuICAgIGxldCB3b3JrZXJzID0gZ2V0QWxsV29ya2VycygpO1xyXG4gICAgbGV0IGRhdGVzX2NvbGxlY3Rpb24gPSBuZXcgU2V0KCk7XHJcbiAgICBsZXQgZGF0ZV9zdHI7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGF0ZV9zdHIgPSByb3dzW2ldLmNoaWxkcmVuWzNdLnRleHRDb250ZW50O1xyXG4gICAgICAgIGRhdGVfc3RyID0gZGF0ZV9zdHIuc3BsaXQoJyAnKTtcclxuICAgICAgICBkYXRlc19jb2xsZWN0aW9uLmFkZChjcmVhdGVJU09EYXRlKGRhdGVfc3RyWzBdKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRpbWVsaXN0ID0gY3JlYXRlVGltZUxpc3Qod29ya2Vycywgcm93cyk7XHJcblxyXG4gICAgbGV0ICR0aW1lbGlzdCA9IGNyZWF0ZVRpbWVMaXN0Vmlldyh0aW1lbGlzdCk7XHJcblxyXG4gICAgJHRpbWVsaXN0LmNsYXNzTGlzdC5hZGQoJ3VzZXItdG9vbGJhcl9faXRlbScpO1xyXG5cclxuICAgIC8v0LTQvtCx0LDQstC70Y/QtdC8INGB0YLRgNC+0LrRgyDRgSDQvtCx0YnQuNC8INCy0YDQtdC80LXQvdC10Lwg0LLRgdC10YUg0YHQvtGC0YDRg9C00L3QuNC60L7QslxyXG4gICAgLy/RgtGA0LXRgtC40Lkg0L/QsNGA0LDQvNC10YLRgCB0cnVlIC0g0YHRgtCw0LLQuNGCINC60LvQsNGB0YEt0LzQsNGA0LrQtdGAINCy0YvQsdGA0LDQvdC90YvRhSDRgNCw0LHQvtGC0L3QuNC60L7QslxyXG4gICAgaW5zZXJ0VG90YWxUaW1lKCR0aW1lbGlzdCwgdGltZWxpc3QsIHRydWUpO1xyXG5cclxuICAgIC8vINC00L7QsdCw0LLQu9GP0LXQvCDQutC70LjQuiDQv9C+INGB0YLRgNC+0LrQtSDQtNC70Y8g0L/QvtC00YHRh9C10YLQsCDQstGA0LXQvNC10L3QuCDQstGL0LHRgNCw0L3QvdGL0YUg0YDQsNCx0L7RgtC90LjQutC+0LJcclxuICAgICR0aW1lbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGltZS1saXN0LXRvdGFsJykpe1xyXG4gICAgICAgICAgICBjb3VudFNlbGVjdGVkV29ya2Vyc1RpbWUodGhpcywgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0ICR0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0gzJyk7XHJcbiAgICAkdGl0bGUudGV4dENvbnRlbnQgPSAn0JLRgdGPINC30LDQtNCw0YfQsCc7XHJcbiAgICAkdGl0bGUuY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyLXRpdGxlJyk7XHJcbiAgICAkdGltZWxpc3QuaW5zZXJ0QmVmb3JlKCR0aXRsZSwgJHRpbWVsaXN0LmZpcnN0Q2hpbGQpO1xyXG4gICAgJHRpbWVsaXN0LmNsYXNzTGlzdC5hZGQoJ3VzZXItdG9vbGJhcl9faXRlbScpO1xyXG5cclxuICAgIGxldCBkYXRlX2xpc3RzID0gY3JlYXRlRGF0ZXNMaXN0KCRpbnB1dF9ib3gsIGRhdGVzX2NvbGxlY3Rpb24pO1xyXG5cclxuICAgIC8vINC00L7QsdCw0LLQu9GP0Y4g0YHQtdC70LXQutGC0Ysg0YEg0LTQsNGC0LDQvNC4IC0g0L/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LfQsCDQstGL0LHRgNCw0L3QvdGL0Lkg0L/QtdGA0LjQvtC0XHJcbiAgICBmaW5kVGltZUluRGF0ZXNSYW5nZShkYXRlX2xpc3RzLCB3b3JrZXJzLCByb3dzKTtcclxuXHJcbiAgICAkaW5wdXRfYm94Lmluc2VydEJlZm9yZSgkdGltZWxpc3QsICRpbnB1dF9ib3gubGFzdENoaWxkKTtcclxuXHJcbiAgICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjU1ODk3Ny9hamF4LWNyb3NzLWRvbWFpbi1jYWxsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURhdGVzTGlzdChpbnB1dF9ib3gsIGRhdGVzKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlTGlzdChjc3NfaWQsIGNzc19jbGFzcykge1xyXG4gICAgICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnU0VMRUNUJyk7XHJcbiAgICAgICAgbGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgY3NzX2lkKTtcclxuICAgICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoY3NzX2NsYXNzKTtcclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICBib3guY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyX19pdGVtJyk7XHJcblxyXG4gICAgbGV0IHN0YXJ0X2xpc3QgPSBjcmVhdGVMaXN0KCdkYXRlLXN0YXJ0LWxpc3QnLCAnZGF0ZXMtbGlzdCcpO1xyXG5cclxuICAgIGxldCBlbmRfbGlzdCA9IGNyZWF0ZUxpc3QoJ2RhdGUtZW5kLWxpc3QnLCAnZGF0ZXMtbGlzdCcpO1xyXG5cclxuICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdCVVRUT04nKTtcclxuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICBidG4udGV4dENvbnRlbnQgPSAn0J/QvtGB0YfQuNGC0LDRgtGMJztcclxuXHJcbiAgICBsZXQgb3B0aW9uLCBjbG5fb3B0aW9uLCBsaXN0ZGF0ZTtcclxuXHJcbiAgICBmb3IobGV0IGRhdGUgb2YgZGF0ZXMpe1xyXG4gICAgICAgIGxpc3RkYXRlID0gZGF0ZUZvcm1hdHRlcihwYXJzZUludChkYXRlLCAxMCkpO1xyXG4gICAgICAgIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ09QVElPTicpO1xyXG4gICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZGF0ZSk7XHJcbiAgICAgICAgb3B0aW9uLmlubmVySFRNTCA9IGxpc3RkYXRlLnRvTG9jYWxlU3RyaW5nKCdydScpO1xyXG4gICAgICAgIGNsbl9vcHRpb24gPSBvcHRpb24uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHN0YXJ0X2xpc3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgICBlbmRfbGlzdC5hcHBlbmRDaGlsZChjbG5fb3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBib3guYXBwZW5kQ2hpbGQoc3RhcnRfbGlzdCk7XHJcbiAgICBib3guYXBwZW5kQ2hpbGQoZW5kX2xpc3QpO1xyXG4gICAgYm94LmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDMnKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ9CX0LAg0LLRi9Cx0YDQsNC90L3Ri9C5INC/0LXRgNC40L7QtCc7XHJcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXItdGl0bGUnKTtcclxuICAgIGJveC5pbnNlcnRCZWZvcmUodGl0bGUsIGJveC5maXJzdENoaWxkKTtcclxuXHJcbiAgICBpbnB1dF9ib3guaW5zZXJ0QmVmb3JlKGJveCwgaW5wdXRfYm94Lmxhc3RDaGlsZCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAnYm94JzogYm94LFxyXG4gICAgICAgICdzdGFydF9saXN0Jzogc3RhcnRfbGlzdCxcclxuICAgICAgICAnZW5kX2xpc3QnOiBlbmRfbGlzdCxcclxuICAgICAgICAnYnRuJzogYnRuXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vINGB0L7Qt9C00LDQvdC40LUg0L7QsdGK0LXQutGC0LAg0YHQviDRgdC/0LjRgdC60L7QvCDRgdC+0YLRgNGD0LTQvdC60L7QsiDQuCDQstGA0LXQvNC10L3QuCDQutCw0LbQtNC+0LPQviDQsiDQt9Cw0LTQsNGH0LVcclxuZnVuY3Rpb24gY3JlYXRlVGltZUxpc3Qod29ya2Vycywgcm93cykge1xyXG4gICAgbGV0IG50aW1lLCBuYW1lLCB0c3VtO1xyXG4gICAgbGV0IHRpbWVsaXN0ID0ge307XHJcblxyXG4gICAgZm9yIChsZXQgcyA9IDA7IHMgPCB3b3JrZXJzLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgdHN1bSA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBudGltZSA9IGdldFJvd1RpbWVTdHJpbmcocm93c1tpXSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocm93c1tpXS5jaGlsZHJlbls0XSkge1xyXG4gICAgICAgICAgICAgICAgLy/QtNC+INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gcm93c1tpXS5jaGlsZHJlbls0XS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8v0L/QvtGB0LvQtSDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHJvd3NbaV0ucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtYXV0aG9yJykudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh3b3JrZXJzW3NdID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0c3VtICs9IG50aW1lO1xyXG4gICAgICAgICAgICAgICAgdGltZWxpc3RbbmFtZV0gPSB0c3VtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aW1lbGlzdDtcclxufVxyXG5cclxuLy8g0YHQvtC30LTQsNC90LjQtSBodG1sINGN0LvQtdC80LXQvdGC0LAg0YHQviDRgdC/0LjRgdC60L7QvCDRgdC+0YLRgNGD0LTQvdC60L7QsiDQuCDQstGA0LXQvNC10L3QuCDQutCw0LbQtNC+0LPQviDQsiDQt9Cw0LTQsNGH0LVcclxuZnVuY3Rpb24gY3JlYXRlVGltZUxpc3RWaWV3KGRhdGEpIHtcclxuICAgIGxldCAkdGltZWxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgICR0aW1lbGlzdC5jbGFzc0xpc3QuYWRkKCd0aW1lLWxpc3QnKTtcclxuICAgICR0aW1lbGlzdC5pZCA9ICd3b3JrZXJzLXRpbWUnO1xyXG5cclxuICAgIGxldCBsaXN0X2l0ZW07XHJcbiAgICBsZXQgd29ya2VydGltZTtcclxuICAgIGxldCB0b3RhbHRpbWUgPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGsgaW4gZGF0YSkge1xyXG4gICAgICAgIHdvcmtlcnRpbWUgPSBkYXRhW2tdO1xyXG4gICAgICAgIHRvdGFsdGltZSArPSB3b3JrZXJ0aW1lO1xyXG4gICAgICAgIGxpc3RfaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBsaXN0X2l0ZW0uZGF0YXNldC53b3JrZXJ0aW1lID0gd29ya2VydGltZTtcclxuICAgICAgICBsaXN0X2l0ZW0uaW5uZXJIVE1MID0gJzxzcGFuPicgKyBrICsgJzwvc3Bhbj4gPHNwYW4+JyArIHdvcmtlcnRpbWUgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgJHRpbWVsaXN0Lmluc2VydEJlZm9yZShsaXN0X2l0ZW0sICR0aW1lbGlzdC5sYXN0Q2hpbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAkdGltZWxpc3Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRUaW1lSW5EYXRlc1JhbmdlKGxpc3RzLCB3b3JrZXJzLCByb3dzKSB7XHJcbiAgICBsZXQgJHN0YXJ0X2xpc3QgPSBsaXN0cy5zdGFydF9saXN0O1xyXG4gICAgbGV0ICRlbmRfbGlzdCA9IGxpc3RzLmVuZF9saXN0O1xyXG4gICAgbGV0ICRib3ggPSBsaXN0cy5ib3g7XHJcbiAgICBsZXQgJGJ0biA9IGxpc3RzLmJ0bjtcclxuXHJcbiAgICBmdW5jdGlvbiBmaW5kUm93c0luUmFuZ2Uocm93cywgc3RhcnQsIGVuZCkge1xyXG5cclxuICAgICAgICByZXR1cm4gcm93cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1fZGF0ZSA9IGdldFJvd0RhdGVTdHJpbmcoaXRlbSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXRlbV9kYXRlID49IHN0YXJ0ICYmIGl0ZW1fZGF0ZSA8PSBlbmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgJGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGZpbmRfcm93cyA9IGZpbmRSb3dzSW5SYW5nZShyb3dzLCAkc3RhcnRfbGlzdC52YWx1ZSwgJGVuZF9saXN0LnZhbHVlKTtcclxuXHJcbiAgICAgICAgbGV0IHJhbmdlX3RpbWVsaXN0ID0gY3JlYXRlVGltZUxpc3QoZ2V0U2VsZWN0ZWRXb3JrZXJzKCksIGZpbmRfcm93cyk7XHJcbiAgICAgICAgbGV0ICRyYW5nZV90aW1lbGlzdCA9IGNyZWF0ZVRpbWVMaXN0VmlldyhyYW5nZV90aW1lbGlzdCk7XHJcblxyXG4gICAgICAgIGlmICgkYm94LnF1ZXJ5U2VsZWN0b3IoJyNyYW5nZS10aW1lbGlzdCcpKSB7XHJcbiAgICAgICAgICAgICRib3gucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhbmdlLXRpbWVsaXN0JykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHJhbmdlX3RpbWVsaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAncmFuZ2UtdGltZWxpc3QnKTtcclxuXHJcbiAgICAgICAgJGJveC5hcHBlbmRDaGlsZCgkcmFuZ2VfdGltZWxpc3QpO1xyXG5cclxuICAgICAgICBpbnNlcnRUb3RhbFRpbWUoJHJhbmdlX3RpbWVsaXN0LCByYW5nZV90aW1lbGlzdCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VsZWN0ZWRXb3JrZXJzKCkge1xyXG4gICAgbGV0IHNlbGVjdGVkX3dvcmtlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd29ya2Vycy10aW1lJykucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdGVkJyk7XHJcbiAgICBsZXQgc2VsZWN0ZWRfbmFtZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkX3dvcmtlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzZWxlY3RlZF9uYW1lcy5wdXNoKHNlbGVjdGVkX3dvcmtlcnNbaV0uZmlyc3RFbGVtZW50Q2hpbGQudGV4dENvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzZWxlY3RlZF9uYW1lcztcclxufVxyXG5cclxuLy/Qv9C+0LTRgdGH0LXRgiDQstGA0LXQvNC10L3QuCDQstGL0LHRgNCw0L3QvdGL0YUg0YPRh9Cw0YHRgtC90LjQutC+0LIg0LfQsNC00LDRh9C4ICjQuNC3INGB0L/QuNGB0LrQsCDQstGB0LXRhSDRg9GH0LDRgdGC0L3QuNC60L7QsilcclxuZnVuY3Rpb24gY291bnRTZWxlY3RlZFdvcmtlcnNUaW1lKGxpc3QsIGV2ZW50KSB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgbGV0ICR0b3RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JrZXJzLXRpbWUtdG90YWwnKTtcclxuICAgIGxldCB0b3RhbCA9IHBhcnNlSW50KCR0b3RhbC5kYXRhc2V0LnRvdGFsdGltZSk7XHJcblxyXG4gICAgd2hpbGUgKHRhcmdldCAhPT0gbGlzdCkge1xyXG4gICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gJ1AnKSB7XHJcbiAgICAgICAgICAgIHJlY291bnRUb3RhbCh0YXJnZXQsICR0b3RhbCwgdG90YWwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWNvdW50VG90YWwoZWxlbSwgdG90YWwsIHRvdGFsdGltZSkge1xyXG4gICAgICAgIGxldCBlbGVtdGltZSA9IHBhcnNlSW50KGVsZW0uZGF0YXNldC53b3JrZXJ0aW1lKTtcclxuXHJcbiAgICAgICAgLy/QutC70LDRgdGBIGV4Y2x1ZGVkINC90YPQttC10L0g0LTQu9GPINGE0LjQu9GM0YLRgNCw0YbQuNC4INGB0L/QuNGB0LrQsCDRgNCw0LHQvtGC0L3QuNC60L7QslxyXG4gICAgICAgIC8v0LIg0LLRi9Cy0L7QtNC1INCy0YDQtdC80L3QuCDQt9CwINC/0LXRgNC40L7QtCAtINCy0YvQstC+0LQg0YLQvtC70YzQutC+INC/0L4g0LLRi9Cx0YDQsNC90L3Ri9C8IChzZWxlY3RlZCkg0YDQsNCx0L7RgtC90LjQutCw0LxcclxuICAgICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2V4Y2x1ZGVkJyk7XHJcbiAgICAgICAgICAgIHRvdGFsdGltZSA9IHRvdGFsdGltZSAtIGVsZW10aW1lO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdleGNsdWRlZCcpO1xyXG4gICAgICAgICAgICB0b3RhbHRpbWUgPSB0b3RhbHRpbWUgKyBlbGVtdGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvdGFsLmlubmVySFRNTCA9IHRvdGFsdGltZTtcclxuICAgICAgICB0b3RhbC5kYXRhc2V0LnRvdGFsdGltZSA9IHRvdGFsdGltZTtcclxuICAgIH1cclxufVxyXG5cclxuLy8g0L/QvtC00YHRh9C10YIg0L7QsdGJ0LXQs9C+INCy0YDQtdC80LXQvdC4INCy0YHQtdGFINGB0L7RgtGA0YPQtNC90LjQutC+0LIg0LTQu9GPINGB0L/QuNGB0LrQsCDRgdC+0YLRgNGD0LTQvdC40Lot0LLRgNC10LzRj1xyXG5mdW5jdGlvbiBpbnNlcnRUb3RhbFRpbWUodGltZWxpc3QsIGRhdGEsIGFkZG1hcmtlcikge1xyXG4gICAgbGV0IHRvdGFsdGltZSA9IDA7XHJcbiAgICBsZXQgdG90YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcblxyXG4gICAgZm9yIChsZXQgayBpbiBkYXRhKSB7XHJcbiAgICAgICAgdG90YWx0aW1lICs9IGRhdGFba107XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFkZG1hcmtlcikge1xyXG4gICAgICAgIGxldCBsaXN0X2l0ZW1zID0gdGltZWxpc3QucXVlcnlTZWxlY3RvckFsbCgncCcpO1xyXG4gICAgICAgIC8v0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LLRgdC1INGA0LDQsdC+0YLQvdC40LrQuCDQstGL0LHRgNCw0L3Riywg0YHRh9C40YLQsNC10YLRgdGPINC+0LHRidC10LUg0LLRgNC10LzRjyDQv9C+INCy0YHQtdC8XHJcbiAgICAgICAgLy/QstGB0LXQvCDQtNC+0LHQsNCy0LvRj9C10Lwg0LrQu9Cw0YHRgSBzZWxlY3RlZCDQvdGD0LbQvdGL0Lkg0LTQu9GPINGE0LjQu9GM0YLRgNCw0YbQuNC4INGB0L/QuNGB0LrQsFxyXG4gICAgICAgIC8v0Lgg0YfRgtC+0LHRiyDQstC40LfRg9Cw0LvRjNC90L4g0L7RgtC80LXRgtC40YLRjCDQstGL0LHRgNCw0L3QvdGL0YUg0LIg0YHQv9C40YHQutC1XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0X2l0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpc3RfaXRlbXNbaV0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG90YWwuaW5uZXJIVE1MID0gJzxzcGFuPtCS0YHQtdCz0L46PC9zcGFuPiA8c3BhbiBpZD1cIndvcmtlcnMtdGltZS10b3RhbFwiIGRhdGEtdG90YWx0aW1lPVwiJyArIHRvdGFsdGltZSArICdcIj4nICsgdG90YWx0aW1lICsgJzwvc3Bhbj4nO1xyXG4gICAgdG90YWwuY2xhc3NMaXN0LmFkZCgndGltZS1saXN0LXRvdGFsJyk7XHJcbiAgICB0aW1lbGlzdC5hcHBlbmRDaGlsZCh0b3RhbCk7XHJcblxyXG4gICAgcmV0dXJuIHRvdGFsdGltZTtcclxufVxyXG5cclxuZXhwb3J0IHtjb3VudFdvcmtlclRpbWV9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgY291bnRXb3JrZXJUaW1lJyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3VudFdvcmtlclRpbWUuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKXtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCB0YXNrRm9vdGVyRGVzaWduJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tGb290ZXJEZXNpZ24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4vL25ldyBjb21tZW50XHJcbiAgICBsZXQgY29tbWVudFRibCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YmwtbmV3LWNvbW1lbnQnKTtcclxuICAgIGxldCBuZXdDb21tZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1jb21tZW50LXdyYXAnKTtcclxuXHJcbiAgICAvLyDQtNC+0LHQsNCy0LvRjiDQt9Cw0LPQvtC70L7QstC+0LpcclxuICAgIGxldCBuZXdDb21tZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgbmV3Q29tbWVudFRpdGxlLnRleHRDb250ZW50ID0gJ9Cd0L7QstGL0Lkg0LrQvtC80LzQtdC90YLQsNGA0LjQuSc7XHJcbiAgICBuZXdDb21tZW50VGl0bGUuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbi10aXRsZScpO1xyXG4gICAgbmV3Q29tbWVudC5pbnNlcnRCZWZvcmUobmV3Q29tbWVudFRpdGxlLCBuZXdDb21tZW50LmZpcnN0RWxlbWVudENoaWxkKTtcclxuXHJcbiAgICAvLzEg0L/QtdGA0LLQsNGPINGB0YLRgNC+0LrQsCAtINC40YHQv9C+0LvQvdC40YLQtdC70YwsINGB0YLQsNGC0YPRgSwg0L/RgNC40L7RgNC40YLQtdGCXHJcbiAgICAvL9Cx0LvQvtC6INCyINC60L7RgtC+0YDQvtC8INCx0YPQtNGD0YIg0L/QvtC70Y8g0LTQu9GPINCy0LLQvtC00LAg0LfQsNGC0YDQsNGH0LXQvdC90L7Qs9C+INC4INC/0LvQsNC90LjRgNGD0LXQvNC+0LPQviDQstGA0LXQvNC10L3QuFxyXG4gICAgLy/QuCDQstGL0LHQvtGAINC/0YDQuNC+0YDQuNGC0LXRgtCwXHJcblxyXG4gICAgbGV0IHJvd0l0ZW1Qcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbGV0IHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgbGV0IHJvd3NGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAvL9C40YHQv9C+0LvQvdC40YLQtdC70YxcclxuICAgIGxldCBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRlcm5hbF93b3JrZXInKTtcclxuICAgIGxldCB3b3JrZXJCbG9jayA9IGZpZWxkLnBhcmVudE5vZGU7XHJcbiAgICB3b3JrZXJCbG9jay5jbGFzc0xpc3QuYWRkKCd3b3JrZXItYmxvY2snKTtcclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHdvcmtlckJsb2NrKTtcclxuXHJcbiAgICAvL9GB0YLQsNGC0YPRgVxyXG4gICAgbGV0IHN0YXR1c1RibCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ymwtc3RhdHVzJyk7XHJcbiAgICBsZXQgc3RhdHVzTGlzdCA9IGNyZWF0ZVN0YXR1c0xpc3Qoc3RhdHVzVGJsKTtcclxuICAgIGxldCBibG9jayA9IGNyZWF0ZUZpZWxkQW5kTGFiZWwoJ9Ch0YLQsNGC0YPRgScsIHN0YXR1c0xpc3QpO1xyXG4gICAgYmxvY2suY2xhc3NMaXN0LmFkZCgnZnJvdy1jb2wtMi0xJyk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoYmxvY2spO1xyXG5cclxuICAgIC8v0L/RgNC40L7RgNC40YLQtdGCXHJcbiAgICBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eV9pZCcpO1xyXG4gICAgYmxvY2sgPSBjcmVhdGVGaWVsZEFuZExhYmVsKCfQn9GA0LjQvtGA0LjRgtC10YInLCBmaWVsZCk7XHJcbiAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdmcm93LWNvbC0yLTInKTtcclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGJsb2NrKTtcclxuXHJcbiAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmllbGRzLXJvdycsJ3Rhc2stcm93LTEnKTtcclxuICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gICAgcm93c0ZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgIC8vMiDQstGC0L7RgNCw0Y8g0YHRgtGA0L7QutCwIC0g0LLRgNC10LzRjyAo0LfQsNGC0YDQsNGH0LXQvdC+L9C/0LvQsNC90LjRgNGD0LXQvNC+KSwg0L/RgNC+0LXQutGCLCDRgdGA0L7QulxyXG5cclxuICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWZpZWxkcy1yb3cnLCd0YXNrLXJvdy0yJyk7XHJcblxyXG4gICAgbGV0IHRpbWVCbG9jayA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICB0aW1lQmxvY2suY2xhc3NMaXN0LmFkZCgndGltZS1ibG9jaycpO1xyXG5cclxuICAgIC8v0LfQsNGC0YDQsNGH0LXQvdC+INCy0YDQtdC80LXQvdC4XHJcbiAgICBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGVuZGVkX3RpbWUnKTtcclxuICAgIGJsb2NrID0gY3JlYXRlRmllbGRBbmRMYWJlbCgn0JfQsNGC0YDQsNGH0LXQvdC+JywgZmllbGQpO1xyXG4gICAgdGltZUJsb2NrLmFwcGVuZENoaWxkKGJsb2NrKTtcclxuXHJcbiAgICAvL9C/0LvQsNC90LjRgNGD0LXQvNC+0LUg0LLRgNC10LzRj1xyXG4gICAgZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhbl90aW1lJyk7XHJcbiAgICBibG9jayA9IGNyZWF0ZUZpZWxkQW5kTGFiZWwoJ9Cf0LvQsNC90LjRgNGD0LXQvNC+0LUnLCBmaWVsZCk7XHJcbiAgICB0aW1lQmxvY2suYXBwZW5kQ2hpbGQoYmxvY2spO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRpbWVCbG9jayk7XHJcblxyXG4gICAgLy/Qv9GA0L7QtdC60YJcclxuICAgIGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsaWVudF9pZCcpO1xyXG4gICAgbGV0IHByb2plY3QgPSBjcmVhdGVGaWVsZEFuZExhYmVsKCfQn9GA0L7QtdC60YInLCBmaWVsZCk7XHJcbiAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoJ2Zyb3ctY29sLTItMScpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocHJvamVjdCk7XHJcblxyXG4gICAgLy/RgdGA0L7QulxyXG4gICAgbGV0IGRlYWRsaW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZF9kYXRlJykucGFyZW50Tm9kZTtcclxuICAgIGRlYWRsaW5lLndpZHRoID0gJyc7XHJcbiAgICBkZWFkbGluZS5jbGFzc0xpc3QuYWRkKCdkZWFkbGluZS1jYWxlbmRhcicsJ2Zyb3ctY29sLTItMicpO1xyXG5cclxuICAgIC8v0YPQsdC40YDQsNGOINGB0LjQvNCy0L7QuyDQv9C10YDQtdCy0L7QtNCwINGB0YLRgNC+0LrQuFxyXG4gICAgZGVhZGxpbmUucmVtb3ZlQ2hpbGQoZGVhZGxpbmUucXVlcnlTZWxlY3Rvcignc2NyaXB0JykubmV4dFNpYmxpbmcpO1xyXG5cclxuICAgIC8v0LrQvdC+0L/QutGDINClIC0g0L7Rh9C40YHRgtC40YLRjCDQv9C+0LvQtSAtINGD0LHQuNGA0LDRjlxyXG4gICAgLy9kZWFkbGluZS5yZW1vdmVDaGlsZChkZWFkbGluZS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWJ1dHRvbl0nKSk7XHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjcmVhdGVGaWVsZEFuZExhYmVsKCfQodGA0L7QuicsIGRlYWRsaW5lKSk7XHJcblxyXG4gICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWZpZWxkcy1yb3cnLCd0YXNrLXJvdy0yJyk7XHJcbiAgICByb3dJdGVtLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICAgIHJvd3NGcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAvLzMg0YLRgNC10YLRjNGPINGB0YLRgNC+0LrQsCAtINC00L7Qv9C+0LvQvdC40YLQtdC70YzQvdGL0Lkg0LXQvNC10LnQuyDQuCDRgtC40L8g0LfQsNC00LDRh9C4XHJcbiAgICAvL9C00L7Qv9C+0LvQvdC40YLQtdC70YzQvdGL0Lkg0LXQvNC10LnQu1xyXG4gICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmllbGRzLXJvdycsJ3Rhc2stcm93LTMnKTtcclxuXHJcbiAgICBsZXQgc2VuZExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkX2VtYWlsJyk7XHJcblxyXG4gICAgbGV0IGFkZEVtYWlsID0gc2VuZExpc3QucGFyZW50Tm9kZTtcclxuICAgIGFkZEVtYWlsLmNsYXNzTGlzdC5hZGQoJ2FkZC1lbWFpbCcpO1xyXG5cclxuICAgIGxldCBhZGRFbWFpbExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgIGFkZEVtYWlsTGFiZWwudGV4dENvbnRlbnQgPSAn0J/QvtC70YPRh9Cw0YLQtdC70Lgg0YDQsNGB0YHRi9C70LrQuCDQv9C+INC/0L7Rh9GC0LUnO1xyXG4gICAgYWRkRW1haWwuaW5zZXJ0QmVmb3JlKGFkZEVtYWlsTGFiZWwsYWRkRW1haWwuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG5cclxuICAgIGxldCBzZW5kTGlzdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZXRFbWFpbEFkZHJlc3Nlc0J1dHRvbicpO1xyXG4gICAgc2VuZExpc3RCdG4udmFsdWUgPSAn0JrQvtC80YMg0L/QuNGB0YzQvNCwJztcclxuICAgIGFkZEVtYWlsLmFwcGVuZENoaWxkKHNlbmRMaXN0QnRuKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChhZGRFbWFpbCk7XHJcblxyXG4gICAgLy/RgtC40L8g0LfQsNC00LDRh9C4XHJcbiAgICBsZXQgdGFza1R5cGVCbG9jayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ibGVtX3R5cGUnKS5wYXJlbnROb2RlO1xyXG4gICAgdGFza1R5cGVCbG9jay5jbGFzc0xpc3QuYWRkKCd0YXNrLXR5cGUnKTtcclxuXHJcbiAgICBsZXQgdGFza1R5cGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICB0YXNrVHlwZUxhYmVsLnRleHRDb250ZW50ID0gJ9Ci0LjQvyDQt9Cw0LTQsNGH0LgnO1xyXG4gICAgdGFza1R5cGVCbG9jay5pbnNlcnRCZWZvcmUodGFza1R5cGVMYWJlbCx0YXNrVHlwZUJsb2NrLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRhc2tUeXBlQmxvY2spO1xyXG5cclxuICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gICAgcm93c0ZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgIC8vNCDRh9C10YLQstC10YDRgtCw0Y8g0YHRgtGA0L7QutCwIC0g0LTQvtCx0LDQstC70LXQvdC40LUg0YTQsNC50LvQvtCyXHJcbiAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1maWVsZHMtcm93JywndGFzay1yb3ctNCcpO1xyXG5cclxuICAgIGxldCBleGlzdEFkZEZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRmlsZUlucHV0cycpO1xyXG4gICAgbGV0IGFkZEZpbGVzQmxvY2sgPSBleGlzdEFkZEZpbGUucGFyZW50Tm9kZTtcclxuICAgIGFkZEZpbGVzQmxvY2suY2xhc3NMaXN0LmFkZCgnYWRkLWZpbGVzJyk7XHJcblxyXG4gICAgbGV0IGFkZEZpbGVzTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgYWRkRmlsZXNMYWJlbC5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uLXRpdGxlJyk7XHJcbiAgICBhZGRGaWxlc0xhYmVsLmlubmVySFRNTCA9ICfQpNCw0LnQu9GLIDxzcGFuIGNsYXNzPVwicy1pbmZvXCI+0L7QsdGJ0LjQuSDQvtCx0YrQtdC8IDxzcGFuIGlkPVwiZmlsZXMtdG90YWxcIj7QtNC+IDMg0JzQsTwvc3Bhbj48L3NwYW4+JztcclxuICAgIC8v0LIgaWQ9XCJmaWxlcy10b3RhbFwiINCx0YPQtNC10YIg0LfQsNC80LXQvdGP0YLRgdGPINGC0LXQutGB0YIg0LrQvtCz0LTQsCDRhNCw0LnQu9GLINCy0YvQsdGA0L3RiyAtINC+0LHRidC40Lkg0L7QsdGK0LXQvCDQstGL0LHRgNCw0L3QvdGL0YUg0YTQsNC50LvQvtCyXHJcbiAgICBhZGRGaWxlc0Jsb2NrLmluc2VydEJlZm9yZShhZGRGaWxlc0xhYmVsLGFkZEZpbGVzQmxvY2suZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG5cclxuICAgIC8v0Y3RgtGDINGB0YHRi9C70LrRgyDRjyDRgdC60YDQvtGOINGB0YLQuNC70Y/QvNC4XHJcbiAgICAvLyBsZXQgYWRkRmlsZUlucHV0ID0gYWRkRmlsZXNCbG9jay5xdWVyeVNlbGVjdG9yKCdhJyk7XHJcbiAgICAvLyBhZGRGaWxlSW5wdXQuc2V0QXR0cmlidXRlKCdvbmNsaWNrJywnYWRkRmlsZUlucHV0KFwiRmlsZUlucHV0c1wiKScpO1xyXG5cclxuICAgIC8vIGFkZEZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICByZW1vdmVGaWxlSW5wdXQoZXhpc3RBZGRGaWxlKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8v0LHQu9C+0Log0LIg0LrQvtGC0L7RgNC+0Lwg0LHRg9C00LXRgiDRgdC/0LjRgdC+0Log0LfQsNCz0YDRg9C20LXQvdC90YvRhSDRhNCw0LnQu9C+0LJcclxuICAgIGxldCBhZGRlZEZpbGVzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICBhZGRlZEZpbGVzTGlzdC5pZCA9ICdmaWxlcy1saXN0JztcclxuICAgIGFkZGVkRmlsZXNMaXN0LmNsYXNzTGlzdC5hZGQoJ2ZpbGVzLWxpc3QnKTtcclxuICAgIGFkZEZpbGVzQmxvY2suaW5zZXJ0QmVmb3JlKGFkZGVkRmlsZXNMaXN0LGV4aXN0QWRkRmlsZSk7XHJcblxyXG4gICAgLy/QvtCx0LXRgNC90YPRgtGMINGB0YPRidC10YHRgtCy0YPRjtGJ0LjQuSBpbnB1dCBmaWxlXHJcbiAgICAvL9GB0LDQvCBpbnB1dCDQsdGD0LTQtdGCINGB0LrRgNGL0YJcclxuICAgIC8v0Lgg0L3QsNCy0LXRgdC40YLRjCDQstGL0LfQvtCyINGE0YPQvdC60YbQuNC4INGB0L7Qt9C00LDRjtGJ0LXQuSDQvdC+0LLRi9C5INC40L3Qv9GD0YJcclxuICAgIGxldCBkZWZhdWx0RmlsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVJbnB1dDAnKTtcclxuICAgIC8v0LDRgtGA0LjQsdGD0YIgb25jaGFuZ2Ug0LTQvtCx0LDQstC70Y/RjiDRh9GC0L7QsdGLINC90LUg0LrQvtC/0LjRgNC+0LLQsNGC0Ywg0YPQttC1INGB0YPRidC10YHRgtCy0YPRjtGJ0Y7RjlxyXG4gICAgLy/QsiDRgtGA0LXQutC10YDQtSDRhNGD0L3QutGG0LjRjiDQtNC+0LHQsNC70Y/QvdC40Y8g0LjQvdC/0YPRgtC+0LJcclxuICAgIGRlZmF1bHRGaWxlSW5wdXQuc2V0QXR0cmlidXRlKCdvbmNoYW5nZScsJ2FkZEZpbGVJbnB1dChcIkZpbGVJbnB1dHNcIiknKTtcclxuICAgIGRlZmF1bHRGaWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHByb2Nlc3NGaWxlcyh0aGlzLGFkZGVkRmlsZXNMaXN0KTtcclxuICAgICAgICBoaWRlRmlsbGVkRmlsZUlucHV0KHRoaXMpO1xyXG4gICAgfSk7XHJcbiAgICBleGlzdEFkZEZpbGUuYXBwZW5kQ2hpbGQod3JhcEZpbGVJbnB1dHMoZGVmYXVsdEZpbGVJbnB1dCkpO1xyXG5cclxuICAgIGxldCBhZGRGaWxlT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcclxuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtdXRhdGlvbikge1xyXG5cclxuICAgICAgICAgICAgaWYobXV0YXRpb24uYWRkZWROb2Rlc1swXS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gbXV0YXRpb24uYWRkZWROb2Rlc1swXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ29uY2hhbmdlJywnYWRkRmlsZUlucHV0KFwiRmlsZUlucHV0c1wiKScpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0ZpbGVzKHRoaXMsYWRkZWRGaWxlc0xpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZGVGaWxsZWRGaWxlSW5wdXQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL9Cy0YHQtSDQvdC+0LLRi9C1IGlucHV0IGZpbGUg0L3Rg9C20L3QviDQvtCx0LXRgNC90YPRgtGMLFxyXG4gICAgICAgICAgICAgICAgLy/RgdCw0LwgaW5wdXQg0LHRg9C00LXRgiDRgdC60YDRi9GCXHJcbiAgICAgICAgICAgICAgICBsZXQgZmFrZUlucHV0ID0gd3JhcEZpbGVJbnB1dHMoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LmFwcGVuZENoaWxkKGZha2VJbnB1dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBhZGRGaWxlT2JzZXJ2ZXJDb25maWcgPSB7XHJcbiAgICAgICAgYXR0cmlidXRlczogZmFsc2UsXHJcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIGFkZEZpbGVPYnNlcnZlci5vYnNlcnZlKGV4aXN0QWRkRmlsZSwgYWRkRmlsZU9ic2VydmVyQ29uZmlnKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChhZGRGaWxlc0Jsb2NrKTtcclxuICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gICAgcm93c0ZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgIC8vNSDQv9GP0YLQsNGPINGB0YLRgNC+0LrQsCAtINC60L3QvtC/0LrQsCDQodC+0YXRgNCw0L3QuNGC0YxcclxuICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWZpZWxkcy1yb3cnLCd0YXNrLXJvdy01Jyk7XHJcblxyXG4gICAgbGV0IHNhdmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPXN1Ym1pdEJ1dHRvbl0nKTtcclxuICAgIHNhdmVCdG4uY2xhc3NMaXN0LmFkZCgnYnRuLWFjdGlvbicpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHNhdmVCdG4pO1xyXG4gICAgcm93SXRlbS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICByb3dzRnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgLy/QstGB0LUg0YHQvtCx0YDQsNC90L3QvtC1L9C/0LXRgNC10LzQtdGJ0LXQvdC90L7QtSDQstGB0YLQsNCy0LvRj9GOINCyINCx0LvQvtC6XHJcbiAgICBuZXdDb21tZW50LmFwcGVuZENoaWxkKHJvd3NGcmFnbWVudCk7XHJcblxyXG4gICAgLy8tLdGC0YPRgiDQvdCw0LLQtdGI0LjQstCw0Y4g0YHQvtCx0YvRgtC40Y8g0L3QsCDQv9C10YDQtdC80LXRidC10L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRi1xyXG5cclxuICAgIGZ1bmN0aW9uIGhpZGVGaWxsZWRGaWxlSW5wdXQoaW5wdXQpIHtcclxuICAgICAgICBpbnB1dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbi1lbGVtJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0ZpbGVzKGZpZWxkLCBmaWxlc2xpc3QpIHtcclxuICAgICAgICBsZXQgZmlsZSA9IGZpZWxkLmZpbGVzWzBdO1xyXG4gICAgICAgIGxldCBmaWxlU2l6ZSA9IGZpbGUuc2l6ZTtcclxuXHJcblxyXG4gICAgICAgIGlmKCFmaWxlc2xpc3QuZGF0YXNldC50b3RhbCl7XHJcbiAgICAgICAgICAgIGZpbGVzbGlzdC5kYXRhc2V0LnRvdGFsID0gZmlsZVNpemU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZpbGVzbGlzdC5kYXRhc2V0LnRvdGFsID0gcGFyc2VJbnQoZmlsZXNsaXN0LmRhdGFzZXQudG90YWwpICsgcGFyc2VJbnQoZmlsZVNpemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRvdGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVzLXRvdGFsJyk7XHJcbiAgICAgICAgdG90YWwudGV4dENvbnRlbnQgPSBieXRlc1RvU2l6ZShmaWxlc2xpc3QuZGF0YXNldC50b3RhbCkgKyAnINC40LcgMyDQnNCxJztcclxuXHJcbiAgICAgICAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIHAuaW5uZXJIVE1MID0gZmlsZS5uYW1lICsgJzxzcGFuIGNsYXNzPVwicy1pbmZvXCI+JyArIE1hdGguY2VpbChmaWxlU2l6ZSAvIDEwMjQpICsgJyBLYjwvc3Bhbj4nO1xyXG4gICAgICAgIHAuY2xhc3NMaXN0LmFkZCgnZmlsZS1saXN0LWl0ZW0nKTtcclxuXHJcbiAgICAgICAgbGV0IHJlbW92ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICByZW1vdmVCdG4uY2xhc3NMaXN0LmFkZCgnYnRuLXJlbW92ZS1pdGVtJyk7XHJcbiAgICAgICAgcmVtb3ZlQnRuLmRhdGFzZXQuZmllbGRJZCA9IGZpZWxkLmlkO1xyXG5cclxuICAgICAgICBwLmFwcGVuZENoaWxkKHJlbW92ZUJ0bik7XHJcblxyXG4gICAgICAgIGZpbGVzbGlzdC5hcHBlbmRDaGlsZChwKTtcclxuXHJcbiAgICAgICAgcmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUZpbGVJbnB1dCh0aGlzLHRvdGFsLGZpbGVzbGlzdCxmaWxlU2l6ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v0L/RgNC4INCy0YvQsdC+0YDQtSDQsiDRgdC/0LjRgdC60LUg0LTQvtC/LtC10LzQsNC50LvQvtCyINGB0YDQsNC30YMg0LLRgdGC0LDQstC70Y/RgtGMINCyINC/0L7Qu9C1INC00LvRjyDQvtGC0L/RgNCw0LLQutC4XHJcbiAgICBsZXQgZW1haWxMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZF9lbWFpbF93b3JrZXInKTtcclxuICAgIGxldCBvblBhZ2VFbWFpbExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgb25QYWdlRW1haWxMaXN0LmNsYXNzTGlzdC5hZGQoJ2VtYWlsLXNlbmQtbGlzdCcpO1xyXG4gICAgYWRkRW1haWwuaW5zZXJ0QmVmb3JlKG9uUGFnZUVtYWlsTGlzdCxhZGRFbWFpbC5jaGlsZE5vZGVzWzJdKTtcclxuXHJcbiAgICBlbWFpbExpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFkZFdvcmtlckVtYWlsVG9TZW5kTGlzdCh0aGlzLHNlbmRMaXN0LG9uUGFnZUVtYWlsTGlzdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL9C/0YDQuCDQstGL0LHQvtGA0LUg0LIg0YHQtdC70LXQutGC0LUg0KHRgtCw0YLRg9GBINC/0LXRgNC10LrQu9GO0YfQsNGOINGA0LDQtNC40L4sINGH0YLQvtCx0Ysg0YTQvtGA0LzQsCDQv9GA0LDQstC40LvRjNC90L4g0YDQsNCx0L7RgtCw0LvQsFxyXG4gICAgc3RhdHVzTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy52YWx1ZSkuY2hlY2tlZCA9IHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL9C/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INGB0YLRgNCw0L3QuNGG0Ysg0L3Rg9C20L3QviDRgdC80L7RgtGA0LXRgtGMINCy0YvQsdGA0LDQvdC90YvQuSDRgNCw0LTQuNC+INGB0L4g0YHRgtCw0YLRg9GB0L7QvCAo0LIg0YHQutGA0YvRgtC+0Lkg0YfQsNGB0YLQuCDRgtCw0LHQu9C40YbRiyAjdGFzay1mb290ZXIpXHJcbiAgICAvL9C4INGB0YLQsNCy0LjRgtGMINGB0YLQsNGC0YPRgSDQsiDRgdC10LvQtdC60YLQtSBzdGF0dXNMaXN0XHJcbiAgICB1cGRhdGVTdGF0dXNMaXN0T25Mb2FkKHN0YXR1c0xpc3QpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGaWVsZEFuZExhYmVsKHRleHQsZmllbGQpIHtcclxuICAgIGxldCByb3dJdGVtUHJvdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGxldCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICBsYWJlbC50ZXh0Q29udGVudCA9IHRleHQ7XHJcbiAgICByb3dJdGVtUHJvdG8uYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgcm93SXRlbVByb3RvLmFwcGVuZENoaWxkKGZpZWxkKTtcclxuICAgIHJldHVybiByb3dJdGVtUHJvdG87XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0YXR1c0xpc3QodGJsKSB7XHJcbiAgICBsZXQgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xyXG4gICAgbGV0IHJvd3MgPSBBcnJheS5mcm9tKHRibC5xdWVyeVNlbGVjdG9yQWxsKCd0cicpKTtcclxuXHJcbiAgICBsZXQgb3B0Z3JvdXA7XHJcblxyXG4gICAgcm93cy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBpZihpdGVtLmZpcnN0RWxlbWVudENoaWxkLmdldEF0dHJpYnV0ZSgnY29sc3BhbicpKXtcclxuICAgICAgICAgICAgb3B0Z3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRncm91cCcpO1xyXG4gICAgICAgICAgICBvcHRncm91cC5sYWJlbCA9IGl0ZW0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQob3B0Z3JvdXApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgcmFkaW8gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gcmFkaW8uaWQ7XHJcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignbGFiZWwnKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgb3B0Z3JvdXAuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbGlzdDtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU3RhdHVzTGlzdE9uTG9hZChsaXN0KSB7XHJcbiAgICBsZXQgc3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1uZXdfcHJvYmxlbV9zdGF0dXNdOmNoZWNrZWQnKTtcclxuXHJcbiAgICBmb3IoIGxldCBpIG9mIGxpc3Qub3B0aW9ucyl7XHJcbiAgICAgICAgaWYoaS52YWx1ZSA9PT0gc3RhdHVzLmlkKXtcclxuICAgICAgICAgICAgaS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRXb3JrZXJFbWFpbFRvU2VuZExpc3Qoc2VsZWN0LCBpbnB1dCwgbGlzdCkge1xyXG4gICAgbGV0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW3NlbGVjdC5zZWxlY3RlZEluZGV4XTtcclxuICAgIGxldCBkYXRhID0gW29wdGlvbi50ZXh0LHNlbGVjdC52YWx1ZV07XHJcbiAgICBsZXQgZW1haWwgPSBkYXRhWzFdO1xyXG5cclxuICAgIGlmIChlbWFpbC50cmltKCkgIT09IFwiXCIpIHtcclxuICAgICAgICBsZXQgYWRkRW1haWwgPSBpbnB1dC52YWx1ZTtcclxuICAgICAgICBsZXQgbmV3dmFsID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChhZGRFbWFpbCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICBuZXd2YWwgPSBlbWFpbDtcclxuICAgICAgICB9IGVsc2UgaWYgKGFkZEVtYWlsLmluZGV4T2YoZW1haWwpID09PSAtMSkge1xyXG4gICAgICAgICAgICBuZXd2YWwgPSBhZGRFbWFpbCArIChlbWFpbC5jaGFyQXQoYWRkRW1haWwubGVuZ3RoIC0gMSkgPT0gXCI7XCIgPyBcIlwiIDogXCI7XCIpICsgZW1haWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnB1dC52YWx1ZSA9IG5ld3ZhbDtcclxuXHJcbiAgICAgICAgbGV0IG5ld2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIG5ld2l0ZW0udGV4dENvbnRlbnQgPSBkYXRhWzBdO1xyXG4gICAgICAgIG5ld2l0ZW0uZGF0YXNldC5lbWFpbCA9IGRhdGFbMV07XHJcblxyXG4gICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQobmV3aXRlbSk7XHJcblxyXG4gICAgICAgIG5ld2l0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUl0ZW1Gcm9tU2VuZGxpc3QodGhpcywgc2VsZWN0LCBpbnB1dClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/QstGL0LHRgNCw0L3QvdC+0LPQviDQv9C+0LvRg9GH0LDRgtC10LvRjyDRgdC60YDRi9Cy0LDRjlxyXG4gICAgICAgIC8v0YHRgtCw0LLQu9GOINCy0YvQsdGA0LDQvdC90YvQvCDQtNC10YTQvtC70YLQvdGL0LkgKNC/0LXRgNCy0YvQuSkg0Y3Qu9C10LzQtdC90YIg0YHQv9C40YHQutCwXHJcblxyXG4gICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsJycpO1xyXG4gICAgICAgIHNlbGVjdC5vcHRpb25zWzBdLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlSXRlbUZyb21TZW5kbGlzdChpdGVtLCBzZWxlY3QsIGlucHV0KSB7XHJcbiAgICBsZXQgdGV4dCA9IGl0ZW0uZGF0YXNldC5lbWFpbDtcclxuXHJcbiAgICBsZXQgc2VuZExpc3QgPSBpbnB1dC52YWx1ZS5zcGxpdCgnOycpO1xyXG5cclxuICAgIGxldCBmaWx0ZXJlZFNlbmRMaXN0ID0gc2VuZExpc3QuZmlsdGVyKGZ1bmN0aW9uIChsaXN0aXRlbSkge1xyXG4gICAgICAgIGlmKGxpc3RpdGVtICE9PSB0ZXh0KXtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RpdGVtXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaW5wdXQudmFsdWUgPSBmaWx0ZXJlZFNlbmRMaXN0LmpvaW4oJzsnKTtcclxuXHJcbiAgICBpdGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaXRlbSk7XHJcblxyXG4gICAgZm9yKCBsZXQgaSBvZiBzZWxlY3Qub3B0aW9ucyl7XHJcbiAgICAgICAgaWYoaS52YWx1ZSA9PT0gdGV4dCl7XHJcbiAgICAgICAgICAgIGkucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUZpbGVJbnB1dChidG4sdG90YWwsZmlsZXNsaXN0LGZpbGVzaXplKSB7XHJcbiAgICBsZXQgdXBkYXRlVG90YWxTaXplID0gZmlsZXNsaXN0LmRhdGFzZXQudG90YWwgLSBmaWxlc2l6ZTtcclxuICAgIGZpbGVzbGlzdC5kYXRhc2V0LnRvdGFsID0gdXBkYXRlVG90YWxTaXplO1xyXG4gICAgdG90YWwudGV4dENvbnRlbnQgPSBieXRlc1RvU2l6ZSh1cGRhdGVUb3RhbFNpemUpICsgJyDQuNC3IDMg0JzQsSc7XHJcblxyXG4gICAgbGV0IGlucHV0SWQgPSBidG4uZGF0YXNldC5maWVsZElkO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5wdXRJZCkucGFyZW50Tm9kZS5yZW1vdmUoKTtcclxuICAgIGJ0bi5wYXJlbnROb2RlLnJlbW92ZSgpO1xyXG5cclxuICAgIGxldCBmaWxlSW5wdXRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYuZmlsZUlucHV0JykpO1xyXG4gICAgbGV0IHJlbW92ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLXJlbW92ZS1pdGVtJyk7XHJcblxyXG4gICAgLy/Qv9C10YDQtdC/0LjRgdCw0YLRjCDQuNC80LXQvdCwINC4IGlkINCy0YHQtdGFINC40L3Qv9GD0YLQvtCyLlxyXG4gICAgLy/QtdGB0LvQuCDQvtC90Lgg0LjQtNGD0YIg0L3QtSDQv9C+INC/0L7RgNGP0LTQutGDINC40LvQuCDRgSDQv9GA0L7Qv9GD0YHQutCw0LzQuFxyXG4gICAgLy/Qv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDRhNCw0LnQu9C+0LIg0L3QsCDRgdC10YDQstC10YAg0LHRg9C00LXRgiDQvtGI0LjQsdC60LBcclxuICAgIC8v0YLQviDQttC1INC90LDQtNC+INGB0LTQtdC70LDRgtGMINGBIGRhdGEtaW5wdXQtaWQg0LrQvdC+0L/QvtC6INGD0LTQsNC70LXQvdGPINGE0LDQudC70LBcclxuICAgIC8v0LAg0YLQviDQsdGD0LTQtdGCINGD0LTQsNC70Y/RgtGB0Y8g0L3QtSDRgtC+0YIg0LjQvdC/0YPRglxyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGVJbnB1dHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIGZpbGVJbnB1dHNbaV0uZmlyc3RFbGVtZW50Q2hpbGQuaWQgPSAnZmlsZUlucHV0JytpO1xyXG4gICAgICAgIGZpbGVJbnB1dHNbaV0uZmlyc3RFbGVtZW50Q2hpbGQubmFtZSA9ICdmaWxlSW5wdXQnK2k7XHJcbiAgICAgICAgcmVtb3ZlQnRuc1tpXS5kYXRhc2V0LmZpZWxkSWQgPSAnZmlsZUlucHV0JytpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB3cmFwRmlsZUlucHV0cyhpbnB1dCkge1xyXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGxldCBidG4gPSB3cmFwLmNsb25lTm9kZShmYWxzZSk7XHJcblxyXG4gICAgd3JhcC5jbGFzc0xpc3QuYWRkKCdmYWtlLWZpbGUtaW5wdXQnLGlucHV0LmNsYXNzTGlzdFswXSk7XHJcbiAgICB3cmFwLmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHJcbiAgICBidG4uaW5uZXJIVE1MID0gJ9CU0L7QsdCw0LLQuNGC0Ywg0YTQsNC50LsgPHNwYW4+0J3QsNC20LzQuCDQuNC70Lgg0YLQsNGJ0Lgg0LXQs9C+INGB0Y7QtNCwPC9zcGFuPic7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnRuLWZha2UtZmlsZScpO1xyXG4gICAgd3JhcC5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2lzLWhvdmVyJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3cmFwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaG92ZXInKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaG92ZXInKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB3cmFwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBieXRlc1RvU2l6ZShieXRlcykge1xyXG4gICAgbGV0IHNpemVzID0gWydCeXRlcycsICfQmtCxJywgJ9Cc0LEnLCAn0JPQsScsICfQotCxJ107XHJcbiAgICBpZiAoIWJ5dGVzKSB7XHJcbiAgICAgICAgcmV0dXJuICcwJ1xyXG4gICAgfVxyXG4gICAgbGV0IGkgPSBwYXJzZUludChNYXRoLmZsb29yKE1hdGgubG9nKGJ5dGVzKSAvIE1hdGgubG9nKDEwMjQpKSk7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChieXRlcyAvIE1hdGgucG93KDEwMjQsIGkpLCAyKSArICcgJyArIHNpemVzW2ldO1xyXG59XHJcblxyXG5cclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3Bjc3MvdGFza0Zvb3RlckRlc2lnbi5wY3NzJztcclxuXHJcbmV4cG9ydCB7dGFza0Zvb3RlckRlc2lnbn07XHJcblxyXG5pZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgdGFza0Zvb3RlckRlc2lnbicpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGFza0Zvb3RlckRlc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdGFza0Zvb3RlckRlc2lnbi5wY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3Rhc2tGb290ZXJEZXNpZ24ucGNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi90YXNrRm9vdGVyRGVzaWduLnBjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Bjc3MvdGFza0Zvb3RlckRlc2lnbi5wY3NzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjdGFzay1mb290ZXIgdHI6bnRoLWNoaWxkKDIpe2hlaWdodDowO292ZXJmbG93OmhpZGRlbn0uZmFrZS1maWxlLWlucHV0IC5idG4tZmFrZS1maWxle3BhZGRpbmc6LjdlbSAwIDA7dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC1zaXplOjE2cHg7Y29sb3I6IzgyYTVjMztjdXJzb3I6cG9pbnRlcn0uZmFrZS1maWxlLWlucHV0IC5idG4tZmFrZS1maWxlIHNwYW57d2lkdGg6MTAwJTtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LXNpemU6MTJweH0uZmFrZS1maWxlLWlucHV0PmlucHV0e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO29wYWNpdHk6MH0jRmlsZUlucHV0cyBicntkaXNwbGF5Om5vbmV9LnRhc2stdHlwZT5kaXYgc2VsZWN0e21hcmdpbi10b3A6LjNlbX0udGFzay10eXBlPmRpdiBicntkaXNwbGF5Om5vbmV9LmVtYWlsLXNlbmQtbGlzdD5saTphZnRlcntjb250ZW50OlxcXCJcXFxcMUY3QTlcXFwiO21hcmdpbi1sZWZ0Oi40ZW07Y29sb3I6cmVkO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2N1cnNvcjpwb2ludGVyfS5hZGQtZW1haWwgI2dldEVtYWlsQWRkcmVzc2VzQnV0dG9ue2Rpc3BsYXk6bm9uZVxcclxcbiAgICAgICAgLyp3aWR0aDogOTBweDtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7Ki99LmFkZC1lbWFpbCAjYWRkX2VtYWlsX3dvcmtlcnt3aWR0aDoyMjZweDtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmFkZC1lbWFpbCAjYWRkX2VtYWlse3Bvc2l0aW9uOmFic29sdXRlO3Zpc2liaWxpdHk6aGlkZGVuO3otaW5kZXg6YXV0b30uYWRkLWVtYWlsIGxhYmVse2Rpc3BsYXk6YmxvY2t9OnJvb3QgLmRlYWRsaW5lLWNhbGVuZGFyICNlbmRfZGF0ZXt3aWR0aDphdXRvIWltcG9ydGFudH06cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXIgaW5wdXRbdHlwZT1idXR0b25de2Rpc3BsYXk6bm9uZX06cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXI+aW1ne3Bvc2l0aW9uOmFic29sdXRlO3RvcDouNGVtO3JpZ2h0Oi41ZW19OnJvb3QgLmRlYWRsaW5lLWNhbGVuZGFyPmlucHV0W3R5cGU9dGV4dF17cGFkZGluZy1yaWdodDozMHB4fS50YXNrLXJvdy0yIC50aW1lLWJsb2NrPmRpdjphZnRlcntjb250ZW50OlxcXCJcXFxcNDNDXFxcXDQzOFxcXFw0M0RcXFwiO21hcmdpbi1sZWZ0Oi41ZW07ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfS53b3JrZXItYmxvY2sgc2VsZWN0e3dpZHRoOjEwMCU7bWFyZ2luOi41ZW0gMCAwfS50YXNrLWZpZWxkcy1yb3cgLmZyb3ctY29sLTItMnt3aWR0aDoxMjBweH0udGFzay1maWVsZHMtcm93IC5mcm93LWNvbC0yLTF7d2lkdGg6MTkwcHg7bWFyZ2luLXJpZ2h0OjMwcHh9LnRhc2stZmllbGRzLXJvdyB0ZHtwYWRkaW5nOjA7Zm9udC1zaXplOjEwMCU7ZGlzcGxheTpibG9ja30udGFzay1maWVsZHMtcm93IHNlbGVjdHtwYWRkaW5nOi4zZW0gMCAuM2VtIC4yZW19LnRhc2stZmllbGRzLXJvdyBpbnB1dC5pbnB1dF9maWVsZCwudGFzay1maWVsZHMtcm93IGlucHV0W3R5cGU9dGV4dF0sLnRhc2stZmllbGRzLXJvdyBzZWxlY3R7d2lkdGg6YXV0bzttYXgtd2lkdGg6MTAwJTtoZWlnaHQ6MmVtO3BhZGRpbmc6LjNlbSAuNmVtO2JvcmRlcjoxcHggc29saWQgIzllOWU5ZTtkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0udGFzay1maWVsZHMtcm93IGlucHV0LmlucHV0X2ZpZWxkOmZvY3VzLC50YXNrLWZpZWxkcy1yb3cgaW5wdXRbdHlwZT10ZXh0XTpmb2N1cywudGFzay1maWVsZHMtcm93IHNlbGVjdDpmb2N1c3tib3JkZXItY29sb3I6IzI2YTY5YX0uY29udGVudHtcXHJcXG4gICAgLyrRg9Cx0LjRgNCw0Y4g0LvQuNGI0L3QuNC1INC+0YLRgdGC0YPQv9GLINC4IGJyINGH0YLQvtCx0Ysg0YPQvNC10L3RjNGI0LjRgtGMINC00YvRgNGDINC/0L7QtCDQv9C+0LvRj9C80Lgg0LrQsNC80LXQvdGC0LAqL3BhZGRpbmctYm90dG9tOjB9XFxyXFxuXFxyXFxuLyog0L/RgNC10LLRgNCw0YnQsNGOINCy0YHQtSDQsiDQsdC70L7QutC4Ki8jdGJsLW5ldy1jb21tZW50IHRib2R5LCN0YmwtbmV3LWNvbW1lbnQgdGQsI3RibC1uZXctY29tbWVudCB0cntkaXNwbGF5OmJsb2NrfVxcclxcblxcclxcbi8q0YHQutGA0YvQstCw0Y4g0L/QtdGA0LLRg9GOINGP0YfQtdC50LrRgyDRgSDRgtC10LrRgdGC0L7QvCDQotC10LrRgdGCKi8jdGJsLW5ldy1jb21tZW50IHRyOmZpcnN0LWNoaWxkPnRkOmZpcnN0LWNoaWxke2Rpc3BsYXk6bm9uZX0jdGJsLW5ldy1jb21tZW50K2Jye1xcclxcbiAgICAvKtGD0LHQuNGA0LDRjiDQu9C40YjQvdC40LUg0L7RgtGB0YLRg9C/0Ysg0LggYnIg0YfRgtC+0LHRiyDRg9C80LXQvdGM0YjQuNGC0Ywg0LTRi9GA0YMg0L/QvtC0INC/0L7Qu9GP0LzQuCDQutCw0LzQtdC90YLQsCovZGlzcGxheTpub25lfVxcclxcblxcclxcbi8q0LLRi9GA0L7QstC90Y/RgtGMINC90L7QstGL0Lkg0LrQsNC80LXQvdGCINC/0L4g0LrQsNGA0YLQvtGH0LrQsNC8INC60LDQvNC10L3RgtC+0LIqLyNuZXctY29tbWVudC13cmFwe21heC13aWR0aDo3MjBweDttYXJnaW46YXV0b31cXHJcXG5cXHJcXG4vKnRleHRhcmVhKi9cXHJcXG5cXHJcXG4vKtC30LDQs9C+0LvQvtCy0L7QuiDQlNC+0LHQsNCy0LjRgtGMINC60L7QvNC80LXQvdGC0LDRgNC40LkqLy50bHtkaXNwbGF5Om5vbmV9XFxyXFxuXFxyXFxuLyrQvtCx0LXRgNGC0LrQsCDQstC+0LrRgNGD0LMg0L/QvtC70Y8g0JTQvtCx0LDQstC40YLRjCDQutC+0LzQvNC10L3RgtCw0YDQuNC5Ki8udGFyZWEtd3JhcHtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59I3RleHR7d2lkdGg6MTAwJTtwYWRkaW5nOi42ZW0gLjhlbTtmb250LWZhbWlseTppbmhlcml0O2ZvbnQtc2l6ZToxNHB4O2JvcmRlcjowO2JveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2hhZG93Omluc2V0IDAgLTJweCAycHggMCByZ2JhKDAsMCwwLC4xNCksaW5zZXQgMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpLGluc2V0IDAgM3B4IDFweCAtMnB4IHJnYmEoMCwwLDAsLjIpfVxcclxcblxcclxcbi8q0L7RhNC+0YDQvNC70LXQvdC40LUg0L/QvtC70LXQuSDQuCDRgdGC0YDQvtC6INGBINC/0L7Qu9GP0LzQuCDQv9C+0LQg0L/QvtC70LXQvCDQutCw0LzQtdC90YLQsCovLnRhc2stZmllbGRzLXJvd3ttYXgtd2lkdGg6NzIwcHg7bWFyZ2luOjEuNmVtIGF1dG99LnRhc2stZmllbGRzLXJvdyBsYWJlbHttYXJnaW46MCAwIC41ZW07Y29sb3I6Z3JheTtkaXNwbGF5OmlubGluZS1ibG9ja31cXHJcXG5cXHJcXG4vKiAxINGB0YLRgNC+0LrQsCAqLy50YXNrLXJvdy0xe2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4XFxyXFxuICAgIC8qanVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyovfS53b3JrZXItYmxvY2t7d2lkdGg6MzAwcHg7bWFyZ2luLXJpZ2h0OjcwcHg7LW1zLWZsZXg6MCAwIDMwMHB4O2ZsZXg6MCAwIDMwMHB4fS53b3JrZXItYmxvY2sgaW5wdXRbdHlwZT1yYWRpb117ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotLjJlbX1cXHJcXG5cXHJcXG4vKiAyINGB0YLRgNC+0LrQsCAqLy50YXNrLXJvdy0ye2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4XFxyXFxuICAgIC8qanVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyovfS50YXNrLXJvdy0yIC50aW1lLWJsb2Nre3dpZHRoOjMwMHB4O21hcmdpbi1yaWdodDo3MHB4Oy1tcy1mbGV4OjAgMCAzMDBweDtmbGV4OjAgMCAzMDBweDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59LnRhc2stcm93LTIgLnRpbWUtYmxvY2s+ZGl2e3dpZHRoOjEyMHB4fS50YXNrLXJvdy0yIC50aW1lLWJsb2NrPmRpdiBpbnB1dHt3aWR0aDo3NiU7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfTpyb290IC5kZWFkbGluZS1jYWxlbmRhcntwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjAhaW1wb3J0YW50O2ZvbnQtc2l6ZToxMDAlXFxyXFxuICAgIC8qZmxleDogMSAxIDE4MHB4OyovfTpyb290IC5kZWFkbGluZS1jYWxlbmRhcj5pbWcsOnJvb3QgLmRlYWRsaW5lLWNhbGVuZGFyPmlucHV0e2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOnRvcDtib3gtc2l6aW5nOmJvcmRlci1ib3h9XFxyXFxuXFxyXFxuLyogMyDRgdGC0YDQvtC60LAgKi8udGFzay1yb3ctM3tkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleFxcclxcbiAgICAvKmp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsqL30uYWRkLWVtYWlse3dpZHRoOjMwMHB4O21hcmdpbi1yaWdodDo3MHB4Oy1tcy1mbGV4OjAgMCAzMDBweDtmbGV4OjAgMCAzMDBweDtwb3NpdGlvbjpyZWxhdGl2ZX0uYWRkLWVtYWlsIGF7ZGlzcGxheTpub25lfS5lbWFpbC1zZW5kLWxpc3R7bWFyZ2luOi40ZW0gMCAuNWVtO3BhZGRpbmc6MDtsaXN0LXN0eWxlLXR5cGU6bm9uZX0uZW1haWwtc2VuZC1saXN0Pmxpe21hcmdpbjowO2xpbmUtaGVpZ2h0OjF9LmVtYWlsLXNlbmQtbGlzdD5saTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEI3XFxcIjtmb250LXNpemU6MS41ZW07bWFyZ2luLXJpZ2h0Oi4yZW07ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfS50YXNrLXR5cGV7XFxyXFxuXFxyXFxuICAgIC8q0LIg0LTQuNCy0LDRhSDQv9GA0Y/Rh9GD0YLRjNGB0Y8g0YHQtdC70LXQutGC0Ysg0YEg0L/QvtC00YLQuNC/0LDQvNC4Ki99LnRhc2stdHlwZSBzZWxlY3R7bWluLXdpZHRoOjE5MHB4fVxcclxcblxcclxcbi8qIDQg0YHRgtGA0L7QutCwICovLmFkZC1maWxlc3tcXHJcXG5cXHJcXG4gICAgLyrQv9C+INC60LvQuNC60YMg0L3QsCDRjdGC0YMg0YHRgdGL0LvQutGDINGB0L7Qt9C00LDQstCw0LvRgdGPINC90L7QstGL0LkgZmlsZSBpbnB1dFxcclxcbiAgICDRgdC60YDQvtGOINC10LUsINCwINGB0L7QsdGL0YLQuNC1INC/0L7QstC10YjRgyDQvdCwIGNoYW5nZSDRgdCw0LzQvtCz0L4g0LjQvdC/0YPRgtCwKi99LmFkZC1maWxlcyBhe2Rpc3BsYXk6bm9uZVxcclxcbiAgICAgICAgLyptYXJnaW4tdG9wOiAuOGVtO1xcclxcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyovfSNGaWxlSW5wdXRzIGlucHV0Om5vdCg6Zmlyc3QtY2hpbGQpe21hcmdpbi10b3A6LjNlbTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmJ0bi1yZW1vdmUtaXRlbXt3aWR0aDoxMnB4O2hlaWdodDoxOHB4O21hcmdpbi1sZWZ0Oi4zZW07Y29sb3I6cmVkO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcn0uYnRuLXJlbW92ZS1pdGVtOmFmdGVye2NvbnRlbnQ6XFxcIlxcXFwxRjdBOVxcXCI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowfS5mYWtlLWZpbGUtaW5wdXR7d2lkdGg6MjI1cHg7aGVpZ2h0OjYwcHg7Ym9yZGVyOjFweCBkYXNoZWQgIzgyYTVjMztiYWNrZ3JvdW5kOiNmNGY2Zjg7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXJhZGl1czouNWVtO3Bvc2l0aW9uOnJlbGF0aXZlfS5mYWtlLWZpbGUtaW5wdXQuaXMtaG92ZXJ7YmFja2dyb3VuZDojZDJkY2U1fS5maWxlcy1saXN0e21hcmdpbjotLjVlbSAwIC41ZW07cGFkZGluZzowO2xpc3Qtc3R5bGUtdHlwZTpub25lO3RyYW5zaXRpb246aGVpZ2h0IC4zc30uZmlsZXMtbGlzdCAuZmlsZS1saXN0LWl0ZW17bWFyZ2luOi40ZW0gMH0uZmlsZXMtbGlzdCAuZmlsZS1saXN0LWl0ZW0gLnMtaW5mb3twYWRkaW5nLWxlZnQ6LjZlbTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9XFxyXFxuXFxyXFxuLyrRgdC60YDRi9Cy0LDRjiDQv9GD0YHRgtGL0LUg0Y/Rh9C10LnQutC4LCDQv9C+0LvRjyDQuNC3INC90LjRhSDQv9C10YDQtdC80LXRidC10L3RiyDQsiDQvdC+0LLRi9C5INCx0LvQvtC6ICNuZXctY29tbWVudC13cmFwKi8jdGFzay1mb290ZXIgdGJvZHksI3Rhc2stZm9vdGVyIHRkLCN0YXNrLWZvb3RlciB0cntkaXNwbGF5OmJsb2NrfVxcclxcblxcclxcbi8q0LrQvdC+0L/QutCwINGB0L7RhdGA0LDQvdC40YLRjCovLmJ0bi1hY3Rpb257aGVpZ2h0OjM2cHg7cGFkZGluZzowIDEuNmVtO2ZvbnQtc2l6ZToxNHB4O2NvbG9yOiNmZmY7Ym9yZGVyOjA7Ym9yZGVyLXJhZGl1czo0cHg7YmFja2dyb3VuZDojN2ViNTE5O2N1cnNvcjpwb2ludGVyfVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/e1wiaW1wb3J0TG9hZGVyc1wiOjF9IS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYiEuL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgZWxlbXNNb2RpZmljYXRpb24nKTtcclxufVxyXG5cclxuaW1wb3J0IHttb2RpZnlTZWxlY3RPcHRpb25zTGlzdCxmaW5kSW5BcnJheX0gZnJvbSAnLi9fdXRpbHMuanMnO1xyXG5pbXBvcnQge2dldEFsbENvbW1lbnRzUm93cyxnZXRBbGxXb3JrZXJzfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbi8v0LjQt9C80LXQvdC10L3QuNC1INGN0LvQtdC80LXQvdGC0L7QsiDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0LfQsNC00LDRh9C4XHJcbi8v0LIg0YHQvtC+0YLQstC10YLRgdCy0LjQuCDRgSDQvdCw0YHRgtGA0L7QudC60LDQvNC4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG5mdW5jdGlvbiBlbGVtc01vZGlmaWNhdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgZGFydF93b3JrZXJzX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50ZXJuYWxfd29ya2VyJyk7XHJcblxyXG4gICAgLy/RgdGA0LDQstC90LjQstCw0LXQvCDRgdC/0LjRgdC+0Log0L/RgNC+0LXQutGC0L7QsiDRgSDRgdC+0YXRgNCw0L3QtdC90L3Ri9C8INCyINC90LDRgdGC0YDQvtC50LrQsNGFXHJcbiAgICAvL9C/0YDQvtC10LrRgtGLINC60L7RgtC+0YDRi9GFINC90LXRgiDQsiDQvdCw0YHRgtGA0L7QudC60LAg0YHQutGA0YvQstCw0LXQvFxyXG4gICAgdGhpcy5tb2RpZnlQcm9qZWN0TGlzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgcGFyYW1zX3VzZXJfcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYXJhbXNfdXNlcl9wcm9qZWN0cycpKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtc191c2VyX3Byb2plY3RzID09PSBudWxsIHx8ICFwYXJhbXNfdXNlcl9wcm9qZWN0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygn0J3QtdGCINGB0L7QsdGB0YLQstC10L3QvdC+0LPQviDRgdC/0LjRgdC60LAg0L/RgNC+0LXQutGC0L7QsicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXJ0X3Byb2plY3RzX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdF9pZCcpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGllbnRfaWQnKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IGRhcnRfcHJvamVjdHNfbGlzdC5vcHRpb25zO1xyXG5cclxuICAgICAgICBtb2RpZnlTZWxlY3RPcHRpb25zTGlzdChvcHRpb25zLCBwYXJhbXNfdXNlcl9wcm9qZWN0cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v0YHRgNCw0LLQvdC40LLQsNC10Lwg0YHQv9C40YHQvtC6INC40YHQv9C+0LvQvdC40YLQtdC70LXQuSDRgSDRgdC+0YXRgNCw0L3QtdC90L3Ri9C8INCyINC90LDRgdGC0YDQvtC50LrQsNGFXHJcbiAgICAvL9C40YHQv9C+0LvQvdC40YLQtdC70LXQuSDQutC+0YLQvtGA0YvRhSDQvdC10YIg0LIg0L3QsNGB0YLRgNC+0LnQutCwINGB0LrRgNGL0LLQsNC10LxcclxuICAgIHRoaXMubW9kaWZ5V29ya2Vyc0xpc3QgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXNfdXNlcl93b3JrZXJzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFyYW1zX3VzZXJfd29ya2VycycpKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtc191c2VyX3dvcmtlcnMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygn0J3QtdGCINGB0L7QsdGB0YLQstC10L3QvdC+0LPQviDRgdC/0LjRgdC60LAg0YHQvtGC0YDRg9C00L3QuNC60L7QsicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBhcmFtc191c2VyX3dvcmtlcnMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbGV0IGRhcnRfd29ya2Vyc19saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludGVybmFsX3dvcmtlcicpO1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyA9IGRhcnRfd29ya2Vyc19saXN0Lm9wdGlvbnM7IC8v0YHQv9C40YHQvtC6INCy0YHQtdGFINGB0L7RgtGA0YPQtNC90LjQutC+0LIg0LjQtyDRgdC10LvQtdC60YLQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHJcbiAgICAgICAgLy/QtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60LjQuSDRgdC/0LjRgdC+0Log0YHQvtGC0YDRg9C00L3QuNC60L7QsiDQvdC1INC/0YPRgdGCXHJcbiAgICAgICAgLy/QuCDQtdGB0LvQuCDQsiDQt9Cw0LTQsNGH0LUg0YPRh9Cw0YHRgtCy0YPQtdGCINGB0L7RgtGA0YPQtNC90LjQuiDQutC+0YLQvtGA0L7Qs9C+INC90LXRgiDQsiDRgdC/0LjRgdC60LUg0L7RgdGC0LDQstC70Y/RjiDQtdCz0L4g0L7RgtC60YDRi9GC0YvQvFxyXG4gICAgICAgIGlmIChwYXJhbXNfdXNlcl93b3JrZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvL9C/0L7Qu9GD0YfQsNGOINGB0L/QuNGB0L7QuiDQstGB0LXRhSDRg9GH0LDRgdGC0L3QuNC60L7QsiDQt9Cw0LTQsNGH0LhcclxuICAgICAgICAgICAgbGV0IHRhc2tfd29ya2VycyA9IGdldEFsbFdvcmtlcnMoKTtcclxuICAgICAgICAgICAgbGV0IHRhc2tfd29ya2Vyc19pZCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy/RgdGA0LDQstC90LXQvdC40LUg0YHQv9C40YHQutC+0LIsINC10YHQu9C4INGA0LDQsdC+0YLQvdC40LrQsCDQvdC10YIg0LIg0YHQv9C40YHQutC1INC40Lcg0L3QsNGB0YLRgNC+0LXQuiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8gLSDQtNC+0LHQsNCy0LvRj9GOXHJcbiAgICAgICAgICAgIC8v0YHQvdCw0YfQsNC70LAg0L3Rg9C20L3QviDQv9C+0LvRg9GH0LjRgtGMINGB0L7QvtGC0LLQtdGC0YHQstC40LUg0LjQvNGPINGB0L7RgtGA0YPQtNC90LjQutCwIC0+IG9wdGlvbi52YWx1ZSDRgi7QtS4g0LvQvtCz0LjQvSDRgdC+0YLRgNGD0LTQvdC40LrQsCDQvdCwINCw0L3Qs9C70LjRhtC60L7QvFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZl9maW5kID0gZmluZEluQXJyYXkodGFza193b3JrZXJzLCBvcHRpb25zW2ldLnRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpZl9maW5kID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXNrX3dvcmtlcnNfaWQucHVzaChvcHRpb25zW2ldLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL9C30LDRgtC10Lwg0YHRgNCw0LLQvdC40YLRjCDRgdC+INGB0L/QuNGB0LrQvtC8INC40Lcg0L3QsNGB0YLRgNC+0LXQulxyXG4gICAgICAgICAgICAvL9C4INC00L7QsdCw0LLQuNGC0Ywg0YDQsNCx0L7RgtC90LjQutCwINC10YHQu9C4INC10LPQviDQvdC10YIg0LIg0YHQv9C40YHQutC1XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza193b3JrZXJzX2lkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWZfZmluZCA9IGZpbmRJbkFycmF5KHBhcmFtc191c2VyX3dvcmtlcnMsIHRhc2tfd29ya2Vyc19pZFtpXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlmX2ZpbmQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zX3VzZXJfd29ya2Vycy5wdXNoKHRhc2tfd29ya2Vyc19pZFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ9CSINGB0L/QuNGB0L7QuiDQtNC+0LHQsNCy0LvQtdC9ICcrIHRhc2tfd29ya2Vyc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1vZGlmeVNlbGVjdE9wdGlvbnNMaXN0KG9wdGlvbnMsIHBhcmFtc191c2VyX3dvcmtlcnMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy/QsiDRgdC/0LjRgdC60LUg0LjRgdC/0L7Qu9C90LjRgtC10LvQtdC5INC+0YLQvNC10YfQsNGOIHNlbGVjdGVkINGA0LDQsdC+0YLQvdC40LrQsCDQvtGB0YLQsNCy0LjQstGI0LXQs9C+INC/0L7RgdC70LXQtNC90LjQuSDQutC+0LzQvNC10L3RgtGA0LjQuSDQsiDQt9Cw0LTQsNGH0LVcclxuICAgIHRoaXMuc2V0U2VsZWN0ZWRJbldvcmtlcnNMaXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBsYXN0X3JvdyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG4gICAgICAgIGxhc3Rfcm93ID0gbGFzdF9yb3dbbGFzdF9yb3cubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgbGV0IGxhc3Rfd29ya2VyID0gbGFzdF9yb3cuY2hpbGRyZW5bNF0udGV4dENvbnRlbnQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGFydF93b3JrZXJzX2xpc3Qub3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobGFzdF93b3JrZXIgPT09IGRhcnRfd29ya2Vyc19saXN0Lm9wdGlvbnNbaV0udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgZGFydF93b3JrZXJzX2xpc3Qub3B0aW9uc1tpXS5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgLy9maXJlRXZlbnQg0L3Rg9C20LXQvSDRh9GC0L7QsdGLINCy0YvQt9Cy0LDRgtGMINC/0L7QstC10YjQtdC90L3Rg9GOINC90LAg0YHQvtCx0YvRgtC40LUg0YTRg9C90LrRhtC40Y5cclxuICAgICAgICAgICAgICAgIC8v0LIg0LrQvtGC0L7RgNC+0Lkg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDRgNCw0LHQvtGC0L3QuNC6INCyINGB0L/QuNGB0L7QuiDQtNC70Y8g0YDQsNGB0YHRi9C70LrQuCDRgSDQt9Cw0LTQsNGH0LhcclxuICAgICAgICAgICAgICAgIGxldCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xyXG4gICAgICAgICAgICAgICAgZXZ0LmluaXRFdmVudCgnY2hhbmdlJywgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZGFydF93b3JrZXJzX2xpc3QuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRlcm5hbF93b3JrZXInKSkge1xyXG4gICAgICAgIHRoaXMubW9kaWZ5V29ya2Vyc0xpc3QoKTtcclxuICAgICAgICB0aGlzLnNldFNlbGVjdGVkSW5Xb3JrZXJzTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdF9pZCcpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGllbnRfaWQnKSkge1xyXG4gICAgICAgIHRoaXMubW9kaWZ5UHJvamVjdExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQv9C+0LvQtSDQstCy0L7QtNCwIGlkINC30LDQtNCw0YfQuCDQuCDQv9C10YDQtdGF0L7QtCDQuiDQt9Cw0LTQsNGH0LVcclxuXHJcbiAgICBsZXQgZ29Ub0ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvVG8nKTtcclxuICAgIGdvVG9GaWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbn1cclxuXHJcbmV4cG9ydCB7ZWxlbXNNb2RpZmljYXRpb259O1xyXG5cclxuXHJcbmlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIGVsZW1zTW9kaWZpY2F0aW9uJyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9lbGVtc01vZGlmaWNhdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgc2F2ZU5ld0NvbW1lbnQnKTtcclxufVxyXG5cclxuaW1wb3J0IHsgZ2V0VGFza0lkIH0gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcblxyXG4vL9Ch0L7RhdGA0LDQvdC10L3QuNC1INC60L7QvNC80LXQvdGC0LDRgNC40Y8g0LIgbG9jYWxTdG9yYWdlXHJcbi8v0L3QsCDRgdC70YPRh9Cw0Lkg0LLQvdC10LfQsNC/0L3QvtCz0L4g0LfQstC10YDRiNC10L3QuNGPINGB0LXRgdGB0LjQuFxyXG5mdW5jdGlvbiBzYXZlTmV3Q29tbWVudCgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgJGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQnKTtcclxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhcmVhLXdyYXAnKTtcclxuXHJcbiAgICBsZXQgdGFza19pZCA9IGdldFRhc2tJZCgpO1xyXG5cclxuICAgIC8v0LTQvtCx0LDQstC70Y4g0LrQvdC+0L/QutGDINC00LvRjyDQstGB0YLQsNCy0LrQuCDRgdC+0YXRgNCw0L3QtdC90L3QvtCz0L4g0YLQtdC60YHRgtCwXHJcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQlVUVE9OJyk7XHJcbiAgICBidG4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1pbnNlcnQtbHMnKTtcclxuICAgIGJ0bi5pZCA9J2J0bi1pbnNlcnQtbHMnO1xyXG4gICAgYnRuLmlubmVySFRNTCA9ICfQktGB0YLQsNCy0LjRgtGMINC40LcgTFMnO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ25vbmUnKTsgLy/Qv9C+INGD0LzQvtC70YfQsNC90LjRjiDRgdC60YDRi9GC0LBcclxuXHJcbiAgICB3cmFwLmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgLy/QtdGB0LvQuCDQtdGB0YLRjCDRgdC+0YXRgNCw0L3QtdC90L3Ri9C5INGC0LXQutGB0YIgLSDQv9C+0LrQsNC30LDRgtGMINC60L3QvtC/0LrRg1xyXG4gICAgc2hvd1Bhc3RlQnRuKGJ0biwgdGFza19pZCk7XHJcblxyXG4gICAgLy/QstGB0YLQsNCy0LjRgtGMINGC0LXQutGB0YIg0L/QviDQutC70LjQutGDXHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICRmaWVsZC52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrJyArIHRhc2tfaWQpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8v0KHQvtGF0YDQsNC90LjRgtGMINGC0LXQutGB0YIg0LjQtyDQv9C+0LvRjyDQv9GA0Lgg0L3QsNCx0L7RgNC1INC40LvQuCDQv9C+0YLQtdGA0LUg0YTQvtC60YPRgdCwXHJcbiAgICAkZmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzYXZlVGFza0NvbW1lbnQpO1xyXG5cclxuICAgIC8v0LXRgdC70Lgg0LXRgdGC0Ywg0YHQvtGF0YDQsNC90LXQvdC90YvQuSDRgtC10LrRgdGCIC0g0L/QvtC60LDQt9Cw0YLRjCDQutC90L7Qv9C60YNcclxuICAgICRmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNob3dQYXN0ZUJ0bihidG4sIHRhc2tfaWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzYXZlVGFza0NvbW1lbnQoKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2snICsgdGFza19pZCwgdGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd1Bhc3RlQnRuKGJ1dHRvbiwgaWQpIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2snICsgaWQpICE9PSAnJyAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFzaycgKyBpZCkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7c2F2ZU5ld0NvbW1lbnR9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgc2F2ZU5ld0NvbW1lbnQnKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3NhdmVOZXdDb21tZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCBjb3B5UGFzdGVDb21tZW50UXVvdGUnKTtcclxufVxyXG5cclxuaW1wb3J0IHtydW5PbktleXN9IGZyb20gJy4vX3V0aWxzLmpzJztcclxuaW1wb3J0IHtnZXRBbGxDYW1tZW50c30gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcblxyXG4vL9Cy0YvQtNC10LvQtdC90LjQtSDRgtC10LrRgdGC0LAg0LIg0LrQsNC80LXQvdGC0LUg0Lgg0LLRgdGC0LDQstC60LAg0L7RhNC+0YDQvNC70LXQvdC90LDRjyDQutCw0Log0YbQuNGC0LDRgtCwINC00LvRjyBtYXJrZG93blxyXG5mdW5jdGlvbiBjb3B5UGFzdGVDb21tZW50UXVvdGUgKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBjYW1tZW50cyA9IEFycmF5LmZyb20oZ2V0QWxsQ2FtbWVudHMoKSk7XHJcblxyXG4gICAgY2FtbWVudHMubWFwKGZ1bmN0aW9uIChjYW1tZW50KSB7XHJcbiAgICAgICAgY2FtbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NlbGVjdGlvbicsc2VsZWN0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBlZGl0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZvcm1hdEFuZEluc2V0Q29tbWVudFF1b3RlKGVsZW0pIHtcclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0aW9uJykpe1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRQb3MgPSBlbGVtLnNlbGVjdGlvblN0YXJ0O1xyXG4gICAgICAgICAgICBsZXQgZW5kUG9zID0gZWxlbS5zZWxlY3Rpb25FbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NlbGVjdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0cmluZ3MgPSBzZWxlY3Rpb24uc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICAgICAgc3RyaW5ncyA9IHN0cmluZ3MubWFwKGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAgICAgICAgICByZXR1cm4gJz4gJytzdHI7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gc3RyaW5ncy5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNlbGVjdGlvbiA9ICdcXG4nK3NlbGVjdGlvbisnXFxuJztcclxuXHJcbiAgICAgICAgICAgIGVsZW0udmFsdWUgPSBlbGVtLnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcylcclxuICAgICAgICAgICAgICAgICsgc2VsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICArIGVsZW0udmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgZWxlbS52YWx1ZS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3NlbGVjdGlvbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBydW5PbktleXMoXHJcbiAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVkaXRvcil7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRBbmRJbnNldENvbW1lbnRRdW90ZShlZGl0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZGl0b3JcclxuICAgICAgICAsXHJcbiAgICAgICAgXCIxNlwiLFxyXG4gICAgICAgIFwiMTdcIixcclxuICAgICAgICBcIlZcIi5jaGFyQ29kZUF0KDApXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQge2NvcHlQYXN0ZUNvbW1lbnRRdW90ZX07XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBjb3B5UGFzdGVDb21tZW50UXVvdGUnKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvcHlQYXN0ZUNvbW1lbnRRdW90ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgdXBkYXRlTm90aWZ5Jyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0VGFza0lkfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuaW1wb3J0IHtkZWNsT2ZOdW0sbG9hZEJ5QWpheH0gZnJvbSAnLi9fdXRpbHMuanMnO1xyXG5cclxuZnVuY3Rpb24gdGFza1VwZGF0ZU5vdGlmeSAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IHBhZ2VVcmwgPSB3aW5kb3cubG9jYXRpb247XHJcbiAgICBsZXQgdGFza0lkID0gZ2V0VGFza0lkKCk7XHJcblxyXG4gICAgLy/QtNC+0LHQsNCy0LvQtdC90LjQtSDQutC90L7Qv9C60Lgg0L/QvtC00L/QuNGB0LrQuCDQvdCwINGD0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutCw0LzQtdC90YLQsNGFINCyINC30LDQtNCw0YfQtVxyXG4gICAgbGV0IGFsZXJ0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBhbGVydEJ0bi5pZCA9ICd1cGQtYWxlcnQnO1xyXG4gICAgYWxlcnRCdG4uY2xhc3NMaXN0LmFkZCgnYWRkLWFsZXJ0Jyk7XHJcbiAgICBhbGVydEJ0bi50aXRsZSA9ICfQn9C+0LTQv9C40YHQsNGC0YzRgdGPINC90LAg0YPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y/RhSc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10aXRsZScpLmluc2VydEJlZm9yZShhbGVydEJ0biwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YnNjcmliZUVsZW1lbnQnKSk7XHJcblxyXG4gICAgYWxlcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgY2hlY2tDb21tZW50c1VwZGF0ZSh0aGlzLHRhc2tJZCxlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNoZWNrQ29tbWVudHNVcGRhdGUoYWxlcnRCdG4sdGFza0lkKTtcclxuXHJcbiAgICAvL9C30LDQv9GD0YHQuiDQuNC90YLQtdGA0LLQsNC70LAg0L/RgNC+0LLQtdGA0LrQuCDQuNC30LzQtdC90LXQvdC40Lkg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblxyXG4gICAgbGV0IG5vdGlmeUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxvYWRCeUFqYXgocGFnZVVybCxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrVXBkYXRlKGRhdGEsdGFza0lkKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0sIDEwMDAgKiA2MCAqIDUpO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1VwZGF0ZShhamF4cmVzcG9uc2UsaWQpIHtcclxuICAgICAgICBsZXQgY29tbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtdGJsJykucXVlcnlTZWxlY3RvckFsbCgnLmItY29tbWVudCcpO1xyXG4gICAgICAgIGxldCBjb21tZW50c051bSA9IGNvbW1lbnRzLmxlbmd0aDtcclxuXHJcblxyXG4gICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XHJcbiAgICAgICAgbGV0IGh0bWxEb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGFqYXhyZXNwb25zZS50cmltKCksXCJ0ZXh0L2h0bWxcIik7XHJcbiAgICAgICAgbGV0IHRibCA9IGh0bWxEb2MuYm9keS5xdWVyeVNlbGVjdG9yKCdmb3JtW25hbWU9dGhlRm9ybV0nKS5maXJzdEVsZW1lbnRDaGlsZDtcclxuXHJcblxyXG4gICAgICAgIGxldCB1cGxvYWRlZENvbW1lbnRzID0gdGJsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyJyk7XHJcblxyXG4gICAgICAgIGxldCBmaWx0ZXJlZENvbW1lbnRzID0gQXJyYXkuZnJvbSh1cGxvYWRlZENvbW1lbnRzKS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucXVlcnlTZWxlY3RvckFsbCgndGQnKS5sZW5ndGggPiAxO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAtIDEg0YIu0LouINC90YPQttC90L4g0YPQsdGA0LDRgtGMINC/0LXRgNCy0YPRjiDRgdGC0YDQvtC60YMg0YEg0L3QsNC30LLQsNC90LjRj9C80Lgg0YHRgtC+0LvQsdGG0L7QslxyXG4gICAgICAgIGxldCB1cGRDb21tZW50TnVtID0gZmlsdGVyZWRDb21tZW50cy5sZW5ndGggLSAxO1xyXG5cclxuXHJcbiAgICAgICAgaWYodXBkQ29tbWVudE51bSA+IGNvbW1lbnRzTnVtKXtcclxuICAgICAgICAgICAgbGV0IG5Db21tZW50cyA9IHVwZENvbW1lbnROdW0gLSBjb21tZW50c051bTtcclxuICAgICAgICAgICAgbGV0IGxhc3RJZCA9IGNvbW1lbnRzW2NvbW1lbnRzTnVtIC0gMV0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1jaGVja2JveF0nKS5pZC5zcGxpdCgnXycpWzFdO1xyXG5cclxuICAgICAgICAgICAgY3JlYXRlT25QYWdlTm90aWZ5KG5Db21tZW50cyxsYXN0SWQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoZWNrVXBhZGF0ZU9wdGlvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb21tZW50cy11cGRhdGUnK2lkKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGNoZWNrVXBhZGF0ZU9wdGlvbiAmJiBjaGVja1VwYWRhdGVPcHRpb24gPT09ICd0cnVlJyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm90aWZ5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICfQndC+0LLRi9C5INC60L7QvNC80LXQvdGC0LDRgNC40LknLFxyXG4gICAgICAgICAgICAgICAgICAgICd0YWcnOiAnbmV3LWNvbW1lbnQtJytpZCxcclxuICAgICAgICAgICAgICAgICAgICAnYm9keSc6IGh0bWxEb2MucXVlcnlTZWxlY3RvcignaDEgPiBmb250JykudGV4dENvbnRlbnQudHJpbSgpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIG5vdGlmeU1lKG5vdGlmeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g0L7Rh9C40YHRgtC60LAg0LjQvdGC0LXRgNCy0LDQu9CwIC0g0L7RgtC60LvRjtGH0LXQvdC40LUg0YPQstC10LTQvtC80LvQtdC90LjQuSDQv9C+INC60LvQuNC60YMg0L3QsCDRg9Cy0LXQtNC+0LzQu9C10L3QuNC4XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgbm90aWZpY2F0aW9uID0gbm90aWZ5TWUobm90aWZ5KTtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyBpZihub3RpZmljYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIG5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2xlYXJJbnRlcnZhbChub3RpZnlJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBub3RpZnlNZShub3RpZnkpIHtcclxuICAgICAgICBsZXQgbm90aWZpY2F0aW9uO1xyXG5cclxuICAgICAgICBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT09IFwiZ3JhbnRlZFwiKSB7XHJcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24obm90aWZ5LnRpdGxlLCB7dGFnOiBub3RpZnkudGFnLCBib2R5OiBub3RpZnkuYm9keX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiAhPT0gJ2RlbmllZCcpIHtcclxuICAgICAgICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKGZ1bmN0aW9uIChwZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGVybWlzc2lvbiA9PT0gXCJncmFudGVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKG5vdGlmeS50aXRsZSwge3RhZzogbm90aWZ5LnRhZywgYm9keTogbm90aWZ5LmJvZHl9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9uUGFnZU5vdGlmeShudW0sbGlua0lkKSB7XHJcbiAgICAgICAgbGV0IG5vdGlmeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlLW5vdGlmeScpO1xyXG5cclxuICAgICAgICBpZighbm90aWZ5KXtcclxuICAgICAgICAgICAgbm90aWZ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtdGVtcGxhdGUnKS5jbG9uZU5vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICBub3RpZnkuaWQgPSAncGFnZS1ub3RpZnknO1xyXG4gICAgICAgICAgICBub3RpZnkuY2xhc3NMaXN0LmFkZCgnYi1jb21tZW50X25vdGlmeScpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtdGJsJykuYXBwZW5kQ2hpbGQobm90aWZ5KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm90aWZ5LnRleHRDb250ZW50ID0gJ9CSINC30LDQtNCw0YfQtSAnK251bSsnICcrZGVjbE9mTnVtKG51bSwgWyfQvdC+0LLRi9C5INC60L7QvNC80LXQvdGC0LDRgNC40LknLCfQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y8nLCfQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40LXQsiddKTtcclxuXHJcbiAgICAgICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgbGluay5ocmVmID0gd2luZG93LmxvY2F0aW9uKycjJytsaW5rSWQ7XHJcbiAgICAgICAgbGluay50YXJnZXQgPSAnX3NlbGYnO1xyXG4gICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgncmVndWxhci1saW5rJywnY29tbWVudHMtdXBkYXRlLWxpbmsnKTtcclxuICAgICAgICBsaW5rLnRleHRDb250ZW50ID0gJ9Ce0LHQvdC+0LLQuNGC0Ywg0YHRgtGA0LDQvdC40YbRgyc7XHJcblxyXG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmhyZWY7XHJcbiAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbm90aWZ5LmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuICAgICAgICByZXR1cm4gbm90aWZ5O1xyXG4gICAgfVxyXG5cclxuICAgIC8v0LLQutC70Y7Rh9C40YLRjC/QvtGC0LrQu9GO0YfQuNGC0Ywg0YPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0YDQsNC40Y/RhVxyXG4gICAgLy/QvdCwINC+0YLQutGA0YvRgtC+0Lkg0YHRgtGA0LDQvdC40YbQtSDQt9Cw0LTQsNGH0LhcclxuICAgIGZ1bmN0aW9uIGNoZWNrQ29tbWVudHNVcGRhdGUoYnRuLGlkLGV2ZW50ID0gZmFsc2UpIHtcclxuICAgICAgICBpZihldmVudCl7XHJcbiAgICAgICAgICAgIGlmKGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpe1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScraWQsJ3RydWUnKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY29tbWVudHMtdXBkYXRlJytpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScraWQpID09PSAndHJ1ZScpe1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7dGFza1VwZGF0ZU5vdGlmeX07XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCB1cGRhdGVOb3RpZnknKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Rhc2tVcGRhdGVOb3RpZnkuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8v0L/RgNC+0LrRgNGD0YLQutCwINC6INC60LDQvNC10L3RgtGDINC/0L4g0Y/QutC+0YDRji4g0J3Rg9C20L3QsCDQtdGB0LvQuCDQstGL0LfQstCw0L0gY29tbWVudHNEZXNpZ24oKVxyXG5mdW5jdGlvbiBhbmNob3JMaW5rKCkge1xyXG4gICAgLy/QvtCx0YDQsNCx0L7RgtC60LAg0YHRgdGL0LvQvtC6INGBIGlkINC60LDQvNC10L3RgtCwINCyINGF0LXRiNC1XHJcbiAgICAvL9GCLtC6LiDQuNC3LdC30LAg0LjQt9C80LXQvdC10L3QuNGPINCy0YvRgdC+0YLRiyDQutCw0LzQtdC90YLQvtCyINC4INGB0L7QvtGC0LLQtdGC0YHQstC10L3QvdC+INGB0YLRgNCw0L3QuNGG0Ysg0LIgbW9kdWxlcy5jYW1tZW50c0Rlc2lnbigpXHJcbiAgICAvL9C+0L3QuCDRgNCw0LHQvtGC0LDRjtGCINC90LUg0L/RgNCw0LLQuNC70YzQvdC+XHJcblxyXG4gICAgbGV0IGNhbW1lbnRJZCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG5cclxuICAgIGNhbW1lbnRJZCA9IGNhbW1lbnRJZC5zbGljZSgxLCBjYW1tZW50SWQubGVuZ3RoKTtcclxuXHJcbiAgICAvL9C00L7QsdCw0LLQu9GP0Y4gc2V0VGltZW91dCDRgi7Qui4g0L/QvtC60LAg0L3QtSDQv9GA0LjQtNGD0LzQsNC7INC60LDQuiDQvtGC0LvQvtCy0LjRgtGMXHJcbiAgICAvL9GH0YLQviDQv9C10YDQtdC00LXQu9C60LAg0YHRgtGA0LDQvdC40YbRiyDQt9Cw0LrQvtC90YfQtdC90LAg0Lgg0LLRi9GB0L7RgtCwINC4INC/0L7Qt9C40YbQuNGPINC60LDQvNC10L3RgtCwXHJcbiAgICAvL9C6INC60L7RgtC+0YDQvtC80YMg0L3Rg9C20L3QviDQv9GA0L7QutGA0YPRgtC40YLRjCDQsdGD0LTQtdGCINGA0LDRgdGB0YfQuNGC0LDQvdCwINC/0YDQsNCy0LjQu9GM0L3QvlxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNhbW1lbnRJZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ2FuY2hvckxpbmsgc3RhcnQnKTtcclxuICAgICAgICAgICAgLy/QuNGJ0YMg0YHQutGA0YvRgtGL0Lkg0YfQtdC60LHQvtC60YEg0YEgaWQg0Lgg0L7RgiDQvdC10LPQviDQstCy0LXRgNGFINC00L4g0LrQsNGA0YLQvtGH0LrQuCDQutCw0LzQtdC90YLQsCBiLWNvbW1lbnRcclxuICAgICAgICAgICAgbGV0IGNhbW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hlY2tib3hfJyArIGNhbW1lbnRJZCkucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IGNhbW1lbnQub2Zmc2V0VG9wO1xyXG5cclxuICAgICAgICAgICAgYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcclxuICAgICAgICAgICAgICAgIHRpbWluZzogZnVuY3Rpb24gKHRpbWVGcmFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aW1lRnJhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZHJhdzogZnVuY3Rpb24gKHByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9ZKGRpc3RhbmNlLCBwcm9ncmVzcylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgNjAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYW5pbWF0ZShvcHRpb25zKSB7XHJcbiAgICBsZXQgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gYW5pbWF0ZSh0aW1lKSB7XHJcbiAgICAgICAgbGV0IHRpbWVGcmFjdGlvbiA9ICh0aW1lIC0gc3RhcnQpIC8gb3B0aW9ucy5kdXJhdGlvbjtcclxuICAgICAgICBpZiAodGltZUZyYWN0aW9uID4gMSkgdGltZUZyYWN0aW9uID0gMTtcclxuXHJcbiAgICAgICAgbGV0IHByb2dyZXNzID0gb3B0aW9ucy50aW1pbmcodGltZUZyYWN0aW9uKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucy5kcmF3KHByb2dyZXNzKTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVGcmFjdGlvbiA8IDEpIHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2Nyb2xsVG9ZKGRpc3RhbnNlLCBwcm9ncmVzcykge1xyXG4gICAgbGV0IHNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbFkgKyAoKGRpc3RhbnNlIC0gc2Nyb2xsWSkgKiBwcm9ncmVzcykpO1xyXG59XHJcblxyXG5leHBvcnQge2FuY2hvckxpbmt9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2FuY2hvckxpbmsuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vINC00L7QsdCw0LLQu9C10L3QuNC1INC90LAg0YHRgtGA0LDQvdC40YbRgyDQvdC+0LLQvtC5INC30LDQtNCw0YfQuCDQsdC70L7QutCwINC90LDRgdGC0YDQvtC10Log0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXHJcblxyXG5pbXBvcnQge2FkZGpzfSBmcm9tICcuL19sb2FkZXJzLmpzJztcclxuXHJcbmZ1bmN0aW9uIHVzZXJTZXR0aW5ncygpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIC8v0LTQvtCx0LDQstC70LXQvdC40LUv0YPQtNCw0LvQtdC90LjQtSDQstGL0LHRgNCw0L3QvdGL0YUg0L/RgNC+0LXQutGC0L7QsiDQsiDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60L7QvCDRgdC/0LjRgdC60LVcclxuICAgIC8v0YHQvtGF0YDQsNC90LXQvdC40LUg0LIgbG9jYWxTdG9yYWdlINC4INGB0LrRgNGL0YLRjCDQv9C+0LrQsNC30LDRgtGMINCyIHNlbGVjdCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuICAgIGxldCAkY29udGVudF9jZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybVtuYW1lPVwidGhlRm9ybVwiXScpO1xyXG5cclxuICAgIC8v0YHQvtC30LTQsNC90LjQtSDQsdC70L7QutCwINCyINC60L7RgtC+0YDQvtC8INCx0YPQtNGD0YIg0LLRgdC1INGN0LvQtdC80LXQvdGC0Ysg0YPQv9GA0LDQstC70LXQvdC40Y8g0L3QsNGB0YLRgNC+0LnQutCw0LzQuFxyXG4gICAgbGV0ICR1c2VyX3NldHRpbmdzX2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgJHVzZXJfc2V0dGluZ3NfYm94LmlkID0gJ3NldHRpbmdzLWJveCc7XHJcbiAgICAkY29udGVudF9jZWxsLmluc2VydEJlZm9yZSgkdXNlcl9zZXR0aW5nc19ib3gsICRjb250ZW50X2NlbGwuZmlyc3RDaGlsZCk7XHJcblxyXG4gICAgLy/RgdC+0LfQtNCw0L3QuNC1INC60L3QvtC/0LrQuCDQv9C+0LrQsNC30LDRgtGML9GB0LrRgNGL0YLRjCDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60LjQtSDQvdCw0YHRgtGA0L7QudC60LhcclxuICAgIGxldCAkc2V0dGluZ3NfYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAkc2V0dGluZ3NfYnRuLmlubmVySFRNTCA9ICfQn9C+0LrQsNC30LDRgtGML9GB0LrRgNGL0YLRjCDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60LjQtSDQvdCw0YHRgtGA0L7QudC60LgnO1xyXG4gICAgJHNldHRpbmdzX2J0bi5pZCA9ICdzZXR0aW5ncy1idG4nO1xyXG4gICAgJHNldHRpbmdzX2J0bi50eXBlID0gJ2J1dHRvbic7XHJcblxyXG4gICAgJHNldHRpbmdzX2J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkdXNlcl9zZXR0aW5nc19ib3guY2xhc3NMaXN0LnRvZ2dsZSgnaXMtb3BlbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJGNvbnRlbnRfY2VsbC5pbnNlcnRCZWZvcmUoJHNldHRpbmdzX2J0biwgJGNvbnRlbnRfY2VsbC5maXJzdENoaWxkKTtcclxuXHJcbiAgICAvL9GB0L7Qt9C00LDQvdC40LUg0LrQsNGB0YLQvtC80L3QvtCz0L4g0YHQv9C40YHQutCwINC/0YDQvtC10LrRgtC+0LJcclxuICAgIC8vaWRgcyBhcnJheVxyXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFza0xpc3RIVE1MKCkge1xyXG4gICAgICAgIGlmKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFyYW1zX3VzZXJfcHJvamVjdHMnKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYXJhbXNfdXNlcl9wcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KFtdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFyYW1zX3VzZXJfcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYXJhbXNfdXNlcl9wcm9qZWN0cycpKTtcclxuXHJcbiAgICAgICAgY29uc3QgUFJPSkVDVFNfTElTVF9QQVJBTVMgPSB7XHJcbiAgICAgICAgICAgICdpZCc6ICdjdXN0b20tcHJvamVjdC1saXN0JyxcclxuICAgICAgICAgICAgJ3RpdGxlJzogJ9Ch0L7QsdGB0YLQstC10L3QvdGL0Lkg0YHQv9C40YHQvtC6INC/0YDQvtC10LrRgtC+0LInLFxyXG4gICAgICAgICAgICAnc291cmNlJzogJ3Byb2plY3RfaWQnLFxyXG4gICAgICAgICAgICAnc3RvcmFnZSc6IHBhcmFtc191c2VyX3Byb2plY3RzLFxyXG4gICAgICAgICAgICAnc3RvcmFnZV9uYW1lJzogJ3BhcmFtc191c2VyX3Byb2plY3RzJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCAkY3VzdG9tX3Byb2plY3RzX2xpc3QgPSBjcmVhdGVJbnNlcnRXb3JrZXJzUHJvamVjdHNMaXN0cyhQUk9KRUNUU19MSVNUX1BBUkFNUyk7XHJcblxyXG4gICAgICAgICR1c2VyX3NldHRpbmdzX2JveC5pbnNlcnRCZWZvcmUoJGN1c3RvbV9wcm9qZWN0c19saXN0LCAkdXNlcl9zZXR0aW5nc19ib3guZmlyc3RDaGlsZCk7XHJcblxyXG4gICAgICAgIGhpZ2hsaWdodFNlbGVjdGVkKCRjdXN0b21fcHJvamVjdHNfbGlzdCwgcGFyYW1zX3VzZXJfcHJvamVjdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v0YHQvtC30LTQsNC90LjQtSDQutCw0YHRgtC+0LzQvdC+0LPQviDRgdC/0LjRgdC60LAg0LjRgdC/0L7Qu9C90LjRgtC10LvQtdC5XHJcbiAgICAvL2lkYHMgYXJyYXlcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVdvcmtlcnNMaXN0SFRNTCgpIHtcclxuICAgICAgICBpZighbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BhcmFtc191c2VyX3dvcmtlcnMnKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYXJhbXNfdXNlcl93b3JrZXJzJywgSlNPTi5zdHJpbmdpZnkoW10pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXNfdXNlcl93b3JrZXJzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFyYW1zX3VzZXJfd29ya2VycycpKTtcclxuXHJcbiAgICAgICAgY29uc3QgV09SS0VSU19MSVNUX1BBUkFNUyA9IHtcclxuICAgICAgICAgICAgJ2lkJzogJ2N1c3RvbS13b3JrZXJzLWxpc3QnLFxyXG4gICAgICAgICAgICAndGl0bGUnOiAn0KHQvtCx0YHRgtCy0LXQvdC90YvQuSDRgdC/0LjRgdC+0Log0LjRgdC/0L7Qu9C90LjRgtC10LvQtdC5JyxcclxuICAgICAgICAgICAgJ3NvdXJjZSc6ICdpbnRlcm5hbF93b3JrZXInLFxyXG4gICAgICAgICAgICAnc3RvcmFnZSc6IHBhcmFtc191c2VyX3dvcmtlcnMsXHJcbiAgICAgICAgICAgICdzdG9yYWdlX25hbWUnOiAncGFyYW1zX3VzZXJfd29ya2VycydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgJGN1c3RvbV93b3JrZXJzX2xpc3QgPSBjcmVhdGVJbnNlcnRXb3JrZXJzUHJvamVjdHNMaXN0cyhXT1JLRVJTX0xJU1RfUEFSQU1TKTtcclxuXHJcbiAgICAgICAgJHVzZXJfc2V0dGluZ3NfYm94Lmluc2VydEJlZm9yZSgkY3VzdG9tX3dvcmtlcnNfbGlzdCwgJHVzZXJfc2V0dGluZ3NfYm94LmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgICAgICBoaWdobGlnaHRTZWxlY3RlZCgkY3VzdG9tX3dvcmtlcnNfbGlzdCwgcGFyYW1zX3VzZXJfd29ya2Vycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0L/QvtC00YHQstC10YLQutCwINGB0L7RhdGA0LDQvdC10L3QvdGL0YUg0LIg0L3QsNGB0YLRgNC+0LnQutCw0YUg0Y3Qu9C10LzQtdC90YLQvtCyINGB0L/QuNGB0LrQsFxyXG4gICAgZnVuY3Rpb24gaGlnaGxpZ2h0U2VsZWN0ZWQobGlzdCwgc2V0dGluZ3MpIHtcclxuICAgICAgICBpZiAoIXNldHRpbmdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdubycpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbm9kZTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMobGlzdC5jaGlsZE5vZGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgbm9kZSA9IGxpc3QuY2hpbGROb2Rlc1trZXldO1xyXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuaW5kZXhPZihub2RlLmRhdGFzZXQuaWQpID49IDApIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINC00L7QsdCw0LLQu9C10L3QuNC1INC60L3QvtC/0L7QuiDQstC60LvRjtGH0LXQvdC40Y8v0L7RgtC60LvRjtGH0LXQvdC40Y8g0YDQsNC30L3Ri9GFINC80L7QtNGD0LvQtdC5XHJcbiAgICBsZXQgb3B0aW9uc0Jsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBvcHRpb25zQmxvY2suY2xhc3NMaXN0LmFkZCgndXNlci1saXN0Jyk7XHJcblxyXG4gICAgbGV0IHNldHRpbmdzX3RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIHNldHRpbmdzX3RpdGxlLnRleHRDb250ZW50ID0gJ9Ce0L/RhtC40LgnO1xyXG4gICAgc2V0dGluZ3NfdGl0bGUuY2xhc3NMaXN0LmFkZCgndXNlci10aXRsZScpO1xyXG5cclxuICAgIG9wdGlvbnNCbG9jay5hcHBlbmRDaGlsZChzZXR0aW5nc190aXRsZSk7XHJcblxyXG4gICAgLy/QtNC+0LHQsNCy0LvQtdC90LjQtSDQvdCw0YHRgtGA0L7QudC60LggLSDQstC60Lsv0LLRi9C60Lsg0LPQtdC90LXRgNCw0YbQuNC4INCx0LvQvtC60LAg0YEg0L/QvtC00YHRh9C10YLQvtC8INCy0YDQtdC80LXQvdC4INGD0YfQsNGB0YLQvdC40LrQvtCyINC30LDQtNCw0YfQuFxyXG4gICAgbGV0IGNvdW50VGltZUJ0biA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBjb3VudFRpbWVCdG4uaWQgPSAnY291bnRUaW1lQnRuJztcclxuICAgIGNvdW50VGltZUJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tZmxhdCcsJ3Jvdy1pdGVtJyk7XHJcbiAgICBjb3VudFRpbWVCdG4udGV4dENvbnRlbnQgPSAn0J/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LIg0LfQsNC00LDRh9C1IC0g0JLQutC70Y7Rh9C10L0nO1xyXG5cclxuICAgIGlmKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd29ya2VyLXRpbWUtY291bnQnKSl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dvcmtlci10aW1lLWNvdW50JywgJ3RydWUnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb3VudFRpbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uICgpIHtcclxuICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICBpZih0aGlzLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSl7XHJcbiAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9ICfQn9C+0LTRgdGH0LXRgiDQstGA0LXQvNC10L3QuCDQsiDQt9Cw0LTQsNGH0LUgLSDQktC60LvRjtGH0LXQvSc7XHJcbiAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dvcmtlci10aW1lLWNvdW50JywgJ3RydWUnKTtcclxuICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAn0J/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LIg0LfQsNC00LDRh9C1IC0g0JLRi9C60LvRjtGH0LXQvSc7XHJcbiAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dvcmtlci10aW1lLWNvdW50JywnZmFsc2UnKTtcclxuICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8v0LLQutC70Y7Rh9C40YLRjC/QvtGC0LrQu9GO0YfQuNGC0Ywg0LPQtdC90LXRgNCw0YbQuNGOINCx0LvQvtC60LAg0YEg0L/QvtC00YHRh9C10YLQvtCyINCy0YDQtdC80LXQvdC4INGD0YfQsNGB0YLQvdC40LrQvtCyINC30LDQtNCw0YfQuFxyXG4gICAgZnVuY3Rpb24gY2hlY2tUaW1lQ291bnRPcHRpb24oKSB7XHJcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudFRpbWVCdG4nKTtcclxuXHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dvcmtlci10aW1lLWNvdW50JykgPT09ICd0cnVlJyl7XHJcbiAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9ICfQn9C+0LTRgdGH0LXRgiDQstGA0LXQvNC10L3QuCDQsiDQt9Cw0LTQsNGH0LUgLSDQktC60LvRjtGH0LXQvSc7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSAn0J/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LIg0LfQsNC00LDRh9C1IC0g0JLRi9C60LvRjtGH0LXQvSc7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKi8v0LTQvtCx0LDQstC70LXQvdC40LUg0L3QsNGB0YLRgNC+0LnQutC4IC0g0LLQutC7L9Cy0YvQutC7INGD0LLQtdC00L7QvNC70LXQvdC40Lkg0L4g0L3QvtCy0L7QvCDQutC+0LzQvNC10L3RgtCw0YDQuNC4INCyINC30LDQtNCw0YfQtVxyXG4gICAgbGV0IGNvbW1lbnRzVXBkYXRlQnRuID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIGNvbW1lbnRzVXBkYXRlQnRuLmlkID0gJ2NvbW1lbnRzVXBkYXRlQnRuJztcclxuICAgIGNvbW1lbnRzVXBkYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1mbGF0Jywncm93LWl0ZW0nKTtcclxuICAgIGNvbW1lbnRzVXBkYXRlQnRuLnRleHRDb250ZW50ID0gJ9Cj0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGP0YUgLSDQktC60LvRjtGH0LXQvdGLJztcclxuXHJcbiAgICBjb21tZW50c1VwZGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpe1xyXG4gICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gJ9Cj0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGP0YUgLSDQktC60LvRjtGH0LXQvdGLJztcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScsICd0cnVlJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAn0KPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y/RhSAtINCS0YvQutC70Y7Rh9C10L3Riyc7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb21tZW50cy11cGRhdGUnLCdmYWxzZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8v0LLQutC70Y7Rh9C40YLRjC/QvtGC0LrQu9GO0YfQuNGC0Ywg0YPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0YDQsNC40Y/RhVxyXG4gICAgLy/QvdCwINC+0YLQutGA0YvRgtC+0Lkg0YHRgtGA0LDQvdC40YbQtSDQt9Cw0LTQsNGH0LhcclxuICAgIGZ1bmN0aW9uIGNoZWNrQ29tbWVudHNVcGRhdGUoKSB7XHJcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50c1VwZGF0ZUJ0bicpO1xyXG5cclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29tbWVudHMtdXBkYXRlJykgPT09ICd0cnVlJyl7XHJcbiAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9ICfQo9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLQsNGA0LjRj9GFIC0g0JLQutC70Y7Rh9C10L3Riyc7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSAn0KPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y/RhSAtINCS0YvQutC70Y7Rh9C10L3Riyc7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxuICAgIG9wdGlvbnNCbG9jay5hcHBlbmRDaGlsZChjb3VudFRpbWVCdG4pO1xyXG4gICAgLy9vcHRpb25zQmxvY2suYXBwZW5kQ2hpbGQoY29tbWVudHNVcGRhdGVCdG4pO1xyXG5cclxuICAgICR1c2VyX3NldHRpbmdzX2JveC5hcHBlbmRDaGlsZChvcHRpb25zQmxvY2spO1xyXG5cclxuICAgIC8v0LfQsNC/0YPRgdC6INC/0YDQvtCy0LXRgNC+0Log0LLQutC70Y7Rh9C10L3QvdGL0YUv0L7RgtC60LvRjtGH0LXQvdC90YvRhSDQvtC/0YbQuNC5XHJcbiAgICBjaGVja1RpbWVDb3VudE9wdGlvbigpO1xyXG4gICAgLy9jaGVja0NvbW1lbnRzVXBkYXRlKCk7XHJcblxyXG5cclxuICAgIGNyZWF0ZVRhc2tMaXN0SFRNTCgpO1xyXG4gICAgY3JlYXRlV29ya2Vyc0xpc3RIVE1MKCk7XHJcblxyXG4gICAgLy8g0LTQvtCx0LDQstC70LXQvdC40LUg0LHQu9C+0LrQsCDRjdC60YHQv9C+0YDRgtCwL9C40LzQv9C+0YDRgtCwINC90LDRgdGC0YDQvtC10LpcclxuICAgIGxldCBFSUJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBFSUJsb2NrLmNsYXNzTGlzdC5hZGQoJ3VzZXItbGlzdCcpO1xyXG4gICAgRUlCbG9jay5pZCA9ICdFSUJsb2NrJztcclxuXHJcbiAgICBsZXQgRUlCbG9ja190aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICBFSUJsb2NrX3RpdGxlLnRleHRDb250ZW50ID0gJ9Ct0LrRgdC/0L7RgNGCL9C40LzQv9C+0YDRgiDQvdCw0YHRgtGA0L7QtdC6JztcclxuICAgIEVJQmxvY2tfdGl0bGUuY2xhc3NMaXN0LmFkZCgndXNlci10aXRsZScpO1xyXG5cclxuICAgIGxldCBFSUJsb2NrX2Rlc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBFSUJsb2NrX2Rlc2MudGV4dENvbnRlbnQgPSAn0JHRg9C00YPRgiDRgdC+0YXRgNCw0L3QtdC90Ysg0LjQt9Cx0YDQsNC90L3Ri9C1INC/0YDQvtC10LrRgtGLLCDRgNCw0LHQvtGC0L3QuNC60LgsINC+0L/RhtC40LguJztcclxuXHJcbiAgICBFSUJsb2NrLmFwcGVuZENoaWxkKEVJQmxvY2tfdGl0bGUpO1xyXG4gICAgRUlCbG9jay5hcHBlbmRDaGlsZChFSUJsb2NrX2Rlc2MpO1xyXG5cclxuICAgIGxldCBFSVNldHRpbmdzID0gZXhwb3J0SW1wb3J0VXNlclNldHRpbmdzKCk7XHJcbiAgICBFSUJsb2NrLmFwcGVuZENoaWxkKEVJU2V0dGluZ3MubGluayk7XHJcbiAgICBFSUJsb2NrLmFwcGVuZENoaWxkKEVJU2V0dGluZ3MuZmllbGQpO1xyXG5cclxuICAgICR1c2VyX3NldHRpbmdzX2JveC5hcHBlbmRDaGlsZChFSUJsb2NrKTtcclxuXHJcbiAgICBpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ2xvYWQgdXNlclNldHRpbmdzJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v0YHQvtC30LTQsNC90LjQtSDQuCDQtNC+0LHQsNCy0LvQtdC90LjQtSDRgdC/0LjRgdC60LAg0YDQsNCx0L7RgtC90LjQutC+0LIg0Lgg0L/RgNC+0LXQutGC0L7QslxyXG5mdW5jdGlvbiBjcmVhdGVJbnNlcnRXb3JrZXJzUHJvamVjdHNMaXN0cyhwYXJhbXMpIHtcclxuICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIGxpc3QuaWQgPSBwYXJhbXMuaWQ7XHJcbiAgICBsaXN0LmNsYXNzTGlzdC5hZGQoJ3VzZXItbGlzdCcsICdjbGVhcmZpeCcpO1xyXG5cclxuICAgIGxldCBsaXN0X3RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIGxpc3RfdGl0bGUuaW5uZXJIVE1MID0gcGFyYW1zLnRpdGxlO1xyXG4gICAgbGlzdF90aXRsZS5jbGFzc0xpc3QuYWRkKCd1c2VyLXRpdGxlJyk7XHJcblxyXG4gICAgbGlzdC5hcHBlbmRDaGlsZChsaXN0X3RpdGxlKTtcclxuXHJcbiAgICBsZXQgc291cmNlX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXMuc291cmNlKTtcclxuICAgIGxldCBzb3VyY2VfbGlzdF9pdGVtcyA9IHNvdXJjZV9saXN0Lm9wdGlvbnM7XHJcblxyXG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgbGV0IGxpc3RfaXRlbV9wcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICBsZXQgbGlzdF9pdGVtO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKHNvdXJjZV9saXN0X2l0ZW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBpZiAoc291cmNlX2xpc3RfaXRlbXNba2V5XS52YWx1ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGlzdF9pdGVtID0gbGlzdF9pdGVtX3Byb3RvLmNsb25lTm9kZShmYWxzZSk7XHJcbiAgICAgICAgbGlzdF9pdGVtLmlubmVySFRNTCA9IHNvdXJjZV9saXN0X2l0ZW1zW2tleV0udGV4dDtcclxuICAgICAgICBsaXN0X2l0ZW0uZGF0YXNldC5pZCA9IHNvdXJjZV9saXN0X2l0ZW1zW2tleV0udmFsdWU7XHJcbiAgICAgICAgbGlzdF9pdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzYXZlVXNlclNldHRpbmdzKHBhcmFtcy5zdG9yYWdlLCB0aGlzLCBwYXJhbXMuc3RvcmFnZV9uYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobGlzdF9pdGVtKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxpc3QuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG5cclxuICAgIHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL9GB0L7RhdGA0LDQvdC10L3QuNC1INC/0L7Qu9GM0LfQvtCy0LDQtdGC0LvRjNGB0LrQuNGFINC90LDRgdGC0YDQvtC10LpcclxuLy/QuCDQstGL0LTQtdC70LXQvdC40LUg0YHQvtGF0YDQsNC90LXQvdC90L7Qs9C+INCyINGB0L/QuNGB0LrQsNGFINGA0LDQsdC+0YLQvdC40LrQvtCyINC4INC/0YDQvtC10LrRgtC+0LJcclxuZnVuY3Rpb24gc2F2ZVVzZXJTZXR0aW5ncyhvcHRpb25zLCBsaXN0X2l0ZW0sIHN0b3JhZ2VfaXRlbSkge1xyXG4gICAgbGV0IGlkID0gbGlzdF9pdGVtLmRhdGFzZXQuaWQ7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMuaW5kZXhPZihpZCkgPT09IC0xKSB7XHJcbiAgICAgICAgb3B0aW9ucy5wdXNoKGlkKTtcclxuICAgICAgICBsaXN0X2l0ZW0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gb3B0aW9ucy5pbmRleE9mKGlkKTtcclxuICAgICAgICBvcHRpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgbGlzdF9pdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RvcmFnZV9pdGVtLCBKU09OLnN0cmluZ2lmeShvcHRpb25zKSk7XHJcbiAgICAvL2NvbnNvbGUubG9nKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RvcmFnZV9pdGVtKSkpO1xyXG59XHJcblxyXG4vL9GB0L7RhdGA0LDQvdC10L3QuNC1INC/0L7Qu9GM0LfQvtCy0LDQtdGC0LvRjNGB0LrQuNGFINC90LDRgdGC0YDQvtC10Log0LIg0YTQsNC50LtcclxuLy/Qt9Cw0LPRgNGD0LfQutCwINC90LDRgdGC0YDQvtC10Log0LjQtyDRhNCw0LnQu9CwXHJcbmZ1bmN0aW9uIGV4cG9ydEltcG9ydFVzZXJTZXR0aW5ncygpIHtcclxuICAgIC8vY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSk7XHJcbiAgICBjb25zdCBrZXlzID0gW1wicGFyYW1zX3VzZXJfcHJvamVjdHNcIixcInBhcmFtc191c2VyX3dvcmtlcnNcIixcImRhdGFsaXN0XCIsXCJ3b3JrZXItdGltZS1jb3VudFwiXTtcclxuXHJcbiAgICBsZXQgc2V0dGluZ3MgPSB7fTtcclxuXHJcbiAgICBmb3IobGV0IGkgb2Yga2V5cyl7XHJcbiAgICAgICAgc2V0dGluZ3NbaV0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgU2F2ZUFzQmxvYiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShzZXR0aW5ncyldLCB7dHlwZTpcImFwcGxpY2F0aW9uL2pzb25cIn0pO1xyXG4gICAgbGV0IFNhdmVBc1VSTCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKFNhdmVBc0Jsb2IpO1xyXG4gICAgY29uc3QgZmlsZU5hbWVUb1NhdmVBcyA9ICd0cmFja2VyLXVzZXItc2V0dGluZ3MnO1xyXG5cclxuICAgIGxldCBkb3dubG9hZExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgIGRvd25sb2FkTGluay5kb3dubG9hZCA9IGZpbGVOYW1lVG9TYXZlQXM7XHJcbiAgICBkb3dubG9hZExpbmsuaW5uZXJIVE1MID0gXCLQodC60LDRh9Cw0YLRjCDRhNCw0LnQuyDQvdCw0YHRgtGA0L7QtdC6XCI7XHJcbiAgICBkb3dubG9hZExpbmsuaHJlZiA9IFNhdmVBc1VSTDtcclxuICAgIGRvd25sb2FkTGluay5jbGFzc0xpc3QuYWRkKCdyb3ctaXRlbScpO1xyXG5cclxuICAgIGxldCB1cGxvYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgdXBsb2FkLnR5cGUgPSAnZmlsZSc7XHJcbiAgICB1cGxvYWQuaWQgPSAnaW1wb3J0LXNldHRpbmdzJztcclxuICAgIHVwbG9hZC50aXRsZSA9ICfQl9Cw0LPRgNGD0LfQuNGC0LUg0YTQsNC50Lsg0YEg0YHQvtGF0YDQsNC90LXQvdC90YvQvNC4INC90LDRgdGC0YDQvtC50LrQsNC80LggdHJhY2tlci11c2VyLXNldHRpbmdzJztcclxuICAgIHVwbG9hZC5jbGFzc0xpc3QuYWRkKCdyb3ctaXRlbScpO1xyXG5cclxuICAgIHVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbG9hZEZpbGUodGhpcylcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvYWRGaWxlKGlucHV0KSB7XHJcbiAgICAgICAgbGV0IGZpbGVUb0xvYWQgPSBpbnB1dC5maWxlc1swXTtcclxuXHJcbiAgICAgICAgbGV0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuICAgICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChmaWxlTG9hZGVkRXZlbnQpIHtcclxuICAgICAgICAgICAgbGV0IHNldHRpbmdzID0gSlNPTi5wYXJzZShmaWxlTG9hZGVkRXZlbnQudGFyZ2V0LnJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlb2Ygc2V0dGluZ3MgPT09ICdvYmplY3QnKXtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHNldHRpbmdzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHNldHRpbmdzW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCfQntGI0LjQsdC60LAg0YfRgtC10L3QuNGPINGE0LDQudC70LAg0L3QsNGB0YLRgNC+0LXQuicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNUZXh0KGZpbGVUb0xvYWQsIFwiVVRGLThcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsaW5rOiBkb3dubG9hZExpbmssXHJcbiAgICAgICAgZmllbGQ6IHVwbG9hZFxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IHt1c2VyU2V0dGluZ3N9O1xyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdXNlclNldHRpbmdzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQ3JlYXRlZCBieSBtYW5uLWFhIG9uIDA1LjA3LjIwMTcuXHJcbiAqL1xyXG5pbXBvcnQge2dldFRhc2tJZH0gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcblxyXG5mdW5jdGlvbiBjYWxjVGltZUxlZnQoKSB7XHJcbiAgICAvL2R0cCA9IGRhcnQtdGFzay1wbGFuZVxyXG4gICAgY29uc3QgdGlkID0gZ2V0VGFza0lkKCk7XHJcblxyXG4gICAgbGV0IGJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLXRvb2xiYXInKTtcclxuICAgIGxldCB3b3JrZXJzVGltZUJsb2NrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmtlcnMtdGltZScpO1xyXG5cclxuICAgIGxldCBiYXJpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBiYXJpdGVtLmNsYXNzTGlzdC5hZGQoJ3VzZXItdG9vbGJhcl9faXRlbScpO1xyXG5cclxuICAgIGxldCBmaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICBmaWVsZC5pZCA9ICdkdHAtaW5wdXQnO1xyXG4gICAgZmllbGQudmFsdWUgPSAwO1xyXG5cclxuICAgIGxldCByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHJlc3VsdC5jbGFzc0xpc3QuYWRkKCdkdHAtcmVzdWx0Jyk7XHJcblxyXG4gICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgYnRuLnRleHRDb250ZW50ID0gJ9Cf0L7RgdGH0LjRgtCw0YLRjCDQvtGB0YLQsNCy0YjQtdC10YHRjyDQstGA0LXQvNGPJztcclxuICAgIGJ0bi50eXBlID0gJ2J1dHRvbic7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnZHRwLWJ1dHRvbicpO1xyXG5cclxuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XHJcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXItdGl0bGUnKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ9Ce0YHRgtCw0LLRiNC10LXRgdGPINCy0YDQtdC80Y8gKERhcnRJdCknO1xyXG5cclxuICAgIGJhcml0ZW0uYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgYmFyaXRlbS5hcHBlbmRDaGlsZChmaWVsZCk7XHJcbiAgICBiYXJpdGVtLmFwcGVuZENoaWxkKHJlc3VsdCk7XHJcbiAgICBiYXIuYXBwZW5kQ2hpbGQoYmFyaXRlbSk7XHJcblxyXG4gICAgd29ya2Vyc1RpbWVCbG9jay5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXREYXJ0Q2FsYyhmaWVsZCxyZXN1bHQpXHJcbiAgICB9KTtcclxuXHJcbiAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHJlYWRXcml0ZURhcnRQbGFuZVRpbWUodGhpcywgdGlkLCBlLnR5cGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmVhZFdyaXRlRGFydFBsYW5lVGltZShmaWVsZCwgdGlkLCAnbG9hZCcpO1xyXG4gICAgbGV0RGFydENhbGMoZmllbGQscmVzdWx0KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxldERhcnRDYWxjKGlucHV0LG91dCkge1xyXG4gICAgbGV0IGRhdGEgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd29ya2Vycy10aW1lLXRvdGFsJykuZGF0YXNldC50b3RhbHRpbWUpO1xyXG4gICAgbGV0IGNhbGMgPSBwYXJzZUludChpbnB1dC52YWx1ZSkgLSBkYXRhO1xyXG4gICAgbGV0IHR4dCA9ICfQntGB0YLQsNCy0YjQtdC10YHRjyDQstGA0LXQvNGPOiAnO1xyXG5cclxuICAgIGlmKGNhbGMgPCAwKXtcclxuICAgICAgICBvdXQuY2xhc3NMaXN0LmFkZCgnZHRwLWFsZXJ0Jyk7XHJcbiAgICAgICAgb3V0LmNsYXNzTGlzdC50b2dnbGUoJ2R0cC13YXJuJyxmYWxzZSk7XHJcbiAgICAgICAgdHh0ID0gJ9CR0L7Qu9GM0YjQtSDQt9Cw0L/Qu9Cw0L3QuNGA0L7QstCw0L3QvdC+0LPQviDQvdCwICc7XHJcbiAgICAgICAgY2FsYyA9IE1hdGguYWJzKGNhbGMpO1xyXG4gICAgfWVsc2UgaWYoY2FsYyA8PSA2MCl7XHJcbiAgICAgICAgb3V0LmNsYXNzTGlzdC5hZGQoJ2R0cC13YXJuJyk7XHJcbiAgICAgICAgb3V0LmNsYXNzTGlzdC50b2dnbGUoJ2R0cC1hbGVydCcsZmFsc2UpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgb3V0LmNsYXNzTGlzdC5yZW1vdmUoJ2R0cC13YXJuJywnZHRwLWFsZXJ0Jyk7XHJcbiAgICB9XHJcbiAgICBvdXQudGV4dENvbnRlbnQgPSBgJHt0eHR9ICR7Y2FsY30g0LzQuNC9LmA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRXcml0ZURhcnRQbGFuZVRpbWUoaW5wdXQsaWQsZXYpIHtcclxuXHJcbiAgICBpZihldiA9PT0gJ2NoYW5nZScpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke2lkfS1kYXJ0LXBsYW5lLXRpbWVgLCBpbnB1dC52YWx1ZSk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtpZH0tZGFydC1wbGFuZS10aW1lYCkgIT09IG51bGwpe1xyXG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2lkfS1kYXJ0LXBsYW5lLXRpbWVgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9wY3NzL2NhbGNUaW1lTGVmdEluRGFydFRhc2sucGNzcyc7XHJcblxyXG5leHBvcnQge2NhbGNUaW1lTGVmdH07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NhbGNUaW1lTGVmdEluRGFydFRhc2suanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL2NhbGNUaW1lTGVmdEluRGFydFRhc2sucGNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi9jYWxjVGltZUxlZnRJbkRhcnRUYXNrLnBjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vY2FsY1RpbWVMZWZ0SW5EYXJ0VGFzay5wY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wY3NzL2NhbGNUaW1lTGVmdEluRGFydFRhc2sucGNzc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmR0cC1yZXN1bHQuZHRwLWFsZXJ0e2NvbG9yOnJlZDtmb250LXNpemU6MS40ZW19LmR0cC1yZXN1bHR7cGFkZGluZy10b3A6MmVtfS5kdHAtcmVzdWx0LmR0cC13YXJue2NvbG9yOmJsdWV9LmR0cC1idXR0b257bWFyZ2luLXRvcDoyZW19XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj97XCJpbXBvcnRMb2FkZXJzXCI6MX0hLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliIS4vc3JjL3Bjc3MvY2FsY1RpbWVMZWZ0SW5EYXJ0VGFzay5wY3NzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBOzs7OztBQzdEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNwRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2hXQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3hGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEpBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25CQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25FQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNVFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4SEE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3SkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZEQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ25VQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9