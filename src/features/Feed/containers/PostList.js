import React from 'react'
import Link from 'next/link'
import { useList } from 'effector-react'
import { readScope } from '../../../../src/Lib/scope'


export const PostList = () => {
    const { postsStore } = readScope('posts')
    const posts = useList(postsStore, (p) => <div>
        <h2>{p.title}</h2>
        <p>{p.abstract}</p>
        <Link href="/post/[id]" as="/post/1">
            <a>div post</a>
        </Link>
    </div>);
    // const handleLoadMore = useCallback(() => {
    //     loadMore()
    //
    // })

    return <div>
        {posts}
        <button onClick={() => {
        }}>Load more
        </button>

    </div>
}