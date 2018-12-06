import { environment } from 'environments/environment';
import { FilterCriteria } from '@app/shared/model/filter-criteria';

export class PagingModel<Type> {
    items: Type[];
    totalCount: number;
    pageSize: number;
    pageIndex: number;
    sortBy: string;
    sortOrder: string;
    searchCondition: string;
    quickFilterCriteria: FilterCriteria[];

    constructor() {
        this.items = [];
        this.totalCount = 0;
        this.pageIndex = 0;
        this.sortBy = '';
        this.sortOrder = '';
        this.searchCondition = '';
        this.quickFilterCriteria = [];
        this.pageSize = environment.pagingConfig.PageSize;
    }

    public patchValues(src: any) {
        if (!src) return;
        const validFields = Object.keys(this);
        Object.keys(src)
            .filter(k => validFields.includes(k))
            .forEach(fieldName =>
                this[fieldName] = src[fieldName]
            );
    }

    public serializeQuery(): string {
        const result = [
            `pageSize=${this.pageSize}`,
            `pageIndex=${this.pageIndex}`
        ];
        if (!!this.searchCondition) {
            result.push(`searchTerms=${encodeURIComponent(
                this.searchCondition
            )}`);
        }
        if (this.sortBy && this.sortBy) {
            result.push(
                `sortBy=${this.sortBy}`,
                `sortOrder=${this.sortOrder}`
            );
        }
        const searchObject = {};
        if (this.quickFilterCriteria.length > 0) {
            const nonArray = this.quickFilterCriteria.filter(x => {
                return !x.isArray;
            });
            const array = this.quickFilterCriteria.filter(x => {
                return x.isArray;
            });
            nonArray.forEach((x, index) => {
                searchObject[x.field] = x.value;
                // result.push(`${x.field}=${x.value}`);
            });

            // Support only 1 array. if 2 array will need more implement
            if (array.length > 0) {
                searchObject[array[0].field] = [];
                array.forEach((x, index) => {
                    searchObject[x.field].push(x.value)
                    // result.push(`${x.field}[${index}]=${x.value}`);
                });
            }
            result.push('CriterionJson=' + JSON.stringify(searchObject));
        }
        return result.join('&');
    }
}
