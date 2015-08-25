Template.List.events({

  'click li': function(e) {

    var $li = $(e.currentTarget);

    if ($li.hasClass('edit')) {
      $li.removeClass('edit');
    }

    else {
      var done = !this.done;
      Tasks.update({_id: this._id}, {$set: {done: done} });
    }

  },

  'click .icon-delete': function() {
    Tasks.remove({_id: this._id});
  }

});

Template.Todo.helpers({

  isDone: function(done) {
    return (done ? 'done' : '');
  },

});

Template.Todo.rendered = function() {

  var $li = $(this.firstNode);

  $li.onTapHold(function(element, event) {
    event.preventDefault();
    $li.toggleClass('edit');
    
  });

};