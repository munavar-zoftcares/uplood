// api/shared/types/express/index.d.ts
import { ClientInfo } from '../client-info';

declare module 'express-serve-static-core' {
  interface Request {
    clientInfo: ClientInfo;
    user?: any; // Optional – du kannst hier später auch einen konkreteren Typ verwenden
  }
}
