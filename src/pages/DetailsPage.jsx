import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const DetailsPage = ({ fromCurrency, toCurrency, amount }) => {
  const [convertedValues, setConvertedValues] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    // Fetch conversion rates for the selected currencies
    axios.get(`http://data.fixer.io/api/latest`, {
      params: {
        access_key: '455a4e4ca3667d593dee17ce19d62331',
        base: fromCurrency,
        symbols: toCurrency,
      },
    })
      .then(response => {
        const rate = response.data.rates[toCurrency];
        const convertedValue = (amount * rate).toFixed(2);
        setConvertedValues([{ from: fromCurrency, to: toCurrency, value: convertedValue }]);
      })
      .catch(error => {
        console.error('Error fetching conversion rates:', error);
      });

    // Fetch historical data for the selected currencies (you need to implement this API endpoint)
    axios.get(`http://your-historical-data-api-endpoint`, {
      params: {
        fromCurrency,
        toCurrency,
      },
    })
      .then(response => {
        setHistoricalData(response.data); // Update with the actual response structure
      })
      .catch(error => {
        console.error('Error fetching historical data:', error);
      });
  }, [fromCurrency, toCurrency, amount]);

  // Add a function to handle currency change and conversion

  return (
    <div>
      <header className="sticky top-0 flex justify-between items-center p-4 bg-gray-800 text-white">
        <div>
          <span>{`${fromCurrency} Details`}</span>
        </div>
        <div>
          <Link to="/">Go Back</Link>
        </div>
      </header>
      <div className="flex flex-col items-center mt-8">
        {/* Sticky Converter Panel */}
        <div className="sticky top-0 p-4 bg-gray-200">
          {/* Include necessary input elements with pre-selected values */}
          {/* Add logic to disable 'From' dropdown and hide the details button */}
          {/* Add logic to update 'To' dropdown and trigger conversion */}
        </div>
        {/* Chart for Historical Data */}
        <div className="mt-4">
          {/* Implement a chart component to display historical data */}
          {/* Use the 'historicalData' state to render the chart */}
        </div>
        {/* Converted Values */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {convertedValues.map((conversion, index) => (
            <div key={index} className="p-4 border text-white">
              <p>{`${conversion.from} to ${conversion.to}`}</p>
              <p>{`Converted Value: ${conversion.value}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
