// ── Components ──
export { default as DynamicComponent } from './components/DynamicComponent.vue'
export { default as RootRenderer } from './components/RootRenderer.vue'
export { default as DynamicPage } from './components/DefaultRootPage.vue'
export { default as Input } from './components/Input.vue'
export { default as Text } from './components/Text.vue'
export { default as Card } from './components/Card.vue'
export { default as Sheet } from './components/Sheet.vue'
export { default as Table } from './components/Table.vue'
export { default as Contain } from './components/Container.vue'

// ── Catalog ──
export { catalog } from './components/catalog/index.ts'

// ── Spec & Types ──
export {
  fillChildren,
  DECLARE,
  DECLARE_STATE_DETAIL,
  type ViewDeclare,
  type ViewDeclareItem,
  type MView,
} from './spec/declare.ts'

export {
  spec,
  type Spec,
  type SpecComponent,
  type SpecComponentItem,
  type SpecPage,
} from './spec/spec.ts'

// ── Data Context ──
export {
  DataContext,
  jsonPointerGet,
  jsonPointerSet,
  provideDataContext,
  useDataContext,
  CENTER_DATA,
  type PathValue,
} from './DataContext.vue.ts'

// ── State ──
export { STATE_DATA, STATE_NAME } from './data/state.ts'
