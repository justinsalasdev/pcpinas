const { getCollection } = require("../../collections/mongo");

module.exports = (req, res, next, id) => {
  getCollection("users")
    .then((users) => {
      users.findOne({ userId: id }, (error, retrievedUser) => {
        if (error || !retrievedUser) {
          return res.status(500).json({
            error: {
              message: "Failed to get user",
              type: "get",
              from: "db",
            },
          });
        } else {
          req.retrievedUser = retrievedUser;
          next();
        }
      });
    })
    .catch((err) => res.status(500).json(err));
};
