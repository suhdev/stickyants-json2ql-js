import { SqlJoin } from '../src/SqlJoin';
import { SqlCondition } from '../src/SqlCondition';
import { JoinType } from '../src/enums';

describe('Testing SqlJoin', () => {
  it('should set join type to left', () => {
    const join = new SqlJoin()
            .left
            .toTable('Users')
            .on(new SqlCondition(null, 'Email')
                .magicParams
                .equalTo('OtherTable.Email'))
            .alias('Authors')
            .toJSON();

    expect(join.type).toEqual(JoinType.LeftJoin);
    expect(join.alias).toEqual('Authors');
    expect(join.to).toEqual('Users');
    expect(join.on.length).toEqual(1);
  });

  it('should set join type to right', () => {
    const join = new SqlJoin()
            .right
            .toTable('Users')
            .on(new SqlCondition(null, 'Email')
                .magicParams
                .equalTo('OtherTable.Email'))
            .alias('Authors')
            .toJSON();

    expect(join.type).toEqual(JoinType.RightJoin);
    expect(join.alias).toEqual('Authors');
    expect(join.to).toEqual('Users');
    expect(join.on.length).toEqual(1);
  });

  it('should set join type to outer', () => {
    const join = new SqlJoin()
            .outer
            .toTable('Users')
            .on(new SqlCondition(null, 'Email')
                .magicParams
                .equalTo('OtherTable.Email'))
            .alias('Authors')
            .toJSON();

    expect(join.type).toEqual(JoinType.OuterJoin);
    expect(join.alias).toEqual('Authors');
    expect(join.to).toEqual('Users');
    expect(join.on.length).toEqual(1);
  });

  it('should set join type to inner', () => {
    const join = new SqlJoin()
            .inner
            .toTable('Users')
            .on(new SqlCondition(null, 'Email')
                .magicParams
                .equalTo('OtherTable.Email'))
            .alias('Authors')
            .toJSON();

    expect(join.type).toEqual(JoinType.InnerJoin);
    expect(join.alias).toEqual('Authors');
    expect(join.to).toEqual('Users');
    expect(join.on.length).toEqual(1);
  });
});
