
import { Component } from "@angular/core";
import { CustomersListComponent } from "@app/modules/partners/list-applicants/list-customers.component";

@Component({
    selector: "list-people",
    template: '<list-component-wrapper [canSearch]="false" [component]="formComponent"></list-component-wrapper>'

})
export class ListCustomerWrapperComponent {
    formComponent: any = CustomersListComponent; 
}