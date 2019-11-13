import { forward } from 'effector';
import { universal } from '../../../Lib/domains';


const loadMore = universal.event('load more')
const started = universal.event('start')
const fetchPosts = universal.effect({
    async handler({ limit = 20, offset = 0 }) {
        console.log('FETHED')
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
        return res.json()
    }
});

const fetchUsers = universal.effect({
    handler() {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('RESOLVE USERS ?')
                resolve()
            }, 2000)
        })
    }
})
const paginationStore = universal.store({
    limit: 20,
    offset: 0
})
    .on(loadMore, state => ({ ...state, offset: state.offset + 20 }))
    .watch(loadMore, state => {
        fetchPosts(state)
    })

const feedStore = universal.store([]).on(fetchPosts.done, (state, { result }) => result);

forward({
    from: started,
    to: fetchPosts
})
forward({
    from: fetchPosts,
    to: fetchUsers
})

export { fetchPosts, feedStore, loadMore, started }



