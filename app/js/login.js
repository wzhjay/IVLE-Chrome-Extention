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
	  console.log("login model init");
	  console.log(this);
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
//	tagName : "div",
	el : $('#login-area'),
	
	model : myLogin,
	//template for login
	loginTemplate : null,
	
	// events for DOM elements
	events: {
	  "click .log-info" : "toggleLog"
	},
	
	// initialization
	initialize: function() {
	  console.log("log view init satrt");
	  this.loginTemplate = _.template($('#login-template').html());
	  
	  myLogin.bind('all', this.render, this);
	  
	  this.logArea = this.$('#login-area');
	  this.$el.html(this.loginTemplate(this.model.toJSON()));
	  return this;
	},
	
	// re-render the login state
	render: function() {
	  console.log('render log view')
	  this.logArea.show();
	  this.logArea.html(this.loginTemplate({userName: myLogin.userName, logState : myLogin.logState}));
	},
	
	// toggle the login state
	toggleLog: function() {
	  if(!user.token){
		myLogin.userName = user.userStorage.find(user.nameObj).name;
		myLogin.login();
		myLogin.LogState = "Logout";
		
		// render the view of login
		this.render();
	  }
	  else {
		// do something to remove the user's info'
		myLogin.logout();
		myLogin.userName = myLogin.defaults.userName;
		myLogin.logState = myLogin.defaults.logState;
		
		//destroy the user model in local storage
		user.userStorage.destroy(user.nameObj);
		user.userStorage.destroy(user.modulesObj);
		// render the view of logout
		this.render();
		}
	  }
	  
	  

  });

// start the view
$(document).ready(function() {
  console.log('log view init');
  var LogView = new LoginView;
});



})();

