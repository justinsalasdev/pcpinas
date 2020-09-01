import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"

import useAuthenticate from "../hooks/useAuthenticate"

import React from "react"
import FormInput from "./FormElements/FormInput"
import Prompt from "./Prompt"
import Loader from "./Loader"
import { useAuthDispatch } from "../context/authContext"

import authSchema from "../schemas/authSchema"

export default ({ history }) => {
	const dispatch = useAuthDispatch()
	const [loginState, login, acknowledge] = useAuthenticate(history, dispatch)
	const { entering, error, alertShown } = loginState

	const methods = useForm({
		mode: "all",
		defaultValues: {
			email: "",
			password: ""
		},
		resolver: yupResolver(authSchema)
	})

	const { handleSubmit, errors: formErrors } = methods

	const onSubmit = signinData => {
		login(signinData)
	}

	const errorProps = {
		type: "single",
		message: error ? error.message : "",
		acknowledge: acknowledge
	}

	return (
		<>
			{alertShown && error && error.type !== "client" ? (
				<Prompt {...errorProps} />
			) : null}

			{entering ? (
				<Loader message="Authenticating" />
			) : (
				<div className="form__container">
					{error && error.type === "client" ? (
						<p className="form__toolkit">{error.message}</p>
					) : null}
					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className="form--login">
							<FormInput type="text" id="email">
								Email
							</FormInput>
							<FormInput type="password" id="password">
								Password
							</FormInput>

							<div className="form__actions">
								<button
									disabled={Object.keys(formErrors).length > 0}
									type="submit"
									className="button--success"
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
