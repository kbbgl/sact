import { SactElement } from "../../../utils/sact";

export function createLinkList(links: SactElement[]): HTMLUListElement {
  const ul = document.createElement("ul");
  ul.id = "link-list";

  links.forEach((element) => {
    const linkSearchListItem = document.createElement("li");
    const linkSearchLink = document.createElement("a");
    linkSearchLink.href = element.href;
    linkSearchLink.innerText = element.text;

    linkSearchListItem.appendChild(linkSearchLink);

    ul.appendChild(linkSearchListItem);
  });

  return ul;
}
