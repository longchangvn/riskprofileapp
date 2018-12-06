export declare type Dictionary = {
    [key: string]: any;
};

declare global {  
    interface Array<T> {
        firstOrDefault(callback: any): any;
        dynamicSort(prop: string, dir: string): void;
    }
}