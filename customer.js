//ORDER
//debugger
Router.route('/order', function() {
  // if(Meteor.user()) {
    Session.set('order', {dishes:{}});//{_id: autogen, dishes{dish1:amount...}}
    this.render('dishList');
  // } else {
  //   this.render('loginButtons');
  // }

  var dishArray = [{name: '麻婆豆腐', image: '/dish1.jpg', price: 20}, 
  {name: '蒜泥白肉', image: '/dish2.jpg', price: 10}, 
  {name: '夫妻肺片', image: '/dish3.jpg', price: 10}, 
  {name: '水煮鱼', image: '/dish4.jpg', price: 10}];

  Template.dishList.helpers({
    dishes: function () {
      return dishArray;
    }
  });

  Template.dishList.events({
    'click #submit': function(e) {
      var o = Session.get('order');
      o.fulfilled = false;
      o.ready = false;
      Orders.insert(o);
//debugger;   
      e.preventDefault();
      alert('Ordered!');
      Session.set('order', {dishes:{}});
    },
    'onhover #submit': function(e) {
      alert('');//TODO on hover to show the ordered dishes
    }
  });

  Template.Dish.helpers({
    amount: function () {//TODO if route order
      var dish = Util.getDishInOrder(this.name);
//debugger;        
      return dish ? dish.amount : 0;
    }
    // specialNeed: function () {
    //   var dish = Util.getDishInOrder(this.name);  
    //   return dish ? dish.special : 0;
    // }
  });


  Template.Dish.events({
    'click .add': function(e) {
      var o = Session.get('order'),
         ds = o.dishes;
      e.preventDefault();
      if(ds[this.name]) {
        ds[this.name].amount++;        
      } else {
        ds[this.name] = {name: this.name, amount: 1};
      }
      Session.set('order', o);
    },

    'click .remove': function(e) {
      var o = Session.get('order'),
         ds = o.dishes;
      e.preventDefault();
//debugger;      
      if(ds[this.name] && ds[this.name].amount > 0) {
        ds[this.name].amount--;        
        Session.set('order', o);
      } else {
        //noop
      }
    }
  });
});