
import { OnInit, OnDestroy } from '@angular/core';
import { AppComponentBase } from './app-component-base';
import { IListComponent, EditType } from '../../interfaces/ilist-component';
import { PagingModel } from 'app/shared/model/PagingModel';
import { DataTableSorting } from 'app/shared/model/datatable-sorting.model';
import { Dictionary } from 'extension';
import { ReplaySubject } from 'rxjs';
import { FilterCriteria } from '@app/shared/model/filter-criteria';

export class PagedResultDto {
    items: any[];
    totalCount: number;
}

export class EntityDto {
    id: number;
}

export abstract class PagedListingComponentBase<EntityDto> extends AppComponentBase implements OnInit, OnDestroy, IListComponent {
    protected defaultSortOrder;
    protected defaultSortBy;
    abstract title: string;
    public totalPages = 1;
    public totalItems = 1;
    public isTableLoading = false;
    public editType: any = EditType.PAGE;
    public pagingModel: PagingModel<any>;
    public fetchDataMethod: any;
    public sortElement: DataTableSorting[];
    public filterOptions$ = new ReplaySubject<FilterCriteria[]>();

    constructor() {
        super();
        this.defaultSortOrder = 'asc';
        this.defaultSortBy = 'name';
        this.sortElement = [{dir: this.defaultSortOrder, prop: this.defaultSortBy}];
    }

    ngOnInit(): void {
        this.refresh();
    }

    ngOnDestroy(): void {
        // console.log('PagedListingComponentBase ngOnDestroy');
        // this.subscriptions.forEach(s => s.unsubscribe());
    }

    protected list(request: any): void {
        this.pagingModel.patchValues(request);
        this.isTableLoading = true;
        this.fetchDataMethod(this.pagingModel)
            .first()
            .subscribe( result => {
                this.pagingModel = {
                    ...this.pagingModel,
                    ...result,
                    serializeQuery: this.pagingModel.serializeQuery,
                    patchValues: this.pagingModel.patchValues};
                this.isTableLoading = false;
            });
    }

    setPage(pageInfo): void {
        this.pagingModel.pageIndex = pageInfo.offset + 1;
        this.getDataPage(pageInfo.offset + 1);
    }

    refresh(): void {
        this.getDataPage(this.pagingModel.pageIndex);
    }

    onSort(orderByValue: any): void {
        if (!orderByValue || !orderByValue.sorts) return;
        const sortOrder = orderByValue.sorts[0].dir;
        const sortBy = orderByValue.sorts[0].prop;
        this.getSortedData(sortBy, sortOrder);
    }

    onFiltered(selected: any[]) {
        this.list({
            quickFilterCriteria: selected || []
        });
    }

    public search(searchInput: any) {
        this.list({searchCondition: searchInput});
    }

    public showPaging(result: PagedResultDto, pageNumber: number): void {
        this.totalPages = ((result.totalCount - (result.totalCount % this.pagingModel.pageSize)) / this.pagingModel.pageSize) + 1;
        this.totalItems = result.totalCount;
        this.pagingModel.pageIndex = pageNumber;
    }

    public getDataPage(page: number): void {
        const pageIndex = page > 0 ? page - 1 : 0;
        this.list({pageIndex: pageIndex});
    }

    public getSortedData(sortBy: string, sortOrder: string): void {
        this.list({
            sortBy: sortBy,
            sortOrder: sortOrder
        });
    }

    showCreate() {
        return this.editType === EditType.PAGE ? this.pageCreate() : this.popupCreate();
    }
    showEdit(id) {
        return this.editType === EditType.PAGE ? this.pageEdit(id) : this.popupEdit(id);
    }

    // cancel() {
    //     return this.editType === EditType.PAGE ? this.cancelPage() : this.cancelPopup();
    // }
    delete(entity: any): void { }

    protected abstract popupEdit(id);
    protected abstract popupCreate();
    protected abstract pageEdit(id);
    protected abstract pageCreate();
    // protected abstract cancelPage()
    // protected abstract cancelPopup();
}