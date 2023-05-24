import "./App.css";
import React from "react";

export interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
  return (
    <div className="app">
      <h1>Volpi Tracker</h1>
    </div>
  );
};

export default App;
