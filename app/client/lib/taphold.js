
(function ( $ ) {

  $.fn.onTapHold = function(callback) {

    var start = 0;
    var timeToTrigger = 450;
    var triggered = false;

    this
      .on('touchstart', function(e) {
        start = e.timestamp;
        setTimeout(function() {

          if (start !== 0) {
            callback(this, e);
            triggered = true;
          }
          else {

          }

        }, timeToTrigger);
      })
      .on('touchend', function(e) {

        if (triggered) {
          e.preventDefault();
        }
        start = 0;
        triggered = false;

      });

    return this;

  };

}( jQuery ));