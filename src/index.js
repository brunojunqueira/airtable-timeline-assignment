import React from "react";
import ReactDOM from "react-dom/client";
import Timeline from "./components/timeline";

function App() {
  return (
    <div className="flex">
      <Timeline/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);