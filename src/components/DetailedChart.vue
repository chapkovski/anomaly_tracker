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

    <div v-if="!dataLoading && zoomer">
      <v-btn @click="resetZoom">Reset zoom</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";

export default {
  props: {
    zoomer: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data: function () {
    return {
      eps: 0,
      chartOptions: {
        title: {
          text: this.title,
          floating: true,
          align: "left",
          x: 25,
          y: 70,
        },

        chart: {
          height: this.zoomer ? 400 : 200,
        },
        scrollbar: { enabled: false },
        boost: { enabled: true },
        navigator: { enabled: this.zoomer },
        rangeSelector: { enabled: this.zoomer },
        xAxis: {
          min: null,
          max: null,
          plotBands: [
            {
              borderColor: "red",
              borderWidth: 1,
              color: "#FCFFC5", // Color value
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
    };
  },
  computed: {
    ...mapState([
      "dataLoading",
      "data",
      "start_cand",
      "end_cand",
      "start_position",
      "end_position",
    ]),
  },
  watch: {
    data(val) {
      this.eps = Math.max(
        parseInt((this.end_position - this.start_position) * 0.5),
        10
      );
      const innerEps = Math.max(parseInt(this.eps / 2), 5);
      this.chartOptions.series[0].data = val;
      if (this.zoomer) {
        this.chartOptions.xAxis.min = val[this.start_position - this.eps].x;
        this.chartOptions.xAxis.max = val[this.end_position + this.eps].x;
      }
      this.chartOptions.xAxis.plotBands[0].from =
        val[this.start_position - innerEps].x;
      this.chartOptions.xAxis.plotBands[0].to =
        val[this.end_position + innerEps].x;
    },
  },
  mounted() {},
  methods: {
    resetZoom() {
      var chart = this.$refs.highcharts.chart;
      chart.xAxis[0].setExtremes(
        this.data[this.start_position - this.eps].x,
        this.data[this.end_position + this.eps].x
      );
    },
  },
};
</script>
