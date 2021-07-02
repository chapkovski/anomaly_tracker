<template>
  <div>
    <highcharts
      ref="highcharts"
      v-if="!dataLoading"
      constructorType="stockChart"
      class="hc"
      :options="chartOptions"
      :updateArgs="[true, true, true]"
    >
    </highcharts>

    <div v-if="!dataLoading">
      <v-btn @click="resetZoom">Reset zoom</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";

export default {
  data: () => ({
    chartOptions: {
       
      boost: { enabled: true },
      xAxis: {
        min: null,
        max: null,
        plotBands: [
          {
            color: "orange", // Color value
            from: null, // Start of the plot band
            to: null, // End of the plot band
          },
        ],
      },
      series: [
        {
          type: "line",
          turboThreshold: 1000000,
          data: [],
        },
      ],
    },
  }),
  computed: {
    ...mapState(["dataLoading", "data", "candidate", "candidate_position"]),
  },
  watch: {
    data(val) {
      this.chartOptions.series[0].data = val;

      this.chartOptions.xAxis.min = val[this.candidate_position - 10].x;
      this.chartOptions.xAxis.max = val[this.candidate_position + 10].x;
      this.chartOptions.xAxis.plotBands[0].from =
        val[this.candidate_position - 5].x;
      this.chartOptions.xAxis.plotBands[0].to =
        val[this.candidate_position + 5].x;
    },
  },
  mounted() {
 
  },
  methods: {
    resetZoom() {
      var chart = this.$refs.highcharts.chart;
      chart.xAxis[0].setExtremes(this.data[this.candidate_position - 10].x, this.data[this.candidate_position + 10].x);
    
    },
  },
};
</script>
