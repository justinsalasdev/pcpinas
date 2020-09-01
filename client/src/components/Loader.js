import React from "react";
import Spinner from './Spinner';

export default ({ message }) => {
	return (
		<div className="loader">
			<p className="loader__message">{message}</p>
			<div className="loader__spinner">
				<Spinner/>
			</div>
		</div>
	);
};
