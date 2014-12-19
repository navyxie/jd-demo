/**
 * Created by SDX on 2014/7/22.
 * vision:1.0
 * title:
 * e-mail:jrshenduxian@jd.com
 */


//各个页面动画效果
var animate = {
    canAnimate: getMoveStyle()[1],
    moveStyle: getMoveStyle()[0],
    page1: {
        $sun: $("#page1Sun"),
        $gold: $("#page1Gold"),
        spritePlayer: null,
        play: function () {
            var _this = animate.page1;
            if (animate.canAnimate) {
                _this.$sun.addClass("sunrise");
            } else {
                _this.$sun.css("top", "35px").stop().animate({
                    top: "0px"
                }, {duration: 1000, easing: "easeOutBounce"});
            }
            if (!_this.spritePlayer)_this.spritePlayer = new SpritePlayer({
                spriteObj: _this.$gold,
                spriteWidth: 121,
                totalSpriteNum: 26,
                delay: {
                    "sprite-1": 800,
                    "sprite-13": 800
                }
            })
            _this.spritePlayer.play();
        },
        reset: function () {
            var _this = animate.page1;
            if (!animate.canAnimate) {
                _this.$sun.css("top", "35px");
            } else {
                _this.$sun.removeClass("sunrise");
            }
            if (_this.spritePlayer)_this.spritePlayer.destroy();
        }
    },
    page2: {
        $star: $("#page2Stars"),//.children(".star"),
        $cloud: $("#page2Clouds"),
        $sun: $("#page2Sun"),
        $sky: $("#page2Sky"),
        $gold: $("#page2Gold"),
        $beat: $("#page2Beat"),
        $input: $("#page2Input"),
        timeLine: null,
        totalTime: 7000,
        stepMap: {
            "t-0": ["starRise", "sunFall"],
            "t-2700": ["starFall", "sunRise", "nightToDay"],
            "t-3000": ["throwGold"],
            "t-3200": ["beat"],
            "t-3400": ["beatHide"],
            "t-4000": ["sunLaugh"],
            "t-4800": ["sunClam"],
            "t-5500": ["sunLaugh"],
            "t-6300": ["sunClam"],
            "t-7000": ["dayToNight"]
        },
        play: function () {
            var _this = animate.page2;
            if (!_this.timeLine)_this.timeLine = new TimeLine({
                obj: _this,
                stepMap: _this.stepMap,
                totalTime: _this.totalTime
            });
            var lastValue = $.trim(_this.$input.val()) || "10000";
            _this.$input.val("").focus().val(lastValue);
            _this.reset();
            _this.timeLine.init();
        },
        throwGold: function () {
            var _this = animate.page2;
            if (animate.canAnimate) {
                _this.$gold.show().addClass("throwGold");
            } else {
                _this.$gold.show().animate({
                    left: "910px",
                    top: "210px"
                }, {duration: 175, easing: "easeInQuad"}).animate({
                    left: "1110px",
                    top: "160px"
                }, {duration: 250, easing: "easeInQuad"}).animate({
                    left: "1310",
                    top: "230px"
                }, {duration: 250, easing: "linear"})
            }
        },
        sunLaugh: function () {
            var _this = animate.page2;
            _this.$sun.addClass("sunLaugh");
        },
        sunClam: function () {
            var _this = animate.page2;
            _this.$sun.removeClass("sunLaugh");
        },
        beat: function () {
            var _this = animate.page2;
            _this.$beat.show();
        },
        beatHide: function () {
            var _this = animate.page2;
            _this.$beat.hide();
        },
        starRise: function () { //星星升起
            var _this = animate.page2;
            _this.$star.stop().animate({
                top: "0"
            }, {duration: 700, easing: "easeOutQuad"});
        },
        starFall: function () {
            var _this = animate.page2;
            _this.$star.animate({
                top: "100%"
            }, {duration: 700, easing: "easeInQuad"});
        },
        sunRise: function () {
            var _this = animate.page2;
            _this.$sun.stop().animate({
                "top": "28px"
            }, {duration: 1000, easing: "easeOutBack"});
        },
        sunFall: function () {
            var _this = animate.page2;
            _this.$sun.animate({
                "top": "169px"
            }, {duration: 1000, easing: "easeInQuad"});
        },
        dayToNight: function () {
            var _this = animate.page2;
            _this.$cloud.animate({
                left: "-20%",
                opacity: 0
            }, {duration: 500, easing: "easeInQuad"});
            _this.$sky.css("backgroundColor", "#386c93").removeClass("nightToDay").addClass("dayToNight");
        },
        nightToDay: function () {
            var _this = animate.page2;
            _this.$cloud.animate({
                left: "0",
                opacity: 1
            }, {duration: 1000, easing: "easeOutQuad"});
            _this.$sky.css("backgroundColor", "#a1d6e9").removeClass("dayToNight").addClass("nightToDay");
            _this.$gold.hide().removeClass("throwGold").css({"left": "820px", "top": "185px"});
        },
        reset: function () {
            var _this = animate.page2;
            _this.timeLine.destroy();
            _this.$star.stop().css("top", "100%");
            _this.$gold.stop().hide().removeClass("throwGold").css({"left": "820px", "top": "185px"});
            _this.$beat.hide();
            _this.$sun.stop().css("top", "169px").removeClass("sunLaugh");
            _this.$cloud.stop().css({"opacity": "0", "left": "-20%"});
            _this.$sky.stop().css("backgroundColor", "#386c93").removeClass("nightToDay").removeClass("dayToNight");
        }
    },
    page3: {
        $cloud: $("#page3Cloud"),
        $rightHand: $("#page3RightHand"),
        $light: $("#page3Light"),
        $stars: $("#page3Stars"),
        $boy: $("#page3BoyHolder").children(".boy"),
        $cloth: $("#page3Cloth"),
        $money: $("#page3Money"),
        currentCloth: 1,
        totalCloth: 4,
        cloudTimer: null,
        timeLine: null,
        totalTime: 3500,
        stepMap: {
            "t-200": ["handClick"],
            "t-400": ["changeCloth", "moneyFly"],
            "t-500": ["changeBoy"],
            "t-1000": ["clearLight"]
        },
        play: function () {
            var _this = animate.page3;
            if (!_this.timeLine)_this.timeLine = new TimeLine({
                obj: _this,
                stepMap: _this.stepMap,
                totalTime: _this.totalTime
            });
            _this.reset().cloudFloat();
            _this.timeLine.init();
        },
        cloudFloat: function () {
            var _this = animate.page3;
            _this.$cloud.addClass("cloudFloat");
            if (!animate.canAnimate) {
                var n = 0;
                _this.cloudTimer = setInterval(function () {
                    n++;
                    _this.$cloud.css("backgroundPosition", n + "px 50%");
                    if (n >= 1920)n = 0;
                }, 30)
            }
        },
        handClick: function () {
            var _this = animate.page3;
            if (animate.canAnimate) {
                _this.$rightHand.addClass("handClick");
            } else {
                _this.$rightHand.animate({top: 255}, 300).animate({top: 248}, 300);
            }
        },
        moneyFly: function () {
            var _this = animate.page3;
            _this.$money.css({"left": "1250px", "top": "285px", "opacity": 0}).animate({
                opacity: 1,
                left: 1340,
                top: 215
            }, {duration: 800, easing: "easeInQuad"}).animate({
                opacity: 1,
                left: 1500,
                top: 0
            }, 2000).animate({
                opacity: 0
            }, 500)
        },
        changeCloth: function () {
            var _this = animate.page3;
            if (animate.canAnimate) {
                _this.$stars.show();
            } else {
                _this.$stars.show().animate({
                    opacity: 1
                }, 300);
            }
            _this.$light.show().animate({
                opacity: 0.8
            }, 300);
            _this.$cloth.animate({
                left: _this.currentCloth * -125 + "px"
            }, 300, function () {
                _this.currentCloth++;
                if (_this.currentCloth > _this.totalCloth) {
                    _this.currentCloth = 1;
                    _this.$cloth.css("left", "0");
                }
            })
        },
        changeBoy: function () {
            var _this = animate.page3;
            var currentCloth = _this.currentCloth - 1;
            var targetCloth = _this.currentCloth >= _this.totalCloth ? 0 : _this.currentCloth;
            _this.$boy.eq(currentCloth).animate({
                opacity: 0
            }, 500)
            _this.$boy.show().eq(targetCloth).animate({
                opacity: 1
            }, 500)
        },
        clearLight: function () {
            var _this = animate.page3;
            if (animate.canAnimate) {
                _this.$stars.hide();
                _this.$rightHand.removeClass("handClick");
            } else {
                _this.$stars.animate({
                    opacity: 0
                }, 300);
            }
            _this.$light.animate({
                opacity: 0
            }, 500);
        },
        reset: function () {
            var _this = animate.page3;
            clearInterval(_this.cloudTimer);
            _this.currentCloth = 1;
            _this.$cloud.stop().css("backgroundPosition", "0px 50%");
            _this.$rightHand.stop().removeClass("handClick");
            _this.$cloth.stop().css("left", "0");
            _this.$boy.stop().attr("style", "");
            _this.$money.stop().css({"left": "1250px", "top": "285px", "opacity": 0});
            _this.$stars.hide().css("opacity", 0);
            _this.$light.hide().css("opacity", 0);
            if (_this.timeLine)_this.timeLine.destroy();
            return _this;
        }
    },
    page4: {
        $arrowHolder: $("#page4ArrowHolder"),
        $crash: $("#page4Crash"),
        $arrowStatic: $("#page4ArrowStatic"),
        $cloudBig: $("#page4CloudBig"),
        $cloudSmall: $("#page4CloudSmall"),
        $gold: $("#page4Gold"),
        arrowTimer: null,
        currentType: "small",
        spritePlayer: null,
        arrowStart: {
            "big": ["870px", "140px"],
            "small": ["970px", "155px"]
        },
        step1Target: {
            "big": ["-85px", "110px"],
            "small": ["-185px", "80px"]
        },
        step2Target: {
            "big": 100,
            "small": 0
        },
        timeLine: null,
        totalTime: 2000,
        stepMap: {
            "t-0": ["openMouth", "shootArrow"],
            "t-200": ["shootArrow"],
            "t-600": ["closeMouth"]
        },
        play: function () {
            var _this = animate.page4;
            if (animate.canAnimate) {
                if (!_this.timeLine)_this.timeLine = new TimeLine({
                    obj: _this,
                    stepMap: _this.stepMap,
                    totalTime: _this.totalTime
                });
                _this.reset();
                _this.timeLine.init();
            } else {
                _this.$arrowStatic.show();
            }

            if (!_this.spritePlayer)_this.spritePlayer = new SpritePlayer({
                spriteObj: _this.$gold,
                spriteWidth: 91,
                totalSpriteNum: 26,
                delay: {
                    "sprite-1": 800,
                    "sprite-13": 800
                }
            })
            _this.spritePlayer.play();
        },
        openMouth: function () {
            var _this = animate.page4;
            _this.currentType = _this.currentType == "big" ? "small" : "big";
            if (_this.currentType == "big") {
                _this.$cloudBig.addClass("cloud-big-open");
            } else {
                _this.$cloudSmall.addClass("cloud-small-open");
            }
            return _this;
        },
        closeMouth: function () {
            var _this = animate.page4;
            _this.$cloudBig.removeClass("cloud-big-open");
            _this.$cloudSmall.removeClass("cloud-small-open");
        },
        shootArrow: function () {
            var _this = animate.page4;
            _this.createArrow(_this.currentType);
        },
        createArrow: function (type) {
            var _this = animate.page4;
            var disX = getRandom(-150, 60);
            var disY = getRandom(-10, 40);
            var disRotate = getRandom(-30, 30);
            var arrowTarget = {
                "step1": [_this.step1Target[type][0], _this.step1Target[type][1], "-45deg", "0px"],
                "step2": [_this.step2Target[type] + disX + "px", 300 + disY + "px", 545 + disRotate + "deg", "-105px"],
                "step3": [ _this.step2Target[type] + disX + "px", 300 + disY + "px", 545 + disRotate + "deg", "-210px"]
            }
            new Arrow({
                type: type,
                arrowStart: _this.arrowStart,
                arrowTarget: arrowTarget,
                $arrowHolder: _this.$arrowHolder,
                $crash: _this.$crash,
                moveStyle: animate.moveStyle
            });
        },
        reset: function () {
            var _this = animate.page4;
            _this.$arrowHolder.html("");
            _this.$arrowStatic.hide();
            _this.closeMouth();
            if (_this.timeLine)_this.timeLine.destroy();
            if (_this.spritePlayer)_this.spritePlayer.destroy();
        }
    },
    page5: {
        $sun: $("#page5Sun"),
        $goldHolder: $("#page5GoldHolder"),
        $goldFront: $("#page5GoldFront"),
        $goldBack: $("#page5GoldBack"),
        $light: $("#page5Light"),
        timeLine: null,
        totalTime: 5000,
        stepMap: {
            "t-0": ["goldFall", "sunJump"],
            "t-2000": [ "goldUp"],
            "t-2500": ["goldDown"],
            "t-4500": ["clearGold"]
        },
        play: function () {
            var _this = animate.page5;
            if (!_this.timeLine) {
                _this.timeLine = new TimeLine({
                    obj: _this,
                    stepMap: _this.stepMap,
                    totalTime: _this.totalTime
                });
            }
            _this.reset();
            _this.timeLine.init();
        },
        goldFall: function () {
            var _this = animate.page5;
            var _h = $(window).height();
            for (var i = 0; i < 88; i++) {
                _this.createGold(_h);
            }
        },
        sunJump: function () {
            var _this = animate.page5;
            if (animate.canAnimate) {
                _this.$sun.addClass("sunJump");
            } else {
                _this.$sun.stop().animate({bottom: "-20px"}, 300).animate({
                    bottom: "0px"
                }, {duration: 1000, easing: "easeOutBounce"});
            }
        },
        goldUp: function () {
            var _this = animate.page5;
            _this.$goldFront.css(animate.moveStyle, "translate3D(3px," + -3 + "px,0px)");
            _this.$goldBack.css(animate.moveStyle, "translate3D(-3px," + 3 + "px,0px)");
        },
        goldDown: function () {
            var _this = animate.page5;
            _this.$goldFront.css(animate.moveStyle, "translate3D(0px,0px,0px)");
            _this.$goldBack.css(animate.moveStyle, "translate3D(0px,0px,0px)");
        },
        createGold: function (holderHeight) {
            var _this = animate.page5;
            var _w = getRandom(40, 90);
            var _l = getRandom(5, 95);
            var lag = getRandom(50, 2000);
            var target = getRandom(holderHeight * 1.5, holderHeight * 2);
            var $gold = $('<img class="gold" src="/resources/xjk/images/page5-gold.png" />');
            $gold.css({"top": "-100px", "left": _l + "%", "width": _w + "px"});
            _this.$goldHolder.append($gold);
            setTimeout(function () {
                if (animate.canAnimate) {
                    $gold.css(animate.moveStyle, "translate3D(0px," + target + "px,0px)");
                } else {
                    $gold.animate({
                        "top": target
                    }, 2000)
                }
            }, lag)
        },
        clearGold: function () {
            var _this = animate.page5;
            _this.$goldHolder.html("");
            _this.$sun.removeClass("sunJump");
        },
        reset: function () {
            var _this = animate.page5;
            _this.$goldHolder.html("");
            _this.$sun.stop().removeClass("sunJump");
            if (_this.timeLine)_this.timeLine.destroy();
        }
    }
}

