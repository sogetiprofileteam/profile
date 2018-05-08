import { Router } from 'express';
import { Request, Response, Application } from 'express';
import { Db } from 'mongodb';

export class ProfileRouter {

  public router: Router;

  constructor(private db: Db) {
    if (!db) { throw 'db is null or undefined.'; }
    this.router = Router();
    this.mountRoutes(this.router)
  }

  private mountRoutes(router: Router): void {
    
    router.post('/', (req: Request, res: Response) => {
      const profile = req.body;
      const collection = this.db.collection('profiles');
        collection.insertOne(profile, (err, result) => {
          res.send(result.insertedId);
        });
    });
    
    router.put('/:id', (req: Request, res: Response) => {
      console.log(req.params.id);
      res.send('Profile Put here');
    });
    
    router.delete('/:id', (req: Request, res: Response) => res.send('Profile delete here'));
    
    router.get('/:id', (req: Request, res: Response) => {
      console.log(req.params.id);
      res.send('Profile Put here');
    });
  }
}