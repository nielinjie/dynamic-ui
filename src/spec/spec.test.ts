import { describe, it, expect } from 'vitest'
import { fillChildren, type ViewDeclareItem, type ViewDeclare } from './declare.ts'

describe('fillChildren', () => {
    it('should fill children for single-level paths', () => {
        const viewDeclare: ViewDeclare = [
            { id: '/', path: '/', dataPath: '/', element: 'card', setting: {} },
            { id: '/name', path: '/name', dataPath: '/name', element: 'input', setting: {} },
            { id: '/age', path: '/age', dataPath: '/age', element: 'input', setting: {} }
        ]

        fillChildren(viewDeclare)

        expect(viewDeclare[0]!!.children).toContain('/name')
        expect(viewDeclare[0]!!.children).toContain('/age')
    })

    it('should fill children for multi-level nested paths', () => {
        const viewDeclare: ViewDeclare = [
            { id: '/', path: '/', dataPath: '/', element: 'card', setting: {} },
            { id: '/a', path: '/a', dataPath: '/a', element: 'card', setting: {} },
            { id: '/a/b', path: '/a/b', dataPath: '/a/b', element: 'card', setting: {} },
            { id: '/a/b/c', path: '/a/b/c', dataPath: '/a/b/c', element: 'input', setting: {} }
        ]

        fillChildren(viewDeclare)

        expect(viewDeclare[1]!!.children).toContain('/a/b')
        expect(viewDeclare[2]!!.children).toContain('/a/b/c')
    })

    it('should not modify items without parent', () => {
        const viewDeclare: ViewDeclare = [
            { id: '/', path: '/', dataPath: '/', element: 'card', setting: {} },
            { id: '/orphan', path: '/orphan', dataPath: '/orphan', element: 'input', setting: {} }
        ]

        fillChildren(viewDeclare)

        expect(viewDeclare[1]!!.children).toBeUndefined()
    })

    it('should not duplicate children on multiple calls', () => {
        const viewDeclare: ViewDeclare = [
            { id: '/', path: '/', dataPath: '/', element: 'card', setting: {} },
            { id: '/name', path: '/name', dataPath: '/name', element: 'input', setting: {} }
        ]

        fillChildren(viewDeclare)
        fillChildren(viewDeclare)

        expect(viewDeclare[0]!!.children?.filter(c => c === '/name')).toHaveLength(1)
    })

    it('should handle mixed paths correctly', () => {
        const viewDeclare: ViewDeclare = [
            { id: '/', path: '/', dataPath: '/', element: 'card', setting: {} },
            { id: '/profile', path: '/profile', dataPath: '/profile', element: 'card', setting: {} },
            { id: '/profile/name', path: '/profile/name', dataPath: '/profile/name', element: 'input', setting: {} },
            { id: '/profile/age', path: '/profile/age', dataPath: '/profile/age', element: 'input', setting: {} },
            { id: '/settings', path: '/settings', dataPath: '/settings', element: 'card', setting: {} }
        ]

        fillChildren(viewDeclare)

        expect(viewDeclare[0]!!.children).toContain('/profile')
        expect(viewDeclare[0]!!.children).toContain('/settings')
        expect(viewDeclare[1]!!.children).toContain('/profile/name')
        expect(viewDeclare[1]!!.children).toContain('/profile/age')
    })
})
