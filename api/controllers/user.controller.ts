// api/controllers/user.controller.ts
import { Request, Response } from 'express';
import { supabase } from '../configs/database';
import { sendErrorResponse, sendSuccessResponse } from '../utils/http.utils';
import { logger } from '../utils/logger';

export class UserController {
  async deleteAccount(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.sub;
      if (!userId) {
        await sendErrorResponse(res, 401, "User not authenticated", req.clientInfo);
        return;
      }

      logger.info('Starting account deletion process', {
        context: 'UserController',
        metadata: { userId }
      });

      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      if (authError) {
        logger.error('Failed to delete user authentication', {
          context: 'UserController',
          error: authError.message,
          metadata: { userId }
        });
        throw authError;
      }

      logger.info('Successfully deleted user account', {
        context: 'UserController',
        metadata: { userId }
      });

      sendSuccessResponse(res, { 
        message: "Account successfully deleted", 
        forceLogout: true 
      }, req.clientInfo);
    } catch (error) {
      logger.error('Error deleting user account', {
        context: 'UserController',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      sendErrorResponse(
        res,
        500,
        error instanceof Error ? error.message : 'Failed to delete account',
        req.clientInfo
      );
    }
  }
}

export const userController = new UserController();
