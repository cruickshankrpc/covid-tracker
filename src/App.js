import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
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
  // sets individual country data
  const [countryInfo, setCountryInfo] = useState({});

  // sets Worldwide data on first page load
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })

  }, [])

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

    // TERNARY OPERATOR
    // IF dropdown is WORLDWIDE
    const url =
      countryCode === "worldwide"
        ? // IF TRUTHY execute this condition
          "https://disease.sh/v3/covid-19/all"
        : // IF FALSEY execute this condition
          `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    // ASYNCHRONOUS
    // WAIT for url just specified..
    await fetch(url)
      // THEN get response(data) and turn into json
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        // store info from country from response into variable:
        setCountryInfo(data);
      });
  };
  console.log('COUNTRYINFO>>>', countryInfo )

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
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          {/* INFOBOX title="Coronavirus cases" */}
          {/* INFOBOX */}
          {/* INFOBOX */}
        </div>

        {/* MAP */}
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* TABLE */}
          <h3>Worldwide New Cases</h3>
          {/* GRAPH */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
