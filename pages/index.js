import React from 'react'
import Link from 'next/link'

import { createPostsStore, PostList } from '../src/features/Feed'


const Home = () => {

    return (
        <div>
            <PostList/>
            <Link href="/about"><a>About</a></Link>
        </div>
    )
}
Home.getInitialProps = async ({ storeManager }) => {
    const { fetchPosts } = storeManager.getOrAdd('posts', createPostsStore)

    await fetchPosts({})

}

export default Home
