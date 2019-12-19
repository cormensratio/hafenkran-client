import Vue from 'vue';
import Vuex from 'vuex';
import { isNil } from 'lodash';
import ApiService from '../service/ApiService';

export const serviceUrl = process.env.REPORTING_SERVICE_URL;

Vue.use(Vuex);

const ResultStore = {
  state: {
    resultList: {
      executionId: '1',
      updatedAt: '',
      results: [
        {
          id: '1',
          type: 'CSV',
          file: 'eDt5CjA7MAoxOzEKMjsyCjM7Mwo0OzQKNTs1CjY7Ngo3OzcKODs4Cjk7OQoK',
        },
        {
          id: '2',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '4',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzEKMjsyCjM7Mwo0OzQKNTs1CjY7Ngo3OzcKODs4Cjk7OQoK',
        },
        {
          id: '5',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '6',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzEKMjsyCjM7Mwo0OzQKNTs1CjY7Ngo3OzcKODs4Cjk7OQoK',
        },
        {
          id: '7',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '8',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '9',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzEKMjsyCjM7Mwo0OzQKNTs1CjY7Ngo3OzcKODs4Cjk7OQoK',
        },
        {
          id: '10',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '3',
          type: 'log',
          file: 'dGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFsYmFsYmFsYWJs\n' +
            'YmFsYmFsYmFibGFsYWJhbGFsCnRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxh\n' +
            'YmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxhbGFiYWxhbAp0ZXN0IGhhbGxvIHRlc3QgbW9p\n' +
            'bnNlbiBzZXBwIGh1YWJhIGJsYWJibGFibGFiYWxiYWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFsYWwK\n' +
            'dGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFsYmFsYmFsYWJs\n' +
            'YmFsYmFsYmFibGFsYWJhbGFsCnRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxh\n' +
            'YmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxhbGFiYWxhbAp0ZXN0IGhhbGxvIHRlc3QgbW9p\n' +
            'bnNlbiBzZXBwIGh1YWJhIGJsYWJibGFibGFiYWxiYWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFsYWwK\n' +
            'CnRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFi\n' +
            'bGJhbGJhbGJhYmxhbGFiYWxhbAp0ZXN0IGhhbGxvIHRlc3QgbW9pbnNlbiBzZXBwIGh1YWJhIGJs\n' +
            'YWJibGFibGFiYWxiYWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFsYWwKdGVzdCBoYWxsbyB0ZXN0IG1v\n' +
            'aW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFibGFsYWJhbGFs\n' +
            'CnRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFi\n' +
            'bGJhbGJhbGJhYmxhbGFiYWxhbAp0ZXN0IGhhbGxvIHRlc3QgbW9pbnNlbiBzZXBwIGh1YWJhIGJs\n' +
            'YWJibGFibGFiYWxiYWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFsYWwKdGVzdCBoYWxsbyB0ZXN0IG1v\n' +
            'aW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFibGFsYWJhbGFs\n' +
            'CgoKdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFsYmFsYmFs\n' +
            'YWJsYmFsYmFsYmFibGFsYWJhbGFsCnRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVhYmEg\n' +
            'YmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxhbGFiYWxhbAp0ZXN0IGhhbGxvIHRlc3Qg\n' +
            'bW9pbnNlbiBzZXBwIGh1YWJhIGJsYWJibGFibGFiYWxiYWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFs\n' +
            'YWwKdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFsYmFsYmFs\n' +
            'YWJsYmFsYmFsYmFibGFsYWJhbGFsCnRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVhYmEg\n' +
            'YmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxhbGFiYWxhbAp0ZXN0IGhhbGxvIHRlc3Qg\n' +
            'bW9pbnNlbiBzZXBwIGh1YWJhIGJsYWJibGFibGFiYWxiYWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFs\n' +
            'YWwKdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFsYmFsYmFs\n' +
            'YWJsYmFsYmFsYmFibGFsYWJhbGFsdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBi\n' +
            'bGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFibGFsYWJhbGFsCnRlc3QgaGFsbG8gdGVzdCBt\n' +
            'b2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxhbGFiYWxh\n' +
            'bAp0ZXN0IGhhbGxvIHRlc3QgbW9pbnNlbiBzZXBwIGh1YWJhIGJsYWJibGFibGFiYWxiYWxiYWxh\n' +
            'YmxiYWxiYWxiYWJsYWxhYmFsYWwKdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBi\n' +
            'bGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFibGFsYWJhbGFsCnRlc3QgaGFsbG8gdGVzdCBt\n' +
            'b2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxhbGFiYWxh\n' +
            'bAp0ZXN0IGhhbGxvIHRlc3QgbW9pbnNlbiBzZXBwIGh1YWJhIGJsYWJibGFibGFiYWxiYWxiYWxh\n' +
            'YmxiYWxiYWxiYWJsYWxhYmFsYWwKdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBi\n' +
            'bGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFibGFsYWJhbGFsCnYKdGVzdCBoYWxsbyB0ZXN0\n' +
            'IG1vaW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFibGFsYWJh\n' +
            'bGFsCnRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJh\n' +
            'bGFibGJhbGJhbGJhYmxhbGFiYWxhbAp2CnRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVh\n' +
            'YmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxhbGFiYWxhbAp0ZXN0IGhhbGxvIHRl\n' +
            'c3QgbW9pbnNlbiBzZXBwIGh1YWJhIGJsYWJibGFibGFiYWxiYWxiYWxhYmxiYWxiYWxiYWJsYWxh\n' +
            'YmFsYWwKdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFsYmFs\n' +
            'YmFsYWJsYmFsYmFsYmFibGFsYWJhbGFsCnRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVh\n' +
            'YmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxhbGFiYWxhbAp0ZXN0IGhhbGxvIHRl\n' +
            'c3QgbW9pbnNlbiBzZXBwIGh1YWJhIGJsYWJibGFibGFiYWxiYWxiYWxhYmxiYWxiYWxiYWJsYWxh\n' +
            'YmFsYWwKdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFsYmFs\n' +
            'YmFsYWJsYmFsYmFsYmFibGFsYWJhbGFsCnYKdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBo\n' +
            'dWFiYSBibGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFibGFsYWJhbGFsCnRlc3QgaGFsbG8g\n' +
            'dGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxh\n' +
            'bGFiYWxhbAp0ZXN0IGhhbGxvIHRlc3QgbW9pbnNlbiBzZXBwIGh1YWJhIGJsYWJibGFibGFiYWxi\n' +
            'YWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFsYWwKdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBo\n' +
            'dWFiYSBibGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFibGFsYWJhbGFsCnRlc3QgaGFsbG8g\n' +
            'dGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxh\n' +
            'bGFiYWxhbHRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJh\n' +
            'bGJhbGFibGJhbGJhbGJhYmxhbGFiYWxhbAoKdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBo\n' +
            'dWFiYSBibGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFibGFsYWJhbGFsCnRlc3QgaGFsbG8g\n' +
            'dGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxh\n' +
            'bGFiYWxhbHYKdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFs\n' +
            'YmFsYmFsYWJsYmFsYmFsYmFibGFsYWJhbGFsCnYKdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2Vw\n' +
            'cCBodWFiYSBibGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFibGFsYWJhbGFsCnRlc3QgaGFs\n' +
            'bG8gdGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJh\n' +
            'YmxhbGFiYWxhbHRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJh\n' +
            'bGJhbGJhbGFibGJhbGJhbGJhYmxhbGFiYWxhbHRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAg\n' +
            'aHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxhbGFiYWxhbHRlc3QgaGFsbG8g\n' +
            'dGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxh\n' +
            'bGFiYWxhbAp0ZXN0IGhhbGxvIHRlc3QgbW9pbnNlbiBzZXBwIGh1YWJhIGJsYWJibGFibGFiYWxi\n' +
            'YWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFsYWwKdGVzdCBoYWxsbyB0ZXN0IG1vaW5zZW4gc2VwcCBo\n' +
            'dWFiYSBibGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFibGFsYWJhbGFsCnRlc3QgaGFsbG8g\n' +
            'dGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxh\n' +
            'bGFiYWxhbAp0ZXN0IGhhbGxvIHRlc3QgbW9pbnNlbiBzZXBwIGh1YWJhIGJsYWJibGFibGFiYWxi\n' +
            'YWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFsYWx0ZXN0IGhhbGxvIHRlc3QgbW9pbnNlbiBzZXBwIGh1\n' +
            'YWJhIGJsYWJibGFibGFiYWxiYWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFsYWwKCnRlc3QgaGFsbG8g\n' +
            'dGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxh\n' +
            'bGFiYWxhbHRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJhbGJh\n' +
            'bGJhbGFibGJhbGJhbGJhYmxhbGFiYWxhbAp0ZXN0IGhhbGxvIHRlc3QgbW9pbnNlbiBzZXBwIGh1\n' +
            'YWJhIGJsYWJibGFibGFiYWxiYWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFsYWwKdGVzdCBoYWxsbyB0\n' +
            'ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFibGFs\n' +
            'YWJhbGFsCgp0ZXN0IGhhbGxvIHRlc3QgbW9pbnNlbiBzZXBwIGh1YWJhIGJsYWJibGFibGFiYWxi\n' +
            'YWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFsYWwKdgp0ZXN0IGhhbGxvIHRlc3QgbW9pbnNlbiBzZXBw\n' +
            'IGh1YWJhIGJsYWJibGFibGFiYWxiYWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFsYWwKdGVzdCBoYWxs\n' +
            'byB0ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFi\n' +
            'bGFsYWJhbGFsCnRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJh\n' +
            'bGJhbGJhbGFibGJhbGJhbGJhYmxhbGFiYWxhbAp0ZXN0IGhhbGxvIHRlc3QgbW9pbnNlbiBzZXBw\n' +
            'IGh1YWJhIGJsYWJibGFibGFiYWxiYWxiYWxhYmxiYWxiYWxiYWJsYWxhYmFsYWwKdGVzdCBoYWxs\n' +
            'byB0ZXN0IG1vaW5zZW4gc2VwcCBodWFiYSBibGFiYmxhYmxhYmFsYmFsYmFsYWJsYmFsYmFsYmFi\n' +
            'bGFsYWJhbGFsCnRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAgaHVhYmEgYmxhYmJsYWJsYWJh\n' +
            'bGJhbGJhbGFibGJhbGJhbGJhYmxhbGFiYWxhbHRlc3QgaGFsbG8gdGVzdCBtb2luc2VuIHNlcHAg\n' +
            'aHVhYmEgYmxhYmJsYWJsYWJhbGJhbGJhbGFibGJhbGJhbGJhYmxhbGFiYWxhbAp0ZXN0IGhhbGxv\n' +
            'IHRlc3QgbW9pbnNlbiBzZXBwIGh1YWJhIGJsYWJibGFibGFiYWxiYWxiYWxhYmxiYWxiYWxiYWJs\n' +
            'YWxhYmFsYWwKdgoK',
        },
      ],
    },
  },
  getters: {
    resultList: state => state.resultList,
  },
  mutations: {
    updateResults(state, resultList) {
      state.resultList = resultList;
    },
  },
  actions: {
    async fetchResultsByExecutionId({ commit }, executionId) {
      if (!isNil(executionId)) {
        const resultList = await ApiService.doGet(`${serviceUrl}/results/${executionId}`);
        if (!isNil(resultList)) {
          commit('updateResults', resultList);
          return resultList;
        }
      }
      return null;
    },
  },
};

export default ResultStore;
