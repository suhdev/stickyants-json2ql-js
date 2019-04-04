"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RefinerType;
(function (RefinerType) {
    RefinerType[RefinerType["String"] = 1] = "String";
    RefinerType[RefinerType["Number"] = 2] = "Number";
    RefinerType[RefinerType["Boolean"] = 3] = "Boolean";
    RefinerType[RefinerType["Date"] = 4] = "Date";
    RefinerType[RefinerType["DateTime"] = 5] = "DateTime";
    RefinerType[RefinerType["DateRange"] = 8] = "DateRange";
    RefinerType[RefinerType["Range"] = 9] = "Range";
    RefinerType[RefinerType["Selection"] = 10] = "Selection";
    RefinerType[RefinerType["Sort"] = 13] = "Sort";
    RefinerType[RefinerType["Relation"] = 14] = "Relation";
    RefinerType[RefinerType["Grouping"] = 15] = "Grouping";
    RefinerType[RefinerType["All"] = 16] = "All";
    RefinerType[RefinerType["Any"] = 17] = "Any";
})(RefinerType = exports.RefinerType || (exports.RefinerType = {}));
var SearchRefinerGroupOperator;
(function (SearchRefinerGroupOperator) {
    SearchRefinerGroupOperator[SearchRefinerGroupOperator["AND"] = 1] = "AND";
    SearchRefinerGroupOperator[SearchRefinerGroupOperator["OR"] = 2] = "OR";
})(SearchRefinerGroupOperator = exports.SearchRefinerGroupOperator || (exports.SearchRefinerGroupOperator = {}));
var SearchRefinerOperator;
(function (SearchRefinerOperator) {
    SearchRefinerOperator[SearchRefinerOperator["EQ"] = 1] = "EQ";
    SearchRefinerOperator[SearchRefinerOperator["NE"] = 2] = "NE";
    SearchRefinerOperator[SearchRefinerOperator["GT"] = 3] = "GT";
    SearchRefinerOperator[SearchRefinerOperator["GE"] = 4] = "GE";
    SearchRefinerOperator[SearchRefinerOperator["LT"] = 5] = "LT";
    SearchRefinerOperator[SearchRefinerOperator["LE"] = 6] = "LE";
    SearchRefinerOperator[SearchRefinerOperator["CONTAINS"] = 7] = "CONTAINS";
    SearchRefinerOperator[SearchRefinerOperator["LIKE"] = 8] = "LIKE";
    SearchRefinerOperator[SearchRefinerOperator["SW"] = 9] = "SW";
    SearchRefinerOperator[SearchRefinerOperator["EW"] = 10] = "EW";
    SearchRefinerOperator[SearchRefinerOperator["IN"] = 11] = "IN";
    SearchRefinerOperator[SearchRefinerOperator["NOT_IN"] = 12] = "NOT_IN";
    SearchRefinerOperator[SearchRefinerOperator["IS_NULL"] = 13] = "IS_NULL";
    SearchRefinerOperator[SearchRefinerOperator["IS_NOT_NULL"] = 14] = "IS_NOT_NULL";
})(SearchRefinerOperator = exports.SearchRefinerOperator || (exports.SearchRefinerOperator = {}));
var SearchRefinerFlags;
(function (SearchRefinerFlags) {
    SearchRefinerFlags[SearchRefinerFlags["EXACT"] = 1] = "EXACT";
    SearchRefinerFlags[SearchRefinerFlags["CASE_SENSETIVE"] = 2] = "CASE_SENSETIVE";
    SearchRefinerFlags[SearchRefinerFlags["USE_MAGIC_PARAMS"] = 4] = "USE_MAGIC_PARAMS";
})(SearchRefinerFlags = exports.SearchRefinerFlags || (exports.SearchRefinerFlags = {}));
var JoinType;
(function (JoinType) {
    JoinType[JoinType["Left"] = 1] = "Left";
    JoinType[JoinType["Right"] = 2] = "Right";
    JoinType[JoinType["Inner"] = 4] = "Inner";
    JoinType[JoinType["Outer"] = 8] = "Outer";
})(JoinType = exports.JoinType || (exports.JoinType = {}));
