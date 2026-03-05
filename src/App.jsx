import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = "258f6076f7f0e92889f13e43";

export default function App() {
  const [val, setVal] = useState(1);
  const [valCur, setValCur] = useState("EUR");
  const [convertCur, setConvertCur] = useState("USD");
  const [output, setOutput] = useState("money");

  // useEffect(() => {
  //   async function getCurrency() {
  //     const res = await fetch(
  //       `https://api.frankfurter.app/latest?amount=${val}&from=${valCur}&to=${convertCur}`,
  //     );

  //     const data = await res.json();
  //     setOutput(Object.values(data.rates)[0]);
  //   }

  //   if (val > 0) getCurrency();
  // }, [val, convertCur, valCur]);

  useEffect(() => {
    async function getCurrency() {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${valCur}
`,
      );

      const data = await res.json();

      setOutput(data.conversion_rates[convertCur] * val);
    }

    if (val > 0) getCurrency();
  }, [val, convertCur, valCur]);

  return (
    <div className="App">
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
      />

      <select
        value={valCur}
        onChange={(e) => {
          setValCur(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="NGN">NGN</option>
        <option value="INR">INR</option>
      </select>

      <select
        value={convertCur}
        onChange={(e) => {
          setConvertCur(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="NGN">NGN</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {convertCur}
      </p>
    </div>
  );
}
