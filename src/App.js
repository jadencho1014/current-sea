import React, { useState, useEffect } from "react";
import "./App.css";
import CurrencyInput from "./components/CurrencyInput";
import axios from "axios";

function App() {
  const [firstAmount, setFirstAmount] = useState(1);
  const [secondAmount, setSecondAmount] = useState(1);
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("CAD");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get("https://api.exchangerate.host/latest").then((response) => {
      setRates(response.data.rates);
    });
  }, []);

  useEffect(() => {
    if (!!rates) {
      handleFirstAmountChange(1);
    }
  }, [rates]);

  const format = (num) => {
    return Math.round(num * 10000) / 10000;
  };

  const handleFirstAmountChange = (firstAmount) => {
    setSecondAmount(
      format((firstAmount * rates[secondCurrency]) / rates[firstCurrency])
    );
    setFirstAmount(firstAmount);
  };

  const handleFirstCurrencyChange = (firstCurrency) => {
    setSecondAmount(
      format((firstAmount * rates[secondCurrency]) / rates[firstCurrency])
    );
    setFirstCurrency(firstCurrency);
  };

  const handleSecondAmountChange = (secondAmount) => {
    setFirstAmount(
      format((secondAmount * rates[firstCurrency]) / rates[secondCurrency])
    );
    setSecondAmount(secondAmount);
  };

  const handleSecondCurrencyChange = (secondCurrency) => {
    setFirstAmount(
      format((secondAmount * rates[firstCurrency]) / rates[secondCurrency])
    );
    setSecondCurrency(secondCurrency);
  };

  return (
    <div>
      <h1>Current-Sea</h1>
      <h2>Convert currency at current exchange rates!</h2>
      <CurrencyInput
        onAmountChange={handleFirstAmountChange}
        onCurrencyChange={handleFirstCurrencyChange}
        currencies={Object.keys(rates)}
        amount={firstAmount}
        currency={firstCurrency}
      />
      <h2 className="equals">=</h2>
      <CurrencyInput
        onAmountChange={handleSecondAmountChange}
        onCurrencyChange={handleSecondCurrencyChange}
        currencies={Object.keys(rates)}
        amount={secondAmount}
        currency={secondCurrency}
      />
    </div>
  );
}

export default App;
