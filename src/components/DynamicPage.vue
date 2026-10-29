<script setup lang="ts">
import {type Spec, spec} from "@/spec/spec.ts";
import {computed, provide, reactive, type Ref, ref} from "vue";
import RootRenderer from "@/components/RootRenderer.vue";
import {STATE_DATA} from "@/data/state.ts";
import {CENTER_DATA, DataContext} from "@/DataContext.vue.ts";
import {DECLARE_STATE_DETAIL} from "@/spec/declare.ts";

const props = defineProps<{ pageName: string, specData: Spec, data: any[] }>()

const viewDeclare = computed(() => spec(props.pageName, "table@_", props.specData).viewDeclare)
const detailViewDeclare = computed(() => spec(props.pageName, "sheet@detail", props.specData).viewDeclare)

const stateData: Ref<Record<string, any>> = ref({}) //这里面装的基本上是<state名，关注数据的 path>
const reactiveData = reactive(props.data)
const ctx = computed(() => new DataContext(reactiveData))
provide(CENTER_DATA, ctx)
provide(STATE_DATA, stateData)
provide(DECLARE_STATE_DETAIL, detailViewDeclare)

/**
 * 这个 page 的几个“部分确定了”，不是一个抽象的 page，是一个默认的 page。
 * 有个 table，
 * table 每一行可以 detail。editing。
 *
 */

</script>

<template>
  <main>
    <RootRenderer key="table@_" :viewDeclare="viewDeclare"/>
  </main>
</template>

<style scoped>

</style>
