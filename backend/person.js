exports.Person = function(id, name) {
	this.user_name = name;
	this.user_id = id;
	this.user_monsters = [
		{
			"company" : "starbucks",
			"level" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "dunkindonuts",
			"level" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "pinkberry",
			"level" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "target",
			"level" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "petsmart",
			"level" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "gap",
			"level" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "apple",
			"level" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "h&m",
			"level" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "adidas",
			"level" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "nike",
			"level" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "jambajuice",
			"level" : 0,
			"points" : 0,
			"promos" :  ""
		}
	]
}

exports.Person.prototype.to_JSON = function() {
	return JSON.stringify(this);
}