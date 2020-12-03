import React from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./App.css";

function App() {
  return (
    // BEM naming convention
    <div className="app">
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        {/* MATERIAL UI */}
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option 2</MenuItem>
            <MenuItem value="worldwide">Option 3</MenuItem>
            <MenuItem value="worldwide">Option 4</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* HEADER */}
      {/* TITLE + SELECT DROPDOWN */}
      {/* INFOBOX */}
      {/* INFOBOX */}
      {/* INFOBOX */}
      {/* TABLE */}
      {/* GRAPH */}
      {/* MAP */}
    </div>
  );
}

export default App;
