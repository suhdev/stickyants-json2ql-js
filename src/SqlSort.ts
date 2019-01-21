import { SqlSorterDirection, SqlRefinerType, SqlOperator } from './enums';
import { SqlQueryModel } from './SqlQueryModel';

export class SqlSort {
  private key:string;
  private direction:SqlSorterDirection;
  context: SqlQueryModel;

  constructor(context:SqlQueryModel, key:string) {
    this.context = context;
    this.key = key;
  }

  get asc() {
    this.direction = SqlSorterDirection.ASC;
    return this;
  }

  get desc() {
    this.direction = SqlSorterDirection.DESC;
    return this;
  }

  add() {
    this.context.addSort({
      type:SqlRefinerType.Sort,
      value:this.direction,
      key:this.key,
      operator:SqlOperator.EQ,
    });
    return this.context;
  }

  toSqlRefiner() {
    return {
      type:SqlRefinerType.Sort,
      value:this.direction,
      key:this.key,
      operator:SqlOperator.EQ,
    };
  }
}
