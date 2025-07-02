// api/utils/logger.ts
export class Logger {
    info(message: string, meta?: any): void {
      console.log(`INFO: ${message}`, meta);
    }
    error(message: string, meta?: any): void {
      console.error(`ERROR: ${message}`, meta);
    }
    debug(message: string, meta?: any): void {
      console.debug(`DEBUG: ${message}`, meta);
    }
  }
  
  export const logger = new Logger();
  