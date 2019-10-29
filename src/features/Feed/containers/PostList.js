import React from 'react'
import Link from 'next/link'
import { useList } from '@zerobias/effector-react/ssr'
import { postsStore } from '../models';


export const PostList = () => {

    const posts = useList(postsStore, (p) => <div>
        <h2>{p.title}</h2>
        <p>{p.abstract}</p>
        <Link href="/post/[id]" as="/post/1">
            <a>div post</a>
        </Link>
    </div>);


    return <div>
        {posts}
        <button onClick={() => {
        }}>Load more
        </button>

    </div>
}