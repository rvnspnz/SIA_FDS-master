import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const total = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      return acc + transaction.amount;
    } else if (transaction.type === 'expense' || transaction.type === 'savings' || transaction.type === 'use savings') {
      return acc - Math.abs(transaction.amount);
    }
    return acc; // For any other types of transactions
  }, 0).toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>₱{numberWithCommas(total)}</h1>
    </>
  );
};
