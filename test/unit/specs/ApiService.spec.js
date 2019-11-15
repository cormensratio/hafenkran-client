import ApiService from '../../../src/service/ApiService';

const mockResponse = {
  response: {
    status: 200,
    data: {
      userId: 1,
      experiment: 'test',
    },
  },
};


jest.mock('axios', () => ({
  get: () => mockResponse,
}));

describe('doGet', () => {
  it('makes a request and returns the response data', () => {
    const responseData = ApiService.doGet('/test');
    expect(responseData).toEqual(mockResponse.data);
  });
});
