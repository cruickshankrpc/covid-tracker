import React, { useEffect, useState } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

function App() {
  // STATE (React hook)-> How to write a VARIABLE in REACT
  // EFFECT (React hook)-> Runs piece of code based on given condition

  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  // sets Worldwide data on first page load
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    // code in here runs only once when component loads
    // & again if CONDITION ',[]' (e.g. countries) changes
    // ASYNC -> send a request, wait for it, then do something with info
    // no need for axios -> xtra dependencies...
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States, United Kingdom etc
            value: country.countryInfo.iso2, // UK, USA, FR etc
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  // LISTENS for EVENT(CLICK) on dropdown menu
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    console.log("COUNTRYSTICK", countryCode);
    // Sets clicked country as new state

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
        setInputCountry(countryCode);
        // store info from country from response into variable:
        setCountryInfo(data);
        // recenter map to country
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  console.log("COUNTRYINFO>>>", countryInfo);

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
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
        </div>
        {/* MapContainer component imported from Map file */}
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <div className="app_information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide New {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
