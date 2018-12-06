import { Injectable } from '@angular/core';

@Injectable()
export class StringUtility {
  constructor() { }

  public generateRandom(length: number) {
    const defaultCount = 11;
    const paddingLeft = 2;
    length = length || defaultCount;
    const count = length / defaultCount;
    if (count === 0) {
      return Math.random().toString(36).substring(paddingLeft, paddingLeft + length);
    }
    const randoms = Array(count + 1).fill(0).map( () =>
      Math.random().toString(36).substring(paddingLeft)
    );
    randoms.join('').substring(0, length);
  }

  compareIgnoreCase(a: string, b: string): boolean {
    return a.toLocaleUpperCase() === b.toLocaleUpperCase();
  }

  containIgnoreCase(value: string, searchTerm: string): boolean {
    return value.toLocaleUpperCase().indexOf(searchTerm.toLocaleUpperCase()) > -1;
  }
}
