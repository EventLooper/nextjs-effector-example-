import { createDomain } from 'effector'



export const createUniversalDomain = () => {

    const universal = createDomain('universal')
    universal.onCreateStore(store => {

        if (process.browser && typeof window !== 'undefined') {
            const { universalStoresMap } = window.__NEXT_DATA__.props
            if (universalStoresMap[store.sid]) {
                store.defaultState = universalStoresMap[store.sid]
                store.setState(universalStoresMap[store.sid])

            }
        }
    })
    return  universal;

}