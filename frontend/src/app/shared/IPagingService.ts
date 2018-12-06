import { PagingModel } from './model/PagingModel';

export interface IPagingService<Type> {
    getAll(request: PagingModel<Type>);
}
