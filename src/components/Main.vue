<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-row class="text-center">
          <v-col cols="12">
            <v-card class="my-3">
              <v-card-text>
                <detailed-chart
                  :zoomer="false"
                  title="Full data"
                ></detailed-chart>
              </v-card-text>
            </v-card>
            <v-card class="my-3">
              <v-card-text>
                <detailed-chart
                  :zoomer="true"
                  title="Area to detect anomaly:"
                ></detailed-chart>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>Instructions:</v-card-title>
          <v-card-text class="text-left">
            <div>
              On two charts to the left, you can see the data for the time
              series. Data usually have regular patterns for some days. The
              first chart is the full data. Please use full data to see if the
              pattern was broken. The second chart is zoomed to the area where
              we would you to detect if there is any anomaly there. This chart
              can help to see the block with the potential anomaly with
              different zoom.
            </div>

            <div>
              If there is uncertainty about the pattern you can use the mouse to
              zoom/pan bottom plot to check nearby regions.
            </div>

            <div>Special cases:</div>
            <div>
              1) If the data sector you are evaluating is the part of a bigger
              anomaly label it as an anomaly
            </div>
            <div>
              2) If the data sector has a spike, but it's part of the regular
              pattern label it as not an anomaly
            </div>
          </v-card-text>
        </v-card>
        <form-module></form-module>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import FormModule from "@/components/FormModule.vue";
import FullChart from "@/components/FullChart.vue";
import DetailedChart from "@/components/DetailedChart.vue";
export default {
  components: {
    FormModule,
    DetailedChart,
  },
  data: () => ({}),
  created() {},
  computed: { ...mapState(["dataLoading", "data"]) },
  watch: {},
  async mounted() {},
};
</script>
