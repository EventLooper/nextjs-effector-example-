import React, { Component } from 'react'
import { fetchPosts,PostList } from '../src/features/Feed'


class Home extends Component {
    static async getInitialProps(appContext) {
        const { results } = await fetchPosts({})

        return { results }
    }



    render() {
        return <div>
            <PostList />
        </div>
    }
}

export default Home
