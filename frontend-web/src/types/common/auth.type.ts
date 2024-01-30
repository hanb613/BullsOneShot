import { ResponseErrorType } from './common.type';

export type ResponseLoginType = {
  success: boolean;
  response: ResponseUserInfoType;
  error: ResponseErrorType;
};

export type ResponseUserInfoType = {
  accessToken: string;
  refreshToken: string;
  name: string;
};

export type AccessTokenType = {
  accessToken: string;
};

export type RefreshTokenType = {
  refreshToken: string;
};

export type UserInfoType = {
  name: string;
};
