<template>
  <form method="post" id="mturk_form" :action="action" ref="form">
    <input type="hidden" name="assignmentId" :value="assignmentId" />

    <v-radio-group v-model="answer">
      <div v-for="i in options" :key="i.value">
        <v-radio :label="i.label" :value="i.value" name="answer"></v-radio>
        <v-img
          max-height="150"
          max-width="250"
          :src="require(`@/assets/${i.img}.png`)"
        ></v-img>
      </div>
    </v-radio-group>
    <v-btn elevation="2"    @click="submittingForm" >Submit</v-btn>
  </form>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
const liveMturk = "https://www.mturk.com/mturk/externalSubmit";
const sandboxMturk = "https://workersandbox.mturk.com/mturk/externalSubmit";
export default {
  data: () => ({
    action: null,
    assignmentId: null,
    sandbox: true,
    hitId: null,
    workerId: null,
    answer: null,

    options: [
      { value: 0, label: "No anomaly", img: 0 },
      { value: 1, label: "Anomaly of Type 1", img: 1 },
      { value: 2, label: "Anomaly of Type 2", img: 2 },
      { value: 3, label: "Anomaly of Type 2", img: 3 },
    ],
  }),
  created() {},
  computed: {},
  watch: {},
  mounted() {
    ({
      sandbox: this.sandbox,
      assignmentId: this.assignmentId,
      hitId: this.hitId,
      workerId: this.workerId,
    } = this.$route.query);
    if (this.sandbox) {
      this.action = sandboxMturk;
    } else {
      this.action = liveMturk;
    }
  },
  methods: {
    async submittingForm() {
      this.$refs.form.submit();
    },
  },
};
</script>
