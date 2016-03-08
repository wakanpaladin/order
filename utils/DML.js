DML = {
	Order: {
		updateField: function(record, field, newValue) {//obj, str, any
			record[field] = newValue;
	      	Orders.update(record._id, record);
		}
	}
}