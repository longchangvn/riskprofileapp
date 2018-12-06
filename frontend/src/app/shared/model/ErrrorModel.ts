import { environment } from '../../../environments/environment';

export class ErrorModel {
    constructor(code: string, message: string, target: string) {
        this.Code = code;
        this.Message = message;
        this.Target = target;
    }
    Code: string;
    Message: string;
    Target: string;
}