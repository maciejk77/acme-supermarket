import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext';

const ShoppingList = () => {
  const { basket } = useContext(BasketContext);
  return basket.map((basketItem, idx) => <div key={idx}>{basketItem}</div>);
};

export default ShoppingList;
