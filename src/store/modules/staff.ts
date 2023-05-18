import axios from "axios";
import { Module, Commit } from "vuex";
import { StaffRequestStatus, Staff, Status,  staffList, } from "../../types/staff";
import { State as Rootstate } from "../index";
import * as ACTIONS from '../types';

const api = import.meta.env.VITE_APP_API_BASE_URL

export interface State {
  staffRequestError: string;
  staffRequestStatus: StaffRequestStatus;
  staff:  staffList

}

const staff: Module<State, Rootstate> = {
  namespaced: true,

  state: () => ({
    staffRequestError: '',
    staffRequestStatus: {

      getItem: Status.IDLE,
      addItem: Status.IDLE

    },
    staff: {
        data:[]
    }

  }),

  mutations: {
    //mutation for company 
    [ACTIONS.GET_STAFF_LOADING](state: State): void {
      state.staffRequestStatus.getItem = Status.LOADING;
    },

    [ACTIONS.GET_STAFF_SUCCESS](state: State, staff: Staff[]): void {
      state.staffRequestStatus.getItem = Status.SUCCESS;
      state.staff.data= staff;

  

    },

    [ACTIONS.GET_STAFF_ERROR](state: State, error: string): void {
      state.staffRequestError = error;
      state.staffRequestStatus.getItem = Status.ERROR;
    },
    [ACTIONS.ADD_STAFF_LOADING](state: State): void {
        state.staffRequestStatus.addItem = Status.LOADING;
      },
  
      [ACTIONS.ADD_STAFF_SUCCESS](state: State): void {
        state.staffRequestStatus.addItem = Status.SUCCESS;
      },
      [ACTIONS.ADD_STAFF_ERROR](state: State, error: string): void {
        state.staffRequestStatus.addItem = Status.ERROR;
        state.staffRequestError= error;
      },

  },

  actions: {
    async fetchStaff({ commit }: { commit: Commit }) {
      try {
        const token = localStorage.getItem("token")
        const Authorization = ` Bearer ${token}`;
        commit(ACTIONS.GET_STAFF_LOADING)
        const {data}  = await axios.get(
          `${api}/CompanyUser/All?count=false&companyId=afbb88d4-cd29-4509-aaf3-47321f69f34b
          `, { headers: { Authorization } }
        );
        commit(ACTIONS.GET_STAFF_SUCCESS, data);
        
      } catch (response: any) {
        commit(ACTIONS.GET_STAFF_ERROR, response.response.status);
        console.log("error: ", response.response.status);
      }

    },

    async suspendStaff({ commit }: { commit: Commit }, id) {
        try {
          const token = localStorage.getItem("token")
          const Authorization = ` Bearer ${token}`;
          commit(ACTIONS.GET_STAFF_LOADING)
          const {data}  = await axios.put(
            `${api}/CompanyUser/SuspendStaff/afbb88d4-cd29-4509-aaf3-47321f69f34b?staffId=${id}`, { headers: { Authorization } }
          );
          commit(ACTIONS.GET_STAFF_SUCCESS, data);
          
        } catch (response: any) {
          commit(ACTIONS.GET_STAFF_ERROR, response.response.status);
          console.log("error: ", response.response.status);
        }
  
      },

      async addStaff({ commit }: { commit: Commit }, staff) {
        try {
          const token = localStorage.getItem("token")
          const Authorization = ` Bearer ${token}`;
          commit(ACTIONS.ADD_STAFF_LOADING)
          const {data}  = await axios.post(
            `${api}/CompanyUser/Add/afbb88d4-cd29-4509-aaf3-47321f69f34b`,staff, { headers: { Authorization } }
          );
          commit(ACTIONS.ADD_STAFF_SUCCESS, data);
          
        } catch (response: any) {
          commit(ACTIONS.ADD_STAFF_ERROR, response.response.status);
          console.log("error: ", response.response.status);
        }
  
      },
  },
};

export default staff;