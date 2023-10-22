import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { faker } from "@faker-js/faker";
import TransactionHistory from "./components/TransactionHistory";
import Addresses from "./components/Addresses";
import Transfer from "./components/Transfer";
import Wallet from "./components/Wallet";
import InitialPage from "./components/InitialPage";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import "./App.css";

function App() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const generatedAddresses = [];
    for (let i = 0; i < 10; i++) {
      generatedAddresses.push(faker.finance.ethereumAddress());
    }
    setAddresses(generatedAddresses);
  }, []);

  return (
    <Router>
      <TransactionsProvider walletAddresses={addresses}>
        <>
          <nav>
            <ul className="NavTab">
            <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
              <li>
                <Link to="/addresses">Addresses</Link>
              </li>
              <li>
                <Link to="/wallet">Wallet</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/transactions" element={<TransactionHistory />} />
            <Route
              path="/addresses"
              element={<Addresses addresses={addresses} />}
            />
            <Route
              path="/transfer/:nodeAddress"
              element={<Transfer availableAddresses={addresses} />}
            />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/" element={<InitialPage />} />
          </Routes>
        </>
      </TransactionsProvider>
    </Router>
  );
}

export default App;
