import ExecutionDetailService from '../../../src/service/ExecutionDetailService';

jest.mock('../../../src/service/ExecutionDetailService', () => jest.fn());

const executionDetails = [{
  id: '1',
  experimentId: '1',
  name: 'Test Execution',
  createdAt: new Date(),
  terminatedAt: new Date(),
  status: '',
  ram: '',
  cpu: '',
  bookedTime: '',
}];

const response = { data: executionDetails };

describe('ExecutionDetailSerivce', () => {
  it('should get the mocked logs', () => {
    ExecutionDetailService.getExecutionLogsbyId(executionDetails.id).then((data) => {
      expect(data)
        .toEqual(response.data);
    });
  });
});
