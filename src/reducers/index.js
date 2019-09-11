export const basketReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_BASKET':
      return {
        basket: state.basket.concat(action.payload)
      };
    // case 'REMOVE_ITEM_FROM_BASKET': {}
    default:
      state;
  }
};
