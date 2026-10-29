<script setup lang="ts">
import {computed, inject, type Ref} from "vue";
import {ElInput, ElFormItem} from "element-plus";
import type {ViewDeclareItem} from "@/spec/declare.ts";
import {useWritableDataValue} from "@/composables/useDataValue.ts";


const props = defineProps<{ viewDeclareItem: ViewDeclareItem ,dataIndex: string[]}>()
const emit = defineEmits(['patchDataModel'])

const modelValue = useWritableDataValue<string | number | undefined>(props.viewDeclareItem, props.dataIndex, emit)
</script>


<template>
    <ElInput v-model="modelValue"/>
</template>

<style scoped>

</style>