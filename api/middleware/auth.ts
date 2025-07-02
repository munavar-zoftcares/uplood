// api/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface SupabaseJwtPayload extends JwtPayload {
  role?: string;
  iss?: string;
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.decode(token) as SupabaseJwtPayload;
    
    if (
      !decoded ||
      !decoded.sub ||
      !decoded.role ||
      decoded.iss !== `${process.env.SUPABASE_URL}/auth/v1`
    ) {
      throw new Error('Invalid token structure');
    }

    // Hier ist req.user automatisch vorhanden
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized: Invalid token',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
