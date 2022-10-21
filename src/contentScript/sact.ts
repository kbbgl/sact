import { SactModal } from "../components/modal/sactModal";
import {
  getFilteredAnchorElements,
  SactMessage,
  SactMessageSender,
  SactMessageType,
} from "../utils/sact";

console.group("Extract Anchors");
console.log("Extracting anchors from page...");
const anchors: HTMLAnchorElement[] = Array.from(
  document.getElementsByTagName("a")
);
console.debug(`Found ${anchors.length} <a>. Converting to SactElements...`);
const sactElements = getFilteredAnchorElements(anchors);
console.debug(`Found ${sactElements.length} <a> after filtering`);
console.debug(`Sending to background`);
console.debug(sactElements);
console.groupEnd();

// Send message to BG to update badge
console.group("Badge update");
console.log("Sending message to update badge with link count...");
const message: SactMessage = {
  content: `${sactElements.length}`,
  type: SactMessageType.UPDATE_BADGE,
  source: SactMessageSender.CONTENT_SCRIPT,
  destination: SactMessageSender.BACKGROUND,
};
chrome.runtime.sendMessage(null, message, (res: SactMessage) => {
  switch (res.type) {
    case SactMessageType.UPDATE_BADGE_COMPLETE:
      console.log(res.content);
      break;

    default:
      break;
  }
});
console.groupEnd();

// Listeners
chrome.runtime.onMessage.addListener(
  (message: SactMessage, sender, sendResponse) => {
    console.log(`Message received`);

    switch (message.type) {
      case SactMessageType.SHOW_MODAL:
        /*
        When user presses hotkey (CTRL + Shift + K):
        1. A modal is created
        2. A search bar is created and focused
        3. 
        */
        console.log("Activate sact");

        let modal: HTMLElement;
        if (document.getElementById("sact-modal")) {
          modal = document.getElementById("sact-modal");
          modal.style.display = "block";
          console.log("Sact already loaded in webpage");
        } else {
          modal = SactModal.createModal(sactElements);
          document.body.appendChild(modal);
        }

        // Make search field focus
        document.getElementById("sact-search-bar").focus();

        // Hide Sact search when click outside modal
        window.onclick = (event: Event) => {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };

        // Hide Sact search when ESC pressed
        document.body.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            modal.style.display = "none";
          }
          return;
        });

        sendResponse("Activation completed");
        break;

      default:
        break;
    }
  }
);
