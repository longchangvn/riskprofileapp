import { ControlValueAccessor } from '@angular/forms';

export class BaseControlValueAccessor implements ControlValueAccessor {
    protected _disabled: boolean;
    protected _onChange = (_: any) => {};
    protected _onTouched = (_: any) => {};
    constructor() {}

    writeValue(obj: any): void {}
    registerOnChange(fn: any): void {
        this._onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this._disabled = isDisabled;
    }
}