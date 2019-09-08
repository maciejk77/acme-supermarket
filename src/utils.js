export const getMapOfBasketItems = basket => {
  const basketItemsMap = {};

  // loop over basket items
  for (let item of basket) {
    if (basketItemsMap[item]) {
      // if item key already exists, increment value
      basketItemsMap[item]++;
    } else {
      // else item key does not exist yet, create and set value to 1
      basketItemsMap[item] = 1;
    }
  }
  // return the newly mapped object i.e. {CF1: 7, SR1: 1, FR1: 2}
  return basketItemsMap;
};
