import { Router } from 'express';
import { Request, Response, Application } from 'express';
import { Db, Collection, ObjectId } from 'mongodb';

export class SearchRouter {
  
  private readonly collection: Collection<any>;
  public router: Router;

  constructor(private db: Db) {
    if (!db) { throw 'db is null or undefined.'; }
    this.collection = db.collection('profiles');
    this.router = Router();
    this.mountRoutes(this.router)
  }

  private mountRoutes(router: Router): void {
    router.get('/', (req: Request, res: Response) => {
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
    
      this.collection.find(query).toArray(function(err, results) {
        if (err) {
          throw err;
        }
        res.send(results);
      });
    });
  }
}