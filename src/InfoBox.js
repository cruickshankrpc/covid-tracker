// rfce -> uses extension to create functional component

import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";

// InfoBox argument is de-structured prop
function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        {/* Title */}
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        
        {/* Number of cases */}
        <h2 className="infoBox__cases">{cases}</h2>

        {/* Total */}
        <Typography className="infoBox__total" color="textSecondary"> 
          {total} Total
        </Typography>


      </CardContent>
    </Card>
  )
}

export default InfoBox
