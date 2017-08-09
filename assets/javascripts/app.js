/**
 * Created by Administrator on 2017/6/14.
 */
// “()()”表示自执行函数
(function (doc, win) {
    var docEl = doc.documentElement,
        // 手机旋转事件,大部分手机浏览器都支持 onorientationchange 如果不支持，可以使用原始的 resize
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            //clientWidth: 获取对象可见内容的宽度，不包括滚动条，不包括边框
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 12 * (clientWidth / 320) + 'px';
        };
    recalc();
    //判断是否支持监听事件 ，不支持则停止
    if (!doc.addEventListener) return;
    //注册翻转事件
    win.addEventListener(resizeEvt, recalc, false);

})(document, window);

function selectmenu(n) {
    var eleMore = document.getElementById("menu_" + n);
    if (eleMore.style.display == "none") {
        eleMore.style.display = 'block';
        $('.pinch-zoom').each(function () {
            new RTP.PinchZoom($(this), {});
        });
        $("#cell_" + n).removeClass("icon-74");
        $("#cell_" + n).addClass("icon-35 ");
    } else {
        eleMore.style.display = 'none';
        $("#cell_" + n).removeClass("icon-35");
        $("#cell_" + n).addClass("icon-74");
    }
}


function showtime() {
    var d = parseInt(t / 3600 / 24) * 24;
    var h = parseInt((t % (3600 * 24)) / 3600) + d;
    if (h < 10) {
        h = "0" + h;
    }
    var m = parseInt((t % (3600 * 24)) % 3600 / 60);
    if (m < 10) {
        m = "0" + m;
    }
    var s = parseInt((t % (3600 * 24)) % 60);
    if (s < 10) {
        s = "0" + s;
    }

    var b = '<span>' + h + ' </span>时';
    var c = '<span>' + m + ' </span>分';
    var d = '<span>' + s + ' </span>秒';
    $('.countdown').html(b + c + d);
    t = t - 1;
}

function getCode(event) {
    var countdown = 60;
    var _this = $(event);
    //设置button效果，开始计时
    _this.attr("disabled", "true").css("background", "#f2f2f2");
    _this.val(countdown + " s后重新发送");
    //启动计时器，1秒执行一次
    var timer = '';
    timer = setInterval(function () {
        if (countdown == 0) {
            clearInterval(timer);        //清除计时器
            _this.removeAttr("disabled").css("background", "#dddddd"); //启用按钮
            _this.val("发送验证码");
        }
        else {
            countdown--;
            _this.val(countdown + " s后重新发送");
        }
    }, 1000);


}

/*抽屉*/
function sideNav(id) {
    new IScroll('#' + id, {mouseWheel: false, click: true, scrollbars: false});
    var nav = $('#' + id);
    nav.before("<div class='nav-bg'></div>");
    var bg = $('.nav-bg');
    var showNav = function () {
        $("body").addClass("none-scroll");
        bg.css({
            display: "block",
            transition: "opacity .5s"
        });
        nav.css({
            right: "0px",
            transition: "right 0.5s"
        });
    };
    var hideNav = function () {
        $("body").removeClass("none-scroll");
        nav.css({
            right: "-80%",
            transition: "right .5s"
        });

        bg.remove();
    };
    showNav();
    $('#' + id + ' li a').tap(function () {
        $('#' + id + ' li a').removeClass("active");
        $(this).addClass("active");
        hideNav();
    });
    bg.on('click', function () {
        hideNav();
    });
};