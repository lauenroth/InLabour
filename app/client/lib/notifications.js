notification = function(text) {

  var notifications = $('body');

  var newNotification = $('<div class="notification">' + text + '</div>');
  
  notifications.append(newNotification);
  newNotification.animate({
    'bottom': 0
  }, 200);

  setTimeout(function() {
    newNotification.animate({
      'bottom': '-45px'
    }, 200,
      function() {
        this.remove();
      }
    );
  }, 3500);

}