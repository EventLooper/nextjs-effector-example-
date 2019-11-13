import React from 'react'
import Link from 'next/link'

import { fetchPost, Post, started } from '../../src/features/Post'

const PostPage = () => (<div>
    <Post/>
    <Link href="/" as="/">
        <a>Go back</a>
    </Link>
</div>)

PostPage.getInitialProps = async ({ ctx }) => {

    await fetchPost(ctx.query)
}

PostPage.preload = started

export default PostPage