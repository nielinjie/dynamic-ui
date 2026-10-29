export type ViewDeclare = Array<ViewDeclareItem>


export const DECLARE_STATE_DETAIL = Symbol('DECLARE_STATE_DETAIL')
export const DECLARE = Symbol('DECLARE')

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
    dataPath: string,
    element: string,
    setting?: Record<string, any>,
    children?: Array<string>
}

export interface MView {
    viewDeclare: ViewDeclare
}

export function label(viewDeclareItem: ViewDeclareItem): string {
    const settingLabel = (viewDeclareItem.setting as any)?.label
    if (settingLabel) {
        return settingLabel
    }
    const parts = viewDeclareItem.path.split('/').filter(Boolean)
    return parts[parts.length - 1] ?? viewDeclareItem.path
}


