<script setup lang="ts">

import type {ViewDeclareItem} from "@/spec/declare.ts";
import ChildNodesRenderer from "@/components/ChildrenRenderer.vue";

import {ElSpace} from "element-plus"

const props = defineProps<{
  viewDeclareItem: ViewDeclareItem,
  dataIndex?: number,
  direction?: "vertical" | "horizontal"
}>()
</script>
<template>
  <ElSpace :direction="direction||'horizontal'">
    <ChildNodesRenderer :viewDeclareItem="viewDeclareItem" :dataIndex="dataIndex"/>
  </ElSpace>
</template>