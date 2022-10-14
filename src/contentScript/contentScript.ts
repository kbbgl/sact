import {
  getFilteredAnchorElements,
  SactMessage,
  SactMessageType,
} from "../utils/sact";

console.log("Content script started");

const anchors: HTMLAnchorElement[] = Array.from(
  document.getElementsByTagName("a")
);

console.debug(`Converting anchors to SactElements...`);
const sactElements = getFilteredAnchorElements(anchors);

console.debug(`Sending ${sactElements.length} URLs to background`);
console.debug(sactElements);

// Send message to BG to update badge
const message: SactMessage = {
  content: `${sactElements.length}`,
  type: SactMessageType.UPDATE_BADGE_LINKS_FOUND,
};
chrome.runtime.sendMessage(null, message, (res) => {
  console.log(`Response`, res);
});

// Listeners
chrome.runtime.onMessage.addListener(
  (message: SactMessage, sender, sendResponse) => {
    console.log("Message received");

    if (message.type === SactMessageType.ACTIVATE) {
      console.log("Activate sact");
      sendResponse("Activation completed");
    }
  }
);
