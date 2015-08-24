/*****************************************************************************/
/* ChangePassword: Event Handlers */
/*****************************************************************************/
Template.ChangePassword.events({

  'submit form': function(e) {
    e.preventDefault();

    var oldPassword = $('#old-password').val();
    var newPassword = $('#new-password').val();
    var newPasswordConfirm = $('#new-password-confirm').val();

    if (oldPassword)

    if (newPassword.length === 0) {

      notification('Error: empty passwords are not allowed');

    }

    else {

      if (newPassword !== newPasswordConfirm) {

        notification('Error: Passwords do not match');

      }

      else {

        Accounts.changePassword(oldPassword, newPassword, function(error) {

          if (error) {

            notification('Error: ' + error.reason);
            console.log(error);

          }

          else {
            
            notification('Password has been changed');

            $('.dialog.change-password').fadeOut(200, function() {
              Dialogs.remove({type: 'changePassword'});
            });

          }

        });
        

      }
    }
  },

  'click .cancel': function(e) {
    e.preventDefault();

    $('.dialog.change-password').fadeOut(200, function() {

      Dialogs.remove({type: 'changePassword'});

    });

  },

});

/*****************************************************************************/
/* ChangePassword: Helpers */
/*****************************************************************************/
Template.ChangePassword.helpers({
});

/*****************************************************************************/
/* ChangePassword: Lifecycle Hooks */
/*****************************************************************************/
Template.ChangePassword.created = function () {
};

Template.ChangePassword.rendered = function () {
};

Template.ChangePassword.destroyed = function () {
};
