import { Request, Response, Application } from 'express';
import { NextFunction } from 'express-serve-static-core';

export const corsMiddleware = function(req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(204);
  }
  else {
    next();
  }
};