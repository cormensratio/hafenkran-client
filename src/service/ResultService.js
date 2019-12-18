import { isNil } from 'lodash';
import csv2json from 'csvjson-csv2json';

export default class ResultService {
  static extractFileObjectFromBase64String(fileString, fileName) {
    if (!isNil(fileString) && !isNil(fileName) && fileString !== '') {
      const decoded = atob(fileString);

      if (!isNil(decoded)) {
        return new File([decoded], fileName);
      }
    }
    return null;
  }

  static convertCsVToJson(csvString) {
    if (!isNil(csvString)) {
      try {
        const jsonObj = csv2json(csvString, { parseNumbers: true });

        if (!isNil(jsonObj)) {
          return jsonObj;
        }
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  }

  static extractFileContent(fileObject, callBack) {
    if (!isNil(fileObject)) {
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        const reader = new FileReader();
        reader.readAsText(fileObject);
        reader.onload = () => callBack(reader.result);
      } else {
        console.log('[ERROR] The browser does not support file reading!');
      }
    }
  }
}
