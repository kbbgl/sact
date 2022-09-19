console.log("Background script started");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, sender);
  sendResponse("Pong");
});
