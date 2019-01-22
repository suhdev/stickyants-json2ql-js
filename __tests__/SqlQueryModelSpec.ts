import { SqlQueryModel } from '../src/SqlQueryModel';
import { SqlRefinerType, SqlOperator } from '../src/enums';
import { SQL } from '../src/SQL';

describe('Testing SqlQueryModel', () => {
  it('It should set the table name and alias', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(0);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(0);
    expect(result.count).toEqual(-1);
  });

  it('It should generate an and grouping', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .asGrouping;
    const result = m.toSqlRefiner();

    expect(result.type).toEqual(SqlRefinerType.Grouping);
    expect(result.operator).toEqual(SqlOperator.AND);
    expect(result.key).toMatch(/^SomeKey.*/);
    expect(result.refiners.length).toEqual(0);
  });

  it('It should generate an or grouping', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .asGrouping
      .orGroup();
    const result = m.toSqlRefiner();

    expect(result.type).toEqual(SqlRefinerType.Grouping);
    expect(result.operator).toEqual(SqlOperator.OR);
    expect(result.key).toMatch(/^SomeKey.*/);
    expect(result.refiners.length).toEqual(0);
  });

  it('It should generate an or grouping', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .asGrouping
      .orGroup();
    const result = m.toSqlRefiner();

    expect(result.type).toEqual(SqlRefinerType.Grouping);
    expect(result.operator).toEqual(SqlOperator.OR);
    expect(result.key).toMatch(/^SomeKey.*/);
    expect(result.refiners.length).toEqual(0);
  });

  it('should set count and skip to given values', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(0);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.count).toEqual(25);
  });

  it('should set refiners to the provided refiners', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .filter(
        SQL.refiner('FirstName').string.equalTo('Suhail'),
        SQL.refiner('Age').number.greaterThan(21))
      .ref('LastName').contains('Abood')
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(3);
    expect(result.refiners[0].type)
      .toEqual(SqlRefinerType.String);
    expect(result.refiners[1].type)
      .toEqual(SqlRefinerType.Number);
    expect(result.refiners[1].value)
      .toEqual(21);
    expect(result.refiners[2].value)
      .toEqual('%Abood%');
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.count).toEqual(25);
  });

  it('should set refiners to the provided refiners', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .filter(
        SQL.refiner('FirstName').string.equalTo('Suhail'),
        SQL.refiner('Age').number.greaterThan(21))
      .ref('LastName').contains('Abood')
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(3);
    expect(result.refiners[0].type)
      .toEqual(SqlRefinerType.String);
    expect(result.refiners[1].type)
      .toEqual(SqlRefinerType.Number);
    expect(result.refiners[1].value)
      .toEqual(21);
    expect(result.refiners[2].value)
      .toEqual('%Abood%');
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.count).toEqual(25);
  });

  it('should set refiners without using filter', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .refiner('FirstName', '%Suhail%', SqlOperator.LIKE,
               SqlRefinerType.String, 0)
      .ref('LastName').contains('Abood')
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(2);
    expect(result.refiners[0].type)
      .toEqual(SqlRefinerType.String);
    expect(result.refiners[0].value)
      .toEqual('%Suhail%');
    expect(result.refiners[1].value)
      .toEqual('%Abood%');
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.count).toEqual(25);
  });

});
