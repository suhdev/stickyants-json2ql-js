import { ISqlRefiner } from './ISqlRefiner';

export type ISqlRefinable = {
  toSqlRefiner():ISqlRefiner;
};
