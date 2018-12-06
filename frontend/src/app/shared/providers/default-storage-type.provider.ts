import { InjectionToken } from '@angular/core';
import { ClientStorageTypeEnum } from 'app/shared/enums/client-storage-type.enum';

export const DefaultStorageType = new InjectionToken<ClientStorageTypeEnum>('DefaultStorageType');

export const DefaultStorageTypeProvider = {
    provide: DefaultStorageType,
    useValue: ClientStorageTypeEnum.Local
};
