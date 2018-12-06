import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ToasterConfig, Toast, ToasterService, BodyOutputType } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class NotificationService {
    config: ToasterConfig;
    protected baseUrl: string;
    positions: string[] = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
        'toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center'];
    types: string[] = ['default', 'info', 'success', 'warning', 'error'];
    animations: string[] = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];

    position: any;
    constructor(private toasterService: ToasterService, private translateService: TranslateService) {
        this.config = new ToasterConfig({
            positionClass: "toast-top-right",
            timeout: 5000,
            newestOnTop: true,
            tapToDismiss: true,
            preventDuplicates: false,
            animation: "fade",
            limit: 5,
        });
    }
    private showToast(type: string, title: string, body: string, options?: any) {

        this.translateService.get([title, body]).subscribe(result => {

            let toast: Toast = {
                type: type,
                title: result[title] || "",
                body: result[body],
                timeout: 5000,
                showCloseButton: true,
                bodyOutputType: BodyOutputType.TrustedHtml,
            };
            toast = Object.assign(toast, options || {});
            this.toasterService.popAsync(toast);
        })

    }
    public error(body: string, title?: string, options?: any) {
        this.showToast("error", title || "Error", body, options);
    }

    public info(body: string, title?: string) {
        this.showToast("info", title || "Info", body);
    }

    public warning(body: string, title?: string) {
        this.showToast("warning", title || "Warning", body);
    }

    public success(body: string, title?: string) {
        this.showToast("success", title || "", body);
    }
}
