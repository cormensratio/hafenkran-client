import moment from 'moment';
import { isNil } from 'lodash';

const TimeStampMixin = {
  methods: {
    getTimeStamp(utcTime) {
      if (!isNil(utcTime)) {
        return moment(utcTime).format('dddd, MMMM Do YYYY, h:mm:ss a');
      }
      return null;
    },
  },
};

export default TimeStampMixin;