//页面滚动切换控制
var pageControl = {
    currentPage: 0, //当前页
    targetPage: 0,    //目标页
    stage: "",            //主舞台
    stageLayer: "",     //每一页
    stageNum: 0,        //页数
    pageHeight: 0,      //每页高度
    scrolling: false,         //是否滚动中
    canAnimate: "false",
    moveStyle: "absolute",
    resizeTimer: null,
    init: function (num) {
        var _this = pageControl;
        _this.stage = $("#stage");
        _this.stageLayer = $(".stage-layer");
        _this.stageNum = _this.stageLayer.length;
        _this.slideItem = $(".slideItem");
        _this.backtopBtn = _this.slideItem.eq(-1);
        _this.fastBuyHolder = $("#fastBuyHolder");
        var _check = getMoveStyle();
        _this.moveStyle = _check[0];
        _this.canAnimate = _check[1];
        _this.bindEvent();
        pageAdapt($("body"), 100);
        _this.pageHeight = pageAdapt(_this.stageLayer, 100);
        animate.page1.play();
        var num = num || 0;
        _this.scrollTo(num);
    },
    bindEvent: function () {
        var _this = pageControl;
        $(window).bind("resize", function () {
            clearTimeout(_this.resizeTimer);
            _this.resizeTimer = setTimeout(function () {
                _this.pageHeight = pageAdapt(_this.stageLayer, 100);
                pageAdapt($("body"), 100);
                _this.scrollTo(_this.currentPage, true);
            }, 200)
        });

        $(document)
            .bind("mousewheel", function (event) {
                event.preventDefault();
                if (!_this.scrolling) {
                    if (event.deltaY > 0) {        //向上滚动
                        _this.targetPage = Math.max(0, _this.currentPage - 1);
                    } else {                                //向下滚动
                        _this.targetPage = Math.min(_this.stageNum - 1, _this.currentPage + 1);
                    }
                    _this.scrollTo(_this.targetPage);
                }
            })
            .bind("keydown", function (e) {
                if (!_this.scrolling) {
                    switch (e.keyCode) {
                        case 38://向上
                            _this.targetPage = Math.max(0, _this.currentPage - 1);
                            _this.scrollTo(_this.targetPage);
                            break;
                        case  40: //向下
                            _this.targetPage = Math.min(_this.stageNum - 1, _this.currentPage + 1);
                            _this.scrollTo(_this.targetPage);
                            break;
                    }
                }
                if (e.keyCode == 38 || e.keyCode == 40) {
                    e.preventDefault();
                    return false;
                }
            })

        _this.slideItem.bind("click", function () {
            if (!_this.scrolling) {
                var target = $(this).attr("data-target") | 0;
                $(this).addClass("current").siblings().removeClass("current");
                _this.targetPage = target;
                _this.scrollTo(target);
            }
        });
    },
    scrollTo: function (target, haveTo) {
        var _this = pageControl;
        if (_this.currentPage != target || (haveTo && target != 0)) { //目标页不是当前页 或者 resize归位且不是第一页时
            _this.slideItem.eq(target).addClass("current").siblings().removeClass("current");
            if (target == 0) {
                _this.backtopBtn.stop().animate({
                    opacity: 0
                }, 300, function () {
                	_this.fastBuyHolder.hide();
                });
                _this.fastBuyHolder.stop().animate({
                    opacity: 0
                }, 300, function () {
                    _this.backtopBtn.hide();
                });


            } else {
                _this.backtopBtn.show().stop().animate({
                    opacity: 1
                }, 300);
                _this.fastBuyHolder.show().stop().animate({
                    opacity: 1
                }, 300)
            }
            _this.scrolling = true;
            _this.stageLayer.children().show();
            if (target == 4)animate["page5"].play();    //金币页特殊处理
            _this.pageScroll(target, function () {
                _this.scrolling = false;
                if (!haveTo && animate["page" + (_this.currentPage + 1)])animate["page" + (_this.currentPage + 1)].reset();
                _this.currentPage = target;
                if (!haveTo && target != 4 && animate["page" + (_this.currentPage + 1)])animate["page" + (_this.currentPage + 1)].play();
                if (!haveTo)_this.stageLayer.eq(_this.currentPage).siblings().children().hide();
            });
            var $header = $(".header");
            if (target == 0) {//第一页
                $header.stop().animate({"top": "0px"}, 500)
            } else {
                if (parseInt($header.css("top")) == 0)$(".header").stop().animate({"top": "-100px"}, 500);
            }
        }
    },
    pageScroll: function (target, callback) {
        var _this = pageControl;
        var targetTop = target * _this.pageHeight;
        if (!_this.canAnimate) {
            _this.stage.animate({
                "top": -targetTop + "px"
            }, {duration: 1000, easing: "easeOutQuad", complete: function () {
                callback && callback();
            }})
        } else {
            _this.stage.css(_this.moveStyle, "translate3D(0px," + -targetTop + "px,0px)");
            setTimeout(function () {
                callback && callback();
            }, 1300);
        }
    }
}

