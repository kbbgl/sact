import { SactModal } from "../components/modal/sactModal";
// import "@webcomponents/webcomponentsjs/webcomponents-bundle.js";
// import "@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce.js";
// import "@webcomponents/custom-elements";
import {
  getFilteredAnchorElements,
  SactMessage,
  SactMessageType,
} from "../utils/sact";

// https://stackoverflow.com/questions/9515704/access-variables-and-functions-defined-in-page-context-using-a-content-script
// https://stackoverflow.com/questions/74086193/using-webcomponents-in-chrome-extension?noredirect=1#comment130806617_74086193
// var s = document.createElement("script");
// s.src = chrome.runtime.getURL("webcomponents-loader.js");
// (document.head || document.documentElement).appendChild(s);
// s.onload = () => {
//   window.customElements.define("sact-modal", SactModal, { extends: "div" });
//   // s.remove();
// };

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
    console.log(`Message received`);

    if (message.type === SactMessageType.ACTIVATE) {
      console.log("Activate sact");

      let modal: HTMLElement;
      // const modal = document.createElement("sact-modal");

      // let modal: HTMLElement;
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
    }
  }
);
