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

  constructor(ctx:SqlQueryGroup | SqlQueryModel, key:string) {
    this.context = ctx;
    this.$key = key;
    this.$isNegated = false;
  }

  get magicParams() {
    this.$flags |= SqlQueryFlags.USE_MAGIC_PARAMS;
    return this;
  }

  get exact() {
    this.$flags |= SqlQueryFlags.EXACT;
    return this;
  }

  get caseInsensetive() {
    this.$flags |= SqlQueryFlags.CASE_SENSETIVE;
    return this;
  }

  get not() {
    this.$isNegated = !this.$isNegated;
    return this;
  }

  key(key:string) {
    this.$key = key;
    return this;
  }

  value(val:any) {
    this.$value = val;
    return this;
  }

  equalTo(val:any) {
    this.$operator = SqlOperator.EQ;
    this.$value = val;
    return this;
  }

  startsWith(val:any) {
    this.$operator = SqlOperator.LIKE;
    this.$type = SqlRefinerType.String;
    this.$value = `${val}%`;
    return this;
  }

  endsWith(val:any) {
    this.$operator = SqlOperator.LIKE;
    this.$type = SqlRefinerType.String;
    this.$value = `%${val}`;
    return this;
  }

  contains(val:any) {
    this.$operator = SqlOperator.LIKE;
    this.$type = SqlRefinerType.String;
    this.$value = `%${val}%`;
    return this;
  }

  notEqualTo(val:any) {
    this.$operator = SqlOperator.NE;
    this.$value = val;
    return this;
  }

  notIn(val:any) {
    this.$operator = SqlOperator.NOT_IN;
    this.$value = val;
    this.$type = SqlRefinerType.Selection;
    return this;
  }

  greaterThan(val:any) {
    this.$operator = SqlOperator.GT;
    this.$value = val;
    return this;
  }

  greaterThanOrEqual(val:any) {
    this.$operator = SqlOperator.GE;
    this.$value = val;
    return this;
  }

  lessThan(val:any) {
    this.$operator = SqlOperator.LT;
    this.$value = val;
    return this;
  }

  lessThanOrEqual(val:any) {
    this.$operator = SqlOperator.LE;
    this.$value = val;
    return this;
  }

  between(from:any, to:any) {
    this.$operator = SqlOperator.BETWEEN;
    this.$value = [from, to];
    return this;
  }

  notLike(val:string) {
    this.$operator = SqlOperator.NOT_LIKE;
    this.$value = `%${val}%`;
    return this;
  }

  notBetween(from:any, to:any) {
    this.$operator = SqlOperator.NOT_BETWEEN;
    this.$value = [from, to];
    return this;
  }

  get isNull() {
    this.$operator = SqlOperator.IS_NULL,
        this.$value = null;
    return this;
  }

  get isNotNull() {
    this.$operator = SqlOperator.IS_NOT_NULL,
        this.$value = null;
    return this;
  }

  isIn(val:any) {
    this.$operator = SqlOperator.IN;
    this.$type = SqlRefinerType.Selection;
    this.$value = val;
    return this;
  }

  type(type:SqlRefinerType) {
    this.$type = type;
    return this;
  }

  operator(op:SqlOperator) {
    this.$operator = op;
    return this;
  }

  get string() {
    this.$type = SqlRefinerType.String;
    return this;
  }

  get number() {
    this.$type = SqlRefinerType.Number;
    return this;
  }

  get dateRange() {
    this.$type = SqlRefinerType.DateRange;
    return this;
  }

  get date() {
    this.$type = SqlRefinerType.Date;
    return this;
  }

  get datetime() {
    this.$type = SqlRefinerType.DateTime;
    return this;
  }

  get bool() {
    this.$type = SqlRefinerType.Boolean;
    return this;
  }

  get like() {
    this.$operator = SqlOperator.LIKE;
    return this;
  }

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

  toJSON() {
    return this.toSqlRefiner();
  }

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
