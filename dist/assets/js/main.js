// 移动端适配
var dpr, rem, scale,
    docEl = document.documentElement,
    fontEl = document.createElement('style'),
    metaEl = document.querySelector('meta[name="viewport"]'),
    dpr = window.devicePixelRatio || 1;

    rem = docEl.clientWidth * dpr / 10;
    scale = 1 / dpr;

metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no');
docEl.setAttribute('data-dpr', dpr);
docEl.firstElementChild.appendChild(fontEl);
docEl.firstElementChild.appendChild(metaEl);
fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

// 弹窗
var layer = (function () {
    var Layer = function () {
        this.lock= false;
    }, string = "";

    Layer.hide = function () {
        $('.layer').animate({
            opacity: 0  
        }, 300, 'ease-out', function () {
            $('.layer').css('display', 'none'); 
        });
    };

    Layer.show = function () {
        $('.layer').css({opacity: 0, display: 'block'});
        $('.layer').animate({
            opacity: 1  
        }, 300, 'ease-in');
    };

    Layer.init = function (logo, option, callback) {
        if (option.length == 1) {
            string = '<div class="' + option[0].className + '">' + option[0].value + '</div>';
        } else {
            string = '';
            option.forEach(function (ele, i) {
                string += '<div class="' + ele.className + '">' + ele.value + '</div>';
            });
        }   
        $('.layer .btn').html(string);
        $('.box .boxLogo').css('background-image', logo);
        this.show();
        callback();
        return this;
    };

    return Layer;
})();