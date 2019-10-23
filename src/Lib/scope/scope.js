import React from 'react'
import { clearNode, createEvent, createStore, is } from 'effector'

const manager = React.createContext()

export function ScopeProvider({ scopeStore, entries, children }) {
    scopeStore.addEntries({ entriesFabric: entries })

    const child = typeof children === 'function' ? children() : children

    return <manager.Provider value={scopeStore}>{child}</manager.Provider>
}

export const createScope = () => {
    const scope = createStore({})
    const addEntries = createEvent()

    scope.on(addEntries, (scope, { entriesFabric, storeCreator }) => {
        return { ...scope, ...entriesFabric(storeCreator) }
    })

    const getOrAdd = (storeKey, entriesFabric) => {
        const scopeState = scope.getState()
        const storeCreator = scopeState.universal.store
        //TODO replace getState with samples
        if (!scopeState[storeKey]) {
            addEntries({ entriesFabric, storeCreator })
        }
        console.log(scope.getState())

        return scope.getState()[storeKey]
    }

    return { scope, addEntries, getOrAdd }
}

let destroy = null

export function readScope(key, defaults) {
    const { scope, addEntries, getOrAdd } = React.useContext(manager)
    const { universal } = scope.getState()

    let newShapes = null
    // const result = useStoreMap({
    //     store: scope,
    //     keys: [key],
    //     fn(state, [key]) {
    //         if (key in state) {
    //             console.log(state)
    //             return state[key]
    //         }
    //         destroy = []
    //         let success = false
    //         let result
    //         try {
    //             result = defaults(universal.store, state)
    //             success = true
    //             newShapes = destroy
    //         } finally {
    //             if (!success) clearShape(destroy)
    //             destroy = null
    //         }
    //         state[key] = result
    //         return result
    //     },
    // })

    //const shapes = React.useMemo(() => newShapes, [key])
    //useClearOnUnmount(shapes)
    return getOrAdd(key, defaults)
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