/**
 * 开始
 */
$(function () {
    //页面控制
    pageControl.init();
    /*
     * 底部推荐位数据调用 by dqc 2014/9/25
     * */
    (function(){
        var $promoteCon = $('#page7ProList');
        var postJson = {
            juicerTpl :
                '{@each data as item}'
                +'<li>'
                +'<div class="pro-bottom-shadow"></div>'
                +'<div class="pro-holder">'
                +'<div class="imgHolder"><img src="${item.imgUrl}" alt=""/></div>'
                +'<div class="pro-info">'
                +'<h6 class="pro-title">${item.title}</h6>'
                +'<div class="pro-info-left fl">'
                +'<p class="info-top size24 orange font-bold"><span class="font-en">${item.benefit_value}</span>{@if item.itemType==200}%{@else}元{@/if}</p>'
                +'<p class="info-bottom size12">${item.benefit_name}</p>'
                +'</div>'
                +'<div class="pro-info-right fl">'
                +'<p class="info-top size16 font-bold">￥<span class="font-en">${item.mininvestAmount}</span></p>'
                +'<p class="info-bottom size12">起购金额</p>'
                +'</div>'
                +'</div>'
                +'<div class="pro-tag">{@if item.sku_source=="fund"}基金理财{@else}{@/if}</div>'
                +'<a class="link-mask" href="${item.toUrl}"></a>'
                +'</div>'
                +'</li>'
                +'{@/each}',
            reqParam: {
                dataType: 1,
                batchNum: 1,
                batchCount: 4,
                area_id: 1,
                ad_id: 18
            },
            sendLog: true,
            success: function(html){
                $promoteCon.html(html);
                //page7hover
                var $item = $promoteCon.children("li");
                $item.bind("mouseenter", function () {
                    $(this).find(".link-mask").show();
                }).bind("mouseleave", function () {
                    $(this).find(".link-mask").hide();
                })
            }
        };
        new getPromote(postJson);
    })();
    //侧边栏二维码展开
    (function () {
        var $ercodeHolder = $("#ercodeHolder");
        var $ercode = $ercodeHolder.children("div");
        $ercodeHolder.bind("mouseenter", function () {
            $ercode.stop().css("opacity", 1).show();
        }).bind("mouseleave", function () {
            $ercode.stop().animate({
                opacity: 0
            }, 300, function () {
                $ercode.hide();
            });
        })
    })();

    //底部栏目滑出
    (function () {
        var footerShow = false;
        var $footer = $(".f-copyright")
        var footH = $footer.outerHeight();
        $("#footerBtn").bind("mouseenter", function () {
            footerShow = true;
            $footer.css({"position": "absolute", "bottom": -footH + "px", "top": ""}).stop().animate({
                "bottom": 0
            }, 300)
        })
        $footer.bind("mouseleave", function () {
            $footer.stop().animate({
                "bottom": -footH + "px"
            }, 300)
        });
    })();

    //page1的小金库滑板

    //page6切换
    (function () {
        var $Tag = $("#page6NavBar").children("li");
        var $conts = $("#page6NavCont").children(".cont");
        var $floatSign = $("#page6FloatSign");
        changeTag($Tag, $conts, "current", "mouseenter", function ($tag) {
            var _left = $tag.index() * 280 + 60;
            $floatSign.stop().animate({
                "left": _left
            }, {duration: 300, easing: "easeOutBack"})
        })
    })();

})

