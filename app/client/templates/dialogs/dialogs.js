/*****************************************************************************/
/* Dialogs: Event Handlers */
/*****************************************************************************/
Template.Dialogs.events({

  'click .confirm .ok': function(e) {
    e.preventDefault();
    
    var dialog = Dialogs.findOne({type: 'confirm'});
    dialog.ok();

    $('.dialog.confirm').fadeOut(200, function() {
      Dialogs.remove({type: 'confirm'});
    });

  },
  'click .confirm .cancel': function(e) {
    e.preventDefault();
    $('.dialog.confirm').fadeOut(200, function() {
      Dialogs.remove({type: 'confirm'});
    });
  }

});

/*****************************************************************************/
/* Dialogs: Helpers */
/*****************************************************************************/
Template.Dialogs.helpers({

  confirmDialog: function() {
    return Dialogs.findOne({type: 'confirm'});
  },

});

/*****************************************************************************/
/* Dialogs: Lifecycle Hooks */
/*****************************************************************************/
Template.Dialogs.created = function () {
};

Template.Dialogs.rendered = function () {
};

Template.Dialogs.destroyed = function () {
};
