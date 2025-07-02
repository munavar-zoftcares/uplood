import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: '*', // In der Produktion ggf. auf bestimmte Domains einschränken
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
