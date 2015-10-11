exports.Person = function(id, name) {
	this.user_name = name;
	this.user_id = id;
	this.user_monsters = new Array();
}

exports.Person.prototype.to_JSON = function() {
	return JSON.stringify(this);
}