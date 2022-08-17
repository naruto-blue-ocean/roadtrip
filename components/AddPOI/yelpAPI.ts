import config from '../../config';
import axios from 'axios';

const getPOIs = (city: String, term: String) => {
  axios.get('https://api.yelp.com/v3/businesses/search', {
    headers: {
      Authorization: config.YELPTOKEN,
    },
    params: {
      term,
      location: city,
    },
  })
    .then((result) => {
      console.log('In yelpAPI, Yelp GET success!');
      return (result.data.businesses);
    })
    .catch((err) => {
      console.log('In yelpAPI, Yelp GET failed, err = ', err);
      return err;
    });
}

module.exports = getPOIs;

