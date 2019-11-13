import React from 'react'
import Link from 'next/link'
import { fetchPosts, PostList, started } from '../src/features/Feed'


const Home = () => {

    return (
        <div>
            <PostList/>
            <Link href="/about"><a>About</a></Link>
        </div>
    )
}
Home.getInitialProps = async ({}) => {

    return fetchPosts({})
}


Home.preload = started

export default Home
