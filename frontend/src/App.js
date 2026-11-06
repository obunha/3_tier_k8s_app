import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // REACT_APP_API_URL is passed as an env var during build or via Nginx proxy
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/data`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>3-Tier K8s App</h1>
      <p>Backend Data:</p>
      <ul>
        {data.length > 0 ? (
          data.map((item, i) => <li key={i}>{item.name || item}</li>)
        ) : (
          <li>No data available from backend</li>
        )}
      </ul>
    </div>
  );
}

export default App;
