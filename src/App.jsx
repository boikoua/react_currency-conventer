import { useRef, useState } from 'react';
import './App.scss';
import Block from './components/Block/Block';
import { useEffect } from 'react';

function App() {
  const [fromCurrency, setFromCurrency] = useState('uah');
  const [toCurrency, setToCurrency] = useState('usd');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  const ratesRef = useRef({});

  useEffect(() => {
    fetch(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json'
    )
      .then((response) => response.json())
      .then((ratesFromServer) => (ratesRef.current = ratesFromServer.eur))
      .catch((e) => alert(e));
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];

    if (!isNaN(result)) {
      setToPrice(result.toFixed(2));
    } else {
      setToPrice(0);
    }

    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;

    if (!isNaN(result)) {
      setFromPrice(result.toFixed(2));
    } else {
      setFromPrice(0);
    }

    setToPrice(value);
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="app">
      <Block
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        value={fromPrice}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        value={toPrice}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
