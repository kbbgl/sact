import { SactElement } from "../../utils/sact";
import { SactLinkList } from "./list/linkList";
import "./sactModal.css";
import { SactSearchBar } from "./searchbar/searchBar";

export class SactModal extends HTMLDivElement {
  private static instance: SactModal;

  searchBar: SactSearchBar;
  linkList: SactLinkList;

  constructor() {
    super();
    this.id = "sact-modal";
    this.className = "modal";
  }

  public static getInstance(): SactModal {
    if (!SactModal.instance) {
      SactModal.instance = new SactModal();
    }

    return SactModal.instance;
  }

  public setSearchBar(searchBar: SactSearchBar): void {
    this.appendChild(searchBar);
  }

  public getSearchBar(): SactSearchBar {
    return this.searchBar;
  }

  public setLinkList(linkList: SactLinkList): void {
    this.appendChild(linkList);
  }

  public getLinkList(): SactLinkList {
    return this.linkList;
  }

  public static createModal(sactElements: SactElement[]): HTMLDivElement {
    const modalSearchBar = SactSearchBar.createSearchBar(sactElements);

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.appendChild(modalSearchBar);

    const modal = document.createElement("div");
    modal.id = "sact-modal";
    modal.className = "modal";
    modal.appendChild(modalContent);

    return modal;
  }
}
