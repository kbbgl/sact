import { SactDTO } from "../utils/sact-link";

console.log("Background script started");

// START: INSTALLATION
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
// END: INSTALLATION

let l: SactDTO = {
  extensionId: "",
  url: "",
  tabIndex: 0,
  tabId: 0,
};

chrome.commands.onCommand.addListener((command) => {
  console.log(`${new Date().toDateString()} Command '${command}' ran`);

  chrome.action.setBadgeText({
    text: `${l.links.length}`,
    tabId: l.tabId,
  });
});

chrome.runtime.onMessage.addListener((links, sender, sendResponse) => {
  l.extensionId = sender.id;
  l.url = sender.url;
  l.tabIndex = sender.tab.index;
  l.tabId = sender.tab.id;
  l.links = links;

  console.log(`Message received from contentScript:`);
  console.log(l);

  sendResponse(`${new Date().toDateString()} Pong`);
});
