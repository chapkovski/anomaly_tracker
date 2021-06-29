<template>
  <v-container>
  
    <v-row>
      <v-col cols="8">
        <v-row class="text-center">
          <v-col cols="12">
            <full-chart></full-chart>
          </v-col>
          <v-col cols="12">
            <detailed-chart></detailed-chart>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4"> <form-module></form-module> </v-col>
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
    FullChart,
    DetailedChart,
  },
  data: () => ({}),
  created() {},
  computed: { ...mapState(["dataLoading", "data"]) },
  watch: {},
  async mounted() {},
};
</script>
