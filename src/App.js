import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, Select, Card} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";

function App() {
  // STATE (React hook)-> How to write a VARIABLE in REACT
  // EFFECT (React hook)-> Runs piece of code based on given condition

  // sets our country DATA
  const [countries, setCountries] = useState([]);
  // sets Worldwide as default state
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    // code in here runs only once when component loads
    // & again if CONDITION ',[]' (e.g. countries) changes
    // ASYNC -> send a request, wait for it, then do something with info
    // no need for axios -> xtra dependencies...
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States, United Kingdom etc
            value: country.countryInfo.iso2, // UK, USA, FR etc
          }));

          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  // LISTENS for EVENT(CLICK) on dropdown menu
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("COUNTRYSTICK", countryCode);
    // Sets clicked country as new state
    setCountry(countryCode);
  };

  return (
    // BEM naming convention
    // Inside {} => JSX => allows us to use HTML & JS
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          {/* MATERIAL UI */}
          <FormControl className="app_dropdown">
            {/* onChange updates selector from dropdown by calling onCountryChange function */}
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/* Loop through all countries & show drop down */}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
          <InfoBox title="Deaths" cases={12345} total={3000} />
          <InfoBox title="Recovered" cases={1234} total={4000} />
          {/* INFOBOX title="Coronavirus cases" */}
          {/* INFOBOX */}
          {/* INFOBOX */}
        </div>

        {/* MAP */}
        <Map />
      </div>
      <Card className="app_right">
        {/* TABLE */}
        {/* GRAPH */}
      </Card>
    </div>
  );
}

export default App;
