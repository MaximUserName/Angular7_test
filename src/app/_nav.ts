export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: any;
  title?: boolean;
  children?: any;
  variant?: string;
  attributes?: object;
  divider?: boolean;
  class?: string;
}

export const navItems: NavData[] = [
  
];

export class navDataObj {
  constructor(
    public name:string,
    public icon:string,
    public url: string,
    public children:any
  ){

  }
}