import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./config/routes";
import { Nav, Footer } from "./components/index";

export interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
  return (
    <div className="app">
      <Nav />

      <Routes>
        {routes.map(({ path, element: Component }, key) => (
          <Route key={key} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
