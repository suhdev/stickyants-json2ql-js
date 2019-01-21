import { SqlCondition } from '../src/SqlCondition';
import { SqlRefinerType, SqlOperator, SqlQueryFlags } from '../src/enums';
describe('Testing SqlCondition', () => {
  it('Should set condition type to LIKE', () => {
    const key = 'FirstName';
    const cond = new SqlCondition(null, key);
    cond.contains('Suhail').type(SqlRefinerType.String);
    const result = cond.toJSON();

    expect(result.key).toEqual(key);

    expect(result.type).toEqual(SqlRefinerType.String);
    expect(result.operator).toEqual(SqlOperator.LIKE);
    expect(result.value).toEqual('%Suhail%');
  });

  it('Should set condition type to LIKE%', () => {
    const key = 'FirstName';
    const cond = new SqlCondition(null, key);
    cond.startsWith('Suhail');
    const result = cond.toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.String);
    expect(result.operator).toEqual(SqlOperator.LIKE);
    expect(result.value).toEqual('Suhail%');
  });

  it('Should set condition type to %LIKE', () => {
    const key = 'FirstName';
    const cond = new SqlCondition(null, key);
    cond.endsWith('Suhail');
    const result = cond.toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.String);
    expect(result.operator).toEqual(SqlOperator.LIKE);
    expect(result.value).toEqual('%Suhail');
  });

  it('Should set condition type to string', () => {
    const key = 'FirstName';
    const cond = new SqlCondition(null, key);
    const result = cond.string.toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.String);
    expect(result.operator).toEqual(SqlOperator.EQ);
  });

  it('Should set condition type to number', () => {
    const key = 'Age';
    const cond = new SqlCondition(null, key);
    const result = cond.number.toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.operator).toEqual(SqlOperator.EQ);
  });

  it('Should set condition type to boolean', () => {
    const key = 'IsAdmin';
    const cond = new SqlCondition(null, key);
    const result = cond.bool.toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.Boolean);
    expect(result.operator).toEqual(SqlOperator.EQ);
  });

  it('Should set condition type to date', () => {
    const key = 'CreatedAt';
    const cond = new SqlCondition(null, key);
    const result = cond.date.toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.Date);
    expect(result.operator).toEqual(SqlOperator.EQ);
  });

  it('Should set condition type to daterange', () => {
    const key = 'CreatedAt';
    const cond = new SqlCondition(null, key);
    const result = cond.dateRange.toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.DateRange);
    expect(result.operator).toEqual(SqlOperator.EQ);
  });

  it('Should set condition type to datetime', () => {
    const key = 'CreatedAt';
    const cond = new SqlCondition(null, key);
    const result = cond.datetime.toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.DateTime);
    expect(result.operator).toEqual(SqlOperator.EQ);
  });

  it('Should set operator to not equal', () => {
    const key = 'Age';
    const value = 10;
    const cond = new SqlCondition(null, key);
    const result = cond.number.not.equalTo(value).toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.value).toEqual(value);
    expect(result.operator).toEqual(SqlOperator.NE);
  });

  it('Should set operator to equal using double negation', () => {
    const key = 'Age';
    const value = 10;
    const cond = new SqlCondition(null, key);
    const result = cond.number.not.not.equalTo(value).toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.value).toEqual(value);
    expect(result.operator).toEqual(SqlOperator.EQ);
  });

  it('Should set operator to less than when using negated greator than', () => {
    const key = 'Age';
    const value = 10;
    const cond = new SqlCondition(null, key);
    const result = cond.number.not.greaterThan(value).toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.value).toEqual(value);
    expect(result.operator).toEqual(SqlOperator.LE);
  });

  it('Should set operator to greather than when using negated less than or equal', () => {
    const key = 'Age';
    const value = 10;
    const cond = new SqlCondition(null, key);
    const result = cond.number.not.lessThanOrEqual(value).toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.value).toEqual(value);
    expect(result.operator).toEqual(SqlOperator.GT);
  });

  it('Should set operator to greather than or equal when using negated less than', () => {
    const key = 'Age';
    const value = 10;
    const cond = new SqlCondition(null, key);
    const result = cond.number.not.lessThanOrEqual(value).toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.value).toEqual(value);
    expect(result.operator).toEqual(SqlOperator.GT);
  });

  it('Should set operator to between', () => {
    const key = 'Age';
    const value = 10;
    const cond = new SqlCondition(null, key);
    const result = cond.number.between(value, value + 10).toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.value).toEqual([value, value + 10]);
    expect(result.operator).toEqual(SqlOperator.BETWEEN);
  });

  it('Should set operator to not between', () => {
    const key = 'Age';
    const value = 10;
    const cond = new SqlCondition(null, key);
    const result = cond.number.notBetween(value, value + 10).toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.value).toEqual([value, value + 10]);
    expect(result.operator).toEqual(SqlOperator.NOT_BETWEEN);
  });

  it('Should set operator to not like', () => {
    const key = 'FirstName';
    const value = 'Suhail';
    const cond = new SqlCondition(null, key);
    const result = cond.string.notLike(value).toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.String);
    expect(result.value).toEqual(`%${value}%`);
    expect(result.operator).toEqual(SqlOperator.NOT_LIKE);
  });

  it('Should set operator to like', () => {
    const key = 'FirstName';
    const value = 'Suhail';
    const cond = new SqlCondition(null, key);
    cond.key(key);
    const result = cond.string.like.value(value).toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.String);
    expect(result.value).toEqual(value);
    expect(result.operator).toEqual(SqlOperator.LIKE);
  });

  it('Should set operator to is null', () => {
    const key = 'FirstName';
    const cond = new SqlCondition(null, key);
    const result = cond.string.isNull.toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.String);
    expect(result.operator).toEqual(SqlOperator.IS_NULL);
  });

  it('Should set operator to is not null', () => {
    const key = 'FirstName';
    const cond = new SqlCondition(null, key);
    const result = cond.string.isNotNull.toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.String);
    expect(result.operator).toEqual(SqlOperator.IS_NOT_NULL);
  });

  it('Should set operator to not equal to', () => {
    const key = 'FirstName';
    const cond = new SqlCondition(null, key);
    const value = 'Suhail';
    const result = cond.string.notEqualTo(value).toJSON();

    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.String);
    expect(result.operator).toEqual(SqlOperator.NE);
  });

  it('Should set operator to not in', () => {
    const key = 'Age';
    const cond = new SqlCondition(null, key);
    const value = [20, 21, 22];
    const result = cond.notIn(value).toJSON();

    expect(result.key).toEqual(key);
    expect(result.value).toEqual(value);
    expect(result.type).toEqual(SqlRefinerType.Selection);
    expect(result.operator).toEqual(SqlOperator.NOT_IN);
    expect(() => cond.notIn([]))
      .toThrow('Expected an array with at least one values but got empty array');
    expect(() => cond.notIn(undefined))
      .toThrow('Expected an array of values but got undefined');
    expect(() => cond.notIn(null))
      .toThrow('Expected an array of values but got null');
  });

  it('Should set operator to in', () => {
    const key = 'Age';
    const cond = new SqlCondition(null, key);
    const value = [20, 21, 22];
    const result = cond.isIn(value).toJSON();

    expect(result.key).toEqual(key);
    expect(result.value).toEqual(value);
    expect(result.type).toEqual(SqlRefinerType.Selection);
    expect(result.operator).toEqual(SqlOperator.IN);
    expect(() => cond.isIn([]))
      .toThrow('Expected an array with at least one values but got empty array');
    expect(() => cond.isIn(undefined))
      .toThrow('Expected an array of values but got undefined');
    expect(() => cond.isIn(null))
      .toThrow('Expected an array of values but got null');
  });

  it('Should set operator to greater than or equal', () => {
    const key = 'Age';
    const cond = new SqlCondition(null, key);
    const value = 20;
    const result = cond.number.greaterThanOrEqual(value).toJSON();

    expect(result.key).toEqual(key);
    expect(result.value).toEqual(value);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.operator).toEqual(SqlOperator.GE);
  });

  it('Should set operator to less than', () => {
    const key = 'Age';
    const cond = new SqlCondition(null, key);
    const value = 20;
    const result = cond.number.lessThan(value).toJSON();

    expect(result.key).toEqual(key);
    expect(result.value).toEqual(value);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.operator).toEqual(SqlOperator.LT);
  });

  it('Should set operator to specified value', () => {
    const key = 'Age';
    const cond = new SqlCondition(null, key);
    const value = 20;
    const result = cond.number.lessThan(value).operator(SqlOperator.EQ).toJSON();

    expect(result.key).toEqual(key);
    expect(result.value).toEqual(value);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.operator).toEqual(SqlOperator.EQ);
  });

  it('Expect magic parameters to be set', () => {
    const key = 'Age';
    const cond = new SqlCondition(null, key);
    const value = 20;
    const result = cond.number.magicParams.lessThan(value).operator(SqlOperator.EQ).toJSON();

    expect(result.key).toEqual(key);
    expect(result.value).toEqual(value);
    expect(result.flags).toEqual(SqlQueryFlags.USE_MAGIC_PARAMS);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.operator).toEqual(SqlOperator.EQ);
  });

  it('Expect exact to be set', () => {
    const key = 'Age';
    const cond = new SqlCondition(null, key);
    const value = 20;
    const result = cond.number.exact.lessThan(value).operator(SqlOperator.EQ).toJSON();

    expect(result.key).toEqual(key);
    expect(result.value).toEqual(value);
    expect(result.flags).toEqual(SqlQueryFlags.EXACT);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.operator).toEqual(SqlOperator.EQ);
  });

  it('Expect case insensitive to be set', () => {
    const key = 'Age';
    const cond = new SqlCondition(null, key);
    const value = 20;
    const result = cond.number.caseInsensetive.lessThan(value)
      .operator(SqlOperator.EQ).toJSON();

    expect(result.key).toEqual(key);
    expect(result.value).toEqual(value);
    expect(result.flags).toEqual(SqlQueryFlags.CASE_SENSETIVE);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.operator).toEqual(SqlOperator.EQ);
  });

  it('Expect case insensitive and exact to be set', () => {
    const key = 'Age';
    const cond = new SqlCondition(null, key);
    const value = 20;
    const result = cond.number.caseInsensetive.exact.lessThan(value)
      .operator(SqlOperator.EQ).toJSON();

    expect(result.key).toEqual(key);
    expect(result.value).toEqual(value);
    expect(result.flags).toEqual(SqlQueryFlags.CASE_SENSETIVE | SqlQueryFlags.EXACT);
    expect(result.type).toEqual(SqlRefinerType.Number);
    expect(result.operator).toEqual(SqlOperator.EQ);
  });
});
