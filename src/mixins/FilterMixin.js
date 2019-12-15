import { filter, forEach } from 'lodash';

const FilterMixin = {
  data() {
    return {
      items: [],
      filters: [],
    };
  },
  computed: {
    filteredItems() {
      let outPut = this.items;
      if (this.filters.length > 0) {
        forEach(this.filters, (option) => {
          outPut = filter(outPut, item => item[option.key] === option.value);
        });
      }
      return outPut;
    },
  },
};

export default FilterMixin;
