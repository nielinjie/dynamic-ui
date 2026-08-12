<script setup lang="ts">
import {computed, inject} from "vue";
import {ElTableColumn} from "element-plus";
import {CENTER_DATA, useDataContext} from "@/DataContext.vue.ts";
import type {ViewDeclareItem} from "@/spec/declare.ts";


const props = defineProps<{viewDeclareItem:ViewDeclareItem}>()
const emit = defineEmits(['patchDataModel'])
const ctx = inject(CENTER_DATA)!!


const modelValue = computed({
  get() {
    const v = ctx.value.resolve(props.viewDeclareItem!!.path)
    return v as string | number | undefined

  },
  set(val) {
    ctx.set(props.viewDeclareItem!!.path, val)
    emit('patchDataModel', {path: props.viewDeclareItem!!.path, value: val})
  }
})
</script>


<template>
  <ElTableColumn v-model="modelValue"/>
</template>

<style scoped>

</style>