import express from 'express';
import serverResponses from '../utils/helpers/responses';
import messages from '../config/messages';
import { evaluateApiPerformance } from '../api/performanceAPIHelper';
import { Request, Response } from 'express';
import logger from '../utils/helpers/logger';
import { checkAuthMiddleware } from '../middleware/auth';

const routes = (app) => {
  const router = express.Router();

  router.post('/graphql', checkAuthMiddleware, async (req: Request, res: Response) => {
    try {
      const { graphqlQuery, virtualUsers } = req.body;
      logger.info(`Request received at /graphql : ${JSON.stringify({ graphqlQuery, virtualUsers })}`);
      const result = await evaluateApiPerformance(virtualUsers, graphqlQuery);
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
    } catch (error: unknown) {
      serverResponses.sendError(res, messages.BAD_REQUEST);
    }
  });

  router.get('/test', (req: Request, res) => {
    res.send('Server listening.');
  });

  app.use('/api', router);
};

export default routes;
