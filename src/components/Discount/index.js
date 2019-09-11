import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext';
import { pricingRules } from '../../data/pricingRules.json';

const Discount = () => {
  const { uniqueBasket, count } = useContext(BasketContext);
  console.log('count ==> ', count);
  console.log('uniqueBasket ==> ', uniqueBasket);
  // console.log(
  //   'pricingRules ==> ',
  //   pricingRules[0].productCode,
  //   pricingRules[0].buyXgetYFree.MinNumOfItemsNeeded
  // );
  console.log(
    'pricingRules ==> ',
    pricingRules[1].productCode,
    pricingRules[1].discount.percentage,
    pricingRules[1].discount.MinNumOfItemsNeeded
  );

  // Buy1Get1Free discount rules for FR1
  const ruleA = pricingRules[0].buyXgetYFree.MinNumOfItemsNeeded;
  const itemA = count['FR1'];
  //const productCodeA = pricingRules[0].productCode;

  const discountA =
    itemA % ruleA === 0
      ? Math.abs((itemA / ruleA) * 3.11)
      : Math.abs(((itemA - 1) / ruleA) * 3.11);

  // Discount rules for SR1
  const ruleB = pricingRules[1].discount.MinNumOfItemsNeeded;
  const percentage = pricingRules[1].discount.percentage;
  const itemB = count['SR1'];
  //const productCodeB = pricingRules[1].productCode;

  const discountB =
    itemB % ruleB === 0
      ? itemB * (percentage / 100) * 5.0
      : itemB % ruleB !== 0
      ? (itemB - (itemB % ruleB)) * (percentage / 100) * 5.0
      : 0;

  return (
    <div>
      <div>FR1 -£{discountA.toFixed(2)}</div>
      <div>SR1 -£{discountB.toFixed(2)}</div>
    </div>
  );
};

export default Discount;
