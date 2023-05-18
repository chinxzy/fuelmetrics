<template>
  <NavSection />
  <IntroSection />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavSection from "../components/NavSection.vue";
import IntroSection from "../components/IntroSection.vue";

export default defineComponent({
  components: {
    NavSection,
    IntroSection,
  },
});
</script>

<style lang='scss'>
@import "src/styles/index.scss";
</style>