import React from 'react'
import Link from 'next/link'
import {readScope} from '../src/Lib/scope';
import {createPostsStore} from '../src/features/Feed'
import { PostList } from '../src/features/Feed'


const Home = () => {
    const store = readScope('postStore',createPostsStore)
    return (
        <div>
            <PostList/>
            <Link href="/about"><a>About</a></Link>
        </div>
    )
}
Home.getInitialProps = async ({storeManager}) => {

    storeManager.addEntries(createPostsStore)
    console.log(storeManager.scope.getState())
}

export default Home
