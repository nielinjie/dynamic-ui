<script setup lang="ts">

import {computed, inject, ref, type ComputedRef, type Ref} from "vue";
import {DECLARE, label, type ViewDeclare, type ViewDeclareItem} from "@/spec/declare.ts";
import DynamicComponent from "@/components/DynamicComponent.vue";

import {ElButton, ElDialog, ElTable, ElTableColumn, ElText, ElRadio} from "element-plus"
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

const optionPath = computed(() => "option/" + replaceAll(props.viewDeclareItem?.dataPath, "[]", props.dataIndex))

const optionSetting: ComputedRef<OptionSetting> = computed(() => props.viewDeclareItem?.setting?.options
)
const optionData = ref<any[]>([])

async function loadOptionData() {
  if (!optionSetting.value?.uri) return
  try {
    const res = await fetch(optionSetting.value.uri)
    optionData.value = await res.json()
  } catch (e) {
    console.error('Failed to load option data:', e)
  }
}

const optionVDs = computed(() =>
    optionSetting.value?.items ?? []
)

const selectedIndex = ref<number | undefined>(undefined)

async function openDialog() {
  await loadOptionData()
  showOptionDialog.value = true
}

const showOptionDialog = ref(false)
const emit = defineEmits(['patchDataModel'])

function onConfirm() {
  if (selectedIndex.value !== undefined && optionSetting.value?.valueField) {
    const row = optionData.value[selectedIndex.value]
    if (row) {
      modelValue.value = row[optionSetting.value.valueField]
    }
  }
  showOptionDialog.value = false
}

function onCancel() {
  selectedIndex.value = undefined
  showOptionDialog.value = false
}


const modelValue = useWritableDataValue<string | number | undefined>(props.viewDeclareItem, props.dataIndex, emit)

</script>
<template>
  <div>
    <ElText>{{ modelValue }}</ElText>
    <ElButton :icon="ZoomIn" @click="openDialog" style="margin-left: 8px;"/>
  </div>

  <ElDialog v-model="showOptionDialog" title="表格详情" destroy-on-close width="80%" append-to-body>
    <ElTable :data="optionData" highlight-current-row @current-change="(val: any) => selectedIndex = val">
      <ElTableColumn type="index"/>
      <ElTableColumn width="55" align="center">
        <template #default="scope">
          <ElRadio v-model="selectedIndex" :label="scope.$index" size="large"/>
        </template>
      </ElTableColumn>
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
    <template #footer>
      <ElButton @click="onCancel">取消</ElButton>
      <ElButton type="primary" @click="onConfirm">确认</ElButton>
    </template>
  </ElDialog>
</template>
