import React, { useState, useEffect } from 'react';
import GoogleChart from 'react-google-charts';

const DataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const aggregateData = () => {
    const aggregatedData = {};
    data.forEach((item) => {
      const { ricetype, quantity, transactiontype } = item;
      if (aggregatedData[ricetype]) {
        if (transactiontype === 'buy') {
          aggregatedData[ricetype].quantity += quantity;
        } else if (transactiontype === 'sell') {
          aggregatedData[ricetype].quantity -= quantity;
        }
        aggregatedData[ricetype].transactiontype = transactiontype;
      } else {
        aggregatedData[ricetype] = { quantity, transactiontype };
      }
    });
    return aggregatedData;
  };

  const aggregatedData = aggregateData();

  const chartData = [
    ['Rice Type', 'Aggregated Quantity'],
    ...Object.keys(aggregatedData).map((ricetype) => [ricetype, aggregatedData[ricetype].quantity]),
  ];

  const options = {
    title: 'Aggregated Rice Quantity',
    hAxis: { title: 'Rice Type' },
    vAxis: { title: 'Aggregated Quantity' },
  };

  return (
    <div className='chart'>
      <h2>Different Rice in Godown</h2>
      <GoogleChart
        chartType="Bar"
        width="100%"
        height="100%"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default DataDisplay;
