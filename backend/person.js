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
			"points" : 125,
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
			"points" : 50,
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
			"points" : 200,
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
			"points" : 90,
			"promos" :  ""
		},
		{
			"company" : "hm",
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
			"points" : 60,
			"promos" :  ""
		}
	]
}

exports.Person.prototype.to_JSON = function() {

	return JSON.stringify({
		user_id: this.user_id || "0053526002",
		user_name: this.user_name || "Jason",
		monsters: this.user_monsters.map(function(element){
			var percentage = 0;
			var userPoints = element["points"];
			var rewardTiers = element["rewards"].map(function(entry){
				return entry.points;
			});

			for(var index = 0; index < rewardTiers.length; index++) {
				var requirement = rewardTiers[index];

				if( userPoints <= requirement ) {
					percentage = Math.ceil((userPoints / requirement) * 100);
					break;
				}
				else if ( userPoints > requirement && index != rewardTiers.length -1 )	//Make sure that there is another tier
					continue;
				else //Defaults to 100% if there isn't another tier
					percentage = 100;
			}

			return {
				"company" : element["company"],
				"level" : element["level"],
				"rewards" : element["rewards"],
				"percentage" : percentage,
				"points" : userPoints,
				"promos" :  element["promos"]	
			};
		})
	});
};

