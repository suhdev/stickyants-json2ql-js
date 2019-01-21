import { SqlRefinerType,
  SqlOperator,
  SqlQueryFlags } from './enums';
import { SqlCondition } from './SqlCondition';
import { ISqlRefiner } from './ISqlRefiner';
import { SqlQueryModel } from './SqlQueryModel';
import { ISqlRefinable } from './ISqlRefinable';

export class SqlQueryGroup {
  private refiners:ISqlRefiner[] = [];
  private context:SqlQueryGroup|SqlQueryModel;
  private operator: SqlOperator;
  private builder: SqlQueryModel;
  constructor(builder:SqlQueryModel, context:SqlQueryGroup|SqlQueryModel, operator:SqlOperator) {
    this.builder = builder;
    this.context = context;
    this.operator = operator;
  }

  refiner(key:string, value:any, operator:SqlOperator,
          type:SqlRefinerType, flags?:SqlQueryFlags) {
    this.refiners.push({
      key,
      value,
      type,
      operator,
      flags,
    });
    return this;
  }

  filter(...args:ISqlRefinable[]) {
    this.refiners.push(...args.filter(e => e).map(e => e.toSqlRefiner()));
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

  isBetween(key:string, from:any, to:any, flags?:SqlQueryFlags) {
    return this.refiner(key, [from, to], SqlOperator.BETWEEN, SqlRefinerType.String);
  }

  isNotBetween(key:string, from:any, to:any, flags?:SqlQueryFlags) {
    return this.refiner(key, [from, to], SqlOperator.NOT_BETWEEN, SqlRefinerType.String);
  }

  addRefiner(...refs:ISqlRefiner[]) {
    this.refiners.push(...refs);
    return this;
  }

  relation(key:string) {
    return new SqlQueryModel(this, key);
  }

  group(operator:SqlOperator) {
    return new SqlQueryGroup(this.builder, this, operator);
  }

  andGroup() {
    return new SqlQueryGroup(this.builder, this, SqlOperator.AND);
  }

  orGroup() {
    return new SqlQueryGroup(this.builder, this, SqlOperator.OR);
  }

  addRefiners(refiners:ISqlRefiner[]) {
    this.refiners.push(...refiners);
    return this;
  }

  ref(key:string) {
    return new SqlCondition(this, key);
  }

  relationOn(key:string) {
    return new SqlQueryModel(this, key);
  }

  add() {
    return this.context.addRefiner({
      type:SqlRefinerType.Grouping,
      refiners:this.refiners,
      key:`SomeKey${Date.now()}`,
      value:null,
      operator:this.operator,
    });
  }

  toSqlRefiner() {
    return {
      type:SqlRefinerType.Grouping,
      refiners:this.refiners,
      key:`SomeKey${Date.now()}`,
      value:null,
      operator:this.operator,
    };
  }

  toJSON() {
    return this.toSqlRefiner();
  }

  build() {
    return this.builder.addRefiner({
      type:SqlRefinerType.Grouping,
      refiners:this.refiners,
      key:`SomeKey${Date.now()}`,
      value:null,
      operator:this.operator,
    });
  }
}
