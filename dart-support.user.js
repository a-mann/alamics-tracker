/*!
 * ==UserScript==
 * @name DartIT tracker-tweaker revo
 * @updateURL https://github.com/a-mann/alamics-tracker/raw/master/dart-support.user.js
 * @downloadURL https://github.com/a-mann/alamics-tracker/raw/master/dart-support.user.js
 * @description индивидуальные настройки для support.dartit.ru, support.alamics.ru;
 * @include https://support.dartit.ru/*
 * @include https://support.alamics.ru/*
 * @require https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.3.1/markdown-it.min.js
 * @grant unsafeWindow
 * @author mann
 * @license MIT
 * @version 1.4.12
 * ==/UserScript==
 */
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
// @version 1.4.11
// ==/UserScript==






























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
        break;
    case 'user_page':
        __WEBPACK_IMPORTED_MODULE_1__addCSSSelectors_js__["a" /* addPageElems */]();
        __WEBPACK_IMPORTED_MODULE_5__goToTask_js__["a" /* goToTaskDatalist */]();
        break;
}

if(true){
    console.log('hello');
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addPageElems; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pcss_userscript_pcss__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pcss_userscript_pcss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pcss_userscript_pcss__);
//сюда добаляются элементы страницы в которые вставляются созданые скриптом блоки
//и.или они модифицируются скриптом

function addPageElems() {
    let $content_cell = document.querySelector('form[name="theForm"]');
    $content_cell.setAttribute('id', 'main-content');

    let $comments_tbl = $content_cell.getElementsByTagName("TABLE")[0];

    if($comments_tbl){
        $comments_tbl.setAttribute('id', 'comments-tbl');

        let rows = __webpack_require__(0).getAllCommentsRows();

        rows.map(function (row) {
            row.querySelectorAll('td')[5].firstElementChild.classList.add('comment-wrap');
        });
    }

    let input_div = document.querySelector('div.input_box'); //есть на странице задачи

    if (input_div) {
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
exports.push([module.i, ".onoff-opt{margin:0 6px 0 10px}.none{display:none!important}.hidden-elem{position:fixed!important;left:-999em;z-index:-1;visibility:hidden}.none.view{display:block!important}.ch_addr{margin:10px 10px 10px 0;vertical-align:top}.totop>input{margin:10px 0 0}.label_head{display:block;margin:0 0 20px}.clearfix:after,.clearfix:before{content:\"\";display:table;clear:both}.alist{float:right}.alist p{margin:0 0 10px;line-height:1;text-align:right}.bar-wrap{padding:8px 15px;background:#2d2d2d}#custom-project-list>li,#custom-workers-list>li{width:20%;float:left;cursor:pointer}#custom-project-list>li:first-child{display:none}.user-list{margin:2em 1em;padding:0;list-style-position:inside}.user-list>li{line-height:1.5}.selected{color:green}.btn-flat{padding:.5em;background:#f0f0f0;cursor:pointer}.btn-flat,.row-item{display:inline-block}.row-item{vertical-align:top}.row-item:not(:last-child){margin-right:1em}#settings-btn{margin:0 0 20px}#settings-box{display:none;margin:20px 0;padding:20px 0;outline:1px solid #414141}#settings-box.is-open{display:block}.user-title{color:#000;margin:0 0 .6em;font-size:20px;padding:0}.regular-link{color:#0054b9;outline:0!important}.time-list p{margin:5px 0;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.time-list>p>span:first-child{padding-right:1em;cursor:pointer}:root .time-list-total{margin-top:1em;border-top:1px solid}.comment-collapsed{max-height:70px;overflow:hidden!important}.long-comment{width:100%!important;position:relative;padding-top:30px}.btn-collapse{position:absolute;top:0;right:0}.btn-collapse-all{position:fixed;top:10px;right:10px}:root .dates-list{width:150px;display:inline-block;margin:0 20px 0 0}.user-toolbar{margin:20px 0;padding:20px 10px;border-top:1px solid rgba(0,0,0,.7);overflow:hidden;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.user-toolbar__item{padding:10px 15px;background:hsla(0,0%,100%,.6);box-shadow:0 1px 1px rgba(0,0,0,.6)}:root .user-toolbar-title{margin:0 0 1em;padding:0;color:#000}:root #comments-tbl .comment-wrap{font-size:14px;width:100%!important;max-width:800px;overflow:hidden}:root #comments-tbl h1{font-size:120%;font-weight:400;margin:0 0 .4em;color:inherit}:root #comments-tbl blockquote{padding:10px 20px;margin:0 0 20px;border-left:5px solid #ccc}:root #comments-tbl blockquote p{margin:0}:root #comments-tbl blockquote p:not(:last-child){margin-bottom:1em}:root #comments-tbl ul{padding-left:.6em;list-style-position:inside}.section-title{color:inherit;margin:0 0 1em;padding:0!important}.s-info{color:gray;font-size:12px}.btn-insert-ls{position:absolute;top:100%;right:2em;transition:transform .3s}.btn-insert-ls.is-visible{transform:translateY(-150%)}.add-alert{width:24px;height:24px;display:inline-block;background-image:url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+ICAgIDxwYXRoIGQ9Ik0xMC4wMSAyMS4wMWMwIDEuMS44OSAxLjk5IDEuOTkgMS45OXMxLjk5LS44OSAxLjk5LTEuOTloLTMuOTh6bTguODctNC4xOVYxMWMwLTMuMjUtMi4yNS01Ljk3LTUuMjktNi42OXYtLjcyQzEzLjU5IDIuNzEgMTIuODggMiAxMiAycy0xLjU5LjcxLTEuNTkgMS41OXYuNzJDNy4zNyA1LjAzIDUuMTIgNy43NSA1LjEyIDExdjUuODJMMyAxOC45NFYyMGgxOHYtMS4wNmwtMi4xMi0yLjEyek0xNiAxMy4wMWgtM3YzaC0ydi0zSDhWMTFoM1Y4aDJ2M2gzdjIuMDF6Ii8+PC9zdmc+);cursor:pointer}#task-title .add-alert{vertical-align:middle;opacity:.5}#task-title .add-alert.selected{opacity:1}#text{resize:vertical}", ""]);

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

    if (true) {
        console.info('load modyfiComments');
    }
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

    if(true){
        console.info('load commentsDesign');
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
exports.push([module.i, ".b-comment__row:last-child{padding-bottom:2em}.comment-wrap p:only-of-type{margin:0}.comment-wrap p:last-child{margin-bottom:0}#comments-tbl{margin:auto;padding:3em 0;background:#f0f0f0}#comments-tbl,#comments-tbl tbody,#comments-tbl tr{display:block}#comments-tbl tr:not(:last-child){margin-bottom:2em}.comment-body{width:100%}.comment-wrap p{line-height:1.4}.comment-wrap p:first-child{margin-top:0}.b-comment{max-width:720px;margin:auto;background:#fafafa;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);width:100%;font-size:12px;position:relative;box-sizing:border-box}.b-comment.b-comment_notify{margin-top:2em;padding:2em;color:#31708f;background:#d9edf7;border:1px solid #bce8f1}.b-comment.b-comment_notify .comments-update-link{display:inline-block;padding-left:1em;color:inherit}.b-comment__row{padding:1em 2em;display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;position:relative}.b-comment__row:first-child{padding-top:2em}.b-comment__row:first-child .row-right{top:2em}.b-comment__row_0{color:gray}.task-rank,.task-status{padding:0 .5em 0 2em}.deadline-date{padding-left:1em}.id-checkbox{position:absolute;visibility:hidden;z-index:-1}.comment-link,.comment-no{margin-right:0!important}.b-comment__row.b-comment__row_1{padding-top:0;-ms-flex-pack:justify;justify-content:space-between;color:gray}.comment-info>span{display:inline-block;vertical-align:top}.comment-author{padding-right:2em;position:relative}.comment-author:after{content:\"\\2192\";position:relative;left:1em}.b-comment__row_2{font-size:14px;background:#fff;border-top:1px solid hsla(0,0%,63%,.2);border-bottom:1px solid hsla(0,0%,63%,.2);position:relative;overflow:hidden}.actions-btn-wrap{padding:1em;position:absolute;top:100%;right:0;transition:transform .3s}.actions-btn-wrap.is-visible{transform:translateY(-100%)}.btn-del-comment,.btn-edit-comment{display:inline-block;vertical-align:middle;height:24px;line-height:24px;position:relative;z-index:1}.btn-edit-comment{margin-left:.5em;top:3px}.btn-del-comment{width:70px}.btn-del-comment:after{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:-1;content:\"\\423\\434\\430\\43B\\438\\442\\44C\";color:#ccc;line-height:normal;border-bottom:1px solid}.btn-del-comment img{display:none}.btn-del-comment a{width:100%;height:100%;position:absolute}.b-comment__row.b-comment__row_3{padding-top:1.5em;padding-bottom:1.5em;-ms-flex-align:start;align-items:flex-start}.b-comment__row_3+.b-comment__row_4{border-top:1px solid hsla(0,0%,63%,.2)}.b-comment__row.b-comment__row_4{-ms-flex-pack:end;justify-content:flex-end}.row-right{position:absolute;top:1em;right:2em}.row-right>*{display:inline-block;vertical-align:middle}.row-right>:not(:last-child){margin-right:.7em}.img-thumb{max-width:150px}.img-thumb img:first-child{display:none}.img-thumb>a{display:block}.img-thumb .attach-title{margin-top:.3em}.thumb-pic{width:100%;object-fit:cover;max-height:200px;border:1px solid #ccc}.large-pic-preview{max-width:40vw;border:1px solid gray;position:absolute;top:90%;left:0;z-index:1}.doc-thumb{max-width:150px;background:#f3f3f3;font-size:11px;border:1px solid #ccc;text-align:center;text-decoration:none;color:inherit}.doc-thumb .attach-title{width:100%;padding:0 .5em;line-height:1.6;word-break:break-all;box-sizing:border-box;position:absolute;top:50%;transform:translateY(-50%)}.file-thumb{-ms-flex:1 1 25%;flex:1 1 25%;min-height:70px;position:relative}.file-thumb:nth-child(n+7){margin-top:2em}.file-thumb:not(:last-child){margin-right:1em}.attach-title{max-width:150px;text-align:center;line-height:normal;word-break:break-all}#comments-tbl tr:last-child .b-comment__row_0,#comments-tbl tr:last-child .b-comment__row_1{color:#000}", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calculateElapsedTime; });
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

            //console.log(minToDays(cur_value));
        }
    });

    console.info('load calculateElapsedTime');
}

function minToDays(timeInMinutes, dayInHours = 8) {
    let retStr = "";

    if ((timeInMinutes !== null) && (!isNaN(timeInMinutes)) && (timeInMinutes > 0)) {
        dayInHours = dayInHours << 0;
        if ((dayInHours === undefined) || (dayInHours === null) || (isNaN(dayInHours)) || (dayInHours < 1)) dayInHours = 24;
        let tD, tH, tM;
        tD = (timeInMinutes / dayInHours / 60) << 0;
        retStr += tD > 0 ? tD + " д. " : "";
        timeInMinutes -= tD * dayInHours * 60;
        tH = (timeInMinutes / 60) << 0;
        retStr += tH > 0 ? tH + " ч. " : "";
        timeInMinutes -= tH * 60;
        tM = timeInMinutes << 0;
        retStr += tM + " мин." + " (" + dayInHours + "-часовой день)";
    } else {
        retStr += "Что-то со временем не так :(";
    }
    return retStr;
}



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return goToTaskDatalist; });
function goToTaskDatalist() {
    'use strict';

    let taskId = __webpack_require__(0).getTaskId();

    let taskTitle = document.getElementById('task-title').textContent.split(' - ');

    let data = JSON.parse(localStorage.getItem('datalist')) || [];
    data = appendId(data);

    //если на странице есть заголовок задачи
    // - проверить есть ли она в списке
    if (Array.isArray(taskTitle) && taskTitle.length >= 2) {
        taskTitle = taskTitle[1].trim();

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

    if (true) {
        console.info('load goToTaskDatalist');
    }
}



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return countWorkerTime; });
function countWorkerTime() {
    'use strict';
    let $input_box = document.getElementById('user-toolbar');
    let rows = __webpack_require__(0).getAllCommentsRows();
    let workers = __webpack_require__(0).getAllWorkers();
    let dates_collection = [];
    let date_str;

    for (let i = 0; i < rows.length; i++) {
        date_str = rows[i].children[3].textContent;
        date_str = date_str.split(' ');
        dates_collection.push(__webpack_require__(1).createISODate(date_str[0]));
    }

    let dates_arr = __webpack_require__(1).eliminateDuplicates(dates_collection);

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
            listdate = __webpack_require__(1).dateFormatter(parseInt(dates[i], 10));
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

    if (true) {
        console.info('load countWorkerTime');
    }
}

