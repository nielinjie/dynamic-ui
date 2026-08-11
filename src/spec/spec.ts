/**
 type MView = ModelAndViewDeclare
 */

export const spec: MView = {
    dataModel: undefined, viewDeclare: [
        {id: "/", path: "/", element: "card", setting: {}, children: ["/name", "/age"]},
        {id: "/name", path: "/name", element: "input", setting: {}},
        {id: "/age", path: "/age", element: "input", setting: {}}
    ]
}

export type ViewDeclare = Array<ViewDeclareItem>

/**
 * 根据各个 item 的 path，自动填充各个 item 的 children，比如 path=/a/b/c， 则它应该是 {path: "/a/b",……}children。将其 id 填充到此 item 的 children 里。
 * @param viewDeclare
 */
export function fillChildren(viewDeclare: ViewDeclare): ViewDeclare {
    const pathMap = new Map<string, ViewDeclareItem>()

    for (const item of viewDeclare) {
        pathMap.set(item.path, item)
    }

    for (const item of viewDeclare) {
        if (item.path === '/') continue

        const parts = item.path.split('/')
        parts.pop()
        const parentPath = parts.join('/') || '/'

        const parentItem = pathMap.get(parentPath)
        if (parentItem) {
            if (!parentItem.children) {
                parentItem.children = []
            }
            if (!parentItem.children.includes(item.id)) {
                parentItem.children.push(item.id)
            }
        }
    }

    return viewDeclare
}

export interface ViewDeclareItem {
    id: string,
    path: string,
    element: string,
    setting: object,
    children?: Array<string>
}

export interface MView {
    dataModel: any | undefined,
    viewDeclare: ViewDeclare
}


/**
 * Surface = Page
 */
export interface Surface {
    viewPoints: Record<string, MView> //view point
}