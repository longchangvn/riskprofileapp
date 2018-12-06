import { Component, Input, ComponentRef, Type, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IListComponent } from 'app/interfaces/ilist-component';
import { Dictionary } from 'extension';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'list-component-wrapper',
    templateUrl: './list-component-wrapper.html',
    styleUrls: ['./list-component-wrapper.scss'],
})
export class ListComponentWrapper implements OnDestroy {
    @Input() component: Type<any>;
    private subscription: Subscription;
    title = '';
    filterOptions: Dictionary;
    componentRef: ComponentRef<IListComponent>;
    @Input() canAdd: boolean = true;
    @Input() canSearch: boolean = true;
    constructor(private cdf: ChangeDetectorRef) { }

    updateComponent(ref) {
        this.unsubscribe();
        this.componentRef = ref;
        if (!this.componentRef) return;
        this.title = this.componentRef.instance.title;
        this.subscription = this.componentRef.instance.filterOptions$.subscribe(
            options => this.filterOptions = options
        );
        this.cdf.detectChanges();
    }
    add() {
        this.componentRef.instance.showCreate();
    }

    onSearch(searchInput: string) {
        this.componentRef.instance.search(searchInput);
    }

    onSelected(selected: string[]) {
        this.componentRef.instance.onFiltered(selected);
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

    private unsubscribe() {
        if (!this.subscription) return;
        this.subscription.unsubscribe();
    }
}