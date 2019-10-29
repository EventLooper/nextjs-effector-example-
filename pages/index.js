import React from 'react'
import Link from 'next/link'
import { fetchPosts, PostList } from '../src/features/Feed'


const Home = () => {

    return (
        <div>
            <PostList/>
            <Link href="/about"><a>About</a></Link>
        </div>
    )
}
Home.getInitialProps = async ({}) => {


    await fetchPosts({})

}

export default Home
