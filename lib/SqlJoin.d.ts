import { JoinType } from './enums';
import { ISqlRefinable } from './ISqlRefinable';
import { ISqlRefiner } from './ISqlRefiner';
export declare class SqlJoin {
    $type: JoinType;
    $to: string;
    $on: ISqlRefiner[];
    $alias: string;
    constructor();
    type(type: JoinType): this;
    alias(as: string): this;
    toTable(table: string): this;
    on(...args: ISqlRefinable[]): this;
    toJSON(): {
        type: JoinType;
        on: ISqlRefiner[];
        alias: string;
        to: string;
    };
}
