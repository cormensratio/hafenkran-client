<template>
  <div>
    <v-text-field :label="label"
                  :loading="loading"
                  :value="selectedRangeText"
                  outline
                  readonly
    >
      <template slot="append">
        <v-icon @click.stop="display = true">event</v-icon>
        <v-icon @click="clearSelected">close</v-icon>
      </template>
    </v-text-field>
    <v-dialog v-model="display" :width="dialogWidth">
      <v-card>
        <v-card-title class="dialog-title text-muted">
          Select range for {{ label }}
        </v-card-title>
        <v-card-text class="px-0 py-0">
          <v-container v-if="!showDateTimeSelection">
            <v-layout column>
              <v-flex>
               <v-text-field outline readonly
                             :value="getTimeStamp(selectedRange.startTime)"
               >
                 <template slot="append">
                   <v-icon @click.stop="selectStartTime">event</v-icon>
                   <v-icon @click="selectedRange.startTime = null">close</v-icon>
                 </template>
               </v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field outline readonly
                              :value="getTimeStamp(selectedRange.endTime)"
                >
                  <template slot="append">
                    <v-icon @click.stop="selectEndTime">event</v-icon>
                    <v-icon @click="selectedRange.endTime = null">close</v-icon>
                  </template>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-tabs v-else fixed-tabs v-model="activeTab">
            <v-tab key="calendar">
              <slot name="dateIcon">
                <v-icon>event</v-icon>
              </slot>
            </v-tab>
            <v-tab key="timer" :disabled="dateSelected">
              <slot name="timeIcon">
                <v-icon>access_time</v-icon>
              </slot>
            </v-tab>
            <v-tab-item key="calendar">
              <v-date-picker v-model="date"
                             v-bind="datePickerProps"
                             @input="showTimePicker"
                             full-width
              >
              </v-date-picker>
            </v-tab-item>
            <v-tab-item key="timer">
              <v-time-picker
                ref="timer"
                class="v-time-picker-custom"
                v-model="time"
                v-bind="timePickerProps"
                full-width
              ></v-time-picker>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="actions" :parent="this">
            <div v-if="showDateTimeSelection">
              <v-btn text @click.native="clearHandler">
                {{ clearText }}
              </v-btn>
              <v-btn color="green" text @click="okHandler">{{ okText }}</v-btn>
            </div>
            <div v-else>
              <v-btn @click="clearSelected">Clear all</v-btn>
              <v-btn @click="applyFilters" dark style="background: var(--themeColor)">Apply</v-btn>
            </div>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { format, parse } from 'date-fns';
import { isNil, isEqual } from 'lodash';
import TimeStampMixin from '../../../mixins/TimeStamp';

const DEFAULT_DATE = '';
const DEFAULT_TIME = '00:00:00';
const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';
const DEFAULT_TIME_FORMAT = 'HH:mm:ss';
const DEFAULT_DIALOG_WIDTH = 340;
const DEFAULT_CLEAR_TEXT = 'Cancel';
const DEFAULT_OK_TEXT = 'OK';

