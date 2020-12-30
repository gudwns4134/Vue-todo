import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./getters.js";
import * as mutations from "./mutations.js";

Vue.use(Vuex); // 플러그인 기능

const Storage = {
  fetch() {
    // created? 들고와서 설정해줌
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    return arr;
  },
};

export const store = new Vuex.Store({
  state: {
    todoItems: Storage.fetch(),
  },
  getters,
  mutations
});
