import { SactElement } from "../utils/sact-link";

console.log("Content script started");

function filterUrls(anchors: HTMLAnchorElement[]): SactElement[] {
  let filtered = anchors.filter(
    (anchor) => anchor.href !== "javascript:void(0)" && anchor.innerText
  );

  let elements: SactElement[] = [];
  filtered.forEach((element) => {
    let e: SactElement = {
      href: element.href,
      id: element.id,
      text: element.innerText,
    };

    elements.push(e);
  });

  filtered = undefined;

  return elements;
}

const anchors: HTMLAnchorElement[] = Array.from(
  document.getElementsByTagName("a")
);

const urlsInPage = filterUrls(anchors);

console.log(`Sending ${urlsInPage.length} URLs to background`);
console.log(urlsInPage);

chrome.runtime.sendMessage(null, urlsInPage, (res) => {
  console.log(res);
});

// Reply from BG
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message from background");

  console.log(`message: ${message}`);
  console.log(`sender: ${sender}`);
  console.log(`sendResponse: ${sendResponse()}`);
});
