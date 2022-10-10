import SearchModal from "../components";
import { SactElement } from "../utils/sact";

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

// 1. Client sends list of anchors available in webpage
chrome.runtime.onMessage.addListener(
  (anchors: SactElement[], sender, sendResponse) => {
    console.debug(`Message received from contentScript`);

    chrome.action.setBadgeText({
      text: `${anchors.length}`,
      tabId: sender.tab.id,
    });

    e = anchors;

    sendResponse("");
  }
);

// 2. User runs hotkey
chrome.commands.onCommand.addListener((command) => {
  console.debug(`Command '${command}' ran`);
  console.debug(e);
});
