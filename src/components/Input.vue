<script setup lang="ts">
import {computed, inject} from "vue";
import {ElInput} from "element-plus";
import {useDataContext} from "@/DataContext.vue.ts";
import type {ViewDeclareItem} from "@/spec/declare.ts";
import {STATE_DATA} from "@/data/state.ts";


const props = defineProps<{viewDeclareItem:ViewDeclareItem}>()
const emit = defineEmits(['patchDataModel'])
const ctx = useDataContext()
const stateData  = inject(STATE_DATA)

const modelValue = computed({
  get() {
    const statePath = stateData.value["selected"] || '/'
    const v = ctx.scope(statePath).resolve(props.viewDeclareItem!!.path)
    return v as string | number | undefined

  },
  set(val) {
    ctx.set(props.viewDeclareItem!!.path, val)
    emit('patchDataModel', {path: props.viewDeclareItem!!.path, value: val})
  }
})
</script>


<template>
  <ElInput v-model="modelValue"/>
</template>

<style scoped>

</style>