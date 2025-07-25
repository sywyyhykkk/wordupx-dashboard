import { request } from '../request';

/**
 * Login
 *
 * @param username Username
 * @param password Password
 */
export function fetchLogin(username: string, password: string) {
  return request<Api.Auth.LoginToken>({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
}

export function fetchUserLogin(username: string, password: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
}

export function fetchUserRegister(email: string, username: string, password: string) {
  return request({
    url: '/auth/register',
    method: 'post',
    data: {
      email,
      username,
      password
    }
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/auth/getUserInfo' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}
