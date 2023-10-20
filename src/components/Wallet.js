import React from "react";
import { useTransactions } from "../contexts/TransactionsContext";

function Wallet() {
  const { walletBalances } = useTransactions();

  if (!walletBalances) {
    return <p>Loading wallet details...</p>;
  }

  return (
    <div>
      <h2>Wallet Details</h2>
      <ul>
        {Object.entries(walletBalances).map(([address, balance]) => (
          <li key={address}>
            <div>
              <strong>Address:</strong> {address}
            </div>
            <div>
              <strong>Balance:</strong> {balance} ETH
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wallet;
