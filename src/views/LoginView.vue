<template>
  <login-section />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginSection from "../components/LoginSection.vue";
//   import { useStore } from "../store/index";

export default defineComponent({
  components: {
    LoginSection,
  },
});
</script>

<style lang='scss'>
@import "src/styles/login.scss";
</style>