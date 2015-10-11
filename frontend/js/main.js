var app = {
	baseURL: "http://locahost:3000/",

	init: function(){
		this.e = $(document.body);

		this.on("update", function(){
			this.rerender();
		});

		this.on("logout", function(){
			page("/signin");
		});

		this.on("login", function(){
			app.render();
			page("/index");
		});

		$(function(){
			app.ready();
		});

		this.pages();
		
		if((app.user && app.user.id)) {
			this.trigger("login");
		}

		if (location.href.slice(-9) === ('#loggedIn')) {
			this.loadUser();
		} else {
			this.loadUser();
		}
	},

	templates: {
		monster: new Template("#monster"),
		monsters: new Template("#monsters")
	},

	loadUser: function(){
		// Determine if logged in
		// if logged in go to main page
		// else display login screen till done
		$.getJSON("/auth/user.json", function(data){
			app.user = JSON.parse(data);
			app.trigger("login");
		}).fail(function(jqXHR, textStatus, errorThrown ) {
			if(errorThrown=="Unauthorized") {
				app.trigger("logout");
			}
		});

	},

	pages: function(){
		page("/", this.page.bind(this, "signin"));
		page("/signin", this.page.bind(this, "signin"));
		page("/signup", this.page.bind(this, "signup"));
		page("/index", this.page.bind(this, "index"));
		page("/monster", this.page.bind(this, "monster"));
		page.start();
	},

	page: function(id) {
		$(".page").hide();
		$("#"+id).show();
		this.trigger("page:"+id);
	},

	rerender: function(){
		this.showMonster();
		this.templates.monsters.render(this.user);
	},

	render: function(){
		app.makeCode(app.user.user_id);
		this.templates.monsters.render(this.user);
	},

	update: function(){
		// initiate long-polling request
		$.ajax({
			dataType: "json",
			timeout: Math.pow(10, 10),
			url: app.baseURL+"update",
			success: function(data, textStatus, jqXHR){
				app.user = data;
				app.trigger("update");
			},
			complete: function(){
				app.update();
			}
		});
	},


	showMonster: function(monster, showpage) {
		// render monster data
		if (monster) this.currentMonster = monster;
		else monster = this.currentMonster;
		if(!monster) return;
		var monster = app.user.monsters.filter(function(m){
			return monster == m.company; 
		})[0];
		// render monster template
		this.templates.monster.render(monster);
		if (showpage) page("/monster");
	},

	ready: function(){
		$("#monsters").on("click tap", ".monster", function(){
			app.showMonster(this.getAttribute("data"), true);
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
	this.template = this.element.html();
	Mustache.parse(this.template);
}

Template.prototype.render = function(data){
  this.element.html(Mustache.render(this.template, data)).show();
};

Template.prototype.hide = function(){
  return this.element.hide()
};

Template.prototype.show = function(){
  return this.element.show()
};
