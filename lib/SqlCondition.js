"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
/**
 * Represents a SQL condition
 */
var SqlCondition = /** @class */ (function () {
    /**
     * Constructs a new SqlCondition object
     * @param ctx the context to add this condition to,
     * this is useful when working with sub queries to allow nesting
     * SQL queries
     * @param key the column name to refine by
     */
    function SqlCondition(ctx, key) {
        this.$flags = 0;
        this.context = ctx;
        this.$key = key;
        this.$isNegated = false;
    }
    Object.defineProperty(SqlCondition.prototype, "magicParams", {
        /**
         * Adds a flag to let consumers of this JQL that this condition uses
         * special columns and as such handle it differently
         */
        get: function () {
            this.$flags |= enums_1.SqlQueryFlags.USE_MAGIC_PARAMS;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlCondition.prototype, "exact", {
        /**
         * Adds a flag to let consumers of this JQL that this condition is an
         * exact field and needs to be passed to the SQL query as is
         */
        get: function () {
            this.$flags |= enums_1.SqlQueryFlags.EXACT;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlCondition.prototype, "caseInsensetive", {
        /**
         * Adds a flag to indicate that this is a case insensitive condition
         */
        get: function () {
            this.$flags |= enums_1.SqlQueryFlags.CASE_SENSETIVE;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlCondition.prototype, "not", {
        /**
         * Indicate that the condition is negated. This is translated internally
         * as a flip on the operator field
         */
        get: function () {
            this.$isNegated = !this.$isNegated;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the column name to filter by (left hand side)
     * @param key specify the column name to filter (i.e. left hand side)
     */
    SqlCondition.prototype.key = function (key) {
        this.$key = key;
        return this;
    };
    /**
     * Sets the value to filter by (right hand side)
     * @param val specify the right hand side of the condition
     */
    SqlCondition.prototype.value = function (val) {
        this.$value = val;
        return this;
    };
    /**
     * Specifies that this condition is an equal condition i.e.
     * sets the operator to `EQ` and the right hand side to the provided value
     * @param val the value to use as the right-hand side value
     */
    SqlCondition.prototype.equalTo = function (val) {
        this.$operator = enums_1.SqlOperator.EQ;
        this.$value = val;
        return this;
    };
    /**
     * Specifices that this condition is a `LIKE '{val}%'` condition
     * i.e. sets the operator to `LIKE` and the value to `${val}%`.
     * This also sets the type to string as `LIKE` can only be applied
     * @param val the value to use as the right-hand side value
     */
    SqlCondition.prototype.startsWith = function (val) {
        this.$operator = enums_1.SqlOperator.LIKE;
        this.$type = enums_1.SqlRefinerType.String;
        this.$value = val + "%";
        return this;
    };
    /**
     * Specifices that this condition is a `LIKE '%{val}'` condition
     * i.e. sets the operator to `LIKE` and the value to `%{val}`.
     * This also sets the type to string as `LIKE` can only be applied
     * to string conditions
     * @param val the value to use as the right-hand side value
     */
    SqlCondition.prototype.endsWith = function (val) {
        this.$operator = enums_1.SqlOperator.LIKE;
        this.$type = enums_1.SqlRefinerType.String;
        this.$value = "%" + val;
        return this;
    };
    /**
     * Specifices that this condition is a `LIKE '%{val}%'` condition
     * i.e. sets the operator to `LIKE` and the value to `%{val}%`.
     * This also sets the type to string as `LIKE` can only be applied
     * to string conditions
     * @param val the value to use as the right-hand side value
     */
    SqlCondition.prototype.contains = function (val) {
        this.$operator = enums_1.SqlOperator.LIKE;
        this.$type = enums_1.SqlRefinerType.String;
        this.$value = "%" + val + "%";
        return this;
    };
    /**
     * Specifies that this condition is a not equal condition i.e.
     * sets the operator to `NE` and the right hand side to the provided value
     * @param val the value to use as the right-hand side value
     */
    SqlCondition.prototype.notEqualTo = function (val) {
        this.$operator = enums_1.SqlOperator.NE;
        this.$value = val;
        return this;
    };
    /**
     * Specifies that this condition is a `NOT IN` condition i.e.
     * sets the operator to `NOT_IN` and the right hand side to the provided value
     * @param val the value to use as the right-hand side value, an array
     * of values
     */
    SqlCondition.prototype.notIn = function (val) {
        this.$operator = enums_1.SqlOperator.NOT_IN;
        if (!val) {
            throw new Error("Expected an array of values but got " + val);
        }
        if (val.length === 0) {
            throw new Error('Expected an array with at least one values but got empty array');
        }
        this.$value = val;
        this.$type = enums_1.SqlRefinerType.Selection;
        return this;
    };
    /**
     * Specifies that this condition is a greater than condition i.e.
     * sets the operator to `>` and the right-hand side to the provided value
     * @param val the value to use as the right-hand side value
     */
    SqlCondition.prototype.greaterThan = function (val) {
        this.$operator = enums_1.SqlOperator.GT;
        this.$value = val;
        return this;
    };
    /**
     * Specifies that this condition is a greater than or equal condition i.e.
     * sets the operator to `>=` and the right-hand side to the provided value
     * @param val the value to use as the right-hand side value
     */
    SqlCondition.prototype.greaterThanOrEqual = function (val) {
        this.$operator = enums_1.SqlOperator.GE;
        this.$value = val;
        return this;
    };
    /**
     * Specifies that this condition is a less than condition i.e.
     * sets the operator to `<` and the right-hand side to the provided value
     * @param val the value to use as the right-hand side value
     */
    SqlCondition.prototype.lessThan = function (val) {
        this.$operator = enums_1.SqlOperator.LT;
        this.$value = val;
        return this;
    };
    /**
     * Specifies that this condition is a less than or equal condition i.e.
     * sets the operator to `<=` and the right-hand side to the provided value
     * @param val the value to use as the right-hand side value
     */
    SqlCondition.prototype.lessThanOrEqual = function (val) {
        this.$operator = enums_1.SqlOperator.LE;
        this.$value = val;
        return this;
    };
    /**
     * Specifies that this condition is a between condition i.e.
     * sets the operator to `BETWEEN` and the right-hand side to the provided range
     * @param from the value to use as the start of the range
     * @param to the value to use as the end of the range
     */
    SqlCondition.prototype.between = function (from, to) {
        this.$operator = enums_1.SqlOperator.BETWEEN;
        this.$value = [from, to];
        return this;
    };
    /**
     * Specifies that this condition is a `NOT LIKE` condition i.e.
     * sets the operator to `NOT_LIKE` and the right-hand side to the provided value
     * i.e. `%{val}%`
     * @param val the value to use as the right-hand side.
     */
    SqlCondition.prototype.notLike = function (val) {
        this.$operator = enums_1.SqlOperator.NOT_LIKE;
        this.$value = "%" + val + "%";
        return this;
    };
    /**
     * Specifies that this condition is a `NOT BETWEEN` condition i.e.
     * sets the operator to `NOT_BETWEEN` and the right-hand side to the provided range
     * i.e. `%{val}%`
     * @param from the value to use as the start of the range
     * @param to the value to use as the end of the range
     */
    SqlCondition.prototype.notBetween = function (from, to) {
        this.$operator = enums_1.SqlOperator.NOT_BETWEEN;
        this.$value = [from, to];
        return this;
    };
    Object.defineProperty(SqlCondition.prototype, "isNull", {
        /**
         * Specifies that this condition is a `IS NULL` condition i.e.
         * sets the operator to `IS_NULL`
         */
        get: function () {
            this.$operator = enums_1.SqlOperator.IS_NULL,
                this.$value = null;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlCondition.prototype, "isNotNull", {
        /**
         * Specifies that this condition is a `IS NOT NULL` condition i.e.
         * sets the operator to `IS_NOT_NULL`
         */
        get: function () {
            this.$operator = enums_1.SqlOperator.IS_NOT_NULL,
                this.$value = null;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Specifies that this condition is a `IN` condition i.e.
     * sets the operator to `IN` and the right hand side to the provided value
     * @param val the value to use as the right-hand side value, an array
     * of values
     */
    SqlCondition.prototype.isIn = function (val) {
        if (!val) {
            throw new Error("Expected an array of values but got " + val);
        }
        if (val.length === 0) {
            throw new Error('Expected an array with at least one values but got empty array');
        }
        this.$operator = enums_1.SqlOperator.IN;
        this.$type = enums_1.SqlRefinerType.Selection;
        this.$value = val;
        return this;
    };
    /**
     * Sets the type of the condition to the provided value
     * @param type the condition type
     */
    SqlCondition.prototype.type = function (type) {
        this.$type = type;
        return this;
    };
    /**
     * Sets the operator of the condition to the provided value
     * @param type the condition operator
     */
    SqlCondition.prototype.operator = function (op) {
        this.$operator = op;
        return this;
    };
    Object.defineProperty(SqlCondition.prototype, "string", {
        /**
         * Sets the condition type to string
         */
        get: function () {
            this.$type = enums_1.SqlRefinerType.String;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlCondition.prototype, "number", {
        /**
         * Sets the condition type to number
         */
        get: function () {
            this.$type = enums_1.SqlRefinerType.Number;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlCondition.prototype, "dateRange", {
        /**
         * Sets the condition type to date range
         */
        get: function () {
            this.$type = enums_1.SqlRefinerType.DateRange;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlCondition.prototype, "date", {
        /**
         * Sets the condition type to date
         */
        get: function () {
            this.$type = enums_1.SqlRefinerType.Date;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlCondition.prototype, "datetime", {
        /**
         * Sets the condition type to datetime
         */
        get: function () {
            this.$type = enums_1.SqlRefinerType.DateTime;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlCondition.prototype, "bool", {
        /**
         * Sets the condition type to bool
         */
        get: function () {
            this.$type = enums_1.SqlRefinerType.Boolean;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlCondition.prototype, "like", {
        /**
         * Sets the condition type to like
         */
        get: function () {
            this.$operator = enums_1.SqlOperator.LIKE;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Extracts the condition definition from the class
     */
    SqlCondition.prototype.toSqlRefiner = function () {
        var op = (this.$operator || enums_1.SqlOperator.EQ);
        return {
            key: this.$key,
            flags: this.$flags,
            operator: this.$isNegated ? ~op : op,
            type: this.$type,
            value: this.$value,
        };
    };
    /**
     * Support safe serialisation to JSON i.e. when the class is used in JSON.stringify
     */
    SqlCondition.prototype.toJSON = function () {
        return this.toSqlRefiner();
    };
    /**
     * Adds this refiner to the parent context
     */
    SqlCondition.prototype.add = function () {
        var op = (this.$operator || enums_1.SqlOperator.EQ);
        return this.context.addRefiner({
            key: this.$key,
            flags: this.$flags,
            operator: this.$isNegated ? ~op : op,
            type: this.$type,
            value: this.$value,
        });
    };
    return SqlCondition;
}());
exports.SqlCondition = SqlCondition;
