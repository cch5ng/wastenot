//refrigeratorInt units in milliseconds

const EXPIRATION_DATES = {
  'no match': { refrigerator: null, refrigeratorInt: null, freezer: null },
  'apples': {
    refrigerator: '4-8 weeks',
    refrigeratorInt: 2592000000,
    freezer: null,
    category: 'produce'
  },

  'bacon': {
    refrigerator: '7 days',
    refrigeratorInt: 604800000,
    freezer: '1 month',
    category: 'deli'
  },
  'beef, veal, lamb, pork steaks': {
    refrigerator: '3 - 5 days',
    refrigeratorInt: 259200000,
    freezer: '6 - 12 months',
    category: 'protein'
  },
  'beef, veal, lamb, pork roasts': {
    refrigerator: '3 - 5 days',
    refrigeratorInt: 259200000,
    freezer: '4 - 12 months',
    category: 'protein'
  },
  'beef, veal, lamb, pork chops': {
    refrigerator: '3 - 5 days',
    refrigeratorInt: 259200000,
    freezer: '4 - 6 months',
    category: 'protein'
  },
  'blueberries': {
    refrigerator: '1-2 weeks',
    refrigeratorInt: 604800000,
    freezer: null,
    category: 'produce'
  },
  'breakfast links, patties (smoked)': {
    refrigerator: '7 days',
    refrigeratorInt: 604800000,
    freezer: '1 - 2 months',
    category: 'protein'
  },

  'broccoli': {
    refrigerator: '1-2 weeks',
    refrigeratorInt: 604800000,
    freezer: null,
    category: 'produce'
  },
  'cauliflower': {
    refrigerator: '1-2 weeks',
    refrigeratorInt: 604800000,
    freezer: null,
    category: 'produce'
  },

  'carrots': {
    refrigerator: '3-4 weeks',
    refrigeratorInt: 1814400000,
    freezer: null,
    category: 'produce'
  },

  'chicken, turkey (whole and fresh)': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '1 year',
    category: 'protein'
  },
  'chicken, turkey': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '9 months',
    category: 'protein'
  },
  'chicken, turkey (cooked)': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '4 months',
    category: 'protein'
  },
  'chicken, turkey (cooked with broth, gravy)': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '6 months',
    category: 'protein'
  },
  'chicken nuggets, patties (cooked)': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '1 - 3 months',
    category: 'protein'
  },
  'cucumbers': {
    refrigerator: '7 days',
    refrigeratorInt: 604800000,
    freezer: null,
    category: 'produce'
  },


  'deli items (Store-prepared or homemade) egg, chicken, tuna, ham, macaroni salads': {
    refrigerator: '3 - 5 days',
    refrigeratorInt: 259200000,
    freezer: null,
    keyWords: [
      'deli salad',
      'egg salad',
      'chicken salad',
      'potato salad',
      'tuna salad',
      'macaroni salad',
      'deli',
      'prepared'
    ],
    category: 'deli'
  },
  'deli pre-stuffed pork & lamb chops, chicken breasts stuffed w/ dressing': {
    refrigerator: '1 day',
    refrigeratorInt: 86400000,
    freezer: null,
    keyWords: [
      'stuffed pork chops',
      'stuffed lamb chops',
      'stuffed chicken breasts'
    ],
    category: 'deli'
  },
  'eggs (uncooked in shell)': {
    refrigerator: '21 - 35 days',
    refrigeratorInt: 1814400000,
    freezer: null,
    keyWords: [ 'eggs' ],
    category: 'protein'
  },
  'egg substitutes (liquid)': {
    refrigerator: '10 days',
    refrigeratorInt: 864000000,
    freezer: '1 year',
    keyWords: [ 'liquid eggs', 'egg substitutes' ],
    category: 'protein'
  },

  'fish, lean': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '6 - 8 months',
    category: 'protein'
  },
  'fish (fatty)': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '2 - 3 months',
    category: 'protein'
  },
  'fish, cooked': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '4 - 6 months',
    category: 'protein'
  },
  'fish, smoked': {
    refrigerator: '14 days',
    refrigeratorInt: 1209600000,
    freezer: '2 months',
    category: 'protein'
  },
  'fried chicken': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '4 months',
    category: 'deli'
  },
  'giblets, fresh': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '3 - 4 months',
    category: 'protein'
  },
  'gravy, meat broth': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '2 - 3 months'
  },

  'ground turkey, chicken, pork, veal, lamb': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '3 - 4 months',
    keyWords: [
      'raw ground turkey',
      'raw ground chicken',
      'raw ground pork',
      'raw ground veal',
      'raw ground lamb'
    ],
    category: 'protein'
  },
  'creamer (coconut, almond milk)': {
    refrigerator: '7 days',
    refrigeratorInt: 604800000,
    freezer: null,
    category: 'dairy'
  },
  'half and half': {
    refrigerator: '5 days',
    refrigeratorInt: 432000000,
    freezer: null,
    category: 'dairy'
  },
  'ham, sliced': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '1 - 2 months',
    keyWords: [ 'sliced ham, cooked' ],
    category: 'protein'
  },

  'ham, corned Beef (bagged and sealed)': {
    refrigerator: '5 - 7 days',
    refrigeratorInt: 432000000,
    freezer: '1 month',
    keyWords: [ 'ham', 'corned beef in pouch, drained', 'corned beef' ],
    category: 'deli'
  },
  'ham, canned (unopened)': {
    refrigerator: '6 - 9 months',
    refrigeratorInt: 15552000000,
    freezer: null,
    keyWords: [ 'canned ham' ],
    category: 'canned'
  },
  'ham, canned (opened)': {
    refrigerator: '3 - 5 days',
    refrigeratorInt: 259200000,
    freezer: '1 - 2 months',
    keyWords: [ 'canned ham, opened' ],
    category: 'canned'
  },
  'ham, cooked (whole)': {
    refrigerator: '7 days',
    refrigeratorInt: 604800000,
    freezer: '1 - 2 months',
    keyWords: [ 'cooked ham, whole' ],
    category: 'protein'
  },
  'ham, cooked (half)': {
    refrigerator: '3 - 5 days',
    refrigeratorInt: 259200000,
    freezer: '1 - 2 months',
    keyWords: [ 'cooked ham, half' ],
    category: 'protein'
  },
  'hamburger (raw), ground beef, stew meat': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '3 - 4 months',
    keyWords: [ 'hamburger', 'raw hamburger', 'raw ground beef', 'raw meat', 'raw stew meat' ],
    category: 'protein'
  },
  'hamburger, meat, beef, steak (cooked)': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '2 weeks',
    keyWords: [ 'cooked hamburger', 'cooked beef', 'cooked steak', 'cooked roast', 'cooked meat', 'steak' ],
    category: 'protein'
  },

  'hot dogs (unopened)': {
    refrigerator: '2 weeks',
    refrigeratorInt: 1209600000,
    freezer: '1 - 2 months',
    keyWords: [ 'hot dogs' ],
    category: 'protein'
  },
  'hot dogs (opened)': {
    refrigerator: '1 week',
    refrigeratorInt: 604800000,
    freezer: '1 - 2 months',
    keyWords: [ 'hot dogs, opened' ],
    category: 'protein'
  },

  'lemons': {
    refrigerator: '3-4 weeks',
    refrigeratorInt: 1814400000,
    freezer: null,
    category: 'produce'
  },
  'green cabbage (shredded, washed)': {
    refrigerator: '7-10 days',
    refrigeratorInt: 604800000,
    freezer: null,
    keyWords: [
      'salad, bagged'
    ],
    category: 'produce'
  },
  'lettuce (iceberg, romaine)': {
    refrigerator: '7-10 days',
    refrigeratorInt: 604800000,
    freezer: null,
    keyWords: [
      'iceberg lettuce', 
      'romaine lettuce'
    ],
    category: 'produce'
  },
  'pastrami, sandwich meat': {
    refrigerator: '2 weeks',
    refrigeratorInt: 1209600000,
    freezer: '1 - 2 months',
    keyWords: [
      'lunch meats, unopened',
      'sliced pastrami, unopened',
    ],
    category: 'protein'
  },
  'roast beef, sandwich meat': {
    refrigerator: '2 weeks',
    refrigeratorInt: 1209600000,
    freezer: '1 - 2 months',
    keyWords: [
      'lunch meats, unopened',
      'sliced roast beef, unopened',
    ],
    category: 'protein'
  },
  'turkey, sandwich meat': {
    refrigerator: '2 weeks',
    refrigeratorInt: 1209600000,
    freezer: '1 - 2 months',
    keyWords: [
      'lunch meats, unopened',
      'sliced turkey, unopened',
    ],
    category: 'protein'
  },

  'lunch meats, unopened package': {
    refrigerator: '2 weeks',
    refrigeratorInt: 1209600000,
    freezer: '1 - 2 months',
    keyWords: [
      'lunch meats, unopened',
      'sliced turkey, unopened',
      'sliced ham, unopened',
      'sliced roast beef, unopened',
      'sliced pastrami, unopened',
      'sliced pepperoni, unopened',
      'sliced salami, unopened',
      'roast beef'
    ],
    category: 'protein'
  },
  'lunch meats, opened package': {
    refrigerator: '3 - 5 days',
    refrigeratorInt: 259200000,
    freezer: '1 - 2 months',
    keyWords: [
      'lunch meats, opened',
      'sliced turkey, opened',
      'sliced ham, opened',
      'sliced roast beef, opened',
      'sliced pastrami, opened',
      'sliced pepperoni, opened',
      'sliced salami, opened'
    ],
    category: 'protein'
  },
  'meat, cooked': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '2 - 3 months',
    category: 'protein'
  },
  'milk': {
    refrigerator: '7 days',
    refrigeratorInt: 604800000,
    freezer: null,
    category: 'dairy'
  },
  'mushrooms (whole)': {
    refrigerator: '7-10 days',
    refrigeratorInt: 604800000,
    freezer: null,
    category: 'produce'
  },
  'oranges': {
    refrigerator: '3-4 weeks',
    refrigeratorInt: 1814400000,
    freezer: null,
    category: 'produce'
  },
  'pasta (cooked)': {
    refrigerator: '3-4 days',
    refrigeratorInt: 259200000,
    freezer: null,
    keyWords: [
      'cooked pasta (refrigerated)'
    ],
    category: 'grains and pasta'
  },
  'peas (snow, sugar)': {
    refrigerator: '3-5 days',
    refrigeratorInt: 259200000,
    freezer: null,
    keyWords: [
      'snow peas',
      'sugar peas',
      'sugar snap peas'
    ],
    category: 'produce'
  },

  'refrigerated meals, unopened (sealed)': {
    refrigerator: '2 weeks',
    refrigeratorInt: 1209600000,
    freezer: null,
    keyWords: [],
    category: 'deli'
  },


  'rice (cooked)': {
    refrigerator: '3-4 days',
    refrigeratorInt: 259200000,
    freezer: null,
    keyWords: [
      'cooked rice (refrigerated)'
    ],
    category: 'grains and pasta'
  },
  'sausage, raw (pork, beef, chicken or turkey)': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '1 - 2 months',
    category: 'protein'
  },

  'seafood, canned (opened)': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '2 months',
    category: 'protein'
  },
  'shrimp, scallops, crawfish, squid': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '3 - 6 months',
    category: 'protein'
  },




  'soups, stews': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '2 - 3 months'
  },

  'strawberries': {
    refrigerator: '3-7 days',
    refrigeratorInt: 259200000,
    freezer: null,
    category: 'produce'
  },


  'Store-cooked convenience meals': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: null,
    keyWords: [],
    category: 'deli'
  },
  'string beans': {
    refrigerator: '3-5 days',
    refrigeratorInt: 259200000,
    freezer: null,
    category: 'produce'
  },


  'turkey, chicken, pork, veal, lamb, chops (cooked)': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '2 weeks',
    keyWords: [ 'cooked turkey', 'cooked chicken', 'cooked pork', 'cooked veal', 'cooked lamb' ],
    category: 'protein'
  },
  'TV Dinners, Frozen Casseroles': {
    refrigerator: null,
    refrigeratorInt: null,
    freezer: '3 - 4 months',
    keyWords: [ 'frozen dinner', 'microwave dinner', 'frozen meal', 'frozen' ]
  },
  'variety meats (tongue, kidneys, liver, heart, chitterlings)': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '3 - 4 months',
    category: 'protein'
  },

  'zucchini': {
    refrigerator: '4-5 days',
    refrigeratorInt: 345600000,
    freezer: null,
    category: 'produce'
  },
  test_1: { refrigerator: '1 min', refrigeratorInt: 60000, freezer: null, category: 'test'},
  test_2: { refrigerator: '2 min', refrigeratorInt: 120000, freezer: null, category: 'test'},
  test_4: { refrigerator: '4 min', refrigeratorInt: 240000, freezer: null, category: 'test'}
}

export { EXPIRATION_DATES };
