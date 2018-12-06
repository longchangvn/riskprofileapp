import { Permission } from "./permission";

export class RoleEdit {

    public id: string;
    public name: string;
    public permissions: Permission[];
    public isChecked?: boolean;

}