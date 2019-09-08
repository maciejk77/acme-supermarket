import React, { useContext } from 'react';
import { BasketContext } from '../BasketContext';

const TotalPrice = () => {
  const { totalPrice } = useContext(BasketContext);

  const formatter = number => (number / 100).toFixed(2);
  const total = formatter(totalPrice);
  const discount = formatter(0);
  const totalAfterDiscount = total - discount;

  return (
    <div style={styles.totalPrice}>
      <div>Total: £{total}</div>
      <div>Discount: - £{discount}</div>
      <div style={styles.totalAfterDiscount}>
        Total (after discount): £{totalAfterDiscount}
      </div>
    </div>
  );
};

const styles = {
  totalPrice: {
    border: '1px solid blue',
    lineHeight: '1.5rem',
    padding: '1rem 2rem',
    fontSize: '1rem',
    color: 'blue',
    margin: '.5rem',
    outline: 'none'
  },
  totalAfterDiscount: {
    borderTop: '.15rem solid blue',
    paddingTop: '.5rem'
  }
};

export default TotalPrice;