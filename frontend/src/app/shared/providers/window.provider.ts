import { InjectionToken } from '@angular/core';

export const WindowRef = new InjectionToken<Window>('WindowRef');

export function windowFactory(): any {
    return window;
}

export const WindowProvider = {
    provide: WindowRef,
    useFactory: windowFactory
};
