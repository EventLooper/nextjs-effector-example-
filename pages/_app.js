import React from 'react'
import App from 'next/app'
import "isomorphic-fetch"
import { createScope, ScopeProvider } from '../src/Lib/scope';
import { createUniversalDomain } from '../src/Lib/domains'


class MyApp extends App {

    static async getInitialProps({ Component, ctx, ...rest }) {
        let pageProps = {};
        const scope = createScope()
        scope.addEntries(createUniversalDomain)
        Component.storeManager = scope

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx, storeManager: scope });

        }

        // const universalStoresMap = Array.from(universal.history.stores).reduce((acc, store) => {
        //     acc[store.sid] = store.getState()
        //     return acc
        // }, {})


        return { ...pageProps }

    }

    scope = this.props.Component.storeManager || createScope()

    render() {
        const { Component, pageProps } = this.props;

        return <ScopeProvider scopeStore={this.scope} entries={createUniversalDomain}>
            <Component {...pageProps} />
        </ScopeProvider>


    }
}

export default MyApp