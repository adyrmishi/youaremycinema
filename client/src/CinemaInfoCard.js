import React, {useState} from "react";
import CinemaLocator from "./CinemaLocator";

function CinemaInfoCard(cinemaInfo) {

    return (
        <div class='cinema-info-card'>
          <p>{cinemaInfo.cinemaInfo['name']}</p>
          <p>{cinemaInfo.cinemaInfo.vicinity}</p>
          <p>{cinemaInfo.cinemaInfo.movieTheatreWebsite}</p>
        </div>
    );
}

export default CinemaInfoCard;