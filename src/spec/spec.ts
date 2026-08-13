/**
 type MView = ModelAndViewDeclare
 */
import {fake} from "@/spec/fake.ts";
import {fillChildren, type MView} from "@/spec/declare.ts";

export function spec(pageName: string, componentName: string): MView {
    return {
        dataModel: undefined,
        viewDeclare: fillChildren(fake.pages[pageName]!!.components[componentName]!!.items.map((item: any) => ({
            id: item.componentPath,
            dataPath: item.dataPath,
            path: item.componentPath,
            element: item.element,
            setting: item.setting
        })))
    }
}


export interface SpecComponentItem {
    dataPath: string
    componentPath: string
    element: string
    setting: object
}

export interface SpecComponent {
    items: SpecComponentItem[]
}

export interface SpecPage {
    components: Record<string, SpecComponent>
}

export interface Spec {
    namespace: string
    pages: Record<string, SpecPage>
}

