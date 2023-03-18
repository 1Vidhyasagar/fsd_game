import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";


// ReactDOM.createRoot()(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById("root")
// );

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found.");
}
