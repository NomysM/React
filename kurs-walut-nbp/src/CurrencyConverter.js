import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyConverter.css';

function CurrencyConverter() {
  const [currencyData, setCurrencyData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);
  const [searchText, setSearchText] = useState(''); // Stan wyszukiwarki

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get(
          'http://api.nbp.pl/api/exchangerates/tables/a/2023-03-14/?format=json'
        );
        setCurrencyData(response.data[0].rates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCurrencyData();
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const selectedRate = currencyData.find(
      (currency) => currency.code === selectedCurrency
    );

    if (selectedRate) {
      const exchangeRate = selectedCurrency === 'PLN' ? selectedRate.mid : 1 / selectedRate.mid;
      setResult(amount * exchangeRate);
    }
  }, [amount, selectedCurrency, currencyData]);

  const filteredCurrencies = currencyData.filter((currency) => {
    const searchString = searchText.toLowerCase();
    return (
      currency.code.toLowerCase().includes(searchString) ||
      currency.currency.toLowerCase().includes(searchString)
    );
  });

  return (
    <div className="converter-container">
      <h2>Przelicznik walut</h2>
      <div className="input-container">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="amount-input"
        />
        ZŁ na
        <select
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          className="currency-select"
        >
          {currencyData.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.currency}
            </option>
          ))}
        </select>
      </div>
      <p className="result">
        {amount} PLN to {result.toFixed(2)} {selectedCurrency}
      </p>
      <div className="search-container">
        <input
          type="text"
          placeholder="Szukaj waluty..."
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <div className="currency-table">
        <table>
          <thead>
            <tr>
              <th>Kod waluty</th>
              <th>Nazwa waluty</th>
              <th>Kurs średni</th>
            </tr>
          </thead>
          <tbody>
            {filteredCurrencies.map((currency) => (
              <tr key={currency.code}>
                <td>{currency.code}</td>
                <td>{currency.currency}</td>
                <td>{currency.mid.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CurrencyConverter;
