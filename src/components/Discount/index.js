import React, { useContext, Fragment } from 'react';
import { BasketContext } from '../BasketContext';
import { pricingRules } from '../../data/pricingRules.json';

const Discount = () => {
  const { uniqueBasket, count } = useContext(BasketContext);

  // helper functions
  const getPrice = (basket, prodCode) =>
    basket.filter(el => el.productCode === prodCode).map(el => el.price) / 100;
  const hasNoRemainder = (item, rule) => item % rule === 0;

  // === BUY X GET Y FREE LOGIC ===========================
  const discountBuyXGetYFree = (pricingRule, productCode) => {
    const { itemsNeeded } = pricingRule.buyXgetYFree;
    const itemsCount = count[productCode];

    const price = getPrice(uniqueBasket, productCode);
    const itemRuleModulus = hasNoRemainder(itemsCount, itemsNeeded);

    const discount = itemRuleModulus
      ? itemsCount / itemsNeeded
      : (itemsCount - 1) / itemsNeeded;
    return (price * discount).toFixed(2);
  };

  // === DISCOUNT PERCENTAGE LOGIC ===========================
  const discountPercentage = (pricingRule, productCode) => {
    const { itemsNeeded, percentage } = pricingRule.discount;
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

  return pricingRules.map(pricingRule => {
    const { productCode, buyXgetYFree, discount } = pricingRule;
    return (
      <div key={productCode}>
        <div>
          {buyXgetYFree &&
            count[productCode] > buyXgetYFree.itemsNeeded - 1 &&
            `discount (${productCode}) -£${discountBuyXGetYFree(
              pricingRule,
              productCode
            )}`}
        </div>
        <div>
          {discount &&
            count[productCode] > discount.itemsNeeded - 1 &&
            `discount (${productCode}) -£${discountPercentage(
              pricingRule,
              productCode
            )}`}
        </div>
      </div>
    );
  });
};

export default Discount;
