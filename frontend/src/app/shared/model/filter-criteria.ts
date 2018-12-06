export class FilterCriteria {
    public label: string;
    public value: string;
    public field: string;
    public isArray: boolean = false;
    /**
     *
     */
    constructor(label, value, field, isArray = false) {
        this.label = label;
        this.value = value;
        this.field = field;
        this.isArray = isArray;
    }
}