
(function ( $ ) {

  $.fn.tabbedContent = function(options) {

    // set default options.
    var settings = $.extend({

      menuElements: 'header.main li a',
      tabIndicator: '.tab-indicator',
      pageClass: 'page',
      addCSS: true,
      numPages: 4,
      minDistance: 10,

    }, options );

    var _this = this;

    var mouseDown = false;
    var isDragging = false;
    var startX = 0;
    var wrapperPos = 0;
    var wrapper = this;
    var currentTab = 1;


    var distance = 0;

    this.find( '.' + settings.pageClass ).each(function() {
      var page = $( this );

      if (settings.addCSS) {
        page
          .css('float', 'left')
          .css('overflowX', 'hidden')
          .css('overflowY', 'auto')
          .css('position', 'relative')
          .css('width', Math.floor(100 / settings.numPages) + '%')
          .css('height', '580px') // todo
        ;
      }
    });

    this
      .on('touchstart', function(e) {
        isDragging = false;
        mouseDown = true;
        startX = e.originalEvent.touches[0].pageX;
      })

      .on('touchmove', function(e) {

        if (mouseDown) {
          isDragging = true;
          distance = startX - e.originalEvent.touches[0].pageX;

          if( Math.abs(distance) > settings.minDistance) {
            var transform = wrapperPos + distance * -1;

            if ( (currentTab === 1 && transform > 0) || (currentTab === settings.numPages && transform < 0) ) {

              transform = Math.floor(wrapperPos + (distance / 6) * -1 );
            }
            wrapper.css('transform', 'translateX(' + transform + 'px)');
          }
        }

      })

      .on('touchend', function() {
        
        mouseDown = false;
        if (isDragging) {  
          var transform = '0';

          if( Math.abs(distance) > settings.minDistance) {
          
            if (distance > 0 && currentTab < settings.numPages) {
              currentTab++;
            }
            else if (distance < 0 && currentTab > 1) {
              currentTab--;
            }

            goToCurrentTab();

          }

          // it's actually a click event
          else {
            this.click();
          }
        }
      });



    $(settings.menuElements).each(function(index, element) {
      
      $(element)
        .data('tab', index + 1)
        .on('click', function(e) {
          e.preventDefault();
          currentTab = $(this).data('tab');
          goToCurrentTab(); 
        }
      );

    });

    var goToCurrentTab = function() {
      var widthTmp = Math.floor(100 / settings.numPages);
      var browserWidth = $(document).width();

      transform = '-' + widthTmp * (currentTab - 1);
      wrapper.css('transform', 'translateX(' + transform + '%)');

      wrapperPos = browserWidth * (currentTab - 1) * -1;

      $(settings.tabIndicator).css('left', (widthTmp * (currentTab - 1)) + '%');
    }

    return this;
  };

}( jQuery ));