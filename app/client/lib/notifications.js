notification = function(text) {

  var notifications = $('#notifications');

  var newNotification = $('<div class="notification">' + text + '</div>');
  
  notifications.append(newNotification);

  setTimeout(function() {
    newNotification.fadeOut(200, function() {
      this.remove();
    })
  }, 3500);

}