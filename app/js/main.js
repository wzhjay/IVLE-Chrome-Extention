// ********************************************
// module, connect between controller and APIs
// ********************************************

// set user Object
(function() {
  
  // set user Object and methods-----------------------------------------------
  User =  {
	token		: chrome.storage.sync(user_token),
	validated : false,
	initialed : false,
	todoList  : undefined, 
	interval	: 0,	    // default uodate interval
	updateSID : undefined	// periodic update object
  }
  
  User.prototype = {
	
	saveToken : function(token) {
	  user_token.set(token);             // save to storage are
	  this.token = token;
	  
	  if(todoList) {
		this.todoList.token = token;	 // todoList has not export!!!
	  }
	  
	},
	
	
	
	clearUser : function() {
	  user_token.clear();
	  this.validated = false;
	  this.initialed = false;
	  this.interval	 = undefined; 
	  
	  if(this.updateSID) {
		clearTimeout(this.updateSID);
	  }
	}

  }; // end of User Object
  
  
  
  // set IAPI Object and methods----------------------------------------------
  var IAPI = {
	domain		: "https://ivle.nus.edu.sg",
	key			: '',								//has not set
	
	// generate the request url with domain and parameters 
	requestURL	: function(item, params) {
	  var url  = this.domain + "api/lapi.svc/" + item + "?APIkey=" + this.key + "&AuthToken=" + User.token;
	  
	  if(params) {
		for(var k in params) {
		  url += "&" + k + "=" + params[k]; 
		}
	  }
	  
	  return url + "$output=json"
	}
  }
  
  
  IAPI.prototype = {
	
	// get the login url
	loginURL : function(item) {
	  if(item) {
		return this.domain + "api/lapi.svc/" + item + "?output=json" + "&APIkey=" + this.key + "&Token=" + User.token;
	  }else {
            return this.domain + "api/login/?apikey=" + this.key +
                    "&url=" + encodeURIComponent("http://www.nus.edu.sg");
        }
	},
	
	// get the response from requestURL
	getResponse : function(message, url) {
	  
	},
	
	// mark an announce as read
	markAnnRead : function(id) {
	  
	},
	
	
	// download file from workbins
	download : function(id) {
	  
	}
	
  };
  
  
  
  
  
  
  
  
})();

