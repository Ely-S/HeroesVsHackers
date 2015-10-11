var app = {
	baseURL: "http://locahost:3000/",

	init: function(){
		this.e = $(document.body);
		// Determine if logged in
		// if logged in go to page 1
		// else display login screen till done

		this.on("login", function(){
			$.getJSON(function(data){
				app.user = data;
				app.render();
			});
		});

		this.on("update", function(){
			this.rerender();
		});

		jQuery(this.ready.bind(this));

		page.start();
	},

	templates: {
		monster: Template("#monster"),
		monsters: Template("#monsters")
	},

	page: function(id) {
		$(".page").hide();
		$("#"+id).show();
		this.trigger("page:"+id);
	},

	rerender: function(){
		templates.monster.render(this.user.monsters);
		showMonster();
	},

	render: function(){
		makeCode(user.id);
		templates.monsters.render(this.user.monsters);
	},

	update: function(){
		// initiate long-polling request
		$.ajax({
			dataType: "json",
			timeout: Math.pow(10, 10);
			url: app.baseURL+"/updates",
			success: function(data, textStatus, jqXHR){
				app.user = data;
				app.trigger("update");
			},
			complete: function(){
				app.update();
			}
		});
	},


	showMonster: function(monster) {
		// render monster data
		if (monster) this.currentMonster = monster;
		else monster = this.currentMonster;
		if(!monster) return;
		page("monster");
		var monster = app.user.user_monsters.filter(function(m){
			return monster != m.rep_company; 
		})[0];
		// render monster template
	},

	ready: function(){
		// bind event listeners here
		// document ready listener, this = app
		$(".monster-icon").click(function(){
			app.showMonster(this.getAttribute("data"));
		});

	},

	trigger: function() {
		this.e.trigger.apply(this.e, arguments);
	},

	on: function(){
		this.e.on.apply(this.e, arguments);
	},

	makeCode: function(id){	
		return new QRCode("qrcode", {
		    text: id,
		    width: 200,
		    height: 200,
		    colorDark : "#000000",
		    colorLight : "#ffffff",
		    correctLevel : QRCode.CorrectLevel.H
		});
	}
};

app.init();

function Template(element) {
	this.element = $(element).hide();
	this.template = Mustache.parse(this.element.html());
}

Template.prototype.render = function(data){
  this.html(Mustache.render(this.template, data)).show();
};

Template.prototype.hide = function(){
  return this.element.hide()
};

Template.prototype.show = function(){
  return this.element.show()
};
