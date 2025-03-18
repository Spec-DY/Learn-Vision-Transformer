import React from "react";
import VisionTransformerDemo from "./components/Demo";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-slate-50  px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">
          Understanding Vision Transformers
        </h1>

        <VisionTransformerDemo />
      </div>
    </div>
  );
}

export default App;
