import * as Yup from "yup";

export default Yup.object({
	email: Yup.string()
		.email("is invalid")
		.required("is required")
		.max(64, "must not be longer than 20 characters"),
	password: Yup.string()
		.required("is required")
		.min(6, "must be 6 characters at least"),
});
