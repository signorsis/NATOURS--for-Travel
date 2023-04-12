const APIFeatures = require('./apiFeatures');
const apiFeatures = require('./apiFeatures');

describe('APIFeatures', () => {
  const mockQuery = {
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
  };

  const mockQueryString = {
    name: 'test',
    price: { gte: 100 },
    sort: 'price',
    fields: 'name,price',
    page: 1,
    limit: 10,
  };
  test('filter()', () => {
    const apiFeatures = new APIFeatures(mockQuery, mockQueryString);
    apiFeatures.filter();
    expect(mockQuery.find).toHaveBeenCalledWith({
      name: 'test',
      price: { $gte: 100 },
    });
  });
  test('sort()', ()=>{
    const apiFeature=new apiFeatures(mockQuery,mockQueryString);
    apiFeature.sort();

    expect(mockQuery.sort).toHaveBeenCalledWith('price')
  })
});
