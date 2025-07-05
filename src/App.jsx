import React, { useState } from "react";
import vanImg from "./assets/van.png";

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
    html2canvas(element, { useCORS: true, backgroundColor: "#FFFDE7", scale: 2, width: 1600, height: 990 }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${routeName || "route"}_load_chart.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 1.0);
      link.click();
    });
  };

  return (
    <div style={{ background: "#FFFDE7", minHeight: "100vh", padding: 0 }}>
      <div
        id="export-area"
        style={{
          width: 1600,
          height: 990,
          margin: "40px auto",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: 0,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Header */}
        <div
          style={{
            border: "2.5px solid #D40511",
            background: "#FFD600",
            padding: "24px 24px 16px 24px",
            textAlign: "center",
            borderRadius: "14px 14px 0 0",
            position: "relative",
            minHeight: 110,
            boxSizing: "border-box",
            width: "100%"
          }}
        >
          {editingRoute ? (
            <input
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="e.g. KR1A"
              autoFocus
              style={{
                fontSize: 44,
                fontWeight: "bold",
                color: "#D40511",
                border: "none",
                background: "transparent",
                outline: "none",
                textAlign: "center",
                width: "100%",
                minWidth: 320,
                maxWidth: 900,
                margin: "0 auto 0 auto",
                display: "block",
                overflowWrap: "break-word",
                padding: "8px 0 4px 0",
                lineHeight: 1.1,
                whiteSpace: "nowrap"
              }}
              onBlur={() => setEditingRoute(false)}
              onKeyDown={e => { if (e.key === "Enter") setEditingRoute(false); }}
            />
          ) : (
            <div
              onClick={() => setEditingRoute(true)}
              style={{
                fontSize: 44,
                fontWeight: "bold",
                color: "#D40511",
                textAlign: "center",
                minWidth: 320,
                maxWidth: 900,
                margin: "0 auto 0 auto",
                padding: "8px 0 4px 0",
                lineHeight: 1.1,
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
              title="Click to edit route name"
            >
              {routeName || <span style={{ color: "#bbb" }}>e.g. KR1A</span>}
            </div>
          )}
          <div
            style={{
              color: "#D40511",
              fontWeight: "bold",
              fontSize: 20,
              position: "absolute",
              right: 32,
              bottom: 10
            }}
          >
            Excellence. Simply delivered.
          </div>
        </div>

        {/* Main layout grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 480px 1fr",
            gap: 80,
            padding: "40px 32px 24px 32px",
            alignItems: "center",
            justifyItems: "center",
            flex: 1
          }}
        >
          {/* Left quadrants */}
          <div style={{ display: "flex", flexDirection: "column", gap: 60, justifyContent: "center", height: "100%" }}>
            <QuadrantBox
              title="Quadrant 2"
              color="#D40511"
              locations={locations.q2}
              onChange={(idx, val) => handleInputChange("q2", idx, val)}
              minRows={4}
            />
            <QuadrantBox
              title="Quadrant 4 (Dangerous Goods Area)"
              color="#D40511"
              locations={locations.q4}
              onChange={(idx, val) => handleInputChange("q4", idx, val)}
              minRows={4}
            />
          </div>
          {/* Van image */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            minHeight: 440
          }}>
            <img
              src={vanImg}
              alt="DHL van"
              style={{
                width: 440,
                marginBottom: 16,
                borderRadius: 12,
                border: "2.5px solid #FFD600",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                marginTop: 0
              }}
            />
            <div style={{ color: "#999", fontSize: 14, marginTop: 6 }}>
              Van layout (reference)
            </div>
          </div>
          {/* Right quadrants */}
          <div style={{ display: "flex", flexDirection: "column", gap: 60, justifyContent: "center", height: "100%" }}>
            <QuadrantBox
              title="Quadrant 1"
              color="#D40511"
              locations={locations.q1}
              onChange={(idx, val) => handleInputChange("q1", idx, val)}
              minRows={4}
            />
            <QuadrantBox
              title="Quadrant 3"
              color="#D40511"
              locations={locations.q3}
              onChange={(idx, val) => handleInputChange("q3", idx, val)}
              minRows={4}
            />
          </div>
        </div>
      </div>
      {/* Action buttons */}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button
          onClick={clearAll}
          style={{
            background: "#FFD600",
            color: "#D40511",
            fontWeight: "bold",
            fontSize: 20,
            border: "2px solid #D40511",
            borderRadius: 8,
            padding: "12px 32px",
            marginRight: 24,
            cursor: "pointer"
          }}
        >
          Clear All
        </button>
        <button
          onClick={exportAsImage}
          style={{
            background: "#D40511",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 20,
            border: "none",
            borderRadius: 8,
            padding: "12px 32px",
            cursor: "pointer"
          }}
        >
          Export as JPEG
        </button>
      </div>
      <div style={{ textAlign: "center", color: "#aaa", fontSize: 14, marginTop: 16 }}>
        &copy; {new Date().getFullYear()} DHL Van Load Chart
      </div>
    </div>
  );
}

// Quadrant input box component
function QuadrantBox({ title, color, locations, onChange, minRows = 4 }) {
  // Always render at least minRows input fields for alignment
  const visibleInputs = [...locations];
  while (visibleInputs.length < minRows) visibleInputs.push("");

  return (
    <div
      style={{
        background: "#FFFDE7",
        border: `2.5px solid ${color}`,
        borderRadius: 12,
        padding: 18,
        minWidth: 400,
        minHeight: 240,
        maxWidth: 440,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
      }}
    >
      <div style={{ fontWeight: "bold", color, fontSize: 22, marginBottom: 8 }}>
        {title}
      </div>
      {visibleInputs.map((loc, idx) => (
        <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <input
            type="text"
            value={loc}
            onChange={(e) => onChange(idx, e.target.value)}
            placeholder="Town or street"
            style={{
              flex: 1,
              fontSize: 18,
              padding: "6px 8px",
              border: loc.trim() === "" ? "1.5px solid #FFD600" : `2.5px solid ${color}`,
              borderRadius: 8,
              background: loc.trim() === "" ? "#FFFDE7" : "#fff",
              width: "99%",
              minWidth: 0,
              color: loc.trim() === "" ? "#FFFDE7" : "#222",
              filter: loc.trim() === "" ? "blur(2.5px)" : "none",
              opacity: loc.trim() === "" ? 0.15 : 1,
              transition: "filter 0.2s, opacity 0.2s, border 0.2s"
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
