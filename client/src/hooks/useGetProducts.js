import { useEffect } from "react";
import { API } from "../config";

export default (collection, colState, colDispatch) => {
	const colStatus = colState.status[collection];

	useEffect(() => {
		if (colStatus === "outdated") {
			colDispatch({ type: "start" });
			fetch(`${API}/products/${collection}`, {
				method: "get",
				headers: {
					Accept: "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.error && data.error.type === "client") {
						colDispatch({ type: "fail", payload: data.error });
					} else if (data && data.length >= 0) {
						colDispatch({
							type: "success",
							payload: {
								collection: collection,
								products: data,
							},
						});
						colDispatch({ type: "update", payload: collection });
					} else {
						return Promise.reject();
					}
				})
				.catch(() => {
					const customError = {
						type: "crash",
						message:
							"Error retrieving products. Please check network connection",
					};
					colDispatch({ type: "fail", payload: customError });
				});
		} else {
			return;
		}
		// eslint-disable-next-line
	}, [colStatus]);
};
