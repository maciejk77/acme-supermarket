import React, { useContext, Fragment } from 'react';
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

    const discount = itemRuleModulus ? itemsNum / rule : (itemsNum - 1) / rule;
    return (price * discount).toFixed(2);
  };

  // === DISCOUNT PERCENTAGE LOGIC ===========================
  const discountPercentage = (pricingRule, productCode) => {
    const rule = pricingRule.discount.itemsNeeded;
    const itemsNum = getCount(productCode);
    const percentage = pricingRule.discount.percentage;

    const price = getPrice(uniqueBasket, productCode);
    const itemRuleModulus = hasNoRemainder(itemsNum, rule);

    const discount = itemRuleModulus
      ? itemsNum * (percentage / 100)
      : !itemRuleModulus
      ? (itemsNum - (itemsNum % rule)) * (percentage / 100)
      : '';
    return (price * discount).toFixed(2);
  };

  // display below is controlled by logic...
  // if discount type exists && if at least one item of given type was already selected

  return pricingRules.map(pricingRule => {
    return (
      <div key={pricingRule.productCode} style={styles.discount}>
        <div style={styles.discountItem}>
          {pricingRule.buyXgetYFree &&
            count[pricingRule.productCode] &&
            `discount (${pricingRule.productCode}) -£${discountBuyXGetYFree(
              pricingRule,
              pricingRule.productCode
            )}`}
        </div>
        <div style={styles.discountItem}>
          {pricingRule.discount &&
            count[pricingRule.productCode] &&
            `discount (${pricingRule.productCode}) -£${discountPercentage(
              pricingRule,
              pricingRule.productCode
            )}`}
        </div>
      </div>
    );
  });
};

// quick fix, temp styles to be replaced with Sass or styled components
const styles = {
  discount: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '1rem',
    lineHeight: '1.75rem'
  },
  discountItem: {
    color: 'blue'
  }
};

export default Discount;
