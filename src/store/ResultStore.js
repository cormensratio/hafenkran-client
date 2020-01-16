import Vue from 'vue';
import Vuex from 'vuex';
import { isNil } from 'lodash';
import ApiService from '../service/ApiService';

export const serviceUrl = process.env.REPORTING_SERVICE_URL;

Vue.use(Vuex);

const ResultStore = {
  state: {
    resultList: {
      executionId: '',
      updatedAt: '',
      resultList: [
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'Dichtheits Analyse',
          type: 'csv',
          file: 'RHJvZ2Vua29uc3VtO0RpY2h0CjA7MAoxOzEKMjsyCjM7Mwo0OzQKNTs1CjY7Ngo3OzcKODs4Cjk7OQoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'csv',
          file: 'eDt5CjA7MAoxOzIKMjs0CjM7OAo0OzE2CjU7MzIKNjs2NAo3OzEyOAo4OzI1Ngo5OzUxMgoK',
        },
        {
          id: '1',
          name: 'testParabola',
          type: 'log',
          file: 'ZHNzc3Nzc3Nzc3Nmc2Rmc2FkZmdzcmdlc3RnemV0emV6dGdkZmdiZmhqdWdranlk\n' +
            'ZmFzZHdldHJnaG5jdmdzZmRnaHpnaGtnZGZzDQpkc3Nzc3Nzc3Nzc2ZzZGZzYWRm\n' +
            'Z3NyZ2VzdGd6ZXR6ZXp0Z2RmZ2JmaGp1Z2tqeWRmYXNkd2V0cmdobmN2Z3NmZGdo\n' +
            'emdoa2dkZnMNCmRzc3Nzc3Nzc3NzZnNkZnNhZGZnc3JnZXN0Z3pldHplenRnZGZn\n' +
            'YmZoanVna2p5ZGZhc2R3ZXRyZ2huY3Znc2ZkZ2h6Z2hrZ2Rmcw0KDQpkc3Nzc3Nz\n' +
            'c3Nzc2ZzZGZzYWRmZ3NyZ2VzdGd6ZXR6ZXp0Z2RmZ2JmaGp1Z2tqeWRmYXNkd2V0\n' +
            'cmdobmN2Z3NmZGdoemdoa2dkZnMNCmRzc3Nzc3Nzc3NzZnNkZnNhZGZnc3JnZXN0\n' +
            'Z3pldHplenRnZGZnYmZoanVna2p5ZGZhc2R3ZXRyZ2huY3Znc2ZkZ2h6Z2hrZ2Rm\n' +
            'cw0KZHNzc3Nzc3Nzc3Nmc2Rmc2FkZmdzcmdlc3RnemV0emV6dGdkZmdiZmhqdWdr\n' +
            'anlkZmFzZHdldHJnaG5jdmdzZmRnaHpnaGtnZGZzDQoNCmRzc3Nzc3Nzc3NzZnNk\n' +
            'ZnNhZGZnc3JnZXN0Z3pldHplenRnZGZnYmZoanVna2p5ZGZhc2R3ZXRyZ2huY3Zn\n' +
            'c2ZkZ2h6Z2hrZ2Rmcw0KZHNzc3Nzc3Nzc3Nmc2Rmc2FkZmdzcmdlc3RnemV0emV6\n' +
            'dGdkZmdiZmhqdWdranlkZmFzZHdldHJnaG5jdmdzZmRnaHpnaGtnZGZzDQpkc3Nz\n' +
            'c3Nzc3Nzc2ZzZGZzYWRmZ3NyZ2VzdGd6ZXR6ZXp0Z2RmZ2JmaGp1Z2tqeWRmYXNk\n' +
            'd2V0cmdobmN2Z3NmZGdoemdoa2dkZnMNCg0KZHNzc3Nzc3Nzc3Nmc2Rmc2FkZmdz\n' +
            'cmdlc3RnemV0emV6dGdkZmdiZmhqdWdranlkZmFzZHdldHJnaG5jdmdzZmRnaHpn\n' +
            'aGtnZGZzDQpkc3Nzc3Nzc3Nzc2ZzZGZzYWRmZ3NyZ2VzdGd6ZXR6ZXp0Z2RmZ2Jm\n' +
            'aGp1Z2tqeWRmYXNkd2V0cmdobmN2Z3NmZGdoemdoa2dkZnMNCmRzc3Nzc3Nzc3Nz\n' +
            'ZnNkZnNhZGZnc3JnZXN0Z3pldHplenRnZGZnYmZoanVna2p5ZGZhc2R3ZXRyZ2hu\n' +
            'Y3Znc2ZkZ2h6Z2hrZ2Rmcw0KZHNzc3Nzc3Nzc3Nmc2Rmc2FkZmdzcmdlc3RnemV0\n' +
            'emV6dGdkZmdiZmhqdWdranlkZmFzZHdldHJnaG5jdmdzZmRnaHpnaGtnZGZzZHNz\n' +
            'c3Nzc3Nzc3Nmc2Rmc2FkZmdzcmdlc3RnemV0emV6dGdkZmdiZmhqdWdranlkZmFz\n' +
            'ZHdldHJnaG5jdmdzZmRnaHpnaGtnZGZzZHNzc3Nzc3Nzc3Nmc2Rmc2FkZmdzcmdl\n' +
            'c3RnemV0emV6dGdkZmdiZmhqdWdranlkZmFzZHdldHJnaG5jdmdzZmRnaHpnaGtn\n' +
            'ZGZzDQpkc3Nzc3Nzc3Nzc2ZzZGZzYWRmZ3NyZ2VzdGd6ZXR6ZXp0Z2RmZ2JmaGp1\n' +
            'Z2tqeWRmYXNkd2V0cmdobmN2Z3NmZGdoemdoa2dkZnMNCg0KZHNzc3Nzc3Nzc3Nm\n' +
            'c2Rmc2FkZmdzcmdlc3RnemV0emV6dGdkZmdiZmhqdWdranlkZmFzZHdldHJnaG5j\n' +
            'dmdzZmRnaHpnaGtnZGZzDQoNCmRzc3Nzc3Nzc3NzZnNkZnNhZGZnc3JnZXN0Z3pl\n' +
            'dHplenRnZGZnYmZoanVna2p5ZGZhc2R3ZXRyZ2huY3Znc2ZkZ2h6Z2hrZ2Rmcw0K\n' +
            'ZHNzc3Nzc3Nzc3Nmc2Rmc2FkZmdzcmdlc3RnemV0emV6dGdkZmdiZmhqdWdranlk\n' +
            'ZmFzZHdldHJnaG5jdmdzZmRnaHpnaGtnZGZzDQpkc3Nzc3Nzc3Nzc2ZzZGZzYWRm\n' +
            'Z3NyZ2VzdGd6ZXR6ZXp0Z2RmZ2JmaGp1Z2tqeWRmYXNkd2V0cmdobmN2Z3NmZGdo\n' +
            'emdoa2dkZnMNCmRzc3Nzc3Nzc3NzZnNkZnNhZGZnc3JnZXN0Z3pldHplenRnZGZn\n' +
            'YmZoanVna2p5ZGZhc2R3ZXRyZ2huY3Znc2ZkZ2h6Z2hrZ2Rmcw0KZHNzc3Nzc3Nz\n' +
            'c3Nmc2Rmc2FkZmdzcmdlc3RnemV0emV6dGdkZmdiZmhqdWdranlkZmFzZHdldHJn\n' +
            'aG5jdmdzZmRnaHpnaGtnZGZzDQpkc3Nzc3Nzc3Nzc2ZzZGZzYWRmZ3NyZ2VzdGd6\n' +
            'ZXR6ZXp0Z2RmZ2JmaGp1Z2tqeWRmYXNkd2V0cmdobmN2Z3NmZGdoemdoa2dkZnMN\n' +
            'CmRzc3Nzc3Nzc3NzZnNkZnNhZGZnc3JnZXN0Z3pldHplenRnZGZnYmZoanVna2p5\n' +
            'ZGZhc2R3ZXRyZ2huY3Znc2ZkZ2h6Z2hrZ2Rmcw0KZHNzc3Nzc3Nzc3Nmc2Rmc2Fk\n' +
            'Zmdzcmdlc3RnemV0emV6dGdkZmdiZmhqdWdranlkZmFzZHdldHJnaG5jdmdzZmRn\n' +
            'aHpnaGtnZGZzDQpkc3Nzc3Nzc3Nzc2ZzZGZzYWRmZ3NyZ2VzdGd6ZXR6ZXp0Z2Rm\n' +
            'Z2JmaGp1Z2tqeWRmYXNkd2V0cmdobmN2Z3NmZGdoemdoa2dkZnMNCmRzc3Nzc3Nz\n' +
            'c3NzZnNkZnNhZGZnc3JnZXN0Z3pldHplenRnZGZnYmZoanVna2p5ZGZhc2R3ZXRy\n' +
            'Z2huY3Znc2ZkZ2h6Z2hrZ2Rmcw0KZHNzc3Nzc3Nzc3Nmc2Rmc2FkZmdzcmdlc3Rn\n' +
            'emV0emV6dGdkZmdiZmhqdWdranlkZmFzZHdldHJnaG5jdmdzZmRnaHpnaGtnZGZz\n' +
            'DQpkc3Nzc3Nzc3Nzc2ZzZGZzYWRmZ3NyZ2VzdGd6ZXR6ZXp0Z2RmZ2JmaGp1Z2tq\n' +
            'eWRmYXNkd2V0cmdobmN2Z3NmZGdoemdoa2dkZnMNCmRzc3Nzc3Nzc3NzZnNkZnNh\n' +
            'ZGZnc3JnZXN0Z3pldHplenRnZGZnYmZoanVna2p5ZGZhc2R3ZXRyZ2huY3Znc2Zk\n' +
            'Z2h6Z2hrZ2Rmcw0KZHNzc3Nzc3Nzc3Nmc2Rmc2FkZmdzcmdlc3RnemV0emV6dGdk\n' +
            'ZmdiZmhqdWdranlkZmFzZHdldHJnaG5jdmdzZmRnaHpnaGtnZGZzDQpkc3Nzc3Nz\n' +
            'c3Nzc2ZzZGZzYWRmZ3NyZ2VzdGd6ZXR6ZXp0Z2RmZ2JmaGp1Z2tqeWRmYXNkd2V0\n' +
            'cmdobmN2Z3NmZGdoemdoa2dkZnMNCmRzc3Nzc3Nzc3NzZnNkZnNhZGZnc3JnZXN0\n' +
            'Z3pldHplenRnZGZnYmZoanVna2p5ZGZhc2R3ZXRyZ2huY3Znc2ZkZ2h6Z2hrZ2Rm\n' +
            'cw0KZHNzc3Nzc3Nzc3Nmc2Rmc2FkZmdzcmdlc3RnemV0emV6dGdkZmdiZmhqdWdr\n' +
            'anlkZmFzZHdldHJnaG5jdmdzZmRnaHpnaGtnZGZzDQpkc3Nzc3Nzc3Nzc2ZzZGZz\n' +
            'YWRmZ3NyZ2VzdGd6ZXR6ZXp0Z2RmZ2JmaGp1Z2tqeWRmYXNkd2V0cmdobmN2Z3Nm\n' +
            'ZGdoemdoa2dkZnMNCmRzc3Nzc3Nzc3NzZnNkZnNhZGZnc3JnZXN0Z3pldHplenRn\n' +
            'ZGZnYmZoanVna2p5ZGZhc2R3ZXRyZ2huY3Znc2ZkZ2h6Z2hrZ2Rmcw0KZHNzc3Nz\n' +
            'c3Nzc3Nmc2Rmc2FkZmdzcmdlc3RnemV0emV6dGdkZmdiZmhqdWdranlkZmFzZHdl\n' +
            'dHJnaG5jdmdzZmRnaHpnaGtnZGZzDQpkc3Nzc3Nzc3Nzc2ZzZGZzYWRmZ3NyZ2Vz\n' +
            'dGd6ZXR6ZXp0Z2RmZ2JmaGp1Z2tqeWRmYXNkd2V0cmdobmN2Z3NmZGdoemdoa2dk\n' +
            'ZnMNCmRzc3Nzc3Nzc3NzZnNkZnNhZGZnc3JnZXN0Z3pldHplenRnZGZnYmZoanVn\n' +
            'a2p5ZGZhc2R3ZXRyZ2huY3Znc2ZkZ2h6Z2hrZ2Rmcw0Kdg0Kdg0Kdg0Kdg0Kdg0K\n' +
            'ZHNzc3Nzc3Nzc3Nmc2Rmc2FkZmdzcmdlc3RnemV0emV6dGdkZmdiZmhqdWdranlk\n' +
            'ZmFzZHdldHJnaG5jdmdzZmRnaHpnaGtnZGZzDQpkc3Nzc3Nzc3Nzc2ZzZGZzYWRm\n' +
            'Z3NyZ2VzdGd6ZXR6ZXp0Z2RmZ2JmaGp1Z2tqeWRmYXNkd2V0cmdobmN2Z3NmZGdo\n' +
            'emdoa2dkZnMNCmRzc3Nzc3Nzc3NzZnNkZnNhZGZnc3JnZXN0Z3pldHplenRnZGZn\n' +
            'YmZoanVna2p5ZGZhc2R3ZXRyZ2huY3Znc2ZkZ2h6Z2hrZ2Rmcw0KZHNzc3Nzc3Nz\n' +
            'c3Nmc2Rmc2FkZmdzcmdlc3RnemV0emV6dGdkZmdiZmhqdWdranlkZmFzZHdldHJn\n' +
            'aG5jdmdzZmRnaHpnaGtnZGZzDQpkc3Nzc3Nzc3Nzc2ZzZGZzYWRmZ3NyZ2VzdGd6\n' +
            'ZXR6ZXp0Z2RmZ2JmaGp1Z2tqeWRmYXNkd2V0cmdobmN2Z3NmZGdoemdoa2dkZnMN\n' +
            'CmRzc3Nzc3Nzc3NzZnNkZnNhZGZnc3JnZXN0Z3pldHplenRnZGZnYmZoanVna2p5\n' +
            'ZGZhc2R3ZXRyZ2huY3Znc2ZkZ2h6Z2hrZ2Rmcw==\n',
        },

      ],
    },
    metrics: [
      {
        ram: 1,
        cpu: 1,
        timeStamp: '2020-01-14T21:01:12.771+0000',
      },
      {
        ram: 2,
        cpu: 5,
        timeStamp: '2020-01-14T21:02:12.771+0000',
      },
      {
        ram: 3,
        cpu: 6,
        timeStamp: '2020-01-14T21:03:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:04:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:05:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:06:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:07:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:08:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:09:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:10:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:11:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:12:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:13:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:14:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:15:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:16:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:17:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:18:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:19:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:20:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:21:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:22:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:23:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:24:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:25:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:26:12.771+0000',
      },
      {
        ram: 4,
        cpu: 5,
        timeStamp: '2020-01-14T21:27:12.771+0000',
      },
    ],
  },
  getters: {
    resultList: state => state.resultList,
    metrics: state => state.metrics,
  },
  mutations: {
    updateResults(state, resultList) {
      state.resultList = resultList;
    },
    updateMetrics(state, metrics) {
      state.metrics = metrics;
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
    async fetchMetricsByExecutionId({ commit }, executionId) {
      if (!isNil(executionId)) {
        const metrics = await ApiService.doGet(`${serviceUrl}/metrics/${executionId}`);
        if (!isNil(metrics)) {
          commit('updateMetrics', metrics);
          return metrics;
        }
      }
      return null;
    },
  },
};

export default ResultStore;
