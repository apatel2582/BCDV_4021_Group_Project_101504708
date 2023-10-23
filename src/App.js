import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { faker } from "@faker-js/faker";
import TransactionHistory from "./components/TransactionHistory";
import Addresses from "./components/Addresses";
import Transfer from "./components/Transfer";
import Wallet from "./components/Wallet";
import InitialPage from "./components/InitialPage";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import { createSvgIcon } from '@mui/material/utils';
import { Home as HomeIcon, Receipt as ReceiptIcon, Paid as PaidIcon, Wallet as WalletIcon } from '@mui/icons-material';

import "./App.css";

function App() {
  const [addresses, setAddresses] = useState([]);
  const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    'Home',
  );

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
              <div className="icon-link-container">
                <HomeIcon />
                <Link to="/">Home</Link>
              </div>
              </li>
              <li>
                <div className="icon-link-container">
                  <ReceiptIcon />
                  <Link to="/transactions">Transactions</Link>
                </div>
              </li>
              <li>
                <div className="icon-link-container">
                  <PaidIcon />
                  <Link to="/addresses">Addresses</Link>
                </div>
              </li>
              <li>
                <div className="icon-link-container">
                  <WalletIcon />
                  <Link to="/wallet">Wallet</Link>
                </div>
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
