<script setup lang="ts">

import {computed, inject, type Ref} from "vue";
import {DECLARE, type ViewDeclare, type ViewDeclareItem} from "@/spec/declare.ts";
import DynamicComponent from "@/components/DynamicComponent.vue";

import {ElCard} from "element-plus"

const props = defineProps<{ viewDeclareItem: ViewDeclareItem, dataIndex: string[] }>()

const viewDeclare: Ref<ViewDeclare> = inject(DECLARE)!!

const childNodes = computed(() =>
    (props.viewDeclareItem.children || []).map(id => viewDeclare.value.filter(i => i.id === id)[0]).filter((item): item is ViewDeclareItem => Boolean(item))
)
</script>
<template>
  <ElCard>
    <DynamicComponent v-for="child in childNodes"
                      :key="child.id"
                      :viewDeclareItem="child" :dataIndex="dataIndex"/>
  </ElCard>
</template>
