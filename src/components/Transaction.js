import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const TransactionDisplay = () => {
  const [buyData, setBuyData] = useState([]);
  const [sellData, setSellData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
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
              <td>{item.name}</td>
              <td>{item.ricetype}</td>
              <td>{item.quantity}</td>
              <td>{item.transactiontype}</td>
              <td>{item.price}</td> {/* Display price */}
              <td>{new Date(item.createdAt).toLocaleTimeString()}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>{getDayOfWeek(new Date(item.createdAt).getDay())}</td>
              <td>
                <button onClick={() => printBill(item)}>Print Bill</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>Loading...</p>
    );
  };

  // Function to get the day of the week as a string
  const getDayOfWeek = (dayIndex) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayIndex];
  };

  // Function to print the bill
  const printBill = (transaction) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');

    // HTML content for the bill
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

    // Set the HTML content for the new window
    printWindow.document.write(billContent);

    // Close the document after writing
    printWindow.document.close();

    // Print the bill
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