function scrollBoard() {
        var $scrollHolder = $(".scroll-holder");
        var scrollSpeed = 500;
        var $leftBtn = $scrollHolder.siblings(".prev-btn");
        var $rightBtn = $scrollHolder.siblings(".next-btn");
        var $scrollBoard = $scrollHolder.children("ul");
        var $scrollItem = $scrollBoard.children("li");
        var scrollItemWidth = $scrollItem.eq(0).outerWidth();
        var scrollWidth = scrollItemWidth * ($scrollItem.length);
        $scrollBoard.html($scrollBoard.html() + $scrollBoard.html());
        $scrollBoard.css("left", -scrollWidth + "px");
        var currentLeft = -scrollWidth;
        var isScroll = false;
        $leftBtn.bind("click", function () {
            if (!isScroll) {
                move("left");
            }
        })

        $rightBtn.bind("click", function () {
            if (!isScroll) {
                move("right");
            }
        })

        function move(type) {
            isScroll = true;
            switch (type) {
                case "left":
                    currentLeft += scrollItemWidth;
                    var endFn = function () {
                        isScroll = false;
                        if (currentLeft == 0) {
                            currentLeft = -scrollWidth;
                            $scrollBoard.css("left", -scrollWidth + "px");
                        }
                    }
                    break;
                case "right":
                    currentLeft -= scrollItemWidth;
                    var endFn = function () {
                        isScroll = false;
                        if (Math.abs(currentLeft) >= Math.abs((scrollWidth * 2 - scrollItemWidth))) {
                            currentLeft += scrollWidth;
                            $scrollBoard.css("left", currentLeft + "px");
                        }
                    }
                    break;
            }
            $scrollBoard.animate({
                left: currentLeft + "px"
            }, scrollSpeed, endFn)
        }
    }

Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var cofferCent = 0.0;
function showJuejinBenefit() {
	var time = new Date();
    time.setTime(time.getTime() - 24 * 3600 * 1000 * 10);
    var date = time.Format("yyyy-MM-dd");
    
	$.ajax({
			url:"http://tu.jr.jd.com/service/fundHistoryIndexBoth/000581,000569?t=0&time=" + date, 
	        type: "GET",
	        dataType: "jsonp",
	        success:function(series) { 
	        	var columns1 = series[0].data;
	        	var amountLatest1 = new Number(columns1[columns1.length-1][1]).toFixed(4);
	        	var columns2 = series[2].data;
	        	var amountLatest2 = new Number(columns2[columns2.length-1][1]).toFixed(4);
	        	
	        	var series1 = series[1].data;
	        	var benefitLatest1 = new Number(series1[series1.length-1][1]).toFixed(4);
	        	
	        	var series2 = series[3].data;
	        	var benefitLatest2 = new Number(series2[series2.length-1][1]).toFixed(4);

                var maxBenefitLastest = benefitLatest1 >= benefitLatest2 ? benefitLatest1 : benefitLatest2;
                calcuteBenefit(maxBenefitLastest);
                $("#maxBenefitLatestEm").html(maxBenefitLastest);
	        	if(amountLatest1 >= amountLatest2){
	        		$("#jjone-1").html(amountLatest1);
	        	}else{
	        		$("#jjone-1").html(amountLatest2);
	        	}
	        	
	        	$("#js2").html(amountLatest1);
	        	$("#ph2").html(amountLatest2);
	        	
	        	scrollBoard();
	        }
	    });
}
$(document).ready(function(){
	showJuejinBenefit();
});

