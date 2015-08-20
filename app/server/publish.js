/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */

Meteor.publish('myContractions', function() {
  return Contractions.find({userId: this.userId});
});


Meteor.publish('myTasks', function() {
  return Tasks.find({userId: this.userId});
});


Meteor.publish('myPhoneNumbers', function() {
  return PhoneNumbers.find({userId: this.userId});
});