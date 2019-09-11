import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext';

const ShoppingList = () => {
  const { uniqueBasket, count } = useContext(BasketContext);

  return uniqueBasket.map(({ productCode, description, price }) => {
    const countForItem = count[productCode];

    return (
      <div style={styles.shoppingListStyle} key={productCode}>
        <div>
          {countForItem}x ({productCode})
        </div>
        <div>{description}</div>
        <div>{`£${(countForItem * (price / 100)).toFixed(2)}`}</div>
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
