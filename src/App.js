import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Data from "./data";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: "#E7E5E4", minHeight: "100vh" }}>
        <Header></Header>
        <Data></Data>
      </div>
    );
  }
}

export default App;
