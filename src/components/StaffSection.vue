<template>
  <div class="container-fluid">
    <nav-bar />
    <div class="d-flex mt-4 justify-content-end">
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
      >
        Add New Staff
      </button>
    </div>
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

    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
        ></button>
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Add New Staff</h4>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="justify-content-center">
              <form>
                <div class="form-block">
                  <p>Name:</p>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter product name"
                    v-model="name"
                  />
                </div>
                <div class="form-block">
                  <p>User ID:</p>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter product name"
                    v-model="userID"
                  />
                </div>
                <div class="form-block">
                  <p>Phone:</p>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter phone number"
                    v-model="phone"
                  />
                </div>
                <div class="form-block">
                  <p>Alt Phone:</p>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter alt phone number"
                    v-model="altPhoneNumber"
                  />
                </div>
                <div class="form-block">
                  <p>email:</p>

                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter email"
                    v-model="email"
                  />
                </div>
                <div class="form-block">
                  <p>Address:</p>

                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter adrress"
                    v-model="address"
                  />
                </div>
                <div class="form-block">
                  <p>City:</p>

                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter City"
                    v-model="city"
                  />
                </div>
                <div class="form-block">
                  <p>State:</p>

                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter State"
                    v-model="state"
                  />
                </div>
                <div class="form-block">
                  <p>Role:</p>

                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Role"
                    v-model="role"
                  />
                </div>
                <div class="d-flex justify-content-end">
                  <button
                    @click="addStaff()"
                    type="button"
                    class="btn"
                    data-bs-dismiss="modal"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { State } from "../store/modules/staff";
import { staffList, StaffPost, Status } from "../types/staff";
import { Staff } from "../types/staff";
import moment from "moment";

export default defineComponent({
  data() {
    return {
      companyId: "afbb88d4-cd29-4509-aaf3-47321f69f34b",
      userID: "",
      name: "",
      phone: "",
      altPhoneNumber: "",
      email: "",
      address: "",
      city: "",
      state: "",
      role: "",
      staffRole: [] as string[],
    };
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
    addStaff() {
      this.staffRole.push(this.role);
      const staff: StaffPost = {
        companyId: this.companyId,
        userId: this.userID,
        name: this.name,
        phone: this.phone,
        altPhoneNumber: this.altPhoneNumber,
        email: this.email,
        address: this.address,
        city: this.city,
        state: this.state,
        roles: this.staffRole,
      };
      this.store.dispatch("staff/addStaff", staff);
      console.log(staff);
    },
  },
  mounted() {
    this.getStaff();
  },
});
</script>

