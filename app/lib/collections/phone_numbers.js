PhoneNumbers = new Mongo.Collection('phone_numbers');


if (Meteor.isServer) {
  PhoneNumbers.allow({
    insert: function (userId, doc) {
      return (doc.userId === userId);
    },

    update: function (userId, doc, fieldNames, modifier) {
      return (doc.userId === userId);
    },

    remove: function (userId, doc) {
      return (doc.userId === userId);
    }
  });

  // PhoneNumbers.deny({
  //   insert: function (userId, doc) {
  //     return true;
  //   },

  //   update: function (userId, doc, fieldNames, modifier) {
  //     return true;
  //   },

  //   remove: function (userId, doc) {
  //     return true;
  //   }
  // });
}
