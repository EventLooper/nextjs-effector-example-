import { createEffect, createEvent } from 'effector';

import { createUniversalStore } from '../../../Lib/domains/universal'

export const loadMore = createEvent('load more')

export const fetchPosts = createEffect({
    async handler({ limit = 20, offset = 0 }) {
        console.log(limit,offset)
        const res = await fetch(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.API_KEY}&limit=${limit}&offset=${offset}`)
        return res.json()
    }
});

export const paginationStore = createUniversalStore({
        limit: 20,
        offset: 0
    })
        .on(loadMore, state => ({ ...state, offset: state.offset + 20 }))
        .watch(loadMore, state => {
            fetchPosts(state)
        })
;

export const postsStore = createUniversalStore([]).on(fetchPosts.done, (state, { result }) => [...state, ...result.results])
