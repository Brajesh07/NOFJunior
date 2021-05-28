{
    const body = document.body;
    const docEl = document.documentElement;

    const lineEq = (y2, y1, x2, x1, currentVal) => {
        // y = mx + b 
        var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
        return m * currentVal + b;
    };

    const lerp = (a,b,n) => (1 - n) * a + n * b;
    
    const distance = (x1,x2,y1,y2) => {
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.hypot(a,b);
    };
    
    const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) 	{
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { x : posx, y : posy }
    }
    
    let winsize;
    const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
    calcWinsize();
    window.addEventListener('resize', calcWinsize);

    const feDisplacementMapEl = document.querySelector('feDisplacementMap');

    class Menu {
        constructor() {
            this.DOM = {
                svg: document.querySelector('svg.distort'),
                menu: document.querySelector('blockquote.quote')
            };
            this.DOM.imgs = [...this.DOM.svg.querySelectorAll('g > image')];
            this.DOM.menuLinks = [...this.DOM.menu.querySelectorAll('.quote__link')];
            this.mousePos = {x: winsize.width/2, y: winsize.height/2};
            this.lastMousePos = {
                translation: {x: winsize.width/2, y: winsize.height/2},
                displacement: {x: 0, y: 0}
            };
            this.dmScale = 0;

            this.current = -1;
            
            this.initEvents();
            requestAnimationFrame(() => this.render());
        }
        initEvents() {
            window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));

            this.DOM.menuLinks.forEach((item, pos) => {
                charming(item);
                const letters = [...item.querySelectorAll('span')];

                const mouseenterFn = () => {
                    this.current = pos;
                    TweenMax.to(this.DOM.imgs[this.current], 0.5, {
                        ease: Quad.easeOut, 
                        opacity: 1
                    });
                    
                    TweenMax.staggerTo(letters, 0.2, {
                        ease: Sine.easeInOut,
                        y: this.lastMousePos.translation.x < this.mousePos.x ? 30 : -30,
                        startAt: {opacity: 1, y: 0},
                        opacity: 0,
                        yoyo: true,
                        yoyoEase: Expo.easeOut,
                        repeat: 1,
                        stagger: {
                            grid: [1,letters.length-1],
                            from: this.lastMousePos.translation.x < this.mousePos.x ? 'start' : 'end',
                            amount: 0.12
                        }
                    });
                };
                const mouseleaveFn = () => {
                    TweenMax.to(this.DOM.imgs[this.current], 0.5, {ease: Quad.easeOut, opacity: 0});
                };
                item.addEventListener('mouseenter', mouseenterFn);
                item.addEventListener('mouseleave', mouseleaveFn);
            });
        }
        render() {
            this.lastMousePos.translation.x = lerp(this.lastMousePos.translation.x, this.mousePos.x, 0.15);
            this.lastMousePos.translation.y = lerp(this.lastMousePos.translation.y, this.mousePos.y, 0.15);
            this.DOM.svg.style.transform = `translateX(${(this.lastMousePos.translation.x-winsize.width/2)}px) translateY(${this.lastMousePos.translation.y-winsize.height/2}px)`;
            
            // Scale goes from 0 to 50 for mouseDistance values between 0 to 100
            this.lastMousePos.displacement.x = lerp(this.lastMousePos.displacement.x, this.mousePos.x, 0.07);
            this.lastMousePos.displacement.y = lerp(this.lastMousePos.displacement.y, this.mousePos.y, 0.07);
            const mouseDistance = distance(this.lastMousePos.displacement.x, this.mousePos.x, this.lastMousePos.displacement.y, this.mousePos.y);
            this.dmScale = Math.min(lineEq(50, 0, 100, 0, mouseDistance), 50);   
            feDisplacementMapEl.scale.baseVal = this.dmScale;

            requestAnimationFrame(() => this.render());
        }
    }

    new Menu();
}

