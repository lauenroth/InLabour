/*****************************************************************************/
/* Login: Event Handlers */
/*****************************************************************************/
Template.Login.events({

  'submit form': function(e) {
    e.preventDefault();

    var email    = $('input[type="email"]').val();
    var password = $('input[type="password"]').val();

    switch ($('form').attr('class') ) {

      case 'login':
        Meteor.loginWithPassword(email, password, function(error) {
          if (error && error.reason === "Incorrect password") {
            alert('Wrong password. Did you forget it?')
          }
          else if (error) {
            alert('You don\'t seem to have an account yet :(');  
          }
        });
        break;
      case 'register':
        var account = {
          username: email,
          email: email,
          password: password
        };
        Accounts.createUser(account, function(error) {
          if (error) {
            console.log(error);
            alert('Account could not be created!     ' + error.reason);
          }
          else {
            alert('Successfully created account :)');
          }
        });
        break;
      default: 
        Accounts.forgotPassword({email: email}, function(error) {
          if (error) {
            alert(error.reason);
          }
          else {
            alert('We\'ve just sent you an email for resetting your password.');
          }
        });
        break;
    }
  },

  'click #no-account': function(e) {
    e.preventDefault();
    $('button').text('Register');
    $('form').removeClass('login').addClass('register');
  }

});

/*****************************************************************************/
/* Login: Helpers */
/*****************************************************************************/
Template.Login.helpers({
});

/*****************************************************************************/
/* Login: Lifecycle Hooks */
/*****************************************************************************/
Template.Login.created = function () {
};

Template.Login.rendered = function () {
};

Template.Login.destroyed = function () {
};
