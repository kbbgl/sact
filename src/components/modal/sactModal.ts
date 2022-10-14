import { SactElement } from "../../utils/sact";
import "./sactModal.css";
import { createSearchBar } from "./searchbar/searchBar";

export function createModal(sactElements: SactElement[]): HTMLDivElement {
  const modalClose = document.createElement("span");
  modalClose.className = "close";
  modalClose.innerText = "X";

  const modalSearchBar = createSearchBar(sactElements);

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.appendChild(modalClose);
  modalContent.appendChild(modalSearchBar);

  const modal = document.createElement("div");
  modal.id = "sact-modal";
  modal.className = "modal";
  modal.appendChild(modalContent);

  modalClose.onclick = () => {
    modal.style.display = "none";
  };

  return modal;
}
