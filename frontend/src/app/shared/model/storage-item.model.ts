import { JsDataTypeEnum } from 'app/shared/enums/js-data-type.enum';

export class StorageItem {
  constructor(
    public key: string,
    public value: string,
    public type: JsDataTypeEnum,
  ) {}

  static parse(key: string, value: any): StorageItem {
    const type = typeof value as JsDataTypeEnum;
    const val = JSON.stringify(value);
    return new StorageItem(key, val, type);
  }

  static parseFromString(json: string): StorageItem {
    const jsonVal = JSON.parse(json);
    const item = new StorageItem('', '', JsDataTypeEnum.Undefined);
    return Object.assign(item, jsonVal);
  }

  getValue() {
    if (this.type === JsDataTypeEnum.Number) return parseFloat(this.value);
    if (this.type === JsDataTypeEnum.String) return this.value as string;
    if (this.type === JsDataTypeEnum.Object) return JSON.parse(this.value);
    return undefined;
  }
}
