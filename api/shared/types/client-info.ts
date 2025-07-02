// api/shared/types/client-info.ts
export interface ClientInfo {
    clientIP: string;
    forwardedIP?: string;
    realIP?: string;
    userAgent?: string;
    requestInfo: {
      method: string;
      path: string;
      protocol: string;
      hostname: string;
      timestamp: string;
    };
  }
  