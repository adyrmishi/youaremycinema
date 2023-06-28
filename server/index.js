import 'dotenv/config'
import express from 'express';
import { Client, PlaceInputType } from '@googlemaps/google-maps-services-js';

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get(`/api/:postcode&:distance`, async (req, res, next) => {
  const geocodeArgs = {
    params: {
      key: process.env.API_KEY,
      address: req.params.postcode,
    }
  };
  let placesArgs = {
    params: {
      key: process.env.API_KEY,
      radius: req.params.distance,
      types: 'movie_theater'
    }
  };
  let placesArgs2 = {
    params: {
      key: process.env.API_KEY,
      input: 'cinema',
      inputtype: 'textquery',
      fields: 'name'
    }
  };
  const client = new Client();
  try {
    const gcResponse = await client.geocode(geocodeArgs);
    const location = gcResponse.data.results[0]['geometry']['location'];
    placesArgs.params.location = [location['lat'], location['lng']];
    placesArgs2.params.locationbias = `circle%3A${req.params.distance}%40${location['lat']}%2C${location['lng']}`
    // const pnResponse = await client.placesNearby(placesArgs);
    // const movieTheatres = pnResponse.data.results;
    const pn2Response = await client.findPlaceFromText(placesArgs2);
    const cinemas = pn2Response.data.candidates;
    res.status(200).send(cinemas);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});