const formidable = require("formidable")
const { ObjectID } = require("mongodb")
const fs = require("fs")
const { getCollection } = require("../../collections/mongo")
const {
	saveProductError,
	saveProductInfo,
	formParseError,
	imageSizeError,
	readImageError,
	noImageError,
	invalidProductIdError
} = require("./productMessages")

module.exports = (req, res) => {
	const { prodId } = req.params
	if (prodId && prodId.length !== 24) {
		return res.status(400).json(invalidProductIdError)
	}
	const { collectionName } = req

	function saveProduct(productData) {
		productData["updatedAt"] = Date.now()
		getCollection(collectionName).then(products => {
			//parameters --> productData, prodId,
			products.findOneAndUpdate(
				{ _id: new ObjectID(prodId) },
				{ $set: productData },
				{ returnOriginal: false },
				(error, { value: updatedProduct }) => {
					if (error) {
						return res.status(400).json(saveProductError)
					}

					updatedProduct["photo"] = undefined
					res.json({ ...saveProductInfo, updatedProduct })
				}
			)
		})
	}

	let form = new formidable.IncomingForm()
	form.keepExtensions = true
	form.parse(req, (err, productData, files) => {
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

				if (files.photo.size > 0) {
					productData["photo"] = {
						data,
						contentType: files.photo.type
					}
				}
				saveProduct(productData)
			})
		} else {
			delete productData.photo
			saveProduct(productData)
		}
	})
}
