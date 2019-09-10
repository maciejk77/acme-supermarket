import React, { useContext } from 'react';
import { products } from '../../data/productData.json';
import { BasketContext } from '../BasketContext/index.js';

const ProductGrid = () => {
  const { dispatch } = useContext(BasketContext);

  const handleClick = e => {
    dispatch({ type: 'ADD_ITEM_TO_BASKET', payload: e.target.value });
  };

  return products.map(({ productCode, description }) => {
    return (
      <button
        key={productCode}
        value={productCode}
        onClick={handleClick}
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

// ====== TO BE DELETED =========================================

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
