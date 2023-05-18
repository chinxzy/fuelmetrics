<template>
  <nav class="navbar navbar-expand-lg p-1">
    <div class="container-fluid">
      <a class="navbar-brand text-white" href="#">Fuelmetrics</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ms-auto text-white">
          <li v-for="nav in navs" :key="nav.name" class="nav-item">
            <router-link :to="nav.link" class="nav-link mx-2 active">{{
              nav.name
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      navs: [
        {
          name: "Dashboard",
          link: "/dashboard",
        },
        {
          name: "Staff",
          link: "/staff",
        },
      ],
    };
  },
});
</script>
