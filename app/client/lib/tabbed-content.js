
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

    var mouseDown = false;
    var isDragging = false;
    var startX = 0;
    var startY = 0;
    var wrapperPos = 0;
    var wrapper = this;
    var currentTab = 1;


    var distanceX = 0;
    var distanceY = 0;

    var tabHeight = 60;

    this.find( '.' + settings.pageClass ).each(function() {
      var page = $( this );

      if (settings.addCSS) {
        var contentHeight = $(document).height() - tabHeight;
        page
          .css('float', 'left')
          .css('overflowX', 'hidden')
          .css('overflowY', 'hidden')
          .css('position', 'relative')
          .css('width', Math.floor(100 / settings.numPages) + '%')
          .css('height', contentHeight + 'px')
        ;
        $('form.modal').css('height', contentHeight + 'px');
      }
    });

    this
      .on('touchstart', function(e) {
        isDragging = false;
        mouseDown = true;
        startX = e.originalEvent.touches[0].pageX;
        startY = e.originalEvent.touches[0].pageY;
      })

      .on('touchmove', function(e) {

        if (mouseDown) {
          isDragging = true;
          distanceX = startX - e.originalEvent.touches[0].pageX;
          distanceY = startY - e.originalEvent.touches[0].pageY;

          if( Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > settings.minDistance) {
            var transform = wrapperPos + distanceX * -1;

            if ( (currentTab === 1 && transform > 0) || (currentTab === settings.numPages && transform < 0) ) {

              transform = Math.floor(wrapperPos + (distanceX / 6) * -1 );
            }
            wrapper.css('transform', 'translateX(' + transform + 'px)');
          }
        }

      })

      .on('touchend', function() {
        
        mouseDown = false;
        if (isDragging) {  

          if( Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > settings.minDistance) {
          
            if (distanceX > 0 && currentTab < settings.numPages) {
              currentTab++;
            }
            else if (distanceX < 0 && currentTab > 1) {
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

      var transform = '-' + widthTmp * (currentTab - 1);
      wrapper.css('transform', 'translateX(' + transform + '%)');

      wrapperPos = browserWidth * (currentTab - 1) * -1;

      $(settings.tabIndicator).css('left', (widthTmp * (currentTab - 1)) + '%');
    }

    return this;
  };

}( jQuery ));