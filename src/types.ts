export type SqlIFCondition = (() => boolean)|boolean;

export type KeyFilterFn = (value:any,key:string)=>boolean;

export type Dictionary<T> = {[idx:string]:T};