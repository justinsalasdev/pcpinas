import React from "react";

export default ({otherClass}) => {
	return (
		<div className={`spinner ${otherClass}`}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};
