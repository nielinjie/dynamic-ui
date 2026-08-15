/**
 type MView = ModelAndViewDeclare
 */
import {fillChildren, type MView} from "@/spec/declare.ts";

/**
 * 把 dataPath 转换成 path，例如 /[]/id 转换成 /id
 * @param dataPath
 */
function getPathFromData(dataPath: string): string {
    return dataPath.replace(/\/\[\]/g, '');
}

export function spec(pageName: string, componentName: string, specData: Spec): MView {
    return {
        dataModel: undefined,
        viewDeclare: fillChildren(specData.pages[pageName]!!.components[componentName]!!.items.map((item: any) => {
            const path = getPathFromData(item.dataPath);
            return {
                id: path,
                dataPath: item.dataPath,
                path: path,
                element: item.element,
                setting: item.setting
            }
        }))
    }
}


export interface SpecComponentItem {
    dataPath: string
    element: string
    setting: object
}

export interface SpecComponent {
    items: SpecComponentItem[]
}

export interface SpecPage {
    entry: string
    components: Record<string, SpecComponent>
}

export interface Spec {
    namespace: string
    pages: Record<string, SpecPage>
}

