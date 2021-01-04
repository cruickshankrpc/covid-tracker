import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

// pass this object into LINE file
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0.0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async() => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        console.log("LINEGRAPH DATA>>>", data);
        let chartData = buildChartData(data, "cases");
        console.log("CHARTDATA>>>", chartData)
        setData(chartData);
      });
    }; 
    fetchData();
  }, []);


  const buildChartData = (data, casesType = "cases") => {
    let chartData = [];
    let lastDataPoint;


    for(let date in data.cases) {
      if (lastDataPoint) {
        // create new data point object with x & y keys
        let newDataPoint = {
          x: date,
          // calculate difference in cases from last date to find new cases
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data["cases"][date];
    };
    return chartData;
  };

  return (
    <div>
      <h1>I'm a graph</h1>
      {data?.length > 0 && (
        <Line 
        options={options}
        data={{ 
          datasets: [
            {
            backgroundColor: "rgba(204, 16, 52, 0.5)",
            borderColor: "#CC1034",
            data: data,
          },
        ],
        }}
  
        />

      )}
      
      
    </div>
  );
}

export default LineGraph;
