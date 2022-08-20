import axios from 'axios';
import config from '../../config.js';

export default function getTrip (tripId, setCities) {
  const path = `${config.LOCALTUNNEL}/trips/tripinfo/${tripId}`
  axios.get(path)
  .then ((response) => {
    let trip = response.data;
    let cities = {};
    trip.forEach((row) => {
      if (cities[row.destination_name] && row.poi_id) {
        let poiObj = {};
        poiObj.id = row.poi_id;
        poiObj.name = row.poi_name;
        poiObj.order_number = row.poi_order
        cities[row.destination_name].POIs.push(poiObj)
      } else {
        cities[row.destination_name] = {
          lat: row.lat,
          lng: row.lng,
          POIs: [],
          order_number: row.destination_order,
          destination_id: row.destination_id
        };
        if (row.poi_id) {
          let poiObj = {};
          poiObj.id = row.poi_id;
          poiObj.name = row.poi_name;
          poiObj.order_number = row.poi_order
          cities[row.destination_name].POIs.push(poiObj)
        }
      }
    })
    let destinations = [];
    Object.keys(cities).forEach((key) => {
      let destObj = {
        cityName: key,
        destination_id: cities[key].destination_id,
        lat: cities[key].lat,
        lng: cities[key].lng,
        order_number: cities[key].order_number,
        POIs: cities[key].POIs
      };
      destinations.push(destObj);
    })
    setCities(destinations);

  })
  .catch((err) => {
    console.error('errored in getTrip', err)
  })
}