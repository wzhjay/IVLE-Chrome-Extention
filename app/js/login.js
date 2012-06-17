// Login

(function() {
  
  // Login model
  var Login = Backbone.Model.extend({
	
	// Default valuse
	defaults: function() {
	  return {
		userName : "Dear Student",
		LogState : "Loading...",
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
	}
	
  });
  
	
  //--------------------------------------------------------------------------

  // Login view
  var LoginView = Backbone.View.extend({
	
	//... is link tab
	tagName : "a",
	
	//tamplate for login
	tamplate : _.template($('login-template').html()),
	
	// events for DOM elements
	events: {
	  "click .log-info" : "toggleLog"
	},
	
	
	
  });




})();

