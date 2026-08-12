<script setup lang="ts">
import {computed, inject} from "vue";
import {ElInput} from "element-plus";
import {CENTER_DATA, useDataContext} from "@/DataContext.vue.ts";
import type {ViewDeclareItem} from "@/spec/declare.ts";
import {STATE_DATA, STATE_NAME} from "@/data/state.ts";


const props = defineProps<{viewDeclareItem:ViewDeclareItem}>()
const emit = defineEmits(['patchDataModel'])
const ctx = inject(CENTER_DATA)
const stateData = inject(STATE_DATA)
const stateName = inject(STATE_NAME)


const modelValue = computed({
  get() {
    const statePathValue = stateData.value[stateName] || '/'
    const v = ctx.value.scope(statePathValue).resolve(props.viewDeclareItem!!.path)
    return v as string | number | undefined

  },
  set(val) {
    ctx.value.set(props.viewDeclareItem!!.path, val)
    emit('patchDataModel', {path: props.viewDeclareItem!!.path, value: val})
  }
})
</script>


<template>
  <ElInput v-model="modelValue"/>
</template>

<style scoped>

</style>