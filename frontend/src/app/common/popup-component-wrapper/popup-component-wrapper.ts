import { Component, ViewChild, Input, ComponentRef, ElementRef, Type, AfterViewInit, OnInit, EventEmitter, Output } from "@angular/core";
import { ConfirmComponent } from "../confirm-modal/confirm-component";
import { ICommonComponent } from "../../interfaces/icommon-componnent";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../notifications/notification-service";
import { ModalDirective } from "ngx-bootstrap";
import { IPopupComponentWrapper } from "../../interfaces/ipopup-component";
import { PopupConfig } from "@app/common/popup-component-wrapper/popup-object-result-model";

@Component({
    selector: "popup-component-wrapper",
    templateUrl: "./popup-component-wrapper.html"
})
export class PopupComponentWrapper {

    title: string;

    @ViewChild("confirm") comfirn: ConfirmComponent;
    @ViewChild('popModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;
    @Output() onSaved: EventEmitter<any> = new EventEmitter();
    @Input() events: any[] = [];
    @Input() modalSize: string = "";
    @Input() config: PopupConfig = new PopupConfig({});
    public componentRef: ComponentRef<IPopupComponentWrapper>;
    @Input() component: Type<any>;
    error: boolean;
    saving: boolean;
    constructor(private translate: TranslateService,
        private notify: NotificationService) {
        this.error = false;
    }
    updateComponent(ref) {
        this.componentRef = ref;
    }
    deleteHandler(){
        // this.componentRef.instance.
    }
    saveHandler(isKeepModal: Boolean) {
        if (!this.componentRef.instance.getFormGroup().valid) {
            this.error = true;
            return;
        }
        this.componentRef.instance.popupSave().subscribe(response => {

            this.saving = false;
            this.componentRef.instance.getFormGroup().patchValue(response);
            this.componentRef.instance.getFormGroup().markAsPristine();
            if (!isKeepModal)
                this.modal.hide();
       
            this.componentRef.instance.getFormGroup().reset();
            this.onSaved.emit(response);

        }, err => {
            this.saving = false;
            this.translate.get("COMMON.OPERATION.SAVEFAILED").subscribe(result => {
                this.notify.error(result);
            });

        });
    }
    cancelHandler() {
        if (this.componentRef.instance.getFormGroup().dirty)
            this.comfirn.show().subscribe(result => {
                if (result) {
                    this.modal.hide();
                    this.componentRef.instance.popupCancel();
                }
                this.comfirn.hide()
            });
        else
            this.modal.hide();

    }
    showModal() {
        this.modal.show();
    }
    showCreate(param:any = {}) {

        this.translate.get(this.componentRef.instance.createTitle).subscribe(text => {
            this.title = text;
        });
        this.componentRef.instance.getFormGroup().reset();
        this.componentRef.instance.isEditing = false;

        this.componentRef.instance.showCreatePopup(param);
        this.modal.show();
    }
    showEdit(item) {
        this.translate.get(this.componentRef.instance.editTitle, item).subscribe(text => {
            this.title = text;
        });
        this.componentRef.instance.getFormGroup().reset();
        this.componentRef.instance.isEditing = true;
        this.componentRef.instance.getFormGroup().patchValue(item);
        this.componentRef.instance.showEditPopup(item);
        this.modal.show();
    }

}