const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var url = require('url');

const user = process.env.DB_USER;
const pwd = process.env.DB_PWD;
const dbName = 'sog-profile-dev';
if (!user || !pwd) {
  throw 'Database username or password not specified.'
}
const dbUri = `mongodb://${user}:${pwd}@ds113358.mlab.com:13358/sog-profile-dev`;

app.use(bodyParser.json());

var db;

// Initialize connection once
MongoClient.connect(dbUri, function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

app.get('/search', (req, res)=> {
  var id = req.query;
  console.log(id);
  res.send('search');
});

app.post('/profile', (req, res) => {
  const profile = req.body;

  db.connect(dbUri, function(err, client) {
    if (err) {
      throw err;
    }
    // const db = client.db(dbName);
    const collection = db.collection('profiles');
    collection.insertOne(profile, (err, result) => {
      // client.close();
      res.send(result.insertedId);
    });
  });
});

app.put('/profile/{id}', (req, res) => res.send('Profile Put here'));
app.delete('/profile/{id}', (req, res) => res.send('Profile delete here'));
app.get('/profile/{id}', (req, res) => res.send('Profile get here'));
