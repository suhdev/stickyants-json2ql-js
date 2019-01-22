import { JoinType } from './enums';
import { ISqlRefinable } from './ISqlRefinable';
import { ISqlRefiner } from './ISqlRefiner';
import { ISqlJoin } from './ISqlJoin';
/**
 * Represents a join relationship
 */
export declare class SqlJoin {
    $type: JoinType;
    $to: string;
    $on: ISqlRefiner[];
    $alias: string;
    constructor();
    /**
     * Sets the join to be an inner join
     */
    readonly inner: this;
    /**
     * Sets the join to be an outer join
     */
    readonly outer: this;
    /**
     * Sets the join to be an left join
     */
    readonly left: this;
    /**
     * Sets the join to be an right join
     */
    readonly right: this;
    /**
     * Sets the join type to the given join type
     * @param type the join type
     */
    type(type: JoinType): this;
    /**
     * Sets the join table's alias
     * @param as the table alias
     */
    alias(as: string): this;
    /**
     * Sets the name of the join table
     * @param table the join table name
     */
    toTable(table: string): this;
    /**
     * Sets the join conditions
     * @param args the join conditions
     */
    on(...args: ISqlRefinable[]): this;
    toJSON(): ISqlJoin;
}
