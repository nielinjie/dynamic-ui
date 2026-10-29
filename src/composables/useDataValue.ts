import {computed, inject} from 'vue'
import type {ComputedRef, WritableComputedRef, Ref} from 'vue'
import {CENTER_DATA, DataContext} from '@/DataContext.vue.ts'
import {STATE_DATA, STATE_NAME} from '@/data/state.ts'
import {replaceAll} from '@/utils/replaceAll'
import type {ViewDeclareItem} from '@/spec/declare'

function resolveDataPath(dataPath: string, dataIndex: string[]): string {
    return replaceAll(dataPath, "[]", dataIndex || [])
}

/** 只读数据值：基于 dataPath + dataIndex 解析 */
export function useDataValue<T>(
    viewDeclareItem: ViewDeclareItem,
    dataIndex: string[],
    manualData?: any
): ComputedRef<T> {

    const ctx: Ref<DataContext> = inject(CENTER_DATA)!!
    const stateData: Ref<Record<string, any>> = inject(STATE_DATA)!!
    const stateName: string = inject(STATE_NAME)!!

    return computed(() => {
        if (manualData)
            return manualData

        const statePathValue = stateData.value[stateName] || '/'
        const newDataPath = resolveDataPath(viewDeclareItem.dataPath, dataIndex)
        return ctx.value.scope(statePathValue).resolve(newDataPath) as T
    })
}

/** 可写数据值：基于 dataPath + dataIndex 解析 */
export function useWritableDataValue<T>(
    viewDeclareItem: ViewDeclareItem,
    dataIndex: string[],
    emit: any
): WritableComputedRef<T> {
    const ctx: Ref<DataContext> = inject(CENTER_DATA)!!
    const stateData: Ref<Record<string, any>> = inject(STATE_DATA)!!
    const stateName: string = inject(STATE_NAME)!!

    return computed({
        get() {
            const statePathValue = stateData.value[stateName] || '/'
            const newDataPath = resolveDataPath(viewDeclareItem.dataPath, dataIndex)
            return ctx.value.scope(statePathValue).resolve(newDataPath) as T
        },
        set(val) {
            const statePathValue = stateData.value[stateName] || '/'
            const newDataPath = resolveDataPath(viewDeclareItem.dataPath, dataIndex)
            ctx.value.scope(statePathValue).set(newDataPath, val)
            emit('patchDataModel', {path: viewDeclareItem.path, value: val})
        }
    })
}

/** 基于 path 直接解析（RootTable 专用） */
export function usePathValue<T>(
    viewDeclareItem: ViewDeclareItem
): ComputedRef<T> {
    const ctx: Ref<DataContext> = inject(CENTER_DATA)!!

    return computed(() => {
        return ctx.value.resolve(viewDeclareItem.path) as T
    })
}
