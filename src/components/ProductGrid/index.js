import React from 'react';
import data from '../../data/productData.json';

const ProductGrid = () => {
  return data.products.map(product => {
    return (
      <button key={product.productCode}>
        {product.description} £{(product.price / 100).toFixed(2)}
      </button>
    );
  });
};
export default ProductGrid;
