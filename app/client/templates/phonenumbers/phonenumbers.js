Meteor.subscribe('myPhoneNumbers');

/*****************************************************************************/
/* PhoneNumbers: Event Handlers */
/*****************************************************************************/
Template.PhoneNumbers.events({
  
  'click .icon-add': function() {
    $('#new-phone-number-form').addClass('show');
    $('#new-phone-number-name').focus();
  },

  'click .icon-close': function() {
    $('#new-phone-number-form').removeClass('show');
  },

  'submit form': function(e) {
    e.preventDefault();

    var nameTmp = $('#new-phone-number-name');
    var numberTmp = $('#new-phone-number');
    if (numberTmp.val().length > 0) {
      var newPhoneNumber = {
        name: nameTmp.val(),
        number: numberTmp.val(),
        userId: Meteor.userId()
      };
      PhoneNumbers.insert(newPhoneNumber);
    }
    
    // reset and hide form
    nameTmp.val('');
    numberTmp.val('');
    $('#new-phone-number-form').removeClass('show');
  }

});

/*****************************************************************************/
/* PhoneNumbers: Helpers */
/*****************************************************************************/
Template.PhoneNumbers.helpers({

  hasPhoneNumbers: function() {
    return PhoneNumbers.find().fetch().length > 0;
  },

  phoneNumbers: function() {
    return PhoneNumbers.find();
  }

});

/*****************************************************************************/
/* PhoneNumbers: Lifecycle Hooks */
/*****************************************************************************/
Template.PhoneNumbers.created = function () {
  Session.set('path', '/phone-numbers');
};

Template.PhoneNumbers.rendered = function () {
};

Template.PhoneNumbers.destroyed = function () {
};
