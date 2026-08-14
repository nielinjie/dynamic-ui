<script setup lang="ts">
import {spec} from "@/spec/spec.ts";
import {data} from "@/data/data.ts";
import {computed, provide, type Ref, ref} from "vue";
import RootRenderer from "@/components/RootRenderer.vue";
import {STATE_DATA, STATE_DECLARE_DETAIL} from "@/data/state.ts";
import {CENTER_DATA, DataContext, provideDataContext} from "@/DataContext.vue.ts";

const {pageName} = defineProps<{ pageName: string }>()

const viewDeclare = spec(pageName, "table@_").viewDeclare
const detailViewDeclare = spec(pageName, "sheet@detail").viewDeclare

const dataModel = ref(data)
const stateData: Ref<Record<string, any>> = ref({}) //这里面装的基本上是<state名，关注数据的 path>

const ctx = ref(new DataContext(dataModel))
provide(CENTER_DATA, ctx)
provide(STATE_DATA, stateData)
provide(STATE_DECLARE_DETAIL, detailViewDeclare)


</script>

<template>
  <main>
    <RootRenderer key="table@_" :viewDeclare="viewDeclare"/>
  </main>
</template>

<style scoped>

</style>