function calcuteBenefit(cofferCent) {
    var hqRate = $("#hqRate").html();
    var dqRate = $("#dqRate").html();
    hqRate = (parseFloat( hqRate ) / 100).toFixed( 4 );
    dqRate = (parseFloat( dqRate ) / 100).toFixed( 4 );
    var incomeCent = {
        coffer: cofferCent/10000,
        hq: hqRate / 365,
        dq: dqRate / 365
    }
    var $input = $("#page2Input");
    var $resultSpan = $("#resultBoard").find("span");
    var $calculateBtn = $("#calculateBtn");
    refreshResult(10000);
    $calculateBtn.bind("click", function () {
        var inputVal = $input.val().replace(/[\s\,]/g, "");
        refreshResult(inputVal);
    })
    function refreshResult(inputVal) {
        $resultSpan.each(function () {
            var type = $(this).attr("data-name");
            var _html = getResult(inputVal, incomeCent[type]);
            $(this).html(_html);
        })
    }

    function getResult(val, cent) {
        var _html = "";
        if (/^\d+$/g.test(parseInt(val))) {
            _html = (val * cent).toFixed(2);
        } else {
            _html = "--,--"
        }
        return _html;
    }
};

function getPromote(arg){
    this.arg = arg;
    this.reqUrl = "http://x.jr.jd.com/flow/bid";
    this._init();
}
getPromote.prototype = {
    _init : function(){
        var _this = this;
        _this.requestData();
    },
    requestData: function(){
        var _this = this;
        _this.arg.loadingTips && _this.arg.loadingTips();
        $.ajax({
            url: _this.reqUrl,
            type: 'get',
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                unifiedParams: JSON.stringify(_this.arg.reqParam)
            },
            success: function(data, index){
                if(data.success == '1'){
                    _this.dataAnalyze(data);
                    if(_this.arg.sendLog){
                        _this.sendLog(data.data);
                    }
                }
            },
            error: function(){
            }
        });
    },
    dataAnalyze: function(data, index){
        var _this = this;
        var html = juicer(_this.arg.juicerTpl, data);
        _this.arg.success(html);
    },
    sendLog: function(data) {
        for(var i = 0; i < data.length; i++){
            var img = new Image();
            var src = data[i].logPath;
            img.setAttribute('src', src);
        }
    }
};
if(typeof JSON!=='object'){JSON={};}
(function(){'use strict';function f(n){return n<10?'0'+n:n;}
    if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
        f(this.getUTCMonth()+1)+'-'+
        f(this.getUTCDate())+'T'+
        f(this.getUTCHours())+':'+
        f(this.getUTCMinutes())+':'+
        f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf();};}
    var cx,escapable,gap,indent,meta,rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
    function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
        if(typeof rep==='function'){value=rep.call(holder,key,value);}
        switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
            gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
                v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
            if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
            v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
    if(typeof JSON.stringify!=='function'){escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
        rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
        return str('',{'':value});};}
    if(typeof JSON.parse!=='function'){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
        return reviver.call(holder,key,value);}
        text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
            ('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
        if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
        throw new SyntaxError('JSON.parse');};}}());

