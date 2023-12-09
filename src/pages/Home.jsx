import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedValues, setConvertedValues] = useState([]);

  useEffect(() => {
    // Fetch the list of supported currencies
    axios.get(`http://data.fixer.io/api/symbols?access_key=455a4e4ca3667d593dee17ce19d62331`)
      .then(response => {
        const currencies = Object.keys(response.data.symbols);
        setCurrencies(currencies);
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch the conversion rates for the selected currencies
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
  }, [fromCurrency, toCurrency, amount]);

  const handleConvert = () => {
    // Perform the conversion
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
  };

  const handleSwapCurrencies = () => {
    // Swap the selected currencies
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div>
      <header className="sticky top-0 flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="flex items-center">
          <img src="data:image/jpeg;base64,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" alt="Logo" className="mr-2 w-7" />
          <span>EUR-USD Details</span>
        </div>
        <div>
          <span className="mr-4">EUR-USD Details</span>
          <span>EUR-GBP Details</span>
        </div>
      </header>
      <div className="flex flex-col items-center mt-8">
        {/* Converter Sticky Panel */}
        <div className="sticky top-0 p-4 bg-gray-200">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mr-2 px-2 py-1 border"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="mr-2 px-2 py-1 border"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="mr-2 px-2 py-1 border"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
          <button
            onClick={handleSwapCurrencies}
            className="mr-2 px-2 py-1 bg-blue-500 text-white"
          >
            Swap
          </button>
          <button
            onClick={handleConvert}
            className="px-2 py-1 bg-blue-500 text-white"
          >
            Convert
          </button>
        </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {convertedValues.map((conversion, index) => (
            <div key={index} className="p-4 border text-black">
              <p>{`${conversion.from} to ${conversion.to}`}</p>
              <p>{`Converted Value: ${conversion.value}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
