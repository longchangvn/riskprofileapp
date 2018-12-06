import { Injectable } from "@angular/core";




@Injectable()
export class AppService {
   
    public get OrgUnitIds() {
        return eval(sessionStorage.getItem("orgIds"));
    }
    public set OrgUnitIds(id) {
        sessionStorage.setItem("orgIds", JSON.stringify(id));
    }

    public get CurrentSelectedOrgUnitId() {
        
        return eval(sessionStorage.getItem("currentSelectedOrgId"));
    }
    public set CurrentSelectedOrgUnitId(id) {
        sessionStorage.setItem("currentSelectedOrgId", JSON.stringify(id));
    }

}
