module.exports = () => {
    return (req, res, next) => {
        const timestamp = Date.now();
        console.log(`${req.method} ##  ${req.url} ⌚ ${timestamp} `);
        next();
    };
};
