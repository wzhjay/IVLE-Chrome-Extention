// Login

(function() {
  
  var user = nusivle.User;
  var LAPI = nusivle.LAPI;
  
  // Login model
  var Login = Backbone.Model.extend({
	
	// Default valuse
	defaults: function() {
	  return {
		userName : "Dear Student",
		logState : "Login",
		isLogged	 : false
	  };
	},
	
	// initialization and set defaults attrs if no user Login
	initialize : function() {
	  if(!this.isLogged) {
		this.set({
		  "userName" : this.defaults.userName,
		  "LogState" : this.defaults.LogState
		});
	  }
	},
	
	
	// login and get save the token
	login: function() {
	  window.open(LAPI.getTokenURL);

	  if(!user.initialed) {
		user.initialUser();
	  }

	  var token;
	  user.getToken(token);
	  user.saveToken(token);
	  user.validated = true;
	},

	// logout
	logout: function() {

	},

	// validate user login
	validateLogin: function() {
	  if(!user.token) {
		user.validated = false;
		return;
	  } else if(user.validated){
		return;
	  }

	  var url = LAPI.requestURL("Validate");

	  var valObj = LAPI.getResponse(url); // get the JSOn object

	  if(valObj.Success) {
		user.validated = true;

		if(user.token !== valObj.Token) {
		  user.saveToken(valObj.Token);
		}

		if(!user.initialed) {
		  initilalUser();
		}
	  }
	}
	
  });
  
	
  var myLogin = new Login; 
  //----------------------------------------------------------------------------

  // Login view
  var LoginView = Backbone.View.extend({
	
	//... is link tab
	tagName : "a",
	
	//template for login
	loginTemplate : _.template($('login-template').html()),
	
	// events for DOM elements
	events: {
	  "click .log-info" : "toggleLog"
	},
	
	// initialization
	initialize: function() {
	  this.model.bind('change', this.render, this);
	  this.logArea = this.$('#login-area');
	  
	  this.$el.html(this.template(this.model.toJSON()));
	  return this;
	},
	
	// re-render the login state
	render: function() {
	  this.logArea.show();
	  this.logArea.html(this.loginTemplate({userName: myLogin.userName, logState : myLogin.logState}));
	},
	
	// toggle the login state
	toggleLog: function() {
	  if(!user.token){
		//myLogin.userName = from API;
		myLogin.login();
		myLogin.LogState = "Logout";
	  }
	  else {
		// do something to remove the user's info'
		myLogin.logout();
		myLogin.userName = myLogin.defaults.userName;
		myLogin.logState = myLogin.defaults.logState;
		}
	  }

	  
	  
	  

  });




})();

