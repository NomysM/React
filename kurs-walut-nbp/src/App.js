import React from 'react';
import './App.css';
import CurrencyConverter from './CurrencyConverter';
import CurrencyTable from './CurrencyTable';

function App() {
  return (
    <div>
      <h1>Kursy walut NBP na 2023-03-14</h1>
      <CurrencyConverter />
    </div>
  );
}

export default App;
