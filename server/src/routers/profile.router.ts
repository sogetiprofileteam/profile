import { Router } from 'express';
import { Request, Response, Application } from 'express';
import { Db, Collection, ObjectId } from 'mongodb';

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
        res.status(201);
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
    
    router.get('/:id', async (req: Request, res: Response) => {
      const id = req.params.id;
      if (!id) {
        res.status(400);
        res.send({
          message: 'Parameter id is required.'
        });
      }
      try { 
        const result = await this.collection.findOne(new ObjectId(id));
        console.log(result);
        res.send(result);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });

    router.get('/', async (req: Request, res: Response) => {
      // is this the best way to convert the query params to numbers (which mongo requires)?
      const page = req.query.page && req.query.page * 1 || 1;
      const size = req.query.size && req.query.size * 1 || 10;
      const skip = (page - 1) * size;
      try { 
        const result = await this.collection.find();
        const allProfiles = await result.skip(skip).limit(size).toArray();
        res.send(allProfiles);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });
  }
}