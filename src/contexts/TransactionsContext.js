import { createContext, useContext, useState, useEffect } from "react";

const TransactionsContext = createContext();

export const useTransactions = () => {
  return useContext(TransactionsContext);
};

export const TransactionsProvider = ({ children, walletAddresses }) => {
  const [transactions, setTransactions] = useState([]);
  const [walletBalances, setWalletBalances] = useState({});

  useEffect(() => {
    const initialBalances = {};
    for (const address of walletAddresses) {
      initialBalances[address] = 10000.0;
    }
    setWalletBalances(initialBalances);
  }, [walletAddresses]);

  const addTransaction = (transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);

    setWalletBalances((prevBalances) => {
      let fromBalance = prevBalances[transaction.from] || 0;
      let toBalance = prevBalances[transaction.to] || 0;

      if (transaction.status === "SUCCESS") {
        fromBalance -= parseFloat(transaction.amount) + transaction.gasUsed; // Deduct transaction amount and gas fees
        toBalance += parseFloat(transaction.amount); // Add the transaction amount
      } else if (transaction.status === "FAILED") {
        // const tgas = transaction.gasUsed * 1e-9;
        fromBalance -= transaction.gasUsed; // Deduct only the gas fees
      }

      return {
        ...prevBalances,
        [transaction.from]: fromBalance,
        [transaction.to]: toBalance,
      };
    });
  };

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, walletBalances, walletAddresses }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
