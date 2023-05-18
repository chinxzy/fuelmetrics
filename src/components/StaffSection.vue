<template>
  <div class="container-fluid">
    <nav-bar />
    <div class="main container">
      <table class="table" ref="el">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Suspended</th>
            <th></th>
          </tr>
        </thead>
        <div v-if="staffLoading" class="d-flex justify-content-center loadin">
          loading
        </div>
        <tbody v-else>
          <tr v-for="staff in staffs" :key="staff.id">
            <td>{{ staff.id }}</td>
            <td>{{ staff.name }}</td>
            <td>{{ staff.phone }}</td>
            <td>{{ truncateText(staff.email, 18) }}</td>
            <td>
              {{ staff.address }}
            </td>
            <td>{{ staff.isSuspended }}</td>

            <td class="dropdown dropend">
              <button
                class="btn menubtndropdown-toggle"
                data-bs-toggle="dropdown"
              >
                ...
              </button>
              <ul class="dropdown-menu justify-content-center p-3">
                <li v-if="staff.isSuspended.toString() != 'true'">
                  <button class="btn" @click="suspendStaff(staff.id)">
                    Suspend
                  </button>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { State } from "../store/modules/staff";
import { staffList, Status } from "../types/staff";
import { Staff } from "../types/staff";
import moment from "moment";

export default defineComponent({
  data() {
    return {};
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const staffState = computed<State>(() => store.state.staff);
    const staffs = computed<Staff[]>(() => staffState.value.staff.data);

    const loadingState = ref({
      getStaffs: computed<Status>(
        () => staffState.value.staffRequestStatus.getItem
      ),
    });

    const staffSuccess = computed(
      () => loadingState.value.getStaffs === "SUCCESS"
    );

    const staffLoading = computed(
      () => loadingState.value.getStaffs === "LOADING"
    );

    return {
      store,
      router,
      staffs,
      loadingState,
      staffSuccess,
      staffLoading,
    };
  },
  methods: {
    getFormattedDate(date: any) {
      return moment(date).format("MMM DD YYYY");
    },
    getStaff() {
      this.store.dispatch("staff/fetchStaff");
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
    suspendStaff(id: string) {
      this.store.dispatch("staff/suspendStaff", id);
    },
  },
  mounted() {
    this.getStaff();
  },
});
</script>

