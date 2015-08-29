Meteor.subscribe('myTasks');

/*****************************************************************************/
/* List: Event Handlers */
/*****************************************************************************/
Template.List.events({

  'click .icon-add': function() {
    $('#new-task-form').addClass('show');
    $('#new-task').focus();
  },

  'click .icon-close': function() {
    $('#new-task-form').removeClass('show');
  },

  'submit form': function(e) {
    e.preventDefault();

    var taskTmp = $('#new-task');
    if (taskTmp.val().length > 0) {
      var numTasks = Tasks.find().fetch().length;
      var newTask = {
        description: taskTmp.val(),
        done: false,
        order: numTasks + 1,
        userId: Meteor.userId()
      };
      Tasks.insert(newTask);
    }
    
    // reset and hide form
    taskTmp.val('');
    $('#new-task-form').removeClass('show');
  },

});

/*****************************************************************************/
/* List: Helpers */
/*****************************************************************************/
Template.List.helpers({

  tasks: function() {
    return Tasks.find();
  },

  hasTasks: function() {
    return Tasks.find().fetch().length > 0;
  },

  

});

/*****************************************************************************/
/* List: Lifecycle Hooks */
/*****************************************************************************/
Template.List.created = function () {
  Session.set('path', '/list');
};

Template.List.rendered = function () {
  var contentHeight = $(document).height() - 80;
  $('.tasks ul')
    .css('height', contentHeight + 'px');
};

Template.List.destroyed = function () {
};
