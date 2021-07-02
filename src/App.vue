<template>
  <div id="app">
   
    <v-app>
      <Loading></Loading>
      <Main></Main>
    </v-app>
  </div>
</template>


<script>
import Main from "@/components/Main.vue";
import Loading from "@/components/Loading.vue";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";

export default {
  components: {
    Loading,
    Main,
  },
  async mounted() {
    const { lb, ub, marker, sandbox, assignmentId, hitId, workerId } =this.$route.query;
    this.SET_ROUTEQS(this.$route.query)
    await this.getData();
    

  },
  methods: {
    ...mapActions(["getData"]),
    ...mapMutations(["SET_ROUTEQS"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
