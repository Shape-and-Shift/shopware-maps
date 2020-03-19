// eslint-disable-next-line func-names
module.exports = function (params) {
    return {
        resolve: {
            modules: [
                `${params.basePath}Resources/app/storefront/node_modules`
            ]
        }
    };
};
