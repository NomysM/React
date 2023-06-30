import React from 'react';

function CurrencyTable({ currencyData }) {
  if (!currencyData || currencyData.length === 0) {
    return <p>2023-03-14</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nazwa waluty</th>
          <th>Kod waluty</th>
          <th>Kurs średni</th>
        </tr>
      </thead>
      <tbody>
        {currencyData.map((currency) => (
          <tr key={currency.code}>
            <td>{currency.currency}</td>
            <td>{currency.code}</td>
            <td>{currency.mid}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CurrencyTable;
