import AuthService, { jwtToken } from '../../../src/service/AuthService';
import ApiService from '../../../src/service/ApiService';

const mockValidJwtToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDEiLCJleHAiOjE1NzQzNjgzMzYsInVzZXIiOnsiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDEiLCJuYW1lIjoiTW9ydGltZXIiLCJlbWFpbCI6IiIsImlzQWRtaW4iOnRydWV9LCJpYXQiOjE1NzQzNTAzMzZ9.9Y8eq2ygcdZunZxDY__V-jT-v1wy1NG9oF-W5A-kP5jGa0p7AT8v_fPQO6srdS9zd4s3yNCkEDWV8Df52ieamg';
const mockInvalidJwtToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDEiLCJleHAiC0wMDAwMDAwMDAwMDEiLCJuYW1lIjoiTW9ydGltZXIiLCJlbWFpbCI6IiIsImlzQWRtaW4iOnRydWV9LCJpYXQiOjE1NzQzNTAzMzZ9.9Y8eq2ygcdZunZxDY__V-jT-v1wy1NG9oF-W5A-kP5jGa0p7AT8v_fPQO6srdS9zd4s3yNCkEDWV8Df52ieamg';
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
      const returnValue = AuthService.extractTokenInfo(mockValidJwtToken);

      // assert
      expect(returnValue).toBe(true);
      expect(jwtToken.token).toBe(mockValidJwtToken);
      expect(jwtToken.expires).toBe(1575373110);
      expect(localStorage.user).toBe(mockValidJwtToken);
    });

    test('token is invalid', () => {
      // arrange
      AuthService.getTokenPayload = jest.fn(() => undefined);

      // act
      const returnValue = AuthService.extractTokenInfo(mockInvalidJwtToken);

      // assert
      expect(returnValue).toBe(false);
      expect(localStorage.user).toBe(undefined);
      expect(jwtToken.token).toBe('');
    });

    test('token is empty', () => {
      // act
      const returnValueEmptyString = AuthService.extractTokenInfo('');
      const returnValueNull = AuthService.extractTokenInfo(null);

      // assert
      expect(returnValueEmptyString).toBe(false);
      expect(returnValueNull).toBe(false);
    });
  });

  describe('fetches token', () => {
    const name = 'Rick';
    const pw = 'test';

    test('successfully', async () => {
      // arrange
      ApiService.doPost = jest.fn(() => ({ jwtToken: mockValidJwtToken }));

      // act
      const returnValue = await AuthService.fetchToken(name, pw);

      // assert
      expect(returnValue).toBe(mockValidJwtToken);
      expect(ApiService.doPost).toHaveBeenCalledTimes(1);
      expect(ApiService.doPost.mock.calls[0][0]).toBe(`${process.env.USER_SERVICE_URL}/authenticate`);
    });

    test('with error', async () => {
      // arrange
      ApiService.doPost = jest.fn(() => null);

      // act
      const returnValue = await AuthService.fetchToken(name, pw);

      // assert
      expect(returnValue).toBe(null);
      expect(ApiService.doPost).toHaveBeenCalledTimes(1);
      expect(ApiService.doPost.mock.calls[0][0]).toBe(`${process.env.USER_SERVICE_URL}/authenticate`);
    });
  });
});
