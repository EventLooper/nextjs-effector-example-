import React from 'react'
import { clearNode, createEvent, createStore, is } from 'effector'
import { useStoreMap } from 'effector-react'

const manager = React.createContext()

export function ScopeProvider({ scopeStore, entries, children }) {
    scopeStore.addEntries(entries)

    const child = typeof children === 'function' ? children() : children

    return <manager.Provider value={scopeStore}>{child}</manager.Provider>
}

export const createScope = () => {
    const scope = createStore({
        state: {},
        initialized: false,
    })
    const addEntries = createEvent()
    scope.on(addEntries, (scope, entriesFabric) => {
        if (scope.initialized) return scope
        return {
            initialized: true,
            state: entriesFabric(),
        }
    })
    return { scope, addEntries }
}

let destroy = null

export function readScope(key, defaults) {
    const { scope } = React.useContext(manager)
    let newShapes = null
    const result = useStoreMap({
        store: scope,
        keys: [key],
        fn({ state }, [key]) {
            if (key in state) return state[key]
            destroy = []
            let success = false
            let result
            try {
                result = defaults(state)
                success = true
                newShapes = destroy
            } finally {
                if (!success) clearShape(destroy)
                destroy = null
            }
            state[key] = result
            return result
        },
    })
    const shapes = React.useMemo(() => newShapes, [key])
    useClearOnUnmount(shapes)
    return result
}

export function useClearOnUnmount(shape) {
    if (destroy) {
        destroy.push(shape)
    } else {
        useIsomorphicLayoutEffect(
            () => () => {
                clearShape(shape)
            },
            [shape],
        )
    }
    return shape
}

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

function clearShape(shape) {
    if (shape !== Object(shape)) return
    if (is.unit(shape)) return clearNode(shape)
    if (Array.isArray(shape)) return shape.forEach(clearShape)
    for (const key in shape) clearShape(shape[key])
}
