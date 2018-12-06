import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ErrorModel } from '../model/ErrrorModel';

@Pipe({
    name: 'lastarrayfilter'
})
export class LastArrayFilterPipe implements PipeTransform {
    transform(strSource: string, splitCharactor: string = '.'): string {
        if (!strSource)
            return undefined;
        const strSplitCharactors = strSource.split(splitCharactor);
        return strSplitCharactors[strSplitCharactors.length - 1];
    }
}