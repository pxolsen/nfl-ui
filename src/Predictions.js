import React, { useState } from "react";
import axios from "axios";

const Predictions = () => {
  const [year, setYear] = useState("");
  const [weekNum, setWeekNum] = useState("");
  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setPredictions(null); // Clear previous results

    try {
      const response = await axios.post("https://nfl-predictor-xxy1.onrender.com/predict", {
        year: parseInt(year),
        week_num: parseInt(weekNum),
      });
      setPredictions(response.data); // Set predictions
    } catch (err) {
      setError(
        err.response?.data?.detail || "An error occurred while fetching predictions."
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>NFL Weekly Score Predictions</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Year:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Week Number:
            <input
              type="number"
              value={weekNum}
              onChange={(e) => setWeekNum(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Get Predictions</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {predictions && (
        <div>
          <h2>Predictions</h2>
          {Object.entries(predictions).map(([gameId, data]) => (
            <div key={gameId} style={{ margin: "10px 0" }}>
              <p>
                <strong>{data.home_team}</strong>: {data.home_team_score.toFixed(1)} vs{" "}
                <strong>{data.away_team}</strong>: {data.away_team_score.toFixed(1)}
              </p>
              <p>Total: {data.total.toFixed(1)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Predictions;
