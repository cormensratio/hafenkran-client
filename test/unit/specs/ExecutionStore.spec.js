import ExecutionStore from '../../../src/store/ExecutionStore';
import ApiService from '../../../src/service/ApiService';

const mockExecutions = [
  {
    id: '1',
    experimentId: '1',
    name: 'Test Execution',
    createdAt: new Date(),
    terminatedAt: new Date(),
    status: '',
    ram: '',
    cpu: '',
    bookedTime: '',
  },
];

jest.mock('../../../src/service/ApiService', () => jest.fn());

describe('ExecutionStore', () => {
  it('fetches all executions of a user', async () => {
    // arrange
    ApiService.doGet = jest.fn(() => mockExecutions);
    const commit = jest.fn();

    // act
    await ExecutionStore.actions.fetchAllExecutionsOfUser({ commit });

    // assert
    // check that Api is called only one time
    expect(ApiService.doGet).toHaveBeenCalledTimes(1);

    // check that commit was called exactly one time
    expect(commit.mock.calls.length).toBe(1);

    // check if the right mutation is called
    expect(commit.mock.calls[0][0]).toBe('updateExecutions');

    // check if the right executions are passed to the mutation
    expect(commit.mock.calls[0][1]).toBe(mockExecutions);
  });

  describe('terminates an execution', () => {
    test('successfully', async () => {
      // arrange
      const executionId = 1;
      const dispatch = jest.fn();
      ApiService.doPost = jest.fn(() => mockExecutions[0]);

      // act
      const returnValue = await ExecutionStore.actions.terminateExecution(
        { dispatch }, executionId);

      // assert
      expect(returnValue).toBe(true);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
