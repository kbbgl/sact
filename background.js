console.log("Background script running");

// START: InstallatioN
function checkCommandShortcuts() {
  console.log(`${new Date().toDateString()} Extension installed `);

  chrome.commands.getAll((commands) => {
    let missingShortcuts = [];

    for (let { name, shortcut } of commands) {
      if (shortcut === "") {
        missingShortcuts.push(name);
      }
    }

    if (missingShortcuts.length > 0) {
      // TODO update UI
    }
  });
}

chrome.runtime.onInstalled.addListener((event) => {
  console.log(
    `onInstalled called with reason: ${event.reason}, ${
      event.id ? event.id : ""
    }`
  );
  console.log(`previousVersion: ${event.previousVersion}`);

  if (event.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    checkCommandShortcuts();
  }
});

// END: Installation

// START: Handle Links
let l;

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);

  console.log(`Link received: ${JSON.stringify(l)}`);
  chrome.action.setBadgeText({
    text: `${l.links.length}`,
    tabId: l.tabId,
  });
});

chrome.runtime.onMessage.addListener((links, sender, sendResponse) => {
  const extensionID = sender.id;
  const url = sender.url;
  const tabIndex = sender.tab.index;
  const tabId = sender.tab.id;

  console.log(
    `Received message from:\n\tExtension  ID:${extensionID}\n\tURL:${url}\n\tTab Index: ${tabIndex}`
  );

  l = {
    extensionID,
    url,
    tabIndex,
    tabId,
    links,
  };

  sendResponse("Received msg from background!");
  chrome.tabs.sendMessage(tabId, "Message received from bg");
});

// END: Handle Links
