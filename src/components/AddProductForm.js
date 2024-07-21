import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProductform = () => {
  const [name, setName] = useState('');
  const [ricetype, setRice_Type] = useState('');
  const [quantity, setQuantity] = useState('');
  const [transactiontype, setTransactionType] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name, ricetype, quantity, transactiontype, price);

    let result = await fetch('http://localhost:5000/add-product', {
      method: 'post',
      body: JSON.stringify({ name, ricetype, quantity, transactiontype, price }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    result = await result.json(); // Assuming the server responds with JSON
    console.warn(result);

    if (result) {
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/ChartComponent');
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Buy/Sell Stock</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="Enter Seller name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="productType" className="form-label">
              Type
            </label>
            <input
              type="text"
              className="form-control"
              id="productType"
              placeholder="Enter Rice type"
              value={ricetype}
              onChange={(e) => {
                setRice_Type(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              placeholder="Enter quantity (In Bags)"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="transactionType" className="form-label">
              Transaction Type
            </label>
            <select
              className="form-select"
              id="transactionType"
              value={transactiontype}
              onChange={(e) => {
                setTransactionType(e.target.value);
              }}
              required
            >
              <option value="" disabled>
                Select transaction type
              </option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Enter price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductform;
