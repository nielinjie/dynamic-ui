/**
 * DataContext —— A2UI v0.9 数据绑定核心
 *
 * 职责：
 *   1. resolve(path, scope?)       —— 读：JSON Pointer 解析（支持绝对/相对路径 + 模板作用域）
 *   2. set(path, value, scope?)    —— 写：JSON Pointer 写入（自动创建中间节点）
 *   3. resolveDynamic(value)       —— 统一入口：字面量原样返回，{path:...} 走 resolve
 *
 * 设计：
 *   - 纯 JS，不依赖 Vue（可在 Node 测试和浏览器中通用）
 *   - 不持有 dataModel，由外部传入 → 方便接入 Vue reactive / ref / 普通对象
 *   - scope 用于 List/Column 模板迭代时切相对路径前缀
 */

// ─────────────────────────────────────────────
// JSON Pointer 工具
// ─────────────────────────────────────────────

/**
 * 把 JSON Pointer 字符串拆成 segments
 *   "/a/b"    → ["a","b"]
 *   "/a~1b"   → ["a/b"]   （~1 → /, ~0 → ~）
 *   "/"        → []
 *   ""         → []
 */
function parsePointer(pointer: string | undefined): string[] {
    if (!pointer || pointer === '/') return []
    return pointer.replace(/^\//, '').split('/').map(seg =>
        seg.replace(/~1/g, '/').replace(/~0/g, '~')
    ).filter(p => !(p == ''))
}

/**
 * 读：按 pointer 在 obj 中取值
 */
export function jsonPointerGet(obj: unknown, pointer: string | undefined): unknown {
    const parts = parsePointer(pointer)
    if (parts.length === 0) return obj
    let cur: unknown = obj
    for (const p of parts) {
        if (cur == null) return undefined
        cur = (cur as Record<string, unknown>)[p]
    }
    return cur
}

/**
 * 写：按 pointer 在 obj 中设值（会原地修改，自动创建中间对象/数组）
 */
export function jsonPointerSet(obj: unknown, pointer: string | undefined, value: unknown): void {
    const parts = parsePointer(pointer)
    if (parts.length === 0) {
        if (typeof obj === 'object' && obj !== null) {
            Object.keys(obj).forEach(k => delete (obj as Record<string, unknown>)[k])
            Object.assign(obj as object, value)
        }
        return
    }

    let cur: unknown = obj
    for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i]!!
        const nextKey = parts[i + 1]!!
        if ((cur as Record<string, unknown>)[key] == null) {
            (cur as Record<string, unknown>)[key] = /^\d+$/.test(nextKey) ? [] : {}
        }
        cur = (cur as Record<string, unknown>)[key]
    }
    const lastKey = parts[parts.length - 1]!!
    ;(cur as Record<string, unknown>)[lastKey] = value
}

// ─────────────────────────────────────────────
// DataContext 类
// ─────────────────────────────────────────────

export interface PathValue {
    path: string
}

export class DataContext {
    private readonly _root: unknown
    private readonly _scope: string

    constructor(rootDataModel: unknown, scopePrefix = '') {
        this._root = rootDataModel
        this._scope = scopePrefix
    }


    /**
     * 解析路径（绝对 or 相对）
     */
    resolve(pointer: string): unknown {


        // 相对路径：拼到当前 scope 下
        const scoped = this._scope
            ? `${this._scope}/${pointer}`
            : `/${pointer}`
        return jsonPointerGet(this._root, scoped)
    }

    /**
     * 写入路径（绝对 or 相对）
     */
    set(pointer: string, value: unknown): void {

        const scoped = this._scope
            ? `${this._scope}/${pointer}`
            : `/${pointer}`
        jsonPointerSet(this._root, scoped, value)

    }

    /**
     * 创建子作用域（List 迭代时用）
     *   const childCtx = ctx.scope('/products/0')
     */
    scope(scopePrefix: string): DataContext {
        const cleanPrefix = scopePrefix.replace(/^\//, '')
        const newPrefix = this._scope
            ? `${this._scope}/${cleanPrefix}`
            : `/${cleanPrefix}`
        return new DataContext(this._root, newPrefix)
    }

    /**
     * 解析 action context 里的所有 path → 当前值
     * 用于 Button 点击时把 context 序列化为可发送的值
     */
    resolveActionContext(contextItems: unknown[]): unknown[] {
        if (!Array.isArray(contextItems)) return []
        return contextItems.map(item => {
            if (item && typeof item === 'object' && 'path' in item) {
                return {...(item as object), _resolvedValue: this.resolve((item as PathValue).path)}
            }
            return item
        })
    }
}
