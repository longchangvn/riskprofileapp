import { Injectable, Inject } from '@angular/core';
import { WindowRef, DefaultStorageType } from 'app/shared/providers';
import { Dictionary } from 'extension';
import { ClientStorageTypeEnum } from 'app/shared/enums/client-storage-type.enum';
import { StorageItem } from 'app/shared/model/storage-item.model';
import { JsDataTypeEnum } from 'app/shared/enums/js-data-type.enum';

@Injectable()
export class ClientStoreService {
  private store: WindowSessionStorage | WindowLocalStorage | Dictionary;
  constructor(
    @Inject(WindowRef) private window: Window,
    @Inject(DefaultStorageType) private storageType: ClientStorageTypeEnum
  ) {
    this.store = this.getStore(this.storageType);
  }

  private getStore(storageType: ClientStorageTypeEnum): any {
    // fallback to Memory
    // if Session/ Local is unavailable
    return this.window[storageType] || {};
  }

  get(key: string): any {
    const value = this.store[key];
    if (!value) return undefined;
    const item = StorageItem.parseFromString(value);
    return item.getValue();
  }

  set(key: string, value: any): void {
    const type = typeof value as JsDataTypeEnum;
    const val = JSON.stringify(value);
    const item = new StorageItem(key, val, type);
    this.store[key] = JSON.stringify(item);
  }

  remove(key: string): void {
    delete(this.store[key]);
  }
}

