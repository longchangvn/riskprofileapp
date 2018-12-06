import { Permission } from "./permission";

export class Role {

    public id: string;
    public name: string;
    public permissions: Permission[];
    public isChecked?: boolean;

}