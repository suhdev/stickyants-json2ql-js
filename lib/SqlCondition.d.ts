import { SqlRefinerType, SqlQueryFlags, SqlOperator } from './enums';
import { SqlQueryModel } from './SqlQueryModel';
/**
 * Represents a SQL condition
 */
export declare class SqlCondition {
    private $key;
    private $value;
    private $type;
    private $flags;
    private $operator;
    private context;
    private $isNegated;
    /**
     * Constructs a new SqlCondition object
     * @param ctx the context to add this condition to,
     * this is useful when working with sub queries to allow nesting
     * SQL queries
     * @param key the column name to refine by
     */
    constructor(ctx: SqlQueryModel, key: string);
    /**
     * Adds a flag to let consumers of this JQL that this condition uses
     * special columns and as such handle it differently
     */
    readonly magicParams: this;
    /**
     * Adds a flag to let consumers of this JQL that this condition is an
     * exact field and needs to be passed to the SQL query as is
     */
    readonly exact: this;
    /**
     * Adds a flag to indicate that this is a case insensitive condition
     */
    readonly caseInsensetive: this;
    /**
     * Indicate that the condition is negated. This is translated internally
     * as a flip on the operator field
     */
    readonly not: this;
    /**
     * Sets the column name to filter by (left hand side)
     * @param key specify the column name to filter (i.e. left hand side)
     */
    key(key: string): this;
    /**
     * Sets the value to filter by (right hand side)
     * @param val specify the right hand side of the condition
     */
    value(val: any): this;
    /**
     * Specifies that this condition is an equal condition i.e.
     * sets the operator to `EQ` and the right hand side to the provided value
     * @param val the value to use as the right-hand side value
     */
    equalTo(val: any): this;
    /**
     * Specifices that this condition is a `LIKE '{val}%'` condition
     * i.e. sets the operator to `LIKE` and the value to `${val}%`.
     * This also sets the type to string as `LIKE` can only be applied
     * @param val the value to use as the right-hand side value
     */
    startsWith(val: any): this;
    /**
     * Specifices that this condition is a `LIKE '%{val}'` condition
     * i.e. sets the operator to `LIKE` and the value to `%{val}`.
     * This also sets the type to string as `LIKE` can only be applied
     * to string conditions
     * @param val the value to use as the right-hand side value
     */
    endsWith(val: any): this;
    /**
     * Specifices that this condition is a `LIKE '%{val}%'` condition
     * i.e. sets the operator to `LIKE` and the value to `%{val}%`.
     * This also sets the type to string as `LIKE` can only be applied
     * to string conditions
     * @param val the value to use as the right-hand side value
     */
    contains(val: any): this;
    /**
     * Specifies that this condition is a not equal condition i.e.
     * sets the operator to `NE` and the right hand side to the provided value
     * @param val the value to use as the right-hand side value
     */
    notEqualTo(val: any): this;
    /**
     * Specifies that this condition is a `NOT IN` condition i.e.
     * sets the operator to `NOT_IN` and the right hand side to the provided value
     * @param val the value to use as the right-hand side value, an array
     * of values
     */
    notIn(val: any[]): this;
    /**
     * Specifies that this condition is a greater than condition i.e.
     * sets the operator to `>` and the right-hand side to the provided value
     * @param val the value to use as the right-hand side value
     */
    greaterThan(val: number | string): this;
    /**
     * Specifies that this condition is a greater than or equal condition i.e.
     * sets the operator to `>=` and the right-hand side to the provided value
     * @param val the value to use as the right-hand side value
     */
    greaterThanOrEqual(val: number | string): this;
    /**
     * Specifies that this condition is a less than condition i.e.
     * sets the operator to `<` and the right-hand side to the provided value
     * @param val the value to use as the right-hand side value
     */
    lessThan(val: any): this;
    /**
     * Specifies that this condition is a less than or equal condition i.e.
     * sets the operator to `<=` and the right-hand side to the provided value
     * @param val the value to use as the right-hand side value
     */
    lessThanOrEqual(val: any): this;
    /**
     * Specifies that this condition is a between condition i.e.
     * sets the operator to `BETWEEN` and the right-hand side to the provided range
     * @param from the value to use as the start of the range
     * @param to the value to use as the end of the range
     */
    between<T extends string | number>(from: T, to: T): this;
    /**
     * Specifies that this condition is a `NOT LIKE` condition i.e.
     * sets the operator to `NOT_LIKE` and the right-hand side to the provided value
     * i.e. `%{val}%`
     * @param val the value to use as the right-hand side.
     */
    notLike(val: string): this;
    /**
     * Specifies that this condition is a `NOT BETWEEN` condition i.e.
     * sets the operator to `NOT_BETWEEN` and the right-hand side to the provided range
     * i.e. `%{val}%`
     * @param from the value to use as the start of the range
     * @param to the value to use as the end of the range
     */
    notBetween(from: any, to: any): this;
    /**
     * Specifies that this condition is a `IS NULL` condition i.e.
     * sets the operator to `IS_NULL`
     */
    readonly isNull: this;
    /**
     * Specifies that this condition is a `IS NOT NULL` condition i.e.
     * sets the operator to `IS_NOT_NULL`
     */
    readonly isNotNull: this;
    /**
     * Specifies that this condition is a `IN` condition i.e.
     * sets the operator to `IN` and the right hand side to the provided value
     * @param val the value to use as the right-hand side value, an array
     * of values
     */
    isIn(val: any[]): this;
    /**
     * Sets the type of the condition to the provided value
     * @param type the condition type
     */
    type(type: SqlRefinerType): this;
    /**
     * Sets the operator of the condition to the provided value
     * @param type the condition operator
     */
    operator(op: SqlOperator): this;
    /**
     * Sets the condition type to string
     */
    readonly string: this;
    /**
     * Sets the condition type to number
     */
    readonly number: this;
    /**
     * Sets the condition type to date range
     */
    readonly dateRange: this;
    /**
     * Sets the condition type to date
     */
    readonly date: this;
    /**
     * Sets the condition type to datetime
     */
    readonly datetime: this;
    /**
     * Sets the condition type to bool
     */
    readonly bool: this;
    /**
     * Sets the condition type to like
     */
    readonly like: this;
    /**
     * Extracts the condition definition from the class
     */
    toSqlRefiner(): {
        key: string;
        flags: SqlQueryFlags;
        operator: number;
        type: SqlRefinerType;
        value: any;
    };
    /**
     * Support safe serialisation to JSON i.e. when the class is used in JSON.stringify
     */
    toJSON(): {
        key: string;
        flags: SqlQueryFlags;
        operator: number;
        type: SqlRefinerType;
        value: any;
    };
    /**
     * Adds this refiner to the parent context
     */
    add(): SqlQueryModel;
}
