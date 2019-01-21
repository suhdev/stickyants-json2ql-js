import { SqlStatementType } from './enums';

export interface ISqlStatement<T> {
  type:SqlStatementType;
  value:T;
}
