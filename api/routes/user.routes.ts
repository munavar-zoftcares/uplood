import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.put('/delete-account', verifyToken, async (req, res) => {
  await userController.deleteAccount(req, res);
});

export default router;
