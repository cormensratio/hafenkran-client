<template>
  <div>
    <v-text-field outline type="number"
                  :label="label"
                  :rules="rules"
                  v-model="selectedValue"
    >
<!--      <template slot="append-outer">-->
<!--        <v-select :items="units"-->
<!--                  outline class="unit-select"-->
<!--                  v-model="selectedUnit"></v-select>-->
<!--      </template>-->
      <template slot="append">
                <span>{{selectedUnit}}</span>
                <v-icon @click="openMenu($event)">keyboard_arrow_down</v-icon>
      </template>
    </v-text-field>
    <v-menu v-model="showMenu"
            :position-x="menuPosX"
            :position-y="menuPosY">
      <v-list>
        <v-list-tile v-for="(unit, index) in units"
                     :key="index"
                     @click="selectUnit(unit)"
        >
          <v-list-tile-title>{{unit}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { isNil } from 'lodash';

export default {
  name: 'FileSizeInput',
  props: {
    rules: undefined,
    label: '',
    initialValue: 4,
    initialUnit: 'GB',
  },
  data() {
    return {
      selectedValue: '2',
      selectedUnit: 'GB',
      showMenu: false,
      menuPosX: 0,
      menuPosY: 0,
      units: ['B', 'KB', 'MB', 'GB'],
    };
  },
  computed: {
    inputValue() {
      return `${this.selectedValue} ${this.selectedUnit}`;
    },
  },
  methods: {
    openMenu(e) {
      this.menuPosX = e.clientX;
      this.menuPosY = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
    selectUnit(unit) {
      this.selectedUnit = unit;
    },
  },
  created() {
    if (!isNil(this.initialUnit)) {
      this.selectedUnit = this.initialUnit;
    }

    if (!isNil(this.initialValue)) {
      this.selectedValue = this.initialValue;
    }
  },
};
</script>

<style scoped>

</style>
