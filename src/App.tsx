import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Table } from "./table";
import Demo from "./time";
import { MapHere } from "./map";
import { LibraryMap } from "./map/libraryMap";

function App() {
  return (
    <div className="App">
      <h1>table</h1>
      <Table />
      <Demo />
      {/* <MapHere /> */}
      <LibraryMap />
    </div>
  );
}

export default App;
