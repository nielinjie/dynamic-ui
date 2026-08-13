<script setup lang="ts">
import {computed, inject, type Ref} from "vue";
import {ElInput, ElText} from "element-plus";
import {CENTER_DATA, DataContext, useDataContext} from "@/DataContext.vue.ts";
import type {ViewDeclareItem} from "@/spec/declare.ts";
import {STATE_DATA, STATE_NAME} from "@/data/state.ts";


const props = defineProps<{ viewDeclareItem: ViewDeclareItem, dataIndex?: number }>()
const emit = defineEmits(['patchDataModel'])
const ctx: Ref<DataContext> = inject(CENTER_DATA)!!
const stateData: Ref<Record<string, any>> = inject(STATE_DATA)!!
const stateName: string = inject(STATE_NAME)!!


const modelValue = computed(
    () => {
      const statePathValue = stateData.value[stateName] || '/'
      const newDataPath = props.viewDeclareItem!!.dataPath.replace("[]", String(props.dataIndex))
      const v = ctx.value.scope(statePathValue).resolve(newDataPath)
      return v as string | number | undefined
    })
</script>


<template>
  <ElText>{{ modelValue }}</ElText>
</template>

<style scoped>

</style>