// создание объекта со списком сотруднков и времени каждого в задаче
function createTimeList(workers, rows) {

    let ntime, name, tsum;
    let timelist = {};

    for (let s = 0; s < workers.length; s++) {
        tsum = 0;

        for (let i = 0; i < rows.length; i++) {
            ntime = __webpack_require__(0).getRowTimeString(rows[i]);

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
            let item_date = __webpack_require__(1).getRowDateString(item);

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

    while (target != list) {
        if (target.tagName == 'P') {
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



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return taskFooterDesign; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pcss_taskFooterDesign_pcss__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pcss_taskFooterDesign_pcss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pcss_taskFooterDesign_pcss__);
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

    if(true){
        console.info('load taskFooterDesign');
    }
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
exports.push([module.i, "#task-footer tr:nth-child(2){height:0;overflow:hidden}.fake-file-input .btn-fake-file{padding:.7em 0 0;text-align:center;display:inline-block;font-size:16px;color:#82a5c3;cursor:pointer}.fake-file-input .btn-fake-file span{width:100%;display:inline-block;font-size:12px}.fake-file-input>input{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0}#FileInputs br{display:none}.task-type>div select{margin-top:.3em}.task-type>div br{display:none}.email-send-list>li:after{content:\"\\1F7A9\";margin-left:.4em;color:red;display:inline-block;cursor:pointer}.add-email #getEmailAddressesButton{display:none}.add-email #add_email_worker{width:226px;display:inline-block;vertical-align:middle}.add-email #add_email{position:absolute;visibility:hidden;z-index:auto}.add-email label{display:block}:root .deadline-calendar #end_date{width:auto!important}:root .deadline-calendar input[type=button]{display:none}:root .deadline-calendar>img{position:absolute;top:.4em;right:.5em}:root .deadline-calendar>input[type=text]{padding-right:30px}.task-row-2 .time-block>div:after{content:\"\\43C\\438\\43D\";margin-left:.5em;display:inline-block;vertical-align:middle}.worker-block select{width:100%;margin:.5em 0 0}.task-fields-row .frow-col-2-2{width:120px}.task-fields-row .frow-col-2-1{width:190px;margin-right:30px}.task-fields-row td{padding:0;font-size:100%;display:block}.task-fields-row select{padding:.3em 0 .3em .2em}.task-fields-row input.input_field,.task-fields-row input[type=text],.task-fields-row select{width:auto;max-width:100%;height:2em;padding:.3em .6em;border:1px solid #9e9e9e;display:block;box-sizing:border-box}.task-fields-row input.input_field:focus,.task-fields-row input[type=text]:focus,.task-fields-row select:focus{border-color:#26a69a}#main-content{margin-bottom:0}#main-content br:last-child{display:none}.content{padding-bottom:0}#tbl-new-comment tbody,#tbl-new-comment td,#tbl-new-comment tr{display:block}#tbl-new-comment+br,#tbl-new-comment tr:first-child>td:first-child{display:none}#new-comment-wrap{max-width:720px;margin:auto}.tl{display:none}.tarea-wrap{position:relative;overflow:hidden}#text{width:100%;padding:.6em .8em;font-family:inherit;font-size:14px;border:0;box-sizing:border-box;box-shadow:inset 0 -2px 2px 0 rgba(0,0,0,.14),inset 0 1px 5px 0 rgba(0,0,0,.12),inset 0 3px 1px -2px rgba(0,0,0,.2)}.task-fields-row{max-width:720px;margin:1.6em auto}.task-fields-row label{margin:0 0 .5em;color:gray;display:inline-block}.task-row-1{display:-ms-flexbox;display:flex}.worker-block{width:300px;margin-right:70px;-ms-flex:0 0 300px;flex:0 0 300px}.worker-block input[type=radio]{display:inline-block;vertical-align:middle;position:relative;top:-.2em}.task-row-2,.task-row-2 .time-block{display:-ms-flexbox;display:flex}.task-row-2 .time-block{-ms-flex-pack:justify;justify-content:space-between}.task-row-2 .time-block>div{width:120px}.task-row-2 .time-block>div input{width:76%;display:inline-block;vertical-align:middle}:root .deadline-calendar{position:relative;padding:0!important;font-size:100%}:root .deadline-calendar>img,:root .deadline-calendar>input{display:inline-block;vertical-align:top;box-sizing:border-box}.task-row-3{display:-ms-flexbox;display:flex}.add-email{position:relative}.add-email a{display:none}.email-send-list{margin:.4em 0 .5em;padding:0;list-style-type:none}.email-send-list>li{margin:0;line-height:1}.email-send-list>li:before{content:\"\\B7\";font-size:1.5em;margin-right:.2em;display:inline-block;vertical-align:middle}.task-type select{min-width:190px}.add-files a{display:none}#FileInputs input:not(:first-child){margin-top:.3em;display:inline-block;vertical-align:middle}.btn-remove-item{width:12px;height:18px;margin-left:.3em;color:red;display:inline-block;vertical-align:middle;position:relative;cursor:pointer}.btn-remove-item:after{content:\"\\1F7A9\";position:absolute;top:0;left:0}.fake-file-input{width:225px;height:60px;border:1px dashed #82a5c3;background:#f4f6f8;text-align:center;border-radius:.5em;position:relative}.fake-file-input.is-hover{background:#d2dce5}.files-list{margin:-.5em 0 .5em;padding:0;list-style-type:none;transition:height .3s}.files-list .file-list-item{margin:.4em 0}.files-list .file-list-item .s-info{padding-left:.6em;display:inline-block;vertical-align:middle}#task-footer tbody,#task-footer td,#task-footer tr{display:block}.btn-action{height:36px;padding:0 1.6em;font-size:14px;color:#fff;border:0;border-radius:4px;background:#7eb519;cursor:pointer}", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return elemsModification; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__finders_js__ = __webpack_require__(0);




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

    if (true) {
        console.info('load elemsModification');
    }

}



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return saveNewComment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__finders_js__ = __webpack_require__(0);


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

    if (true) {
        console.info('load saveNewComment');
    }
}



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return copyPasteCommentQuote; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__finders_js__ = __webpack_require__(0);



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

    if (true) {
        console.info('load copyPasteCommentQuote');
    }
}



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return taskUpdateNotify; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__finders_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(1);



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

    if (true) {
        console.info('load updateNotify');
    }
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



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFydC1zdXBwb3J0LnVzZXIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2NlYjhmMTVkZmMyZmYwN2RjNGEiLCJ3ZWJwYWNrOi8vLy4vc3JjL19maW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19hZGRDU1NTZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzPzdmZjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvdXNlcnNjcmlwdC5wY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHlmaUNvbW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9fbG9hZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbWVudHNEZXNpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bjc3MvY29tbWVudHNEZXNpZ24ucGNzcz84NDE4Iiwid2VicGFjazovLy8uL3NyYy9wY3NzL2NvbW1lbnRzRGVzaWduLnBjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbGN1bGF0ZUVsYXBzZWRUaW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9nb1RvVGFzay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY291bnRXb3JrZXJUaW1lLmpzIiwid2VicGFjazovLy8uL3NyYy90YXNrRm9vdGVyRGVzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcz8wYzA0Iiwid2VicGFjazovLy8uL3NyYy9wY3NzL3Rhc2tGb290ZXJEZXNpZ24ucGNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWxlbXNNb2RpZmljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhdmVOZXdDb21tZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3B5UGFzdGVDb21tZW50UXVvdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rhc2tVcGRhdGVOb3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuY2hvckxpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VzZXJTZXR0aW5ncy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjY2ViOGYxNWRmYzJmZjA3ZGM0YSIsImZ1bmN0aW9uIGdldFRhc2tJZCgpIHtcclxuICAgIGNvbnN0IHRhc2tJZCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoJyYnKTtcclxuXHJcbiAgICBsZXQgaWQgPSB0YXNrSWQuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0uc3BsaXQoJz0nKVswXSA9PT0gJ2lkJztcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpZFswXS5zcGxpdChcIj1cIilbMV07XHJcbn1cclxuXHJcbi8v0L/QvtC70YPRh9C40YLRjCDQstGB0LUg0LrQsNC80LXQvdGC0Ysg0LIg0LfQsNC00LDRh9C1XHJcbi8v0YDQsNCx0L7RgtCw0LXRgiDQutC+0YDRgNC10LrRgtC90L4g0L/QvtGB0LvQtSDQt9Cw0L/Rg9GB0LrQsCBjb21tZW50c0Rlc2lnblxyXG5mdW5jdGlvbiBnZXRBbGxDYW1tZW50cygpIHtcclxuICAgIC8vbGV0IHJvd3MgPSBnZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuICAgIC8vcmV0dXJuIHJvd3MubWFwKGdldENvbW1lbnRGcm9tUm93KTtcclxuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYi1jb21tZW50Jyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvbW1lbnRGcm9tUm93KHJvdykge1xyXG4gICAgcmV0dXJuIHJvdy5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC13cmFwJyk7XHJcbn1cclxuXHJcbi8v0YDQsNCx0L7RgtCw0LXRgiDQutC+0YDRgNC10LrRgtC90L4g0LTQu9GPINC30LDQv9GD0YHQutCwIGNvbW1lbnRzRGVzaWduXHJcbmZ1bmN0aW9uIGdldEFsbENvbW1lbnRzUm93cygpIHtcclxuICAgIGxldCByb3dzID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtdGJsJykucXVlcnlTZWxlY3RvckFsbCgnVFInKSk7XHJcbiAgICByb3dzID0gcm93cy5zcGxpY2UoMSwgcm93cy5sZW5ndGgpOyAvL9C40YHQutC70Y7Rh9C40YLRjCDQv9C10YDQstGD0Y4g0YHRgtGA0L7QutGDINGBINC30LDQs9C+0LvQvtCy0LrQsNC80Lgg0YHRgtC+0LvQsdGG0L7QslxyXG5cclxuICAgIHJldHVybiByb3dzLmZpbHRlcihmdW5jdGlvbihyb3cpIHtcclxuICAgICAgICByZXR1cm4gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJykubGVuZ3RoID4gMTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyDQv9C+0LvRg9GH0LjRgtGMINGB0L/QuNGB0L7QuiDQstGB0LXRhSDRgdC+0YLRgNGD0LTQvdC40LrQvtCyINCyINC30LDQtNCw0YfQtVxyXG5mdW5jdGlvbiBnZXRBbGxXb3JrZXJzKCkge1xyXG4gICAgbGV0IHJvd3MgPSBnZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuXHJcbiAgICBsZXQgd29ya2VycyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHdvcmtlcnMucHVzaChyb3dzW2ldLmNoaWxkcmVuWzRdLnRleHRDb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVxdWlyZSgnLi9fdXRpbHMnKS5lbGltaW5hdGVEdXBsaWNhdGVzKHdvcmtlcnMpO1xyXG59XHJcblxyXG4vLyDQv9C+0LvRg9GH0LXQvdC40LUg0YHRgtGA0L7QutC4INGBINCy0YDQtdC80L3QtdC8INC40Lcg0YLQsNCx0LvQuNGG0Ysg0YEg0LrQvtC80LzQtdC90YLQsNGA0LjQvNC4INC30LDQtNCw0YfQuFxyXG5mdW5jdGlvbiBnZXRSb3dUaW1lU3RyaW5nKHJvdykge1xyXG4gICAgbGV0IHQgPSAnJztcclxuXHJcbiAgICBpZiAocm93LmNoaWxkcmVuWzEwXSkge1xyXG4gICAgICAgIC8v0LTQviDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgIHQgPSByb3cuY2hpbGRyZW5bMTBdLnRleHRDb250ZW50O1xyXG4gICAgICAgIHQgPSBwYXJzZUludCh0LnNwbGl0KCcvJylbMF0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvL9C/0L7RgdC70LUg0LfQsNC/0YPRgdC60LAgY2FtbWVudHNEZXNpZ24oKTtcclxuICAgICAgICB0ID0gcGFyc2VJbnQocm93LnF1ZXJ5U2VsZWN0b3IoJy5lbGFwc2VkLXRpbWUnKS50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCB7Z2V0VGFza0lkLGdldEFsbENhbW1lbnRzLGdldENvbW1lbnRGcm9tUm93LGdldEFsbENvbW1lbnRzUm93cyxnZXRBbGxXb3JrZXJzLGdldFJvd1RpbWVTdHJpbmd9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL19maW5kZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxyXG4vL9C+0L/RgNC10LTQtdC70LXQvdC40LUg0YHRgtGA0LDQvdC40YbRiyDQv9C+IGdldCDQv9Cw0YDQsNC80LXRgtGA0YMgYSwg0L3QsNC/0YDQuNC80LXRgCA/YT11c2VyX3BhZ2VcclxuZnVuY3Rpb24gZ2V0VVJMQWN0aW9uKCkge1xyXG4gICAgbGV0IGdldF9hY3Rpb24gPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdChcIj1cIik7XHJcbiAgICBnZXRfYWN0aW9uID0gZ2V0X2FjdGlvblsxXS5zcGxpdCgnJicpO1xyXG4gICAgcmV0dXJuIGdldF9hY3Rpb25bMF07XHJcbn1cclxuXHJcbi8v0YPQtNCw0LvQtdC90LjQtSDQtNGD0LHQu9C40LrQsNGC0L7QslxyXG5mdW5jdGlvbiBlbGltaW5hdGVEdXBsaWNhdGVzKGFycikge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IGFycltpXTtcclxuICAgICAgICBvYmpbc3RyXSA9IHRydWU7IC8vINC30LDQv9C+0LzQvdC40YLRjCDRgdGC0YDQvtC60YMg0LIg0LLQuNC00LUg0YHQstC+0LnRgdGC0LLQsCDQvtCx0YrQtdC60YLQsFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopOyAvLyDQuNC70Lgg0YHQvtCx0YDQsNGC0Ywg0LrQu9GO0YfQuCDQv9C10YDQtdCx0L7RgNC+0Lwg0LTQu9GPIElFOC1cclxufVxyXG5cclxuLy/RgdC+0LfQtNCw0L3QuNC1INC00LDRgtGLINC40Lcg0YHRgtGA0L7QutC4XHJcbmZ1bmN0aW9uIGNyZWF0ZUlTT0RhdGUoc3RyKSB7XHJcbiAgICBsZXQgZGF0ZV9zdHIgPSBzdHIuc3BsaXQoJy4nKTtcclxuICAgIGxldCBkYXlfc3RyID0gZGF0ZV9zdHJbMF07XHJcbiAgICBsZXQgbW9udGhfc3RyID0gZGF0ZV9zdHJbMV07XHJcbiAgICBsZXQgeWVhcl9zdHIgPSBkYXRlX3N0clsyXTtcclxuICAgIGxldCBkYXRlX2lzb19zdHIgPSB5ZWFyX3N0ciArICctJyArIG1vbnRoX3N0ciArICctJyArIGRheV9zdHI7XHJcbiAgICBkYXRlX2lzb19zdHIgPSBEYXRlLnBhcnNlKGRhdGVfaXNvX3N0cik7XHJcbiAgICByZXR1cm4gZGF0ZV9pc29fc3RyO1xyXG59XHJcblxyXG4vLyDQv9C+0LvRg9GH0LXQvdC40LUg0YHRgtGA0L7QutC4INGBINC00LDRgtC+0Lkg0LjQtyDRgtCw0LHQu9C40YbRiyDRgSDQutC+0LzQvNC10L3RgtCw0YDQuNC80Lgg0LfQsNC00LDRh9C4XHJcbmZ1bmN0aW9uIGdldFJvd0RhdGVTdHJpbmcocm93KSB7XHJcbiAgICBsZXQgdCA9ICcnO1xyXG4gICAgaWYgKHJvdy5jaGlsZHJlblszXSkge1xyXG4gICAgICAgIC8v0LTQviDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgIHQgPSByb3cuY2hpbGRyZW5bM10udGV4dENvbnRlbnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8v0L/QvtGB0LvQtSDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgIHQgPSByb3cucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtZGF0ZScpLnRleHRDb250ZW50XHJcbiAgICB9XHJcblxyXG4gICAgdCA9IHQuc3BsaXQoJyAnKTtcclxuXHJcbiAgICByZXR1cm4gY3JlYXRlSVNPRGF0ZSh0WzBdKTtcclxufVxyXG5cclxuLy/RhNC+0YDQvNCw0YLQuNGA0L7QstCw0L3QuNC1INC00LDRgtGLXHJcbmZ1bmN0aW9uIGRhdGVGb3JtYXR0ZXIoZGF0ZSkge1xyXG4gICAgbGV0IGZvcm1hdHRlciA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFwicnVcIik7XHJcbiAgICBkYXRlID0gbmV3IERhdGUocGFyc2VJbnQoZGF0ZSwgMTApKTtcclxuICAgIGRhdGUgPSBmb3JtYXR0ZXIuZm9ybWF0KGRhdGUpO1xyXG4gICAgcmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbi8vINGB0LrRgNGL0YLRjC/Qv9C+0LrQsNC30LDRgtGMINC+0L/RgNC10LTQtdC90L3Ri9C1IG9wdGlvbiDQsiBzZWxlY3RcclxuZnVuY3Rpb24gbW9kaWZ5U2VsZWN0T3B0aW9uc0xpc3QobGlzdCwgcGFyYW1zKSB7XHJcbiAgICBBcnJheS5mcm9tKGxpc3QpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBpdGVtLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMuaW5kZXhPZihpdGVtLnZhbHVlKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy/QstGL0LfQvtCyINGE0YPQvdC60YbQuNC4INC/0L4g0YHQvtGH0LXRgtCw0L3QuNGOINC60LvQsNCy0LjRiNGMXHJcbmZ1bmN0aW9uIHJ1bk9uS2V5cyhmdW5jLCBlbGVtKSB7XHJcbiAgICBsZXQgY29kZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XHJcblxyXG4gICAgbGV0IHByZXNzZWQgPSB7fTtcclxuXHJcbiAgICBlbGVtLm9ua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG5cclxuICAgICAgICBwcmVzc2VkW2Uua2V5Q29kZV0gPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvZGVzLmxlbmd0aDsgaSsrKSB7IC8vINC/0YDQvtCy0LXRgNC40YLRjCwg0LLRgdC1INC70Lgg0LrQu9Cw0LLQuNGI0Lgg0L3QsNC20LDRgtGLXHJcbiAgICAgICAgICAgIGlmICghcHJlc3NlZFtjb2Rlc1tpXV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0YfRgtC+0LHRiyDQuNC30LHQtdC20LDRgtGMIFwi0LfQsNC70LjQv9Cw0L3QuNGPXCIg0LrQu9Cw0LLQuNGI0LggLS0g0L7QsdC90YPQu9GP0LXQvCDRgdGC0LDRgtGD0YEg0LLRgdC10YUg0LrQu9Cw0LLQuNGILCDQv9GD0YHRgtGMINC90LDQttC40LzQsNC10YIg0LLRgdGRINC30LDQvdC+0LLQvlxyXG4gICAgICAgIHByZXNzZWQgPSB7fTtcclxuXHJcbiAgICAgICAgZnVuYygpO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtLm9ua2V5dXAgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUgPSBlIHx8IHcuZXZlbnQ7XHJcblxyXG4gICAgICAgIGRlbGV0ZSBwcmVzc2VkW2Uua2V5Q29kZV07XHJcbiAgICB9O1xyXG59XHJcblxyXG4vL2FqYXgg0LfQsNC/0YDQvtGBXHJcbmZ1bmN0aW9uIGxvYWRCeUFqYXgocGF0aCwgc3VjY2VzcywgZXJyb3IpIHtcclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgeGhyLm9wZW4oXCJHRVRcIiwgcGF0aCwgdHJ1ZSk7XHJcbiAgICB4aHIuc2VuZCgpO1xyXG59XHJcblxyXG4vLyDRhNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0YHRgtGA0L7QutC4INGBINC90YPQttC90YvQvCDQvtC60L7QvdGH0LDQvdC40LXQvCDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0YfQuNGB0LvQsFxyXG4vLyDQvdCw0L/RgNC40LzQtdGAIC0g0LzQuNC90YPRgtCwLCDQvNC40L3Rg9GC0YssINC80LjQvdGD0YJcclxuZnVuY3Rpb24gZGVjbE9mTnVtKG51bWJlciwgdGl0bGVzKSB7XHJcbiAgICBsZXQgY2FzZXMgPSBbMiwgMCwgMSwgMSwgMSwgMl07XHJcbiAgICByZXR1cm4gdGl0bGVzWyhudW1iZXIgJSAxMDAgPiA0ICYmIG51bWJlciAlIDEwMCA8IDIwKSA/IDIgOiBjYXNlc1sobnVtYmVyICUgMTAgPCA1KSA/IG51bWJlciAlIDEwIDogNV1dO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kSW5BcnJheShhcnIsIHZhbCkge1xyXG4gICAgcmV0dXJuIGFyci5pbmRleE9mKHZhbCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7Z2V0VVJMQWN0aW9uLGVsaW1pbmF0ZUR1cGxpY2F0ZXMsY3JlYXRlSVNPRGF0ZSxnZXRSb3dEYXRlU3RyaW5nLGRhdGVGb3JtYXR0ZXIsbW9kaWZ5U2VsZWN0T3B0aW9uc0xpc3QscnVuT25LZXlzLGxvYWRCeUFqYXgsZGVjbE9mTnVtLGZpbmRJbkFycmF5fTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvX3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gPT1Vc2VyU2NyaXB0PT1cclxuLy8gQG5hbWUgRGFydElUIHRyYWNrZXItdHdlYWtlciByZXZvXHJcbi8vIEB1cGRhdGVVUkwgaHR0cHM6Ly9naXRodWIuY29tL2EtbWFubi9hbGFtaWNzLXRyYWNrZXIvcmF3L21hc3Rlci9kYXJ0LXN1cHBvcnQudXNlci5qc1xyXG4vLyBAZG93bmxvYWRVUkwgaHR0cHM6Ly9naXRodWIuY29tL2EtbWFubi9hbGFtaWNzLXRyYWNrZXIvcmF3L21hc3Rlci9kYXJ0LXN1cHBvcnQudXNlci5qc1xyXG4vLyBAZGVzY3JpcHRpb24g0LjQvdC00LjQstC40LTRg9Cw0LvRjNC90YvQtSDQvdCw0YHRgtGA0L7QudC60Lgg0LTQu9GPIHN1cHBvcnQuZGFydGl0LnJ1LCBzdXBwb3J0LmFsYW1pY3MucnU7XHJcbi8vIEBpbmNsdWRlIGh0dHBzOi8vc3VwcG9ydC5kYXJ0aXQucnUvKlxyXG4vLyBAaW5jbHVkZSBodHRwczovL3N1cHBvcnQuYWxhbWljcy5ydS8qXHJcbi8vIEByZXF1aXJlIGh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL21hcmtkb3duLWl0LzguMy4xL21hcmtkb3duLWl0Lm1pbi5qc1xyXG4vLyBAZ3JhbnQgdW5zYWZlV2luZG93XHJcbi8vIEBhdXRob3IgbWFublxyXG4vLyBAbGljZW5zZSBNSVRcclxuLy8gQHZlcnNpb24gMS40LjExXHJcbi8vID09L1VzZXJTY3JpcHQ9PVxyXG5cclxuXHJcbmltcG9ydCB7Z2V0VVJMQWN0aW9ufSBmcm9tICcuL191dGlscy5qcyc7XHJcblxyXG5pbXBvcnQge2FkZFBhZ2VFbGVtc30gZnJvbSAnLi9fYWRkQ1NTU2VsZWN0b3JzLmpzJztcclxuXHJcbmltcG9ydCB7bW9keWZpQ29tbWVudHN9IGZyb20gJy4vbW9keWZpQ29tbWVudHMuanMnO1xyXG5cclxuaW1wb3J0IHtjb21tZW50c0Rlc2lnbn0gZnJvbSAnLi9jb21tZW50c0Rlc2lnbi5qcyc7XHJcblxyXG5pbXBvcnQge2NhbGN1bGF0ZUVsYXBzZWRUaW1lfSBmcm9tICcuL2NhbGN1bGF0ZUVsYXBzZWRUaW1lLmpzJztcclxuXHJcbmltcG9ydCB7Z29Ub1Rhc2tEYXRhbGlzdH0gZnJvbSAnLi9nb1RvVGFzay5qcyc7XHJcblxyXG5pbXBvcnQge2NvdW50V29ya2VyVGltZX0gZnJvbSAnLi9jb3VudFdvcmtlclRpbWUuanMnO1xyXG5cclxuaW1wb3J0IHt0YXNrRm9vdGVyRGVzaWdufSBmcm9tICcuL3Rhc2tGb290ZXJEZXNpZ24uanMnO1xyXG5cclxuaW1wb3J0IHtlbGVtc01vZGlmaWNhdGlvbn0gZnJvbSAnLi9lbGVtc01vZGlmaWNhdGlvbi5qcyc7XHJcblxyXG5pbXBvcnQge3NhdmVOZXdDb21tZW50fSBmcm9tICcuL3NhdmVOZXdDb21tZW50LmpzJztcclxuXHJcbmltcG9ydCB7Y29weVBhc3RlQ29tbWVudFF1b3RlfSBmcm9tICcuL2NvcHlQYXN0ZUNvbW1lbnRRdW90ZS5qcyc7XHJcblxyXG5pbXBvcnQge3Rhc2tVcGRhdGVOb3RpZnl9IGZyb20gJy4vdGFza1VwZGF0ZU5vdGlmeS5qcyc7XHJcblxyXG5pbXBvcnQge2FuY2hvckxpbmt9IGZyb20gJy4vYW5jaG9yTGluay5qcyc7XHJcblxyXG5pbXBvcnQge3VzZXJTZXR0aW5nc30gZnJvbSAnLi91c2VyU2V0dGluZ3MuanMnO1xyXG5cclxuY29uc3QgYWN0aW9uX3BhZ2UgPSBnZXRVUkxBY3Rpb24oKTtcclxuXHJcbnN3aXRjaCAoYWN0aW9uX3BhZ2UpIHtcclxuICAgIGNhc2UgJ25ldyc6XHJcbiAgICAgICAgdXNlclNldHRpbmdzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdyZWQnOlxyXG4gICAgICAgIGFkZFBhZ2VFbGVtcygpO1xyXG4gICAgICAgIC8vbGV0IGVsZW1zTW9kaWZpY2F0aW9uID0gbmV3IGVsZW1zTW9kaWZpY2F0aW9uKCk7XHJcbiAgICAgICAgZWxlbXNNb2RpZmljYXRpb24oKTtcclxuICAgICAgICBtb2R5ZmlDb21tZW50cygpO1xyXG5cclxuICAgICAgICBpZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICAgICAgICAgIGNvdW50V29ya2VyVGltZSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dvcmtlci10aW1lLWNvdW50JykgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICAgICAgY291bnRXb3JrZXJUaW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNhdmVOZXdDb21tZW50KCk7XHJcbiAgICAgICAgY2FsY3VsYXRlRWxhcHNlZFRpbWUoKTtcclxuICAgICAgICBjb21tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgIHRhc2tGb290ZXJEZXNpZ24oKTtcclxuICAgICAgICBjb3B5UGFzdGVDb21tZW50UXVvdGUoKTtcclxuICAgICAgICB0YXNrVXBkYXRlTm90aWZ5KCk7XHJcbiAgICAgICAgZ29Ub1Rhc2tEYXRhbGlzdCgpO1xyXG4gICAgICAgIGFuY2hvckxpbmsoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ3VzZXJfcGFnZSc6XHJcbiAgICAgICAgYWRkUGFnZUVsZW1zKCk7XHJcbiAgICAgICAgZ29Ub1Rhc2tEYXRhbGlzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG59XHJcblxyXG5pZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICBjb25zb2xlLmxvZygnaGVsbG8nKTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvL9GB0Y7QtNCwINC00L7QsdCw0LvRj9GO0YLRgdGPINGN0LvQtdC80LXQvdGC0Ysg0YHRgtGA0LDQvdC40YbRiyDQsiDQutC+0YLQvtGA0YvQtSDQstGB0YLQsNCy0LvRj9GO0YLRgdGPINGB0L7Qt9C00LDQvdGL0LUg0YHQutGA0LjQv9GC0L7QvCDQsdC70L7QutC4XHJcbi8v0Lgu0LjQu9C4INC+0L3QuCDQvNC+0LTQuNGE0LjRhtC40YDRg9GO0YLRgdGPINGB0LrRgNC40L/RgtC+0LxcclxuXHJcbmZ1bmN0aW9uIGFkZFBhZ2VFbGVtcygpIHtcclxuICAgIGxldCAkY29udGVudF9jZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybVtuYW1lPVwidGhlRm9ybVwiXScpO1xyXG4gICAgJGNvbnRlbnRfY2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21haW4tY29udGVudCcpO1xyXG5cclxuICAgIGxldCAkY29tbWVudHNfdGJsID0gJGNvbnRlbnRfY2VsbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlRBQkxFXCIpWzBdO1xyXG5cclxuICAgIGlmKCRjb21tZW50c190Ymwpe1xyXG4gICAgICAgICRjb21tZW50c190Ymwuc2V0QXR0cmlidXRlKCdpZCcsICdjb21tZW50cy10YmwnKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd3MgPSByZXF1aXJlKCcuL19maW5kZXJzJykuZ2V0QWxsQ29tbWVudHNSb3dzKCk7XHJcblxyXG4gICAgICAgIHJvd3MubWFwKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJylbNV0uZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmFkZCgnY29tbWVudC13cmFwJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGlucHV0X2RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5pbnB1dF9ib3gnKTsgLy/QtdGB0YLRjCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0LfQsNC00LDRh9C4XHJcblxyXG4gICAgaWYgKGlucHV0X2Rpdikge1xyXG4gICAgICAgIGxldCAkdXNlcl90b29sYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICAgICAgJHVzZXJfdG9vbGJhci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3VzZXItdG9vbGJhcicpO1xyXG4gICAgICAgICR1c2VyX3Rvb2xiYXIuY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyJyk7XHJcblxyXG4gICAgICAgIGlucHV0X2Rpdi5hcHBlbmRDaGlsZCgkdXNlcl90b29sYmFyKTtcclxuICAgIH1cclxuXHJcbiAgICAvL9C/0L7QtNCy0LDQuyDQt9Cw0LTQsNGH0LhcclxuICAgIGxldCAkdGFza19mb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0YWJsZS50aGVGb3JtJyk7XHJcblxyXG4gICAgaWYoJHRhc2tfZm9vdGVyLmxlbmd0aCl7XHJcbiAgICAgICAgLy/QvtCx0LXRgNGC0LrQsFxyXG4gICAgICAgICR0YXNrX2Zvb3RlciA9ICR0YXNrX2Zvb3RlclswXTtcclxuICAgICAgICAkdGFza19mb290ZXIuaWQgPSAndGFzay1mb290ZXInO1xyXG5cclxuICAgICAgICAvL9GC0LDQsdC70LjRhtCwINGBIHRleHRhcmVhINC60LDQvNC10L3RgtCwXHJcbiAgICAgICAgbGV0ICRmb290ZXJfdGJscyA9ICR0YXNrX2Zvb3Rlci5xdWVyeVNlbGVjdG9yQWxsKCd0YWJsZScpO1xyXG5cclxuICAgICAgICBsZXQgJGNvbW1lbnRUYmwgPSAkZm9vdGVyX3RibHNbMF07XHJcbiAgICAgICAgJGNvbW1lbnRUYmwuaWQgPSAndGJsLW5ldy1jb21tZW50JztcclxuXHJcbiAgICAgICAgLy/QvtCx0LXRgNGC0LrQsCDRj9GH0LXQudC60Lgg0YEgdGV4dGFyZWFcclxuICAgICAgICBsZXQgJG5ld0NvbW1lbnQgPSAkY29tbWVudFRibC5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpWzFdO1xyXG4gICAgICAgICRuZXdDb21tZW50LmlkID0gJ25ldy1jb21tZW50LXdyYXAnO1xyXG5cclxuICAgICAgICAvL9C00L7QsdCw0LLQu9GOINC+0LHQtdGA0YLQutGDINC00LvRjyB0ZXh0YXJlYVxyXG4gICAgICAgIC8v0LIg0L3QtdC1INCx0YPQtNGDINCy0YHRgtCw0LLQu9GP0YLRjCDQutC90L7Qv9C60Lgg0LLRgdGP0LrQuNC1XHJcbiAgICAgICAgbGV0ICR0YXJlYVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAkdGFyZWFXcmFwLmlkID0gJ3RhcmVhLXdyYXAnO1xyXG4gICAgICAgICR0YXJlYVdyYXAuY2xhc3NMaXN0LmFkZCgndGFyZWEtd3JhcCcpO1xyXG5cclxuICAgICAgICAkdGFyZWFXcmFwLmFwcGVuZENoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0JykpO1xyXG4gICAgICAgICRuZXdDb21tZW50LmFwcGVuZENoaWxkKCR0YXJlYVdyYXApO1xyXG5cclxuICAgICAgICAvL9Ci0LDQsdC70LjRhtCwINGB0YLQsNGC0YPRgdC+0LIg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgbGV0ICRzdGF0dXNUYmwgPSAkZm9vdGVyX3RibHNbMV0ucXVlcnlTZWxlY3RvcigndGFibGUnKTtcclxuICAgICAgICAkc3RhdHVzVGJsLmlkID0gJ3RibC1zdGF0dXMnO1xyXG4gICAgfVxyXG4gICAgLy/Qt9Cw0LPQvtC70L7QstC+0Log0LfQsNC00LDRh9C4XHJcbiAgICBsZXQgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDEnKTtcclxuXHJcbiAgICB0YXNrVGl0bGUuaWQgPSAndGFzay10aXRsZSc7XHJcbn1cclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9wY3NzL3VzZXJzY3JpcHQucGNzcyc7XHJcblxyXG5leHBvcnQge2FkZFBhZ2VFbGVtc307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvX2FkZENTU1NlbGVjdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi91c2Vyc2NyaXB0LnBjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdXNlcnNjcmlwdC5wY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3VzZXJzY3JpcHQucGNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGNzcy91c2Vyc2NyaXB0LnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm9ub2ZmLW9wdHttYXJnaW46MCA2cHggMCAxMHB4fS5ub25le2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9LmhpZGRlbi1lbGVte3Bvc2l0aW9uOmZpeGVkIWltcG9ydGFudDtsZWZ0Oi05OTllbTt6LWluZGV4Oi0xO3Zpc2liaWxpdHk6aGlkZGVufS5ub25lLnZpZXd7ZGlzcGxheTpibG9jayFpbXBvcnRhbnR9LmNoX2FkZHJ7bWFyZ2luOjEwcHggMTBweCAxMHB4IDA7dmVydGljYWwtYWxpZ246dG9wfS50b3RvcD5pbnB1dHttYXJnaW46MTBweCAwIDB9LmxhYmVsX2hlYWR7ZGlzcGxheTpibG9jazttYXJnaW46MCAwIDIwcHh9LmNsZWFyZml4OmFmdGVyLC5jbGVhcmZpeDpiZWZvcmV7Y29udGVudDpcXFwiXFxcIjtkaXNwbGF5OnRhYmxlO2NsZWFyOmJvdGh9LmFsaXN0e2Zsb2F0OnJpZ2h0fS5hbGlzdCBwe21hcmdpbjowIDAgMTBweDtsaW5lLWhlaWdodDoxO3RleHQtYWxpZ246cmlnaHR9LmJhci13cmFwe3BhZGRpbmc6OHB4IDE1cHg7YmFja2dyb3VuZDojMmQyZDJkfSNjdXN0b20tcHJvamVjdC1saXN0PmxpLCNjdXN0b20td29ya2Vycy1saXN0Pmxpe3dpZHRoOjIwJTtmbG9hdDpsZWZ0O2N1cnNvcjpwb2ludGVyfSNjdXN0b20tcHJvamVjdC1saXN0PmxpOmZpcnN0LWNoaWxke2Rpc3BsYXk6bm9uZX0udXNlci1saXN0e21hcmdpbjoyZW0gMWVtO3BhZGRpbmc6MDtsaXN0LXN0eWxlLXBvc2l0aW9uOmluc2lkZX0udXNlci1saXN0Pmxpe2xpbmUtaGVpZ2h0OjEuNX0uc2VsZWN0ZWR7Y29sb3I6Z3JlZW59LmJ0bi1mbGF0e3BhZGRpbmc6LjVlbTtiYWNrZ3JvdW5kOiNmMGYwZjA7Y3Vyc29yOnBvaW50ZXJ9LmJ0bi1mbGF0LC5yb3ctaXRlbXtkaXNwbGF5OmlubGluZS1ibG9ja30ucm93LWl0ZW17dmVydGljYWwtYWxpZ246dG9wfS5yb3ctaXRlbTpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1yaWdodDoxZW19I3NldHRpbmdzLWJ0bnttYXJnaW46MCAwIDIwcHh9I3NldHRpbmdzLWJveHtkaXNwbGF5Om5vbmU7bWFyZ2luOjIwcHggMDtwYWRkaW5nOjIwcHggMDtvdXRsaW5lOjFweCBzb2xpZCAjNDE0MTQxfSNzZXR0aW5ncy1ib3guaXMtb3BlbntkaXNwbGF5OmJsb2NrfS51c2VyLXRpdGxle2NvbG9yOiMwMDA7bWFyZ2luOjAgMCAuNmVtO2ZvbnQtc2l6ZToyMHB4O3BhZGRpbmc6MH0ucmVndWxhci1saW5re2NvbG9yOiMwMDU0Yjk7b3V0bGluZTowIWltcG9ydGFudH0udGltZS1saXN0IHB7bWFyZ2luOjVweCAwO2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy1tcy1mbGV4LXBhY2s6anVzdGlmeTtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0udGltZS1saXN0PnA+c3BhbjpmaXJzdC1jaGlsZHtwYWRkaW5nLXJpZ2h0OjFlbTtjdXJzb3I6cG9pbnRlcn06cm9vdCAudGltZS1saXN0LXRvdGFse21hcmdpbi10b3A6MWVtO2JvcmRlci10b3A6MXB4IHNvbGlkfS5jb21tZW50LWNvbGxhcHNlZHttYXgtaGVpZ2h0OjcwcHg7b3ZlcmZsb3c6aGlkZGVuIWltcG9ydGFudH0ubG9uZy1jb21tZW50e3dpZHRoOjEwMCUhaW1wb3J0YW50O3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctdG9wOjMwcHh9LmJ0bi1jb2xsYXBzZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowfS5idG4tY29sbGFwc2UtYWxse3Bvc2l0aW9uOmZpeGVkO3RvcDoxMHB4O3JpZ2h0OjEwcHh9OnJvb3QgLmRhdGVzLWxpc3R7d2lkdGg6MTUwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luOjAgMjBweCAwIDB9LnVzZXItdG9vbGJhcnttYXJnaW46MjBweCAwO3BhZGRpbmc6MjBweCAxMHB4O2JvcmRlci10b3A6MXB4IHNvbGlkIHJnYmEoMCwwLDAsLjcpO292ZXJmbG93OmhpZGRlbjtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstbXMtZmxleC13cmFwOndyYXA7ZmxleC13cmFwOndyYXB9LnVzZXItdG9vbGJhcl9faXRlbXtwYWRkaW5nOjEwcHggMTVweDtiYWNrZ3JvdW5kOmhzbGEoMCwwJSwxMDAlLC42KTtib3gtc2hhZG93OjAgMXB4IDFweCByZ2JhKDAsMCwwLC42KX06cm9vdCAudXNlci10b29sYmFyLXRpdGxle21hcmdpbjowIDAgMWVtO3BhZGRpbmc6MDtjb2xvcjojMDAwfTpyb290ICNjb21tZW50cy10YmwgLmNvbW1lbnQtd3JhcHtmb250LXNpemU6MTRweDt3aWR0aDoxMDAlIWltcG9ydGFudDttYXgtd2lkdGg6ODAwcHg7b3ZlcmZsb3c6aGlkZGVufTpyb290ICNjb21tZW50cy10YmwgaDF7Zm9udC1zaXplOjEyMCU7Zm9udC13ZWlnaHQ6NDAwO21hcmdpbjowIDAgLjRlbTtjb2xvcjppbmhlcml0fTpyb290ICNjb21tZW50cy10YmwgYmxvY2txdW90ZXtwYWRkaW5nOjEwcHggMjBweDttYXJnaW46MCAwIDIwcHg7Ym9yZGVyLWxlZnQ6NXB4IHNvbGlkICNjY2N9OnJvb3QgI2NvbW1lbnRzLXRibCBibG9ja3F1b3RlIHB7bWFyZ2luOjB9OnJvb3QgI2NvbW1lbnRzLXRibCBibG9ja3F1b3RlIHA6bm90KDpsYXN0LWNoaWxkKXttYXJnaW4tYm90dG9tOjFlbX06cm9vdCAjY29tbWVudHMtdGJsIHVse3BhZGRpbmctbGVmdDouNmVtO2xpc3Qtc3R5bGUtcG9zaXRpb246aW5zaWRlfS5zZWN0aW9uLXRpdGxle2NvbG9yOmluaGVyaXQ7bWFyZ2luOjAgMCAxZW07cGFkZGluZzowIWltcG9ydGFudH0ucy1pbmZve2NvbG9yOmdyYXk7Zm9udC1zaXplOjEycHh9LmJ0bi1pbnNlcnQtbHN7cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwMCU7cmlnaHQ6MmVtO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zc30uYnRuLWluc2VydC1scy5pcy12aXNpYmxle3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xNTAlKX0uYWRkLWFsZXJ0e3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCbWFXeHNQU0lqTURBd01EQXdJaUJvWldsbmFIUTlJakkwSWlCMmFXVjNRbTk0UFNJd0lEQWdNalFnTWpRaUlIZHBaSFJvUFNJeU5DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNGdJQ0FnUEhCaGRHZ2daRDBpVFRBZ01HZ3lOSFl5TkVnd1ZqQjZJaUJtYVd4c1BTSnViMjVsSWk4K0lDQWdJRHh3WVhSb0lHUTlJazB4TUM0d01TQXlNUzR3TVdNd0lERXVNUzQ0T1NBeExqazVJREV1T1RrZ01TNDVPWE14TGprNUxTNDRPU0F4TGprNUxURXVPVGxvTFRNdU9UaDZiVGd1T0RjdE5DNHhPVll4TVdNd0xUTXVNalV0TWk0eU5TMDFMamszTFRVdU1qa3ROaTQyT1hZdExqY3lRekV6TGpVNUlESXVOekVnTVRJdU9EZ2dNaUF4TWlBeWN5MHhMalU1TGpjeExURXVOVGtnTVM0MU9YWXVOekpETnk0ek55QTFMakF6SURVdU1USWdOeTQzTlNBMUxqRXlJREV4ZGpVdU9ESk1NeUF4T0M0NU5GWXlNR2d4T0hZdE1TNHdObXd0TWk0eE1pMHlMakV5ZWsweE5pQXhNeTR3TVdndE0zWXphQzB5ZGkwelNEaFdNVEZvTTFZNGFESjJNMmd6ZGpJdU1ERjZJaTgrUEM5emRtYyspO2N1cnNvcjpwb2ludGVyfSN0YXNrLXRpdGxlIC5hZGQtYWxlcnR7dmVydGljYWwtYWxpZ246bWlkZGxlO29wYWNpdHk6LjV9I3Rhc2stdGl0bGUgLmFkZC1hbGVydC5zZWxlY3RlZHtvcGFjaXR5OjF9I3RleHR7cmVzaXplOnZlcnRpY2FsfVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/e1wiaW1wb3J0TG9hZGVyc1wiOjF9IS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYiEuL3NyYy9wY3NzL3VzZXJzY3JpcHQucGNzc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvL9C/0L7QuNGB0Log0YHRgdGL0LvQvtC6INCyINGC0LXQutGB0YLQtSDQutC+0LzQvNC10L3RgtCw0YDQuNC10LIg0Lgg0L7QsdC+0YDQsNGH0LjQstCw0L3QuNC1INC40YUg0LIgPGE+XHJcbi8v0YHQstC+0YDQsNGH0LjQstCw0L3QuNC1INC00LvQuNC90L3Ri9GFINC60L7QvNC80LXQvdGC0LDRgNC40LXQsiwg0LTQvtCx0LDQstC70LXQvdC40LUg0LrQvdC+0L/QutC4INCh0LLRgNC10L3Rg9GC0Ywu0YDQsNC30LLQtdGA0L3Rg9GC0Ywg0LLRgdC1XHJcblxyXG5mdW5jdGlvbiBtb2R5ZmlDb21tZW50cygpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgZGl2LCB0eHQ7XHJcbiAgICBsZXQgcm93cyA9IHJlcXVpcmUoJy4vX2ZpbmRlcnMnKS5nZXRBbGxDb21tZW50c1Jvd3MoKTtcclxuXHJcbiAgICByZXF1aXJlKCcuL19sb2FkZXJzJykuYWRkanMoJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL21hcmtkb3duLWl0LzguMy4xL21hcmtkb3duLWl0Lm1pbi5qcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnb01hcmtkb3duKHJvd3MpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGl2ID0gcmVxdWlyZSgnLi9fZmluZGVycycpLmdldENvbW1lbnRGcm9tUm93KHJvd3NbaV0pO1xyXG4gICAgICAgIHR4dCA9IHJlcGxhY2VVUkxXaXRoSFRNTExpbmtzKGRpdi5pbm5lckhUTUwpO1xyXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSB0eHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/Qv9Cw0YDRgdC10YAgbWFya2Rvd25cclxuICAgIGZ1bmN0aW9uIGdvTWFya2Rvd24ocm93cykge1xyXG5cclxuICAgICAgICBsZXQgbWQgPSBtYXJrZG93bml0KCk7XHJcbiAgICAgICAgbWQub3B0aW9ucy5odG1sID0gdHJ1ZTtcclxuICAgICAgICBtZC5vcHRpb25zLmxpbmtpZnkgPSB0cnVlO1xyXG4gICAgICAgIG1kLm9wdGlvbnMudHlwb2dyYXBoZXIgPSB0cnVlO1xyXG4gICAgICAgIG1kLm9wdGlvbnMuYnJlYWtzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcm93cy5tYXAoZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICBhZGRNYXJrZG93bihyb3csIG1kKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRNYXJrZG93bihyb3csIG1kKSB7XHJcbiAgICAgICAgICAgIGxldCBjb21tZW50ID0gcmVxdWlyZSgnLi9fZmluZGVycycpLmdldENvbW1lbnRGcm9tUm93KHJvdyk7XHJcbiAgICAgICAgICAgIGxldCBibG9ja3MgPSBjb21tZW50LmlubmVySFRNTC5zcGxpdCgnPGJyPjxicj4nKTtcclxuXHJcbiAgICAgICAgICAgIGJsb2NrcyA9IGJsb2Nrcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmluZGV4T2YoJzxicj4nKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0uc3BsaXQoJzxicj4nKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS5tYXAoZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGNvbmNhdEVsZW1zVG9TdHJpbmcoaXRlbSwgJyonKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gY29uY2F0RWxlbXNUb1N0cmluZyhpdGVtLCAnJicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS5tYXAoZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyTWRTdHJpbmcoc3RyLCBtZClcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0uam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSByZXBsYWNlSHRtbEd0VG9TeW1ib2woaXRlbS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSByZW5kZXJNZFN0cmluZyhpdGVtLCBtZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICc8cD4nICsgaXRlbSArICc8L3A+JztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb21tZW50LmlubmVySFRNTCA9IGJsb2Nrcy5qb2luKCcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlbmRlck1kU3RyaW5nKHN0ciwgbWQpIHtcclxuICAgICAgICAgICAgbGV0IG1kYyA9IFsnIycsICcqJywgJy0nLCAnPiddO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1kYy5pbmRleE9mKHN0ci5jaGFyQXQoMCkpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHN0ciA9IG1kLnJlbmRlcihzdHIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8rJzxicj4nINC90YPQttC90L4g0YfRgtC+0LHRiyDQsdGL0LvQviDQv9C+0YXQvtC20LUg0L3QsCDQuNGB0YXQvtC00L3QvtC1INGE0L7RgNC80LDRgtC40YDQvtCy0LDQvdC40LVcclxuICAgICAgICAgICAgICAgIHN0ciA9IHN0ciArICc8YnI+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/Qv9C+0LjRgdC6INC4INC+0LHRitC10LTQuNC90LXQvdC40LUg0LIg0L7QtNC90YMg0YHRgtGA0L7QutGDINGN0LvQtdC80LXQvdGC0L7QsiDQvNCw0YHRgdC40LLQsFxyXG4gICAgLy/QvdCw0YfQuNC90LDRjtGJ0LjRhdGB0Y8g0YEg0YHQuNC80LLQvtC70LAgKlxyXG4gICAgLy/QtNC70Y8g0YHQvtC30LTQsNC90LjRjyDRgdC/0LjRgdC60LAgdWw+bGkg0LIgbWFya2Rvd25cclxuICAgIGZ1bmN0aW9uIGNvbmNhdEVsZW1zVG9TdHJpbmcoYXJyLCBzeW1ib2wpIHtcclxuICAgICAgICBsZXQgbmV4dDtcclxuICAgICAgICBsZXQgc3RyaW5ncyA9IFtdO1xyXG4gICAgICAgIGxldCBuZXdsaXN0ID0gJyc7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5leHQgPSBpICsgMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcnJbaV0uY2hhckF0KDApID09PSBzeW1ib2wgJiYgYXJyW25leHRdICYmIGFycltuZXh0XS5jaGFyQXQoMCkgPT09IHN5bWJvbCkge1xyXG4gICAgICAgICAgICAgICAgbmV3bGlzdCArPSBwcmVmb3JtYXRTdHJpbmcoYXJyW2ldLCBzeW1ib2wpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFhcnJbbmV4dF0gfHwgYXJyW25leHRdLmNoYXJBdCgwKSAhPT0gc3ltYm9sKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdsaXN0ICs9IHByZWZvcm1hdFN0cmluZyhhcnJbaV0sIHN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdzLnB1c2gobmV3bGlzdCk7XHJcbiAgICAgICAgICAgICAgICBuZXdsaXN0ID0gJyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdzLnB1c2goYXJyW2ldKTtcclxuICAgICAgICAgICAgICAgIC8vIHN0cmluZ3MucHVzaChwcmVmb3JtYXRTdHJpbmcoYXJyW2ldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdHJpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8v0L7QsdGA0LDQsdC+0YLQutCwINGB0YLRgNC+0Log0L/QtdGA0LXQtCDRhNC+0YDQvNCw0YLQuNGA0L7QstCw0L3QuNC10Lwg0LIgbWFya2Rvd25cclxuICAgIGZ1bmN0aW9uIHJlcGxhY2VIdG1sR3RUb1N5bWJvbCh0ZXh0KSB7XHJcbiAgICAgICAgbGV0IGZpbmQgPSAnJmd0Oyc7XHJcbiAgICAgICAgbGV0IHJlID0gbmV3IFJlZ0V4cChmaW5kLCAnZycpO1xyXG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UocmUsICc+Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJlZm9ybWF0U3RyaW5nKHN0ciwgc3ltYm9sID0gJ3wnKSB7XHJcblxyXG4gICAgICAgIGxldCBzcGFjZSA9ICcnO1xyXG4gICAgICAgIC8v0LTQu9GPINGB0L/QuNGB0LrQsCDQvdCw0LTQviDRgSDQvdC+0LLQvtC5INGB0YLRgNC+0LrQuFxyXG4gICAgICAgIHN3aXRjaCAoc3ltYm9sKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJyonOlxyXG4gICAgICAgICAgICAgICAgc3BhY2UgPSAnXFxuJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL9CwINCyINGG0LjRgtCw0YLQtSAtINCyINC+0LTQvdGDINGB0YLRgNC+0LrRg1xyXG4gICAgICAgICAgICBjYXNlICcmJzpcclxuICAgICAgICAgICAgICAgIHNwYWNlID0gJyAnO1xyXG4gICAgICAgICAgICAgICAgc3RyID0gcmVwbGFjZUh0bWxHdFRvU3ltYm9sKHN0cik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coc3ltYm9sKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coKHN0ci5tYXRjaCgvXFxuL2cpfHxbXSkubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIC8vc3RyID0gc3RyLnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzdHIpO1xyXG4gICAgICAgICAgICAgICAgc3RyID0gJzxwPicgKyBzdHIgKyAnPC9wPidcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdHIgKyBzcGFjZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXBsYWNlVVJMV2l0aEhUTUxMaW5rcyh0ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgZXhwID0gLyhcXGIoaHR0cHM/fGZ0cHxmaWxlKTpcXC9cXC9bLUEtWjAtOSsmQCNcXC8lPz1+X3whOiwuO10qWy1BLVowLTkrJkAjXFwvJT1+X3xdKS9pZztcclxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKGV4cCwgJzxhIGhyZWY9XCIkMVwiIGNsYXNzPVwicmVndWxhci1saW5rXCI+JDE8L2E+Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdsb2FkIG1vZHlmaUNvbW1lbnRzJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7bW9keWZpQ29tbWVudHN9O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb2R5ZmlDb21tZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvL9C/0L7QtNC60LvRjtGH0LXQvdC40LUg0YHRgtGA0L7QvdC90LXQs9C+IGpzINCyIGhlYWRcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZGpzKHVybCwgY2FsbGJhY2spIHtcclxuICAgIGxldCBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuICAgIGxldCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICBzLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgfTtcclxuICAgIHMuc3JjID0gdXJsO1xyXG4gICAgaGVhZC5hcHBlbmRDaGlsZChzKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL19sb2FkZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2dldEFsbENvbW1lbnRzUm93c30gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcblxyXG5mdW5jdGlvbiBjb21tZW50c0Rlc2lnbigpIHtcclxuICAgIC8v0L/QtdGA0LXQtNC10LvQutCwINCy0L3QtdGI0L3QtdCz0L4g0LLQuNC00LAg0LrQsNC80LXQvdGC0L7QslxyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGNyZWF0ZVRlbXBsYXRlKCk7XHJcblxyXG4gICAgbGV0IHRibCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy10YmwnKTtcclxuXHJcbiAgICBsZXQgcm93cyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG5cclxuICAgIC8vcm93c1swXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJvd3NbMF0ucHJldmlvdXNFbGVtZW50U2libGluZyk7XHJcbiAgICAvL9GB0LrRgNGL0LLQsNGOLCDQsCDQvdC1INGD0LTQsNC70Y/RjiDRh9GC0L7QsdGLINC90LUg0LzQtdC90Y/RgtGMINGD0LbQtSDQuNGB0L/QvtC70YzQt9GD0LXQvNGL0LUg0YTRg9C90LrRhtC40LhcclxuICAgIC8v0LLRi9Cx0LjRgNCw0Y7RidC40LUg0YHRgtGA0L7QutC4INGBINC60LDQvNC10L3RgtCw0LzQuCDQuCDQuNCz0L3QvtGA0LjRgNGD0Y7RidC40LUg0L/QtdGA0LLRg9GOINGB0YLRgNC+0LrRgy5cclxuICAgIC8v0JXRgdC70Lgg0YPQtNCw0LvRj9GC0Ywg0YLQviDQv9C+0LvRg9GH0LjRgtGB0Y8g0YfRgtC+INC/0LXRgNCy0YvQuSDQutCw0LzQtdC90YIg0L3QtSDQsdGD0LTQtdGCINC+0LHRgNCw0LHQsNGC0YvQstCw0YLRjNGB0Y9cclxuICAgIHJvd3NbMF0ucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4tZWxlbScpO1xyXG4gICAgLy/Rgi7Qui4g0LIg0LTQsNGA0YLQtSDQtNC+0LHQsNCy0LjQu9C4INGB0YLRgNC+0Log0L/RgNC10LTRi9C00YPRidCw0Y8g0YHRgtGA0L7QutCwINC90LUg0YHQutGA0YvQstCw0LXRgiDRgdGC0YDQvtC60YMg0YEg0LfQsNCz0L7Qu9C+0LLQutCw0LzQuCDRgdGC0L7Qu9Cx0YbQvtCyXHJcbiAgICAvL9C/0L7RjdGC0L7QvNGDINC10YnQtVxyXG4gICAgdGJsLnF1ZXJ5U2VsZWN0b3IoJ3RyJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLWVsZW0nKTtcclxuXHJcbiAgICByb3dzLm1hcChmdW5jdGlvbiAoaXRlbSwgaSkge1xyXG4gICAgICAgIGxldCB0ZCA9IEFycmF5LmZyb20oaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpKTtcclxuXHJcbiAgICAgICAgbGV0IGJsb2NrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtdGVtcGxhdGUnKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgYmxvY2sucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xyXG5cclxuICAgICAgICBpdGVtLmFwcGVuZENoaWxkKGJsb2NrKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd3MgPSBibG9jay5xdWVyeVNlbGVjdG9yQWxsKCcuYi1jb21tZW50X19yb3cnKTtcclxuXHJcbiAgICAgICAgbGV0IHJvdzEgPSBjcmVhdGUxcm93KHRkLCBpKTtcclxuICAgICAgICByb3dzWzBdLmFwcGVuZENoaWxkKHJvdzEpO1xyXG5cclxuICAgICAgICByb3dzWzFdLmFwcGVuZENoaWxkKGNyZWF0ZTJyb3codGQpKTtcclxuICAgICAgICByb3dzWzJdLmFwcGVuZENoaWxkKGNyZWF0ZTNyb3codGQpKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbGVzID0gY3JlYXRlNHJvdyh0ZCk7XHJcbiAgICAgICAgaWYgKCEhZmlsZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBwaWNzID0gWydwbmcnLCAnanBnJywgJ2dpZiddO1xyXG5cclxuICAgICAgICAgICAgZmlsZXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9sZXQgZXh0ID0gaXRlbS5ocmVmLnNwbGl0KCcuJylbMV07XHJcbiAgICAgICAgICAgICAgICBsZXQgZXh0ID0gaXRlbS5ocmVmLmxhc3RJbmRleE9mKCcuJyk7XHJcbiAgICAgICAgICAgICAgICBleHQgPSBpdGVtLmhyZWYuc2xpY2UoZXh0ICsgMSwgaXRlbS5ocmVmLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBpY3MuaW5kZXhPZihleHQudG9Mb3dlckNhc2UoKSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVJbWdUaHVtYihpdGVtKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZURvY3NUaHVtYihleHQsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJvd3NbM10uYXBwZW5kQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJsb2NrLnJlbW92ZUNoaWxkKHJvd3NbM10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9j0YLRgNC+0LrQsCDRgdC60YDRi9GC0LBcclxuICAgICAgICAvL3Jvd3NbNF0uY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgLy9yb3dzWzRdLmFwcGVuZENoaWxkKGNyZWF0ZTVyb3codGQpKTtcclxuXHJcbiAgICAgICAgLy/RgdGC0LDQvdC+0LLQuNGC0YHRjyDQstC40LTQuNC80L7QuSDQv9GA0Lgg0L3QsNCy0LXQtNC10L3QuNC4INC60YPRgNGB0L7RgNCwINC90LAg0LrQsNGA0YLQvtGH0LrRgyDQutCw0LzQtdC90YLQsFxyXG4gICAgICAgIGJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNob3dBY3Rpb25zQnRuKHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBibG9jay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzaG93QWN0aW9uc0J0bih0aGlzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGQubWFwKGZ1bmN0aW9uICh0ZGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKHRkaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDaGlsZCh0ZGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUxcm93KHRkLCByb3dudW1iZXIpIHtcclxuICAgICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgICAgIGxldCByb3dJdGVtUHJvdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgICAgICAvL9C00LDRgtCwXHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWRhdGUnKTtcclxuICAgICAgICByb3dJdGVtLmlkID0gJ2NvbW1lbnQtZGF0ZSc7XHJcbiAgICAgICAgcm93SXRlbS5pbm5lckhUTUwgPSB0ZFszXS50ZXh0Q29udGVudDtcclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIC8vaWQgY2hlY2tib3hcclxuICAgICAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzBdLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2lkLWNoZWNrYm94Jyk7XHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIC8v0L/RgNC40L7RgNC40YLQtdGCINC4INGB0YDQvtC6INC40YHQv9C+0LvQvdC10L3QuNGPXHJcbiAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLXJhbmsnKTtcclxuXHJcbiAgICAgICAgcm93SXRlbS5pbm5lckhUTUwgPSB0ZFs4XS50ZXh0Q29udGVudCArICcg0L/RgNC40L7RgNC40YLQtdGCJztcclxuXHJcbiAgICAgICAgbGV0IGRlYWRsaW5lID0gdGRbN10udGV4dENvbnRlbnQ7XHJcblxyXG4gICAgICAgIGlmIChkZWFkbGluZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0uaW5uZXJIVE1MID0gcm93SXRlbS5pbm5lckhUTUwgKyAnLjxiIGNsYXNzPVwiZGVhZGxpbmUtZGF0ZVwiPtCh0LTQsNGC0YwgJyArIGRlYWRsaW5lICsgJzwvYj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIC8v0L/QuNGB0YzQvNCwLNGB0YHRi9C70LrQsCzRgdGC0LDRgtGD0YFcclxuICAgICAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Jvdy1yaWdodCcpO1xyXG5cclxuICAgICAgICBsZXQgc3RhdHVzID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSB0ZFs5XS50ZXh0Q29udGVudDtcclxuICAgICAgICBzdGF0dXMuY2xhc3NMaXN0LmFkZCgndGFzay1zdGF0dXMnKTtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHN0YXR1cyk7XHJcblxyXG4gICAgICAgIGxldCBsZXR0ZXIgPSB0ZFsxXS5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKVsxXTtcclxuICAgICAgICBsZXR0ZXIuY2xhc3NMaXN0LmFkZCgnbGV0dGVyLWFkZHInKTtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKGxldHRlcik7XHJcblxyXG4gICAgICAgIGxldCBsaW5rID0gdGRbMV0ucXVlcnlTZWxlY3RvckFsbCgnYScpWzFdO1xyXG4gICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1saW5rJyk7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcbiAgICAgICAgLy/QvdC+0LzQtdGAINC60L7QvNC80LXQvdGC0LDRgNC40Y9cclxuICAgICAgICBsZXQgbm8gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIG5vLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtbm8nKTtcclxuICAgICAgICBuby5pbm5lckhUTUwgPSByb3dudW1iZXI7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZChubyk7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZnJhZ21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlMnJvdyh0ZCkge1xyXG4gICAgICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW1Qcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgICBsZXQgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWluZm8nKTtcclxuXHJcbiAgICAgICAgLy/QsNCy0YLQvtGAXHJcbiAgICAgICAgbGV0IGF1dGhvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBhdXRob3IuY2xhc3NMaXN0LmFkZCgnY29tbWVudC1hdXRob3InKTtcclxuICAgICAgICAvL2F1dGhvci5pbm5lckhUTUwgPSAn0JDQstGC0L7RgCA8YnI+JyArIHRkWzRdLnRleHRDb250ZW50O1xyXG4gICAgICAgIGF1dGhvci5pbm5lckhUTUwgPSB0ZFs0XS50ZXh0Q29udGVudDtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKGF1dGhvcik7XHJcblxyXG4gICAgICAgIC8v0LjRgdC/0L7Qu9C90LjRgtC10LvRjFxyXG4gICAgICAgIGxldCB3b3JrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgd29ya2VyLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQtd29ya2VyJyk7XHJcbiAgICAgICAgLy93b3JrZXIuaW5uZXJIVE1MID0gJ9CY0YHQv9C+0LvQvdC40YLQtdC70YwgPGJyPicgKyB0ZFs2XS50ZXh0Q29udGVudDtcclxuICAgICAgICB3b3JrZXIuaW5uZXJIVE1MID0gdGRbNl0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh3b3JrZXIpO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAgICAgbGV0IHdvcmtUaW1lID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICB3b3JrVGltZS5jbGFzc0xpc3QuYWRkKCd3b3JrLXRpbWUnKTtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVTdHIgPSB0ZFsxMF0udGV4dENvbnRlbnQuc3BsaXQoJy8nKTtcclxuXHJcbiAgICAgICAgLyp0aW1lU3RyWzBdID0gY3JlYXRlVGltZVRpdGxlU3RyaW5nKHRpbWVTdHJbMF0sIFsn0JfQsNGC0YDQsNGH0LXQvdCwJywgJ9CX0LDRgtGA0LDRh9C10L3QvicsICfQl9Cw0YLRgNCw0YfQtdC90L4nXSkrXHJcbiAgICAgICAgICcgJysgY3JlYXRlVGltZVN0cmluZyh0aW1lU3RyWzBdLCBbJ9C80LjQvdGD0YLQsCcsICfQvNC40L3Rg9GC0YsnLCAn0LzQuNC90YPRgiddKTsqL1xyXG5cclxuICAgICAgICB0aW1lU3RyWzBdID0gJzxzcGFuIGNsYXNzPVwiZWxhcHNlZC10aW1lXCI+JyArIHRpbWVTdHJbMF0gKyAnINC80LjQvS48L3NwYW4+JztcclxuICAgICAgICB3b3JrVGltZS5pbm5lckhUTUwgPSB0aW1lU3RyWzBdO1xyXG5cclxuICAgICAgICAvLyBpZiAoaXNOYU4oTnVtYmVyKHRpbWVTdHJbMV0pKSkge1xyXG4gICAgICAgIC8vICAgICB3b3JrVGltZS5pbm5lckhUTUwgPSB0aW1lU3RyWzBdO1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICB0aW1lU3RyWzFdID0gJyDQuNC3ICcrdGltZVN0clsxXTtcclxuICAgICAgICAvLyAgICAgd29ya1RpbWUuaW5uZXJIVE1MID0gdGltZVN0ci5qb2luKCcgJyk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh3b3JrVGltZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmcmFnbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGUzcm93KHRkKSB7XHJcblxyXG4gICAgICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW1Qcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgICAvL9C60L7QvNC80LXQvdGC0LDRgNC40LlcclxuICAgICAgICBsZXQgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdjb21tZW50LWJvZHknKTtcclxuICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzVdLmZpcnN0RWxlbWVudENoaWxkLmNsb25lTm9kZSh0cnVlKSk7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICAvL9C+0LHQtdGA0YLQutCwINC00LvRjyDQutC90L7Qv9C+0Log0KPQtNCw0LvQuNGC0Ywg0Lgg0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcclxuICAgICAgICBsZXQgcm93SXRlbVdyYXAgPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW1XcmFwLmNsYXNzTGlzdC5hZGQoJ2FjdGlvbnMtYnRuLXdyYXAnKTtcclxuICAgICAgICAvL9GD0LTQsNC70LjRgtGMXHJcblxyXG4gICAgICAgIGlmICh0ZFsxMV0uZmlyc3RFbGVtZW50Q2hpbGQpIHtcclxuICAgICAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnYnRuLWRlbC1jb21tZW50Jyk7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQodGRbMTFdLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICAgICAgcm93SXRlbVdyYXAuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL9GA0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXHJcbiAgICAgICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCdidG4tZWRpdC1jb21tZW50Jyk7XHJcbiAgICAgICAgcm93SXRlbS5hcHBlbmRDaGlsZCh0ZFsxXS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgcm93SXRlbVdyYXAuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW1XcmFwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZTRyb3codGQpIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0ZFsyXS5xdWVyeVNlbGVjdG9yQWxsKCdhJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZTVyb3codGQpIHtcclxuICAgICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgICAgIGxldCByb3dJdGVtUHJvdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgICAgICAvL9C+0LHQtdGA0YLQutCwINC00LvRjyDQutC90L7Qv9C+0Log0KPQtNCw0LvQuNGC0Ywg0Lgg0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcclxuICAgICAgICBsZXQgcm93SXRlbVdyYXAgPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW1XcmFwLmNsYXNzTGlzdC5hZGQoJ2FjdGlvbnMtYnRuLXdyYXAnKTtcclxuXHJcbiAgICAgICAgLy/Rg9C00LDQu9C40YLRjFxyXG5cclxuICAgICAgICBpZiAodGRbMTFdLmZpcnN0RWxlbWVudENoaWxkKSB7XHJcbiAgICAgICAgICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ2J0bi1kZWwtY29tbWVudCcpO1xyXG4gICAgICAgICAgICByb3dJdGVtLmFwcGVuZENoaWxkKHRkWzExXS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgICAgIHJvd0l0ZW1XcmFwLmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/RgNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFxyXG4gICAgICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgnYnRuLWVkaXQtY29tbWVudCcpO1xyXG4gICAgICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQodGRbMV0uZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgIHJvd0l0ZW1XcmFwLmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtV3JhcCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmcmFnbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBpZihOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdsb2FkIGNvbW1lbnRzRGVzaWduJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUltZ1RodW1iKGl0ZW0pIHtcclxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB3cmFwLmNsYXNzTGlzdC5hZGQoJ2ltZy10aHVtYicsICdmaWxlLXRodW1iJyk7XHJcblxyXG4gICAgbGV0IHBpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgcGljLnNyYyA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcbiAgICBwaWMuY2xhc3NMaXN0LmFkZCgndGh1bWItcGljJyk7XHJcblxyXG4gICAgLy9pdGVtLmNsYXNzTGlzdC5hZGQoJ2ltZy10aHVtYicsICdmaWxlLXRodW1iJyk7XHJcbiAgICBpdGVtLmFwcGVuZENoaWxkKHBpYyk7XHJcbiAgICBsZXQgdGl0bGUgPSBnZXRBdHRhY2hUaXRsZShpdGVtKTtcclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoaXRlbSk7XHJcbiAgICB3cmFwLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuXHJcbiAgICB3cmFwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGJpZ3BpYyA9IHBpYy5jbG9uZU5vZGUoZmFsc2UpO1xyXG4gICAgICAgIGJpZ3BpYy5jbGFzc0xpc3QuYWRkKCdsYXJnZS1waWMtcHJldmlldycpO1xyXG4gICAgICAgIGJpZ3BpYy5jbGFzc0xpc3QucmVtb3ZlKCd0aHVtYi1waWMnKTtcclxuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKGJpZ3BpYyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3cmFwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5sYXJnZS1waWMtcHJldmlldycpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB3cmFwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVEb2NzVGh1bWIoZXh0LCBpdGVtKSB7XHJcbiAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2RvYy10aHVtYicsICdmaWxlLXRodW1iJyk7XHJcbiAgICBpdGVtLmFwcGVuZENoaWxkKGdldEF0dGFjaFRpdGxlKGl0ZW0pKTtcclxuICAgIGl0ZW0ucmVtb3ZlQ2hpbGQoaXRlbS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICByZXR1cm4gaXRlbTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXR0YWNoVGl0bGUoaXRlbSkge1xyXG4gICAgbGV0IHRpdGxlID0gaXRlbS5maXJzdEVsZW1lbnRDaGlsZC50aXRsZTtcclxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB3cmFwLnRleHRDb250ZW50ID0gdGl0bGU7XHJcbiAgICB3cmFwLmNsYXNzTGlzdC5hZGQoJ2F0dGFjaC10aXRsZScpO1xyXG4gICAgcmV0dXJuIHdyYXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRlbXBsYXRlKCkge1xyXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xyXG4gICAgbGV0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBibG9jay5jbGFzc0xpc3QuYWRkKCdiLWNvbW1lbnQnKTtcclxuICAgIGJsb2NrLmlkID0gJ2NvbW1lbnQtdGVtcGxhdGUnO1xyXG5cclxuICAgIGxldCBibG9ja1JvdztcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGJsb2NrUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYmxvY2tSb3cuY2xhc3NMaXN0LmFkZCgnYi1jb21tZW50X19yb3cnLCAnYi1jb21tZW50X19yb3dfJyArIGkpO1xyXG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKGJsb2NrUm93KVxyXG4gICAgfVxyXG5cclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoYmxvY2spO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod3JhcCk7XHJcblxyXG4gICAgcmV0dXJuIHdyYXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dBY3Rpb25zQnRuKGNhbW1lbnQpIHtcclxuICAgIGxldCBidG5zID0gY2FtbWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aW9ucy1idG4td3JhcCcpO1xyXG4gICAgYnRucy5jbGFzc0xpc3QudG9nZ2xlKCdpcy12aXNpYmxlJyk7XHJcbn1cclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9wY3NzL2NvbW1lbnRzRGVzaWduLnBjc3MnO1xyXG5cclxuZXhwb3J0IHtjb21tZW50c0Rlc2lnbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbW1lbnRzRGVzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi9jb21tZW50c0Rlc2lnbi5wY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL2NvbW1lbnRzRGVzaWduLnBjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vY29tbWVudHNEZXNpZ24ucGNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGNzcy9jb21tZW50c0Rlc2lnbi5wY3NzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuYi1jb21tZW50X19yb3c6bGFzdC1jaGlsZHtwYWRkaW5nLWJvdHRvbToyZW19LmNvbW1lbnQtd3JhcCBwOm9ubHktb2YtdHlwZXttYXJnaW46MH0uY29tbWVudC13cmFwIHA6bGFzdC1jaGlsZHttYXJnaW4tYm90dG9tOjB9I2NvbW1lbnRzLXRibHttYXJnaW46YXV0bztwYWRkaW5nOjNlbSAwO2JhY2tncm91bmQ6I2YwZjBmMH0jY29tbWVudHMtdGJsLCNjb21tZW50cy10YmwgdGJvZHksI2NvbW1lbnRzLXRibCB0cntkaXNwbGF5OmJsb2NrfSNjb21tZW50cy10YmwgdHI6bm90KDpsYXN0LWNoaWxkKXttYXJnaW4tYm90dG9tOjJlbX0uY29tbWVudC1ib2R5e3dpZHRoOjEwMCV9LmNvbW1lbnQtd3JhcCBwe2xpbmUtaGVpZ2h0OjEuNH0uY29tbWVudC13cmFwIHA6Zmlyc3QtY2hpbGR7bWFyZ2luLXRvcDowfS5iLWNvbW1lbnR7bWF4LXdpZHRoOjcyMHB4O21hcmdpbjphdXRvO2JhY2tncm91bmQ6I2ZhZmFmYTtib3gtc2hhZG93OjAgMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCA1cHggMCByZ2JhKDAsMCwwLC4xMiksMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMik7d2lkdGg6MTAwJTtmb250LXNpemU6MTJweDtwb3NpdGlvbjpyZWxhdGl2ZTtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmItY29tbWVudC5iLWNvbW1lbnRfbm90aWZ5e21hcmdpbi10b3A6MmVtO3BhZGRpbmc6MmVtO2NvbG9yOiMzMTcwOGY7YmFja2dyb3VuZDojZDllZGY3O2JvcmRlcjoxcHggc29saWQgI2JjZThmMX0uYi1jb21tZW50LmItY29tbWVudF9ub3RpZnkgLmNvbW1lbnRzLXVwZGF0ZS1saW5re2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmctbGVmdDoxZW07Y29sb3I6aW5oZXJpdH0uYi1jb21tZW50X19yb3d7cGFkZGluZzoxZW0gMmVtO2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy1tcy1mbGV4LWZsb3c6cm93IHdyYXA7ZmxleC1mbG93OnJvdyB3cmFwO3Bvc2l0aW9uOnJlbGF0aXZlfS5iLWNvbW1lbnRfX3JvdzpmaXJzdC1jaGlsZHtwYWRkaW5nLXRvcDoyZW19LmItY29tbWVudF9fcm93OmZpcnN0LWNoaWxkIC5yb3ctcmlnaHR7dG9wOjJlbX0uYi1jb21tZW50X19yb3dfMHtjb2xvcjpncmF5fS50YXNrLXJhbmssLnRhc2stc3RhdHVze3BhZGRpbmc6MCAuNWVtIDAgMmVtfS5kZWFkbGluZS1kYXRle3BhZGRpbmctbGVmdDoxZW19LmlkLWNoZWNrYm94e3Bvc2l0aW9uOmFic29sdXRlO3Zpc2liaWxpdHk6aGlkZGVuO3otaW5kZXg6LTF9LmNvbW1lbnQtbGluaywuY29tbWVudC1ub3ttYXJnaW4tcmlnaHQ6MCFpbXBvcnRhbnR9LmItY29tbWVudF9fcm93LmItY29tbWVudF9fcm93XzF7cGFkZGluZy10b3A6MDstbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47Y29sb3I6Z3JheX0uY29tbWVudC1pbmZvPnNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246dG9wfS5jb21tZW50LWF1dGhvcntwYWRkaW5nLXJpZ2h0OjJlbTtwb3NpdGlvbjpyZWxhdGl2ZX0uY29tbWVudC1hdXRob3I6YWZ0ZXJ7Y29udGVudDpcXFwiXFxcXDIxOTJcXFwiO3Bvc2l0aW9uOnJlbGF0aXZlO2xlZnQ6MWVtfS5iLWNvbW1lbnRfX3Jvd18ye2ZvbnQtc2l6ZToxNHB4O2JhY2tncm91bmQ6I2ZmZjtib3JkZXItdG9wOjFweCBzb2xpZCBoc2xhKDAsMCUsNjMlLC4yKTtib3JkZXItYm90dG9tOjFweCBzb2xpZCBoc2xhKDAsMCUsNjMlLC4yKTtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59LmFjdGlvbnMtYnRuLXdyYXB7cGFkZGluZzoxZW07cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwMCU7cmlnaHQ6MDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3N9LmFjdGlvbnMtYnRuLXdyYXAuaXMtdmlzaWJsZXt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMTAwJSl9LmJ0bi1kZWwtY29tbWVudCwuYnRuLWVkaXQtY29tbWVudHtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7aGVpZ2h0OjI0cHg7bGluZS1oZWlnaHQ6MjRweDtwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjF9LmJ0bi1lZGl0LWNvbW1lbnR7bWFyZ2luLWxlZnQ6LjVlbTt0b3A6M3B4fS5idG4tZGVsLWNvbW1lbnR7d2lkdGg6NzBweH0uYnRuLWRlbC1jb21tZW50OmFmdGVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3otaW5kZXg6LTE7Y29udGVudDpcXFwiXFxcXDQyM1xcXFw0MzRcXFxcNDMwXFxcXDQzQlxcXFw0MzhcXFxcNDQyXFxcXDQ0Q1xcXCI7Y29sb3I6I2NjYztsaW5lLWhlaWdodDpub3JtYWw7Ym9yZGVyLWJvdHRvbToxcHggc29saWR9LmJ0bi1kZWwtY29tbWVudCBpbWd7ZGlzcGxheTpub25lfS5idG4tZGVsLWNvbW1lbnQgYXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlfS5iLWNvbW1lbnRfX3Jvdy5iLWNvbW1lbnRfX3Jvd18ze3BhZGRpbmctdG9wOjEuNWVtO3BhZGRpbmctYm90dG9tOjEuNWVtOy1tcy1mbGV4LWFsaWduOnN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LmItY29tbWVudF9fcm93XzMrLmItY29tbWVudF9fcm93XzR7Ym9yZGVyLXRvcDoxcHggc29saWQgaHNsYSgwLDAlLDYzJSwuMil9LmItY29tbWVudF9fcm93LmItY29tbWVudF9fcm93XzR7LW1zLWZsZXgtcGFjazplbmQ7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS5yb3ctcmlnaHR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjFlbTtyaWdodDoyZW19LnJvdy1yaWdodD4qe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ucm93LXJpZ2h0Pjpub3QoOmxhc3QtY2hpbGQpe21hcmdpbi1yaWdodDouN2VtfS5pbWctdGh1bWJ7bWF4LXdpZHRoOjE1MHB4fS5pbWctdGh1bWIgaW1nOmZpcnN0LWNoaWxke2Rpc3BsYXk6bm9uZX0uaW1nLXRodW1iPmF7ZGlzcGxheTpibG9ja30uaW1nLXRodW1iIC5hdHRhY2gtdGl0bGV7bWFyZ2luLXRvcDouM2VtfS50aHVtYi1waWN7d2lkdGg6MTAwJTtvYmplY3QtZml0OmNvdmVyO21heC1oZWlnaHQ6MjAwcHg7Ym9yZGVyOjFweCBzb2xpZCAjY2NjfS5sYXJnZS1waWMtcHJldmlld3ttYXgtd2lkdGg6NDB2dztib3JkZXI6MXB4IHNvbGlkIGdyYXk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjkwJTtsZWZ0OjA7ei1pbmRleDoxfS5kb2MtdGh1bWJ7bWF4LXdpZHRoOjE1MHB4O2JhY2tncm91bmQ6I2YzZjNmMztmb250LXNpemU6MTFweDtib3JkZXI6MXB4IHNvbGlkICNjY2M7dGV4dC1hbGlnbjpjZW50ZXI7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Y29sb3I6aW5oZXJpdH0uZG9jLXRodW1iIC5hdHRhY2gtdGl0bGV7d2lkdGg6MTAwJTtwYWRkaW5nOjAgLjVlbTtsaW5lLWhlaWdodDoxLjY7d29yZC1icmVhazpicmVhay1hbGw7Ym94LXNpemluZzpib3JkZXItYm94O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSl9LmZpbGUtdGh1bWJ7LW1zLWZsZXg6MSAxIDI1JTtmbGV4OjEgMSAyNSU7bWluLWhlaWdodDo3MHB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5maWxlLXRodW1iOm50aC1jaGlsZChuKzcpe21hcmdpbi10b3A6MmVtfS5maWxlLXRodW1iOm5vdCg6bGFzdC1jaGlsZCl7bWFyZ2luLXJpZ2h0OjFlbX0uYXR0YWNoLXRpdGxle21heC13aWR0aDoxNTBweDt0ZXh0LWFsaWduOmNlbnRlcjtsaW5lLWhlaWdodDpub3JtYWw7d29yZC1icmVhazpicmVhay1hbGx9I2NvbW1lbnRzLXRibCB0cjpsYXN0LWNoaWxkIC5iLWNvbW1lbnRfX3Jvd18wLCNjb21tZW50cy10YmwgdHI6bGFzdC1jaGlsZCAuYi1jb21tZW50X19yb3dfMXtjb2xvcjojMDAwfVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/e1wiaW1wb3J0TG9hZGVyc1wiOjF9IS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYiEuL3NyYy9wY3NzL2NvbW1lbnRzRGVzaWduLnBjc3Ncbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8v0LrQsNC70YzQutGD0LvRj9GC0L7RgCDQsiDQv9C+0LvQtSDQstCy0L7QtNCwINC30LDRgtGA0LDRh9C10L3QvdC+0LPQviDQstGA0LXQvNC10L3QuFxyXG5mdW5jdGlvbiBjYWxjdWxhdGVFbGFwc2VkVGltZSgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgdGltZUVsYXBzZWRGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGVuZGVkX3RpbWUnKTtcclxuXHJcbiAgICBpZighdGltZUVsYXBzZWRGaWVsZCl7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCfQndC1INC90LDQudC00LXQvdC+INC/0L7Qu9C1INCy0LLQvtC00LAg0LLRgNC10LzQtdC90Lgg0LLRi9C/0L7Qu9C90LXQvdC40Y8nKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0KPQtNCw0LvQtdC90LjQtSDQvtCx0YDQsNCx0L7RgtGH0LjQutCwINC90LDQttCw0YLQuNGPINC60LvQsNCy0LjRiCDQtNC70Y8g0L/QvtC70Y8gJ3NwZW5kZWRfdGltZSdcclxuICAgIHRpbWVFbGFwc2VkRmllbGQub25rZXl1cCA9IG51bGw7XHJcblxyXG4gICAgLy8g0JTQvtCx0LDQstC70LXQvdC40LUg0YHQvtCx0YvRgtC40Y8g0LTQu9GPINCy0YvRh9C40YHQu9C10L3QuNGPINC30LDRgtGA0LDRh9C10L3QvdC+0LPQviDQstGA0LXQvNC10L3QuCDQtNC70Y8g0L/QvtC70Y8gJ3NwZW5kZWRfdGltZSdcclxuICAgIHRpbWVFbGFwc2VkRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjdXJfdmFsdWUgPSB0aGlzLnZhbHVlO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjdXJfdmFsdWUgPSBldmFsKGN1cl92YWx1ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcItCe0YjQuNCx0LrQsCDQstGL0YfQuNGB0LvQtdC90LjRjyDQt9Cw0YLRgNCw0YfQtdC90L3QvtCz0L4g0LLRgNC10LzQtdC90LguINCY0YHQv9C+0LvRjNC30YPQudGC0LUg0YfQuNGB0LvQsCDQuCDQt9C90LDQutC4IMKrK8K7LCDCqy3CuywgwqsqwrssIMKrL8K7INC4INGB0LrQvtCx0LrQuFwiKTtcclxuXHJcbiAgICAgICAgICAgIGN1cl92YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgaWYgKChjdXJfdmFsdWUgIT09IG51bGwpICYmICghaXNOYU4oY3VyX3ZhbHVlKSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJfdmFsdWUgPSBNYXRoLnJvdW5kKGN1cl92YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cl92YWx1ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLQntGC0YDQuNGG0LDRgtC10LvRjNC90L7QtSDQuNC70Lgg0L3Rg9C70LXQstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQstGA0LXQvNC10L3QuFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJfdmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBjdXJfdmFsdWU7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKG1pblRvRGF5cyhjdXJfdmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zb2xlLmluZm8oJ2xvYWQgY2FsY3VsYXRlRWxhcHNlZFRpbWUnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWluVG9EYXlzKHRpbWVJbk1pbnV0ZXMsIGRheUluSG91cnMgPSA4KSB7XHJcbiAgICBsZXQgcmV0U3RyID0gXCJcIjtcclxuXHJcbiAgICBpZiAoKHRpbWVJbk1pbnV0ZXMgIT09IG51bGwpICYmICghaXNOYU4odGltZUluTWludXRlcykpICYmICh0aW1lSW5NaW51dGVzID4gMCkpIHtcclxuICAgICAgICBkYXlJbkhvdXJzID0gZGF5SW5Ib3VycyA8PCAwO1xyXG4gICAgICAgIGlmICgoZGF5SW5Ib3VycyA9PT0gdW5kZWZpbmVkKSB8fCAoZGF5SW5Ib3VycyA9PT0gbnVsbCkgfHwgKGlzTmFOKGRheUluSG91cnMpKSB8fCAoZGF5SW5Ib3VycyA8IDEpKSBkYXlJbkhvdXJzID0gMjQ7XHJcbiAgICAgICAgbGV0IHRELCB0SCwgdE07XHJcbiAgICAgICAgdEQgPSAodGltZUluTWludXRlcyAvIGRheUluSG91cnMgLyA2MCkgPDwgMDtcclxuICAgICAgICByZXRTdHIgKz0gdEQgPiAwID8gdEQgKyBcIiDQtC4gXCIgOiBcIlwiO1xyXG4gICAgICAgIHRpbWVJbk1pbnV0ZXMgLT0gdEQgKiBkYXlJbkhvdXJzICogNjA7XHJcbiAgICAgICAgdEggPSAodGltZUluTWludXRlcyAvIDYwKSA8PCAwO1xyXG4gICAgICAgIHJldFN0ciArPSB0SCA+IDAgPyB0SCArIFwiINGHLiBcIiA6IFwiXCI7XHJcbiAgICAgICAgdGltZUluTWludXRlcyAtPSB0SCAqIDYwO1xyXG4gICAgICAgIHRNID0gdGltZUluTWludXRlcyA8PCAwO1xyXG4gICAgICAgIHJldFN0ciArPSB0TSArIFwiINC80LjQvS5cIiArIFwiIChcIiArIGRheUluSG91cnMgKyBcIi3Rh9Cw0YHQvtCy0L7QuSDQtNC10L3RjClcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0U3RyICs9IFwi0KfRgtC+LdGC0L4g0YHQviDQstGA0LXQvNC10L3QtdC8INC90LUg0YLQsNC6IDooXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0U3RyO1xyXG59XHJcblxyXG5leHBvcnQge2NhbGN1bGF0ZUVsYXBzZWRUaW1lfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jYWxjdWxhdGVFbGFwc2VkVGltZS5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gZ29Ub1Rhc2tEYXRhbGlzdCgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgdGFza0lkID0gcmVxdWlyZSgnLi9fZmluZGVycycpLmdldFRhc2tJZCgpO1xyXG5cclxuICAgIGxldCB0YXNrVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10aXRsZScpLnRleHRDb250ZW50LnNwbGl0KCcgLSAnKTtcclxuXHJcbiAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGFsaXN0JykpIHx8IFtdO1xyXG4gICAgZGF0YSA9IGFwcGVuZElkKGRhdGEpO1xyXG5cclxuICAgIC8v0LXRgdC70Lgg0L3QsCDRgdGC0YDQsNC90LjRhtC1INC10YHRgtGMINC30LDQs9C+0LvQvtCy0L7QuiDQt9Cw0LTQsNGH0LhcclxuICAgIC8vIC0g0L/RgNC+0LLQtdGA0LjRgtGMINC10YHRgtGMINC70Lgg0L7QvdCwINCyINGB0L/QuNGB0LrQtVxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGFza1RpdGxlKSAmJiB0YXNrVGl0bGUubGVuZ3RoID49IDIpIHtcclxuICAgICAgICB0YXNrVGl0bGUgPSB0YXNrVGl0bGVbMV0udHJpbSgpO1xyXG5cclxuICAgICAgICBsZXQgbmV3ZGF0YSA9IHtcImlkXCI6IHRhc2tJZCwgXCJ0aXRsZVwiOiB0YXNrVGl0bGUgKyAnICcgKyB0YXNrSWR9O1xyXG4gICAgICAgIGRhdGEgPSBhcHBlbmRJZChkYXRhLCBuZXdkYXRhKTtcclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGFsaXN0JywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v0YHQvtC30LTQsNC8IGRhdGFsaXN0XHJcbiAgICBsZXQgZGF0YWxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkYXRhbGlzdCcpO1xyXG4gICAgZGF0YWxpc3QuaWQgPSAnZGwtZ290b3Rhc2snO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkYXRhbGlzdCk7XHJcblxyXG4gICAgLy/RgdCy0Y/Qt9Cw0YLRjCBkYXRhbGlzdCDRgSDQv9C+0LvQtdC8INCy0LLQvtC00LAgaWQg0LfQsNC00LDRh9C4XHJcbiAgICBsZXQgaWRGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb1RvJyk7XHJcbiAgICBpZEZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgIGlkRmllbGQuc2V0QXR0cmlidXRlKCdsaXN0JywgJ2RsLWdvdG90YXNrJyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgb3AudmFsdWUgPSBkYXRhW2ldLmlkO1xyXG4gICAgICAgIG9wLmxhYmVsID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICBkYXRhbGlzdC5hcHBlbmRDaGlsZChvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwZW5kSWQoYXJyLCBuZXdkYXRhID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAobmV3ZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgY2hlY2sgPSBhcnIuc29tZShmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT09IG5ld2RhdGEuaWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjaGVjaykge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2gobmV3ZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhcnIubGVuZ3RoID4gMTApIHtcclxuICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygnbG9hZCBnb1RvVGFza0RhdGFsaXN0Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Z29Ub1Rhc2tEYXRhbGlzdH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZ29Ub1Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGNvdW50V29ya2VyVGltZSgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGxldCAkaW5wdXRfYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItdG9vbGJhcicpO1xyXG4gICAgbGV0IHJvd3MgPSByZXF1aXJlKCcuL19maW5kZXJzJykuZ2V0QWxsQ29tbWVudHNSb3dzKCk7XHJcbiAgICBsZXQgd29ya2VycyA9IHJlcXVpcmUoJy4vX2ZpbmRlcnMnKS5nZXRBbGxXb3JrZXJzKCk7XHJcbiAgICBsZXQgZGF0ZXNfY29sbGVjdGlvbiA9IFtdO1xyXG4gICAgbGV0IGRhdGVfc3RyO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRhdGVfc3RyID0gcm93c1tpXS5jaGlsZHJlblszXS50ZXh0Q29udGVudDtcclxuICAgICAgICBkYXRlX3N0ciA9IGRhdGVfc3RyLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgZGF0ZXNfY29sbGVjdGlvbi5wdXNoKHJlcXVpcmUoJy4vX3V0aWxzJykuY3JlYXRlSVNPRGF0ZShkYXRlX3N0clswXSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkYXRlc19hcnIgPSByZXF1aXJlKCcuL191dGlscycpLmVsaW1pbmF0ZUR1cGxpY2F0ZXMoZGF0ZXNfY29sbGVjdGlvbik7XHJcblxyXG4gICAgbGV0IGNyZWF0ZURhdGVzTGlzdCA9IGZ1bmN0aW9uIChpbnB1dF9ib3gsIGRhdGVzKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUxpc3QoY3NzX2lkLCBjc3NfY2xhc3MpIHtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdTRUxFQ1QnKTtcclxuICAgICAgICAgICAgbGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgY3NzX2lkKTtcclxuICAgICAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKGNzc19jbGFzcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXJfX2l0ZW0nKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0X2xpc3QgPSBjcmVhdGVMaXN0KCdkYXRlLXN0YXJ0LWxpc3QnLCAnZGF0ZXMtbGlzdCcpO1xyXG5cclxuICAgICAgICBsZXQgZW5kX2xpc3QgPSBjcmVhdGVMaXN0KCdkYXRlLWVuZC1saXN0JywgJ2RhdGVzLWxpc3QnKTtcclxuXHJcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0JVVFRPTicpO1xyXG4gICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgYnRuLnRleHRDb250ZW50ID0gJ9Cf0L7RgdGH0LjRgtCw0YLRjCc7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb24sIGNsbl9vcHRpb24sIGxpc3RkYXRlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpc3RkYXRlID0gcmVxdWlyZSgnLi9fdXRpbHMnKS5kYXRlRm9ybWF0dGVyKHBhcnNlSW50KGRhdGVzW2ldLCAxMCkpO1xyXG4gICAgICAgICAgICBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdPUFRJT04nKTtcclxuICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBkYXRlc1tpXSk7XHJcbiAgICAgICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBsaXN0ZGF0ZS50b0xvY2FsZVN0cmluZygncnUnKTtcclxuICAgICAgICAgICAgY2xuX29wdGlvbiA9IG9wdGlvbi5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHN0YXJ0X2xpc3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgICAgICAgZW5kX2xpc3QuYXBwZW5kQ2hpbGQoY2xuX29wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJveC5hcHBlbmRDaGlsZChzdGFydF9saXN0KTtcclxuICAgICAgICBib3guYXBwZW5kQ2hpbGQoZW5kX2xpc3QpO1xyXG4gICAgICAgIGJveC5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdIMycpO1xyXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ9CX0LAg0LLRi9Cx0YDQsNC90L3Ri9C5INC/0LXRgNC40L7QtCc7XHJcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndXNlci10b29sYmFyLXRpdGxlJyk7XHJcbiAgICAgICAgYm94Lmluc2VydEJlZm9yZSh0aXRsZSwgYm94LmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgICAgICBpbnB1dF9ib3guaW5zZXJ0QmVmb3JlKGJveCwgaW5wdXRfYm94Lmxhc3RDaGlsZCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdib3gnOiBib3gsXHJcbiAgICAgICAgICAgICdzdGFydF9saXN0Jzogc3RhcnRfbGlzdCxcclxuICAgICAgICAgICAgJ2VuZF9saXN0JzogZW5kX2xpc3QsXHJcbiAgICAgICAgICAgICdidG4nOiBidG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB0aW1lbGlzdCA9IGNyZWF0ZVRpbWVMaXN0KHdvcmtlcnMsIHJvd3MpO1xyXG5cclxuICAgIGxldCAkdGltZWxpc3QgPSBjcmVhdGVUaW1lTGlzdFZpZXcodGltZWxpc3QpO1xyXG5cclxuICAgICR0aW1lbGlzdC5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXJfX2l0ZW0nKTtcclxuXHJcbiAgICAvL9C00L7QsdCw0LLQu9GP0LXQvCDRgdGC0YDQvtC60YMg0YEg0L7QsdGJ0LjQvCDQstGA0LXQvNC10L3QtdC8INCy0YHQtdGFINGB0L7RgtGA0YPQtNC90LjQutC+0LJcclxuICAgIC8v0YLRgNC10YLQuNC5INC/0LDRgNCw0LzQtdGC0YAgdHJ1ZSAtINGB0YLQsNCy0LjRgiDQutC70LDRgdGBLdC80LDRgNC60LXRgCDQstGL0LHRgNCw0L3QvdGL0YUg0YDQsNCx0L7RgtC90LjQutC+0LJcclxuICAgIGluc2VydFRvdGFsVGltZSgkdGltZWxpc3QsIHRpbWVsaXN0LCB0cnVlKTtcclxuXHJcbiAgICAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0LrQu9C40Log0L/QviDRgdGC0YDQvtC60LUg0LTQu9GPINC/0L7QtNGB0YfQtdGC0LAg0LLRgNC10LzQtdC90Lgg0LLRi9Cx0YDQsNC90L3Ri9GFINGA0LDQsdC+0YLQvdC40LrQvtCyXHJcbiAgICAkdGltZWxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RpbWUtbGlzdC10b3RhbCcpKXtcclxuICAgICAgICAgICAgY291bnRTZWxlY3RlZFdvcmtlcnNUaW1lKHRoaXMsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCAkdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdIMycpO1xyXG4gICAgJHRpdGxlLnRleHRDb250ZW50ID0gJ9CS0YHRjyDQt9Cw0LTQsNGH0LAnO1xyXG4gICAgJHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3VzZXItdG9vbGJhci10aXRsZScpO1xyXG4gICAgJHRpbWVsaXN0Lmluc2VydEJlZm9yZSgkdGl0bGUsICR0aW1lbGlzdC5maXJzdENoaWxkKTtcclxuICAgICR0aW1lbGlzdC5jbGFzc0xpc3QuYWRkKCd1c2VyLXRvb2xiYXJfX2l0ZW0nKTtcclxuXHJcbiAgICBsZXQgZGF0ZV9saXN0cyA9IGNyZWF0ZURhdGVzTGlzdCgkaW5wdXRfYm94LCBkYXRlc19hcnIpO1xyXG5cclxuICAgIC8vINC00L7QsdCw0LLQu9GP0Y4g0YHQtdC70LXQutGC0Ysg0YEg0LTQsNGC0LDQvNC4IC0g0L/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LfQsCDQstGL0LHRgNCw0L3QvdGL0Lkg0L/QtdGA0LjQvtC0XHJcbiAgICBmaW5kVGltZUluRGF0ZXNSYW5nZShkYXRlX2xpc3RzLCB3b3JrZXJzLCByb3dzKTtcclxuXHJcbiAgICAkaW5wdXRfYm94Lmluc2VydEJlZm9yZSgkdGltZWxpc3QsICRpbnB1dF9ib3gubGFzdENoaWxkKTtcclxuXHJcbiAgICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjU1ODk3Ny9hamF4LWNyb3NzLWRvbWFpbi1jYWxsXHJcblxyXG4gICAgaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdsb2FkIGNvdW50V29ya2VyVGltZScpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyDRgdC+0LfQtNCw0L3QuNC1INC+0LHRitC10LrRgtCwINGB0L4g0YHQv9C40YHQutC+0Lwg0YHQvtGC0YDRg9C00L3QutC+0LIg0Lgg0LLRgNC10LzQtdC90Lgg0LrQsNC20LTQvtCz0L4g0LIg0LfQsNC00LDRh9C1XHJcbmZ1bmN0aW9uIGNyZWF0ZVRpbWVMaXN0KHdvcmtlcnMsIHJvd3MpIHtcclxuXHJcbiAgICBsZXQgbnRpbWUsIG5hbWUsIHRzdW07XHJcbiAgICBsZXQgdGltZWxpc3QgPSB7fTtcclxuXHJcbiAgICBmb3IgKGxldCBzID0gMDsgcyA8IHdvcmtlcnMubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICB0c3VtID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG50aW1lID0gcmVxdWlyZSgnLi9fZmluZGVycycpLmdldFJvd1RpbWVTdHJpbmcocm93c1tpXSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocm93c1tpXS5jaGlsZHJlbls0XSkge1xyXG4gICAgICAgICAgICAgICAgLy/QtNC+INC30LDQv9GD0YHQutCwIGNhbW1lbnRzRGVzaWduKCk7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gcm93c1tpXS5jaGlsZHJlbls0XS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8v0L/QvtGB0LvQtSDQt9Cw0L/Rg9GB0LrQsCBjYW1tZW50c0Rlc2lnbigpO1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHJvd3NbaV0ucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtYXV0aG9yJykudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh3b3JrZXJzW3NdID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0c3VtICs9IG50aW1lO1xyXG4gICAgICAgICAgICAgICAgdGltZWxpc3RbbmFtZV0gPSB0c3VtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aW1lbGlzdDtcclxufVxyXG5cclxuLy8g0YHQvtC30LTQsNC90LjQtSBodG1sINGN0LvQtdC80LXQvdGC0LAg0YHQviDRgdC/0LjRgdC60L7QvCDRgdC+0YLRgNGD0LTQvdC60L7QsiDQuCDQstGA0LXQvNC10L3QuCDQutCw0LbQtNC+0LPQviDQsiDQt9Cw0LTQsNGH0LVcclxuZnVuY3Rpb24gY3JlYXRlVGltZUxpc3RWaWV3KGRhdGEpIHtcclxuICAgIGxldCAkdGltZWxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgICR0aW1lbGlzdC5jbGFzc0xpc3QuYWRkKCd0aW1lLWxpc3QnKTtcclxuICAgICR0aW1lbGlzdC5pZCA9ICd3b3JrZXJzLXRpbWUnO1xyXG5cclxuICAgIGxldCBsaXN0X2l0ZW07XHJcbiAgICBsZXQgd29ya2VydGltZTtcclxuICAgIGxldCB0b3RhbHRpbWUgPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGsgaW4gZGF0YSkge1xyXG4gICAgICAgIHdvcmtlcnRpbWUgPSBkYXRhW2tdO1xyXG4gICAgICAgIHRvdGFsdGltZSArPSB3b3JrZXJ0aW1lO1xyXG4gICAgICAgIGxpc3RfaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBsaXN0X2l0ZW0uZGF0YXNldC53b3JrZXJ0aW1lID0gd29ya2VydGltZTtcclxuICAgICAgICBsaXN0X2l0ZW0uaW5uZXJIVE1MID0gJzxzcGFuPicgKyBrICsgJzwvc3Bhbj4gPHNwYW4+JyArIHdvcmtlcnRpbWUgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgJHRpbWVsaXN0Lmluc2VydEJlZm9yZShsaXN0X2l0ZW0sICR0aW1lbGlzdC5sYXN0Q2hpbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAkdGltZWxpc3Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRUaW1lSW5EYXRlc1JhbmdlKGxpc3RzLCB3b3JrZXJzLCByb3dzKSB7XHJcbiAgICBsZXQgJHN0YXJ0X2xpc3QgPSBsaXN0cy5zdGFydF9saXN0O1xyXG4gICAgbGV0ICRlbmRfbGlzdCA9IGxpc3RzLmVuZF9saXN0O1xyXG4gICAgbGV0ICRib3ggPSBsaXN0cy5ib3g7XHJcbiAgICBsZXQgJGJ0biA9IGxpc3RzLmJ0bjtcclxuXHJcbiAgICBmdW5jdGlvbiBmaW5kUm93c0luUmFuZ2Uocm93cywgc3RhcnQsIGVuZCkge1xyXG5cclxuICAgICAgICByZXR1cm4gcm93cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1fZGF0ZSA9IHJlcXVpcmUoJy4vX3V0aWxzJykuZ2V0Um93RGF0ZVN0cmluZyhpdGVtKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpdGVtX2RhdGUgPj0gc3RhcnQgJiYgaXRlbV9kYXRlIDw9IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAkYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgZmluZF9yb3dzID0gZmluZFJvd3NJblJhbmdlKHJvd3MsICRzdGFydF9saXN0LnZhbHVlLCAkZW5kX2xpc3QudmFsdWUpO1xyXG5cclxuICAgICAgICBsZXQgcmFuZ2VfdGltZWxpc3QgPSBjcmVhdGVUaW1lTGlzdChnZXRTZWxlY3RlZFdvcmtlcnMoKSwgZmluZF9yb3dzKTtcclxuICAgICAgICBsZXQgJHJhbmdlX3RpbWVsaXN0ID0gY3JlYXRlVGltZUxpc3RWaWV3KHJhbmdlX3RpbWVsaXN0KTtcclxuXHJcbiAgICAgICAgaWYgKCRib3gucXVlcnlTZWxlY3RvcignI3JhbmdlLXRpbWVsaXN0JykpIHtcclxuICAgICAgICAgICAgJGJveC5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFuZ2UtdGltZWxpc3QnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcmFuZ2VfdGltZWxpc3Quc2V0QXR0cmlidXRlKCdpZCcsICdyYW5nZS10aW1lbGlzdCcpO1xyXG5cclxuICAgICAgICAkYm94LmFwcGVuZENoaWxkKCRyYW5nZV90aW1lbGlzdCk7XHJcblxyXG4gICAgICAgIGluc2VydFRvdGFsVGltZSgkcmFuZ2VfdGltZWxpc3QsIHJhbmdlX3RpbWVsaXN0KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWxlY3RlZFdvcmtlcnMoKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWRfd29ya2VycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JrZXJzLXRpbWUnKS5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0ZWQnKTtcclxuICAgIGxldCBzZWxlY3RlZF9uYW1lcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRfd29ya2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNlbGVjdGVkX25hbWVzLnB1c2goc2VsZWN0ZWRfd29ya2Vyc1tpXS5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGVkX25hbWVzO1xyXG59XHJcblxyXG4vL9C/0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INCy0YvQsdGA0LDQvdC90YvRhSDRg9GH0LDRgdGC0L3QuNC60L7QsiDQt9Cw0LTQsNGH0LggKNC40Lcg0YHQv9C40YHQutCwINCy0YHQtdGFINGD0YfQsNGB0YLQvdC40LrQvtCyKVxyXG5mdW5jdGlvbiBjb3VudFNlbGVjdGVkV29ya2Vyc1RpbWUobGlzdCwgZXZlbnQpIHtcclxuICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBsZXQgJHRvdGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmtlcnMtdGltZS10b3RhbCcpO1xyXG4gICAgbGV0IHRvdGFsID0gcGFyc2VJbnQoJHRvdGFsLmRhdGFzZXQudG90YWx0aW1lKTtcclxuXHJcbiAgICB3aGlsZSAodGFyZ2V0ICE9IGxpc3QpIHtcclxuICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT0gJ1AnKSB7XHJcbiAgICAgICAgICAgIHJlY291bnRUb3RhbCh0YXJnZXQsICR0b3RhbCwgdG90YWwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWNvdW50VG90YWwoZWxlbSwgdG90YWwsIHRvdGFsdGltZSkge1xyXG4gICAgICAgIGxldCBlbGVtdGltZSA9IHBhcnNlSW50KGVsZW0uZGF0YXNldC53b3JrZXJ0aW1lKTtcclxuXHJcbiAgICAgICAgLy/QutC70LDRgdGBIGV4Y2x1ZGVkINC90YPQttC10L0g0LTQu9GPINGE0LjQu9GM0YLRgNCw0YbQuNC4INGB0L/QuNGB0LrQsCDRgNCw0LHQvtGC0L3QuNC60L7QslxyXG4gICAgICAgIC8v0LIg0LLRi9Cy0L7QtNC1INCy0YDQtdC80L3QuCDQt9CwINC/0LXRgNC40L7QtCAtINCy0YvQstC+0LQg0YLQvtC70YzQutC+INC/0L4g0LLRi9Cx0YDQsNC90L3Ri9C8IChzZWxlY3RlZCkg0YDQsNCx0L7RgtC90LjQutCw0LxcclxuICAgICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2V4Y2x1ZGVkJyk7XHJcbiAgICAgICAgICAgIHRvdGFsdGltZSA9IHRvdGFsdGltZSAtIGVsZW10aW1lO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdleGNsdWRlZCcpO1xyXG4gICAgICAgICAgICB0b3RhbHRpbWUgPSB0b3RhbHRpbWUgKyBlbGVtdGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvdGFsLmlubmVySFRNTCA9IHRvdGFsdGltZTtcclxuICAgICAgICB0b3RhbC5kYXRhc2V0LnRvdGFsdGltZSA9IHRvdGFsdGltZTtcclxuICAgIH1cclxufVxyXG5cclxuLy8g0L/QvtC00YHRh9C10YIg0L7QsdGJ0LXQs9C+INCy0YDQtdC80LXQvdC4INCy0YHQtdGFINGB0L7RgtGA0YPQtNC90LjQutC+0LIg0LTQu9GPINGB0L/QuNGB0LrQsCDRgdC+0YLRgNGD0LTQvdC40Lot0LLRgNC10LzRj1xyXG5mdW5jdGlvbiBpbnNlcnRUb3RhbFRpbWUodGltZWxpc3QsIGRhdGEsIGFkZG1hcmtlcikge1xyXG4gICAgbGV0IHRvdGFsdGltZSA9IDA7XHJcbiAgICBsZXQgdG90YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcblxyXG4gICAgZm9yIChsZXQgayBpbiBkYXRhKSB7XHJcbiAgICAgICAgdG90YWx0aW1lICs9IGRhdGFba107XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFkZG1hcmtlcikge1xyXG4gICAgICAgIGxldCBsaXN0X2l0ZW1zID0gdGltZWxpc3QucXVlcnlTZWxlY3RvckFsbCgncCcpO1xyXG4gICAgICAgIC8v0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LLRgdC1INGA0LDQsdC+0YLQvdC40LrQuCDQstGL0LHRgNCw0L3Riywg0YHRh9C40YLQsNC10YLRgdGPINC+0LHRidC10LUg0LLRgNC10LzRjyDQv9C+INCy0YHQtdC8XHJcbiAgICAgICAgLy/QstGB0LXQvCDQtNC+0LHQsNCy0LvRj9C10Lwg0LrQu9Cw0YHRgSBzZWxlY3RlZCDQvdGD0LbQvdGL0Lkg0LTQu9GPINGE0LjQu9GM0YLRgNCw0YbQuNC4INGB0L/QuNGB0LrQsFxyXG4gICAgICAgIC8v0Lgg0YfRgtC+0LHRiyDQstC40LfRg9Cw0LvRjNC90L4g0L7RgtC80LXRgtC40YLRjCDQstGL0LHRgNCw0L3QvdGL0YUg0LIg0YHQv9C40YHQutC1XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0X2l0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpc3RfaXRlbXNbaV0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG90YWwuaW5uZXJIVE1MID0gJzxzcGFuPtCS0YHQtdCz0L46PC9zcGFuPiA8c3BhbiBpZD1cIndvcmtlcnMtdGltZS10b3RhbFwiIGRhdGEtdG90YWx0aW1lPVwiJyArIHRvdGFsdGltZSArICdcIj4nICsgdG90YWx0aW1lICsgJzwvc3Bhbj4nO1xyXG4gICAgdG90YWwuY2xhc3NMaXN0LmFkZCgndGltZS1saXN0LXRvdGFsJyk7XHJcbiAgICB0aW1lbGlzdC5hcHBlbmRDaGlsZCh0b3RhbCk7XHJcblxyXG4gICAgcmV0dXJuIHRvdGFsdGltZTtcclxufVxyXG5cclxuZXhwb3J0IHtjb3VudFdvcmtlclRpbWV9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvdW50V29ya2VyVGltZS5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gdGFza0Zvb3RlckRlc2lnbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbi8vbmV3IGNvbW1lbnRcclxuICAgIGxldCBjb21tZW50VGJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RibC1uZXctY29tbWVudCcpO1xyXG4gICAgbGV0IG5ld0NvbW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNvbW1lbnQtd3JhcCcpO1xyXG5cclxuICAgIC8vINC00L7QsdCw0LLQu9GOINC30LDQs9C+0LvQvtCy0L7QulxyXG4gICAgbGV0IG5ld0NvbW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICBuZXdDb21tZW50VGl0bGUudGV4dENvbnRlbnQgPSAn0J3QvtCy0YvQuSDQutC+0LzQvNC10L3RgtCw0YDQuNC5JztcclxuICAgIG5ld0NvbW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uLXRpdGxlJyk7XHJcbiAgICBuZXdDb21tZW50Lmluc2VydEJlZm9yZShuZXdDb21tZW50VGl0bGUsIG5ld0NvbW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG5cclxuICAgIC8vMSDQv9C10YDQstCw0Y8g0YHRgtGA0L7QutCwIC0g0LjRgdC/0L7Qu9C90LjRgtC10LvRjCwg0YHRgtCw0YLRg9GBLCDQv9GA0LjQvtGA0LjRgtC10YJcclxuICAgIC8v0LHQu9C+0Log0LIg0LrQvtGC0L7RgNC+0Lwg0LHRg9C00YPRgiDQv9C+0LvRjyDQtNC70Y8g0LLQstC+0LTQsCDQt9Cw0YLRgNCw0YfQtdC90L3QvtCz0L4g0Lgg0L/Qu9Cw0L3QuNGA0YPQtdC80L7Qs9C+INCy0YDQtdC80LXQvdC4XHJcbiAgICAvL9C4INCy0YvQsdC+0YAg0L/RgNC40L7RgNC40YLQtdGC0LBcclxuXHJcbiAgICBsZXQgcm93SXRlbVByb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBsZXQgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBsZXQgcm93c0ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIC8v0LjRgdC/0L7Qu9C90LjRgtC10LvRjFxyXG4gICAgbGV0IGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludGVybmFsX3dvcmtlcicpO1xyXG4gICAgbGV0IHdvcmtlckJsb2NrID0gZmllbGQucGFyZW50Tm9kZTtcclxuICAgIHdvcmtlckJsb2NrLmNsYXNzTGlzdC5hZGQoJ3dvcmtlci1ibG9jaycpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQod29ya2VyQmxvY2spO1xyXG5cclxuICAgIC8v0YHRgtCw0YLRg9GBXHJcbiAgICBsZXQgc3RhdHVzVGJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RibC1zdGF0dXMnKTtcclxuICAgIGxldCBzdGF0dXNMaXN0ID0gY3JlYXRlU3RhdHVzTGlzdChzdGF0dXNUYmwpO1xyXG4gICAgbGV0IGJsb2NrID0gY3JlYXRlRmllbGRBbmRMYWJlbCgn0KHRgtCw0YLRg9GBJywgc3RhdHVzTGlzdCk7XHJcbiAgICBibG9jay5jbGFzc0xpc3QuYWRkKCdmcm93LWNvbC0yLTEnKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChibG9jayk7XHJcblxyXG4gICAgLy/Qv9GA0LjQvtGA0LjRgtC10YJcclxuICAgIGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5X2lkJyk7XHJcbiAgICBibG9jayA9IGNyZWF0ZUZpZWxkQW5kTGFiZWwoJ9Cf0YDQuNC+0YDQuNGC0LXRgicsIGZpZWxkKTtcclxuICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2Zyb3ctY29sLTItMicpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoYmxvY2spO1xyXG5cclxuICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1maWVsZHMtcm93JywndGFzay1yb3ctMScpO1xyXG4gICAgcm93SXRlbS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICByb3dzRnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgLy8yINCy0YLQvtGA0LDRjyDRgdGC0YDQvtC60LAgLSDQstGA0LXQvNGPICjQt9Cw0YLRgNCw0YfQtdC90L4v0L/Qu9Cw0L3QuNGA0YPQtdC80L4pLCDQv9GA0L7QtdC60YIsINGB0YDQvtC6XHJcblxyXG4gICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmllbGRzLXJvdycsJ3Rhc2stcm93LTInKTtcclxuXHJcbiAgICBsZXQgdGltZUJsb2NrID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHRpbWVCbG9jay5jbGFzc0xpc3QuYWRkKCd0aW1lLWJsb2NrJyk7XHJcblxyXG4gICAgLy/Qt9Cw0YLRgNCw0YfQtdC90L4g0LLRgNC10LzQtdC90LhcclxuICAgIGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwZW5kZWRfdGltZScpO1xyXG4gICAgYmxvY2sgPSBjcmVhdGVGaWVsZEFuZExhYmVsKCfQl9Cw0YLRgNCw0YfQtdC90L4nLCBmaWVsZCk7XHJcbiAgICB0aW1lQmxvY2suYXBwZW5kQ2hpbGQoYmxvY2spO1xyXG5cclxuICAgIC8v0L/Qu9Cw0L3QuNGA0YPQtdC80L7QtSDQstGA0LXQvNGPXHJcbiAgICBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFuX3RpbWUnKTtcclxuICAgIGJsb2NrID0gY3JlYXRlRmllbGRBbmRMYWJlbCgn0J/Qu9Cw0L3QuNGA0YPQtdC80L7QtScsIGZpZWxkKTtcclxuICAgIHRpbWVCbG9jay5hcHBlbmRDaGlsZChibG9jayk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGltZUJsb2NrKTtcclxuXHJcbiAgICAvL9C/0YDQvtC10LrRglxyXG4gICAgZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xpZW50X2lkJyk7XHJcbiAgICBsZXQgcHJvamVjdCA9IGNyZWF0ZUZpZWxkQW5kTGFiZWwoJ9Cf0YDQvtC10LrRgicsIGZpZWxkKTtcclxuICAgIHByb2plY3QuY2xhc3NMaXN0LmFkZCgnZnJvdy1jb2wtMi0xJyk7XHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChwcm9qZWN0KTtcclxuXHJcbiAgICAvL9GB0YDQvtC6XHJcbiAgICBsZXQgZGVhZGxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kX2RhdGUnKS5wYXJlbnROb2RlO1xyXG4gICAgZGVhZGxpbmUud2lkdGggPSAnJztcclxuICAgIGRlYWRsaW5lLmNsYXNzTGlzdC5hZGQoJ2RlYWRsaW5lLWNhbGVuZGFyJywnZnJvdy1jb2wtMi0yJyk7XHJcblxyXG4gICAgLy/Rg9Cx0LjRgNCw0Y4g0YHQuNC80LLQvtC7INC/0LXRgNC10LLQvtC00LAg0YHRgtGA0L7QutC4XHJcbiAgICBkZWFkbGluZS5yZW1vdmVDaGlsZChkZWFkbGluZS5xdWVyeVNlbGVjdG9yKCdzY3JpcHQnKS5uZXh0U2libGluZyk7XHJcblxyXG4gICAgLy/QutC90L7Qv9C60YMg0KUgLSDQvtGH0LjRgdGC0LjRgtGMINC/0L7Qu9C1IC0g0YPQsdC40YDQsNGOXHJcbiAgICAvL2RlYWRsaW5lLnJlbW92ZUNoaWxkKGRlYWRsaW5lLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9YnV0dG9uXScpKTtcclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUZpZWxkQW5kTGFiZWwoJ9Ch0YDQvtC6JywgZGVhZGxpbmUpKTtcclxuXHJcbiAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmllbGRzLXJvdycsJ3Rhc2stcm93LTInKTtcclxuICAgIHJvd0l0ZW0uYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gICAgcm93c0ZyYWdtZW50LmFwcGVuZENoaWxkKHJvd0l0ZW0pO1xyXG5cclxuICAgIC8vMyDRgtGA0LXRgtGM0Y8g0YHRgtGA0L7QutCwIC0g0LTQvtC/0L7Qu9C90LjRgtC10LvRjNC90YvQuSDQtdC80LXQudC7INC4INGC0LjQvyDQt9Cw0LTQsNGH0LhcclxuICAgIC8v0LTQvtC/0L7Qu9C90LjRgtC10LvRjNC90YvQuSDQtdC80LXQudC7XHJcbiAgICByb3dJdGVtID0gcm93SXRlbVByb3RvLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHJvd0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1maWVsZHMtcm93JywndGFzay1yb3ctMycpO1xyXG5cclxuICAgIGxldCBzZW5kTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRfZW1haWwnKTtcclxuXHJcbiAgICBsZXQgYWRkRW1haWwgPSBzZW5kTGlzdC5wYXJlbnROb2RlO1xyXG4gICAgYWRkRW1haWwuY2xhc3NMaXN0LmFkZCgnYWRkLWVtYWlsJyk7XHJcblxyXG4gICAgbGV0IGFkZEVtYWlsTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgYWRkRW1haWxMYWJlbC50ZXh0Q29udGVudCA9ICfQn9C+0LvRg9GH0LDRgtC10LvQuCDRgNCw0YHRgdGL0LvQutC4INC/0L4g0L/QvtGH0YLQtSc7XHJcbiAgICBhZGRFbWFpbC5pbnNlcnRCZWZvcmUoYWRkRW1haWxMYWJlbCxhZGRFbWFpbC5maXJzdEVsZW1lbnRDaGlsZCk7XHJcblxyXG4gICAgbGV0IHNlbmRMaXN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dldEVtYWlsQWRkcmVzc2VzQnV0dG9uJyk7XHJcbiAgICBzZW5kTGlzdEJ0bi52YWx1ZSA9ICfQmtC+0LzRgyDQv9C40YHRjNC80LAnO1xyXG4gICAgYWRkRW1haWwuYXBwZW5kQ2hpbGQoc2VuZExpc3RCdG4pO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGFkZEVtYWlsKTtcclxuXHJcbiAgICAvL9GC0LjQvyDQt9Cw0LTQsNGH0LhcclxuICAgIGxldCB0YXNrVHlwZUJsb2NrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2JsZW1fdHlwZScpLnBhcmVudE5vZGU7XHJcbiAgICB0YXNrVHlwZUJsb2NrLmNsYXNzTGlzdC5hZGQoJ3Rhc2stdHlwZScpO1xyXG5cclxuICAgIGxldCB0YXNrVHlwZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgIHRhc2tUeXBlTGFiZWwudGV4dENvbnRlbnQgPSAn0KLQuNC/INC30LDQtNCw0YfQuCc7XHJcbiAgICB0YXNrVHlwZUJsb2NrLmluc2VydEJlZm9yZSh0YXNrVHlwZUxhYmVsLHRhc2tUeXBlQmxvY2suZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGFza1R5cGVCbG9jayk7XHJcblxyXG4gICAgcm93SXRlbS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICByb3dzRnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgLy80INGH0LXRgtCy0LXRgNGC0LDRjyDRgdGC0YDQvtC60LAgLSDQtNC+0LHQsNCy0LvQtdC90LjQtSDRhNCw0LnQu9C+0LJcclxuICAgIHJvd0l0ZW0gPSByb3dJdGVtUHJvdG8uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgcm93SXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWZpZWxkcy1yb3cnLCd0YXNrLXJvdy00Jyk7XHJcblxyXG4gICAgbGV0IGV4aXN0QWRkRmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGaWxlSW5wdXRzJyk7XHJcbiAgICBsZXQgYWRkRmlsZXNCbG9jayA9IGV4aXN0QWRkRmlsZS5wYXJlbnROb2RlO1xyXG4gICAgYWRkRmlsZXNCbG9jay5jbGFzc0xpc3QuYWRkKCdhZGQtZmlsZXMnKTtcclxuXHJcbiAgICBsZXQgYWRkRmlsZXNMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICBhZGRGaWxlc0xhYmVsLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24tdGl0bGUnKTtcclxuICAgIGFkZEZpbGVzTGFiZWwuaW5uZXJIVE1MID0gJ9Ck0LDQudC70YsgPHNwYW4gY2xhc3M9XCJzLWluZm9cIj7QvtCx0YnQuNC5INC+0LHRitC10LwgPHNwYW4gaWQ9XCJmaWxlcy10b3RhbFwiPtC00L4gMyDQnNCxPC9zcGFuPjwvc3Bhbj4nO1xyXG4gICAgLy/QsiBpZD1cImZpbGVzLXRvdGFsXCIg0LHRg9C00LXRgiDQt9Cw0LzQtdC90Y/RgtGB0Y8g0YLQtdC60YHRgiDQutC+0LPQtNCwINGE0LDQudC70Ysg0LLRi9Cx0YDQvdGLIC0g0L7QsdGJ0LjQuSDQvtCx0YrQtdC8INCy0YvQsdGA0LDQvdC90YvRhSDRhNCw0LnQu9C+0LJcclxuICAgIGFkZEZpbGVzQmxvY2suaW5zZXJ0QmVmb3JlKGFkZEZpbGVzTGFiZWwsYWRkRmlsZXNCbG9jay5maXJzdEVsZW1lbnRDaGlsZCk7XHJcblxyXG4gICAgLy/RjdGC0YMg0YHRgdGL0LvQutGDINGPINGB0LrRgNC+0Y4g0YHRgtC40LvRj9C80LhcclxuICAgIC8vIGxldCBhZGRGaWxlSW5wdXQgPSBhZGRGaWxlc0Jsb2NrLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcclxuICAgIC8vIGFkZEZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ29uY2xpY2snLCdhZGRGaWxlSW5wdXQoXCJGaWxlSW5wdXRzXCIpJyk7XHJcblxyXG4gICAgLy8gYWRkRmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgIHJlbW92ZUZpbGVJbnB1dChleGlzdEFkZEZpbGUpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLy/QsdC70L7QuiDQsiDQutC+0YLQvtGA0L7QvCDQsdGD0LTQtdGCINGB0L/QuNGB0L7QuiDQt9Cw0LPRgNGD0LbQtdC90L3Ri9GFINGE0LDQudC70L7QslxyXG4gICAgbGV0IGFkZGVkRmlsZXNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIGFkZGVkRmlsZXNMaXN0LmlkID0gJ2ZpbGVzLWxpc3QnO1xyXG4gICAgYWRkZWRGaWxlc0xpc3QuY2xhc3NMaXN0LmFkZCgnZmlsZXMtbGlzdCcpO1xyXG4gICAgYWRkRmlsZXNCbG9jay5pbnNlcnRCZWZvcmUoYWRkZWRGaWxlc0xpc3QsZXhpc3RBZGRGaWxlKTtcclxuXHJcbiAgICAvL9C+0LHQtdGA0L3Rg9GC0Ywg0YHRg9GJ0LXRgdGC0LLRg9GO0YnQuNC5IGlucHV0IGZpbGVcclxuICAgIC8v0YHQsNC8IGlucHV0INCx0YPQtNC10YIg0YHQutGA0YvRglxyXG4gICAgLy/QuCDQvdCw0LLQtdGB0LjRgtGMINCy0YvQt9C+0LIg0YTRg9C90LrRhtC40Lgg0YHQvtC30LTQsNGO0YnQtdC5INC90L7QstGL0Lkg0LjQvdC/0YPRglxyXG4gICAgbGV0IGRlZmF1bHRGaWxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZUlucHV0MCcpO1xyXG4gICAgLy/QsNGC0YDQuNCx0YPRgiBvbmNoYW5nZSDQtNC+0LHQsNCy0LvRj9GOINGH0YLQvtCx0Ysg0L3QtSDQutC+0L/QuNGA0L7QstCw0YLRjCDRg9C20LUg0YHRg9GJ0LXRgdGC0LLRg9GO0YnRjtGOXHJcbiAgICAvL9CyINGC0YDQtdC60LXRgNC1INGE0YPQvdC60YbQuNGOINC00L7QsdCw0LvRj9C90LjRjyDQuNC90L/Rg9GC0L7QslxyXG4gICAgZGVmYXVsdEZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ29uY2hhbmdlJywnYWRkRmlsZUlucHV0KFwiRmlsZUlucHV0c1wiKScpO1xyXG4gICAgZGVmYXVsdEZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcHJvY2Vzc0ZpbGVzKHRoaXMsYWRkZWRGaWxlc0xpc3QpO1xyXG4gICAgICAgIGhpZGVGaWxsZWRGaWxlSW5wdXQodGhpcyk7XHJcbiAgICB9KTtcclxuICAgIGV4aXN0QWRkRmlsZS5hcHBlbmRDaGlsZCh3cmFwRmlsZUlucHV0cyhkZWZhdWx0RmlsZUlucHV0KSk7XHJcblxyXG4gICAgbGV0IGFkZEZpbGVPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG11dGF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBpZihtdXRhdGlvbi5hZGRlZE5vZGVzWzBdLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBtdXRhdGlvbi5hZGRlZE5vZGVzWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnb25jaGFuZ2UnLCdhZGRGaWxlSW5wdXQoXCJGaWxlSW5wdXRzXCIpJyk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzRmlsZXModGhpcyxhZGRlZEZpbGVzTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZUZpbGxlZEZpbGVJbnB1dCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v0LLRgdC1INC90L7QstGL0LUgaW5wdXQgZmlsZSDQvdGD0LbQvdC+INC+0LHQtdGA0L3Rg9GC0YwsXHJcbiAgICAgICAgICAgICAgICAvL9GB0LDQvCBpbnB1dCDQsdGD0LTQtdGCINGB0LrRgNGL0YJcclxuICAgICAgICAgICAgICAgIGxldCBmYWtlSW5wdXQgPSB3cmFwRmlsZUlucHV0cyhpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuYXBwZW5kQ2hpbGQoZmFrZUlucHV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGFkZEZpbGVPYnNlcnZlckNvbmZpZyA9IHtcclxuICAgICAgICBhdHRyaWJ1dGVzOiBmYWxzZSxcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgYWRkRmlsZU9ic2VydmVyLm9ic2VydmUoZXhpc3RBZGRGaWxlLCBhZGRGaWxlT2JzZXJ2ZXJDb25maWcpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGFkZEZpbGVzQmxvY2spO1xyXG4gICAgcm93SXRlbS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICByb3dzRnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93SXRlbSk7XHJcblxyXG4gICAgLy81INC/0Y/RgtCw0Y8g0YHRgtGA0L7QutCwIC0g0LrQvdC+0L/QutCwINCh0L7RhdGA0LDQvdC40YLRjFxyXG4gICAgcm93SXRlbSA9IHJvd0l0ZW1Qcm90by5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICByb3dJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmllbGRzLXJvdycsJ3Rhc2stcm93LTUnKTtcclxuXHJcbiAgICBsZXQgc2F2ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9c3VibWl0QnV0dG9uXScpO1xyXG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tYWN0aW9uJyk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoc2F2ZUJ0bik7XHJcbiAgICByb3dJdGVtLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICAgIHJvd3NGcmFnbWVudC5hcHBlbmRDaGlsZChyb3dJdGVtKTtcclxuXHJcbiAgICAvL9Cy0YHQtSDRgdC+0LHRgNCw0L3QvdC+0LUv0L/QtdGA0LXQvNC10YnQtdC90L3QvtC1INCy0YHRgtCw0LLQu9GP0Y4g0LIg0LHQu9C+0LpcclxuICAgIG5ld0NvbW1lbnQuYXBwZW5kQ2hpbGQocm93c0ZyYWdtZW50KTtcclxuXHJcbiAgICAvLy0t0YLRg9GCINC90LDQstC10YjQuNCy0LDRjiDRgdC+0LHRi9GC0LjRjyDQvdCwINC/0LXRgNC10LzQtdGJ0LXQvdC90YvQtSDRjdC70LXQvNC10L3RgtGLXHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZUZpbGxlZEZpbGVJbnB1dChpbnB1dCkge1xyXG4gICAgICAgIGlucHV0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLWVsZW0nKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcm9jZXNzRmlsZXMoZmllbGQsIGZpbGVzbGlzdCkge1xyXG4gICAgICAgIGxldCBmaWxlID0gZmllbGQuZmlsZXNbMF07XHJcbiAgICAgICAgbGV0IGZpbGVTaXplID0gZmlsZS5zaXplO1xyXG5cclxuXHJcbiAgICAgICAgaWYoIWZpbGVzbGlzdC5kYXRhc2V0LnRvdGFsKXtcclxuICAgICAgICAgICAgZmlsZXNsaXN0LmRhdGFzZXQudG90YWwgPSBmaWxlU2l6ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZmlsZXNsaXN0LmRhdGFzZXQudG90YWwgPSBwYXJzZUludChmaWxlc2xpc3QuZGF0YXNldC50b3RhbCkgKyBwYXJzZUludChmaWxlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdG90YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZXMtdG90YWwnKTtcclxuICAgICAgICB0b3RhbC50ZXh0Q29udGVudCA9IGJ5dGVzVG9TaXplKGZpbGVzbGlzdC5kYXRhc2V0LnRvdGFsKSArICcg0LjQtyAzINCc0LEnO1xyXG5cclxuICAgICAgICBsZXQgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgcC5pbm5lckhUTUwgPSBmaWxlLm5hbWUgKyAnPHNwYW4gY2xhc3M9XCJzLWluZm9cIj4nICsgTWF0aC5jZWlsKGZpbGVTaXplIC8gMTAyNCkgKyAnIEtiPC9zcGFuPic7XHJcbiAgICAgICAgcC5jbGFzc0xpc3QuYWRkKCdmaWxlLWxpc3QtaXRlbScpO1xyXG5cclxuICAgICAgICBsZXQgcmVtb3ZlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHJlbW92ZUJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tcmVtb3ZlLWl0ZW0nKTtcclxuICAgICAgICByZW1vdmVCdG4uZGF0YXNldC5maWVsZElkID0gZmllbGQuaWQ7XHJcblxyXG4gICAgICAgIHAuYXBwZW5kQ2hpbGQocmVtb3ZlQnRuKTtcclxuXHJcbiAgICAgICAgZmlsZXNsaXN0LmFwcGVuZENoaWxkKHApO1xyXG5cclxuICAgICAgICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVtb3ZlRmlsZUlucHV0KHRoaXMsdG90YWwsZmlsZXNsaXN0LGZpbGVTaXplKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/Qv9GA0Lgg0LLRi9Cx0L7RgNC1INCyINGB0L/QuNGB0LrQtSDQtNC+0L8u0LXQvNCw0LnQu9C+0LIg0YHRgNCw0LfRgyDQstGB0YLQsNCy0LvRj9GC0Ywg0LIg0L/QvtC70LUg0LTQu9GPINC+0YLQv9GA0LDQstC60LhcclxuICAgIGxldCBlbWFpbExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkX2VtYWlsX3dvcmtlcicpO1xyXG4gICAgbGV0IG9uUGFnZUVtYWlsTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICBvblBhZ2VFbWFpbExpc3QuY2xhc3NMaXN0LmFkZCgnZW1haWwtc2VuZC1saXN0Jyk7XHJcbiAgICBhZGRFbWFpbC5pbnNlcnRCZWZvcmUob25QYWdlRW1haWxMaXN0LGFkZEVtYWlsLmNoaWxkTm9kZXNbMl0pO1xyXG5cclxuICAgIGVtYWlsTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYWRkV29ya2VyRW1haWxUb1NlbmRMaXN0KHRoaXMsc2VuZExpc3Qsb25QYWdlRW1haWxMaXN0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8v0L/RgNC4INCy0YvQsdC+0YDQtSDQsiDRgdC10LvQtdC60YLQtSDQodGC0LDRgtGD0YEg0L/QtdGA0LXQutC70Y7Rh9Cw0Y4g0YDQsNC00LjQviwg0YfRgtC+0LHRiyDRhNC+0YDQvNCwINC/0YDQsNCy0LjQu9GM0L3QviDRgNCw0LHQvtGC0LDQu9CwXHJcbiAgICBzdGF0dXNMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnZhbHVlKS5jaGVja2VkID0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8v0L/RgNC4INC30LDQs9GA0YPQt9C60LUg0YHRgtGA0LDQvdC40YbRiyDQvdGD0LbQvdC+INGB0LzQvtGC0YDQtdGC0Ywg0LLRi9Cx0YDQsNC90L3Ri9C5INGA0LDQtNC40L4g0YHQviDRgdGC0LDRgtGD0YHQvtC8ICjQsiDRgdC60YDRi9GC0L7QuSDRh9Cw0YHRgtC4INGC0LDQsdC70LjRhtGLICN0YXNrLWZvb3RlcilcclxuICAgIC8v0Lgg0YHRgtCw0LLQuNGC0Ywg0YHRgtCw0YLRg9GBINCyINGB0LXQu9C10LrRgtC1IHN0YXR1c0xpc3RcclxuICAgIHVwZGF0ZVN0YXR1c0xpc3RPbkxvYWQoc3RhdHVzTGlzdCk7XHJcblxyXG4gICAgaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpe1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygnbG9hZCB0YXNrRm9vdGVyRGVzaWduJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUZpZWxkQW5kTGFiZWwodGV4dCxmaWVsZCkge1xyXG4gICAgbGV0IHJvd0l0ZW1Qcm90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbGV0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgIGxhYmVsLnRleHRDb250ZW50ID0gdGV4dDtcclxuICAgIHJvd0l0ZW1Qcm90by5hcHBlbmRDaGlsZChsYWJlbCk7XHJcbiAgICByb3dJdGVtUHJvdG8uYXBwZW5kQ2hpbGQoZmllbGQpO1xyXG4gICAgcmV0dXJuIHJvd0l0ZW1Qcm90bztcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3RhdHVzTGlzdCh0YmwpIHtcclxuICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XHJcbiAgICBsZXQgcm93cyA9IEFycmF5LmZyb20odGJsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyJykpO1xyXG5cclxuICAgIGxldCBvcHRncm91cDtcclxuXHJcbiAgICByb3dzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGlmKGl0ZW0uZmlyc3RFbGVtZW50Q2hpbGQuZ2V0QXR0cmlidXRlKCdjb2xzcGFuJykpe1xyXG4gICAgICAgICAgICBvcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGdyb3VwJyk7XHJcbiAgICAgICAgICAgIG9wdGdyb3VwLmxhYmVsID0gaXRlbS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChvcHRncm91cCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCByYWRpbyA9IGl0ZW0ucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSByYWRpby5pZDtcclxuICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdsYWJlbCcpLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBvcHRncm91cC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBsaXN0O1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTdGF0dXNMaXN0T25Mb2FkKGxpc3QpIHtcclxuICAgIGxldCBzdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPW5ld19wcm9ibGVtX3N0YXR1c106Y2hlY2tlZCcpO1xyXG5cclxuICAgIGZvciggbGV0IGkgb2YgbGlzdC5vcHRpb25zKXtcclxuICAgICAgICBpZihpLnZhbHVlID09PSBzdGF0dXMuaWQpe1xyXG4gICAgICAgICAgICBpLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFdvcmtlckVtYWlsVG9TZW5kTGlzdChzZWxlY3QsIGlucHV0LCBsaXN0KSB7XHJcbiAgICBsZXQgb3B0aW9uID0gc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdO1xyXG4gICAgbGV0IGRhdGEgPSBbb3B0aW9uLnRleHQsc2VsZWN0LnZhbHVlXTtcclxuICAgIGxldCBlbWFpbCA9IGRhdGFbMV07XHJcblxyXG4gICAgaWYgKGVtYWlsLnRyaW0oKSAhPT0gXCJcIikge1xyXG4gICAgICAgIGxldCBhZGRFbWFpbCA9IGlucHV0LnZhbHVlO1xyXG4gICAgICAgIGxldCBuZXd2YWwgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKGFkZEVtYWlsID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIG5ld3ZhbCA9IGVtYWlsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWRkRW1haWwuaW5kZXhPZihlbWFpbCkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIG5ld3ZhbCA9IGFkZEVtYWlsICsgKGVtYWlsLmNoYXJBdChhZGRFbWFpbC5sZW5ndGggLSAxKSA9PSBcIjtcIiA/IFwiXCIgOiBcIjtcIikgKyBlbWFpbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0LnZhbHVlID0gbmV3dmFsO1xyXG5cclxuICAgICAgICBsZXQgbmV3aXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgbmV3aXRlbS50ZXh0Q29udGVudCA9IGRhdGFbMF07XHJcbiAgICAgICAgbmV3aXRlbS5kYXRhc2V0LmVtYWlsID0gZGF0YVsxXTtcclxuXHJcbiAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChuZXdpdGVtKTtcclxuXHJcbiAgICAgICAgbmV3aXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVtb3ZlSXRlbUZyb21TZW5kbGlzdCh0aGlzLCBzZWxlY3QsIGlucHV0KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL9Cy0YvQsdGA0LDQvdC90L7Qs9C+INC/0L7Qu9GD0YfQsNGC0LXQu9GPINGB0LrRgNGL0LLQsNGOXHJcbiAgICAgICAgLy/RgdGC0LDQstC70Y4g0LLRi9Cx0YDQsNC90L3Ri9C8INC00LXRhNC+0LvRgtC90YvQuSAo0L/QtdGA0LLRi9C5KSDRjdC70LXQvNC10L3RgiDRgdC/0LjRgdC60LBcclxuXHJcbiAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywnJyk7XHJcbiAgICAgICAgc2VsZWN0Lm9wdGlvbnNbMF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVJdGVtRnJvbVNlbmRsaXN0KGl0ZW0sIHNlbGVjdCwgaW5wdXQpIHtcclxuICAgIGxldCB0ZXh0ID0gaXRlbS5kYXRhc2V0LmVtYWlsO1xyXG5cclxuICAgIGxldCBzZW5kTGlzdCA9IGlucHV0LnZhbHVlLnNwbGl0KCc7Jyk7XHJcblxyXG4gICAgbGV0IGZpbHRlcmVkU2VuZExpc3QgPSBzZW5kTGlzdC5maWx0ZXIoZnVuY3Rpb24gKGxpc3RpdGVtKSB7XHJcbiAgICAgICAgaWYobGlzdGl0ZW0gIT09IHRleHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGl0ZW1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dC52YWx1ZSA9IGZpbHRlcmVkU2VuZExpc3Quam9pbignOycpO1xyXG5cclxuICAgIGl0ZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpdGVtKTtcclxuXHJcbiAgICBmb3IoIGxldCBpIG9mIHNlbGVjdC5vcHRpb25zKXtcclxuICAgICAgICBpZihpLnZhbHVlID09PSB0ZXh0KXtcclxuICAgICAgICAgICAgaS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlRmlsZUlucHV0KGJ0bix0b3RhbCxmaWxlc2xpc3QsZmlsZXNpemUpIHtcclxuICAgIGxldCB1cGRhdGVUb3RhbFNpemUgPSBmaWxlc2xpc3QuZGF0YXNldC50b3RhbCAtIGZpbGVzaXplO1xyXG4gICAgZmlsZXNsaXN0LmRhdGFzZXQudG90YWwgPSB1cGRhdGVUb3RhbFNpemU7XHJcbiAgICB0b3RhbC50ZXh0Q29udGVudCA9IGJ5dGVzVG9TaXplKHVwZGF0ZVRvdGFsU2l6ZSkgKyAnINC40LcgMyDQnNCxJztcclxuXHJcbiAgICBsZXQgaW5wdXRJZCA9IGJ0bi5kYXRhc2V0LmZpZWxkSWQ7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbnB1dElkKS5wYXJlbnROb2RlLnJlbW92ZSgpO1xyXG4gICAgYnRuLnBhcmVudE5vZGUucmVtb3ZlKCk7XHJcblxyXG4gICAgbGV0IGZpbGVJbnB1dHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5maWxlSW5wdXQnKSk7XHJcbiAgICBsZXQgcmVtb3ZlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tcmVtb3ZlLWl0ZW0nKTtcclxuXHJcbiAgICAvL9C/0LXRgNC10L/QuNGB0LDRgtGMINC40LzQtdC90LAg0LggaWQg0LLRgdC10YUg0LjQvdC/0YPRgtC+0LIuXHJcbiAgICAvL9C10YHQu9C4INC+0L3QuCDQuNC00YPRgiDQvdC1INC/0L4g0L/QvtGA0Y/QtNC60YMg0LjQu9C4INGBINC/0YDQvtC/0YPRgdC60LDQvNC4XHJcbiAgICAvL9C/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INGE0LDQudC70L7QsiDQvdCwINGB0LXRgNCy0LXRgCDQsdGD0LTQtdGCINC+0YjQuNCx0LrQsFxyXG4gICAgLy/RgtC+INC20LUg0L3QsNC00L4g0YHQtNC10LvQsNGC0Ywg0YEgZGF0YS1pbnB1dC1pZCDQutC90L7Qv9C+0Log0YPQtNCw0LvQtdC90Y8g0YTQsNC50LvQsFxyXG4gICAgLy/QsCDRgtC+INCx0YPQtNC10YIg0YPQtNCw0LvRj9GC0YHRjyDQvdC1INGC0L7RgiDQuNC90L/Rg9GCXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZUlucHV0cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgZmlsZUlucHV0c1tpXS5maXJzdEVsZW1lbnRDaGlsZC5pZCA9ICdmaWxlSW5wdXQnK2k7XHJcbiAgICAgICAgZmlsZUlucHV0c1tpXS5maXJzdEVsZW1lbnRDaGlsZC5uYW1lID0gJ2ZpbGVJbnB1dCcraTtcclxuICAgICAgICByZW1vdmVCdG5zW2ldLmRhdGFzZXQuZmllbGRJZCA9ICdmaWxlSW5wdXQnK2k7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyYXBGaWxlSW5wdXRzKGlucHV0KSB7XHJcbiAgICBsZXQgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbGV0IGJ0biA9IHdyYXAuY2xvbmVOb2RlKGZhbHNlKTtcclxuXHJcbiAgICB3cmFwLmNsYXNzTGlzdC5hZGQoJ2Zha2UtZmlsZS1pbnB1dCcsaW5wdXQuY2xhc3NMaXN0WzBdKTtcclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICAgIGJ0bi5pbm5lckhUTUwgPSAn0JTQvtCx0LDQstC40YLRjCDRhNCw0LnQuyA8c3Bhbj7QndCw0LbQvNC4INC40LvQuCDRgtCw0YnQuCDQtdCz0L4g0YHRjtC00LA8L3NwYW4+JztcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tZmFrZS1maWxlJyk7XHJcbiAgICB3cmFwLmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnaXMtaG92ZXInKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdpcy1ob3ZlcicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdpcy1ob3ZlcicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHdyYXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ5dGVzVG9TaXplKGJ5dGVzKSB7XHJcbiAgICBsZXQgc2l6ZXMgPSBbJ0J5dGVzJywgJ9Ca0LEnLCAn0JzQsScsICfQk9CxJywgJ9Ci0LEnXTtcclxuICAgIGlmICghYnl0ZXMpIHtcclxuICAgICAgICByZXR1cm4gJzAnXHJcbiAgICB9XHJcbiAgICBsZXQgaSA9IHBhcnNlSW50KE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coMTAyNCkpKTtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKGJ5dGVzIC8gTWF0aC5wb3coMTAyNCwgaSksIDIpICsgJyAnICsgc2l6ZXNbaV07XHJcbn1cclxuXHJcblxyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vcGNzcy90YXNrRm9vdGVyRGVzaWduLnBjc3MnO1xyXG5cclxuZXhwb3J0IHt0YXNrRm9vdGVyRGVzaWdufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGFza0Zvb3RlckRlc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTAtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzIS4vdGFza0Zvb3RlckRlc2lnbi5wY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0wLTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3Rhc2tGb290ZXJEZXNpZ24ucGNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMC0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanMhLi90YXNrRm9vdGVyRGVzaWduLnBjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Bjc3MvdGFza0Zvb3RlckRlc2lnbi5wY3NzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjdGFzay1mb290ZXIgdHI6bnRoLWNoaWxkKDIpe2hlaWdodDowO292ZXJmbG93OmhpZGRlbn0uZmFrZS1maWxlLWlucHV0IC5idG4tZmFrZS1maWxle3BhZGRpbmc6LjdlbSAwIDA7dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC1zaXplOjE2cHg7Y29sb3I6IzgyYTVjMztjdXJzb3I6cG9pbnRlcn0uZmFrZS1maWxlLWlucHV0IC5idG4tZmFrZS1maWxlIHNwYW57d2lkdGg6MTAwJTtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LXNpemU6MTJweH0uZmFrZS1maWxlLWlucHV0PmlucHV0e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO29wYWNpdHk6MH0jRmlsZUlucHV0cyBicntkaXNwbGF5Om5vbmV9LnRhc2stdHlwZT5kaXYgc2VsZWN0e21hcmdpbi10b3A6LjNlbX0udGFzay10eXBlPmRpdiBicntkaXNwbGF5Om5vbmV9LmVtYWlsLXNlbmQtbGlzdD5saTphZnRlcntjb250ZW50OlxcXCJcXFxcMUY3QTlcXFwiO21hcmdpbi1sZWZ0Oi40ZW07Y29sb3I6cmVkO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2N1cnNvcjpwb2ludGVyfS5hZGQtZW1haWwgI2dldEVtYWlsQWRkcmVzc2VzQnV0dG9ue2Rpc3BsYXk6bm9uZX0uYWRkLWVtYWlsICNhZGRfZW1haWxfd29ya2Vye3dpZHRoOjIyNnB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYWRkLWVtYWlsICNhZGRfZW1haWx7cG9zaXRpb246YWJzb2x1dGU7dmlzaWJpbGl0eTpoaWRkZW47ei1pbmRleDphdXRvfS5hZGQtZW1haWwgbGFiZWx7ZGlzcGxheTpibG9ja306cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXIgI2VuZF9kYXRle3dpZHRoOmF1dG8haW1wb3J0YW50fTpyb290IC5kZWFkbGluZS1jYWxlbmRhciBpbnB1dFt0eXBlPWJ1dHRvbl17ZGlzcGxheTpub25lfTpyb290IC5kZWFkbGluZS1jYWxlbmRhcj5pbWd7cG9zaXRpb246YWJzb2x1dGU7dG9wOi40ZW07cmlnaHQ6LjVlbX06cm9vdCAuZGVhZGxpbmUtY2FsZW5kYXI+aW5wdXRbdHlwZT10ZXh0XXtwYWRkaW5nLXJpZ2h0OjMwcHh9LnRhc2stcm93LTIgLnRpbWUtYmxvY2s+ZGl2OmFmdGVye2NvbnRlbnQ6XFxcIlxcXFw0M0NcXFxcNDM4XFxcXDQzRFxcXCI7bWFyZ2luLWxlZnQ6LjVlbTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9Lndvcmtlci1ibG9jayBzZWxlY3R7d2lkdGg6MTAwJTttYXJnaW46LjVlbSAwIDB9LnRhc2stZmllbGRzLXJvdyAuZnJvdy1jb2wtMi0ye3dpZHRoOjEyMHB4fS50YXNrLWZpZWxkcy1yb3cgLmZyb3ctY29sLTItMXt3aWR0aDoxOTBweDttYXJnaW4tcmlnaHQ6MzBweH0udGFzay1maWVsZHMtcm93IHRke3BhZGRpbmc6MDtmb250LXNpemU6MTAwJTtkaXNwbGF5OmJsb2NrfS50YXNrLWZpZWxkcy1yb3cgc2VsZWN0e3BhZGRpbmc6LjNlbSAwIC4zZW0gLjJlbX0udGFzay1maWVsZHMtcm93IGlucHV0LmlucHV0X2ZpZWxkLC50YXNrLWZpZWxkcy1yb3cgaW5wdXRbdHlwZT10ZXh0XSwudGFzay1maWVsZHMtcm93IHNlbGVjdHt3aWR0aDphdXRvO21heC13aWR0aDoxMDAlO2hlaWdodDoyZW07cGFkZGluZzouM2VtIC42ZW07Ym9yZGVyOjFweCBzb2xpZCAjOWU5ZTllO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS50YXNrLWZpZWxkcy1yb3cgaW5wdXQuaW5wdXRfZmllbGQ6Zm9jdXMsLnRhc2stZmllbGRzLXJvdyBpbnB1dFt0eXBlPXRleHRdOmZvY3VzLC50YXNrLWZpZWxkcy1yb3cgc2VsZWN0OmZvY3Vze2JvcmRlci1jb2xvcjojMjZhNjlhfSNtYWluLWNvbnRlbnR7bWFyZ2luLWJvdHRvbTowfSNtYWluLWNvbnRlbnQgYnI6bGFzdC1jaGlsZHtkaXNwbGF5Om5vbmV9LmNvbnRlbnR7cGFkZGluZy1ib3R0b206MH0jdGJsLW5ldy1jb21tZW50IHRib2R5LCN0YmwtbmV3LWNvbW1lbnQgdGQsI3RibC1uZXctY29tbWVudCB0cntkaXNwbGF5OmJsb2NrfSN0YmwtbmV3LWNvbW1lbnQrYnIsI3RibC1uZXctY29tbWVudCB0cjpmaXJzdC1jaGlsZD50ZDpmaXJzdC1jaGlsZHtkaXNwbGF5Om5vbmV9I25ldy1jb21tZW50LXdyYXB7bWF4LXdpZHRoOjcyMHB4O21hcmdpbjphdXRvfS50bHtkaXNwbGF5Om5vbmV9LnRhcmVhLXdyYXB7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufSN0ZXh0e3dpZHRoOjEwMCU7cGFkZGluZzouNmVtIC44ZW07Zm9udC1mYW1pbHk6aW5oZXJpdDtmb250LXNpemU6MTRweDtib3JkZXI6MDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNoYWRvdzppbnNldCAwIC0ycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLGluc2V0IDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsLjEyKSxpbnNldCAwIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKX0udGFzay1maWVsZHMtcm93e21heC13aWR0aDo3MjBweDttYXJnaW46MS42ZW0gYXV0b30udGFzay1maWVsZHMtcm93IGxhYmVse21hcmdpbjowIDAgLjVlbTtjb2xvcjpncmF5O2Rpc3BsYXk6aW5saW5lLWJsb2NrfS50YXNrLXJvdy0xe2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4fS53b3JrZXItYmxvY2t7d2lkdGg6MzAwcHg7bWFyZ2luLXJpZ2h0OjcwcHg7LW1zLWZsZXg6MCAwIDMwMHB4O2ZsZXg6MCAwIDMwMHB4fS53b3JrZXItYmxvY2sgaW5wdXRbdHlwZT1yYWRpb117ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotLjJlbX0udGFzay1yb3ctMiwudGFzay1yb3ctMiAudGltZS1ibG9ja3tkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleH0udGFzay1yb3ctMiAudGltZS1ibG9ja3stbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59LnRhc2stcm93LTIgLnRpbWUtYmxvY2s+ZGl2e3dpZHRoOjEyMHB4fS50YXNrLXJvdy0yIC50aW1lLWJsb2NrPmRpdiBpbnB1dHt3aWR0aDo3NiU7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfTpyb290IC5kZWFkbGluZS1jYWxlbmRhcntwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjAhaW1wb3J0YW50O2ZvbnQtc2l6ZToxMDAlfTpyb290IC5kZWFkbGluZS1jYWxlbmRhcj5pbWcsOnJvb3QgLmRlYWRsaW5lLWNhbGVuZGFyPmlucHV0e2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOnRvcDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnRhc2stcm93LTN7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXh9LmFkZC1lbWFpbHtwb3NpdGlvbjpyZWxhdGl2ZX0uYWRkLWVtYWlsIGF7ZGlzcGxheTpub25lfS5lbWFpbC1zZW5kLWxpc3R7bWFyZ2luOi40ZW0gMCAuNWVtO3BhZGRpbmc6MDtsaXN0LXN0eWxlLXR5cGU6bm9uZX0uZW1haWwtc2VuZC1saXN0Pmxpe21hcmdpbjowO2xpbmUtaGVpZ2h0OjF9LmVtYWlsLXNlbmQtbGlzdD5saTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEI3XFxcIjtmb250LXNpemU6MS41ZW07bWFyZ2luLXJpZ2h0Oi4yZW07ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfS50YXNrLXR5cGUgc2VsZWN0e21pbi13aWR0aDoxOTBweH0uYWRkLWZpbGVzIGF7ZGlzcGxheTpub25lfSNGaWxlSW5wdXRzIGlucHV0Om5vdCg6Zmlyc3QtY2hpbGQpe21hcmdpbi10b3A6LjNlbTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmJ0bi1yZW1vdmUtaXRlbXt3aWR0aDoxMnB4O2hlaWdodDoxOHB4O21hcmdpbi1sZWZ0Oi4zZW07Y29sb3I6cmVkO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcn0uYnRuLXJlbW92ZS1pdGVtOmFmdGVye2NvbnRlbnQ6XFxcIlxcXFwxRjdBOVxcXCI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowfS5mYWtlLWZpbGUtaW5wdXR7d2lkdGg6MjI1cHg7aGVpZ2h0OjYwcHg7Ym9yZGVyOjFweCBkYXNoZWQgIzgyYTVjMztiYWNrZ3JvdW5kOiNmNGY2Zjg7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXJhZGl1czouNWVtO3Bvc2l0aW9uOnJlbGF0aXZlfS5mYWtlLWZpbGUtaW5wdXQuaXMtaG92ZXJ7YmFja2dyb3VuZDojZDJkY2U1fS5maWxlcy1saXN0e21hcmdpbjotLjVlbSAwIC41ZW07cGFkZGluZzowO2xpc3Qtc3R5bGUtdHlwZTpub25lO3RyYW5zaXRpb246aGVpZ2h0IC4zc30uZmlsZXMtbGlzdCAuZmlsZS1saXN0LWl0ZW17bWFyZ2luOi40ZW0gMH0uZmlsZXMtbGlzdCAuZmlsZS1saXN0LWl0ZW0gLnMtaW5mb3twYWRkaW5nLWxlZnQ6LjZlbTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9I3Rhc2stZm9vdGVyIHRib2R5LCN0YXNrLWZvb3RlciB0ZCwjdGFzay1mb290ZXIgdHJ7ZGlzcGxheTpibG9ja30uYnRuLWFjdGlvbntoZWlnaHQ6MzZweDtwYWRkaW5nOjAgMS42ZW07Zm9udC1zaXplOjE0cHg7Y29sb3I6I2ZmZjtib3JkZXI6MDtib3JkZXItcmFkaXVzOjRweDtiYWNrZ3JvdW5kOiM3ZWI1MTk7Y3Vyc29yOnBvaW50ZXJ9XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj97XCJpbXBvcnRMb2FkZXJzXCI6MX0hLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliIS4vc3JjL3Bjc3MvdGFza0Zvb3RlckRlc2lnbi5wY3NzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuaW1wb3J0IHttb2RpZnlTZWxlY3RPcHRpb25zTGlzdCxmaW5kSW5BcnJheX0gZnJvbSAnLi9fdXRpbHMuanMnO1xyXG5pbXBvcnQge2dldEFsbENvbW1lbnRzUm93cyxnZXRBbGxXb3JrZXJzfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbi8v0LjQt9C80LXQvdC10L3QuNC1INGN0LvQtdC80LXQvdGC0L7QsiDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0LfQsNC00LDRh9C4XHJcbi8v0LIg0YHQvtC+0YLQstC10YLRgdCy0LjQuCDRgSDQvdCw0YHRgtGA0L7QudC60LDQvNC4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG5mdW5jdGlvbiBlbGVtc01vZGlmaWNhdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgZGFydF93b3JrZXJzX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50ZXJuYWxfd29ya2VyJyk7XHJcblxyXG4gICAgLy/RgdGA0LDQstC90LjQstCw0LXQvCDRgdC/0LjRgdC+0Log0L/RgNC+0LXQutGC0L7QsiDRgSDRgdC+0YXRgNCw0L3QtdC90L3Ri9C8INCyINC90LDRgdGC0YDQvtC50LrQsNGFXHJcbiAgICAvL9C/0YDQvtC10LrRgtGLINC60L7RgtC+0YDRi9GFINC90LXRgiDQsiDQvdCw0YHRgtGA0L7QudC60LAg0YHQutGA0YvQstCw0LXQvFxyXG4gICAgdGhpcy5tb2RpZnlQcm9qZWN0TGlzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgcGFyYW1zX3VzZXJfcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYXJhbXNfdXNlcl9wcm9qZWN0cycpKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtc191c2VyX3Byb2plY3RzID09PSBudWxsIHx8ICFwYXJhbXNfdXNlcl9wcm9qZWN0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygn0J3QtdGCINGB0L7QsdGB0YLQstC10L3QvdC+0LPQviDRgdC/0LjRgdC60LAg0L/RgNC+0LXQutGC0L7QsicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXJ0X3Byb2plY3RzX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdF9pZCcpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGllbnRfaWQnKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IGRhcnRfcHJvamVjdHNfbGlzdC5vcHRpb25zO1xyXG5cclxuICAgICAgICBtb2RpZnlTZWxlY3RPcHRpb25zTGlzdChvcHRpb25zLCBwYXJhbXNfdXNlcl9wcm9qZWN0cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v0YHRgNCw0LLQvdC40LLQsNC10Lwg0YHQv9C40YHQvtC6INC40YHQv9C+0LvQvdC40YLQtdC70LXQuSDRgSDRgdC+0YXRgNCw0L3QtdC90L3Ri9C8INCyINC90LDRgdGC0YDQvtC50LrQsNGFXHJcbiAgICAvL9C40YHQv9C+0LvQvdC40YLQtdC70LXQuSDQutC+0YLQvtGA0YvRhSDQvdC10YIg0LIg0L3QsNGB0YLRgNC+0LnQutCwINGB0LrRgNGL0LLQsNC10LxcclxuICAgIHRoaXMubW9kaWZ5V29ya2Vyc0xpc3QgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXNfdXNlcl93b3JrZXJzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFyYW1zX3VzZXJfd29ya2VycycpKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtc191c2VyX3dvcmtlcnMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYoTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygn0J3QtdGCINGB0L7QsdGB0YLQstC10L3QvdC+0LPQviDRgdC/0LjRgdC60LAg0YHQvtGC0YDRg9C00L3QuNC60L7QsicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBhcmFtc191c2VyX3dvcmtlcnMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbGV0IGRhcnRfd29ya2Vyc19saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludGVybmFsX3dvcmtlcicpO1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyA9IGRhcnRfd29ya2Vyc19saXN0Lm9wdGlvbnM7IC8v0YHQv9C40YHQvtC6INCy0YHQtdGFINGB0L7RgtGA0YPQtNC90LjQutC+0LIg0LjQtyDRgdC10LvQtdC60YLQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHJcbiAgICAgICAgLy/QtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60LjQuSDRgdC/0LjRgdC+0Log0YHQvtGC0YDRg9C00L3QuNC60L7QsiDQvdC1INC/0YPRgdGCXHJcbiAgICAgICAgLy/QuCDQtdGB0LvQuCDQsiDQt9Cw0LTQsNGH0LUg0YPRh9Cw0YHRgtCy0YPQtdGCINGB0L7RgtGA0YPQtNC90LjQuiDQutC+0YLQvtGA0L7Qs9C+INC90LXRgiDQsiDRgdC/0LjRgdC60LUg0L7RgdGC0LDQstC70Y/RjiDQtdCz0L4g0L7RgtC60YDRi9GC0YvQvFxyXG4gICAgICAgIGlmIChwYXJhbXNfdXNlcl93b3JrZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvL9C/0L7Qu9GD0YfQsNGOINGB0L/QuNGB0L7QuiDQstGB0LXRhSDRg9GH0LDRgdGC0L3QuNC60L7QsiDQt9Cw0LTQsNGH0LhcclxuICAgICAgICAgICAgbGV0IHRhc2tfd29ya2VycyA9IGdldEFsbFdvcmtlcnMoKTtcclxuICAgICAgICAgICAgbGV0IHRhc2tfd29ya2Vyc19pZCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy/RgdGA0LDQstC90LXQvdC40LUg0YHQv9C40YHQutC+0LIsINC10YHQu9C4INGA0LDQsdC+0YLQvdC40LrQsCDQvdC10YIg0LIg0YHQv9C40YHQutC1INC40Lcg0L3QsNGB0YLRgNC+0LXQuiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8gLSDQtNC+0LHQsNCy0LvRj9GOXHJcbiAgICAgICAgICAgIC8v0YHQvdCw0YfQsNC70LAg0L3Rg9C20L3QviDQv9C+0LvRg9GH0LjRgtGMINGB0L7QvtGC0LLQtdGC0YHQstC40LUg0LjQvNGPINGB0L7RgtGA0YPQtNC90LjQutCwIC0+IG9wdGlvbi52YWx1ZSDRgi7QtS4g0LvQvtCz0LjQvSDRgdC+0YLRgNGD0LTQvdC40LrQsCDQvdCwINCw0L3Qs9C70LjRhtC60L7QvFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZl9maW5kID0gZmluZEluQXJyYXkodGFza193b3JrZXJzLCBvcHRpb25zW2ldLnRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpZl9maW5kID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXNrX3dvcmtlcnNfaWQucHVzaChvcHRpb25zW2ldLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL9C30LDRgtC10Lwg0YHRgNCw0LLQvdC40YLRjCDRgdC+INGB0L/QuNGB0LrQvtC8INC40Lcg0L3QsNGB0YLRgNC+0LXQulxyXG4gICAgICAgICAgICAvL9C4INC00L7QsdCw0LLQuNGC0Ywg0YDQsNCx0L7RgtC90LjQutCwINC10YHQu9C4INC10LPQviDQvdC10YIg0LIg0YHQv9C40YHQutC1XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza193b3JrZXJzX2lkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWZfZmluZCA9IGZpbmRJbkFycmF5KHBhcmFtc191c2VyX3dvcmtlcnMsIHRhc2tfd29ya2Vyc19pZFtpXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlmX2ZpbmQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zX3VzZXJfd29ya2Vycy5wdXNoKHRhc2tfd29ya2Vyc19pZFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ9CSINGB0L/QuNGB0L7QuiDQtNC+0LHQsNCy0LvQtdC9ICcrIHRhc2tfd29ya2Vyc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1vZGlmeVNlbGVjdE9wdGlvbnNMaXN0KG9wdGlvbnMsIHBhcmFtc191c2VyX3dvcmtlcnMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy/QsiDRgdC/0LjRgdC60LUg0LjRgdC/0L7Qu9C90LjRgtC10LvQtdC5INC+0YLQvNC10YfQsNGOIHNlbGVjdGVkINGA0LDQsdC+0YLQvdC40LrQsCDQvtGB0YLQsNCy0LjQstGI0LXQs9C+INC/0L7RgdC70LXQtNC90LjQuSDQutC+0LzQvNC10L3RgtGA0LjQuSDQsiDQt9Cw0LTQsNGH0LVcclxuICAgIHRoaXMuc2V0U2VsZWN0ZWRJbldvcmtlcnNMaXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBsYXN0X3JvdyA9IGdldEFsbENvbW1lbnRzUm93cygpO1xyXG4gICAgICAgIGxhc3Rfcm93ID0gbGFzdF9yb3dbbGFzdF9yb3cubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgbGV0IGxhc3Rfd29ya2VyID0gbGFzdF9yb3cuY2hpbGRyZW5bNF0udGV4dENvbnRlbnQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGFydF93b3JrZXJzX2xpc3Qub3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobGFzdF93b3JrZXIgPT09IGRhcnRfd29ya2Vyc19saXN0Lm9wdGlvbnNbaV0udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgZGFydF93b3JrZXJzX2xpc3Qub3B0aW9uc1tpXS5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgLy9maXJlRXZlbnQg0L3Rg9C20LXQvSDRh9GC0L7QsdGLINCy0YvQt9Cy0LDRgtGMINC/0L7QstC10YjQtdC90L3Rg9GOINC90LAg0YHQvtCx0YvRgtC40LUg0YTRg9C90LrRhtC40Y5cclxuICAgICAgICAgICAgICAgIC8v0LIg0LrQvtGC0L7RgNC+0Lkg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDRgNCw0LHQvtGC0L3QuNC6INCyINGB0L/QuNGB0L7QuiDQtNC70Y8g0YDQsNGB0YHRi9C70LrQuCDRgSDQt9Cw0LTQsNGH0LhcclxuICAgICAgICAgICAgICAgIGxldCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xyXG4gICAgICAgICAgICAgICAgZXZ0LmluaXRFdmVudCgnY2hhbmdlJywgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZGFydF93b3JrZXJzX2xpc3QuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRlcm5hbF93b3JrZXInKSkge1xyXG4gICAgICAgIHRoaXMubW9kaWZ5V29ya2Vyc0xpc3QoKTtcclxuICAgICAgICB0aGlzLnNldFNlbGVjdGVkSW5Xb3JrZXJzTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdF9pZCcpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGllbnRfaWQnKSkge1xyXG4gICAgICAgIHRoaXMubW9kaWZ5UHJvamVjdExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQv9C+0LvQtSDQstCy0L7QtNCwIGlkINC30LDQtNCw0YfQuCDQuCDQv9C10YDQtdGF0L7QtCDQuiDQt9Cw0LTQsNGH0LVcclxuXHJcbiAgICBsZXQgZ29Ub0ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvVG8nKTtcclxuICAgIGdvVG9GaWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcblxyXG4gICAgaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdsb2FkIGVsZW1zTW9kaWZpY2F0aW9uJyk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQge2VsZW1zTW9kaWZpY2F0aW9ufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9lbGVtc01vZGlmaWNhdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0VGFza0lkIH0gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcblxyXG4vL9Ch0L7RhdGA0LDQvdC10L3QuNC1INC60L7QvNC80LXQvdGC0LDRgNC40Y8g0LIgbG9jYWxTdG9yYWdlXHJcbi8v0L3QsCDRgdC70YPRh9Cw0Lkg0LLQvdC10LfQsNC/0L3QvtCz0L4g0LfQstC10YDRiNC10L3QuNGPINGB0LXRgdGB0LjQuFxyXG5mdW5jdGlvbiBzYXZlTmV3Q29tbWVudCgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgJGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQnKTtcclxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhcmVhLXdyYXAnKTtcclxuXHJcbiAgICBsZXQgdGFza19pZCA9IGdldFRhc2tJZCgpO1xyXG5cclxuICAgIC8v0LTQvtCx0LDQstC70Y4g0LrQvdC+0L/QutGDINC00LvRjyDQstGB0YLQsNCy0LrQuCDRgdC+0YXRgNCw0L3QtdC90L3QvtCz0L4g0YLQtdC60YHRgtCwXHJcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQlVUVE9OJyk7XHJcbiAgICBidG4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1pbnNlcnQtbHMnKTtcclxuICAgIGJ0bi5pZCA9J2J0bi1pbnNlcnQtbHMnO1xyXG4gICAgYnRuLmlubmVySFRNTCA9ICfQktGB0YLQsNCy0LjRgtGMINC40LcgTFMnO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ25vbmUnKTsgLy/Qv9C+INGD0LzQvtC70YfQsNC90LjRjiDRgdC60YDRi9GC0LBcclxuXHJcbiAgICB3cmFwLmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgLy/QtdGB0LvQuCDQtdGB0YLRjCDRgdC+0YXRgNCw0L3QtdC90L3Ri9C5INGC0LXQutGB0YIgLSDQv9C+0LrQsNC30LDRgtGMINC60L3QvtC/0LrRg1xyXG4gICAgc2hvd1Bhc3RlQnRuKGJ0biwgdGFza19pZCk7XHJcblxyXG4gICAgLy/QstGB0YLQsNCy0LjRgtGMINGC0LXQutGB0YIg0L/QviDQutC70LjQutGDXHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICRmaWVsZC52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrJyArIHRhc2tfaWQpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8v0KHQvtGF0YDQsNC90LjRgtGMINGC0LXQutGB0YIg0LjQtyDQv9C+0LvRjyDQv9GA0Lgg0L3QsNCx0L7RgNC1INC40LvQuCDQv9C+0YLQtdGA0LUg0YTQvtC60YPRgdCwXHJcbiAgICAkZmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzYXZlVGFza0NvbW1lbnQpO1xyXG5cclxuICAgIC8v0LXRgdC70Lgg0LXRgdGC0Ywg0YHQvtGF0YDQsNC90LXQvdC90YvQuSDRgtC10LrRgdGCIC0g0L/QvtC60LDQt9Cw0YLRjCDQutC90L7Qv9C60YNcclxuICAgICRmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNob3dQYXN0ZUJ0bihidG4sIHRhc2tfaWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdyYXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzYXZlVGFza0NvbW1lbnQoKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2snICsgdGFza19pZCwgdGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd1Bhc3RlQnRuKGJ1dHRvbiwgaWQpIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2snICsgaWQpICE9PSAnJyAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFzaycgKyBpZCkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdsb2FkIHNhdmVOZXdDb21tZW50Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7c2F2ZU5ld0NvbW1lbnR9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3NhdmVOZXdDb21tZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge3J1bk9uS2V5c30gZnJvbSAnLi9fdXRpbHMuanMnO1xyXG5pbXBvcnQge2dldEFsbENhbW1lbnRzfSBmcm9tICcuL19maW5kZXJzLmpzJztcclxuXHJcbi8v0LLRi9C00LXQu9C10L3QuNC1INGC0LXQutGB0YLQsCDQsiDQutCw0LzQtdC90YLQtSDQuCDQstGB0YLQsNCy0LrQsCDQvtGE0L7RgNC80LvQtdC90L3QsNGPINC60LDQuiDRhtC40YLQsNGC0LAg0LTQu9GPIG1hcmtkb3duXHJcbmZ1bmN0aW9uIGNvcHlQYXN0ZUNvbW1lbnRRdW90ZSAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGNhbW1lbnRzID0gQXJyYXkuZnJvbShnZXRBbGxDYW1tZW50cygpKTtcclxuXHJcbiAgICBjYW1tZW50cy5tYXAoZnVuY3Rpb24gKGNhbW1lbnQpIHtcclxuICAgICAgICBjYW1tZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2VsZWN0aW9uJyxzZWxlY3Rpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGVkaXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gZm9ybWF0QW5kSW5zZXRDb21tZW50UXVvdGUoZWxlbSkge1xyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3Rpb24nKSl7XHJcbiAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IGVsZW0uc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgICAgIGxldCBlbmRQb3MgPSBlbGVtLnNlbGVjdGlvbkVuZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3RyaW5ncyA9IHNlbGVjdGlvbi5zcGxpdCgnXFxuJyk7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmdzID0gc3RyaW5ncy5tYXAoZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgICAgICAgICAgIHJldHVybiAnPiAnK3N0cjtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSBzdHJpbmdzLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2VsZWN0aW9uID0gJ1xcbicrc2VsZWN0aW9uKydcXG4nO1xyXG5cclxuICAgICAgICAgICAgZWxlbS52YWx1ZSA9IGVsZW0udmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKVxyXG4gICAgICAgICAgICAgICAgKyBzZWxlY3Rpb25cclxuICAgICAgICAgICAgICAgICsgZWxlbS52YWx1ZS5zdWJzdHJpbmcoZW5kUG9zLCBlbGVtLnZhbHVlLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2VsZWN0aW9uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJ1bk9uS2V5cyhcclxuICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZWRpdG9yKXtcclxuICAgICAgICAgICAgICAgIGZvcm1hdEFuZEluc2V0Q29tbWVudFF1b3RlKGVkaXRvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVkaXRvclxyXG4gICAgICAgICxcclxuICAgICAgICBcIjE2XCIsXHJcbiAgICAgICAgXCIxN1wiLFxyXG4gICAgICAgIFwiVlwiLmNoYXJDb2RlQXQoMClcclxuICAgICk7XHJcblxyXG4gICAgaWYgKE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdsb2FkIGNvcHlQYXN0ZUNvbW1lbnRRdW90ZScpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2NvcHlQYXN0ZUNvbW1lbnRRdW90ZX07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29weVBhc3RlQ29tbWVudFF1b3RlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2dldFRhc2tJZH0gZnJvbSAnLi9fZmluZGVycy5qcyc7XHJcbmltcG9ydCB7ZGVjbE9mTnVtLGxvYWRCeUFqYXh9IGZyb20gJy4vX3V0aWxzLmpzJztcclxuXHJcbmZ1bmN0aW9uIHRhc2tVcGRhdGVOb3RpZnkgKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBwYWdlVXJsID0gd2luZG93LmxvY2F0aW9uO1xyXG4gICAgbGV0IHRhc2tJZCA9IGdldFRhc2tJZCgpO1xyXG5cclxuICAgIC8v0LTQvtCx0LDQstC70LXQvdC40LUg0LrQvdC+0L/QutC4INC/0L7QtNC/0LjRgdC60Lgg0L3QsCDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQsNC80LXQvdGC0LDRhSDQsiDQt9Cw0LTQsNGH0LVcclxuICAgIGxldCBhbGVydEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYWxlcnRCdG4uaWQgPSAndXBkLWFsZXJ0JztcclxuICAgIGFsZXJ0QnRuLmNsYXNzTGlzdC5hZGQoJ2FkZC1hbGVydCcpO1xyXG4gICAgYWxlcnRCdG4udGl0bGUgPSAn0J/QvtC00L/QuNGB0LDRgtGM0YHRjyDQvdCwINGD0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGP0YUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stdGl0bGUnKS5pbnNlcnRCZWZvcmUoYWxlcnRCdG4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJzY3JpYmVFbGVtZW50JykpO1xyXG5cclxuICAgIGFsZXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgIGNoZWNrQ29tbWVudHNVcGRhdGUodGhpcyx0YXNrSWQsZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjaGVja0NvbW1lbnRzVXBkYXRlKGFsZXJ0QnRuLHRhc2tJZCk7XHJcblxyXG4gICAgLy/Qt9Cw0L/Rg9GB0Log0LjQvdGC0LXRgNCy0LDQu9CwINC/0YDQvtCy0LXRgNC60Lgg0LjQt9C80LXQvdC10L3QuNC5INC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cclxuICAgIGxldCBub3RpZnlJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsb2FkQnlBamF4KHBhZ2VVcmwsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjaGVja1VwZGF0ZShkYXRhLHRhc2tJZCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9LCAxMDAwICogNjAgKiA1KTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tVcGRhdGUoYWpheHJlc3BvbnNlLGlkKSB7XHJcbiAgICAgICAgbGV0IGNvbW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXRibCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLWNvbW1lbnQnKTtcclxuICAgICAgICBsZXQgY29tbWVudHNOdW0gPSBjb21tZW50cy5sZW5ndGg7XHJcblxyXG5cclxuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgICAgIGxldCBodG1sRG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhhamF4cmVzcG9uc2UudHJpbSgpLFwidGV4dC9odG1sXCIpO1xyXG4gICAgICAgIGxldCB0YmwgPSBodG1sRG9jLmJvZHkucXVlcnlTZWxlY3RvcignZm9ybVtuYW1lPXRoZUZvcm1dJykuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcblxyXG5cclxuICAgICAgICBsZXQgdXBsb2FkZWRDb21tZW50cyA9IHRibC5xdWVyeVNlbGVjdG9yQWxsKCd0cicpO1xyXG5cclxuICAgICAgICBsZXQgZmlsdGVyZWRDb21tZW50cyA9IEFycmF5LmZyb20odXBsb2FkZWRDb21tZW50cykuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJykubGVuZ3RoID4gMTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gLSAxINGCLtC6LiDQvdGD0LbQvdC+INGD0LHRgNCw0YLRjCDQv9C10YDQstGD0Y4g0YHRgtGA0L7QutGDINGBINC90LDQt9Cy0LDQvdC40Y/QvNC4INGB0YLQvtC70LHRhtC+0LJcclxuICAgICAgICBsZXQgdXBkQ29tbWVudE51bSA9IGZpbHRlcmVkQ29tbWVudHMubGVuZ3RoIC0gMTtcclxuXHJcblxyXG4gICAgICAgIGlmKHVwZENvbW1lbnROdW0gPiBjb21tZW50c051bSl7XHJcbiAgICAgICAgICAgIGxldCBuQ29tbWVudHMgPSB1cGRDb21tZW50TnVtIC0gY29tbWVudHNOdW07XHJcbiAgICAgICAgICAgIGxldCBsYXN0SWQgPSBjb21tZW50c1tjb21tZW50c051bSAtIDFdLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJykuaWQuc3BsaXQoJ18nKVsxXTtcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZU9uUGFnZU5vdGlmeShuQ29tbWVudHMsbGFzdElkKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGVja1VwYWRhdGVPcHRpb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29tbWVudHMtdXBkYXRlJytpZCk7XHJcblxyXG4gICAgICAgICAgICBpZihjaGVja1VwYWRhdGVPcHRpb24gJiYgY2hlY2tVcGFkYXRlT3B0aW9uID09PSAndHJ1ZScpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vdGlmeSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAn0J3QvtCy0YvQuSDQutC+0LzQvNC10L3RgtCw0YDQuNC5JyxcclxuICAgICAgICAgICAgICAgICAgICAndGFnJzogJ25ldy1jb21tZW50LScraWQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2JvZHknOiBodG1sRG9jLnF1ZXJ5U2VsZWN0b3IoJ2gxID4gZm9udCcpLnRleHRDb250ZW50LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBub3RpZnlNZShub3RpZnkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vINC+0YfQuNGB0YLQutCwINC40L3RgtC10YDQstCw0LvQsCAtINC+0YLQutC70Y7Rh9C10L3QuNC1INGD0LLQtdC00L7QvNC70LXQvdC40Lkg0L/QviDQutC70LjQutGDINC90LAg0YPQstC10LTQvtC80LvQtdC90LjQuFxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IG5vdGlmaWNhdGlvbiA9IG5vdGlmeU1lKG5vdGlmeSk7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gaWYobm90aWZpY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBub3RpZmljYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNsZWFySW50ZXJ2YWwobm90aWZ5SW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbm90aWZ5TWUobm90aWZ5KSB7XHJcbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uID09PSBcImdyYW50ZWRcIikge1xyXG4gICAgICAgICAgICBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKG5vdGlmeS50aXRsZSwge3RhZzogbm90aWZ5LnRhZywgYm9keTogbm90aWZ5LmJvZHl9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gIT09ICdkZW5pZWQnKSB7XHJcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiAocGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBlcm1pc3Npb24gPT09IFwiZ3JhbnRlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbihub3RpZnkudGl0bGUsIHt0YWc6IG5vdGlmeS50YWcsIGJvZHk6IG5vdGlmeS5ib2R5fSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5vdGlmaWNhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVPblBhZ2VOb3RpZnkobnVtLGxpbmtJZCkge1xyXG4gICAgICAgIGxldCBub3RpZnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZS1ub3RpZnknKTtcclxuXHJcbiAgICAgICAgaWYoIW5vdGlmeSl7XHJcbiAgICAgICAgICAgIG5vdGlmeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50LXRlbXBsYXRlJykuY2xvbmVOb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgbm90aWZ5LmlkID0gJ3BhZ2Utbm90aWZ5JztcclxuICAgICAgICAgICAgbm90aWZ5LmNsYXNzTGlzdC5hZGQoJ2ItY29tbWVudF9ub3RpZnknKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXRibCcpLmFwcGVuZENoaWxkKG5vdGlmeSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vdGlmeS50ZXh0Q29udGVudCA9ICfQkiDQt9Cw0LTQsNGH0LUgJytudW0rJyAnK2RlY2xPZk51bShudW0sIFsn0L3QvtCy0YvQuSDQutC+0LzQvNC10L3RgtCw0YDQuNC5Jywn0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGPJywn0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNC10LInXSk7XHJcblxyXG4gICAgICAgIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIGxpbmsuaHJlZiA9IHdpbmRvdy5sb2NhdGlvbisnIycrbGlua0lkO1xyXG4gICAgICAgIGxpbmsudGFyZ2V0ID0gJ19zZWxmJztcclxuICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ3JlZ3VsYXItbGluaycsJ2NvbW1lbnRzLXVwZGF0ZS1saW5rJyk7XHJcbiAgICAgICAgbGluay50ZXh0Q29udGVudCA9ICfQntCx0L3QvtCy0LjRgtGMINGB0YLRgNCw0L3QuNGG0YMnO1xyXG5cclxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5ocmVmO1xyXG4gICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG5vdGlmeS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5vdGlmeTtcclxuICAgIH1cclxuXHJcbiAgICAvL9Cy0LrQu9GO0YfQuNGC0Ywv0L7RgtC60LvRjtGH0LjRgtGMINGD0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtGA0LDQuNGP0YVcclxuICAgIC8v0L3QsCDQvtGC0LrRgNGL0YLQvtC5INGB0YLRgNCw0L3QuNGG0LUg0LfQsNC00LDRh9C4XHJcbiAgICBmdW5jdGlvbiBjaGVja0NvbW1lbnRzVXBkYXRlKGJ0bixpZCxldmVudCA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYoZXZlbnQpe1xyXG4gICAgICAgICAgICBpZihidG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKXtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb21tZW50cy11cGRhdGUnK2lkLCd0cnVlJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScraWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb21tZW50cy11cGRhdGUnK2lkKSA9PT0gJ3RydWUnKXtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygnbG9hZCB1cGRhdGVOb3RpZnknKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHt0YXNrVXBkYXRlTm90aWZ5fTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90YXNrVXBkYXRlTm90aWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvL9C/0YDQvtC60YDRg9GC0LrQsCDQuiDQutCw0LzQtdC90YLRgyDQv9C+INGP0LrQvtGA0Y4uINCd0YPQttC90LAg0LXRgdC70Lgg0LLRi9C30LLQsNC9IGNvbW1lbnRzRGVzaWduKClcclxuZnVuY3Rpb24gYW5jaG9yTGluaygpIHtcclxuICAgIC8v0L7QsdGA0LDQsdC+0YLQutCwINGB0YHRi9C70L7QuiDRgSBpZCDQutCw0LzQtdC90YLQsCDQsiDRhdC10YjQtVxyXG4gICAgLy/Rgi7Qui4g0LjQty3Qt9CwINC40LfQvNC10L3QtdC90LjRjyDQstGL0YHQvtGC0Ysg0LrQsNC80LXQvdGC0L7QsiDQuCDRgdC+0L7RgtCy0LXRgtGB0LLQtdC90L3QviDRgdGC0YDQsNC90LjRhtGLINCyIG1vZHVsZXMuY2FtbWVudHNEZXNpZ24oKVxyXG4gICAgLy/QvtC90Lgg0YDQsNCx0L7RgtCw0Y7RgiDQvdC1INC/0YDQsNCy0LjQu9GM0L3QvlxyXG5cclxuICAgIGxldCBjYW1tZW50SWQgPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuXHJcbiAgICBjYW1tZW50SWQgPSBjYW1tZW50SWQuc2xpY2UoMSwgY2FtbWVudElkLmxlbmd0aCk7XHJcblxyXG4gICAgLy/QtNC+0LHQsNCy0LvRj9GOIHNldFRpbWVvdXQg0YIu0LouINC/0L7QutCwINC90LUg0L/RgNC40LTRg9C80LDQuyDQutCw0Log0L7RgtC70L7QstC40YLRjFxyXG4gICAgLy/Rh9GC0L4g0L/QtdGA0LXQtNC10LvQutCwINGB0YLRgNCw0L3QuNGG0Ysg0LfQsNC60L7QvdGH0LXQvdCwINC4INCy0YvRgdC+0YLQsCDQuCDQv9C+0LfQuNGG0LjRjyDQutCw0LzQtdC90YLQsFxyXG4gICAgLy/QuiDQutC+0YLQvtGA0L7QvNGDINC90YPQttC90L4g0L/RgNC+0LrRgNGD0YLQuNGC0Ywg0LHRg9C00LXRgiDRgNCw0YHRgdGH0LjRgtCw0L3QsCDQv9GA0LDQstC40LvRjNC90L5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChjYW1tZW50SWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdhbmNob3JMaW5rIHN0YXJ0Jyk7XHJcbiAgICAgICAgICAgIC8v0LjRidGDINGB0LrRgNGL0YLRi9C5INGH0LXQutCx0L7QutGBINGBIGlkINC4INC+0YIg0L3QtdCz0L4g0LLQstC10YDRhSDQtNC+INC60LDRgNGC0L7Rh9C60Lgg0LrQsNC80LXQvdGC0LAgYi1jb21tZW50XHJcbiAgICAgICAgICAgIGxldCBjYW1tZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWNrYm94XycgKyBjYW1tZW50SWQpLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBjYW1tZW50Lm9mZnNldFRvcDtcclxuXHJcbiAgICAgICAgICAgIGFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgICAgICAgICAgICB0aW1pbmc6IGZ1bmN0aW9uICh0aW1lRnJhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGltZUZyYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRyYXc6IGZ1bmN0aW9uIChwcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvWShkaXN0YW5jZSwgcHJvZ3Jlc3MpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDYwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGUob3B0aW9ucykge1xyXG4gICAgbGV0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uIGFuaW1hdGUodGltZSkge1xyXG4gICAgICAgIGxldCB0aW1lRnJhY3Rpb24gPSAodGltZSAtIHN0YXJ0KSAvIG9wdGlvbnMuZHVyYXRpb247XHJcbiAgICAgICAgaWYgKHRpbWVGcmFjdGlvbiA+IDEpIHRpbWVGcmFjdGlvbiA9IDE7XHJcblxyXG4gICAgICAgIGxldCBwcm9ncmVzcyA9IG9wdGlvbnMudGltaW5nKHRpbWVGcmFjdGlvbik7XHJcblxyXG4gICAgICAgIG9wdGlvbnMuZHJhdyhwcm9ncmVzcyk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lRnJhY3Rpb24gPCAxKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNjcm9sbFRvWShkaXN0YW5zZSwgcHJvZ3Jlc3MpIHtcclxuICAgIGxldCBzY3JvbGxZID0gd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzY3JvbGxZICsgKChkaXN0YW5zZSAtIHNjcm9sbFkpICogcHJvZ3Jlc3MpKTtcclxufVxyXG5cclxuZXhwb3J0IHthbmNob3JMaW5rfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hbmNob3JMaW5rLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuXHJcbi8vINC00L7QsdCw0LLQu9C10L3QuNC1INC90LAg0YHRgtGA0LDQvdC40YbRgyDQvdC+0LLQvtC5INC30LDQtNCw0YfQuCDQsdC70L7QutCwINC90LDRgdGC0YDQvtC10Log0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXHJcblxyXG5mdW5jdGlvbiB1c2VyU2V0dGluZ3MoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICAvL9C00L7QsdCw0LLQu9C10L3QuNC1L9GD0LTQsNC70LXQvdC40LUg0LLRi9Cx0YDQsNC90L3Ri9GFINC/0YDQvtC10LrRgtC+0LIg0LIg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC+0Lwg0YHQv9C40YHQutC1XHJcbiAgICAvL9GB0L7RhdGA0LDQvdC10L3QuNC1INCyIGxvY2FsU3RvcmFnZSDQuCDRgdC60YDRi9GC0Ywg0L/QvtC60LDQt9Cw0YLRjCDQsiBzZWxlY3Qg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcbiAgICBsZXQgJGNvbnRlbnRfY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm1bbmFtZT1cInRoZUZvcm1cIl0nKTtcclxuXHJcbiAgICAvL9GB0L7Qt9C00LDQvdC40LUg0LHQu9C+0LrQsCDQsiDQutC+0YLQvtGA0L7QvCDQsdGD0LTRg9GCINCy0YHQtSDRjdC70LXQvNC10L3RgtGLINGD0L/RgNCw0LLQu9C10L3QuNGPINC90LDRgdGC0YDQvtC50LrQsNC80LhcclxuICAgIGxldCAkdXNlcl9zZXR0aW5nc19ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICR1c2VyX3NldHRpbmdzX2JveC5pZCA9ICdzZXR0aW5ncy1ib3gnO1xyXG4gICAgJGNvbnRlbnRfY2VsbC5pbnNlcnRCZWZvcmUoJHVzZXJfc2V0dGluZ3NfYm94LCAkY29udGVudF9jZWxsLmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgIC8v0YHQvtC30LTQsNC90LjQtSDQutC90L7Qv9C60Lgg0L/QvtC60LDQt9Cw0YLRjC/RgdC60YDRi9GC0Ywg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40LUg0L3QsNGB0YLRgNC+0LnQutC4XHJcbiAgICBsZXQgJHNldHRpbmdzX2J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgJHNldHRpbmdzX2J0bi5pbm5lckhUTUwgPSAn0J/QvtC60LDQt9Cw0YLRjC/RgdC60YDRi9GC0Ywg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40LUg0L3QsNGB0YLRgNC+0LnQutC4JztcclxuICAgICRzZXR0aW5nc19idG4uaWQgPSAnc2V0dGluZ3MtYnRuJztcclxuICAgICRzZXR0aW5nc19idG4udHlwZSA9ICdidXR0b24nO1xyXG5cclxuICAgICRzZXR0aW5nc19idG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJHVzZXJfc2V0dGluZ3NfYm94LmNsYXNzTGlzdC50b2dnbGUoJ2lzLW9wZW4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgICRjb250ZW50X2NlbGwuaW5zZXJ0QmVmb3JlKCRzZXR0aW5nc19idG4sICRjb250ZW50X2NlbGwuZmlyc3RDaGlsZCk7XHJcblxyXG4gICAgLy/RgdC+0LfQtNCw0L3QuNC1INC60LDRgdGC0L7QvNC90L7Qs9C+INGB0L/QuNGB0LrQsCDQv9GA0L7QtdC60YLQvtCyXHJcbiAgICAvL2lkYHMgYXJyYXlcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tMaXN0SFRNTCgpIHtcclxuICAgICAgICBpZighbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BhcmFtc191c2VyX3Byb2plY3RzJykpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGFyYW1zX3VzZXJfcHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShbXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmFtc191c2VyX3Byb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGFyYW1zX3VzZXJfcHJvamVjdHMnKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IFBST0pFQ1RTX0xJU1RfUEFSQU1TID0ge1xyXG4gICAgICAgICAgICAnaWQnOiAnY3VzdG9tLXByb2plY3QtbGlzdCcsXHJcbiAgICAgICAgICAgICd0aXRsZSc6ICfQodC+0LHRgdGC0LLQtdC90L3Ri9C5INGB0L/QuNGB0L7QuiDQv9GA0L7QtdC60YLQvtCyJyxcclxuICAgICAgICAgICAgJ3NvdXJjZSc6ICdwcm9qZWN0X2lkJyxcclxuICAgICAgICAgICAgJ3N0b3JhZ2UnOiBwYXJhbXNfdXNlcl9wcm9qZWN0cyxcclxuICAgICAgICAgICAgJ3N0b3JhZ2VfbmFtZSc6ICdwYXJhbXNfdXNlcl9wcm9qZWN0cydcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgJGN1c3RvbV9wcm9qZWN0c19saXN0ID0gY3JlYXRlSW5zZXJ0V29ya2Vyc1Byb2plY3RzTGlzdHMoUFJPSkVDVFNfTElTVF9QQVJBTVMpO1xyXG5cclxuICAgICAgICAkdXNlcl9zZXR0aW5nc19ib3guaW5zZXJ0QmVmb3JlKCRjdXN0b21fcHJvamVjdHNfbGlzdCwgJHVzZXJfc2V0dGluZ3NfYm94LmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgICAgICBoaWdobGlnaHRTZWxlY3RlZCgkY3VzdG9tX3Byb2plY3RzX2xpc3QsIHBhcmFtc191c2VyX3Byb2plY3RzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL9GB0L7Qt9C00LDQvdC40LUg0LrQsNGB0YLQvtC80L3QvtCz0L4g0YHQv9C40YHQutCwINC40YHQv9C+0LvQvdC40YLQtdC70LXQuVxyXG4gICAgLy9pZGBzIGFycmF5XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVXb3JrZXJzTGlzdEhUTUwoKSB7XHJcbiAgICAgICAgaWYoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYXJhbXNfdXNlcl93b3JrZXJzJykpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGFyYW1zX3VzZXJfd29ya2VycycsIEpTT04uc3RyaW5naWZ5KFtdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFyYW1zX3VzZXJfd29ya2VycyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BhcmFtc191c2VyX3dvcmtlcnMnKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IFdPUktFUlNfTElTVF9QQVJBTVMgPSB7XHJcbiAgICAgICAgICAgICdpZCc6ICdjdXN0b20td29ya2Vycy1saXN0JyxcclxuICAgICAgICAgICAgJ3RpdGxlJzogJ9Ch0L7QsdGB0YLQstC10L3QvdGL0Lkg0YHQv9C40YHQvtC6INC40YHQv9C+0LvQvdC40YLQtdC70LXQuScsXHJcbiAgICAgICAgICAgICdzb3VyY2UnOiAnaW50ZXJuYWxfd29ya2VyJyxcclxuICAgICAgICAgICAgJ3N0b3JhZ2UnOiBwYXJhbXNfdXNlcl93b3JrZXJzLFxyXG4gICAgICAgICAgICAnc3RvcmFnZV9uYW1lJzogJ3BhcmFtc191c2VyX3dvcmtlcnMnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0ICRjdXN0b21fd29ya2Vyc19saXN0ID0gY3JlYXRlSW5zZXJ0V29ya2Vyc1Byb2plY3RzTGlzdHMoV09SS0VSU19MSVNUX1BBUkFNUyk7XHJcblxyXG4gICAgICAgICR1c2VyX3NldHRpbmdzX2JveC5pbnNlcnRCZWZvcmUoJGN1c3RvbV93b3JrZXJzX2xpc3QsICR1c2VyX3NldHRpbmdzX2JveC5maXJzdENoaWxkKTtcclxuXHJcbiAgICAgICAgaGlnaGxpZ2h0U2VsZWN0ZWQoJGN1c3RvbV93b3JrZXJzX2xpc3QsIHBhcmFtc191c2VyX3dvcmtlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vINC/0L7QtNGB0LLQtdGC0LrQsCDRgdC+0YXRgNCw0L3QtdC90L3Ri9GFINCyINC90LDRgdGC0YDQvtC50LrQsNGFINGN0LvQtdC80LXQvdGC0L7QsiDRgdC/0LjRgdC60LBcclxuICAgIGZ1bmN0aW9uIGhpZ2hsaWdodFNlbGVjdGVkKGxpc3QsIHNldHRpbmdzKSB7XHJcbiAgICAgICAgaWYgKCFzZXR0aW5ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbm8nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5vZGU7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGxpc3QuY2hpbGROb2RlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBsaXN0LmNoaWxkTm9kZXNba2V5XTtcclxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmluZGV4T2Yobm9kZS5kYXRhc2V0LmlkKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQtNC+0LHQsNCy0LvQtdC90LjQtSDQutC90L7Qv9C+0Log0LLQutC70Y7Rh9C10L3QuNGPL9C+0YLQutC70Y7Rh9C10L3QuNGPINGA0LDQt9C90YvRhSDQvNC+0LTRg9C70LXQuVxyXG4gICAgbGV0IG9wdGlvbnNCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgb3B0aW9uc0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ3VzZXItbGlzdCcpO1xyXG5cclxuICAgIGxldCBzZXR0aW5nc190aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICBzZXR0aW5nc190aXRsZS50ZXh0Q29udGVudCA9ICfQntC/0YbQuNC4JztcclxuICAgIHNldHRpbmdzX3RpdGxlLmNsYXNzTGlzdC5hZGQoJ3VzZXItdGl0bGUnKTtcclxuXHJcbiAgICBvcHRpb25zQmxvY2suYXBwZW5kQ2hpbGQoc2V0dGluZ3NfdGl0bGUpO1xyXG5cclxuICAgIC8v0LTQvtCx0LDQstC70LXQvdC40LUg0L3QsNGB0YLRgNC+0LnQutC4IC0g0LLQutC7L9Cy0YvQutC7INCz0LXQvdC10YDQsNGG0LjQuCDQsdC70L7QutCwINGBINC/0L7QtNGB0YfQtdGC0L7QvCDQstGA0LXQvNC10L3QuCDRg9GH0LDRgdGC0L3QuNC60L7QsiDQt9Cw0LTQsNGH0LhcclxuICAgIGxldCBjb3VudFRpbWVCdG4gPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgY291bnRUaW1lQnRuLmlkID0gJ2NvdW50VGltZUJ0bic7XHJcbiAgICBjb3VudFRpbWVCdG4uY2xhc3NMaXN0LmFkZCgnYnRuLWZsYXQnLCdyb3ctaXRlbScpO1xyXG4gICAgY291bnRUaW1lQnRuLnRleHRDb250ZW50ID0gJ9Cf0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INCyINC30LDQtNCw0YfQtSAtINCS0LrQu9GO0YfQtdC9JztcclxuXHJcbiAgICBpZighbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dvcmtlci10aW1lLWNvdW50Jykpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd3b3JrZXItdGltZS1jb3VudCcsICd0cnVlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY291bnRUaW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgaWYodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpe1xyXG4gICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAn0J/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LIg0LfQsNC00LDRh9C1IC0g0JLQutC70Y7Rh9C10L0nO1xyXG4gICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd3b3JrZXItdGltZS1jb3VudCcsICd0cnVlJyk7XHJcbiAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gJ9Cf0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INCyINC30LDQtNCw0YfQtSAtINCS0YvQutC70Y7Rh9C10L0nO1xyXG4gICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd3b3JrZXItdGltZS1jb3VudCcsJ2ZhbHNlJyk7XHJcbiAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL9Cy0LrQu9GO0YfQuNGC0Ywv0L7RgtC60LvRjtGH0LjRgtGMINCz0LXQvdC10YDQsNGG0LjRjiDQsdC70L7QutCwINGBINC/0L7QtNGB0YfQtdGC0L7QsiDQstGA0LXQvNC10L3QuCDRg9GH0LDRgdGC0L3QuNC60L7QsiDQt9Cw0LTQsNGH0LhcclxuICAgIGZ1bmN0aW9uIGNoZWNrVGltZUNvdW50T3B0aW9uKCkge1xyXG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRUaW1lQnRuJyk7XHJcblxyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3b3JrZXItdGltZS1jb3VudCcpID09PSAndHJ1ZScpe1xyXG4gICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSAn0J/QvtC00YHRh9C10YIg0LLRgNC10LzQtdC90Lgg0LIg0LfQsNC00LDRh9C1IC0g0JLQutC70Y7Rh9C10L0nO1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gJ9Cf0L7QtNGB0YfQtdGCINCy0YDQtdC80LXQvdC4INCyINC30LDQtNCw0YfQtSAtINCS0YvQutC70Y7Rh9C10L0nO1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyovL9C00L7QsdCw0LLQu9C10L3QuNC1INC90LDRgdGC0YDQvtC50LrQuCAtINCy0LrQuy/QstGL0LrQuyDRg9Cy0LXQtNC+0LzQu9C10L3QuNC5INC+INC90L7QstC+0Lwg0LrQvtC80LzQtdC90YLQsNGA0LjQuCDQsiDQt9Cw0LTQsNGH0LVcclxuICAgIGxldCBjb21tZW50c1VwZGF0ZUJ0biA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBjb21tZW50c1VwZGF0ZUJ0bi5pZCA9ICdjb21tZW50c1VwZGF0ZUJ0bic7XHJcbiAgICBjb21tZW50c1VwZGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tZmxhdCcsJ3Jvdy1pdGVtJyk7XHJcbiAgICBjb21tZW50c1VwZGF0ZUJ0bi50ZXh0Q29udGVudCA9ICfQo9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLQsNGA0LjRj9GFIC0g0JLQutC70Y7Rh9C10L3Riyc7XHJcblxyXG4gICAgY29tbWVudHNVcGRhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKXtcclxuICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9ICfQo9Cy0LXQtNC+0LzQu9C10L3QuNGPINC+INC90L7QstGL0YUg0LrQvtC80LzQtdC90YLQsNGA0LjRj9GFIC0g0JLQutC70Y7Rh9C10L3Riyc7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb21tZW50cy11cGRhdGUnLCAndHJ1ZScpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gJ9Cj0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGP0YUgLSDQktGL0LrQu9GO0YfQtdC90YsnO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29tbWVudHMtdXBkYXRlJywnZmFsc2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL9Cy0LrQu9GO0YfQuNGC0Ywv0L7RgtC60LvRjtGH0LjRgtGMINGD0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtGA0LDQuNGP0YVcclxuICAgIC8v0L3QsCDQvtGC0LrRgNGL0YLQvtC5INGB0YLRgNCw0L3QuNGG0LUg0LfQsNC00LDRh9C4XHJcbiAgICBmdW5jdGlvbiBjaGVja0NvbW1lbnRzVXBkYXRlKCkge1xyXG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHNVcGRhdGVCdG4nKTtcclxuXHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvbW1lbnRzLXVwZGF0ZScpID09PSAndHJ1ZScpe1xyXG4gICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSAn0KPQstC10LTQvtC80LvQtdC90LjRjyDQviDQvdC+0LLRi9GFINC60L7QvNC80LXQvdGC0LDRgNC40Y/RhSAtINCS0LrQu9GO0YfQtdC90YsnO1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gJ9Cj0LLQtdC00L7QvNC70LXQvdC40Y8g0L4g0L3QvtCy0YvRhSDQutC+0LzQvNC10L3RgtCw0YDQuNGP0YUgLSDQktGL0LrQu9GO0YfQtdC90YsnO1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbiAgICBvcHRpb25zQmxvY2suYXBwZW5kQ2hpbGQoY291bnRUaW1lQnRuKTtcclxuICAgIC8vb3B0aW9uc0Jsb2NrLmFwcGVuZENoaWxkKGNvbW1lbnRzVXBkYXRlQnRuKTtcclxuXHJcbiAgICAkdXNlcl9zZXR0aW5nc19ib3guYXBwZW5kQ2hpbGQob3B0aW9uc0Jsb2NrKTtcclxuXHJcbiAgICAvL9C30LDQv9GD0YHQuiDQv9GA0L7QstC10YDQvtC6INCy0LrQu9GO0YfQtdC90L3Ri9GFL9C+0YLQutC70Y7Rh9C10L3QvdGL0YUg0L7Qv9GG0LjQuVxyXG4gICAgY2hlY2tUaW1lQ291bnRPcHRpb24oKTtcclxuICAgIC8vY2hlY2tDb21tZW50c1VwZGF0ZSgpO1xyXG5cclxuXHJcbiAgICBjcmVhdGVUYXNrTGlzdEhUTUwoKTtcclxuICAgIGNyZWF0ZVdvcmtlcnNMaXN0SFRNTCgpO1xyXG5cclxuICAgIGlmIChOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygnbG9hZCB1c2VyU2V0dGluZ3MnKTtcclxuICAgIH1cclxufVxyXG5cclxuLy/RgdC+0LfQtNCw0L3QuNC1INC4INC00L7QsdCw0LLQu9C10L3QuNC1INGB0L/QuNGB0LrQsCDRgNCw0LHQvtGC0L3QuNC60L7QsiDQuCDQv9GA0L7QtdC60YLQvtCyXHJcbmZ1bmN0aW9uIGNyZWF0ZUluc2VydFdvcmtlcnNQcm9qZWN0c0xpc3RzKHBhcmFtcykge1xyXG4gICAgbGV0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgbGlzdC5pZCA9IHBhcmFtcy5pZDtcclxuICAgIGxpc3QuY2xhc3NMaXN0LmFkZCgndXNlci1saXN0JywgJ2NsZWFyZml4Jyk7XHJcblxyXG4gICAgbGV0IGxpc3RfdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gICAgbGlzdF90aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMudGl0bGU7XHJcbiAgICBsaXN0X3RpdGxlLmNsYXNzTGlzdC5hZGQoJ3VzZXItdGl0bGUnKTtcclxuXHJcbiAgICBsaXN0LmFwcGVuZENoaWxkKGxpc3RfdGl0bGUpO1xyXG5cclxuICAgIGxldCBzb3VyY2VfbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmFtcy5zb3VyY2UpO1xyXG4gICAgbGV0IHNvdXJjZV9saXN0X2l0ZW1zID0gc291cmNlX2xpc3Qub3B0aW9ucztcclxuXHJcbiAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBsZXQgbGlzdF9pdGVtX3Byb3RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIGxldCBsaXN0X2l0ZW07XHJcblxyXG4gICAgT2JqZWN0LmtleXMoc291cmNlX2xpc3RfaXRlbXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGlmIChzb3VyY2VfbGlzdF9pdGVtc1trZXldLnZhbHVlIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaXN0X2l0ZW0gPSBsaXN0X2l0ZW1fcHJvdG8uY2xvbmVOb2RlKGZhbHNlKTtcclxuICAgICAgICBsaXN0X2l0ZW0uaW5uZXJIVE1MID0gc291cmNlX2xpc3RfaXRlbXNba2V5XS50ZXh0O1xyXG4gICAgICAgIGxpc3RfaXRlbS5kYXRhc2V0LmlkID0gc291cmNlX2xpc3RfaXRlbXNba2V5XS52YWx1ZTtcclxuICAgICAgICBsaXN0X2l0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNhdmVVc2VyU2V0dGluZ3MocGFyYW1zLnN0b3JhZ2UsIHRoaXMsIHBhcmFtcy5zdG9yYWdlX25hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChsaXN0X2l0ZW0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGlzdC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcblxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbi8v0YHQvtGF0YDQsNC90LXQvdC40LUg0L/QvtC70YzQt9C+0LLQsNC10YLQu9GM0YHQutC40YUg0L3QsNGB0YLRgNC+0LXQulxyXG4vL9C4INCy0YvQtNC10LvQtdC90LjQtSDRgdC+0YXRgNCw0L3QtdC90L3QvtCz0L4g0LIg0YHQv9C40YHQutCw0YUg0YDQsNCx0L7RgtC90LjQutC+0LIg0Lgg0L/RgNC+0LXQutGC0L7QslxyXG5mdW5jdGlvbiBzYXZlVXNlclNldHRpbmdzKG9wdGlvbnMsIGxpc3RfaXRlbSwgc3RvcmFnZV9pdGVtKSB7XHJcbiAgICBsZXQgaWQgPSBsaXN0X2l0ZW0uZGF0YXNldC5pZDtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5pbmRleE9mKGlkKSA9PT0gLTEpIHtcclxuICAgICAgICBvcHRpb25zLnB1c2goaWQpO1xyXG4gICAgICAgIGxpc3RfaXRlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaW5kZXggPSBvcHRpb25zLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIG9wdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBsaXN0X2l0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlX2l0ZW0sIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpKTtcclxuICAgIC8vY29uc29sZS5sb2coSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlX2l0ZW0pKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7dXNlclNldHRpbmdzfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91c2VyU2V0dGluZ3MuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QTs7Ozs7QUM3REE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM1REE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoV0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDeEZBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQy9JQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNUQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQy9VQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQy9EQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzVEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdFFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQy9hQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEhBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDeEpBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==