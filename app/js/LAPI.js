// LAPI

(function() {
  
  function LAPI() {
	this.key = "geTZ5OAh2OjOxjqELVJEf";
	this.domain = "https://ivle.nus.edu.sg/";
  }
  
  LAPI.prototype =  {
	
	// get the request url with the API name and parameters
	requestURL : function(name, params) {
	  var url = this.domain + "api/Lapi.svc/" + name + "?APIKey=" + this.key + "&AuthToken=" + nusivle.user.token;
	  if(params) {
		for(var i in params) {
		  url += "&" + i + "=" + params[i];
		}
	  }
	  
	  return url + "&output=json";
	},
	
	// get the request get UserName url with the API name and parameters
	requestLoginURL : function(name, params) {
	  var url = this.domain + "api/Lapi.svc/" + name + "?APIKey=" + this.key + "&Token=" + nusivle.user.token;
	  if(params) {
		for(var i in params) {
		  url += "&" + i + "=" + params[i];
		}
	  }
	  
	  return url + "&output=json";
	},
	
	
	// get start url, get the token
	getTokenURL : function() {
	  return this.domain + "api/login/" + "?apikey=" + this.key + "&url=http://www.nus.edu.sg/" ;
	},
	
	
	// get th request json object 
	getResponse : function(url, callback) {
	  $.ajax({
		url : url,
		dataType : "jsonp",
		success : callback
	  });
	}
	
  };
  
  nusivle.LAPI = new LAPI();  // make LAPI objetc as global
})();

