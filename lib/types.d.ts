export declare type SqlIFCondition = (() => boolean) | boolean;
export declare type KeyFilterFn = (value: any, key: string) => boolean;
export declare type Dictionary<T> = {
    [idx: string]: T;
};
