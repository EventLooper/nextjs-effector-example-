import { createDomain } from 'effector'

let globalStoresMap
//export const createUniversalDomain = createDomain('universal')
export const universal = createDomain('universal')

universal.onCreateStore(store => {

    if (process.browser && typeof window !== 'undefined') {
        const { universalStoresMap } = window.__NEXT_DATA__.props
        if (universalStoresMap[store.sid]) {
            store.defaultState = universalStoresMap[store.sid]
            store.setState(universalStoresMap[store.sid])
        }
    }
})


export const { store: createUniversalStore } = universal;