/*! topbar 0.1.3, 2014-12-09
 *  http://buunguyen.github.io/topbar
 *  Copyright (c) 2014 Buu Nguyen
 *  Licensed under the MIT License */
;(function(window, document) {
    'use strict'
    
    // https://gist.github.com/paulirish/1579671
    ;(function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    var canvas, progressTimerId, fadeTimerId, currentProgress, showing,
        addEvent = function(elem, type, handler) {
            if (elem.addEventListener) elem.addEventListener(type, handler, false)
            else if (elem.attachEvent) elem.attachEvent('on' + type, handler)
            else                       elem['on' + type] = handler
        },
        options = {
            autoRun      : true,
            barThickness : 3,
            barColors    : {
                '0'      : 'rgba(26,  188, 156, .9)',
                '.25'    : 'rgba(52,  152, 219, .9)',
                '.50'    : 'rgba(241, 196, 15,  .9)',
                '.75'    : 'rgba(230, 126, 34,  .9)',
                '1.0'    : 'rgba(211, 84,  0,   .9)'
            },
            shadowBlur   : 10,
            shadowColor  : 'rgba(0,   0,   0,   .6)'
        },
        repaint = function() {
            canvas.width = window.innerWidth
            canvas.height = options.barThickness * 5 // need space for shadow

            var ctx = canvas.getContext('2d')
            ctx.shadowBlur = options.shadowBlur
            ctx.shadowColor = options.shadowColor

            var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
            for (var stop in options.barColors)
                lineGradient.addColorStop(stop, options.barColors[stop])
            ctx.lineWidth = options.barThickness
            ctx.beginPath()
            ctx.moveTo(0, options.barThickness/2)
            ctx.lineTo(Math.ceil(currentProgress * canvas.width), options.barThickness/2)
            ctx.strokeStyle = lineGradient
            ctx.stroke()
        },
        createCanvas = function() {
            canvas = document.createElement('canvas')
            var style = canvas.style
            style.position = 'fixed'
            style.top = style.left = style.right = style.margin = style.padding = 0
            style.zIndex = 100001
            style.display = 'none'
            document.body.appendChild(canvas)
            addEvent(window, 'resize', repaint)
        },
        topbar = {
            config: function(opts) {
                for (var key in opts)
                    if (options.hasOwnProperty(key))
                        options[key] = opts[key]
            },
            show: function() {
                if (showing) return
                showing = true
                if (fadeTimerId !== null)
                    window.cancelAnimationFrame(fadeTimerId) 
                if (!canvas) createCanvas()
                canvas.style.opacity = 1
                canvas.style.display = 'block'
                topbar.progress(0)
                if (options.autoRun) {
                    (function loop() {
                        progressTimerId = window.requestAnimationFrame(loop)
                        topbar.progress('+' + (.05 * Math.pow(1-Math.sqrt(currentProgress), 2)))
                    })()
                }
            },
            progress: function(to) {
                if (typeof to === "undefined")
                    return currentProgress
                if (typeof to === "string") {
                    to = (to.indexOf('+') >= 0 || to.indexOf('-') >= 0 ? currentProgress : 0) + parseFloat(to)
                }
                currentProgress = to > 1 ? 1 : to
                repaint()
                return currentProgress
            },
            hide: function() {
                if (!showing) return
                showing = false
                if (progressTimerId != null) {
                    window.cancelAnimationFrame(progressTimerId)
                    progressTimerId = null
                }
                (function loop() {
                    if (topbar.progress('+.1') >= 1) {
                        canvas.style.opacity -= .05
                        if (canvas.style.opacity <= .05) {
                            canvas.style.display = 'none'
                            fadeTimerId = null
                            return
                        } 
                    }
                    fadeTimerId = window.requestAnimationFrame(loop)
                })()
            }
        }

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = topbar
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return topbar })
    } else {
        this.topbar = topbar
    }
}).call(this, window, document)