import React from 'react'
import Link from 'next/link'
import { useList } from 'effector-react';
import { feedStore } from '../models';


export const PostList = () => {
    const post = useList(feedStore, (p) => <div>
        <h2>{p.title}</h2>
        <p>{p.body}</p>
        <Link href="/post/[id]" as={`/post/${p.id}`}>
            <a>div post</a>
        </Link>
    </div>);

    return <div>
        {post}
        <button onClick={() => {
        }}>Load more
        </button>
    </div>

}


