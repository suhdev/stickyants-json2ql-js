import { SQL } from '../src/SQL';
import { SqlRefinerType, SqlOperator, SqlSorterDirection } from '../src/enums';

describe('Testing SQL', () => {
  it('should create string refiner', () => {
    const ref = SQL.refiner('FirstName').
            equalTo('Suhail').string.toSqlRefiner();
    expect(ref.type).toEqual(SqlRefinerType.String);
    expect(ref.value).toEqual('Suhail');
    expect(ref.operator).toEqual(SqlOperator.EQ);
  });

  it('should create like refiner', () => {
    const ref = SQL.refiner('FirstName').
            contains('Suhail').string.toSqlRefiner();
    expect(ref.type).toEqual(SqlRefinerType.String);
    expect(ref.value).toEqual('%Suhail%');
    expect(ref.operator).toEqual(SqlOperator.LIKE);
  });

  it('should create an and group', () => {
    const ref = SQL.group(SqlOperator.AND).toSqlRefiner();
    expect(ref.type).toEqual(SqlRefinerType.Grouping);
    expect(ref.operator).toEqual(SqlOperator.AND);
  });

  it('should create an or group', () => {
    const ref = SQL.group(SqlOperator.OR).toSqlRefiner();
    expect(ref.type).toEqual(SqlRefinerType.Grouping);
    expect(ref.operator).toEqual(SqlOperator.OR);
  });

  it('should create an and group using explicit method', () => {
    const ref = SQL.and(
            SQL.refiner('FirstName').contains('Suhail'),
            SQL.refiner('LastName').contains('Abood'),
        ).toSqlRefiner();
    expect(ref.type).toEqual(SqlRefinerType.Grouping);
    expect(ref.operator).toEqual(SqlOperator.AND);
    expect(ref.refiners.length).toEqual(2);
    expect(ref.refiners[0].type)
            .toEqual(SqlRefinerType.String);
    expect(ref.refiners[0].operator)
            .toEqual(SqlOperator.LIKE);
  });

  it('should create an or group using explicit method', () => {
    const ref = SQL.or(
            SQL.refiner('FirstName').contains('Suhail'),
            SQL.refiner('LastName').contains('Abood'),
        ).toSqlRefiner();
    expect(ref.type).toEqual(SqlRefinerType.Grouping);
    expect(ref.operator).toEqual(SqlOperator.OR);
    expect(ref.refiners.length).toEqual(2);
    expect(ref.refiners[0].type)
            .toEqual(SqlRefinerType.String);
    expect(ref.refiners[0].operator)
            .toEqual(SqlOperator.LIKE);
  });

  it('should create a sort model', () => {
    const ref = SQL.orderBy('Age').desc.toSqlRefiner();
    expect(ref.type).toEqual(SqlRefinerType.Sort);
    expect(ref.value).toEqual(SqlSorterDirection.DESC);
  });

  it('should create a sort model', () => {
    const ref = SQL.orderBy('Age').desc.toSqlRefiner();
    expect(ref.type).toEqual(SqlRefinerType.Sort);
    expect(ref.value).toEqual(SqlSorterDirection.DESC);
  });

  it('should create correct set of refiners for truthy condition', () => {
    const ref = SQL.if(
          true,
          SQL.refiner('FirstName').contains('Suhail'),
          SQL.refiner('LastName').contains('Abood'),
      ).toSqlRefiner();

    expect(ref.type).toEqual(SqlRefinerType.String);
    expect(ref.operator).toEqual(SqlOperator.LIKE);
    expect(ref.key).toEqual('FirstName');
    expect(ref.value).toEqual('%Suhail%');
  });

  it('should create correct set of refiners for falsy condition', () => {
    const ref = SQL.if(
          false,
          SQL.refiner('FirstName').contains('Suhail'),
          SQL.refiner('LastName').contains('Abood'),
      ).toSqlRefiner();

    expect(ref.type).toEqual(SqlRefinerType.String);
    expect(ref.operator).toEqual(SqlOperator.LIKE);
    expect(ref.key).toEqual('LastName');
    expect(ref.value).toEqual('%Abood%');
  });

  it('should create correct set of refiners for falsy condition', () => {
    const val = Math.random() > 0.5;
    const ref = SQL.if(
          () => {
              return val;
          },
          SQL.refiner('FirstName').contains('Suhail'),
          SQL.refiner('LastName').contains('Abood'),
      ).toSqlRefiner();

    expect(ref.type).toEqual(SqlRefinerType.String);
    expect(ref.operator).toEqual(SqlOperator.LIKE);
    expect(ref.key).toEqual(val ? 'FirstName' :'LastName');
    expect(ref.value).toEqual(val ? '%Suhail%' : '%Abood%');
  });

  it('should create correct relation refiner', () => {
    const ref = SQL.relation('ContentAuthorId')
        .filter(SQL.refiner('FirstName')
        .equalTo('Suhail'))
        .table('Users').toSqlRefiner();

    expect(ref.type).toEqual(SqlRefinerType.Relation);
    expect(ref.operator).toEqual(SqlOperator.IN);
    expect(ref.relation.table).toEqual('Users');
    expect(ref.relation.refiners.length).toEqual(1);
    expect(ref.relation.refiners[0].key).toEqual('FirstName');
  });
});
