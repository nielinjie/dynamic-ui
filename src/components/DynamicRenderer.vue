<script setup lang="ts">
/**
 * @see MView
 * 这里对应于一个 MView，不是一个页面。一个页面可能包含多个 MView。
 */
import {computed, provide} from 'vue'
import type {ViewDeclare, ViewDeclareItem} from "@/spec/spec.ts";
import DynamicComponent from "@/components/DynamicComponent.vue";
import {provideDataContext} from "@/DataContext.vue.ts";

const props = defineProps<{
  viewDeclare: ViewDeclare,
  dataModel: object
}>()
provide('viewDeclare', computed(() => props.viewDeclare))
const rootItem = computed(() => props.viewDeclare.filter((c: ViewDeclareItem) => c.id === "/")[0])
const ctx = provideDataContext(props.dataModel)
</script>
<template>
  <DynamicComponent v-if="rootItem" :viewDeclareItem="rootItem"/>
</template>