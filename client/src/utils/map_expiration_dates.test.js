const {
  removePunctuationLowerCase,
  getSubstringMatchCount,
  getExpirationDate,
  getExpirationCategory
} = require('./map_expiration_dates');
const { EXPIRATION_DATES } = require ('./expiration_dates');

describe('map expiration dates suite tests', () => {

  describe('removePunctuationLowerCase tests', () => {
    test('removePunctuationLowerCase() function test with one comma', () => {
      expect(removePunctuationLowerCase('lunch meats, opened')).toBe('lunch meats opened');
    });

    test('removePunctuationLowerCase() function test with two commas', () => {
      expect(removePunctuationLowerCase('lunch meats, opened, or closed')).toBe('lunch meats opened or closed');
    });

    test('removePunctuationLowerCase() function test with two commas and uppercase', () => {
      expect(removePunctuationLowerCase('LUNCH MEATS, opened, or CLOSED')).toBe('lunch meats opened or closed');
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

  describe('getExpirationDate', () => {
    test('getExpirationDate() function no match', () => {
      const item = 'rice';
      expect(getExpirationDate(item, EXPIRATION_DATES)).toBeNull();
    })

    test('getExpirationDate() function exact match', () => {
      const item2 = 'hot dogs unopened package';
      expect(getExpirationDate(item2, EXPIRATION_DATES)).toBe(14);
    })

    test('getExpirationDate() function test partial match', () => {
      const item3 = 'Canned seafood after opening';
      expect(getExpirationDate(item3, EXPIRATION_DATES)).toBe(3);
    })

    test('getExpirationDate() function test partial match2', () => {
      const item4 = 'tongue, kidneys, liver, heart, chitterlings';
      expect(getExpirationDate(item4, EXPIRATION_DATES)).toBe(1);
    })
  })

  describe('getExpirationCategory', () => {
    test('getExpirationCategory() function no match', () => {
      const item = 'rice';
      expect(getExpirationCategory(item, EXPIRATION_DATES)).toBe('none');
    })

    test('getExpirationCategory() function exact match', () => {
      const item2 = 'hot dogs unopened package';
      expect(getExpirationCategory(item2, EXPIRATION_DATES)).toBe('hot dogs unopened package');
    })

    test('getExpirationCategory() function test partial match', () => {
      const item3 = 'Canned seafood after opening';
      expect(getExpirationCategory(item3, EXPIRATION_DATES)).toBe('Canned seafood after opening out of can');
    })

    test('getExpirationCategory() function test partial match2', () => {
      const item4 = 'tongue, kidneys, liver, heart, chitterlings';
      expect(getExpirationCategory(item4, EXPIRATION_DATES)).toBe('Variety meats (tongue, kidneys, liver, heart, chitterlings)');
    })
  })


});
