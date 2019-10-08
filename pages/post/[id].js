import React, { Component } from 'react'
import { withRouter } from 'next/router';
import Link from 'next/link'

class Post extends Component {



    render() {

        return (
            <div>
                Post
                <Link href="/" as="/">
                    <a>Go back</a>
                    </Link>
            </div>
        )
    }

}

export default withRouter(Post)