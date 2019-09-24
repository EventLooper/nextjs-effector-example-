import React, { useCallback } from 'react'
import { useList } from 'effector-react'
import { loadMore, paginationStore, postsStore } from '../models'

export const PostList = () => {
    const posts = useList(postsStore, (p) => <div>
        <h2>{p.title}</h2>
        <p>{p.abstract}</p>
    </div>);
    const handleLoadMore = useCallback(() => {
        loadMore()

    })

    return <div>
        {posts}
        <button onClick={handleLoadMore}>Load more</button>
    </div>
}