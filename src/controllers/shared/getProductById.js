const { getCollection } = require("../../collections/mongo");
const { ObjectID } = require("mongodb");
const {
  getProductError,
  invalidProductIdError,
} = require("../products/productMessages");

module.exports = (req, res, next, id) => {
  if (id && id.length !== 24) {
    return res.status(400).json(invalidProductIdError);
  }
  const { collectionName } = req;

  getCollection(collectionName).then((products) => {
    products.findOne({ _id: new ObjectID(id) }, (error, product) => {
      if (error || !product) {
        return res.status(500).json(getProductError);
      }
      req.product = product;
      next();
    });
  });
};
