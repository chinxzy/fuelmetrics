<template>
  <router-view />
</template>


<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
#app {
  background: #f1f2f6;
  min-height: 100vh;
}
.web {
  display: block;
  @media only screen and (max-width: 600px) {
    display: none !important;
  }
}
</style>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  mounted() {},
});
</script>