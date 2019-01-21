import { SqlSorterDirection } from './enums';

export interface ISqlSorter {
  direction:SqlSorterDirection;
  key:string;
}
