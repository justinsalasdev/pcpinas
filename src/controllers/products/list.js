const { getCollection } = require("../../collections/mongo");
const { getProductsError } = require("./productMessages");

module.exports = (req, res) => {
  const { collectionName } = req;
  const productArray = [];
  getCollection(collectionName)
    .then((products) => {
      //iterator function
      products
        .find()
        .project({ photo: 0 })
        .forEach(
          (product) => {
            productArray.push(product);
          },
          (error) => {
            //end of iteration callback
            if (error) {
              return res.status(500).json(getProductsError);
            } else {
              return res.status(200).json(productArray);
            }
          }
        );
    })
    .catch(() => res.status(500).json(getProductsError));
};
