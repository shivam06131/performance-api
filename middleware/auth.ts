import { NextFunction, Request, Response } from 'express';

export const checkAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Get the authorization header
  console.log(req.headers);
  const authHeader = req.headers.authheader;

  // Check if the header exists and matches the expected value
  if (!authHeader || authHeader !== 'TEST_AUTH') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // If authorized, continue with the request
  next();
};
