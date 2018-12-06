import { forwardRef } from '@angular/core';

export function CUSTOM_PROVIDER (providerCls: any, usedSymbol: any) {
  return {
    provide: providerCls,
    useExisting: forwardRef(() => usedSymbol),
    multi: true
  };
}

