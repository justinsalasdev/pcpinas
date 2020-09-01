import React from "react"
import { API } from "../config"
import useDeleteProduct from "../hooks/useDeleteProduct"
import { useAuthState } from "../context/authContext"
import { FaTrashAlt } from "react-icons/fa"
import { FiEdit } from "react-icons/fi"
import Spinner from "./Spinner"
import Prompt from "./Prompt"
import { useColDispatch } from "../context/collectionContext"
import { Link } from "react-router-dom"

export default props => {
	const colDispatch = useColDispatch()
	const { productData, collection } = props
	const {
		brand,
		model,
		_id,
		productName,
		price,
		quantity,
		soldQuantity,
		description,
		createdAt,
		updatedAt
	} = productData

	const { user, token } = useAuthState()
	const [deleteState, deleteDispatch, deleteProduct] = useDeleteProduct(
		user,
		token,
		collection,
		_id,
		colDispatch
	)

	const { deleting, error, alertShown, initiated } = deleteState

	const processDate = date => {
		const newDate = new Date(date)
		const day = newDate.getDate()
		const year = newDate.getFullYear()
		const month = newDate.getMonth() + 1

		return `${year}/${month < 10 ? "0" + month : month}/${
			day < 10 ? "0" + day : day
		}`
	}

	const errorProps = {
		type: "single",
		message: error && error.message,
		acknowledge: () => deleteDispatch({ type: "acknowledge" })
	}

	const deleteProps = {
		type: "dual",
		message: "Delete product?",
		proceed: () => {
			deleteProduct()
		},
		cancel: () => {
			deleteDispatch({ type: "cancel" })
		},
		proceedName: "Delete",
		cancelName: "Cancel"
	}

	return (
		<>
			{initiated ? <Prompt {...deleteProps} /> : null}
			{alertShown && error && error.type !== "client" ? (
				<Prompt {...errorProps} />
			) : null}

			<li className="product products__product">
				<a
					href="/product/delete"
					className="product__delete link--icon"
					onClick={e => {
						e.preventDefault()
						deleteDispatch({ type: "initiate" })
					}}
				>
					{deleting ? <Spinner otherClass="spinner--link" /> : <FaTrashAlt />}
				</a>

				<Link
					to={{
						pathname: `/shop/${collection}/edit`,
						state: productData
					}}
					className="product__edit link--icon"
				>
					<FiEdit />
				</Link>
				<ul className="product__attributes">
					<li className="product__brand">{brand}</li>
					<li className="product__model">{model}</li>
					<li className="product__image">
						<div className="thumbnail">
							<div className="thumbnail__frame">
								<img
									className="thumbnail__content--product"
									alt="product"
									src={`${API}/product/photo/${collection}/${_id}`}
								/>
							</div>
						</div>
					</li>
					<li className="product__name">{productName}</li>
					<li className="product__price">₱{Number(price).toFixed(2)}</li>
					<li className="product__remaining">{quantity} left</li>
					<li className="product__sold">{soldQuantity || 0} sold</li>
					<li className="product__description">{description}</li>
					<li className="product__created">posted {processDate(createdAt)}</li>
					<li className="product__updated">updated {processDate(updatedAt)}</li>
				</ul>
			</li>
		</>
	)
}
