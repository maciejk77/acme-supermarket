import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext';
import { pricingRules } from '../../data/pricingRules.json';

const Discount = () => {
  const { uniqueBasket, count } = useContext(BasketContext);

  // helper functions
  const getPrice = (basket, prodCode) =>
    basket.filter(el => el.productCode === prodCode).map(el => el.price) / 100;
  const hasNoRemainder = (item, rule) => item % rule === 0;

  // === BUY X GET Y FREE LOGIC ===========================
  const applyBuyXGetYFree = (rule, productCode) => {
    const { itemsNeeded } = rule.buyXgetYFree;
    const itemsCount = count[productCode];

    const price = getPrice(uniqueBasket, productCode);
    const itemRuleModulus = hasNoRemainder(itemsCount, itemsNeeded);

    const discount = itemRuleModulus
      ? itemsCount / itemsNeeded
      : (itemsCount - 1) / itemsNeeded;
    return (price * discount).toFixed(2);
  };

  // === DISCOUNT PERCENTAGE LOGIC ===========================
  const applyDiscountPercentage = (rule, productCode) => {
    const { itemsNeeded, percentage } = rule.discountPercentage;
    const itemsCount = count[productCode];

    const price = getPrice(uniqueBasket, productCode);
    const itemRuleModulus = hasNoRemainder(itemsCount, itemsNeeded);

    const discount = itemRuleModulus
      ? itemsCount * (percentage / 100)
      : !itemRuleModulus
      ? (itemsCount - (itemsCount % itemsNeeded)) * (percentage / 100)
      : null;
    return (price * discount).toFixed(2);
  };

  // display below is controlled by logic...
  // if discount type exists && if at least one item of given type was already selected

  return pricingRules.map(rule => {
    const { productCode, buyXgetYFree, discountPercentage } = rule;

    return (
      <div key={productCode}>
        <div>
          {buyXgetYFree &&
            count[productCode] > buyXgetYFree.itemsNeeded - 1 &&
            `discount (${productCode}) -£${applyBuyXGetYFree(
              rule,
              productCode
            )}`}
        </div>
        <div>
          {discountPercentage &&
            count[productCode] > discountPercentage.itemsNeeded - 1 &&
            `discount (${productCode}) -£${applyDiscountPercentage(
              rule,
              productCode
            )}`}
        </div>
      </div>
    );
  });
};

export default Discount;
