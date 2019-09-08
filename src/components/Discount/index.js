import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext';
import { pricingRules } from '../../data/pricingRules.json';
import { getMapOfBasketItems } from '../../utils';
//import { getDiscountData } from '../../utils';

const Discount = () => {
  const { basket } = useContext(BasketContext);

  // get pricing rule provided productCode
  const getPricingRulesForProductCode = productCode => {
    const rule = pricingRules.filter(rule => rule.productCode === productCode);
    const ruleKeys = rule.map(r => Object.keys(r));
    if (ruleKeys.includes('buyXgetYFree')) {
      return rule.map(r => r.buyXgetYFree.MinNumOfItemsNeeded);
    }
  };

  // return mapped basket with no of items per productCode
  const mappedBasket = getMapOfBasketItems(basket);

  return basket.map((item, idx) => {
    return (
      <div key={idx}>
        {/* {item} */}
        {/* <pre>{JSON.stringify(getPricingRulesForProductCode(item))}</pre>
        <pre>{JSON.stringify(mappedBasket)}</pre> */}
      </div>
    );
  });

  // pricing rule to be passed to disdount setting function
  const pricingRule = getPricingRulesForProductCode('FR1');

  // // return mapped basket with no of items per productCode
  // const mappedBasket = getMapOfBasketItems(basket);

  // discount based on pricing rule and looping over mappedBasket
  const discount = getDiscountData(mappedBasket, pricingRule);
};

export default Discount;
