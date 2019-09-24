import React from 'react'
import App from 'next/app'
import "isomorphic-fetch"
import { universal } from '../src/Lib/domains/universal'

class MyApp extends App {

    static async getInitialProps({ Component, ctx, ...rest }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx });
        }
        const universalStoresMap = Array.from(universal.graphite.scope.history.storages).reduce((acc, store) => {
            acc[store.sid] = store.getState()
            return acc
        }, {})

        return { ...pageProps, universalStoresMap }
    }


    render() {
        const { Component, pageProps } = this.props
        return <Component {...pageProps} />
    }
}

export default MyApp