export default {
  name: 'FilterDateTime',
  model: {
    prop: 'datetime',
    event: 'input',
  },
  mixins: [TimeStampMixin],
  props: {
    value: String,
    datetime: {
      type: [Date, String],
      default: null,
    },
    disabled: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
    label: {
      type: String,
      default: '',
    },
    dialogWidth: {
      type: Number,
      default: DEFAULT_DIALOG_WIDTH,
    },
    dateFormat: {
      type: String,
      default: DEFAULT_DATE_FORMAT,
    },
    timeFormat: {
      type: String,
      default: 'HH:mm',
    },
    clearText: {
      type: String,
      default: DEFAULT_CLEAR_TEXT,
    },
    okText: {
      type: String,
      default: DEFAULT_OK_TEXT,
    },
    textFieldProps: {
      type: Object,
    },
    datePickerProps: {
      type: Object,
    },
    timePickerProps: {
      type: Object,
    },
  },
  data() {
    return {
      selectedRange: {
        startTime: null,
        endTime: null,
      },
      showDateTimeSelection: false,
      isStartTimeSelectionActive: false,
      isEndTimeSelectionActive: false,
      display: false,
      activeTab: 0,
      date: DEFAULT_DATE,
      time: DEFAULT_TIME,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    dateTimeFormat() {
      return `${this.dateFormat} ${this.timeFormat}`;
    },
    defaultDateTimeFormat() {
      return `${DEFAULT_DATE_FORMAT} ${DEFAULT_TIME_FORMAT}`;
    },
    formattedDatetime() {
      return this.selectedDatetime ? format(this.selectedDatetime, this.dateTimeFormat) : '';
    },
    selectedDatetime() {
      if (this.date && this.time) {
        let datetimeString = `${this.date} ${this.time}`;
        if (this.time.length === 5) {
          datetimeString += ':00';
        }
        return parse(datetimeString, this.defaultDateTimeFormat, new Date());
      }
      return null;
    },
    dateSelected() {
      return !this.date;
    },
    selectedRangeText() {
      let text;
      const startTime = this.getTimeStamp(this.selectedRange.startTime);
      const endTime = this.getTimeStamp(this.selectedRange.endTime);

      if (isNil(startTime) && isNil(endTime)) {
        text = 'No range selected';
      } else if (!isNil(startTime) && isNil(endTime)) {
        text = `from ${startTime}`;
      } else if (!isNil(endTime) && isNil(startTime)) {
        text = `until ${endTime}`;
      } else {
        text = `${startTime} - ${endTime}`;
      }
      return text;
    },
  },
  methods: {
    init() {
      if (!this.datetime) {
        return;
      }
      let initDateTime;
      if (this.datetime instanceof Date) {
        initDateTime = this.datetime;
      } else if (typeof this.datetime === 'string' || this.datetime instanceof String) {
        // see https://stackoverflow.com/a/9436948
        initDateTime = parse(this.datetime, this.dateTimeFormat, new Date());
      }
      this.date = format(initDateTime, DEFAULT_DATE_FORMAT);
      this.time = format(initDateTime, DEFAULT_TIME_FORMAT);
    },
    okHandler() {
      this.resetPicker();
      const newValue = this.selectedDatetime;

      if (!isNil(newValue) && !isEqual(newValue, '')) {
        if (this.isEndTimeSelectionActive) {
          this.selectedRange.endTime = newValue;
          this.isEndTimeSelectionActive = false;
        } else if (this.isStartTimeSelectionActive) {
          this.selectedRange.startTime = newValue;
          this.isStartTimeSelectionActive = false;
        }
      }
      this.showDateTimeSelection = false;
    },
    applyFilters() {
      const appliedFilters = {};
      appliedFilters[this.value] = { dateRange: this.selectedRange };
      this.$emit('update', appliedFilters);
      this.display = false;
    },
    clearHandler() {
      if (this.activeTab === 0) {
        this.showDateTimeSelection = false;
      } else {
        this.resetPicker();
        this.date = DEFAULT_DATE;
        this.time = DEFAULT_TIME;
      }
    },
    resetPicker() {
      this.activeTab = 0;
      if (this.$refs.timer) {
        this.$refs.timer.selectingHour = true;
      }
    },
    selectStartTime() {
      this.showDateSelection();
      this.isStartTimeSelectionActive = true;
    },
    selectEndTime() {
      this.showDateSelection();
      this.isEndTimeSelectionActive = true;
    },
    showDateSelection() {
      this.showDateTimeSelection = true;
      this.activeTab = 0;
    },
    showTimePicker() {
      this.activeTab = 1;
    },
    clearSelected() {
      this.selectedRange.startTime = null;
      this.selectedRange.endTime = null;
      this.applyFilters();
    },
  },
  watch: {
    datetime() {
      this.init();
    },
  },
};
</script>

<style scoped>
  .dialog-title {
    font-size: 14pt;
  }
</style>

