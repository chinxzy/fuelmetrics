import { InjectionKey } from "vue";
import {
  createStore,
  useStore as baseUseStore,
  Store,
  createLogger,
} from "vuex";


import auth from "./modules/auth"
import company from "./modules/company"
import dashboard from "./modules/dashboard"
import staff from "./modules/staff"



import { State as authState } from "./modules/auth";
import { State as companyState } from "./modules/company"
import { State as dashboardState } from "./modules/dashboard"
import { State as staffState } from "./modules/staff"
export type State = {

  auth: authState
  company: companyState
  dashboard: dashboardState
  staff: staffState
};


export const store = createStore<State>({
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  modules: {

    auth,
    company,
    dashboard,
    staff
  },
});

export const useStore = () => store;

// export type Store = Omit<
//   VuexStore<State>,
//   "getters" | "commit" | "dispatch"
// > & {
//   commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
//     key: K,
//     payload: P,
//     options?: CommitOptions
//   ): ReturnType<Mutations[K]>;
// } & {
//   dispatch<K extends keyof Actions>(
//     key: K,
//     payload?: Parameters<Actions[K]>[1],
//     options?: DispatchOptions
//   ): ReturnType<Actions[K]>;
// } & {
//   getters: {
//     [K in keyof Getters]: ReturnType<Getters[K]>;
//   };
// };
