import { Injectable, Optional, Inject, EventEmitter } from '@angular/core';
import { BaseService, System_Configure } from '@app/shared/service';
import { IPagingService } from '@app/shared/IPagingService';
import { Customer } from '../models/customer.model';
import { SystemConfiguration } from '@app/shared/model/system-config';
import { PagingModel } from '@app/shared/model/PagingModel';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';


@Injectable()
export class CustomerService extends BaseService implements IPagingService<Customer> {
    url: string;
    pdfDownloaded: EventEmitter<any> = new EventEmitter<any>();
    emailClosed: EventEmitter<any> = new EventEmitter<any>();
    constructor(protected http: HttpClient, @Optional() @Inject(System_Configure) config?: SystemConfiguration, ) {
        super(http, config);
        this.url = '/profiles';
    }
    getSampleData(): Observable<Customer[]> {
        let customers = [];
        let c1 = new Customer();
        c1.ndis_id = "984161";
        c1.first_name = "Elija"
        c1.last_name = "Thai"
        c1.last_updated = "12/02/2017"


        customers.push(c1);
        let c2 = new Customer();
        c2.ndis_id = "123456";
        c2.first_name = "Susie"
        c2.last_name = "White"
        c2.last_updated = "02/09/2018"

        customers.push(c2)
        // let result = new PagingModel<Customer>();
        // result.totalCount = 2;
        // result.items = customers;
        return of(customers);
    }
    getAll(request: PagingModel<Customer>): Observable<Customer[]> {

        //return this.getSampleData();
        return this.get(this.url + '?' + request.serializeQuery());
    }

    searchAll(terms: string, count: number = 1000, excludedIds: any[]): Observable<Customer[]> {
        return this.get(this.url + '/search?terms=' + terms + '&count=' + count + '&excludedIds=' + excludedIds);
    }

    create(customerCode: Customer): Observable<Customer> {
        return this.post<Customer>(this.url, customerCode);
    }

    update(customerCode: Customer): Observable<Customer> {
        return this.put<Customer>(`${this.url}/${customerCode.ndis_id}`, customerCode);
    }

    deleteCustomer(customerId: string) {
        return this.delete(`${this.url}/${customerId}`);
    }
    getById(id: string): Observable<Customer> {
        return this.get<Customer>(`${this.url}/${id}`);
    }
    getSurvey(surveyName: string): Observable<any> {
        return this.get(`/surveys/${surveyName}`);
    }

    finishedDownloadPdf() {
        this.pdfDownloaded.emit();
    }

    closeEmailPopup() {
        this.emailClosed.emit();
    }
}
