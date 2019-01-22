import { SqlSort } from '../src/SqlSort';
import { SqlSorterDirection, SqlOperator, SqlRefinerType } from '../src/enums';
describe('Testing SqlSort', () => {
  it('it should set direction to ascending', () => {
    const field = 'FirstName';
    const sort = new SqlSort(null, field).asc;
    const result = sort.toJSON();
    expect(result.key).toEqual(field);
    expect(result.type).toEqual(SqlRefinerType.Sort);
    expect(result.value).toEqual(SqlSorterDirection.ASC);
  });

  it('it should set direction to descending', () => {
    const field = 'FirstName';
    const sort = new SqlSort(null, field).desc;
    const result = sort.toJSON();
    expect(result.key).toEqual(field);
    expect(result.type).toEqual(SqlRefinerType.Sort);
    expect(result.value).toEqual(SqlSorterDirection.DESC);
  });

  it('it should set the key', () => {
    const field = 'FirstName';
    const key = 'LastName';
    const sort = new SqlSort(null, field).desc.key(key);
    const result = sort.toJSON();
    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.Sort);
    expect(result.value).toEqual(SqlSorterDirection.DESC);
  });

  it('it should construct object from json', () => {
    const field = 'FirstName';
    const key = 'LastName';
    const sort = SqlSort.fromJson({
      key,
      value:SqlSorterDirection.ASC,
      operator:SqlOperator.EQ,
      type:SqlRefinerType.Sort,
    });
    const result = sort.toJSON();
    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.Sort);
    expect(result.value).toEqual(SqlSorterDirection.ASC);
  });

  it('it should construct object from json', () => {
    const field = 'FirstName';
    const key = 'LastName';
    const sort = SqlSort.fromJson({
      key,
      value:SqlSorterDirection.DESC,
      operator:SqlOperator.EQ,
      type:SqlRefinerType.Sort,
    });
    const result = sort.toJSON();
    expect(result.key).toEqual(key);
    expect(result.type).toEqual(SqlRefinerType.Sort);
    expect(result.value).toEqual(SqlSorterDirection.ASC);
  });
});
