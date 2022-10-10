export interface SactElement {
  id: string;
  text: string;
  href: string;
}

export interface SactDTO {
  extensionId: string;
  url: string;
  tabIndex: number;
  tabId: number;
  links?: SactElement[];
}
