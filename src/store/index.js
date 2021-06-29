import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import axios from 'axios'
Vue.use(Vuex)
// TODO: make it modifiable?
const dataURL = "https://blocke-channels-bucket.s3.amazonaws.com/Stream6.json";
export default new Vuex.Store({
  state: {
    dataLoading: true,
    // dataLoaded: false,
    data: null
  },
  mutations: {
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

      const resp = await axios.get(dataURL)

      const data = _.map(resp.data, (u) => {
        return { x: u.timestamp, y: u.value };
      });
      
      commit('SET_DATA', data)
      commit('DATA_LOADED')
    }
  },
  modules: {
  }
})
