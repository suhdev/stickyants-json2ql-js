import { JoinType } from './enums';
import { ISqlRefinable } from './ISqlRefinable';
import { ISqlRefiner } from './ISqlRefiner';

/**
 * Represents a join relationship
 */
export class SqlJoin {
  $type: JoinType;
  $to: string;
  $on:ISqlRefiner[];
  $alias: string;

  constructor() {
    this.$type = JoinType.LeftJoin;
    this.$on = [];
  }

  /**
   * Sets the join to be an inner join
   */
  get inner() {
    this.$type = JoinType.InnerJoin;
    return this;
  }

  /**
   * Sets the join to be an outer join
   */
  get outer() {
    this.$type = JoinType.OuterJoin;
    return this;
  }

  /**
   * Sets the join to be an left join
   */
  get left() {
    this.$type = JoinType.LeftJoin;
    return this;
  }

  /**
   * Sets the join to be an right join
   */
  get right() {
    this.$type = JoinType.RightJoin;
    return this;
  }

  /**
   * Sets the join type to the given join type
   * @param type the join type
   */
  type(type:JoinType) {
    this.$type = type;
    return this;
  }

  /**
   * Sets the join table's alias
   * @param as the table alias
   */
  alias(as:string) {
    this.$alias = as;
    return this;
  }

  /**
   * Sets the name of the join table
   * @param table the join table name
   */
  toTable(table:string) {
    this.$to = table;
    return this;
  }

  /**
   * Sets the join conditions
   * @param args the join conditions
   */
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
