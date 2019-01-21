import { Dictionary } from './types';
export interface ISqlInsertStatement {
    table: string;
    value: Dictionary<any>[];
}
