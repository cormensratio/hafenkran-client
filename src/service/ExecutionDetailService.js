import { isNil } from 'lodash';
import { serviceUrl } from '../store/ExecutionStore';
import ApiService from './ApiService';

export default class ExecutionDetailService {
  static async getExecutionLogsbyId(id) {
    const result = await ApiService.doGet(`${serviceUrl}/executions/${id}/logs?withTimestamp=false`);
    if (result !== undefined) {
      return result;
    }
    return 'No new logs';
  }
  static async postUserInput(userInput, executionId) {
    let responseData;
    if (!isNil(userInput) && !isNil(executionId)) {
      const formData = new FormData();
      formData.append('input', userInput);
      responseData = await ApiService.doPost(`${serviceUrl}/executions/${executionId}/stdin`, formData);
    }
    return !!responseData;
  }
}
