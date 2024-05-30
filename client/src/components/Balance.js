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

  const balanceStyle = {
    color: total < 0 ? 'red' : 'black'
  };

  return (
    <>
      <h4>Your Balance</h4>
      <h1 style={balanceStyle}>₱{numberWithCommas(total)}</h1>
    </>
  );
};
