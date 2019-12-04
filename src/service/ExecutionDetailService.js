import { serviceUrl } from '../store/ExecutionStore';
import ApiService from './ApiService';

export default class ExecutionResultService {
  static async getExecutionResultsbyId(id) {
    const result = await ApiService.doGet(`${serviceUrl}/executions/${id}/logs`);
    if (result !== 'undefined') {
      return result;
    }
    return 'No logs';
  }
}
