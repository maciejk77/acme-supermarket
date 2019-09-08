import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext';

const ShoppingList = () => {
  const { basket } = useContext(BasketContext);
  return basket.map((basketItem, idx) => (
    <div style={styles.shoppingListStyle} key={idx}>
      {basketItem}
    </div>
  ));
};

// quick fix, temp styles to be replaced with Sass or styled components
const styles = {
  shoppingListStyle: {
    border: '1px solid red',
    padding: '1rem',
    fontSize: '1rem',
    color: 'red',
    margin: '.5rem'
  }
};

export default ShoppingList;
