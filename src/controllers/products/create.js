const formidable = require("formidable")
const fs = require("fs")
const { getCollection } = require("../../collections/mongo")
const {
	saveProductError,
	saveProductInfo,
	formParseError,
	imageSizeError,
	readImageError,
	noImageError
} = require("./productMessages")

module.exports = (req, res) => {
	const { collectionName } = req
	let form = new formidable.IncomingForm()
	form.keepExtensions = true
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json(formParseError)
		}

		if (files && files.photo) {
			if (files.photo.size > 1000000) {
				//1Mb = 1000000
				return res.status(400).json(imageSizeError)
			}

			fs.readFile(files.photo.path, (err, data) => {
				if (err) {
					return res.status(400).json(readImageError)
				}

				fields["photo"] = {
					data,
					contentType: files.photo.type
				}

				fields["createdAt"] = Date.now()
				fields["updatedAt"] = Date.now()

				getCollection(collectionName).then(products => {
					products.insertOne(fields, (error, result) => {
						if (error) {
							return res.status(400).json(saveProductError)
						}
						const savedProduct = result.ops[0]
						savedProduct.photo = undefined

						res.json({
							...saveProductInfo,
							savedProduct
						})
					})
				})
			})
		} else {
			return res.status(400).json(noImageError)
		}
	})
}
