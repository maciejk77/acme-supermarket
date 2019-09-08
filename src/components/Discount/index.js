import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext';
import { pricingRules } from '../../data/pricingRules.json';
import { getMapOfBasketItems } from '../../utils';

const Discount = () => {
  const { basket } = useContext(BasketContext);

  console.log(getMapOfBasketItems(basket));
  // console.log(pricingRules);

  const mappedBasket = getMapOfBasketItems(basket);

  return (
    <div>
      <div>Dicount 1</div>
      <div>Discount 2</div>
    </div>
  );
};

export default Discount;
