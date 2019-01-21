import { SqlCondition } from '../src/SqlCondition';
import { SqlRefinerType, SqlOperator } from '../src/enums';
describe('Testing SqlCondition', () => {
  it('Should set condition type to LIKE', () => {
    const key = 'FirstName';
    const cond = new SqlCondition(null, key);
    cond.contains('Suhail');
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
});
