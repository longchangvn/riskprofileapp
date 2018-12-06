import { Component, AfterViewInit, ViewChild, ComponentRef, Input, Type, ChangeDetectorRef } from '@angular/core';
import { ConfirmComponent } from '../confirm-modal/confirm-component';
import { ICommonComponent } from '@app/interfaces/icommon-componnent';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../notifications/notification-service';
import { ActionButton } from '@app/common/component-wrapper/action-button.model';

@Component({
    selector: 'component-wrapper',
    templateUrl: './component-wrapper.html',
    styleUrls: ['./component-wrapper.scss']
})
export class ComponentWrapper implements AfterViewInit {
    @ViewChild('confirm') confirm: ConfirmComponent;
    @Input() component: Type<any>;
    @Input() actionButtons: ActionButton[] = [];
    title = '';
    saving: boolean;
    componentRef: ComponentRef<ICommonComponent>;
    get ableToSave(): boolean {
        return this.componentRef
            && this.componentRef.instance.getFormGroup().valid
            && !this.saving;
    }
    constructor(
        private translate: TranslateService,
        private notify: NotificationService,
        private cdf: ChangeDetectorRef
    ) { 
        
    }
showAlert(){
    alert("this is me");
}
    public get formDirty(): boolean {
        if (!this.componentRef) return false;
        return this.componentRef.instance.getFormGroup().dirty;
    }

    ngAfterViewInit(): void {
        const readonly = this.componentRef.instance.readonly;
        readonly ? this.disableInputs() : this.enableInputs();

        this.cdf.detectChanges();
    }
    disableInputs() {
        this.componentRef.instance.getFormGroup().disable();
    }
    enableInputs() {
        this.componentRef.instance.getFormGroup().enable();
    }
    updateComponent(ref) {
        this.componentRef = ref;
        this.componentRef.changeDetectorRef.detectChanges();
    }
    saveHandler($event) {
        this.componentRef.instance.validateForm().subscribe(validationResult => {
            if (validationResult.result) {
                if (!this.componentRef.instance.getFormGroup().valid || this.saving) {
                    return;
                }
                this.componentRef.instance.save().subscribe(result => {

                    this.saving = false;
                    // if (result) {
                    //     this.componentRef.instance.pathValue(result)
                    //     this.componentRef.instance.gotoEdit(result.itemId);
                    // }
                    this.componentRef.instance.getFormGroup().markAsPristine();

                    this.translate.get('COMMON.OPERATION.SAVESUCCESSFUL').subscribe(result => {
                        this.notify.success(result);
                    });

                }, err => {
                    this.saving = false;
                    this.translate.get('COMMON.OPERATION.SAVEFAILED').subscribe(result => {
                        this.notify.error(result);
                    });

                });
            }
            else {
                //use toaster service display message
                this.translate.get(validationResult.messageBody).subscribe(result => {
                    this.notify.error(result, 'Error')
                })

            }
        })

    }
    // addNewHandler(){
    //     const isDirtied = this.componentRef.instance.getFormGroup().dirty;
    //     if (!isDirtied) {
    //         this.componentRef.instance.();
    //         this.confirm.hide();
    //         return;
    //     }

    // }
    cancelHandler($event) {
        const isDirtied = this.componentRef.instance.getFormGroup().dirty;
        if (!isDirtied) {
            this.componentRef.instance.cancel();
            this.confirm.hide();
            return;
        }

        this.confirm.show()
            .do(result => result && this.componentRef.instance.cancel())
            .subscribe(() => this.confirm.hide());
    }

    addNewHandler($event) {
        const isDirtied = this.componentRef.instance.getFormGroup().dirty;
        if (!isDirtied) {
            this.componentRef.instance.gotoCreate();
            this.confirm.hide();
            return;
        }

        this.confirm.show()
            .do(result => result && this.componentRef.instance.gotoCreate())
            .subscribe(() => this.confirm.hide());
    }
}
