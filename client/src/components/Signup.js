import React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import FormInput from "./FormElements/FormInput"
import Loader from "./Loader"

import useSignup from "../hooks/useSignup"
import Prompt from "./Prompt"
import authSchema from "../schemas/authSchema"

export default ({ history }) => {
	const [signupState, dispatch, signup] = useSignup()
	const { creating, created, error, alertShown } = signupState

	const methods = useForm({
		mode: "all",
		defaultValues: {
			email: "",
			password: ""
		},
		resolver: yupResolver(authSchema)
	})

	const { handleSubmit, errors: formErrors } = methods

	const onSubmit = signupData => {
		signup(signupData)
	}

	const handleSignupSuccess = () => {
		history.replace("/login")
		dispatch({ type: "acknowledge" })
	}

	const handleSignupFailure = () => {
		dispatch({ type: "acknowledge" })
	}

	const errorProps = {
		type: "single",
		message: error ? error.message : "",
		acknowledge: handleSignupFailure
	}

	const successProps = {
		type: "dual",
		message: "Account successfully created! You may now login",
		proceed: handleSignupSuccess,
		cancel: handleSignupFailure,
		proceedName: "Login",
		cancelName: "Cancel"
	}

	return (
		<>
			{alertShown && error && error.type !== "client" ? (
				<Prompt {...errorProps} />
			) : null}

			{alertShown && created ? <Prompt {...successProps} /> : null}
			{creating ? (
				<Loader message="Creating your account" />
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
