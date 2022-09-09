console.log("Background script running");

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const extensionID = sender.id;
  const url = sender.url;
  const tabIndex = sender.tab.index;
  const tabId = sender.tab.id;

  console.log(
    `Received message from:\n\tExtension  ID:${extensionID}\n\tURL:${url}\n\tTab Index: ${tabIndex}`
  );

  console.log(message);
  //   console.log(sender);
  sendResponse("Received msg from background!");
  chrome.tabs.sendMessage(tabId, "Message received from bg");
});
