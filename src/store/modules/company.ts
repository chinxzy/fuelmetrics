import axios from "axios";
import { Module, Commit } from "vuex";
import { CompanyRequestStatus, Company, Status, defaultCompanyDetails, companyList, Wallet, defaultWalletDetails } from "../../types/company";
import { State as Rootstate } from "../index";
import * as ACTIONS from '../types';

const api = import.meta.env.VITE_APP_API_BASE_URL

export interface State {
  companyRequestError: string;
  companyRequestStatus: CompanyRequestStatus;
  company:  companyList

}

const company: Module<State, Rootstate> = {
  namespaced: true,

  state: () => ({
    companyRequestError: '',
    companyRequestStatus: {

      getItem: Status.IDLE,

    },
    company: {
        company: {...defaultCompanyDetails},
        wallet: {...defaultWalletDetails}
    },


  }),

  mutations: {
    //mutation for company 
    [ACTIONS.GET_COMPANY_LOADING](state: State): void {
      state.companyRequestStatus.getItem = Status.LOADING;
    },

    [ACTIONS.GET_COMPANY_SUCCESS](state: State, company: Company): void {
      state.companyRequestStatus.getItem = Status.SUCCESS;
      state.company.company= company;

  

    },

    [ACTIONS.GET_COMPANY_ERROR](state: State, error: string): void {
      state.companyRequestError = error;
      state.companyRequestStatus.getItem = Status.ERROR;
    },


  },

  actions: {
    async fetchCompany({ commit }: { commit: Commit }) {
      try {
        const token = localStorage.getItem("token")
        const Authorization = ` Bearer ${token}`;
        commit(ACTIONS.GET_COMPANY_LOADING)
        const {data}  = await axios.get(
          `${api}/Company/Details
          `, { headers: { Authorization } }
        );
        commit(ACTIONS.GET_COMPANY_SUCCESS, data.data.company);
        
      } catch (response: any) {
        commit(ACTIONS.GET_COMPANY_ERROR, response.response.status);
        console.log("error: ", response.response.status);
      }

    },
  },
};

export default company;