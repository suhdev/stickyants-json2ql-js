import { RefinerType, SearchRefinerFlags } from './enums';
import { operatorToString, cleanKey } from './util';
import { SqlOperator } from '../enums';
import { SqlParameter } from './SqlParameter';
import { QueryModel } from './QueryModel';

export class SearchRefiner {
  static id: number = 1;
  $id: number = -1;
  flags: number;
  as: string;
  type: RefinerType;
  value: any;
  key: string;
  refiners: SearchRefiner[];
  operator: SqlOperator;
  relation: QueryModel;
  get id() {
    if (this.$id === -1) {
      SearchRefiner.id += 1;
      this.$id = SearchRefiner.id + Math.floor(Math.random() * 1000);
    }
    return this.$id;
  }

  get isExact() {
    return (this.flags & SearchRefinerFlags.EXACT) === SearchRefinerFlags.EXACT;
  }

  get sCaseSensitive() {
    return (this.flags & SearchRefinerFlags.CASE_SENSETIVE) === SearchRefinerFlags.CASE_SENSETIVE;
  }

  get isValueMagicParameter() {
    return (this.flags &
      SearchRefinerFlags.USE_MAGIC_PARAMS) === SearchRefinerFlags.USE_MAGIC_PARAMS;
  }

  constructor() {
    this.flags = 0;
  }

  getArrayForValue(value: any[]) {
    return (value && value.map((e, i) => i)) || [];
  }

  getSqlStatement() {
    switch (this.type) {
      case RefinerType.DateRange:
        const op = operatorToString(this.operator);
        return `(${this.key} ${op} @${this.key}${this.id}From AND @${this.key}${this.id}To)`;
      case RefinerType.Date:
      case RefinerType.DateTime:
        const opz = operatorToString(this.operator);
        return `(${this.key} ${opz} @${this.key}${this.id})`;
      case RefinerType.Selection:
        const sv = this.getArrayForValue(this.value);
        const opx = operatorToString(this.operator);
        return `(${this.key} ${opx} (${sv.map((_, i) => `@${this.key}${this.id}${i}`)}))`;
      case RefinerType.Sort:
        const asc = this.value === 1 ? 'ASC' : 'DESC';
        return `${this.key} ${asc}`;
      case RefinerType.Relation:
        const op2 = operatorToString(this.operator);
        return `(${this.key} ${op2} (${this.relation.getSqlQuery(-1)}))`;
      case RefinerType.Any:
        // tslint:disable-next-line: max-line-length
        return `(${this.key} ${operatorToString(this.operator)} ANY(${this.relation.getSqlQuery(-1)}))`;
      case RefinerType.All:
        // tslint:disable-next-line: max-line-length
        return `(${this.key} ${operatorToString(this.operator)} ALL(${this.relation.getSqlQuery(-1)}))`;
      case RefinerType.Grouping:
        const groupOp = this.operator === SqlOperator.OR ? ' OR ' : ' AND ';
        return this.refiners && this.refiners.length > 0 ?
          `(${this.refiners.map(e => e.getSqlStatement()).join(groupOp)})` : '';
      default:
        return `(${this.defaultToString()})`;
    }
  }

  defaultToString() {
    let key = `@${cleanKey(this.key)}${this.id}`;
    if (this.isValueMagicParameter) {
      key = this.value;
    }
    switch (this.operator) {

      case SqlOperator.NE:
        return `${this.key} <> ${key}`;
      case SqlOperator.GE:
        return `${this.key} >= ${key}`;
      case SqlOperator.NOT_IN:
        return `${this.key} NOT IN (${key})`;
      case SqlOperator.GT:
        return `${this.key} > ${key}`;
      case SqlOperator.LE:
        return `${this.key} <= ${key}`;
      case SqlOperator.LT:
        return `${this.key} < ${key}`;
      case SqlOperator.IS_NOT_NULL:
        return `${this.key} IS NOT NULL`;
      case SqlOperator.IS_NULL:
        return `${this.key} IS NULL`;
      case SqlOperator.LIKE:
      case SqlOperator.SW:
      case SqlOperator.EW:
        return `${this.key} LIKE ${key}`;
      case SqlOperator.IN:
        return `${this.key} IN (${key})`;
      default:
        if (this.value === null) {
          return `${this.key} = NULL`;
        }
        return `${this.key} = ${key}`;
    }
  }

  arrayToSqlParameter(arr: any[]) {
    return arr && arr.length ?
      arr.map((e, i) => new SqlParameter(`@${cleanKey(this.key)}${this.id}${i}`, e)) : [];
  }

  getSqlParameters(): SqlParameter[] {
    const list: SqlParameter[] = [];
    if (this.isValueMagicParameter) {
      return list;
    }
    switch (this.type) {
      case RefinerType.Date:
      case RefinerType.DateTime:
        list.push(new SqlParameter(
          `@${cleanKey(this.key)}${this.id}`,
          typeof this.value === 'string' ? Date.parse(this.value) : new Date(this.value)));
        break;
      case RefinerType.DateRange:
        list.push(new SqlParameter(`@${cleanKey(this.key)}${this.id}From`, this.value[0]));
        list.push(new SqlParameter(`@${cleanKey(this.key)}${this.id}To`, this.value[1]));
        break;
      case RefinerType.Selection:
        list.push(...this.arrayToSqlParameter(this.value));
        break;
      case RefinerType.Relation:
        list.push(...this.relation.getParameters());
        break;
      case RefinerType.Grouping:
        list.push(...[].concat(...this.refiners.map(v => v.getSqlParameters())));
        break;
      default:
        if (this.value === null) {
          break;
        }
        if (this.operator === SqlOperator.LIKE) {
          list.push(new SqlParameter(`@${cleanKey(this.key)}${this.id}`, `${this.value}`));
        } else {
          list.push(new SqlParameter(`@${cleanKey(this.key)}${this.id}`, this.value));
        }
        break;
    }
    return list;
  }
}