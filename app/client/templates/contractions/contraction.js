
Template.Contraction.events({

  'click td': function(e) {

    $(e.currentTarget).parent().removeClass('edit');

  },

  'click .icon-delete': function() {
    Contractions.remove({_id: this._id});
  }

});

Template.Contraction.rendered = function () {

  var tr = this.firstNode;

  $('td', tr).onTapHold(function(element, event) {
    event.preventDefault();
    $(tr).toggleClass('edit');
    
  });

};