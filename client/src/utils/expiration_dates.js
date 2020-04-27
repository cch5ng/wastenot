//refrigeratorInt units in milliseconds

const EXPIRATION_DATES = {
  'no match': { refrigerator: null, refrigeratorInt: null, freezer: null },
  'fresh eggs in shell': {
    refrigerator: '21 - 35 days',
    refrigeratorInt: 1814400000,
    freezer: null,
    keyWords: [ 'eggs' ]
  },
  'raw egg yolks, whites': {
    refrigerator: '2 - 4 days',
    refrigeratorInt: 172800000,
    freezer: '1 year',
    keyWords: [ 'egg whites', 'egg yolks' ]
  },
  'Hard cooked eggs': {
    refrigerator: '1 week',
    refrigeratorInt: 604800000,
    freezer: null,
    keyWords: [ 'hard-boiled eggs', 'hard-cooked eggs' ]
  },
  'Liquid pasteurized eggs or egg substitutes': {
    refrigerator: '10 days',
    refrigeratorInt: 864000000,
    freezer: '1 year',
    keyWords: [ 'liquid eggs', 'egg substitutes' ]
  },
  'TV Dinners, Frozen Casseroles': {
    refrigerator: null,
    refrigeratorInt: null,
    freezer: '3 - 4 months',
    keyWords: [ 'frozen dinner', 'microwave dinner', 'frozen meal', 'frozen' ]
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
    ]
  },
  'deli pre-stuffed pork & lamb chops, chicken breasts stuffed w/ dressing': {
    refrigerator: '1 day',
    refrigeratorInt: 86400000,
    freezer: null,
    keyWords: [
      'stuffed pork chops',
      'stuffed lamb chops',
      'stuffed chicken breasts'
    ]
  },
  'Store-cooked convenience meals': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: null,
    keyWords: []
  },
  'Commercial brand vacuum-packed dinners with USDA seal, unopened': {
    refrigerator: '2 weeks',
    refrigeratorInt: 1209600000,
    freezer: null,
    keyWords: []
  },
  'Raw Hamburger, Ground & Stew Meat, Hamburger & stew meats': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '3 - 4 months',
    keyWords: [ 'raw hamburger', 'raw ground beef', 'raw meat', 'raw stew meat' ]
  },
  'Ground turkey, veal, pork, lamb': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '3 - 4 months',
    keyWords: [
      'raw ground turkey',
      'raw ground veal',
      'raw ground pork',
      'raw ground lamb'
    ]
  },
  'Ham, Corned Beef, Corned beef in pouch, with pickling juices Drained': {
    refrigerator: '5 - 7 days',
    refrigeratorInt: 432000000,
    freezer: '1 month',
    keyWords: [ 'ham', 'corned beef in pouch, drained', 'corned beef' ]
  },
  'Ham, canned, labeled unopened': {
    refrigerator: '6 - 9 months',
    refrigeratorInt: 15552000000,
    freezer: null,
    keyWords: [ 'canned ham' ]
  },
  'Ham, canned, labeled opened': {
    refrigerator: '3 - 5 days',
    refrigeratorInt: 259200000,
    freezer: '1 - 2 months',
    keyWords: [ 'canned ham, opened' ]
  },
  'Ham, fully cooked, whole': {
    refrigerator: '7 days',
    refrigeratorInt: 604800000,
    freezer: '1 - 2 months',
    keyWords: [ 'cooked ham, whole' ]
  },
  'Ham, fully cooked, half': {
    refrigerator: '3 - 5 days',
    refrigeratorInt: 259200000,
    freezer: '1 - 2 months',
    keyWords: [ 'cooked ham, half' ]
  },
  'Ham, fully cooked, slices': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '1 - 2 months',
    keyWords: [ 'sliced ham, cooked' ]
  },
  'Hot dogs, opened package': {
    refrigerator: '1 week',
    refrigeratorInt: 604800000,
    freezer: '1 - 2 months',
    keyWords: [ 'hot dogs, opened' ]
  },
  'hot dogs unopened package': {
    refrigerator: '2 weeks',
    refrigeratorInt: 1209600000,
    freezer: '1 - 2 months',
    keyWords: [ 'hot dogs' ]
  },
  'Lunch meats, opened package': {
    refrigerator: '3 - 5 days',
    refrigeratorInt: 259200000,
    freezer: '1 - 2 months',
    keyWords: [
      'lunch meats, opened',
      'sliced turkey, opened',
      'sliced ham, opened',
      'sliced roast beef, opened',
      'sliced pastrami, opened',
      'sliced pepperoni, opened'
    ]
  },
  'Lunch meats unopened package': {
    refrigerator: '2 weeks',
    refrigeratorInt: 1209600000,
    freezer: '1 - 2 months'
  },
  'Soups & Stews, Vegetable or meat-added & mixtures of them': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '2 - 3 months'
  },
  Bacon: {
    refrigerator: '7 days',
    refrigeratorInt: 604800000,
    freezer: '1 month'
  },
  'Sausage, raw from pork, beef, chicken or turkey': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '1 - 2 months'
  },
  'Smoked breakfast links, patties': {
    refrigerator: '7 days',
    refrigeratorInt: 604800000,
    freezer: '1 - 2 months'
  },
  'Beef, Veal, Lamb, & Pork Steaks': {
    refrigerator: '3 - 5 days',
    refrigeratorInt: 259200000,
    freezer: '6 - 12 months'
  },
  'Beef, Veal, Lamb, & Pork Roasts': {
    refrigerator: '3 - 5 days',
    refrigeratorInt: 259200000,
    freezer: '4 - 12 months'
  },
  'Beef, Veal, Lamb, & Pork Chops': {
    refrigerator: '3 - 5 days',
    refrigeratorInt: 259200000,
    freezer: '4 - 6 months'
  },
  'Variety meats (tongue, kidneys, liver, heart, chitterlings)': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '3 - 4 months'
  },
  'leftover Cooked meat & meat dishes': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '2 - 3 months'
  },
  'leftover Gravy & meat broth': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '2 - 3 months'
  },
  'fresh Chicken or turkey, whole': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '1 year'
  },
  'fresh Chicken or turkey, parts': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '9 months'
  },
  'fresh Giblets': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '3 - 4 months'
  },
  'leftover Fried chicken': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '4 months'
  },
  'leftover Cooked poultry dishes': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '4 - 6 months'
  },
  'leftover cooked poultry Pieces, plain': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '4 months'
  },
  'leftover cooked poultry Pieces covered with broth, gravy': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '6 months'
  },
  'leftover cooked Chicken nuggets, patties': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '1 - 3 months'
  },
  'Lean fish  ': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '6 - 8 months'
  },
  'Fatty fish': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '2 - 3 months'
  },
  'Cooked fish': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '4 - 6 months'
  },
  'Smoked fish': {
    refrigerator: '14 days',
    refrigeratorInt: 1209600000,
    freezer: '2 months'
  },
  'Fresh shrimp, scallops, crawfish, squid': {
    refrigerator: '1 - 2 days',
    refrigeratorInt: 86400000,
    freezer: '3 - 6 months'
  },
  'Canned seafood after opening out of can': {
    refrigerator: '3 - 4 days',
    refrigeratorInt: 259200000,
    freezer: '2 months'
  },
  test_1: { refrigerator: '1 min', refrigeratorInt: 60000, freezer: null },
  test_2: { refrigerator: '2 min', refrigeratorInt: 120000, freezer: null },
  test_4: { refrigerator: '4 min', refrigeratorInt: 240000, freezer: null }
}


export { EXPIRATION_DATES };

//missing dairy
//missing produce
