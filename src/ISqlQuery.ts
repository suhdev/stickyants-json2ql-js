import { ISqlRefiner } from './ISqlRefiner';
import { SqlOperator } from './enums';

export interface ISqlQuery {
  count?:number;
  skip?:number;
  isDistinct?:boolean;
  table:string;
  selection?:string[];
  tableIdentifier?:string;
  as?:string;
  isStats?:boolean;
  sorters?:ISqlRefiner[];
  refiners?:ISqlRefiner[];
  refinersOperator?:SqlOperator;
}
