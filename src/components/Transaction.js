import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const serverUrl = "https://ricemill-server.onrender.com";

const TransactionDisplay = () => {
  const [buyData, setBuyData] = useState([]);
  const [sellData, setSellData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${serverUrl}/products`);
        const data = await response.json();

        // Separate data based on transaction type
        const buyTransactions = data.filter((item) => item.transactiontype === 'buy');
        const sellTransactions = data.filter((item) => item.transactiontype === 'sell');

        setBuyData(buyTransactions);
        setSellData(sellTransactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderTransactionTable = (transactions) => {
    return transactions.length > 0 ? (
      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rice Type</th>
              <th>Quantity</th>
              <th>Transaction Type</th>
              <th>Price per Bag</th> {/* New column for price */}
              <th>Time of Transaction</th>
              <th>Date of Transaction</th>
              <th>Day of Transaction</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, index) => (
              <tr key={index}>
                <td data-label="Name">{item.name}</td>
                <td data-label="Rice Type">{item.ricetype}</td>
                <td data-label="Quantity">{item.quantity}</td>
                <td data-label="Transaction Type">{item.transactiontype}</td>
                <td data-label="Price per Bag">{item.price}</td> {/* Display price */}
                <td data-label="Time of Transaction">{new Date(item.createdAt).toLocaleTimeString()}</td>
                <td data-label="Date of Transaction">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td data-label="Day of Transaction">{getDayOfWeek(new Date(item.createdAt).getDay())}</td>
                <td data-label="Action">
                  <button onClick={() => printBill(item)}>Print Bill</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>Loading...</p>
    );
  };

  const getDayOfWeek = (dayIndex) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayIndex];
  };

  const printBill = (transaction) => {
    const printWindow = window.open('', '_blank');

    const billContent = `
    <html>
    <head>
      <title>Transaction Bill</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    </head>
    <body>
      <div class="bill-container">
        <div class="shop-name">Sri Vinayaka Rice Mill, Somwarpet-571236</div>
        <h2>Transaction Details</h2>
        <div class="transaction-details">
          <p><strong>Name:</strong> ${transaction.name}</p>
          <p><strong>Rice Type:</strong> ${transaction.ricetype}</p>
          <p><strong>Quantity:</strong> ${transaction.quantity}</p>
          <p><strong>Transaction Type:</strong> ${transaction.transactiontype}</p>
          <p><strong>Price Per Bag:</strong> ${transaction.price}</p>
          <p><strong>Time of Transaction:</strong> ${new Date(transaction.createdAt).toLocaleTimeString()}</p>
          <p><strong>Date of Transaction:</strong> ${new Date(transaction.createdAt).toLocaleDateString()}</p>
          <p><strong>Day of Transaction:</strong> ${getDayOfWeek(new Date(transaction.createdAt).getDay())}</p>
        </div>
      </div>
    </body>
  </html>
    `;

    printWindow.document.write(billContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <div>
        <h2 className="bg-primary text-white p-2">New Stock</h2>
        {renderTransactionTable(buyData)}
      </div>

      <div>
        <h2 className="bg-success text-white p-2">Stock Sold</h2>
        {renderTransactionTable(sellData)}
      </div>
    </div>
  );
};

export default TransactionDisplay;
