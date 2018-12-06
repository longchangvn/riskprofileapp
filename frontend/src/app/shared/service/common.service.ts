import { Injectable, Optional, Inject } from '@angular/core';
import { BaseService, System_Configure } from '.';
import { SystemConfiguration } from '../model/system-config';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommonService extends BaseService {
    url: string;
    constructor(protected http: HttpClient, @Optional() @Inject(System_Configure) config?: SystemConfiguration, ) {
        super(http, config);
        this.url = '/api/common/admin';
    }

    searchUser(userName: string): Observable<any> {
        return this.get<any>(`${this.url}/account/user-search?nameOrEmail=${userName}`);
    }
}