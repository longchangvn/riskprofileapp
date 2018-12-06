import { Component } from "@angular/core";
import { RiskAssessmentDetailFormComponent } from "@app/modules/partners/risk-assessment/form/risk-assessment--detail-form";

@Component({
    selector: "create-people",
    template: '<component-wrapper [component]="formComponent"></component-wrapper>',
styleUrls:['./customer-riskassessment-wrapper.component.scss']
})
export class CustomerRiskAssessmentWrapperComponent {
    formComponent: any = RiskAssessmentDetailFormComponent
}