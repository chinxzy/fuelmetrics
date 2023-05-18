<template>
  <div class="container-fluid intro">
    <div class="container">
      <div class="row mt-4">
        <div class="col-lg-4 name-div">
          <div class="wrapper p-4 text-center">
            <h3>Company Name</h3>
            <p>{{ company.name }}</p>
          </div>
        </div>
        <div class="col-lg-8 wallet-div">
          <div class="wrapper p-4">
            <div class="d-flex justify-content-around">
              <div class="rc text-center">
                <h5>Rc Number</h5>
                <p>{{ company.rcNumber }}</p>
              </div>
              <div class="wallet text-center">
                <h5>Owner ID</h5>

                <p>
                  {{ company.id }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="business col-lg-4">
          <div class="wrapper p-2">
            <div class="details p-2 text-bold">
              <h3 class="mb-4">Company Business Details</h3>
              <div class="d-flex justify-content-between justify-content-start">
                <p>Email</p>
                <p>{{ company.email }}</p>
              </div>
              <div class="d-flex justify-content-between">
                <p>Phone Number</p>
                <p>{{ truncateText(company.phoneNumber) }}</p>
              </div>
              <div class="d-flex justify-content-between">
                <p>Date Registered:</p>
                <p>{{ getFormattedDate(company.dateRegistered) }}</p>
              </div>
              <div class="d-flex justify-content-between">
                <p>Business Type:</p>
                <p>{{ company.businessType }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="contact col-lg-8">
          <div class="wrapper p-2">
            <div class="d-flex justify-content-around">
              <div class="orders box d-flex">
                <div class="info">
                  <h4>Wallet Balance</h4>
                  <h1>{{ dashboard.balance }}</h1>
                </div>

                <div class="icon">
                  <span class="material-symbols-outlined"> payments </span>
                </div>
              </div>

              <div class="revenue box d-flex">
                <div>
                  <h4>Vouchers</h4>
                  <h1>{{ dashboard.vouchers }}</h1>
                </div>
                <div class="icon">
                  <span class="material-symbols-outlined"> receipt_long </span>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-around">
              <div class="orders box d-flex">
                <div class="info">
                  <h4>Vehicles</h4>
                  <h1>{{ dashboard.vehicles }}</h1>
                </div>

                <div class="icon">
                  <span class="material-symbols-outlined"> payments </span>
                </div>
              </div>

              <div class="revenue box d-flex">
                <div>
                  <h4>Users</h4>
                  <h1>{{ dashboard.companyUsers }}</h1>
                </div>
                <div class="icon">
                  <span class="material-symbols-outlined"> receipt_long </span>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-around">
              <div class="orders box d-flex">
                <div class="info">
                  <h4>Sub Accounts</h4>
                  <h1>{{ dashboard.subAccounts }}</h1>
                </div>

                <div class="icon">
                  <span class="material-symbols-outlined"> payments </span>
                </div>
              </div>

              <div class="revenue box d-flex">
                <div>
                  <h4>Total Consumption</h4>
                  <h1>{{ dashboard.totalConsumption }}</h1>
                </div>
                <div class="icon">
                  <span class="material-symbols-outlined"> receipt_long </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";
import { useStore } from "vuex";
import { State } from "../store/modules/company";
import { State as dashboardState } from "../store/modules/dashboard";
import { Company, Dashboard, Status, Wallet } from "../types/company";
import LocalStorageService from "../services/localStorageService";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";

export default defineComponent({
  components: {},
  data() {
    return {};
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const dashboardState = computed<dashboardState>(
      () => store.state.dashboard
    );
    const companyState = computed<State>(() => store.state.company);

    const company = computed<Company>(() => companyState.value.company.company);
    console.log("company", company.value);
    const dashboard = computed<Dashboard>(
      () => dashboardState.value.dashboard.dashboard
    );

    const loadingState = ref({
      getCompany: computed<Status>(
        () => companyState.value.companyRequestStatus.getItem
      ),
    });

    const loadCompany = computed<boolean>(
      () => loadingState.value.getCompany == Status.LOADING
    );

    const companySuccess = computed<boolean>(
      () => loadingState.value.getCompany == Status.SUCCESS
    );

    const companyError = computed(() => companyState.value.companyRequestError);

    return {
      store,
      company,
      loadingState,
      router,
      route,
      loadCompany,
      companyError,
      companySuccess,
      dashboard,
    };
  },
  computed: {
    isFetchingCompany(): boolean {
      return this.loadingState.getCompany == Status.LOADING;
    },
  },
  methods: {
    checkToken() {
      const token = LocalStorageService.getItem("token");
      if (!token) {
        this.router.push({ path: "/" });
      }
    },

    async fetchCompany() {
      await this.store.dispatch("company/fetchCompany");
    },
    async fetchDashboard() {
      await this.store.dispatch("dashboard/fetchDashboard");
    },

    checkAuth() {
      if (this.companyError == "401") {
        this.router.push({ path: "/" });
      }
    },
    getFormattedDate(date: string) {
      return moment(date).format("MMM DD YYYY");
    },
    truncateText(text: string | string[], length = 30) {
      let maxLength = length;
      //if (this.isMediumScreenSize) maxLength = 20;
      //if (this.isMobileScreenSize) maxLength = 15;

      let returnText: string;

      if (Array.isArray(text)) {
        returnText = text.join(", ").substring(0, maxLength);
      } else returnText = text.substring(0, maxLength);

      if (returnText.length >= maxLength) {
        return `${returnText}...`;
      }

      return returnText;
    },
  },
  mounted() {
    this.checkAuth();
    this.checkToken();
    this.fetchCompany();
    this.fetchDashboard();
  },
});
</script>

