/**
 * DataContext.vue.ts —— Vue 适配层
 *
 * 把纯 JS 的 DataContext 类包装成 Vue 友好的 provide/inject 模式。
 */
import { type ComputedRef, computed, inject, provide } from 'vue'
import { DataContext } from './DataContext'

export const CENTER_DATA: symbol = Symbol('center-data-context')

/**
 * 在祖先调用：把 reactive dataModel 包装成 DataContext 并 provide
 *   provideDataContext(reactive({ user: { name: 'Alice' } }))
 */
export function provideDataContext(dataModelRef: unknown,name:symbol = CENTER_DATA): ComputedRef<DataContext> {
  const ctx = computed(() => new DataContext((dataModelRef as { value?: unknown }).value || dataModelRef))
  provide(name, ctx)
  return ctx
}

/**
 * 在任意后代组件调用：拿到当前作用域的 DataContext
 *   const ctx = useDataContext()
 *   ctx.resolveDynamic(node.text)
 */
export function useDataContext(name:symbol = CENTER_DATA): DataContext {
  const ctxRef = inject<ComputedRef<DataContext>>(CENTER_DATA)
  if (!ctxRef) {
    console.warn('[A2UI] useDataContext: no DataContext provided, returning empty context')
    return new DataContext({})
  }
  return ctxRef.value
}

// 同时导出纯 JS 核心，方便直接 import
export { DataContext, jsonPointerGet, jsonPointerSet, type PathValue } from './DataContext'
