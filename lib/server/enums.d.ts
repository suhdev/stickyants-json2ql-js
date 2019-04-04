export declare enum RefinerType {
    String = 1,
    Number = 2,
    Boolean = 3,
    Date = 4,
    DateTime = 5,
    DateRange = 8,
    Range = 9,
    Selection = 10,
    Sort = 13,
    Relation = 14,
    Grouping = 15,
    All = 16,
    Any = 17
}
export declare enum SearchRefinerGroupOperator {
    AND = 1,
    OR = 2
}
export declare enum SearchRefinerOperator {
    EQ = 1,
    NE = 2,
    GT = 3,
    GE = 4,
    LT = 5,
    LE = 6,
    CONTAINS = 7,
    LIKE = 8,
    SW = 9,
    EW = 10,
    IN = 11,
    NOT_IN = 12,
    IS_NULL = 13,
    IS_NOT_NULL = 14
}
export declare enum SearchRefinerFlags {
    EXACT = 1,
    CASE_SENSETIVE = 2,
    USE_MAGIC_PARAMS = 4
}
export declare enum JoinType {
    Left = 1,
    Right = 2,
    Inner = 4,
    Outer = 8
}
