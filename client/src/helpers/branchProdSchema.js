import * as Yup from "yup"

const priceRegex = /^([1-9]{1}[0-9]{0,2}([0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/
const quantityRegex = /^[1-9]+[0-9]*$/
const photoLimit = 1000000
export default (additionalRules, mode) => {
	function isPhotoPresent(value) {
		const photoCount = (value && Object.keys(value).length) || 0
		if (mode === "edit") {
			return true
		} else {
			return photoCount > 0
		}
	}

	function isPhotoSmall(value) {
		const photoCount = (value && Object.keys(value).length) || 0
		if (mode === "edit") {
			if (photoCount <= 0) {
				return true
			} else {
				return photoCount > 0 && value[0].size < photoLimit
			}
		} else {
			return photoCount > 0 && value[0].size < photoLimit
		}
	}

	return Yup.object({
		...additionalRules,
		photo: Yup.mixed()
			.test("required", "Image is required", isPhotoPresent)
			.test("file size", "Image must be less than 1Mb", isPhotoSmall),
		productName: Yup.string().required("is required"),
		brand: Yup.string().required("is required"),
		model: Yup.string(),

		price: Yup.string()
			.required("is required")
			.matches(priceRegex, "is invalid"),
		quantity: Yup.string()
			.required("is required")
			.matches(quantityRegex, "is invalid"),
		description: Yup.string()
	})
}
