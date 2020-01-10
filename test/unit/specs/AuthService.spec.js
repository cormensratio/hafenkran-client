import AuthService, { jwtToken } from '../../../src/service/AuthService';

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
      expect(returnValue.token).toBe(mockValidJwtToken);
      expect(returnValue.expires).toBe(mockExtractedTokenInfo.exp);
    });

    test('token is invalid', () => {
      // arrange
      AuthService.getTokenPayload = jest.fn(() => undefined);

      // act
      const returnValue = AuthService.extractTokenInfo(mockInvalidJwtToken);

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
    test('successfully', () => {

    });
    test('with error', () => {

    });
  });

  describe('fetches new jwt', () => {
    test('successfully', () => {

    });
    test('with error', () => {

    });
  });

  describe('checks token validity', () => {
    test('successfully', () => {

    });
    test('with error', () => {

    });
  });
});
