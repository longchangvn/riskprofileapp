import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ErrorModel } from '../model/ErrrorModel';

@Pipe({
    name: 'errorfilter'
})
export class ErrorFilterPipe implements PipeTransform {
    transform(errors: ErrorModel[], targetName: string): ErrorModel[] {
        if (!errors)
            return undefined;
        return errors.filter(item => item.Target === targetName);
    }
}