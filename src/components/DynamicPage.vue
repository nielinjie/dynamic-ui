<script setup lang="ts">
import {type Spec, spec} from "@/spec/spec.ts";
import {computed, provide, type Ref, ref} from "vue";
import RootRenderer from "@/components/RootRenderer.vue";
import {STATE_DATA} from "@/data/state.ts";
import {CENTER_DATA, DataContext} from "@/DataContext.vue.ts";
import {DECLARE_STATE_DETAIL} from "@/spec/declare.ts";

const props = defineProps<{ pageName: string, specData: Spec, data: any[] }>()

const viewDeclare = computed(() => spec(props.pageName, "table@_", props.specData).viewDeclare)
const detailViewDeclare = computed(() => spec(props.pageName, "sheet@detail", props.specData).viewDeclare)

const stateData: Ref<Record<string, any>> = ref({}) //这里面装的基本上是<state名，关注数据的 path>

const ctx = computed(() => new DataContext(props.data))
provide(CENTER_DATA, ctx)
provide(STATE_DATA, stateData)
provide(DECLARE_STATE_DETAIL, detailViewDeclare)

</script>

<template>
  <main>
    <RootRenderer key="table@_" :viewDeclare="viewDeclare"/>
  </main>
</template>

<style scoped>

</style>
