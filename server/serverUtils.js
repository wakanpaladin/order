Meteor.methods({
  getNewOrderId: function() {
    return newOrderId++;
  }
})