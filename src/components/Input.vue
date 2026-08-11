<script setup lang="ts">
import {computed} from "vue";
import {ElInput} from "element-plus";
import {useDataContext} from "@/DataContext.vue.ts";
import type {ViewDeclareItem} from "@/spec/spec.ts";


const props = defineProps<{viewDeclareItem:ViewDeclareItem}>()
const emit = defineEmits(['patchDataModel'])
const ctx = useDataContext()


const modelValue = computed({
  get() {
    const v = ctx.resolve(props.viewDeclareItem!!.path)
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