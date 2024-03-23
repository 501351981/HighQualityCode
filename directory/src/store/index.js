import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 20
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    actions: {
        increment({ commit }) {
            commit('increment')
        }
    },
    getters: {
        count: state => state.count
    }
})