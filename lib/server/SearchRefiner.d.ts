import { RefinerType } from './enums';
import { SqlOperator } from '../enums';
import { SqlParameter } from './SqlParameter';
import { QueryModel } from './QueryModel';
export declare class SearchRefiner {
    static id: number;
    $id: number;
    flags: number;
    as: string;
    type: RefinerType;
    value: any;
    key: string;
    refiners: SearchRefiner[];
    operator: SqlOperator;
    relation: QueryModel;
    readonly id: number;
    readonly isExact: boolean;
    readonly sCaseSensitive: boolean;
    readonly isValueMagicParameter: boolean;
    constructor();
    getArrayForValue(value: any[]): number[];
    getSqlStatement(): any;
    defaultToString(): string;
    arrayToSqlParameter(arr: any[]): SqlParameter[];
    getSqlParameters(): SqlParameter[];
}
