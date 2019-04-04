export enum RefinerType {
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
  Any = 17,
}

export enum SearchRefinerGroupOperator {
  AND = 0x01,
  OR = 0x02,
}

export enum SearchRefinerOperator {
  EQ = 0x01,
  NE = 0x02,
  GT = 0x03,
  GE = 0x04,
  LT = 0x05,
  LE = 0x06,
  CONTAINS = 0x07,
  LIKE = 0x08,
  SW = 0x09,
  EW = 0x0A,
  IN = 0x0B,
  NOT_IN = 0x0C,
  IS_NULL = 0x0D,
  IS_NOT_NULL = 0x0E,
}

export enum SearchRefinerFlags {
  EXACT = 0x01,
  CASE_SENSETIVE = 0x02,
  USE_MAGIC_PARAMS = 0x04,
}

export enum JoinType {
  Left = 1,
  Right = 2,
  Inner = 4,
  Outer = 8,
}
