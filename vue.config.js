module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Less Known Places";
                return args;
            })
    },
    // css: {
    //     sourceMap: true,
    //     loaderOptions: {
    //         sass: {
    //             data: `
    //           @import "./styles/container.scss";
    //         `,
    //         },
    //     },
    // },
}