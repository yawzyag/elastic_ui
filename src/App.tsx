import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Table } from "./table";
import Demo from "./time";
import { MapHere } from "./map";

function App() {
  return (
    <div className="App">
      <h1>table</h1>
      <Table />
      <Demo />
      <MapHere />
    </div>
  );
}

export default App;
