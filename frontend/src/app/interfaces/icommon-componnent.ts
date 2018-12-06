import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';

export interface ICommonComponent {
    createTitle: string;
    editTitle: string;
    isEditing: boolean;
    readonly: boolean;
    getFormGroup(): FormGroup;
    validateForm(): Observable<ValidationResultModel>;
    gotoEdit(itemId: string);
    save(): Observable<any>;
    pathValue(value: any);
    gotoCreate();
    cancel();
}

export class ValidationResultModel {
    public result: boolean;
    public messageBody: string;
    public title: string;
    constructor(result, message = '', title = '') {
        this.result = result;
        this.messageBody = message;
        this.title = title;
    }
}