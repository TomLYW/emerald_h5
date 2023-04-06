let api = {};
const context = require.context('./api', true, /\.js$/);
context.keys().forEach((e) => {
    api = {
        ...api,
        ...context(e).default,
    };
});

export default {
    ...api,
};
