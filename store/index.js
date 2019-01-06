import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import STATE from './state'
import ACTIONS from './actions'

const store = new Vuex.Store({
    state: STATE,
    mutations: {
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;

        }
    },
    actions: ACTIONS
})

export default store