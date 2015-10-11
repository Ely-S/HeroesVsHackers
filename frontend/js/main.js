var app = {
	baseURL: "http://locahost:3000/",

	init: function(){
		this.e = $(document.body);

		// Determine if logged in
		// if logged in go to main page
		// else display login screen till done
		$.getJSON("/auth/user.json", function(data){
			app.user = data;
			app.trigger("login");
		}).fail(function(jqXHR, textStatus, errorThrown ) {
			if(errorThrown=="Unauthorized") {
				app.trigger("logout");
			}
		});

		this.on("update", function(){
			this.rerender();
		});

		this.on("logout", function(){
			page("/signin");
		});

		this.on("login", function(){
			app.render();
		});

		jQuery(this.ready.bind(this));
		this.pages();
	
	},

	templates: {
		monster: Template("#monster"),
		monsters: Template("#monsters")
	},

	pages: function(){
		page("/", this.page.bind(this, "signin"));
		page("/signin", this.page.bind(this, "signin"));
		page("/signup", this.page.bind(this, "signup"));
		page("/index", this.page.bind(this, "index"));
		page.start();
		if (location.href.slice(-8) === ('#logedIn')) {
			page("/index");
			this.trigger("login");
		}
		//fordev
	},

	page: function(id) {
		$(".page").hide();
		$("#"+id).show();
		$("#monster").show();
		this.trigger("page:"+id);
	},

	rerender: function(){
		this.templates.monster.render(this.user.monsters);
		showMonster();
	},

	render: function(){
		app.makeCode(app.user.id);
		templates.monsters.render(this.user.monsters);
	},

	update: function(){
		// initiate long-polling request
		$.ajax({
			dataType: "json",
			timeout: Math.pow(10, 10),
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
