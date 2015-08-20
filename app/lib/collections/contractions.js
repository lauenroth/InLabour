Contractions = new Mongo.Collection('contractions');


if (Meteor.isServer) {
  Contractions.allow({
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

  // Contractions.deny({
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
