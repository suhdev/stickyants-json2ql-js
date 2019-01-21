import { SqlQueryFlags, SqlRefinerType, SqlOperator, SqlGroupOperator } from './enums';
import { ISqlQuery } from './ISqlQuery';
export interface ISqlRefiner {
    flags?: SqlQueryFlags;
    isNegated?: boolean;
    relation?: ISqlQuery;
    type: SqlRefinerType;
    operator: SqlOperator;
    key: string;
    value: any;
    groupOperator?: SqlGroupOperator;
    refiners?: ISqlRefiner[];
}
