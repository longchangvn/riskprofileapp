import { Observable } from "rxjs/Observable";
import { FormGroup } from "@angular/forms";

export interface IPopupComponentWrapper {
    createTitle:string;
    editTitle:string;
    isEditing: boolean;
    getFormGroup(): FormGroup;
    popupSave():Observable<any>;
    popupCancel();
    showCreatePopup(param:any);
    showEditPopup(item:any);
    events:any[];
}