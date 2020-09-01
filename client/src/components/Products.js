import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "../context/authContext";
import useGetProducts from "../hooks/useGetProducts";
import Product from "./Product";
import Loader from "./Loader";
import Prompt from "./Prompt";
import { useColState, useColDispatch } from "../context/collectionContext";

export default ({ collection }) => {
	const { user } = useAuthState();
	const colState = useColState();
	const colDispatch = useColDispatch();
	useGetProducts(collection, colState, colDispatch);
	const {
		products,
		getting: gettingProds,
		error: getProdsError,
		alertShown: getProdsAlert,
	} = colState;

	const productArray = products[collection];

	const renderProducts = (products) => {
		return products.map((product) => {
			return (
				<Product
					key={product._id}
					productData={product}
					collection={collection}
				/>
			);
		});
	};

	const errorProps = {
		type: "single",
		message: getProdsError && getProdsError.message,
		acknowledge: () => colDispatch({ type: "acknowledge" }),
	};

	const isAdmin = user && user.role === 1;
	return (
		<div className="products__container">
			{getProdsAlert && getProdsError && getProdsError.type !== "client" ? (
				<Prompt {...errorProps} />
			) : null}

			{gettingProds ? (
				<Loader message="Fetching products" />
			) : (
				(productArray && productArray.length > 0 && (
					<ul className="products">{renderProducts(productArray)}</ul>
				)) || <p>No products found</p>
			)}

			{isAdmin ? (
				<Link to={`/shop/${collection}/create`}>Add Product</Link>
			) : null}
		</div>
	);
};
