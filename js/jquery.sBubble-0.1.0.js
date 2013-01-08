(function ($) {
    var Bubble = function (elm, options) {
        var self = this,
            setPosTimeout = null;

        self.$elm = $(elm);
        self.opts = options;
        self.$box = $('<div class="sBubble"></div>').html(options.content)
                                               .addClass(options.position + ' ' + options.theme);
        self.$arw = $('<div class="sBubbleArw"> </div>').addClass(options.position + ' ' + options.theme);


        $(window).resize(function () {
            clearTimeout(setPosTimeout);
            setPosTimeout = setTimeout(self.setPosition, 100);
        });


        self.$box.css({
                display: 'none',
                height: options.height + 'px',
                width : options.width + 'px'
            })
            .appendTo('body');


        self.$arw.css('display', 'none')
            .appendTo('body');


        //position the tooltip
        self.setPosition();


        self.$elm.hover(
            function () {
                self.$box.css('display', 'block');
                self.$arw.css('display', 'block');

                setTimeout(function () {
                    self.$box.addClass('visible');
                    self.$arw.addClass('visible');
                }, 50);
            },
            function () {
                self.$box.removeClass('visible');
                self.$arw.removeClass('visible');

                setTimeout(function () {
                    self.$box.css('display', 'none');
                    self.$arw.css('display', 'none');
                }, 100);
            }
        );

    }; //end Bubble


    Bubble.prototype.getPos = function (obj) {
        var curleft = curtop = 0;

        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }

        return {
            left: curleft,
            top: curtop
        };
    }; //end getPos


    Bubble.prototype.getBoxArwPos = function () {
        var self = this,
            elmPos = self.getPos(self.$elm[0]),
            pos = {
                top    : self.opts.topOffset,
                arwTop : 0,
                left   : self.opts.leftOffset,
                arwLeft: 0
            },
            elmOuterHeight = self.$elm.outerHeight(),
            elmOuterWidth = self.$elm.outerWidth(),
            boxOuterHeight = self.$box.outerHeight(),
            boxOuterWidth = self.$box.outerWidth(),
            arwOuterHeight = self.$arw.outerHeight(),
            arwOuterWidth = self.$arw.outerWidth();

        if (self.opts.position === 'top' || self.opts.position === 'bottom') {
            pos.left += elmPos.left + (elmOuterWidth - boxOuterWidth) / 2;
            pos.arwLeft = pos.left + (boxOuterWidth - arwOuterWidth) / 2;
        }

        if (self.opts.position === 'left' || self.opts.position === 'right') {
            pos.top += elmPos.top + (elmOuterHeight - boxOuterHeight) / 2;
            pos.arwTop = pos.top + (boxOuterHeight - arwOuterHeight) / 2;
        }

        if (self.opts.position === 'top') {
            pos.top += elmPos.top - boxOuterHeight - arwOuterHeight;
            pos.arwTop = pos.top + boxOuterHeight;
        } else if (self.opts.position === 'bottom') {
            pos.top += elmPos.top + elmOuterHeight + arwOuterHeight;
            pos.arwTop = pos.top - arwOuterHeight;
        } else if (self.opts.position === 'left') {
            pos.left += elmPos.left - boxOuterWidth - arwOuterWidth;
            pos.arwLeft = pos.left + boxOuterWidth;
        } else if (self.opts.position === 'right') {
            pos.left += elmPos.left + elmOuterWidth + arwOuterWidth;
            pos.arwLeft = pos.left - arwOuterWidth;
        }

        return pos;
    }; //end getBoxArwPos


    Bubble.prototype.setPosition = function () {
        var self = this,
            pos = self.getBoxArwPos();

        self.$box.css({
            top   : pos.top + 'px',
            left  : pos.left + 'px'
        });

        self.$arw.css({
            top  : pos.arwTop + 'px',
            left : pos.arwLeft + 'px'
        });
    }; //end setPosition


    $.fn.sBubble = function (options) {

        options = $.extend({
            content    : '',
            width      : 120,
            height     : 60,
            leftOffset : 0,
            topOffset  : 0,
            position   : 'top',
            theme      : 'black'
        }, options);


        return this.each(function () {
            (new Bubble(this, options));
        });


    }; //end $.fn.sBubble

}(jQuery));
