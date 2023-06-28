import React, {useState} from "react";

function CinemaLocator() {
  const [postcode, setPostcode] = useState("");
  const [distance, setDistance] = useState(0);

  // async const getCinemasNearPostcode = (e) => {
  //   e.preventDefault();
  //   const data = await fetch(`/api/postcode=${postcode}&distance=${distance}`)
  // }

    return (
        <form>
        <label>
          Postcode
          <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} name="postcode" />
        </label>
        <label>
          Distance
          <input type="text" value={distance} onChange={(e) => setDistance(e.target.value)} name="distance" />
        </label>
        <input type="submit" value="Submit" onSubmit={getCinemasNearPostcode}/>
      </form>
    );
}

export default CinemaLocator;