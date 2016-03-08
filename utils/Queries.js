Queries = {
	newOrders: function() {
		return Orders.find({isReady:{$in: [false, undefined]}});
	},
	readyOrders: function() {
		return Orders.find({isReady:true, fulfilled:{$in: [false, undefined]}});	
	}
}