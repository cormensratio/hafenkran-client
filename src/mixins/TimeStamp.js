import moment from 'moment';
import { isNil } from 'lodash';
// eslint-disable-next-line import/prefer-default-export
export const timeStampMixin = {
  methods: {
    getTimeStamp(utcTime) {
      if (!isNil(utcTime)) {
        return moment(utcTime).format('dddd, MMMM Do YYYY, h:mm:ss a');
      }
      return null;
    },
  },
};

