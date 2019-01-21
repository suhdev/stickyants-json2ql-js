import { JoinType } from './enums';
import { ISqlRefinable } from './ISqlRefinable';
import { ISqlRefiner } from './ISqlRefiner';

export class SqlJoin {
  $type: JoinType;
  $to: string;
  $on:ISqlRefiner[];
  $alias: string;
  constructor() {
    this.$type = JoinType.LeftJoin;
    this.$on = [];
  }

  type(type:JoinType) {
    this.$type = type;
    return this;
  }

  alias(as:string) {
    this.$alias = as;
    return this;
  }

  toTable(table:string) {
    this.$to = table;
    return this;
  }

  on(...args:ISqlRefinable[]) {
    this.$on.push(...args.filter(e => e).map(e => e.toSqlRefiner()));
    return this;
  }

  toJSON() {
    return {
      type:this.$type,
      on:this.$on,
      alias:this.$alias,
      to:this.$to,
    };
  }
}
