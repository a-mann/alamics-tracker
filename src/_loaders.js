//подключение строннего js в head
export function addjs(url, callback, params) {
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