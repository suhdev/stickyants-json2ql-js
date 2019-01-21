"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
/**
 * Represents a sort option in a SELECT statement
 */
var SqlSort = /** @class */ (function () {
    function SqlSort(context, key) {
        this.$context = context;
        this.$key = key;
    }
    Object.defineProperty(SqlSort.prototype, "asc", {
        /**
         * Sets the sort direction to be ascending
         */
        get: function () {
            this.$direction = enums_1.SqlSorterDirection.ASC;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlSort.prototype, "desc", {
        /**
         * Sets the sort direction to be descending
         */
        get: function () {
            this.$direction = enums_1.SqlSorterDirection.DESC;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the column name to sort by
     * @param k the column name
     */
    SqlSort.prototype.key = function (k) {
        this.$key = k;
        return this;
    };
    /**
     * Sets the context model
     * @param ctx the context to use the sort on
     */
    SqlSort.prototype.context = function (ctx) {
        this.$context = ctx;
        return this;
    };
    /**
     * Adds the sort option to the context model
     * and return the context
     */
    SqlSort.prototype.add = function () {
        this.$context.addSort({
            type: enums_1.SqlRefinerType.Sort,
            value: this.$direction,
            key: this.$key,
            operator: enums_1.SqlOperator.EQ,
        });
        return this.$context;
    };
    /**
     * Constructs a new sort option model using a JSON object
     * @param obj the json object to construct the sort option from
     */
    SqlSort.fromJson = function (obj) {
        var s = new SqlSort(null, obj.key);
        if (obj.value === enums_1.SqlSorterDirection.ASC) {
            s.asc;
        }
        else {
            s.desc;
        }
        return s;
    };
    SqlSort.prototype.toJSON = function () {
        return this.toSqlRefiner();
    };
    /**
     * Extracts the SQL refiner definition
     */
    SqlSort.prototype.toSqlRefiner = function () {
        return {
            type: enums_1.SqlRefinerType.Sort,
            value: this.$direction,
            key: this.$key,
            operator: enums_1.SqlOperator.EQ,
        };
    };
    return SqlSort;
}());
exports.SqlSort = SqlSort;
