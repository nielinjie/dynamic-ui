<script setup lang="ts">

import {computed, type ComputedRef, inject, type Ref} from "vue";
import type {ViewDeclare, ViewDeclareItem} from "@/spec/declare.ts";
import DynamicComponent from "@/components/DynamicComponent.vue";

import {ElTable} from "element-plus"
import {CENTER_DATA, DataContext} from "@/DataContext.vue.ts";
import {STATE_DATA} from "@/data/state.ts";

const props = defineProps<{ viewDeclareItem: ViewDeclareItem }>()
const viewDeclare: Ref<ViewDeclare> = inject('viewDeclare')!!

const childNodes = computed(() =>
    (props.viewDeclareItem.children || []).map(id => viewDeclare.value.filter(i => i.id === id)[0]).filter((item): item is ViewDeclareItem => Boolean(item))
)

const ctx  = inject(CENTER_DATA)
const emit = defineEmits(['patchDataModel'])
const state :Ref<Record<string,any>> = inject(STATE_DATA)


function onRowClick(row: unknown) {
  const data = modelValue.value
  if (!Array.isArray(data)) return
  const index = data.indexOf(row)
  state.value = {...state.value,selected:props.viewDeclareItem!!.path+"/"+index}
}


const modelValue= computed({
  get() {
    const v = ctx.value.resolve(props.viewDeclareItem!!.path)
    return v

  },
  set(val) {
    ctx.set(props.viewDeclareItem!!.path, val)
    emit('patchDataModel', {path: props.viewDeclareItem!!.path, value: val})
  }
})
</script>
<template>
  <ElTable :data="modelValue" highlight-current-row @row-click="onRowClick">
    <DynamicComponent v-for="child in childNodes"
                      :key="child!!.id"
                      :viewDeclareItem="child" v-bind="child!!.setting"/>
  </ElTable>
</template>