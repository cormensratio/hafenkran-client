import ExecutionDetailService from '../../../src/service/ExecutionDetailService';
import ApiService from '../../../src/service/ApiService';

jest.mock('../../../src/service/ApiService', () => jest.fn());

const logs = 'test';

const response = { data: logs };

describe('ExecutionDetailSerivce', () => {
  test('should get the mocked logs', () => {
    ApiService.doGet = jest.fn(() => logs);
    ExecutionDetailService.getExecutionLogsbyId(1).then(() => {
      expect(logs).toEqual(response.data);
    });
  });
});
