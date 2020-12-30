import Vue from "vue";
import Vuex from "vuex";
import todoApp from './modules/todoApp.js'

Vue.use(Vuex); // 플러그인 기능

export const store = new Vuex.Store({
 modules: {
   todoApp
 }
});
