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
      keyword: 'cinema',
      types: 'movie_theater'
    }
  };
  let client = new Client();
  try {
    const gcResponse = await client.geocode(geocodeArgs);
    const location = gcResponse.data.results[0]['geometry']['location'];
    placesArgs.params.location = [location['lat'], location['lng']];
    const pnResponse = await client.placesNearby(placesArgs);
    const movieTheatres = pnResponse.data.results;
    res.status(200).send(movieTheatres);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});