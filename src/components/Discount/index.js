import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext';
import { getPrice, hasNoRemainder, getPricingRule } from '../../utils.js';

const Discount = () => {
  const { uniqueBasket, count } = useContext(BasketContext);

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

  // === return a collection of pricing rules in order taken from count object
  const pricingRules = Object.keys(count).reduce((acc, el) => {
    return acc.concat(getPricingRule(el));
  }, []);

  return pricingRules.map(rule => {
    const { productCode, buyXgetYFree, discountPercentage } = rule;
    const typeOfDiscount = buyXgetYFree ? buyXgetYFree : discountPercentage;
    const applyDiscount = buyXgetYFree ? true : false;

    return (
      <div key={productCode}>
        <div>
          {typeOfDiscount &&
            count[productCode] > typeOfDiscount.itemsNeeded - 1 &&
            `discount (${productCode}) -£${
              applyDiscount
                ? applyBuyXGetYFree(rule, productCode)
                : applyDiscountPercentage(rule, productCode)
            }`}
        </div>
      </div>
    );
  });
};

export default Discount;
