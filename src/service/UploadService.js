import { last, filter, isNil } from 'lodash';
import ApiService from './ApiService';

const fileFilter = ['zip'];

export default class UploadService {
  static checkFileType(fileName) {
    const type = last(fileName.split('.'));
    const matches = filter(fileFilter, f => f === type);

    return !isNil(matches) && matches.length === 1;
  }

  static getTimeStamp() {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    return `${date} ${time}`;
  }

  static uploadFile(file, filename, timestamp) {
    const formData = new FormData();
    formData.append('data', { file, filename, timestamp });

    ApiService.doPost('/experiment/uploadfile', formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    ).then(response => response);
  }
}
