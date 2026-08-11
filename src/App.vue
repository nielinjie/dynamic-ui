<script setup lang="ts">
import DynamicRenderer from '@/components/DynamicRenderer.vue'
import {ref} from "vue";
import SimpleTablePage from "@/components/SimpleTablePage.vue";

</script>

<template>
  <SimpleTablePage/>
</template>

<style scoped>

main {
  height: 80vh;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
