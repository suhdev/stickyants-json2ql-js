import { ISqlRefiner } from './ISqlRefiner';
import { SqlOperator, SqlSorterDirection, SqlRefinerType, SqlQueryFlags } from './enums';
import { SqlQueryGroup } from './SqlQueryGroup';
import { ISqlRefinable } from './ISqlRefinable';
import { SqlCondition } from './SqlCondition';
import { SqlSort } from './SqlSort';
import { SqlJoin } from './SqlJoin';

export class SqlQueryModel {
  private $table:string;
  private $as:string;
  private $skip:number = 0;
  private $count:number = -1;
  private $isStats:boolean = false;
  private $isDistinct:boolean;
  private $operator:SqlOperator = SqlOperator.AND;
  private $refiners:ISqlRefiner[] = [];
  private $having:ISqlRefiner[] = [];
  private $joins:SqlJoin[] = [];
  private $groupBy:string[] = [];
  private $sorters:ISqlRefiner[] = [];
  private $selection:string[] = ['*'];
  private $tableIdentifier: string;
  private $parent: SqlQueryModel | SqlQueryGroup;
  private $key: string;
  private $with: SqlQueryModel[];

  constructor(parentModel?:SqlQueryModel|SqlQueryGroup, key?:string) {
    this.$parent = parentModel;
    this.$key = key;
  }

  filter(...args:ISqlRefinable[]) {
    this.$refiners.push(...args.filter(e => e).map(e => e.toSqlRefiner()));
    return this;
  }

  filterHaving(...args:ISqlRefinable[]) {
    this.$having.push(...args.filter(e => e).map(e => e.toSqlRefiner()));
    return this;
  }

  groupBy(...args:string[]) {
    this.$groupBy = args;
    return this;
  }

  order(...args:ISqlRefinable[]) {
    this.$sorters.push(...args.filter(e => e).map(e => e.toSqlRefiner()));
    return this;
  }

  addSort(sort:ISqlRefiner) {
    this.$sorters.push(sort);
  }

  addSorters(sorters:ISqlRefiner[]) {
    this.$sorters.push(...sorters);
  }

  table(table:string) {
    this.$table = table;
    return this;
  }

  as(as:string) {
    this.$as = as;
    return this;
  }

  selection(sel:string[]) {
    this.$selection = sel;
    return this;
  }

  sort(key:string) {
    return new SqlSort(this, key);
  }

  and() {
    this.$operator = SqlOperator.AND;
    return this;
  }

  or() {
    this.$operator = SqlOperator.OR;
    return this;
  }

  key(key:string) {
    this.$key = key;
    return this;
  }

  isBetween(key:string, from:any, to:any, flags?:SqlQueryFlags) {
    return this.refiner(key, [from, to], SqlOperator.BETWEEN, SqlRefinerType.String);
  }

  isNotBetween(key:string, from:any, to:any, flags?:SqlQueryFlags) {
    return this.refiner(key, [from, to], SqlOperator.NOT_BETWEEN, SqlRefinerType.String);
  }

  with(...args:SqlQueryModel[]) {
    this.$with = args;
    return this;
  }

  join(cb:(model:SqlJoin) => void) {
    const m = new SqlJoin();
    cb(m);
    this.$joins.push(m);
    return this;
  }

  joinWith(joinTable:string, cb:(model:SqlJoin) => void) {
    const m = new SqlJoin();
    m.toTable(joinTable);
    cb(m);
    this.$joins.push(m);
    return this;
  }

  operator(op:SqlOperator) {
    this.$operator = op;
    return this;
  }

  get distinct() {
    this.$isDistinct = true;
    return this;
  }

  skip(skip:number) {
    this.$skip = skip;
    return this;
  }

  ref(key:string) {
    return new SqlCondition(this, key);
  }

  addRefiner(...refs:ISqlRefiner[]) {
    this.$refiners.push(...refs);
    return this;
  }

