const {
  removePunctuation,
  getSubstringMatchCount,
  getExpirationDate
} = require('./map_expiration_dates');

describe('map expiration dates suite tests', () => {

  describe('removePunctuation tests', () => {
    test('removePunctuation() function test with one comma', () => {
      expect(removePunctuation('lunch meats, opened')).toBe('lunch meats opened');
    });

    test('removePunctuation() function test with two commas', () => {
      expect(removePunctuation('lunch meats, opened, or closed')).toBe('lunch meats opened or closed');
    });
  })

  describe('getSubstringMatchCount', () => {
    test('getSubstringMatchCount() function test', () => {
      const ar1 = ['a', 'b', 'c', 'd', 'e'];
      const ar2 = ['z', 'y', 'e', 'c', 'a', 'o', 'p', 'd'];
      expect(getSubstringMatchCount(ar1, ar2)).toBe(4);
    })

    test('getSubstringMatchCount() function test swap order of short/long ar', () => {
      const ar7 = ['z', 'y', 'e', 'c', 'a', 'o', 'p', 'd'];
      const ar8 = ['a', 'b', 'c', 'd', 'e'];
      expect(getSubstringMatchCount(ar7, ar8)).toBe(4);
    })

    test('getSubstringMatchCount() function test all match', () => {
      const ar3 = ['a', 'b', 'c', 'd', 'e'];
      const ar4 = ['a', 'b', 'c', 'd', 'e'];
      expect(getSubstringMatchCount(ar3, ar4)).toBe(5);
    })

    test('getSubstringMatchCount() function test no match', () => {
      const ar5 = ['a', 'b', 'c', 'd', 'e'];
      const ar6 = ['z', 'y', 'o', 'p', 'm'];
      expect(getSubstringMatchCount(ar5, ar6)).toBe(0);
    })
  })



});
