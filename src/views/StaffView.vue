<template>
  <NavSection />
  <StaffSection />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavSection from "../components/NavSection.vue";
import StaffSection from "../components/StaffSection.vue";

export default defineComponent({
  components: {
    NavSection,
    StaffSection,
  },
});
</script>

<style lang='scss'>
@import "src/styles/staff.scss";
</style>