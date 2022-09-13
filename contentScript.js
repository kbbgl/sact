/**
 * @param {any[]} urls
 */
function filterUrls(urls) {
  let filtered = urls.filter((url) => url.href !== "javascript:void(0)");

  return filtered;
}

const links = Array.from(document.getElementsByTagName("a"));
console.log(`Found ${links.length} links in ${window.location.href}`);

const urls = filterUrls(links);

// Iterate over all hyperlinks to retrieve their text and URL
const linksTitle = [];
for (var i = 0; i < urls.length; i++) {
  let lt = {
    link: urls[i].href,
    text: urls[i].textContent,
  };

  linksTitle.push(lt);
}

// sends this to all bg and popup scripts in extension
chrome.runtime.sendMessage(null, linksTitle, (response) => {
  console.log(`sendResponse: ${response}`);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  console.log(sender);
});
