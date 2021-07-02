import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import axios from 'axios'
Vue.use(Vuex)
// TODO: make it modifiable?
const dataURL = "https://t7oak2rx45.execute-api.us-east-1.amazonaws.com/Prod/databy";
export default new Vuex.Store({
  state: {
    candidate: null,
    candidate_position: null,
    routeqs: {},
    dataLoading: true,
    fileName:null,
    // dataLoaded: false,
    data: null
  },
  mutations: {
    SET_ROUTEQS: (state, obj) => {
      state.routeqs = obj;
      const { candidate, file } = obj;
      state.candidate = parseInt(candidate)
       state.fileName= file
    },
    SET_CANDIDATE_POSITION: (state, ind) => {

      state.candidate_position = ind
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
      
      const resp = await axios.get(dataURL, {params:{file:state.fileName}})
      console.debug(resp)
      const data = _.map(resp.data, (u) => {
        return { x: u.timestamp, y: u.value };
      });

      commit('SET_DATA', data)
      const candidateIndex = _.findIndex(data, (i) => (i.x == state.candidate))
      commit("SET_CANDIDATE_POSITION", candidateIndex)

      commit('DATA_LOADED')
    }
  },
  modules: {
  }
})
