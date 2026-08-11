/**
 * DataContext.vue.ts —— Vue 适配层
 *
 * 把纯 JS 的 DataContext 类包装成 Vue 友好的 provide/inject 模式。
 * 单独拆出此文件，避免 Node 测试环境依赖 Vue。
 */
import { type ComputedRef, computed, inject, provide } from 'vue'
import { DataContext } from './DataContext'

export const DATA_CONTEXT_KEY: symbol = Symbol('a2ui-data-context')

/**
 * 在祖先（A2UIRenderer）调用：把 reactive dataModel 包装成 DataContext 并 provide
 *   provideDataContext(reactive({ user: { name: 'Alice' } }))
 */
export function provideDataContext(dataModelRef: unknown): ComputedRef<DataContext> {
  const ctx = computed(() => new DataContext((dataModelRef as { value?: unknown }).value || dataModelRef))
  provide(DATA_CONTEXT_KEY, ctx)
  return ctx
}

/**
 * 在任意后代组件调用：拿到当前作用域的 DataContext
 *   const ctx = useDataContext()
 *   ctx.resolveDynamic(node.text)
 */
export function useDataContext(): DataContext {
  const ctxRef = inject<ComputedRef<DataContext>>(DATA_CONTEXT_KEY)
  if (!ctxRef) {
    console.warn('[A2UI] useDataContext: no DataContext provided, returning empty context')
    return new DataContext({})
  }
  return ctxRef.value
}

// 同时导出纯 JS 核心，方便直接 import
export { DataContext, jsonPointerGet, jsonPointerSet } from './DataContext'
