import React from 'react';
import data from '../../data/productData.json';

const ProductGrid = () => {
  const handleClick = e => {
    console.log(e.target.value);
  };

  return data.products.map(product => {
    return (
      <button
        onClick={handleClick}
        key={product.productCode}
        value={product.productCode}
      >
        {product.description} £{(product.price / 100).toFixed(2)}
      </button>
    );
  });
};
export default ProductGrid;
