import {
  AccessTokenType,
  RefreshTokenType,
  UserInfoType,
} from '@/types/common/auth.type';
import { atom } from 'recoil';

export const accessTokenState = atom<AccessTokenType | null>({
  key: 'accessToken', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const refreshTokenState = atom<RefreshTokenType | null>({
  key: 'refreshToken',
  default: null,
});

export const userState = atom<UserInfoType | null>({
  key: 'user',
  default: null,
});
