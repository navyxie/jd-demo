/**
 * Created by SDX on 2014/7/22.
 * vision:1.0
 * title:
 * e-mail:jrshenduxian@jd.com
 */


/**
 * 获取animation和transform的支持
 * getMoveStyle
 */

function getMoveStyle() {
    var moveStyle = ["absolute", false], testDiv = document.createElement("div");
    if ("oninput" in testDiv) {
        ["", "moz", "ms", "webkit"].forEach(function (prefix) {
            var Animation = prefix + (prefix ? "A" : "a") + "nimation";
            var transform = prefix + (prefix ? "T" : "t") + "ransform";

            if (Animation in testDiv.style) {
                moveStyle[1] = true;
            }
            if (transform in testDiv.style) {
                moveStyle[0] = transform;
            }
        });
    }
    return moveStyle;
}


/**
 * 滚屏页高度自适应
 * @obj：需要自适应的对象
 * @minHeight：对象最小的高度
 */
function pageAdapt(obj, minHeight) {
    var winHeight = $(window).height();
    var targetHeight = Math.max(minHeight, winHeight);
    obj.each(function () {
        $(this).css("height", targetHeight + "px");
    })
    return targetHeight;
}

/**
 * 模拟时间轴
 */
function TimeLine(settings) {
    this.obj = settings.obj;
    this.stepMap = settings.stepMap;
    this.currentTime = 0;
    this.totalTime = settings.totalTime;
    this.loop = settings.loop;
    this.timer = null;
}
TimeLine.prototype = {
    init: function () {
        var _this = this;
        if (this.loop == undefined)this.loop = true;
        _this.timer = setInterval(function () {
            var currentList = _this.stepMap["t-" + _this.currentTime];
            if (currentList) {
                for (var i = 0; i < currentList.length; i++) {
                    _this.obj[currentList[i]]();
                }
            }
            _this.currentTime += 100;

            if (_this.currentTime > _this.totalTime) {
                if (_this.loop) {
                    _this.currentTime = 0;
                } else {
                    _this.destroy();
                }
            }
        }, 100)
    },
    destroy: function () {
        clearInterval(this.timer);
        this.currentTime = 0;
    }
}


/**
 * 精灵图动画播放器
 */
function SpritePlayer(settings) {
    this.spriteObj = settings.spriteObj;
    this.spriteWidth = settings.spriteWidth;
    this.totalSpriteNum = settings.totalSpriteNum;
    this.delay = settings.delay || {};
    this.playTimer = null;
}

SpritePlayer.prototype = {
    play: function () {
        var _this = this;
        var currentSprite = 0;
        var currentLeft = 0;
        spritePlay();
        function spritePlay() {
            currentSprite++;
            currentLeft -= _this.spriteWidth;
            if (currentSprite >= _this.totalSpriteNum) {
                currentSprite = 0;
                currentLeft = 0;
            }
            _this.spriteObj.css("backgroundPosition", currentLeft + "px 0px");
            var delayTime = _this.delay["sprite-" + currentSprite] || 30;

            _this.playTimer = setTimeout(function () {
                spritePlay();
            }, delayTime)
        }

    },
    destroy: function () {
        clearTimeout(this.playTimer);
    }
}


/**
 * 箭矢
 */
function Arrow(settings) {
    this.type = settings.type || "big";
    this.rotate = settings.rotate || {"big": "-45deg", "small": "-25deg"};
    this.arrowStart = settings.arrowStart;
    this.arrowTarget = settings.arrowTarget;
    this.$arrowHolder = settings.$arrowHolder;
    this.moveStyle = settings.moveStyle || getMoveStyle()[0];
    this.$crash = settings.$crash;
    this.timeLine = null;
    this.arrow = null;
    this.currentStep = 0;
    this.init();
}

Arrow.prototype = {
    init: function () {
        this.stepMap = {
            "t-0": ["create"],
            "t-100": ["shoot"],
            "t-400": ["crash", "shoot"],
            "t-600": ["crashHide"],
            "t-700": ["shoot"],
            "t-3800": ["arrowHide"],
            "t-4000": ["destroy"]
        }
        this.timeLine = new TimeLine({
            obj: this,
            stepMap: this.stepMap,
            totalTime: 4000,
            loop: false
        })
        this.timeLine.init();
    },
    create: function () {
        var _this = this;
        var arrow = $('<div class="arrow shootArrow"></div>');
        arrow.css({"left": _this.arrowStart[_this.type][0], "top": _this.arrowStart[_this.type][1]});
        arrow.css(_this.moveStyle, "translate(0px,0px)  rotate(" + _this.rotate[_this.type] + ")");
        _this.$arrowHolder.append(arrow);
        _this.arrow = arrow;
    },
    crash: function () {
        this.$crash.show();
    },
    crashHide: function () {
        this.$crash.hide();
    },
    shoot: function () {
        this.currentStep++;
        var step = this.currentStep;
        var disX = this.arrowTarget["step" + step][0];
        var disY = this.arrowTarget["step" + step][1];
        var disRotate = this.arrowTarget["step" + step][2];
        var bkgPositionX = this.arrowTarget["step" + step][3];
        this.arrow.css(this.moveStyle, "translate(" + disX + "," + disY + ")  rotate(" + disRotate + ")");
        this.arrow.css("backgroundPosition", bkgPositionX + " 50%");
    },
    arrowHide: function () {
        var _this = this;
        _this.arrow.css("opacity", 0);
    },
    destroy: function () {
        this.arrow.remove();
    }
}


/**
 * 获取随机数
 */
function getRandom(min, max) {
    var num = Math.random() * (max - min) + min | 0;
    return num;
}

/**
 * 选项卡切换
 * @param $Tag              导航标签
 * @param $conts           内容区
 * @param checkClass    选中标签的class
 * @param type              点击还是划过
 * @param fn                  选中后执行fn
 */

function changeTag($Tag, $conts, checkClass, type, fn) {
    $Tag.each(function (index) {
        $(this).bind(type, function () {
            $Tag.removeClass(checkClass);
            $conts.hide();
            $(this).addClass(checkClass);
            $conts.eq(index).show();
            if (fn) {
                fn($(this))
            }
        })
    });
}





