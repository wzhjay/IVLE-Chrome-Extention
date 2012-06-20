// LAPI

(function() {
  
  // LAPI model
  var LAPI = Backbone.Model.extend({
	
	// Default valuse
	defaults: function() {
	  return {
		key : Pref.key,
		domain : "https://ivle.nus.edu.sg/"
	  };
	},
	
	// initialization and set defaults attrs if no user Login
	initialize : function() {
	  this.set({
		"key"	  : this.defaults.key,
		"domain"  : this.defaults.domain,
		"user"	  : new User()
	  });
	},
	
	// get the request url with the API name and parameters
	requestURL : function(name, params) {
	  var url = this.domain + "api/Lapi.svc/" + name + "?APIKey=" + this.key + "&AuthToken=" + this.user.token;
	  
	  if(params) {
		for(var i in params) {
		  url += "&" + i + "=" + params[i];
		}
	  }
	  
	  return url + "&output=json";
	},
	
	
	// get start url, get the token
	getTokenURL : function() {
	  return the.domain + "api/login/" + "?apikey=" + this.key + "&url=http://www.nus.edu.sg/?token=" ;
	},
	
	
	// get th request json object 
	getResponse : function(url) {
	  var jsonObj = $.ajax({
		url : url,
		dataType : "jsonp",
		success : function() {
		  jsonObj =  arguments;
		}
	  });
	  return jsonObj;
	}
	
  });
  
  nusivle.LAPI = LAPI;  // make LAPI objetc as global
})();

