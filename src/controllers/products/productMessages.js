exports.getProductsError = {
  error: {
    message: "Failed to get products",
    type: "get",
    from: "db",
  },
};

exports.getProductError = {
  error: {
    message: "Failed to get product",
    type: "get",
    from: "db",
  },
};

exports.deleteProductError = {
  error: {
    message: "Failed to delete product",
    type: "delete",
    from: "db",
  },
};

exports.deleteProductInfo = {
  info: {
    message: "Product successfully deleted",
    type: "delete",
    from: "db",
  },
};

exports.saveProductError = {
  error: {
    message: "Failed to save product",
    type: "save",
    from: "db",
  },
};

exports.saveProductInfo = {
  info: {
    message: "Product successfully saved",
    type: "create",
    from: "db",
  },
};

exports.invalidProductIdError = {
  error: {
    message: "ProductId is invalid",
    type: "read",
    from: "request",
  },
};

exports.formParseError = {
  error: {
    message: "Failed to parse form data",
    type: "parse",
    from: "formidable",
  },
};

exports.noImageError = {
  error: {
    message: "No image",
    type: "read",
    from: "request",
  },
};

exports.imageSizeError = {
  error: {
    message: "Image must be less than 1Mb",
    type: "parse",
    from: "formidable",
  },
};

exports.readImageError = {
  error: {
    message: "Failed to read image",
    type: "read",
    from: "filesystem",
  },
};
