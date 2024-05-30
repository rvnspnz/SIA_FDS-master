import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('income');
  const [savings, setSavings] = useState(0);

  const { addTransaction, transactions, error, success, clearMessages } = useContext(GlobalContext);

  useEffect(() => {
    const savingsTransaction = transactions.find(transaction => transaction.type === 'savings');
    if (savingsTransaction) {
      setSavings(savingsTransaction.amount);
    }
  }, [transactions]);

  const onSubmit = e => {
    e.preventDefault();

    if (transactionType === 'use savings' && Math.abs(amount) > savings) {
      alert('Amount exceeds available savings');
      return;
    }

    const newTransaction = {
      text,
      amount: transactionType === 'expense' || transactionType === 'use savings' ? -Math.abs(amount) : Math.abs(amount),
      type: transactionType
    };

    addTransaction(newTransaction)
      .then(() => {
        setText('');
        setAmount(0);
        setTransactionType('income');
        setTimeout(() => clearMessages(), 5000);
      })
      .catch(() => {
        setTimeout(() => clearMessages(), 5000);
      });
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
          </label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <div className="form-control">
          <label>
            <input type="radio" name="transactionType" value="income" checked={transactionType === 'income'} onChange={() => setTransactionType('income')} />
            Income
          </label>
          <label>
            <input type="radio" name="transactionType" value="expense" checked={transactionType === 'expense'} onChange={() => setTransactionType('expense')} />
            Expense
          </label>
          <label>
            <input type="radio" name="transactionType" value="savings" checked={transactionType === 'savings'} onChange={() => setTransactionType('savings')} />
            Savings
          </label>
          <label>
            <input type="radio" name="transactionType" value="use savings" checked={transactionType === 'use savings'} onChange={() => setTransactionType('use savings')} />
            Use Savings
          </label>
        </div>
        <button className="btn">Add transaction</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </>
  );
};
