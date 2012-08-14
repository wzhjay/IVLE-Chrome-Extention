/* 
 * control the click behavior of tab
 */


chrome.browserAction.onClicked.addListener(function() {
  
    //alert(nusivle.myLogin.isLogged);
  
    if(nusivle.myLogin.isLogged) {
	  	  console.log("open pop up");
	  
	  nusivle.user.initial();
	  //alert(nusivle.user);
	  chrome.browserAction.setPopup({popup: '/app/html/popup.html'});
	}
	else {
//	  alert(nusivle.user);
//	  alert(nusivle.LAPI);
	  chrome.tabs.create({
		url:nusivle.LAPI.getTokenURL()
	  });
	  
	  nusivle.myLogin.isLogged = true;
	  console.log("nusivle mylong islogged");
  }
});


chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
			  
			  
    if (request.token) {
	  console.log("from message" + request.token);
	  
	  nusivle.user.saveToken(request.token);
	  
	  sendResponse({valid:true});  
	}

  });