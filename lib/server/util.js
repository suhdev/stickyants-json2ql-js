"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../enums");
function operatorToString(op) {
    if (op === enums_1.SqlOperator.AND) {
        return 'AND';
    }
    return 'OR';
}
exports.operatorToString = operatorToString;
function cleanKey(key) {
    return key.replace('[', '')
        .replace(']', '')
        .replace('.', '');
}
exports.cleanKey = cleanKey;
