import { SqlRefinerType, SqlQueryFlags, SqlOperator } from './enums';
import { SqlQueryModel } from './SqlQueryModel';
import { SqlQueryGroup } from './SqlQueryGroup';

/**
 * Represents a SQL condition
 */
export class SqlCondition {
  private $key:string;
  private $value:any;
  private $type:SqlRefinerType;
  private $flags:SqlQueryFlags = 0;
  private $operator:SqlOperator;
  private context: SqlQueryGroup | SqlQueryModel;
  private $isNegated: boolean;

  /**
   * Constructs a new SqlCondition object
   * @param ctx the context to add this condition to,
   * this is useful when working with sub queries to allow nesting
   * SQL queries
   * @param key the column name to refine by
   */
  constructor(ctx:SqlQueryGroup | SqlQueryModel, key:string) {
    this.context = ctx;
    this.$key = key;
    this.$isNegated = false;
  }

  /**
   * Adds a flag to let consumers of this JQL that this condition uses
   * special columns and as such handle it differently
   */
  get magicParams() {
    this.$flags |= SqlQueryFlags.USE_MAGIC_PARAMS;
    return this;
  }

  /**
   * Adds a flag to let consumers of this JQL that this condition is an
   * exact field and needs to be passed to the SQL query as is
   */
  get exact() {
    this.$flags |= SqlQueryFlags.EXACT;
    return this;
  }

  /**
   * Adds a flag to indicate that this is a case insensitive condition
   */
  get caseInsensetive() {
    this.$flags |= SqlQueryFlags.CASE_SENSETIVE;
    return this;
  }

  /**
   * Indicate that the condition is negated. This is translated internally
   * as a flip on the operator field
   */
  get not() {
    this.$isNegated = !this.$isNegated;
    return this;
  }

  /**
   * Sets the column name to filter by (left hand side)
   * @param key specify the column name to filter (i.e. left hand side)
   */
  key(key:string) {
    this.$key = key;
    return this;
  }

  /**
   * Sets the value to filter by (right hand side)
   * @param val specify the right hand side of the condition
   */
  value(val:any) {
    this.$value = val;
    return this;
  }

  /**
   * Specifies that this condition is an equal condition i.e.
   * sets the operator to `EQ` and the right hand side to the provided value
   * @param val the value to use as the right-hand side value
   */
  equalTo(val:any) {
    this.$operator = SqlOperator.EQ;
    this.$value = val;
    return this;
  }

  /**
   * Specifices that this condition is a `LIKE '{val}%'` condition
   * i.e. sets the operator to `LIKE` and the value to `${val}%`.
   * This also sets the type to string as `LIKE` can only be applied
   * @param val the value to use as the right-hand side value
   */
  startsWith(val:any) {
    this.$operator = SqlOperator.LIKE;
    this.$type = SqlRefinerType.String;
    this.$value = `${val}%`;
    return this;
  }

  /**
   * Specifices that this condition is a `LIKE '%{val}'` condition
   * i.e. sets the operator to `LIKE` and the value to `%{val}`.
   * This also sets the type to string as `LIKE` can only be applied
   * to string conditions
   * @param val the value to use as the right-hand side value
   */
  endsWith(val:any) {
    this.$operator = SqlOperator.LIKE;
    this.$type = SqlRefinerType.String;
    this.$value = `%${val}`;
    return this;
  }

  /**
   * Specifices that this condition is a `LIKE '%{val}%'` condition
   * i.e. sets the operator to `LIKE` and the value to `%{val}%`.
   * This also sets the type to string as `LIKE` can only be applied
   * to string conditions
   * @param val the value to use as the right-hand side value
   */
  contains(val:any) {
    this.$operator = SqlOperator.LIKE;
    this.$type = SqlRefinerType.String;
    this.$value = `%${val}%`;
    return this;
  }

  /**
   * Specifies that this condition is a not equal condition i.e.
   * sets the operator to `NE` and the right hand side to the provided value
   * @param val the value to use as the right-hand side value
   */
  notEqualTo(val:any) {
    this.$operator = SqlOperator.NE;
    this.$value = val;
    return this;
  }

  /**
   * Specifies that this condition is a `NOT IN` condition i.e.
   * sets the operator to `NOT_IN` and the right hand side to the provided value
   * @param val the value to use as the right-hand side value, an array
   * of values
   */
  notIn(val:any[]) {
    this.$operator = SqlOperator.NOT_IN;
    if (!val) {
      throw new Error(`Expected an array of values but got ${val}`);
    }
    if (val.length === 0) {
      throw new Error('Expected an array with at least one values but got empty array');
    }
    this.$value = val;
    this.$type = SqlRefinerType.Selection;
    return this;
  }

  /**
   * Specifies that this condition is a greater than condition i.e. 
   * sets the operator to `>` and the right-hand side to the provided value
   * @param val the value to use as the right-hand side value 
   */
  greaterThan(val:number|string) {
    this.$operator = SqlOperator.GT;
    this.$value = val;
    return this;
  }

  /**
   * Specifies that this condition is a greater than or equal condition i.e. 
   * sets the operator to `>=` and the right-hand side to the provided value
   * @param val the value to use as the right-hand side value 
   */
  greaterThanOrEqual(val:number|string) {
    this.$operator = SqlOperator.GE;
    this.$value = val;
    return this;
  }

