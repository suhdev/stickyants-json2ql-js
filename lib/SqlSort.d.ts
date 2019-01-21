import { SqlQueryModel } from './SqlQueryModel';
import { ISqlRefiner } from './ISqlRefiner';
/**
 * Represents a sort option in a SELECT statement
 */
export declare class SqlSort {
    private $key;
    private $direction;
    private $context;
    constructor(context: SqlQueryModel, key: string);
    /**
     * Sets the sort direction to be ascending
     */
    readonly asc: this;
    /**
     * Sets the sort direction to be descending
     */
    readonly desc: this;
    /**
     * Sets the column name to sort by
     * @param k the column name
     */
    key(k: string): this;
    /**
     * Sets the context model
     * @param ctx the context to use the sort on
     */
    context(ctx: SqlQueryModel): this;
    /**
     * Adds the sort option to the context model
     * and return the context
     */
    add(): SqlQueryModel;
    /**
     * Constructs a new sort option model using a JSON object
     * @param obj the json object to construct the sort option from
     */
    static fromJson(obj: ISqlRefiner): SqlSort;
    toJSON(): ISqlRefiner;
    /**
     * Extracts the SQL refiner definition
     */
    toSqlRefiner(): ISqlRefiner;
}
