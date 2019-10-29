import { universal } from '../../../Lib/domains';


const loadMore = universal.event('load more')
const fetchPosts = universal.effect({
    async handler({ limit = 20, offset = 0 }) {
        const res = await fetch(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.API_KEY}&limit=${limit}&offset=${offset}`)
        return res.json()
    }
});
const paginationStore = universal.store({
    limit: 20,
    offset: 0
})
    .on(loadMore, state => ({ ...state, offset: state.offset + 20 }))
    .watch(loadMore, state => {
        fetchPosts(state)
    })
const postsStore = universal.store([]).on(fetchPosts.done, (state, { result }) => result.results);

export { fetchPosts, postsStore, loadMore }



