const { getCollection } = require("../../collections/mongo");
const { ObjectID } = require("mongodb");
const { deleteProductError, deleteProductInfo } = require("./productMessages");

module.exports = (req, res) => {
  const { productId } = req.params;
  const { collectionName } = req;

  getCollection(collectionName).then((products) => {
    products.deleteOne({ _id: new ObjectID(productId) }, (error, result) => {
      if (error) {
        return res.status(500).json(deleteProductError);
      }
      res.json(deleteProductInfo);
    });
  });
};
