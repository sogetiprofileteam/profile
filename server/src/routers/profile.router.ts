import { Router } from 'express';
import { Request, Response, Application } from 'express';
import { Db, Collection } from 'mongodb';

export class ProfileRouter {
  
  private readonly collection: Collection<any>;
  public router: Router;

  constructor(private db: Db) {
    if (!db) { throw 'db is null or undefined.'; }
    this.collection = db.collection('profiles');
    this.router = Router();
    this.mountRoutes(this.router)
  }

  private mountRoutes(router: Router): void {
    
    router.post('/', async (req: Request, res: Response) => {
      const profile = req.body;
      try { 
        const result = await this.collection.insertOne(profile);
        res.send(result.insertedId);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
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