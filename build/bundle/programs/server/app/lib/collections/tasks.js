(function(){Tasks = new Mongo.Collection('tasks');


if (Meteor.isServer) {
  Tasks.allow({
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

  // Tasks.deny({
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

})();
