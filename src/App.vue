<script setup lang="ts">

import DefaultRootPage from "@/components/DefaultRootPage.vue";
import {fake} from "@/spec/fake";
import {data} from "@/data/data";
</script>

<template>
  <DefaultRootPage pageName="personTableAndSheet" :specData="fake" :data="data"/>
</template>

<style scoped>

main {
  height: 80vh;
  width: 80vw;
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
