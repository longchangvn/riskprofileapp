import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PagedListingComponentBase } from 'app/common/base/page-list-base-component';
import { Customer } from '@app/modules/partners/models/customer.model';
import { CustomerService } from '@app/modules/partners/services/customer-service';
import { PagingModel } from '@app/shared/model/PagingModel';
import { FilterCriteria } from '@app/shared/model/filter-criteria';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class CustomersListComponent extends PagedListingComponentBase<Customer> {
  title = 'LIST OF APPLICANTS';
  currentSelectedCustomers: Customer;
  active = false;
  customers: Customer[];
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private translate: TranslateService
  ) {
    super();
    this.pagingModel = new PagingModel<Customer>();
    this.fetchDataMethod = (request: PagingModel<Customer>) => {
      let m = new PagingModel<Customer>();
      
      return of(m) }

    this.customerService.getAll(this.pagingModel).subscribe(result => {
      this.customers = result;
      this.pagingModel.items= this.customers;
      this.pagingModel.totalCount = result.length;
    });
  }
  protected popupEdit(id: any) {
  }
  protected popupCreate() {
  }
  protected pageEdit(id: any) {
    this.router.navigate(['/partners/customer/edit', id]);
  }
  protected pageCreate() {
    this.router.navigateByUrl('/partners/customer/new');
  }

  delete(customer: Customer): void {
    if (customer) {
      this.customerService.deleteCustomer(customer.ndis_id);
    }
  }

  onSelect({selected}) {
    this.router.navigateByUrl('/partners/risk/' + selected[0].ndis_id);
  }
}
