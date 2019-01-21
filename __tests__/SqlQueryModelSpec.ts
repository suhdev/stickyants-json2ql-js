import { SqlQueryModel } from '../src/SqlQueryModel';
import { SqlRefinerType, SqlOperator } from '../src/enums';

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

 
});
