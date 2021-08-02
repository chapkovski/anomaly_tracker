<template>
  <form method="post" id="mturk_form" :action="action" ref="form">
    <input type="hidden" name="assignmentId" :value="assignmentId" />

    <v-radio-group v-model="answer">
      <div v-for="i in options" :key="i.value">
        <v-radio :label="i.label" :value="i.value" name="answer"></v-radio>
        <v-img
          max-height="100"
          max-width="250"
          :src="require(`@/assets/img/${i.img}.png`)"
        ></v-img>
      </div>
    </v-radio-group>
    <v-btn
      elevation="2"
      @click="submittingForm"
      :disabled="!submittable"
      color="primary"
      >Submit</v-btn
    >
  </form>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { differenceInSeconds } from "date-fns";
const liveMturk = "https://www.mturk.com/mturk/externalSubmit";
const sandboxMturk = "https://workersandbox.mturk.com/mturk/externalSubmit";
export default {
  data: () => ({
    startTime: new Date(),
    endTime: null,
    timeSpent: null,
    action: null,
    assignmentId: "ASSIGNMENT_ID_NOT_AVAILABLE",
    sandbox: true,
    hitId: null,
    workerId: null,
    answer: null,
    submittable: false,
    bunch: null,
    inner_options: [
      {
        value: 0,
        label: "Time series with good data quality",
        img: "good_data_quality",
      },

      {
        value: 1,
        label: "Time series with downward spike(s)",
        img: "sudden_spike_to_zero",
      },

      {
        value: 2,
        label: "Time series with upward spike(s)",
        img: "repeated_positive_spike",
      },
    ],
  }),
  created() {},
  computed: {
    ...mapState([
      "fileName",
      "start_cand",
      "end_cand",
      "start_position",
      "end_position",
    ]),
    options() {
      console.debug(_.shuffle(this.inner_options));
      return _.shuffle(this.inner_options);
    },
  },
  watch: {
    answer(v) {
      if (v) this.submittable = true;
    },
  },
  mounted() {
    ({
      sandbox: this.sandbox,
      assignmentId: this.assignmentId,
      hitId: this.hitId,
      workerId: this.workerId,
      bunch: this.bunch,
    } = this.$route.query);
    if (parseInt(this.sandbox) === 1) {
      this.action = sandboxMturk;
    } else {
      this.action = liveMturk;
    }
  },
  methods: {
    async submittingForm() {
      this.endTime = new Date();
      this.timeSpent = differenceInSeconds(this.endTime, this.startTime);
      this.submittable = false;
      const ddbUrl =
        "https://t7oak2rx45.execute-api.us-east-1.amazonaws.com/Prod/submithit";
      await axios.post(ddbUrl, {
        assignmentId: this.assignmentId,
        hitId: this.hitId,
        workerId: this.workerId,
        sandbox: this.sandbox,
        fileName: this.fileName,
        start_cand: parseInt(this.start_cand),
        end_cand: parseInt(this.end_cand),
        candidate: parseInt(this.start_cand),
        start_position: parseInt(this.start_position),
        end_position: parseInt(this.end_position),
        answer: this.answer,
        timeSpent: this.timeSpent,
        startTime: this.startTime,
        endTime: this.endTime,
        bunch: this.bunch,
      });
      this.$refs.form.submit();
    },
  },
};
</script>
