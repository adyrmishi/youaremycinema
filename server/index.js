import 'dotenv/config'
import express from 'express';
import { Client } from '@googlemaps/google-maps-services-js';

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
  const placesArgs = {
    params: {
      key: process.env.API_KEY,
      location: "",
      radius: req.params.distance,
    }
  };
  const client = new Client();
  try {
  client.geocode(geocodeArgs).then(gcResponse => {
    const location = gcResponse.data.results[0]['geometry']['location'];
    placesArgs.params.location = `${location.lat}%2C${location.lng}`
  });
  // client.placesNearby(placesArgs).then(pnResponse => {
  //   const cinemas = pnResponse.data.results[0];
  //   res.status(200).send(cinemas);
  // })
 } catch (err) {
  res.status(400).send(err);
 }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});