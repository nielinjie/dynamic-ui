<script setup lang="ts">

import {computed, inject, type Ref} from "vue";
import {DECLARE, type ViewDeclare, type ViewDeclareItem} from "@/spec/declare.ts";
import DynamicComponent from "@/components/DynamicComponent.vue";

import {ElSpace} from "element-plus"

const props = defineProps<{
  viewDeclareItem: ViewDeclareItem,
  dataIndex: string[],
  direction?: "vertical" | "horizontal"
}>()

const viewDeclare: Ref<ViewDeclare> = inject(DECLARE)!!

const childNodes = computed(() =>
    (props.viewDeclareItem.children || []).map(id => viewDeclare.value.filter(i => i.id === id)[0]).filter((item): item is ViewDeclareItem => Boolean(item))
)
</script>
<template>
  <ElSpace :direction="direction||'horizontal'">
    <DynamicComponent v-for="child in childNodes"
                      :key="child.id"
                      :viewDeclareItem="child" :dataIndex="dataIndex"/>
  </ElSpace>
</template>