import React, { useState } from 'react';
import ProductGrid from '../ProductGrid';
import ShoppingList from '../ShoppingList';
import Discount from '../Discount';
import { BasketContext } from '../BasketContext';

const Basket = () => {
  const [basket, addToBasket] = useState([]);
  const handleAddToBasketClick = e => {
    addToBasket([...basket, e.target.value]);
  };
  console.log(basket); // ================= TO BE DELETED ============================
  return (
    <div>
      <BasketContext.Provider
        value={{ basket, addToBasket, handleAddToBasketClick }}
      >
        <ProductGrid />
        <ShoppingList />
        <Discount />
      </BasketContext.Provider>
    </div>
  );
};

export default Basket;
