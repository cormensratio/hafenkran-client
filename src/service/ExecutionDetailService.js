import { serviceUrl } from '../store/ExecutionStore';
import ApiService from './ApiService';

export default class ExecutionDetailService {
  static async getExecutionLogsbyId(id) {
    const result = await ApiService.doGet(`${serviceUrl}/executions/${id}/logs`);
    if (result !== undefined) {
      return result;
    }
    return 'No new logs';
  }
}
