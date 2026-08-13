<script setup lang="ts">
/**
 * @see MView
 * 这里对应于一个 MView，不是一个页面。一个页面可能包含多个 MView。
 * 一般对应一个 dataModel。
 * 比如 center-data，
 * atState，是 center-data 的一个部分。比如 selected 的部分，editing 的部分。
 */
import {computed, inject, provide, type Ref} from 'vue'
import type {ViewDeclare, ViewDeclareItem} from "@/spec/declare.ts";
import DynamicComponent from "@/components/DynamicComponent.vue";
import {STATE_DATA, STATE_NAME} from "@/data/state.ts";

const props = defineProps<{
  viewDeclare: ViewDeclare,
  atState?: string
}>()
provide('viewDeclare', computed(() => props.viewDeclare))
provide(STATE_NAME, props.atState)
const rootItem = computed(() => props.viewDeclare.filter((c: ViewDeclareItem) => c.id === "/")[0])
</script>
<template>
  <DynamicComponent v-if="rootItem" :viewDeclareItem="rootItem"/>
</template>