import { Input, Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { IPopupComponentWrapper } from "@app/interfaces/ipopup-component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "@app/common/notifications/notification-service";
import { of } from "rxjs/observable/of";
import { PopupConfig } from "@app/common/popup-component-wrapper/popup-object-result-model";
import { PopupComponentWrapper } from "@app/common/popup-component-wrapper/popup-component-wrapper";
import { CustomerService } from "@app/modules/partners/services/customer-service";


@Component({
    selector: 'convert-pdf-popup',
    templateUrl: './convert-to-pdf.component.html',
    styleUrls:['./convert-to-pdf.component.scss']
})
export class ConvertPDFPopupComponent implements OnInit, AfterViewInit, IPopupComponentWrapper {
    createTitle = 'CUSTOMER.PAGE.PDF_POPUP_TITLE';
    editTitle = 'CUSTOMER.PAGE.PDF_POPUP_TITLE';
    isEditing: boolean;
    dataSource: any[] = [];
    filteredRows: any[] = [];
    checks: any = {};

    @Input() transactionItemId: string;
    getFormGroup(): FormGroup {
        return this.formBuilder.group({});
    }
    popupSave(): Observable<any> {

        return of({});
    }
    popupCancel() {

    }
    showCreatePopup(survey) {

    }
    showEditPopup(survey) {

    }

    ngAfterViewInit(): void {

    }
    component: any;
    constructor(private formBuilder: FormBuilder,
        private translateService: TranslateService,
        private customerService: CustomerService,
        private notifier: NotificationService) {

    }

    ngOnInit() {

    }

    done() {
        this.customerService.finishedDownloadPdf();
    }
}
