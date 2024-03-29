/* eslint-disable import/named */
// import { ResponseAccessTokenType } from '@/types/common/auth.type';
import { regenerateAccessToken } from '@apis/loginApi';
import { refreshTokenState } from '@atom/userAtom';
import { loginUrl } from '@constants/baseUrl';
import { authAxios } from '@utils/http';
// eslint-disable-next-line import/named
import {
  AxiosError,
  AxiosResponse,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const useAxiosInterceptor = () => {
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  // const accessToken = useRecoilValue(accessTokenState);
  const accessToken = localStorage.getItem('com.naver.nid.access_token');
  // const refreshToken = useRecoilValue(refreshTokenState);
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);

  const errorHandler = (error: AxiosError) => {
    console.log('errInterceptor!', error);
    if (error.response?.status === 401) {
      window.location.href = loginUrl;
    }
    if (error.response?.status === 406) {
      console.log('토큰 만료');
      try {
        if (refreshToken) {
          regenerateAccessToken(refreshToken.refreshToken).then((res) => {
            if (res.success) {
              localStorage.setItem(
                'com.naver.nid.access_token',
                res.response.accessToken
              );
              setRefreshToken({ refreshToken: res.response.refreshToken });
            }
          });
        }
      } catch (err) {
        console.error('엑세스 토큰 재발급 실패', err);
        window.location.href = loginUrl;
      }
    }
    return Promise.reject(error);
  };

  const requestHandler = async (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      config.headers = config.headers || {};
      (config.headers as AxiosRequestHeaders).Authorization = accessToken
        ? `Bearer ${accessToken}`
        : '';
    }

    // 엑세스토큰 없는 경우 리프레시 토큰으로 엑세스 토큰 재발급
    // else {
    //   try {
    //     const refreshResponse = await http.post<ResponseAccessTokenType>(
    //       'user-service/auth/token'
    //     );
    //     const newAccessToken = refreshResponse.accessToken;

    //     if (newAccessToken) {
    //       config.headers = config.headers || {};
    //       (
    //         config.headers as AxiosRequestHeaders
    //       ).Authorization = `Bearer ${newAccessToken}`;

    //       setAccessToken(refreshResponse);
    //     }
    //   } catch (error) {
    //     console.error('엑세스 토큰 재발급 실패: ', error);
    //     // 이후 로그인 화면으로 이동시키기
    //     window.location.href = loginUrl;
    //   }
    // }
    return config;
  };

  const responseHandler = <T,>(
    response: AxiosResponse<T>
  ): AxiosResponse<T> => {
    return response;
  };

  const requestInterceptor = authAxios.interceptors.request.use(requestHandler);

  const responseInterceptor = authAxios.interceptors.response.use(
    (response: AxiosResponse) => responseHandler(response),
    (error: AxiosError) => errorHandler(error)
  );

  useEffect(() => {
    return () => {
      authAxios.interceptors.request.eject(requestInterceptor);
      authAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
};
