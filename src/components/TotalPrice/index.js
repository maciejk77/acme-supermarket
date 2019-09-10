import React, { useContext, Fragment } from 'react';
import { BasketContext } from '../BasketContext';
import { formatToDecimal } from '../../utils';

const TotalPrice = () => {
  const { total } = useContext(BasketContext);
  const reduceTotal = total.reduce((sum, price) => {
    return parseInt(sum) + parseInt(price);
  }, 0);

  const totalValue = formatToDecimal(reduceTotal, 2);
  const discount = formatToDecimal(0, 2);
  const totalAfterDiscount = (totalValue - discount).toFixed(2);

  return (
    <div style={styles.totalPrice}>
      {reduceTotal ? (
        <Fragment>
          <div>Total: £{totalValue}</div>
          <div>Discount: -£{discount}</div>
          <div style={styles.totalAfterDiscount}>
            Total (after discount): £{totalAfterDiscount}
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

const styles = {
  totalPrice: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    backgroundColor: 'white',
    lineHeight: '1.5rem',
    padding: '.5rem',
    fontSize: '1rem',
    color: 'black',
    margin: '.5rem',
    outline: 'none'
  },
  totalAfterDiscount: {
    fontSize: '1.1rem',
    paddingTop: '.5rem',
    borderTop: '.1rem solid black'
  }
};

export default TotalPrice;
