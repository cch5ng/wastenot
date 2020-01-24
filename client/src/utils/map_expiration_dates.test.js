const {
  removePunctuation,
  getSubstringMatchCount,
  getExpirationDate
} = require('./map_expiration_dates');

test('dummy test removePunctuation', () => {
  expect(removePunctuation('lunch meats, opened')).toBe('lunch meats opened');
});

test('dummy test2 removePunctuation', () => {
  expect(removePunctuation('lunch meats, opened, or closed')).toBe('lunch meats opened or closed');
});