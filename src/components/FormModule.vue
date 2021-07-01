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
      { value: 0, label: "Time series with good data quality", img: 'normal' },
      { value: 1, label: "Time series with sudden spikes to negative values", img: "neg" },
      { value: 2, label: "Time series with sudden spikes to zero", img: "zero" },
      { value: 3, label: "Time series with sudden positive spikes", img: "pos" },
      { value: 4, label: "Time series with repeated positive spikes", img: "rep" },
      
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
