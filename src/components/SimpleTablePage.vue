<script setup lang="ts">
import {spec} from "@/spec/spec.ts";
import {data} from "@/data/data.ts";
import {ref} from "vue";
import DynamicRenderer from "@/components/DynamicRenderer.vue";

const viewDeclare = ref(spec.viewDeclare)
const dataModel = ref(data)
</script>

<template>
  <main>
    <DynamicRenderer :viewDeclare="viewDeclare" :data-model="dataModel"/>
  </main>
</template>

<style scoped>

</style>