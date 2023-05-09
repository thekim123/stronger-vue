const {defineConfig} = require('@vue/cli-service');
const webpack = require('webpack');

module.exports =
    defineConfig({
        transpileDependencies: true,
        configureWebpack: {
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        VUE_APP_API_HOST: JSON.stringify(process.env.VUE_APP_API_HOST),
                        VUE_APP_API_PORT: JSON.stringify(process.env.VUE_APP_API_PORT),
                    },
                }),
            ],
        },
    });

