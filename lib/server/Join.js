"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
var Join = /** @class */ (function () {
    function Join() {
    }
    Join.prototype.toString = function () {
        var type = 'LEFT JOIN';
        switch (this.type) {
            case enums_1.JoinType.Inner:
                type = 'INNER JOIN';
                break;
            case enums_1.JoinType.Outer:
                type = 'OUTER JOIN';
                break;
            case enums_1.JoinType.Right:
                type = 'RIGHT JOIN';
                break;
            default:
                type = 'LEFT JOIN';
                break;
        }
        var alias = this.toAlias ? "AS " + this.toAlias : '';
        return type + " " + this.to + " " + alias + " ON (" + this.on.map(function (e) { return e.getSqlStatement(); }, ' AND ') + ")";
    };
    return Join;
}());
exports.Join = Join;
