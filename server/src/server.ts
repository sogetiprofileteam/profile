import * as express from 'express';
import { Request, Response, Application } from 'express';
import { MongoClient, Db, MongoError } from 'mongodb';
import { corsMiddleware } from './utils';
import { ProfileRouter } from './routers/profile.router';
import { SearchRouter } from './routers/search.router';

const user = process.env.DB_USER;
const pwd = process.env.DB_PWD;
const dbName = 'sog-profile-dev';
const dbUri = process.env.DB_CONN || `mongodb://${user}:${pwd}@ds113358.mlab.com:13358/sog-profile-dev`;
if (!user || !pwd || !dbUri) {
  throw 'Database username, password, or connection URI not specified.'
}

let db: Db;

const app: Application = express();
app.use(corsMiddleware);
app.use(express.json());

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
  const searchRouter = new SearchRouter(db);
  app.use('/search', searchRouter.router);

  // Start the application after the database connection is ready
  app.listen(process.env.PORT || 3000);
  console.log("Listening on port 3000");
})();