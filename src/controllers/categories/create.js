const { getCollection } = require("../../collections/mongo");
const { saveCatInfo, catDuplicateError, saveCatError } = require("./categoryMessages");



module.exports = (req, res) => {
    getCollection('categories').then(categories => {
        categories.insertOne(req.body, (error, result) => {
            if (error) {
                if (error) {
                    if (error.keyPattern) {
                        return res.status(400).json(catDuplicateError)
                    }
                    return res.status(500).json(saveCatError);
                }
                res.status(200).json(saveCatInfo);
            }
            res.json(saveCatInfo)
        })
    })

}

