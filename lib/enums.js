"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SqlGroupOperator;
(function (SqlGroupOperator) {
    SqlGroupOperator[SqlGroupOperator["AND"] = 1] = "AND";
    SqlGroupOperator[SqlGroupOperator["OR"] = 2] = "OR";
})(SqlGroupOperator = exports.SqlGroupOperator || (exports.SqlGroupOperator = {}));
var SqlOperator;
(function (SqlOperator) {
    SqlOperator[SqlOperator["EQ"] = 65537] = "EQ";
    SqlOperator[SqlOperator["NE"] = -65538] = "NE";
    SqlOperator[SqlOperator["GT"] = 65538] = "GT";
    SqlOperator[SqlOperator["LE"] = -65539] = "LE";
    SqlOperator[SqlOperator["GE"] = 65539] = "GE";
    SqlOperator[SqlOperator["LT"] = -65540] = "LT";
    SqlOperator[SqlOperator["LIKE"] = 65540] = "LIKE";
    SqlOperator[SqlOperator["NOT_LIKE"] = -65541] = "NOT_LIKE";
    SqlOperator[SqlOperator["SW"] = 65541] = "SW";
    SqlOperator[SqlOperator["NOT_SW"] = -65542] = "NOT_SW";
    SqlOperator[SqlOperator["EW"] = 65542] = "EW";
    SqlOperator[SqlOperator["NOT_EW"] = -65543] = "NOT_EW";
    SqlOperator[SqlOperator["IN"] = 65543] = "IN";
    SqlOperator[SqlOperator["NOT_IN"] = -65544] = "NOT_IN";
    SqlOperator[SqlOperator["IS_NULL"] = 65544] = "IS_NULL";
    SqlOperator[SqlOperator["IS_NOT_NULL"] = -65545] = "IS_NOT_NULL";
    SqlOperator[SqlOperator["BETWEEN"] = 65545] = "BETWEEN";
    SqlOperator[SqlOperator["NOT_BETWEEN"] = -65546] = "NOT_BETWEEN";
    SqlOperator[SqlOperator["AND"] = 65546] = "AND";
    SqlOperator[SqlOperator["OR"] = 65547] = "OR";
})(SqlOperator = exports.SqlOperator || (exports.SqlOperator = {}));
/**
 * @name SqlRefinerType
 * @description specifies the refiner type which is used by
 * the JSON consumer to map into a SQL statement.
 */
var SqlRefinerType;
(function (SqlRefinerType) {
    SqlRefinerType[SqlRefinerType["String"] = 1] = "String";
    SqlRefinerType[SqlRefinerType["Number"] = 2] = "Number";
    SqlRefinerType[SqlRefinerType["Boolean"] = 3] = "Boolean";
    SqlRefinerType[SqlRefinerType["Date"] = 4] = "Date";
    SqlRefinerType[SqlRefinerType["DateTime"] = 5] = "DateTime";
    SqlRefinerType[SqlRefinerType["DateRange"] = 8] = "DateRange";
    /**
     * The refiner is a range i.e. `BETWEEN`
     */
    SqlRefinerType[SqlRefinerType["Range"] = 9] = "Range";
    SqlRefinerType[SqlRefinerType["Selection"] = 10] = "Selection";
    /**
     * The refiner is a sort order modifier
     */
    SqlRefinerType[SqlRefinerType["Sort"] = 13] = "Sort";
    /**
     * The refiner is a relationship to another table i.e. uses sub-query
     */
    SqlRefinerType[SqlRefinerType["Relation"] = 14] = "Relation";
    /**
     * A grouping refiner is used to add wrapping parentheses around other statements
     */
    SqlRefinerType[SqlRefinerType["Grouping"] = 15] = "Grouping";
    SqlRefinerType[SqlRefinerType["All"] = 16] = "All";
    SqlRefinerType[SqlRefinerType["Any"] = 17] = "Any";
})(SqlRefinerType = exports.SqlRefinerType || (exports.SqlRefinerType = {}));
var SqlQueryFlags;
(function (SqlQueryFlags) {
    SqlQueryFlags[SqlQueryFlags["EXACT"] = 1] = "EXACT";
    SqlQueryFlags[SqlQueryFlags["CASE_SENSETIVE"] = 2] = "CASE_SENSETIVE";
    SqlQueryFlags[SqlQueryFlags["USE_MAGIC_PARAMS"] = 4] = "USE_MAGIC_PARAMS";
})(SqlQueryFlags = exports.SqlQueryFlags || (exports.SqlQueryFlags = {}));
var SqlSorterDirection;
(function (SqlSorterDirection) {
    SqlSorterDirection[SqlSorterDirection["ASC"] = 1] = "ASC";
    SqlSorterDirection[SqlSorterDirection["DESC"] = 2] = "DESC";
})(SqlSorterDirection = exports.SqlSorterDirection || (exports.SqlSorterDirection = {}));
var JoinType;
(function (JoinType) {
    JoinType[JoinType["LeftJoin"] = 1] = "LeftJoin";
    JoinType[JoinType["RightJoin"] = 2] = "RightJoin";
    JoinType[JoinType["InnerJoin"] = 4] = "InnerJoin";
    JoinType[JoinType["OuterJoin"] = 8] = "OuterJoin";
})(JoinType = exports.JoinType || (exports.JoinType = {}));
var SqlStatementType;
(function (SqlStatementType) {
    SqlStatementType[SqlStatementType["Select"] = 1] = "Select";
    SqlStatementType[SqlStatementType["Insert"] = 2] = "Insert";
    SqlStatementType[SqlStatementType["Update"] = 4] = "Update";
    SqlStatementType[SqlStatementType["Delete"] = 8] = "Delete";
})(SqlStatementType = exports.SqlStatementType || (exports.SqlStatementType = {}));
var SqlModifier;
(function (SqlModifier) {
    SqlModifier[SqlModifier["Distinct"] = 1] = "Distinct";
})(SqlModifier = exports.SqlModifier || (exports.SqlModifier = {}));
