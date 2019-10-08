import React from 'react'
import Link from 'next/link'
import { PostList } from '../src/features/Feed'


const Home = () => {
    return (
        <div>
            <PostList/>
            <Link href="/about"><a>About</a></Link>
        </div>
    )
}
Home.getInitialProps = async ({storeManager}) => {
    console.log(storeManager.scope.getState())
}

export default Home
