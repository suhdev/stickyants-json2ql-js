"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
var SqlJoin = /** @class */ (function () {
    function SqlJoin() {
        this.$type = enums_1.JoinType.LeftJoin;
        this.$on = [];
    }
    SqlJoin.prototype.type = function (type) {
        this.$type = type;
        return this;
    };
    SqlJoin.prototype.alias = function (as) {
        this.$alias = as;
        return this;
    };
    SqlJoin.prototype.toTable = function (table) {
        this.$to = table;
        return this;
    };
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
