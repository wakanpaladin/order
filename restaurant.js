//TAKE ORDER
Router.route('/takeOrders', function() {
  Meteor.subscribe("orders");
  
  Template.newOrders.helpers({
    newOrders: function() {
//debugger;
      var newOrders = Queries.newOrders();

      // if(Session.get('newOrdersFirstLoad') === undefined) {
      //   Session.set('newOrdersFirstLoad', true);
      // } else {
      //   Session.set('newOrdersFirstLoad', false);
      // }
      return newOrders;
    },
    newOrdersCount: function() {
      return Queries.newOrders().count();
    }
  });

  Template.readyOrders.helpers({
    readyOrders: function() {
      return Queries.readyOrders();
    },
    readyOrdersCount: function() {
//debugger;
      return Queries.readyOrders().count();
    }
  });

  Template.readyOrders.onRendered(function () {
  });

  Template.doneOrders.helpers({
    doneOrders: function() {
      return Orders.find({fulfilled:true});
    }
  });

  Template.Order.helpers({
    dishes: function() {
      var ds = [];
 //debugger;
      for(var d in this.dishes) {
        ds.push(this.dishes[d]);
      }
      return ds;
    },
    isReady: function() {
      return this.isReady;
    }
  });

  Template.Order.events({
    'click .ready.next': function(e) {
      DML.Order.updateField(this, 'fulfilled', true);
    },
    'click .new.next': function(e) {
      DML.Order.updateField(this, 'isReady', true);
    },
    'click .ready.previous': function(e) {
      DML.Order.updateField(this, 'isReady', false);
    }
  });

  Template.Order.onRendered(function () {//TODO how to distinguish new records that comes in. Rendering order is not a little random to count on
  // debugger; 
      if(!Session.get('newOrdersFirstLoad')) { //new order just came in       
        var block = this.find('.order');
        //block.style.backgroundColor = 'orange';
      }
  });

  this.render('takeOrders');
});