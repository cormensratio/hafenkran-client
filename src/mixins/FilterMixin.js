import { filter, forOwn, isNil } from 'lodash';

const FilterMixin = {
  data() {
    return {
      items: [],
      filters: {},
    };
  },
  computed: {
    filteredItems() {
      let outPut = this.items;
      if (!isNil(outPut) && !isNil(this.filters)) {
        forOwn(this.filters, (value, key) => {
          if (outPut.length > 0 && !isNil(value) && value.length > 0) {
            outPut = filter(outPut, item => value.includes(item[key]));
          }
        });
      }
      return outPut;
    },
  },
};

export default FilterMixin;
