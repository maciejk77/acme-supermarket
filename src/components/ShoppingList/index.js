import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext';
import { products } from '../../data/productData.json';
import { completeProductInfo } from '../../utils';

// quick fix, refactor to DataContext or supply array of objects, not only array of keys e.g. basket
// to avoid another two .map() in price/description, no need to import {products} as well
// quick fix completeProductInfo import from utils
// refactor to basket obj to be {} of all product information not [] of just productCodes

const ShoppingList = () => {
  const { basket } = useContext(BasketContext);
  return basket.map((basketItemCode, idx) => (
    <div style={styles.shoppingListStyle} key={idx}>
      <div>1x ({basketItemCode})</div>
      <div>
        {completeProductInfo(products, basketItemCode).map(i => i.description)}
      </div>
      <div>
        {completeProductInfo(products, basketItemCode).map(
          i => `£${(i.price / 100).toFixed(2)}`
        )}
      </div>
    </div>
  ));
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
