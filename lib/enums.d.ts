export declare enum SqlGroupOperator {
    AND = 1,
    OR = 2
}
export declare enum SqlOperator {
    EQ = 65537,
    NE = -65538,
    GT = 65538,
    LE = -65539,
    GE = 65539,
    LT = -65540,
    LIKE = 65540,
    NOT_LIKE = -65541,
    SW = 65541,
    NOT_SW = -65542,
    EW = 65542,
    NOT_EW = -65543,
    IN = 65543,
    NOT_IN = -65544,
    IS_NULL = 65544,
    IS_NOT_NULL = -65545,
    BETWEEN = 65545,
    NOT_BETWEEN = -65546,
    AND = 65546,
    OR = 65547
}
/**
 * @name SqlRefinerType
 * @description specifies the refiner type which is used by
 * the JSON consumer to map into a SQL statement.
 */
export declare enum SqlRefinerType {
    String = 1,
    Number = 2,
    Boolean = 3,
    Date = 4,
    DateTime = 5,
    DateRange = 8,
    /**
     * The refiner is a range i.e. `BETWEEN`
     */
    Range = 9,
    Selection = 10,
    /**
     * The refiner is a sort order modifier
     */
    Sort = 13,
    /**
     * The refiner is a relationship to another table i.e. uses sub-query
     */
    Relation = 14,
    /**
     * A grouping refiner is used to add wrapping parentheses around other statements
     */
    Grouping = 15,
    All = 16,
    Any = 17
}
export declare enum SqlQueryFlags {
    EXACT = 1,
    CASE_SENSETIVE = 2,
    USE_MAGIC_PARAMS = 4
}
export declare enum SqlSorterDirection {
    ASC = 1,
    DESC = 2
}
export declare enum JoinType {
    LeftJoin = 1,
    RightJoin = 2,
    InnerJoin = 4,
    OuterJoin = 8
}
export declare enum SqlStatementType {
    Select = 1,
    Insert = 2,
    Update = 4,
    Delete = 8
}
export declare enum SqlModifier {
    Distinct = 1
}
