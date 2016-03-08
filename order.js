
//ncrm.meteor.com
//DishesData = new Mongo.Collection('dishes');//TODO not used yet
Orders = new Mongo.Collection('orders'); //fulfilled, ready, dishes, _id


if (Meteor.isServer) {
  Meteor.startup(function () {
    //Orders.remove({});
    console.log(Orders.find().fetch()); 
    //Orders.insert({id:-1, dishes: {test:{name:test, amount:1}}});   
    //dishArray.forEach(function(d) {DishesData.insert(d);});

    Meteor.publish("orders", function(){
      return Orders.find();
    });
  });  
}
