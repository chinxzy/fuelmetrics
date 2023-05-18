import axios from "axios";
import { Module, Commit } from "vuex";
import { CompanyRequestStatus, Dashboard, Status, defaultDashboardDetails, dashboardList, } from "../../types/company";
import { State as Rootstate } from "../index";
import * as ACTIONS from '../types';

const api = import.meta.env.VITE_APP_API_BASE_URL

export interface State {
  companyRequestError: string;
  companyRequestStatus: CompanyRequestStatus;
  dashboard:  dashboardList

}

const dashboard: Module<State, Rootstate> = {
  namespaced: true,

  state: () => ({
    companyRequestError: '',
    companyRequestStatus: {

      getItem: Status.IDLE,

    },
    dashboard: {
        dashboard: {...defaultDashboardDetails},
  
    },


  }),

  mutations: {
    //mutation for company 
    [ACTIONS.GET_COMPANY_LOADING](state: State): void {
      state.companyRequestStatus.getItem = Status.LOADING;
    },

    [ACTIONS.GET_COMPANY_SUCCESS](state: State, dashboard: Dashboard): void {
      state.companyRequestStatus.getItem = Status.SUCCESS;
      state.dashboard.dashboard= dashboard;

  

    },

    [ACTIONS.GET_COMPANY_ERROR](state: State, error: string): void {
      state.companyRequestError = error;
      state.companyRequestStatus.getItem = Status.ERROR;
    },


  },

  actions: {
    async fetchDashboard({ commit }: { commit: Commit }) {
      try {
        const token = localStorage.getItem("token")
        const Authorization = ` Bearer ${token}`;
        commit(ACTIONS.GET_COMPANY_LOADING)
        const {data}  = await axios.get(
          `${api}/Company/Dashboard?range=0
          `, { headers: { Authorization } }
        );
        commit(ACTIONS.GET_COMPANY_SUCCESS, data.data.dashboard);
        
      } catch (response: any) {
        commit(ACTIONS.GET_COMPANY_ERROR, response);
        console.log("error: ", response);
      }

    },
  },
};

export default dashboard;