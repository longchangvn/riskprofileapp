import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'jsonstringfilter'
})
export class JsonStringFilterPipe implements PipeTransform {
    transform(strSource: string): object {
        if (!strSource)
            return undefined;
        return JSON.parse(strSource);
    }
}