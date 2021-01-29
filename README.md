# Covid-19 Statistic-Tracking Application

## Overview
In order to keep up with React and to see how working devs use it to develop apps, I followed [this](https://www.youtube.com/watch?v=cF3pIMJUZxM&t=15677s) 4.5 hour tutorial by Clever Programmers (<3 Sonny). 

## TECHNOLOGIES
- React Chart JS 2 (dependency/library, linegraph)
- Numeral -> formats numbers 
- React leaflet -> 
- Leaflet
- Material UI

## PROBLEMS: 
- Map wouldn't work - read documentation and update had changed it to MapContainer in documentation, needed to import ChangeView in order to center and zoom the map. 
```js
  <div className="map">
      <MapContainer>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
```

## LEARNED
- TERNARY OPERATOR DROP DOWN EVENT LISTENER
- onClick event arrow function INSIDE InfoBox element
- use SPREAD OPERATOR for PROPS inside infoBox argument, add props.onClick to Card directly, makes clickable 
- boolean isRed 
- String INTERPOLATION to select class to change recovered text GREEN 
- infoBox cursor:pointer 
- overflow: scroll
