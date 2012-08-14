$(function() {
  
  console.log("get token running");
  
  var token = /token=(\w+)/.exec(window.location.search);
  
  if (token.length === 2) {
	console.log(token[1]);
	
	chrome.extension.sendMessage(
	
	  {token : token[1]},
	  
	  function(msg) {
		console.log(msg);
		// alert("You have successfully logged in. You may close this page and start using IVLE Chrome extention.");
	  }
	);

  }

});