const {
	getUserError,
	emailNotFound,
	bcryptCompareError,
	matchError
} = require("./authMessages")

const { getCollection } = require("../../collections/mongo")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken") // to generate signed token

module.exports = (req, res) => {
	const { email, password } = req.body
	getCollection("users")
		.then(users => {
			users.findOne({ email }, (error, retrievedUser) => {
				if (error) {
					return res.status(500).json(getUserError)
				}
				if (!retrievedUser) {
					return res.status(400).json(emailNotFound)
				}

				//if user is found
				bcrypt.compare(password, retrievedUser.password, function (
					error,
					matched
				) {
					if (error) {
						return res.status(500).json(bcryptCompareError)
					}
					if (!matched) {
						return res.status(400).json(matchError)
					} else {
						//hash compare is a match
						retrievedUser.password = undefined
						const token = jwt.sign(
							{ userId: retrievedUser.userId },
							process.env.JWT_SECRET || "dev_secret"
						)
						const authData = {
							token,
							user: retrievedUser
						}
						res.status(200).json(authData)
					}
				})
			})
		})
		.catch(error => res.status(400).json(error))
}
