import { SearchRefiner } from './SearchRefiner';
import { JoinType } from './enums';

export class Join {
  to: string;
  toAlias: string;
  on: SearchRefiner[];
  type: JoinType;

  toString() {
    let type = 'LEFT JOIN';
    switch (this.type) {
      case JoinType.Inner:
        type = 'INNER JOIN';
        break;
      case JoinType.Outer:
        type = 'OUTER JOIN';
        break;
      case JoinType.Right:
        type = 'RIGHT JOIN';
        break;
      default:
        type = 'LEFT JOIN';
        break;
    }

    const alias = this.toAlias ? `AS ${this.toAlias}` : '';

    return `${type} ${this.to} ${alias} ON (${this.on.map(e => e.getSqlStatement(), ' AND ')})`;

  }
}
