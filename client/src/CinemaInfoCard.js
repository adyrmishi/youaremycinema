import React, {useState} from "react";
import CinemaLocator from "./CinemaLocator";

function CinemaInfoCard(cinemaInfo) {

    return (
        <div>
        {console.log(cinemaInfo)}
          <p>{cinemaInfo['name']}</p>
          <p>{cinemaInfo.vicinity}</p>
        </div>
    );
}

export default CinemaInfoCard;