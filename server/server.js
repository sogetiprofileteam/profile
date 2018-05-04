const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const user = process.env.DB_USER;
const pwd = process.env.DB_PWD;
const dbName = 'sog-profile-dev';
if (!user || !pwd) {
  throw 'Database username or password not specified.'
}
const dbUri = `mongodb://${user}:${pwd}@ds113358.mlab.com:13358/sog-profile-dev`;

app.use(bodyParser.json());

app.get('/search', (req, res) => res.send('search'));

app.post('/profile', (req, res) => {
  const profile = req.body;

  MongoClient.connect(dbUri, function(err, client) {
    if (err) {
      throw err;
    }
    const db = client.db(dbName);
    const collection = db.collection('profiles');
    collection.insertOne(profile, (err, result) => {
      client.close();
      res.send(result.insertedId);
    });
  });
});

app.put('/profile/{id}', (req, res) => res.send('Profile Put here'));
app.delete('/profile/{id}', (req, res) => res.send('Profile delete here'));
app.get('/profile/{id}', (req, res) => res.send('Profile get here'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));