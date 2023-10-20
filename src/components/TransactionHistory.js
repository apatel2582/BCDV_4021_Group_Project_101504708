import React from "react";
import { useTransactions } from "../contexts/TransactionsContext";

function TransactionHistory() {
  const { transactions } = useTransactions();

  return (
    <div>
      <h2>Transaction History</h2>
      {transactions.map((transaction) => (
        <div key={transaction.receiptHash} className="transaction-entry">
          <p>
            <strong>Transaction Hash:</strong> {transaction.transactionHash}
          </p>
          <p>
            <strong>Status:</strong> {transaction.status}
          </p>
          <p>
            <strong>Timestamp:</strong> {transaction.createdAt}
          </p>
          <p>
            <strong>From:</strong> {transaction.from}
          </p>
          <p>
            <strong>To:</strong> {transaction.to}
          </p>
          <p>
            <strong>Value:</strong> {transaction.amount} ETH
          </p>
          <p>
            <strong>Gas Used:</strong> {transaction.gasUsed}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default TransactionHistory;
