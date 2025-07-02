import { Router, Request, Response } from 'express';
import { getHealthStatus } from '../services/healthService';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const status = getHealthStatus();
  res.status(200).json(status);
});

export default router;
