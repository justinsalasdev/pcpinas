import React from "react"
import { useFormContext } from "react-hook-form"

const FormInput = props => {
	const { register, errors } = useFormContext()
	const { id, type, children } = props
	const fieldError = (errors[id] && errors[id].message) || ""

	return (
		<div className={`input input--${id}`}>
			<input
				className="input__field"
				type={type}
				name={id}
				id={id}
				ref={register}
				placeholder="."
			/>
			<label htmlFor={id} className="input__label">
				{children} <span className="input__toolkit">{fieldError}</span>
			</label>
		</div>
	)
}

export default FormInput
