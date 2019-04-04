import { SearchRefiner } from './SearchRefiner';
import { JoinType } from './enums';
export declare class Join {
    to: string;
    toAlias: string;
    on: SearchRefiner[];
    type: JoinType;
    toString(): any;
}
