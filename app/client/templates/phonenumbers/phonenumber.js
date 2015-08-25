Template.Phonenumber.events({

  'click li': function(e) {

    var $li = $(e.currentTarget);

    if ($li.hasClass('edit')) {
      $li.removeClass('edit');
    }

  },

  'click .icon-delete': function() {
    console.log(this);
    PhoneNumbers.remove({_id: this._id});
  }

});

Template.Phonenumber.rendered = function() {

  var $li = $(this.firstNode);  

  $li.onTapHold(function(element, event) {
    event.preventDefault();
    $li.toggleClass('edit');
    
  });

};