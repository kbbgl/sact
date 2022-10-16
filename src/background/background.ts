import { SactElement, SactMessage, SactMessageType } from "../utils/sact";

console.debug("Background script started");
let e: SactElement[] = [];

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

chrome.runtime.onMessage.addListener(
  (message: SactMessage, sender, sendResponse) => {
    console.debug(`Message received from ${sender.url}`);
    console.log(message);

    switch (message.type) {
      case SactMessageType.UPDATE_BADGE:
        chrome.action.setBadgeText({
          text: `${message.content}`,
          tabId: sender.tab.id,
        });

        chrome.action.setBadgeBackgroundColor({
          color: "#2b31bf",
          tabId: sender.tab.id,
        });

        const response: SactMessage = {
          type: SactMessageType.UPDATE_BADGE_COMPLETE,
          content: `Badge updated to ${message.content}`,
        };
        sendResponse(response);

        break;

      default:
        break;
    }
  }
);

// 2. User runs hotkey
chrome.commands.onCommand.addListener((command) => {
  console.debug(`Command '${command}' ran`);

  const message: SactMessage = {
    type: SactMessageType.SHOW_MODAL,
    content: "Activate",
  };

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
      console.log(response);
      return true;
    });
  });
});
