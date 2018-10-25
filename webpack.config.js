module.exports = function(env, argv) {
    var scenario = "prod";
    scenario = 'production' ? 'prod' : ('development' ? 'dev' : 'prod')

    return require(`./.config/webpack.${scenario}.js`);
};
