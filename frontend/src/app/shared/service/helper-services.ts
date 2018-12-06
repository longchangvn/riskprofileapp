import { Injectable, Optional, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { System_Configure } from "@app/shared/service";
import { SystemConfiguration } from "@app/shared/model/system-config";



@Injectable()
export class HelperService {
    localConfig: SystemConfiguration;
    constructor(protected http: HttpClient,@Optional() @Inject(System_Configure) config?: SystemConfiguration) {
       this.localConfig = config;
    }
    deCodeBase64(token: string): any {
        const value = token.split('.')[1];
        let output = value.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw Error('Illegal base64url string!');
        }
        return window.atob(output);
    }

    private S4(): string {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    newGuid() {
        return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
    }

    buildImageUrl(path: string) {
        if (!path)
            return "";
        path = "/" + path;
        return this.localConfig.API_BASE_URL + path.replace("//", "/");
    }

}
