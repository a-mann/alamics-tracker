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

export {anchorLink};