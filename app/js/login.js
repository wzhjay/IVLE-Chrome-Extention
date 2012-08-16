// Login
(function() {
  var user = nusivle.user;
  var myLogin;
  
  
  
  function Login() {
	
	this.userNmae = "Dear Student";
	this.logState = "Login";
	this.isLogged = false;
	
	console.log('log view init');
  }
  
  
  
  Login.prototype = {
	
	// login and get save the token
	login: function() {
	  if(!user.initialed){
		var token;
		user.getToken(token);
		console.log(token);
		user.saveToken(token);
		user.validated = true;

		user.initialUser();
	  }
	  this.isLogged = true;
	  console.log("login done");
	
	},
	
	
	// logout
	logout: function() {
	  console.log("logouted");
	},
	
	
	// validate user login
	validateLogin: function() {
	  console.log("start validate login");
	  if(!user.token) {
		user.validated = false;
		return;
	  } else if(user.validated){
		return;
	  }

	  var url = user.LAPI.requestURL("Validate");

	  var valObj = user.LAPI.getResponse(url); // get the JSOn object

	  if(valObj.Success) {
		user.validated = true;

		if(user.token !== valObj.Token) {
		  user.saveToken(valObj.Token);
		}

		if(!user.initialed) {
		  initilalUser();
		}
	  }
	},
	
	// toggle the login state
	toggleLog: function() {
	  if(!user.token){
		this.userName = user.userStorage.find(user.nameObj).name;
		this.login();
		this.LogState = "Logout";
		this.isLogged = true;
	  }
	  else {
		// do something to remove the user's info'
		this.logout();
		this.userName = "Dear Student";
		this.logState = "Login";
		this.isLogged = false;
		
		//destroy the user model in local storage
		user.userStorage.destroy(user.nameObj);
		user.userStorage.destroy(user.modulesObj);
		// render the view of logout
		this.render();
		}
	  }
	
  };


nusivle.myLogin = nusivle.myLogin || new Login();

})();

