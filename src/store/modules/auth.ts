import axios from "axios";
import { Module, Commit } from "vuex";
import LocalStorageService from "../../services/localStorageService";
import { AuthRequestStatus,  UserLogin, Status} from "../../types/login";
import { State as Rootstate } from "../index";
import * as ACTIONS from '../types';

const api = import.meta.env.VITE_APP_API_BASE_URL
export interface State {
    authenticationError: string;
    authRequestStatus: AuthRequestStatus;
   
}

const auth: Module<State, Rootstate> = {
    namespaced: true,

    state: () => ({
        authenticationError: '',
        authRequestStatus: {
            loginUser: Status.IDLE,
           
        },
        
    }),

    mutations: {
        //Mutation to clear error
        ['CLEAR_ERROR'](state: State): void {
            state.authenticationError = '';
        },

        // Login Mutations
        [ACTIONS.LOGIN_USER_LOADING](state: State): void {
            state.authRequestStatus.loginUser = Status.LOADING;
        },

        [ACTIONS.LOGIN_USER_SUCCESS](state: State, token: string): void {

            state.authRequestStatus.
                loginUser = Status.SUCCESS;

            LocalStorageService.setItem('token', token);

            const user = LocalStorageService.decodeToken();
            if (!user) return;

        },

        [ACTIONS.LOGIN_USER_ERROR](state: State, error: string): void {
            state.authenticationError = error;
            state.authRequestStatus.loginUser = Status.ERROR;
        },

      
    },

    actions: {

        async clearError({ commit }: { commit: Commit }) {

            commit("CLEAR_ERROR");

        },
        // Login Action
        async loginUser({ commit }: { commit: Commit }, loginDetails: UserLogin) {
            try {
                console.log(typeof (api))
                commit(ACTIONS.LOGIN_USER_LOADING);

                const data = await axios.post(
                    `${api}/Login`, loginDetails
                );
                console.log(data.data.token)
                commit(ACTIONS.LOGIN_USER_SUCCESS, data.data.token);
                

            } catch (response: any) {
                commit(ACTIONS.LOGIN_USER_ERROR, response);
                console.log("error: ", response);
            }

        },

       
    },
};

export default auth;