import { filter, forOwn, isNil, isEqual } from 'lodash';
import moment from 'moment';

const FilterMixin = {
  data() {
    return {
      items: [],
      filters: {},
      dateFilterKey: 'dateRange',
    };
  },
  computed: {
    filteredItems() {
      let outPut = this.items;
      if (!isNil(outPut) && !isNil(this.filters)) {
        forOwn(this.filters, (value, key) => {
          if (outPut.length > 0 && !isNil(value)) {
            if (isEqual(Object.keys(value)[0], this.dateFilterKey)) {
              outPut = filter(outPut,
                item => this.isInRange(value.dateRange.startTime,
                  value.dateRange.endTime, item[key]));
            } else if (value.length > 0) {
              outPut = filter(outPut, item => value.includes(item[key]));
            }
          }
        });
      }
      return outPut;
    },
  },
  methods: {
    isInRange(startTime, endTime, time) {
      let isInRange = true;
      if (!isNil(startTime) && !isNil(endTime)) {
        isInRange = moment(time).isBetween(moment(startTime), moment(endTime));
      } else if (!isNil(startTime) && isNil(endTime)) {
        isInRange = moment(time).isAfter(moment(startTime));
      } else if (!isNil(endTime) && isNil(startTime)) {
        isInRange = moment(time).isBefore(moment(endTime));
      }
      return isInRange;
    },
  },
};

export default FilterMixin;
