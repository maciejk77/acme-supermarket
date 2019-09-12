import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext';
import { pricingRules } from '../../data/pricingRules.json';

const Discount = () => {
  const { uniqueBasket, count } = useContext(BasketContext);

  // helper functions
  const getPrice = (basket, prodCode) =>
    basket.filter(el => el.productCode === prodCode).map(el => el.price) / 100;
  const getCount = productCode => count[productCode];
  const hasNoRemainder = (item, rule) => item % rule === 0;

  // === BUY X GET Y FREE LOGIC ===========================
  const discountBuyXGetYFree = (pricingRule, productCode) => {
    const rule = pricingRule.buyXgetYFree.itemsNeeded;
    const itemsNum = count[productCode];

    const price = getPrice(uniqueBasket, productCode);
    const itemRuleModulus = hasNoRemainder(itemsNum, rule);

    const discount = itemRuleModulus
      ? (itemsNum / rule) * price
      : ((itemsNum - 1) / rule) * price;
    return discount.toFixed(2);
  };

  // === DISCOUNT PERCENTAGE LOGIC ===========================
  const discountPercentage = (pricingRule, productCode) => {
    const rule = pricingRule.discount.itemsNeeded;
    const percentage = pricingRule.discount.percentage;

    const itemsNum = getCount(productCode);
    const price = getPrice(uniqueBasket, productCode);
    const itemRuleModulus = hasNoRemainder(itemsNum, rule);

    const discount = itemRuleModulus
      ? itemsNum * (percentage / 100) * price
      : !itemRuleModulus
      ? (itemsNum - (itemsNum % rule)) * (percentage / 100) * price
      : '';
    return discount.toFixed(2);
  };

  return (
    <div>
      <div>FR1 -£{discountBuyXGetYFree(pricingRules[0], 'FR1')}</div>
      <div>SR1 -£{discountPercentage(pricingRules[1], 'SR1')}</div>
    </div>
  );
};

export default Discount;

// console.log('count ==> ', count);
// console.log('uniqueBasket ==> ', uniqueBasket);
// // console.log(
// //   'pricingRules ==> ',
// //   pricingRules[0].productCode,
// //   pricingRules[0].buyXgetYFree.MinNumOfItemsNeeded
// // );
// console.log(
//   'pricingRules ==> ',
//   pricingRules[1].productCode,
//   pricingRules[1].discount.percentage,
//   pricingRules[1].discount.minNumOfItemsNeeded
// );
