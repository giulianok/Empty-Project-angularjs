/* jQuery Timeline plugin
|* by Giuliano Kranevitter
|* http://www.giulianok.com/projects/timeline
|* version: 1.0
|* updated: May 21, 2015
|*
|* Enjoy. */

;(function ($, window) {

    // kill for mobile devices
    var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    
    

    // Class (ECMAscript 6)
    class Timeline {

        constructor (node, options) {
            let self = this
            // Defaults
            let defaults = {
            };
            this.options = $.extend({}, defaults, options)
            this.node = $(node)
            this.content = this.node.find('.content')
            this.line = this.node.find('.line')
            this.actualScroll = 0

            new Resize().resizing = function () {
                setTimeout(function () {
                    self.isMobile = Modernizr.mq('(max-width: 500px)') ? true : false
                    self.init()
                }, 50)
            }

        }

        init () {
            let self = this

            this.distance()

            setTimeout(function () {
                self.showing()
                self.gyroscope()
            }, 100)
            
            // new Scroll().scrolling = function () {
            //     if( !self.showingInitied && this.scrollTop > self.node.offset().top - self.node.height() / 2 ){
            //         self.showingInitied = true
            //         self.showing()
            //     }
            // }

        }

        distance () {
            let self = this
            self.base = self.node.find('ul')
            self.time = self.base.find('li')

            let distance = 0;
            
            self.time.each(function (index) {
                let $this = $(this)
                let data = $this.data()
                let actualDistance = 0

                // if( self.isMobile && data.distanceMobile !== undefined && parseInt(data.distanceMobile) > 0 ) {
                //     actualDistance = parseInt(data.distanceMobile)
                // }else{
                //     if( data.distance !== undefined ){
                //         actualDistance = parseInt(data.distance)
                //     }
                // }

                if( self.isMobile && index > 0 ){
                    actualDistance = $(window).width() - 50
                }else{
                    if( data.distance !== undefined ){
                        actualDistance = parseInt(data.distance)
                    }
                }

                distance += actualDistance

                $this.css('left', distance)
                //$this.find('.info').width($(window).width() - 100)

                // if (index === self.time.length - 1) {
                //     $this.find('.info').width(300);
                // }

                if( data.distanceEnd !== undefined ){
                    distance += parseInt(data.distanceEnd)
                } 

                self.centerIcon($this)
            })

            self.base.width(distance)
            self.line.width(distance)
        }

        centerIcon (time) {
            let self = this
            let symbol = time.find('.symbol')
            let info = time.find('.info')
            let width = symbol.width()

            symbol.css('margin-left', 0 - width / 2)

            setTimeout(function () {
                let margin = width / 2
                margin = (self.isMobile) ? (-115) : margin
                info.height(symbol.outerHeight()).css('margin-left', margin)
            }, 100);
            
        }

        showing () {
            let self = this

            new Scroll(this.content).scrolling = function () {
                let i = 0;
                let pos = this.scrollLeft;
                let delay = 200
                let duration = 200

                self.time.each(function() {
                    let $this = $(this);

                    if ( $this.offset().left < (self.content.innerWidth() / 4) * 3 || self.content.scrollLeft()+self.content.width() > self.base.width() ) {
                        setTimeout(function() {
                            $this.addClass('visible');
                            setTimeout(function() {
                                //$this.removeClass('visible').removeClass('scroll-in-view');
                            }, 500);
                        }, 0);
                    }
                });
            }

            self.nav()

        }

        nav () {
            let self = this
            self.node.find('.arrow-slide').hover(function () {
                let $this = $(this)
                let direction = ($this.hasClass('prev')) ? 'left' : 'right'
                self.startMoving(direction)
            }, function () {
                self.stopMoving()
            })
        }

        startMoving (direction) {
            let self = this

            if( self.interv ){
                return
            }

            self.interv = setInterval(function () {
                let move = 1
                switch (direction) {
                    case "right":
                        self.content.scrollLeft( self.content.scrollLeft()+move )
                    break;
                    case "left":
                        self.content.scrollLeft( self.content.scrollLeft()-move )
                    break;
                }

            }, 3)
        }

        stopMoving () {
            let self = this
            if( self.interv ){
                clearInterval(self.interv)
                self.interv = null
            }
        }

        gyroscope () {
            let self = this
            if(window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', function(event) {
                    var alpha = event.alpha;
                    var beta = event.beta;
                    var gamma = event.gamma;
                    
                    if( gamma ){
                        gamma /= 3
                        if( gamma > 5 || gamma < -5 ){
                            self.content.scrollLeft( self.content.scrollLeft() + gamma )
                        }
                    }

                }, false);
            }
        }

    }


    // Create jQuery Plugin
    $.fn.timeline = function (options) {
        return this.each(function () {
            if (!$.data(this, 'timeline_instantiated')) { // Let's only run one
                $.data(this, 'timeline_instantiated', 
                new Timeline(this, options));
            }
        });
    }

})(jQuery, window);