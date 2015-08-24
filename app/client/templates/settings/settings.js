Meteor.subscribe('myContractions');

/*****************************************************************************/
/* Settings: Event Handlers */
/*****************************************************************************/
Template.Settings.events({

  'click .change-password': function(e) {
    e.preventDefault();
    Dialogs.insert({
      type: 'changePassword',
      ok: function() {
        notification('Password has been changed deleted');
      }
    });
  },

  'click .logout': function(e) {
    e.preventDefault();
    Meteor.logout();
  },

  'click .delete-account': function(e) {
    e.preventDefault();
    notification('Not yet implemented :(');
  },
  
  'click .clear-ticker': function(e) {
    e.preventDefault();

    Dialogs.insert({
      type: 'confirm',
      text: 'Delete ALL data from the contractions ticker?',
      ok: function() {
        var contractions = Contractions.find().fetch();
        contractions.forEach(function(contraction) {
          Contractions.remove({_id: contraction._id});  
        });
        notification('Contraction data deleted');
      }
    });
  },

  'click .clear-todo-list': function(e) {
    e.preventDefault();
    Dialogs.insert({
      type: 'confirm',
      text: 'Delete ALL items from the todo list?',
      ok: function() {
        var tasks = Tasks.find().fetch();
        tasks.forEach(function(task) {
          Tasks.remove({_id: task._id});  
        });
        notification('Todo items deleted');
      }
    });
  },

  'click .clear-phone-numbers': function(e) {
    e.preventDefault();
    Dialogs.insert({
      type: 'confirm',
      text: 'Delete ALL phone numbers?',
      ok: function() {
        var phoneNumbers = PhoneNumbers.find().fetch();
        phoneNumbers.forEach(function(phoneNumber) {
          PhoneNumbers.remove({_id: phoneNumber._id});  
        });
        notification('Phone numbers deleted');
      }
    });
  },

});

/*****************************************************************************/
/* Settings: Helpers */
/*****************************************************************************/
Template.Settings.helpers({
});

/*****************************************************************************/
/* Settings: Lifecycle Hooks */
/*****************************************************************************/
Template.Settings.created = function () {
  Session.set('path', '/settings');
};

Template.Settings.rendered = function () {
};

Template.Settings.destroyed = function () {
};
