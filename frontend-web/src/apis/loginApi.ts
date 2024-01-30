import { ResponseLoginType } from '@/types/common/auth.type';
import { authHttp } from '@utils/http';

export async function getAccessToken(
  authCode: string,
  state: string
): Promise<ResponseLoginType> {
  return authHttp.post(`auth/naver`, {
    authCode: authCode,
    state: state,
  });
}

export async function regenerateAccessToken(
  refreshToken: string
): Promise<ResponseLoginType> {
  return authHttp.post(`token/create`, {
    refreshToken,
  });
}
