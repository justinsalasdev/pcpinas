import React, { useState, useEffect } from "react"
import { API } from "../../config"
import { useFormContext } from "react-hook-form"

export default props => {
	const { register, watch, setValue, errors } = useFormContext()
	const { id, collection, productId, mode } = props
	const photo = watch("photo")
	const fieldError = (errors[id] && errors[id].message) || ""

	function FileListItems(files) {
		//from stackOVerflow --> constructing filelist with fileArray
		var b = new ClipboardEvent("").clipboardData || new DataTransfer()
		for (var i = 0, len = files.length; i < len; i++) b.items.add(files[i])
		return b.files
	}

	const [photoURL, setPhotoURL] = useState("")
	const isPhotoInitial = /http/.test(photoURL)

	useEffect(() => {
		if (photo && Object.keys(photo).length > 0) {
			const reader = new FileReader()
			reader.readAsDataURL(photo[0])
			reader.onload = e => {
				setPhotoURL(e.target.result)
			}
		} else if (mode === "edit") {
			setPhotoURL(`${API}/product/photo/${collection}/${productId}`)
		} else {
			return
		}
		// eslint-disable-next-line
	}, [photo])

	const addtoList = () => {
		if (photo && Object.keys(photo).length > 0) {
			const photoArray = Array.from(photo)
			var files = [
				new File(["content"], "sample1.txt"),
				new File(["abc"], "sample2.txt")
			]
			const newPhotoArray = photoArray.concat(files)
			const newFileList = new FileListItems(newPhotoArray)
			setValue("photo", newFileList)
			console.log("new", newFileList)
		}
	}

	const handleImageClick = () => {
		console.log(photo, "clickes")
		addtoList()
		if (isPhotoInitial || mode === "edit") {
			return
		} else {
			setPhotoURL("")
			setValue("photo", undefined)
		}
	}

	return (
		<div className="photo__container">
			<div className={`photo ${photoURL ? "" : "photo--none"}`}>
				{(fieldError && <span className="photo__toolkit">{fieldError}</span>) ||
					null}

				<div className="photo__main">
					<figure className="thumbnail">
						{(photoURL && (
							<div className="thumbnail__frame">
								<img
									className="thumbnail__content--form"
									alt="uploaded product"
									src={photoURL}
									onClick={handleImageClick}
								/>
							</div>
						)) ||
							null}

						{photoURL && mode === "create" ? (
							<figcaption onClick={handleImageClick} className="photo__caption">
								click to delete image
							</figcaption>
						) : null}
					</figure>
				</div>

				<input
					accept="image/*"
					type="file"
					name={id}
					id={id}
					className="photo__input"
					ref={register}
					multiple
				/>

				<label
					className={`photo__trigger${photoURL ? "--present" : "--absent"}`}
					htmlFor="photo"
				>
					{photoURL ? "replace" : "add photo"}
				</label>
			</div>
		</div>
	)
}
