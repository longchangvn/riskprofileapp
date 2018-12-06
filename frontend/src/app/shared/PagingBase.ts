import { OnInit } from '@angular/core';
import { PagingModel } from './model/PagingModel';
import { IPagingService } from './IPagingService';

export class PagingBase<Type> {
    pagingModel: PagingModel<Type>;

    constructor(private service: IPagingService<Type>) {
        this.pagingModel = new PagingModel<Type>();
    }

    onPage(event) {
        this.pagingModel.pageIndex = event.offset;
        this.getData();
    }

    onSort(event) {
        this.pagingModel.sortBy = event.column.name;
        this.pagingModel.sortOrder = event.newValue;
        this.pagingModel.pageIndex = 0;
        this.getData();
    }

    onSearch(searchCondition) {
        if (this.pagingModel.searchCondition !== searchCondition) {
            this.pagingModel.searchCondition = searchCondition;
            this.pagingModel.pageIndex = 0;
            this.getData();
        }
    }

    getData() {
        this.service.getAll(this.pagingModel)
            .subscribe(response => {
                this.pagingModel.items = response.items;
                this.pagingModel.totalCount = response.totalItems;
            });
    }
}
