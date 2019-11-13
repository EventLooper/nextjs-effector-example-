
module.exports = {

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

        config.resolve.alias ={
            ...config.resolve.alias,
            'effector-react':isServer ? '@zerobias/effector-react/ssr' : '@zerobias/effector-react',
            'effector-react$':isServer ? '@zerobias/effector-react/ssr' : '@zerobias/effector-react'
        }


        return config

    }
}