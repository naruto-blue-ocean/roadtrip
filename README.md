# About This Application

This project was a 1-week sprint where our team completed a MVP for an external client. Roadtrip is a service for travel enthusiasts or anyone who wants to be able to organize their travel plans. With Roadtrip, users can search for destinations to add to their route, add places to visit within each destination, and share these trips with their friends or whoever they want to travel with.


# Features

- Secure account creation and hashed password storage with Passport.js
- Creation of trip itineraries stored to a database accessible from different devices
- Searchable destinations using Google Places API
- Searchable places of interest using Yelp APICreation and retrieval of notes for places visited stored to a database
- Sharing functionality for multiple users to edit the same trip
- View/reorder/delete destinations you have added to your trip
- View/reorder/delete places of interest you have added to your trips
- View trips you have completed in the archive
- View trips you have removed in the archive, delete them, or recover them back to the “All Trips” section

# Major Technologies Used

- Client: [ReactJS](https://reactjs.org/) with Hooks & [React Native](https://reactnative.dev/)
- Server: [NodeJS](https://nodejs.dev/) & [ExpressJS](https://expressjs.com/)
- Database: [PostgreSQL](https://www.postgresql.org/) & [Node-Postgres](https://node-postgres.com/)
- Client-server connection: [Localtunnel](https://theboroer.github.io/localtunnel-www/)
- Mobile client: [Expo](https://expo.dev/)
- Authentication: [PassportJS](https://www.passportjs.org/)
- HTTP client: [Axios](https://axios-http.com/) & [React Query](https://react-query-v3.tanstack.com/)
- API: [Yelp Fusion API](https://fusion.yelp.com/) & [Google Map API](https://developers.google.com/maps)
- Other libraries used: [React Navigation](https://reactnavigation.org/) & [Use-Places-Autocomplete](https://github.com/wellyshen/use-places-autocomplete) & [React Native Draggable Flatlist](https://github.com/computerjazz/react-native-draggable-flatlist)

# How To Check Out This Application

This repository serves client side for this application. You will also need to clone or download the repository for the [server side](https://github.com/naruto-blue-ocean/roadtrip-server).

### Set up Expo
  - Create an [Expo account](https://expo.dev/). Download the Expo Go app on your mobile phone and sign in using this account.
  - In a terminal window on your computer, install Expo globally by running the command `npm install --global expo-cli`. If your computer’s OS is Mac or Linux, also do `brew upgrade` and `brew install watchman`. 
  - Connect Expo on your computer with the Expo Go app on your mobile device by running `expo login` in a terminal window using your Expo account information.
### To set up the client side of this app
  - Obtain a [Yelp API token](https://www.yelp.com/developers/documentation/v3/authentication). Also obtain a [Google Maps API token](https://developers.google.com/maps/documentation/javascript/get-api-key).
  - Create a `config.js` file in the root directory of this client-side repo. An example is provided in the `config.example.js` file. Add your Yelp and Google API tokens to `config.js` following the exact format of the example file.
  - Run `npm install` in the root directory of this client-side repo to get all dependency packages.
### To set up the server side of this app
  - In the root directory of the server-side repo, run `npm install` to get all dependency packages.
  - Make sure you have PostgreSQL installed on your computer.
  - Also in the root directory of the server-side repo, enter the command `npm run db-schema`. This will create the database and tables needed.
  - `npm run db-seed`. This will seed the database with some initial data.
  - Set up a .env file in the root directory that follows the exact format of the provided example.env file.
  - `npm run server-dev` to start the server.
### Because the server is hosted on `localhost` on your computer but the client is on a mobile device, the client will not have access to `localhost` and thus, the server. To connect the client to the server using a localtunnel:
  - Install localtunnel globally on your computer by running the command `npm install -g localtunnel` in a terminal window.
  - While the server is running, open a separate terminal window and run the command `lt --port 3000`. This will give you a localtunnel URL.
  - Copy the localtunnel URL obtained in the previous step into the config.js file in the client-side repo.
### Check out the application
  - Keep both your server and the localtunnel running while using the app.
  - In the root directory of the client-side repo: run the command `expo start` in your terminal.
  - Now if you log into the Expo Go app on your mobile device, you should be able to access the app.
  - You can log in using a pre-existing account with some sample trips (or create a new account):
    - Username: noa@email.com
    - Password: noapassword
### Additional
   If you want to check out the app using an iOS simulator:
  - Make sure you have Xcode installed on your computer.
  - After running `expo start` in the previous step, type the command `i` in the same terminal window. This will start the application in your iOS simulator.
### Some caveats
  - Make sure you set up and seed the database before starting the server.
  - If you can’t log in to the app while the server is still running, this is most likely because the localtunnel has closed. Simply restart the localtunnel.

# Known missing functionalities
Because this is a minimum viable product (MVP) project completed in a limited timeframe, we were not able to cover all the functionalities that we would like to provide, including:
- The ability to log out
- The ability to convert a ‘planned trip’ to an ‘active trip’
- The ability to move a trip to the ‘trash’ in the archive
- Home screen styling is not working as intended
- Routing or navigation using the Google Maps API
- Session authentication with JSON Web Tokens


# Contributors
- [Binh Nguyen](https://github.com/kbinhnguyen)
- [Chris Choi](https://github.com/chrisxchoi)
- [Jason Chiou](https://github.com/jasonchiou)
- [Jasper Bucad](https://github.com/justjjasper)
- [Jennifer Lin](https://github.com/JennyMipha)
- [Johnny Mok](https://github.com/Jmok19927)
- [Louisa Yonzon](https://github.com/Louisaflor)
- [Noa Tongi](https://github.com/noattongi)
- [Peter Phan](https://github.com/peterhphan)
