import { Request } from "express";

export enum ETokenType {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export interface TokenResponse {
  accessToken?: string;
  expiresAt?: number; // timestamp when access token expire
  refreshToken?: string;
  refreshExpiresAt?: number; // timestamp when refresh token expire
}

export interface LoginSessionInfo {
  _id: string;
  // loginSessionId: string;
  email: string;
}

export interface RequestWithUser extends Request {
  user: LoginSessionInfo;
}
