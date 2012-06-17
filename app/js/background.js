/* 
 * control the click behavior of tab
 */

chrome.browserAction.onClicked.addListener(function() {
  chrome.browserAction.setPopup({popup: '/app/html/popup.html'})
});
