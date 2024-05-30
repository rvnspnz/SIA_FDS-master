import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  // Calculate income
  const income = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);

  // Calculate expenses (including use savings)
  const expenses = Math.abs(transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0))
    .toFixed(2);

  // Calculate savings
  const savings = transactions
    .filter(transaction => transaction.type === 'savings')
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">₱{numberWithCommas(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">₱{numberWithCommas(expenses)}</p>
      </div>
      <div>
        <h4>Savings</h4>
        <p className="money savings">₱{numberWithCommas(savings)}</p>
      </div>
    </div>
  );
};
