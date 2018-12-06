import { Injectable } from '@angular/core';
import { JsDataTypeEnum } from 'app/shared/enums/js-data-type.enum';

@Injectable()
export class TypeUtility {
  constructor() { }

  public isDefined(val: any) {
    return !!val;
  }

  public isValidArray(arr: Array<any>): boolean {
    return this.isDefined(arr) && arr instanceof Array && arr.length > 0;
  }

  public isEmptyArray(arr: Array<any>): boolean {
    return this.isDefined(arr) && arr.length === 0;
  }

  public isValidNumber(number: any): boolean {
    return !isNaN(number);
  }

  public isPositiveNumber(number: any): boolean {
    return !isNaN(number) && number > 0;
  }

  public isNegativeNumber(number: any): boolean {
    return !isNaN(number) && number < 0;
  }

  public isInteger(number: any): boolean {
    return !isNaN(number) && number % 1 === 0;
  }

  public hasDecimal(number: any): boolean {
    return !isNaN(number) && number % 1 > 0;
  }

  public isValidDictionary(obj: any): boolean {
    const type = this.getType(obj);
    return type !== JsDataTypeEnum.Undefined
          && type === JsDataTypeEnum.Object
          && this.hasProperty(obj);
  }

  public isDate(value: any): boolean {
    return this.isDefined(value)
          && typeof value === JsDataTypeEnum.Object
          && isNaN(value.getTime()) === false;
  }

  public getLength(obj: any): number {
    const type = this.getType(obj);
    if (type !== JsDataTypeEnum.Object) return 0;
    return Object.keys(obj).length;
  }

  public getType(object: any): JsDataTypeEnum {
    return typeof object as JsDataTypeEnum;
  }

  public getFieldNames(object: any): string[] {
    if (!this.isDefined(object)) return [];
    const type = this.getType(object);
    if (type !== JsDataTypeEnum.Object) return [];
    return Object.keys(object);
  }

  public hasProperty(object: any, propName = ''): boolean {
    const fieldNames = this.getFieldNames(object);
    if (propName.length) return fieldNames.includes(propName);
    return fieldNames.length > 0;
  }
}
