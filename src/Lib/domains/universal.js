import { createDomain } from 'effector'


export const universal = createDomain('universal')
universal.onCreateStore(store => {
    console.log(`STORE CREATED in ${process.browser ? 'client' : 'server'}`, 'SID:', store.sid, 'DEFAULT STATE:', store.getState())
})