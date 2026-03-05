import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = "258f6076f7f0e92889f13e43";

export default function App() {
  const [rates, setRates] = useState(null);

  const [amount, setAmount] = useState("");
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [output, setOutput] = useState("0.00");

  useEffect(() => {
    async function getCurrency() {
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD
        `,
        );

        const data = await res.json();
        setRates(data.conversion_rates);
      } catch (err) {
        console.log(err);
      }
    }

    getCurrency();
  }, []);

  // // enter key Event
  // useEffect(() => {
  //   function callback(e) {
  //     if (e.code === "Enter") handleConvert(amount, fromCur, toCur);
  //     console.log("callback run on enter key");
  //   }

  //   document.addEventListener("keydown", callback);

  //   return () => {
  //     document.removeEventListener("keydown", callback);
  //     console.log("CLEANING UP");
  //   };
  // }, [amount, fromCur, toCur]);

  function handleConvert(amount, from, to) {
    if (amount < 1) return;

    console.log(rates);

    setOutput(rates[to] * amount);

    console.log(from, rates[from]);
    console.log(to, rates[to]);

    resetAmount();
  }

  function resetAmount() {
    setAmount("");
  }

  function handleSwap() {
    setFromCur(toCur);
    setToCur(fromCur);
  }

  return (
    <div className="lg-page">
      <div className="lg-shell">
        <Header />

        <main className="lg-card" role="region" aria-label="Currency converter">
          <div className="lg-glow" aria-hidden="true"></div>

          <AmountInput onSetAmount={setAmount} amount={amount} />
          <Converter
            onSetToCur={setToCur}
            onSetFromCur={setFromCur}
            fromCur={fromCur}
            toCur={toCur}
            onSwap={handleSwap}
          />

          {/* Buttons  */}
          <div className="lg-actions">
            <Button
              className="lg-btn lg-btn-primary"
              onClick={() => handleConvert(amount, fromCur, toCur)}
            >
              Convert
            </Button>
            <Button className="lg-btn lg-btn-ghost" onClick={resetAmount}>
              Reset
            </Button>
          </div>

          <ResultOutput
            output={output}
            rates={rates}
            fromCur={fromCur}
            toCur={toCur}
          />

          <FootNote />
        </main>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="lg-header">
      <div className="lg-titlewrap">
        <h1 className="lg-title">Currency Converter</h1>
        <p className="lg-subtitle">Fast, clean and IOS styled.</p>
      </div>

      <div className="lg-badge" aria-hidden="true">
        <span className="lg-dot"></span>
        Live
      </div>
    </header>
  );
}

function AmountInput({ amount, onSetAmount }) {
  return (
    <div className="lg-row lg-row-amount">
      <label className="lg-label" htmlFor="amount">
        Amount
      </label>

      <div className="lg-field lg-amount">
        <span className="lg-prefix" aria-hidden="true">
          $
        </span>
        <input
          id="amount"
          className="lg-input"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0.00"
          value={amount}
          onChange={(e) =>
            !isNaN(Number(e.target.value)) &&
            onSetAmount(e.target.value > 0 ? e.target.value : "")
          }
        />
        <button
          className="lg-chip"
          type="button"
          aria-label="Max"
          onClick={() => onSetAmount(90000)}
        >
          Max
        </button>
      </div>

      <p className="lg-hint">Tip: decimals are allowed, example 1200.50</p>
    </div>
  );
}

function Converter({ onSetToCur, onSetFromCur, fromCur, toCur, onSwap }) {
  return (
    <div className="lg-grid">
      <div className="lg-row">
        <label className="lg-label" htmlFor="from">
          From
        </label>

        <div className="lg-field">
          <select
            id="from"
            className="lg-select"
            aria-label="Convert from currency"
            value={fromCur}
            onChange={(e) => {
              onSetFromCur(e.target.value);
            }}
          >
            <option value="USD">USD — US Dollar</option>
            <option value="NGN">NGN — Nigerian Naira</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="CAD">CAD — Canadian Dollar</option>
          </select>

          <span className="lg-chev" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none">
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="lg-swap-wrap" aria-hidden="true">
        <button className="lg-swap" type="button" title="Swap" onClick={onSwap}>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M7 7h12l-2.5-2.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 17H5l2.5 2.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="lg-row">
        <label className="lg-label" htmlFor="to">
          To
        </label>

        <div className="lg-field">
          <select
            id="to"
            className="lg-select"
            aria-label="Convert to currency"
            value={toCur}
            onChange={(e) => {
              onSetToCur(e.target.value);
            }}
          >
            <option value="USD">USD — US Dollar</option>
            <option value="NGN">NGN — Nigerian Naira</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="CAD">CAD — Canadian Dollar</option>
          </select>

          <span className="lg-chev" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none">
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

function ResultOutput({ output, rates, fromCur, toCur }) {
  const rate = rates?.[toCur] / rates?.[fromCur];

  const resultRate = rate
    ? `1 ${fromCur} ≈ ${getCurrencySymbol(toCur)} ${rate.toFixed(4)}`
    : "";

  return (
    <section className="lg-result" aria-label="Result">
      <div className="lg-result-top">
        <span className="lg-result-label">Result</span>
        <span className="lg-pill">Updated just now</span>
      </div>
      <div className="lg-result-value">
        <span className="lg-result-amt">{output}</span>
        <span className="lg-result-rate">{resultRate}</span>
      </div>
    </section>
  );
}

function FootNote() {
  return (
    <span className="foot-note">
      <a
        className="repo-link"
        href="https://github.com/Azoroh?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
      >
        Azoroh/Repo &rarr;
      </a>
    </span>
  );
}

function Button({ children, onClick, className }) {
  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

function getCurrencySymbol(code) {
  const symbols = {
    USD: "$",
    NGN: "₦",
    CAD: "C$",
    EUR: "€",
    GBP: "£",
  };

  return symbols[code.toUpperCase()] || code;
}

// function Main() {
//   return (
//     <main className="lg-card" role="region" aria-label="Currency converter">
//       <AmountInput />
//       <Converter />
//       <ResultOutput />
//     </main>
//   );
// }
