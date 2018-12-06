import { Injector, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable } from 'rxjs';


export abstract class AppComponentBase {
    constructor() {}

    wrapToObservable(): Observable<any> {
        const tmpSubject = new Subject();
        return tmpSubject;
    }

    raiseEvent(name, data: any): Observable<any> {
        const event = new Subject<any>();
        event.next(data);
        return event.asObservable();
    }
    isGranted(permissionName: string): boolean {
        return true;
    }
}
