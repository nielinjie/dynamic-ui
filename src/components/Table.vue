<script setup lang="ts">

import {computed, type ComputedRef, inject, ref, type Ref} from "vue";
import {DECLARE, DECLARE_STATE_DETAIL, type ViewDeclare, type ViewDeclareItem} from "@/spec/declare.ts";
import DynamicComponent from "@/components/DynamicComponent.vue";
import { replaceAll } from "@/utils/replaceAll.ts";

import {ElButton, ElDialog, ElSpace, ElTable, ElTableColumn} from "element-plus"
import {CENTER_DATA, DataContext} from "@/DataContext.vue.ts";
import {STATE_DATA, STATE_NAME} from "@/data/state.ts";
import RootRenderer from "@/components/RootRenderer.vue";

const props = defineProps<{ viewDeclareItem: ViewDeclareItem, dataIndex: string[] }>()

const ctx: Ref<DataContext> = inject(CENTER_DATA)!!
const stateData: Ref<Record<string, any>> = inject(STATE_DATA)!!
const stateName: string = inject(STATE_NAME)!!


// 支持子组件
const viewDeclare: Ref<ViewDeclare> = inject(DECLARE)!!
const childNodes = computed(() =>
    (props.viewDeclareItem.children || []).map(id => viewDeclare.value.filter(i => i.id === id)[0]).filter((item): item is ViewDeclareItem => Boolean(item))
)




const modelValue: ComputedRef<any[]> = computed(
    () => {
      const statePathValue = stateData.value[stateName] || '/'
      const newDataPath = replaceAll(props.viewDeclareItem!!.dataPath, "[]", props.dataIndex||[])
      const v = ctx.value.scope(statePathValue).resolve(newDataPath)
      return v as any[]
    },
)

</script>
<template>
  <ElTable :data="modelValue">
    <ElTableColumn type="index"/>
    <ElTableColumn></ElTableColumn>
    <ElTableColumn v-for="child in childNodes"
                   :key="child!!.id">
      <template #default="scope">
        <DynamicComponent
            :viewDeclareItem="child" v-bind="child!!.setting" :dataIndex="props.dataIndex.concat(String(scope.$index))"/>
      </template>
    </ElTableColumn>
  </ElTable>
</template>