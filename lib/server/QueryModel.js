"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../enums");
var enums_2 = require("./enums");
var QueryModel = /** @class */ (function () {
    function QueryModel() {
    }
    Object.defineProperty(QueryModel.prototype, "entityName", {
        get: function () {
            return this.as ? this.as : this.table;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryModel.prototype, "entityIdentifier", {
        get: function () {
            return this.tableIdentifier ? this.tableIdentifier.trim() : 'Id';
        },
        enumerable: true,
        configurable: true
    });
    QueryModel.prototype.getParameters = function () {
        var pr = [];
        if (this.refiners && this.refiners.length > 0) {
            pr.push.apply(pr, [].concat(this.refiners.map(function (e) { return e.getSqlParameters(); })));
        }
        if (this.with && this.with.length > 0) {
            pr.push.apply(pr, [].concat.apply([], this.with.map(function (e) { return e.getParameters(); })));
        }
        if (this.joins && this.joins.length > 0) {
            pr.push.apply(pr, [].concat.apply([], this.joins.map(function (e) { return [].concat.apply([], e.on.map(function (v) { return v.getSqlParameters(); })); })));
        }
        return pr;
    };
    QueryModel.prototype.getSqlQuery = function (count, skip, isWith) {
        if (count === void 0) { count = 10; }
        if (skip === void 0) { skip = 0; }
        if (isWith === void 0) { isWith = false; }
        var sb = '';
        var hb = '';
        var orderby = '';
        if (this.sorters != null) {
            var sorters = this.sorters.filter(function (ee) { return ee.type === enums_2.RefinerType.Sort; });
            if (sorters.length > 0) {
                orderby = "ORDER BY " + sorters.map(function (e) { return e.getSqlStatement(); });
            }
        }
        var limit = "OFFSET " + skip + " ROWS FETCH NEXT " + count + " ROWS ONLY";
        if (count === -1 || this.isStats || !orderby) {
            limit = '';
        }
        var sel = '*';
        if (this.selection && this.selection.length > 0) {
            sel = this.selection.join(', ');
        }
        var entityName = this.as && !isWith ? this.as : '';
        if (!isWith) {
            if (entityName) {
                entityName = " AS " + entityName;
            }
        }
        if (this.refiners && this.refiners.length > 0) {
            var op = this.operator === enums_1.SqlOperator.OR ? 'OR' : 'AND';
            sb += "(" + this.refiners.map(function (e) { return e.getSqlStatement(); }).join(op) + ")";
        }
        if (this.having && this.having.length > 0) {
            var op = this.operator === enums_1.SqlOperator.OR ? 'OR' : 'AND';
            hb += "(" + this.having.map(function (e) { return e.getSqlStatement(); }).join(op) + ")";
        }
        var join = this.joins && this.joins.length ?
            this.joins.map(function (e) { return e.toString(); }).join(' ') : '';
        var distinct = this.isDistinct ? ' DISTINCT ' : '';
        var where = this.refiners && this.refiners.length > 0 && sb !== '()' ? "WHERE " + sb + " " : '';
        var groupBy = this.groupBy && this.groupBy.length > 0 ?
            "GROUP BY " + this.groupBy.map(function (e) { return e; }).join(', ') + " " : '';
        var having = this.having && this.having.length > 0 ? "HAVING " + hb : '';
        var wwith = this.with && this.with.length ?
            // tslint:disable-next-line: max-line-length
            "WITH " + this.with.map(function (e) { return e.as + " AS (" + e.getSqlQuery(e.count, e.skip, true) + ")"; }).join(',') : '';
        // tslint:disable-next-line: max-line-length
        return wwith + " SELECT " + distinct + " " + sel + " FROM " + this.table + " " + join + " " + entityName + " " + where + " " + groupBy + " " + having + " " + orderby + " " + limit;
    };
    return QueryModel;
}());
exports.QueryModel = QueryModel;
