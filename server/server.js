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

let db;

// Initialize connection once
MongoClient.connect(dbUri, function(err, client) {
  if(err) throw err;

  db = client.db(dbName);

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

app.get('/search', (req, res)=> {
  const practice = req.query.practice;
  const skills = req.query.skill;
  console.log(skills);
  const ato = req.query.ato;

  const query = {};
  if (practice) {
    query['practice'] = practice;
  }
  if (ato) {
    query['ato'] = ato;
  }
  console.log(query);
  console.log(db);
  db.collection('profiles').find(query).toArray(function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

app.post('/profile', (req, res) => {
  const profile = req.body;
  const collection = db.collection('profiles');
    collection.insertOne(profile, (err, result) => {
      // client.close();
      res.send(result.insertedId);
    });
});

app.put('/profile/{id}', (req, res) => res.send('Profile Put here'));
app.delete('/profile/{id}', (req, res) => res.send('Profile delete here'));
app.get('/profile/{id}', (req, res) => res.send('Profile get here'));
