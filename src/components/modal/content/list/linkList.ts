import { SactElement } from "../../../../utils/sact";

//

export class SactLinkList extends HTMLUListElement {
  private static instance: SactLinkList;

  private constructor() {
    super();
    this.id = "sact-link-list";
  }

  public static getInstance(): SactLinkList {
    if (!SactLinkList.instance) {
      SactLinkList.instance = new SactLinkList();
    }

    return SactLinkList.instance;
  }

  setLinkList(sactElements: SactElement[]): void {
    sactElements.forEach((element) => {
      const linkSearchListItem = document.createElement("li");
      const linkSearchLink = document.createElement("a");
      linkSearchLink.href = element.href;
      linkSearchLink.innerText = element.text;

      linkSearchListItem.appendChild(linkSearchLink);

      this.appendChild(linkSearchListItem);
    });
  }

  public static createLinkList(links: SactElement[]): HTMLUListElement {
    let ul = document.createElement("ul");
    ul.id = "sact-link-list";

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
}

// create(): void {
//   this.sactElements.forEach((element) => {
//     const linkSearchListItem = document.createElement("li");
//     const linkSearchLink = document.createElement("a");
//     linkSearchLink.href = element.href;
//     linkSearchLink.innerText = element.text;

//     linkSearchListItem.appendChild(linkSearchLink);

//     this.appendChild(linkSearchListItem);
//   });
// }
// }

// export function clearLinkList(): HTMLUListElement {
//   ul.remove;
// }
