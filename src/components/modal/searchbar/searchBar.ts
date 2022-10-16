import { SactElement } from "../../../utils/sact";
import { SactLinkList } from "../list/linkList";
import "./searchBar.css";

export class SactSearchBar extends HTMLInputElement {
  private static instance: SactSearchBar;
  elements: SactElement[];
  searchTerm: string;

  private constructor() {
    super();
    this.type = "search";
    this.placeholder = `Found ${this.elements.length} links in the page, let's search them!`;
    this.id = "sact-search-bar";
    this.onkeyup = this.setSearchTerm;
  }

  private setSearchTerm(): void {
    console.log(`Setting search term: ${this.value}`);

    this.searchTerm = this.value;
  }

  public static getInstance(): SactSearchBar {
    if (!SactSearchBar.instance) {
      SactSearchBar.instance = new SactSearchBar();
    }

    return SactSearchBar.instance;
  }

  public setElements(elements: SactElement[]): void {
    this.elements = elements;
  }

  public getElements(search?: string): SactElement[] {
    return this.elements;
  }

  public static createSearchBar(links: SactElement[]): HTMLInputElement {
    const modalSearchBar = document.createElement("input");
    modalSearchBar.type = "search";
    modalSearchBar.placeholder = `Found ${links.length} links in the page, let's search them!`;
    modalSearchBar.id = "sact-search-bar";

    modalSearchBar.onkeyup = () => {
      let input = modalSearchBar.value.toLowerCase();
      if (input) {
        // Remove all links
        // document.getElementById("sact-modal").outerHTML = "";

        let linkElements: SactElement[] = [];
        links.forEach((link) => {
          if (link.text.toLowerCase().includes(input)) {
            linkElements.push(link);
          }
        });
        console.log(
          `Search term '${input}' found ${linkElements.length} links`
        );

        let linkElementsDisplay = SactLinkList.createLinkList(linkElements);
        // document.getElementById("sact-modal").appendChild(linkElementsDisplay);
      }

      return;
    };

    return modalSearchBar;
  }
}
