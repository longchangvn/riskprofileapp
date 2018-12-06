import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SystemConfiguration } from '../model/system-config';
import { ResponseContentType } from '@angular/http';
export const System_Configure = new InjectionToken<SystemConfiguration>('SYS_CONFIG');

@Injectable()
export class BaseService {
    protected baseUrl: string;

    constructor(protected http: HttpClient, @Optional() @Inject(System_Configure) systemConfig?: SystemConfiguration) {
        this.baseUrl = systemConfig.API_BASE_URL;
    }

    protected get<Type>(url: string): Observable<Type> {
        return this.http.get(this.baseUrl + url)
            .catch(this.handleError);
    }
    protected downloadFile<Blob>(url: string, option?: any): Observable<Blob> {
        option = option || { responseType: 'blob' };
        return this.http.get(this.baseUrl + url, option)
            .catch(this.handleError);
    }
    protected post<Type>(url: string, data: Type) {
        return this.http.post(this.baseUrl + url, data)
            .catch(this.handleError);
    }

    protected put<Type>(url: string, data: Type) {
        return this.http.put(this.baseUrl + url, data)
            .catch(this.handleError);
    }

    protected delete<Type>(url: string) {
        return this.http.delete(this.baseUrl + url)
            .catch(this.handleError);
    }
    protected handleError(error: HttpErrorResponse) {
        if (error.status === 400)
            return Observable.throw(error.error.details);
        else
            return Observable.throw(error);
    }

    protected isModuleEnable(moduleName) {
        return this.http.get('api/common/module?name=' + moduleName);
    }
    public processDownloadFile(blob: Blob, fileName: string){
        var url= window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
         a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); 
    }
}