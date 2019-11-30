import ApiService from './ApiService';
import { serviceUrl } from '../store/ExecutionStore';

export default class ExecutionResultService {
  static async getExecutionResultsbyId(id) {
    const result = await ApiService.doGet(`${serviceUrl}/executions/${id}/logs`);
    if (!result.isNil) {
      return result;
    }
    return 'No logs';
  }
}
