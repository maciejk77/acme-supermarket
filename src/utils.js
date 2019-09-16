import { pricingRules } from '../src/data/pricingRules.json';

// === mapping a basket, how many items of given productCode are in the basket ===
export const getMapOfBasketItems = basket => {
  const basketItemsMap = {};
  // loop over basket items
  for (let item of basket) {
    if (basketItemsMap[item]) {
      // if item key already exists, increment value
      basketItemsMap[item]++;
    } else {
      // else item key does not exist yet, create and set value to 1
      basketItemsMap[item] = 1;
    }
  }
  // return the newly mapped object i.e. {CF1: 7, SR1: 1, FR1: 2}
  return basketItemsMap;
};

// === fetching data for given productCode ===
export const completeProductInfo = (products, itemCode) => {
  return products.filter(prod => prod.productCode === itemCode);
};

// === getting number(s) formatted to decimal, and set number of places ===
export const formatToDecimal = (number, places) =>
  (number / 100).toFixed(places);

// === get price for a given productCode from basket object given
export const getPrice = (basket, prodCode) =>
  basket.filter(el => el.productCode === prodCode).map(el => el.price) / 100;

// == returns boolean to clean up code, has or has not have a reminder after division
export const hasNoRemainder = (item, rule) => item % rule === 0;

// === returns a pricing rule for productCode provided
export const getPricingRule = prodCode => {
  return pricingRules.filter(rule => rule.productCode === prodCode);
};
