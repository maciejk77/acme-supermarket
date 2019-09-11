import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext/index.js';
import { products } from '../../data/productData.json';
import { completeProductInfo } from '../../utils';

const ProductGrid = () => {
  const { dispatch } = useContext(BasketContext);

  const addItem = e => {
    dispatch({
      type: 'ADD_ITEM_TO_BASKET',
      payload: completeProductInfo(products, e.target.value)
    });
  };

  return products.map(({ productCode, description }) => {
    return (
      <button
        key={productCode}
        value={productCode}
        onClick={addItem}
        style={styles.buttonStyle}
      >
        {description}
      </button>
    );
  });
};

// quick fix, temp styles to be replaced with Sass or styled components
const styles = {
  buttonStyle: {
    width: '10rem',
    border: 'none',
    padding: '1rem',
    fontSize: '1rem',
    backgroundColor: 'red',
    color: 'white',
    margin: '.5rem',
    outline: 'none'
  }
};

export default ProductGrid;
