module.exports = (req, res, next) => {

    if (req.retrievedUser && req.retrievedUser.role !== 1) {
        return res.status(401).json({
            error: {
                message: 'Unauthorized! Admin resource',
                type: 'authentication',
                from: 'admin'
            }
        })
    }

    next();
}