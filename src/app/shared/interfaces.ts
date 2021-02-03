export interface User {
  address?: Address;
  description?: string;
  email: string;
  firstName: string;
  lastName: string;
  id: number;
  phone: number;
}

export interface Address {
  [key: string]: string;
  city: string;
  state: string;
  streetAddress: string;
  zip: string;
}

export interface OptionsPostcard {
  size: string;
  background: string;
}

export interface Block {
  id: string;
  type: string;
  text: string;
  styles: Styles;
}

export interface Styles {
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  color: string;
  minHeight?: string;
  marginLeft?: string;
}

export interface Icon {
  title?: string;
  styleName: string;
  nameIcon: string;
  selected: boolean;
}

export interface DocInfo {
  docName: string;
  id: string;
}
