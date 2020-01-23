const EXPIRATION_DATES = {
  "fresh eggs in shell": {
    refrigerator: "21 - 35 days",
    refrigeratorInt: 21,
    freezer: null,
    keyWords: ['eggs']
  },
  "raw egg yolks, whites": {
    refrigerator: "2 - 4 days",
    refrigeratorInt: 2,
    freezer: "1 year",
    keyWords: ['egg whites', 'egg yolks']
  },
  "Hard cooked eggs": {
    refrigerator: "1 week",
    refrigeratorInt: 7,
    freezer: null
  },
  "Liquid pasteurized eggs or egg substitutes": {
    refrigerator: "10 days",
    refrigeratorInt: 10,
    freezer: "1 year"
  },
  "TV Dinners, Frozen Casseroles": {
    refrigerator: null,
    refrigeratorInt: null,
    freezer: "3 - 4 months"
  },
  "deli items (Store-prepared or homemade) egg, chicken, tuna, ham, macaroni salads": {
    refrigerator: "3 - 5 days",
    refrigeratorInt: 3,
    freezer: null
  },
  "deli pre-stuffed pork & lamb chops, chicken breasts stuffed w/ dressing": {
    refrigerator: "1 day",
    refrigeratorInt: 1,
    freezer: null
  },
  "Store-cooked convenience meals": {
    refrigerator: "3 - 4 days",
    refrigeratorInt: 3,
    freezer: null
  },
  "Commercial brand vacuum-packed dinners with USDA seal, unopened": {
    refrigerator: "2 weeks",
    refrigeratorInt: 14,
    freezer: null
  },
  "Raw Hamburger, Ground & Stew Meat, Hamburger & stew meats": {
    refrigerator: "1 - 2 days",
    refrigeratorInt: 1,
    freezer: "3 - 4 months"
  },
  "Ground turkey, veal, pork, lamb": {
    refrigerator: "1 - 2 days",
    refrigeratorInt: 1,
    freezer: "3 - 4 months"
  },
  "Ham, Corned Beef, Corned beef in pouch, with pickling juices Drained": {
    refrigerator: "5 - 7 days",
    refrigeratorInt: 5,
    freezer: "1 month"
  },
  "Ham, canned, labeled unopened": {
    refrigerator: "6 - 9 months",
    refrigeratorInt: 180,
    freezer: null
  },
  "Ham, canned, labeled opened": {
    refrigerator: "3 - 5 days",
    refrigeratorInt: 3,
    freezer: "1 - 2 months"
  },
  "Ham, fully cooked, whole": {
    refrigerator: "7 days",
    refrigeratorInt: 7,
    freezer: "1 - 2 months"
  },
  "Ham, fully cooked, half": {
    refrigerator: "3 - 5 days",
    refrigeratorInt: 3,
    freezer: "1 - 2 months"
  },
  "Ham, fully cooked, slices": {
    refrigerator: "3 - 4 days",
    refrigeratorInt: 3,
    freezer: "1 - 2 months"
  },
  "Hot dogs, opened package": {
    refrigerator: "1 week",
    refrigeratorInt: 7,
    freezer: "1 - 2 months"
  },
  "hot dogs unopened package": {
    refrigerator: "2 weeks",
    refrigeratorInt: 14,
    freezer: "1 - 2 months"
  },
  "Lunch meats, opened package": {
    refrigerator: "3 - 5 days",
    refrigeratorInt: 3,
    freezer: "1 - 2 months"
  },
  "Lunch meats unopened package": {
    refrigerator: "2 weeks",
    refrigeratorInt: 14,
    freezer: "1 - 2 months"
  },
  "Soups & Stews, Vegetable or meat-added & mixtures of them": {
    refrigerator: "3 - 4 days",
    refrigeratorInt: 3,
    freezer: "2 - 3 months"
  },
  "Bacon": {
    refrigerator: "7 days",
    refrigeratorInt: 7,
    freezer: "1 month"
  },
  "Sausage, raw from pork, beef, chicken or turkey": {
    refrigerator: "1 - 2 days",
    refrigeratorInt: 1,
    freezer: "1 - 2 months"
  },
  "Smoked breakfast links, patties": {
    refrigerator: "7 days",
    refrigeratorInt: 7,
    freezer: "1 - 2 months"
  },
  "Beef, Veal, Lamb, & Pork Steaks": {
    refrigerator: "3 - 5 days",
    refrigeratorInt: 3,
    freezer: "6 - 12 months"
  },
  "Beef, Veal, Lamb, & Pork Roasts": {
    refrigerator: "3 - 5 days",
    refrigeratorInt: 3,
    freezer: "4 - 12 months"
  },
  "Beef, Veal, Lamb, & Pork Chops": {
    refrigerator: "3 - 5 days",
    refrigeratorInt: 3,
    freezer: "4 - 6 months"
  },
  "Variety meats (tongue, kidneys, liver, heart, chitterlings)": {
    refrigerator: "1 - 2 days",
    refrigeratorInt: 1,
    freezer: "3 - 4 months"
  },
  "leftover Cooked meat & meat dishes": {
    refrigerator: "3 - 4 days",
    refrigeratorInt: 3,
    freezer: "2 - 3 months"
  },
  "leftover Gravy & meat broth": {
    refrigerator: "1 - 2 days",
    refrigeratorInt: 1,
    freezer: "2 - 3 months"
  },
  "fresh Chicken or turkey, whole": {
    refrigerator: "1 - 2 days",
    refrigeratorInt: 1,
    freezer: "1 year"
  },
  "fresh Chicken or turkey, parts": {
    refrigerator: "1 - 2 days",
    refrigeratorInt: 1,
    freezer: "9 months"
  },
  "fresh Giblets": {
    refrigerator: "1 - 2 days",
    refrigeratorInt: 1,
    freezer: "3 - 4 months"
  },
  "leftover Fried chicken": {
    refrigerator: "3 - 4 days",
    refrigeratorInt: 3,
    freezer: "4 months"
  },
  "leftover Cooked poultry dishes": {
    refrigerator: "3 - 4 days",
    refrigeratorInt: 3,
    freezer: "4 - 6 months"
  },
  "leftover cooked poultry Pieces, plain": {
    refrigerator: "3 - 4 days",
    refrigeratorInt: 3,
    freezer: "4 months"
  },
  "leftover cooked poultry Pieces covered with broth, gravy": {
    refrigerator: "3 - 4 days",
    refrigeratorInt: 3,
    freezer: "6 months"
  },
  "leftover cooked Chicken nuggets, patties": {
    refrigerator: "3 - 4 days",
    refrigeratorInt: 3,
    freezer: "1 - 3 months"
  },
  "Lean fish  ": {
    refrigerator: "1 - 2 days",
    refrigeratorInt: 1,
    freezer: "6 - 8 months",
  },
  "Fatty fish": {
    refrigerator: "1 - 2 days",
    refrigeratorInt: 1,
    freezer: "2 - 3 months"
  },
  "Cooked fish": {
    refrigerator: "3 - 4 days",
    refrigeratorInt: 3,
    freezer: "4 - 6 months"
  },
  "Smoked fish": {
    refrigerator: "14 days",
    refrigeratorInt: 14,
    freezer: "2 months"
  },
  "Fresh shrimp, scallops, crawfish, squid": {
    refrigerator: "1 - 2 days",
    refrigeratorInt: 1,
    freezer: "3 - 6 months"
  },
  "Canned seafood after opening out of can": {
    refrigerator: "3 - 4 days",
    refrigeratorInt: 3,
    freezer: "2 months"
  }
}

export default { EXPIRATION_DATES };

//missing dairy
//missing produce
