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
    console.log('hello1');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFydC1zdXBwb3J0LnVzZXIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODE0NGY3NWQyM2Y2NzlhYTViNTciLCJ3ZWJwYWNrOi8vLy4vc3JjL19maW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19hZGRDU1NTZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzPzdmZjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHlmaUNvbW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9fbG9hZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbWVudHNEZXNpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvY29tbWVudHNEZXNpZ24ucGNzcz84NDE4Iiwid2VicGFjazovLy8uL3NyYy9wY3NzL2NvbW1lbnRzRGVzaWduLnBjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbGN1bGF0ZUVsYXBzZWRUaW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9nb1RvVGFzay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY291bnRXb3JrZXJUaW1lLmpzIiwid2VicGFjazovLy8uL3NyYy90YXNrRm9vdGVyRGVzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcz8wYzA0Iiwid2VicGFjazovLy8uL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWxlbXNNb2RpZmljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhdmVOZXdDb21tZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3B5UGFzdGVDb21tZW50UXVvdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rhc2tVcGRhdGVOb3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuY2hvckxpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZXJTZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGFza0hlYWRlckRlc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGNzcy90YXNrSGVhZGVyRGVzaWduLnBjc3M/N2FkOSIsIndlYnBhY2s6Ly8vLi9zcmMvcGNzcy90YXNrSGVhZGVyRGVzaWduLnBjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODE0NGY3NWQyM2Y2NzlhYTViNTciLCJmdW5jdGlvbiBnZXRUYXNrSWQoKSB7XHJcbiAgICBjb25zdCB0YXNrSWQgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNwbGl0KCcmJyk7XHJcblxyXG4gICAgbGV0IGlkID0gdGFza0lkLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtLnNwbGl0KCc9JylbMF0gPT09ICdpZCc7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaWRbMF0uc3BsaXQoXCI9XCIpWzFdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUYXNrSGVhZCgpIHtcclxuICAgIGxldCB0YXNrSGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXRpdGxlJykudGV4dENvbnRlbnQuc3BsaXQoJyAtICcpO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHRhc2tIZWFkKSAmJiB0YXNrSGVhZC5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIHJldHVybiB7J3RpdGxlJzogdGFza0hlYWRbMV0udHJpbSgpLCAnc3RhdGUnOiB0YXNrSGVhZFsyXS5zcGxpdCgnICcpWzFdfTtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rhc2sgaGVhZCBub3QgZm91bmQnKTtcclxufVxyXG5cclxuLy/Qv9C+0LvRg9GH0LjRgtGMINCy0YHQtSDQutCw0LzQtdC90YLRiyDQsiDQt9Cw0LTQsNGH0LVcclxuLy/RgNCw0LHQvtGC0LDQtdGCINC60L7RgNGA0LXQutGC0L3QviDQv9C+0YHQu9C1INC30LDQv9GD0YHQutCwIGNvbW1lbnRzRGVzaWduXHJcbmZ1bmN0aW9uIGdldEFsbENhbW1lbnRzKCkge1xyXG4gICAgLy9sZXQgcm93cyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG4gICAgLy9yZXR1cm4gcm93cy5tYXAoZ2V0Q29tbWVudEZyb21Sb3cpO1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLWNvbW1lbnQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29tbWVudEZyb21Sb3cocm93KSB7XHJcbiAgICByZXR1cm4gcm93LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LXdyYXAnKTtcclxufVxyXG5cclxuLy/RgNCw0LHQvtGC0LDQtdGCINC60L7RgNGA0LXQutGC0L3QviDQtNC70Y8g0LfQsNC/0YPRgdC60LAgY29tbWVudHNEZXNpZ25cclxuZnVuY3Rpb24gZ2V0QWxsQ29tbWVudHNSb3dzKCkge1xyXG4gICAgbGV0IHJvd3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy10YmwnKS5xdWVyeVNlbGVjdG9yQWxsKCdUUicpKTtcclxuICAgIHJvd3MgPSByb3dzLnNwbGljZSgxLCByb3dzLmxlbmd0aCk7IC8v0LjRgdC60LvRjtGH0LjRgtGMINC/0LXRgNCy0YPRjiDRgdGC0YDQvtC60YMg0YEg0LfQsNCz0L7Qu9C+0LLQutCw0LzQuCDRgdGC0L7Qu9Cx0YbQvtCyXHJcblxyXG4gICAgcmV0dXJuIHJvd3MuZmlsdGVyKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgIHJldHVybiByb3cucXVlcnlTZWxlY3RvckFsbCgndGQnKS5sZW5ndGggPiAxO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vINC/0L7Qu9GD0YfQuNGC0Ywg0YHQv9C40YHQvtC6INCy0YHQtdGFINGB0L7RgtGA0YPQtNC90LjQutC+0LIg0LIg0LfQsNC00LDRh9C1XHJcbmZ1bmN0aW9uIGdldEFsbFdvcmtlcnMoKSB7XHJcbiAgICBsZXQgcm93cyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG5cclxuICAgIGxldCB3b3JrZXJzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgd29ya2Vycy5wdXNoKHJvd3NbaV0uY2hpbGRyZW5bNF0udGV4dENvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXF1aXJlKCcuL191dGlscycpLmVsaW1pbmF0ZUR1cGxpY2F0ZXMod29ya2Vycyk7XHJcbn1cclxuXHJcbi8vINC/0L7Qu9GD0YfQtdC90LjQtSDRgdGC0YDQvtC60Lgg0YEg0LLRgNC10LzQvdC10Lwg0LjQtyDRgtCw0LHQu9C40YbRiyDRgSDQutC+0LzQvNC10L3RgtCw0YDQuNC80Lgg0LfQsNC00LDRh9C4XHJcbmZ1bmN0aW9uIGdldFJvd1RpbWVTdHJpbmcocm93KSB7XHJcbiAgICBsZXQgdCA9ICcnO1xyXG5cclxuICAgIGlmIChyb3cuY2hpbGRyZW5bMTBdKSB7XHJcbiAgICAgICAgLy/QtNC+INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdCA9IHJvdy5jaGlsZHJlblsxMF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgdCA9IHBhcnNlSW50KHQuc3BsaXQoJy8nKVswXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8v0L/QvtGB0LvQtSDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgIHQgPSBwYXJzZUludChyb3cucXVlcnlTZWxlY3RvcignLmVsYXBzZWQtdGltZScpLnRleHRDb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IHtnZXRUYXNrSWQsZ2V0VGFza0hlYWQsZ2V0QWxsQ2FtbWVudHMsZ2V0Q29tbWVudEZyb21Sb3csZ2V0QWxsQ29tbWVudHNSb3dzLGdldEFsbFdvcmtlcnMsZ2V0Um93VGltZVN0cmluZ307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvX2ZpbmRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbi8v0L7Qv9GA0LXQtNC10LvQtdC90LjQtSDRgdGC0YDQsNC90LjRhtGLINC/0L4gZ2V0INC/0LDRgNCw0LzQtdGC0YDRgyBhLCDQvdCw0L/RgNC40LzQtdGAID9hPXVzZXJfcGFnZVxyXG5mdW5jdGlvbiBnZXRVUkxBY3Rpb24oKSB7XHJcbiAgICBsZXQgZ2V0X2FjdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KFwiPVwiKTtcclxuICAgIGdldF9hY3Rpb24gPSBnZXRfYWN0aW9uWzFdLnNwbGl0KCcmJyk7XHJcbiAgICByZXR1cm4gZ2V0X2FjdGlvblswXTtcclxufVxyXG5cclxuLy/Rg9C00LDQu9C10L3QuNC1INC00YPQsdC70LjQutCw0YLQvtCyXHJcbmZ1bmN0aW9uIGVsaW1pbmF0ZUR1cGxpY2F0ZXMoYXJyKSB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc3RyID0gYXJyW2ldO1xyXG4gICAgICAgIG9ialtzdHJdID0gdHJ1ZTsgLy8g0LfQsNC/0L7QvNC90LjRgtGMINGB0YLRgNC+0LrRgyDQsiDQstC40LTQtSDRgdCy0L7QudGB0YLQstCwINC+0LHRitC10LrRgtCwXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7IC8vINC40LvQuCDRgdC+0LHRgNCw0YLRjCDQutC70Y7Rh9C4INC/0LXRgNC10LHQvtGA0L7QvCDQtNC70Y8gSUU4LVxyXG59XHJcblxyXG4vL9GB0L7Qt9C00LDQvdC40LUg0LTQsNGC0Ysg0LjQtyDRgdGC0YDQvtC60LhcclxuZnVuY3Rpb24gY3JlYXRlSVNPRGF0ZShzdHIpIHtcclxuICAgIGxldCBkYXRlX3N0ciA9IHN0ci5zcGxpdCgnLicpO1xyXG4gICAgbGV0IGRheV9zdHIgPSBkYXRlX3N0clswXTtcclxuICAgIGxldCBtb250aF9zdHIgPSBkYXRlX3N0clsxXTtcclxuICAgIGxldCB5ZWFyX3N0ciA9IGRhdGVfc3RyWzJdO1xyXG4gICAgbGV0IGRhdGVfaXNvX3N0ciA9IHllYXJfc3RyICsgJy0nICsgbW9udGhfc3RyICsgJy0nICsgZGF5X3N0cjtcclxuICAgIGRhdGVfaXNvX3N0ciA9IERhdGUucGFyc2UoZGF0ZV9pc29fc3RyKTtcclxuICAgIHJldHVybiBkYXRlX2lzb19zdHI7XHJcbn1cclxuXHJcbi8vINC/0L7Qu9GD0YfQtdC90LjQtSDRgdGC0YDQvtC60Lgg0YEg0LTQsNGC0L7QuSDQuNC3INGC0LDQsdC70LjRhtGLINGBINC60L7QvNC80LXQvdGC0LDRgNC40LzQuCDQt9Cw0LTQsNGH0LhcclxuZnVuY3Rpb24gZ2V0Um93RGF0ZVN0cmluZyhyb3cpIHtcclxuICAgIGxldCB0ID0gJyc7XHJcbiAgICBpZiAocm93LmNoaWxkcmVuWzNdKSB7XHJcbiAgICAgICAgLy/QtNC+INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdCA9IHJvdy5jaGlsZHJlblszXS50ZXh0Q29udGVudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy/Qv9C+0YHQu9C1INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdCA9IHJvdy5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1kYXRlJykudGV4dENvbnRlbnRcclxuICAgIH1cclxuXHJcbiAgICB0ID0gdC5zcGxpdCgnICcpO1xyXG5cclxuICAgIHJldHVybiBjcmVhdGVJU09EYXRlKHRbMF0pO1xyXG59XHJcblxyXG4vL9GE0L7RgNC80LDRgtC40YDQvtCy0LDQvdC40LUg0LTQsNGC0YtcclxuZnVuY3Rpb24gZGF0ZUZvcm1hdHRlcihkYXRlKSB7XHJcbiAgICBsZXQgZm9ybWF0dGVyID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJydVwiKTtcclxuICAgIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludChkYXRlLCAxMCkpO1xyXG4gICAgZGF0ZSA9IGZvcm1hdHRlci5mb3JtYXQoZGF0ZSk7XHJcbiAgICByZXR1cm4gZGF0ZTtcclxufVxyXG5cclxuLy8g0YHQutGA0YvRgtGML9C/0L7QutCw0LfQsNGC0Ywg0L7Qv9GA0LXQtNC10L3QvdGL0LUgb3B0aW9uINCyIHNlbGVjdFxyXG5mdW5jdGlvbiBtb2RpZnlTZWxlY3RPcHRpb25zTGlzdChsaXN0LCBwYXJhbXMpIHtcclxuICAgIEFycmF5LmZyb20obGlzdCkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5pbmRleE9mKGl0ZW0udmFsdWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vL9Cy0YvQt9C+0LIg0YTRg9C90LrRhtC40Lgg0L/QviDRgdC+0YfQtdGC0LDQvdC40Y4g0LrQu9Cw0LLQuNGI0YxcclxuZnVuY3Rpb24gcnVuT25LZXlzKGZ1bmMsIGVsZW0pIHtcclxuICAgIGxldCBjb2RlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcclxuXHJcbiAgICBsZXQgcHJlc3NlZCA9IHt9O1xyXG5cclxuICAgIGVsZW0ub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcblxyXG4gICAgICAgIHByZXNzZWRbZS5rZXlDb2RlXSA9IHRydWU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29kZXMubGVuZ3RoOyBpKyspIHsgLy8g0L/RgNC+0LLQtdGA0LjRgtGMLCDQstGB0LUg0LvQuCDQutC70LDQstC40YjQuCDQvdCw0LbQsNGC0YtcclxuICAgICAgICAgICAgaWYgKCFwcmVzc2VkW2NvZGVzW2ldXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDRh9GC0L7QsdGLINC40LfQsdC10LbQsNGC0YwgXCLQt9Cw0LvQuNC/0LDQvdC40Y9cIiDQutC70LDQstC40YjQuCAtLSDQvtCx0L3Rg9C70Y/QtdC8INGB0YLQsNGC0YPRgSDQstGB0LXRhSDQutC70LDQstC40YgsINC/0YPRgdGC0Ywg0L3QsNC20LjQvNCw0LXRgiDQstGB0ZEg0LfQsNC90L7QstC+XHJcbiAgICAgICAgcHJlc3NlZCA9IHt9O1xyXG5cclxuICAgICAgICBmdW5jKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW0ub25rZXl1cCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZSA9IGUgfHwgdy5ldmVudDtcclxuXHJcbiAgICAgICAgZGVsZXRlIHByZXNzZWRbZS5rZXlDb2RlXTtcclxuICAgIH07XHJcbn1cclxuXHJcbi8vYWpheCDQt9Cw0L/RgNC+0YFcclxuZnVuY3Rpb24gbG9hZEJ5QWpheChwYXRoLCBzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IoeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB4aHIub3BlbihcIkdFVFwiLCBwYXRoLCB0cnVlKTtcclxuICAgIHhoci5zZW5kKCk7XHJcbn1cclxuXHJcbi8vINGE0L7RgNC80LjRgNC+0LLQsNC90LjQtSDRgdGC0YDQvtC60Lgg0YEg0L3Rg9C20L3Ri9C8INC+0LrQvtC90YfQsNC90LjQtdC8INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDRh9C40YHQu9CwXHJcbi8vINC90LDQv9GA0LjQvNC10YAgLSDQvNC40L3Rg9GC0LAsINC80LjQvdGD0YLRiywg0LzQuNC90YPRglxyXG5mdW5jdGlvbiBkZWNsT2ZOdW0obnVtYmVyLCB0aXRsZXMpIHtcclxuICAgIGxldCBjYXNlcyA9IFsyLCAwLCAxLCAxLCAxLCAyXTtcclxuICAgIHJldHVybiB0aXRsZXNbKG51bWJlciAlIDEwMCA+IDQgJiYgbnVtYmVyICUgMTAwIDwgMjApID8gMiA6IGNhc2VzWyhudW1iZXIgJSAxMCA8IDUpID8gbnVtYmVyICUgMTAgOiA1XV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRJbkFycmF5KGFyciwgdmFsKSB7XHJcbiAgICByZXR1cm4gYXJyLmluZGV4T2YodmFsKTtcclxufVxyXG5cclxuZXhwb3J0IHtnZXRVUkxBY3Rpb24sZWxpbWluYXRlRHVwbGljYXRlcyxjcmVhdGVJU09EYXRlLGdldFJvd0RhdGVTdHJpbmcsZGF0ZUZvcm1hdHRlcixtb2RpZnlTZWxlY3RPcHRpb25zTGlzdCxydW5PbktleXMsbG9hZEJ5QWpheCxkZWNsT2ZOdW0sZmluZEluQXJyYXl9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9fdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcbmlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ3RvdGFsJyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0VVJMQWN0aW9ufSBmcm9tICcuL191dGlscy5qcyc7XHJcblxyXG5pbXBvcnQge2FkZFBhZ2VFbGVtc30gZnJvbSAnLi9fYWRkQ1NTU2VsZWN0b3JzLmpzJztcclxuXHJcbmltcG9ydCB7bW9keWZpQ29tbWVudHN9IGZyb20gJy4vbW9keWZpQ29tbWVudHMuanMnO1xyXG5cclxuaW1wb3J0IHtjb21tZW50c0Rlc2lnbn0gZnJvbSAnLi9jb21tZW50c0Rlc2lnbi5qcyc7XHJcblxyXG5pbXBvcnQge2NhbGN1bGF0ZUVsYXBzZWRUaW1lfSBmcm9tICcuL2NhbGN1bGF0ZUVsYXBzZWRUaW1lLmpzJztcclxuXHJcbmltcG9ydCB7Z29Ub1Rhc2tEYXRhbGlzdH0gZnJvbSAnLi9nb1RvVGFzay5qcyc7XHJcblxyXG5pbXBvcnQge2NvdW50V29ya2VyVGltZX0gZnJvbSAnLi9jb3VudFdvcmtlclRpbWUuanMnO1xyXG5cclxuaW1wb3J0IHt0YXNrRm9vdGVyRGVzaWdufSBmcm9tICcuL3Rhc2tGb290ZXJEZXNpZ24uanMnO1xyXG5cclxuaW1wb3J0IHtlbGVtc01vZGlmaWNhdGlvbn0gZnJvbSAnLi9lbGVtc01vZGlmaWNhdGlvbi5qcyc7XHJcblxyXG5pbXBvcnQge3NhdmVOZXdDb21tZW50fSBmcm9tICcuL3NhdmVOZXdDb21tZW50LmpzJztcclxuXHJcbmltcG9ydCB7Y29weVBhc3RlQ29tbWVudFF1b3RlfSBmcm9tICcuL2NvcHlQYXN0ZUNvbW1lbnRRdW90ZS5qcyc7XHJcblxyXG5pbXBvcnQge3Rhc2tVcGRhdGVOb3RpZnl9IGZyb20gJy4vdGFza1VwZGF0ZU5vdGlmeS5qcyc7XHJcblxyXG5pbXBvcnQge2FuY2hvckxpbmt9IGZyb20gJy4vYW5jaG9yTGluay5qcyc7XHJcblxyXG5pbXBvcnQge3VzZXJTZXR0aW5nc30gZnJvbSAnLi91c2VyU2V0dGluZ3MuanMnO1xyXG5cclxuaW1wb3J0IHt0YXNrSGVhZGVyRGVzaWdufSBmcm9tICcuL3Rhc2tIZWFkZXJEZXNpZ24uanMnXHJcblxyXG5jb25zdCBhY3Rpb25fcGFnZSA9IGdldFVSTEFjdGlvbigpO1xyXG5cclxuc3dpdGNoIChhY3Rpb25fcGFnZSkge1xyXG4gICAgY2FzZSAnbmV3JzpcclxuICAgICAgICB1c2VyU2V0dGluZ3MoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ3JlZCc6XHJcbiAgICAgICAgYWRkUGFnZUVsZW1zKCk7XHJcbiAgICAgICAgLy9sZXQgZWxlbXNNb2RpZmljYXRpb24gPSBuZXcgZWxlbXNNb2RpZmljYXRpb24oKTtcclxuICAgICAgICBlbGVtc01vZGlmaWNhdGlvbigpO1xyXG4gICAgICAgIG1vZHlmaUNvbW1lbnRzKCk7XHJcblxyXG4gICAgICAgIGlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKXtcclxuICAgICAgICAgICAgY291bnRXb3JrZXJUaW1lKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd29ya2VyLXRpbWUtY291bnQnKSA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudFdvcmtlclRpbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2F2ZU5ld0NvbW1lbnQoKTtcclxuICAgICAgICBjYWxjdWxhdGVFbGFwc2VkVGltZSgpO1xyXG4gICAgICAgIGNvbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgdGFza0Zvb3RlckRlc2lnbigpO1xyXG4gICAgICAgIGNvcHlQYXN0ZUNvbW1lbnRRdW90ZSgpO1xyXG4gICAgICAgIHRhc2tVcGRhdGVOb3RpZnkoKTtcclxuICAgICAgICBnb1RvVGFza0RhdGFsaXN0KCk7XHJcbiAgICAgICAgYW5jaG9yTGluaygpO1xyXG4gICAgICAgIHRhc2tIZWFkZXJEZXNpZ24oKTtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ3VzZXJfcGFnZSc6XHJcbiAgICAgICAgYWRkUGFnZUVsZW1zKCk7XHJcbiAgICAgICAgZ29Ub1Rhc2tEYXRhbGlzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG59XHJcblxyXG5pZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICBjb25zb2xlLmxvZygnaGVsbG8xJyk7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ3RvdGFsJyk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy/RgdGO0LTQsCDQtNC+0LHQsNC70Y/RjtGC0YHRjyDRjdC70LXQvNC10L3RgtGLINGB0YLRgNCw0L3QuNGG0Ysg0LIg0LrQvtGC0L7RgNGL0LUg0LLRgdGC0LDQstC70Y/RjtGC0YHRjyDRgdC+0LfQtNCw0L3Ri9C1INGB0LrRgNC40L/RgtC+0Lwg0LHQu9C+0LrQuFxyXG4vL9C4LtC40LvQuCDQvtC90Lgg0LzQvtC00LjRhNC40YbQuNGA0YPRjtGC0YHRjyDRgdC60YDQuNC/0YLQvtC8XHJcblxyXG5pbXBvcnQge2dldEFsbENvbW1lbnRzUm93c30gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcblxyXG5mdW5jdGlvbiBhZGRQYWdlRWxlbXMoKSB7XHJcbiAgICBsZXQgJGNvbnRlbnRfY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm1bbmFtZT1cInRoZUZvcm1cIl0nKTtcclxuICAgICRjb250ZW50X2NlbGwuc2V0QXR0cmlidXRlKCdpZCcsICdtYWluLWNvbnRlbnQnKTtcclxuXHJcbiAgICBsZXQgJGNvbW1lbnRzX3RibCA9ICRjb250ZW50X2NlbGwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJUQUJMRVwiKVswXTtcclxuXHJcbiAgICBpZigkY29tbWVudHNfdGJsKXtcclxuICAgICAgICAkY29tbWVudHNfdGJsLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29tbWVudHMtdGJsJyk7XHJcblxyXG4gICAgICAgIGxldCByb3dzID0gZ2V0QWxsQ29tbWVudHNSb3dzKCk7XHJcblxyXG4gICAgICAgIHJvd3MubWFwKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJylbNV0uZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmFkZCgnY29tbWVudC13cmFwJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGlucHV0X2RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5pbnB1dF9ib3gnKTsgLy/QtdGB0YLRjCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0LfQsNC00LDRh9C4XHJcblxyXG4gICAgaWYgKGlucHV0X2Rpdikge1xyXG4gICAgICAgIGlucHV0X2Rpdi5pZCA9ICd0YXNrLWJhcic7XHJcbiAgICAgICAgbGV0ICR1c2VyX3Rvb2xiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgICAgICAkdXNlcl90b29sYmFyLnNldEF0dHJpYnV0ZSgnaWQnLCAndXNlci10b29sYmFyJyk7XHJcbiAgICAgICAgJHVzZXJfdG9vbGJhci5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXInKTtcclxuXHJcbiAgICAgICAgaW5wdXRfZGl2LmFwcGVuZENoaWxkKCR1c2VyX3Rvb2xiYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v0L/QvtC00LLQsNC7INC30LDQtNCw0YfQuFxyXG4gICAgbGV0ICR0YXNrX2Zvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RhYmxlLnRoZUZvcm0nKTtcclxuXHJcbiAgICBpZigkdGFza19mb290ZXIubGVuZ3RoKXtcclxuICAgICAgICAvL9C+0LHQtdGA0YLQutCwXHJcbiAgICAgICAgJHRhc2tfZm9vdGVyID0gJHRhc2tfZm9vdGVyWzBdO1xyXG4gICAgICAgICR0YXNrX2Zvb3Rlci5pZCA9ICd0YXNrLWZvb3Rlcic7XHJcblxyXG4gICAgICAgIC8v0YLQsNCx0LvQuNGG0LAg0YEgdGV4dGFyZWEg0LrQsNC80LXQvdGC0LBcclxuICAgICAgICBsZXQgJGZvb3Rlcl90YmxzID0gJHRhc2tfZm9vdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RhYmxlJyk7XHJcblxyXG4gICAgICAgIGxldCAkY29tbWVudFRibCA9ICRmb290ZXJfdGJsc1swXTtcclxuICAgICAgICAkY29tbWVudFRibC5pZCA9ICd0YmwtbmV3LWNvbW1lbnQnO1xyXG5cclxuICAgICAgICAvL9C+0LHQtdGA0YLQutCwINGP0YfQtdC50LrQuCDRgSB0ZXh0YXJlYVxyXG4gICAgICAgIGxldCAkbmV3Q29tbWVudCA9ICRjb21tZW50VGJsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJylbMV07XHJcbiAgICAgICAgJG5ld0NvbW1lbnQuaWQgPSAnbmV3LWNvbW1lbnQtd3JhcCc7XHJcblxyXG4gICAgICAgIC8v0LTQvtCx0LDQstC70Y4g0L7QsdC10YDRgtC60YMg0LTQu9GPIHRleHRhcmVhXHJcbiAgICAgICAgLy/QsiDQvdC10LUg0LHRg9C00YMg0LLRgdGC0LDQstC70Y/RgtGMINC60L3QvtC/0LrQuCDQstGB0Y/QutC40LVcclxuICAgICAgICBsZXQgJHRhcmVhV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICR0YXJlYVdyYXAuaWQgPSAndGFyZWEtd3JhcCc7XHJcbiAgICAgICAgJHRhcmVhV3JhcC5jbGFzc0xpc3QuYWRkKCd0YXJlYS13cmFwJyk7XHJcblxyXG4gICAgICAgICR0YXJlYVdyYXAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQnKSk7XHJcbiAgICAgICAgJG5ld0NvbW1lbnQuYXBwZW5kQ2hpbGQoJHRhcmVhV3JhcCk7XHJcblxyXG4gICAgICAgIC8v0KLQsNCx0LvQuNGG0LAg0YHRgtCw0YLRg9GB0L7QsiDQt9Cw0LTQsNGH0LhcclxuICAgICAgICBsZXQgJHN0YXR1c1RibCA9ICRmb290ZXJfdGJsc1sxXS5xdWVyeVNlbGVjdG9yKCd0YWJsZScpO1xyXG4gICAgICAgICRzdGF0dXNUYmwuaWQgPSAndGJsLXN0YXR1cyc7XHJcbiAgICB9XHJcbiAgICAvL9C30LDQs9C+0LvQvtCy0L7QuiDQt9Cw0LTQsNGH0LhcclxuICAgIGxldCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMScpO1xyXG5cclxuICAgIHRhc2tUaXRsZS5pZCA9ICd0YXNrLXRpdGxlJztcclxufVxyXG5cclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3Bjc3MvdXNlcnNjcmlwdC5wY3NzJztcclxuXHJcbmV4cG9ydCB7YWRkUGFnZUVsZW1zfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9fYWRkQ1NTU2VsZWN0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3VzZXJzY3JpcHQucGNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi91c2Vyc2NyaXB0LnBjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdXNlcnNjcmlwdC5wY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wY3NzL3VzZXJzY3JpcHQucGNzc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjbWFpbi1jb250ZW50e1xcclxcbiAgICAvKtGD0LHQuNGA0LDRjiDQu9C40YjQvdC40LUg0L7RgtGB0YLRg9C/0Ysg0LggYnIg0YfRgtC+0LHRiyDRg9C80LXQvdGM0YjQuNGC0Ywg0LTRi9GA0YMg0L/QvtC0INC/0L7Qu9GP0LzQuCDQutCw0LzQtdC90YLQsCovbWFyZ2luLWJvdHRvbTowfSNtYWluLWNvbnRlbnQgYnI6bGFzdC1jaGlsZHtkaXNwbGF5Om5vbmV9Lm9ub2ZmLW9wdHttYXJnaW46MCA2cHggMCAxMHB4fS5ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9LmhpZGRlbi1lbGVte3Bvc2l0aW9uOmZpeGVkIWltcG9ydGFudDtsZWZ0Oi05OTllbTt6LWluZGV4Oi0xO3Zpc2liaWxpdHk6aGlkZGVufS5ub25lLnZpZXd7ZGlzcGxheTpibG9jayFpbXBvcnRhbnR9LmNoX2FkZHJ7bWFyZ2luOjEwcHggMTBweCAxMHB4IDA7dmVydGljYWwtYWxpZ246dG9wfS50b3RvcD5pbnB1dHttYXJnaW46MTBweCAwIDB9LmxhYmVsX2hlYWR7ZGlzcGxheTpibG9jazttYXJnaW46MCAwIDIwcHh9LmNsZWFyZml4OmFmdGVyLC5jbGVhcmZpeDpiZWZvcmV7Y29udGVudDpcXFwiXFxcIjtkaXNwbGF5OnRhYmxlO2NsZWFyOmJvdGh9LmFsaXN0e2Zsb2F0OnJpZ2h0fS5hbGlzdCBwe21hcmdpbjowIDAgMTBweDtsaW5lLWhlaWdodDoxO3RleHQtYWxpZ246cmlnaHR9LmJhci13cmFwe3BhZGRpbmc6OHB4IDE1cHg7YmFja2dyb3VuZDojMmQyZDJkfSNjdXN0b20tcHJvamVjdC1saXN0PmxpLCNjdXN0b20td29ya2Vycy1saXN0Pmxpe3dpZHRoOjIwJTtmbG9hdDpsZWZ0O2N1cnNvcjpwb2ludGVyfSNjdXN0b20tcHJvamVjdC1saXN0PmxpOmZpcnN0LWNoaWxke2Rpc3BsYXk6bm9uZX0udXNlci1saXN0e21hcmdpbjoyZW0gMWVtO3BhZGRpbmc6MDtsaXN0LXN0eWxlLXBvc2l0aW9uOmluc2lkZX0udXNlci1saXN0Pmxpe2xpbmUtaGVpZ2h0OjEuNX0uc2VsZWN0ZWR7Y29sb3I6Z3JlZW59LmJ0bi1mbGF0e3BhZGRpbmc6LjVlbTtiYWNrZ3JvdW5kOiNmMGYwZjA7Y3Vyc29yOnBvaW50ZXJ9LmJ0bi1mbGF0LC5yb3ctaXRlbXtkaXNwbGF5OmlubGluZS1ibG9ja30ucm93LWl0ZW17dmVydGljYWwtYWxpZ246dG9wfS5yb3ctaXRlbTpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1yaWdodDoxZW19I3NldHRpbmdzLWJ0bnttYXJnaW46MCAwIDIwcHh9I3NldHRpbmdzLWJveHtkaXNwbGF5Om5vbmU7bWFyZ2luOjIwcHggMDtwYWRkaW5nOjIwcHggMDtvdXRsaW5lOjFweCBzb2xpZCAjNDE0MTQxfSNzZXR0aW5ncy1ib3guaXMtb3BlbntkaXNwbGF5OmJsb2NrfS51c2VyLXRpdGxle2NvbG9yOiMwMDA7bWFyZ2luOjAgMCAuNmVtO2ZvbnQtc2l6ZToyMHB4O3BhZGRpbmc6MH0ucmVndWxhci1saW5re2NvbG9yOiMwMDU0Yjk7b3V0bGluZTowIWltcG9ydGFudH0udGltZS1saXN0IHB7bWFyZ2luOjVweCAwO2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy1tcy1mbGV4LXBhY2s6anVzdGlmeTtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0udGltZS1saXN0PnA+c3BhbjpmaXJzdC1jaGlsZHtwYWRkaW5nLXJpZ2h0OjFlbTtjdXJzb3I6cG9pbnRlcn06cm9vdCAudGltZS1saXN0LXRvdGFse21hcmdpbi10b3A6MWVtO2JvcmRlci10b3A6MXB4IHNvbGlkfS5jb21tZW50LWNvbGxhcHNlZHttYXgtaGVpZ2h0OjcwcHg7b3ZlcmZsb3c6aGlkZGVuIWltcG9ydGFudH0ubG9uZy1jb21tZW50e3dpZHRoOjEwMCUhaW1wb3J0YW50O3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctdG9wOjMwcHh9LmJ0bi1jb2xsYXBzZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowfS5idG4tY29sbGFwc2UtYWxse3Bvc2l0aW9uOmZpeGVkO3RvcDoxMHB4O3JpZ2h0OjEwcHh9OnJvb3QgLmRhdGVzLWxpc3R7d2lkdGg6MTUwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luOjAgMjBweCAwIDB9LnVzZXItdG9vbGJhcnttYXJnaW46MjBweCAwO3BhZGRpbmc6MjBweCAxMHB4O2JvcmRlci10b3A6MXB4IHNvbGlkIHJnYmEoMCwwLDAsLjcpO292ZXJmbG93OmhpZGRlbjtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstbXMtZmxleC13cmFwOndyYXA7ZmxleC13cmFwOndyYXB9LnVzZXItdG9vbGJhcl9faXRlbXtwYWRkaW5nOjEwcHggMTVweDtiYWNrZ3JvdW5kOmhzbGEoMCwwJSwxMDAlLC42KTtib3gtc2hhZG93OjAgMXB4IDFweCByZ2JhKDAsMCwwLC42KX06cm9vdCAudXNlci10b29sYmFyLXRpdGxle21hcmdpbjowIDAgMWVtO3BhZGRpbmc6MDtjb2xvcjojMDAwfTpyb290ICNjb21tZW50cy10YmwgLmNvbW1lbnQtd3JhcHtmb250LXNpemU6MTRweDt3aWR0aDoxMDAlIWltcG9ydGFudDttYXgtd2lkdGg6ODAwcHg7b3ZlcmZsb3c6aGlkZGVufTpyb290ICNjb21tZW50cy10YmwgaDF7Zm9udC1zaXplOjEyMCU7Zm9udC13ZWlnaHQ6NDAwO21hcmdpbjowIDAgLjRlbTtjb2xvcjppbmhlcml0fTpyb290ICNjb21tZW50cy10YmwgYmxvY2txdW90ZXtwYWRkaW5nOjEwcHggMjBweDttYXJnaW46MCAwIDIwcHg7Ym9yZGVyLWxlZnQ6NXB4IHNvbGlkICNjY2N9OnJvb3QgI2NvbW1lbnRzLXRibCBibG9ja3F1b3RlIHB7bWFyZ2luOjB9OnJvb3QgI2NvbW1lbnRzLXRibCBibG9ja3F1b3RlIHA6bm90KDpsYXN0LWNoaWxkKXttYXJnaW4tYm90dG9tOjFlbX06cm9vdCAjY29tbWVudHMtdGJsIHVse3BhZGRpbmctbGVmdDouNmVtO2xpc3Qtc3R5bGUtcG9zaXRpb246aW5zaWRlfVxcclxcblxcclxcbi8qdHlwbyovLnNlY3Rpb24tdGl0bGV7Y29sb3I6aW5oZXJpdDttYXJnaW46MCAwIDFlbTtwYWRkaW5nOjAhaW1wb3J0YW50fS5zLWluZm97Y29sb3I6Z3JheTtmb250LXNpemU6MTJweH1cXHJcXG5cXHJcXG4vKtCy0YHRgtCw0LLQutCwINGC0LXQutGB0YLQsCDQuNC3IGxvY2FsIHN0b3JhZ2UqLy5idG4taW5zZXJ0LWxze3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO3JpZ2h0OjJlbTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3N9LmJ0bi1pbnNlcnQtbHMuaXMtdmlzaWJsZXt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMTUwJSl9XFxyXFxuXFxyXFxuLypcXHJcXG4gICAg0LTQvtCx0LDQstC70LXQvdC40LUg0LjQutC+0L3QutC4INC/0L7QtNC/0LjRgdC60Lgg0L3QsCDRg9Cy0LXQtNC+0LzQu9C10L3QuNC1INC+INC90L7QstGL0YUg0LrQsNC80LXQvdGC0LDRhVxcclxcbiAgICDQsiDQt9Cw0LPQvtC70L7QstC+0Log0LfQsNC00LDRh9C4XFxyXFxuKi8uYWRkLWFsZXJ0e3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCbWFXeHNQU0lqTURBd01EQXdJaUJvWldsbmFIUTlJakkwSWlCMmFXVjNRbTk0UFNJd0lEQWdNalFnTWpRaUlIZHBaSFJvUFNJeU5DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNGdJQ0FnUEhCaGRHZ2daRDBpVFRBZ01HZ3lOSFl5TkVnd1ZqQjZJaUJtYVd4c1BTSnViMjVsSWk4K0lDQWdJRHh3WVhSb0lHUTlJazB4TUM0d01TQXlNUzR3TVdNd0lERXVNUzQ0T1NBeExqazVJREV1T1RrZ01TNDVPWE14TGprNUxTNDRPU0F4TGprNUxURXVPVGxvTFRNdU9UaDZiVGd1T0RjdE5DNHhPVll4TVdNd0xUTXVNalV0TWk0eU5TMDFMamszTFRVdU1qa3ROaTQyT1hZdExqY3lRekV6TGpVNUlESXVOekVnTVRJdU9EZ2dNaUF4TWlBeWN5MHhMalU1TGpjeExURXVOVGtnTVM0MU9YWXVOekpETnk0ek55QTFMakF6SURVdU1USWdOeTQzTlNBMUxqRXlJREV4ZGpVdU9ESk1NeUF4T0M0NU5GWXlNR2d4T0hZdE1TNHdObXd0TWk0eE1pMHlMakV5ZWsweE5pQXhNeTR3TVdndE0zWXphQzB5ZGkwelNEaFdNVEZvTTFZNGFESjJNMmd6ZGpJdU1ERjZJaTgrUEM5emRtYyspO2N1cnNvcjpwb2ludGVyfSN0YXNrLXRpdGxlIC5hZGQtYWxlcnR7dmVydGljYWwtYWxpZ246bWlkZGxlO29wYWNpdHk6LjV9I3Rhc2stdGl0bGUgLmFkZC1hbGVydC5zZWxlY3RlZHtvcGFjaXR5OjF9I3RleHR7cmVzaXplOnZlcnRpY2FsfVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/e1wiaW1wb3J0TG9hZGVyc1wiOjF9IS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYiEuL3NyYy9wY3NzL3VzZXJzY3JpcHQucGNzc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCBtb2R5ZmlDb21tZW50cycpO1xyXG59XHJcblxyXG4vL9C/0L7QuNGB0Log0YHRgdGL0LvQvtC6INCyINGC0LXQutGB0YLQtSDQutC+0LzQvNC10L3RgtCw0YDQuNC10LIg0Lgg0L7QsdC+0YDQsNGH0LjQstCw0L3QuNC1INC40YUg0LIgPGE+XHJcbi8v0YHQstC+0YDQsNGH0LjQstCw0L3QuNC1INC00LvQuNC90L3Ri9GFINC60L7QvNC80LXQvdGC0LDRgNC40LXQsiwg0LTQvtCx0LDQstC70LXQvdC40LUg0LrQvdC+0L/QutC4INCh0LLRgNC10L3Rg9GC0Ywu0YDQsNC30LLQtdGA0L3Rg9GC0Ywg0LLRgdC1XHJcblxyXG5mdW5jdGlvbiBtb2R5ZmlDb21tZW50cygpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgZGl2LCB0eHQ7XHJcbiAgICBsZXQgcm93cyA9IHJlcXVpcmUoJy4vX2ZpbmRlcnMnKS5nZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuXHJcbiAgICByZXF1aXJlKCcuL19sb2FkZXJzJykuYWRkanMoJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL21hcmtkb3duLWl0LzguMy4xL21hcmtkb3duLWl0Lm1pbi5qcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnb01hcmtkb3duKHJvd3MpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGl2ID0gcmVxdWlyZSgnLi9fZmluZGVycycpLmdldENvbW1lbnRGcm9tUm93KHJvd3NbaV0pO1xyXG4gICAgICAgIHR4dCA9IHJlcGxhY2VVUkxXaXRoSFRNTExpbmtzKGRpdi5pbm5lckhUTUwpO1xyXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSB0eHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/Qv9Cw0YDRgdC10YAgbWFya2Rvd25cclxuICAgIGZ1bmN0aW9uIGdvTWFya2Rvd24ocm93cykge1xyXG5cclxuICAgICAgICBsZXQgbWQgPSBtYXJrZG93bml0KCk7XHJcbiAgICAgICAgbWQub3B0aW9ucy5odG1sID0gdHJ1ZTtcclxuICAgICAgICBtZC5vcHRpb25zLmxpbmtpZnkgPSB0cnVlO1xyXG4gICAgICAgIG1kLm9wdGlvbnMudHlwb2dyYXBoZXIgPSB0cnVlO1xyXG4gICAgICAgIG1kLm9wdGlvbnMuYnJlYWtzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcm93cy5tYXAoZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICBhZGRNYXJrZG93bihyb3csIG1kKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRNYXJrZG93bihyb3csIG1kKSB7XHJcbiAgICAgICAgICAgIGxldCBjb21tZW50ID0gcmVxdWlyZSgnLi9fZmluZGVycycpLmdldENvbW1lbnRGcm9tUm93KHJvdyk7XHJcbiAgICAgICAgICAgIGxldCBibG9ja3MgPSBjb21tZW50LmlubmVySFRNTC5zcGxpdCgnPGJyPjxicj4nKTtcclxuXHJcbiAgICAgICAgICAgIGJsb2NrcyA9IGJsb2Nrcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmluZGV4T2YoJzxicj4nKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0uc3BsaXQoJzxicj4nKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS5tYXAoZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGNvbmNhdEVsZW1zVG9TdHJpbmcoaXRlbSwgJyonKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gY29uY2F0RWxlbXNUb1N0cmluZyhpdGVtLCAnJicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS5tYXAoZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyTWRTdHJpbmcoc3RyLCBtZClcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0uam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSByZXBsYWNlSHRtbEd0VG9TeW1ib2woaXRlbS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSByZW5kZXJNZFN0cmluZyhpdGVtLCBtZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICc8cD4nICsgaXRlbSArICc8L3A+JztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb21tZW50LmlubmVySFRNTCA9IGJsb2Nrcy5qb2luKCcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlbmRlck1kU3RyaW5nKHN0ciwgbWQpIHtcclxuICAgICAgICAgICAgbGV0IG1kYyA9IFsnIycsICcqJywgJy0nLCAnPiddO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1kYy5pbmRleE9mKHN0ci5jaGFyQXQoMCkpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHN0ciA9IG1kLnJlbmRlcihzdHIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8rJzxicj4nINC90YPQttC90L4g0YfRgtC+0LHRiyDQsdGL0LvQviDQv9C+0YXQvtC20LUg0L3QsCDQuNGB0YXQvtC00L3QvtC1INGE0L7RgNC80LDRgtC40YDQvtCy0LDQvdC40LVcclxuICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArICc8YnI+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/Qv9C+0LjRgdC6INC4INC+0LHRitC10LTQuNC90LXQvdC40LUg0LIg0L7QtNC90YMg0YHRgtGA0L7QutGDINGN0LvQtdC80LXQvdGC0L7QsiDQvNCw0YHRgdC40LLQsFxyXG4gICAgLy/QvdCw0YfQuNC90LDRjtGJ0LjRhdGB0Y8g0YEg0YHQuNC80LLQvtC70LAgKlxyXG4gICAgLy/QtNC70Y8g0YHQvtC30LTQsNC90LjRjyDRgdC/0LjRgdC60LAgdWw+bGkg0LIgbWFya2Rvd25cclxuICAgIGZ1bmN0aW9uIGNvbmNhdEVsZW1zVG9TdHJpbmcoYXJyLCBzeW1ib2wpIHtcclxuICAgICAgICBsZXQgbmV4dDtcclxuICAgICAgICBsZXQgc3RyaW5ncyA9IFtdO1xyXG4gICAgICAgIGxldCBuZXdsaXN0ID0gJyc7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5leHQgPSBpICsgMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcnJbaV0uY2hhckF0KDApID09PSBzeW1ib2wgJiYgYXJyW25leHRdICYmIGFycltuZXh0XS5jaGFyQXQoMCkgPT09IHN5bWJvbCkge1xyXG4gICAgICAgICAgICAgICAgbmV3bGlzdCArPSBwcmVmb3JtYXRTdHJpbmcoYXJyW2ldLCBzeW1ib2wpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFhcnJbbmV4dF0gfHwgYXJyW25leHRdLmNoYXJBdCgwKSAhPT0gc3ltYm9sKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdsaXN0ICs9IHByZWZvcm1hdFN0cmluZyhhcnJbaV0sIHN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdzLnB1c2gobmV3bGlzdCk7XHJcbiAgICAgICAgICAgICAgICBuZXdsaXN0ID0gJyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdzLnB1c2goYXJyW2ldKTtcclxuICAgICAgICAgICAgICAgIC8vIHN0cmluZ3MucHVzaChwcmVmb3JtYXRTdHJpbmcoYXJyW2ldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdHJpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8v0L7QsdGA0LDQsdC+0YLQutCwINGB0YLRgNC+0Log0L/QtdGA0LXQtCDRhNC+0YDQvNCw0YLQuNGA0L7QstCw0L3QuNC10Lwg0LIgbWFya2Rvd25cclxuICAgIGZ1bmN0aW9uIHJlcGxhY2VIdG1sR3RUb1N5bWJvbCh0ZXh0KSB7XHJcbiAgICAgICAgbGV0IGZpbmQgPSAnJmd0Oyc7XHJcbiAgICAgICAgbGV0IHJlID0gbmV3IFJlZ0V4cChmaW5kLCAnZycpO1xyXG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UocmUsICc+Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJlZm9ybWF0U3RyaW5nKHN0ciwgc3ltYm9sID0gJ3wnKSB7XHJcblxyXG4gICAgICAgIGxldCBzcGFjZSA9ICcnO1xyXG4gICAgICAgIC8v0LTQu9GPINGB0L/QuNGB0LrQsCDQvdCw0LTQviDRgSDQvdC+0LLQvtC5INGB0YLRgNC+0LrQuFxyXG4gICAgICAgIHN3aXRjaCAoc3ltYm9sKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJyonOlxyXG4gICAgICAgICAgICAgICAgc3BhY2UgPSAnXFxuJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL9CwINCyINGG0LjRgtCw0YLQtSAtINCyINC+0LTQvdGDINGB0YLRgNC+0LrRg1xyXG4gICAgICAgICAgICBjYXNlICcmJzpcclxuICAgICAgICAgICAgICAgIHNwYWNlID0gJyAnO1xyXG4gICAgICAgICAgICAgICAgc3RyID0gcmVwbGFjZUh0bWxHdFRvU3ltYm9sKHN0cik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coc3ltYm9sKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coKHN0ci5tYXRjaCgvXFxuL2cpfHxbXSkubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIC8vc3RyID0gc3RyLnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzdHIpO1xyXG4gICAgICAgICAgICAgICAgc3RyID0gJzxwPicgKyBzdHIgKyAnPC9wPidcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdHIgKyBzcGFjZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXBsYWNlVVJMV2l0aEhUTUxMaW5rcyh0ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgZXhwID0gLyhcXGIoaHR0cHM/fGZ0cHxmaWxlKTpcXC9cXC9bLUEtWjAtOSsmQCNcXC8lPz1+X3whOiwuO10qWy1BLVowLTkrJkAjXFwvJT1+X3xdKS9pZztcclxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKGV4cCwgJzxhIGhyZWY9XCIkMVwiIGNsYXNzPVwicmVndWxhci1saW5rXCI+JDE8L2E+Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7bW9keWZpQ29tbWVudHN9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgbW9keWZpQ29tbWVudHMnKTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb2R5ZmlDb21tZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvL9C/0L7QtNC60LvRjtGH0LXQvdC40LUg0YHRgtGA0L7QvdC90LXQs9C+IGpzINCyIGhlYWRcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZGpzKHVybCwgY2FsbGJhY2spIHtcclxuICAgIGxldCBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuICAgIGxldCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICBzLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgfTtcclxuICAgIHMuc3JjID0gdXJsO1xyXG4gICAgaGVhZC5hcHBlbmRDaGlsZChzKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL19sb2FkZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgY29tbWVudHNEZXNpZ24nKTtcclxufVxyXG5cclxuaW1wb3J0IHtnZXRBbGxDb21tZW50c1Jvd3N9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5cclxuZnVuY3Rpb24gY29tbWVudHNEZXNpZ24oKSB7XHJcbiAgICAvL9C/0LXRgNC10LTQtdC70LrQsCDQstC90LXRiNC90LXQs9C+INCy0LjQtNCwINC60LDQvNC10L3RgtC+0LJcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBjcmVhdGVUZW1wbGF0ZSgpO1xyXG5cclxuICAgIGxldCB0YmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtdGJsJyk7XHJcblxyXG4gICAgbGV0IHJvd3MgPSBnZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuXHJcbiAgICAvL3Jvd3NbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyb3dzWzBdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpO1xyXG4gICAgLy/RgdC60YDRi9Cy0LDRjiwg0LAg0L3QtSDRg9C00LDQu9GP0Y4g0YfRgtC+0LHRiyDQvdC1INC80LXQvdGP0YLRjCDRg9C20LUg0LjRgdC/0L7Qu9GM0LfRg9C10LzRi9C1INGE0YPQvdC60YbQuNC4XHJcbiAgICAvL9Cy0YvQsdC40YDQsNGO0YnQuNC1INGB0YLRgNC+0LrQuCDRgSDQutCw0LzQtdC90YLQsNC80Lgg0Lgg0LjQs9C90L7RgNC40YDRg9GO0YnQuNC1INC/0LXRgNCy0YPRjiDRgdGC0YDQvtC60YMuXHJcbiAgICAvL9CV0YHQu9C4INGD0LTQsNC70Y/RgtGMINGC0L4g0L/QvtC70YPRh9C40YLRgdGPINGH0YLQviDQv9C10YDQstGL0Lkg0LrQsNC80LXQvdGCINC90LUg0LHRg9C00LXRgiDQvtCx0YDQsNCx0LDRgtGL0LLQsNGC0YzRgdGPXHJcbiAgICByb3dzWzBdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLWVsZW0nKTtcclxuICAgIC8v0YIu0LouINCyINC00LDRgNGC0LUg0LTQvtCx0LDQstC40LvQuCDRgdGC0YDQvtC6INC/0YDQtdC00YvQtNGD0YnQsNGPINGB0YLRgNC+0LrQsCDQvdC1INGB0LrRgNGL0LLQsNC10YIg0YHRgtGA0L7QutGDINGBINC30LDQs9C+0LvQvtCy0LrQsNC80Lgg0YHRgtC+0LvQsdGG0L7QslxyXG4gICAgLy/Qv9C+0Y3RgtC+0LzRgyDQtdGJ0LVcclxuICAgIHRibC5xdWVyeVNlbGVjdG9yKCd0cicpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbi1lbGVtJyk7XHJcblxyXG4gICAgcm93cy5tYXAoZnVuY3Rpb24gKGl0ZW0sIGkpIHtcclxuICAgICAgICBsZXQgdGQgPSBBcnJheS5mcm9tKGl0ZW0ucXVlcnlTZWxlY3RvckFsbCgndGQnKSk7XHJcblxyXG4gICAgICAgIGxldCBibG9jayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50LXRlbXBsYXRlJykuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIGJsb2NrLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcclxuXHJcbiAgICAgICAgaXRlbS5hcHBlbmRDaGlsZChibG9jayk7XHJcblxyXG4gICAgICAgIGxldCByb3dzID0gYmxvY2sucXVlcnlTZWxlY3RvckFsbCgnLmItY29tbWVudF9fcm93Jyk7XHJcblxyXG4gICAgICAgIGxldCByb3cxID0gY3JlYXRlMXJvdyh0ZCwgaSk7XHJcbiAgICAgICAgcm93c1swXS5hcHBlbmRDaGlsZChyb3cxKTtcclxuXHJcbiAgICAgICAgcm93c1sxXS5hcHBlbmRDaGlsZChjcmVhdGUycm93KHRkKSk7XHJcbiAgICAgICAgcm93c1syXS5hcHBlbmRDaGlsZChjcmVhdGUzcm93KHRkKSk7XHJcblxyXG4gICAgICAgIGxldCBmaWxlcyA9IGNyZWF0ZTRyb3codGQpO1xyXG5cclxuICAgICAgICBpZiAoISFmaWxlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IHBpY3MgPSBbJ3BuZycsICdqcGcnLCAnZ2lmJ107XHJcblxyXG4gICAgICAgICAgICBmaWxlcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2xldCBleHQgPSBpdGVtLmhyZWYuc3BsaXQoJy4nKVsxXTtcclxuICAgICAgICAgICAgICAgIGxldCBleHQgPSBpdGVtLmhyZWYubGFzdEluZGV4T2YoJy4nKTtcclxuICAgICAgICAgICAgICAgIGV4dCA9IGl0ZW0uaHJlZi5zbGljZShleHQgKyAxLCBpdGVtLmhyZWYubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGljcy5pbmRleE9mKGV4dC50b0xvd2VyQ2FzZSgpKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUltZ1RodW1iKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gY3JlYXRlRG9jc1RodW1iKGV4dCwgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcm93c1szXS5hcHBlbmRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYmxvY2sucmVtb3ZlQ2hpbGQocm93c1szXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2PRgtGA0L7QutCwINGB0LrRgNGL0YLQsFxyXG4gICAgICAgIC8vcm93c1s0XS5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAvL3Jvd3NbNF0uYXBwZW5kQ2hpbGQoY3JlYXRlNXJvdyh0ZCkpO1xyXG5cclxuICAgICAgICAvL9GB0YLQsNC90L7QstC40YLRgdGPINCy0LjQtNC40LzQvtC5INC/0YDQuCDQvdCw0LLQtdC00LXQvdC40Lgg0LrRg9GA0YHQvtGA0LAg0L3QsCDQutCw0YDRgtC+0YfQutGDINC60LDQvNC10L3RgtCwXHJcbiAgICAgICAgYmxvY2suYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2hvd0FjdGlvbnNCdG4odGhpcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNob3dBY3Rpb25zQnRuKHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0ZC5tYXAoZnVuY3Rpb24gKHRkaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAodGRpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNoaWxkKHRkaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZTFyb3codGQsIHJvd251bWJlcikge1xyXG4gICAgICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW1Qcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgICBsZXQgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8v0LTQsNGC0LBcclxuICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtZGF0ZScpO1xyXG4gICAgICAgIHJvd0l0ZW0uaWQgPSAnY29tbWVudC1kYXRlJztcclxuICAgICAgICByb3dJdGVtLmlubmVySFRNTCA9IHRkWzNdLnRleHRDb250ZW50O1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAgICAgLy9pZCBjaGVja2JveFxyXG4gICAgICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQodGRbMF0uZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnaWQtY2hlY2tib3gnKTtcclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAgICAgLy/Qv9GA0LjQvtGA0LjRgtC10YIg0Lgg0YHRgNC+0Log0LjRgdC/0L7Qu9C90LXQvdC40Y9cclxuICAgICAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stcmFuaycpO1xyXG5cclxuICAgICAgICByb3dJdGVtLmlubmVySFRNTCA9IHRkWzhdLnRleHRDb250ZW50ICsgJyDQv9GA0LjQvtGA0LjRgtC10YInO1xyXG5cclxuICAgICAgICBsZXQgZGVhZGxpbmUgPSB0ZFs3XS50ZXh0Q29udGVudDtcclxuXHJcbiAgICAgICAgaWYgKGRlYWRsaW5lLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgcm93SXRlbS5pbm5lckhUTUwgPSByb3dJdGVtLmlubmVySFRNTCArICcuPGIgY2xhc3M9XCJkZWFkbGluZS1kYXRlXCI+0KHQtNCw0YLRjCAnICsgZGVhZGxpbmUgKyAnPC9iPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAgICAgLy/Qv9C40YHRjNC80LAs0YHRgdGL0LvQutCwLNGB0YLQsNGC0YPRgVxyXG4gICAgICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgncm93LXJpZ2h0Jyk7XHJcblxyXG4gICAgICAgIGxldCBzdGF0dXMgPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IHRkWzldLnRleHRDb250ZW50O1xyXG4gICAgICAgIHN0YXR1cy5jbGFzc0xpc3QuYWRkKCd0YXNrLXN0YXR1cycpO1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQoc3RhdHVzKTtcclxuXHJcbiAgICAgICAgbGV0IGxldHRlciA9IHRkWzFdLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpWzFdO1xyXG4gICAgICAgIGxldHRlci5jbGFzc0xpc3QuYWRkKCdsZXR0ZXItYWRkcicpO1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQobGV0dGVyKTtcclxuXHJcbiAgICAgICAgbGV0IGxpbmsgPSB0ZFsxXS5xdWVyeVNlbGVjdG9yQWxsKCdhJylbMV07XHJcbiAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWxpbmsnKTtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKGxpbmspO1xyXG5cclxuICAgICAgICAvL9C90L7QvNC10YAg0LrQvtC80LzQtdC90YLQsNGA0LjRj1xyXG4gICAgICAgIGxldCBubyA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgbm8uY2xhc3NMaXN0LmFkZCgnY29tbWVudC1ubycpO1xyXG4gICAgICAgIG5vLmlubmVySFRNTCA9IHJvd251bWJlcjtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKG5vKTtcclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmcmFnbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUycm93KHRkKSB7XHJcbiAgICAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgICAgICBsZXQgcm93SXRlbVByb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIGxldCByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtaW5mbycpO1xyXG5cclxuICAgICAgICAvL9Cw0LLRgtC+0YBcclxuICAgICAgICBsZXQgYXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGF1dGhvci5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWF1dGhvcicpO1xyXG4gICAgICAgIC8vYXV0aG9yLmlubmVySFRNTCA9ICfQkNCy0YLQvtGAIDxicj4nICsgdGRbNF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgYXV0aG9yLmlubmVySFRNTCA9IHRkWzRdLnRleHRDb250ZW50O1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQoYXV0aG9yKTtcclxuXHJcbiAgICAgICAgLy/QuNGB0L/QvtC70L3QuNGC0LXQu9GMXHJcbiAgICAgICAgbGV0IHdvcmtlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICB3b3JrZXIuY2xhc3NMaXN0LmFkZCgnY29tbWVudC13b3JrZXInKTtcclxuICAgICAgICAvL3dvcmtlci5pbm5lckhUTUwgPSAn0JjRgdC/0L7Qu9C90LjRgtC10LvRjCA8YnI+JyArIHRkWzZdLnRleHRDb250ZW50O1xyXG4gICAgICAgIHdvcmtlci5pbm5lckhUTUwgPSB0ZFs2XS50ZXh0Q29udGVudDtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHdvcmtlcik7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICBsZXQgd29ya1RpbWUgPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHdvcmtUaW1lLmNsYXNzTGlzdC5hZGQoJ3dvcmstdGltZScpO1xyXG5cclxuICAgICAgICBsZXQgdGltZVN0ciA9IHRkWzEwXS50ZXh0Q29udGVudC5zcGxpdCgnLycpO1xyXG5cclxuICAgICAgICAvKnRpbWVTdHJbMF0gPSBjcmVhdGVUaW1lVGl0bGVTdHJpbmcodGltZVN0clswXSwgWyfQl9Cw0YLRgNCw0YfQtdC90LAnLCAn0JfQsNGC0YDQsNGH0LXQvdC+JywgJ9CX0LDRgtGA0LDRh9C10L3QviddKStcclxuICAgICAgICAgJyAnKyBjcmVhdGVUaW1lU3RyaW5nKHRpbWVTdHJbMF0sIFsn0LzQuNC90YPRgtCwJywgJ9C80LjQvdGD0YLRiycsICfQvNC40L3Rg9GCJ10pOyovXHJcblxyXG4gICAgICAgIHRpbWVTdHJbMF0gPSAnPHNwYW4gY2xhc3M9XCJlbGFwc2VkLXRpbWVcIj4nICsgdGltZVN0clswXSArICcg0LzQuNC9Ljwvc3Bhbj4nO1xyXG4gICAgICAgIHdvcmtUaW1lLmlubmVySFRNTCA9IHRpbWVTdHJbMF07XHJcblxyXG4gICAgICAgIC8vIGlmIChpc05hTihOdW1iZXIodGltZVN0clsxXSkpKSB7XHJcbiAgICAgICAgLy8gICAgIHdvcmtUaW1lLmlubmVySFRNTCA9IHRpbWVTdHJbMF07XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIHRpbWVTdHJbMV0gPSAnINC40LcgJyt0aW1lU3RyWzFdO1xyXG4gICAgICAgIC8vICAgICB3b3JrVGltZS5pbm5lckhUTUwgPSB0aW1lU3RyLmpvaW4oJyAnKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHdvcmtUaW1lKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZTNyb3codGQpIHtcclxuXHJcbiAgICAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgICAgICBsZXQgcm93SXRlbVByb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIC8v0LrQvtC80LzQtdC90YLQsNGA0LjQuVxyXG4gICAgICAgIGxldCByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtYm9keScpO1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQodGRbNV0uZmlyc3RFbGVtZW50Q2hpbGQuY2xvbmVOb2RlKHRydWUpKTtcclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIC8v0L7QsdC10YDRgtC60LAg0LTQu9GPINC60L3QvtC/0L7QuiDQo9C00LDQu9C40YLRjCDQuCDQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFxyXG4gICAgICAgIGxldCByb3dJdGVtV3JhcCA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbVdyYXAuY2xhc3NMaXN0LmFkZCgnYWN0aW9ucy1idG4td3JhcCcpO1xyXG4gICAgICAgIC8v0YPQtNCw0LvQuNGC0YxcclxuXHJcbiAgICAgICAgaWYgKHRkWzExXS5maXJzdEVsZW1lbnRDaGlsZCkge1xyXG4gICAgICAgICAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdidG4tZGVsLWNvbW1lbnQnKTtcclxuICAgICAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh0ZFsxMV0uZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgICAgICByb3dJdGVtV3JhcC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v0YDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcclxuICAgICAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2J0bi1lZGl0LWNvbW1lbnQnKTtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzFdLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICByb3dJdGVtV3JhcC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbVdyYXApO1xyXG5cclxuICAgICAgICByZXR1cm4gZnJhZ21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlNHJvdyh0ZCkge1xyXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRkWzJdLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlNXJvdyh0ZCkge1xyXG4gICAgICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW1Qcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgICBsZXQgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8v0L7QsdC10YDRgtC60LAg0LTQu9GPINC60L3QvtC/0L7QuiDQo9C00LDQu9C40YLRjCDQuCDQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFxyXG4gICAgICAgIGxldCByb3dJdGVtV3JhcCA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbVdyYXAuY2xhc3NMaXN0LmFkZCgnYWN0aW9ucy1idG4td3JhcCcpO1xyXG5cclxuICAgICAgICAvL9GD0LTQsNC70LjRgtGMXHJcblxyXG4gICAgICAgIGlmICh0ZFsxMV0uZmlyc3RFbGVtZW50Q2hpbGQpIHtcclxuICAgICAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnYnRuLWRlbC1jb21tZW50Jyk7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQodGRbMTFdLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICAgICAgcm93SXRlbVdyYXAuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL9GA0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdidG4tZWRpdC1jb21tZW50Jyk7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh0ZFsxXS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgcm93SXRlbVdyYXAuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW1XcmFwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVJbWdUaHVtYihpdGVtKSB7XHJcbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgd3JhcC5jbGFzc0xpc3QuYWRkKCdpbWctdGh1bWInLCAnZmlsZS10aHVtYicpO1xyXG5cclxuICAgIGxldCBwaWMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIHBpYy5zcmMgPSBpdGVtLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG4gICAgcGljLmNsYXNzTGlzdC5hZGQoJ3RodW1iLXBpYycpO1xyXG5cclxuICAgIC8vaXRlbS5jbGFzc0xpc3QuYWRkKCdpbWctdGh1bWInLCAnZmlsZS10aHVtYicpO1xyXG4gICAgaXRlbS5hcHBlbmRDaGlsZChwaWMpO1xyXG4gICAgbGV0IHRpdGxlID0gZ2V0QXR0YWNoVGl0bGUoaXRlbSk7XHJcbiAgICB3cmFwLmFwcGVuZENoaWxkKGl0ZW0pO1xyXG4gICAgd3JhcC5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBiaWdwaWMgPSBwaWMuY2xvbmVOb2RlKGZhbHNlKTtcclxuICAgICAgICBiaWdwaWMuY2xhc3NMaXN0LmFkZCgnbGFyZ2UtcGljLXByZXZpZXcnKTtcclxuICAgICAgICBiaWdwaWMuY2xhc3NMaXN0LnJlbW92ZSgndGh1bWItcGljJyk7XHJcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChiaWdwaWMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5xdWVyeVNlbGVjdG9yKCcubGFyZ2UtcGljLXByZXZpZXcnKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gd3JhcDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRG9jc1RodW1iKGV4dCwgaXRlbSkge1xyXG4gICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdkb2MtdGh1bWInLCAnZmlsZS10aHVtYicpO1xyXG4gICAgaXRlbS5hcHBlbmRDaGlsZChnZXRBdHRhY2hUaXRsZShpdGVtKSk7XHJcbiAgICBpdGVtLnJlbW92ZUNoaWxkKGl0ZW0uZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgcmV0dXJuIGl0ZW07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEF0dGFjaFRpdGxlKGl0ZW0pIHtcclxuICAgIGxldCB0aXRsZSA9IGl0ZW0uZmlyc3RFbGVtZW50Q2hpbGQudGl0bGU7XHJcbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgd3JhcC50ZXh0Q29udGVudCA9IHRpdGxlO1xyXG4gICAgd3JhcC5jbGFzc0xpc3QuYWRkKCdhdHRhY2gtdGl0bGUnKTtcclxuICAgIHJldHVybiB3cmFwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUZW1wbGF0ZSgpIHtcclxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcclxuICAgIGxldCBibG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYmxvY2suY2xhc3NMaXN0LmFkZCgnYi1jb21tZW50Jyk7XHJcbiAgICBibG9jay5pZCA9ICdjb21tZW50LXRlbXBsYXRlJztcclxuXHJcbiAgICBsZXQgYmxvY2tSb3c7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICBibG9ja1JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGJsb2NrUm93LmNsYXNzTGlzdC5hZGQoJ2ItY29tbWVudF9fcm93JywgJ2ItY29tbWVudF9fcm93XycgKyBpKTtcclxuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChibG9ja1JvdylcclxuICAgIH1cclxuXHJcbiAgICB3cmFwLmFwcGVuZENoaWxkKGJsb2NrKTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdyYXApO1xyXG5cclxuICAgIHJldHVybiB3cmFwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93QWN0aW9uc0J0bihjYW1tZW50KSB7XHJcbiAgICBsZXQgYnRucyA9IGNhbW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGlvbnMtYnRuLXdyYXAnKTtcclxuICAgIGJ0bnMuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtdmlzaWJsZScpO1xyXG59XHJcblxyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vcGNzcy9jb21tZW50c0Rlc2lnbi5wY3NzJztcclxuXHJcbmV4cG9ydCB7Y29tbWVudHNEZXNpZ259O1xyXG5cclxuaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpe1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIGNvbW1lbnRzRGVzaWduJyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21tZW50c0Rlc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vY29tbWVudHNEZXNpZ24ucGNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi9jb21tZW50c0Rlc2lnbi5wY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL2NvbW1lbnRzRGVzaWduLnBjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Bjc3MvY29tbWVudHNEZXNpZ24ucGNzc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmItY29tbWVudF9fcm93Omxhc3QtY2hpbGR7cGFkZGluZy1ib3R0b206MmVtfS5jb21tZW50LXdyYXAgcDpvbmx5LW9mLXR5cGV7bWFyZ2luOjB9LmNvbW1lbnQtd3JhcCBwOmxhc3QtY2hpbGR7bWFyZ2luLWJvdHRvbTowfSNjb21tZW50cy10Ymx7bWFyZ2luOmF1dG87cGFkZGluZzozZW0gMDtiYWNrZ3JvdW5kOiNmMGYwZjB9I2NvbW1lbnRzLXRibCwjY29tbWVudHMtdGJsIHRib2R5LCNjb21tZW50cy10YmwgdHJ7ZGlzcGxheTpibG9ja30jY29tbWVudHMtdGJsIHRyOm5vdCg6bGFzdC1jaGlsZCl7bWFyZ2luLWJvdHRvbToyZW19LmNvbW1lbnQtYm9keXt3aWR0aDoxMDAlfS5jb21tZW50LXdyYXAgcHtsaW5lLWhlaWdodDoxLjRcXHJcXG5cXHJcXG4gICAgICAgIC8qXFxyXFxuICAgICAgICAvL9Cz0LTQtS3RgtC+INGC0LDQutC4INCy0YHRgtCw0LLQu9GP0Y7RgtGB0Y8g0LvQuNGI0L3QuNC1INC/0LXRgNC10LLQvtC00Ysg0YHRgtGA0L7QulxcclxcbiAgICAgICAgLy/RgdC00LXQu9Cw0Y4g0YLQsNC60L7QuSDQs9GA0Y/Qt9C90YvQuSDRhdCw0LpcXHJcXG4gICAgICAgICovXFxyXFxuICAgICAgICAvKiYgYnI6Zmlyc3QtY2hpbGQsXFxyXFxuICAgICAgICAmIGJyOmxhc3QtY2hpbGR7XFxyXFxuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgICAgIH0qL30uY29tbWVudC13cmFwIHA6Zmlyc3QtY2hpbGR7bWFyZ2luLXRvcDowfS5iLWNvbW1lbnR7bWF4LXdpZHRoOjcyMHB4O21hcmdpbjphdXRvO2JhY2tncm91bmQ6I2ZhZmFmYTtib3gtc2hhZG93OjAgMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCA1cHggMCByZ2JhKDAsMCwwLC4xMiksMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMik7d2lkdGg6MTAwJTtmb250LXNpemU6MTJweDtcXHJcXG4gICAgLypkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWZsb3c6IGNvbHVtbiB3cmFwOyovcG9zaXRpb246cmVsYXRpdmU7Ym94LXNpemluZzpib3JkZXItYm94fS5iLWNvbW1lbnQuYi1jb21tZW50X25vdGlmeXttYXJnaW4tdG9wOjJlbTtwYWRkaW5nOjJlbTtjb2xvcjojMzE3MDhmO2JhY2tncm91bmQ6I2Q5ZWRmNztib3JkZXI6MXB4IHNvbGlkICNiY2U4ZjF9LmItY29tbWVudC5iLWNvbW1lbnRfbm90aWZ5IC5jb21tZW50cy11cGRhdGUtbGlua3tkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nLWxlZnQ6MWVtO2NvbG9yOmluaGVyaXR9LmItY29tbWVudF9fcm93e3BhZGRpbmc6MWVtIDJlbTtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstbXMtZmxleC1mbG93OnJvdyB3cmFwO2ZsZXgtZmxvdzpyb3cgd3JhcDtwb3NpdGlvbjpyZWxhdGl2ZX0uYi1jb21tZW50X19yb3c6Zmlyc3QtY2hpbGR7cGFkZGluZy10b3A6MmVtfS5iLWNvbW1lbnRfX3JvdzpmaXJzdC1jaGlsZCAucm93LXJpZ2h0e3RvcDoyZW19XFxyXFxuXFxyXFxuLyovLzEgcm93INGI0LDQv9C60LAqLy5iLWNvbW1lbnRfX3Jvd18we2NvbG9yOmdyYXl9LnRhc2stcmFuaywudGFzay1zdGF0dXN7cGFkZGluZzowIC41ZW0gMCAyZW19LmRlYWRsaW5lLWRhdGV7cGFkZGluZy1sZWZ0OjFlbX0uaWQtY2hlY2tib3h7cG9zaXRpb246YWJzb2x1dGU7dmlzaWJpbGl0eTpoaWRkZW47ei1pbmRleDotMX0uY29tbWVudC1saW5rLC5jb21tZW50LW5ve21hcmdpbi1yaWdodDowIWltcG9ydGFudH1cXHJcXG5cXHJcXG4vKi8vMiByb3cg0LDQstGC0L7RgCAtINC40YHQv9C+0LvQvdC40YLQtdC70YwqLy5iLWNvbW1lbnRfX3Jvdy5iLWNvbW1lbnRfX3Jvd18xe3BhZGRpbmctdG9wOjA7LW1zLWZsZXgtcGFjazpqdXN0aWZ5O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2NvbG9yOmdyYXl9LmNvbW1lbnQtaW5mbz5zcGFue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOnRvcH0uY29tbWVudC1hdXRob3J7cGFkZGluZy1yaWdodDoyZW07cG9zaXRpb246cmVsYXRpdmV9LmNvbW1lbnQtYXV0aG9yOmFmdGVye2NvbnRlbnQ6XFxcIlxcXFwyMTkyXFxcIjtwb3NpdGlvbjpyZWxhdGl2ZTtsZWZ0OjFlbX1cXHJcXG5cXHJcXG4vKi8vMyByb3cg0YLQtdC60YHRgiDQutCw0LzQtdC90YLQsCovLmItY29tbWVudF9fcm93XzJ7Zm9udC1zaXplOjE0cHg7YmFja2dyb3VuZDojZmZmO2JvcmRlci10b3A6MXB4IHNvbGlkIGhzbGEoMCwwJSw2MyUsLjIpO2JvcmRlci1ib3R0b206MXB4IHNvbGlkIGhzbGEoMCwwJSw2MyUsLjIpO3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn1cXHJcXG5cXHJcXG4vKtC4INC60L3QvtC/0LrQuCDQo9C00LDQu9C40YLRjCwg0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YwqLy5hY3Rpb25zLWJ0bi13cmFwe3BhZGRpbmc6MWVtO3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO3JpZ2h0OjA7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzfS5hY3Rpb25zLWJ0bi13cmFwLmlzLXZpc2libGV7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEwMCUpfS5idG4tZGVsLWNvbW1lbnQsLmJ0bi1lZGl0LWNvbW1lbnR7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO2hlaWdodDoyNHB4O2xpbmUtaGVpZ2h0OjI0cHg7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxfS5idG4tZWRpdC1jb21tZW50e1xcclxcbiAgICAvKndpZHRoOiAxNDBweDsqL21hcmdpbi1sZWZ0Oi41ZW07XFxyXFxuICAgIC8qYm9yZGVyOiAxcHggc29saWQgI0FEQURBRDsqL3RvcDozcHh9LmJ0bi1kZWwtY29tbWVudHt3aWR0aDo3MHB4XFxyXFxuICAgIC8qd2lkdGg6IDEwMHB4OyovfVxcclxcblxcclxcbi8qLmJ0bi1lZGl0LWNvbW1lbnQ6YWZ0ZXIsKi8uYnRuLWRlbC1jb21tZW50OmFmdGVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3otaW5kZXg6LTE7Y29udGVudDpcXFwiXFxcXDQyM1xcXFw0MzRcXFxcNDMwXFxcXDQzQlxcXFw0MzhcXFxcNDQyXFxcXDQ0Q1xcXCI7Y29sb3I6I2NjYztsaW5lLWhlaWdodDpub3JtYWw7Ym9yZGVyLWJvdHRvbToxcHggc29saWR9XFxyXFxuXFxyXFxuLyouYnRuLWVkaXQtY29tbWVudDphZnRlciB7XFxyXFxuICAgIGNvbnRlbnQ6ICfQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjCc7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNFMUUxRTE7XFxyXFxufSovXFxyXFxuXFxyXFxuLyouYnRuLWVkaXQtY29tbWVudCBpbWcsKi8uYnRuLWRlbC1jb21tZW50IGltZ3tkaXNwbGF5Om5vbmV9XFxyXFxuXFxyXFxuLyouYnRuLWVkaXQtY29tbWVudCBhLCovLmJ0bi1kZWwtY29tbWVudCBhe3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246YWJzb2x1dGV9XFxyXFxuXFxyXFxuLyovLzQgcm93INGE0LDQudC70YsqLy5iLWNvbW1lbnRfX3Jvdy5iLWNvbW1lbnRfX3Jvd18ze3BhZGRpbmctdG9wOjEuNWVtO3BhZGRpbmctYm90dG9tOjEuNWVtOy1tcy1mbGV4LWFsaWduOnN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9XFxyXFxuXFxyXFxuLyovLzUgcm93INC/0L7QtNCy0LDQuyovLmItY29tbWVudF9fcm93XzMrLmItY29tbWVudF9fcm93XzR7Ym9yZGVyLXRvcDoxcHggc29saWQgaHNsYSgwLDAlLDYzJSwuMil9LmItY29tbWVudF9fcm93LmItY29tbWVudF9fcm93XzR7LW1zLWZsZXgtcGFjazplbmQ7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfVxcclxcblxcclxcbi8qLS0tLSovLnJvdy1yaWdodHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MWVtO3JpZ2h0OjJlbX0ucm93LXJpZ2h0Pip7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfS5yb3ctcmlnaHQ+Om5vdCg6bGFzdC1jaGlsZCl7bWFyZ2luLXJpZ2h0Oi43ZW19LmltZy10aHVtYnttYXgtd2lkdGg6MTUwcHh9LmltZy10aHVtYiBpbWc6Zmlyc3QtY2hpbGR7ZGlzcGxheTpub25lfS5pbWctdGh1bWI+YXtkaXNwbGF5OmJsb2NrfS5pbWctdGh1bWIgLmF0dGFjaC10aXRsZXttYXJnaW4tdG9wOi4zZW19LnRodW1iLXBpY3t3aWR0aDoxMDAlO1xcclxcbiAgICAvKmhlaWdodDogY2FsYygxMDAlIC0gMmVtKTsqL29iamVjdC1maXQ6Y292ZXI7bWF4LWhlaWdodDoyMDBweDtib3JkZXI6MXB4IHNvbGlkICNjY2N9XFxyXFxuXFxyXFxuLyrQsdC+0LvRjNGI0LDRjyDQutCw0YDRgtC40L3QutCwLCDQstGB0YLQsNCy0LvRj9C10YLRgdGP0LIg0LHQu9C+0Log0L/RgNC4INC90LDQstC10LTQtdC90LjQuCDQvdCwINC/0YDQtdCy0YzRjiovLmxhcmdlLXBpYy1wcmV2aWV3e21heC13aWR0aDo0MHZ3O2JvcmRlcjoxcHggc29saWQgZ3JheTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6OTAlO2xlZnQ6MDtcXHJcXG4gICAgLypsZWZ0OiA1MCU7Ki9cXHJcXG4gICAgLyp0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7Ki96LWluZGV4OjF9LmRvYy10aHVtYnttYXgtd2lkdGg6MTUwcHg7YmFja2dyb3VuZDojZjNmM2YzO2ZvbnQtc2l6ZToxMXB4O2JvcmRlcjoxcHggc29saWQgI2NjYztcXHJcXG4gICAgLypsaW5lLWhlaWdodDogNThweDsqL3RleHQtYWxpZ246Y2VudGVyO3RleHQtZGVjb3JhdGlvbjpub25lO2NvbG9yOmluaGVyaXR9LmRvYy10aHVtYiAuYXR0YWNoLXRpdGxle3dpZHRoOjEwMCU7cGFkZGluZzowIC41ZW07bGluZS1oZWlnaHQ6MS42O3dvcmQtYnJlYWs6YnJlYWstYWxsO2JveC1zaXppbmc6Ym9yZGVyLWJveDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5maWxlLXRodW1iey1tcy1mbGV4OjEgMSAyNSU7ZmxleDoxIDEgMjUlO21pbi1oZWlnaHQ6NzBweDtwb3NpdGlvbjpyZWxhdGl2ZX0uZmlsZS10aHVtYjpudGgtY2hpbGQobis3KXttYXJnaW4tdG9wOjJlbX0uZmlsZS10aHVtYjpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1yaWdodDoxZW19LmF0dGFjaC10aXRsZXttYXgtd2lkdGg6MTUwcHg7dGV4dC1hbGlnbjpjZW50ZXI7bGluZS1oZWlnaHQ6bm9ybWFsO3dvcmQtYnJlYWs6YnJlYWstYWxsfSNjb21tZW50cy10YmwgdHI6bGFzdC1jaGlsZCAuYi1jb21tZW50X19yb3dfMCwjY29tbWVudHMtdGJsIHRyOmxhc3QtY2hpbGQgLmItY29tbWVudF9fcm93XzF7Y29sb3I6IzAwMH1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3tcImltcG9ydExvYWRlcnNcIjoxfSEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIhLi9zcmMvcGNzcy9jb21tZW50c0Rlc2lnbi5wY3NzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCBjYWxjdWxhdGVFbGFwc2VkVGltZScpO1xyXG59XHJcblxyXG4vL9C60LDQu9GM0LrRg9C70Y/RgtC+0YAg0LIg0L/QvtC70LUg0LLQstC+0LTQsCDQt9Cw0YLRgNCw0YfQtdC90L3QvtCz0L4g0LLRgNC10LzQtdC90LhcclxuZnVuY3Rpb24gY2FsY3VsYXRlRWxhcHNlZFRpbWUoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IHRpbWVFbGFwc2VkRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BlbmRlZF90aW1lJyk7XHJcblxyXG4gICAgaWYoIXRpbWVFbGFwc2VkRmllbGQpe1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygn0J3QtSDQvdCw0LnQtNC10L3QviDQv9C+0LvQtSDQstCy0L7QtNCwINCy0YDQtdC80LXQvdC4INCy0YvQv9C+0LvQvdC10L3QuNGPJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINCj0LTQsNC70LXQvdC40LUg0L7QsdGA0LDQsdC+0YLRh9C40LrQsCDQvdCw0LbQsNGC0LjRjyDQutC70LDQstC40Ygg0LTQu9GPINC/0L7Qu9GPICdzcGVuZGVkX3RpbWUnXHJcbiAgICB0aW1lRWxhcHNlZEZpZWxkLm9ua2V5dXAgPSBudWxsO1xyXG5cclxuICAgIC8vINCU0L7QsdCw0LLQu9C10L3QuNC1INGB0L7QsdGL0YLQuNGPINC00LvRjyDQstGL0YfQuNGB0LvQtdC90LjRjyDQt9Cw0YLRgNCw0YfQtdC90L3QvtCz0L4g0LLRgNC10LzQtdC90Lgg0LTQu9GPINC/0L7Qu9GPICdzcGVuZGVkX3RpbWUnXHJcbiAgICB0aW1lRWxhcHNlZEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgY3VyX3ZhbHVlID0gdGhpcy52YWx1ZTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY3VyX3ZhbHVlID0gZXZhbChjdXJfdmFsdWUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQntGI0LjQsdC60LAg0LLRi9GH0LjRgdC70LXQvdC40Y8g0LfQsNGC0YDQsNGH0LXQvdC90L7Qs9C+INCy0YDQtdC80LXQvdC4LiDQmNGB0L/QvtC70YzQt9GD0LnRgtC1INGH0LjRgdC70LAg0Lgg0LfQvdCw0LrQuCDCqyvCuywgwqstwrssIMKrKsK7LCDCqy/CuyDQuCDRgdC60L7QsdC60LhcIik7XHJcblxyXG4gICAgICAgICAgICBjdXJfdmFsdWUgPSBudWxsO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIGlmICgoY3VyX3ZhbHVlICE9PSBudWxsKSAmJiAoIWlzTmFOKGN1cl92YWx1ZSkpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY3VyX3ZhbHVlID0gTWF0aC5yb3VuZChjdXJfdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjdXJfdmFsdWUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi0J7RgtGA0LjRhtCw0YLQtdC70YzQvdC+0LUg0LjQu9C4INC90YPQu9C10LLQvtC1INC30L3QsNGH0LXQvdC40LUg0LLRgNC10LzQtdC90LhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyX3ZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY3VyX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBtaW5Ub0RheXModGltZUluTWludXRlcywgZGF5SW5Ib3VycyA9IDgpIHtcclxuLy8gICAgIGxldCByZXRTdHIgPSBcIlwiO1xyXG4vL1xyXG4vLyAgICAgaWYgKCh0aW1lSW5NaW51dGVzICE9PSBudWxsKSAmJiAoIWlzTmFOKHRpbWVJbk1pbnV0ZXMpKSAmJiAodGltZUluTWludXRlcyA+IDApKSB7XHJcbi8vICAgICAgICAgZGF5SW5Ib3VycyA9IGRheUluSG91cnMgPDwgMDtcclxuLy8gICAgICAgICBpZiAoKGRheUluSG91cnMgPT09IHVuZGVmaW5lZCkgfHwgKGRheUluSG91cnMgPT09IG51bGwpIHx8IChpc05hTihkYXlJbkhvdXJzKSkgfHwgKGRheUluSG91cnMgPCAxKSkgZGF5SW5Ib3VycyA9IDI0O1xyXG4vLyAgICAgICAgIGxldCB0RCwgdEgsIHRNO1xyXG4vLyAgICAgICAgIHREID0gKHRpbWVJbk1pbnV0ZXMgLyBkYXlJbkhvdXJzIC8gNjApIDw8IDA7XHJcbi8vICAgICAgICAgcmV0U3RyICs9IHREID4gMCA/IHREICsgXCIg0LQuIFwiIDogXCJcIjtcclxuLy8gICAgICAgICB0aW1lSW5NaW51dGVzIC09IHREICogZGF5SW5Ib3VycyAqIDYwO1xyXG4vLyAgICAgICAgIHRIID0gKHRpbWVJbk1pbnV0ZXMgLyA2MCkgPDwgMDtcclxuLy8gICAgICAgICByZXRTdHIgKz0gdEggPiAwID8gdEggKyBcIiDRhy4gXCIgOiBcIlwiO1xyXG4vLyAgICAgICAgIHRpbWVJbk1pbnV0ZXMgLT0gdEggKiA2MDtcclxuLy8gICAgICAgICB0TSA9IHRpbWVJbk1pbnV0ZXMgPDwgMDtcclxuLy8gICAgICAgICByZXRTdHIgKz0gdE0gKyBcIiDQvNC40L0uXCIgKyBcIiAoXCIgKyBkYXlJbkhvdXJzICsgXCIt0YfQsNGB0L7QstC+0Lkg0LTQtdC90YwpXCI7XHJcbi8vICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIHJldFN0ciArPSBcItCn0YLQvi3RgtC+INGB0L4g0LLRgNC10LzQtdC90LXQvCDQvdC1INGC0LDQuiA6KFwiO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgcmV0dXJuIHJldFN0cjtcclxuLy8gfVxyXG5cclxuZXhwb3J0IHtjYWxjdWxhdGVFbGFwc2VkVGltZX07XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBjYWxjdWxhdGVFbGFwc2VkVGltZScpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2FsY3VsYXRlRWxhcHNlZFRpbWUuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIGdvVG9UYXNrRGF0YWxpc3QnKTtcclxufVxyXG5cclxuaW1wb3J0IHtnZXRUYXNrSWQsZ2V0VGFza0hlYWR9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5cclxuZnVuY3Rpb24gZ29Ub1Rhc2tEYXRhbGlzdCgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgdGFza0lkID0gZ2V0VGFza0lkKCk7XHJcblxyXG4gICAgbGV0IHRhc2tUaXRsZSA9IGdldFRhc2tIZWFkKCkudGl0bGU7XHJcblxyXG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhbGlzdCcpKSB8fCBbXTtcclxuICAgIGRhdGEgPSBhcHBlbmRJZChkYXRhKTtcclxuXHJcbiAgICAvL9C10YHQu9C4INC90LAg0YHRgtGA0LDQvdC40YbQtSDQtdGB0YLRjCDQt9Cw0LPQvtC70L7QstC+0Log0LfQsNC00LDRh9C4XHJcbiAgICAvLyAtINC/0YDQvtCy0LXRgNC40YLRjCDQtdGB0YLRjCDQu9C4INC+0L3QsCDQsiDRgdC/0LjRgdC60LVcclxuICAgIGlmICh0YXNrVGl0bGUpIHtcclxuXHJcbiAgICAgICAgbGV0IG5ld2RhdGEgPSB7XCJpZFwiOiB0YXNrSWQsIFwidGl0bGVcIjogdGFza1RpdGxlICsgJyAnICsgdGFza0lkfTtcclxuXHJcbiAgICAgICAgZGF0YSA9IGFwcGVuZElkKGRhdGEsIG5ld2RhdGEpO1xyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGF0YWxpc3QnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/RgdC+0LfQtNCw0LwgZGF0YWxpc3RcclxuICAgIGxldCBkYXRhbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RhdGFsaXN0Jyk7XHJcbiAgICBkYXRhbGlzdC5pZCA9ICdkbC1nb3RvdGFzayc7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRhdGFsaXN0KTtcclxuXHJcbiAgICAvL9GB0LLRj9C30LDRgtGMIGRhdGFsaXN0INGBINC/0L7Qu9C10Lwg0LLQstC+0LTQsCBpZCDQt9Cw0LTQsNGH0LhcclxuICAgIGxldCBpZEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvVG8nKTtcclxuICAgIGlkRmllbGQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgaWRGaWVsZC5zZXRBdHRyaWJ1dGUoJ2xpc3QnLCAnZGwtZ290b3Rhc2snKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgICBvcC52YWx1ZSA9IGRhdGFbaV0uaWQ7XHJcbiAgICAgICAgb3AubGFiZWwgPSBkYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgIGRhdGFsaXN0LmFwcGVuZENoaWxkKG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhcHBlbmRJZChhcnIsIG5ld2RhdGEgPSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChuZXdkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGVjayA9IGFyci5zb21lKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pZCA9PT0gbmV3ZGF0YS5pZDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChuZXdkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFyci5sZW5ndGggPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgYXJyLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Z29Ub1Rhc2tEYXRhbGlzdH07XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBnb1RvVGFza0RhdGFsaXN0Jyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9nb1RvVGFzay5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgY291bnRXb3JrZXJUaW1lJyk7XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0QWxsQ29tbWVudHNSb3dzLGdldEFsbFdvcmtlcnMsZ2V0Um93VGltZVN0cmluZ30gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcbmltcG9ydCB7Y3JlYXRlSVNPRGF0ZSxlbGltaW5hdGVEdXBsaWNhdGVzLGRhdGVGb3JtYXR0ZXIsZ2V0Um93RGF0ZVN0cmluZ30gZnJvbSAnLi9fdXRpbHMuanMnO1xyXG5cclxuZnVuY3Rpb24gY291bnRXb3JrZXJUaW1lKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgbGV0ICRpbnB1dF9ib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci10b29sYmFyJyk7XHJcbiAgICBsZXQgcm93cyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG4gICAgbGV0IHdvcmtlcnMgPSBnZXRBbGxXb3JrZXJzKCk7XHJcbiAgICBsZXQgZGF0ZXNfY29sbGVjdGlvbiA9IFtdO1xyXG4gICAgbGV0IGRhdGVfc3RyO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRhdGVfc3RyID0gcm93c1tpXS5jaGlsZHJlblszXS50ZXh0Q29udGVudDtcclxuICAgICAgICBkYXRlX3N0ciA9IGRhdGVfc3RyLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgZGF0ZXNfY29sbGVjdGlvbi5wdXNoKGNyZWF0ZUlTT0RhdGUoZGF0ZV9zdHJbMF0pKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZGF0ZXNfYXJyID0gZWxpbWluYXRlRHVwbGljYXRlcyhkYXRlc19jb2xsZWN0aW9uKTtcclxuXHJcbiAgICBsZXQgY3JlYXRlRGF0ZXNMaXN0ID0gZnVuY3Rpb24gKGlucHV0X2JveCwgZGF0ZXMpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlTGlzdChjc3NfaWQsIGNzc19jbGFzcykge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1NFTEVDVCcpO1xyXG4gICAgICAgICAgICBsaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCBjc3NfaWQpO1xyXG4gICAgICAgICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoY3NzX2NsYXNzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ3VzZXItdG9vbGJhcl9faXRlbScpO1xyXG5cclxuICAgICAgICBsZXQgc3RhcnRfbGlzdCA9IGNyZWF0ZUxpc3QoJ2RhdGUtc3RhcnQtbGlzdCcsICdkYXRlcy1saXN0Jyk7XHJcblxyXG4gICAgICAgIGxldCBlbmRfbGlzdCA9IGNyZWF0ZUxpc3QoJ2RhdGUtZW5kLWxpc3QnLCAnZGF0ZXMtbGlzdCcpO1xyXG5cclxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQlVUVE9OJyk7XHJcbiAgICAgICAgYnRuLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgICAgICBidG4udGV4dENvbnRlbnQgPSAn0J/QvtGB0YfQuNGC0LDRgtGMJztcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbiwgY2xuX29wdGlvbiwgbGlzdGRhdGU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGlzdGRhdGUgPSBkYXRlRm9ybWF0dGVyKHBhcnNlSW50KGRhdGVzW2ldLCAxMCkpO1xyXG4gICAgICAgICAgICBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdPUFRJT04nKTtcclxuICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBkYXRlc1tpXSk7XHJcbiAgICAgICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBsaXN0ZGF0ZS50b0xvY2FsZVN0cmluZygncnUnKTtcclxuICAgICAgICAgICAgY2xuX29wdGlvbiA9IG9wdGlvbi5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHN0YXJ0X2xpc3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgICAgICAgZW5kX2xpc3QuYXBwZW5kQ2hpbGQoY2xuX29wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJveC5hcHBlbmRDaGlsZChzdGFydF9saXN0KTtcclxuICAgICAgICBib3guYXBwZW5kQ2hpbGQoZW5kX2xpc3QpO1xyXG4gICAgICAgIGJveC5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdIMycpO1xyXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ9CX0LAg0LLRi9Cx0YDQsNC90L3Ri9C5INC/0LXRgNC40L7QtCc7XHJcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyLXRpdGxlJyk7XHJcbiAgICAgICAgYm94Lmluc2VydEJlZm9yZSh0aXRsZSwgYm94LmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgICAgICBpbnB1dF9ib3guaW5zZXJ0QmVmb3JlKGJveCwgaW5wdXRfYm94Lmxhc3RDaGlsZCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdib3gnOiBib3gsXHJcbiAgICAgICAgICAgICdzdGFydF9saXN0Jzogc3RhcnRfbGlzdCxcclxuICAgICAgICAgICAgJ2VuZF9saXN0JzogZW5kX2xpc3QsXHJcbiAgICAgICAgICAgICdidG4nOiBidG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB0aW1lbGlzdCA9IGNyZWF0ZVRpbWVMaXN0KHdvcmtlcnMsIHJvd3MpO1xyXG5cclxuICAgIGxldCAkdGltZWxpc3QgPSBjcmVhdGVUaW1lTGlzdFZpZXcodGltZWxpc3QpO1xyXG5cclxuICAgICR0aW1lbGlzdC5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXJfX2l0ZW0nKTtcclxuXHJcbiAgICAvL9C00L7QsdCw0LLQu9GP0LXQvCDRgdGC0YDQvtC60YMg0YEg0L7QsdGJ0LjQvCDQstGA0LXQvNC10L3QtdC8INCy0YHQtdGFINGB0L7RgtGA0YPQtNC90LjQutC+0LJcclxuICAgIC8v0YLRgNC10YLQuNC5INC/0LDRgNCw0LzQtdGC0YAgdHJ1ZSAtINGB0YLQsNCy0LjRgiDQutC70LDRgdGBLdC80LDRgNC60LXRgCDQstGL0LHRgNCw0L3QvdGL0YUg0YDQsNCx0L7RgtC90LjQutC+0LJcclxuICAgIGluc2VydFRvdGFsVGltZSgkdGltZWxpc3QsIHRpbWVsaXN0LCB0cnVlKTtcclxuXHJcbiAgICAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0LrQu9C40Log0L/QviDRgdGC0YDQvtC60LUg0LTQu9GPINC/0L7QtNGB0YfQtdGC0LAg0LLRgNC10LzQtdC90Lgg0LLRi9Cx0YDQsNC90L3Ri9GFINGA0LDQsdC+0YLQvdC40LrQvtCyXHJcbiAgICAkdGltZWxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RpbWUtbGlzdC10b3RhbCcpKXtcclxuICAgICAgICAgICAgY291bnRTZWxlY3RlZFdvcmtlcnNUaW1lKHRoaXMsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCAkdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdIMycpO1xyXG4gICAgJHRpdGxlLnRleHRDb250ZW50ID0gJ9CS0YHRjyDQt9Cw0LTQsNGH0LAnO1xyXG4gICAgJHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3VzZXItdG9vbGJhci10aXRsZScpO1xyXG4gICAgJHRpbWVsaXN0Lmluc2VydEJlZm9yZSgkdGl0bGUsICR0aW1lbGlzdC5maXJzdENoaWxkKTtcclxuICAgICR0aW1lbGlzdC5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXJfX2l0ZW0nKTtcclxuXHJcbiAgICBsZXQgZGF0ZV9saXN0cyA9IGNyZWF0ZURhdGVzTGlzdCgkaW5wdXRfYm94LCBkYXRlc19hcnIpO1xyXG5cclxuICAgIC8vINC00L7QsdCw0LLQu9GP0Y4g0YHQtdC70LXQutGC0Ysg0YEg0LTQsNGC0LDQvNC4IC0g0L/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LfQsCDQstGL0LHRgNCw0L3QvdGL0Lkg0L/QtdGA0LjQvtC0XHJcbiAgICBmaW5kVGltZUluRGF0ZXNSYW5nZShkYXRlX2xpc3RzLCB3b3JrZXJzLCByb3dzKTtcclxuXHJcbiAgICAkaW5wdXRfYm94Lmluc2VydEJlZm9yZSgkdGltZWxpc3QsICRpbnB1dF9ib3gubGFzdENoaWxkKTtcclxuXHJcbiAgICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjU1ODk3Ny9hamF4LWNyb3NzLWRvbWFpbi1jYWxsXHJcbn1cclxuXHJcbi8vINGB0L7Qt9C00LDQvdC40LUg0L7QsdGK0LXQutGC0LAg0YHQviDRgdC/0LjRgdC60L7QvCDRgdC+0YLRgNGD0LTQvdC60L7QsiDQuCDQstGA0LXQvNC10L3QuCDQutCw0LbQtNC+0LPQviDQsiDQt9Cw0LTQsNGH0LVcclxuZnVuY3Rpb24gY3JlYXRlVGltZUxpc3Qod29ya2Vycywgcm93cykge1xyXG5cclxuICAgIGxldCBudGltZSwgbmFtZSwgdHN1bTtcclxuICAgIGxldCB0aW1lbGlzdCA9IHt9O1xyXG5cclxuICAgIGZvciAobGV0IHMgPSAwOyBzIDwgd29ya2Vycy5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgIHRzdW0gPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbnRpbWUgPSBnZXRSb3dUaW1lU3RyaW5nKHJvd3NbaV0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJvd3NbaV0uY2hpbGRyZW5bNF0pIHtcclxuICAgICAgICAgICAgICAgIC8v0LTQviDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHJvd3NbaV0uY2hpbGRyZW5bNF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL9C/0L7RgdC70LUg0LfQsNC/0YPRgdC60LAgY2FtbWVudHNEZXNpZ24oKTtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSByb3dzW2ldLnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWF1dGhvcicpLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAod29ya2Vyc1tzXSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdHN1bSArPSBudGltZTtcclxuICAgICAgICAgICAgICAgIHRpbWVsaXN0W25hbWVdID0gdHN1bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGltZWxpc3Q7XHJcbn1cclxuXHJcbi8vINGB0L7Qt9C00LDQvdC40LUgaHRtbCDRjdC70LXQvNC10L3RgtCwINGB0L4g0YHQv9C40YHQutC+0Lwg0YHQvtGC0YDRg9C00L3QutC+0LIg0Lgg0LLRgNC10LzQtdC90Lgg0LrQsNC20LTQvtCz0L4g0LIg0LfQsNC00LDRh9C1XHJcbmZ1bmN0aW9uIGNyZWF0ZVRpbWVMaXN0VmlldyhkYXRhKSB7XHJcbiAgICBsZXQgJHRpbWVsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICAkdGltZWxpc3QuY2xhc3NMaXN0LmFkZCgndGltZS1saXN0Jyk7XHJcbiAgICAkdGltZWxpc3QuaWQgPSAnd29ya2Vycy10aW1lJztcclxuXHJcbiAgICBsZXQgbGlzdF9pdGVtO1xyXG4gICAgbGV0IHdvcmtlcnRpbWU7XHJcbiAgICBsZXQgdG90YWx0aW1lID0gMDtcclxuXHJcbiAgICBmb3IgKGxldCBrIGluIGRhdGEpIHtcclxuICAgICAgICB3b3JrZXJ0aW1lID0gZGF0YVtrXTtcclxuICAgICAgICB0b3RhbHRpbWUgKz0gd29ya2VydGltZTtcclxuICAgICAgICBsaXN0X2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgbGlzdF9pdGVtLmRhdGFzZXQud29ya2VydGltZSA9IHdvcmtlcnRpbWU7XHJcbiAgICAgICAgbGlzdF9pdGVtLmlubmVySFRNTCA9ICc8c3Bhbj4nICsgayArICc8L3NwYW4+IDxzcGFuPicgKyB3b3JrZXJ0aW1lICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgICR0aW1lbGlzdC5pbnNlcnRCZWZvcmUobGlzdF9pdGVtLCAkdGltZWxpc3QubGFzdENoaWxkKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJHRpbWVsaXN0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kVGltZUluRGF0ZXNSYW5nZShsaXN0cywgd29ya2Vycywgcm93cykge1xyXG4gICAgbGV0ICRzdGFydF9saXN0ID0gbGlzdHMuc3RhcnRfbGlzdDtcclxuICAgIGxldCAkZW5kX2xpc3QgPSBsaXN0cy5lbmRfbGlzdDtcclxuICAgIGxldCAkYm94ID0gbGlzdHMuYm94O1xyXG4gICAgbGV0ICRidG4gPSBsaXN0cy5idG47XHJcblxyXG4gICAgZnVuY3Rpb24gZmluZFJvd3NJblJhbmdlKHJvd3MsIHN0YXJ0LCBlbmQpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJvd3MuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtX2RhdGUgPSBnZXRSb3dEYXRlU3RyaW5nKGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW1fZGF0ZSA+PSBzdGFydCAmJiBpdGVtX2RhdGUgPD0gZW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBmaW5kX3Jvd3MgPSBmaW5kUm93c0luUmFuZ2Uocm93cywgJHN0YXJ0X2xpc3QudmFsdWUsICRlbmRfbGlzdC52YWx1ZSk7XHJcblxyXG4gICAgICAgIGxldCByYW5nZV90aW1lbGlzdCA9IGNyZWF0ZVRpbWVMaXN0KGdldFNlbGVjdGVkV29ya2VycygpLCBmaW5kX3Jvd3MpO1xyXG4gICAgICAgIGxldCAkcmFuZ2VfdGltZWxpc3QgPSBjcmVhdGVUaW1lTGlzdFZpZXcocmFuZ2VfdGltZWxpc3QpO1xyXG5cclxuICAgICAgICBpZiAoJGJveC5xdWVyeVNlbGVjdG9yKCcjcmFuZ2UtdGltZWxpc3QnKSkge1xyXG4gICAgICAgICAgICAkYm94LnJlbW92ZUNoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5nZS10aW1lbGlzdCcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRyYW5nZV90aW1lbGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3JhbmdlLXRpbWVsaXN0Jyk7XHJcblxyXG4gICAgICAgICRib3guYXBwZW5kQ2hpbGQoJHJhbmdlX3RpbWVsaXN0KTtcclxuXHJcbiAgICAgICAgaW5zZXJ0VG90YWxUaW1lKCRyYW5nZV90aW1lbGlzdCwgcmFuZ2VfdGltZWxpc3QpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNlbGVjdGVkV29ya2VycygpIHtcclxuICAgIGxldCBzZWxlY3RlZF93b3JrZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmtlcnMtdGltZScpLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3RlZCcpO1xyXG4gICAgbGV0IHNlbGVjdGVkX25hbWVzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZF93b3JrZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRfbmFtZXMucHVzaChzZWxlY3RlZF93b3JrZXJzW2ldLmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2VsZWN0ZWRfbmFtZXM7XHJcbn1cclxuXHJcbi8v0L/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LLRi9Cx0YDQsNC90L3Ri9GFINGD0YfQsNGB0YLQvdC40LrQvtCyINC30LDQtNCw0YfQuCAo0LjQtyDRgdC/0LjRgdC60LAg0LLRgdC10YUg0YPRh9Cw0YHRgtC90LjQutC+0LIpXHJcbmZ1bmN0aW9uIGNvdW50U2VsZWN0ZWRXb3JrZXJzVGltZShsaXN0LCBldmVudCkge1xyXG4gICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGxldCAkdG90YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd29ya2Vycy10aW1lLXRvdGFsJyk7XHJcbiAgICBsZXQgdG90YWwgPSBwYXJzZUludCgkdG90YWwuZGF0YXNldC50b3RhbHRpbWUpO1xyXG5cclxuICAgIHdoaWxlICh0YXJnZXQgIT09IGxpc3QpIHtcclxuICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09ICdQJykge1xyXG4gICAgICAgICAgICByZWNvdW50VG90YWwodGFyZ2V0LCAkdG90YWwsIHRvdGFsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVjb3VudFRvdGFsKGVsZW0sIHRvdGFsLCB0b3RhbHRpbWUpIHtcclxuICAgICAgICBsZXQgZWxlbXRpbWUgPSBwYXJzZUludChlbGVtLmRhdGFzZXQud29ya2VydGltZSk7XHJcblxyXG4gICAgICAgIC8v0LrQu9Cw0YHRgSBleGNsdWRlZCDQvdGD0LbQtdC9INC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuCDRgdC/0LjRgdC60LAg0YDQsNCx0L7RgtC90LjQutC+0LJcclxuICAgICAgICAvL9CyINCy0YvQstC+0LTQtSDQstGA0LXQvNC90Lgg0LfQsCDQv9C10YDQuNC+0LQgLSDQstGL0LLQvtC0INGC0L7Qu9GM0LrQviDQv9C+INCy0YvQsdGA0LDQvdC90YvQvCAoc2VsZWN0ZWQpINGA0LDQsdC+0YLQvdC40LrQsNC8XHJcbiAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdleGNsdWRlZCcpO1xyXG4gICAgICAgICAgICB0b3RhbHRpbWUgPSB0b3RhbHRpbWUgLSBlbGVtdGltZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZXhjbHVkZWQnKTtcclxuICAgICAgICAgICAgdG90YWx0aW1lID0gdG90YWx0aW1lICsgZWxlbXRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b3RhbC5pbm5lckhUTUwgPSB0b3RhbHRpbWU7XHJcbiAgICAgICAgdG90YWwuZGF0YXNldC50b3RhbHRpbWUgPSB0b3RhbHRpbWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vINC/0L7QtNGB0YfQtdGCINC+0LHRidC10LPQviDQstGA0LXQvNC10L3QuCDQstGB0LXRhSDRgdC+0YLRgNGD0LTQvdC40LrQvtCyINC00LvRjyDRgdC/0LjRgdC60LAg0YHQvtGC0YDRg9C00L3QuNC6LdCy0YDQtdC80Y9cclxuZnVuY3Rpb24gaW5zZXJ0VG90YWxUaW1lKHRpbWVsaXN0LCBkYXRhLCBhZGRtYXJrZXIpIHtcclxuICAgIGxldCB0b3RhbHRpbWUgPSAwO1xyXG4gICAgbGV0IHRvdGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5cclxuICAgIGZvciAobGV0IGsgaW4gZGF0YSkge1xyXG4gICAgICAgIHRvdGFsdGltZSArPSBkYXRhW2tdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhZGRtYXJrZXIpIHtcclxuICAgICAgICBsZXQgbGlzdF9pdGVtcyA9IHRpbWVsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ3AnKTtcclxuICAgICAgICAvL9C/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINCy0YHQtSDRgNCw0LHQvtGC0L3QuNC60Lgg0LLRi9Cx0YDQsNC90YssINGB0YfQuNGC0LDQtdGC0YHRjyDQvtCx0YnQtdC1INCy0YDQtdC80Y8g0L/QviDQstGB0LXQvFxyXG4gICAgICAgIC8v0LLRgdC10Lwg0LTQvtCx0LDQstC70Y/QtdC8INC60LvQsNGB0YEgc2VsZWN0ZWQg0L3Rg9C20L3Ri9C5INC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuCDRgdC/0LjRgdC60LBcclxuICAgICAgICAvL9C4INGH0YLQvtCx0Ysg0LLQuNC30YPQsNC70YzQvdC+INC+0YLQvNC10YLQuNGC0Ywg0LLRi9Cx0YDQsNC90L3Ri9GFINCyINGB0L/QuNGB0LrQtVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdF9pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsaXN0X2l0ZW1zW2ldLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvdGFsLmlubmVySFRNTCA9ICc8c3Bhbj7QktGB0LXQs9C+Ojwvc3Bhbj4gPHNwYW4gaWQ9XCJ3b3JrZXJzLXRpbWUtdG90YWxcIiBkYXRhLXRvdGFsdGltZT1cIicgKyB0b3RhbHRpbWUgKyAnXCI+JyArIHRvdGFsdGltZSArICc8L3NwYW4+JztcclxuICAgIHRvdGFsLmNsYXNzTGlzdC5hZGQoJ3RpbWUtbGlzdC10b3RhbCcpO1xyXG4gICAgdGltZWxpc3QuYXBwZW5kQ2hpbGQodG90YWwpO1xyXG5cclxuICAgIHJldHVybiB0b3RhbHRpbWU7XHJcbn1cclxuXHJcbmV4cG9ydCB7Y291bnRXb3JrZXJUaW1lfTtcclxuXHJcbmlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIGNvdW50V29ya2VyVGltZScpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY291bnRXb3JrZXJUaW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgdGFza0Zvb3RlckRlc2lnbicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrRm9vdGVyRGVzaWduKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy9uZXcgY29tbWVudFxyXG4gICAgbGV0IGNvbW1lbnRUYmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJsLW5ldy1jb21tZW50Jyk7XHJcbiAgICBsZXQgbmV3Q29tbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctY29tbWVudC13cmFwJyk7XHJcblxyXG4gICAgLy8g0LTQvtCx0LDQstC70Y4g0LfQsNCz0L7Qu9C+0LLQvtC6XHJcbiAgICBsZXQgbmV3Q29tbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIG5ld0NvbW1lbnRUaXRsZS50ZXh0Q29udGVudCA9ICfQndC+0LLRi9C5INC60L7QvNC80LXQvdGC0LDRgNC40LknO1xyXG4gICAgbmV3Q29tbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24tdGl0bGUnKTtcclxuICAgIG5ld0NvbW1lbnQuaW5zZXJ0QmVmb3JlKG5ld0NvbW1lbnRUaXRsZSwgbmV3Q29tbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XHJcblxyXG4gICAgLy8xINC/0LXRgNCy0LDRjyDRgdGC0YDQvtC60LAgLSDQuNGB0L/QvtC70L3QuNGC0LXQu9GMLCDRgdGC0LDRgtGD0YEsINC/0YDQuNC+0YDQuNGC0LXRglxyXG4gICAgLy/QsdC70L7QuiDQsiDQutC+0YLQvtGA0L7QvCDQsdGD0LTRg9GCINC/0L7Qu9GPINC00LvRjyDQstCy0L7QtNCwINC30LDRgtGA0LDRh9C10L3QvdC+0LPQviDQuCDQv9C70LDQvdC40YDRg9C10LzQvtCz0L4g0LLRgNC10LzQtdC90LhcclxuICAgIC8v0Lgg0LLRi9Cx0L7RgCDQv9GA0LjQvtGA0LjRgtC10YLQsFxyXG5cclxuICAgIGxldCByb3dJdGVtUHJvdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGxldCByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIGxldCByb3dzRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgLy/QuNGB0L/QvtC70L3QuNGC0LXQu9GMXHJcbiAgICBsZXQgZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50ZXJuYWxfd29ya2VyJyk7XHJcbiAgICBsZXQgd29ya2VyQmxvY2sgPSBmaWVsZC5wYXJlbnROb2RlO1xyXG4gICAgd29ya2VyQmxvY2suY2xhc3NMaXN0LmFkZCgnd29ya2VyLWJsb2NrJyk7XHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh3b3JrZXJCbG9jayk7XHJcblxyXG4gICAgLy/RgdGC0LDRgtGD0YFcclxuICAgIGxldCBzdGF0dXNUYmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJsLXN0YXR1cycpO1xyXG4gICAgbGV0IHN0YXR1c0xpc3QgPSBjcmVhdGVTdGF0dXNMaXN0KHN0YXR1c1RibCk7XHJcbiAgICBsZXQgYmxvY2sgPSBjcmVhdGVGaWVsZEFuZExhYmVsKCfQodGC0LDRgtGD0YEnLCBzdGF0dXNMaXN0KTtcclxuICAgIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ2Zyb3ctY29sLTItMScpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGJsb2NrKTtcclxuXHJcbiAgICAvL9C/0YDQuNC+0YDQuNGC0LXRglxyXG4gICAgZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHlfaWQnKTtcclxuICAgIGJsb2NrID0gY3JlYXRlRmllbGRBbmRMYWJlbCgn0J/RgNC40L7RgNC40YLQtdGCJywgZmllbGQpO1xyXG4gICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnZnJvdy1jb2wtMi0yJyk7XHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChibG9jayk7XHJcblxyXG4gICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWZpZWxkcy1yb3cnLCd0YXNrLXJvdy0xJyk7XHJcbiAgICByb3dJdGVtLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICAgIHJvd3NGcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAvLzIg0LLRgtC+0YDQsNGPINGB0YLRgNC+0LrQsCAtINCy0YDQtdC80Y8gKNC30LDRgtGA0LDRh9C10L3Qvi/Qv9C70LDQvdC40YDRg9C10LzQviksINC/0YDQvtC10LrRgiwg0YHRgNC+0LpcclxuXHJcbiAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1maWVsZHMtcm93JywndGFzay1yb3ctMicpO1xyXG5cclxuICAgIGxldCB0aW1lQmxvY2sgPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgdGltZUJsb2NrLmNsYXNzTGlzdC5hZGQoJ3RpbWUtYmxvY2snKTtcclxuXHJcbiAgICAvL9C30LDRgtGA0LDRh9C10L3QviDQstGA0LXQvNC10L3QuFxyXG4gICAgZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BlbmRlZF90aW1lJyk7XHJcbiAgICBibG9jayA9IGNyZWF0ZUZpZWxkQW5kTGFiZWwoJ9CX0LDRgtGA0LDRh9C10L3QvicsIGZpZWxkKTtcclxuICAgIHRpbWVCbG9jay5hcHBlbmRDaGlsZChibG9jayk7XHJcblxyXG4gICAgLy/Qv9C70LDQvdC40YDRg9C10LzQvtC1INCy0YDQtdC80Y9cclxuICAgIGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYW5fdGltZScpO1xyXG4gICAgYmxvY2sgPSBjcmVhdGVGaWVsZEFuZExhYmVsKCfQn9C70LDQvdC40YDRg9C10LzQvtC1JywgZmllbGQpO1xyXG4gICAgdGltZUJsb2NrLmFwcGVuZENoaWxkKGJsb2NrKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aW1lQmxvY2spO1xyXG5cclxuICAgIC8v0L/RgNC+0LXQutGCXHJcbiAgICBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGllbnRfaWQnKTtcclxuICAgIGxldCBwcm9qZWN0ID0gY3JlYXRlRmllbGRBbmRMYWJlbCgn0J/RgNC+0LXQutGCJywgZmllbGQpO1xyXG4gICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKCdmcm93LWNvbC0yLTEnKTtcclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHByb2plY3QpO1xyXG5cclxuICAgIC8v0YHRgNC+0LpcclxuICAgIGxldCBkZWFkbGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmRfZGF0ZScpLnBhcmVudE5vZGU7XHJcbiAgICBkZWFkbGluZS53aWR0aCA9ICcnO1xyXG4gICAgZGVhZGxpbmUuY2xhc3NMaXN0LmFkZCgnZGVhZGxpbmUtY2FsZW5kYXInLCdmcm93LWNvbC0yLTInKTtcclxuXHJcbiAgICAvL9GD0LHQuNGA0LDRjiDRgdC40LzQstC+0Lsg0L/QtdGA0LXQstC+0LTQsCDRgdGC0YDQvtC60LhcclxuICAgIGRlYWRsaW5lLnJlbW92ZUNoaWxkKGRlYWRsaW5lLnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdCcpLm5leHRTaWJsaW5nKTtcclxuXHJcbiAgICAvL9C60L3QvtC/0LrRgyDQpSAtINC+0YfQuNGB0YLQuNGC0Ywg0L/QvtC70LUgLSDRg9Cx0LjRgNCw0Y5cclxuICAgIC8vZGVhZGxpbmUucmVtb3ZlQ2hpbGQoZGVhZGxpbmUucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1idXR0b25dJykpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRmllbGRBbmRMYWJlbCgn0KHRgNC+0LonLCBkZWFkbGluZSkpO1xyXG5cclxuICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1maWVsZHMtcm93JywndGFzay1yb3ctMicpO1xyXG4gICAgcm93SXRlbS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICByb3dzRnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgLy8zINGC0YDQtdGC0YzRjyDRgdGC0YDQvtC60LAgLSDQtNC+0L/QvtC70L3QuNGC0LXQu9GM0L3Ri9C5INC10LzQtdC50Lsg0Lgg0YLQuNC/INC30LDQtNCw0YfQuFxyXG4gICAgLy/QtNC+0L/QvtC70L3QuNGC0LXQu9GM0L3Ri9C5INC10LzQtdC50LtcclxuICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWZpZWxkcy1yb3cnLCd0YXNrLXJvdy0zJyk7XHJcblxyXG4gICAgbGV0IHNlbmRMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZF9lbWFpbCcpO1xyXG5cclxuICAgIGxldCBhZGRFbWFpbCA9IHNlbmRMaXN0LnBhcmVudE5vZGU7XHJcbiAgICBhZGRFbWFpbC5jbGFzc0xpc3QuYWRkKCdhZGQtZW1haWwnKTtcclxuXHJcbiAgICBsZXQgYWRkRW1haWxMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICBhZGRFbWFpbExhYmVsLnRleHRDb250ZW50ID0gJ9Cf0L7Qu9GD0YfQsNGC0LXQu9C4INGA0LDRgdGB0YvQu9C60Lgg0L/QviDQv9C+0YfRgtC1JztcclxuICAgIGFkZEVtYWlsLmluc2VydEJlZm9yZShhZGRFbWFpbExhYmVsLGFkZEVtYWlsLmZpcnN0RWxlbWVudENoaWxkKTtcclxuXHJcbiAgICBsZXQgc2VuZExpc3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2V0RW1haWxBZGRyZXNzZXNCdXR0b24nKTtcclxuICAgIHNlbmRMaXN0QnRuLnZhbHVlID0gJ9Ca0L7QvNGDINC/0LjRgdGM0LzQsCc7XHJcbiAgICBhZGRFbWFpbC5hcHBlbmRDaGlsZChzZW5kTGlzdEJ0bik7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoYWRkRW1haWwpO1xyXG5cclxuICAgIC8v0YLQuNC/INC30LDQtNCw0YfQuFxyXG4gICAgbGV0IHRhc2tUeXBlQmxvY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvYmxlbV90eXBlJykucGFyZW50Tm9kZTtcclxuICAgIHRhc2tUeXBlQmxvY2suY2xhc3NMaXN0LmFkZCgndGFzay10eXBlJyk7XHJcblxyXG4gICAgbGV0IHRhc2tUeXBlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgdGFza1R5cGVMYWJlbC50ZXh0Q29udGVudCA9ICfQotC40L8g0LfQsNC00LDRh9C4JztcclxuICAgIHRhc2tUeXBlQmxvY2suaW5zZXJ0QmVmb3JlKHRhc2tUeXBlTGFiZWwsdGFza1R5cGVCbG9jay5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0YXNrVHlwZUJsb2NrKTtcclxuXHJcbiAgICByb3dJdGVtLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICAgIHJvd3NGcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAvLzQg0YfQtdGC0LLQtdGA0YLQsNGPINGB0YLRgNC+0LrQsCAtINC00L7QsdCw0LLQu9C10L3QuNC1INGE0LDQudC70L7QslxyXG4gICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmllbGRzLXJvdycsJ3Rhc2stcm93LTQnKTtcclxuXHJcbiAgICBsZXQgZXhpc3RBZGRGaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZpbGVJbnB1dHMnKTtcclxuICAgIGxldCBhZGRGaWxlc0Jsb2NrID0gZXhpc3RBZGRGaWxlLnBhcmVudE5vZGU7XHJcbiAgICBhZGRGaWxlc0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ2FkZC1maWxlcycpO1xyXG5cclxuICAgIGxldCBhZGRGaWxlc0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIGFkZEZpbGVzTGFiZWwuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbi10aXRsZScpO1xyXG4gICAgYWRkRmlsZXNMYWJlbC5pbm5lckhUTUwgPSAn0KTQsNC50LvRiyA8c3BhbiBjbGFzcz1cInMtaW5mb1wiPtC+0LHRidC40Lkg0L7QsdGK0LXQvCA8c3BhbiBpZD1cImZpbGVzLXRvdGFsXCI+0LTQviAzINCc0LE8L3NwYW4+PC9zcGFuPic7XHJcbiAgICAvL9CyIGlkPVwiZmlsZXMtdG90YWxcIiDQsdGD0LTQtdGCINC30LDQvNC10L3Rj9GC0YHRjyDRgtC10LrRgdGCINC60L7Qs9C00LAg0YTQsNC50LvRiyDQstGL0LHRgNC90YsgLSDQvtCx0YnQuNC5INC+0LHRitC10Lwg0LLRi9Cx0YDQsNC90L3Ri9GFINGE0LDQudC70L7QslxyXG4gICAgYWRkRmlsZXNCbG9jay5pbnNlcnRCZWZvcmUoYWRkRmlsZXNMYWJlbCxhZGRGaWxlc0Jsb2NrLmZpcnN0RWxlbWVudENoaWxkKTtcclxuXHJcbiAgICAvL9GN0YLRgyDRgdGB0YvQu9C60YMg0Y8g0YHQutGA0L7RjiDRgdGC0LjQu9GP0LzQuFxyXG4gICAgLy8gbGV0IGFkZEZpbGVJbnB1dCA9IGFkZEZpbGVzQmxvY2sucXVlcnlTZWxlY3RvcignYScpO1xyXG4gICAgLy8gYWRkRmlsZUlucHV0LnNldEF0dHJpYnV0ZSgnb25jbGljaycsJ2FkZEZpbGVJbnB1dChcIkZpbGVJbnB1dHNcIiknKTtcclxuXHJcbiAgICAvLyBhZGRGaWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgcmVtb3ZlRmlsZUlucHV0KGV4aXN0QWRkRmlsZSk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvL9Cx0LvQvtC6INCyINC60L7RgtC+0YDQvtC8INCx0YPQtNC10YIg0YHQv9C40YHQvtC6INC30LDQs9GA0YPQttC10L3QvdGL0YUg0YTQsNC50LvQvtCyXHJcbiAgICBsZXQgYWRkZWRGaWxlc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgYWRkZWRGaWxlc0xpc3QuaWQgPSAnZmlsZXMtbGlzdCc7XHJcbiAgICBhZGRlZEZpbGVzTGlzdC5jbGFzc0xpc3QuYWRkKCdmaWxlcy1saXN0Jyk7XHJcbiAgICBhZGRGaWxlc0Jsb2NrLmluc2VydEJlZm9yZShhZGRlZEZpbGVzTGlzdCxleGlzdEFkZEZpbGUpO1xyXG5cclxuICAgIC8v0L7QsdC10YDQvdGD0YLRjCDRgdGD0YnQtdGB0YLQstGD0Y7RidC40LkgaW5wdXQgZmlsZVxyXG4gICAgLy/RgdCw0LwgaW5wdXQg0LHRg9C00LXRgiDRgdC60YDRi9GCXHJcbiAgICAvL9C4INC90LDQstC10YHQuNGC0Ywg0LLRi9C30L7QsiDRhNGD0L3QutGG0LjQuCDRgdC+0LfQtNCw0Y7RidC10Lkg0L3QvtCy0YvQuSDQuNC90L/Rg9GCXHJcbiAgICBsZXQgZGVmYXVsdEZpbGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlSW5wdXQwJyk7XHJcbiAgICAvL9Cw0YLRgNC40LHRg9GCIG9uY2hhbmdlINC00L7QsdCw0LLQu9GP0Y4g0YfRgtC+0LHRiyDQvdC1INC60L7Qv9C40YDQvtCy0LDRgtGMINGD0LbQtSDRgdGD0YnQtdGB0YLQstGD0Y7RidGO0Y5cclxuICAgIC8v0LIg0YLRgNC10LrQtdGA0LUg0YTRg9C90LrRhtC40Y4g0LTQvtCx0LDQu9GP0L3QuNGPINC40L3Qv9GD0YLQvtCyXHJcbiAgICBkZWZhdWx0RmlsZUlucHV0LnNldEF0dHJpYnV0ZSgnb25jaGFuZ2UnLCdhZGRGaWxlSW5wdXQoXCJGaWxlSW5wdXRzXCIpJyk7XHJcbiAgICBkZWZhdWx0RmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwcm9jZXNzRmlsZXModGhpcyxhZGRlZEZpbGVzTGlzdCk7XHJcbiAgICAgICAgaGlkZUZpbGxlZEZpbGVJbnB1dCh0aGlzKTtcclxuICAgIH0pO1xyXG4gICAgZXhpc3RBZGRGaWxlLmFwcGVuZENoaWxkKHdyYXBGaWxlSW5wdXRzKGRlZmF1bHRGaWxlSW5wdXQpKTtcclxuXHJcbiAgICBsZXQgYWRkRmlsZU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XHJcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24obXV0YXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgIGlmKG11dGF0aW9uLmFkZGVkTm9kZXNbMF0udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IG11dGF0aW9uLmFkZGVkTm9kZXNbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdvbmNoYW5nZScsJ2FkZEZpbGVJbnB1dChcIkZpbGVJbnB1dHNcIiknKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NGaWxlcyh0aGlzLGFkZGVkRmlsZXNMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBoaWRlRmlsbGVkRmlsZUlucHV0KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/QstGB0LUg0L3QvtCy0YvQtSBpbnB1dCBmaWxlINC90YPQttC90L4g0L7QsdC10YDQvdGD0YLRjCxcclxuICAgICAgICAgICAgICAgIC8v0YHQsNC8IGlucHV0INCx0YPQtNC10YIg0YHQutGA0YvRglxyXG4gICAgICAgICAgICAgICAgbGV0IGZha2VJbnB1dCA9IHdyYXBGaWxlSW5wdXRzKGlucHV0KTtcclxuICAgICAgICAgICAgICAgIG11dGF0aW9uLnRhcmdldC5hcHBlbmRDaGlsZChmYWtlSW5wdXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgYWRkRmlsZU9ic2VydmVyQ29uZmlnID0ge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlLFxyXG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBhZGRGaWxlT2JzZXJ2ZXIub2JzZXJ2ZShleGlzdEFkZEZpbGUsIGFkZEZpbGVPYnNlcnZlckNvbmZpZyk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoYWRkRmlsZXNCbG9jayk7XHJcbiAgICByb3dJdGVtLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICAgIHJvd3NGcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAvLzUg0L/Rj9GC0LDRjyDRgdGC0YDQvtC60LAgLSDQutC90L7Qv9C60LAg0KHQvtGF0YDQsNC90LjRgtGMXHJcbiAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1maWVsZHMtcm93JywndGFzay1yb3ctNScpO1xyXG5cclxuICAgIGxldCBzYXZlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1zdWJtaXRCdXR0b25dJyk7XHJcbiAgICBzYXZlQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1hY3Rpb24nKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChzYXZlQnRuKTtcclxuICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gICAgcm93c0ZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgIC8v0LLRgdC1INGB0L7QsdGA0LDQvdC90L7QtS/Qv9C10YDQtdC80LXRidC10L3QvdC+0LUg0LLRgdGC0LDQstC70Y/RjiDQsiDQsdC70L7QulxyXG4gICAgbmV3Q29tbWVudC5hcHBlbmRDaGlsZChyb3dzRnJhZ21lbnQpO1xyXG5cclxuICAgIC8vLS3RgtGD0YIg0L3QsNCy0LXRiNC40LLQsNGOINGB0L7QsdGL0YLQuNGPINC90LAg0L/QtdGA0LXQvNC10YnQtdC90L3Ri9C1INGN0LvQtdC80LXQvdGC0YtcclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlRmlsbGVkRmlsZUlucHV0KGlucHV0KSB7XHJcbiAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4tZWxlbScpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByb2Nlc3NGaWxlcyhmaWVsZCwgZmlsZXNsaXN0KSB7XHJcbiAgICAgICAgbGV0IGZpbGUgPSBmaWVsZC5maWxlc1swXTtcclxuICAgICAgICBsZXQgZmlsZVNpemUgPSBmaWxlLnNpemU7XHJcblxyXG5cclxuICAgICAgICBpZighZmlsZXNsaXN0LmRhdGFzZXQudG90YWwpe1xyXG4gICAgICAgICAgICBmaWxlc2xpc3QuZGF0YXNldC50b3RhbCA9IGZpbGVTaXplO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBmaWxlc2xpc3QuZGF0YXNldC50b3RhbCA9IHBhcnNlSW50KGZpbGVzbGlzdC5kYXRhc2V0LnRvdGFsKSArIHBhcnNlSW50KGZpbGVTaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0b3RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlcy10b3RhbCcpO1xyXG4gICAgICAgIHRvdGFsLnRleHRDb250ZW50ID0gYnl0ZXNUb1NpemUoZmlsZXNsaXN0LmRhdGFzZXQudG90YWwpICsgJyDQuNC3IDMg0JzQsSc7XHJcblxyXG4gICAgICAgIGxldCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBwLmlubmVySFRNTCA9IGZpbGUubmFtZSArICc8c3BhbiBjbGFzcz1cInMtaW5mb1wiPicgKyBNYXRoLmNlaWwoZmlsZVNpemUgLyAxMDI0KSArICcgS2I8L3NwYW4+JztcclxuICAgICAgICBwLmNsYXNzTGlzdC5hZGQoJ2ZpbGUtbGlzdC1pdGVtJyk7XHJcblxyXG4gICAgICAgIGxldCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1yZW1vdmUtaXRlbScpO1xyXG4gICAgICAgIHJlbW92ZUJ0bi5kYXRhc2V0LmZpZWxkSWQgPSBmaWVsZC5pZDtcclxuXHJcbiAgICAgICAgcC5hcHBlbmRDaGlsZChyZW1vdmVCdG4pO1xyXG5cclxuICAgICAgICBmaWxlc2xpc3QuYXBwZW5kQ2hpbGQocCk7XHJcblxyXG4gICAgICAgIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZW1vdmVGaWxlSW5wdXQodGhpcyx0b3RhbCxmaWxlc2xpc3QsZmlsZVNpemUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL9C/0YDQuCDQstGL0LHQvtGA0LUg0LIg0YHQv9C40YHQutC1INC00L7Qvy7QtdC80LDQudC70L7QsiDRgdGA0LDQt9GDINCy0YHRgtCw0LLQu9GP0YLRjCDQsiDQv9C+0LvQtSDQtNC70Y8g0L7RgtC/0YDQsNCy0LrQuFxyXG4gICAgbGV0IGVtYWlsTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRfZW1haWxfd29ya2VyJyk7XHJcbiAgICBsZXQgb25QYWdlRW1haWxMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIG9uUGFnZUVtYWlsTGlzdC5jbGFzc0xpc3QuYWRkKCdlbWFpbC1zZW5kLWxpc3QnKTtcclxuICAgIGFkZEVtYWlsLmluc2VydEJlZm9yZShvblBhZ2VFbWFpbExpc3QsYWRkRW1haWwuY2hpbGROb2Rlc1syXSk7XHJcblxyXG4gICAgZW1haWxMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhZGRXb3JrZXJFbWFpbFRvU2VuZExpc3QodGhpcyxzZW5kTGlzdCxvblBhZ2VFbWFpbExpc3QpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy/Qv9GA0Lgg0LLRi9Cx0L7RgNC1INCyINGB0LXQu9C10LrRgtC1INCh0YLQsNGC0YPRgSDQv9C10YDQtdC60LvRjtGH0LDRjiDRgNCw0LTQuNC+LCDRh9GC0L7QsdGLINGE0L7RgNC80LAg0L/RgNCw0LLQuNC70YzQvdC+INGA0LDQsdC+0YLQsNC70LBcclxuICAgIHN0YXR1c0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudmFsdWUpLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy/Qv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDRgdGC0YDQsNC90LjRhtGLINC90YPQttC90L4g0YHQvNC+0YLRgNC10YLRjCDQstGL0LHRgNCw0L3QvdGL0Lkg0YDQsNC00LjQviDRgdC+INGB0YLQsNGC0YPRgdC+0LwgKNCyINGB0LrRgNGL0YLQvtC5INGH0LDRgdGC0Lgg0YLQsNCx0LvQuNGG0YsgI3Rhc2stZm9vdGVyKVxyXG4gICAgLy/QuCDRgdGC0LDQstC40YLRjCDRgdGC0LDRgtGD0YEg0LIg0YHQtdC70LXQutGC0LUgc3RhdHVzTGlzdFxyXG4gICAgdXBkYXRlU3RhdHVzTGlzdE9uTG9hZChzdGF0dXNMaXN0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRmllbGRBbmRMYWJlbCh0ZXh0LGZpZWxkKSB7XHJcbiAgICBsZXQgcm93SXRlbVByb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBsZXQgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gICAgcm93SXRlbVByb3RvLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgIHJvd0l0ZW1Qcm90by5hcHBlbmRDaGlsZChmaWVsZCk7XHJcbiAgICByZXR1cm4gcm93SXRlbVByb3RvO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdGF0dXNMaXN0KHRibCkge1xyXG4gICAgbGV0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcclxuICAgIGxldCByb3dzID0gQXJyYXkuZnJvbSh0YmwucXVlcnlTZWxlY3RvckFsbCgndHInKSk7XHJcblxyXG4gICAgbGV0IG9wdGdyb3VwO1xyXG5cclxuICAgIHJvd3MubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgaWYoaXRlbS5maXJzdEVsZW1lbnRDaGlsZC5nZXRBdHRyaWJ1dGUoJ2NvbHNwYW4nKSl7XHJcbiAgICAgICAgICAgIG9wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0Z3JvdXAnKTtcclxuICAgICAgICAgICAgb3B0Z3JvdXAubGFiZWwgPSBpdGVtLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBsaXN0LmFwcGVuZENoaWxkKG9wdGdyb3VwKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHJhZGlvID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IHJhZGlvLmlkO1xyXG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJykudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG9wdGdyb3VwLmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVN0YXR1c0xpc3RPbkxvYWQobGlzdCkge1xyXG4gICAgbGV0IHN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9bmV3X3Byb2JsZW1fc3RhdHVzXTpjaGVja2VkJyk7XHJcblxyXG4gICAgZm9yKCBsZXQgaSBvZiBsaXN0Lm9wdGlvbnMpe1xyXG4gICAgICAgIGlmKGkudmFsdWUgPT09IHN0YXR1cy5pZCl7XHJcbiAgICAgICAgICAgIGkuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkV29ya2VyRW1haWxUb1NlbmRMaXN0KHNlbGVjdCwgaW5wdXQsIGxpc3QpIHtcclxuICAgIGxldCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tzZWxlY3Quc2VsZWN0ZWRJbmRleF07XHJcbiAgICBsZXQgZGF0YSA9IFtvcHRpb24udGV4dCxzZWxlY3QudmFsdWVdO1xyXG4gICAgbGV0IGVtYWlsID0gZGF0YVsxXTtcclxuXHJcbiAgICBpZiAoZW1haWwudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgbGV0IGFkZEVtYWlsID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgbGV0IG5ld3ZhbCA9ICcnO1xyXG5cclxuICAgICAgICBpZiAoYWRkRW1haWwgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgbmV3dmFsID0gZW1haWw7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhZGRFbWFpbC5pbmRleE9mKGVtYWlsKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgbmV3dmFsID0gYWRkRW1haWwgKyAoZW1haWwuY2hhckF0KGFkZEVtYWlsLmxlbmd0aCAtIDEpID09IFwiO1wiID8gXCJcIiA6IFwiO1wiKSArIGVtYWlsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXQudmFsdWUgPSBuZXd2YWw7XHJcblxyXG4gICAgICAgIGxldCBuZXdpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBuZXdpdGVtLnRleHRDb250ZW50ID0gZGF0YVswXTtcclxuICAgICAgICBuZXdpdGVtLmRhdGFzZXQuZW1haWwgPSBkYXRhWzFdO1xyXG5cclxuICAgICAgICBsaXN0LmFwcGVuZENoaWxkKG5ld2l0ZW0pO1xyXG5cclxuICAgICAgICBuZXdpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZW1vdmVJdGVtRnJvbVNlbmRsaXN0KHRoaXMsIHNlbGVjdCwgaW5wdXQpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v0LLRi9Cx0YDQsNC90L3QvtCz0L4g0L/QvtC70YPRh9Cw0YLQtdC70Y8g0YHQutGA0YvQstCw0Y5cclxuICAgICAgICAvL9GB0YLQsNCy0LvRjiDQstGL0LHRgNCw0L3QvdGL0Lwg0LTQtdGE0L7Qu9GC0L3Ri9C5ICjQv9C10YDQstGL0LkpINGN0LvQtdC80LXQvdGCINGB0L/QuNGB0LrQsFxyXG5cclxuICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKCdoaWRkZW4nLCcnKTtcclxuICAgICAgICBzZWxlY3Qub3B0aW9uc1swXS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUl0ZW1Gcm9tU2VuZGxpc3QoaXRlbSwgc2VsZWN0LCBpbnB1dCkge1xyXG4gICAgbGV0IHRleHQgPSBpdGVtLmRhdGFzZXQuZW1haWw7XHJcblxyXG4gICAgbGV0IHNlbmRMaXN0ID0gaW5wdXQudmFsdWUuc3BsaXQoJzsnKTtcclxuXHJcbiAgICBsZXQgZmlsdGVyZWRTZW5kTGlzdCA9IHNlbmRMaXN0LmZpbHRlcihmdW5jdGlvbiAobGlzdGl0ZW0pIHtcclxuICAgICAgICBpZihsaXN0aXRlbSAhPT0gdGV4dCl7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0aXRlbVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlucHV0LnZhbHVlID0gZmlsdGVyZWRTZW5kTGlzdC5qb2luKCc7Jyk7XHJcblxyXG4gICAgaXRlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGl0ZW0pO1xyXG5cclxuICAgIGZvciggbGV0IGkgb2Ygc2VsZWN0Lm9wdGlvbnMpe1xyXG4gICAgICAgIGlmKGkudmFsdWUgPT09IHRleHQpe1xyXG4gICAgICAgICAgICBpLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVGaWxlSW5wdXQoYnRuLHRvdGFsLGZpbGVzbGlzdCxmaWxlc2l6ZSkge1xyXG4gICAgbGV0IHVwZGF0ZVRvdGFsU2l6ZSA9IGZpbGVzbGlzdC5kYXRhc2V0LnRvdGFsIC0gZmlsZXNpemU7XHJcbiAgICBmaWxlc2xpc3QuZGF0YXNldC50b3RhbCA9IHVwZGF0ZVRvdGFsU2l6ZTtcclxuICAgIHRvdGFsLnRleHRDb250ZW50ID0gYnl0ZXNUb1NpemUodXBkYXRlVG90YWxTaXplKSArICcg0LjQtyAzINCc0LEnO1xyXG5cclxuICAgIGxldCBpbnB1dElkID0gYnRuLmRhdGFzZXQuZmllbGRJZDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlucHV0SWQpLnBhcmVudE5vZGUucmVtb3ZlKCk7XHJcbiAgICBidG4ucGFyZW50Tm9kZS5yZW1vdmUoKTtcclxuXHJcbiAgICBsZXQgZmlsZUlucHV0cyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2LmZpbGVJbnB1dCcpKTtcclxuICAgIGxldCByZW1vdmVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1yZW1vdmUtaXRlbScpO1xyXG5cclxuICAgIC8v0L/QtdGA0LXQv9C40YHQsNGC0Ywg0LjQvNC10L3QsCDQuCBpZCDQstGB0LXRhSDQuNC90L/Rg9GC0L7Qsi5cclxuICAgIC8v0LXRgdC70Lgg0L7QvdC4INC40LTRg9GCINC90LUg0L/QviDQv9C+0YDRj9C00LrRgyDQuNC70Lgg0YEg0L/RgNC+0L/Rg9GB0LrQsNC80LhcclxuICAgIC8v0L/RgNC4INC30LDQs9GA0YPQt9C60LUg0YTQsNC50LvQvtCyINC90LAg0YHQtdGA0LLQtdGAINCx0YPQtNC10YIg0L7RiNC40LHQutCwXHJcbiAgICAvL9GC0L4g0LbQtSDQvdCw0LTQviDRgdC00LXQu9Cw0YLRjCDRgSBkYXRhLWlucHV0LWlkINC60L3QvtC/0L7QuiDRg9C00LDQu9C10L3RjyDRhNCw0LnQu9CwXHJcbiAgICAvL9CwINGC0L4g0LHRg9C00LXRgiDRg9C00LDQu9GP0YLRgdGPINC90LUg0YLQvtGCINC40L3Qv9GD0YJcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlSW5wdXRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBmaWxlSW5wdXRzW2ldLmZpcnN0RWxlbWVudENoaWxkLmlkID0gJ2ZpbGVJbnB1dCcraTtcclxuICAgICAgICBmaWxlSW5wdXRzW2ldLmZpcnN0RWxlbWVudENoaWxkLm5hbWUgPSAnZmlsZUlucHV0JytpO1xyXG4gICAgICAgIHJlbW92ZUJ0bnNbaV0uZGF0YXNldC5maWVsZElkID0gJ2ZpbGVJbnB1dCcraTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gd3JhcEZpbGVJbnB1dHMoaW5wdXQpIHtcclxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBsZXQgYnRuID0gd3JhcC5jbG9uZU5vZGUoZmFsc2UpO1xyXG5cclxuICAgIHdyYXAuY2xhc3NMaXN0LmFkZCgnZmFrZS1maWxlLWlucHV0JyxpbnB1dC5jbGFzc0xpc3RbMF0pO1xyXG4gICAgd3JhcC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gICAgYnRuLmlubmVySFRNTCA9ICfQlNC+0LHQsNCy0LjRgtGMINGE0LDQudC7IDxzcGFuPtCd0LDQttC80Lgg0LjQu9C4INGC0LDRidC4INC10LPQviDRgdGO0LTQsDwvc3Bhbj4nO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1mYWtlLWZpbGUnKTtcclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoYnRuKTtcclxuXHJcbiAgICB3cmFwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdpcy1ob3ZlcicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhvdmVyJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3cmFwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhvdmVyJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gd3JhcDtcclxufVxyXG5cclxuZnVuY3Rpb24gYnl0ZXNUb1NpemUoYnl0ZXMpIHtcclxuICAgIGxldCBzaXplcyA9IFsnQnl0ZXMnLCAn0JrQsScsICfQnNCxJywgJ9CT0LEnLCAn0KLQsSddO1xyXG4gICAgaWYgKCFieXRlcykge1xyXG4gICAgICAgIHJldHVybiAnMCdcclxuICAgIH1cclxuICAgIGxldCBpID0gcGFyc2VJbnQoTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZygxMDI0KSkpO1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoYnl0ZXMgLyBNYXRoLnBvdygxMDI0LCBpKSwgMikgKyAnICcgKyBzaXplc1tpXTtcclxufVxyXG5cclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcyc7XHJcblxyXG5leHBvcnQge3Rhc2tGb290ZXJEZXNpZ259O1xyXG5cclxuaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpe1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIHRhc2tGb290ZXJEZXNpZ24nKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Rhc2tGb290ZXJEZXNpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3Rhc2tGb290ZXJEZXNpZ24ucGNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi90YXNrRm9vdGVyRGVzaWduLnBjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdGFza0Zvb3RlckRlc2lnbi5wY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3Rhc2stZm9vdGVyIHRyOm50aC1jaGlsZCgyKXtoZWlnaHQ6MDtvdmVyZmxvdzpoaWRkZW59LmZha2UtZmlsZS1pbnB1dCAuYnRuLWZha2UtZmlsZXtwYWRkaW5nOi43ZW0gMCAwO3RleHQtYWxpZ246Y2VudGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2ZvbnQtc2l6ZToxNnB4O2NvbG9yOiM4MmE1YzM7Y3Vyc29yOnBvaW50ZXJ9LmZha2UtZmlsZS1pbnB1dCAuYnRuLWZha2UtZmlsZSBzcGFue3dpZHRoOjEwMCU7ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC1zaXplOjEycHh9LmZha2UtZmlsZS1pbnB1dD5pbnB1dHt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtvcGFjaXR5OjB9I0ZpbGVJbnB1dHMgYnJ7ZGlzcGxheTpub25lfS50YXNrLXR5cGU+ZGl2IHNlbGVjdHttYXJnaW4tdG9wOi4zZW19LnRhc2stdHlwZT5kaXYgYnJ7ZGlzcGxheTpub25lfS5lbWFpbC1zZW5kLWxpc3Q+bGk6YWZ0ZXJ7Y29udGVudDpcXFwiXFxcXDFGN0E5XFxcIjttYXJnaW4tbGVmdDouNGVtO2NvbG9yOnJlZDtkaXNwbGF5OmlubGluZS1ibG9jaztjdXJzb3I6cG9pbnRlcn0uYWRkLWVtYWlsICNnZXRFbWFpbEFkZHJlc3Nlc0J1dHRvbntkaXNwbGF5Om5vbmVcXHJcXG4gICAgICAgIC8qd2lkdGg6IDkwcHg7XFxyXFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyovfS5hZGQtZW1haWwgI2FkZF9lbWFpbF93b3JrZXJ7d2lkdGg6MjI2cHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hZGQtZW1haWwgI2FkZF9lbWFpbHtwb3NpdGlvbjphYnNvbHV0ZTt2aXNpYmlsaXR5OmhpZGRlbjt6LWluZGV4OmF1dG99LmFkZC1lbWFpbCBsYWJlbHtkaXNwbGF5OmJsb2NrfTpyb290IC5kZWFkbGluZS1jYWxlbmRhciAjZW5kX2RhdGV7d2lkdGg6YXV0byFpbXBvcnRhbnR9OnJvb3QgLmRlYWRsaW5lLWNhbGVuZGFyIGlucHV0W3R5cGU9YnV0dG9uXXtkaXNwbGF5Om5vbmV9OnJvb3QgLmRlYWRsaW5lLWNhbGVuZGFyPmltZ3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6LjRlbTtyaWdodDouNWVtfTpyb290IC5kZWFkbGluZS1jYWxlbmRhcj5pbnB1dFt0eXBlPXRleHRde3BhZGRpbmctcmlnaHQ6MzBweH0udGFzay1yb3ctMiAudGltZS1ibG9jaz5kaXY6YWZ0ZXJ7Y29udGVudDpcXFwiXFxcXDQzQ1xcXFw0MzhcXFxcNDNEXFxcIjttYXJnaW4tbGVmdDouNWVtO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ud29ya2VyLWJsb2NrIHNlbGVjdHt3aWR0aDoxMDAlO21hcmdpbjouNWVtIDAgMH0udGFzay1maWVsZHMtcm93IC5mcm93LWNvbC0yLTJ7d2lkdGg6MTIwcHh9LnRhc2stZmllbGRzLXJvdyAuZnJvdy1jb2wtMi0xe3dpZHRoOjE5MHB4O21hcmdpbi1yaWdodDozMHB4fS50YXNrLWZpZWxkcy1yb3cgdGR7cGFkZGluZzowO2ZvbnQtc2l6ZToxMDAlO2Rpc3BsYXk6YmxvY2t9LnRhc2stZmllbGRzLXJvdyBzZWxlY3R7cGFkZGluZzouM2VtIDAgLjNlbSAuMmVtfS50YXNrLWZpZWxkcy1yb3cgaW5wdXQuaW5wdXRfZmllbGQsLnRhc2stZmllbGRzLXJvdyBpbnB1dFt0eXBlPXRleHRdLC50YXNrLWZpZWxkcy1yb3cgc2VsZWN0e3dpZHRoOmF1dG87bWF4LXdpZHRoOjEwMCU7aGVpZ2h0OjJlbTtwYWRkaW5nOi4zZW0gLjZlbTtib3JkZXI6MXB4IHNvbGlkICM5ZTllOWU7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9LnRhc2stZmllbGRzLXJvdyBpbnB1dC5pbnB1dF9maWVsZDpmb2N1cywudGFzay1maWVsZHMtcm93IGlucHV0W3R5cGU9dGV4dF06Zm9jdXMsLnRhc2stZmllbGRzLXJvdyBzZWxlY3Q6Zm9jdXN7Ym9yZGVyLWNvbG9yOiMyNmE2OWF9LmNvbnRlbnR7XFxyXFxuICAgIC8q0YPQsdC40YDQsNGOINC70LjRiNC90LjQtSDQvtGC0YHRgtGD0L/RiyDQuCBiciDRh9GC0L7QsdGLINGD0LzQtdC90YzRiNC40YLRjCDQtNGL0YDRgyDQv9C+0LQg0L/QvtC70Y/QvNC4INC60LDQvNC10L3RgtCwKi9wYWRkaW5nLWJvdHRvbTowfVxcclxcblxcclxcbi8qINC/0YDQtdCy0YDQsNGJ0LDRjiDQstGB0LUg0LIg0LHQu9C+0LrQuCovI3RibC1uZXctY29tbWVudCB0Ym9keSwjdGJsLW5ldy1jb21tZW50IHRkLCN0YmwtbmV3LWNvbW1lbnQgdHJ7ZGlzcGxheTpibG9ja31cXHJcXG5cXHJcXG4vKtGB0LrRgNGL0LLQsNGOINC/0LXRgNCy0YPRjiDRj9GH0LXQudC60YMg0YEg0YLQtdC60YHRgtC+0Lwg0KLQtdC60YHRgiovI3RibC1uZXctY29tbWVudCB0cjpmaXJzdC1jaGlsZD50ZDpmaXJzdC1jaGlsZHtkaXNwbGF5Om5vbmV9I3RibC1uZXctY29tbWVudCticntcXHJcXG4gICAgLyrRg9Cx0LjRgNCw0Y4g0LvQuNGI0L3QuNC1INC+0YLRgdGC0YPQv9GLINC4IGJyINGH0YLQvtCx0Ysg0YPQvNC10L3RjNGI0LjRgtGMINC00YvRgNGDINC/0L7QtCDQv9C+0LvRj9C80Lgg0LrQsNC80LXQvdGC0LAqL2Rpc3BsYXk6bm9uZX1cXHJcXG5cXHJcXG4vKtCy0YvRgNC+0LLQvdGP0YLRjCDQvdC+0LLRi9C5INC60LDQvNC10L3RgiDQv9C+INC60LDRgNGC0L7Rh9C60LDQvCDQutCw0LzQtdC90YLQvtCyKi8jbmV3LWNvbW1lbnQtd3JhcHttYXgtd2lkdGg6NzIwcHg7bWFyZ2luOmF1dG99XFxyXFxuXFxyXFxuLyp0ZXh0YXJlYSovXFxyXFxuXFxyXFxuLyrQt9Cw0LPQvtC70L7QstC+0Log0JTQvtCx0LDQstC40YLRjCDQutC+0LzQvNC10L3RgtCw0YDQuNC5Ki8udGx7ZGlzcGxheTpub25lfVxcclxcblxcclxcbi8q0L7QsdC10YDRgtC60LAg0LLQvtC60YDRg9CzINC/0L7Qu9GPINCU0L7QsdCw0LLQuNGC0Ywg0LrQvtC80LzQtdC90YLQsNGA0LjQuSovLnRhcmVhLXdyYXB7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufSN0ZXh0e3dpZHRoOjEwMCU7cGFkZGluZzouNmVtIC44ZW07Zm9udC1mYW1pbHk6aW5oZXJpdDtmb250LXNpemU6MTRweDtib3JkZXI6MDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNoYWRvdzppbnNldCAwIC0ycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLGluc2V0IDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsLjEyKSxpbnNldCAwIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKX1cXHJcXG5cXHJcXG4vKtC+0YTQvtGA0LzQu9C10L3QuNC1INC/0L7Qu9C10Lkg0Lgg0YHRgtGA0L7QuiDRgSDQv9C+0LvRj9C80Lgg0L/QvtC0INC/0L7Qu9C10Lwg0LrQsNC80LXQvdGC0LAqLy50YXNrLWZpZWxkcy1yb3d7bWF4LXdpZHRoOjcyMHB4O21hcmdpbjoxLjZlbSBhdXRvfS50YXNrLWZpZWxkcy1yb3cgbGFiZWx7bWFyZ2luOjAgMCAuNWVtO2NvbG9yOmdyYXk7ZGlzcGxheTppbmxpbmUtYmxvY2t9XFxyXFxuXFxyXFxuLyogMSDRgdGC0YDQvtC60LAgKi8udGFzay1yb3ctMXtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleFxcclxcbiAgICAvKmp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsqL30ud29ya2VyLWJsb2Nre3dpZHRoOjMwMHB4O21hcmdpbi1yaWdodDo3MHB4Oy1tcy1mbGV4OjAgMCAzMDBweDtmbGV4OjAgMCAzMDBweH0ud29ya2VyLWJsb2NrIGlucHV0W3R5cGU9cmFkaW9de2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LS4yZW19XFxyXFxuXFxyXFxuLyogMiDRgdGC0YDQvtC60LAgKi8udGFzay1yb3ctMntkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleFxcclxcbiAgICAvKmp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsqL30udGFzay1yb3ctMiAudGltZS1ibG9ja3t3aWR0aDozMDBweDttYXJnaW4tcmlnaHQ6NzBweDstbXMtZmxleDowIDAgMzAwcHg7ZmxleDowIDAgMzAwcHg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtcGFjazpqdXN0aWZ5O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS50YXNrLXJvdy0yIC50aW1lLWJsb2NrPmRpdnt3aWR0aDoxMjBweH0udGFzay1yb3ctMiAudGltZS1ibG9jaz5kaXYgaW5wdXR7d2lkdGg6NzYlO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX06cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXJ7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzowIWltcG9ydGFudDtmb250LXNpemU6MTAwJVxcclxcbiAgICAvKmZsZXg6IDEgMSAxODBweDsqL306cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXI+aW1nLDpyb290IC5kZWFkbGluZS1jYWxlbmRhcj5pbnB1dHtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3A7Ym94LXNpemluZzpib3JkZXItYm94fVxcclxcblxcclxcbi8qIDMg0YHRgtGA0L7QutCwICovLnRhc2stcm93LTN7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXhcXHJcXG4gICAgLypqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47Ki99LmFkZC1lbWFpbHt3aWR0aDozMDBweDttYXJnaW4tcmlnaHQ6NzBweDstbXMtZmxleDowIDAgMzAwcHg7ZmxleDowIDAgMzAwcHg7cG9zaXRpb246cmVsYXRpdmV9LmFkZC1lbWFpbCBhe2Rpc3BsYXk6bm9uZX0uZW1haWwtc2VuZC1saXN0e21hcmdpbjouNGVtIDAgLjVlbTtwYWRkaW5nOjA7bGlzdC1zdHlsZS10eXBlOm5vbmV9LmVtYWlsLXNlbmQtbGlzdD5saXttYXJnaW46MDtsaW5lLWhlaWdodDoxfS5lbWFpbC1zZW5kLWxpc3Q+bGk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxCN1xcXCI7Zm9udC1zaXplOjEuNWVtO21hcmdpbi1yaWdodDouMmVtO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0udGFzay10eXBle1xcclxcblxcclxcbiAgICAvKtCyINC00LjQstCw0YUg0L/RgNGP0YfRg9GC0YzRgdGPINGB0LXQu9C10LrRgtGLINGBINC/0L7QtNGC0LjQv9Cw0LzQuCovfS50YXNrLXR5cGUgc2VsZWN0e21pbi13aWR0aDoxOTBweH1cXHJcXG5cXHJcXG4vKiA0INGB0YLRgNC+0LrQsCAqLy5hZGQtZmlsZXN7XFxyXFxuXFxyXFxuICAgIC8q0L/QviDQutC70LjQutGDINC90LAg0Y3RgtGDINGB0YHRi9C70LrRgyDRgdC+0LfQtNCw0LLQsNC70YHRjyDQvdC+0LLRi9C5IGZpbGUgaW5wdXRcXHJcXG4gICAg0YHQutGA0L7RjiDQtdC1LCDQsCDRgdC+0LHRi9GC0LjQtSDQv9C+0LLQtdGI0YMg0L3QsCBjaGFuZ2Ug0YHQsNC80L7Qs9C+INC40L3Qv9GD0YLQsCovfS5hZGQtZmlsZXMgYXtkaXNwbGF5Om5vbmVcXHJcXG4gICAgICAgIC8qbWFyZ2luLXRvcDogLjhlbTtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsqL30jRmlsZUlucHV0cyBpbnB1dDpub3QoOmZpcnN0LWNoaWxkKXttYXJnaW4tdG9wOi4zZW07ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfS5idG4tcmVtb3ZlLWl0ZW17d2lkdGg6MTJweDtoZWlnaHQ6MThweDttYXJnaW4tbGVmdDouM2VtO2NvbG9yOnJlZDtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOnBvaW50ZXJ9LmJ0bi1yZW1vdmUtaXRlbTphZnRlcntjb250ZW50OlxcXCJcXFxcMUY3QTlcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MH0uZmFrZS1maWxlLWlucHV0e3dpZHRoOjIyNXB4O2hlaWdodDo2MHB4O2JvcmRlcjoxcHggZGFzaGVkICM4MmE1YzM7YmFja2dyb3VuZDojZjRmNmY4O3RleHQtYWxpZ246Y2VudGVyO2JvcmRlci1yYWRpdXM6LjVlbTtwb3NpdGlvbjpyZWxhdGl2ZX0uZmFrZS1maWxlLWlucHV0LmlzLWhvdmVye2JhY2tncm91bmQ6I2QyZGNlNX0uZmlsZXMtbGlzdHttYXJnaW46LS41ZW0gMCAuNWVtO3BhZGRpbmc6MDtsaXN0LXN0eWxlLXR5cGU6bm9uZTt0cmFuc2l0aW9uOmhlaWdodCAuM3N9LmZpbGVzLWxpc3QgLmZpbGUtbGlzdC1pdGVte21hcmdpbjouNGVtIDB9LmZpbGVzLWxpc3QgLmZpbGUtbGlzdC1pdGVtIC5zLWluZm97cGFkZGluZy1sZWZ0Oi42ZW07ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfVxcclxcblxcclxcbi8q0YHQutGA0YvQstCw0Y4g0L/Rg9GB0YLRi9C1INGP0YfQtdC50LrQuCwg0L/QvtC70Y8g0LjQtyDQvdC40YUg0L/QtdGA0LXQvNC10YnQtdC90Ysg0LIg0L3QvtCy0YvQuSDQsdC70L7QuiAjbmV3LWNvbW1lbnQtd3JhcCovI3Rhc2stZm9vdGVyIHRib2R5LCN0YXNrLWZvb3RlciB0ZCwjdGFzay1mb290ZXIgdHJ7ZGlzcGxheTpibG9ja31cXHJcXG5cXHJcXG4vKtC60L3QvtC/0LrQsCDRgdC+0YXRgNCw0L3QuNGC0YwqLy5idG4tYWN0aW9ue2hlaWdodDozNnB4O3BhZGRpbmc6MCAxLjZlbTtmb250LXNpemU6MTRweDtjb2xvcjojZmZmO2JvcmRlcjowO2JvcmRlci1yYWRpdXM6NHB4O2JhY2tncm91bmQ6IzdlYjUxOTtjdXJzb3I6cG9pbnRlcn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3tcImltcG9ydExvYWRlcnNcIjoxfSEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIhLi9zcmMvcGNzcy90YXNrRm9vdGVyRGVzaWduLnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIGVsZW1zTW9kaWZpY2F0aW9uJyk7XHJcbn1cclxuXHJcbmltcG9ydCB7bW9kaWZ5U2VsZWN0T3B0aW9uc0xpc3QsZmluZEluQXJyYXl9IGZyb20gJy4vX3V0aWxzLmpzJztcclxuaW1wb3J0IHtnZXRBbGxDb21tZW50c1Jvd3MsZ2V0QWxsV29ya2Vyc30gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcblxyXG4vL9C40LfQvNC10L3QtdC90LjQtSDRjdC70LXQvNC10L3RgtC+0LIg0L3QsCDRgdGC0YDQsNC90LjRhtC1INC30LDQtNCw0YfQuFxyXG4vL9CyINGB0L7QvtGC0LLQtdGC0YHQstC40Lgg0YEg0L3QsNGB0YLRgNC+0LnQutCw0LzQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cclxuZnVuY3Rpb24gZWxlbXNNb2RpZmljYXRpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGRhcnRfd29ya2Vyc19saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludGVybmFsX3dvcmtlcicpO1xyXG5cclxuICAgIC8v0YHRgNCw0LLQvdC40LLQsNC10Lwg0YHQv9C40YHQvtC6INC/0YDQvtC10LrRgtC+0LIg0YEg0YHQvtGF0YDQsNC90LXQvdC90YvQvCDQsiDQvdCw0YHRgtGA0L7QudC60LDRhVxyXG4gICAgLy/Qv9GA0L7QtdC60YLRiyDQutC+0YLQvtGA0YvRhSDQvdC10YIg0LIg0L3QsNGB0YLRgNC+0LnQutCwINGB0LrRgNGL0LLQsNC10LxcclxuICAgIHRoaXMubW9kaWZ5UHJvamVjdExpc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtc191c2VyX3Byb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFyYW1zX3VzZXJfcHJvamVjdHMnKSk7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXNfdXNlcl9wcm9qZWN0cyA9PT0gbnVsbCB8fCAhcGFyYW1zX3VzZXJfcHJvamVjdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ9Cd0LXRgiDRgdC+0LHRgdGC0LLQtdC90L3QvtCz0L4g0YHQv9C40YHQutCwINC/0YDQvtC10LrRgtC+0LInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGFydF9wcm9qZWN0c19saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RfaWQnKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xpZW50X2lkJyk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBkYXJ0X3Byb2plY3RzX2xpc3Qub3B0aW9ucztcclxuXHJcbiAgICAgICAgbW9kaWZ5U2VsZWN0T3B0aW9uc0xpc3Qob3B0aW9ucywgcGFyYW1zX3VzZXJfcHJvamVjdHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL9GB0YDQsNCy0L3QuNCy0LDQtdC8INGB0L/QuNGB0L7QuiDQuNGB0L/QvtC70L3QuNGC0LXQu9C10Lkg0YEg0YHQvtGF0YDQsNC90LXQvdC90YvQvCDQsiDQvdCw0YHRgtGA0L7QudC60LDRhVxyXG4gICAgLy/QuNGB0L/QvtC70L3QuNGC0LXQu9C10Lkg0LrQvtGC0L7RgNGL0YUg0L3QtdGCINCyINC90LDRgdGC0YDQvtC50LrQsCDRgdC60YDRi9Cy0LDQtdC8XHJcbiAgICB0aGlzLm1vZGlmeVdvcmtlcnNMaXN0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgcGFyYW1zX3VzZXJfd29ya2VycyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BhcmFtc191c2VyX3dvcmtlcnMnKSk7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXNfdXNlcl93b3JrZXJzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ9Cd0LXRgiDRgdC+0LHRgdGC0LLQtdC90L3QvtCz0L4g0YHQv9C40YHQutCwINGB0L7RgtGA0YPQtNC90LjQutC+0LInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXJhbXNfdXNlcl93b3JrZXJzID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2xldCBkYXJ0X3dvcmtlcnNfbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRlcm5hbF93b3JrZXInKTtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBkYXJ0X3dvcmtlcnNfbGlzdC5vcHRpb25zOyAvL9GB0L/QuNGB0L7QuiDQstGB0LXRhSDRgdC+0YLRgNGD0LTQvdC40LrQvtCyINC40Lcg0YHQtdC70LXQutGC0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblxyXG4gICAgICAgIC8v0LXRgdC70Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40Lkg0YHQv9C40YHQvtC6INGB0L7RgtGA0YPQtNC90LjQutC+0LIg0L3QtSDQv9GD0YHRglxyXG4gICAgICAgIC8v0Lgg0LXRgdC70Lgg0LIg0LfQsNC00LDRh9C1INGD0YfQsNGB0YLQstGD0LXRgiDRgdC+0YLRgNGD0LTQvdC40Log0LrQvtGC0L7RgNC+0LPQviDQvdC10YIg0LIg0YHQv9C40YHQutC1INC+0YHRgtCw0LLQu9GP0Y4g0LXQs9C+INC+0YLQutGA0YvRgtGL0LxcclxuICAgICAgICBpZiAocGFyYW1zX3VzZXJfd29ya2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy/Qv9C+0LvRg9GH0LDRjiDRgdC/0LjRgdC+0Log0LLRgdC10YUg0YPRh9Cw0YHRgtC90LjQutC+0LIg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgICAgIGxldCB0YXNrX3dvcmtlcnMgPSBnZXRBbGxXb3JrZXJzKCk7XHJcbiAgICAgICAgICAgIGxldCB0YXNrX3dvcmtlcnNfaWQgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8v0YHRgNCw0LLQvdC10L3QuNC1INGB0L/QuNGB0LrQvtCyLCDQtdGB0LvQuCDRgNCw0LHQvtGC0L3QuNC60LAg0L3QtdGCINCyINGB0L/QuNGB0LrQtSDQuNC3INC90LDRgdGC0YDQvtC10Log0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPIC0g0LTQvtCx0LDQstC70Y/RjlxyXG4gICAgICAgICAgICAvL9GB0L3QsNGH0LDQu9CwINC90YPQttC90L4g0L/QvtC70YPRh9C40YLRjCDRgdC+0L7RgtCy0LXRgtGB0LLQuNC1INC40LzRjyDRgdC+0YLRgNGD0LTQvdC40LrQsCAtPiBvcHRpb24udmFsdWUg0YIu0LUuINC70L7Qs9C40L0g0YHQvtGC0YDRg9C00L3QuNC60LAg0L3QsCDQsNC90LPQu9C40YbQutC+0LxcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWZfZmluZCA9IGZpbmRJbkFycmF5KHRhc2tfd29ya2Vycywgb3B0aW9uc1tpXS50ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaWZfZmluZCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFza193b3JrZXJzX2lkLnB1c2gob3B0aW9uc1tpXS52YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/Qt9Cw0YLQtdC8INGB0YDQsNCy0L3QuNGC0Ywg0YHQviDRgdC/0LjRgdC60L7QvCDQuNC3INC90LDRgdGC0YDQvtC10LpcclxuICAgICAgICAgICAgLy/QuCDQtNC+0LHQsNCy0LjRgtGMINGA0LDQsdC+0YLQvdC40LrQsCDQtdGB0LvQuCDQtdCz0L4g0L3QtdGCINCyINGB0L/QuNGB0LrQtVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhc2tfd29ya2Vyc19pZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlmX2ZpbmQgPSBmaW5kSW5BcnJheShwYXJhbXNfdXNlcl93b3JrZXJzLCB0YXNrX3dvcmtlcnNfaWRbaV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpZl9maW5kIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtc191c2VyX3dvcmtlcnMucHVzaCh0YXNrX3dvcmtlcnNfaWRbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKCfQkiDRgdC/0LjRgdC+0Log0LTQvtCx0LDQstC70LXQvSAnKyB0YXNrX3dvcmtlcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtb2RpZnlTZWxlY3RPcHRpb25zTGlzdChvcHRpb25zLCBwYXJhbXNfdXNlcl93b3JrZXJzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8v0LIg0YHQv9C40YHQutC1INC40YHQv9C+0LvQvdC40YLQtdC70LXQuSDQvtGC0LzQtdGH0LDRjiBzZWxlY3RlZCDRgNCw0LHQvtGC0L3QuNC60LAg0L7RgdGC0LDQstC40LLRiNC10LPQviDQv9C+0YHQu9C10LTQvdC40Lkg0LrQvtC80LzQtdC90YLRgNC40Lkg0LIg0LfQsNC00LDRh9C1XHJcbiAgICB0aGlzLnNldFNlbGVjdGVkSW5Xb3JrZXJzTGlzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbGFzdF9yb3cgPSBnZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuICAgICAgICBsYXN0X3JvdyA9IGxhc3Rfcm93W2xhc3Rfcm93Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGxldCBsYXN0X3dvcmtlciA9IGxhc3Rfcm93LmNoaWxkcmVuWzRdLnRleHRDb250ZW50O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhcnRfd29ya2Vyc19saXN0Lm9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGxhc3Rfd29ya2VyID09PSBkYXJ0X3dvcmtlcnNfbGlzdC5vcHRpb25zW2ldLnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGRhcnRfd29ya2Vyc19saXN0Lm9wdGlvbnNbaV0uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcclxuICAgICAgICAgICAgICAgIC8vZmlyZUV2ZW50INC90YPQttC10L0g0YfRgtC+0LHRiyDQstGL0LfQstCw0YLRjCDQv9C+0LLQtdGI0LXQvdC90YPRjiDQvdCwINGB0L7QsdGL0YLQuNC1INGE0YPQvdC60YbQuNGOXHJcbiAgICAgICAgICAgICAgICAvL9CyINC60L7RgtC+0YDQvtC5INC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0YDQsNCx0L7RgtC90LjQuiDQsiDRgdC/0LjRgdC+0Log0LTQu9GPINGA0LDRgdGB0YvQu9C60Lgg0YEg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgICAgICAgICBsZXQgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcclxuICAgICAgICAgICAgICAgIGV2dC5pbml0RXZlbnQoJ2NoYW5nZScsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGRhcnRfd29ya2Vyc19saXN0LmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50ZXJuYWxfd29ya2VyJykpIHtcclxuICAgICAgICB0aGlzLm1vZGlmeVdvcmtlcnNMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZEluV29ya2Vyc0xpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RfaWQnKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xpZW50X2lkJykpIHtcclxuICAgICAgICB0aGlzLm1vZGlmeVByb2plY3RMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0L/QvtC70LUg0LLQstC+0LTQsCBpZCDQt9Cw0LTQsNGH0Lgg0Lgg0L/QtdGA0LXRhdC+0LQg0Log0LfQsNC00LDRh9C1XHJcblxyXG4gICAgbGV0IGdvVG9GaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb1RvJyk7XHJcbiAgICBnb1RvRmllbGQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG59XHJcblxyXG5leHBvcnQge2VsZW1zTW9kaWZpY2F0aW9ufTtcclxuXHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCBlbGVtc01vZGlmaWNhdGlvbicpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZWxlbXNNb2RpZmljYXRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIHNhdmVOZXdDb21tZW50Jyk7XHJcbn1cclxuXHJcbmltcG9ydCB7IGdldFRhc2tJZCB9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5cclxuLy/QodC+0YXRgNCw0L3QtdC90LjQtSDQutC+0LzQvNC10L3RgtCw0YDQuNGPINCyIGxvY2FsU3RvcmFnZVxyXG4vL9C90LAg0YHQu9GD0YfQsNC5INCy0L3QtdC30LDQv9C90L7Qs9C+INC30LLQtdGA0YjQtdC90LjRjyDRgdC10YHRgdC40LhcclxuZnVuY3Rpb24gc2F2ZU5ld0NvbW1lbnQoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0ICRmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0Jyk7XHJcbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXJlYS13cmFwJyk7XHJcblxyXG4gICAgbGV0IHRhc2tfaWQgPSBnZXRUYXNrSWQoKTtcclxuXHJcbiAgICAvL9C00L7QsdCw0LLQu9GOINC60L3QvtC/0LrRgyDQtNC70Y8g0LLRgdGC0LDQstC60Lgg0YHQvtGF0YDQsNC90LXQvdC90L7Qs9C+INGC0LXQutGB0YLQsFxyXG4gICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0JVVFRPTicpO1xyXG4gICAgYnRuLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidG4taW5zZXJ0LWxzJyk7XHJcbiAgICBidG4uaWQgPSdidG4taW5zZXJ0LWxzJztcclxuICAgIGJ0bi5pbm5lckhUTUwgPSAn0JLRgdGC0LDQstC40YLRjCDQuNC3IExTJztcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdub25lJyk7IC8v0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0YHQutGA0YvRgtCwXHJcblxyXG4gICAgd3JhcC5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuICAgIC8v0LXRgdC70Lgg0LXRgdGC0Ywg0YHQvtGF0YDQsNC90LXQvdC90YvQuSDRgtC10LrRgdGCIC0g0L/QvtC60LDQt9Cw0YLRjCDQutC90L7Qv9C60YNcclxuICAgIHNob3dQYXN0ZUJ0bihidG4sIHRhc2tfaWQpO1xyXG5cclxuICAgIC8v0LLRgdGC0LDQstC40YLRjCDRgtC10LrRgdGCINC/0L4g0LrQu9C40LrRg1xyXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkZmllbGQudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFzaycgKyB0YXNrX2lkKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL9Ch0L7RhdGA0LDQvdC40YLRjCDRgtC10LrRgdGCINC40Lcg0L/QvtC70Y8g0L/RgNC4INC90LDQsdC+0YDQtSDQuNC70Lgg0L/QvtGC0LXRgNC1INGE0L7QutGD0YHQsFxyXG4gICAgJGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc2F2ZVRhc2tDb21tZW50KTtcclxuXHJcbiAgICAvL9C10YHQu9C4INC10YHRgtGMINGB0L7RhdGA0LDQvdC10L3QvdGL0Lkg0YLQtdC60YHRgiAtINC/0L7QutCw0LfQsNGC0Ywg0LrQvdC+0L/QutGDXHJcbiAgICAkZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzaG93UGFzdGVCdG4oYnRuLCB0YXNrX2lkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3cmFwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2F2ZVRhc2tDb21tZW50KCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrJyArIHRhc2tfaWQsIHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dQYXN0ZUJ0bihidXR0b24sIGlkKSB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrJyArIGlkKSAhPT0gJycgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2snICsgaWQpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdub25lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge3NhdmVOZXdDb21tZW50fTtcclxuXHJcbmlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lRW5kKCdsb2FkIHNhdmVOZXdDb21tZW50Jyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zYXZlTmV3Q29tbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWUoJ2xvYWQgY29weVBhc3RlQ29tbWVudFF1b3RlJyk7XHJcbn1cclxuXHJcbmltcG9ydCB7cnVuT25LZXlzfSBmcm9tICcuL191dGlscy5qcyc7XHJcbmltcG9ydCB7Z2V0QWxsQ2FtbWVudHN9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5cclxuLy/QstGL0LTQtdC70LXQvdC40LUg0YLQtdC60YHRgtCwINCyINC60LDQvNC10L3RgtC1INC4INCy0YHRgtCw0LLQutCwINC+0YTQvtGA0LzQu9C10L3QvdCw0Y8g0LrQsNC6INGG0LjRgtCw0YLQsCDQtNC70Y8gbWFya2Rvd25cclxuZnVuY3Rpb24gY29weVBhc3RlQ29tbWVudFF1b3RlICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgY2FtbWVudHMgPSBBcnJheS5mcm9tKGdldEFsbENhbW1lbnRzKCkpO1xyXG5cclxuICAgIGNhbW1lbnRzLm1hcChmdW5jdGlvbiAoY2FtbWVudCkge1xyXG4gICAgICAgIGNhbW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZWxlY3Rpb24nLHNlbGVjdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgZWRpdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmb3JtYXRBbmRJbnNldENvbW1lbnRRdW90ZShlbGVtKSB7XHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NlbGVjdGlvbicpKXtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0UG9zID0gZWxlbS5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICAgICAgbGV0IGVuZFBvcyA9IGVsZW0uc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3Rpb24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdHJpbmdzID0gc2VsZWN0aW9uLnNwbGl0KCdcXG4nKTtcclxuXHJcbiAgICAgICAgICAgIHN0cmluZ3MgPSBzdHJpbmdzLm1hcChmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuICc+ICcrc3RyO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHN0cmluZ3Muam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZWxlY3Rpb24gPSAnXFxuJytzZWxlY3Rpb24rJ1xcbic7XHJcblxyXG4gICAgICAgICAgICBlbGVtLnZhbHVlID0gZWxlbS52YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpXHJcbiAgICAgICAgICAgICAgICArIHNlbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgKyBlbGVtLnZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIGVsZW0udmFsdWUubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZWxlY3Rpb24nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcnVuT25LZXlzKFxyXG4gICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZihkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBlZGl0b3Ipe1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0QW5kSW5zZXRDb21tZW50UXVvdGUoZWRpdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWRpdG9yXHJcbiAgICAgICAgLFxyXG4gICAgICAgIFwiMTZcIixcclxuICAgICAgICBcIjE3XCIsXHJcbiAgICAgICAgXCJWXCIuY2hhckNvZGVBdCgwKVxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IHtjb3B5UGFzdGVDb21tZW50UXVvdGV9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgY29weVBhc3RlQ29tbWVudFF1b3RlJyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3B5UGFzdGVDb21tZW50UXVvdGUuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIHVwZGF0ZU5vdGlmeScpO1xyXG59XHJcblxyXG5pbXBvcnQge2dldFRhc2tJZH0gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcbmltcG9ydCB7ZGVjbE9mTnVtLGxvYWRCeUFqYXh9IGZyb20gJy4vX3V0aWxzLmpzJztcclxuXHJcbmZ1bmN0aW9uIHRhc2tVcGRhdGVOb3RpZnkgKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBwYWdlVXJsID0gd2luZG93LmxvY2F0aW9uO1xyXG4gICAgbGV0IHRhc2tJZCA9IGdldFRhc2tJZCgpO1xyXG5cclxuICAgIC8v0LTQvtCx0LDQstC70LXQvdC40LUg0LrQvdC+0L/QutC4INC/0L7QtNC/0LjRgdC60Lgg0L3QsCDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQsNC80LXQvdGC0LDRhSDQsiDQt9Cw0LTQsNGH0LVcclxuICAgIGxldCBhbGVydEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYWxlcnRCdG4uaWQgPSAndXBkLWFsZXJ0JztcclxuICAgIGFsZXJ0QnRuLmNsYXNzTGlzdC5hZGQoJ2FkZC1hbGVydCcpO1xyXG4gICAgYWxlcnRCdG4udGl0bGUgPSAn0J/QvtC00L/QuNGB0LDRgtGM0YHRjyDQvdCwINGD0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGP0YUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stdGl0bGUnKS5pbnNlcnRCZWZvcmUoYWxlcnRCdG4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJzY3JpYmVFbGVtZW50JykpO1xyXG5cclxuICAgIGFsZXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgIGNoZWNrQ29tbWVudHNVcGRhdGUodGhpcyx0YXNrSWQsZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjaGVja0NvbW1lbnRzVXBkYXRlKGFsZXJ0QnRuLHRhc2tJZCk7XHJcblxyXG4gICAgLy/Qt9Cw0L/Rg9GB0Log0LjQvdGC0LXRgNCy0LDQu9CwINC/0YDQvtCy0LXRgNC60Lgg0LjQt9C80LXQvdC10L3QuNC5INC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cclxuICAgIGxldCBub3RpZnlJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsb2FkQnlBamF4KHBhZ2VVcmwsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjaGVja1VwZGF0ZShkYXRhLHRhc2tJZCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9LCAxMDAwICogNjAgKiA1KTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tVcGRhdGUoYWpheHJlc3BvbnNlLGlkKSB7XHJcbiAgICAgICAgbGV0IGNvbW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXRibCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLWNvbW1lbnQnKTtcclxuICAgICAgICBsZXQgY29tbWVudHNOdW0gPSBjb21tZW50cy5sZW5ndGg7XHJcblxyXG5cclxuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgICAgIGxldCBodG1sRG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhhamF4cmVzcG9uc2UudHJpbSgpLFwidGV4dC9odG1sXCIpO1xyXG4gICAgICAgIGxldCB0YmwgPSBodG1sRG9jLmJvZHkucXVlcnlTZWxlY3RvcignZm9ybVtuYW1lPXRoZUZvcm1dJykuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcblxyXG5cclxuICAgICAgICBsZXQgdXBsb2FkZWRDb21tZW50cyA9IHRibC5xdWVyeVNlbGVjdG9yQWxsKCd0cicpO1xyXG5cclxuICAgICAgICBsZXQgZmlsdGVyZWRDb21tZW50cyA9IEFycmF5LmZyb20odXBsb2FkZWRDb21tZW50cykuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJykubGVuZ3RoID4gMTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gLSAxINGCLtC6LiDQvdGD0LbQvdC+INGD0LHRgNCw0YLRjCDQv9C10YDQstGD0Y4g0YHRgtGA0L7QutGDINGBINC90LDQt9Cy0LDQvdC40Y/QvNC4INGB0YLQvtC70LHRhtC+0LJcclxuICAgICAgICBsZXQgdXBkQ29tbWVudE51bSA9IGZpbHRlcmVkQ29tbWVudHMubGVuZ3RoIC0gMTtcclxuXHJcblxyXG4gICAgICAgIGlmKHVwZENvbW1lbnROdW0gPiBjb21tZW50c051bSl7XHJcbiAgICAgICAgICAgIGxldCBuQ29tbWVudHMgPSB1cGRDb21tZW50TnVtIC0gY29tbWVudHNOdW07XHJcbiAgICAgICAgICAgIGxldCBsYXN0SWQgPSBjb21tZW50c1tjb21tZW50c051bSAtIDFdLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJykuaWQuc3BsaXQoJ18nKVsxXTtcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZU9uUGFnZU5vdGlmeShuQ29tbWVudHMsbGFzdElkKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGVja1VwYWRhdGVPcHRpb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29tbWVudHMtdXBkYXRlJytpZCk7XHJcblxyXG4gICAgICAgICAgICBpZihjaGVja1VwYWRhdGVPcHRpb24gJiYgY2hlY2tVcGFkYXRlT3B0aW9uID09PSAndHJ1ZScpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vdGlmeSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAn0J3QvtCy0YvQuSDQutC+0LzQvNC10L3RgtCw0YDQuNC5JyxcclxuICAgICAgICAgICAgICAgICAgICAndGFnJzogJ25ldy1jb21tZW50LScraWQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2JvZHknOiBodG1sRG9jLnF1ZXJ5U2VsZWN0b3IoJ2gxID4gZm9udCcpLnRleHRDb250ZW50LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBub3RpZnlNZShub3RpZnkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vINC+0YfQuNGB0YLQutCwINC40L3RgtC10YDQstCw0LvQsCAtINC+0YLQutC70Y7Rh9C10L3QuNC1INGD0LLQtdC00L7QvNC70LXQvdC40Lkg0L/QviDQutC70LjQutGDINC90LAg0YPQstC10LTQvtC80LvQtdC90LjQuFxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IG5vdGlmaWNhdGlvbiA9IG5vdGlmeU1lKG5vdGlmeSk7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gaWYobm90aWZpY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNsZWFySW50ZXJ2YWwobm90aWZ5SW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbm90aWZ5TWUobm90aWZ5KSB7XHJcbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uID09PSBcImdyYW50ZWRcIikge1xyXG4gICAgICAgICAgICBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKG5vdGlmeS50aXRsZSwge3RhZzogbm90aWZ5LnRhZywgYm9keTogbm90aWZ5LmJvZHl9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gIT09ICdkZW5pZWQnKSB7XHJcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiAocGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBlcm1pc3Npb24gPT09IFwiZ3JhbnRlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbihub3RpZnkudGl0bGUsIHt0YWc6IG5vdGlmeS50YWcsIGJvZHk6IG5vdGlmeS5ib2R5fSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5vdGlmaWNhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVPblBhZ2VOb3RpZnkobnVtLGxpbmtJZCkge1xyXG4gICAgICAgIGxldCBub3RpZnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZS1ub3RpZnknKTtcclxuXHJcbiAgICAgICAgaWYoIW5vdGlmeSl7XHJcbiAgICAgICAgICAgIG5vdGlmeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50LXRlbXBsYXRlJykuY2xvbmVOb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgbm90aWZ5LmlkID0gJ3BhZ2Utbm90aWZ5JztcclxuICAgICAgICAgICAgbm90aWZ5LmNsYXNzTGlzdC5hZGQoJ2ItY29tbWVudF9ub3RpZnknKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXRibCcpLmFwcGVuZENoaWxkKG5vdGlmeSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vdGlmeS50ZXh0Q29udGVudCA9ICfQkiDQt9Cw0LTQsNGH0LUgJytudW0rJyAnK2RlY2xPZk51bShudW0sIFsn0L3QvtCy0YvQuSDQutC+0LzQvNC10L3RgtCw0YDQuNC5Jywn0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGPJywn0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNC10LInXSk7XHJcblxyXG4gICAgICAgIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIGxpbmsuaHJlZiA9IHdpbmRvdy5sb2NhdGlvbisnIycrbGlua0lkO1xyXG4gICAgICAgIGxpbmsudGFyZ2V0ID0gJ19zZWxmJztcclxuICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ3JlZ3VsYXItbGluaycsJ2NvbW1lbnRzLXVwZGF0ZS1saW5rJyk7XHJcbiAgICAgICAgbGluay50ZXh0Q29udGVudCA9ICfQntCx0L3QvtCy0LjRgtGMINGB0YLRgNCw0L3QuNGG0YMnO1xyXG5cclxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5ocmVmO1xyXG4gICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG5vdGlmeS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vdGlmeTtcclxuICAgIH1cclxuXHJcbiAgICAvL9Cy0LrQu9GO0YfQuNGC0Ywv0L7RgtC60LvRjtGH0LjRgtGMINGD0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtGA0LDQuNGP0YVcclxuICAgIC8v0L3QsCDQvtGC0LrRgNGL0YLQvtC5INGB0YLRgNCw0L3QuNGG0LUg0LfQsNC00LDRh9C4XHJcbiAgICBmdW5jdGlvbiBjaGVja0NvbW1lbnRzVXBkYXRlKGJ0bixpZCxldmVudCA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYoZXZlbnQpe1xyXG4gICAgICAgICAgICBpZihidG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKXtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb21tZW50cy11cGRhdGUnK2lkLCd0cnVlJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScraWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb21tZW50cy11cGRhdGUnK2lkKSA9PT0gJ3RydWUnKXtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge3Rhc2tVcGRhdGVOb3RpZnl9O1xyXG5cclxuaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgdXBkYXRlTm90aWZ5Jyk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90YXNrVXBkYXRlTm90aWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvL9C/0YDQvtC60YDRg9GC0LrQsCDQuiDQutCw0LzQtdC90YLRgyDQv9C+INGP0LrQvtGA0Y4uINCd0YPQttC90LAg0LXRgdC70Lgg0LLRi9C30LLQsNC9IGNvbW1lbnRzRGVzaWduKClcclxuZnVuY3Rpb24gYW5jaG9yTGluaygpIHtcclxuICAgIC8v0L7QsdGA0LDQsdC+0YLQutCwINGB0YHRi9C70L7QuiDRgSBpZCDQutCw0LzQtdC90YLQsCDQsiDRhdC10YjQtVxyXG4gICAgLy/Rgi7Qui4g0LjQty3Qt9CwINC40LfQvNC10L3QtdC90LjRjyDQstGL0YHQvtGC0Ysg0LrQsNC80LXQvdGC0L7QsiDQuCDRgdC+0L7RgtCy0LXRgtGB0LLQtdC90L3QviDRgdGC0YDQsNC90LjRhtGLINCyIG1vZHVsZXMuY2FtbWVudHNEZXNpZ24oKVxyXG4gICAgLy/QvtC90Lgg0YDQsNCx0L7RgtCw0Y7RgiDQvdC1INC/0YDQsNCy0LjQu9GM0L3QvlxyXG5cclxuICAgIGxldCBjYW1tZW50SWQgPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuXHJcbiAgICBjYW1tZW50SWQgPSBjYW1tZW50SWQuc2xpY2UoMSwgY2FtbWVudElkLmxlbmd0aCk7XHJcblxyXG4gICAgLy/QtNC+0LHQsNCy0LvRj9GOIHNldFRpbWVvdXQg0YIu0LouINC/0L7QutCwINC90LUg0L/RgNC40LTRg9C80LDQuyDQutCw0Log0L7RgtC70L7QstC40YLRjFxyXG4gICAgLy/Rh9GC0L4g0L/QtdGA0LXQtNC10LvQutCwINGB0YLRgNCw0L3QuNGG0Ysg0LfQsNC60L7QvdGH0LXQvdCwINC4INCy0YvRgdC+0YLQsCDQuCDQv9C+0LfQuNGG0LjRjyDQutCw0LzQtdC90YLQsFxyXG4gICAgLy/QuiDQutC+0YLQvtGA0L7QvNGDINC90YPQttC90L4g0L/RgNC+0LrRgNGD0YLQuNGC0Ywg0LHRg9C00LXRgiDRgNCw0YHRgdGH0LjRgtCw0L3QsCDQv9GA0LDQstC40LvRjNC90L5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChjYW1tZW50SWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdhbmNob3JMaW5rIHN0YXJ0Jyk7XHJcbiAgICAgICAgICAgIC8v0LjRidGDINGB0LrRgNGL0YLRi9C5INGH0LXQutCx0L7QutGBINGBIGlkINC4INC+0YIg0L3QtdCz0L4g0LLQstC10YDRhSDQtNC+INC60LDRgNGC0L7Rh9C60Lgg0LrQsNC80LXQvdGC0LAgYi1jb21tZW50XHJcbiAgICAgICAgICAgIGxldCBjYW1tZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWNrYm94XycgKyBjYW1tZW50SWQpLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBjYW1tZW50Lm9mZnNldFRvcDtcclxuXHJcbiAgICAgICAgICAgIGFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgICAgICAgICAgICB0aW1pbmc6IGZ1bmN0aW9uICh0aW1lRnJhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGltZUZyYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRyYXc6IGZ1bmN0aW9uIChwcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvWShkaXN0YW5jZSwgcHJvZ3Jlc3MpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDYwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGUob3B0aW9ucykge1xyXG4gICAgbGV0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uIGFuaW1hdGUodGltZSkge1xyXG4gICAgICAgIGxldCB0aW1lRnJhY3Rpb24gPSAodGltZSAtIHN0YXJ0KSAvIG9wdGlvbnMuZHVyYXRpb247XHJcbiAgICAgICAgaWYgKHRpbWVGcmFjdGlvbiA+IDEpIHRpbWVGcmFjdGlvbiA9IDE7XHJcblxyXG4gICAgICAgIGxldCBwcm9ncmVzcyA9IG9wdGlvbnMudGltaW5nKHRpbWVGcmFjdGlvbik7XHJcblxyXG4gICAgICAgIG9wdGlvbnMuZHJhdyhwcm9ncmVzcyk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lRnJhY3Rpb24gPCAxKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNjcm9sbFRvWShkaXN0YW5zZSwgcHJvZ3Jlc3MpIHtcclxuICAgIGxldCBzY3JvbGxZID0gd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzY3JvbGxZICsgKChkaXN0YW5zZSAtIHNjcm9sbFkpICogcHJvZ3Jlc3MpKTtcclxufVxyXG5cclxuZXhwb3J0IHthbmNob3JMaW5rfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hbmNob3JMaW5rLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZSgnbG9hZCB1c2VyU2V0dGluZ3MnKTtcclxufVxyXG5cclxuLy8g0LTQvtCx0LDQstC70LXQvdC40LUg0L3QsCDRgdGC0YDQsNC90LjRhtGDINC90L7QstC+0Lkg0LfQsNC00LDRh9C4INCx0LvQvtC60LAg0L3QsNGB0YLRgNC+0LXQuiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cclxuXHJcbmZ1bmN0aW9uIHVzZXJTZXR0aW5ncygpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIC8v0LTQvtCx0LDQstC70LXQvdC40LUv0YPQtNCw0LvQtdC90LjQtSDQstGL0LHRgNCw0L3QvdGL0YUg0L/RgNC+0LXQutGC0L7QsiDQsiDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60L7QvCDRgdC/0LjRgdC60LVcclxuICAgIC8v0YHQvtGF0YDQsNC90LXQvdC40LUg0LIgbG9jYWxTdG9yYWdlINC4INGB0LrRgNGL0YLRjCDQv9C+0LrQsNC30LDRgtGMINCyIHNlbGVjdCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuICAgIGxldCAkY29udGVudF9jZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybVtuYW1lPVwidGhlRm9ybVwiXScpO1xyXG5cclxuICAgIC8v0YHQvtC30LTQsNC90LjQtSDQsdC70L7QutCwINCyINC60L7RgtC+0YDQvtC8INCx0YPQtNGD0YIg0LLRgdC1INGN0LvQtdC80LXQvdGC0Ysg0YPQv9GA0LDQstC70LXQvdC40Y8g0L3QsNGB0YLRgNC+0LnQutCw0LzQuFxyXG4gICAgbGV0ICR1c2VyX3NldHRpbmdzX2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgJHVzZXJfc2V0dGluZ3NfYm94LmlkID0gJ3NldHRpbmdzLWJveCc7XHJcbiAgICAkY29udGVudF9jZWxsLmluc2VydEJlZm9yZSgkdXNlcl9zZXR0aW5nc19ib3gsICRjb250ZW50X2NlbGwuZmlyc3RDaGlsZCk7XHJcblxyXG4gICAgLy/RgdC+0LfQtNCw0L3QuNC1INC60L3QvtC/0LrQuCDQv9C+0LrQsNC30LDRgtGML9GB0LrRgNGL0YLRjCDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60LjQtSDQvdCw0YHRgtGA0L7QudC60LhcclxuICAgIGxldCAkc2V0dGluZ3NfYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAkc2V0dGluZ3NfYnRuLmlubmVySFRNTCA9ICfQn9C+0LrQsNC30LDRgtGML9GB0LrRgNGL0YLRjCDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60LjQtSDQvdCw0YHRgtGA0L7QudC60LgnO1xyXG4gICAgJHNldHRpbmdzX2J0bi5pZCA9ICdzZXR0aW5ncy1idG4nO1xyXG4gICAgJHNldHRpbmdzX2J0bi50eXBlID0gJ2J1dHRvbic7XHJcblxyXG4gICAgJHNldHRpbmdzX2J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkdXNlcl9zZXR0aW5nc19ib3guY2xhc3NMaXN0LnRvZ2dsZSgnaXMtb3BlbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJGNvbnRlbnRfY2VsbC5pbnNlcnRCZWZvcmUoJHNldHRpbmdzX2J0biwgJGNvbnRlbnRfY2VsbC5maXJzdENoaWxkKTtcclxuXHJcbiAgICAvL9GB0L7Qt9C00LDQvdC40LUg0LrQsNGB0YLQvtC80L3QvtCz0L4g0YHQv9C40YHQutCwINC/0YDQvtC10LrRgtC+0LJcclxuICAgIC8vaWRgcyBhcnJheVxyXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFza0xpc3RIVE1MKCkge1xyXG4gICAgICAgIGlmKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFyYW1zX3VzZXJfcHJvamVjdHMnKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYXJhbXNfdXNlcl9wcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KFtdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFyYW1zX3VzZXJfcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYXJhbXNfdXNlcl9wcm9qZWN0cycpKTtcclxuXHJcbiAgICAgICAgY29uc3QgUFJPSkVDVFNfTElTVF9QQVJBTVMgPSB7XHJcbiAgICAgICAgICAgICdpZCc6ICdjdXN0b20tcHJvamVjdC1saXN0JyxcclxuICAgICAgICAgICAgJ3RpdGxlJzogJ9Ch0L7QsdGB0YLQstC10L3QvdGL0Lkg0YHQv9C40YHQvtC6INC/0YDQvtC10LrRgtC+0LInLFxyXG4gICAgICAgICAgICAnc291cmNlJzogJ3Byb2plY3RfaWQnLFxyXG4gICAgICAgICAgICAnc3RvcmFnZSc6IHBhcmFtc191c2VyX3Byb2plY3RzLFxyXG4gICAgICAgICAgICAnc3RvcmFnZV9uYW1lJzogJ3BhcmFtc191c2VyX3Byb2plY3RzJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCAkY3VzdG9tX3Byb2plY3RzX2xpc3QgPSBjcmVhdGVJbnNlcnRXb3JrZXJzUHJvamVjdHNMaXN0cyhQUk9KRUNUU19MSVNUX1BBUkFNUyk7XHJcblxyXG4gICAgICAgICR1c2VyX3NldHRpbmdzX2JveC5pbnNlcnRCZWZvcmUoJGN1c3RvbV9wcm9qZWN0c19saXN0LCAkdXNlcl9zZXR0aW5nc19ib3guZmlyc3RDaGlsZCk7XHJcblxyXG4gICAgICAgIGhpZ2hsaWdodFNlbGVjdGVkKCRjdXN0b21fcHJvamVjdHNfbGlzdCwgcGFyYW1zX3VzZXJfcHJvamVjdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v0YHQvtC30LTQsNC90LjQtSDQutCw0YHRgtC+0LzQvdC+0LPQviDRgdC/0LjRgdC60LAg0LjRgdC/0L7Qu9C90LjRgtC10LvQtdC5XHJcbiAgICAvL2lkYHMgYXJyYXlcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVdvcmtlcnNMaXN0SFRNTCgpIHtcclxuICAgICAgICBpZighbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BhcmFtc191c2VyX3dvcmtlcnMnKSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYXJhbXNfdXNlcl93b3JrZXJzJywgSlNPTi5zdHJpbmdpZnkoW10pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXNfdXNlcl93b3JrZXJzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFyYW1zX3VzZXJfd29ya2VycycpKTtcclxuXHJcbiAgICAgICAgY29uc3QgV09SS0VSU19MSVNUX1BBUkFNUyA9IHtcclxuICAgICAgICAgICAgJ2lkJzogJ2N1c3RvbS13b3JrZXJzLWxpc3QnLFxyXG4gICAgICAgICAgICAndGl0bGUnOiAn0KHQvtCx0YHRgtCy0LXQvdC90YvQuSDRgdC/0LjRgdC+0Log0LjRgdC/0L7Qu9C90LjRgtC10LvQtdC5JyxcclxuICAgICAgICAgICAgJ3NvdXJjZSc6ICdpbnRlcm5hbF93b3JrZXInLFxyXG4gICAgICAgICAgICAnc3RvcmFnZSc6IHBhcmFtc191c2VyX3dvcmtlcnMsXHJcbiAgICAgICAgICAgICdzdG9yYWdlX25hbWUnOiAncGFyYW1zX3VzZXJfd29ya2VycydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgJGN1c3RvbV93b3JrZXJzX2xpc3QgPSBjcmVhdGVJbnNlcnRXb3JrZXJzUHJvamVjdHNMaXN0cyhXT1JLRVJTX0xJU1RfUEFSQU1TKTtcclxuXHJcbiAgICAgICAgJHVzZXJfc2V0dGluZ3NfYm94Lmluc2VydEJlZm9yZSgkY3VzdG9tX3dvcmtlcnNfbGlzdCwgJHVzZXJfc2V0dGluZ3NfYm94LmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgICAgICBoaWdobGlnaHRTZWxlY3RlZCgkY3VzdG9tX3dvcmtlcnNfbGlzdCwgcGFyYW1zX3VzZXJfd29ya2Vycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0L/QvtC00YHQstC10YLQutCwINGB0L7RhdGA0LDQvdC10L3QvdGL0YUg0LIg0L3QsNGB0YLRgNC+0LnQutCw0YUg0Y3Qu9C10LzQtdC90YLQvtCyINGB0L/QuNGB0LrQsFxyXG4gICAgZnVuY3Rpb24gaGlnaGxpZ2h0U2VsZWN0ZWQobGlzdCwgc2V0dGluZ3MpIHtcclxuICAgICAgICBpZiAoIXNldHRpbmdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdubycpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbm9kZTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMobGlzdC5jaGlsZE5vZGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgbm9kZSA9IGxpc3QuY2hpbGROb2Rlc1trZXldO1xyXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuaW5kZXhPZihub2RlLmRhdGFzZXQuaWQpID49IDApIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINC00L7QsdCw0LLQu9C10L3QuNC1INC60L3QvtC/0L7QuiDQstC60LvRjtGH0LXQvdC40Y8v0L7RgtC60LvRjtGH0LXQvdC40Y8g0YDQsNC30L3Ri9GFINC80L7QtNGD0LvQtdC5XHJcbiAgICBsZXQgb3B0aW9uc0Jsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBvcHRpb25zQmxvY2suY2xhc3NMaXN0LmFkZCgndXNlci1saXN0Jyk7XHJcblxyXG4gICAgbGV0IHNldHRpbmdzX3RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIHNldHRpbmdzX3RpdGxlLnRleHRDb250ZW50ID0gJ9Ce0L/RhtC40LgnO1xyXG4gICAgc2V0dGluZ3NfdGl0bGUuY2xhc3NMaXN0LmFkZCgndXNlci10aXRsZScpO1xyXG5cclxuICAgIG9wdGlvbnNCbG9jay5hcHBlbmRDaGlsZChzZXR0aW5nc190aXRsZSk7XHJcblxyXG4gICAgLy/QtNC+0LHQsNCy0LvQtdC90LjQtSDQvdCw0YHRgtGA0L7QudC60LggLSDQstC60Lsv0LLRi9C60Lsg0LPQtdC90LXRgNCw0YbQuNC4INCx0LvQvtC60LAg0YEg0L/QvtC00YHRh9C10YLQvtC8INCy0YDQtdC80LXQvdC4INGD0YfQsNGB0YLQvdC40LrQvtCyINC30LDQtNCw0YfQuFxyXG4gICAgbGV0IGNvdW50VGltZUJ0biA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBjb3VudFRpbWVCdG4uaWQgPSAnY291bnRUaW1lQnRuJztcclxuICAgIGNvdW50VGltZUJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tZmxhdCcsJ3Jvdy1pdGVtJyk7XHJcbiAgICBjb3VudFRpbWVCdG4udGV4dENvbnRlbnQgPSAn0J/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LIg0LfQsNC00LDRh9C1IC0g0JLQutC70Y7Rh9C10L0nO1xyXG5cclxuICAgIGlmKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd29ya2VyLXRpbWUtY291bnQnKSl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dvcmtlci10aW1lLWNvdW50JywgJ3RydWUnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb3VudFRpbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uICgpIHtcclxuICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICBpZih0aGlzLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSl7XHJcbiAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9ICfQn9C+0LTRgdGH0LXRgiDQstGA0LXQvNC10L3QuCDQsiDQt9Cw0LTQsNGH0LUgLSDQktC60LvRjtGH0LXQvSc7XHJcbiAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dvcmtlci10aW1lLWNvdW50JywgJ3RydWUnKTtcclxuICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAn0J/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LIg0LfQsNC00LDRh9C1IC0g0JLRi9C60LvRjtGH0LXQvSc7XHJcbiAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dvcmtlci10aW1lLWNvdW50JywnZmFsc2UnKTtcclxuICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8v0LLQutC70Y7Rh9C40YLRjC/QvtGC0LrQu9GO0YfQuNGC0Ywg0LPQtdC90LXRgNCw0YbQuNGOINCx0LvQvtC60LAg0YEg0L/QvtC00YHRh9C10YLQvtCyINCy0YDQtdC80LXQvdC4INGD0YfQsNGB0YLQvdC40LrQvtCyINC30LDQtNCw0YfQuFxyXG4gICAgZnVuY3Rpb24gY2hlY2tUaW1lQ291bnRPcHRpb24oKSB7XHJcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudFRpbWVCdG4nKTtcclxuXHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dvcmtlci10aW1lLWNvdW50JykgPT09ICd0cnVlJyl7XHJcbiAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9ICfQn9C+0LTRgdGH0LXRgiDQstGA0LXQvNC10L3QuCDQsiDQt9Cw0LTQsNGH0LUgLSDQktC60LvRjtGH0LXQvSc7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSAn0J/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LIg0LfQsNC00LDRh9C1IC0g0JLRi9C60LvRjtGH0LXQvSc7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKi8v0LTQvtCx0LDQstC70LXQvdC40LUg0L3QsNGB0YLRgNC+0LnQutC4IC0g0LLQutC7L9Cy0YvQutC7INGD0LLQtdC00L7QvNC70LXQvdC40Lkg0L4g0L3QvtCy0L7QvCDQutC+0LzQvNC10L3RgtCw0YDQuNC4INCyINC30LDQtNCw0YfQtVxyXG4gICAgbGV0IGNvbW1lbnRzVXBkYXRlQnRuID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIGNvbW1lbnRzVXBkYXRlQnRuLmlkID0gJ2NvbW1lbnRzVXBkYXRlQnRuJztcclxuICAgIGNvbW1lbnRzVXBkYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1mbGF0Jywncm93LWl0ZW0nKTtcclxuICAgIGNvbW1lbnRzVXBkYXRlQnRuLnRleHRDb250ZW50ID0gJ9Cj0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGP0YUgLSDQktC60LvRjtGH0LXQvdGLJztcclxuXHJcbiAgICBjb21tZW50c1VwZGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpe1xyXG4gICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gJ9Cj0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGP0YUgLSDQktC60LvRjtGH0LXQvdGLJztcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScsICd0cnVlJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAn0KPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y/RhSAtINCS0YvQutC70Y7Rh9C10L3Riyc7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb21tZW50cy11cGRhdGUnLCdmYWxzZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8v0LLQutC70Y7Rh9C40YLRjC/QvtGC0LrQu9GO0YfQuNGC0Ywg0YPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0YDQsNC40Y/RhVxyXG4gICAgLy/QvdCwINC+0YLQutGA0YvRgtC+0Lkg0YHRgtGA0LDQvdC40YbQtSDQt9Cw0LTQsNGH0LhcclxuICAgIGZ1bmN0aW9uIGNoZWNrQ29tbWVudHNVcGRhdGUoKSB7XHJcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50c1VwZGF0ZUJ0bicpO1xyXG5cclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29tbWVudHMtdXBkYXRlJykgPT09ICd0cnVlJyl7XHJcbiAgICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9ICfQo9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLQsNGA0LjRj9GFIC0g0JLQutC70Y7Rh9C10L3Riyc7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSAn0KPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y/RhSAtINCS0YvQutC70Y7Rh9C10L3Riyc7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxuICAgIG9wdGlvbnNCbG9jay5hcHBlbmRDaGlsZChjb3VudFRpbWVCdG4pO1xyXG4gICAgLy9vcHRpb25zQmxvY2suYXBwZW5kQ2hpbGQoY29tbWVudHNVcGRhdGVCdG4pO1xyXG5cclxuICAgICR1c2VyX3NldHRpbmdzX2JveC5hcHBlbmRDaGlsZChvcHRpb25zQmxvY2spO1xyXG5cclxuICAgIC8v0LfQsNC/0YPRgdC6INC/0YDQvtCy0LXRgNC+0Log0LLQutC70Y7Rh9C10L3QvdGL0YUv0L7RgtC60LvRjtGH0LXQvdC90YvRhSDQvtC/0YbQuNC5XHJcbiAgICBjaGVja1RpbWVDb3VudE9wdGlvbigpO1xyXG4gICAgLy9jaGVja0NvbW1lbnRzVXBkYXRlKCk7XHJcblxyXG5cclxuICAgIGNyZWF0ZVRhc2tMaXN0SFRNTCgpO1xyXG4gICAgY3JlYXRlV29ya2Vyc0xpc3RIVE1MKCk7XHJcbn1cclxuXHJcbi8v0YHQvtC30LTQsNC90LjQtSDQuCDQtNC+0LHQsNCy0LvQtdC90LjQtSDRgdC/0LjRgdC60LAg0YDQsNCx0L7RgtC90LjQutC+0LIg0Lgg0L/RgNC+0LXQutGC0L7QslxyXG5mdW5jdGlvbiBjcmVhdGVJbnNlcnRXb3JrZXJzUHJvamVjdHNMaXN0cyhwYXJhbXMpIHtcclxuICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIGxpc3QuaWQgPSBwYXJhbXMuaWQ7XHJcbiAgICBsaXN0LmNsYXNzTGlzdC5hZGQoJ3VzZXItbGlzdCcsICdjbGVhcmZpeCcpO1xyXG5cclxuICAgIGxldCBsaXN0X3RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgIGxpc3RfdGl0bGUuaW5uZXJIVE1MID0gcGFyYW1zLnRpdGxlO1xyXG4gICAgbGlzdF90aXRsZS5jbGFzc0xpc3QuYWRkKCd1c2VyLXRpdGxlJyk7XHJcblxyXG4gICAgbGlzdC5hcHBlbmRDaGlsZChsaXN0X3RpdGxlKTtcclxuXHJcbiAgICBsZXQgc291cmNlX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXMuc291cmNlKTtcclxuICAgIGxldCBzb3VyY2VfbGlzdF9pdGVtcyA9IHNvdXJjZV9saXN0Lm9wdGlvbnM7XHJcblxyXG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgbGV0IGxpc3RfaXRlbV9wcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICBsZXQgbGlzdF9pdGVtO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKHNvdXJjZV9saXN0X2l0ZW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBpZiAoc291cmNlX2xpc3RfaXRlbXNba2V5XS52YWx1ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGlzdF9pdGVtID0gbGlzdF9pdGVtX3Byb3RvLmNsb25lTm9kZShmYWxzZSk7XHJcbiAgICAgICAgbGlzdF9pdGVtLmlubmVySFRNTCA9IHNvdXJjZV9saXN0X2l0ZW1zW2tleV0udGV4dDtcclxuICAgICAgICBsaXN0X2l0ZW0uZGF0YXNldC5pZCA9IHNvdXJjZV9saXN0X2l0ZW1zW2tleV0udmFsdWU7XHJcbiAgICAgICAgbGlzdF9pdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzYXZlVXNlclNldHRpbmdzKHBhcmFtcy5zdG9yYWdlLCB0aGlzLCBwYXJhbXMuc3RvcmFnZV9uYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobGlzdF9pdGVtKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxpc3QuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG5cclxuICAgIHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL9GB0L7RhdGA0LDQvdC10L3QuNC1INC/0L7Qu9GM0LfQvtCy0LDQtdGC0LvRjNGB0LrQuNGFINC90LDRgdGC0YDQvtC10LpcclxuLy/QuCDQstGL0LTQtdC70LXQvdC40LUg0YHQvtGF0YDQsNC90LXQvdC90L7Qs9C+INCyINGB0L/QuNGB0LrQsNGFINGA0LDQsdC+0YLQvdC40LrQvtCyINC4INC/0YDQvtC10LrRgtC+0LJcclxuZnVuY3Rpb24gc2F2ZVVzZXJTZXR0aW5ncyhvcHRpb25zLCBsaXN0X2l0ZW0sIHN0b3JhZ2VfaXRlbSkge1xyXG4gICAgbGV0IGlkID0gbGlzdF9pdGVtLmRhdGFzZXQuaWQ7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMuaW5kZXhPZihpZCkgPT09IC0xKSB7XHJcbiAgICAgICAgb3B0aW9ucy5wdXNoKGlkKTtcclxuICAgICAgICBsaXN0X2l0ZW0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gb3B0aW9ucy5pbmRleE9mKGlkKTtcclxuICAgICAgICBvcHRpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgbGlzdF9pdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RvcmFnZV9pdGVtLCBKU09OLnN0cmluZ2lmeShvcHRpb25zKSk7XHJcbiAgICAvL2NvbnNvbGUubG9nKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RvcmFnZV9pdGVtKSkpO1xyXG59XHJcblxyXG5leHBvcnQge3VzZXJTZXR0aW5nc307XHJcblxyXG5pZiAoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbnNvbGUudGltZUVuZCgnbG9hZCB1c2VyU2V0dGluZ3MnKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3VzZXJTZXR0aW5ncy5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpe1xyXG4gICAgY29uc29sZS50aW1lKCdsb2FkIHRhc2tIZWFkZXJEZXNpZ24nKTtcclxufVxyXG5cclxuaW1wb3J0IHtnZXRUYXNrSWQsZ2V0VGFza0hlYWR9IGZyb20gJy4vX2ZpbmRlcnMuanMnO1xyXG5cclxuZnVuY3Rpb24gdGFza0hlYWRlckRlc2lnbigpIHtcclxuXHJcbiAgICBjb25zdCB0YXNrRGF0YSA9IGRhdGFNYWluaW5nKCk7XHJcbiAgICAvL2NvbnNvbGUubG9nKHRhc2tEYXRhKTtcclxuICAgIGxldCBkYXNoYm9hcmQgPSBhZGRMZWZ0Q29sdW1uKCk7XHJcbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgbGV0IGRhdGEgPSBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAn0JfQsNC00LDRh9CwIOKElicsXHJcbiAgICAgICAgICAgICAgICAnZGF0YSc6IFtgPHNwYW4gY2xhc3M9XCJwcmltLWlcIj4ke3Rhc2tEYXRhLnRhc2suaWR9PC9zcGFuPiA8c3BhbiBjbGFzcz1cInNlYy1pXCI+0L7RgiAke3Rhc2tEYXRhLnRhc2suYmVnaW59PC9zcGFuPmBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICfQodGC0LDRgtGD0YEnLFxyXG4gICAgICAgICAgICAgICAgJ2RhdGEnOiBbYDxzcGFuIGNsYXNzPVwicmVnLWlcIj4ke3Rhc2tEYXRhLnRhc2suc3RhdGV9PC9zcGFuPmBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgJ3RpdGxlJzogJ9CY0LXRgNCw0YDRhdC40Y8nLFxyXG4gICAgICAgICAgICAvLyAgICAgJ2RhdGEnOiBbXVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICfQl9Cw0Y/QstC40YLQtdC70YwnLFxyXG4gICAgICAgICAgICAgICAgJ2RhdGEnOiBbYDxzcGFuIGNsYXNzPVwicHJpbS1pXCI+JHt0YXNrRGF0YS5vd25lci5uYW1lfTwvc3Bhbj5gLGA8YSBocmVmPVwibWFpbHRvOiR7dGFza0RhdGEub3duZXIuZW1haWx9XCIgY2xhc3M9XCJyZWctaVwiPiR7dGFza0RhdGEub3duZXIuZW1haWx9PC9hPmBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzogJ9Cf0YDQvtC10LrRgicsXHJcbiAgICAgICAgICAgICAgICAnZGF0YSc6IFtgPHNwYW4gY2xhc3M9XCJwcmltLWlcIj4ke3Rhc2tEYXRhLnByb2plY3R9PC9zcGFuPmBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzogJ9Ci0LjQvyDQt9Cw0LTQsNGH0LgnLFxyXG4gICAgICAgICAgICAgICAgJ2RhdGEnOiBbYDxzcGFuIGNsYXNzPVwicmVnLWlcIj4ke3Rhc2tEYXRhLnRhc2sudHlwZX08L3NwYW4+YF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAn0JLRgNC10LzRjycsXHJcbiAgICAgICAgICAgICAgICAnZGF0YSc6IFtgPHNwYW4gY2xhc3M9XCJyZWctaVwiPiR7dGFza0RhdGEudGltZS5zcGVudH0g0LzQuNC9Ljwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJzZWMtaVwiPtC40LcgJHt0YXNrRGF0YS50aW1lLnBsYW5uZWR9PC9zcGFuPiA8c3BhbiBjbGFzcz1cIiR7Y291bnRMZWZ0VGltZSh0YXNrRGF0YS50aW1lLnNwZW50LCB0YXNrRGF0YS50aW1lLnBsYW5uZWQpfVwiPigke3Rhc2tEYXRhLnRpbWUubGVmdH0pPC9zcGFuPmBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICBdO1xyXG5cclxuICAgIGRhc2hib2FyZC5hcHBlbmRDaGlsZChjcmVhdGVUZW1wbGF0ZShkYXRhLGZyYWdtZW50KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRhdGFNYWluaW5nKCkge1xyXG4gICAgbGV0IHNvdXJzZVRibCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWJhcicpLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgbGV0IHRkID0gQXJyYXkuZnJvbShzb3Vyc2VUYmwucXVlcnlTZWxlY3RvckFsbCgndGQnKSk7XHJcblxyXG4gICAgLy/Qt9Cw0LTQsNGH0LBcclxuICAgICAgICAvL9C90LDQt9Cy0LDQvdC40LUgIVxyXG4gICAgICAgIC8v0L3QvtC80LXRgCAoaWQpICFcclxuICAgICAgICAvL9C00LDRgtCwINC90LDRh9Cw0LvQsCAhXHJcbiAgICAgICAgLy/RgtC40L8g0LfQsNC00LDRh9C4ICFcclxuICAgIC8v0LfQsNCy0LjRgtC10LvRjFxyXG4gICAgICAgIC8v0LjQvNGPICFcclxuICAgICAgICAvL9C/0L7Rh9GC0LAgIVxyXG4gICAgICAgIC8v0L7RgNCz0LDQvdC40LfQsNGG0LjRjyAhXHJcbiAgICAvL9C/0YDQvtC10LrRgiAhXHJcblxyXG4gICAgLy/QstGA0LXQvNGPXHJcbiAgICAgICAgLy/Qv9C70LDQvdC40YDRg9C10LzQvtC1XHJcbiAgICAgICAgLy/Qt9Cw0YLRgNCw0YfQtdC90L5cclxuICAgICAgICAvL9C+0YHRgtCw0LvQvtGB0YxcclxuXHJcbiAgICBsZXQgc291cmNlID0ge307XHJcbiAgICBjb25zdCB0YXNrSGVhZCA9IGdldFRhc2tIZWFkKCk7XHJcblxyXG4gICAgc291cmNlLnRhc2sgPSB7XHJcbiAgICAgICAgJ3RpdGxlJzogdGFza0hlYWQudGl0bGUsXHJcbiAgICAgICAgJ2lkJzogZ2V0VGFza0lkKCksXHJcbiAgICAgICAgJ2JlZ2luJzogZmluZEluQ2VsbHModGQsJ9CU0LDRgtCwJyksXHJcbiAgICAgICAgJ3R5cGUnOiBmaW5kSW5DZWxscyh0ZCwn0KLQuNC/JyksXHJcbiAgICAgICAgJ3N0YXRlJzogdGFza0hlYWQuc3RhdGVcclxuICAgIH07XHJcblxyXG4gICAgbGV0IG93bmVyID0gZmluZEluQ2VsbHModGQsJ9CX0LDRj9Cy0LjRgtC10LvRjCcsdHJ1ZSk7XHJcblxyXG4gICAgc291cmNlLm93bmVyID0ge1xyXG4gICAgICAgICduYW1lJzogb3duZXJbMF0ucmVwbGFjZSgvPFtePl0qPi9nLCAnJyksXHJcbiAgICAgICAgJ2VtYWlsJzogb3duZXJbMV0sXHJcbiAgICAgICAgJ2YnOiBvd25lclsyXS5yZXBsYWNlKC88W14+XSo+L2csICcnKVxyXG4gICAgfTtcclxuXHJcbiAgICBzb3VyY2UudGltZSA9IHtcclxuICAgICAgICAnc3BlbnQnIDogcGFyc2VJbnQoZmluZEluQ2VsbHModGQsJ9CX0LDRgtGA0LDRh9C10L3QvicpKSxcclxuICAgICAgICAncGxhbm5lZCc6ICBwYXJzZUludChmaW5kSW5DZWxscyh0ZCwn0J/Qu9Cw0L3QuNGA0YPQtdC80L7QtScpKSxcclxuICAgICAgICAnbGVmdCc6ICBwYXJzZUludChmaW5kSW5DZWxscyh0ZCwn0J7RgdGC0LDQstGI0LXQtdGB0Y8nKSlcclxuICAgIH07XHJcblxyXG4gICAgc291cmNlLnByb2plY3QgPSBmaW5kSW5DZWxscyh0ZCwn0J/RgNC+0LXQutGCJyk7XHJcblxyXG4gICAgcmV0dXJuIHNvdXJjZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZEluQ2VsbHMoYXJyLHN0cixwYXJzZSA9IGZhbHNlKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gYXJyLmZpbHRlcihmdW5jdGlvbiAoY2VsbCkge1xyXG4gICAgICAgIGlmKGNlbGwudGV4dENvbnRlbnQudHJpbSgpLmluY2x1ZGVzKHN0cikpe1xyXG4gICAgICAgICAgICByZXR1cm4gY2VsbFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmKHBhcnNlKXtcclxuICAgICAgICByZXR1cm4gcmVzdWx0WzBdLm5leHRFbGVtZW50U2libGluZy5pbm5lckhUTUwuc3BsaXQoJzxicj4nKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0WzBdLm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudC50cmltKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZExlZnRDb2x1bW4oKSB7XHJcbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluLWNvbnRlbnQnKTtcclxuICAgIGxldCBjb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbC5jbGFzc0xpc3QuYWRkKCdsZWZ0LWNvbCcpO1xyXG4gICAgd3JhcC5pbnNlcnRCZWZvcmUoY29sLCB3cmFwLmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgIGxldCBkYXNoYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRhc2hib2FyZC5jbGFzc0xpc3QuYWRkKCd0YXNrLWRhc2hib2FyZCcpO1xyXG4gICAgY29sLmFwcGVuZENoaWxkKGRhc2hib2FyZCk7XHJcblxyXG4gICAgcmV0dXJuIGRhc2hib2FyZDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGUoZGF0YUFycixwbGFjZWhvbGRlcikge1xyXG4gICAgZGF0YUFyci5tYXAoZnVuY3Rpb24gKGdyb3VwKSB7XHJcbiAgICAgICAgbGV0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYmxvY2suY2xhc3NMaXN0LmFkZCgndHh0LWJsb2NrJyk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgdmFsIG9mIGdyb3VwKXtcclxuICAgICAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3R4dC1ibG9ja19fdGl0bGUnKTtcclxuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSB2YWwudGl0bGU7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkYXRhLmNsYXNzTGlzdC5hZGQoJ3R4dC1ibG9ja19fZGF0YScpO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBzdHIgb2YgdmFsLmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgICAgICAgICBwLmlubmVySFRNTCA9IHN0cjtcclxuICAgICAgICAgICAgICAgIGRhdGEuYXBwZW5kQ2hpbGQocCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgICAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwbGFjZWhvbGRlci5hcHBlbmRDaGlsZChibG9jaylcclxuICAgIH0pO1xyXG5cclxuICAgIC8vY29uc29sZS5sb2cocGxhY2Vob2xkZXIpO1xyXG4gICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb3VudExlZnRUaW1lKHNwZW50LHBsYW4pIHtcclxuICAgIGxldCBjc3NjbGFzcyA9ICdyZWctaSc7XHJcblxyXG4gICAgaWYocGFyc2VJbnQoc3BlbnQpID4gcGFyc2VJbnQocGxhbikpe1xyXG4gICAgICAgIGNzc2NsYXNzID0gJ2FsZXJ0LWknO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNzc2NsYXNzO1xyXG59XHJcblxyXG5cclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3Bjc3MvdGFza0hlYWRlckRlc2lnbi5wY3NzJztcclxuXHJcbmV4cG9ydCB7dGFza0hlYWRlckRlc2lnbn07XHJcblxyXG5pZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ2xvYWQgdGFza0hlYWRlckRlc2lnbicpO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGFza0hlYWRlckRlc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdGFza0hlYWRlckRlc2lnbi5wY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3Rhc2tIZWFkZXJEZXNpZ24ucGNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi90YXNrSGVhZGVyRGVzaWduLnBjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Bjc3MvdGFza0hlYWRlckRlc2lnbi5wY3NzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudHh0LWJsb2NrX19kYXRhe2NvbG9yOiNhMGE0YTc7Zm9udC1zaXplOjFyZW19LnR4dC1ibG9ja19fZGF0YSBwe21hcmdpbjowfSNtYWluLWNvbnRlbnR7ZGlzcGxheTotbXMtZ3JpZDtkaXNwbGF5OmdyaWQ7LW1zLWdyaWQtY29sdW1uczo1MDBweCAxZnI7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjUwMHB4IDFmcn0jbWFpbi1jb250ZW50IGhye2Rpc3BsYXk6bm9uZX0jdGFzay1mb290ZXJ7Z3JpZC1jb2x1bW46Mi8zfS5sZWZ0LWNvbHtiYWNrZ3JvdW5kLWNvbG9yOiMyODJmMzc7cGFkZGluZzoyLjVyZW19LnRhc2stZGFzaGJvYXJke3Bvc2l0aW9uOi13ZWJraXQtc3RpY2t5O3Bvc2l0aW9uOnN0aWNreTt0b3A6MH0udHh0LWJsb2Nre21hcmdpbi1ib3R0b206MS41cmVtO2xpbmUtaGVpZ2h0OjEuNTtkaXNwbGF5Oi1tcy1ncmlkO2Rpc3BsYXk6Z3JpZDstbXMtZ3JpZC1jb2x1bW5zOjg1cHggMWZyO2dyaWQtdGVtcGxhdGUtY29sdW1uczo4NXB4IDFmcn0udHh0LWJsb2NrX190aXRsZXtjb2xvcjojODQ4ZTk0O2ZvbnQtc2l6ZTouNzVyZW07d2hpdGUtc3BhY2U6bm93cmFwO3BhZGRpbmctdG9wOi4zMzNlbX0ucHJpbS1pe2NvbG9yOiNjZmQ4MWJ9LnJlZy1pe2NvbG9yOiNmZmZ9LnNlYy1pe2ZvbnQtc2l6ZTouODc1ZW19LmFsZXJ0LWl7Y29sb3I6I2JmNGY1Y31cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3tcImltcG9ydExvYWRlcnNcIjoxfSEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIhLi9zcmMvcGNzcy90YXNrSGVhZGVyRGVzaWduLnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0E7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3RFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2hXQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMxRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN4RkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuSkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5UUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ25iQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hIQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdKQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkRBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDclBBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3BMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9