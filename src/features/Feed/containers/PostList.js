import React, { useCallback } from 'react'
import Link from 'next/link'
import { useList } from 'effector-react'
import { loadMore, postsStore } from '../models';


export const PostList = () => {
    // const posts = useList(postsStore, (p) => <div>
    //     <h2>{p.title}</h2>
    //     <p>{p.abstract}</p>
    //     <Link href="/post/[id]" as="/post/1">
    //         <a>div post</a>
    //     </Link>
    // </div>);
    // const handleLoadMore = useCallback(() => {
    //     loadMore()
    //
    // })

    return <div>
        {[]}
        <button onClick={() =>{}}>Load more</button>

    </div>
}