  /**
   * Specifies that this condition is a less than condition i.e. 
   * sets the operator to `<` and the right-hand side to the provided value
   * @param val the value to use as the right-hand side value 
   */
  lessThan(val:any) {
    this.$operator = SqlOperator.LT;
    this.$value = val;
    return this;
  }

  /**
   * Specifies that this condition is a less than or equal condition i.e. 
   * sets the operator to `<=` and the right-hand side to the provided value
   * @param val the value to use as the right-hand side value 
   */
  lessThanOrEqual(val:any) {
    this.$operator = SqlOperator.LE;
    this.$value = val;
    return this;
  }

  /**
   * Specifies that this condition is a between condition i.e. 
   * sets the operator to `BETWEEN` and the right-hand side to the provided range
   * @param from the value to use as the start of the range 
   * @param to the value to use as the end of the range 
   */
  between<T extends string|number>(from:T, to:T) {
    this.$operator = SqlOperator.BETWEEN;
    this.$value = [from, to];
    return this;
  }

  /**
   * Specifies that this condition is a `NOT LIKE` condition i.e. 
   * sets the operator to `NOT_LIKE` and the right-hand side to the provided value
   * i.e. `%{val}%`
   * @param val the value to use as the right-hand side. 
   */
  notLike(val:string) {
    this.$operator = SqlOperator.NOT_LIKE;
    this.$value = `%${val}%`;
    return this;
  }

  /**
   * Specifies that this condition is a `NOT BETWEEN` condition i.e. 
   * sets the operator to `NOT_BETWEEN` and the right-hand side to the provided range
   * i.e. `%{val}%`
   * @param from the value to use as the start of the range 
   * @param to the value to use as the end of the range 
   */
  notBetween(from:any, to:any) {
    this.$operator = SqlOperator.NOT_BETWEEN;
    this.$value = [from, to];
    return this;
  }

  /**
   * Specifies that this condition is a `IS NULL` condition i.e. 
   * sets the operator to `IS_NULL` 
   */
  get isNull() {
    this.$operator = SqlOperator.IS_NULL,
        this.$value = null;
    return this;
  }

  /**
   * Specifies that this condition is a `IS NOT NULL` condition i.e. 
   * sets the operator to `IS_NOT_NULL` 
   */
  get isNotNull() {
    this.$operator = SqlOperator.IS_NOT_NULL,
        this.$value = null;
    return this;
  }

  /**
   * Specifies that this condition is a `IN` condition i.e.
   * sets the operator to `IN` and the right hand side to the provided value
   * @param val the value to use as the right-hand side value, an array
   * of values
   */
  isIn(val:any[]) {
    if (!val) {
      throw new Error(`Expected an array of values but got ${val}`);
    }
    if (val.length === 0) {
      throw new Error('Expected an array with at least one values but got empty array');
    }
    this.$operator = SqlOperator.IN;
    this.$type = SqlRefinerType.Selection;
    this.$value = val;
    return this;
  }

  /**
   * Sets the type of the condition to the provided value
   * @param type the condition type 
   */
  type(type:SqlRefinerType) {
    this.$type = type;
    return this;
  }

  /**
   * Sets the operator of the condition to the provided value
   * @param type the condition operator 
   */
  operator(op:SqlOperator) {
    this.$operator = op;
    return this;
  }

  /**
   * Sets the condition type to string
   */
  get string() {
    this.$type = SqlRefinerType.String;
    return this;
  }

  /**
   * Sets the condition type to number
   */
  get number() {
    this.$type = SqlRefinerType.Number;
    return this;
  }

  /**
   * Sets the condition type to date range
   */
  get dateRange() {
    this.$type = SqlRefinerType.DateRange;
    return this;
  }

  /**
   * Sets the condition type to date
   */
  get date() {
    this.$type = SqlRefinerType.Date;
    return this;
  }

  /**
   * Sets the condition type to datetime
   */
  get datetime() {
    this.$type = SqlRefinerType.DateTime;
    return this;
  }

  /**
   * Sets the condition type to bool
   */
  get bool() {
    this.$type = SqlRefinerType.Boolean;
    return this;
  }

  /**
   * Sets the condition type to like
   */
  get like() {
    this.$operator = SqlOperator.LIKE;
    return this;
  }

  /**
   * Extracts the condition definition from the class
   */
  toSqlRefiner() {
    const op = (this.$operator || SqlOperator.EQ);
    return {
      key:this.$key,
      flags:this.$flags,
      operator:this.$isNegated ? ~op :op,
      type:this.$type,
      value:this.$value,
    };
  }

  /**
   * Support safe serialisation to JSON i.e. when the class is used in JSON.stringify
   */
  toJSON() {
    return this.toSqlRefiner();
  }

  /**
   * Adds this refiner to the parent context
   */
  add() {
    const op = (this.$operator || SqlOperator.EQ);
    return this.context.addRefiner({
      key:this.$key,
      flags:this.$flags,
      operator:this.$isNegated ? ~op :op,
      type:this.$type,
      value:this.$value,
    });
  }
}
