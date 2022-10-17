export interface SactElement {
  id: string;
  text: string;
  href: string;
}

export enum SactMessageType {
  SHOW_MODAL,
  UPDATE_BADGE,
  UPDATE_BADGE_COMPLETE,
}

export interface SactMessage {
  type: SactMessageType;
  content: string;
}

export function getFilteredAnchorElements(
  anchors: HTMLAnchorElement[]
): SactElement[] {
  console.debug(
    `Anchors fed into 'getFilteredAnchorElements': ${anchors.length}`
  );
  let filtered = anchors.filter(
    (anchor) => anchor.href !== "javascript:void(0)" && anchor.innerText
  );
  console.debug(
    `Anchors after filtering of empty and void href: ${filtered.length}`
  );

  filtered = filtered.filter(
    (anchor, index, self) =>
      index ===
      self.findIndex(
        (a) => a.innerText === anchor.innerText && a.href === anchor.href
      )
  );

  console.debug(`Anchors after filtering duplicates: ${filtered.length}`);

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
