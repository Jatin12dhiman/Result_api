import { useState, useEffect } from "react";

export default function CurrencyApi() {
  const currencies = ["USD", "INR", "EUR", "GBP", "AUD", "CAD", "JPY"];

  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [rates, setRates] = useState({});

  // Fetch rates once (from USD base)
  useEffect(() => {
    async function fetchRates() {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await res.json();
      setRates(data.rates); // store all rates
    }
    fetchRates();
  }, []);

  // Convert function
  function handleConvert() {
    if (!amount || !rates) return;

    // Convert from -> USD -> to
    const usdAmount = amount / rates[from]; 
    const converted = usdAmount * rates[to];
    setResult(converted);
  }

  return (
    <div className="p-6 text-center  min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Currency Converter</h2>

      {/* Dropdowns */}
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="m-2 p-2 border rounded"
      >
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>

      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="m-2 p-2 border rounded"
      >
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>

      {/* Input */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="m-2 p-2 border rounded"
      />

      {/* Button */}
      <button
        onClick={handleConvert}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Convert
      </button>

      {/* Result */}
      {result && (
        <p className="mt-4 text-lg font-semibold">
          {amount} {from} = {result.toFixed(2)} {to}
        </p>
      )}
    </div>
  );
}
