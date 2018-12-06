import { Component } from "@angular/core";
import { RiskAssessmentDetailFormComponent } from "@app/modules/partners/risk-assessment/form/risk-assessment--detail-form";
import { ActionButton } from "@app/common/component-wrapper/action-button.model";
import { CustomerService } from "@app/modules/partners/services/customer-service";

@Component({
    selector: "create-people",
    template: '<component-wrapper [actionButtons]="actionButtons" [component]="formComponent"></component-wrapper>',
styleUrls:['./customer-riskassessment-wrapper.component.scss']
})
export class CustomerRiskAssessmentWrapperComponent {
    formComponent: any = RiskAssessmentDetailFormComponent
    actionButtons : ActionButton[] = [];
    constructor(private customerService: CustomerService){
        let btn = new ActionButton();
        btn.displayText="Convert To PDF";
        btn.action = this.customerService.openPDFConvertPopup.bind(this.customerService);
        this.actionButtons.push(btn)
    }
}