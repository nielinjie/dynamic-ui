<script setup lang="ts">
import {ElText} from "element-plus";
import type {ViewDeclareItem} from "@/spec/declare.ts";
import {useDataValue} from "@/composables/useDataValue.ts";


const props = defineProps<{ viewDeclareItem: ViewDeclareItem,
  dataIndex: string[] ,
  manualData?: any
}>()

const modelValue = useDataValue<string | number | undefined>(
    props.viewDeclareItem,
    props.dataIndex,
    props.manualData
)
</script>


<template>
  <ElText>{{ modelValue }}</ElText>
</template>

<style scoped>

</style>