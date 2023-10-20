import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Receipt from "./Receipt";
import CryptoJS from "crypto-js";
import { faker } from "@faker-js/faker";
import { useTransactions } from "../contexts/TransactionsContext";

function Transfer({ availableAddresses }) {
  const [amount, setAmount] = useState("");
  const { nodeAddress } = useParams();

  // Use the first address from the available addresses as the source account.
  const sourceAccount = nodeAddress;
  const { addTransaction, walletBalances } = useTransactions();

  // If nodeAddress is provided, use it. Otherwise, use the first address from the list that is not the sourceAccount.
  // Set the initial value to an empty string
  const [destinationAccount, setDestinationAccount] = useState("");

  const [transactionData, setTransactionData] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showToggleButton, setShowToggleButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a random gas price between 1 and 200 Gwei
    const gasPrice = Math.floor(Math.random() * 200) + 1;
    const gasUsed = 21000; // This remains constant for our case
    const t2gas = gasUsed * 1e-9;
    const transactionFee = gasPrice * gasUsed * 1e-9; // Convert from Gwei to ETH

    // Check for sufficient balance
    if (walletBalances[sourceAccount] < parseFloat(amount) + transactionFee) {
      const insufficientFundsTransaction = {
        transactionHash: CryptoJS.SHA256(faker.string.uuid()).toString(),
        blockHash: "N/A",
        blockNumber: "N/A",
        from: sourceAccount,
        to: destinationAccount,
        amount: amount,
        gasUsed: t2gas,
        createdAt: new Date().toISOString(),
        status: "FAILED",
      };

      setTransactionData(insufficientFundsTransaction);
      setShowToggleButton(true);
      setShowReceipt(true);
      addTransaction(insufficientFundsTransaction);
      return;
    }

    const currentTimestamp = new Date().toISOString();

    const mockTransaction = {
      transactionHash: CryptoJS.SHA256(faker.string.uuid()).toString(),
      blockHash: CryptoJS.SHA256(faker.string.uuid()).toString(),
      blockNumber: faker.number.int(),
      from: sourceAccount,
      to: destinationAccount,
      amount: amount,
      gasUsed: transactionFee,
      createdAt: currentTimestamp,
      status: "SUCCESS",
    };

    setTransactionData(mockTransaction);
    setShowToggleButton(true);
    setShowReceipt(true);
    addTransaction(mockTransaction);
  };

  const toggleReceiptVisibility = () => {
    setShowReceipt(!showReceipt);
  };

  return (
    <div>
      <h2>Transfer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            From:
            <span>{sourceAccount}</span>
          </label>
        </div>
        <div>
          <label>
            To:
            <select
              value={destinationAccount}
              onChange={(e) => setDestinationAccount(e.target.value)}
              required // Ensure the user selects a value
            >
              {/* Add a default option prompting user to select an address */}
              <option value="" disabled>
                Select an address
              </option>
              {availableAddresses.map(
                (address) =>
                  address !== sourceAccount && (
                    <option key={address} value={address}>
                      {address}
                    </option>
                  )
              )}
            </select>
          </label>
        </div>
        <div>
          <label>
            Amount:
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="--"
            />
          </label>
        </div>
        <div>
          <button type="submit" disabled={!destinationAccount}>
            Submit
          </button>
        </div>
      </form>

      {showToggleButton && (
        <button onClick={toggleReceiptVisibility}>Toggle Receipt</button>
      )}

      {showReceipt && <Receipt data={transactionData} />}
    </div>
  );
}

export default Transfer;
