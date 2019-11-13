import React from 'react'
import App from 'next/app'

import { fork, hydrate, Provider, serialize } from '@zerobias/effector-react/ssr'
import "isomorphic-fetch"
import { universal } from '../src/Lib/domains';


class MyApp extends App {

    static async getInitialProps({ Component, ctx, ...rest }) {
        let pageProps = {};


        //#TODO pass universal context with routing info both on client hook and server

        if (Component.preload && !process.browser) {

            //fork will await all events,effects related to start event, so we don't need to await  getInitialProps from page

            const forkedScope = await fork(universal, { ctx: { router:rest.router }, start: Component.preload })
            const state = serialize(forkedScope)
            Component.scope = forkedScope
            console.log('get init props done on server')
            return { ...pageProps, initialState: state }

        }


        if (Component.getInitialProps) {

            pageProps = await Component.getInitialProps({ ctx })
            console.log('get init props done on client')
            return { ...pageProps, initialState: {} }


        }


        console.log('get init props done without data')
        return { ...pageProps, initialState: {} }
    }


    componentDidMount() {
        const { initialState } = this.props
        console.log('window init state on cDM', initialState)


        hydrate(universal, { values: initialState })
    }

    componentDidUpdate() {
        const { initialState } = this.props
        console.log('app updated,window init state:',initialState)
    }


    render() {

        const { Component, pageProps } = this.props;

        return !process.browser
            ? <Provider value={Component.scope}>
                <Component {...pageProps} />
            </Provider>
            : <Component {...pageProps} />


    }
}

export default MyApp