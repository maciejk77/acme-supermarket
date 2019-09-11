import React, { useReducer } from 'react';
import ProductGrid from '../ProductGrid';
import ShoppingList from '../ShoppingList';
import Discount from '../Discount';
import TotalPrice from '../TotalPrice';
import { BasketContext } from '../BasketContext';
import { getMapOfBasketItems } from '../../utils';
import { basketReducer } from '../../reducers';

const Basket = () => {
  // basket and dispatch reducer method to update state
  const [{ basket }, dispatch] = useReducer(basketReducer, { basket: [] });

  // map of each productCode count
  const count = getMapOfBasketItems(basket.map(el => el.productCode));

  // unique productCodes
  const uniqueKeys = Object.keys(count);
  // uniqueBasket, only one object per productCode
  const uniqueBasket = uniqueKeys.reduce(
    (uniqueBasket, item) =>
      uniqueBasket.concat(basket.find(el => el.productCode === item)),
    []
  );

  return (
    <div>
      <BasketContext.Provider
        value={{
          basket,
          uniqueBasket,
          count,
          dispatch
        }}
      >
        <ProductGrid />
        <ShoppingList />
        <Discount />
        <TotalPrice />
      </BasketContext.Provider>
    </div>
  );
};

export default Basket;
