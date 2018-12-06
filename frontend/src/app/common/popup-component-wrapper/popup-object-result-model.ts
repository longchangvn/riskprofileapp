export class PopupObjectResultModel {
    value: any;
    isEditing: Boolean;
}

export class PopupConfig {

    public showSaveNew: boolean = true;
    public showSaveClose: boolean = true;
    public showRemove: boolean = true;
    public showClose: boolean = true;
    public showFooter: boolean = true;
    /**
     *
     */
    constructor(data: any = null) {
        if (data) {
            this.showRemove = data.showRemove === undefined ? this.showRemove : data.showRemove;
            this.showSaveNew = data.showSaveNew === undefined ? this.showSaveNew : data.showSaveNew;
            this.showSaveClose = data.showSaveClose === undefined ? this.showSaveClose : data.showSaveClose;
            this.showClose = data.showClose === undefined ? this.showClose : data.showClose;
            this.showFooter = data.showFooter === undefined ? this.showFooter : data.showFooter;
        }
    }
}