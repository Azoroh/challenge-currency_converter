import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = "258f6076f7f0e92889f13e43";

export default function App() {
  const [rates, setRates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [amount, setAmount] = useState("");
  const [valCur, setValCur] = useState("EUR");
  const [convertCur, setConvertCur] = useState("USD");
  const [output, setOutput] = useState("");

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
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD
        `,
        );

        const data = await res.json();
        setRates(data.conversion_rates);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getCurrency();
  }, []);

  function handleConvert(amount, from, to) {
    if (amount < 1) return;

    setOutput(rates[from]);
  }

  return (
    <div className="lg-page">
      <div className="lg-shell">
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

        <main className="lg-card" role="region" aria-label="Currency converter">
          <div className="lg-glow" aria-hidden="true"></div>

          <div className="lg-row lg-row-amount">
            <label className="lg-label" for="amount">
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
                inputmode="decimal"
                autocomplete="off"
                placeholder="0.00"
                value={amount}
                onChange={(e) =>
                  !isNaN(Number(e.target.value)) &&
                  setAmount(e.target.value > 0 ? e.target.value : "")
                }
              />
              <button
                className="lg-chip"
                type="button"
                aria-label="Max"
                onClick={() => setAmount(90000)}
              >
                Max
              </button>
            </div>

            <p className="lg-hint">
              Tip: decimals are allowed, example 1200.50
            </p>
          </div>

          <div className="lg-grid">
            <div className="lg-row">
              <label className="lg-label" for="from">
                From
              </label>

              <div className="lg-field">
                <select
                  id="from"
                  className="lg-select"
                  aria-label="Convert from currency"
                >
                  <option value="NGN" selected>
                    NGN — Nigerian Naira
                  </option>
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="CAD">CAD — Canadian Dollar</option>
                </select>

                <span className="lg-chev" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="lg-swap-wrap" aria-hidden="true">
              <button className="lg-swap" type="button" title="Swap">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 7h12l-2.5-2.5"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17 17H5l2.5 2.5"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="lg-row">
              <label className="lg-label" for="to">
                To
              </label>

              <div className="lg-field">
                <select
                  id="to"
                  className="lg-select"
                  aria-label="Convert to currency"
                >
                  <option value="USD" selected>
                    USD — US Dollar
                  </option>
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
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="lg-actions">
            <button className="lg-btn lg-btn-primary" type="button">
              Convert
            </button>
            <button className="lg-btn lg-btn-ghost" type="button">
              Reset
            </button>
          </div>

          <section className="lg-result" aria-label="Result">
            <div className="lg-result-top">
              <span className="lg-result-label">Result</span>
              <span className="lg-pill">Updated just now</span>
            </div>
            <div className="lg-result-value">
              <span className="lg-result-amt">$0.00</span>
              <span className="lg-result-rate">1 NGN ≈ $0.0000</span>
            </div>
          </section>

          <span className="foot-note">
            <a
              className="repo-link"
              href="https://github.com/Azoroh"
              target="_blank"
              rel="noopener noreferrer"
            >
              Azoroh/Repo &rarr;
            </a>
          </span>
        </main>
      </div>
    </div>
  );
}

function Loader() {
  return <span className="loader"></span>;
}
