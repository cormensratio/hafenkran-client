import { isNil, isEqual } from 'lodash';
import ApiService from './ApiService';

const fileFilter = 'application/x-tar';
const serviceUrl = process.env.CLUSTER_SERVICE_URL;

export default class UploadService {
  static checkFileType(file) {
    const type = file.type;
    return isEqual(type, fileFilter);
  }

  static getTimeStamp() {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    return `${date} ${time}`;
  }

  static async uploadFile(file, filename) {
    if (!isNil(file) && !isNil(filename)) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', filename);

      const responseData = await ApiService.doPost(`${serviceUrl}/experiments/uploadFile`, formData,
        { 'Content-Type': 'multipart/form-data' },
      );

      if (responseData) {
        return true;
      }
    }
    return false;
  }
}
