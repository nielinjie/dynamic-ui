<script setup lang="ts">

import type {ViewDeclareItem} from "@/spec/spec.ts";
import {catalog} from "./catalog/index.ts";

const props = defineProps<{ viewDeclareItem: ViewDeclareItem }>()
const map = catalog
</script>
<template>
  <component :is="map[viewDeclareItem.element]" :viewDeclareItem="viewDeclareItem"/>
</template>