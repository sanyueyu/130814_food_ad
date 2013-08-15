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
            left: $("#fcue_contentA .area").offset().left-100,
            wrap_div: '#fcue_contentA'
        },
        small_flash : {           //回收的flash
            src: "happyad.swf",
            name: "ad_food_samll",
            width: 100,
            height:55,
            link: null,//连接地址
            id: "ad_food_small",//div的ID
            top: 340,
            left:800,
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
            "position": "relative" ,
            "z-index": 1005,
            "background": "none"
        });
        $("#fcue_contentA .area .square02").hide();
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
        loadFlash(opt.big_flash);
        $("#ad_food").show();
        $("#ad_food_small").empty().hide();
    }
    function hide() {
        $("#fcue_contentA .area").css({
            "background": 'url("http://i3.itc.cn/20130718/2d3c_45684fa7_34d8_45ab_18ca_295baa34bedb_1.png")'
        });
        $("#fcue_contentA .area .square02").show();
        loadFlash(opt.small_flash);
        $("#ad_food").empty().hide();
        $("#ad_food_small").show();
    }
    function control() {
        var temp = true;
        if(sohuvd.vi == 0) {
            $(window).scroll(function() {
               if($(document).scrollTop() >= 650 && temp) {
                   show();
                   sohuvd.vi++;
                   sohuvd.store();
                   temp = false;
               }
            });
        } else {
            hide();
        }
    }
    return {
        init: init
    };
})(jQuery);
var settings = null;
qitiantian.init(settings);