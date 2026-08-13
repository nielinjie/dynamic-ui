<script setup lang="ts">

import type {ViewDeclareItem} from "@/spec/declare.ts";
import ChildNodesRenderer from "@/components/ChildrenRenderer.vue";

import {ElCard} from "element-plus"

const props = defineProps<{ viewDeclareItem: ViewDeclareItem, dataIndex?: number }>()
</script>
<template>
  <ElCard>
    <ChildNodesRenderer :viewDeclareItem="viewDeclareItem" :dataIndex="dataIndex"/>
  </ElCard>
</template>