"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
var SqlCondition_1 = require("./SqlCondition");
var SqlSort_1 = require("./SqlSort");
var SqlJoin_1 = require("./SqlJoin");
var SqlQueryModel = /** @class */ (function () {
    function SqlQueryModel(op, parentModel, key) {
        if (op === void 0) { op = enums_1.SqlOperator.AND; }
        this.$skip = 0;
        this.$count = -1;
        this.$isStats = false;
        this.$modifiers = 0;
        this.$operator = enums_1.SqlOperator.AND;
        this.$refiners = [];
        this.$having = [];
        this.$joins = [];
        this.$groupBy = [];
        this.$sorters = [];
        this.$selection = ['*'];
        this.$with = [];
        this.$parent = parentModel;
        this.$type = enums_1.SqlRefinerType.Grouping;
        this.$operator = op;
        this.$key = key || "SomeKey" + Date.now();
    }
    Object.defineProperty(SqlQueryModel.prototype, "asGrouping", {
        get: function () {
            this.$type = enums_1.SqlRefinerType.Grouping;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    SqlQueryModel.prototype.filter = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        (_a = this.$refiners).push.apply(_a, args.filter(function (e) { return e; }).map(function (e) { return e.toSqlRefiner(); }));
        return this;
    };
    SqlQueryModel.prototype.filterHaving = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        (_a = this.$having).push.apply(_a, args.filter(function (e) { return e; }).map(function (e) { return e.toSqlRefiner(); }));
        return this;
    };
    SqlQueryModel.prototype.groupBy = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.$groupBy = args;
        return this;
    };
    SqlQueryModel.prototype.order = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        (_a = this.$sorters).push.apply(_a, args.filter(function (e) { return e; }).map(function (e) { return e.toSqlRefiner(); }));
        return this;
    };
    SqlQueryModel.prototype.addSort = function (sort) {
        this.$sorters.push(sort);
    };
    SqlQueryModel.prototype.addSorters = function (sorters) {
        var _a;
        (_a = this.$sorters).push.apply(_a, sorters);
    };
    SqlQueryModel.prototype.table = function (table) {
        this.$table = table;
        return this;
    };
    SqlQueryModel.prototype.as = function (as) {
        this.$as = as;
        return this;
    };
    SqlQueryModel.prototype.selection = function (sel) {
        this.$selection = sel;
        return this;
    };
    SqlQueryModel.prototype.orderBy = function (key) {
        return new SqlSort_1.SqlSort(this, key);
    };
    SqlQueryModel.prototype.and = function () {
        this.$operator = enums_1.SqlOperator.AND;
        return this;
    };
    SqlQueryModel.prototype.or = function () {
        this.$operator = enums_1.SqlOperator.OR;
        return this;
    };
    SqlQueryModel.prototype.key = function (key) {
        this.$key = key;
        return this;
    };
    SqlQueryModel.prototype.modifier = function (mod) {
        this.$modifiers |= mod;
        return this;
    };
    SqlQueryModel.prototype.isBetween = function (key, from, to, flags) {
        return this.refiner(key, [from, to], enums_1.SqlOperator.BETWEEN, enums_1.SqlRefinerType.String);
    };
    SqlQueryModel.prototype.isNotBetween = function (key, from, to, flags) {
        return this.refiner(key, [from, to], enums_1.SqlOperator.NOT_BETWEEN, enums_1.SqlRefinerType.String);
    };
    SqlQueryModel.prototype.with = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.$with = args;
        return this;
    };
    SqlQueryModel.prototype.join = function (cb) {
        var m = new SqlJoin_1.SqlJoin();
        cb(m);
        this.$joins.push(m);
        return this;
    };
    SqlQueryModel.prototype.joinWith = function (joinTable, cb) {
        var m = new SqlJoin_1.SqlJoin();
        m.toTable(joinTable);
        cb(m);
        this.$joins.push(m);
        return this;
    };
    SqlQueryModel.prototype.operator = function (op) {
        this.$operator = op;
        return this;
    };
    Object.defineProperty(SqlQueryModel.prototype, "distinct", {
        get: function () {
            this.$modifiers |= enums_1.SqlModifier.Distinct;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    SqlQueryModel.prototype.skip = function (skip) {
        this.$skip = skip;
        return this;
    };
    SqlQueryModel.prototype.ref = function (key) {
        return new SqlCondition_1.SqlCondition(this, key);
    };
    SqlQueryModel.prototype.addRefiner = function () {
        var refs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            refs[_i] = arguments[_i];
        }
        var _a;
        (_a = this.$refiners).push.apply(_a, refs);
        return this;
    };
    Object.defineProperty(SqlQueryModel.prototype, "stats", {
        get: function () {
            this.$isStats = true;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    SqlQueryModel.prototype.count = function (count) {
        this.$count = count;
        return this;
    };
    SqlQueryModel.prototype.tableIdentifier = function (id) {
        this.$tableIdentifier = id;
        return this;
    };
    SqlQueryModel.prototype.group = function (op) {
        return new SqlQueryModel(op, this, null);
    };
    SqlQueryModel.prototype.andGroup = function () {
        return new SqlQueryModel(enums_1.SqlOperator.AND, this, null);
    };
    SqlQueryModel.prototype.orGroup = function () {
        return new SqlQueryModel(enums_1.SqlOperator.OR, this, null);
    };
    SqlQueryModel.prototype.refiner = function (key, value, operator, type, flags) {
        this.$refiners.push({
            key: key,
            value: value,
            type: type,
            flags: flags,
            operator: operator,
        });
        return this;
    };
    SqlQueryModel.prototype.addRefiners = function (refiners) {
        var _a;
        (_a = this.$refiners).push.apply(_a, refiners);
        return this;
    };
    SqlQueryModel.prototype.text = function (key, value, operator, flags) {
        return this.refiner(key, value, operator, enums_1.SqlRefinerType.String, flags);
    };
    SqlQueryModel.prototype.number = function (key, value, operator, flags) {
        return this.refiner(key, value, operator, enums_1.SqlRefinerType.Number);
    };
    SqlQueryModel.prototype.bool = function (key, value, operator, flags) {
        return this.refiner(key, value, operator, enums_1.SqlRefinerType.Boolean);
    };
    SqlQueryModel.prototype.isIn = function (key, value, flags) {
        return this.refiner(key, value, enums_1.SqlOperator.IN, enums_1.SqlRefinerType.String);
    };
    SqlQueryModel.prototype.isNotIn = function (key, value, flags) {
        return this.refiner(key, value, enums_1.SqlOperator.NOT_IN, enums_1.SqlRefinerType.String);
    };
    Object.defineProperty(SqlQueryModel.prototype, "relation", {
        get: function () {
            return new SqlQueryModel(enums_1.SqlOperator.AND, this);
        },
        enumerable: true,
        configurable: true
    });
    SqlQueryModel.prototype.relationOn = function (key) {
        return new SqlQueryModel(enums_1.SqlOperator.AND, this, key);
    };
    SqlQueryModel.prototype.end = function () {
        if (this.$parent) {
            return this.$parent.addRefiner({
                key: this.$key,
                type: enums_1.SqlRefinerType.Relation,
                value: null,
                operator: enums_1.SqlOperator.IN,
                relation: {
                    refiners: this.$refiners,
                    sorters: this.$sorters,
                    table: this.$table,
                    as: this.$as,
                    tableIdentifier: this.$tableIdentifier,
                    count: this.$count,
                    skip: this.$skip,
                    isDistinct: this.$isDistinct,
                    refinersOperator: this.$operator,
                    selection: this.$selection,
                    isStats: this.$isStats,
                },
            });
        }
        return this.build();
    };
    SqlQueryModel.prototype.toSqlRefiner = function () {
        return this.$type === enums_1.SqlRefinerType.Grouping ? {
            key: this.$key,
            type: enums_1.SqlRefinerType.Grouping,
            refiners: this.$refiners,
            value: null,
            operator: this.$operator,
        } : {
            key: this.$key,
            type: enums_1.SqlRefinerType.Relation,
            value: null,
            operator: enums_1.SqlOperator.IN,
            relation: {
                joins: this.$joins,
                having: this.$having,
                groupBy: this.$groupBy,
                refiners: this.$refiners,
                sorters: this.$sorters,
                table: this.$table,
                as: this.$as,
                tableIdentifier: this.$tableIdentifier,
                count: this.$count,
                skip: this.$skip,
                isDistinct: this.$isDistinct,
                refinersOperator: this.$operator,
                selection: this.$selection,
                isStats: this.$isStats,
            },
        };
    };
    SqlQueryModel.prototype.toJSON = function () {
        return this.build();
    };
    SqlQueryModel.prototype.build = function () {
        return {
            with: this.$with,
            joins: this.$joins,
            having: this.$having,
            groupBy: this.$groupBy,
            refiners: this.$refiners,
            sorters: this.$sorters,
            table: this.$table,
            as: this.$as,
            tableIdentifier: this.$tableIdentifier,
            count: this.$count,
            skip: this.$skip,
            modifiers: this.$modifiers,
            refinersOperator: this.$operator,
            selection: this.$selection,
            isStats: this.$isStats,
        };
    };
    return SqlQueryModel;
}());
exports.SqlQueryModel = SqlQueryModel;
