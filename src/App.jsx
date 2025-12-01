import React, { useState } from "react";
import vanImg from "./assets/van.png";
import "./App.css";

function App() {
  const [routeName, setRouteName] = useState("");
  const [editingRoute, setEditingRoute] = useState(true);
  const [locations, setLocations] = useState({
    q1: ["", "", "", ""],
    q2: ["", "", "", ""],
    q3: ["", "", "", ""],
    q4: ["", "", "", ""]
  });

  const handleInputChange = (key, idx, value) => {
    setLocations((prev) => {
      const updated = [...prev[key]];
      updated[idx] = value;
      return { ...prev, [key]: updated };
    });
  };

  const clearAll = () => {
    setRouteName("");
    setEditingRoute(true);
    setLocations({
      q1: ["", "", "", ""],
      q2: ["", "", "", ""],
      q3: ["", "", "", ""],
      q4: ["", "", "", ""]
    });
  };


  // --- Export as image (html2canvas) ---
  const exportAsImage = async () => {
    const html2canvas = (await import("html2canvas")).default;
    const element = document.getElementById("export-area");
    html2canvas(element, { 
      useCORS: true, 
      backgroundColor: "#FFFEF5", 
      scale: 2, 
      width: 1600, 
      height: 990 
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${routeName || "route"}_load_chart.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 1.0);
      link.click();
    });
  };

  return (
    <div className="app-container">
      {/* Background decoration */}
      <div className="bg-pattern"></div>
      
      <div id="export-area" className="export-area">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="header-left">
              <div className="dhl-logo">DHL</div>
              <span className="header-subtitle">Van Load Chart</span>
            </div>
            
            <div className="route-name-container">
              {editingRoute ? (
                <input
                  value={routeName}
                  onChange={(e) => setRouteName(e.target.value)}
                  placeholder="Enter Route"
                  autoFocus
                  className="route-input"
                  onBlur={() => setEditingRoute(false)}
                  onKeyDown={e => { if (e.key === "Enter") setEditingRoute(false); }}
                />
              ) : (
                <div
                  onClick={() => setEditingRoute(true)}
                  className="route-display"
                  title="Click to edit route name"
                >
                  {routeName || <span className="route-placeholder">Enter Route</span>}
                </div>
              )}
            </div>
            
            <div className="header-right">
              <div className="tagline">Excellence. Simply delivered.</div>
            </div>
          </div>
        </header>

        {/* Main layout grid */}
        <main className="main-grid">
          {/* Left quadrants */}
          <div className="quadrant-column">
            <QuadrantBox
              number="2"
              title="Quadrant 2"
              subtitle="Front Left"
              icon="↖"
              locations={locations.q2}
              onChange={(idx, val) => handleInputChange("q2", idx, val)}
            />
            <QuadrantBox
              number="4"
              title="Quadrant 4"
              subtitle="Back Left • Dangerous Goods"
              icon="⚠️"
              isDangerous
              locations={locations.q4}
              onChange={(idx, val) => handleInputChange("q4", idx, val)}
            />
          </div>

          {/* Van image */}
          <div className="van-container">
            <div className="van-wrapper">
              <img src={vanImg} alt="DHL van" className="van-image" />
              <div className="van-overlay">
                <div className="quadrant-indicator q1-indicator">Q1</div>
                <div className="quadrant-indicator q2-indicator">Q2</div>
                <div className="quadrant-indicator q3-indicator">Q3</div>
                <div className="quadrant-indicator q4-indicator">Q4</div>
              </div>
            </div>
            <div className="van-label">Van Layout Reference</div>
          </div>

          {/* Right quadrants */}
          <div className="quadrant-column">
            <QuadrantBox
              number="1"
              title="Quadrant 1"
              subtitle="Front Right"
              icon="↗"
              locations={locations.q1}
              onChange={(idx, val) => handleInputChange("q1", idx, val)}
            />
            <QuadrantBox
              number="3"
              title="Quadrant 3"
              subtitle="Back Right"
              icon="↘"
              locations={locations.q3}
              onChange={(idx, val) => handleInputChange("q3", idx, val)}
            />
          </div>
        </main>
      </div>

      {/* Action buttons */}
      <div className="actions">
        <button onClick={clearAll} className="btn btn-secondary">
          <span className="btn-icon">🗑️</span>
          Clear All
        </button>
        <button onClick={exportAsImage} className="btn btn-primary">
          <span className="btn-icon">📸</span>
          Export as JPEG
        </button>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} DHL Van Load Chart Tool</p>
      </footer>
    </div>
  );
}

// Quadrant input box component
function QuadrantBox({ number, title, subtitle, icon, locations, onChange, isDangerous = false }) {
  const visibleInputs = [...locations];
  while (visibleInputs.length < 4) visibleInputs.push("");

  return (
    <div className={`quadrant-box ${isDangerous ? 'quadrant-dangerous' : ''}`}>
      <div className="quadrant-header">
        <div className="quadrant-number">{number}</div>
        <div className="quadrant-info">
          <div className="quadrant-title">{title}</div>
          <div className="quadrant-subtitle">{subtitle}</div>
        </div>
        <div className="quadrant-icon">{icon}</div>
      </div>
      
      <div className="quadrant-inputs">
        {visibleInputs.map((loc, idx) => (
          <div key={idx} className="input-row">
            <span className="input-number">{idx + 1}</span>
            <input
              type="text"
              value={loc}
              onChange={(e) => onChange(idx, e.target.value)}
              placeholder="Street or town name"
              className={`location-input ${loc.trim() !== "" ? "filled" : ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
