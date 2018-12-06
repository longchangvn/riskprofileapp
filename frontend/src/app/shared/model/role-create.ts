import { Permission } from "./permission";

export class RoleCreate {

    public name: string;
    public permissions: Permission[];
    public isChecked?: boolean;

}