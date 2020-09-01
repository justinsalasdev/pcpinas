module.exports = (req, res, next) => {
    if (req.product && req.product.photo.data) {
        res.set('Content-Type', 'image/webp')
        return res.send(req.product.photo.data.buffer)
    }
    next();
}
