import { Router } from 'express';
import { Request, Response, Application } from 'express';
import { Db, Collection, ObjectId, GridFSBucket } from 'mongodb';

export class FileRouter {
  
  private readonly collection: Collection<any>;
  public router: Router;

  constructor(private db: Db) {
    if (!db) { throw 'db is null or undefined.'; }
    this.router = Router();
    this.mountRoutes(this.router)
  }

  private mountRoutes(router: Router): void {
    
    router.post('/', (req: Request, res: Response) => {
      const bucket = new GridFSBucket(this.db);
      // res.sendStatus(200);
      req
        .pipe(bucket.openUploadStream('file'))
        .on('finish', (object: any) => {
          console.log(object);
          res.status(201);
          res.send(object._id);
        })
        .on('error', (error: Error) => {
          console.log(error);
          res.sendStatus(500);
        });
    });
  }
}