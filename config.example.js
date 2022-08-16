module.exports = {
  YELPTOKEN: 'Your Yelp API token here',
  LOCALTUNNEL: 'Your Local Tunnel URL here'
}

/*
TO GET YOUR LOCAL TUNNEL URL

1. Go into our roadtrip-server and npm run db-schema to set up your database structure

2. npm run server-seed
  To populate the database with our sample data, add whatever sample data you might be inserting to the seed file so everyone else has access to it.

3. npm run server-dev to boot up your server.
Your server that connects to the DB should now be running on your localhost:3000

4. Make sure to have npm installed, so you have the localtunnel dependency
'npm install localtunnel' if you are missing it.

5. Open another terminal (while the server is running) and run
' lt --port 3000'
This should open up a tunnel to your local host, and give you a URL

6. Add the URL to your config.js file in the roadtrip CLIENT
*/