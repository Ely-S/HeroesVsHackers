exports.Person = function(id, name) {
	this.user_name = name;
	this.user_id = id;
	this.user_monsters = [
		{
			"company" : "starbucks",
			"level" : 0,
			"rewards" : [
				{	
					"name" : "One Free Pumpkin Spice Latte",
					"points" : 100
				},
				{	
					"name" : "Two Free Cups of Coffee",
					"points" : 250
				},
				{
					"name" : "One Free Pastry",
					"points" : 750
				}
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "petsmart",
			"level" : 0,
			"rewards" : [
				{	
					"name" : "$19 Grooming Coupon",
					"points" : 100
				},
				{
					"name" : "10% Off",
					"points" : 200
				},
				{	
					"name" : "One free brush",
					"points" : 300
				}
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "gap",
			"level" : 0,
			"rewards" : [
				{	
					"name" : "50% Off",
					"points" : 300
				}
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "apple",
			"level" : 0,
			"rewards" : [
				{	
					"name" : "10% off",
					"points" : 300
				}
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "h&m",
			"level" : 0,
			"rewards" : [
				{	
					"name" : "25% Off",
					"points" : 300
				}
			],
			"percentage" : 0,
			"points" : 0,
			"promos" :  ""
		},
		{
			"company" : "adidas",
			"level" : 0,
			"rewards" : [
				{	
					"name" : "10% Off",
					"points" : 300
				}
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
		var points = p.points;
		var reward1 = Object.keys(p.rewards[0])[0];
		var reward2 = Object.keys(p.rewards[1])[0];	

		//if user exceeds the 1st reward calulate % for 2nd reward
		if (points <= reward1)
			monster.percentage = (points / reward1) * 100;
		else
			monster.percentage = (points / reward2) * 100;
	}

	return JSON.stringify(p);
}