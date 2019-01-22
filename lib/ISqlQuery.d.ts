import { ISqlRefiner } from './ISqlRefiner';
import { SqlOperator } from './enums';
import { ISqlJoin } from './ISqlJoin';
export interface ISqlQuery {
    count?: number;
    skip?: number;
    table: string;
    selection?: string[];
    tableIdentifier?: string;
    having?: ISqlRefiner[];
    groupBy?: string[];
    modifiers: number;
    with?: ISqlQuery[];
    joins?: ISqlJoin[];
    as?: string;
    sorters?: ISqlRefiner[];
    refiners?: ISqlRefiner[];
    refinersOperator?: SqlOperator;
}
