
export enum SqlGroupOperator {
    AND = 0x1,
    OR = 0x2,
}

export enum SqlOperator {
    EQ = 0x10001,
    NE = ~EQ,
    GT = 0x10002,
    LE = ~GT,
    GE = 0x10003,
    LT = ~GE,
    LIKE = 0x10004,
    NOT_LIKE = ~LIKE,
    SW = 0x10005,
    NOT_SW = ~SW,
    EW = 0x10006,
    NOT_EW = ~EW,
    IN = 0x10007,
    NOT_IN = ~IN,
    IS_NULL = 0x10008,
    IS_NOT_NULL = ~IS_NULL,
    BETWEEN = 0x10009,
    NOT_BETWEEN = ~BETWEEN,
    AND = 0x1000A,
    OR = 0x1000B,
}

/**
 * @name SqlRefinerType
 * @description specifies the refiner type which is used by
 * the JSON consumer to map into a SQL statement.
 */
export enum SqlRefinerType {
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
    Any = 17,
}

export enum SqlQueryFlags {
    EXACT = 0x01,
    CASE_SENSETIVE = 0x02,
    USE_MAGIC_PARAMS = 0x4,
}

export enum SqlSorterDirection {
    ASC = 0x1,
    DESC = 0x2,
}

export enum JoinType {
    LeftJoin  = 1,
    RightJoin = 2,
    InnerJoin = 4,
    OuterJoin = 8,
}

export enum SqlStatementType {
    Select = 1 << 0,
    Insert = 1 << 1,
    Update = 1 << 2,
    Delete = 1 << 3,
}

export enum SqlModifier {
    Distinct = 1 << 0,

}
