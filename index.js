module.exports = {
    start: require('./lib/server').default,
    strategies: require('./lib/constant/strategies'),
    middleware: require('./lib/middleware')
};