import { Dictionary } from 'extension';
import { Observable } from 'rxjs/Observable';

export interface IListComponent {
    title: string;
    editType: any;
    filterOptions$: Observable<Dictionary>;
    showCreate();
    showEdit(id);
    search(searchInput: any);
    onFiltered(selected: string[]);
    // cancel();
    // showCreatePopup();
    // showEditPopup(id);
    // cancelPopup();
    delete(id: any);
}

export const EditType = {
    PAGE: 0,
    POPUP : 1
};