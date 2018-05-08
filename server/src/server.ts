import * as express from 'express';
import { Request, Response, Application } from 'express';
import { MongoClient, Db, MongoError } from 'mongodb';
import { corsMiddleware } from './utils';
import { ProfileRouter } from './routers/profile.router';

const user = process.env.DB_USER;
const pwd = process.env.DB_PWD;
const dbName = 'sog-profile-dev';
const dbUri = `mongodb://${user}:${pwd}@ds113358.mlab.com:13358/sog-profile-dev`;
if (!user || !pwd) {
  throw 'Database username or password not specified.'
}

let db: Db;

const app: Application = express();
app.use(corsMiddleware);

app.get('/search', (req: Request, res: Response) => {
  const practice = req.query.practice;
  const skills = req.query.skill;
  const ato = req.query.ato;

  const query: { [index:string] : string | {} } = {};
  if (practice) {
    query['practice'] = practice;
  }
  if (ato) {
    query['ato'] = ato;
  }
  if (skills) {
    // if skills is not already an array, make one
    const arrayOfSkills = [].concat(skills);
    query['skills'] = { $in: arrayOfSkills }
  }

  db.collection('profiles').find(query).toArray(function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

// Initialize connection once
(async () => { 
  try {
    const client = await MongoClient.connect(dbUri);
    db = client.db(dbName);
  } catch (error) {
    console.log(error);
  }

  const profileRouter = new ProfileRouter(db);
  app.use('/profile', profileRouter.router);

  // Start the application after the database connection is ready
  app.listen(process.env.PORT || 3000);
  console.log("Listening on port 3000");
})();