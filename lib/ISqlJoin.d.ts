import { JoinType } from './enums';
import { ISqlRefiner } from './ISqlRefiner';
export interface ISqlJoin {
    type: JoinType;
    on: ISqlRefiner[];
    alias?: string;
    to?: string;
}
