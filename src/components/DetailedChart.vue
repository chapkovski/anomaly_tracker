<template>
  <highcharts
    v-if="!dataLoading"
    constructorType="stockChart"
    class="hc"
    :options="chartOptions"
    ref="chart"
    :updateArgs="[true, true, true]"
  >
  </highcharts>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";

export default {
  data: () => ({
    message: "whatever111",
    chartOptions: {
      boost: { enabled: true },
      series: [
        {
          type: "line",
          turboThreshold: 1000000,
          data: [],
        },
      ],
    },
  }),
  created() {},
  computed: { ...mapState(["dataLoading", "data"]) },
  watch: {
    data(val) {
      this.chartOptions.series[0].data = val;
    },
  },
  async mounted() {},
};
</script>
