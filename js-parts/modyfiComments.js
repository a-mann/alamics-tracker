

//поиск ссылок в тексте комментариев и оборачивание их в <a>
//сворачивание длинных комментариев, добавление кнопки Свренуть.развернуть все
modules.modyfiComments = function () {
    'use strict';
    function replaceURLWithHTMLLinks(text) {
        const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(exp, '<a href="$1" class="regular-link">$1</a>');
    }

    let $content_cell = document.getElementById('main-content');
    let div, txt;
    let rows = getAllCommentsRows();
    let collapse_btn;
    let collapse_btns = [];

    addjs('https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.3.1/markdown-it.min.js', function () {
        goMarkdown(rows);
    });

    for (let i = 0; i < rows.length; i++) {
        div = getCommentFromRow(rows[i]);
        txt = replaceURLWithHTMLLinks(div.innerHTML);
        div.innerHTML = txt;
        // collapse_btn = addCollapseButton(div);
        //
        // if (collapse_btn) {
        //     collapse_btn.addEventListener('click', function (e) {
        //         collapseComment(this);
        //         e.preventDefault();
        //     });
        //     collapse_btns.push(collapse_btn);
        // }
    }

    //добавить кнопку свернуть/развернуть все каменты
    // if (!!document.querySelector('.comment-collapsed')) {
    //     collapse_btn = document.createElement('BUTTON');
    //     collapse_btn.type = 'button';
    //     collapse_btn.tabindex = '-1';
    //     collapse_btn.innerHTML = 'Развернуть все';
    //     collapse_btn.classList.add('btn-collapse-all', 'is-close');
    //     collapse_btn.addEventListener('click', function (e) {
    //         collapseAllComment(this);
    //         e.preventDefault();
    //     });
    //     $content_cell.appendChild(collapse_btn);
    // }

    //добавить кнопку свернуть/развернуть к каменту
    function addCollapseButton(el) {
        let collapse_btn;

        if (el.offsetHeight > 200) {
            let wrap = document.createElement('DIV');
            wrap.classList.add('comment-collapsed', 'long-comment');

            collapse_btn = document.createElement('BUTTON');
            collapse_btn.type = 'button';
            collapse_btn.tabindex = '-1';
            collapse_btn.innerHTML = 'Развернуть';
            collapse_btn.classList.add('btn-collapse', 'foo-collapse', 'is-close');
            el.parentNode.appendChild(wrap);
            wrap.appendChild(collapse_btn);
            wrap.appendChild(el);
        }

        return collapse_btn;
    }

    function collapseComment(el, state) {

        //el - node || nodeList
        //state - string || check contains class is-close
        state = state || el.classList.contains('is-close');

        if (Array.isArray(el)) {

            for (let i = 0; i < el.length; i++) {
                if (state === 'expand') {
                    setExpand(el[i]);
                    continue;
                }
                setCollapse(el[i]);
            }
        } else {
            if (state) {
                setExpand(el);
            } else {
                setCollapse(el);
            }
        }

        function setExpand(el) {
            el.classList.remove('is-close');
            el.innerHTML = 'Свернуть';
            el.parentNode.classList.remove('comment-collapsed');
        }

        function setCollapse(el) {
            el.classList.add('is-close');
            el.innerHTML = 'Развернуть';
            el.parentNode.classList.add('comment-collapsed')
        }
    }

    function collapseAllComment(btn) {
        if (btn.classList.contains('is-close')) {
            btn.classList.remove('is-close');
            btn.innerHTML = 'Свернуть все';

            collapseComment(collapse_btns, 'expand');

        } else {
            btn.classList.add('is-close');
            btn.innerHTML = 'Развернуть все';

            collapseComment(collapse_btns, 'collapse');
        }
    }

    //парсер markdown
    function goMarkdown(rows) {

        let md = w.markdownit();
        md.options.html = true;
        md.options.linkify = true;
        md.options.typographer = true;
        //md.options.breaks = true;

        rows.map(function (row) {
            addMarkdown(row, md)
        });

        function addMarkdown(row, md) {
            let comment = getCommentFromRow(row);
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
                    item.trim();
                    //+'<br>' нужно чтобы было похоже на исходное форматирование
                    item = renderMdString(item, md)+'<br>';
                }

                return item;
            });

            //очистка пустых строк
            //string = string.replace(/^\s+|\s+$/g, '');

            comment.innerHTML = blocks.join('');
        }

        function renderMdString(str,md) {
            let mdc = ['#', '*', '-', '>'];

            if (mdc.indexOf(str.charAt(0)) > -1) {
                str = md.render(str);
            }else{
                //+'<br>' нужно чтобы было похоже на исходное форматирование
                str = str+'<br>';
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
                console.log(symbol);
                //console.log((str.match(/\n/g)||[]).length);
                //str = str.replace(/\n/g, '<br>');
                //console.log(str);
                str = '<p>' + str + '</p>'
        }

        return str + space;
    }
};