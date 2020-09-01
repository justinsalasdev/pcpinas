exports.getUserError = {
  error: {
    message: "Error getting user",
    type: "get",
    from: "db",
  },
};

exports.createUserError = {
  error: {
    message: "Error creating user",
    type: "get",
    from: "db",
  },
};

exports.emailNotFound = {
  error: {
    message: "Email not found",
    type: "client",
    from: "db",
  },
};

exports.duplicateEmailError = {
  error: {
    message: "Email already exists",
    type: "client",
    from: "db",
  },
};

exports.bcryptCompareError = {
  error: {
    message: "Failed to compare password",
    type: "hash compare",
    from: "bcrypt",
  },
};

exports.bcryptHashError = {
  error: {
    message: "Failed to hash password",
    type: "hash",
    from: "bcrypt",
  },
};

exports.matchError = {
  error: {
    message: "Email and password didn't match",
    type: "client",
    from: "db",
  },
};

exports.userCreateSuccess = {
  info: {
    message: "User successfully created",
    type: "create",
    from: "db",
  },
};
