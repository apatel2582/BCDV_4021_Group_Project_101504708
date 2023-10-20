import React from "react";
import { Link } from "react-router-dom";

function Addresses({ addresses }) {
  return (
    <div>
      <h2>Blockchain Node Addresses</h2>
      <ul>
        {addresses.map((address) => (
          <li key={address}>
            <Link to={`/transfer/${address}`}>{address}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Addresses;
