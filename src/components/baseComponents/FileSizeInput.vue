<template>
  <div>
    <v-text-field outline type="number"
                  :label="label"
                  :rules="rules"
                  v-model="selectedValue"
    >
      <template slot="prepend-inner">
        <slot name="prepend-inner"></slot>
      </template>
      <template slot="append">
        <span class="pt-3">{{selectedUnit}}</span>
        <v-icon class="icon-padding" @click="openMenu($event)">keyboard_arrow_down</v-icon>
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
    initialValue: Number,
    initialUnit: String,
  },
  data() {
    return {
      selectedValue: 0,
      selectedUnit: 'GB',
      showMenu: false,
      menuPosX: 0,
      menuPosY: 0,
      units: ['B', 'KB', 'MB', 'GB'],
    };
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
      this.emitInput();
    },
    emitInput() {
      let outPut = this.selectedValue;

      switch (this.selectedUnit) {
        case 'KB':
          outPut *= 1024;
          break;
        case 'MB':
          outPut *= 1024 * 1024;
          break;
        case 'GB':
          outPut *= 1024 * 1024 * 1024;
          break;
        default:
          break;
      }

      this.$emit('input', outPut);
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
  mounted() {
    this.emitInput();
  },
};
</script>

<style scoped>
  .icon-padding {
    padding-top: 12px;
  }
</style>
