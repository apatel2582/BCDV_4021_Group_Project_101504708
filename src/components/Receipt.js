import React from "react";

function Receipt(props) {
  // Destructuring the passed props
  const { transactionHash, blockHash, blockNumber, from, to, gasUsed } =
    props.data;

  return (
    <div>
      <h2>Receipt</h2>
      <ul>
        <li>
          <strong>Transaction Hash:</strong> {transactionHash}
        </li>
        <li>
          <strong>Block Hash:</strong> {blockHash}
        </li>
        <li>
          <strong>Block Number:</strong> {blockNumber}
        </li>
        <li>
          <strong>From:</strong> {from}
        </li>
        <li>
          <strong>To:</strong> {to}
        </li>
        <li>
          <strong>Gas Used:</strong> {gasUsed}
        </li>
      </ul>
    </div>
  );
}

export default Receipt;
