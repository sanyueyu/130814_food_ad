var qitiantian = (function($) {
    var defaults = {
        big_flash : {      //扩展的flash
            src: "happyad.swf",
            name: "ad_food",
            width: 1150,
            height:585,
            link: null,//连接地址
            id: "ad_food",//div的ID
            top: 0,
            left: -100,
            wrap_div: '#fcue_contentA .area'
        },
        small_flash : {           //回收的flash
            src: "happyad.swf",
            name: "ad_food_samll",
            width: 100,
            height:55,
            link: null,//连接地址
            id: "ad_food_small",//div的ID
            top: 340,
            left:798,
            wrap_div: '#fcue_contentA .area'
        }
        },
    opt,
    sohuvd = new Cookie(document, "ad_food",24);
    function loadFlash (flash) {//加载flash
        var sohuFlash2 = new sohuFlash(flash.src, flash.name, flash.width, flash.height,"7");
        sohuFlash2.addParam("quality", "high");
        sohuFlash2.addParam("wmode", "transparent");
        sohuFlash2.addParam("allowScriptAccess", "always");
        sohuFlash2.addVariable("clickthru",escape(flash.link));
        sohuFlash2.write(flash.id);
        return this;
    }
    function createDIV(flash) {
        $('<div id = ' + flash.id + '></div>').css({
            position: 'absolute',
            'z-index': 1000,
            'width': flash.width,
            'height': flash.height,
            left: flash.left,
            top: flash.top
        }).appendTo(flash.wrap_div).hide();
    }
    function init(options) {        //初始化
        opt = $.extend(true,defaults, options);
        $("#fcue_contentA .area").css({
            "position": "relative"
        });
        $("#sohuplayer").css({
            "position": "relative" ,
            "z-index": 1001
        });
        createDIV(opt.big_flash);//大flash容器
        createDIV(opt.small_flash);//小flash容器
        $("#ad_food_small").css("z-index", 1005);
        sohuvd.load();//加载cookie
        sohuvd.vi = sohuvd.vi || 0;
        control();
    }
    function show() {
        $("#ad_food").show();
        $("#ad_food_small").empty().hide();
    }
    function hide() {
        loadFlash(opt.small_flash);
        $("#ad_food").empty().hide();
        $("#ad_food_small").show();
    }
    function control() {
        var temp = true;
        if(sohuvd.vi == 0) {
            $(window).scroll(function() {
               if($(document).scrollTop() >= 650 && temp) {
                   loadFlash(opt.big_flash);
                   setTimeout(show, 1000);
                   sohuvd.vi++;
                   sohuvd.store();
                   temp = false;
               }
            });
        } else {
            hide();
        }
        $("#ad_food_small").bind("mouseover",  function() {
            loadFlash(opt.big_flash);
            setTimeout(show, 1000);
        }) ;
        window.zhu = {};
        zhu.close = function() {
            hide();
        }
    }
    return {
        init: init
    };
})(jQuery);
//这个是投放代码
var ad_settings = {};
ad_settings.big_flash = {
    src:"http://images.sohu.com/bill/s2013/tiantianqi/haixin/11505850815.swf",
    link:"http://clk.optaim.com/event.ng/Type=click&FlightID=201308&TargetID=sohu&Values=ee606231,beef938e,30bf6db4,21378426&AdID=3669125"
};
ad_settings.small_flash = {
    src:"http://images.sohu.com/bill/s2013/tiantianqi/haixin/100550815.swf"
    // link:null
};
qitiantian.init(ad_settings);