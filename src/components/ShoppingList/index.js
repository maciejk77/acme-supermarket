import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext';

const ShoppingList = () => {
  const { basket } = useContext(BasketContext);

  return basket.map((item, idx) => {
    return (
      <div style={styles.shoppingListStyle} key={idx}>
        <div>1x ({item.productCode})</div>
        <div>{item.description}</div>
        <div>{`£${(item.price / 100).toFixed(2)}`}</div>
      </div>
    );
  });
};

// quick fix, temp styles to be replaced with Sass or styled components
const styles = {
  shoppingListStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid red',
    padding: '1rem',
    fontSize: '1rem',
    color: 'red',
    margin: '.5rem'
  }
};

export default ShoppingList;
