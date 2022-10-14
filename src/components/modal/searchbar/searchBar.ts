import { SactElement } from "../../../utils/sact";

function onSearch() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("sact-search-bar");
  filter = input.value.toUpperCase();
}

export function createSearchBar(links: SactElement[]): HTMLInputElement {
  const modalSearchBar = document.createElement("input");
  modalSearchBar.type = "search";
  modalSearchBar.placeholder = "Search for links in page";
  modalSearchBar.id = "sact-search-bar";
  modalSearchBar.onkeyup = onSearch;

  return modalSearchBar;
}
