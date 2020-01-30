import ApiService from '../../../src/service/ApiService';
import ResultStore from '../../../src/store/ResultStore';

jest.mock('../../../src/service/ApiService', () => jest.fn());

const mockExecutionId = '1';
const mockResultListResponse = {
  resultList: {
    executionId: mockExecutionId,
    updatedAt: new Date(),
    resultList: [
      {
        name: 'test',
        type: 'log',
        file: 'base64FileString',
      },
    ],
  },
};
const mockMetricsResponse = {
  metrics: {
    cpuUnit: 'MilliCore',
    ramUnit: 'KiB',
    metricList: [
      {
        memory: 23345,
        cpu: 2,
        timestamp: new Date(),
      },
    ],
  },
};
const mockServiceUrl = process.env.REPORTING_SERVICE_URL;

// vuex mocks
let commit;

describe('ResultStore', () => {
  describe('fetches results of execution', () => {
    beforeEach(() => {
      commit = jest.fn();
    });

    test('successfully', async () => {
      // arrange
      ApiService.doGet = jest.fn(() => mockResultListResponse);

      // act
      const returnValue = await ResultStore.actions.fetchResultsByExecutionId(
        { commit }, mockExecutionId);

      // assert
      expect(returnValue).toEqual(mockResultListResponse);
      expect(ApiService.doGet).toHaveBeenCalledWith(`${mockServiceUrl}/results/${mockExecutionId}`);
      expect(ApiService.doGet).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith('updateResults', mockResultListResponse);
    });
    test('with error', async () => {
      // arrange
      ApiService.doGet = jest.fn(() => null);

      // act
      const returnValue = await ResultStore.actions.fetchResultsByExecutionId(
        { commit }, mockExecutionId);

      // assert
      expect(returnValue).toBe(null);
      expect(ApiService.doGet).toHaveBeenCalledWith(`${mockServiceUrl}/results/${mockExecutionId}`);
      expect(ApiService.doGet).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledTimes(0);
    });
  });

  describe('fetches metrics of execution', () => {
    beforeEach(() => {
      commit = jest.fn();
    });

    test('successfully', async () => {
      // arrange
      ApiService.doGet = jest.fn(() => mockMetricsResponse);

      // act
      const returnValue = await ResultStore.actions.fetchMetricsByExecutionId(
        { commit }, mockExecutionId);

      // assert
      expect(returnValue).toEqual(mockMetricsResponse);
      expect(ApiService.doGet).toHaveBeenCalledWith(`${mockServiceUrl}/metrics/${mockExecutionId}`);
      expect(ApiService.doGet).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith('updateMetrics', mockMetricsResponse);
    });
    test('with error', async () => {
      // arrange
      ApiService.doGet = jest.fn(() => null);

      // act
      const returnValue = await ResultStore.actions.fetchMetricsByExecutionId(
        { commit }, mockExecutionId);

      // assert
      expect(returnValue).toBe(null);
      expect(ApiService.doGet).toHaveBeenCalledWith(`${mockServiceUrl}/metrics/${mockExecutionId}`);
      expect(ApiService.doGet).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledTimes(0);
    });
  });
});

