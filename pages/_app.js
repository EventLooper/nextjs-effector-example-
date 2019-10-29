import React from 'react'
import App from 'next/app'
import { createEvent } from 'effector'
import { createScope, fork, Provider, serialize } from '@zerobias/effector-react/ssr'
import "isomorphic-fetch"
import { universal } from '../src/Lib/domains';

const start = createEvent()

class MyApp extends App {

    static async getInitialProps({ Component, ctx, ...rest }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx });

        }
        const rootScope = createScope({ domain: universal })
        const forkedScope = await fork(rootScope, { ctx: { ...ctx, ...rest } })
        const state = serialize(forkedScope)

        Component.scope = forkedScope


        return { ...pageProps, initialState: state }
    }

    state = {
        scope: this.props.Component.scope
    }

    componentDidMount() {
        this.forkClientScope()
    }


    forkClientScope = async () => {
        const { scope } = this.state
        if (!scope) {
            const rootScope = createScope({ domain: universal })
            const scope = await fork(rootScope, { ctx: {} });

            this.setState({ scope })
        }

    }


    render() {
        const { scope } = this.state;
        const { Component, pageProps } = this.props;

        return scope
            ? <Provider value={scope}>
                <Component {...pageProps} />
            </Provider>
            : 'Loading ...'


    }
}

export default MyApp