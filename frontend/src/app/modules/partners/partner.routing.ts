import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomerWrapperComponent } from '@app/modules/partners/list-applicants/list-customer-wrapper.component';
import { CustomerRiskAssessmentWrapperComponent } from '@app/modules/partners/risk-assessment/customer-riskassessment-wrapper.component';


export const PartnerRoutes: Routes = [
    {
        path: 'list',
        component: ListCustomerWrapperComponent,
    },
    { path: 'risk/:id', component: CustomerRiskAssessmentWrapperComponent },
    // { path: 'edit/:id', component: CreatePeopleWrapperComponent },
    // { path: 'product-setting', component: PeopleProductSettingComponent },
    // { path: 'product-setting/:empId', component: PeopleProductSettingComponent }
];
