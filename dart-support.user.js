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
// @version 1.4.14
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTaskId", function() { return getTaskId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTaskHead", function() { return getTaskHead; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllCamments", function() { return getAllCamments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCommentFromRow", function() { return getCommentFromRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllCommentsRows", function() { return getAllCommentsRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllWorkers", function() { return getAllWorkers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRowTimeString", function() { return getRowTimeString; });
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
    //let rows = getAllCommentsRows();
    //return rows.map(getCommentFromRow);
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

    return __webpack_require__(1).eliminateDuplicates(workers);
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getURLAction", function() { return getURLAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eliminateDuplicates", function() { return eliminateDuplicates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createISODate", function() { return createISODate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRowDateString", function() { return getRowDateString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateFormatter", function() { return dateFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modifySelectOptionsList", function() { return modifySelectOptionsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runOnKeys", function() { return runOnKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadByAjax", function() { return loadByAjax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "declOfNum", function() { return declOfNum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findInArray", function() { return findInArray; });

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commentsDesign_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__calculateElapsedTime_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__goToTask_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__countWorkerTime_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__taskFooterDesign_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__elemsModification_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__saveNewComment_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__copyPasteCommentQuote_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__taskUpdateNotify_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__anchorLink_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__userSettings_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__taskHeaderDesign_js__ = __webpack_require__(26);

if(true) {
    console.time('total');
}






























const action_page = __WEBPACK_IMPORTED_MODULE_0__utils_js__["getURLAction"]();

switch (action_page) {
    case 'new':
        __WEBPACK_IMPORTED_MODULE_13__userSettings_js__["a" /* userSettings */]();
        break;
    case 'red':
        __WEBPACK_IMPORTED_MODULE_1__addCSSSelectors_js__["a" /* addPageElems */]();
        //let elemsModification = new elemsModification();
        __WEBPACK_IMPORTED_MODULE_8__elemsModification_js__["a" /* elemsModification */]();
        __WEBPACK_IMPORTED_MODULE_2__modyfiComments_js__["a" /* modyfiComments */]();

        if(true){
            __WEBPACK_IMPORTED_MODULE_6__countWorkerTime_js__["a" /* countWorkerTime */]();
        }else{
            if (localStorage.getItem('worker-time-count') === 'true') {
                countWorkerTime();
            }
        }

        __WEBPACK_IMPORTED_MODULE_9__saveNewComment_js__["a" /* saveNewComment */]();
        __WEBPACK_IMPORTED_MODULE_4__calculateElapsedTime_js__["a" /* calculateElapsedTime */]();
        __WEBPACK_IMPORTED_MODULE_3__commentsDesign_js__["a" /* commentsDesign */]();
        __WEBPACK_IMPORTED_MODULE_7__taskFooterDesign_js__["a" /* taskFooterDesign */]();
        __WEBPACK_IMPORTED_MODULE_10__copyPasteCommentQuote_js__["a" /* copyPasteCommentQuote */]();
        __WEBPACK_IMPORTED_MODULE_11__taskUpdateNotify_js__["a" /* taskUpdateNotify */]();
        __WEBPACK_IMPORTED_MODULE_5__goToTask_js__["a" /* goToTaskDatalist */]();
        __WEBPACK_IMPORTED_MODULE_12__anchorLink_js__["a" /* anchorLink */]();
        __WEBPACK_IMPORTED_MODULE_14__taskHeaderDesign_js__["a" /* taskHeaderDesign */]();
        break;
    case 'user_page':
        __WEBPACK_IMPORTED_MODULE_1__addCSSSelectors_js__["a" /* addPageElems */]();
        __WEBPACK_IMPORTED_MODULE_5__goToTask_js__["a" /* goToTaskDatalist */]();
        break;
}

if(true){
    console.log('hello');
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

        let rows = __WEBPACK_IMPORTED_MODULE_0__finders_js__["getAllCommentsRows"]();

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
exports.push([module.i, "#main-content{\r\n    /*убираю лишние отступы и br чтобы уменьшить дыру под полями камента*/margin-bottom:0}#main-content br:last-child{display:none}.onoff-opt{margin:0 6px 0 10px}.none{display:none!important}.hidden-elem{position:fixed!important;left:-999em;z-index:-1;visibility:hidden}.none.view{display:block!important}.ch_addr{margin:10px 10px 10px 0;vertical-align:top}.totop>input{margin:10px 0 0}.label_head{display:block;margin:0 0 20px}.clearfix:after,.clearfix:before{content:\"\";display:table;clear:both}.alist{float:right}.alist p{margin:0 0 10px;line-height:1;text-align:right}.bar-wrap{padding:8px 15px;background:#2d2d2d}#custom-project-list>li,#custom-workers-list>li{width:20%;float:left;cursor:pointer}#custom-project-list>li:first-child{display:none}.user-list{margin:2em 1em;padding:0;list-style-position:inside}.user-list>li{line-height:1.5}.selected{color:green}.btn-flat{padding:.5em;background:#f0f0f0;cursor:pointer}.btn-flat,.row-item{display:inline-block}.row-item{vertical-align:top}.row-item:not(:last-child){margin-right:1em}#settings-btn{margin:0 0 20px}#settings-box{display:none;margin:20px 0;padding:20px 0;outline:1px solid #414141}#settings-box.is-open{display:block}.user-title{color:#000;margin:0 0 .6em;font-size:20px;padding:0}.regular-link{color:#0054b9;outline:0!important}.time-list p{margin:5px 0;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.time-list>p>span:first-child{padding-right:1em;cursor:pointer}:root .time-list-total{margin-top:1em;border-top:1px solid}.comment-collapsed{max-height:70px;overflow:hidden!important}.long-comment{width:100%!important;position:relative;padding-top:30px}.btn-collapse{position:absolute;top:0;right:0}.btn-collapse-all{position:fixed;top:10px;right:10px}:root .dates-list{width:150px;display:inline-block;margin:0 20px 0 0}.user-toolbar{margin:20px 0;padding:20px 10px;border-top:1px solid rgba(0,0,0,.7);overflow:hidden;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.user-toolbar__item{padding:10px 15px;background:hsla(0,0%,100%,.6);box-shadow:0 1px 1px rgba(0,0,0,.6)}:root .user-toolbar-title{margin:0 0 1em;padding:0;color:#000}:root #comments-tbl .comment-wrap{font-size:14px;width:100%!important;max-width:800px;overflow:hidden}:root #comments-tbl h1{font-size:120%;font-weight:400;margin:0 0 .4em;color:inherit}:root #comments-tbl blockquote{padding:10px 20px;margin:0 0 20px;border-left:5px solid #ccc}:root #comments-tbl blockquote p{margin:0}:root #comments-tbl blockquote p:not(:last-child){margin-bottom:1em}:root #comments-tbl ul{padding-left:.6em;list-style-position:inside}\r\n\r\n/*typo*/.section-title{color:inherit;margin:0 0 1em;padding:0!important}.s-info{color:gray;font-size:12px}\r\n\r\n/*вставка текста из local storage*/.btn-insert-ls{position:absolute;top:100%;right:2em;transition:transform .3s}.btn-insert-ls.is-visible{transform:translateY(-150%)}\r\n\r\n/*\r\n    добавление иконки подписки на уведомление о новых каментах\r\n    в заголовок задачи\r\n*/.add-alert{width:24px;height:24px;display:inline-block;background-image:url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+ICAgIDxwYXRoIGQ9Ik0xMC4wMSAyMS4wMWMwIDEuMS44OSAxLjk5IDEuOTkgMS45OXMxLjk5LS44OSAxLjk5LTEuOTloLTMuOTh6bTguODctNC4xOVYxMWMwLTMuMjUtMi4yNS01Ljk3LTUuMjktNi42OXYtLjcyQzEzLjU5IDIuNzEgMTIuODggMiAxMiAycy0xLjU5LjcxLTEuNTkgMS41OXYuNzJDNy4zNyA1LjAzIDUuMTIgNy43NSA1LjEyIDExdjUuODJMMyAxOC45NFYyMGgxOHYtMS4wNmwtMi4xMi0yLjEyek0xNiAxMy4wMWgtM3YzaC0ydi0zSDhWMTFoM1Y4aDJ2M2gzdjIuMDF6Ii8+PC9zdmc+);cursor:pointer}#task-title .add-alert{vertical-align:middle;opacity:.5}#task-title .add-alert.selected{opacity:1}#text{resize:vertical}", ""]);

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
if (true) {
    console.time('load modyfiComments');
}

//поиск ссылок в тексте комментариев и оборачивание их в <a>
//сворачивание длинных комментариев, добавление кнопки Свренуть.развернуть все

function modyfiComments() {
    'use strict';

    let div, txt;
    let rows = __webpack_require__(0).getAllCommentsRows();

    __webpack_require__(10).addjs('https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.3.1/markdown-it.min.js', function () {
        goMarkdown(rows);
    });

    for (let i = 0; i < rows.length; i++) {
        div = __webpack_require__(0).getCommentFromRow(rows[i]);
        txt = replaceURLWithHTMLLinks(div.innerHTML);
        div.innerHTML = txt;
    }

    //парсер markdown
    function goMarkdown(rows) {

        let md = markdownit();
        md.options.html = true;
        md.options.linkify = true;
        md.options.typographer = true;
        md.options.breaks = true;

        rows.map(function (row) {
            addMarkdown(row, md)
        });

        function addMarkdown(row, md) {
            let comment = __webpack_require__(0).getCommentFromRow(row);
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

            comment.innerHTML = blocks.join('');
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["addjs"] = addjs;
//подключение строннего js в head
function addjs(url, callback) {
    let head = document.getElementsByTagName('head')[0];
    let s = document.createElement('script');
    s.onload = function () {
        callback();
    };
    s.src = url;
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

    let rows = __WEBPACK_IMPORTED_MODULE_0__finders_js__["getAllCommentsRows"]();

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

                //let ext = item.href.split('.')[1];
                let ext = item.href.lastIndexOf('.');
                ext = item.href.slice(ext + 1, item.href.length);

                if (pics.indexOf(ext.toLowerCase()) > -1) {
                    item = createImgThumb(item);
                } else {
                    item = createDocsThumb(ext, item);
                }

                rows[3].appendChild(item);
            });
        } else {
            block.removeChild(rows[3]);
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

        td.map(function (tditem) {
            if (tditem) {
                item.removeChild(tditem);
            }
        });
    });

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

    function create5row(td) {
        let fragment = document.createDocumentFragment();

        let rowItemProto = document.createElement('div');

        let rowItem = rowItemProto.cloneNode(true);

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
}

function createImgThumb(item) {
    let wrap = document.createElement('div');
    wrap.classList.add('img-thumb', 'file-thumb');

    let pic = document.createElement('img');
    pic.src = item.getAttribute('href');
    pic.classList.add('thumb-pic');

    //item.classList.add('img-thumb', 'file-thumb');
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

function createDocsThumb(ext, item) {
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
exports.push([module.i, ".b-comment__row:last-child{padding-bottom:2em}.comment-wrap p:only-of-type{margin:0}.comment-wrap p:last-child{margin-bottom:0}#comments-tbl{margin:auto;padding:3em 0;background:#f0f0f0}#comments-tbl,#comments-tbl tbody,#comments-tbl tr{display:block}#comments-tbl tr:not(:last-child){margin-bottom:2em}.comment-body{width:100%}.comment-wrap p{line-height:1.4\r\n\r\n        /*\r\n        //где-то таки вставляются лишние переводы строк\r\n        //сделаю такой грязный хак\r\n        */\r\n        /*& br:first-child,\r\n        & br:last-child{\r\n            display: none;\r\n        }*/}.comment-wrap p:first-child{margin-top:0}.b-comment{max-width:720px;margin:auto;background:#fafafa;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);width:100%;font-size:12px;\r\n    /*display: flex;\r\n    flex-flow: column wrap;*/position:relative;box-sizing:border-box}.b-comment.b-comment_notify{margin-top:2em;padding:2em;color:#31708f;background:#d9edf7;border:1px solid #bce8f1}.b-comment.b-comment_notify .comments-update-link{display:inline-block;padding-left:1em;color:inherit}.b-comment__row{padding:1em 2em;display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;position:relative}.b-comment__row:first-child{padding-top:2em}.b-comment__row:first-child .row-right{top:2em}\r\n\r\n/*//1 row шапка*/.b-comment__row_0{color:gray}.task-rank,.task-status{padding:0 .5em 0 2em}.deadline-date{padding-left:1em}.id-checkbox{position:absolute;visibility:hidden;z-index:-1}.comment-link,.comment-no{margin-right:0!important}\r\n\r\n/*//2 row автор - исполнитель*/.b-comment__row.b-comment__row_1{padding-top:0;-ms-flex-pack:justify;justify-content:space-between;color:gray}.comment-info>span{display:inline-block;vertical-align:top}.comment-author{padding-right:2em;position:relative}.comment-author:after{content:\"\\2192\";position:relative;left:1em}\r\n\r\n/*//3 row текст камента*/.b-comment__row_2{font-size:14px;background:#fff;border-top:1px solid hsla(0,0%,63%,.2);border-bottom:1px solid hsla(0,0%,63%,.2);position:relative;overflow:hidden}\r\n\r\n/*и кнопки Удалить, Редактировать*/.actions-btn-wrap{padding:1em;position:absolute;top:100%;right:0;transition:transform .3s}.actions-btn-wrap.is-visible{transform:translateY(-100%)}.btn-del-comment,.btn-edit-comment{display:inline-block;vertical-align:middle;height:24px;line-height:24px;position:relative;z-index:1}.btn-edit-comment{\r\n    /*width: 140px;*/margin-left:.5em;\r\n    /*border: 1px solid #ADADAD;*/top:3px}.btn-del-comment{width:70px\r\n    /*width: 100px;*/}\r\n\r\n/*.btn-edit-comment:after,*/.btn-del-comment:after{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:-1;content:\"\\423\\434\\430\\43B\\438\\442\\44C\";color:#ccc;line-height:normal;border-bottom:1px solid}\r\n\r\n/*.btn-edit-comment:after {\r\n    content: 'Редактировать';\r\n    width: 100%;\r\n    text-align: center;\r\n    background: #E1E1E1;\r\n}*/\r\n\r\n/*.btn-edit-comment img,*/.btn-del-comment img{display:none}\r\n\r\n/*.btn-edit-comment a,*/.btn-del-comment a{width:100%;height:100%;position:absolute}\r\n\r\n/*//4 row файлы*/.b-comment__row.b-comment__row_3{padding-top:1.5em;padding-bottom:1.5em;-ms-flex-align:start;align-items:flex-start}\r\n\r\n/*//5 row подвал*/.b-comment__row_3+.b-comment__row_4{border-top:1px solid hsla(0,0%,63%,.2)}.b-comment__row.b-comment__row_4{-ms-flex-pack:end;justify-content:flex-end}\r\n\r\n/*----*/.row-right{position:absolute;top:1em;right:2em}.row-right>*{display:inline-block;vertical-align:middle}.row-right>:not(:last-child){margin-right:.7em}.img-thumb{max-width:150px}.img-thumb img:first-child{display:none}.img-thumb>a{display:block}.img-thumb .attach-title{margin-top:.3em}.thumb-pic{width:100%;\r\n    /*height: calc(100% - 2em);*/object-fit:cover;max-height:200px;border:1px solid #ccc}\r\n\r\n/*большая картинка, вставляетсяв блок при наведении на превью*/.large-pic-preview{max-width:40vw;border:1px solid gray;position:absolute;top:90%;left:0;\r\n    /*left: 50%;*/\r\n    /*transform: translateX(-50%);*/z-index:1}.doc-thumb{max-width:150px;background:#f3f3f3;font-size:11px;border:1px solid #ccc;\r\n    /*line-height: 58px;*/text-align:center;text-decoration:none;color:inherit}.doc-thumb .attach-title{width:100%;padding:0 .5em;line-height:1.6;word-break:break-all;box-sizing:border-box;position:absolute;top:50%;transform:translateY(-50%)}.file-thumb{-ms-flex:1 1 25%;flex:1 1 25%;min-height:70px;position:relative}.file-thumb:nth-child(n+7){margin-top:2em}.file-thumb:not(:last-child){margin-right:1em}.attach-title{max-width:150px;text-align:center;line-height:normal;word-break:break-all}#comments-tbl tr:last-child .b-comment__row_0,#comments-tbl tr:last-child .b-comment__row_1{color:#000}", ""]);

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

    let taskId = __WEBPACK_IMPORTED_MODULE_0__finders_js__["getTaskId"]();

    let taskTitle = __WEBPACK_IMPORTED_MODULE_0__finders_js__["getTaskHead"]().title;

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
    let rows = __WEBPACK_IMPORTED_MODULE_0__finders_js__["getAllCommentsRows"]();
    let workers = __WEBPACK_IMPORTED_MODULE_0__finders_js__["getAllWorkers"]();
    let dates_collection = [];
    let date_str;

    for (let i = 0; i < rows.length; i++) {
        date_str = rows[i].children[3].textContent;
        date_str = date_str.split(' ');
        dates_collection.push(__WEBPACK_IMPORTED_MODULE_1__utils_js__["createISODate"](date_str[0]));
    }

    let dates_arr = __WEBPACK_IMPORTED_MODULE_1__utils_js__["eliminateDuplicates"](dates_collection);

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
            listdate = __WEBPACK_IMPORTED_MODULE_1__utils_js__["dateFormatter"](parseInt(dates[i], 10));
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
            ntime = __WEBPACK_IMPORTED_MODULE_0__finders_js__["getRowTimeString"](rows[i]);

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
            let item_date = __WEBPACK_IMPORTED_MODULE_1__utils_js__["getRowDateString"](item);

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
exports.push([module.i, "#task-footer tr:nth-child(2){height:0;overflow:hidden}.fake-file-input .btn-fake-file{padding:.7em 0 0;text-align:center;display:inline-block;font-size:16px;color:#82a5c3;cursor:pointer}.fake-file-input .btn-fake-file span{width:100%;display:inline-block;font-size:12px}.fake-file-input>input{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0}#FileInputs br{display:none}.task-type>div select{margin-top:.3em}.task-type>div br{display:none}.email-send-list>li:after{content:\"\\1F7A9\";margin-left:.4em;color:red;display:inline-block;cursor:pointer}.add-email #getEmailAddressesButton{display:none\r\n        /*width: 90px;\r\n        display: inline-block;\r\n        vertical-align: middle;*/}.add-email #add_email_worker{width:226px;display:inline-block;vertical-align:middle}.add-email #add_email{position:absolute;visibility:hidden;z-index:auto}.add-email label{display:block}:root .deadline-calendar #end_date{width:auto!important}:root .deadline-calendar input[type=button]{display:none}:root .deadline-calendar>img{position:absolute;top:.4em;right:.5em}:root .deadline-calendar>input[type=text]{padding-right:30px}.task-row-2 .time-block>div:after{content:\"\\43C\\438\\43D\";margin-left:.5em;display:inline-block;vertical-align:middle}.worker-block select{width:100%;margin:.5em 0 0}.task-fields-row .frow-col-2-2{width:120px}.task-fields-row .frow-col-2-1{width:190px;margin-right:30px}.task-fields-row td{padding:0;font-size:100%;display:block}.task-fields-row select{padding:.3em 0 .3em .2em}.task-fields-row input.input_field,.task-fields-row input[type=text],.task-fields-row select{width:auto;max-width:100%;height:2em;padding:.3em .6em;border:1px solid #9e9e9e;display:block;box-sizing:border-box}.task-fields-row input.input_field:focus,.task-fields-row input[type=text]:focus,.task-fields-row select:focus{border-color:#26a69a}.content{\r\n    /*убираю лишние отступы и br чтобы уменьшить дыру под полями камента*/padding-bottom:0}\r\n\r\n/* превращаю все в блоки*/#tbl-new-comment tbody,#tbl-new-comment td,#tbl-new-comment tr{display:block}\r\n\r\n/*скрываю первую ячейку с текстом Текст*/#tbl-new-comment tr:first-child>td:first-child{display:none}#tbl-new-comment+br{\r\n    /*убираю лишние отступы и br чтобы уменьшить дыру под полями камента*/display:none}\r\n\r\n/*выровнять новый камент по карточкам каментов*/#new-comment-wrap{max-width:720px;margin:auto}\r\n\r\n/*textarea*/\r\n\r\n/*заголовок Добавить комментарий*/.tl{display:none}\r\n\r\n/*обертка вокруг поля Добавить комментарий*/.tarea-wrap{position:relative;overflow:hidden}#text{width:100%;padding:.6em .8em;font-family:inherit;font-size:14px;border:0;box-sizing:border-box;box-shadow:inset 0 -2px 2px 0 rgba(0,0,0,.14),inset 0 1px 5px 0 rgba(0,0,0,.12),inset 0 3px 1px -2px rgba(0,0,0,.2)}\r\n\r\n/*оформление полей и строк с полями под полем камента*/.task-fields-row{max-width:720px;margin:1.6em auto}.task-fields-row label{margin:0 0 .5em;color:gray;display:inline-block}\r\n\r\n/* 1 строка */.task-row-1{display:-ms-flexbox;display:flex\r\n    /*justify-content: space-between;*/}.worker-block{width:300px;margin-right:70px;-ms-flex:0 0 300px;flex:0 0 300px}.worker-block input[type=radio]{display:inline-block;vertical-align:middle;position:relative;top:-.2em}\r\n\r\n/* 2 строка */.task-row-2{display:-ms-flexbox;display:flex\r\n    /*justify-content: space-between;*/}.task-row-2 .time-block{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.task-row-2 .time-block>div{width:120px}.task-row-2 .time-block>div input{width:76%;display:inline-block;vertical-align:middle}:root .deadline-calendar{position:relative;padding:0!important;font-size:100%\r\n    /*flex: 1 1 180px;*/}:root .deadline-calendar>img,:root .deadline-calendar>input{display:inline-block;vertical-align:top;box-sizing:border-box}\r\n\r\n/* 3 строка */.task-row-3{display:-ms-flexbox;display:flex\r\n    /*justify-content: space-between;*/}.add-email{position:relative}.add-email a{display:none}.email-send-list{margin:.4em 0 .5em;padding:0;list-style-type:none}.email-send-list>li{margin:0;line-height:1}.email-send-list>li:before{content:\"\\B7\";font-size:1.5em;margin-right:.2em;display:inline-block;vertical-align:middle}.task-type{\r\n\r\n    /*в дивах прячуться селекты с подтипами*/}.task-type select{min-width:190px}\r\n\r\n/* 4 строка */.add-files{\r\n\r\n    /*по клику на эту ссылку создавался новый file input\r\n    скрою ее, а событие повешу на change самого инпута*/}.add-files a{display:none\r\n        /*margin-top: .8em;\r\n        display: inline-block;*/}#FileInputs input:not(:first-child){margin-top:.3em;display:inline-block;vertical-align:middle}.btn-remove-item{width:12px;height:18px;margin-left:.3em;color:red;display:inline-block;vertical-align:middle;position:relative;cursor:pointer}.btn-remove-item:after{content:\"\\1F7A9\";position:absolute;top:0;left:0}.fake-file-input{width:225px;height:60px;border:1px dashed #82a5c3;background:#f4f6f8;text-align:center;border-radius:.5em;position:relative}.fake-file-input.is-hover{background:#d2dce5}.files-list{margin:-.5em 0 .5em;padding:0;list-style-type:none;transition:height .3s}.files-list .file-list-item{margin:.4em 0}.files-list .file-list-item .s-info{padding-left:.6em;display:inline-block;vertical-align:middle}\r\n\r\n/*скрываю пустые ячейки, поля из них перемещены в новый блок #new-comment-wrap*/#task-footer tbody,#task-footer td,#task-footer tr{display:block}\r\n\r\n/*кнопка сохранить*/.btn-action{height:36px;padding:0 1.6em;font-size:14px;color:#fff;border:0;border-radius:4px;background:#7eb519;cursor:pointer}", ""]);

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

        __WEBPACK_IMPORTED_MODULE_0__utils_js__["modifySelectOptionsList"](options, params_user_projects);
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
            let task_workers = __WEBPACK_IMPORTED_MODULE_1__finders_js__["getAllWorkers"]();
            let task_workers_id = [];

            //сравнение списков, если работника нет в списке из настроек пользователя - добавляю
            //сначала нужно получить соответсвие имя сотрудника -> option.value т.е. логин сотрудника на англицком
            for (let i = 0; i < options.length; i++) {
                let if_find = __WEBPACK_IMPORTED_MODULE_0__utils_js__["findInArray"](task_workers, options[i].text);

                if (if_find > -1) {
                    task_workers_id.push(options[i].value)
                }
            }

            //затем сравнить со списком из настроек
            //и добавить работника если его нет в списке
            for (let i = 0; i < task_workers_id.length; i++) {
                let if_find = __WEBPACK_IMPORTED_MODULE_0__utils_js__["findInArray"](params_user_workers, task_workers_id[i]);

                if (if_find < 0) {
                    params_user_workers.push(task_workers_id[i]);
                    //console.info('В список добавлен '+ task_workers[i]);
                }
            }

            __WEBPACK_IMPORTED_MODULE_0__utils_js__["modifySelectOptionsList"](options, params_user_workers);
        }
    };

    //в списке исполнителей отмечаю selected работника оставившего последний комментрий в задаче
    this.setSelectedInWorkersList = function () {
        let last_row = __WEBPACK_IMPORTED_MODULE_1__finders_js__["getAllCommentsRows"]();
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

    let task_id = __WEBPACK_IMPORTED_MODULE_0__finders_js__["getTaskId"]();

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

    let camments = Array.from(__WEBPACK_IMPORTED_MODULE_1__finders_js__["getAllCamments"]());

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

    __WEBPACK_IMPORTED_MODULE_0__utils_js__["runOnKeys"](
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
    let taskId = __WEBPACK_IMPORTED_MODULE_0__finders_js__["getTaskId"]();

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
        __WEBPACK_IMPORTED_MODULE_1__utils_js__["loadByAjax"](pageUrl,
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

        notify.textContent = 'В задаче '+num+' '+__WEBPACK_IMPORTED_MODULE_1__utils_js__["declOfNum"](num, ['новый комментарий','новых комментария','новых комментариев']);

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
if (true) {
    console.time('load userSettings');
}

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



if (true) {
    console.timeEnd('load userSettings');
}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return taskHeaderDesign; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__finders_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pcss_taskHeaderDesign_pcss__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pcss_taskHeaderDesign_pcss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__pcss_taskHeaderDesign_pcss__);
if(true){
    console.time('load taskHeaderDesign');
}



function taskHeaderDesign() {

    const taskData = dataMaining();
    //console.log(taskData);
    let dashboard = addLeftColumn();
    let fragment = document.createDocumentFragment();

    let data = [
        [
            {
                'title': 'Задача №',
                'data': [`<span class="prim-i">${taskData.task.id}</span> <span class="sec-i">от ${taskData.task.begin}</span>`]
            },
            {
                'title': 'Статус',
                'data': [`<span class="reg-i">${taskData.task.state}</span>`]
            }
            // {
            //     'title': 'Иерархия',
            //     'data': []
            // }
        ],
        [
            {
                'title': 'Заявитель',
                'data': [`<span class="prim-i">${taskData.owner.name}</span>`,`<a href="mailto:${taskData.owner.email}" class="reg-i">${taskData.owner.email}</a>`]
            }
        ],
        [
            {
                'title': 'Проект',
                'data': [`<span class="prim-i">${taskData.project}</span>`]
            }
        ],
        [
            {
                'title': 'Тип задачи',
                'data': [`<span class="reg-i">${taskData.task.type}</span>`]
            }
        ],
        [
            {
                'title': 'Время',
                'data': [`<span class="reg-i">${taskData.time.spent} мин.</span> <span class="sec-i">из ${taskData.time.planned}</span> <span class="${countLeftTime(taskData.time.spent, taskData.time.planned)}">(${taskData.time.left})</span>`]
            }
        ]
    ];

    dashboard.appendChild(createTemplate(data,fragment));
}

function dataMaining() {
    let sourseTbl = document.getElementById('task-bar').firstElementChild;
    let td = Array.from(sourseTbl.querySelectorAll('td'));

    //задача
        //название !
        //номер (id) !
        //дата начала !
        //тип задачи !
    //завитель
        //имя !
        //почта !
        //организация !
    //проект !

    //время
        //планируемое
        //затрачено
        //осталось

    let source = {};
    const taskHead = __WEBPACK_IMPORTED_MODULE_0__finders_js__["getTaskHead"]();

    source.task = {
        'title': taskHead.title,
        'id': __WEBPACK_IMPORTED_MODULE_0__finders_js__["getTaskId"](),
        'begin': findInCells(td,'Дата'),
        'type': findInCells(td,'Тип'),
        'state': taskHead.state
    };

    let owner = findInCells(td,'Заявитель',true);

    source.owner = {
        'name': owner[0].replace(/<[^>]*>/g, ''),
        'email': owner[1],
        'f': owner[2].replace(/<[^>]*>/g, '')
    };

    source.time = {
        'spent' : parseInt(findInCells(td,'Затрачено')),
        'planned':  parseInt(findInCells(td,'Планируемое')),
        'left':  parseInt(findInCells(td,'Оставшееся'))
    };

    source.project = findInCells(td,'Проект');

    return source;
}

function findInCells(arr,str,parse = false) {
    let result = arr.filter(function (cell) {
        if(cell.textContent.trim().includes(str)){
            return cell
        }
    });

    if(parse){
        return result[0].nextElementSibling.innerHTML.split('<br>');
    }

    return result[0].nextElementSibling.textContent.trim();
}

function addLeftColumn() {
    let wrap = document.getElementById('main-content');
    let col = document.createElement('div');
    col.classList.add('left-col');
    wrap.insertBefore(col, wrap.firstChild);

    let dashboard = document.createElement('div');
    dashboard.classList.add('task-dashboard');
    col.appendChild(dashboard);

    return dashboard;
}

function createTemplate(dataArr,placeholder) {
    dataArr.map(function (group) {
        let block = document.createElement('div');
        block.classList.add('txt-block');

        for(let val of group){
            let title = document.createElement('div');
            title.classList.add('txt-block__title');
            title.textContent = val.title;

            let data = document.createElement('div');
            data.classList.add('txt-block__data');

            for(let str of val.data){
                let p = document.createElement('p');
                p.innerHTML = str;
                data.appendChild(p);
            }

            block.appendChild(title);
            block.appendChild(data);
        }

        placeholder.appendChild(block)
    });

    //console.log(placeholder);
    return placeholder;
}

function countLeftTime(spent,plan) {
    let cssclass = 'reg-i';

    if(parseInt(spent) > parseInt(plan)){
        cssclass = 'alert-i';
    }
    return cssclass;
}






if(true){
    console.timeEnd('load taskHeaderDesign');
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
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--0-1!../../node_modules/postcss-loader/lib/index.js!./taskHeaderDesign.pcss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--0-1!../../node_modules/postcss-loader/lib/index.js!./taskHeaderDesign.pcss");
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
exports.push([module.i, ".txt-block__data{color:#a0a4a7;font-size:1rem}.txt-block__data p{margin:0}#main-content{display:-ms-grid;display:grid;-ms-grid-columns:500px 1fr;grid-template-columns:500px 1fr}#main-content hr{display:none}#task-footer{grid-column:2/3}.left-col{background-color:#282f37;padding:2.5rem}.task-dashboard{position:-webkit-sticky;position:sticky;top:0}.txt-block{margin-bottom:1.5rem;line-height:1.5;display:-ms-grid;display:grid;-ms-grid-columns:85px 1fr;grid-template-columns:85px 1fr}.txt-block__title{color:#848e94;font-size:.75rem;white-space:nowrap;padding-top:.333em}.prim-i{color:#cfd81b}.reg-i{color:#fff}.sec-i{font-size:.875em}.alert-i{color:#bf4f5c}", ""]);

// exports


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFydC1zdXBwb3J0LnVzZXIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2M1ZDQ3MDNmNWZhY2RlMzA5MTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL19maW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19hZGRDU1NTZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzPzdmZjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHlmaUNvbW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9fbG9hZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbWVudHNEZXNpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvY29tbWVudHNEZXNpZ24ucGNzcz84NDE4Iiwid2VicGFjazovLy8uL3NyYy9wY3NzL2NvbW1lbnRzRGVzaWduLnBjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbGN1bGF0ZUVsYXBzZWRUaW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9nb1RvVGFzay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY291bnRXb3JrZXJUaW1lLmpzIiwid2VicGFjazovLy8uL3NyYy90YXNrRm9vdGVyRGVzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcz8wYzA0Iiwid2VicGFjazovLy8uL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWxlbXNNb2RpZmljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhdmVOZXdDb21tZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3B5UGFzdGVDb21tZW50UXVvdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rhc2tVcGRhdGVOb3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuY2hvckxpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZXJTZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGFza0hlYWRlckRlc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGNzcy90YXNrSGVhZGVyRGVzaWduLnBjc3M/N2FkOSIsIndlYnBhY2s6Ly8vLi9zcmMvcGNzcy90YXNrSGVhZGVyRGVzaWduLnBjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgY2M1ZDQ3MDNmNWZhY2RlMzA5MTIiLCJmdW5jdGlvbiBnZXRUYXNrSWQoKSB7XHJcbiAgICBjb25zdCB0YXNrSWQgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNwbGl0KCcmJyk7XHJcblxyXG4gICAgbGV0IGlkID0gdGFza0lkLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtLnNwbGl0KCc9JylbMF0gPT09ICdpZCc7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaWRbMF0uc3BsaXQoXCI9XCIpWzFdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUYXNrSGVhZCgpIHtcclxuICAgIGxldCB0YXNrSGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXRpdGxlJykudGV4dENvbnRlbnQuc3BsaXQoJyAtICcpO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHRhc2tIZWFkKSAmJiB0YXNrSGVhZC5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIHJldHVybiB7J3RpdGxlJzogdGFza0hlYWRbMV0udHJpbSgpLCAnc3RhdGUnOiB0YXNrSGVhZFsyXS5zcGxpdCgnICcpWzFdfTtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rhc2sgaGVhZCBub3QgZm91bmQnKTtcclxufVxyXG5cclxuLy/Qv9C+0LvRg9GH0LjRgtGMINCy0YHQtSDQutCw0LzQtdC90YLRiyDQsiDQt9Cw0LTQsNGH0LVcclxuLy/RgNCw0LHQvtGC0LDQtdGCINC60L7RgNGA0LXQutGC0L3QviDQv9C+0YHQu9C1INC30LDQv9GD0YHQutCwIGNvbW1lbnRzRGVzaWduXHJcbmZ1bmN0aW9uIGdldEFsbENhbW1lbnRzKCkge1xyXG4gICAgLy9sZXQgcm93cyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG4gICAgLy9yZXR1cm4gcm93cy5tYXAoZ2V0Q29tbWVudEZyb21Sb3cpO1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLWNvbW1lbnQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29tbWVudEZyb21Sb3cocm93KSB7XHJcbiAgICByZXR1cm4gcm93LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LXdyYXAnKTtcclxufVxyXG5cclxuLy/RgNCw0LHQvtGC0LDQtdGCINC60L7RgNGA0LXQutGC0L3QviDQtNC70Y8g0LfQsNC/0YPRgdC60LAgY29tbWVudHNEZXNpZ25cclxuZnVuY3Rpb24gZ2V0QWxsQ29tbWVudHNSb3dzKCkge1xyXG4gICAgbGV0IHJvd3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy10YmwnKS5xdWVyeVNlbGVjdG9yQWxsKCdUUicpKTtcclxuICAgIHJvd3MgPSByb3dzLnNwbGljZSgxLCByb3dzLmxlbmd0aCk7IC8v0LjRgdC60LvRjtGH0LjRgtGMINC/0LXRgNCy0YPRjiDRgdGC0YDQvtC60YMg0YEg0LfQsNCz0L7Qu9C+0LLQutCw0LzQuCDRgdGC0L7Qu9Cx0YbQvtCyXHJcblxyXG4gICAgcmV0dXJuIHJvd3MuZmlsdGVyKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgIHJldHVybiByb3cucXVlcnlTZWxlY3RvckFsbCgndGQnKS5sZW5ndGggPiAxO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vINC/0L7Qu9GD0YfQuNGC0Ywg0YHQv9C40YHQvtC6INCy0YHQtdGFINGB0L7RgtGA0YPQtNC90LjQutC+0LIg0LIg0LfQsNC00LDRh9C1XHJcbmZ1bmN0aW9uIGdldEFsbFdvcmtlcnMoKSB7XHJcbiAgICBsZXQgcm93cyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG5cclxuICAgIGxldCB3b3JrZXJzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgd29ya2Vycy5wdXNoKHJvd3NbaV0uY2hpbGRyZW5bNF0udGV4dENvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXF1aXJlKCcuL191dGlscycpLmVsaW1pbmF0ZUR1cGxpY2F0ZXMod29ya2Vycyk7XHJcbn1cclxuXHJcbi8vINC/0L7Qu9GD0YfQtdC90LjQtSDRgdGC0YDQvtC60Lgg0YEg0LLRgNC10LzQvdC10Lwg0LjQtyDRgtCw0LHQu9C40YbRiyDRgSDQutC+0LzQvNC10L3RgtCw0YDQuNC80Lgg0LfQsNC00LDRh9C4XHJcbmZ1bmN0aW9uIGdldFJvd1RpbWVTdHJpbmcocm93KSB7XHJcbiAgICBsZXQgdCA9ICcnO1xyXG5cclxuICAgIGlmIChyb3cuY2hpbGRyZW5bMTBdKSB7XHJcbiAgICAgICAgLy/QtNC+INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdCA9IHJvdy5jaGlsZHJlblsxMF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgdCA9IHBhcnNlSW50KHQuc3BsaXQoJy8nKVswXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8v0L/QvtGB0LvQtSDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgIHQgPSBwYXJzZUludChyb3cucXVlcnlTZWxlY3RvcignLmVsYXBzZWQtdGltZScpLnRleHRDb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IHtnZXRUYXNrSWQsZ2V0VGFza0hlYWQsZ2V0QWxsQ2FtbWVudHMsZ2V0Q29tbWVudEZyb21Sb3csZ2V0QWxsQ29tbWVudHNSb3dzLGdldEFsbFdvcmtlcnMsZ2V0Um93VGltZVN0cmluZ307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvX2ZpbmRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbi8v0L7Qv9GA0LXQtNC10LvQtdC90LjQtSDRgdGC0YDQsNC90LjRhtGLINC/0L4gZ2V0INC/0LDRgNCw0LzQtdGC0YDRgyBhLCDQvdCw0L/RgNC40LzQtdGAID9hPXVzZXJfcGFnZVxyXG5mdW5jdGlvbiBnZXRVUkxBY3Rpb24oKSB7XHJcbiAgICBsZXQgZ2V0X2FjdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KFwiPVwiKTtcclxuICAgIGdldF9hY3Rpb24gPSBnZXRfYWN0aW9uWzFdLnNwbGl0KCcmJyk7XHJcbiAgICByZXR1cm4gZ2V0X2FjdGlvblswXTtcclxufVxyXG5cclxuLy/Rg9C00LDQu9C10L3QuNC1INC00YPQsdC70LjQutCw0YLQvtCyXHJcbmZ1bmN0aW9uIGVsaW1pbmF0ZUR1cGxpY2F0ZXMoYXJyKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc3RyID0gYXJyW2ldO1xyXG4gICAgICAgIG9ialtzdHJdID0gdHJ1ZTsgLy8g0LfQsNC/0L7QvNC90LjRgtGMINGB0YLRgNC+0LrRgyDQsiDQstC40LTQtSDRgdCy0L7QudGB0YLQstCwINC+0LHRitC10LrRgtCwXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7IC8vINC40LvQuCDRgdC+0LHRgNCw0YLRjCDQutC70Y7Rh9C4INC/0LXRgNC10LHQvtGA0L7QvCDQtNC70Y8gSUU4LVxyXG59XHJcblxyXG4vL9GB0L7Qt9C00LDQvdC40LUg0LTQsNGC0Ysg0LjQtyDRgdGC0YDQvtC60LhcclxuZnVuY3Rpb24gY3JlYXRlSVNPRGF0ZShzdHIpIHtcclxuICAgIGxldCBkYXRlX3N0ciA9IHN0ci5zcGxpdCgnLicpO1xyXG4gICAgbGV0IGRheV9zdHIgPSBkYXRlX3N0clswXTtcclxuICAgIGxldCBtb250aF9zdHIgPSBkYXRlX3N0clsxXTtcclxuICAgIGxldCB5ZWFyX3N0ciA9IGRhdGVfc3RyWzJdO1xyXG4gICAgbGV0IGRhdGVfaXNvX3N0ciA9IHllYXJfc3RyICsgJy0nICsgbW9udGhfc3RyICsgJy0nICsgZGF5X3N0cjtcclxuICAgIGRhdGVfaXNvX3N0ciA9IERhdGUucGFyc2UoZGF0ZV9pc29fc3RyKTtcclxuICAgIHJldHVybiBkYXRlX2lzb19zdHI7XHJcbn1cclxuXHJcbi8vINC/0L7Qu9GD0YfQtdC90LjQtSDRgdGC0YDQvtC60Lgg0YEg0LTQsNGC0L7QuSDQuNC3INGC0LDQsdC70LjRhtGLINGBINC60L7QvNC80LXQvdGC0LDRgNC40LzQuCDQt9Cw0LTQsNGH0LhcclxuZnVuY3Rpb24gZ2V0Um93RGF0ZVN0cmluZyhyb3cpIHtcclxuICAgIGxldCB0ID0gJyc7XHJcbiAgICBpZiAocm93LmNoaWxkcmVuWzNdKSB7XHJcbiAgICAgICAgLy/QtNC+INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdCA9IHJvdy5jaGlsZHJlblszXS50ZXh0Q29udGVudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy/Qv9C+0YHQu9C1INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdCA9IHJvdy5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1kYXRlJykudGV4dENvbnRlbnRcclxuICAgIH1cclxuXHJcbiAgICB0ID0gdC5zcGxpdCgnICcpO1xyXG5cclxuICAgIHJldHVybiBjcmVhdGVJU09EYXRlKHRbMF0pO1xyXG59XHJcblxyXG4vL9GE0L7RgNC80LDRgtC40YDQvtCy0LDQvdC40LUg0LTQsNGC0YtcclxuZnVuY3Rpb24gZGF0ZUZvcm1hdHRlcihkYXRlKSB7XHJcbiAgICBsZXQgZm9ybWF0dGVyID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJydVwiKTtcclxuICAgIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludChkYXRlLCAxMCkpO1xyXG4gICAgZGF0ZSA9IGZvcm1hdHRlci5mb3JtYXQoZGF0ZSk7XHJcbiAgICByZXR1cm4gZGF0ZTtcclxufVxyXG5cclxuLy8g0YHQutGA0YvRgtGML9C/0L7QutCw0LfQsNGC0Ywg0L7Qv9GA0LXQtNC10L3QvdGL0LUgb3B0aW9uINCyIHNlbGVjdFxyXG5mdW5jdGlvbiBtb2RpZnlTZWxlY3RPcHRpb25zTGlzdChsaXN0LCBwYXJhbXMpIHtcclxuICAgIEFycmF5LmZyb20obGlzdCkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5pbmRleE9mKGl0ZW0udmFsdWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vL9Cy0YvQt9C+0LIg0YTRg9C90LrRhtC40Lgg0L/QviDRgdC+0YfQtdGC0LDQvdC40Y4g0LrQu9Cw0LLQuNGI0YxcclxuZnVuY3Rpb24gcnVuT25LZXlzKGZ1bmMsIGVsZW0pIHtcclxuICAgIGxldCBjb2RlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcclxuXHJcbiAgICBsZXQgcHJlc3NlZCA9IHt9O1xyXG5cclxuICAgIGVsZW0ub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcblxyXG4gICAgICAgIHByZXNzZWRbZS5rZXlDb2RlXSA9IHRydWU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29kZXMubGVuZ3RoOyBpKyspIHsgLy8g0L/RgNC+0LLQtdGA0LjRgtGMLCDQstGB0LUg0LvQuCDQutC70LDQstC40YjQuCDQvdCw0LbQsNGC0YtcclxuICAgICAgICAgICAgaWYgKCFwcmVzc2VkW2NvZGVzW2ldXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDRh9GC0L7QsdGLINC40LfQsdC10LbQsNGC0YwgXCLQt9Cw0LvQuNC/0LDQvdC40Y9cIiDQutC70LDQstC40YjQuCAtLSDQvtCx0L3Rg9C70Y/QtdC8INGB0YLQsNGC0YPRgSDQstGB0LXRhSDQutC70LDQstC40YgsINC/0YPRgdGC0Ywg0L3QsNC20LjQvNCw0LXRgiDQstGB0ZEg0LfQsNC90L7QstC+XHJcbiAgICAgICAgcHJlc3NlZCA9IHt9O1xyXG5cclxuICAgICAgICBmdW5jKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW0ub25rZXl1cCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZSA9IGUgfHwgdy5ldmVudDtcclxuXHJcbiAgICAgICAgZGVsZXRlIHByZXNzZWRbZS5rZXlDb2RlXTtcclxuICAgIH07XHJcbn1cclxuXHJcbi8vYWpheCDQt9Cw0L/RgNC+0YFcclxuZnVuY3Rpb24gbG9hZEJ5QWpheChwYXRoLCBzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IoeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB4aHIub3BlbihcIkdFVFwiLCBwYXRoLCB0cnVlKTtcclxuICAgIHhoci5zZW5kKCk7XHJcbn1cclxuXHJcbi8vINGE0L7RgNC80LjRgNC+0LLQsNC90LjQtSDRgdGC0YDQvtC60Lgg0YEg0L3Rg9C20L3Ri9C8INC+0LrQvtC90YfQsNC90LjQtdC8INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDRh9C40YHQu9CwXHJcbi8vINC90LDQv9GA0LjQvNC10YAgLSDQvNC40L3Rg9GC0LAsINC80LjQvdGD0YLRiywg0LzQuNC90YPRglxyXG5mdW5jdGlvbiBkZWNsT2ZOdW0obnVtYmVyLCB0aXRsZXMpIHtcclxuICAgIGxldCBjYXNlcyA9IFsyLCAwLCAxLCAxLCAxLCAyXTtcclxuICAgIHJldHVybiB0aXRsZXNbKG51bWJlciAlIDEwMCA+IDQgJiYgbnVtYmVyICUgMTAwIDwgMjApID8gMiA6IGNhc2VzWyhudW1iZXIgJSAxMCA8IDUpID8gbnVtYmVyICUgMTAgOiA1XV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRJbkFycmF5KGFyciwgdmFsKSB7XHJcbiAgICByZXR1cm4gYXJyLmluZGV4T2YodmFsKTtcclxufVxyXG5cclxuZXhwb3J0IHtnZXRVUkxBY3Rpb24sZWxpbWluYXRlRHVwbGljYXRlcyxjcmVhdGVJU09EYXRlLGdldFJvd0RhdGVTdHJpbmcsZGF0ZUZvcm1hdHRlcixtb2RpZnlTZWxlY3RPcHRpb25zTGlzdCxydW5PbktleXMsbG9hZEJ5QWpheCxkZWNsT2ZOdW0sZmluZEluQXJyYXl9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9fdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcbmlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ3RvdGFsJyk7XHJcbn1cclxuaW1wb3J0IHtnZXRVUkxBY3Rpb259IGZyb20gJy4vX3V0aWxzLmpzJztcclxuXHJcbmltcG9ydCB7YWRkUGFnZUVsZW1zfSBmcm9tICcuL19hZGRDU1NTZWxlY3RvcnMuanMnO1xyXG5cclxuaW1wb3J0IHttb2R5ZmlDb21tZW50c30gZnJvbSAnLi9tb2R5ZmlDb21tZW50cy5qcyc7XHJcblxyXG5pbXBvcnQge2NvbW1lbnRzRGVzaWdufSBmcm9tICcuL2NvbW1lbnRzRGVzaWduLmpzJztcclxuXHJcbmltcG9ydCB7Y2FsY3VsYXRlRWxhcHNlZFRpbWV9IGZyb20gJy4vY2FsY3VsYXRlRWxhcHNlZFRpbWUuanMnO1xyXG5cclxuaW1wb3J0IHtnb1RvVGFza0RhdGFsaXN0fSBmcm9tICcuL2dvVG9UYXNrLmpzJztcclxuXHJcbmltcG9ydCB7Y291bnRXb3JrZXJUaW1lfSBmcm9tICcuL2NvdW50V29ya2VyVGltZS5qcyc7XHJcblxyXG5pbXBvcnQge3Rhc2tGb290ZXJEZXNpZ259IGZyb20gJy4vdGFza0Zvb3RlckRlc2lnbi5qcyc7XHJcblxyXG5pbXBvcnQge2VsZW1zTW9kaWZpY2F0aW9ufSBmcm9tICcuL2VsZW1zTW9kaWZpY2F0aW9uLmpzJztcclxuXHJcbmltcG9ydCB7c2F2ZU5ld0NvbW1lbnR9IGZyb20gJy4vc2F2ZU5ld0NvbW1lbnQuanMnO1xyXG5cclxuaW1wb3J0IHtjb3B5UGFzdGVDb21tZW50UXVvdGV9IGZyb20gJy4vY29weVBhc3RlQ29tbWVudFF1b3RlLmpzJztcclxuXHJcbmltcG9ydCB7dGFza1VwZGF0ZU5vdGlmeX0gZnJvbSAnLi90YXNrVXBkYXRlTm90aWZ5LmpzJztcclxuXHJcbmltcG9ydCB7YW5jaG9yTGlua30gZnJvbSAnLi9hbmNob3JMaW5rLmpzJztcclxuXHJcbmltcG9ydCB7dXNlclNldHRpbmdzfSBmcm9tICcuL3VzZXJTZXR0aW5ncy5qcyc7XHJcblxyXG5pbXBvcnQge3Rhc2tIZWFkZXJEZXNpZ259IGZyb20gJy4vdGFza0hlYWRlckRlc2lnbi5qcydcclxuXHJcbmNvbnN0IGFjdGlvbl9wYWdlID0gZ2V0VVJMQWN0aW9uKCk7XHJcblxyXG5zd2l0Y2ggKGFjdGlvbl9wYWdlKSB7XHJcbiAgICBjYXNlICduZXcnOlxyXG4gICAgICAgIHVzZXJTZXR0aW5ncygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAncmVkJzpcclxuICAgICAgICBhZGRQYWdlRWxlbXMoKTtcclxuICAgICAgICAvL2xldCBlbGVtc01vZGlmaWNhdGlvbiA9IG5ldyBlbGVtc01vZGlmaWNhdGlvbigpO1xyXG4gICAgICAgIGVsZW1zTW9kaWZpY2F0aW9uKCk7XHJcbiAgICAgICAgbW9keWZpQ29tbWVudHMoKTtcclxuXHJcbiAgICAgICAgaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpe1xyXG4gICAgICAgICAgICBjb3VudFdvcmtlclRpbWUoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3b3JrZXItdGltZS1jb3VudCcpID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50V29ya2VyVGltZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzYXZlTmV3Q29tbWVudCgpO1xyXG4gICAgICAgIGNhbGN1bGF0ZUVsYXBzZWRUaW1lKCk7XHJcbiAgICAgICAgY29tbWVudHNEZXNpZ24oKTtcclxuICAgICAgICB0YXNrRm9vdGVyRGVzaWduKCk7XHJcbiAgICAgICAgY29weVBhc3RlQ29tbWVudFF1b3RlKCk7XHJcbiAgICAgICAgdGFza1VwZGF0ZU5vdGlmeSgpO1xyXG4gICAgICAgIGdvVG9UYXNrRGF0YWxpc3QoKTtcclxuICAgICAgICBhbmNob3JMaW5rKCk7XHJcbiAgICAgICAgdGFza0hlYWRlckRlc2lnbigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAndXNlcl9wYWdlJzpcclxuICAgICAgICBhZGRQYWdlRWxlbXMoKTtcclxuICAgICAgICBnb1RvVGFza0RhdGFsaXN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbn1cclxuXHJcbmlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKXtcclxuICAgIGNvbnNvbGUubG9nKCdoZWxsbycpO1xyXG4gICAgY29uc29sZS50aW1lRW5kKCd0b3RhbCcpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8v0YHRjtC00LAg0LTQvtCx0LDQu9GP0Y7RgtGB0Y8g0Y3Qu9C10LzQtdC90YLRiyDRgdGC0YDQsNC90LjRhtGLINCyINC60L7RgtC+0YDRi9C1INCy0YHRgtCw0LLQu9GP0Y7RgtGB0Y8g0YHQvtC30LTQsNC90YvQtSDRgdC60YDQuNC/0YLQvtC8INCx0LvQvtC60LhcclxuLy/QuC7QuNC70Lgg0L7QvdC4INC80L7QtNC40YTQuNGG0LjRgNGD0Y7RgtGB0Y8g0YHQutGA0LjQv9GC0L7QvFxyXG5cclxuaW1wb3J0IHtnZXRBbGxDb21tZW50c1Jvd3N9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5cclxuZnVuY3Rpb24gYWRkUGFnZUVsZW1zKCkge1xyXG4gICAgbGV0ICRjb250ZW50X2NlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtW25hbWU9XCJ0aGVGb3JtXCJdJyk7XHJcbiAgICAkY29udGVudF9jZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCAnbWFpbi1jb250ZW50Jyk7XHJcblxyXG4gICAgbGV0ICRjb21tZW50c190YmwgPSAkY29udGVudF9jZWxsLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiVEFCTEVcIilbMF07XHJcblxyXG4gICAgaWYoJGNvbW1lbnRzX3RibCl7XHJcbiAgICAgICAgJGNvbW1lbnRzX3RibC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvbW1lbnRzLXRibCcpO1xyXG5cclxuICAgICAgICBsZXQgcm93cyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG5cclxuICAgICAgICByb3dzLm1hcChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgIHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpWzVdLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtd3JhcCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBpbnB1dF9kaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuaW5wdXRfYm94Jyk7IC8v0LXRgdGC0Ywg0L3QsCDRgdGC0YDQsNC90LjRhtC1INC30LDQtNCw0YfQuFxyXG5cclxuICAgIGlmIChpbnB1dF9kaXYpIHtcclxuICAgICAgICBpbnB1dF9kaXYuaWQgPSAndGFzay1iYXInO1xyXG4gICAgICAgIGxldCAkdXNlcl90b29sYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICAgICAgJHVzZXJfdG9vbGJhci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3VzZXItdG9vbGJhcicpO1xyXG4gICAgICAgICR1c2VyX3Rvb2xiYXIuY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyJyk7XHJcblxyXG4gICAgICAgIGlucHV0X2Rpdi5hcHBlbmRDaGlsZCgkdXNlcl90b29sYmFyKTtcclxuICAgIH1cclxuXHJcbiAgICAvL9C/0L7QtNCy0LDQuyDQt9Cw0LTQsNGH0LhcclxuICAgIGxldCAkdGFza19mb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0YWJsZS50aGVGb3JtJyk7XHJcblxyXG4gICAgaWYoJHRhc2tfZm9vdGVyLmxlbmd0aCl7XHJcbiAgICAgICAgLy/QvtCx0LXRgNGC0LrQsFxyXG4gICAgICAgICR0YXNrX2Zvb3RlciA9ICR0YXNrX2Zvb3RlclswXTtcclxuICAgICAgICAkdGFza19mb290ZXIuaWQgPSAndGFzay1mb290ZXInO1xyXG5cclxuICAgICAgICAvL9GC0LDQsdC70LjRhtCwINGBIHRleHRhcmVhINC60LDQvNC10L3RgtCwXHJcbiAgICAgICAgbGV0ICRmb290ZXJfdGJscyA9ICR0YXNrX2Zvb3Rlci5xdWVyeVNlbGVjdG9yQWxsKCd0YWJsZScpO1xyXG5cclxuICAgICAgICBsZXQgJGNvbW1lbnRUYmwgPSAkZm9vdGVyX3RibHNbMF07XHJcbiAgICAgICAgJGNvbW1lbnRUYmwuaWQgPSAndGJsLW5ldy1jb21tZW50JztcclxuXHJcbiAgICAgICAgLy/QvtCx0LXRgNGC0LrQsCDRj9GH0LXQudC60Lgg0YEgdGV4dGFyZWFcclxuICAgICAgICBsZXQgJG5ld0NvbW1lbnQgPSAkY29tbWVudFRibC5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpWzFdO1xyXG4gICAgICAgICRuZXdDb21tZW50LmlkID0gJ25ldy1jb21tZW50LXdyYXAnO1xyXG5cclxuICAgICAgICAvL9C00L7QsdCw0LLQu9GOINC+0LHQtdGA0YLQutGDINC00LvRjyB0ZXh0YXJlYVxyXG4gICAgICAgIC8v0LIg0L3QtdC1INCx0YPQtNGDINCy0YHRgtCw0LLQu9GP0YLRjCDQutC90L7Qv9C60Lgg0LLRgdGP0LrQuNC1XHJcbiAgICAgICAgbGV0ICR0YXJlYVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAkdGFyZWFXcmFwLmlkID0gJ3RhcmVhLXdyYXAnO1xyXG4gICAgICAgICR0YXJlYVdyYXAuY2xhc3NMaXN0LmFkZCgndGFyZWEtd3JhcCcpO1xyXG5cclxuICAgICAgICAkdGFyZWFXcmFwLmFwcGVuZENoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0JykpO1xyXG4gICAgICAgICRuZXdDb21tZW50LmFwcGVuZENoaWxkKCR0YXJlYVdyYXApO1xyXG5cclxuICAgICAgICAvL9Ci0LDQsdC70LjRhtCwINGB0YLQsNGC0YPRgdC+0LIg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgbGV0ICRzdGF0dXNUYmwgPSAkZm9vdGVyX3RibHNbMV0ucXVlcnlTZWxlY3RvcigndGFibGUnKTtcclxuICAgICAgICAkc3RhdHVzVGJsLmlkID0gJ3RibC1zdGF0dXMnO1xyXG4gICAgfVxyXG4gICAgLy/Qt9Cw0LPQvtC70L7QstC+0Log0LfQsNC00LDRh9C4XHJcbiAgICBsZXQgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDEnKTtcclxuXHJcbiAgICB0YXNrVGl0bGUuaWQgPSAndGFzay10aXRsZSc7XHJcbn1cclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9wY3NzL3VzZXJzY3JpcHQucGNzcyc7XHJcblxyXG5leHBvcnQge2FkZFBhZ2VFbGVtc307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvX2FkZENTU1NlbGVjdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi91c2Vyc2NyaXB0LnBjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdXNlcnNjcmlwdC5wY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3VzZXJzY3JpcHQucGNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGNzcy91c2Vyc2NyaXB0LnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI21haW4tY29udGVudHtcXHJcXG4gICAgLyrRg9Cx0LjRgNCw0Y4g0LvQuNGI0L3QuNC1INC+0YLRgdGC0YPQv9GLINC4IGJyINGH0YLQvtCx0Ysg0YPQvNC10L3RjNGI0LjRgtGMINC00YvRgNGDINC/0L7QtCDQv9C+0LvRj9C80Lgg0LrQsNC80LXQvdGC0LAqL21hcmdpbi1ib3R0b206MH0jbWFpbi1jb250ZW50IGJyOmxhc3QtY2hpbGR7ZGlzcGxheTpub25lfS5vbm9mZi1vcHR7bWFyZ2luOjAgNnB4IDAgMTBweH0ubm9uZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fS5oaWRkZW4tZWxlbXtwb3NpdGlvbjpmaXhlZCFpbXBvcnRhbnQ7bGVmdDotOTk5ZW07ei1pbmRleDotMTt2aXNpYmlsaXR5OmhpZGRlbn0ubm9uZS52aWV3e2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50fS5jaF9hZGRye21hcmdpbjoxMHB4IDEwcHggMTBweCAwO3ZlcnRpY2FsLWFsaWduOnRvcH0udG90b3A+aW5wdXR7bWFyZ2luOjEwcHggMCAwfS5sYWJlbF9oZWFke2Rpc3BsYXk6YmxvY2s7bWFyZ2luOjAgMCAyMHB4fS5jbGVhcmZpeDphZnRlciwuY2xlYXJmaXg6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXCI7ZGlzcGxheTp0YWJsZTtjbGVhcjpib3RofS5hbGlzdHtmbG9hdDpyaWdodH0uYWxpc3QgcHttYXJnaW46MCAwIDEwcHg7bGluZS1oZWlnaHQ6MTt0ZXh0LWFsaWduOnJpZ2h0fS5iYXItd3JhcHtwYWRkaW5nOjhweCAxNXB4O2JhY2tncm91bmQ6IzJkMmQyZH0jY3VzdG9tLXByb2plY3QtbGlzdD5saSwjY3VzdG9tLXdvcmtlcnMtbGlzdD5saXt3aWR0aDoyMCU7ZmxvYXQ6bGVmdDtjdXJzb3I6cG9pbnRlcn0jY3VzdG9tLXByb2plY3QtbGlzdD5saTpmaXJzdC1jaGlsZHtkaXNwbGF5Om5vbmV9LnVzZXItbGlzdHttYXJnaW46MmVtIDFlbTtwYWRkaW5nOjA7bGlzdC1zdHlsZS1wb3NpdGlvbjppbnNpZGV9LnVzZXItbGlzdD5saXtsaW5lLWhlaWdodDoxLjV9LnNlbGVjdGVke2NvbG9yOmdyZWVufS5idG4tZmxhdHtwYWRkaW5nOi41ZW07YmFja2dyb3VuZDojZjBmMGYwO2N1cnNvcjpwb2ludGVyfS5idG4tZmxhdCwucm93LWl0ZW17ZGlzcGxheTppbmxpbmUtYmxvY2t9LnJvdy1pdGVte3ZlcnRpY2FsLWFsaWduOnRvcH0ucm93LWl0ZW06bm90KDpsYXN0LWNoaWxkKXttYXJnaW4tcmlnaHQ6MWVtfSNzZXR0aW5ncy1idG57bWFyZ2luOjAgMCAyMHB4fSNzZXR0aW5ncy1ib3h7ZGlzcGxheTpub25lO21hcmdpbjoyMHB4IDA7cGFkZGluZzoyMHB4IDA7b3V0bGluZToxcHggc29saWQgIzQxNDE0MX0jc2V0dGluZ3MtYm94LmlzLW9wZW57ZGlzcGxheTpibG9ja30udXNlci10aXRsZXtjb2xvcjojMDAwO21hcmdpbjowIDAgLjZlbTtmb250LXNpemU6MjBweDtwYWRkaW5nOjB9LnJlZ3VsYXItbGlua3tjb2xvcjojMDA1NGI5O291dGxpbmU6MCFpbXBvcnRhbnR9LnRpbWUtbGlzdCBwe21hcmdpbjo1cHggMDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59LnRpbWUtbGlzdD5wPnNwYW46Zmlyc3QtY2hpbGR7cGFkZGluZy1yaWdodDoxZW07Y3Vyc29yOnBvaW50ZXJ9OnJvb3QgLnRpbWUtbGlzdC10b3RhbHttYXJnaW4tdG9wOjFlbTtib3JkZXItdG9wOjFweCBzb2xpZH0uY29tbWVudC1jb2xsYXBzZWR7bWF4LWhlaWdodDo3MHB4O292ZXJmbG93OmhpZGRlbiFpbXBvcnRhbnR9LmxvbmctY29tbWVudHt3aWR0aDoxMDAlIWltcG9ydGFudDtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLXRvcDozMHB4fS5idG4tY29sbGFwc2V7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MH0uYnRuLWNvbGxhcHNlLWFsbHtwb3NpdGlvbjpmaXhlZDt0b3A6MTBweDtyaWdodDoxMHB4fTpyb290IC5kYXRlcy1saXN0e3dpZHRoOjE1MHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbjowIDIwcHggMCAwfS51c2VyLXRvb2xiYXJ7bWFyZ2luOjIwcHggMDtwYWRkaW5nOjIwcHggMTBweDtib3JkZXItdG9wOjFweCBzb2xpZCByZ2JhKDAsMCwwLC43KTtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtd3JhcDp3cmFwO2ZsZXgtd3JhcDp3cmFwfS51c2VyLXRvb2xiYXJfX2l0ZW17cGFkZGluZzoxMHB4IDE1cHg7YmFja2dyb3VuZDpoc2xhKDAsMCUsMTAwJSwuNik7Ym94LXNoYWRvdzowIDFweCAxcHggcmdiYSgwLDAsMCwuNil9OnJvb3QgLnVzZXItdG9vbGJhci10aXRsZXttYXJnaW46MCAwIDFlbTtwYWRkaW5nOjA7Y29sb3I6IzAwMH06cm9vdCAjY29tbWVudHMtdGJsIC5jb21tZW50LXdyYXB7Zm9udC1zaXplOjE0cHg7d2lkdGg6MTAwJSFpbXBvcnRhbnQ7bWF4LXdpZHRoOjgwMHB4O292ZXJmbG93OmhpZGRlbn06cm9vdCAjY29tbWVudHMtdGJsIGgxe2ZvbnQtc2l6ZToxMjAlO2ZvbnQtd2VpZ2h0OjQwMDttYXJnaW46MCAwIC40ZW07Y29sb3I6aW5oZXJpdH06cm9vdCAjY29tbWVudHMtdGJsIGJsb2NrcXVvdGV7cGFkZGluZzoxMHB4IDIwcHg7bWFyZ2luOjAgMCAyMHB4O2JvcmRlci1sZWZ0OjVweCBzb2xpZCAjY2NjfTpyb290ICNjb21tZW50cy10YmwgYmxvY2txdW90ZSBwe21hcmdpbjowfTpyb290ICNjb21tZW50cy10YmwgYmxvY2txdW90ZSBwOm5vdCg6bGFzdC1jaGlsZCl7bWFyZ2luLWJvdHRvbToxZW19OnJvb3QgI2NvbW1lbnRzLXRibCB1bHtwYWRkaW5nLWxlZnQ6LjZlbTtsaXN0LXN0eWxlLXBvc2l0aW9uOmluc2lkZX1cXHJcXG5cXHJcXG4vKnR5cG8qLy5zZWN0aW9uLXRpdGxle2NvbG9yOmluaGVyaXQ7bWFyZ2luOjAgMCAxZW07cGFkZGluZzowIWltcG9ydGFudH0ucy1pbmZve2NvbG9yOmdyYXk7Zm9udC1zaXplOjEycHh9XFxyXFxuXFxyXFxuLyrQstGB0YLQsNCy0LrQsCDRgtC10LrRgdGC0LAg0LjQtyBsb2NhbCBzdG9yYWdlKi8uYnRuLWluc2VydC1sc3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTtyaWdodDoyZW07dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzfS5idG4taW5zZXJ0LWxzLmlzLXZpc2libGV7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTE1MCUpfVxcclxcblxcclxcbi8qXFxyXFxuICAgINC00L7QsdCw0LLQu9C10L3QuNC1INC40LrQvtC90LrQuCDQv9C+0LTQv9C40YHQutC4INC90LAg0YPQstC10LTQvtC80LvQtdC90LjQtSDQviDQvdC+0LLRi9GFINC60LDQvNC10L3RgtCw0YVcXHJcXG4gICAg0LIg0LfQsNCz0L7Qu9C+0LLQvtC6INC30LDQtNCw0YfQuFxcclxcbiovLmFkZC1hbGVydHt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5Qm1hV3hzUFNJak1EQXdNREF3SWlCb1pXbG5hSFE5SWpJMElpQjJhV1YzUW05NFBTSXdJREFnTWpRZ01qUWlJSGRwWkhSb1BTSXlOQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JajRnSUNBZ1BIQmhkR2dnWkQwaVRUQWdNR2d5TkhZeU5FZ3dWakI2SWlCbWFXeHNQU0p1YjI1bElpOCtJQ0FnSUR4d1lYUm9JR1E5SWsweE1DNHdNU0F5TVM0d01XTXdJREV1TVM0NE9TQXhMams1SURFdU9Ua2dNUzQ1T1hNeExqazVMUzQ0T1NBeExqazVMVEV1T1Rsb0xUTXVPVGg2YlRndU9EY3ROQzR4T1ZZeE1XTXdMVE11TWpVdE1pNHlOUzAxTGprM0xUVXVNamt0Tmk0Mk9YWXRMamN5UXpFekxqVTVJREl1TnpFZ01USXVPRGdnTWlBeE1pQXljeTB4TGpVNUxqY3hMVEV1TlRrZ01TNDFPWFl1TnpKRE55NHpOeUExTGpBeklEVXVNVElnTnk0M05TQTFMakV5SURFeGRqVXVPREpNTXlBeE9DNDVORll5TUdneE9IWXRNUzR3Tm13dE1pNHhNaTB5TGpFeWVrMHhOaUF4TXk0d01XZ3RNM1l6YUMweWRpMHpTRGhXTVRGb00xWTRhREoyTTJnemRqSXVNREY2SWk4K1BDOXpkbWMrKTtjdXJzb3I6cG9pbnRlcn0jdGFzay10aXRsZSAuYWRkLWFsZXJ0e3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtvcGFjaXR5Oi41fSN0YXNrLXRpdGxlIC5hZGQtYWxlcnQuc2VsZWN0ZWR7b3BhY2l0eToxfSN0ZXh0e3Jlc2l6ZTp2ZXJ0aWNhbH1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3tcImltcG9ydExvYWRlcnNcIjoxfSEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIhLi9zcmMvcGNzcy91c2Vyc2NyaXB0LnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgbW9keWZpQ29tbWVudHMnKTtcclxufVxyXG5cclxuLy/Qv9C+0LjRgdC6INGB0YHRi9C70L7QuiDQsiDRgtC10LrRgdGC0LUg0LrQvtC80LzQtdC90YLQsNGA0LjQtdCyINC4INC+0LHQvtGA0LDRh9C40LLQsNC90LjQtSDQuNGFINCyIDxhPlxyXG4vL9GB0LLQvtGA0LDRh9C40LLQsNC90LjQtSDQtNC70LjQvdC90YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNC10LIsINC00L7QsdCw0LLQu9C10L3QuNC1INC60L3QvtC/0LrQuCDQodCy0YDQtdC90YPRgtGMLtGA0LDQt9Cy0LXRgNC90YPRgtGMINCy0YHQtVxyXG5cclxuZnVuY3Rpb24gbW9keWZpQ29tbWVudHMoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGRpdiwgdHh0O1xyXG4gICAgbGV0IHJvd3MgPSByZXF1aXJlKCcuL19maW5kZXJzJykuZ2V0QWxsQ29tbWVudHNSb3dzKCk7XHJcblxyXG4gICAgcmVxdWlyZSgnLi9fbG9hZGVycycpLmFkZGpzKCdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9tYXJrZG93bi1pdC84LjMuMS9tYXJrZG93bi1pdC5taW4uanMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZ29NYXJrZG93bihyb3dzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRpdiA9IHJlcXVpcmUoJy4vX2ZpbmRlcnMnKS5nZXRDb21tZW50RnJvbVJvdyhyb3dzW2ldKTtcclxuICAgICAgICB0eHQgPSByZXBsYWNlVVJMV2l0aEhUTUxMaW5rcyhkaXYuaW5uZXJIVE1MKTtcclxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gdHh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8v0L/QsNGA0YHQtdGAIG1hcmtkb3duXHJcbiAgICBmdW5jdGlvbiBnb01hcmtkb3duKHJvd3MpIHtcclxuXHJcbiAgICAgICAgbGV0IG1kID0gbWFya2Rvd25pdCgpO1xyXG4gICAgICAgIG1kLm9wdGlvbnMuaHRtbCA9IHRydWU7XHJcbiAgICAgICAgbWQub3B0aW9ucy5saW5raWZ5ID0gdHJ1ZTtcclxuICAgICAgICBtZC5vcHRpb25zLnR5cG9ncmFwaGVyID0gdHJ1ZTtcclxuICAgICAgICBtZC5vcHRpb25zLmJyZWFrcyA9IHRydWU7XHJcblxyXG4gICAgICAgIHJvd3MubWFwKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgYWRkTWFya2Rvd24ocm93LCBtZClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkTWFya2Rvd24ocm93LCBtZCkge1xyXG4gICAgICAgICAgICBsZXQgY29tbWVudCA9IHJlcXVpcmUoJy4vX2ZpbmRlcnMnKS5nZXRDb21tZW50RnJvbVJvdyhyb3cpO1xyXG4gICAgICAgICAgICBsZXQgYmxvY2tzID0gY29tbWVudC5pbm5lckhUTUwuc3BsaXQoJzxicj48YnI+Jyk7XHJcblxyXG4gICAgICAgICAgICBibG9ja3MgPSBibG9ja3MubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbmRleE9mKCc8YnI+JykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnNwbGl0KCc8YnI+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubWFwKGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ci50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBjb25jYXRFbGVtc1RvU3RyaW5nKGl0ZW0sICcqJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGNvbmNhdEVsZW1zVG9TdHJpbmcoaXRlbSwgJyYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubWFwKGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlck1kU3RyaW5nKHN0ciwgbWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gcmVwbGFjZUh0bWxHdFRvU3ltYm9sKGl0ZW0udHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gcmVuZGVyTWRTdHJpbmcoaXRlbSwgbWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAnPHA+JyArIGl0ZW0gKyAnPC9wPic7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29tbWVudC5pbm5lckhUTUwgPSBibG9ja3Muam9pbignJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZW5kZXJNZFN0cmluZyhzdHIsIG1kKSB7XHJcbiAgICAgICAgICAgIGxldCBtZGMgPSBbJyMnLCAnKicsICctJywgJz4nXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtZGMuaW5kZXhPZihzdHIuY2hhckF0KDApKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBzdHIgPSBtZC5yZW5kZXIoc3RyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vKyc8YnI+JyDQvdGD0LbQvdC+INGH0YLQvtCx0Ysg0LHRi9C70L4g0L/QvtGF0L7QttC1INC90LAg0LjRgdGF0L7QtNC90L7QtSDRhNC+0YDQvNCw0YLQuNGA0L7QstCw0L3QuNC1XHJcbiAgICAgICAgICAgICAgICBzdHIgPSBzdHIgKyAnPGJyPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdHI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v0L/QvtC40YHQuiDQuCDQvtCx0YrQtdC00LjQvdC10L3QuNC1INCyINC+0LTQvdGDINGB0YLRgNC+0LrRgyDRjdC70LXQvNC10L3RgtC+0LIg0LzQsNGB0YHQuNCy0LBcclxuICAgIC8v0L3QsNGH0LjQvdCw0Y7RidC40YXRgdGPINGBINGB0LjQvNCy0L7Qu9CwICpcclxuICAgIC8v0LTQu9GPINGB0L7Qt9C00LDQvdC40Y8g0YHQv9C40YHQutCwIHVsPmxpINCyIG1hcmtkb3duXHJcbiAgICBmdW5jdGlvbiBjb25jYXRFbGVtc1RvU3RyaW5nKGFyciwgc3ltYm9sKSB7XHJcbiAgICAgICAgbGV0IG5leHQ7XHJcbiAgICAgICAgbGV0IHN0cmluZ3MgPSBbXTtcclxuICAgICAgICBsZXQgbmV3bGlzdCA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBuZXh0ID0gaSArIDE7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXJyW2ldLmNoYXJBdCgwKSA9PT0gc3ltYm9sICYmIGFycltuZXh0XSAmJiBhcnJbbmV4dF0uY2hhckF0KDApID09PSBzeW1ib2wpIHtcclxuICAgICAgICAgICAgICAgIG5ld2xpc3QgKz0gcHJlZm9ybWF0U3RyaW5nKGFycltpXSwgc3ltYm9sKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghYXJyW25leHRdIHx8IGFycltuZXh0XS5jaGFyQXQoMCkgIT09IHN5bWJvbCkge1xyXG4gICAgICAgICAgICAgICAgbmV3bGlzdCArPSBwcmVmb3JtYXRTdHJpbmcoYXJyW2ldLCBzeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5ncy5wdXNoKG5ld2xpc3QpO1xyXG4gICAgICAgICAgICAgICAgbmV3bGlzdCA9ICcnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5ncy5wdXNoKGFycltpXSk7XHJcbiAgICAgICAgICAgICAgICAvLyBzdHJpbmdzLnB1c2gocHJlZm9ybWF0U3RyaW5nKGFycltpXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RyaW5ncztcclxuICAgIH1cclxuXHJcbiAgICAvL9C+0LHRgNCw0LHQvtGC0LrQsCDRgdGC0YDQvtC6INC/0LXRgNC10LQg0YTQvtGA0LzQsNGC0LjRgNC+0LLQsNC90LjQtdC8INCyIG1hcmtkb3duXHJcbiAgICBmdW5jdGlvbiByZXBsYWNlSHRtbEd0VG9TeW1ib2wodGV4dCkge1xyXG4gICAgICAgIGxldCBmaW5kID0gJyZndDsnO1xyXG4gICAgICAgIGxldCByZSA9IG5ldyBSZWdFeHAoZmluZCwgJ2cnKTtcclxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKHJlLCAnPicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByZWZvcm1hdFN0cmluZyhzdHIsIHN5bWJvbCA9ICd8Jykge1xyXG5cclxuICAgICAgICBsZXQgc3BhY2UgPSAnJztcclxuICAgICAgICAvL9C00LvRjyDRgdC/0LjRgdC60LAg0L3QsNC00L4g0YEg0L3QvtCy0L7QuSDRgdGC0YDQvtC60LhcclxuICAgICAgICBzd2l0Y2ggKHN5bWJvbCkge1xyXG4gICAgICAgICAgICBjYXNlICcqJzpcclxuICAgICAgICAgICAgICAgIHNwYWNlID0gJ1xcbic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy/QsCDQsiDRhtC40YLQsNGC0LUgLSDQsiDQvtC00L3RgyDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgY2FzZSAnJic6XHJcbiAgICAgICAgICAgICAgICBzcGFjZSA9ICcgJztcclxuICAgICAgICAgICAgICAgIHN0ciA9IHJlcGxhY2VIdG1sR3RUb1N5bWJvbChzdHIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKChzdHIubWF0Y2goL1xcbi9nKXx8W10pLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAvL3N0ciA9IHN0ci5yZXBsYWNlKC9cXG4vZywgJzxicj4nKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coc3RyKTtcclxuICAgICAgICAgICAgICAgIHN0ciA9ICc8cD4nICsgc3RyICsgJzwvcD4nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RyICsgc3BhY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVwbGFjZVVSTFdpdGhIVE1MTGlua3ModGV4dCkge1xyXG4gICAgICAgIGNvbnN0IGV4cCA9IC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWc7XHJcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShleHAsICc8YSBocmVmPVwiJDFcIiBjbGFzcz1cInJlZ3VsYXItbGlua1wiPiQxPC9hPicpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge21vZHlmaUNvbW1lbnRzfTtcclxuXHJcbmlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIG1vZHlmaUNvbW1lbnRzJyk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW9keWZpQ29tbWVudHMuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy/Qv9C+0LTQutC70Y7Rh9C10L3QuNC1INGB0YLRgNC+0L3QvdC10LPQviBqcyDQsiBoZWFkXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRqcyh1cmwsIGNhbGxiYWNrKSB7XHJcbiAgICBsZXQgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcbiAgICBsZXQgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgcy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2FsbGJhY2soKTtcclxuICAgIH07XHJcbiAgICBzLnNyYyA9IHVybDtcclxuICAgIGhlYWQuYXBwZW5kQ2hpbGQocyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9fbG9hZGVycy5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpe1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIGNvbW1lbnRzRGVzaWduJyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0QWxsQ29tbWVudHNSb3dzfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGNvbW1lbnRzRGVzaWduKCkge1xyXG4gICAgLy/Qv9C10YDQtdC00LXQu9C60LAg0LLQvdC10YjQvdC10LPQviDQstC40LTQsCDQutCw0LzQtdC90YLQvtCyXHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgY3JlYXRlVGVtcGxhdGUoKTtcclxuXHJcbiAgICBsZXQgdGJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXRibCcpO1xyXG5cclxuICAgIGxldCByb3dzID0gZ2V0QWxsQ29tbWVudHNSb3dzKCk7XHJcblxyXG4gICAgLy9yb3dzWzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocm93c1swXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKTtcclxuICAgIC8v0YHQutGA0YvQstCw0Y4sINCwINC90LUg0YPQtNCw0LvRj9GOINGH0YLQvtCx0Ysg0L3QtSDQvNC10L3Rj9GC0Ywg0YPQttC1INC40YHQv9C+0LvRjNC30YPQtdC80YvQtSDRhNGD0L3QutGG0LjQuFxyXG4gICAgLy/QstGL0LHQuNGA0LDRjtGJ0LjQtSDRgdGC0YDQvtC60Lgg0YEg0LrQsNC80LXQvdGC0LDQvNC4INC4INC40LPQvdC+0YDQuNGA0YPRjtGJ0LjQtSDQv9C10YDQstGD0Y4g0YHRgtGA0L7QutGDLlxyXG4gICAgLy/QldGB0LvQuCDRg9C00LDQu9GP0YLRjCDRgtC+INC/0L7Qu9GD0YfQuNGC0YHRjyDRh9GC0L4g0L/QtdGA0LLRi9C5INC60LDQvNC10L3RgiDQvdC1INCx0YPQtNC10YIg0L7QsdGA0LDQsdCw0YLRi9Cy0LDRgtGM0YHRj1xyXG4gICAgcm93c1swXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbi1lbGVtJyk7XHJcbiAgICAvL9GCLtC6LiDQsiDQtNCw0YDRgtC1INC00L7QsdCw0LLQuNC70Lgg0YHRgtGA0L7QuiDQv9GA0LXQtNGL0LTRg9GJ0LDRjyDRgdGC0YDQvtC60LAg0L3QtSDRgdC60YDRi9Cy0LDQtdGCINGB0YLRgNC+0LrRgyDRgSDQt9Cw0LPQvtC70L7QstC60LDQvNC4INGB0YLQvtC70LHRhtC+0LJcclxuICAgIC8v0L/QvtGN0YLQvtC80YMg0LXRidC1XHJcbiAgICB0YmwucXVlcnlTZWxlY3RvcigndHInKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4tZWxlbScpO1xyXG5cclxuICAgIHJvd3MubWFwKGZ1bmN0aW9uIChpdGVtLCBpKSB7XHJcbiAgICAgICAgbGV0IHRkID0gQXJyYXkuZnJvbShpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJykpO1xyXG5cclxuICAgICAgICBsZXQgYmxvY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudC10ZW1wbGF0ZScpLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICBibG9jay5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XHJcblxyXG4gICAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoYmxvY2spO1xyXG5cclxuICAgICAgICBsZXQgcm93cyA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLWNvbW1lbnRfX3JvdycpO1xyXG5cclxuICAgICAgICBsZXQgcm93MSA9IGNyZWF0ZTFyb3codGQsIGkpO1xyXG4gICAgICAgIHJvd3NbMF0uYXBwZW5kQ2hpbGQocm93MSk7XHJcblxyXG4gICAgICAgIHJvd3NbMV0uYXBwZW5kQ2hpbGQoY3JlYXRlMnJvdyh0ZCkpO1xyXG4gICAgICAgIHJvd3NbMl0uYXBwZW5kQ2hpbGQoY3JlYXRlM3Jvdyh0ZCkpO1xyXG5cclxuICAgICAgICBsZXQgZmlsZXMgPSBjcmVhdGU0cm93KHRkKTtcclxuXHJcbiAgICAgICAgaWYgKCEhZmlsZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBwaWNzID0gWydwbmcnLCAnanBnJywgJ2dpZiddO1xyXG5cclxuICAgICAgICAgICAgZmlsZXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9sZXQgZXh0ID0gaXRlbS5ocmVmLnNwbGl0KCcuJylbMV07XHJcbiAgICAgICAgICAgICAgICBsZXQgZXh0ID0gaXRlbS5ocmVmLmxhc3RJbmRleE9mKCcuJyk7XHJcbiAgICAgICAgICAgICAgICBleHQgPSBpdGVtLmhyZWYuc2xpY2UoZXh0ICsgMSwgaXRlbS5ocmVmLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBpY3MuaW5kZXhPZihleHQudG9Mb3dlckNhc2UoKSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVJbWdUaHVtYihpdGVtKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZURvY3NUaHVtYihleHQsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJvd3NbM10uYXBwZW5kQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJsb2NrLnJlbW92ZUNoaWxkKHJvd3NbM10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9j0YLRgNC+0LrQsCDRgdC60YDRi9GC0LBcclxuICAgICAgICAvL3Jvd3NbNF0uY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgLy9yb3dzWzRdLmFwcGVuZENoaWxkKGNyZWF0ZTVyb3codGQpKTtcclxuXHJcbiAgICAgICAgLy/RgdGC0LDQvdC+0LLQuNGC0YHRjyDQstC40LTQuNC80L7QuSDQv9GA0Lgg0L3QsNCy0LXQtNC10L3QuNC4INC60YPRgNGB0L7RgNCwINC90LAg0LrQsNGA0YLQvtGH0LrRgyDQutCw0LzQtdC90YLQsFxyXG4gICAgICAgIGJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNob3dBY3Rpb25zQnRuKHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBibG9jay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzaG93QWN0aW9uc0J0bih0aGlzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGQubWFwKGZ1bmN0aW9uICh0ZGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKHRkaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDaGlsZCh0ZGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUxcm93KHRkLCByb3dudW1iZXIpIHtcclxuICAgICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgICAgIGxldCByb3dJdGVtUHJvdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgICAgICAvL9C00LDRgtCwXHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWRhdGUnKTtcclxuICAgICAgICByb3dJdGVtLmlkID0gJ2NvbW1lbnQtZGF0ZSc7XHJcbiAgICAgICAgcm93SXRlbS5pbm5lckhUTUwgPSB0ZFszXS50ZXh0Q29udGVudDtcclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIC8vaWQgY2hlY2tib3hcclxuICAgICAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzBdLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2lkLWNoZWNrYm94Jyk7XHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIC8v0L/RgNC40L7RgNC40YLQtdGCINC4INGB0YDQvtC6INC40YHQv9C+0LvQvdC10L3QuNGPXHJcbiAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLXJhbmsnKTtcclxuXHJcbiAgICAgICAgcm93SXRlbS5pbm5lckhUTUwgPSB0ZFs4XS50ZXh0Q29udGVudCArICcg0L/RgNC40L7RgNC40YLQtdGCJztcclxuXHJcbiAgICAgICAgbGV0IGRlYWRsaW5lID0gdGRbN10udGV4dENvbnRlbnQ7XHJcblxyXG4gICAgICAgIGlmIChkZWFkbGluZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0uaW5uZXJIVE1MID0gcm93SXRlbS5pbm5lckhUTUwgKyAnLjxiIGNsYXNzPVwiZGVhZGxpbmUtZGF0ZVwiPtCh0LTQsNGC0YwgJyArIGRlYWRsaW5lICsgJzwvYj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIC8v0L/QuNGB0YzQvNCwLNGB0YHRi9C70LrQsCzRgdGC0LDRgtGD0YFcclxuICAgICAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Jvdy1yaWdodCcpO1xyXG5cclxuICAgICAgICBsZXQgc3RhdHVzID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSB0ZFs5XS50ZXh0Q29udGVudDtcclxuICAgICAgICBzdGF0dXMuY2xhc3NMaXN0LmFkZCgndGFzay1zdGF0dXMnKTtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHN0YXR1cyk7XHJcblxyXG4gICAgICAgIGxldCBsZXR0ZXIgPSB0ZFsxXS5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKVsxXTtcclxuICAgICAgICBsZXR0ZXIuY2xhc3NMaXN0LmFkZCgnbGV0dGVyLWFkZHInKTtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKGxldHRlcik7XHJcblxyXG4gICAgICAgIGxldCBsaW5rID0gdGRbMV0ucXVlcnlTZWxlY3RvckFsbCgnYScpWzFdO1xyXG4gICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1saW5rJyk7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcbiAgICAgICAgLy/QvdC+0LzQtdGAINC60L7QvNC80LXQvdGC0LDRgNC40Y9cclxuICAgICAgICBsZXQgbm8gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIG5vLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtbm8nKTtcclxuICAgICAgICBuby5pbm5lckhUTUwgPSByb3dudW1iZXI7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZChubyk7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZnJhZ21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlMnJvdyh0ZCkge1xyXG4gICAgICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW1Qcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgICBsZXQgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWluZm8nKTtcclxuXHJcbiAgICAgICAgLy/QsNCy0YLQvtGAXHJcbiAgICAgICAgbGV0IGF1dGhvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBhdXRob3IuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1hdXRob3InKTtcclxuICAgICAgICAvL2F1dGhvci5pbm5lckhUTUwgPSAn0JDQstGC0L7RgCA8YnI+JyArIHRkWzRdLnRleHRDb250ZW50O1xyXG4gICAgICAgIGF1dGhvci5pbm5lckhUTUwgPSB0ZFs0XS50ZXh0Q29udGVudDtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKGF1dGhvcik7XHJcblxyXG4gICAgICAgIC8v0LjRgdC/0L7Qu9C90LjRgtC10LvRjFxyXG4gICAgICAgIGxldCB3b3JrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgd29ya2VyLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtd29ya2VyJyk7XHJcbiAgICAgICAgLy93b3JrZXIuaW5uZXJIVE1MID0gJ9CY0YHQv9C+0LvQvdC40YLQtdC70YwgPGJyPicgKyB0ZFs2XS50ZXh0Q29udGVudDtcclxuICAgICAgICB3b3JrZXIuaW5uZXJIVE1MID0gdGRbNl0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh3b3JrZXIpO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAgICAgbGV0IHdvcmtUaW1lID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICB3b3JrVGltZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXRpbWUnKTtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVTdHIgPSB0ZFsxMF0udGV4dENvbnRlbnQuc3BsaXQoJy8nKTtcclxuXHJcbiAgICAgICAgLyp0aW1lU3RyWzBdID0gY3JlYXRlVGltZVRpdGxlU3RyaW5nKHRpbWVTdHJbMF0sIFsn0JfQsNGC0YDQsNGH0LXQvdCwJywgJ9CX0LDRgtGA0LDRh9C10L3QvicsICfQl9Cw0YLRgNCw0YfQtdC90L4nXSkrXHJcbiAgICAgICAgICcgJysgY3JlYXRlVGltZVN0cmluZyh0aW1lU3RyWzBdLCBbJ9C80LjQvdGD0YLQsCcsICfQvNC40L3Rg9GC0YsnLCAn0LzQuNC90YPRgiddKTsqL1xyXG5cclxuICAgICAgICB0aW1lU3RyWzBdID0gJzxzcGFuIGNsYXNzPVwiZWxhcHNlZC10aW1lXCI+JyArIHRpbWVTdHJbMF0gKyAnINC80LjQvS48L3NwYW4+JztcclxuICAgICAgICB3b3JrVGltZS5pbm5lckhUTUwgPSB0aW1lU3RyWzBdO1xyXG5cclxuICAgICAgICAvLyBpZiAoaXNOYU4oTnVtYmVyKHRpbWVTdHJbMV0pKSkge1xyXG4gICAgICAgIC8vICAgICB3b3JrVGltZS5pbm5lckhUTUwgPSB0aW1lU3RyWzBdO1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICB0aW1lU3RyWzFdID0gJyDQuNC3ICcrdGltZVN0clsxXTtcclxuICAgICAgICAvLyAgICAgd29ya1RpbWUuaW5uZXJIVE1MID0gdGltZVN0ci5qb2luKCcgJyk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh3b3JrVGltZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmcmFnbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUzcm93KHRkKSB7XHJcblxyXG4gICAgICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW1Qcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgICAvL9C60L7QvNC80LXQvdGC0LDRgNC40LlcclxuICAgICAgICBsZXQgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWJvZHknKTtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzVdLmZpcnN0RWxlbWVudENoaWxkLmNsb25lTm9kZSh0cnVlKSk7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICAvL9C+0LHQtdGA0YLQutCwINC00LvRjyDQutC90L7Qv9C+0Log0KPQtNCw0LvQuNGC0Ywg0Lgg0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcclxuICAgICAgICBsZXQgcm93SXRlbVdyYXAgPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW1XcmFwLmNsYXNzTGlzdC5hZGQoJ2FjdGlvbnMtYnRuLXdyYXAnKTtcclxuICAgICAgICAvL9GD0LTQsNC70LjRgtGMXHJcblxyXG4gICAgICAgIGlmICh0ZFsxMV0uZmlyc3RFbGVtZW50Q2hpbGQpIHtcclxuICAgICAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnYnRuLWRlbC1jb21tZW50Jyk7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQodGRbMTFdLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICAgICAgcm93SXRlbVdyYXAuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL9GA0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdidG4tZWRpdC1jb21tZW50Jyk7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh0ZFsxXS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgcm93SXRlbVdyYXAuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW1XcmFwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZTRyb3codGQpIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0ZFsyXS5xdWVyeVNlbGVjdG9yQWxsKCdhJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZTVyb3codGQpIHtcclxuICAgICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgICAgIGxldCByb3dJdGVtUHJvdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgICAgICAvL9C+0LHQtdGA0YLQutCwINC00LvRjyDQutC90L7Qv9C+0Log0KPQtNCw0LvQuNGC0Ywg0Lgg0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcclxuICAgICAgICBsZXQgcm93SXRlbVdyYXAgPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW1XcmFwLmNsYXNzTGlzdC5hZGQoJ2FjdGlvbnMtYnRuLXdyYXAnKTtcclxuXHJcbiAgICAgICAgLy/Rg9C00LDQu9C40YLRjFxyXG5cclxuICAgICAgICBpZiAodGRbMTFdLmZpcnN0RWxlbWVudENoaWxkKSB7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2J0bi1kZWwtY29tbWVudCcpO1xyXG4gICAgICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzExXS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgICAgIHJvd0l0ZW1XcmFwLmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/RgNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFxyXG4gICAgICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnYnRuLWVkaXQtY29tbWVudCcpO1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQodGRbMV0uZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgIHJvd0l0ZW1XcmFwLmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtV3JhcCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmcmFnbWVudDtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSW1nVGh1bWIoaXRlbSkge1xyXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHdyYXAuY2xhc3NMaXN0LmFkZCgnaW1nLXRodW1iJywgJ2ZpbGUtdGh1bWInKTtcclxuXHJcbiAgICBsZXQgcGljID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBwaWMuc3JjID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgIHBpYy5jbGFzc0xpc3QuYWRkKCd0aHVtYi1waWMnKTtcclxuXHJcbiAgICAvL2l0ZW0uY2xhc3NMaXN0LmFkZCgnaW1nLXRodW1iJywgJ2ZpbGUtdGh1bWInKTtcclxuICAgIGl0ZW0uYXBwZW5kQ2hpbGQocGljKTtcclxuICAgIGxldCB0aXRsZSA9IGdldEF0dGFjaFRpdGxlKGl0ZW0pO1xyXG4gICAgd3JhcC5hcHBlbmRDaGlsZChpdGVtKTtcclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgYmlncGljID0gcGljLmNsb25lTm9kZShmYWxzZSk7XHJcbiAgICAgICAgYmlncGljLmNsYXNzTGlzdC5hZGQoJ2xhcmdlLXBpYy1wcmV2aWV3Jyk7XHJcbiAgICAgICAgYmlncGljLmNsYXNzTGlzdC5yZW1vdmUoJ3RodW1iLXBpYycpO1xyXG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoYmlncGljKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMucXVlcnlTZWxlY3RvcignLmxhcmdlLXBpYy1wcmV2aWV3JykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHdyYXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURvY3NUaHVtYihleHQsIGl0ZW0pIHtcclxuICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnZG9jLXRodW1iJywgJ2ZpbGUtdGh1bWInKTtcclxuICAgIGl0ZW0uYXBwZW5kQ2hpbGQoZ2V0QXR0YWNoVGl0bGUoaXRlbSkpO1xyXG4gICAgaXRlbS5yZW1vdmVDaGlsZChpdGVtLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgIHJldHVybiBpdGVtO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBdHRhY2hUaXRsZShpdGVtKSB7XHJcbiAgICBsZXQgdGl0bGUgPSBpdGVtLmZpcnN0RWxlbWVudENoaWxkLnRpdGxlO1xyXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHdyYXAudGV4dENvbnRlbnQgPSB0aXRsZTtcclxuICAgIHdyYXAuY2xhc3NMaXN0LmFkZCgnYXR0YWNoLXRpdGxlJyk7XHJcbiAgICByZXR1cm4gd3JhcDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGUoKSB7XHJcbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XHJcbiAgICBsZXQgYmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ2ItY29tbWVudCcpO1xyXG4gICAgYmxvY2suaWQgPSAnY29tbWVudC10ZW1wbGF0ZSc7XHJcblxyXG4gICAgbGV0IGJsb2NrUm93O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgYmxvY2tSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBibG9ja1Jvdy5jbGFzc0xpc3QuYWRkKCdiLWNvbW1lbnRfX3JvdycsICdiLWNvbW1lbnRfX3Jvd18nICsgaSk7XHJcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQoYmxvY2tSb3cpXHJcbiAgICB9XHJcblxyXG4gICAgd3JhcC5hcHBlbmRDaGlsZChibG9jayk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3cmFwKTtcclxuXHJcbiAgICByZXR1cm4gd3JhcDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0FjdGlvbnNCdG4oY2FtbWVudCkge1xyXG4gICAgbGV0IGJ0bnMgPSBjYW1tZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3Rpb25zLWJ0bi13cmFwJyk7XHJcbiAgICBidG5zLmNsYXNzTGlzdC50b2dnbGUoJ2lzLXZpc2libGUnKTtcclxufVxyXG5cclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3Bjc3MvY29tbWVudHNEZXNpZ24ucGNzcyc7XHJcblxyXG5leHBvcnQge2NvbW1lbnRzRGVzaWdufTtcclxuXHJcbmlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKXtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBjb21tZW50c0Rlc2lnbicpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tbWVudHNEZXNpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL2NvbW1lbnRzRGVzaWduLnBjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vY29tbWVudHNEZXNpZ24ucGNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi9jb21tZW50c0Rlc2lnbi5wY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wY3NzL2NvbW1lbnRzRGVzaWduLnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5iLWNvbW1lbnRfX3JvdzpsYXN0LWNoaWxke3BhZGRpbmctYm90dG9tOjJlbX0uY29tbWVudC13cmFwIHA6b25seS1vZi10eXBle21hcmdpbjowfS5jb21tZW50LXdyYXAgcDpsYXN0LWNoaWxke21hcmdpbi1ib3R0b206MH0jY29tbWVudHMtdGJse21hcmdpbjphdXRvO3BhZGRpbmc6M2VtIDA7YmFja2dyb3VuZDojZjBmMGYwfSNjb21tZW50cy10YmwsI2NvbW1lbnRzLXRibCB0Ym9keSwjY29tbWVudHMtdGJsIHRye2Rpc3BsYXk6YmxvY2t9I2NvbW1lbnRzLXRibCB0cjpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1ib3R0b206MmVtfS5jb21tZW50LWJvZHl7d2lkdGg6MTAwJX0uY29tbWVudC13cmFwIHB7bGluZS1oZWlnaHQ6MS40XFxyXFxuXFxyXFxuICAgICAgICAvKlxcclxcbiAgICAgICAgLy/Qs9C00LUt0YLQviDRgtCw0LrQuCDQstGB0YLQsNCy0LvRj9GO0YLRgdGPINC70LjRiNC90LjQtSDQv9C10YDQtdCy0L7QtNGLINGB0YLRgNC+0LpcXHJcXG4gICAgICAgIC8v0YHQtNC10LvQsNGOINGC0LDQutC+0Lkg0LPRgNGP0LfQvdGL0Lkg0YXQsNC6XFxyXFxuICAgICAgICAqL1xcclxcbiAgICAgICAgLyomIGJyOmZpcnN0LWNoaWxkLFxcclxcbiAgICAgICAgJiBicjpsYXN0LWNoaWxke1xcclxcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgICAgICB9Ki99LmNvbW1lbnQtd3JhcCBwOmZpcnN0LWNoaWxke21hcmdpbi10b3A6MH0uYi1jb21tZW50e21heC13aWR0aDo3MjBweDttYXJnaW46YXV0bztiYWNrZ3JvdW5kOiNmYWZhZmE7Ym94LXNoYWRvdzowIDJweCAycHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpLDAgM3B4IDFweCAtMnB4IHJnYmEoMCwwLDAsLjIpO3dpZHRoOjEwMCU7Zm9udC1zaXplOjEycHg7XFxyXFxuICAgIC8qZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1mbG93OiBjb2x1bW4gd3JhcDsqL3Bvc2l0aW9uOnJlbGF0aXZlO2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYi1jb21tZW50LmItY29tbWVudF9ub3RpZnl7bWFyZ2luLXRvcDoyZW07cGFkZGluZzoyZW07Y29sb3I6IzMxNzA4ZjtiYWNrZ3JvdW5kOiNkOWVkZjc7Ym9yZGVyOjFweCBzb2xpZCAjYmNlOGYxfS5iLWNvbW1lbnQuYi1jb21tZW50X25vdGlmeSAuY29tbWVudHMtdXBkYXRlLWxpbmt7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZy1sZWZ0OjFlbTtjb2xvcjppbmhlcml0fS5iLWNvbW1lbnRfX3Jvd3twYWRkaW5nOjFlbSAyZW07ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtZmxvdzpyb3cgd3JhcDtmbGV4LWZsb3c6cm93IHdyYXA7cG9zaXRpb246cmVsYXRpdmV9LmItY29tbWVudF9fcm93OmZpcnN0LWNoaWxke3BhZGRpbmctdG9wOjJlbX0uYi1jb21tZW50X19yb3c6Zmlyc3QtY2hpbGQgLnJvdy1yaWdodHt0b3A6MmVtfVxcclxcblxcclxcbi8qLy8xIHJvdyDRiNCw0L/QutCwKi8uYi1jb21tZW50X19yb3dfMHtjb2xvcjpncmF5fS50YXNrLXJhbmssLnRhc2stc3RhdHVze3BhZGRpbmc6MCAuNWVtIDAgMmVtfS5kZWFkbGluZS1kYXRle3BhZGRpbmctbGVmdDoxZW19LmlkLWNoZWNrYm94e3Bvc2l0aW9uOmFic29sdXRlO3Zpc2liaWxpdHk6aGlkZGVuO3otaW5kZXg6LTF9LmNvbW1lbnQtbGluaywuY29tbWVudC1ub3ttYXJnaW4tcmlnaHQ6MCFpbXBvcnRhbnR9XFxyXFxuXFxyXFxuLyovLzIgcm93INCw0LLRgtC+0YAgLSDQuNGB0L/QvtC70L3QuNGC0LXQu9GMKi8uYi1jb21tZW50X19yb3cuYi1jb21tZW50X19yb3dfMXtwYWRkaW5nLXRvcDowOy1tcy1mbGV4LXBhY2s6anVzdGlmeTtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjtjb2xvcjpncmF5fS5jb21tZW50LWluZm8+c3BhbntkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmNvbW1lbnQtYXV0aG9ye3BhZGRpbmctcmlnaHQ6MmVtO3Bvc2l0aW9uOnJlbGF0aXZlfS5jb21tZW50LWF1dGhvcjphZnRlcntjb250ZW50OlxcXCJcXFxcMjE5MlxcXCI7cG9zaXRpb246cmVsYXRpdmU7bGVmdDoxZW19XFxyXFxuXFxyXFxuLyovLzMgcm93INGC0LXQutGB0YIg0LrQsNC80LXQvdGC0LAqLy5iLWNvbW1lbnRfX3Jvd18ye2ZvbnQtc2l6ZToxNHB4O2JhY2tncm91bmQ6I2ZmZjtib3JkZXItdG9wOjFweCBzb2xpZCBoc2xhKDAsMCUsNjMlLC4yKTtib3JkZXItYm90dG9tOjFweCBzb2xpZCBoc2xhKDAsMCUsNjMlLC4yKTtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59XFxyXFxuXFxyXFxuLyrQuCDQutC90L7Qv9C60Lgg0KPQtNCw0LvQuNGC0YwsINCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMKi8uYWN0aW9ucy1idG4td3JhcHtwYWRkaW5nOjFlbTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTtyaWdodDowO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zc30uYWN0aW9ucy1idG4td3JhcC5pcy12aXNpYmxle3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xMDAlKX0uYnRuLWRlbC1jb21tZW50LC5idG4tZWRpdC1jb21tZW50e2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtoZWlnaHQ6MjRweDtsaW5lLWhlaWdodDoyNHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6MX0uYnRuLWVkaXQtY29tbWVudHtcXHJcXG4gICAgLyp3aWR0aDogMTQwcHg7Ki9tYXJnaW4tbGVmdDouNWVtO1xcclxcbiAgICAvKmJvcmRlcjogMXB4IHNvbGlkICNBREFEQUQ7Ki90b3A6M3B4fS5idG4tZGVsLWNvbW1lbnR7d2lkdGg6NzBweFxcclxcbiAgICAvKndpZHRoOiAxMDBweDsqL31cXHJcXG5cXHJcXG4vKi5idG4tZWRpdC1jb21tZW50OmFmdGVyLCovLmJ0bi1kZWwtY29tbWVudDphZnRlcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt6LWluZGV4Oi0xO2NvbnRlbnQ6XFxcIlxcXFw0MjNcXFxcNDM0XFxcXDQzMFxcXFw0M0JcXFxcNDM4XFxcXDQ0MlxcXFw0NENcXFwiO2NvbG9yOiNjY2M7bGluZS1oZWlnaHQ6bm9ybWFsO2JvcmRlci1ib3R0b206MXB4IHNvbGlkfVxcclxcblxcclxcbi8qLmJ0bi1lZGl0LWNvbW1lbnQ6YWZ0ZXIge1xcclxcbiAgICBjb250ZW50OiAn0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YwnO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjRTFFMUUxO1xcclxcbn0qL1xcclxcblxcclxcbi8qLmJ0bi1lZGl0LWNvbW1lbnQgaW1nLCovLmJ0bi1kZWwtY29tbWVudCBpbWd7ZGlzcGxheTpub25lfVxcclxcblxcclxcbi8qLmJ0bi1lZGl0LWNvbW1lbnQgYSwqLy5idG4tZGVsLWNvbW1lbnQgYXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlfVxcclxcblxcclxcbi8qLy80IHJvdyDRhNCw0LnQu9GLKi8uYi1jb21tZW50X19yb3cuYi1jb21tZW50X19yb3dfM3twYWRkaW5nLXRvcDoxLjVlbTtwYWRkaW5nLWJvdHRvbToxLjVlbTstbXMtZmxleC1hbGlnbjpzdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fVxcclxcblxcclxcbi8qLy81IHJvdyDQv9C+0LTQstCw0LsqLy5iLWNvbW1lbnRfX3Jvd18zKy5iLWNvbW1lbnRfX3Jvd180e2JvcmRlci10b3A6MXB4IHNvbGlkIGhzbGEoMCwwJSw2MyUsLjIpfS5iLWNvbW1lbnRfX3Jvdy5iLWNvbW1lbnRfX3Jvd180ey1tcy1mbGV4LXBhY2s6ZW5kO2p1c3RpZnktY29udGVudDpmbGV4LWVuZH1cXHJcXG5cXHJcXG4vKi0tLS0qLy5yb3ctcmlnaHR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjFlbTtyaWdodDoyZW19LnJvdy1yaWdodD4qe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ucm93LXJpZ2h0Pjpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1yaWdodDouN2VtfS5pbWctdGh1bWJ7bWF4LXdpZHRoOjE1MHB4fS5pbWctdGh1bWIgaW1nOmZpcnN0LWNoaWxke2Rpc3BsYXk6bm9uZX0uaW1nLXRodW1iPmF7ZGlzcGxheTpibG9ja30uaW1nLXRodW1iIC5hdHRhY2gtdGl0bGV7bWFyZ2luLXRvcDouM2VtfS50aHVtYi1waWN7d2lkdGg6MTAwJTtcXHJcXG4gICAgLypoZWlnaHQ6IGNhbGMoMTAwJSAtIDJlbSk7Ki9vYmplY3QtZml0OmNvdmVyO21heC1oZWlnaHQ6MjAwcHg7Ym9yZGVyOjFweCBzb2xpZCAjY2NjfVxcclxcblxcclxcbi8q0LHQvtC70YzRiNCw0Y8g0LrQsNGA0YLQuNC90LrQsCwg0LLRgdGC0LDQstC70Y/QtdGC0YHRj9CyINCx0LvQvtC6INC/0YDQuCDQvdCw0LLQtdC00LXQvdC40Lgg0L3QsCDQv9GA0LXQstGM0Y4qLy5sYXJnZS1waWMtcHJldmlld3ttYXgtd2lkdGg6NDB2dztib3JkZXI6MXB4IHNvbGlkIGdyYXk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjkwJTtsZWZ0OjA7XFxyXFxuICAgIC8qbGVmdDogNTAlOyovXFxyXFxuICAgIC8qdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpOyovei1pbmRleDoxfS5kb2MtdGh1bWJ7bWF4LXdpZHRoOjE1MHB4O2JhY2tncm91bmQ6I2YzZjNmMztmb250LXNpemU6MTFweDtib3JkZXI6MXB4IHNvbGlkICNjY2M7XFxyXFxuICAgIC8qbGluZS1oZWlnaHQ6IDU4cHg7Ki90ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWRlY29yYXRpb246bm9uZTtjb2xvcjppbmhlcml0fS5kb2MtdGh1bWIgLmF0dGFjaC10aXRsZXt3aWR0aDoxMDAlO3BhZGRpbmc6MCAuNWVtO2xpbmUtaGVpZ2h0OjEuNjt3b3JkLWJyZWFrOmJyZWFrLWFsbDtib3gtc2l6aW5nOmJvcmRlci1ib3g7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0uZmlsZS10aHVtYnstbXMtZmxleDoxIDEgMjUlO2ZsZXg6MSAxIDI1JTttaW4taGVpZ2h0OjcwcHg7cG9zaXRpb246cmVsYXRpdmV9LmZpbGUtdGh1bWI6bnRoLWNoaWxkKG4rNyl7bWFyZ2luLXRvcDoyZW19LmZpbGUtdGh1bWI6bm90KDpsYXN0LWNoaWxkKXttYXJnaW4tcmlnaHQ6MWVtfS5hdHRhY2gtdGl0bGV7bWF4LXdpZHRoOjE1MHB4O3RleHQtYWxpZ246Y2VudGVyO2xpbmUtaGVpZ2h0Om5vcm1hbDt3b3JkLWJyZWFrOmJyZWFrLWFsbH0jY29tbWVudHMtdGJsIHRyOmxhc3QtY2hpbGQgLmItY29tbWVudF9fcm93XzAsI2NvbW1lbnRzLXRibCB0cjpsYXN0LWNoaWxkIC5iLWNvbW1lbnRfX3Jvd18xe2NvbG9yOiMwMDB9XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj97XCJpbXBvcnRMb2FkZXJzXCI6MX0hLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliIS4vc3JjL3Bjc3MvY29tbWVudHNEZXNpZ24ucGNzc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgY2FsY3VsYXRlRWxhcHNlZFRpbWUnKTtcclxufVxyXG5cclxuLy/QutCw0LvRjNC60YPQu9GP0YLQvtGAINCyINC/0L7Qu9C1INCy0LLQvtC00LAg0LfQsNGC0YDQsNGH0LXQvdC90L7Qs9C+INCy0YDQtdC80LXQvdC4XHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZUVsYXBzZWRUaW1lKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCB0aW1lRWxhcHNlZEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwZW5kZWRfdGltZScpO1xyXG5cclxuICAgIGlmKCF0aW1lRWxhcHNlZEZpZWxkKXtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ9Cd0LUg0L3QsNC50LTQtdC90L4g0L/QvtC70LUg0LLQstC+0LTQsCDQstGA0LXQvNC10L3QuCDQstGL0L/QvtC70L3QtdC90LjRjycpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQo9C00LDQu9C10L3QuNC1INC+0LHRgNCw0LHQvtGC0YfQuNC60LAg0L3QsNC20LDRgtC40Y8g0LrQu9Cw0LLQuNGIINC00LvRjyDQv9C+0LvRjyAnc3BlbmRlZF90aW1lJ1xyXG4gICAgdGltZUVsYXBzZWRGaWVsZC5vbmtleXVwID0gbnVsbDtcclxuXHJcbiAgICAvLyDQlNC+0LHQsNCy0LvQtdC90LjQtSDRgdC+0LHRi9GC0LjRjyDQtNC70Y8g0LLRi9GH0LjRgdC70LXQvdC40Y8g0LfQsNGC0YDQsNGH0LXQvdC90L7Qs9C+INCy0YDQtdC80LXQvdC4INC00LvRjyDQv9C+0LvRjyAnc3BlbmRlZF90aW1lJ1xyXG4gICAgdGltZUVsYXBzZWRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGN1cl92YWx1ZSA9IHRoaXMudmFsdWU7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGN1cl92YWx1ZSA9IGV2YWwoY3VyX3ZhbHVlKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi0J7RiNC40LHQutCwINCy0YvRh9C40YHQu9C10L3QuNGPINC30LDRgtGA0LDRh9C10L3QvdC+0LPQviDQstGA0LXQvNC10L3QuC4g0JjRgdC/0L7Qu9GM0LfRg9C50YLQtSDRh9C40YHQu9CwINC4INC30L3QsNC60LggwqsrwrssIMKrLcK7LCDCqyrCuywgwqsvwrsg0Lgg0YHQutC+0LHQutC4XCIpO1xyXG5cclxuICAgICAgICAgICAgY3VyX3ZhbHVlID0gbnVsbDtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICBpZiAoKGN1cl92YWx1ZSAhPT0gbnVsbCkgJiYgKCFpc05hTihjdXJfdmFsdWUpKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGN1cl92YWx1ZSA9IE1hdGgucm91bmQoY3VyX3ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY3VyX3ZhbHVlIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcItCe0YLRgNC40YbQsNGC0LXQu9GM0L3QvtC1INC40LvQuCDQvdGD0LvQtdCy0L7QtSDQt9C90LDRh9C10L3QuNC1INCy0YDQtdC80LXQvdC4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cl92YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGN1cl92YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gbWluVG9EYXlzKHRpbWVJbk1pbnV0ZXMsIGRheUluSG91cnMgPSA4KSB7XHJcbi8vICAgICBsZXQgcmV0U3RyID0gXCJcIjtcclxuLy9cclxuLy8gICAgIGlmICgodGltZUluTWludXRlcyAhPT0gbnVsbCkgJiYgKCFpc05hTih0aW1lSW5NaW51dGVzKSkgJiYgKHRpbWVJbk1pbnV0ZXMgPiAwKSkge1xyXG4vLyAgICAgICAgIGRheUluSG91cnMgPSBkYXlJbkhvdXJzIDw8IDA7XHJcbi8vICAgICAgICAgaWYgKChkYXlJbkhvdXJzID09PSB1bmRlZmluZWQpIHx8IChkYXlJbkhvdXJzID09PSBudWxsKSB8fCAoaXNOYU4oZGF5SW5Ib3VycykpIHx8IChkYXlJbkhvdXJzIDwgMSkpIGRheUluSG91cnMgPSAyNDtcclxuLy8gICAgICAgICBsZXQgdEQsIHRILCB0TTtcclxuLy8gICAgICAgICB0RCA9ICh0aW1lSW5NaW51dGVzIC8gZGF5SW5Ib3VycyAvIDYwKSA8PCAwO1xyXG4vLyAgICAgICAgIHJldFN0ciArPSB0RCA+IDAgPyB0RCArIFwiINC0LiBcIiA6IFwiXCI7XHJcbi8vICAgICAgICAgdGltZUluTWludXRlcyAtPSB0RCAqIGRheUluSG91cnMgKiA2MDtcclxuLy8gICAgICAgICB0SCA9ICh0aW1lSW5NaW51dGVzIC8gNjApIDw8IDA7XHJcbi8vICAgICAgICAgcmV0U3RyICs9IHRIID4gMCA/IHRIICsgXCIg0YcuIFwiIDogXCJcIjtcclxuLy8gICAgICAgICB0aW1lSW5NaW51dGVzIC09IHRIICogNjA7XHJcbi8vICAgICAgICAgdE0gPSB0aW1lSW5NaW51dGVzIDw8IDA7XHJcbi8vICAgICAgICAgcmV0U3RyICs9IHRNICsgXCIg0LzQuNC9LlwiICsgXCIgKFwiICsgZGF5SW5Ib3VycyArIFwiLdGH0LDRgdC+0LLQvtC5INC00LXQvdGMKVwiO1xyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICByZXRTdHIgKz0gXCLQp9GC0L4t0YLQviDRgdC+INCy0YDQtdC80LXQvdC10Lwg0L3QtSDRgtCw0LogOihcIjtcclxuLy8gICAgIH1cclxuLy8gICAgIHJldHVybiByZXRTdHI7XHJcbi8vIH1cclxuXHJcbmV4cG9ydCB7Y2FsY3VsYXRlRWxhcHNlZFRpbWV9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgY2FsY3VsYXRlRWxhcHNlZFRpbWUnKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NhbGN1bGF0ZUVsYXBzZWRUaW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCBnb1RvVGFza0RhdGFsaXN0Jyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0VGFza0lkLGdldFRhc2tIZWFkfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGdvVG9UYXNrRGF0YWxpc3QoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IHRhc2tJZCA9IGdldFRhc2tJZCgpO1xyXG5cclxuICAgIGxldCB0YXNrVGl0bGUgPSBnZXRUYXNrSGVhZCgpLnRpdGxlO1xyXG5cclxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YWxpc3QnKSkgfHwgW107XHJcbiAgICBkYXRhID0gYXBwZW5kSWQoZGF0YSk7XHJcblxyXG4gICAgLy/QtdGB0LvQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0LXRgdGC0Ywg0LfQsNCz0L7Qu9C+0LLQvtC6INC30LDQtNCw0YfQuFxyXG4gICAgLy8gLSDQv9GA0L7QstC10YDQuNGC0Ywg0LXRgdGC0Ywg0LvQuCDQvtC90LAg0LIg0YHQv9C40YHQutC1XHJcbiAgICBpZiAodGFza1RpdGxlKSB7XHJcblxyXG4gICAgICAgIGxldCBuZXdkYXRhID0ge1wiaWRcIjogdGFza0lkLCBcInRpdGxlXCI6IHRhc2tUaXRsZSArICcgJyArIHRhc2tJZH07XHJcblxyXG4gICAgICAgIGRhdGEgPSBhcHBlbmRJZChkYXRhLCBuZXdkYXRhKTtcclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGFsaXN0JywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v0YHQvtC30LTQsNC8IGRhdGFsaXN0XHJcbiAgICBsZXQgZGF0YWxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkYXRhbGlzdCcpO1xyXG4gICAgZGF0YWxpc3QuaWQgPSAnZGwtZ290b3Rhc2snO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkYXRhbGlzdCk7XHJcblxyXG4gICAgLy/RgdCy0Y/Qt9Cw0YLRjCBkYXRhbGlzdCDRgSDQv9C+0LvQtdC8INCy0LLQvtC00LAgaWQg0LfQsNC00LDRh9C4XHJcbiAgICBsZXQgaWRGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb1RvJyk7XHJcbiAgICBpZEZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgIGlkRmllbGQuc2V0QXR0cmlidXRlKCdsaXN0JywgJ2RsLWdvdG90YXNrJyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgb3AudmFsdWUgPSBkYXRhW2ldLmlkO1xyXG4gICAgICAgIG9wLmxhYmVsID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICBkYXRhbGlzdC5hcHBlbmRDaGlsZChvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwZW5kSWQoYXJyLCBuZXdkYXRhID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAobmV3ZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgY2hlY2sgPSBhcnIuc29tZShmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IG5ld2RhdGEuaWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjaGVjaykge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2gobmV3ZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhcnIubGVuZ3RoID4gMTApIHtcclxuICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2dvVG9UYXNrRGF0YWxpc3R9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgZ29Ub1Rhc2tEYXRhbGlzdCcpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZ29Ub1Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIGNvdW50V29ya2VyVGltZScpO1xyXG59XHJcblxyXG5pbXBvcnQge2dldEFsbENvbW1lbnRzUm93cyxnZXRBbGxXb3JrZXJzLGdldFJvd1RpbWVTdHJpbmd9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5pbXBvcnQge2NyZWF0ZUlTT0RhdGUsZWxpbWluYXRlRHVwbGljYXRlcyxkYXRlRm9ybWF0dGVyLGdldFJvd0RhdGVTdHJpbmd9IGZyb20gJy4vX3V0aWxzLmpzJztcclxuXHJcbmZ1bmN0aW9uIGNvdW50V29ya2VyVGltZSgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGxldCAkaW5wdXRfYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItdG9vbGJhcicpO1xyXG4gICAgbGV0IHJvd3MgPSBnZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuICAgIGxldCB3b3JrZXJzID0gZ2V0QWxsV29ya2VycygpO1xyXG4gICAgbGV0IGRhdGVzX2NvbGxlY3Rpb24gPSBbXTtcclxuICAgIGxldCBkYXRlX3N0cjtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBkYXRlX3N0ciA9IHJvd3NbaV0uY2hpbGRyZW5bM10udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgZGF0ZV9zdHIgPSBkYXRlX3N0ci5zcGxpdCgnICcpO1xyXG4gICAgICAgIGRhdGVzX2NvbGxlY3Rpb24ucHVzaChjcmVhdGVJU09EYXRlKGRhdGVfc3RyWzBdKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRhdGVzX2FyciA9IGVsaW1pbmF0ZUR1cGxpY2F0ZXMoZGF0ZXNfY29sbGVjdGlvbik7XHJcblxyXG4gICAgbGV0IGNyZWF0ZURhdGVzTGlzdCA9IGZ1bmN0aW9uIChpbnB1dF9ib3gsIGRhdGVzKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUxpc3QoY3NzX2lkLCBjc3NfY2xhc3MpIHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdTRUxFQ1QnKTtcclxuICAgICAgICAgICAgbGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgY3NzX2lkKTtcclxuICAgICAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKGNzc19jbGFzcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXJfX2l0ZW0nKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0X2xpc3QgPSBjcmVhdGVMaXN0KCdkYXRlLXN0YXJ0LWxpc3QnLCAnZGF0ZXMtbGlzdCcpO1xyXG5cclxuICAgICAgICBsZXQgZW5kX2xpc3QgPSBjcmVhdGVMaXN0KCdkYXRlLWVuZC1saXN0JywgJ2RhdGVzLWxpc3QnKTtcclxuXHJcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0JVVFRPTicpO1xyXG4gICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgYnRuLnRleHRDb250ZW50ID0gJ9Cf0L7RgdGH0LjRgtCw0YLRjCc7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb24sIGNsbl9vcHRpb24sIGxpc3RkYXRlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpc3RkYXRlID0gZGF0ZUZvcm1hdHRlcihwYXJzZUludChkYXRlc1tpXSwgMTApKTtcclxuICAgICAgICAgICAgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnT1BUSU9OJyk7XHJcbiAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZGF0ZXNbaV0pO1xyXG4gICAgICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gbGlzdGRhdGUudG9Mb2NhbGVTdHJpbmcoJ3J1Jyk7XHJcbiAgICAgICAgICAgIGNsbl9vcHRpb24gPSBvcHRpb24uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICBzdGFydF9saXN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICAgICAgICAgIGVuZF9saXN0LmFwcGVuZENoaWxkKGNsbl9vcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBib3guYXBwZW5kQ2hpbGQoc3RhcnRfbGlzdCk7XHJcbiAgICAgICAgYm94LmFwcGVuZENoaWxkKGVuZF9saXN0KTtcclxuICAgICAgICBib3guYXBwZW5kQ2hpbGQoYnRuKTtcclxuXHJcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDMnKTtcclxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9ICfQl9CwINCy0YvQsdGA0LDQvdC90YvQuSDQv9C10YDQuNC+0LQnO1xyXG4gICAgICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3VzZXItdG9vbGJhci10aXRsZScpO1xyXG4gICAgICAgIGJveC5pbnNlcnRCZWZvcmUodGl0bGUsIGJveC5maXJzdENoaWxkKTtcclxuXHJcbiAgICAgICAgaW5wdXRfYm94Lmluc2VydEJlZm9yZShib3gsIGlucHV0X2JveC5sYXN0Q2hpbGQpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnYm94JzogYm94LFxyXG4gICAgICAgICAgICAnc3RhcnRfbGlzdCc6IHN0YXJ0X2xpc3QsXHJcbiAgICAgICAgICAgICdlbmRfbGlzdCc6IGVuZF9saXN0LFxyXG4gICAgICAgICAgICAnYnRuJzogYnRuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgdGltZWxpc3QgPSBjcmVhdGVUaW1lTGlzdCh3b3JrZXJzLCByb3dzKTtcclxuXHJcbiAgICBsZXQgJHRpbWVsaXN0ID0gY3JlYXRlVGltZUxpc3RWaWV3KHRpbWVsaXN0KTtcclxuXHJcbiAgICAkdGltZWxpc3QuY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyX19pdGVtJyk7XHJcblxyXG4gICAgLy/QtNC+0LHQsNCy0LvRj9C10Lwg0YHRgtGA0L7QutGDINGBINC+0LHRidC40Lwg0LLRgNC10LzQtdC90LXQvCDQstGB0LXRhSDRgdC+0YLRgNGD0LTQvdC40LrQvtCyXHJcbiAgICAvL9GC0YDQtdGC0LjQuSDQv9Cw0YDQsNC80LXRgtGAIHRydWUgLSDRgdGC0LDQstC40YIg0LrQu9Cw0YHRgS3QvNCw0YDQutC10YAg0LLRi9Cx0YDQsNC90L3Ri9GFINGA0LDQsdC+0YLQvdC40LrQvtCyXHJcbiAgICBpbnNlcnRUb3RhbFRpbWUoJHRpbWVsaXN0LCB0aW1lbGlzdCwgdHJ1ZSk7XHJcblxyXG4gICAgLy8g0LTQvtCx0LDQstC70Y/QtdC8INC60LvQuNC6INC/0L4g0YHRgtGA0L7QutC1INC00LvRjyDQv9C+0LTRgdGH0LXRgtCwINCy0YDQtdC80LXQvdC4INCy0YvQsdGA0LDQvdC90YvRhSDRgNCw0LHQvtGC0L3QuNC60L7QslxyXG4gICAgJHRpbWVsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZighZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0aW1lLWxpc3QtdG90YWwnKSl7XHJcbiAgICAgICAgICAgIGNvdW50U2VsZWN0ZWRXb3JrZXJzVGltZSh0aGlzLCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgJHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDMnKTtcclxuICAgICR0aXRsZS50ZXh0Q29udGVudCA9ICfQktGB0Y8g0LfQsNC00LDRh9CwJztcclxuICAgICR0aXRsZS5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXItdGl0bGUnKTtcclxuICAgICR0aW1lbGlzdC5pbnNlcnRCZWZvcmUoJHRpdGxlLCAkdGltZWxpc3QuZmlyc3RDaGlsZCk7XHJcbiAgICAkdGltZWxpc3QuY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyX19pdGVtJyk7XHJcblxyXG4gICAgbGV0IGRhdGVfbGlzdHMgPSBjcmVhdGVEYXRlc0xpc3QoJGlucHV0X2JveCwgZGF0ZXNfYXJyKTtcclxuXHJcbiAgICAvLyDQtNC+0LHQsNCy0LvRj9GOINGB0LXQu9C10LrRgtGLINGBINC00LDRgtCw0LzQuCAtINC/0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INC30LAg0LLRi9Cx0YDQsNC90L3Ri9C5INC/0LXRgNC40L7QtFxyXG4gICAgZmluZFRpbWVJbkRhdGVzUmFuZ2UoZGF0ZV9saXN0cywgd29ya2Vycywgcm93cyk7XHJcblxyXG4gICAgJGlucHV0X2JveC5pbnNlcnRCZWZvcmUoJHRpbWVsaXN0LCAkaW5wdXRfYm94Lmxhc3RDaGlsZCk7XHJcblxyXG4gICAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI1NTg5NzcvYWpheC1jcm9zcy1kb21haW4tY2FsbFxyXG59XHJcblxyXG4vLyDRgdC+0LfQtNCw0L3QuNC1INC+0LHRitC10LrRgtCwINGB0L4g0YHQv9C40YHQutC+0Lwg0YHQvtGC0YDRg9C00L3QutC+0LIg0Lgg0LLRgNC10LzQtdC90Lgg0LrQsNC20LTQvtCz0L4g0LIg0LfQsNC00LDRh9C1XHJcbmZ1bmN0aW9uIGNyZWF0ZVRpbWVMaXN0KHdvcmtlcnMsIHJvd3MpIHtcclxuXHJcbiAgICBsZXQgbnRpbWUsIG5hbWUsIHRzdW07XHJcbiAgICBsZXQgdGltZWxpc3QgPSB7fTtcclxuXHJcbiAgICBmb3IgKGxldCBzID0gMDsgcyA8IHdvcmtlcnMubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICB0c3VtID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG50aW1lID0gZ2V0Um93VGltZVN0cmluZyhyb3dzW2ldKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyb3dzW2ldLmNoaWxkcmVuWzRdKSB7XHJcbiAgICAgICAgICAgICAgICAvL9C00L4g0LfQsNC/0YPRgdC60LAgY2FtbWVudHNEZXNpZ24oKTtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSByb3dzW2ldLmNoaWxkcmVuWzRdLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/Qv9C+0YHQu9C1INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gcm93c1tpXS5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1hdXRob3InKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHdvcmtlcnNbc10gPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRzdW0gKz0gbnRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aW1lbGlzdFtuYW1lXSA9IHRzdW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRpbWVsaXN0O1xyXG59XHJcblxyXG4vLyDRgdC+0LfQtNCw0L3QuNC1IGh0bWwg0Y3Qu9C10LzQtdC90YLQsCDRgdC+INGB0L/QuNGB0LrQvtC8INGB0L7RgtGA0YPQtNC90LrQvtCyINC4INCy0YDQtdC80LXQvdC4INC60LDQttC00L7Qs9C+INCyINC30LDQtNCw0YfQtVxyXG5mdW5jdGlvbiBjcmVhdGVUaW1lTGlzdFZpZXcoZGF0YSkge1xyXG4gICAgbGV0ICR0aW1lbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgJHRpbWVsaXN0LmNsYXNzTGlzdC5hZGQoJ3RpbWUtbGlzdCcpO1xyXG4gICAgJHRpbWVsaXN0LmlkID0gJ3dvcmtlcnMtdGltZSc7XHJcblxyXG4gICAgbGV0IGxpc3RfaXRlbTtcclxuICAgIGxldCB3b3JrZXJ0aW1lO1xyXG4gICAgbGV0IHRvdGFsdGltZSA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgayBpbiBkYXRhKSB7XHJcbiAgICAgICAgd29ya2VydGltZSA9IGRhdGFba107XHJcbiAgICAgICAgdG90YWx0aW1lICs9IHdvcmtlcnRpbWU7XHJcbiAgICAgICAgbGlzdF9pdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGxpc3RfaXRlbS5kYXRhc2V0LndvcmtlcnRpbWUgPSB3b3JrZXJ0aW1lO1xyXG4gICAgICAgIGxpc3RfaXRlbS5pbm5lckhUTUwgPSAnPHNwYW4+JyArIGsgKyAnPC9zcGFuPiA8c3Bhbj4nICsgd29ya2VydGltZSArICc8L3NwYW4+JztcclxuICAgICAgICAkdGltZWxpc3QuaW5zZXJ0QmVmb3JlKGxpc3RfaXRlbSwgJHRpbWVsaXN0Lmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICR0aW1lbGlzdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFRpbWVJbkRhdGVzUmFuZ2UobGlzdHMsIHdvcmtlcnMsIHJvd3MpIHtcclxuICAgIGxldCAkc3RhcnRfbGlzdCA9IGxpc3RzLnN0YXJ0X2xpc3Q7XHJcbiAgICBsZXQgJGVuZF9saXN0ID0gbGlzdHMuZW5kX2xpc3Q7XHJcbiAgICBsZXQgJGJveCA9IGxpc3RzLmJveDtcclxuICAgIGxldCAkYnRuID0gbGlzdHMuYnRuO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmRSb3dzSW5SYW5nZShyb3dzLCBzdGFydCwgZW5kKSB7XHJcblxyXG4gICAgICAgIHJldHVybiByb3dzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbV9kYXRlID0gZ2V0Um93RGF0ZVN0cmluZyhpdGVtKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpdGVtX2RhdGUgPj0gc3RhcnQgJiYgaXRlbV9kYXRlIDw9IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAkYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgZmluZF9yb3dzID0gZmluZFJvd3NJblJhbmdlKHJvd3MsICRzdGFydF9saXN0LnZhbHVlLCAkZW5kX2xpc3QudmFsdWUpO1xyXG5cclxuICAgICAgICBsZXQgcmFuZ2VfdGltZWxpc3QgPSBjcmVhdGVUaW1lTGlzdChnZXRTZWxlY3RlZFdvcmtlcnMoKSwgZmluZF9yb3dzKTtcclxuICAgICAgICBsZXQgJHJhbmdlX3RpbWVsaXN0ID0gY3JlYXRlVGltZUxpc3RWaWV3KHJhbmdlX3RpbWVsaXN0KTtcclxuXHJcbiAgICAgICAgaWYgKCRib3gucXVlcnlTZWxlY3RvcignI3JhbmdlLXRpbWVsaXN0JykpIHtcclxuICAgICAgICAgICAgJGJveC5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFuZ2UtdGltZWxpc3QnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcmFuZ2VfdGltZWxpc3Quc2V0QXR0cmlidXRlKCdpZCcsICdyYW5nZS10aW1lbGlzdCcpO1xyXG5cclxuICAgICAgICAkYm94LmFwcGVuZENoaWxkKCRyYW5nZV90aW1lbGlzdCk7XHJcblxyXG4gICAgICAgIGluc2VydFRvdGFsVGltZSgkcmFuZ2VfdGltZWxpc3QsIHJhbmdlX3RpbWVsaXN0KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWxlY3RlZFdvcmtlcnMoKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWRfd29ya2VycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JrZXJzLXRpbWUnKS5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0ZWQnKTtcclxuICAgIGxldCBzZWxlY3RlZF9uYW1lcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRfd29ya2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNlbGVjdGVkX25hbWVzLnB1c2goc2VsZWN0ZWRfd29ya2Vyc1tpXS5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGVkX25hbWVzO1xyXG59XHJcblxyXG4vL9C/0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INCy0YvQsdGA0LDQvdC90YvRhSDRg9GH0LDRgdGC0L3QuNC60L7QsiDQt9Cw0LTQsNGH0LggKNC40Lcg0YHQv9C40YHQutCwINCy0YHQtdGFINGD0YfQsNGB0YLQvdC40LrQvtCyKVxyXG5mdW5jdGlvbiBjb3VudFNlbGVjdGVkV29ya2Vyc1RpbWUobGlzdCwgZXZlbnQpIHtcclxuICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBsZXQgJHRvdGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmtlcnMtdGltZS10b3RhbCcpO1xyXG4gICAgbGV0IHRvdGFsID0gcGFyc2VJbnQoJHRvdGFsLmRhdGFzZXQudG90YWx0aW1lKTtcclxuXHJcbiAgICB3aGlsZSAodGFyZ2V0ICE9PSBsaXN0KSB7XHJcbiAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lID09PSAnUCcpIHtcclxuICAgICAgICAgICAgcmVjb3VudFRvdGFsKHRhcmdldCwgJHRvdGFsLCB0b3RhbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlY291bnRUb3RhbChlbGVtLCB0b3RhbCwgdG90YWx0aW1lKSB7XHJcbiAgICAgICAgbGV0IGVsZW10aW1lID0gcGFyc2VJbnQoZWxlbS5kYXRhc2V0LndvcmtlcnRpbWUpO1xyXG5cclxuICAgICAgICAvL9C60LvQsNGB0YEgZXhjbHVkZWQg0L3Rg9C20LXQvSDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40Lgg0YHQv9C40YHQutCwINGA0LDQsdC+0YLQvdC40LrQvtCyXHJcbiAgICAgICAgLy/QsiDQstGL0LLQvtC00LUg0LLRgNC10LzQvdC4INC30LAg0L/QtdGA0LjQvtC0IC0g0LLRi9Cy0L7QtCDRgtC+0LvRjNC60L4g0L/QviDQstGL0LHRgNCw0L3QvdGL0LwgKHNlbGVjdGVkKSDRgNCw0LHQvtGC0L3QuNC60LDQvFxyXG4gICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnZXhjbHVkZWQnKTtcclxuICAgICAgICAgICAgdG90YWx0aW1lID0gdG90YWx0aW1lIC0gZWxlbXRpbWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2V4Y2x1ZGVkJyk7XHJcbiAgICAgICAgICAgIHRvdGFsdGltZSA9IHRvdGFsdGltZSArIGVsZW10aW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG90YWwuaW5uZXJIVE1MID0gdG90YWx0aW1lO1xyXG4gICAgICAgIHRvdGFsLmRhdGFzZXQudG90YWx0aW1lID0gdG90YWx0aW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyDQv9C+0LTRgdGH0LXRgiDQvtCx0YnQtdCz0L4g0LLRgNC10LzQtdC90Lgg0LLRgdC10YUg0YHQvtGC0YDRg9C00L3QuNC60L7QsiDQtNC70Y8g0YHQv9C40YHQutCwINGB0L7RgtGA0YPQtNC90LjQui3QstGA0LXQvNGPXHJcbmZ1bmN0aW9uIGluc2VydFRvdGFsVGltZSh0aW1lbGlzdCwgZGF0YSwgYWRkbWFya2VyKSB7XHJcbiAgICBsZXQgdG90YWx0aW1lID0gMDtcclxuICAgIGxldCB0b3RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuXHJcbiAgICBmb3IgKGxldCBrIGluIGRhdGEpIHtcclxuICAgICAgICB0b3RhbHRpbWUgKz0gZGF0YVtrXTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWRkbWFya2VyKSB7XHJcbiAgICAgICAgbGV0IGxpc3RfaXRlbXMgPSB0aW1lbGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdwJyk7XHJcbiAgICAgICAgLy/Qv9C+INGD0LzQvtC70YfQsNC90LjRjiDQstGB0LUg0YDQsNCx0L7RgtC90LjQutC4INCy0YvQsdGA0LDQvdGLLCDRgdGH0LjRgtCw0LXRgtGB0Y8g0L7QsdGJ0LXQtSDQstGA0LXQvNGPINC/0L4g0LLRgdC10LxcclxuICAgICAgICAvL9Cy0YHQtdC8INC00L7QsdCw0LLQu9GP0LXQvCDQutC70LDRgdGBIHNlbGVjdGVkINC90YPQttC90YvQuSDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40Lgg0YHQv9C40YHQutCwXHJcbiAgICAgICAgLy/QuCDRh9GC0L7QsdGLINCy0LjQt9GD0LDQu9GM0L3QviDQvtGC0LzQtdGC0LjRgtGMINCy0YvQsdGA0LDQvdC90YvRhSDQsiDRgdC/0LjRgdC60LVcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RfaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGlzdF9pdGVtc1tpXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0b3RhbC5pbm5lckhUTUwgPSAnPHNwYW4+0JLRgdC10LPQvjo8L3NwYW4+IDxzcGFuIGlkPVwid29ya2Vycy10aW1lLXRvdGFsXCIgZGF0YS10b3RhbHRpbWU9XCInICsgdG90YWx0aW1lICsgJ1wiPicgKyB0b3RhbHRpbWUgKyAnPC9zcGFuPic7XHJcbiAgICB0b3RhbC5jbGFzc0xpc3QuYWRkKCd0aW1lLWxpc3QtdG90YWwnKTtcclxuICAgIHRpbWVsaXN0LmFwcGVuZENoaWxkKHRvdGFsKTtcclxuXHJcbiAgICByZXR1cm4gdG90YWx0aW1lO1xyXG59XHJcblxyXG5leHBvcnQge2NvdW50V29ya2VyVGltZX07XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBjb3VudFdvcmtlclRpbWUnKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvdW50V29ya2VyVGltZS5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpe1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIHRhc2tGb290ZXJEZXNpZ24nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGFza0Zvb3RlckRlc2lnbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbi8vbmV3IGNvbW1lbnRcclxuICAgIGxldCBjb21tZW50VGJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RibC1uZXctY29tbWVudCcpO1xyXG4gICAgbGV0IG5ld0NvbW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNvbW1lbnQtd3JhcCcpO1xyXG5cclxuICAgIC8vINC00L7QsdCw0LLQu9GOINC30LDQs9C+0LvQvtCy0L7QulxyXG4gICAgbGV0IG5ld0NvbW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICBuZXdDb21tZW50VGl0bGUudGV4dENvbnRlbnQgPSAn0J3QvtCy0YvQuSDQutC+0LzQvNC10L3RgtCw0YDQuNC5JztcclxuICAgIG5ld0NvbW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uLXRpdGxlJyk7XHJcbiAgICBuZXdDb21tZW50Lmluc2VydEJlZm9yZShuZXdDb21tZW50VGl0bGUsIG5ld0NvbW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG5cclxuICAgIC8vMSDQv9C10YDQstCw0Y8g0YHRgtGA0L7QutCwIC0g0LjRgdC/0L7Qu9C90LjRgtC10LvRjCwg0YHRgtCw0YLRg9GBLCDQv9GA0LjQvtGA0LjRgtC10YJcclxuICAgIC8v0LHQu9C+0Log0LIg0LrQvtGC0L7RgNC+0Lwg0LHRg9C00YPRgiDQv9C+0LvRjyDQtNC70Y8g0LLQstC+0LTQsCDQt9Cw0YLRgNCw0YfQtdC90L3QvtCz0L4g0Lgg0L/Qu9Cw0L3QuNGA0YPQtdC80L7Qs9C+INCy0YDQtdC80LXQvdC4XHJcbiAgICAvL9C4INCy0YvQsdC+0YAg0L/RgNC40L7RgNC40YLQtdGC0LBcclxuXHJcbiAgICBsZXQgcm93SXRlbVByb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBsZXQgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBsZXQgcm93c0ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIC8v0LjRgdC/0L7Qu9C90LjRgtC10LvRjFxyXG4gICAgbGV0IGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludGVybmFsX3dvcmtlcicpO1xyXG4gICAgbGV0IHdvcmtlckJsb2NrID0gZmllbGQucGFyZW50Tm9kZTtcclxuICAgIHdvcmtlckJsb2NrLmNsYXNzTGlzdC5hZGQoJ3dvcmtlci1ibG9jaycpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQod29ya2VyQmxvY2spO1xyXG5cclxuICAgIC8v0YHRgtCw0YLRg9GBXHJcbiAgICBsZXQgc3RhdHVzVGJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RibC1zdGF0dXMnKTtcclxuICAgIGxldCBzdGF0dXNMaXN0ID0gY3JlYXRlU3RhdHVzTGlzdChzdGF0dXNUYmwpO1xyXG4gICAgbGV0IGJsb2NrID0gY3JlYXRlRmllbGRBbmRMYWJlbCgn0KHRgtCw0YLRg9GBJywgc3RhdHVzTGlzdCk7XHJcbiAgICBibG9jay5jbGFzc0xpc3QuYWRkKCdmcm93LWNvbC0yLTEnKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChibG9jayk7XHJcblxyXG4gICAgLy/Qv9GA0LjQvtGA0LjRgtC10YJcclxuICAgIGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5X2lkJyk7XHJcbiAgICBibG9jayA9IGNyZWF0ZUZpZWxkQW5kTGFiZWwoJ9Cf0YDQuNC+0YDQuNGC0LXRgicsIGZpZWxkKTtcclxuICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2Zyb3ctY29sLTItMicpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoYmxvY2spO1xyXG5cclxuICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1maWVsZHMtcm93JywndGFzay1yb3ctMScpO1xyXG4gICAgcm93SXRlbS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICByb3dzRnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgLy8yINCy0YLQvtGA0LDRjyDRgdGC0YDQvtC60LAgLSDQstGA0LXQvNGPICjQt9Cw0YLRgNCw0YfQtdC90L4v0L/Qu9Cw0L3QuNGA0YPQtdC80L4pLCDQv9GA0L7QtdC60YIsINGB0YDQvtC6XHJcblxyXG4gICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmllbGRzLXJvdycsJ3Rhc2stcm93LTInKTtcclxuXHJcbiAgICBsZXQgdGltZUJsb2NrID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHRpbWVCbG9jay5jbGFzc0xpc3QuYWRkKCd0aW1lLWJsb2NrJyk7XHJcblxyXG4gICAgLy/Qt9Cw0YLRgNCw0YfQtdC90L4g0LLRgNC10LzQtdC90LhcclxuICAgIGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwZW5kZWRfdGltZScpO1xyXG4gICAgYmxvY2sgPSBjcmVhdGVGaWVsZEFuZExhYmVsKCfQl9Cw0YLRgNCw0YfQtdC90L4nLCBmaWVsZCk7XHJcbiAgICB0aW1lQmxvY2suYXBwZW5kQ2hpbGQoYmxvY2spO1xyXG5cclxuICAgIC8v0L/Qu9Cw0L3QuNGA0YPQtdC80L7QtSDQstGA0LXQvNGPXHJcbiAgICBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFuX3RpbWUnKTtcclxuICAgIGJsb2NrID0gY3JlYXRlRmllbGRBbmRMYWJlbCgn0J/Qu9Cw0L3QuNGA0YPQtdC80L7QtScsIGZpZWxkKTtcclxuICAgIHRpbWVCbG9jay5hcHBlbmRDaGlsZChibG9jayk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGltZUJsb2NrKTtcclxuXHJcbiAgICAvL9C/0YDQvtC10LrRglxyXG4gICAgZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xpZW50X2lkJyk7XHJcbiAgICBsZXQgcHJvamVjdCA9IGNyZWF0ZUZpZWxkQW5kTGFiZWwoJ9Cf0YDQvtC10LrRgicsIGZpZWxkKTtcclxuICAgIHByb2plY3QuY2xhc3NMaXN0LmFkZCgnZnJvdy1jb2wtMi0xJyk7XHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChwcm9qZWN0KTtcclxuXHJcbiAgICAvL9GB0YDQvtC6XHJcbiAgICBsZXQgZGVhZGxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kX2RhdGUnKS5wYXJlbnROb2RlO1xyXG4gICAgZGVhZGxpbmUud2lkdGggPSAnJztcclxuICAgIGRlYWRsaW5lLmNsYXNzTGlzdC5hZGQoJ2RlYWRsaW5lLWNhbGVuZGFyJywnZnJvdy1jb2wtMi0yJyk7XHJcblxyXG4gICAgLy/Rg9Cx0LjRgNCw0Y4g0YHQuNC80LLQvtC7INC/0LXRgNC10LLQvtC00LAg0YHRgtGA0L7QutC4XHJcbiAgICBkZWFkbGluZS5yZW1vdmVDaGlsZChkZWFkbGluZS5xdWVyeVNlbGVjdG9yKCdzY3JpcHQnKS5uZXh0U2libGluZyk7XHJcblxyXG4gICAgLy/QutC90L7Qv9C60YMg0KUgLSDQvtGH0LjRgdGC0LjRgtGMINC/0L7Qu9C1IC0g0YPQsdC40YDQsNGOXHJcbiAgICAvL2RlYWRsaW5lLnJlbW92ZUNoaWxkKGRlYWRsaW5lLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9YnV0dG9uXScpKTtcclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUZpZWxkQW5kTGFiZWwoJ9Ch0YDQvtC6JywgZGVhZGxpbmUpKTtcclxuXHJcbiAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmllbGRzLXJvdycsJ3Rhc2stcm93LTInKTtcclxuICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gICAgcm93c0ZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgIC8vMyDRgtGA0LXRgtGM0Y8g0YHRgtGA0L7QutCwIC0g0LTQvtC/0L7Qu9C90LjRgtC10LvRjNC90YvQuSDQtdC80LXQudC7INC4INGC0LjQvyDQt9Cw0LTQsNGH0LhcclxuICAgIC8v0LTQvtC/0L7Qu9C90LjRgtC10LvRjNC90YvQuSDQtdC80LXQudC7XHJcbiAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1maWVsZHMtcm93JywndGFzay1yb3ctMycpO1xyXG5cclxuICAgIGxldCBzZW5kTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRfZW1haWwnKTtcclxuXHJcbiAgICBsZXQgYWRkRW1haWwgPSBzZW5kTGlzdC5wYXJlbnROb2RlO1xyXG4gICAgYWRkRW1haWwuY2xhc3NMaXN0LmFkZCgnYWRkLWVtYWlsJyk7XHJcblxyXG4gICAgbGV0IGFkZEVtYWlsTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgYWRkRW1haWxMYWJlbC50ZXh0Q29udGVudCA9ICfQn9C+0LvRg9GH0LDRgtC10LvQuCDRgNCw0YHRgdGL0LvQutC4INC/0L4g0L/QvtGH0YLQtSc7XHJcbiAgICBhZGRFbWFpbC5pbnNlcnRCZWZvcmUoYWRkRW1haWxMYWJlbCxhZGRFbWFpbC5maXJzdEVsZW1lbnRDaGlsZCk7XHJcblxyXG4gICAgbGV0IHNlbmRMaXN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dldEVtYWlsQWRkcmVzc2VzQnV0dG9uJyk7XHJcbiAgICBzZW5kTGlzdEJ0bi52YWx1ZSA9ICfQmtC+0LzRgyDQv9C40YHRjNC80LAnO1xyXG4gICAgYWRkRW1haWwuYXBwZW5kQ2hpbGQoc2VuZExpc3RCdG4pO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGFkZEVtYWlsKTtcclxuXHJcbiAgICAvL9GC0LjQvyDQt9Cw0LTQsNGH0LhcclxuICAgIGxldCB0YXNrVHlwZUJsb2NrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2JsZW1fdHlwZScpLnBhcmVudE5vZGU7XHJcbiAgICB0YXNrVHlwZUJsb2NrLmNsYXNzTGlzdC5hZGQoJ3Rhc2stdHlwZScpO1xyXG5cclxuICAgIGxldCB0YXNrVHlwZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgIHRhc2tUeXBlTGFiZWwudGV4dENvbnRlbnQgPSAn0KLQuNC/INC30LDQtNCw0YfQuCc7XHJcbiAgICB0YXNrVHlwZUJsb2NrLmluc2VydEJlZm9yZSh0YXNrVHlwZUxhYmVsLHRhc2tUeXBlQmxvY2suZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGFza1R5cGVCbG9jayk7XHJcblxyXG4gICAgcm93SXRlbS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICByb3dzRnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgLy80INGH0LXRgtCy0LXRgNGC0LDRjyDRgdGC0YDQvtC60LAgLSDQtNC+0LHQsNCy0LvQtdC90LjQtSDRhNCw0LnQu9C+0LJcclxuICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWZpZWxkcy1yb3cnLCd0YXNrLXJvdy00Jyk7XHJcblxyXG4gICAgbGV0IGV4aXN0QWRkRmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGaWxlSW5wdXRzJyk7XHJcbiAgICBsZXQgYWRkRmlsZXNCbG9jayA9IGV4aXN0QWRkRmlsZS5wYXJlbnROb2RlO1xyXG4gICAgYWRkRmlsZXNCbG9jay5jbGFzc0xpc3QuYWRkKCdhZGQtZmlsZXMnKTtcclxuXHJcbiAgICBsZXQgYWRkRmlsZXNMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICBhZGRGaWxlc0xhYmVsLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24tdGl0bGUnKTtcclxuICAgIGFkZEZpbGVzTGFiZWwuaW5uZXJIVE1MID0gJ9Ck0LDQudC70YsgPHNwYW4gY2xhc3M9XCJzLWluZm9cIj7QvtCx0YnQuNC5INC+0LHRitC10LwgPHNwYW4gaWQ9XCJmaWxlcy10b3RhbFwiPtC00L4gMyDQnNCxPC9zcGFuPjwvc3Bhbj4nO1xyXG4gICAgLy/QsiBpZD1cImZpbGVzLXRvdGFsXCIg0LHRg9C00LXRgiDQt9Cw0LzQtdC90Y/RgtGB0Y8g0YLQtdC60YHRgiDQutC+0LPQtNCwINGE0LDQudC70Ysg0LLRi9Cx0YDQvdGLIC0g0L7QsdGJ0LjQuSDQvtCx0YrQtdC8INCy0YvQsdGA0LDQvdC90YvRhSDRhNCw0LnQu9C+0LJcclxuICAgIGFkZEZpbGVzQmxvY2suaW5zZXJ0QmVmb3JlKGFkZEZpbGVzTGFiZWwsYWRkRmlsZXNCbG9jay5maXJzdEVsZW1lbnRDaGlsZCk7XHJcblxyXG4gICAgLy/RjdGC0YMg0YHRgdGL0LvQutGDINGPINGB0LrRgNC+0Y4g0YHRgtC40LvRj9C80LhcclxuICAgIC8vIGxldCBhZGRGaWxlSW5wdXQgPSBhZGRGaWxlc0Jsb2NrLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcclxuICAgIC8vIGFkZEZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ29uY2xpY2snLCdhZGRGaWxlSW5wdXQoXCJGaWxlSW5wdXRzXCIpJyk7XHJcblxyXG4gICAgLy8gYWRkRmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgIHJlbW92ZUZpbGVJbnB1dChleGlzdEFkZEZpbGUpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLy/QsdC70L7QuiDQsiDQutC+0YLQvtGA0L7QvCDQsdGD0LTQtdGCINGB0L/QuNGB0L7QuiDQt9Cw0LPRgNGD0LbQtdC90L3Ri9GFINGE0LDQudC70L7QslxyXG4gICAgbGV0IGFkZGVkRmlsZXNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIGFkZGVkRmlsZXNMaXN0LmlkID0gJ2ZpbGVzLWxpc3QnO1xyXG4gICAgYWRkZWRGaWxlc0xpc3QuY2xhc3NMaXN0LmFkZCgnZmlsZXMtbGlzdCcpO1xyXG4gICAgYWRkRmlsZXNCbG9jay5pbnNlcnRCZWZvcmUoYWRkZWRGaWxlc0xpc3QsZXhpc3RBZGRGaWxlKTtcclxuXHJcbiAgICAvL9C+0LHQtdGA0L3Rg9GC0Ywg0YHRg9GJ0LXRgdGC0LLRg9GO0YnQuNC5IGlucHV0IGZpbGVcclxuICAgIC8v0YHQsNC8IGlucHV0INCx0YPQtNC10YIg0YHQutGA0YvRglxyXG4gICAgLy/QuCDQvdCw0LLQtdGB0LjRgtGMINCy0YvQt9C+0LIg0YTRg9C90LrRhtC40Lgg0YHQvtC30LTQsNGO0YnQtdC5INC90L7QstGL0Lkg0LjQvdC/0YPRglxyXG4gICAgbGV0IGRlZmF1bHRGaWxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZUlucHV0MCcpO1xyXG4gICAgLy/QsNGC0YDQuNCx0YPRgiBvbmNoYW5nZSDQtNC+0LHQsNCy0LvRj9GOINGH0YLQvtCx0Ysg0L3QtSDQutC+0L/QuNGA0L7QstCw0YLRjCDRg9C20LUg0YHRg9GJ0LXRgdGC0LLRg9GO0YnRjtGOXHJcbiAgICAvL9CyINGC0YDQtdC60LXRgNC1INGE0YPQvdC60YbQuNGOINC00L7QsdCw0LvRj9C90LjRjyDQuNC90L/Rg9GC0L7QslxyXG4gICAgZGVmYXVsdEZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ29uY2hhbmdlJywnYWRkRmlsZUlucHV0KFwiRmlsZUlucHV0c1wiKScpO1xyXG4gICAgZGVmYXVsdEZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcHJvY2Vzc0ZpbGVzKHRoaXMsYWRkZWRGaWxlc0xpc3QpO1xyXG4gICAgICAgIGhpZGVGaWxsZWRGaWxlSW5wdXQodGhpcyk7XHJcbiAgICB9KTtcclxuICAgIGV4aXN0QWRkRmlsZS5hcHBlbmRDaGlsZCh3cmFwRmlsZUlucHV0cyhkZWZhdWx0RmlsZUlucHV0KSk7XHJcblxyXG4gICAgbGV0IGFkZEZpbGVPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG11dGF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBpZihtdXRhdGlvbi5hZGRlZE5vZGVzWzBdLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBtdXRhdGlvbi5hZGRlZE5vZGVzWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnb25jaGFuZ2UnLCdhZGRGaWxlSW5wdXQoXCJGaWxlSW5wdXRzXCIpJyk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzRmlsZXModGhpcyxhZGRlZEZpbGVzTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZUZpbGxlZEZpbGVJbnB1dCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v0LLRgdC1INC90L7QstGL0LUgaW5wdXQgZmlsZSDQvdGD0LbQvdC+INC+0LHQtdGA0L3Rg9GC0YwsXHJcbiAgICAgICAgICAgICAgICAvL9GB0LDQvCBpbnB1dCDQsdGD0LTQtdGCINGB0LrRgNGL0YJcclxuICAgICAgICAgICAgICAgIGxldCBmYWtlSW5wdXQgPSB3cmFwRmlsZUlucHV0cyhpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuYXBwZW5kQ2hpbGQoZmFrZUlucHV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGFkZEZpbGVPYnNlcnZlckNvbmZpZyA9IHtcclxuICAgICAgICBhdHRyaWJ1dGVzOiBmYWxzZSxcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgYWRkRmlsZU9ic2VydmVyLm9ic2VydmUoZXhpc3RBZGRGaWxlLCBhZGRGaWxlT2JzZXJ2ZXJDb25maWcpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGFkZEZpbGVzQmxvY2spO1xyXG4gICAgcm93SXRlbS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICByb3dzRnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgLy81INC/0Y/RgtCw0Y8g0YHRgtGA0L7QutCwIC0g0LrQvdC+0L/QutCwINCh0L7RhdGA0LDQvdC40YLRjFxyXG4gICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmllbGRzLXJvdycsJ3Rhc2stcm93LTUnKTtcclxuXHJcbiAgICBsZXQgc2F2ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9c3VibWl0QnV0dG9uXScpO1xyXG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tYWN0aW9uJyk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoc2F2ZUJ0bik7XHJcbiAgICByb3dJdGVtLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICAgIHJvd3NGcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAvL9Cy0YHQtSDRgdC+0LHRgNCw0L3QvdC+0LUv0L/QtdGA0LXQvNC10YnQtdC90L3QvtC1INCy0YHRgtCw0LLQu9GP0Y4g0LIg0LHQu9C+0LpcclxuICAgIG5ld0NvbW1lbnQuYXBwZW5kQ2hpbGQocm93c0ZyYWdtZW50KTtcclxuXHJcbiAgICAvLy0t0YLRg9GCINC90LDQstC10YjQuNCy0LDRjiDRgdC+0LHRi9GC0LjRjyDQvdCwINC/0LXRgNC10LzQtdGJ0LXQvdC90YvQtSDRjdC70LXQvNC10L3RgtGLXHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZUZpbGxlZEZpbGVJbnB1dChpbnB1dCkge1xyXG4gICAgICAgIGlucHV0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLWVsZW0nKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcm9jZXNzRmlsZXMoZmllbGQsIGZpbGVzbGlzdCkge1xyXG4gICAgICAgIGxldCBmaWxlID0gZmllbGQuZmlsZXNbMF07XHJcbiAgICAgICAgbGV0IGZpbGVTaXplID0gZmlsZS5zaXplO1xyXG5cclxuXHJcbiAgICAgICAgaWYoIWZpbGVzbGlzdC5kYXRhc2V0LnRvdGFsKXtcclxuICAgICAgICAgICAgZmlsZXNsaXN0LmRhdGFzZXQudG90YWwgPSBmaWxlU2l6ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZmlsZXNsaXN0LmRhdGFzZXQudG90YWwgPSBwYXJzZUludChmaWxlc2xpc3QuZGF0YXNldC50b3RhbCkgKyBwYXJzZUludChmaWxlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdG90YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZXMtdG90YWwnKTtcclxuICAgICAgICB0b3RhbC50ZXh0Q29udGVudCA9IGJ5dGVzVG9TaXplKGZpbGVzbGlzdC5kYXRhc2V0LnRvdGFsKSArICcg0LjQtyAzINCc0LEnO1xyXG5cclxuICAgICAgICBsZXQgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgcC5pbm5lckhUTUwgPSBmaWxlLm5hbWUgKyAnPHNwYW4gY2xhc3M9XCJzLWluZm9cIj4nICsgTWF0aC5jZWlsKGZpbGVTaXplIC8gMTAyNCkgKyAnIEtiPC9zcGFuPic7XHJcbiAgICAgICAgcC5jbGFzc0xpc3QuYWRkKCdmaWxlLWxpc3QtaXRlbScpO1xyXG5cclxuICAgICAgICBsZXQgcmVtb3ZlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHJlbW92ZUJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tcmVtb3ZlLWl0ZW0nKTtcclxuICAgICAgICByZW1vdmVCdG4uZGF0YXNldC5maWVsZElkID0gZmllbGQuaWQ7XHJcblxyXG4gICAgICAgIHAuYXBwZW5kQ2hpbGQocmVtb3ZlQnRuKTtcclxuXHJcbiAgICAgICAgZmlsZXNsaXN0LmFwcGVuZENoaWxkKHApO1xyXG5cclxuICAgICAgICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVtb3ZlRmlsZUlucHV0KHRoaXMsdG90YWwsZmlsZXNsaXN0LGZpbGVTaXplKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/Qv9GA0Lgg0LLRi9Cx0L7RgNC1INCyINGB0L/QuNGB0LrQtSDQtNC+0L8u0LXQvNCw0LnQu9C+0LIg0YHRgNCw0LfRgyDQstGB0YLQsNCy0LvRj9GC0Ywg0LIg0L/QvtC70LUg0LTQu9GPINC+0YLQv9GA0LDQstC60LhcclxuICAgIGxldCBlbWFpbExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkX2VtYWlsX3dvcmtlcicpO1xyXG4gICAgbGV0IG9uUGFnZUVtYWlsTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICBvblBhZ2VFbWFpbExpc3QuY2xhc3NMaXN0LmFkZCgnZW1haWwtc2VuZC1saXN0Jyk7XHJcbiAgICBhZGRFbWFpbC5pbnNlcnRCZWZvcmUob25QYWdlRW1haWxMaXN0LGFkZEVtYWlsLmNoaWxkTm9kZXNbMl0pO1xyXG5cclxuICAgIGVtYWlsTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYWRkV29ya2VyRW1haWxUb1NlbmRMaXN0KHRoaXMsc2VuZExpc3Qsb25QYWdlRW1haWxMaXN0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8v0L/RgNC4INCy0YvQsdC+0YDQtSDQsiDRgdC10LvQtdC60YLQtSDQodGC0LDRgtGD0YEg0L/QtdGA0LXQutC70Y7Rh9Cw0Y4g0YDQsNC00LjQviwg0YfRgtC+0LHRiyDRhNC+0YDQvNCwINC/0YDQsNCy0LjQu9GM0L3QviDRgNCw0LHQvtGC0LDQu9CwXHJcbiAgICBzdGF0dXNMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnZhbHVlKS5jaGVja2VkID0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8v0L/RgNC4INC30LDQs9GA0YPQt9C60LUg0YHRgtGA0LDQvdC40YbRiyDQvdGD0LbQvdC+INGB0LzQvtGC0YDQtdGC0Ywg0LLRi9Cx0YDQsNC90L3Ri9C5INGA0LDQtNC40L4g0YHQviDRgdGC0LDRgtGD0YHQvtC8ICjQsiDRgdC60YDRi9GC0L7QuSDRh9Cw0YHRgtC4INGC0LDQsdC70LjRhtGLICN0YXNrLWZvb3RlcilcclxuICAgIC8v0Lgg0YHRgtCw0LLQuNGC0Ywg0YHRgtCw0YLRg9GBINCyINGB0LXQu9C10LrRgtC1IHN0YXR1c0xpc3RcclxuICAgIHVwZGF0ZVN0YXR1c0xpc3RPbkxvYWQoc3RhdHVzTGlzdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUZpZWxkQW5kTGFiZWwodGV4dCxmaWVsZCkge1xyXG4gICAgbGV0IHJvd0l0ZW1Qcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbGV0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgIGxhYmVsLnRleHRDb250ZW50ID0gdGV4dDtcclxuICAgIHJvd0l0ZW1Qcm90by5hcHBlbmRDaGlsZChsYWJlbCk7XHJcbiAgICByb3dJdGVtUHJvdG8uYXBwZW5kQ2hpbGQoZmllbGQpO1xyXG4gICAgcmV0dXJuIHJvd0l0ZW1Qcm90bztcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3RhdHVzTGlzdCh0YmwpIHtcclxuICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XHJcbiAgICBsZXQgcm93cyA9IEFycmF5LmZyb20odGJsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyJykpO1xyXG5cclxuICAgIGxldCBvcHRncm91cDtcclxuXHJcbiAgICByb3dzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGlmKGl0ZW0uZmlyc3RFbGVtZW50Q2hpbGQuZ2V0QXR0cmlidXRlKCdjb2xzcGFuJykpe1xyXG4gICAgICAgICAgICBvcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGdyb3VwJyk7XHJcbiAgICAgICAgICAgIG9wdGdyb3VwLmxhYmVsID0gaXRlbS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChvcHRncm91cCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCByYWRpbyA9IGl0ZW0ucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSByYWRpby5pZDtcclxuICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdsYWJlbCcpLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBvcHRncm91cC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBsaXN0O1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTdGF0dXNMaXN0T25Mb2FkKGxpc3QpIHtcclxuICAgIGxldCBzdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPW5ld19wcm9ibGVtX3N0YXR1c106Y2hlY2tlZCcpO1xyXG5cclxuICAgIGZvciggbGV0IGkgb2YgbGlzdC5vcHRpb25zKXtcclxuICAgICAgICBpZihpLnZhbHVlID09PSBzdGF0dXMuaWQpe1xyXG4gICAgICAgICAgICBpLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFdvcmtlckVtYWlsVG9TZW5kTGlzdChzZWxlY3QsIGlucHV0LCBsaXN0KSB7XHJcbiAgICBsZXQgb3B0aW9uID0gc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdO1xyXG4gICAgbGV0IGRhdGEgPSBbb3B0aW9uLnRleHQsc2VsZWN0LnZhbHVlXTtcclxuICAgIGxldCBlbWFpbCA9IGRhdGFbMV07XHJcblxyXG4gICAgaWYgKGVtYWlsLnRyaW0oKSAhPT0gXCJcIikge1xyXG4gICAgICAgIGxldCBhZGRFbWFpbCA9IGlucHV0LnZhbHVlO1xyXG4gICAgICAgIGxldCBuZXd2YWwgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKGFkZEVtYWlsID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIG5ld3ZhbCA9IGVtYWlsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWRkRW1haWwuaW5kZXhPZihlbWFpbCkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIG5ld3ZhbCA9IGFkZEVtYWlsICsgKGVtYWlsLmNoYXJBdChhZGRFbWFpbC5sZW5ndGggLSAxKSA9PSBcIjtcIiA/IFwiXCIgOiBcIjtcIikgKyBlbWFpbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0LnZhbHVlID0gbmV3dmFsO1xyXG5cclxuICAgICAgICBsZXQgbmV3aXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgbmV3aXRlbS50ZXh0Q29udGVudCA9IGRhdGFbMF07XHJcbiAgICAgICAgbmV3aXRlbS5kYXRhc2V0LmVtYWlsID0gZGF0YVsxXTtcclxuXHJcbiAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChuZXdpdGVtKTtcclxuXHJcbiAgICAgICAgbmV3aXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVtb3ZlSXRlbUZyb21TZW5kbGlzdCh0aGlzLCBzZWxlY3QsIGlucHV0KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL9Cy0YvQsdGA0LDQvdC90L7Qs9C+INC/0L7Qu9GD0YfQsNGC0LXQu9GPINGB0LrRgNGL0LLQsNGOXHJcbiAgICAgICAgLy/RgdGC0LDQstC70Y4g0LLRi9Cx0YDQsNC90L3Ri9C8INC00LXRhNC+0LvRgtC90YvQuSAo0L/QtdGA0LLRi9C5KSDRjdC70LXQvNC10L3RgiDRgdC/0LjRgdC60LBcclxuXHJcbiAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywnJyk7XHJcbiAgICAgICAgc2VsZWN0Lm9wdGlvbnNbMF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVJdGVtRnJvbVNlbmRsaXN0KGl0ZW0sIHNlbGVjdCwgaW5wdXQpIHtcclxuICAgIGxldCB0ZXh0ID0gaXRlbS5kYXRhc2V0LmVtYWlsO1xyXG5cclxuICAgIGxldCBzZW5kTGlzdCA9IGlucHV0LnZhbHVlLnNwbGl0KCc7Jyk7XHJcblxyXG4gICAgbGV0IGZpbHRlcmVkU2VuZExpc3QgPSBzZW5kTGlzdC5maWx0ZXIoZnVuY3Rpb24gKGxpc3RpdGVtKSB7XHJcbiAgICAgICAgaWYobGlzdGl0ZW0gIT09IHRleHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGl0ZW1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dC52YWx1ZSA9IGZpbHRlcmVkU2VuZExpc3Quam9pbignOycpO1xyXG5cclxuICAgIGl0ZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpdGVtKTtcclxuXHJcbiAgICBmb3IoIGxldCBpIG9mIHNlbGVjdC5vcHRpb25zKXtcclxuICAgICAgICBpZihpLnZhbHVlID09PSB0ZXh0KXtcclxuICAgICAgICAgICAgaS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlRmlsZUlucHV0KGJ0bix0b3RhbCxmaWxlc2xpc3QsZmlsZXNpemUpIHtcclxuICAgIGxldCB1cGRhdGVUb3RhbFNpemUgPSBmaWxlc2xpc3QuZGF0YXNldC50b3RhbCAtIGZpbGVzaXplO1xyXG4gICAgZmlsZXNsaXN0LmRhdGFzZXQudG90YWwgPSB1cGRhdGVUb3RhbFNpemU7XHJcbiAgICB0b3RhbC50ZXh0Q29udGVudCA9IGJ5dGVzVG9TaXplKHVwZGF0ZVRvdGFsU2l6ZSkgKyAnINC40LcgMyDQnNCxJztcclxuXHJcbiAgICBsZXQgaW5wdXRJZCA9IGJ0bi5kYXRhc2V0LmZpZWxkSWQ7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbnB1dElkKS5wYXJlbnROb2RlLnJlbW92ZSgpO1xyXG4gICAgYnRuLnBhcmVudE5vZGUucmVtb3ZlKCk7XHJcblxyXG4gICAgbGV0IGZpbGVJbnB1dHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5maWxlSW5wdXQnKSk7XHJcbiAgICBsZXQgcmVtb3ZlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tcmVtb3ZlLWl0ZW0nKTtcclxuXHJcbiAgICAvL9C/0LXRgNC10L/QuNGB0LDRgtGMINC40LzQtdC90LAg0LggaWQg0LLRgdC10YUg0LjQvdC/0YPRgtC+0LIuXHJcbiAgICAvL9C10YHQu9C4INC+0L3QuCDQuNC00YPRgiDQvdC1INC/0L4g0L/QvtGA0Y/QtNC60YMg0LjQu9C4INGBINC/0YDQvtC/0YPRgdC60LDQvNC4XHJcbiAgICAvL9C/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INGE0LDQudC70L7QsiDQvdCwINGB0LXRgNCy0LXRgCDQsdGD0LTQtdGCINC+0YjQuNCx0LrQsFxyXG4gICAgLy/RgtC+INC20LUg0L3QsNC00L4g0YHQtNC10LvQsNGC0Ywg0YEgZGF0YS1pbnB1dC1pZCDQutC90L7Qv9C+0Log0YPQtNCw0LvQtdC90Y8g0YTQsNC50LvQsFxyXG4gICAgLy/QsCDRgtC+INCx0YPQtNC10YIg0YPQtNCw0LvRj9GC0YHRjyDQvdC1INGC0L7RgiDQuNC90L/Rg9GCXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZUlucHV0cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgZmlsZUlucHV0c1tpXS5maXJzdEVsZW1lbnRDaGlsZC5pZCA9ICdmaWxlSW5wdXQnK2k7XHJcbiAgICAgICAgZmlsZUlucHV0c1tpXS5maXJzdEVsZW1lbnRDaGlsZC5uYW1lID0gJ2ZpbGVJbnB1dCcraTtcclxuICAgICAgICByZW1vdmVCdG5zW2ldLmRhdGFzZXQuZmllbGRJZCA9ICdmaWxlSW5wdXQnK2k7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyYXBGaWxlSW5wdXRzKGlucHV0KSB7XHJcbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbGV0IGJ0biA9IHdyYXAuY2xvbmVOb2RlKGZhbHNlKTtcclxuXHJcbiAgICB3cmFwLmNsYXNzTGlzdC5hZGQoJ2Zha2UtZmlsZS1pbnB1dCcsaW5wdXQuY2xhc3NMaXN0WzBdKTtcclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICAgIGJ0bi5pbm5lckhUTUwgPSAn0JTQvtCx0LDQstC40YLRjCDRhNCw0LnQuyA8c3Bhbj7QndCw0LbQvNC4INC40LvQuCDRgtCw0YnQuCDQtdCz0L4g0YHRjtC00LA8L3NwYW4+JztcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tZmFrZS1maWxlJyk7XHJcbiAgICB3cmFwLmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnaXMtaG92ZXInKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdpcy1ob3ZlcicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdpcy1ob3ZlcicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHdyYXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ5dGVzVG9TaXplKGJ5dGVzKSB7XHJcbiAgICBsZXQgc2l6ZXMgPSBbJ0J5dGVzJywgJ9Ca0LEnLCAn0JzQsScsICfQk9CxJywgJ9Ci0LEnXTtcclxuICAgIGlmICghYnl0ZXMpIHtcclxuICAgICAgICByZXR1cm4gJzAnXHJcbiAgICB9XHJcbiAgICBsZXQgaSA9IHBhcnNlSW50KE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coMTAyNCkpKTtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKGJ5dGVzIC8gTWF0aC5wb3coMTAyNCwgaSksIDIpICsgJyAnICsgc2l6ZXNbaV07XHJcbn1cclxuXHJcblxyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vcGNzcy90YXNrRm9vdGVyRGVzaWduLnBjc3MnO1xyXG5cclxuZXhwb3J0IHt0YXNrRm9vdGVyRGVzaWdufTtcclxuXHJcbmlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKXtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCB0YXNrRm9vdGVyRGVzaWduJyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90YXNrRm9vdGVyRGVzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi90YXNrRm9vdGVyRGVzaWduLnBjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdGFza0Zvb3RlckRlc2lnbi5wY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3Rhc2tGb290ZXJEZXNpZ24ucGNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGNzcy90YXNrRm9vdGVyRGVzaWduLnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiN0YXNrLWZvb3RlciB0cjpudGgtY2hpbGQoMil7aGVpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVufS5mYWtlLWZpbGUtaW5wdXQgLmJ0bi1mYWtlLWZpbGV7cGFkZGluZzouN2VtIDAgMDt0ZXh0LWFsaWduOmNlbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LXNpemU6MTZweDtjb2xvcjojODJhNWMzO2N1cnNvcjpwb2ludGVyfS5mYWtlLWZpbGUtaW5wdXQgLmJ0bi1mYWtlLWZpbGUgc3Bhbnt3aWR0aDoxMDAlO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2ZvbnQtc2l6ZToxMnB4fS5mYWtlLWZpbGUtaW5wdXQ+aW5wdXR7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7b3BhY2l0eTowfSNGaWxlSW5wdXRzIGJye2Rpc3BsYXk6bm9uZX0udGFzay10eXBlPmRpdiBzZWxlY3R7bWFyZ2luLXRvcDouM2VtfS50YXNrLXR5cGU+ZGl2IGJye2Rpc3BsYXk6bm9uZX0uZW1haWwtc2VuZC1saXN0PmxpOmFmdGVye2NvbnRlbnQ6XFxcIlxcXFwxRjdBOVxcXCI7bWFyZ2luLWxlZnQ6LjRlbTtjb2xvcjpyZWQ7ZGlzcGxheTppbmxpbmUtYmxvY2s7Y3Vyc29yOnBvaW50ZXJ9LmFkZC1lbWFpbCAjZ2V0RW1haWxBZGRyZXNzZXNCdXR0b257ZGlzcGxheTpub25lXFxyXFxuICAgICAgICAvKndpZHRoOiA5MHB4O1xcclxcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsqL30uYWRkLWVtYWlsICNhZGRfZW1haWxfd29ya2Vye3dpZHRoOjIyNnB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWRkLWVtYWlsICNhZGRfZW1haWx7cG9zaXRpb246YWJzb2x1dGU7dmlzaWJpbGl0eTpoaWRkZW47ei1pbmRleDphdXRvfS5hZGQtZW1haWwgbGFiZWx7ZGlzcGxheTpibG9ja306cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXIgI2VuZF9kYXRle3dpZHRoOmF1dG8haW1wb3J0YW50fTpyb290IC5kZWFkbGluZS1jYWxlbmRhciBpbnB1dFt0eXBlPWJ1dHRvbl17ZGlzcGxheTpub25lfTpyb290IC5kZWFkbGluZS1jYWxlbmRhcj5pbWd7cG9zaXRpb246YWJzb2x1dGU7dG9wOi40ZW07cmlnaHQ6LjVlbX06cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXI+aW5wdXRbdHlwZT10ZXh0XXtwYWRkaW5nLXJpZ2h0OjMwcHh9LnRhc2stcm93LTIgLnRpbWUtYmxvY2s+ZGl2OmFmdGVye2NvbnRlbnQ6XFxcIlxcXFw0M0NcXFxcNDM4XFxcXDQzRFxcXCI7bWFyZ2luLWxlZnQ6LjVlbTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9Lndvcmtlci1ibG9jayBzZWxlY3R7d2lkdGg6MTAwJTttYXJnaW46LjVlbSAwIDB9LnRhc2stZmllbGRzLXJvdyAuZnJvdy1jb2wtMi0ye3dpZHRoOjEyMHB4fS50YXNrLWZpZWxkcy1yb3cgLmZyb3ctY29sLTItMXt3aWR0aDoxOTBweDttYXJnaW4tcmlnaHQ6MzBweH0udGFzay1maWVsZHMtcm93IHRke3BhZGRpbmc6MDtmb250LXNpemU6MTAwJTtkaXNwbGF5OmJsb2NrfS50YXNrLWZpZWxkcy1yb3cgc2VsZWN0e3BhZGRpbmc6LjNlbSAwIC4zZW0gLjJlbX0udGFzay1maWVsZHMtcm93IGlucHV0LmlucHV0X2ZpZWxkLC50YXNrLWZpZWxkcy1yb3cgaW5wdXRbdHlwZT10ZXh0XSwudGFzay1maWVsZHMtcm93IHNlbGVjdHt3aWR0aDphdXRvO21heC13aWR0aDoxMDAlO2hlaWdodDoyZW07cGFkZGluZzouM2VtIC42ZW07Ym9yZGVyOjFweCBzb2xpZCAjOWU5ZTllO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS50YXNrLWZpZWxkcy1yb3cgaW5wdXQuaW5wdXRfZmllbGQ6Zm9jdXMsLnRhc2stZmllbGRzLXJvdyBpbnB1dFt0eXBlPXRleHRdOmZvY3VzLC50YXNrLWZpZWxkcy1yb3cgc2VsZWN0OmZvY3Vze2JvcmRlci1jb2xvcjojMjZhNjlhfS5jb250ZW50e1xcclxcbiAgICAvKtGD0LHQuNGA0LDRjiDQu9C40YjQvdC40LUg0L7RgtGB0YLRg9C/0Ysg0LggYnIg0YfRgtC+0LHRiyDRg9C80LXQvdGM0YjQuNGC0Ywg0LTRi9GA0YMg0L/QvtC0INC/0L7Qu9GP0LzQuCDQutCw0LzQtdC90YLQsCovcGFkZGluZy1ib3R0b206MH1cXHJcXG5cXHJcXG4vKiDQv9GA0LXQstGA0LDRidCw0Y4g0LLRgdC1INCyINCx0LvQvtC60LgqLyN0YmwtbmV3LWNvbW1lbnQgdGJvZHksI3RibC1uZXctY29tbWVudCB0ZCwjdGJsLW5ldy1jb21tZW50IHRye2Rpc3BsYXk6YmxvY2t9XFxyXFxuXFxyXFxuLyrRgdC60YDRi9Cy0LDRjiDQv9C10YDQstGD0Y4g0Y/Rh9C10LnQutGDINGBINGC0LXQutGB0YLQvtC8INCi0LXQutGB0YIqLyN0YmwtbmV3LWNvbW1lbnQgdHI6Zmlyc3QtY2hpbGQ+dGQ6Zmlyc3QtY2hpbGR7ZGlzcGxheTpub25lfSN0YmwtbmV3LWNvbW1lbnQrYnJ7XFxyXFxuICAgIC8q0YPQsdC40YDQsNGOINC70LjRiNC90LjQtSDQvtGC0YHRgtGD0L/RiyDQuCBiciDRh9GC0L7QsdGLINGD0LzQtdC90YzRiNC40YLRjCDQtNGL0YDRgyDQv9C+0LQg0L/QvtC70Y/QvNC4INC60LDQvNC10L3RgtCwKi9kaXNwbGF5Om5vbmV9XFxyXFxuXFxyXFxuLyrQstGL0YDQvtCy0L3Rj9GC0Ywg0L3QvtCy0YvQuSDQutCw0LzQtdC90YIg0L/QviDQutCw0YDRgtC+0YfQutCw0Lwg0LrQsNC80LXQvdGC0L7QsiovI25ldy1jb21tZW50LXdyYXB7bWF4LXdpZHRoOjcyMHB4O21hcmdpbjphdXRvfVxcclxcblxcclxcbi8qdGV4dGFyZWEqL1xcclxcblxcclxcbi8q0LfQsNCz0L7Qu9C+0LLQvtC6INCU0L7QsdCw0LLQuNGC0Ywg0LrQvtC80LzQtdC90YLQsNGA0LjQuSovLnRse2Rpc3BsYXk6bm9uZX1cXHJcXG5cXHJcXG4vKtC+0LHQtdGA0YLQutCwINCy0L7QutGA0YPQsyDQv9C+0LvRjyDQlNC+0LHQsNCy0LjRgtGMINC60L7QvNC80LXQvdGC0LDRgNC40LkqLy50YXJlYS13cmFwe3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0jdGV4dHt3aWR0aDoxMDAlO3BhZGRpbmc6LjZlbSAuOGVtO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOjE0cHg7Ym9yZGVyOjA7Ym94LXNpemluZzpib3JkZXItYm94O2JveC1zaGFkb3c6aW5zZXQgMCAtMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSxpbnNldCAwIDFweCA1cHggMCByZ2JhKDAsMCwwLC4xMiksaW5zZXQgMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMil9XFxyXFxuXFxyXFxuLyrQvtGE0L7RgNC80LvQtdC90LjQtSDQv9C+0LvQtdC5INC4INGB0YLRgNC+0Log0YEg0L/QvtC70Y/QvNC4INC/0L7QtCDQv9C+0LvQtdC8INC60LDQvNC10L3RgtCwKi8udGFzay1maWVsZHMtcm93e21heC13aWR0aDo3MjBweDttYXJnaW46MS42ZW0gYXV0b30udGFzay1maWVsZHMtcm93IGxhYmVse21hcmdpbjowIDAgLjVlbTtjb2xvcjpncmF5O2Rpc3BsYXk6aW5saW5lLWJsb2NrfVxcclxcblxcclxcbi8qIDEg0YHRgtGA0L7QutCwICovLnRhc2stcm93LTF7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXhcXHJcXG4gICAgLypqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47Ki99Lndvcmtlci1ibG9ja3t3aWR0aDozMDBweDttYXJnaW4tcmlnaHQ6NzBweDstbXMtZmxleDowIDAgMzAwcHg7ZmxleDowIDAgMzAwcHh9Lndvcmtlci1ibG9jayBpbnB1dFt0eXBlPXJhZGlvXXtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7cG9zaXRpb246cmVsYXRpdmU7dG9wOi0uMmVtfVxcclxcblxcclxcbi8qIDIg0YHRgtGA0L7QutCwICovLnRhc2stcm93LTJ7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXhcXHJcXG4gICAgLypqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47Ki99LnRhc2stcm93LTIgLnRpbWUtYmxvY2t7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtcGFjazpqdXN0aWZ5O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS50YXNrLXJvdy0yIC50aW1lLWJsb2NrPmRpdnt3aWR0aDoxMjBweH0udGFzay1yb3ctMiAudGltZS1ibG9jaz5kaXYgaW5wdXR7d2lkdGg6NzYlO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX06cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXJ7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzowIWltcG9ydGFudDtmb250LXNpemU6MTAwJVxcclxcbiAgICAvKmZsZXg6IDEgMSAxODBweDsqL306cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXI+aW1nLDpyb290IC5kZWFkbGluZS1jYWxlbmRhcj5pbnB1dHtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3A7Ym94LXNpemluZzpib3JkZXItYm94fVxcclxcblxcclxcbi8qIDMg0YHRgtGA0L7QutCwICovLnRhc2stcm93LTN7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXhcXHJcXG4gICAgLypqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47Ki99LmFkZC1lbWFpbHtwb3NpdGlvbjpyZWxhdGl2ZX0uYWRkLWVtYWlsIGF7ZGlzcGxheTpub25lfS5lbWFpbC1zZW5kLWxpc3R7bWFyZ2luOi40ZW0gMCAuNWVtO3BhZGRpbmc6MDtsaXN0LXN0eWxlLXR5cGU6bm9uZX0uZW1haWwtc2VuZC1saXN0Pmxpe21hcmdpbjowO2xpbmUtaGVpZ2h0OjF9LmVtYWlsLXNlbmQtbGlzdD5saTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEI3XFxcIjtmb250LXNpemU6MS41ZW07bWFyZ2luLXJpZ2h0Oi4yZW07ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfS50YXNrLXR5cGV7XFxyXFxuXFxyXFxuICAgIC8q0LIg0LTQuNCy0LDRhSDQv9GA0Y/Rh9GD0YLRjNGB0Y8g0YHQtdC70LXQutGC0Ysg0YEg0L/QvtC00YLQuNC/0LDQvNC4Ki99LnRhc2stdHlwZSBzZWxlY3R7bWluLXdpZHRoOjE5MHB4fVxcclxcblxcclxcbi8qIDQg0YHRgtGA0L7QutCwICovLmFkZC1maWxlc3tcXHJcXG5cXHJcXG4gICAgLyrQv9C+INC60LvQuNC60YMg0L3QsCDRjdGC0YMg0YHRgdGL0LvQutGDINGB0L7Qt9C00LDQstCw0LvRgdGPINC90L7QstGL0LkgZmlsZSBpbnB1dFxcclxcbiAgICDRgdC60YDQvtGOINC10LUsINCwINGB0L7QsdGL0YLQuNC1INC/0L7QstC10YjRgyDQvdCwIGNoYW5nZSDRgdCw0LzQvtCz0L4g0LjQvdC/0YPRgtCwKi99LmFkZC1maWxlcyBhe2Rpc3BsYXk6bm9uZVxcclxcbiAgICAgICAgLyptYXJnaW4tdG9wOiAuOGVtO1xcclxcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyovfSNGaWxlSW5wdXRzIGlucHV0Om5vdCg6Zmlyc3QtY2hpbGQpe21hcmdpbi10b3A6LjNlbTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmJ0bi1yZW1vdmUtaXRlbXt3aWR0aDoxMnB4O2hlaWdodDoxOHB4O21hcmdpbi1sZWZ0Oi4zZW07Y29sb3I6cmVkO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcn0uYnRuLXJlbW92ZS1pdGVtOmFmdGVye2NvbnRlbnQ6XFxcIlxcXFwxRjdBOVxcXCI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowfS5mYWtlLWZpbGUtaW5wdXR7d2lkdGg6MjI1cHg7aGVpZ2h0OjYwcHg7Ym9yZGVyOjFweCBkYXNoZWQgIzgyYTVjMztiYWNrZ3JvdW5kOiNmNGY2Zjg7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXJhZGl1czouNWVtO3Bvc2l0aW9uOnJlbGF0aXZlfS5mYWtlLWZpbGUtaW5wdXQuaXMtaG92ZXJ7YmFja2dyb3VuZDojZDJkY2U1fS5maWxlcy1saXN0e21hcmdpbjotLjVlbSAwIC41ZW07cGFkZGluZzowO2xpc3Qtc3R5bGUtdHlwZTpub25lO3RyYW5zaXRpb246aGVpZ2h0IC4zc30uZmlsZXMtbGlzdCAuZmlsZS1saXN0LWl0ZW17bWFyZ2luOi40ZW0gMH0uZmlsZXMtbGlzdCAuZmlsZS1saXN0LWl0ZW0gLnMtaW5mb3twYWRkaW5nLWxlZnQ6LjZlbTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9XFxyXFxuXFxyXFxuLyrRgdC60YDRi9Cy0LDRjiDQv9GD0YHRgtGL0LUg0Y/Rh9C10LnQutC4LCDQv9C+0LvRjyDQuNC3INC90LjRhSDQv9C10YDQtdC80LXRidC10L3RiyDQsiDQvdC+0LLRi9C5INCx0LvQvtC6ICNuZXctY29tbWVudC13cmFwKi8jdGFzay1mb290ZXIgdGJvZHksI3Rhc2stZm9vdGVyIHRkLCN0YXNrLWZvb3RlciB0cntkaXNwbGF5OmJsb2NrfVxcclxcblxcclxcbi8q0LrQvdC+0L/QutCwINGB0L7RhdGA0LDQvdC40YLRjCovLmJ0bi1hY3Rpb257aGVpZ2h0OjM2cHg7cGFkZGluZzowIDEuNmVtO2ZvbnQtc2l6ZToxNHB4O2NvbG9yOiNmZmY7Ym9yZGVyOjA7Ym9yZGVyLXJhZGl1czo0cHg7YmFja2dyb3VuZDojN2ViNTE5O2N1cnNvcjpwb2ludGVyfVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/e1wiaW1wb3J0TG9hZGVyc1wiOjF9IS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYiEuL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgZWxlbXNNb2RpZmljYXRpb24nKTtcclxufVxyXG5cclxuaW1wb3J0IHttb2RpZnlTZWxlY3RPcHRpb25zTGlzdCxmaW5kSW5BcnJheX0gZnJvbSAnLi9fdXRpbHMuanMnO1xyXG5pbXBvcnQge2dldEFsbENvbW1lbnRzUm93cyxnZXRBbGxXb3JrZXJzfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbi8v0LjQt9C80LXQvdC10L3QuNC1INGN0LvQtdC80LXQvdGC0L7QsiDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0LfQsNC00LDRh9C4XHJcbi8v0LIg0YHQvtC+0YLQstC10YLRgdCy0LjQuCDRgSDQvdCw0YHRgtGA0L7QudC60LDQvNC4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG5mdW5jdGlvbiBlbGVtc01vZGlmaWNhdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgZGFydF93b3JrZXJzX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50ZXJuYWxfd29ya2VyJyk7XHJcblxyXG4gICAgLy/RgdGA0LDQstC90LjQstCw0LXQvCDRgdC/0LjRgdC+0Log0L/RgNC+0LXQutGC0L7QsiDRgSDRgdC+0YXRgNCw0L3QtdC90L3Ri9C8INCyINC90LDRgdGC0YDQvtC50LrQsNGFXHJcbiAgICAvL9C/0YDQvtC10LrRgtGLINC60L7RgtC+0YDRi9GFINC90LXRgiDQsiDQvdCw0YHRgtGA0L7QudC60LAg0YHQutGA0YvQstCw0LXQvFxyXG4gICAgdGhpcy5tb2RpZnlQcm9qZWN0TGlzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgcGFyYW1zX3VzZXJfcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYXJhbXNfdXNlcl9wcm9qZWN0cycpKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtc191c2VyX3Byb2plY3RzID09PSBudWxsIHx8ICFwYXJhbXNfdXNlcl9wcm9qZWN0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygn0J3QtdGCINGB0L7QsdGB0YLQstC10L3QvdC+0LPQviDRgdC/0LjRgdC60LAg0L/RgNC+0LXQutGC0L7QsicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXJ0X3Byb2plY3RzX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdF9pZCcpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGllbnRfaWQnKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IGRhcnRfcHJvamVjdHNfbGlzdC5vcHRpb25zO1xyXG5cclxuICAgICAgICBtb2RpZnlTZWxlY3RPcHRpb25zTGlzdChvcHRpb25zLCBwYXJhbXNfdXNlcl9wcm9qZWN0cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v0YHRgNCw0LLQvdC40LLQsNC10Lwg0YHQv9C40YHQvtC6INC40YHQv9C+0LvQvdC40YLQtdC70LXQuSDRgSDRgdC+0YXRgNCw0L3QtdC90L3Ri9C8INCyINC90LDRgdGC0YDQvtC50LrQsNGFXHJcbiAgICAvL9C40YHQv9C+0LvQvdC40YLQtdC70LXQuSDQutC+0YLQvtGA0YvRhSDQvdC10YIg0LIg0L3QsNGB0YLRgNC+0LnQutCwINGB0LrRgNGL0LLQsNC10LxcclxuICAgIHRoaXMubW9kaWZ5V29ya2Vyc0xpc3QgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXNfdXNlcl93b3JrZXJzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFyYW1zX3VzZXJfd29ya2VycycpKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtc191c2VyX3dvcmtlcnMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygn0J3QtdGCINGB0L7QsdGB0YLQstC10L3QvdC+0LPQviDRgdC/0LjRgdC60LAg0YHQvtGC0YDRg9C00L3QuNC60L7QsicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBhcmFtc191c2VyX3dvcmtlcnMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbGV0IGRhcnRfd29ya2Vyc19saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludGVybmFsX3dvcmtlcicpO1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyA9IGRhcnRfd29ya2Vyc19saXN0Lm9wdGlvbnM7IC8v0YHQv9C40YHQvtC6INCy0YHQtdGFINGB0L7RgtGA0YPQtNC90LjQutC+0LIg0LjQtyDRgdC10LvQtdC60YLQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHJcbiAgICAgICAgLy/QtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60LjQuSDRgdC/0LjRgdC+0Log0YHQvtGC0YDRg9C00L3QuNC60L7QsiDQvdC1INC/0YPRgdGCXHJcbiAgICAgICAgLy/QuCDQtdGB0LvQuCDQsiDQt9Cw0LTQsNGH0LUg0YPRh9Cw0YHRgtCy0YPQtdGCINGB0L7RgtGA0YPQtNC90LjQuiDQutC+0YLQvtGA0L7Qs9C+INC90LXRgiDQsiDRgdC/0LjRgdC60LUg0L7RgdGC0LDQstC70Y/RjiDQtdCz0L4g0L7RgtC60YDRi9GC0YvQvFxyXG4gICAgICAgIGlmIChwYXJhbXNfdXNlcl93b3JrZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvL9C/0L7Qu9GD0YfQsNGOINGB0L/QuNGB0L7QuiDQstGB0LXRhSDRg9GH0LDRgdGC0L3QuNC60L7QsiDQt9Cw0LTQsNGH0LhcclxuICAgICAgICAgICAgbGV0IHRhc2tfd29ya2VycyA9IGdldEFsbFdvcmtlcnMoKTtcclxuICAgICAgICAgICAgbGV0IHRhc2tfd29ya2Vyc19pZCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy/RgdGA0LDQstC90LXQvdC40LUg0YHQv9C40YHQutC+0LIsINC10YHQu9C4INGA0LDQsdC+0YLQvdC40LrQsCDQvdC10YIg0LIg0YHQv9C40YHQutC1INC40Lcg0L3QsNGB0YLRgNC+0LXQuiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8gLSDQtNC+0LHQsNCy0LvRj9GOXHJcbiAgICAgICAgICAgIC8v0YHQvdCw0YfQsNC70LAg0L3Rg9C20L3QviDQv9C+0LvRg9GH0LjRgtGMINGB0L7QvtGC0LLQtdGC0YHQstC40LUg0LjQvNGPINGB0L7RgtGA0YPQtNC90LjQutCwIC0+IG9wdGlvbi52YWx1ZSDRgi7QtS4g0LvQvtCz0LjQvSDRgdC+0YLRgNGD0LTQvdC40LrQsCDQvdCwINCw0L3Qs9C70LjRhtC60L7QvFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZl9maW5kID0gZmluZEluQXJyYXkodGFza193b3JrZXJzLCBvcHRpb25zW2ldLnRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpZl9maW5kID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXNrX3dvcmtlcnNfaWQucHVzaChvcHRpb25zW2ldLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL9C30LDRgtC10Lwg0YHRgNCw0LLQvdC40YLRjCDRgdC+INGB0L/QuNGB0LrQvtC8INC40Lcg0L3QsNGB0YLRgNC+0LXQulxyXG4gICAgICAgICAgICAvL9C4INC00L7QsdCw0LLQuNGC0Ywg0YDQsNCx0L7RgtC90LjQutCwINC10YHQu9C4INC10LPQviDQvdC10YIg0LIg0YHQv9C40YHQutC1XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza193b3JrZXJzX2lkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWZfZmluZCA9IGZpbmRJbkFycmF5KHBhcmFtc191c2VyX3dvcmtlcnMsIHRhc2tfd29ya2Vyc19pZFtpXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlmX2ZpbmQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zX3VzZXJfd29ya2Vycy5wdXNoKHRhc2tfd29ya2Vyc19pZFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ9CSINGB0L/QuNGB0L7QuiDQtNC+0LHQsNCy0LvQtdC9ICcrIHRhc2tfd29ya2Vyc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1vZGlmeVNlbGVjdE9wdGlvbnNMaXN0KG9wdGlvbnMsIHBhcmFtc191c2VyX3dvcmtlcnMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy/QsiDRgdC/0LjRgdC60LUg0LjRgdC/0L7Qu9C90LjRgtC10LvQtdC5INC+0YLQvNC10YfQsNGOIHNlbGVjdGVkINGA0LDQsdC+0YLQvdC40LrQsCDQvtGB0YLQsNCy0LjQstGI0LXQs9C+INC/0L7RgdC70LXQtNC90LjQuSDQutC+0LzQvNC10L3RgtGA0LjQuSDQsiDQt9Cw0LTQsNGH0LVcclxuICAgIHRoaXMuc2V0U2VsZWN0ZWRJbldvcmtlcnNMaXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBsYXN0X3JvdyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG4gICAgICAgIGxhc3Rfcm93ID0gbGFzdF9yb3dbbGFzdF9yb3cubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgbGV0IGxhc3Rfd29ya2VyID0gbGFzdF9yb3cuY2hpbGRyZW5bNF0udGV4dENvbnRlbnQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGFydF93b3JrZXJzX2xpc3Qub3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobGFzdF93b3JrZXIgPT09IGRhcnRfd29ya2Vyc19saXN0Lm9wdGlvbnNbaV0udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgZGFydF93b3JrZXJzX2xpc3Qub3B0aW9uc1tpXS5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgLy9maXJlRXZlbnQg0L3Rg9C20LXQvSDRh9GC0L7QsdGLINCy0YvQt9Cy0LDRgtGMINC/0L7QstC10YjQtdC90L3Rg9GOINC90LAg0YHQvtCx0YvRgtC40LUg0YTRg9C90LrRhtC40Y5cclxuICAgICAgICAgICAgICAgIC8v0LIg0LrQvtGC0L7RgNC+0Lkg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDRgNCw0LHQvtGC0L3QuNC6INCyINGB0L/QuNGB0L7QuiDQtNC70Y8g0YDQsNGB0YHRi9C70LrQuCDRgSDQt9Cw0LTQsNGH0LhcclxuICAgICAgICAgICAgICAgIGxldCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xyXG4gICAgICAgICAgICAgICAgZXZ0LmluaXRFdmVudCgnY2hhbmdlJywgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZGFydF93b3JrZXJzX2xpc3QuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRlcm5hbF93b3JrZXInKSkge1xyXG4gICAgICAgIHRoaXMubW9kaWZ5V29ya2Vyc0xpc3QoKTtcclxuICAgICAgICB0aGlzLnNldFNlbGVjdGVkSW5Xb3JrZXJzTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdF9pZCcpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGllbnRfaWQnKSkge1xyXG4gICAgICAgIHRoaXMubW9kaWZ5UHJvamVjdExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQv9C+0LvQtSDQstCy0L7QtNCwIGlkINC30LDQtNCw0YfQuCDQuCDQv9C10YDQtdGF0L7QtCDQuiDQt9Cw0LTQsNGH0LVcclxuXHJcbiAgICBsZXQgZ29Ub0ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvVG8nKTtcclxuICAgIGdvVG9GaWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbn1cclxuXHJcbmV4cG9ydCB7ZWxlbXNNb2RpZmljYXRpb259O1xyXG5cclxuXHJcbmlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIGVsZW1zTW9kaWZpY2F0aW9uJyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9lbGVtc01vZGlmaWNhdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgc2F2ZU5ld0NvbW1lbnQnKTtcclxufVxyXG5cclxuaW1wb3J0IHsgZ2V0VGFza0lkIH0gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcblxyXG4vL9Ch0L7RhdGA0LDQvdC10L3QuNC1INC60L7QvNC80LXQvdGC0LDRgNC40Y8g0LIgbG9jYWxTdG9yYWdlXHJcbi8v0L3QsCDRgdC70YPRh9Cw0Lkg0LLQvdC10LfQsNC/0L3QvtCz0L4g0LfQstC10YDRiNC10L3QuNGPINGB0LXRgdGB0LjQuFxyXG5mdW5jdGlvbiBzYXZlTmV3Q29tbWVudCgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgJGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQnKTtcclxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhcmVhLXdyYXAnKTtcclxuXHJcbiAgICBsZXQgdGFza19pZCA9IGdldFRhc2tJZCgpO1xyXG5cclxuICAgIC8v0LTQvtCx0LDQstC70Y4g0LrQvdC+0L/QutGDINC00LvRjyDQstGB0YLQsNCy0LrQuCDRgdC+0YXRgNCw0L3QtdC90L3QvtCz0L4g0YLQtdC60YHRgtCwXHJcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQlVUVE9OJyk7XHJcbiAgICBidG4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1pbnNlcnQtbHMnKTtcclxuICAgIGJ0bi5pZCA9J2J0bi1pbnNlcnQtbHMnO1xyXG4gICAgYnRuLmlubmVySFRNTCA9ICfQktGB0YLQsNCy0LjRgtGMINC40LcgTFMnO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ25vbmUnKTsgLy/Qv9C+INGD0LzQvtC70YfQsNC90LjRjiDRgdC60YDRi9GC0LBcclxuXHJcbiAgICB3cmFwLmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgLy/QtdGB0LvQuCDQtdGB0YLRjCDRgdC+0YXRgNCw0L3QtdC90L3Ri9C5INGC0LXQutGB0YIgLSDQv9C+0LrQsNC30LDRgtGMINC60L3QvtC/0LrRg1xyXG4gICAgc2hvd1Bhc3RlQnRuKGJ0biwgdGFza19pZCk7XHJcblxyXG4gICAgLy/QstGB0YLQsNCy0LjRgtGMINGC0LXQutGB0YIg0L/QviDQutC70LjQutGDXHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICRmaWVsZC52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrJyArIHRhc2tfaWQpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8v0KHQvtGF0YDQsNC90LjRgtGMINGC0LXQutGB0YIg0LjQtyDQv9C+0LvRjyDQv9GA0Lgg0L3QsNCx0L7RgNC1INC40LvQuCDQv9C+0YLQtdGA0LUg0YTQvtC60YPRgdCwXHJcbiAgICAkZmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzYXZlVGFza0NvbW1lbnQpO1xyXG5cclxuICAgIC8v0LXRgdC70Lgg0LXRgdGC0Ywg0YHQvtGF0YDQsNC90LXQvdC90YvQuSDRgtC10LrRgdGCIC0g0L/QvtC60LDQt9Cw0YLRjCDQutC90L7Qv9C60YNcclxuICAgICRmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNob3dQYXN0ZUJ0bihidG4sIHRhc2tfaWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzYXZlVGFza0NvbW1lbnQoKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2snICsgdGFza19pZCwgdGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd1Bhc3RlQnRuKGJ1dHRvbiwgaWQpIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2snICsgaWQpICE9PSAnJyAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFzaycgKyBpZCkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7c2F2ZU5ld0NvbW1lbnR9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgc2F2ZU5ld0NvbW1lbnQnKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3NhdmVOZXdDb21tZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCBjb3B5UGFzdGVDb21tZW50UXVvdGUnKTtcclxufVxyXG5cclxuaW1wb3J0IHtydW5PbktleXN9IGZyb20gJy4vX3V0aWxzLmpzJztcclxuaW1wb3J0IHtnZXRBbGxDYW1tZW50c30gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcblxyXG4vL9Cy0YvQtNC10LvQtdC90LjQtSDRgtC10LrRgdGC0LAg0LIg0LrQsNC80LXQvdGC0LUg0Lgg0LLRgdGC0LDQstC60LAg0L7RhNC+0YDQvNC70LXQvdC90LDRjyDQutCw0Log0YbQuNGC0LDRgtCwINC00LvRjyBtYXJrZG93blxyXG5mdW5jdGlvbiBjb3B5UGFzdGVDb21tZW50UXVvdGUgKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBjYW1tZW50cyA9IEFycmF5LmZyb20oZ2V0QWxsQ2FtbWVudHMoKSk7XHJcblxyXG4gICAgY2FtbWVudHMubWFwKGZ1bmN0aW9uIChjYW1tZW50KSB7XHJcbiAgICAgICAgY2FtbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NlbGVjdGlvbicsc2VsZWN0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBlZGl0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZvcm1hdEFuZEluc2V0Q29tbWVudFF1b3RlKGVsZW0pIHtcclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0aW9uJykpe1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRQb3MgPSBlbGVtLnNlbGVjdGlvblN0YXJ0O1xyXG4gICAgICAgICAgICBsZXQgZW5kUG9zID0gZWxlbS5zZWxlY3Rpb25FbmQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NlbGVjdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0cmluZ3MgPSBzZWxlY3Rpb24uc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICAgICAgc3RyaW5ncyA9IHN0cmluZ3MubWFwKGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAgICAgICAgICByZXR1cm4gJz4gJytzdHI7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gc3RyaW5ncy5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNlbGVjdGlvbiA9ICdcXG4nK3NlbGVjdGlvbisnXFxuJztcclxuXHJcbiAgICAgICAgICAgIGVsZW0udmFsdWUgPSBlbGVtLnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcylcclxuICAgICAgICAgICAgICAgICsgc2VsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICArIGVsZW0udmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgZWxlbS52YWx1ZS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3NlbGVjdGlvbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBydW5PbktleXMoXHJcbiAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVkaXRvcil7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRBbmRJbnNldENvbW1lbnRRdW90ZShlZGl0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZGl0b3JcclxuICAgICAgICAsXHJcbiAgICAgICAgXCIxNlwiLFxyXG4gICAgICAgIFwiMTdcIixcclxuICAgICAgICBcIlZcIi5jaGFyQ29kZUF0KDApXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQge2NvcHlQYXN0ZUNvbW1lbnRRdW90ZX07XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBjb3B5UGFzdGVDb21tZW50UXVvdGUnKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvcHlQYXN0ZUNvbW1lbnRRdW90ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgdXBkYXRlTm90aWZ5Jyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0VGFza0lkfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuaW1wb3J0IHtkZWNsT2ZOdW0sbG9hZEJ5QWpheH0gZnJvbSAnLi9fdXRpbHMuanMnO1xyXG5cclxuZnVuY3Rpb24gdGFza1VwZGF0ZU5vdGlmeSAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IHBhZ2VVcmwgPSB3aW5kb3cubG9jYXRpb247XHJcbiAgICBsZXQgdGFza0lkID0gZ2V0VGFza0lkKCk7XHJcblxyXG4gICAgLy/QtNC+0LHQsNCy0LvQtdC90LjQtSDQutC90L7Qv9C60Lgg0L/QvtC00L/QuNGB0LrQuCDQvdCwINGD0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutCw0LzQtdC90YLQsNGFINCyINC30LDQtNCw0YfQtVxyXG4gICAgbGV0IGFsZXJ0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBhbGVydEJ0bi5pZCA9ICd1cGQtYWxlcnQnO1xyXG4gICAgYWxlcnRCdG4uY2xhc3NMaXN0LmFkZCgnYWRkLWFsZXJ0Jyk7XHJcbiAgICBhbGVydEJ0bi50aXRsZSA9ICfQn9C+0LTQv9C40YHQsNGC0YzRgdGPINC90LAg0YPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y/RhSc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10aXRsZScpLmluc2VydEJlZm9yZShhbGVydEJ0biwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YnNjcmliZUVsZW1lbnQnKSk7XHJcblxyXG4gICAgYWxlcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgY2hlY2tDb21tZW50c1VwZGF0ZSh0aGlzLHRhc2tJZCxlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNoZWNrQ29tbWVudHNVcGRhdGUoYWxlcnRCdG4sdGFza0lkKTtcclxuXHJcbiAgICAvL9C30LDQv9GD0YHQuiDQuNC90YLQtdGA0LLQsNC70LAg0L/RgNC+0LLQtdGA0LrQuCDQuNC30LzQtdC90LXQvdC40Lkg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblxyXG4gICAgbGV0IG5vdGlmeUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxvYWRCeUFqYXgocGFnZVVybCxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrVXBkYXRlKGRhdGEsdGFza0lkKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0sIDEwMDAgKiA2MCAqIDUpO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1VwZGF0ZShhamF4cmVzcG9uc2UsaWQpIHtcclxuICAgICAgICBsZXQgY29tbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtdGJsJykucXVlcnlTZWxlY3RvckFsbCgnLmItY29tbWVudCcpO1xyXG4gICAgICAgIGxldCBjb21tZW50c051bSA9IGNvbW1lbnRzLmxlbmd0aDtcclxuXHJcblxyXG4gICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XHJcbiAgICAgICAgbGV0IGh0bWxEb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGFqYXhyZXNwb25zZS50cmltKCksXCJ0ZXh0L2h0bWxcIik7XHJcbiAgICAgICAgbGV0IHRibCA9IGh0bWxEb2MuYm9keS5xdWVyeVNlbGVjdG9yKCdmb3JtW25hbWU9dGhlRm9ybV0nKS5maXJzdEVsZW1lbnRDaGlsZDtcclxuXHJcblxyXG4gICAgICAgIGxldCB1cGxvYWRlZENvbW1lbnRzID0gdGJsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyJyk7XHJcblxyXG4gICAgICAgIGxldCBmaWx0ZXJlZENvbW1lbnRzID0gQXJyYXkuZnJvbSh1cGxvYWRlZENvbW1lbnRzKS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucXVlcnlTZWxlY3RvckFsbCgndGQnKS5sZW5ndGggPiAxO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAtIDEg0YIu0LouINC90YPQttC90L4g0YPQsdGA0LDRgtGMINC/0LXRgNCy0YPRjiDRgdGC0YDQvtC60YMg0YEg0L3QsNC30LLQsNC90LjRj9C80Lgg0YHRgtC+0LvQsdGG0L7QslxyXG4gICAgICAgIGxldCB1cGRDb21tZW50TnVtID0gZmlsdGVyZWRDb21tZW50cy5sZW5ndGggLSAxO1xyXG5cclxuXHJcbiAgICAgICAgaWYodXBkQ29tbWVudE51bSA+IGNvbW1lbnRzTnVtKXtcclxuICAgICAgICAgICAgbGV0IG5Db21tZW50cyA9IHVwZENvbW1lbnROdW0gLSBjb21tZW50c051bTtcclxuICAgICAgICAgICAgbGV0IGxhc3RJZCA9IGNvbW1lbnRzW2NvbW1lbnRzTnVtIC0gMV0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1jaGVja2JveF0nKS5pZC5zcGxpdCgnXycpWzFdO1xyXG5cclxuICAgICAgICAgICAgY3JlYXRlT25QYWdlTm90aWZ5KG5Db21tZW50cyxsYXN0SWQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoZWNrVXBhZGF0ZU9wdGlvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb21tZW50cy11cGRhdGUnK2lkKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGNoZWNrVXBhZGF0ZU9wdGlvbiAmJiBjaGVja1VwYWRhdGVPcHRpb24gPT09ICd0cnVlJyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm90aWZ5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICfQndC+0LLRi9C5INC60L7QvNC80LXQvdGC0LDRgNC40LknLFxyXG4gICAgICAgICAgICAgICAgICAgICd0YWcnOiAnbmV3LWNvbW1lbnQtJytpZCxcclxuICAgICAgICAgICAgICAgICAgICAnYm9keSc6IGh0bWxEb2MucXVlcnlTZWxlY3RvcignaDEgPiBmb250JykudGV4dENvbnRlbnQudHJpbSgpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIG5vdGlmeU1lKG5vdGlmeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g0L7Rh9C40YHRgtC60LAg0LjQvdGC0LXRgNCy0LDQu9CwIC0g0L7RgtC60LvRjtGH0LXQvdC40LUg0YPQstC10LTQvtC80LvQtdC90LjQuSDQv9C+INC60LvQuNC60YMg0L3QsCDRg9Cy0LXQtNC+0LzQu9C10L3QuNC4XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgbm90aWZpY2F0aW9uID0gbm90aWZ5TWUobm90aWZ5KTtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyBpZihub3RpZmljYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIG5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2xlYXJJbnRlcnZhbChub3RpZnlJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBub3RpZnlNZShub3RpZnkpIHtcclxuICAgICAgICBsZXQgbm90aWZpY2F0aW9uO1xyXG5cclxuICAgICAgICBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT09IFwiZ3JhbnRlZFwiKSB7XHJcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24obm90aWZ5LnRpdGxlLCB7dGFnOiBub3RpZnkudGFnLCBib2R5OiBub3RpZnkuYm9keX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiAhPT0gJ2RlbmllZCcpIHtcclxuICAgICAgICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKGZ1bmN0aW9uIChwZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGVybWlzc2lvbiA9PT0gXCJncmFudGVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKG5vdGlmeS50aXRsZSwge3RhZzogbm90aWZ5LnRhZywgYm9keTogbm90aWZ5LmJvZHl9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9uUGFnZU5vdGlmeShudW0sbGlua0lkKSB7XHJcbiAgICAgICAgbGV0IG5vdGlmeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlLW5vdGlmeScpO1xyXG5cclxuICAgICAgICBpZighbm90aWZ5KXtcclxuICAgICAgICAgICAgbm90aWZ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtdGVtcGxhdGUnKS5jbG9uZU5vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICBub3RpZnkuaWQgPSAncGFnZS1ub3RpZnknO1xyXG4gICAgICAgICAgICBub3RpZnkuY2xhc3NMaXN0LmFkZCgnYi1jb21tZW50X25vdGlmeScpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtdGJsJykuYXBwZW5kQ2hpbGQobm90aWZ5KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm90aWZ5LnRleHRDb250ZW50ID0gJ9CSINC30LDQtNCw0YfQtSAnK251bSsnICcrZGVjbE9mTnVtKG51bSwgWyfQvdC+0LLRi9C5INC60L7QvNC80LXQvdGC0LDRgNC40LknLCfQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y8nLCfQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40LXQsiddKTtcclxuXHJcbiAgICAgICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgbGluay5ocmVmID0gd2luZG93LmxvY2F0aW9uKycjJytsaW5rSWQ7XHJcbiAgICAgICAgbGluay50YXJnZXQgPSAnX3NlbGYnO1xyXG4gICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgncmVndWxhci1saW5rJywnY29tbWVudHMtdXBkYXRlLWxpbmsnKTtcclxuICAgICAgICBsaW5rLnRleHRDb250ZW50ID0gJ9Ce0LHQvdC+0LLQuNGC0Ywg0YHRgtGA0LDQvdC40YbRgyc7XHJcblxyXG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmhyZWY7XHJcbiAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbm90aWZ5LmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuICAgICAgICByZXR1cm4gbm90aWZ5O1xyXG4gICAgfVxyXG5cclxuICAgIC8v0LLQutC70Y7Rh9C40YLRjC/QvtGC0LrQu9GO0YfQuNGC0Ywg0YPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0YDQsNC40Y/RhVxyXG4gICAgLy/QvdCwINC+0YLQutGA0YvRgtC+0Lkg0YHRgtGA0LDQvdC40YbQtSDQt9Cw0LTQsNGH0LhcclxuICAgIGZ1bmN0aW9uIGNoZWNrQ29tbWVudHNVcGRhdGUoYnRuLGlkLGV2ZW50ID0gZmFsc2UpIHtcclxuICAgICAgICBpZihldmVudCl7XHJcbiAgICAgICAgICAgIGlmKGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpe1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScraWQsJ3RydWUnKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY29tbWVudHMtdXBkYXRlJytpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScraWQpID09PSAndHJ1ZScpe1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7dGFza1VwZGF0ZU5vdGlmeX07XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCB1cGRhdGVOb3RpZnknKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Rhc2tVcGRhdGVOb3RpZnkuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8v0L/RgNC+0LrRgNGD0YLQutCwINC6INC60LDQvNC10L3RgtGDINC/0L4g0Y/QutC+0YDRji4g0J3Rg9C20L3QsCDQtdGB0LvQuCDQstGL0LfQstCw0L0gY29tbWVudHNEZXNpZ24oKVxyXG5mdW5jdGlvbiBhbmNob3JMaW5rKCkge1xyXG4gICAgLy/QvtCx0YDQsNCx0L7RgtC60LAg0YHRgdGL0LvQvtC6INGBIGlkINC60LDQvNC10L3RgtCwINCyINGF0LXRiNC1XHJcbiAgICAvL9GCLtC6LiDQuNC3LdC30LAg0LjQt9C80LXQvdC10L3QuNGPINCy0YvRgdC+0YLRiyDQutCw0LzQtdC90YLQvtCyINC4INGB0L7QvtGC0LLQtdGC0YHQstC10L3QvdC+INGB0YLRgNCw0L3QuNGG0Ysg0LIgbW9kdWxlcy5jYW1tZW50c0Rlc2lnbigpXHJcbiAgICAvL9C+0L3QuCDRgNCw0LHQvtGC0LDRjtGCINC90LUg0L/RgNCw0LLQuNC70YzQvdC+XHJcblxyXG4gICAgbGV0IGNhbW1lbnRJZCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG5cclxuICAgIGNhbW1lbnRJZCA9IGNhbW1lbnRJZC5zbGljZSgxLCBjYW1tZW50SWQubGVuZ3RoKTtcclxuXHJcbiAgICAvL9C00L7QsdCw0LLQu9GP0Y4gc2V0VGltZW91dCDRgi7Qui4g0L/QvtC60LAg0L3QtSDQv9GA0LjQtNGD0LzQsNC7INC60LDQuiDQvtGC0LvQvtCy0LjRgtGMXHJcbiAgICAvL9GH0YLQviDQv9C10YDQtdC00LXQu9C60LAg0YHRgtGA0LDQvdC40YbRiyDQt9Cw0LrQvtC90YfQtdC90LAg0Lgg0LLRi9GB0L7RgtCwINC4INC/0L7Qt9C40YbQuNGPINC60LDQvNC10L3RgtCwXHJcbiAgICAvL9C6INC60L7RgtC+0YDQvtC80YMg0L3Rg9C20L3QviDQv9GA0L7QutGA0YPRgtC40YLRjCDQsdGD0LTQtdGCINGA0LDRgdGB0YfQuNGC0LDQvdCwINC/0YDQsNCy0LjQu9GM0L3QvlxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNhbW1lbnRJZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ2FuY2hvckxpbmsgc3RhcnQnKTtcclxuICAgICAgICAgICAgLy/QuNGJ0YMg0YHQutGA0YvRgtGL0Lkg0YfQtdC60LHQvtC60YEg0YEgaWQg0Lgg0L7RgiDQvdC10LPQviDQstCy0LXRgNGFINC00L4g0LrQsNGA0YLQvtGH0LrQuCDQutCw0LzQtdC90YLQsCBiLWNvbW1lbnRcclxuICAgICAgICAgICAgbGV0IGNhbW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hlY2tib3hfJyArIGNhbW1lbnRJZCkucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IGNhbW1lbnQub2Zmc2V0VG9wO1xyXG5cclxuICAgICAgICAgICAgYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcclxuICAgICAgICAgICAgICAgIHRpbWluZzogZnVuY3Rpb24gKHRpbWVGcmFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aW1lRnJhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZHJhdzogZnVuY3Rpb24gKHByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9ZKGRpc3RhbmNlLCBwcm9ncmVzcylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgNjAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYW5pbWF0ZShvcHRpb25zKSB7XHJcbiAgICBsZXQgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gYW5pbWF0ZSh0aW1lKSB7XHJcbiAgICAgICAgbGV0IHRpbWVGcmFjdGlvbiA9ICh0aW1lIC0gc3RhcnQpIC8gb3B0aW9ucy5kdXJhdGlvbjtcclxuICAgICAgICBpZiAodGltZUZyYWN0aW9uID4gMSkgdGltZUZyYWN0aW9uID0gMTtcclxuXHJcbiAgICAgICAgbGV0IHByb2dyZXNzID0gb3B0aW9ucy50aW1pbmcodGltZUZyYWN0aW9uKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucy5kcmF3KHByb2dyZXNzKTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVGcmFjdGlvbiA8IDEpIHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2Nyb2xsVG9ZKGRpc3RhbnNlLCBwcm9ncmVzcykge1xyXG4gICAgbGV0IHNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbFkgKyAoKGRpc3RhbnNlIC0gc2Nyb2xsWSkgKiBwcm9ncmVzcykpO1xyXG59XHJcblxyXG5leHBvcnQge2FuY2hvckxpbmt9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2FuY2hvckxpbmsuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIHVzZXJTZXR0aW5ncycpO1xyXG59XHJcblxyXG4vLyDQtNC+0LHQsNCy0LvQtdC90LjQtSDQvdCwINGB0YLRgNCw0L3QuNGG0YMg0L3QvtCy0L7QuSDQt9Cw0LTQsNGH0Lgg0LHQu9C+0LrQsCDQvdCw0YHRgtGA0L7QtdC6INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG5cclxuZnVuY3Rpb24gdXNlclNldHRpbmdzKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgLy/QtNC+0LHQsNCy0LvQtdC90LjQtS/Rg9C00LDQu9C10L3QuNC1INCy0YvQsdGA0LDQvdC90YvRhSDQv9GA0L7QtdC60YLQvtCyINCyINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjNGB0LrQvtC8INGB0L/QuNGB0LrQtVxyXG4gICAgLy/RgdC+0YXRgNCw0L3QtdC90LjQtSDQsiBsb2NhbFN0b3JhZ2Ug0Lgg0YHQutGA0YvRgtGMINC/0L7QutCw0LfQsNGC0Ywg0LIgc2VsZWN0INC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG4gICAgbGV0ICRjb250ZW50X2NlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtW25hbWU9XCJ0aGVGb3JtXCJdJyk7XHJcblxyXG4gICAgLy/RgdC+0LfQtNCw0L3QuNC1INCx0LvQvtC60LAg0LIg0LrQvtGC0L7RgNC+0Lwg0LHRg9C00YPRgiDQstGB0LUg0Y3Qu9C10LzQtdC90YLRiyDRg9C/0YDQsNCy0LvQtdC90LjRjyDQvdCw0YHRgtGA0L7QudC60LDQvNC4XHJcbiAgICBsZXQgJHVzZXJfc2V0dGluZ3NfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAkdXNlcl9zZXR0aW5nc19ib3guaWQgPSAnc2V0dGluZ3MtYm94JztcclxuICAgICRjb250ZW50X2NlbGwuaW5zZXJ0QmVmb3JlKCR1c2VyX3NldHRpbmdzX2JveCwgJGNvbnRlbnRfY2VsbC5maXJzdENoaWxkKTtcclxuXHJcbiAgICAvL9GB0L7Qt9C00LDQvdC40LUg0LrQvdC+0L/QutC4INC/0L7QutCw0LfQsNGC0Ywv0YHQutGA0YvRgtGMINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjNGB0LrQuNC1INC90LDRgdGC0YDQvtC50LrQuFxyXG4gICAgbGV0ICRzZXR0aW5nc19idG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICRzZXR0aW5nc19idG4uaW5uZXJIVE1MID0gJ9Cf0L7QutCw0LfQsNGC0Ywv0YHQutGA0YvRgtGMINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjNGB0LrQuNC1INC90LDRgdGC0YDQvtC50LrQuCc7XHJcbiAgICAkc2V0dGluZ3NfYnRuLmlkID0gJ3NldHRpbmdzLWJ0bic7XHJcbiAgICAkc2V0dGluZ3NfYnRuLnR5cGUgPSAnYnV0dG9uJztcclxuXHJcbiAgICAkc2V0dGluZ3NfYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICR1c2VyX3NldHRpbmdzX2JveC5jbGFzc0xpc3QudG9nZ2xlKCdpcy1vcGVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkY29udGVudF9jZWxsLmluc2VydEJlZm9yZSgkc2V0dGluZ3NfYnRuLCAkY29udGVudF9jZWxsLmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgIC8v0YHQvtC30LTQsNC90LjQtSDQutCw0YHRgtC+0LzQvdC+0LPQviDRgdC/0LjRgdC60LAg0L/RgNC+0LXQutGC0L7QslxyXG4gICAgLy9pZGBzIGFycmF5XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrTGlzdEhUTUwoKSB7XHJcbiAgICAgICAgaWYoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYXJhbXNfdXNlcl9wcm9qZWN0cycpKXtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BhcmFtc191c2VyX3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkoW10pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXNfdXNlcl9wcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BhcmFtc191c2VyX3Byb2plY3RzJykpO1xyXG5cclxuICAgICAgICBjb25zdCBQUk9KRUNUU19MSVNUX1BBUkFNUyA9IHtcclxuICAgICAgICAgICAgJ2lkJzogJ2N1c3RvbS1wcm9qZWN0LWxpc3QnLFxyXG4gICAgICAgICAgICAndGl0bGUnOiAn0KHQvtCx0YHRgtCy0LXQvdC90YvQuSDRgdC/0LjRgdC+0Log0L/RgNC+0LXQutGC0L7QsicsXHJcbiAgICAgICAgICAgICdzb3VyY2UnOiAncHJvamVjdF9pZCcsXHJcbiAgICAgICAgICAgICdzdG9yYWdlJzogcGFyYW1zX3VzZXJfcHJvamVjdHMsXHJcbiAgICAgICAgICAgICdzdG9yYWdlX25hbWUnOiAncGFyYW1zX3VzZXJfcHJvamVjdHMnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0ICRjdXN0b21fcHJvamVjdHNfbGlzdCA9IGNyZWF0ZUluc2VydFdvcmtlcnNQcm9qZWN0c0xpc3RzKFBST0pFQ1RTX0xJU1RfUEFSQU1TKTtcclxuXHJcbiAgICAgICAgJHVzZXJfc2V0dGluZ3NfYm94Lmluc2VydEJlZm9yZSgkY3VzdG9tX3Byb2plY3RzX2xpc3QsICR1c2VyX3NldHRpbmdzX2JveC5maXJzdENoaWxkKTtcclxuXHJcbiAgICAgICAgaGlnaGxpZ2h0U2VsZWN0ZWQoJGN1c3RvbV9wcm9qZWN0c19saXN0LCBwYXJhbXNfdXNlcl9wcm9qZWN0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/RgdC+0LfQtNCw0L3QuNC1INC60LDRgdGC0L7QvNC90L7Qs9C+INGB0L/QuNGB0LrQsCDQuNGB0L/QvtC70L3QuNGC0LXQu9C10LlcclxuICAgIC8vaWRgcyBhcnJheVxyXG4gICAgZnVuY3Rpb24gY3JlYXRlV29ya2Vyc0xpc3RIVE1MKCkge1xyXG4gICAgICAgIGlmKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFyYW1zX3VzZXJfd29ya2VycycpKXtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BhcmFtc191c2VyX3dvcmtlcnMnLCBKU09OLnN0cmluZ2lmeShbXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmFtc191c2VyX3dvcmtlcnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYXJhbXNfdXNlcl93b3JrZXJzJykpO1xyXG5cclxuICAgICAgICBjb25zdCBXT1JLRVJTX0xJU1RfUEFSQU1TID0ge1xyXG4gICAgICAgICAgICAnaWQnOiAnY3VzdG9tLXdvcmtlcnMtbGlzdCcsXHJcbiAgICAgICAgICAgICd0aXRsZSc6ICfQodC+0LHRgdGC0LLQtdC90L3Ri9C5INGB0L/QuNGB0L7QuiDQuNGB0L/QvtC70L3QuNGC0LXQu9C10LknLFxyXG4gICAgICAgICAgICAnc291cmNlJzogJ2ludGVybmFsX3dvcmtlcicsXHJcbiAgICAgICAgICAgICdzdG9yYWdlJzogcGFyYW1zX3VzZXJfd29ya2VycyxcclxuICAgICAgICAgICAgJ3N0b3JhZ2VfbmFtZSc6ICdwYXJhbXNfdXNlcl93b3JrZXJzJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCAkY3VzdG9tX3dvcmtlcnNfbGlzdCA9IGNyZWF0ZUluc2VydFdvcmtlcnNQcm9qZWN0c0xpc3RzKFdPUktFUlNfTElTVF9QQVJBTVMpO1xyXG5cclxuICAgICAgICAkdXNlcl9zZXR0aW5nc19ib3guaW5zZXJ0QmVmb3JlKCRjdXN0b21fd29ya2Vyc19saXN0LCAkdXNlcl9zZXR0aW5nc19ib3guZmlyc3RDaGlsZCk7XHJcblxyXG4gICAgICAgIGhpZ2hsaWdodFNlbGVjdGVkKCRjdXN0b21fd29ya2Vyc19saXN0LCBwYXJhbXNfdXNlcl93b3JrZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQv9C+0LTRgdCy0LXRgtC60LAg0YHQvtGF0YDQsNC90LXQvdC90YvRhSDQsiDQvdCw0YHRgtGA0L7QudC60LDRhSDRjdC70LXQvNC10L3RgtC+0LIg0YHQv9C40YHQutCwXHJcbiAgICBmdW5jdGlvbiBoaWdobGlnaHRTZWxlY3RlZChsaXN0LCBzZXR0aW5ncykge1xyXG4gICAgICAgIGlmICghc2V0dGluZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ25vJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBub2RlO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhsaXN0LmNoaWxkTm9kZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICBub2RlID0gbGlzdC5jaGlsZE5vZGVzW2tleV07XHJcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5pbmRleE9mKG5vZGUuZGF0YXNldC5pZCkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0LTQvtCx0LDQstC70LXQvdC40LUg0LrQvdC+0L/QvtC6INCy0LrQu9GO0YfQtdC90LjRjy/QvtGC0LrQu9GO0YfQtdC90LjRjyDRgNCw0LfQvdGL0YUg0LzQvtC00YPQu9C10LlcclxuICAgIGxldCBvcHRpb25zQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG9wdGlvbnNCbG9jay5jbGFzc0xpc3QuYWRkKCd1c2VyLWxpc3QnKTtcclxuXHJcbiAgICBsZXQgc2V0dGluZ3NfdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgc2V0dGluZ3NfdGl0bGUudGV4dENvbnRlbnQgPSAn0J7Qv9GG0LjQuCc7XHJcbiAgICBzZXR0aW5nc190aXRsZS5jbGFzc0xpc3QuYWRkKCd1c2VyLXRpdGxlJyk7XHJcblxyXG4gICAgb3B0aW9uc0Jsb2NrLmFwcGVuZENoaWxkKHNldHRpbmdzX3RpdGxlKTtcclxuXHJcbiAgICAvL9C00L7QsdCw0LLQu9C10L3QuNC1INC90LDRgdGC0YDQvtC50LrQuCAtINCy0LrQuy/QstGL0LrQuyDQs9C10L3QtdGA0LDRhtC40Lgg0LHQu9C+0LrQsCDRgSDQv9C+0LTRgdGH0LXRgtC+0Lwg0LLRgNC10LzQtdC90Lgg0YPRh9Cw0YHRgtC90LjQutC+0LIg0LfQsNC00LDRh9C4XHJcbiAgICBsZXQgY291bnRUaW1lQnRuID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIGNvdW50VGltZUJ0bi5pZCA9ICdjb3VudFRpbWVCdG4nO1xyXG4gICAgY291bnRUaW1lQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1mbGF0Jywncm93LWl0ZW0nKTtcclxuICAgIGNvdW50VGltZUJ0bi50ZXh0Q29udGVudCA9ICfQn9C+0LTRgdGH0LXRgiDQstGA0LXQvNC10L3QuCDQsiDQt9Cw0LTQsNGH0LUgLSDQktC60LvRjtGH0LXQvSc7XHJcblxyXG4gICAgaWYoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3b3JrZXItdGltZS1jb3VudCcpKXtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnd29ya2VyLXRpbWUtY291bnQnLCAndHJ1ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvdW50VGltZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcpO1xyXG5cclxuICAgICAgIGlmKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKXtcclxuICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gJ9Cf0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INCyINC30LDQtNCw0YfQtSAtINCS0LrQu9GO0YfQtdC9JztcclxuICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnd29ya2VyLXRpbWUtY291bnQnLCAndHJ1ZScpO1xyXG4gICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9ICfQn9C+0LTRgdGH0LXRgiDQstGA0LXQvNC10L3QuCDQsiDQt9Cw0LTQsNGH0LUgLSDQktGL0LrQu9GO0YfQtdC9JztcclxuICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnd29ya2VyLXRpbWUtY291bnQnLCdmYWxzZScpO1xyXG4gICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy/QstC60LvRjtGH0LjRgtGML9C+0YLQutC70Y7Rh9C40YLRjCDQs9C10L3QtdGA0LDRhtC40Y4g0LHQu9C+0LrQsCDRgSDQv9C+0LTRgdGH0LXRgtC+0LIg0LLRgNC10LzQtdC90Lgg0YPRh9Cw0YHRgtC90LjQutC+0LIg0LfQsNC00LDRh9C4XHJcbiAgICBmdW5jdGlvbiBjaGVja1RpbWVDb3VudE9wdGlvbigpIHtcclxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50VGltZUJ0bicpO1xyXG5cclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd29ya2VyLXRpbWUtY291bnQnKSA9PT0gJ3RydWUnKXtcclxuICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gJ9Cf0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INCyINC30LDQtNCw0YfQtSAtINCS0LrQu9GO0YfQtdC9JztcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9ICfQn9C+0LTRgdGH0LXRgiDQstGA0LXQvNC10L3QuCDQsiDQt9Cw0LTQsNGH0LUgLSDQktGL0LrQu9GO0YfQtdC9JztcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qLy/QtNC+0LHQsNCy0LvQtdC90LjQtSDQvdCw0YHRgtGA0L7QudC60LggLSDQstC60Lsv0LLRi9C60Lsg0YPQstC10LTQvtC80LvQtdC90LjQuSDQviDQvdC+0LLQvtC8INC60L7QvNC80LXQvdGC0LDRgNC40Lgg0LIg0LfQsNC00LDRh9C1XHJcbiAgICBsZXQgY29tbWVudHNVcGRhdGVCdG4gPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgY29tbWVudHNVcGRhdGVCdG4uaWQgPSAnY29tbWVudHNVcGRhdGVCdG4nO1xyXG4gICAgY29tbWVudHNVcGRhdGVCdG4uY2xhc3NMaXN0LmFkZCgnYnRuLWZsYXQnLCdyb3ctaXRlbScpO1xyXG4gICAgY29tbWVudHNVcGRhdGVCdG4udGV4dENvbnRlbnQgPSAn0KPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y/RhSAtINCS0LrQu9GO0YfQtdC90YsnO1xyXG5cclxuICAgIGNvbW1lbnRzVXBkYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSl7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAn0KPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y/RhSAtINCS0LrQu9GO0YfQtdC90YsnO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29tbWVudHMtdXBkYXRlJywgJ3RydWUnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9ICfQo9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLQsNGA0LjRj9GFIC0g0JLRi9C60LvRjtGH0LXQvdGLJztcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScsJ2ZhbHNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy/QstC60LvRjtGH0LjRgtGML9C+0YLQutC70Y7Rh9C40YLRjCDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLRgNCw0LjRj9GFXHJcbiAgICAvL9C90LAg0L7RgtC60YDRi9GC0L7QuSDRgdGC0YDQsNC90LjRhtC1INC30LDQtNCw0YfQuFxyXG4gICAgZnVuY3Rpb24gY2hlY2tDb21tZW50c1VwZGF0ZSgpIHtcclxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzVXBkYXRlQnRuJyk7XHJcblxyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb21tZW50cy11cGRhdGUnKSA9PT0gJ3RydWUnKXtcclxuICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gJ9Cj0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGP0YUgLSDQktC60LvRjtGH0LXQvdGLJztcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9ICfQo9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLQsNGA0LjRj9GFIC0g0JLRi9C60LvRjtGH0LXQvdGLJztcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSovXHJcblxyXG4gICAgb3B0aW9uc0Jsb2NrLmFwcGVuZENoaWxkKGNvdW50VGltZUJ0bik7XHJcbiAgICAvL29wdGlvbnNCbG9jay5hcHBlbmRDaGlsZChjb21tZW50c1VwZGF0ZUJ0bik7XHJcblxyXG4gICAgJHVzZXJfc2V0dGluZ3NfYm94LmFwcGVuZENoaWxkKG9wdGlvbnNCbG9jayk7XHJcblxyXG4gICAgLy/Qt9Cw0L/Rg9GB0Log0L/RgNC+0LLQtdGA0L7QuiDQstC60LvRjtGH0LXQvdC90YvRhS/QvtGC0LrQu9GO0YfQtdC90L3Ri9GFINC+0L/RhtC40LlcclxuICAgIGNoZWNrVGltZUNvdW50T3B0aW9uKCk7XHJcbiAgICAvL2NoZWNrQ29tbWVudHNVcGRhdGUoKTtcclxuXHJcblxyXG4gICAgY3JlYXRlVGFza0xpc3RIVE1MKCk7XHJcbiAgICBjcmVhdGVXb3JrZXJzTGlzdEhUTUwoKTtcclxufVxyXG5cclxuLy/RgdC+0LfQtNCw0L3QuNC1INC4INC00L7QsdCw0LLQu9C10L3QuNC1INGB0L/QuNGB0LrQsCDRgNCw0LHQvtGC0L3QuNC60L7QsiDQuCDQv9GA0L7QtdC60YLQvtCyXHJcbmZ1bmN0aW9uIGNyZWF0ZUluc2VydFdvcmtlcnNQcm9qZWN0c0xpc3RzKHBhcmFtcykge1xyXG4gICAgbGV0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgbGlzdC5pZCA9IHBhcmFtcy5pZDtcclxuICAgIGxpc3QuY2xhc3NMaXN0LmFkZCgndXNlci1saXN0JywgJ2NsZWFyZml4Jyk7XHJcblxyXG4gICAgbGV0IGxpc3RfdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgbGlzdF90aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMudGl0bGU7XHJcbiAgICBsaXN0X3RpdGxlLmNsYXNzTGlzdC5hZGQoJ3VzZXItdGl0bGUnKTtcclxuXHJcbiAgICBsaXN0LmFwcGVuZENoaWxkKGxpc3RfdGl0bGUpO1xyXG5cclxuICAgIGxldCBzb3VyY2VfbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtcy5zb3VyY2UpO1xyXG4gICAgbGV0IHNvdXJjZV9saXN0X2l0ZW1zID0gc291cmNlX2xpc3Qub3B0aW9ucztcclxuXHJcbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBsZXQgbGlzdF9pdGVtX3Byb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIGxldCBsaXN0X2l0ZW07XHJcblxyXG4gICAgT2JqZWN0LmtleXMoc291cmNlX2xpc3RfaXRlbXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGlmIChzb3VyY2VfbGlzdF9pdGVtc1trZXldLnZhbHVlIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaXN0X2l0ZW0gPSBsaXN0X2l0ZW1fcHJvdG8uY2xvbmVOb2RlKGZhbHNlKTtcclxuICAgICAgICBsaXN0X2l0ZW0uaW5uZXJIVE1MID0gc291cmNlX2xpc3RfaXRlbXNba2V5XS50ZXh0O1xyXG4gICAgICAgIGxpc3RfaXRlbS5kYXRhc2V0LmlkID0gc291cmNlX2xpc3RfaXRlbXNba2V5XS52YWx1ZTtcclxuICAgICAgICBsaXN0X2l0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNhdmVVc2VyU2V0dGluZ3MocGFyYW1zLnN0b3JhZ2UsIHRoaXMsIHBhcmFtcy5zdG9yYWdlX25hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChsaXN0X2l0ZW0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGlzdC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcblxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbi8v0YHQvtGF0YDQsNC90LXQvdC40LUg0L/QvtC70YzQt9C+0LLQsNC10YLQu9GM0YHQutC40YUg0L3QsNGB0YLRgNC+0LXQulxyXG4vL9C4INCy0YvQtNC10LvQtdC90LjQtSDRgdC+0YXRgNCw0L3QtdC90L3QvtCz0L4g0LIg0YHQv9C40YHQutCw0YUg0YDQsNCx0L7RgtC90LjQutC+0LIg0Lgg0L/RgNC+0LXQutGC0L7QslxyXG5mdW5jdGlvbiBzYXZlVXNlclNldHRpbmdzKG9wdGlvbnMsIGxpc3RfaXRlbSwgc3RvcmFnZV9pdGVtKSB7XHJcbiAgICBsZXQgaWQgPSBsaXN0X2l0ZW0uZGF0YXNldC5pZDtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5pbmRleE9mKGlkKSA9PT0gLTEpIHtcclxuICAgICAgICBvcHRpb25zLnB1c2goaWQpO1xyXG4gICAgICAgIGxpc3RfaXRlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaW5kZXggPSBvcHRpb25zLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIG9wdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBsaXN0X2l0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlX2l0ZW0sIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpKTtcclxuICAgIC8vY29uc29sZS5sb2coSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlX2l0ZW0pKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7dXNlclNldHRpbmdzfTtcclxuXHJcbmlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIHVzZXJTZXR0aW5ncycpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdXNlclNldHRpbmdzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgdGFza0hlYWRlckRlc2lnbicpO1xyXG59XHJcblxyXG5pbXBvcnQge2dldFRhc2tJZCxnZXRUYXNrSGVhZH0gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcblxyXG5mdW5jdGlvbiB0YXNrSGVhZGVyRGVzaWduKCkge1xyXG5cclxuICAgIGNvbnN0IHRhc2tEYXRhID0gZGF0YU1haW5pbmcoKTtcclxuICAgIC8vY29uc29sZS5sb2codGFza0RhdGEpO1xyXG4gICAgbGV0IGRhc2hib2FyZCA9IGFkZExlZnRDb2x1bW4oKTtcclxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICBsZXQgZGF0YSA9IFtcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICfQl9Cw0LTQsNGH0LAg4oSWJyxcclxuICAgICAgICAgICAgICAgICdkYXRhJzogW2A8c3BhbiBjbGFzcz1cInByaW0taVwiPiR7dGFza0RhdGEudGFzay5pZH08L3NwYW4+IDxzcGFuIGNsYXNzPVwic2VjLWlcIj7QvtGCICR7dGFza0RhdGEudGFzay5iZWdpbn08L3NwYW4+YF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzogJ9Ch0YLQsNGC0YPRgScsXHJcbiAgICAgICAgICAgICAgICAnZGF0YSc6IFtgPHNwYW4gY2xhc3M9XCJyZWctaVwiPiR7dGFza0RhdGEudGFzay5zdGF0ZX08L3NwYW4+YF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIC8vICAgICAndGl0bGUnOiAn0JjQtdGA0LDRgNGF0LjRjycsXHJcbiAgICAgICAgICAgIC8vICAgICAnZGF0YSc6IFtdXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzogJ9CX0LDRj9Cy0LjRgtC10LvRjCcsXHJcbiAgICAgICAgICAgICAgICAnZGF0YSc6IFtgPHNwYW4gY2xhc3M9XCJwcmltLWlcIj4ke3Rhc2tEYXRhLm93bmVyLm5hbWV9PC9zcGFuPmAsYDxhIGhyZWY9XCJtYWlsdG86JHt0YXNrRGF0YS5vd25lci5lbWFpbH1cIiBjbGFzcz1cInJlZy1pXCI+JHt0YXNrRGF0YS5vd25lci5lbWFpbH08L2E+YF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAn0J/RgNC+0LXQutGCJyxcclxuICAgICAgICAgICAgICAgICdkYXRhJzogW2A8c3BhbiBjbGFzcz1cInByaW0taVwiPiR7dGFza0RhdGEucHJvamVjdH08L3NwYW4+YF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAn0KLQuNC/INC30LDQtNCw0YfQuCcsXHJcbiAgICAgICAgICAgICAgICAnZGF0YSc6IFtgPHNwYW4gY2xhc3M9XCJyZWctaVwiPiR7dGFza0RhdGEudGFzay50eXBlfTwvc3Bhbj5gXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICfQktGA0LXQvNGPJyxcclxuICAgICAgICAgICAgICAgICdkYXRhJzogW2A8c3BhbiBjbGFzcz1cInJlZy1pXCI+JHt0YXNrRGF0YS50aW1lLnNwZW50fSDQvNC40L0uPC9zcGFuPiA8c3BhbiBjbGFzcz1cInNlYy1pXCI+0LjQtyAke3Rhc2tEYXRhLnRpbWUucGxhbm5lZH08L3NwYW4+IDxzcGFuIGNsYXNzPVwiJHtjb3VudExlZnRUaW1lKHRhc2tEYXRhLnRpbWUuc3BlbnQsIHRhc2tEYXRhLnRpbWUucGxhbm5lZCl9XCI+KCR7dGFza0RhdGEudGltZS5sZWZ0fSk8L3NwYW4+YF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIF07XHJcblxyXG4gICAgZGFzaGJvYXJkLmFwcGVuZENoaWxkKGNyZWF0ZVRlbXBsYXRlKGRhdGEsZnJhZ21lbnQpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGF0YU1haW5pbmcoKSB7XHJcbiAgICBsZXQgc291cnNlVGJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stYmFyJykuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICBsZXQgdGQgPSBBcnJheS5mcm9tKHNvdXJzZVRibC5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpKTtcclxuXHJcbiAgICAvL9C30LDQtNCw0YfQsFxyXG4gICAgICAgIC8v0L3QsNC30LLQsNC90LjQtSAhXHJcbiAgICAgICAgLy/QvdC+0LzQtdGAIChpZCkgIVxyXG4gICAgICAgIC8v0LTQsNGC0LAg0L3QsNGH0LDQu9CwICFcclxuICAgICAgICAvL9GC0LjQvyDQt9Cw0LTQsNGH0LggIVxyXG4gICAgLy/Qt9Cw0LLQuNGC0LXQu9GMXHJcbiAgICAgICAgLy/QuNC80Y8gIVxyXG4gICAgICAgIC8v0L/QvtGH0YLQsCAhXHJcbiAgICAgICAgLy/QvtGA0LPQsNC90LjQt9Cw0YbQuNGPICFcclxuICAgIC8v0L/RgNC+0LXQutGCICFcclxuXHJcbiAgICAvL9Cy0YDQtdC80Y9cclxuICAgICAgICAvL9C/0LvQsNC90LjRgNGD0LXQvNC+0LVcclxuICAgICAgICAvL9C30LDRgtGA0LDRh9C10L3QvlxyXG4gICAgICAgIC8v0L7RgdGC0LDQu9C+0YHRjFxyXG5cclxuICAgIGxldCBzb3VyY2UgPSB7fTtcclxuICAgIGNvbnN0IHRhc2tIZWFkID0gZ2V0VGFza0hlYWQoKTtcclxuXHJcbiAgICBzb3VyY2UudGFzayA9IHtcclxuICAgICAgICAndGl0bGUnOiB0YXNrSGVhZC50aXRsZSxcclxuICAgICAgICAnaWQnOiBnZXRUYXNrSWQoKSxcclxuICAgICAgICAnYmVnaW4nOiBmaW5kSW5DZWxscyh0ZCwn0JTQsNGC0LAnKSxcclxuICAgICAgICAndHlwZSc6IGZpbmRJbkNlbGxzKHRkLCfQotC40L8nKSxcclxuICAgICAgICAnc3RhdGUnOiB0YXNrSGVhZC5zdGF0ZVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgb3duZXIgPSBmaW5kSW5DZWxscyh0ZCwn0JfQsNGP0LLQuNGC0LXQu9GMJyx0cnVlKTtcclxuXHJcbiAgICBzb3VyY2Uub3duZXIgPSB7XHJcbiAgICAgICAgJ25hbWUnOiBvd25lclswXS5yZXBsYWNlKC88W14+XSo+L2csICcnKSxcclxuICAgICAgICAnZW1haWwnOiBvd25lclsxXSxcclxuICAgICAgICAnZic6IG93bmVyWzJdLnJlcGxhY2UoLzxbXj5dKj4vZywgJycpXHJcbiAgICB9O1xyXG5cclxuICAgIHNvdXJjZS50aW1lID0ge1xyXG4gICAgICAgICdzcGVudCcgOiBwYXJzZUludChmaW5kSW5DZWxscyh0ZCwn0JfQsNGC0YDQsNGH0LXQvdC+JykpLFxyXG4gICAgICAgICdwbGFubmVkJzogIHBhcnNlSW50KGZpbmRJbkNlbGxzKHRkLCfQn9C70LDQvdC40YDRg9C10LzQvtC1JykpLFxyXG4gICAgICAgICdsZWZ0JzogIHBhcnNlSW50KGZpbmRJbkNlbGxzKHRkLCfQntGB0YLQsNCy0YjQtdC10YHRjycpKVxyXG4gICAgfTtcclxuXHJcbiAgICBzb3VyY2UucHJvamVjdCA9IGZpbmRJbkNlbGxzKHRkLCfQn9GA0L7QtdC60YInKTtcclxuXHJcbiAgICByZXR1cm4gc291cmNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kSW5DZWxscyhhcnIsc3RyLHBhcnNlID0gZmFsc2UpIHtcclxuICAgIGxldCByZXN1bHQgPSBhcnIuZmlsdGVyKGZ1bmN0aW9uIChjZWxsKSB7XHJcbiAgICAgICAgaWYoY2VsbC50ZXh0Q29udGVudC50cmltKCkuaW5jbHVkZXMoc3RyKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBjZWxsXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYocGFyc2Upe1xyXG4gICAgICAgIHJldHVybiByZXN1bHRbMF0ubmV4dEVsZW1lbnRTaWJsaW5nLmlubmVySFRNTC5zcGxpdCgnPGJyPicpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHRbMF0ubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50LnRyaW0oKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTGVmdENvbHVtbigpIHtcclxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tY29udGVudCcpO1xyXG4gICAgbGV0IGNvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29sLmNsYXNzTGlzdC5hZGQoJ2xlZnQtY29sJyk7XHJcbiAgICB3cmFwLmluc2VydEJlZm9yZShjb2wsIHdyYXAuZmlyc3RDaGlsZCk7XHJcblxyXG4gICAgbGV0IGRhc2hib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGFzaGJvYXJkLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGFzaGJvYXJkJyk7XHJcbiAgICBjb2wuYXBwZW5kQ2hpbGQoZGFzaGJvYXJkKTtcclxuXHJcbiAgICByZXR1cm4gZGFzaGJvYXJkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUZW1wbGF0ZShkYXRhQXJyLHBsYWNlaG9sZGVyKSB7XHJcbiAgICBkYXRhQXJyLm1hcChmdW5jdGlvbiAoZ3JvdXApIHtcclxuICAgICAgICBsZXQgYmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBibG9jay5jbGFzc0xpc3QuYWRkKCd0eHQtYmxvY2snKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCB2YWwgb2YgZ3JvdXApe1xyXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndHh0LWJsb2NrX190aXRsZScpO1xyXG4gICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHZhbC50aXRsZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRhdGEuY2xhc3NMaXN0LmFkZCgndHh0LWJsb2NrX19kYXRhJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IHN0ciBvZiB2YWwuZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICAgICAgICAgIHAuaW5uZXJIVE1MID0gc3RyO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5hcHBlbmRDaGlsZChwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgICAgICAgICBibG9jay5hcHBlbmRDaGlsZChkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBsYWNlaG9sZGVyLmFwcGVuZENoaWxkKGJsb2NrKVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9jb25zb2xlLmxvZyhwbGFjZWhvbGRlcik7XHJcbiAgICByZXR1cm4gcGxhY2Vob2xkZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvdW50TGVmdFRpbWUoc3BlbnQscGxhbikge1xyXG4gICAgbGV0IGNzc2NsYXNzID0gJ3JlZy1pJztcclxuXHJcbiAgICBpZihwYXJzZUludChzcGVudCkgPiBwYXJzZUludChwbGFuKSl7XHJcbiAgICAgICAgY3NzY2xhc3MgPSAnYWxlcnQtaSc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3NzY2xhc3M7XHJcbn1cclxuXHJcblxyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vcGNzcy90YXNrSGVhZGVyRGVzaWduLnBjc3MnO1xyXG5cclxuZXhwb3J0IHt0YXNrSGVhZGVyRGVzaWdufTtcclxuXHJcbmlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKXtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCB0YXNrSGVhZGVyRGVzaWduJyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90YXNrSGVhZGVyRGVzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi90YXNrSGVhZGVyRGVzaWduLnBjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdGFza0hlYWRlckRlc2lnbi5wY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3Rhc2tIZWFkZXJEZXNpZ24ucGNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGNzcy90YXNrSGVhZGVyRGVzaWduLnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi50eHQtYmxvY2tfX2RhdGF7Y29sb3I6I2EwYTRhNztmb250LXNpemU6MXJlbX0udHh0LWJsb2NrX19kYXRhIHB7bWFyZ2luOjB9I21haW4tY29udGVudHtkaXNwbGF5Oi1tcy1ncmlkO2Rpc3BsYXk6Z3JpZDstbXMtZ3JpZC1jb2x1bW5zOjUwMHB4IDFmcjtncmlkLXRlbXBsYXRlLWNvbHVtbnM6NTAwcHggMWZyfSNtYWluLWNvbnRlbnQgaHJ7ZGlzcGxheTpub25lfSN0YXNrLWZvb3RlcntncmlkLWNvbHVtbjoyLzN9LmxlZnQtY29se2JhY2tncm91bmQtY29sb3I6IzI4MmYzNztwYWRkaW5nOjIuNXJlbX0udGFzay1kYXNoYm9hcmR7cG9zaXRpb246LXdlYmtpdC1zdGlja3k7cG9zaXRpb246c3RpY2t5O3RvcDowfS50eHQtYmxvY2t7bWFyZ2luLWJvdHRvbToxLjVyZW07bGluZS1oZWlnaHQ6MS41O2Rpc3BsYXk6LW1zLWdyaWQ7ZGlzcGxheTpncmlkOy1tcy1ncmlkLWNvbHVtbnM6ODVweCAxZnI7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjg1cHggMWZyfS50eHQtYmxvY2tfX3RpdGxle2NvbG9yOiM4NDhlOTQ7Zm9udC1zaXplOi43NXJlbTt3aGl0ZS1zcGFjZTpub3dyYXA7cGFkZGluZy10b3A6LjMzM2VtfS5wcmltLWl7Y29sb3I6I2NmZDgxYn0ucmVnLWl7Y29sb3I6I2ZmZn0uc2VjLWl7Zm9udC1zaXplOi44NzVlbX0uYWxlcnQtaXtjb2xvcjojYmY0ZjVjfVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/e1wiaW1wb3J0TG9hZGVyc1wiOjF9IS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYiEuL3NyYy9wY3NzL3Rhc2tIZWFkZXJEZXNpZ24ucGNzc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QTs7Ozs7QUM3REE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdEVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaFdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN6RUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN4RkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuSkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5UUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ25iQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hIQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdKQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkRBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDclBBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3BMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9