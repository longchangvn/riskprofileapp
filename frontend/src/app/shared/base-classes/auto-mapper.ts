export class AutoMapper {
    constructor() {}

    mapFrom(src: any) {
        if (!src) return;
        const validFields = Object.keys(this);
        Object.keys(src)
            .filter(k => validFields.includes(k))
            .forEach(fieldName =>
                this[fieldName] = src[fieldName]
            );
    }
}