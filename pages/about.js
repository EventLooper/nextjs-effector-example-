import React, { Component } from 'react'
import { withRouter } from 'next/router';
import Link from 'next/link'


export default class About extends Component{
    render() {
        return(
            <div>About
                <Link href="./" as="/">
                    <a>Go back</a>
                </Link>
            </div>
        )
    }

}