const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
	const authHeader = req.header("Authorization")
	const [bearer, token] = authHeader.split(" ")
	if (bearer !== "Bearer") {
		return res.status(400).json({
			error: {
				message: "Authorization not valid",
				type: "authentication",
				from: "jwt"
			}
		})
	}

	jwt.verify(
		token,
		process.env.JWT_SECRET || "dev_secret",
		(error, decodedJWT) => {
			if (error) {
				return res.status(500).json({
					error: {
						message: "Failed to decode JWT",
						type: "authentication",
						from: "jwt"
					}
				})
			}

			if (
				!(req.retrievedUser && req.retrievedUser.userId === decodedJWT.userId)
			) {
				return res.status(403).json({
					error: {
						message: "JWT authentication failed",
						type: "authentication",
						from: "jwt"
					}
				})
			}

			next()
		}
	)
}
