import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"

import React from "react"
import FormInput from "./FormElements/FormInput"
import Prompt from "./Prompt"
import useSaveProduct from "../hooks/useSaveProduct"
import { useAuthState } from "../context/authContext"
import Loader from "./Loader"
import FormPhotos from "./FormElements/FormPhotos"
import { useHistory } from "react-router-dom"
import { useColDispatch } from "../context/collectionContext"

export default ({ renderOtherInput, collection, schema, position, mode }) => {
	const history = useHistory()
	const initialProdData = history.location.state //use for editing products
	const productId = (initialProdData && initialProdData._id) || ""

	const methods = useForm({
		defaultValues: initialProdData || {},
		mode: "all",
		resolver: yupResolver(schema)
	})

	const { register, handleSubmit, errors: formErrors, watch } = methods

	const onSubmit = productData => {
		const formData = new FormData()
		for (const key in productData) {
			formData.set(
				key,
				key === "photo" ? productData[key][0] : productData[key]
			)
		}

		saveProduct(formData)
	}

	//save product logic *********************************************************************************
	const { user, token } = useAuthState()
	const colDispatch = useColDispatch()
	const [saveProdState, saveProdDispatch, saveProduct] = useSaveProduct(
		user,
		token,
		collection,
		colDispatch,
		mode,
		productId,
		history
	)

	const {
		saving: prodSaving,
		error: prodError,
		alertShown: prodAlert
	} = saveProdState

	const errorProps = {
		type: "single",
		message: prodError ? prodError.message : "",
		acknowledge: () => saveProdDispatch({ type: "acknowledge" })
	}

	const cancelCreate = () => {
		history.replace(`/shop/${collection}`)
	}

	const getFieldError = id => (formErrors[id] && formErrors[id].message) || ""

	return (
		<>
			{prodAlert && prodError && prodError.type !== "client" ? (
				<Prompt {...errorProps} />
			) : null}

			{prodSaving ? (
				<Loader message="Creating product" />
			) : (
				<div className="form__container form__container--product">
					{prodError && prodError.type === "client" ? (
						<p className="form__toolkit">{prodError.message}</p>
					) : null}

					<FormProvider {...methods}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className={`form--${collection}`}
						>
							{position === "top"
								? renderOtherInput(getFieldError, watch, register)
								: null}

							<FormInput type="text" id="brand">
								Brand
							</FormInput>
							<FormInput type="text" id="productName">
								Name
							</FormInput>
							<FormInput type="text" id="model">
								Model#
							</FormInput>

							{position === "top"
								? null
								: renderOtherInput(getFieldError, watch, register)}

							<FormInput type="text" id="price">
								Price (₱)
							</FormInput>
							<FormInput type="text" id="quantity">
								Quantity
							</FormInput>

							<FormPhotos
								id="photo"
								mode={mode}
								productId={initialProdData && initialProdData._id}
								collection={collection}
							/>

							<div className="description__container">
								<textarea
									placeholder="Description"
									className="description"
									name="description"
									ref={register}
								></textarea>
							</div>

							<div className="form__actions">
								<button
									type="button"
									className="button--danger form__action"
									onClick={cancelCreate}
								>
									Cancel
								</button>
								<button
									disabled={Object.keys(formErrors).length > 0}
									type="submit"
									className="button--success form__action"
								>
									Submit
								</button>
							</div>
						</form>
					</FormProvider>
				</div>
			)}
		</>
	)
}
