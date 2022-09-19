console.log("Content script started");

chrome.runtime.sendMessage("Ping", (res) => {
  console.log(res);
});
