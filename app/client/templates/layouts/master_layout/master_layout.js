Template.MasterLayout.events({
  'click header.main a': function(e) {
    e.preventDefault();
    var mainWrapper = $('.main-wrapper');
    var tabIndicator = $('.tab-indicator');
    var currentTab = $(e.currentTarget).data('tab');
    var browserWidth = $(document).width();

    Session.set('currentTab', currentTab);

    if (currentTab === 1) {
      mainWrapper.animate({
        scrollLeft: 0
      }, 200);

      tabIndicator.css('left', 0);
    }
    else if (currentTab === 2) {
      mainWrapper.animate({
        scrollLeft: browserWidth
      }, 200);
      tabIndicator.css('left', '25%');
    }
    else if (currentTab === 3) {
      mainWrapper.animate({
        scrollLeft: browserWidth * 2
      }, 200);
      tabIndicator.css('left', '50%');
    }
    else if (currentTab === 4) {
      mainWrapper.animate({
        scrollLeft: browserWidth * 3
      }, 200);
      tabIndicator.css('left', '75%');
    }
  }
});


Template.MasterLayout.helpers({
  isCurrent: function(path) {
    return (path === Session.get('path') ? 'current' : '');
  },
  currentTab: function() {
    return Session.get('currentTab');
  }
});


Template.MasterLayout.rendered = function() {

  // init tab position
  Session.set('currentTab', 1);


  setTimeout(function() {
  
    var main = $('main');
    var mainWrapper = $('.main-wrapper');

    var mouseDown = false;
    var isDragging = false;
    var startX = 0;
    var browserWidth = $(document).width();
    var wrapperPos = 0;

    main
      .on('mousedown', function(e) {
        isDragging = false;
        mouseDown = true;
        startX = e.screenX;
        wrapperPos = mainWrapper.scrollLeft();
        browserWidth = $(document).width();
      })

      .on('mousemove', function(e) {

        if (mouseDown) {
          isDragging = true;
          var distance = startX - e.screenX;
          mainWrapper.scrollLeft(wrapperPos + distance);
        }
      })

      .on('mouseup', function(e) {
        mouseDown = false;
        if (isDragging) {  
          var distance = startX - e.screenX;
          if (browserWidth > 500) {
            browserWidth = 500;
          }

          switch (Session.get('currentTab')) {

            case 1:
              if (distance > 20) {
                mainWrapper.animate({
                  scrollLeft: browserWidth
                }, 200);
                Session.set('currentTab', 2);
              }
              else {
                mainWrapper.animate({
                  scrollLeft: 0
                }, 200);
              }
              break;
            case 2:
              if (distance > 20) {
                mainWrapper.animate({
                  scrollLeft: browserWidth * 2
                }, 200);
                Session.set('currentTab', 3);
              }
              else {
                mainWrapper.animate({
                  scrollLeft: browserWidth
                }, 200);
                Session.set('currentTab', 1);
              }
              break;
            case 3:
              if (distance > 20) {
                mainWrapper.animate({
                  scrollLeft: browserWidth * 3
                }, 200);
                Session.set('currentTab', 4);
              }
              else {
                mainWrapper.animate({
                  scrollLeft: browserWidth * 2
                }, 200);
                Session.set('currentTab', 2);
              }
              break;
            case 4:
              if (distance > 20) {
                mainWrapper.animate({
                  scrollLeft: browserWidth * 3
                }, 200);
              }
              else {
                mainWrapper.animate({
                  scrollLeft: browserWidth * 2
                }, 200);
                Session.set('currentTab', 3);
              }
              break;
            default:
              console.log(Session.get('currentTab'));

          }

          if (wrapperPos < browserWidth) {

          }
          console.log(wrapperPos);

        }
      })
      
      .on('scroll', function(e) {
        console.log('scroll');
      });

  }, 500);

  

  

  // var wrapper = $('main');

  // var wrapperLeft = wrapper.css('left');

  // var mc = new Hammer(document.getElementById('main'));
  // mc.on('panleft', function(e) {
  //   // wrapper.css('left', e.deltaX);
  // }).on('panright', function(e) {
  //   if (e.deltaX < 0) {
  //     // wrapper.css('left', e.deltaX);
  //   }
  //   console.log(e.deltaX, e.type +" gesture detected." );
  // }).on('tap', function(e) {
  //   console.log(e.deltaX, e.type +" gesture detected." );
  // });

}
