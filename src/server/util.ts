import { SqlOperator } from '../enums';

export function operatorToString(op: SqlOperator) {
  if (op === SqlOperator.AND) {
    return 'AND';
  }
  return 'OR';
}

export function cleanKey(key: string) {
  return key.replace('[', '')
    .replace(']', '')
    .replace('.', '');
}
