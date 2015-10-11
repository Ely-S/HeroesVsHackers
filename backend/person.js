exports.Person = function(id, name) {
	this.user_name = name;
	this.user_id = id;
	this.user_monsters = [
		{
			"company" : "starbucks",
			"level" : 0,
			"rewards" : [
				{"item1" : 0},
				{"item2" : 0} 
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "dunkindonuts",
			"level" : 0,
			"rewards" : [
				{"item1" : 0},
				{"item2" : 0} 
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "pinkberry",
			"level" : 0,
			"rewards" : [
				{"item1" : 0},
				{"item2" : 0} 
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "target",
			"level" : 0,
			"rewards" : [
				{"item1" : 0},
				{"item2" : 0} 
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "petsmart",
			"level" : 0,
			"rewards" : [
				{"item1" : 0},
				{"item2" : 0} 
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "gap",
			"level" : 0,
			"rewards" : [
				{"item1" : 0},
				{"item2" : 0} 
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "apple",
			"level" : 0,
			"rewards" : [
				{"item1" : 0},
				{"item2" : 0} 
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "h&m",
			"level" : 0,
			"rewards" : [
				{"item1" : 0},
				{"item2" : 0} 
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "adidas",
			"level" : 0,
			"rewards" : [
				{"item1" : 0},
				{"item2" : 0} 
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "nike",
			"level" : 0,
			"rewards" : [
				{"item1" : 0},
				{"item2" : 0} 
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "jambajuice",
			"level" : 0,
			"rewards" : [
				{"item1" : 0},
				{"item2" : 0} 
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		}
	]
}

exports.Person.prototype.to_JSON = function() {
	var p = new Person(this.id, this.name);
	p.user_monsters = this.user_monsters.map(function(element){
		return {
			"company" : element["company"],
			"level" : element["level"],
			"rewards" : element["rewards"],
			"percentage" : element["percentage"],
			"points" : element["points"],
			"promos" :  element["promos"]	
		};
	});

	// Calculate percentage
	for(monster in p.user_monsters) {
		
	}

	console.log(p.user_monsters);
	return JSON.stringify(p);
}