import React, { useState } from 'react';
import { products } from '../../data/productData.json';

const ProductGrid = () => {
  const [basket, addToBasket] = useState([]);
  const handleClick = e => {
    addToBasket([...basket, e.target.value]);
  };

  //console.log(basket); // TO BE DELETED
  return products.map(({ productCode, description, price }) => {
    return (
      <button
        style={styles.buttonStyle}
        key={productCode}
        value={productCode}
        onClick={handleClick}
      >
        {description} £{(price / 100).toFixed(2)}
      </button>
    );
  });
};

// quick fix, temp styles to be replaced with Sass or styled components
const styles = {
  buttonStyle: {
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

// import React, { useReducer, useState } from 'react';
// import data from '../../data/productData.json';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TO_BASKET':
//       return { basketItems: [...state.basketItems, { foo: action.payload }] };
//     default:
//       return state;
//   }
//   // console.log(e.target.value);
// };

// const ProductGrid = () => {
//   const [{ basketItems }, dispatch] = useReducer(reducer, { basketItems: [] });
//   const [selectedItem, setSelectedItem] = useState();
//   console.log(basketItems);
//   return data.products.map(product => {
//     return (
//       <div>
//         <button
//           key={product.productCode}
//           value={product.productCode}
//           onClick={e => {
//             dispatch({ type: 'ADD_TO_BASKET', payload: selectedItem });
//             setSelectedItem(e.target.value);
//           }}
//         >
//           {product.description} £{(product.price / 100).toFixed(2)}
//         </button>
//         <pre>{JSON.stringify(basketItems, null, 2)}</pre>
//       </div>
//     );
//   });
// };
// export default ProductGrid;
