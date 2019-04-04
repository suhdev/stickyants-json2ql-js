import { SearchRefiner } from './SearchRefiner';
import { SqlOperator } from '../enums';
import { SqlParameter } from './SqlParameter';
import { Join } from './Join';
export declare class QueryModel {
    count: number;
    isDistinct: boolean;
    skip: number;
    joins: Join[];
    table: string;
    selection: string[];
    as: string;
    isStats: boolean;
    tableIdentifier: string;
    groupBy: string[];
    having: SearchRefiner[];
    with: QueryModel[];
    refiners: SearchRefiner[];
    sorters: SearchRefiner[];
    operator: SqlOperator;
    readonly entityName: string;
    readonly entityIdentifier: string;
    getParameters(): SqlParameter[];
    getSqlQuery(count?: number, skip?: number, isWith?: boolean): any;
}
