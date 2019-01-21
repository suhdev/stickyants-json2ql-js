"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
/**
 * Represents a join relationship
 */
var SqlJoin = /** @class */ (function () {
    function SqlJoin() {
        this.$type = enums_1.JoinType.LeftJoin;
        this.$on = [];
    }
    Object.defineProperty(SqlJoin.prototype, "inner", {
        /**
         * Sets the join to be an inner join
         */
        get: function () {
            this.$type = enums_1.JoinType.InnerJoin;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlJoin.prototype, "outer", {
        /**
         * Sets the join to be an outer join
         */
        get: function () {
            this.$type = enums_1.JoinType.OuterJoin;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlJoin.prototype, "left", {
        /**
         * Sets the join to be an left join
         */
        get: function () {
            this.$type = enums_1.JoinType.LeftJoin;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SqlJoin.prototype, "right", {
        /**
         * Sets the join to be an right join
         */
        get: function () {
            this.$type = enums_1.JoinType.RightJoin;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the join type to the given join type
     * @param type the join type
     */
    SqlJoin.prototype.type = function (type) {
        this.$type = type;
        return this;
    };
    /**
     * Sets the join table's alias
     * @param as the table alias
     */
    SqlJoin.prototype.alias = function (as) {
        this.$alias = as;
        return this;
    };
    /**
     * Sets the name of the join table
     * @param table the join table name
     */
    SqlJoin.prototype.toTable = function (table) {
        this.$to = table;
        return this;
    };
    /**
     * Sets the join conditions
     * @param args the join conditions
     */
    SqlJoin.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        (_a = this.$on).push.apply(_a, args.filter(function (e) { return e; }).map(function (e) { return e.toSqlRefiner(); }));
        return this;
    };
    SqlJoin.prototype.toJSON = function () {
        return {
            type: this.$type,
            on: this.$on,
            alias: this.$alias,
            to: this.$to,
        };
    };
    return SqlJoin;
}());
exports.SqlJoin = SqlJoin;
