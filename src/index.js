import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App"; // App 컴포넌트 경로
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap 스타일

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
