import React from "react"
//main is the only one registered
//main state is the priority state
//if user select files && cancelled -->

//each side input gets local state and main state & setState

export default () => {
	return (
		<div className="photos__container">
			<div className="photos">
				<PhotoInput role="main" />
				<PhotoInput role="side" />
			</div>
		</div>
	)
}
