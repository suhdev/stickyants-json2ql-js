import { ISqlRefiner } from './ISqlRefiner';
import { SqlOperator,
  SqlRefinerType, SqlQueryFlags, SqlModifier } from './enums';
import { ISqlRefinable } from './ISqlRefinable';
import { SqlCondition } from './SqlCondition';
import { SqlSort } from './SqlSort';
import { SqlJoin } from './SqlJoin';
import { ISqlQuery } from './ISqlQuery';
import { ISqlJoin } from './ISqlJoin';

export class SqlQueryModel {
  private $table:string;
  private $as:string;
  private $skip:number = 0;
  private $count:number = -1;
  private $modifiers:SqlModifier = 0;
  private $isDistinct:boolean;
  private $operator:SqlOperator = SqlOperator.AND;
  private $refiners:ISqlRefiner[] = [];
  private $having:ISqlRefiner[] = [];
  private $joins:ISqlJoin[] = [];
  private $groupBy:string[] = [];
  private $sorters:ISqlRefiner[] = [];
  private $selection:string[] = ['*'];
  private $tableIdentifier: string;
  private $parent: SqlQueryModel;
  private $key: string;
  private $with: ISqlQuery[] = [];
  private $type:SqlRefinerType;

  constructor(op:SqlOperator = SqlOperator.AND,
              parentModel?:SqlQueryModel, key?:string) {
    this.$parent = parentModel;
    this.$type = SqlRefinerType.Grouping;
    this.$operator = op;
    this.$key = key || `SomeKey${Date.now()}`;
  }

  get asRelation() {
    this.$type = SqlRefinerType.Relation;
    return this;
  }

  get asGrouping() {
    this.$type = SqlRefinerType.Grouping;
    return this;
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
    return this;
  }

  addSorters(sorters:ISqlRefiner[]) {
    this.$sorters.push(...sorters);
    return this;
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

  orderBy(key:string) {
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

  modifier(mod:SqlModifier) {
    this.$modifiers |= mod;
    return this;
  }

  isBetween(key:string, from:any, to:any, flags?:SqlQueryFlags) {
    return this.refiner(key, [from, to], SqlOperator.BETWEEN, SqlRefinerType.String);
  }

  isNotBetween(key:string, from:any, to:any, flags?:SqlQueryFlags) {
    return this.refiner(key, [from, to], SqlOperator.NOT_BETWEEN, SqlRefinerType.String);
  }

  with(...args:SqlQueryModel[]) {
    this.$with = args.map(e => e.build());
    return this;
  }

  join(cb:(model:SqlJoin) => void) {
    const m = new SqlJoin();
    cb(m);
    this.$joins.push(m.toJSON());
    return this;
  }

  joinWith(joinTable:string, cb:(model:SqlJoin) => void) {
    const m = new SqlJoin();
    m.toTable(joinTable);
    cb(m);
    this.$joins.push(m.toJSON());
    return this;
  }

  operator(op:SqlOperator) {
    this.$operator = op;
    return this;
  }

  get distinct() {
    this.$modifiers |= SqlModifier.Distinct;
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

  count(count:number) {
    this.$count = count;
    return this;
  }

  tableIdentifier(id:string) {
    this.$tableIdentifier = id;
    return this;
  }

  andGroup() {
    return new SqlQueryModel(SqlOperator.AND, this, null);
  }

  orGroup() {
    return new SqlQueryModel(SqlOperator.OR, this, null);
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

  text(key:string, value:string, operator:SqlOperator, flags?:SqlQueryFlags) {
    return this.refiner(key, value, operator, SqlRefinerType.String, flags);
  }

  number(key:string, value:number, operator:SqlOperator, flags?:SqlQueryFlags) {
    return this.refiner(key, value, operator, SqlRefinerType.Number);
  }

  bool(key:string, value:boolean, flags?:SqlQueryFlags) {
    return this.refiner(key, value, SqlOperator.EQ, SqlRefinerType.Boolean);
  }

  isIn(key:string, value:any, flags?:SqlQueryFlags) {
    return this.refiner(key, value, SqlOperator.IN, SqlRefinerType.String);
  }

  isNotIn(key:string, value:any, flags?:SqlQueryFlags) {
    return this.refiner(key, value, SqlOperator.NOT_IN, SqlRefinerType.String);
  }

  get relation() {
    return new SqlQueryModel(SqlOperator.AND, this);
  }

  end():SqlQueryModel|ISqlQuery {
    if (this.$parent) {
      return this.$parent.addRefiner({
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
          modifiers:this.$modifiers,
          refinersOperator:this.$operator,
          selection:this.$selection,
        },
      });
    }
    return this.build();
  }

  toSqlRefiner() {
    return this.$type === SqlRefinerType.Grouping ? {
      key:this.$key,
      type:SqlRefinerType.Grouping,
      refiners:this.$refiners,
      value:null,
      operator:this.$operator,
    } :{
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
        modifiers:this.$modifiers,
        refinersOperator:this.$operator,
        selection:this.$selection,
      },
    };
  }

  toJSON() {
    return this.build();
  }

  build():ISqlQuery {
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
      modifiers:this.$modifiers,
      refinersOperator:this.$operator,
      selection:this.$selection,
    };
  }
}
