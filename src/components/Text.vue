<script setup lang="ts">
import {computed, inject, type Ref} from "vue";
import {ElText} from "element-plus";
import type {ViewDeclareItem} from "@/spec/declare.ts";
import {useDataValue} from "@/composables/useDataValue.ts";


const props = defineProps<{ viewDeclareItem: ViewDeclareItem, dataIndex: string[] }>()

const modelValue = useDataValue<string | number | undefined>(props.viewDeclareItem, props.dataIndex)
</script>


<template>
  <ElText>{{ modelValue }}</ElText>
</template>

<style scoped>

</style>