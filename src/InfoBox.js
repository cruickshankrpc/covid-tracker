// rfce -> uses extension to create functional component

import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
// InfoBox argument is de-structured prop
function InfoBox({ title, cases, isRed, active, total, ...props }) {
  return (
    // String INTERPOLATION: ADD new infoBox--selected class when ACTIVE
    <Card onClick={props.onClick} 
    className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}> 
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
        <Typography className="infoBox__total" color="textSecondary"> 
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
