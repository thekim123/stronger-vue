import {createStore} from 'vuex';
import jwtDecode from 'jwt-decode';

export default createStore({
    state: {
        user: {
            username: null,
            nickname: null,
        },
        token: null,
        decodedToken: null,
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            state.decodedToken = jwtDecode(token);
            state.user.nickname = state.decodedToken != null ? state.decodedToken.nickname : null;
            state.user.username = state.decodedToken != null ? state.decodedToken.username : null;
        },
    },
    actions: {
        login({commit}, token) {
            commit('setToken', token);
        },
    },
    modules: {}
});

