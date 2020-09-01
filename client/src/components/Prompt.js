import React from "react";

export default (props) => {
	const {
		type,
		message,
		acknowledge,
		proceed,
		cancel,
		proceedName,
		cancelName,
		children,
	} = props;

	const renderAction = (type) => {
		if (type === "dual") {
			return (
				<>
					<button
						type="button"
						className="button--danger prompt__button"
						onClick={cancel}>
						{cancelName}
					</button>
					<button
						type="button"
						className="button--success prompt__button"
						onClick={proceed}>
						{proceedName}
					</button>
				</>
			);
		} else if (type === "single") {
			return (
				<button
					type="button"
					className="button--success prompt__button"
					onClick={acknowledge}>
					OK
				</button>
			);
		} else {
			return null;
		}
	};

	const renderContent = (type) => {
		if (type === "component") {
			return children;
		} else {
			return <p className="prompt__message">{message}</p>;
		}
	};

	return (
		<>
			<div className="prompt__backdrop"></div>
			<div className="prompt__window">
				{renderContent(type)}
				{renderAction(type)}
			</div>
		</>
	);
};
