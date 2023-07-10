import React, {useState} from "react";
import CinemaInfoCard from "./CinemaInfoCard";

function CinemaLocator() {
  const [postcode, setPostcode] = useState("");
  const [film, setFilm] = useState("");
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState(0);
  const [cinemaData, setCinemaData] = useState(null);

const getCinemasNearPostcode = async (e) => {
    e.preventDefault();
    let cinemas = await fetch(`/api/${postcode}&${distance}`)
                  .then(r=> r.json())
    setCinemaData(cinemas)
    console.log(cinemaData)
    setPostcode("")
    setDistance(0)
  }

    return (
      <div>
      <h1>
        YOU ARE MY CINEMA
      </h1>
      <div id='form-format'>
      <form onSubmit={getCinemasNearPostcode}>
      <label>
          Film
          <input type="text" value={film} onChange={(e) => setFilm(e.target.value)} name="film" />
        </label>
        <label>
          Postcode
          <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} name="postcode" />
        </label>
        <label>
          Within a radius of
          <select onChange={(e) => setDistance(e.target.value)} value={distance} name="distance" id="distance">
        <option value="1000">1km</option>
        <option value="3000">3km</option>
        <option value="5000">5km</option>
        <option value="10000">10km</option>
      </select>
          {/* <input type="text" value={distance} onChange={(e) => setDistance(e.target.value)} name="distance" /> */}
        </label>
        <label>
          Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} name="date" />
        </label>
        <input type="submit" value="Search"/>
      </form>
      </div>
      {/* {cinemaData ? cinemaData.map(cinema => {
        return (
        <div>
          <p>{cinema['name']}</p>
          <p>{cinema.vicinity}</p>
        </div>
        )}) : 'Loading'
      } */}
      <div class='cinema-results'>
        {cinemaData ? cinemaData.map(cinema => {
        return (
        <CinemaInfoCard cinemaInfo={cinema} />
        )}) : 'Loading'
      }
      </div>
      </div>
    );
}

export default CinemaLocator;