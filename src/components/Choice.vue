<script setup lang="ts">

import {computed, inject, ref, type ComputedRef, type Ref} from "vue";
import {DECLARE, label, type ViewDeclare, type ViewDeclareItem} from "@/spec/declare.ts";
import DynamicComponent from "@/components/DynamicComponent.vue";

import {ElButton, ElDialog, ElTable, ElTableColumn, ElText} from "element-plus"
import {ZoomIn} from '@element-plus/icons-vue'
import {useDataValue, useWritableDataValue} from "@/composables/useDataValue.ts";
import {replaceAll} from "@/utils/replaceAll.ts";
import {jsonPointerGet} from "@/DataContext.ts";

type OptionSetting = {
  uri: string,
  items: ViewDeclareItem[],
  valueField?: string,
}

const props = defineProps<{ viewDeclareItem: ViewDeclareItem, dataIndex: string[] }>()

const optionPath = computed(() =>"option/"+ replaceAll( props.viewDeclareItem?.dataPath,"[]",props.dataIndex))

const optionSetting: ComputedRef<OptionSetting> = computed(() => props.viewDeclareItem?.setting?.options
)
const optionData = computed(() =>
    //使用require 从 option.uri 获取。
    [{
      value: 1,
      text: 'male',
    }, {
      value: 2,
      text: 'female',
    },]
)
const optionVDs = computed(() =>
    optionSetting.value.items
)


const showOptionDialog = ref(false)
const emit = defineEmits(['patchDataModel'])


const modelValue = useDataValue<string | number | undefined>(props.viewDeclareItem, props.dataIndex)

</script>
<template>
  <div>
    <ElText>{{ modelValue }}</ElText>
    <ElButton :icon="ZoomIn" @click="showOptionDialog = true" style="margin-left: 8px;"/>
  </div>

  <ElDialog v-model="showOptionDialog" title="表格详情" destroy-on-close width="80%" append-to-body>
    <ElTable :data="optionData">
      <ElTableColumn type="index"/>
      <ElTableColumn v-for="child in optionVDs"
                     :key="child!!.id"
                     :label="label(child)">
        <template #default="scope">
          <DynamicComponent
              :viewDeclareItem="child" v-bind="child!!.setting"
              :manualData="jsonPointerGet(scope.row, child!!.dataPath)"
              :dataIndex="[String(scope.$index)]"/>
        </template>
      </ElTableColumn>
    </ElTable>
  </ElDialog>
</template>
