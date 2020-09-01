const { getCollection } = require("../../collections/mongo");
const { getCatsError } = require("./categoryMessages");

module.exports = (req, res) => {
  const categoryArray = [];
  getCollection("categories")
    .then((categories) => {
      //iterator function
      categories.find().forEach(
        (category) => {
          categoryArray.push(category);
        },
        (error) => {
          //end of iteration callback
          if (error) {
            return res.status(500).json(getCatsError);
          } else {
            console.log(categoryArray);
            return res.status(200).json(categoryArray);
          }
        }
      );
    })
    .catch(() => res.status(500).json(getCatsError));
};
