import moment from 'moment';
import { isNil } from 'lodash';

const TimeStampMixin = {
  methods: {
    getTimeStamp(utcTime) {
      if (!isNil(utcTime)) {
        return moment(utcTime).format('YYYY-MM-DD, HH:mm:ss');
      }
      return null;
    },
  },
};

export default TimeStampMixin;

