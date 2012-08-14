// User model

(function() {
  var LAPI = nusivle.LAPI;
  
  function User() {
	this.token = "";
	this.validated = false;
	this.initialed = false;
	this.todoList = undefined;
	this.interval = 0;
	this.updateSID = undefined;
	this.userStorage = new Store('user');
	
	this.modules = undefined;
	this.name = "";
	console.log(this.userStorage);
  }
  
  
  User.prototype = {
	
	initial: function() {
	  console.log("initial user");
	  var me = this;
	  
	  // initial and request for the APIs, save the date into local storage
	  // get name object of user
	  LAPI.getResponse(LAPI.requestURL("UserName_Get"), function(result) {
//		var str = result.split(" ");
//		this.name = str[1];
//		alert(this.name);
		var data= jQuery.parseJSON(result);
		alert('username : ' + result);
	  });

	  // validate user 
	  LAPI.getResponse(LAPI.requestURL("Validate"), function(result) {
		if(result) {
		  me.validated = true;
		}
		alert(me.validated);
	  });
	  
	  //get modules object of JSON
	  LAPI.getResponse(LAPI.requestURL("Modules", {Duration : 60, IncludeAllInfo : true}), function(result) {
		me.modules = result;
		alert("MODULES : " + result.Results);
	  });
	  
	  
	  
//	  
//	  //console.log(this.nameObj);
//	  this.userStorage.save({nameObj : this.nameObj});  // save the username json object into localStorage
//	  
//	  //get modules object of JSON
//	  var modulesURL = this.LAPI.requestURL("Modules", {Duration : 60, IncludeAllInfo : true});
//	  console.log(modulesURL);
//	  this.modulesObj = this.LAPI.getResponse(modulesURL);
//	  console.log(this.modulesObj);
//	  this.userStorage.save({modulesObj : this.modulesObj});   // save the module json object into localStorage
//	  
//	  // validate user 
//	  var validateURL = LAPI.requestURL("Validate");
//	  console.log(validateURL);
//	  this.validateObj = this.LAPI.getResponse(validateURL);
//	  console.log(this.validateObj);
//	  
//	  // validate user 
//	  var usernameURL = LAPI.requestURL("UserName_Get");
//	  console.log(usernameURL);
//	  this.usernameObj = this.LAPI.getResponse(usernameURL);
//	  console.log(this.usernameObj);
//	  
//	  // update the modules in user's nterval'
//	  var updateModules = function() {
//		var modulesURL = me.LAPI.requestURL("Modules", {Duration : this.interval, IncludeAllInfo : true});
//		me.modulesObj = me.LAPI.getResponse(modulesURL);
//		me.userStorage.update({modulesObj : this.modulesObj});  // update the Obj in localStorage
//	  }
//	  
//	  // set updateSID for user
//	  this.updadeSID = _.delay(updateModules, this.interval*60*1000);
//	  
	  // initial user's todolist
	  //////////////////////////
	  /////////////////////////
	  
	  // finally set the initialed ture
	 // this.initiled = true;
	},
	
	
	// get the token from location of window
	getToken: function(token) {

	},
	
	
	// save the token into localStrorage
	saveToken: function(token) {
	  console.log("saveToken");
	  
//	  this.userStorage.save({token: token});
	  this.token = token;
	  
	  alert("in saveToken : " + this.token);
	  // todoList with token
	},
	
	clear: function() {
	  this.token = "";
	  this.validated = false;
	  this.initialed = false;
	  this.todoList = undefined;
	  this.interval = 0;
	  this.updateSID = undefined;
	  
//	  userStorage.update(User);
	}
	
  };
  
  nusivle.user = nusivle.user || new User();  // global
  console.log("user token = " + nusivle.user.token);
})();