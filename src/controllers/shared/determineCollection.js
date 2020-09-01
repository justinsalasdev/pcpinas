const collectionNames = require("../../collections/names");

module.exports = (req, res, next, id) => {
  if (collectionNames.includes(id)) {
    req.collectionName = id;
    next();
  } else {
    return res.status(400).json({
      error: {
        message: "Failed to find collection",
        type: "create",
        from: "db",
      },
    });
  }
};
