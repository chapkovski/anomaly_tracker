<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-row class="text-center">
          <v-col cols="12">
            <v-card class="my-3" v-if='false'>
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
              On the to  the left you can see the data for time series.
            </div>
            
            <div>
              The  chart is zoomed to the area where we would you to
              detect if <span class='font-weight-bold red--text'>there is any anomaly </span> there.
            </div>
            <div>You can zoom it out to see the entire time series, or you can reset to the initial zoom using 'Reset zoom' <button class=""></button></div>
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
