import React from "react";
import "./app.css";
import Collection from "./components/Collection";

const App: React.FC = () => {
  return (
    <main>
      <div className="app">
        <Collection />
      </div>
    </main>
  );
};

export default App;