  get stats() {
    this.$isStats = true;
    return this;
  }

  count(count:number) {
    this.$count = count;
    return this;
  }

  tableIdentifier(id:string) {
    this.$tableIdentifier = id;
    return this;
  }

  group(op:SqlOperator) {
    return new SqlQueryGroup(this, this, op);
  }

  andGroup() {
    return new SqlQueryGroup(this, this, SqlOperator.AND);
  }

  orGroup() {
    return new SqlQueryGroup(this, this, SqlOperator.OR);
  }

  orderBy(key:string, direction:SqlSorterDirection) {
    this.$sorters.push({
      key,
      value:direction,
      type:SqlRefinerType.Sort,
      operator:SqlOperator.EQ,
    });
    return this;
  }

  refiner(key:string, value:any, operator:SqlOperator,
          type:SqlRefinerType, flags?:SqlQueryFlags) {
    this.$refiners.push({
      key,
      value,
      type,
      flags,
      operator,
    });
    return this;
  }

  addRefiners(refiners:ISqlRefiner[]) {
    this.$refiners.push(...refiners);
    return this;
  }

  text(key:string, value:any, operator:SqlOperator, flags?:SqlQueryFlags) {
    return this.refiner(key, value, operator, SqlRefinerType.String, flags);
  }

  number(key:string, value:any, operator:SqlOperator, flags?:SqlQueryFlags) {
    return this.refiner(key, value, operator, SqlRefinerType.Number);
  }

  bool(key:string, value:any, operator:SqlOperator, flags?:SqlQueryFlags) {
    return this.refiner(key, value, operator, SqlRefinerType.Boolean);
  }

  isIn(key:string, value:any, flags?:SqlQueryFlags) {
    return this.refiner(key, value, SqlOperator.IN, SqlRefinerType.String);
  }

  isNotIn(key:string, value:any, flags?:SqlQueryFlags) {
    return this.refiner(key, value, SqlOperator.NOT_IN, SqlRefinerType.String);
  }

  get relation() {
    return new SqlQueryModel(this);
  }

  relationOn(key:string) {
    return new SqlQueryModel(this, key);
  }

  end() {
    if (this.$parent) {
      return this.$parent.addRefiner({
        key:this.$key,
        type:SqlRefinerType.Relation,
        value:null,
        operator:SqlOperator.IN,
        relation:{
          refiners:this.$refiners,
          sorters:this.$sorters,
          table:this.$table,
          as:this.$as,
          tableIdentifier:this.$tableIdentifier,
          count:this.$count,
          skip:this.$skip,
          isDistinct:this.$isDistinct,
          refinersOperator:this.$operator,
          selection:this.$selection,
          isStats:this.$isStats,
        },
      });
    }
    return this.build();
  }

  toSqlRefiner() {
    return {
      key:this.$key,
      type:SqlRefinerType.Relation,
      value:null,
      operator:SqlOperator.IN,
      relation:{
        joins:this.$joins,
        having:this.$having,
        groupBy:this.$groupBy,
        refiners:this.$refiners,
        sorters:this.$sorters,
        table:this.$table,
        as:this.$as,
        tableIdentifier:this.$tableIdentifier,
        count:this.$count,
        skip:this.$skip,
        isDistinct:this.$isDistinct,
        refinersOperator:this.$operator,
        selection:this.$selection,
        isStats:this.$isStats,
      },
    };
  }

  build() {
    return {
      with:this.$with,
      joins:this.$joins,
      having:this.$having,
      groupBy:this.$groupBy,
      refiners:this.$refiners,
      sorters:this.$sorters,
      table:this.$table,
      as:this.$as,
      tableIdentifier:this.$tableIdentifier,
      count:this.$count,
      skip:this.$skip,
      isDistinct:this.$isDistinct,
      refinersOperator:this.$operator,
      selection:this.$selection,
      isStats:this.$isStats,
    };
  }
}
