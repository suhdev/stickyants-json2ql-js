"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
var util_1 = require("./util");
var enums_2 = require("../enums");
var SqlParameter_1 = require("./SqlParameter");
var SearchRefiner = /** @class */ (function () {
    function SearchRefiner() {
        this.$id = -1;
        this.flags = 0;
    }
    Object.defineProperty(SearchRefiner.prototype, "id", {
        get: function () {
            if (this.$id === -1) {
                SearchRefiner.id += 1;
                this.$id = SearchRefiner.id + Math.floor(Math.random() * 1000);
            }
            return this.$id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchRefiner.prototype, "isExact", {
        get: function () {
            return (this.flags & enums_1.SearchRefinerFlags.EXACT) === enums_1.SearchRefinerFlags.EXACT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchRefiner.prototype, "sCaseSensitive", {
        get: function () {
            return (this.flags & enums_1.SearchRefinerFlags.CASE_SENSETIVE) === enums_1.SearchRefinerFlags.CASE_SENSETIVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchRefiner.prototype, "isValueMagicParameter", {
        get: function () {
            return (this.flags &
                enums_1.SearchRefinerFlags.USE_MAGIC_PARAMS) === enums_1.SearchRefinerFlags.USE_MAGIC_PARAMS;
        },
        enumerable: true,
        configurable: true
    });
    SearchRefiner.prototype.getArrayForValue = function (value) {
        return (value && value.map(function (e, i) { return i; })) || [];
    };
    SearchRefiner.prototype.getSqlStatement = function () {
        var _this = this;
        switch (this.type) {
            case enums_1.RefinerType.DateRange:
                var op = util_1.operatorToString(this.operator);
                return "(" + this.key + " " + op + " @" + this.key + this.id + "From AND @" + this.key + this.id + "To)";
            case enums_1.RefinerType.Date:
            case enums_1.RefinerType.DateTime:
                var opz = util_1.operatorToString(this.operator);
                return "(" + this.key + " " + opz + " @" + this.key + this.id + ")";
            case enums_1.RefinerType.Selection:
                var sv = this.getArrayForValue(this.value);
                var opx = util_1.operatorToString(this.operator);
                return "(" + this.key + " " + opx + " (" + sv.map(function (_, i) { return "@" + _this.key + _this.id + i; }) + "))";
            case enums_1.RefinerType.Sort:
                var asc = this.value === 1 ? 'ASC' : 'DESC';
                return this.key + " " + asc;
            case enums_1.RefinerType.Relation:
                var op2 = util_1.operatorToString(this.operator);
                return "(" + this.key + " " + op2 + " (" + this.relation.getSqlQuery(-1) + "))";
            case enums_1.RefinerType.Any:
                // tslint:disable-next-line: max-line-length
                return "(" + this.key + " " + util_1.operatorToString(this.operator) + " ANY(" + this.relation.getSqlQuery(-1) + "))";
            case enums_1.RefinerType.All:
                // tslint:disable-next-line: max-line-length
                return "(" + this.key + " " + util_1.operatorToString(this.operator) + " ALL(" + this.relation.getSqlQuery(-1) + "))";
            case enums_1.RefinerType.Grouping:
                var groupOp = this.operator === enums_2.SqlOperator.OR ? ' OR ' : ' AND ';
                return this.refiners && this.refiners.length > 0 ?
                    "(" + this.refiners.map(function (e) { return e.getSqlStatement(); }).join(groupOp) + ")" : '';
            default:
                return "(" + this.defaultToString() + ")";
        }
    };
    SearchRefiner.prototype.defaultToString = function () {
        var key = "@" + util_1.cleanKey(this.key) + this.id;
        if (this.isValueMagicParameter) {
            key = this.value;
        }
        switch (this.operator) {
            case enums_2.SqlOperator.NE:
                return this.key + " <> " + key;
            case enums_2.SqlOperator.GE:
                return this.key + " >= " + key;
            case enums_2.SqlOperator.NOT_IN:
                return this.key + " NOT IN (" + key + ")";
            case enums_2.SqlOperator.GT:
                return this.key + " > " + key;
            case enums_2.SqlOperator.LE:
                return this.key + " <= " + key;
            case enums_2.SqlOperator.LT:
                return this.key + " < " + key;
            case enums_2.SqlOperator.IS_NOT_NULL:
                return this.key + " IS NOT NULL";
            case enums_2.SqlOperator.IS_NULL:
                return this.key + " IS NULL";
            case enums_2.SqlOperator.LIKE:
            case enums_2.SqlOperator.SW:
            case enums_2.SqlOperator.EW:
                return this.key + " LIKE " + key;
            case enums_2.SqlOperator.IN:
                return this.key + " IN (" + key + ")";
            default:
                if (this.value === null) {
                    return this.key + " = NULL";
                }
                return this.key + " = " + key;
        }
    };
    SearchRefiner.prototype.arrayToSqlParameter = function (arr) {
        var _this = this;
        return arr && arr.length ?
            arr.map(function (e, i) { return new SqlParameter_1.SqlParameter("@" + util_1.cleanKey(_this.key) + _this.id + i, e); }) : [];
    };
    SearchRefiner.prototype.getSqlParameters = function () {
        var list = [];
        if (this.isValueMagicParameter) {
            return list;
        }
        switch (this.type) {
            case enums_1.RefinerType.Date:
            case enums_1.RefinerType.DateTime:
                list.push(new SqlParameter_1.SqlParameter("@" + util_1.cleanKey(this.key) + this.id, typeof this.value === 'string' ? Date.parse(this.value) : new Date(this.value)));
                break;
            case enums_1.RefinerType.DateRange:
                list.push(new SqlParameter_1.SqlParameter("@" + util_1.cleanKey(this.key) + this.id + "From", this.value[0]));
                list.push(new SqlParameter_1.SqlParameter("@" + util_1.cleanKey(this.key) + this.id + "To", this.value[1]));
                break;
            case enums_1.RefinerType.Selection:
                list.push.apply(list, this.arrayToSqlParameter(this.value));
                break;
            case enums_1.RefinerType.Relation:
                list.push.apply(list, this.relation.getParameters());
                break;
            case enums_1.RefinerType.Grouping:
                list.push.apply(list, [].concat.apply([], this.refiners.map(function (v) { return v.getSqlParameters(); })));
                break;
            default:
                if (this.value === null) {
                    break;
                }
                if (this.operator === enums_2.SqlOperator.LIKE) {
                    list.push(new SqlParameter_1.SqlParameter("@" + util_1.cleanKey(this.key) + this.id, "" + this.value));
                }
                else {
                    list.push(new SqlParameter_1.SqlParameter("@" + util_1.cleanKey(this.key) + this.id, this.value));
                }
                break;
        }
        return list;
    };
    SearchRefiner.id = 1;
    return SearchRefiner;
}());
exports.SearchRefiner = SearchRefiner;
