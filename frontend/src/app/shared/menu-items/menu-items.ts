import { Injectable } from '@angular/core';
import { HelperService } from '../service/helper-services';
import { TokenPayload } from '../model/token-payload';




export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type?: string;
  permission?: any[],
  icon?: string;
  badge?: BadgeItem[];
  children?: Menu[];
}

const MENUITEMS = [
   
  {
    state: 'profiles',
    name: 'APPLICANTS',
    
    type: 'sub',
    icon: 'basic-spread-text-bookmark',
    children: [
      {
        state: 'list',
        name: 'CUSTOMER.TITLE'
      },
    ]
  }
];

@Injectable()
export class MenuItems {
  payload: TokenPayload = new TokenPayload()
  /**
   *
   */
  constructor(
    private helper: HelperService) {
    this.payload = new TokenPayload()
  }
  getAll(): Menu[] {
    //Temporary comment out 
    //this.filterAuthroizedMenu(MENUITEMS);
    return MENUITEMS;
  }

  filterAuthroizedMenu(menu: Menu[]) {
    menu.forEach(x => {
      if (!x.permission)
        return;
      else {
        let intersection = [];
        if (this.payload.Permission instanceof Array) {
          intersection = this.payload.Permission.filter(permission => x.permission.includes(permission))
        }
        else {
          //Orchard return string permission if have only 1, retur array if more than 1
          intersection = x.permission.includes(this.payload.Permission) ? [this.payload.Permission] : [];
        }
        if (intersection.length === 0) {
          const index = menu.indexOf(x);
          if (index >= 0) {
            menu.splice(index, 1);
          }
        }

      }
      if (x.children)
        this.filterAuthroizedMenu(x.children);
    });
  }
  add(menu: Menu) {
    // MENUITEMS.push(menu);
  }
}

