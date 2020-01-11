import axios from 'axios';
import AuthService, { jwtToken, refreshToken } from '../../../src/service/AuthService';
import ApiService from '../../../src/service/ApiService';

const mockValidJwt = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDEiLCJleHAiOjE1NzQzNjgzMzYsInVzZXIiOnsiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDEiLCJuYW1lIjoiTW9ydGltZXIiLCJlbWFpbCI6IiIsImlzQWRtaW4iOnRydWV9LCJpYXQiOjE1NzQzNTAzMzZ9.9Y8eq2ygcdZunZxDY__V-jT-v1wy1NG9oF-W5A-kP5jGa0p7AT8v_fPQO6srdS9zd4s3yNCkEDWV8Df52ieamg';
const mockInvalidJwt = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDEiLCJleHAiC0wMDAwMDAwMDAwMDEiLCJuYW1lIjoiTW9ydGltZXIiLCJlbWFpbCI6IiIsImlzQWRtaW4iOnRydWV9LCJpYXQiOjE1NzQzNTAzMzZ9.9Y8eq2ygcdZunZxDY__V-jT-v1wy1NG9oF-W5A-kP5jGa0p7AT8v_fPQO6srdS9zd4s3yNCkEDWV8Df52ieamg';
const mockExtractedTokenInfo = {
  sub: '00000000-0000-0000-0000-000000000001',
  exp: 1575373110,
  user: {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Mortimer',
    email: '',
    isAdmin: true,
  },
};

describe('AuthService', () => {
  describe('extracts token info when', () => {
    beforeEach(() => {
      jwtToken.token = '';
      jwtToken.expires = 0;
      localStorage.clear();
    });

    test('token is valid', () => {
      // arrange
      AuthService.getTokenPayload = jest.fn(() => mockExtractedTokenInfo);
      AuthService.isTokenExpired = jest.fn(() => false);

      // act
      const returnValue = AuthService.extractTokenInfo(mockValidJwt);

      // assert
      expect(returnValue.token).toBe(mockValidJwt);
      expect(returnValue.expires).toBe(mockExtractedTokenInfo.exp);
    });

    test('token is invalid', () => {
      // arrange
      AuthService.getTokenPayload = jest.fn(() => undefined);

      // act
      const returnValue = AuthService.extractTokenInfo(mockInvalidJwt);

      // assert
      expect(returnValue).toBe(null);
    });

    test('token is empty', () => {
      // act
      const returnValueEmptyString = AuthService.extractTokenInfo('');
      const returnValueNull = AuthService.extractTokenInfo(null);

      // assert
      expect(returnValueEmptyString).toBe(null);
      expect(returnValueNull).toBe(null);
    });
  });

  describe('fetches refresh token', () => {
    const mockPassword = 'password';
    const mockUserName = 'Mortimer';

    beforeEach(() => {
      localStorage.clear();
    });

    test('successfully', async () => {
      // arrange
      const mockResponse = {
        jwtToken: mockValidJwt,
      };
      const mockExtractedInfo = {
        token: mockValidJwt,
        expires: mockExtractedTokenInfo.exp,
      };
      ApiService.doPost = jest.fn(() => mockResponse);
      AuthService.extractTokenInfo = jest.fn(() => mockExtractedInfo);

      // act
      const returnValue = await AuthService.fetchRefreshToken(mockUserName, mockPassword);

      // assert
      expect(returnValue).toBe(true);
      expect(refreshToken.token).toEqual(mockValidJwt);
      expect(refreshToken.expires).toEqual(mockExtractedTokenInfo.exp);
      expect(localStorage.getItem('refresh-token')).toEqual(mockValidJwt);
      expect(ApiService.doPost).toHaveBeenCalledTimes(1);
      expect(ApiService.doPost.mock.calls[0][0]).toBe(`${process.env.USER_SERVICE_URL}/authenticate`);
    });
    test('with error', async () => {
      // arrange
      ApiService.doPost = jest.fn(() => {});

      // act
      const returnValue = await AuthService.fetchRefreshToken(mockUserName, mockPassword);

      // assert
      expect(returnValue).toBe(false);
      expect(localStorage.getItem('refresh-token')).toBe(null);
      expect(ApiService.doPost).toHaveBeenCalledTimes(1);
      expect(ApiService.doPost.mock.calls[0][0]).toBe(`${process.env.USER_SERVICE_URL}/authenticate`);
    });
  });

  describe('fetches new jwt', () => {
    beforeEach(() => {
      refreshToken.token = '';
      refreshToken.expires = 0;
      jwtToken.token = '';
      jwtToken.expires = 0;
      localStorage.clear();
    });

    test('successfully', async () => {
      // arrange
      const mockResponse = {
        jwtToken: mockValidJwt,
      };
      const mockExtractedInfo = {
        token: mockValidJwt,
        expires: mockExtractedTokenInfo.exp,
      };
      axios.get = jest.fn(() => mockResponse);
      AuthService.extractTokenInfo = jest.fn(() => mockExtractedInfo);
      refreshToken.token = mockValidJwt;

      // act
      const returnValue = await AuthService.fetchNewJWT();

      // assert
      expect(returnValue).toBe(true);
      expect(localStorage.user).toEqual(mockValidJwt);
      expect(jwtToken.token).toEqual(mockValidJwt);
      expect(jwtToken.expires).toEqual(mockExtractedTokenInfo.exp);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get.mock.calls[0][0]).toBe(`${process.env.USER_SERVICE_URL}/refresh`);
      expect(axios.get.mock.calls[0][1]).toEqual({ headers: refreshToken.token });
    });
    test('with error', async () => {
      // arrange
      axios.get = jest.fn(() => undefined);

      // act
      const returnValue = await AuthService.fetchNewJWT();

      // assert
      expect(returnValue).toBe(false);
      expect(localStorage.getItem('user')).toEqual(null);
      expect(jwtToken.token).toEqual('');
      expect(jwtToken.expires).toEqual(0);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get.mock.calls[0][0]).toBe(`${process.env.USER_SERVICE_URL}/refresh`);
      expect(axios.get.mock.calls[0][1]).toEqual({ headers: refreshToken.token });
    });
  });

  describe('checks token validity', () => {
    test('successfully', () => {

    });
    test('with error', () => {

    });
  });
});
