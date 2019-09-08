import React, { useState } from 'react';
import ProductGrid from '../ProductGrid';
import ShoppingList from '../ShoppingList';
import Discount from '../Discount';
import TotalPrice from '../TotalPrice';
import { BasketContext } from '../BasketContext';
import { completeProductInfo } from '../../utils';
import { products } from '../../data/productData.json';

const Basket = () => {
  const [basket, addToBasket] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // move this hook and setter to TotalPrice, refactor needed

  const handleAddToBasketClick = e => {
    addToBasket([...basket, e.target.value]);
    setTotalPrice(
      totalPrice +
        parseInt(
          completeProductInfo(products, e.target.value).map(i => i.price)
        )
    );
  };

  return (
    <div>
      <BasketContext.Provider
        value={{
          basket,
          addToBasket,
          totalPrice,
          handleAddToBasketClick
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
