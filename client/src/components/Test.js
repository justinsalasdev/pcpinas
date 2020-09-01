import React, { useState, useEffect } from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"

export default function MainForm() {
	const methods = useForm()
	const { watch } = methods
	// console.log(watch(["photos", "photo1", "photo2"]))
	const photos = watch("photos")
	console.log(photos)
	const [images, setImages] = useState([])
	const photoProps = {
		images,
		setImages
	}
	// function FileListItems(files) {
	// 	//from stackOVerflow --> constructing filelist with fileArray
	// 	var b = new ClipboardEvent("").clipboardData || new DataTransfer()
	// 	for (var i = 0, len = files.length; i < len; i++) b.items.add(files[i])
	// 	return b.files
	// }

	const photoCount = (photos && Object.keys(photos).length) || 0
	const imageCount = (images && images.length) || 0

	useEffect(() => {
		if (photoCount > 0) {
			setImages(Array.from(photos))
		} else {
			console.log(photoCount)
		}
		// eslint-disable-next-line
	}, [photos])

	useEffect(() => {}, [])

	return (
		<FormProvider {...methods}>
			<Photos {...photoProps} />
			<PhotoInput order="0" {...photoProps} />
			<PhotoInput order="1" {...photoProps} />
			<PhotoInput order="2" {...photoProps} />
			<PhotoInput order="3" {...photoProps} />
		</FormProvider>
	)
}

const Photos = props => {
	const { register } = useFormContext()
	return (
		<>
			<label htmlFor="photos">Photos</label>
			<input type="file" name="photos" ref={register} multiple />
		</>
	)
}

function PhotoInput({ order, images, setImages }) {
	const index = parseInt(order)
	const photoId = `photo${order}`
	const { register, watch } = useFormContext()
	const { photoURL, setPhotoURL } = useState("")
	const photo = watch(photoId)
	const isPresent = (photo && Object.keys(photo).length) > 0
	const isExisting = images[order] !== undefined
	const isAllowed = index => {
		if (index === 0) {
			return images[index] !== undefined
		} else {
			return images[index - 1] !== undefined
		}
	}
	console.log(isAllowed(index))

	useEffect(() => {
		if (!isPresent) {
			console.log("no photo")
		} else {
			if (!isExisting) {
				console.log("no pre existing photo")
				const newArray = [...images]
				newArray.push(photo[0])
				setImages(newArray)
				console.log("added new photo")
			} else {
				const newArray = [...images]
				newArray[parseInt(order)] = photo[0]
				setImages(newArray)
				console.log("appended array")
			}
		}
		// eslint-disable-next-line
	}, [photo])

	useEffect(() => {
		if (isExisting) {
		}
	})

	return (
		<div
			style={{
				padding: "1.2rem",
				backgroundColor: `${isAllowed(index) ? "lightgreen" : "gray"} `,
				margin: ".5rem"
			}}
		>
			<label htmlFor={photoId}>{photoId}</label>
			<input
				type="file"
				name={photoId}
				ref={register}
				disabled={!isAllowed(index)}
			/>
		</div>
	)
}
