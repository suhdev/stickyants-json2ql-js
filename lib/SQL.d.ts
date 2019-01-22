import { SqlCondition } from './SqlCondition';
import { SqlOperator } from './enums';
import { SqlIFCondition } from './types';
import { ISqlRefinable } from './ISqlRefinable';
import { SqlQueryModel } from './SqlQueryModel';
import { SqlSort } from './SqlSort';
/**
 *
 */
export declare const SQL: {
    refiner(key: string): SqlCondition;
    group(op: SqlOperator): SqlQueryModel;
    if(condition: SqlIFCondition, truthy: ISqlRefinable, falsy?: ISqlRefinable): ISqlRefinable;
    and(...args: ISqlRefinable[]): SqlQueryModel;
    or(...args: ISqlRefinable[]): SqlQueryModel;
    relation(key: string): SqlQueryModel;
    orderBy(key: string): SqlSort;
};
