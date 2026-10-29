<script setup lang="ts">

import {computed, type ComputedRef, inject, ref, type Ref} from "vue";
import {DECLARE, DECLARE_STATE_DETAIL, label, type ViewDeclare, type ViewDeclareItem} from "@/spec/declare.ts";
import DynamicComponent from "@/components/DynamicComponent.vue";

import {ElButton, ElDialog, ElSpace, ElTable, ElTableColumn} from "element-plus"
import RootRenderer from "@/components/RootRenderer.vue";
import {useDataValue} from "@/composables/useDataValue.ts";

const props = defineProps<{ viewDeclareItem: ViewDeclareItem, dataIndex: string[] }>()


// 支持子组件
const viewDeclare: Ref<ViewDeclare> = inject(DECLARE)!!
const childNodes = computed(() =>
    (props.viewDeclareItem.children || []).map(id => viewDeclare.value.filter(i => i.id === id)[0]).filter((item): item is ViewDeclareItem => Boolean(item))
)




const modelValue: ComputedRef<any[]> = useDataValue<any[]>(props.viewDeclareItem, props.dataIndex)



</script>
<template>
  <ElTable :data="modelValue">
    <ElTableColumn type="index"/>
    <ElTableColumn v-for="child in childNodes"
                   :key="child!!.id"
                   :label="label(child)">
      <template #default="scope">
        <DynamicComponent
            :viewDeclareItem="child" v-bind="child!!.setting" :dataIndex="props.dataIndex.concat(String(scope.$index))"/>
      </template>
    </ElTableColumn>
  </ElTable>
</template>