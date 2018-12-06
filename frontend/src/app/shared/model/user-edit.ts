import { Role, Permission, User } from "./index";
import { TreeviewItem } from "ngx-treeview";

export class UserEdit {

    public id: string;
    public userName: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public isActive: boolean;
    public phoneNumber: string;
    public shouldChangePassword: boolean;
    public allRoles: Role[];
    public assignedRoleNames: string[];
    public roles: Role[];
    public permissions: Permission[];

    public permissionsTreeviewItems: TreeviewItem[];

    constructor (user?: User){
        if(user){
            this.id = user.id;
            this.userName = user.userName;
            this.email = user.email;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.isActive = user.isActive;
            this.phoneNumber = user.phoneNumber;
            this.shouldChangePassword = user.shouldChangePassword;
            this.allRoles = [];
            this.assignedRoleNames = user.roles.map(i => i.name);
            this.roles = user.roles;
            this.permissions = [];
            
            this.permissionsTreeviewItems = [];
        }
        else {
            this.id = "";
            this.userName = "";
            this.email = "";
            this.firstName = "";
            this.lastName = "";
            this.isActive = true;
            this.phoneNumber = "";
            this.shouldChangePassword = true;
            this.allRoles = [];
            this.assignedRoleNames = [];
            this.permissions = [];
            
            this.permissionsTreeviewItems = [];
        }
    }
}