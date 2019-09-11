import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext';
import { getMapOfBasketItems } from '../../utils';

const ShoppingList = () => {
  const { basket } = useContext(BasketContext);

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

  return uniqueBasket.map((item, idx) => {
    const countForItem = count[item.productCode];
    return (
      <div style={styles.shoppingListStyle} key={idx}>
        <div>
          {countForItem}x ({item.productCode})
        </div>
        <div>{item.description}</div>
        <div>{`£${(countForItem * (item.price / 100)).toFixed(2)}`}</div>
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
