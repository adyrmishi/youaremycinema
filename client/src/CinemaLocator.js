import React, {useState} from "react";

function CinemaLocator() {
  const [postcode, setPostcode] = useState("");
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
      <form onSubmit={getCinemasNearPostcode}>
        <label>
          Postcode
          <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} name="postcode" />
        </label>
        <label>
          Distance
          <input type="text" value={distance} onChange={(e) => setDistance(e.target.value)} name="distance" />
        </label>
        <input type="submit" value="Submit"/>
      </form>
      {cinemaData ? cinemaData.map(cinema => {
        return (
        <div>
          <p>{cinema['name']}</p>
          <p>{cinema.vicinity}</p>
        </div>
        )}) : 'Loading'
      }
      </div>
    );
}

export default CinemaLocator;