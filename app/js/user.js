// User model

(function() {
  
  var User = Backbone.Model.extend({
	
	defaults: function() {
	  return {
		token	  : "",
		validated : false,
		initialed : false,
		todoList  : undefined, 
		interval	: 0,	    // default uodate interval
		updateSID : undefined	// periodic update object
	  };
	},
	
	// set the localStorage for user
	localStorage : new Store("users"),
	
	
	// initialization of user setting, get username, get user modules, set update interval and initial the todoList
	initialize: function(){
	  this.token = this.defaults.token;
	  this.validated = this.defaults.validated;
	  this.initialed = this.defaults.initialed;
	  this.todoList = this.defaults.todoList;
	  this.updateSID = this.defaults.updateSUD;
	},

	initialUser: function() {
	  // initial and request for the APIs, save the date into local storage
	  // get name object of JSON
	  var nameURL = LAPI.request("UserName_Get");
	  var nameObj = LAPI.getResponse(nameURL);
	  this.localStoragecreate(nameObj);  // save the username json object into localStorage
	  
	  //get modules object of JSON
	  var modulesURL = LAPI.requestURL("Modules", {Duration : 60, IncludeAllInfo : true});
	  var modulesObj = LAPI.getResponse(modulesURL);
	  this.localStorage.create(modulesObj);  // // save the module json object into localStorage
	  
	  // update the modules in user's nterval'
	  var updateModules = function() {
		var modulesURL = LAPI.requestURL("Modules", {Duration : this.interval, IncludeAllInfo : true});
		var modulesObj = LAPI.getResponse(modulesURL);
	  }
	  
	  // set updateSID for user
	  this.updadeSID = _.delay(updateModules, this.interval*60*1000);
	  
	  // initial user's todolist
	  //////////////////////////
	  //////////////////////////
	  
	  
	  // finally set the initialed ture
	  this.initiled = true;
	},
	
	
	// get the token from location of window
	getToken: function(token) {
	  var search = function () {
		var p = window.location.search.substr(1).split(/\&/), l = p.length, kv, r = {};
		while (l--) {
			kv = p[l].split(/\=/);
			r[kv[0]] = kv[1] || true; //if no =value just set it as true
		}
		return r;
	  }
	  
	  if (search.token && search.token.length > 0 && search.token != 'undefined') {
		alert("You have successfully logged in. You may close this page and start using IVLE Chrome extention.");
		token = search.token;
	  }
	},
	
	
	// save the token into localStrorage
	saveToken: function(token) {
	  
	  userStorage.token = token;  // userStorage = new Store("user");
	  this.token = token;
	  
	  // todoList with token
	},
	
	clearUser: function() {
	  this.token = this.defaults.token;
	  this.validated = this.defaults.validated;
	  this.initialed = this.defaults.initialed;
	  this.todoList = this.defaults.todoList;
	  this.updateSID = this.defaults.updateSUD;
	  
//	  userStorage.update(User);
	}
	
	
  });
  
  nusivle.User = User;  // global
  
})();