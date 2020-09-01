import React from "react";

export default React.forwardRef((props, ref) => {
	const { fieldError, options, id, initial, current } = props;

	const renderCategoryOptions = (options) => {
		return options.map((option) => {
			return (
				<option key={option} value={option}>
					{option}
				</option>
			);
		});
	};

	return (
		<div className={`select__container select__container--${id}`}>
			{fieldError ? (
				<span className="select__toolkit">{fieldError}</span>
			) : null}

			<select
				className={`select${current === "initial" ? " select--default" : ""}`}
				name={id}
				ref={ref}
			>
				<option value="initial">{initial}</option>
				{renderCategoryOptions(options)}
			</select>
		</div>
	);
});
