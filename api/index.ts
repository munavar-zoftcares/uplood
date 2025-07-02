// api/index.ts
import express from 'express';
import cors from 'cors';
import { corsOptions } from './configs/cors';
import healthRouter from './routes/health';
import userRouter from './routes/user.routes';

const app = express();

// Globale Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Routen mounten
app.use('/api/health', healthRouter);
app.use('/api/user', userRouter);

// Nur lokal: Listener starten, wenn das Skript direkt ausgeführt wird
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
