import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { IModule } from 'app/interfaces/imodule';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartnerRoutes } from '@app/modules/partners/partner.routing';
import { ListCustomerWrapperComponent } from '@app/modules/partners/list-applicants/list-customer-wrapper.component';
import { CustomerRiskAssessmentWrapperComponent } from '@app/modules/partners/risk-assessment/customer-riskassessment-wrapper.component';
import { CustomersListComponent } from '@app/modules/partners/list-applicants/list-customers.component';
import { CustomerService } from '@app/modules/partners/services/customer-service';
import { RiskAssessmentDetailFormComponent } from '@app/modules/partners/risk-assessment/form/risk-assessment--detail-form';


@NgModule({
    declarations: [
        ListCustomerWrapperComponent ,
        CustomersListComponent,
        CustomerRiskAssessmentWrapperComponent ,
        RiskAssessmentDetailFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        JsonpModule,
        RouterModule.forChild(PartnerRoutes),
        TranslateModule.forChild(),
        SharedModule,
        ModalModule.forRoot()
    ],
    providers: [
        CustomerService
    ],
    bootstrap: [
        CustomerRiskAssessmentWrapperComponent,
        CustomersListComponent,
        RiskAssessmentDetailFormComponent
      ]
})
export class PartnerModule implements IModule {
    name = 'Management.Applicants';
}
