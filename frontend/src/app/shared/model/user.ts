import { Role } from "./role";


export class User {

    public password: string;
    public passwordRepeat: string;
    public id: string;
    public userName: string;
    public email: string;
    public phoneNumber: string;
    public firstName: string;
    public lastName: string;
    public shouldChangePassword: boolean;
    public isLockOut: boolean;
    public isActive: boolean;
    public avatarFileName: string;
    public roles: Role[];

    constructor(){
        this.password = "";
        this.passwordRepeat = "";
        this.id = "";
        this.userName = "";
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.isActive = true;
        this.phoneNumber = "";
        this.shouldChangePassword = true;
        this.isLockOut = false;
        this.avatarFileName = "";
        this.roles = [];
    }
}