<script setup lang="ts">
import {computed, inject, type Ref} from "vue";
import {ElInput} from "element-plus";
import {CENTER_DATA, DataContext, useDataContext} from "@/DataContext.vue.ts";
import type {ViewDeclareItem} from "@/spec/declare.ts";
import {STATE_DATA, STATE_NAME} from "@/data/state.ts";


const props = defineProps<{ viewDeclareItem: ViewDeclareItem }>()
const emit = defineEmits(['patchDataModel'])
const ctx: Ref<DataContext> = inject(CENTER_DATA)!!
const stateData: Ref<Record<string, any>> = inject(STATE_DATA)!!

const stateName: string = inject(STATE_NAME)!!


const modelValue = computed({
  get() {
    const statePathValue = stateData.value[stateName] || '/'
    const v = ctx.value.scope(statePathValue).resolve(props.viewDeclareItem!!.path)
    return v as string | number | undefined

  },
  set(val) {
    console.log("setting")
    const statePathValue = stateData.value[stateName] || '/'
    ctx.value.scope(statePathValue).set(props.viewDeclareItem!!.path, val)
    emit('patchDataModel', {path: props.viewDeclareItem!!.path, value: val})
  }
})
</script>


<template>
  <ElInput v-model="modelValue"/>
</template>

<style scoped>

</style>