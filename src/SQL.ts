import { SqlCondition } from './SqlCondition';
import { SqlOperator } from './enums';
import { SqlIFCondition } from './types';
import { ISqlRefinable } from './ISqlRefinable';
import { SqlQueryModel } from './SqlQueryModel';
import { SqlSort } from './SqlSort';

/**
 *
 */
export const SQL = {
  refiner(key:string) {
    return new SqlCondition(null, key);
  },
  group(op:SqlOperator) {
    return new SqlQueryModel(op, null, null).asGrouping;
  },

  if(condition:SqlIFCondition, truthy:ISqlRefinable|undefined, falsy?:ISqlRefinable|undefined) {
    let val:any = condition;
    if (typeof condition === 'function') {
      val = condition();
    }
    if (val) {
      return truthy;
    }
    return falsy;
  },
  and(...args:ISqlRefinable[]) {
    return new SqlQueryModel(SqlOperator.AND, null, null)
      .asGrouping
      .filter(...args);
  },
  or(...args:ISqlRefinable[]) {
    const g = new SqlQueryModel(SqlOperator.OR, null, null)
      .asGrouping
      .filter(...args);
    return g;
  },
  relation(key:string) {
    return new SqlQueryModel(SqlOperator.AND, null, key);
  },
  sortBy(key:string) {
    return new SqlSort(null, key);
  },
};
