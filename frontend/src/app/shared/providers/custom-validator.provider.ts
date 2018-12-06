import { NG_VALIDATORS } from '@angular/forms';
import { CUSTOM_PROVIDER } from 'app/shared/providers/custom.provider';

export function CUSTOM_VALIDATOR(customValidator: any) {
    return CUSTOM_PROVIDER(NG_VALIDATORS, customValidator);
}