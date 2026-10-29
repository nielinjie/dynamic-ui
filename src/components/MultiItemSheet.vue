<script setup lang="ts">

import {computed, type ComputedRef, inject, type Ref, type WritableComputedRef} from "vue";
import {DECLARE, label, type ViewDeclare, type ViewDeclareItem} from "@/spec/declare.ts";
import DynamicComponent from "@/components/DynamicComponent.vue";

import {ElCard, ElButton, ElFormItem} from "element-plus"
import {replaceAll} from "@/utils/replaceAll.ts";
import {DataContext} from "@/DataContext.ts";
import {CENTER_DATA} from "@/DataContext.vue.ts";
import {STATE_DATA, STATE_NAME} from "@/data/state.ts";

const props = defineProps<{ viewDeclareItem: ViewDeclareItem, dataIndex: string[] }>()

const viewDeclare: Ref<ViewDeclare> = inject(DECLARE)!!

const childNodes = computed(() =>
    (props.viewDeclareItem.children || []).map(id => viewDeclare.value.filter(i => i.id === id)[0]).filter((item): item is ViewDeclareItem => Boolean(item))
)
const ctx: Ref<DataContext> = inject(CENTER_DATA)!!
const stateData: Ref<Record<string, any>> = inject(STATE_DATA)!!
const stateName: string = inject(STATE_NAME)!!
const emit = defineEmits(['patchDataModel'])

function addNew() {
  const current = [...(modelValue.value || [])]
  current.push({})
  modelValue.value = current
}

function remove(index: number) {
  const current = [...(modelValue.value || [])]
  current.splice(index, 1)
  modelValue.value = current
}

const modelValue: WritableComputedRef<any[]> = computed({
      get() {
        const statePathValue = stateData.value[stateName] || '/'
        const newDataPath = replaceAll(props.viewDeclareItem!!.dataPath, "[]", props.dataIndex || [])
        const v = ctx.value.scope(statePathValue).resolve(newDataPath)
        return v as any[]

      },
      set(val) {
        console.log("setting")
        const statePathValue = stateData.value[stateName] || '/'
        const newDataPath = replaceAll(props.viewDeclareItem!!.dataPath, "[]", props.dataIndex || [])
        ctx.value.scope(statePathValue).set(newDataPath, val)
        emit('patchDataModel', {path: props.viewDeclareItem!!.path, value: val})
      }
    }
)


</script>
<template>
  <div>
    <ElCard v-for="(model, index) in modelValue" :key="index" style="margin-bottom: 16px;">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Item {{ index + 1 }}</span>
          <ElButton type="danger" size="small" @click="remove(index)">Remove</ElButton>
        </div>
      </template>
      <ElFormItem v-for="child in childNodes" :label="label(child)">

        <DynamicComponent
                          :key="child.id"
                          :viewDeclareItem="child" :dataIndex="(dataIndex||[]).concat(String(index))"/>
      </ElFormItem>
    </ElCard>

    <ElButton type="primary" @click="addNew">Add New</ElButton>
  </div>
</template>
