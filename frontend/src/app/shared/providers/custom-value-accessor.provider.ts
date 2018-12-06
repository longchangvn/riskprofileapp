import { CUSTOM_PROVIDER } from 'app/shared/providers/custom.provider';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export function CUSTOM_VALUE_ACCESSOR(customFrmCtrl: any) {
    return CUSTOM_PROVIDER(NG_VALUE_ACCESSOR, customFrmCtrl);
}

