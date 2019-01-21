import { SqlSorterDirection, SqlRefinerType, SqlOperator } from './enums';
import { SqlQueryModel } from './SqlQueryModel';
import { ISqlRefiner } from './ISqlRefiner';

/**
 * Represents a sort option in a SELECT statement
 */
export class SqlSort {
  private $key:string;
  private $direction:SqlSorterDirection;
  private $context: SqlQueryModel;

  constructor(context:SqlQueryModel, key:string) {
    this.$context = context;
    this.$key = key;
  }

  /**
   * Sets the sort direction to be ascending
   */
  get asc() {
    this.$direction = SqlSorterDirection.ASC;
    return this;
  }


  /**
   * Sets the sort direction to be descending 
   */
  get desc() {
    this.$direction = SqlSorterDirection.DESC;
    return this;
  }

  /**
   * Sets the column name to sort by
   * @param k the column name
   */
  key(k:string) {
    this.$key = k;
    return this;
  }

  /**
   * Sets the context model 
   * @param ctx the context to use the sort on
   */
  context(ctx:SqlQueryModel){
    this.$context = ctx; 
    return this; 
  }

  /**
   * Adds the sort option to the context model 
   * and return the context 
   */
  add() {
    this.$context.addSort({
      type:SqlRefinerType.Sort,
      value:this.$direction,
      key:this.$key,
      operator:SqlOperator.EQ,
    });
    return this.$context;
  }

  /**
   * Constructs a new sort option model using a JSON object
   * @param obj the json object to construct the sort option from
   */
  static fromJson(obj:ISqlRefiner) {
    const s = new SqlSort(null, obj.key);
    if (obj.value === SqlSorterDirection.ASC) {
      s.asc;
    }else {
      s.desc;
    }
    return s;
  }

  toJSON():ISqlRefiner {
    return this.toSqlRefiner();
  }

  /**
   * Extracts the SQL refiner definition
   */
  toSqlRefiner():ISqlRefiner {
    return {
      type:SqlRefinerType.Sort,
      value:this.$direction,
      key:this.$key,
      operator:SqlOperator.EQ,
    };
  }
}
