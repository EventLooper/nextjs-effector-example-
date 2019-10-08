import { createEffect, createEvent,createStore } from 'effector';

import { useClearOnUnmount } from '../../../Lib/scope';


export const createPostsStore = createUniversalStore => {
     const loadMore = createEvent('load more')
     const fetchPosts = createEffect({
        async handler({ limit = 20, offset = 0 }) {
            const res = await fetch(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.API_KEY}&limit=${limit}&offset=${offset}`)
            return res.json()
        }
    });
     const paginationStore = createStore({
        limit: 20,
        offset: 0
    })
        .on(loadMore, state => ({ ...state, offset: state.offset + 20 }))
        .watch(loadMore, state => {
            fetchPosts(state)
        })
    const postsStore = createUniversalStore([]).on(fetchPosts.done, (state, { result }) => result.results);
    return useClearOnUnmount({ postsStore })
}

