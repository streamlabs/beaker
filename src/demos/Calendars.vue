<template>
  <div>
    <h1>Calendars</h1>

    <div class="section">
      <h2>Date Picker</h2>
      <p>
        Our Date Picker component is extended from
        <a
          target="_blank"
          href="https://github.com/charliekassel/vuejs-datepicker"
          >Vue Date Picker</a
        >.
      </p>

      <Accordion :openedTitle="'Hide Code'" :closedTitle="'Show Code'">
        <template #content>
        <div>
          <pre>
<code>import { DatePicker } from 'streamlabs-beaker';

components: {
  &quot;s-date-picker&quot;: DatePicker
}

&lt;s-date-picker
  :disabled-dates=&quot;state.disabledDates&quot;
  :full-month-name=&quot;true&quot;
  :placeholder=&quot;'Select Date'&quot;
  :start-date=&quot;tomorrow&quot;
  @selected=&quot;logDate&quot;
&gt;&lt;/s-date-picker&gt;</code></pre>
        </div>
        </template>
      </Accordion>

      <s-date-picker
        :disabled-dates="state.disabledDates"
        :full-month-name="true"
        :placeholder="'Select Date'"
        :start-date="tomorrow"
        @selected="logDate"
      ></s-date-picker>
    </div>

    <div class="section">
      <h2>Toggle Style Variant</h2>
      <s-date-picker
        :variant="'toggle'"
        :disabled-dates="state.disabledDates"
        :placeholder="'Select Date'"
        :view="'month'"
        @selected="logDate"
      ></s-date-picker>
    </div>

    <div class="section">
      <p>
        All the props that are available the Vue Date Picker component are
        available in our version. You can view all available props
        <a
          href="https://www.npmjs.com/package/vuejs-datepicker#available-props"
          target="_blank"
          >here</a
        >. Though, only the <code>selected</code> event is available.
      </p>

      <table class="docs-table">
        <thead>
          <tr>
            <th>Props</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
          <tr>
            <td>placeholder</td>
            <td>string</td>
            <td>'Select Date'</td>
            <td>
              You can add a placeholder title. Will be replaced when date is
              selected.
            </td>
          </tr>
          <tr>
            <td>variant</td>
            <td>string</td>
            <td>null</td>
            <td>
              Allows for different style variations. Available options:
              <code>toggle</code>.
            </td>
          </tr>
          <tr>
            <td>startDate</td>
            <td>Date</td>
            <td>null</td>
            <td>Have calendar start at a preselected date.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import Accordion from "./../components/Accordion.vue";
import SDatePicker from "./../components/DatePicker.vue";

const state = {
  disabledDates: {
    dates: [new Date()]
  }
};

const tomorrow = moment().add(1, "days").format();

function logDate(date: unknown) {
  console.log(date);
}
</script>

<style lang="less" scoped></style>
