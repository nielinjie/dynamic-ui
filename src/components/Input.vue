<script setup lang="ts">
import {computed, inject, type Ref} from "vue";
import {ElInput, ElFormItem} from "element-plus";
import {CENTER_DATA, DataContext, useDataContext} from "@/DataContext.vue.ts";
import type {ViewDeclareItem} from "@/spec/declare.ts";
import {STATE_DATA, STATE_NAME} from "@/data/state.ts";
import {replaceAll} from "@/utils/replaceAll.ts";


const props = defineProps<{ viewDeclareItem: ViewDeclareItem ,dataIndex: string[]}>()
const emit = defineEmits(['patchDataModel'])
const ctx: Ref<DataContext> = inject(CENTER_DATA)!!
const stateData: Ref<Record<string, any>> = inject(STATE_DATA)!!

const stateName: string = inject(STATE_NAME)!!



const modelValue = computed({
  get() {
    const statePathValue = stateData.value[stateName] || '/'
    const newDataPath = replaceAll(props.viewDeclareItem!!.dataPath, "[]", props.dataIndex||[])
    const v = ctx.value.scope(statePathValue).resolve(newDataPath)
    return v as string | number | undefined

  },
  set(val) {
    console.log("setting")
    const statePathValue = stateData.value[stateName] || '/'
    const newDataPath = replaceAll(props.viewDeclareItem!!.dataPath, "[]", props.dataIndex||[])
    ctx.value.scope(statePathValue).set(newDataPath,val)
    emit('patchDataModel', {path: props.viewDeclareItem!!.path, value: val})
  }
})
</script>


<template>
    <ElInput v-model="modelValue"/>
</template>

<style scoped>

</style>