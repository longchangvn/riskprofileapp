export class PopupObjectResultModel {
    value: any;
    isEditing: Boolean;
}

export class PopupConfig {

    public showSaveNew: boolean = true;
    public showRemove: boolean = true;
    /**
     *
     */
    constructor(data: any = null) {
        if (data) {
            this.showRemove = data.showRemove === undefined ? this.showRemove : data.showRemove;
            this.showSaveNew = data.showSaveNew === undefined ? this.showSaveNew : data.showSaveNew;
        }
    }
}