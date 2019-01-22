"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SqlCondition_1 = require("./SqlCondition");
var enums_1 = require("./enums");
var SqlQueryModel_1 = require("./SqlQueryModel");
var SqlSort_1 = require("./SqlSort");
/**
 *
 */
exports.SQL = {
    refiner: function (key) {
        return new SqlCondition_1.SqlCondition(null, key);
    },
    group: function (op) {
        return new SqlQueryModel_1.SqlQueryModel(op, null, null).asGrouping;
    },
    if: function (condition, truthy, falsy) {
        var val = condition;
        if (typeof condition === 'function') {
            val = condition();
        }
        if (val) {
            return truthy;
        }
        return falsy;
    },
    and: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        return (_a = new SqlQueryModel_1.SqlQueryModel(enums_1.SqlOperator.AND, null, null)
            .asGrouping).filter.apply(_a, args);
    },
    or: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        var g = (_a = new SqlQueryModel_1.SqlQueryModel(enums_1.SqlOperator.OR, null, null)
            .asGrouping).filter.apply(_a, args);
        return g;
    },
    relation: function (key) {
        return new SqlQueryModel_1.SqlQueryModel(enums_1.SqlOperator.AND, null, key)
            .asRelation;
    },
    orderBy: function (key) {
        return new SqlSort_1.SqlSort(null, key);
    },
};
