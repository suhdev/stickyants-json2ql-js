import { SearchRefiner } from './SearchRefiner';
import { SqlOperator } from '../enums';
import { SqlParameter } from './SqlParameter';
import { RefinerType } from './enums';
import { Join } from './Join';

export class QueryModel {
  count: number;
  isDistinct: boolean;
  skip: number;
  joins: Join[];
  table: string;
  selection: string[];
  as: string;
  isStats: boolean;
  tableIdentifier: string;
  groupBy: string[];
  having: SearchRefiner[];
  with: QueryModel[];
  refiners: SearchRefiner[];
  sorters: SearchRefiner[];
  operator: SqlOperator;

  get entityName(): string {
    return this.as ? this.as : this.table;
  }

  get entityIdentifier() {
    return this.tableIdentifier ? this.tableIdentifier.trim() : 'Id';
  }

  getParameters(): SqlParameter[] {
    const pr: SqlParameter[] = [];
    if (this.refiners && this.refiners.length > 0) {
      pr.push(...[].concat(this.refiners.map(e => e.getSqlParameters())));
    }
    if (this.with && this.with.length > 0) {
      pr.push(...[].concat(...this.with.map(e => e.getParameters())));
    }
    if (this.joins && this.joins.length > 0) {
      pr.push(
        ...[].concat(...this.joins.map(e => [].concat(...e.on.map(v => v.getSqlParameters())))));
    }
    return pr;
  }

  getSqlQuery(count = 10, skip = 0, isWith = false) {
    let sb = '';
    let hb = '';

    let orderby = '';

    if (this.sorters != null) {
      const sorters = this.sorters.filter(ee => ee.type === RefinerType.Sort);
      if (sorters.length > 0) {
        orderby = `ORDER BY ${sorters.map(e => e.getSqlStatement())}`;
      }
    }

    let limit = `OFFSET ${skip} ROWS FETCH NEXT ${count} ROWS ONLY`;
    if (count === -1 || this.isStats || !orderby) {
      limit = '';
    }

    let sel = '*';
    if (this.selection && this.selection.length > 0) {
      sel = this.selection.join(', ');
    }

    let entityName = this.as && !isWith ? this.as : '';
    if (!isWith) {
      if (entityName) {
        entityName = ` AS ${entityName}`;
      }
    }

    if (this.refiners && this.refiners.length > 0) {
      const op = this.operator === SqlOperator.OR ? 'OR' : 'AND';
      sb += `(${this.refiners.map(e => e.getSqlStatement()).join(op)})`;
    }

    if (this.having && this.having.length > 0) {
      const op = this.operator === SqlOperator.OR ? 'OR' : 'AND';
      hb += `(${this.having.map(e => e.getSqlStatement()).join(op)})`;
    }

    const join = this.joins && this.joins.length ?
      this.joins.map(e => e.toString()).join(' ') : '';

    const distinct = this.isDistinct ? ' DISTINCT ' : '';

    const where = this.refiners && this.refiners.length > 0 && sb !== '()' ? `WHERE ${sb} ` : '';

    const groupBy = this.groupBy && this.groupBy.length > 0 ?
      `GROUP BY ${this.groupBy.map(e => e).join(', ')} ` : '';

    const having = this.having && this.having.length > 0 ? `HAVING ${hb}` : '';

    const wwith = this.with && this.with.length ?
      // tslint:disable-next-line: max-line-length
      `WITH ${this.with.map(e => `${e.as} AS (${e.getSqlQuery(e.count, e.skip, true)})`).join(',')}` : '';

    // tslint:disable-next-line: max-line-length
    return `${wwith} SELECT ${distinct} ${sel} FROM ${this.table} ${join} ${entityName} ${where} ${groupBy} ${having} ${orderby} ${limit}`;
  }
}