import { getFilteredAnchorElements } from "../utils/sact";

console.log("Content script started");

const anchors: HTMLAnchorElement[] = Array.from(
  document.getElementsByTagName("a")
);

console.debug(`Converting anchors to SactElements...`);
const sactElements = getFilteredAnchorElements(anchors);

console.debug(`Sending ${sactElements.length} URLs to background`);
console.debug(sactElements);

chrome.runtime.sendMessage(null, sactElements, (res) => {
  console.log(`Response`, res);
});
