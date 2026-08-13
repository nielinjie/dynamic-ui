<script setup lang="ts">
import {spec} from "@/spec/spec.ts";
import {data} from "@/data/data.ts";
import {computed, provide, type Ref, ref} from "vue";
import DynamicRenderer from "@/components/DynamicRenderer.vue";
import {STATE_DATA} from "@/data/state.ts";
import {CENTER_DATA, DataContext, provideDataContext} from "@/DataContext.vue.ts";

const {pageName} = defineProps<{ pageName: string }>()

const viewDeclare = spec(pageName, "table@_").viewDeclare
const selectedViewDeclare = spec(pageName, "sheet@selected").viewDeclare

const dataModel = ref(data)
const stateData: Ref<Record<string, any>> = ref({})

const ctx = ref(new DataContext(dataModel))
provide(CENTER_DATA, ctx)
provide(STATE_DATA, stateData)


</script>

<template>
  <main>
    <DynamicRenderer key="table@_" :viewDeclare="viewDeclare"/>
    <DynamicRenderer key="sheet@selected" v-if="stateData.selected" :viewDeclare="selectedViewDeclare"
                     atState="selected"/>
  </main>
</template>

<style scoped>

</style>