Util = {
	getDishInOrder: function(name) {
		return Session.get('order').dishes[name];
	}
}