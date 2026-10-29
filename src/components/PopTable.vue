<script setup lang="ts">

import {computed, inject, ref, type ComputedRef, type Ref} from "vue";
import {DECLARE, label, type ViewDeclare, type ViewDeclareItem} from "@/spec/declare.ts";
import DynamicComponent from "@/components/DynamicComponent.vue";

import {ElButton, ElDialog, ElTable, ElTableColumn} from "element-plus"
import { ZoomIn } from '@element-plus/icons-vue'
import {useDataValue} from "@/composables/useDataValue.ts";

const props = defineProps<{ viewDeclareItem: ViewDeclareItem, dataIndex: string[] }>()

const viewDeclare: Ref<ViewDeclare> = inject(DECLARE)!!
const childNodes = computed(() =>
    (props.viewDeclareItem.children || []).map(id => viewDeclare.value.filter(i => i.id === id)[0]).filter((item): item is ViewDeclareItem => Boolean(item))
)

const modelValue: ComputedRef<any[]> = useDataValue<any[]>(props.viewDeclareItem, props.dataIndex)

const showDialog = ref(false)

const recordCount = computed(() => {
  const count = modelValue.value?.length || 0
  return `${count} 条记录`
})


</script>
<template>
  <div>
    <span>{{ recordCount }}</span>
    <ElButton :icon="ZoomIn" @click="showDialog = true" style="margin-left: 8px;" />
  </div>

  <ElDialog v-model="showDialog" title="表格详情" destroy-on-close width="80%" append-to-body>
    <ElTable :data="modelValue">
      <ElTableColumn type="index"/>
      <ElTableColumn></ElTableColumn>
      <ElTableColumn v-for="child in childNodes"
                     :key="child!!.id"
                     :label="label(child)">
        <template #default="scope">
          <DynamicComponent
              :viewDeclareItem="child" v-bind="child!!.setting" :dataIndex="props.dataIndex.concat(String(scope.$index))"/>
        </template>
      </ElTableColumn>
    </ElTable>
  </ElDialog>
</template>
