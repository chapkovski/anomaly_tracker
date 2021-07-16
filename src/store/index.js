import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import axios from 'axios'
Vue.use(Vuex)
// TODO: make it modifiable?

export default new Vuex.Store({
  state: {
    start_cand: null,
    end_cand: null,
    start_position: null,
    end_position: null,

    routeqs: {},
    dataLoading: true,
    fileName:null,
    // dataLoaded: false,
    data: null
  },
  mutations: {
    SET_ROUTEQS: (state, obj) => {
      state.routeqs = obj;
      const { start, end, file } = obj;
      state.start_cand=start;
      state.end_cand=end;
       state.fileName= file
    },
    SET_START_POSITION: (state,  ind) => {

      state.start_position= ind
    },
    SET_END_POSITION: (state,  ind) => {

      state.end_position= ind
    },
    DATA_LOADING: (state) => {
      // state.dataLoaded = false;
      state.dataLoading = true
    },
    DATA_LOADED: (state) => {
      // state.dataLoaded = true;
      state.dataLoading = false
    },
    SET_DATA: (state, obj) => {
      state.data = obj
    }
  },
  actions: {

    async getData({ commit, state, dispatch }) {
      // commit('DATA_LOADING')
      const dataURL = "https://blocke-channels-bucket.s3.amazonaws.com";
      const url = `${dataURL}/${state.fileName}.json`
      const resp = await axios.get(url)
      // const resp = await axios.get(dataURL, {params:{file:state.fileName}})
      console.debug(resp)
      const data = _.map(resp.data, (u) => {
        return { x: u.timestamp, y: u.value };
      });

      commit('SET_DATA', data)
      const startIndex = _.findIndex(data, (i) => (i.x == state.start_cand))
      
      const endIndex = _.findIndex(data, (i) => (i.x == state.end_cand))
      commit("SET_START_POSITION",  startIndex)
      commit("SET_END_POSITION",  endIndex)
      console.debug("START IND", startIndex)
      console.debug("END POS", endIndex)
      commit('DATA_LOADED')
    }
  },
  modules: {
  }
})
