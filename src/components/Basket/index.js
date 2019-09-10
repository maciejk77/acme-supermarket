import React, { useReducer } from 'react';
import ProductGrid from '../ProductGrid';
import ShoppingList from '../ShoppingList';
// import Discount from '../Discount';
import TotalPrice from '../TotalPrice';
import { BasketContext } from '../BasketContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_BASKET':
      return {
        basket: state.basket.concat(action.payload)
      };
    // case 'REMOVE_ITEM_FROM_BASKET': {}
    default:
      state;
  }
};

const Basket = () => {
  const [{ basket }, dispatch] = useReducer(reducer, { basket: [] });
  return (
    <div>
      <BasketContext.Provider
        value={{
          basket,
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
