//подключение строннего js в head
export function addjs(url, callback) {
    let head = document.getElementsByTagName('head')[0];
    let s = document.createElement('script');
    s.onload = function () {
        callback();
    };
    s.src = url;
    head.appendChild(s);
}