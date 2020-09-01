const { getCollection } = require("../../collections/mongo");
const { v1: uuidv1 } = require("uuid");
const bcrypt = require("bcrypt");
const { bcryptHashError, createUserError, userCreateSuccess, duplicateEmailError } = require("./authMessages");

module.exports = (req, res) => {
	const { email, password } = req.body;
	const saltRounds = 10;

	bcrypt.hash(password, saltRounds, function (error, hash) {
		if (error) {
			return res.status(500).json(bcryptHashError);
		}
		getCollection("users")
			.then((users) => {
				users.insertOne(
					{ email, password: hash, userId: uuidv1(), role: 1 },
					(error, result) => {
						if (error) {
							if (error.keyPattern) {
								return res.status(400).json(duplicateEmailError)
							}
							return res.status(500).json(createUserError);
						}
						res.status(200).json(userCreateSuccess);
					}
				);
			})
			.catch((error) => res.json(error));
	});
};
