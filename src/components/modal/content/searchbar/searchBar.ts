import { SactElement } from "../../../../utils/sact";
import { SactLinkList } from "../../content/list/linkList";
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
    const modalSearchBar: HTMLInputElement = document.createElement("input");
    modalSearchBar.type = "search";
    modalSearchBar.placeholder = `Found ${links.length} links in the page, let's search them!`;
    modalSearchBar.id = "sact-search-bar";
    modalSearchBar.setAttribute("list", "sact-search-bar-list");
    // const searchBarAutomcompleteList: HTMLDataListElement =
    //   SactSearchBar.createAutocompleteList(links);
    // modalSearchBar.appendChild(searchBarAutomcompleteList);

    // When value is entered into search input
    modalSearchBar.onkeyup = () => {
      let input = modalSearchBar.value.toLowerCase();
      if (input) {
        let linkElements: SactElement[] = [];
        links.forEach((link) => {
          if (link.text.toLowerCase().includes(input)) {
            linkElements.push(link);
          }
        });
        console.log(
          `Search term '${input}' found ${linkElements.length} links`,
          linkElements
        );

        if (modalSearchBar.hasChildNodes()) {
          modalSearchBar.removeChild(
            document.getElementsByTagName("datalist")[0]
          );
        }

        const searchBarAutomcompleteList: HTMLDataListElement =
          SactSearchBar.createAutocompleteList(linkElements);
        modalSearchBar.appendChild(searchBarAutomcompleteList);
      }

      return;
    };

    // When search bar item is selected, redirect user to selected URL
    modalSearchBar.onchange = () => {
      if (modalSearchBar.value) {
        console.debug(`Selected value '${modalSearchBar.value}'`);
        const redirectionLink: string = links.find(
          (link) => link.text === modalSearchBar.value
        ).href;
        console.debug(`Redirecting to ${redirectionLink}...`);
        window.location.href = redirectionLink;
      }

      // TODO find element
      // const as = Array.from(document.getElementsByTagName("a"));
      // as.forEach((a) => {
      //   if (a.innerText.toLowerCase() === modalSearchBar.value.toLowerCase()) {
      //     console.log(`found matching element to scroll to: ${a}`);

      //     a.scrollIntoView({
      //       behavior: "smooth",
      //       block: "nearest",
      //       inline: "center",
      //     });
      //   }
      // });

      // const element = document.querySelector(
      //   `a[text="${modalSearchBar.value}"]`
      // );
      // console.log(`[text="${modalSearchBar.value}"]`);

      // matchingElement.scrollIntoView({
      //   behavior: "smooth",
      //   block: "center",
      // });

      return;
    };

    modalSearchBar.oninput = (event) => {
      console.debug(`oninput.event:`, event);
    };

    return modalSearchBar;
  }

  static createAutocompleteList(elements: SactElement[]): HTMLDataListElement {
    let datalist: HTMLDataListElement = document.createElement("datalist");
    datalist.id = "sact-search-bar-list";

    elements.forEach((element) => {
      let dlElement: HTMLOptionElement = document.createElement("option");
      dlElement.innerText = `${element.text}`;
      dlElement.label = `${element.href}`;
      dlElement.onfocus = (event) => {
        console.log(`onfocus: ${event}`);
      };
      dlElement.autocapitalize = "sentences";

      datalist.appendChild(dlElement);
    });

    return datalist;
  }
}
