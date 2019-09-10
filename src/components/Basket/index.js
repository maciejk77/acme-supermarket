import React, { useReducer } from 'react';
import ProductGrid from '../ProductGrid';
import ShoppingList from '../ShoppingList';
// import Discount from '../Discount';
import TotalPrice from '../TotalPrice';
import { BasketContext } from '../BasketContext';
import { products } from '../../data/productData.json';
import { completeProductInfo } from '../../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_BASKET':
      return {
        basket: [...state.basket, action.payload],
        total: [
          ...state.total,
          completeProductInfo(products, action.payload).map(i => i.price)
        ]
      };
    // case 'REMOVE_ITEM_FROM_BASKET':
    //   // to be completed
    default:
      state;
  }
};

const Basket = () => {
  const [{ basket, total }, dispatch] = useReducer(reducer, {
    basket: [],
    total: []
  });
  return (
    <div>
      <BasketContext.Provider
        value={{
          basket,
          total,
          dispatch
        }}
      >
        <ProductGrid />
        <ShoppingList />
        {/* <Discount /> */}
        <TotalPrice />
      </BasketContext.Provider>
    </div>
  );
};

export default Basket;
