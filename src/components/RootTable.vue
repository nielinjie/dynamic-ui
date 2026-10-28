<script setup lang="ts">

import {computed, type ComputedRef, inject, ref, type Ref} from "vue";
import {DECLARE, DECLARE_STATE_DETAIL, type ViewDeclare, type ViewDeclareItem} from "@/spec/declare.ts";
import DynamicComponent from "@/components/DynamicComponent.vue";

import {ElButton, ElDialog, ElSpace, ElTable, ElTableColumn} from "element-plus"
import {CENTER_DATA, DataContext} from "@/DataContext.vue.ts";
import {STATE_DATA} from "@/data/state.ts";
import RootRenderer from "@/components/RootRenderer.vue";

const props = defineProps<{ viewDeclareItem: ViewDeclareItem, dataIndex: string[] }>()
const viewDeclare: Ref<ViewDeclare> = inject(DECLARE)!!

const childNodes = computed(() =>
    (props.viewDeclareItem.children || []).map(id => viewDeclare.value.filter(i => i.id === id)[0]).filter((item): item is ViewDeclareItem => Boolean(item))
)

const ctx: Ref<DataContext> = inject(CENTER_DATA)!!
const emit = defineEmits(['patchDataModel'])
const state: Ref<Record<string, any>> = inject(STATE_DATA)!!

const showDetailDialog = ref(false)


function onButtonClick(index: number) {

  state.value = {...state.value, detail: props.viewDeclareItem!!.path + "/" + index}
  showDetailDialog.value = true
}

const detailViewDeclare: Ref<ViewDeclareItem[]> = inject(DECLARE_STATE_DETAIL)!!


const modelValue: ComputedRef<any[]> = computed(
    () => {
      return ctx.value.resolve(props.viewDeclareItem!!.path) as any[]
    },
)

</script>
<template>
  <ElTable :data="modelValue">
    <ElTableColumn type="index"/>
    <ElTableColumn></ElTableColumn>
    <ElTableColumn v-for="child in childNodes"
                   :key="child!!.id">
      <template #default="scope">
        <DynamicComponent
            :viewDeclareItem="child" v-bind="child!!.setting" :dataIndex="(dataIndex||[]).concat(String(scope.$index))"/>
      </template>
    </ElTableColumn>
    <ElTableColumn>
      <template #default="scope">
        <ElSpace>
          <ElButton @click="onButtonClick(scope.$index)">详情</ElButton>
          <ElButton>删除</ElButton>
        </ElSpace>
      </template>
    </ElTableColumn>
  </ElTable>

  <!-- 详情弹窗：移出 table，避免与 table hover 动画冲突 -->
  <ElDialog v-model="showDetailDialog" title="详情" destroy-on-close>
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>详情</span>
        <ElButton type="primary" size="small">保存</ElButton>
      </div>
    </template>
    <RootRenderer key="sheet@detail" v-if="state.detail" :viewDeclare="detailViewDeclare"
                  atState="detail"/>
  </ElDialog>
</template>