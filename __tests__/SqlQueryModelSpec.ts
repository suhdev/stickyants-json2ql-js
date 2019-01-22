import { SqlQueryModel } from '../src/SqlQueryModel';
import { SqlRefinerType, SqlOperator,
  SqlSorterDirection, SqlModifier,
  JoinType } from '../src/enums';
import { SQL } from '../src/SQL';
import { ISqlQuery } from '../src/ISqlQuery';

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
      .andGroup();
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

  it('should set selection correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(0);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.count).toEqual(25);
  });

  it('should set group by correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .groupBy()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(0);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.count).toEqual(25);
  });

  it('should set group by correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .groupBy('MasterLanguage')
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(0);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.groupBy).toEqual(['MasterLanguage']);
    expect(result.count).toEqual(25);
  });

  it('should set refiners operator to OR', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .or()
      .groupBy('MasterLanguage')
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(0);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.refinersOperator).toEqual(SqlOperator.OR);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.groupBy).toEqual(['MasterLanguage']);
    expect(result.count).toEqual(25);
  });

  it('should set refiners operator to AND', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .and()
      .groupBy('MasterLanguage')
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(0);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.refinersOperator).toEqual(SqlOperator.AND);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.groupBy).toEqual(['MasterLanguage']);
    expect(result.count).toEqual(25);
  });

  it('should set sorters correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .and()
      .orderBy('Created').desc
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(0);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.refinersOperator).toEqual(SqlOperator.AND);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.sorters.length).toEqual(1);
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.count).toEqual(25);
  });

  it('should add between refiner correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .isBetween('IssueLevel', 2, 4)
      .and()
      .orderBy('Created').desc
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(1);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[0].value).toEqual([2, 4]);
    expect(result.refiners[0].operator).toEqual(SqlOperator.BETWEEN);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.refinersOperator).toEqual(SqlOperator.AND);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.sorters.length).toEqual(1);
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.count).toEqual(25);
  });

  it('should add not between refiner correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .isNotBetween('IssueLevel', 2, 4)
      .and()
      .orderBy('Created').desc
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(1);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[0].value).toEqual([2, 4]);
    expect(result.refiners[0].operator).toEqual(SqlOperator.NOT_BETWEEN);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.refinersOperator).toEqual(SqlOperator.AND);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.sorters.length).toEqual(1);
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.count).toEqual(25);
  });

  it('should add string refiner correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .text('ReferenceNumber', 'TXT-123%', SqlOperator.LIKE, 0)
      .and()
      .orderBy('Created').desc
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(1);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[0].value).toEqual('TXT-123%');
    expect(result.refiners[0].operator).toEqual(SqlOperator.LIKE);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.refinersOperator).toEqual(SqlOperator.AND);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.sorters.length).toEqual(1);
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.count).toEqual(25);
  });

  it('should add number refiner correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .number('IssueLevel', 2, SqlOperator.GE, 0)
      .and()
      .orderBy('Created').desc
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(1);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.Number);
    expect(result.refiners[0].value).toEqual(2);
    expect(result.refiners[0].operator).toEqual(SqlOperator.GE);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.refinersOperator).toEqual(SqlOperator.AND);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.sorters.length).toEqual(1);
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.count).toEqual(25);
  });

  it('should add bool refiner correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .bool('IsTranslation', true)
      .and()
      .orderBy('Created').desc
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(1);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.Boolean);
    expect(result.refiners[0].value).toEqual(true);
    expect(result.refiners[0].operator).toEqual(SqlOperator.EQ);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.refinersOperator).toEqual(SqlOperator.AND);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.sorters.length).toEqual(1);
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.count).toEqual(25);
  });

  it('should add IS IN refiner correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .isIn('IssueLevel', [1, 2, 3, 4])
      .and()
      .orderBy('Created').desc
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(1);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[0].value).toEqual([1, 2, 3, 4]);
    expect(result.refiners[0].operator).toEqual(SqlOperator.IN);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.refinersOperator).toEqual(SqlOperator.AND);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.sorters.length).toEqual(1);
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.count).toEqual(25);
  });

  it('should add IS NOT IN refiner correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .isNotIn('IssueLevel', [1, 2, 3, 4])
      .and()
      .orderBy('Created').desc
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(1);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[0].value).toEqual([1, 2, 3, 4]);
    expect(result.refiners[0].operator).toEqual(SqlOperator.NOT_IN);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.refinersOperator).toEqual(SqlOperator.AND);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.sorters.length).toEqual(1);
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.count).toEqual(25);
  });

  it('should set refiners operator correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .isNotIn('IssueLevel', [1, 2, 3, 4])
      .operator(SqlOperator.OR)
      .orderBy('Created').desc
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(1);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[0].value).toEqual([1, 2, 3, 4]);
    expect(result.refiners[0].operator).toEqual(SqlOperator.NOT_IN);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.refinersOperator).toEqual(SqlOperator.OR);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.sorters.length).toEqual(1);
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.count).toEqual(25);
  });

  it('should set modifiers correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .isNotIn('IssueLevel', [1, 2, 3, 4])
      .modifier(SqlModifier.Distinct)
      .orderBy('Created').desc
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(1);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[0].value).toEqual([1, 2, 3, 4]);
    expect(result.refiners[0].operator).toEqual(SqlOperator.NOT_IN);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.modifiers).toEqual(SqlModifier.Distinct);
    expect(result.skip).toEqual(25);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.sorters.length).toEqual(1);
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.count).toEqual(25);
  });

  it('should set modifiers using getter correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .isNotIn('IssueLevel', [1, 2, 3, 4])
      .distinct
      .orderBy('Created').desc
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(1);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[0].value).toEqual([1, 2, 3, 4]);
    expect(result.refiners[0].operator).toEqual(SqlOperator.NOT_IN);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.modifiers).toEqual(SqlModifier.Distinct);
    expect(result.skip).toEqual(25);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.sorters.length).toEqual(1);
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.count).toEqual(25);
  });

  it('should set refiners from JSON', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .addRefiners([{
        key:'IssueLevel',
        operator:SqlOperator.IN,
        value:[1, 2, 3, 4],
        type:SqlRefinerType.Number,
      }])
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.table).toEqual(tableName);
    expect(result.as).toEqual(alias);
    expect(result.refiners.length).toEqual(1);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.Number);
    expect(result.refiners[0].value).toEqual([1, 2, 3, 4]);
    expect(result.refiners[0].operator).toEqual(SqlOperator.IN);
    expect(result.joins.length).toEqual(0);
    expect(result.with.length).toEqual(0);
    expect(result.skip).toEqual(25);
    expect(result.selection.length).toEqual(2);
    expect(result.selection).toEqual(['Title', 'Id']);
    expect(result.sorters.length).toEqual(0);
    expect(result.count).toEqual(25);
  });

  it('should set key of model when used as a refiner', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .key('Ticket')
      .asRelation
      .ref('Title').contains('Testing')
      .add()
      .skip(25)
      .count(25);
    const result = m.toSqlRefiner();

    expect(result.key).toEqual('Ticket');
    expect(result.relation.refiners.length).toEqual(1);
    expect(result.type).toEqual(SqlRefinerType.Relation);
    expect(result.relation.selection.length).toEqual(2);

  });

  it('should add relation refiner', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = (new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .key('Ticket')
      .relation
      .table('Users')
      .selection(['Id'])
      .ref('Age').greaterThan(21).add()
      .end() as SqlQueryModel)
      .ref('Title').contains('Testing')
      .add()
      .skip(25)
      .count(25);
    const result = m.build();

    expect(result.refiners.length).toEqual(2);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.Relation);
    expect(result.refiners[0].operator).toEqual(SqlOperator.IN);
    expect(result.refiners[1].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[1].operator).toEqual(SqlOperator.LIKE);

  });

  it('should build correct json representation when using no context', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = (new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .key('Ticket')
      .relation
      .table('Users')
      .selection(['Id'])
      .ref('Age').greaterThan(21).add()
      .end() as SqlQueryModel)
      .ref('Title').contains('Testing')
      .add()
      .skip(25)
      .count(25);
    const result = m.end() as ISqlQuery;

    expect(result.refiners.length).toEqual(2);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.Relation);
    expect(result.refiners[0].operator).toEqual(SqlOperator.IN);
    expect(result.refiners[1].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[1].operator).toEqual(SqlOperator.LIKE);

  });

  it('should add sorters correctly when using order', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = (new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .key('Ticket')
      .relation
      .table('Users')
      .selection(['Id'])
      .ref('Age').greaterThan(21).add()
      .end() as SqlQueryModel)
      .ref('Title').contains('Testing')
      .add()
      .order(
        SQL.orderBy('Created').desc,
        SQL.orderBy('IssueLevel').asc)
      .skip(25)
      .count(25);
    const result = m.end() as ISqlQuery;

    expect(result.refiners.length).toEqual(2);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.Relation);
    expect(result.refiners[0].operator).toEqual(SqlOperator.IN);
    expect(result.refiners[1].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[1].operator).toEqual(SqlOperator.LIKE);
    expect(result.sorters.length).toEqual(2);
    expect(result.sorters[0].key).toEqual('Created');
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.sorters[1].key).toEqual('IssueLevel');
    expect(result.sorters[1].value).toEqual(SqlSorterDirection.ASC);

  });

  it('should add sorters correctly when using addSorters', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = (new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .key('Ticket')
      .relation
      .table('Users')
      .selection(['Id'])
      .ref('Age').greaterThan(21).add()
      .end() as SqlQueryModel)
      .ref('Title').contains('Testing')
      .add()
      .addSorters(
        [SQL.orderBy('Created').desc.toSqlRefiner(),
        SQL.orderBy('IssueLevel').asc.toSqlRefiner()],
      )
      .skip(25)
      .count(25);
    const result = m.end() as ISqlQuery;

    expect(result.refiners.length).toEqual(2);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.Relation);
    expect(result.refiners[0].operator).toEqual(SqlOperator.IN);
    expect(result.refiners[1].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[1].operator).toEqual(SqlOperator.LIKE);
    expect(result.sorters.length).toEqual(2);
    expect(result.sorters[0].key).toEqual('Created');
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.sorters[1].key).toEqual('IssueLevel');
    expect(result.sorters[1].value).toEqual(SqlSorterDirection.ASC);

  });

  it('should set group by and having and sorters correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = (new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .groupBy('IssueLevel')
      .filterHaving(
        SQL.refiner('COUNT(Id)').greaterThan(1),
      )
      .key('Ticket')
      .relation
      .table('Users')
      .selection(['Id'])
      .ref('Age').greaterThan(21).add()
      .end() as SqlQueryModel)
      .ref('Title').contains('Testing')
      .add()
      .addSorters(
        [SQL.orderBy('Created').desc.toSqlRefiner(),
        SQL.orderBy('IssueLevel').asc.toSqlRefiner()],
      )
      .skip(25)
      .count(25);
    const result = m.end() as ISqlQuery;

    expect(result.refiners.length).toEqual(2);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.Relation);
    expect(result.refiners[0].operator).toEqual(SqlOperator.IN);
    expect(result.refiners[1].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[1].operator).toEqual(SqlOperator.LIKE);
    expect(result.sorters.length).toEqual(2);
    expect(result.having.length).toEqual(1);
    expect(result.sorters[0].key).toEqual('Created');
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.sorters[1].key).toEqual('IssueLevel');
    expect(result.sorters[1].value).toEqual(SqlSorterDirection.ASC);

  });

  it('should set join correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = (new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .selection(['Title', 'Id'])
      .join((m) => {
        return m.toTable('Users')
          .on(SQL.refiner('AuthorId').equalTo('Users.Id'))
          .left;
      })
      .key('Ticket')
      .relation
      .table('Users')
      .selection(['Id'])
      .ref('Age').greaterThan(21).add()
      .end() as SqlQueryModel)
      .ref('Title').contains('Testing')
      .add()
      .addSorters(
        [SQL.orderBy('Created').desc.toSqlRefiner(),
        SQL.orderBy('IssueLevel').asc.toSqlRefiner()],
      )
      .skip(25)
      .count(25);
    const result = m.end() as ISqlQuery;

    expect(result.refiners.length).toEqual(2);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.Relation);
    expect(result.refiners[0].operator).toEqual(SqlOperator.IN);
    expect(result.refiners[1].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[1].operator).toEqual(SqlOperator.LIKE);
    expect(result.sorters.length).toEqual(2);
    expect(result.joins.length).toEqual(1);
    expect(result.joins[0].type).toEqual(JoinType.LeftJoin);
    expect(result.joins[0].to).toEqual('Users');
    expect(result.sorters[0].key).toEqual('Created');
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.sorters[1].key).toEqual('IssueLevel');
    expect(result.sorters[1].value).toEqual(SqlSorterDirection.ASC);

  });

  it('should set join and with with join correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = (new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .tableIdentifier('SomeTable')
      .selection(['Title', 'Id', 'AuthorId', 'AuthorName', 'AuthorEmail'])
      .with(new SqlQueryModel()
        .as('Authors')
        .selection(['AuthorId', 'AuthorName', 'AuthorEmail'])
        .table('Users'))
      .join((m) => {
        return m.toTable('Authors')
          .on(SQL.refiner('UserId').equalTo('Authors.AuthorId'))
          .left;
      })
      .key('Ticket')
      .relation
      .table('Users')
      .selection(['Id'])
      .ref('Age').greaterThan(21).add()
      .end() as SqlQueryModel)
      .ref('Title').contains('Testing')
      .add()
      .addSorters(
        [SQL.orderBy('Created').desc.toSqlRefiner(),
        SQL.orderBy('IssueLevel').asc.toSqlRefiner()],
      )
      .skip(25)
      .count(25);
    const result = m.toJSON();

    expect(result.refiners.length).toEqual(2);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.Relation);
    expect(result.refiners[0].operator).toEqual(SqlOperator.IN);
    expect(result.refiners[1].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[1].operator).toEqual(SqlOperator.LIKE);
    expect(result.sorters.length).toEqual(2);
    expect(result.with.length).toEqual(1);
    expect(result.joins.length).toEqual(1);
    expect(result.tableIdentifier).toEqual('SomeTable');
    expect(result.joins[0].type).toEqual(JoinType.LeftJoin);
    expect(result.joins[0].to).toEqual('Authors');
    expect(result.sorters[0].key).toEqual('Created');
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.sorters[1].key).toEqual('IssueLevel');
    expect(result.sorters[1].value).toEqual(SqlSorterDirection.ASC);

  });

  it('should set joinwith correctly', () => {
    const tableName = 'Documents';
    const alias = 'Doc';
    const m = (new SqlQueryModel()
      .table(tableName)
      .as(alias)
      .tableIdentifier('SomeTable')
      .selection(['Title', 'Id', 'AuthorId', 'AuthorName', 'AuthorEmail'])
      .with(new SqlQueryModel()
        .as('Authors')
        .selection(['AuthorId', 'AuthorName', 'AuthorEmail'])
        .table('Users'))
      .joinWith('Authors', (m) => {
        return m.on(SQL.refiner('UserId').equalTo('Authors.AuthorId'))
          .left;
      })
      .key('Ticket')
      .relation
      .table('Users')
      .selection(['Id'])
      .ref('Age').greaterThan(21).add()
      .end() as SqlQueryModel)
      .ref('Title').contains('Testing')
      .add()
      .addSorters(
        [SQL.orderBy('Created').desc.toSqlRefiner(),
        SQL.orderBy('IssueLevel').asc.toSqlRefiner()],
      )
      .skip(25)
      .count(25);
    const result = m.toJSON();

    expect(result.refiners.length).toEqual(2);
    expect(result.refiners[0].type).toEqual(SqlRefinerType.Relation);
    expect(result.refiners[0].operator).toEqual(SqlOperator.IN);
    expect(result.refiners[1].type).toEqual(SqlRefinerType.String);
    expect(result.refiners[1].operator).toEqual(SqlOperator.LIKE);
    expect(result.sorters.length).toEqual(2);
    expect(result.with.length).toEqual(1);
    expect(result.joins.length).toEqual(1);
    expect(result.tableIdentifier).toEqual('SomeTable');
    expect(result.joins[0].type).toEqual(JoinType.LeftJoin);
    expect(result.joins[0].to).toEqual('Authors');
    expect(result.sorters[0].key).toEqual('Created');
    expect(result.sorters[0].value).toEqual(SqlSorterDirection.DESC);
    expect(result.sorters[1].key).toEqual('IssueLevel');
    expect(result.sorters[1].value).toEqual(SqlSorterDirection.ASC);

  });

});
