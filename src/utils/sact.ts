export interface SactElement {
  id: string;
  text: string;
  href: string;
}

// export interface SactDTO {
//   extensionId: string;
//   url: string;
//   tabIndex: number;
//   tabId: number;
//   links?: SactElement[];
// }

export function getFilteredAnchorElements(
  anchors: HTMLAnchorElement[]
): SactElement[] {
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

  filtered = null;

  return elements;
}
