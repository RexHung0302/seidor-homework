import { createStore } from "vuex";
import axios from "axios";

const basicApiUrl = process.env.VUE_APP_ENDPOINT_API_URL;

export default createStore({
  state: {},
  mutations: {},
  actions: {
    async POSTV2Pay() {
      return axios
        .post(`${basicApiUrl}/v2/5e3d41272d00003f7ed95c09`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
    },
  },
  modules: {},
});
